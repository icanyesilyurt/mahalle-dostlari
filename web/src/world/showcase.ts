// VİTRİN: açılış noktası çevresini (Sultanahmet meydanı + kuzeydeki ev sırası + doğudaki Gülhane Park Yolu)
// hazır modellerle kurar. Yerleşim verisi aynı (data/istanbul.json); yalnız görünüş değişir.
// Binalar Kenney "Modular Buildings" parçalarından, evin eni/derinliği/kat sayısına göre birleştirilir.
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { Instancer, Kits, wallTint } from './assets';
import { M, rng } from './kit';
import type { NpcSpawn, Rect, StraySpawn } from './world';

/** Vitrin bölgesi (dünya koordinatı). */
export const SHOWCASE = { x0: -60, x1: 190, z0: 128, z1: 300 };
export const inShowcase = (x: number, z: number) => x >= SHOWCASE.x0 && x <= SHOWCASE.x1 && z >= SHOWCASE.z0 && z <= SHOWCASE.z1;
/** Sultan Ahmet Camii + avlusu ve meydan çeşmesinin eski ilkel şekilleri bu kutulardan atılır. */
export const REPLACED_PRIMS = [
  { x0: -47, x1: 22, z0: 232, z1: 279 },   // cami + avlu + 4 minare
  { x0: 33, x1: 51, z0: 213, z1: 231 },    // meydan çeşmesi
  { x0: 62, x1: 114, z0: 160, z1: 212 },   // Ayasofya + 4 minare
];
export const primReplaced = (x: number, z: number) => REPLACED_PRIMS.some(b => x >= b.x0 && x <= b.x1 && z >= b.z0 && z <= b.z1);

type House = [number, number, number, number, number, number, number, string, string, string];

const UPPER = [
  ['building-windows', 'building-windows-sills'],
  ['building-window', 'building-window-sill'],
  ['building-windows-round', 'building-windows-sills-round'],
  ['building-windows-high-top-round', 'building-windows-high-top-round'],
  ['building-windows-high-top-square', 'building-windows'],
  ['building-window-wide-sill', 'building-window-wide'],
];
const DOORS = ['building-door', 'building-door-window', 'building-window-door-window-round', 'building-window-door-window', 'building-door-window-narrow'];
const AWN = ['#c8423a', '#2f7d6d', '#e2a33b', '#3b6aa8', '#8e3b5a'];
const ROOF = ['#c9694a', '#b95c3f', '#c87452', '#b3654a'];

// ---------- birleşik geometri yardımcıları (çatı, silme, tente: her biri tek çizim) ----------
class Merge {
  parts: THREE.BufferGeometry[] = [];
  add(g: THREE.BufferGeometry, color: THREE.ColorRepresentation, m: THREE.Matrix4) {
    const x = (g.index ? g.toNonIndexed() : g.clone()).applyMatrix4(m);
    const c = new THREE.Color(color), n = x.attributes.position.count, arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) { arr[i * 3] = c.r; arr[i * 3 + 1] = c.g; arr[i * 3 + 2] = c.b; }
    x.setAttribute('color', new THREE.BufferAttribute(arr, 3));
    if (!x.attributes.uv) x.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(n * 2), 2));
    this.parts.push(x);
  }
  mesh(mat: THREE.Material, shadows: boolean) {
    const m = new THREE.Mesh(mergeGeometries(this.parts)!, mat); m.castShadow = shadows; m.receiveShadow = true; return m;
  }
}

/** Kalça çatı; her yüzde u saçak boyunca, v eğim yukarı (kiremit dokusu doğru yönde akar). */
function tileRoof(w: number, d: number, h: number, tile = 1.6): THREE.BufferGeometry {
  const hw = w / 2, hd = d / 2;
  const A = [-hw, 0, -hd], B = [hw, 0, -hd], C = [hw, 0, hd], D = [-hw, 0, hd];
  let faces: number[][][];
  if (w >= d) { const r = (w - d) / 2, R1 = [-r, h, 0], R2 = [r, h, 0]; faces = [[A, B, R2, R1], [C, D, R1, R2], [D, A, R1], [B, C, R2]]; }
  else { const r = (d - w) / 2, R1 = [0, h, -r], R2 = [0, h, r]; faces = [[A, B, R1], [B, C, R2, R1], [C, D, R2], [D, A, R1, R2]]; }
  const pos: number[] = [], uv: number[] = [];
  const v = (a: number[]) => new THREE.Vector3().fromArray(a);
  for (const f of faces) {
    const a = v(f[0]), b = v(f[1]);
    const e = b.clone().sub(a).normalize();
    const n = b.clone().sub(a).cross(v(f[2]).sub(a)).normalize();
    const flip = n.y < 0;
    const up = new THREE.Vector3().crossVectors(flip ? n.clone().negate() : n, e).negate();
    if (up.y < 0) up.negate();
    const tris = f.length === 4 ? [[0, 1, 2], [0, 2, 3]] : [[0, 1, 2]];
    for (const t of tris) {
      const idx = flip ? [t[0], t[2], t[1]] : t;
      for (const i of idx) {
        const p = v(f[i]); pos.push(p.x, p.y, p.z);
        const q = p.clone().sub(a); uv.push(q.dot(e) / tile, q.dot(up) / tile);
      }
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.computeVertexNormals();
  return g;
}

const BOX = new THREE.BoxGeometry(1, 1, 1);
const sbox = (mg: Merge, base: THREE.Matrix4, c: THREE.ColorRepresentation, w: number, h: number, d: number, x: number, y: number, z: number, rx = 0) =>
  mg.add(BOX, c, new THREE.Matrix4().multiplyMatrices(base, M(x, y + h / 2, z, 0, w, h, d, rx)));

export interface ShowcaseOut {
  group: THREE.Group; colliders: Rect[]; fountainR: number;
  spawn: THREE.Vector3; spawnYaw: number;
  strays: StraySpawn[]; npcs: NpcSpawn[];
  walkers: [number, number][][];      // gezinen NPC'lerin dönüş yolları
  pigeons: [number, number][];        // güvercin yerleri
}

export function buildShowcase(D: any, kits: Kits, shadows: boolean): ShowcaseOut {
  const R = rng(4242);
  const I = new Instancer(kits);
  const trims = new Merge(), roofs = new Merge();
  const colliders: Rect[] = [];
  const at = (base: THREE.Matrix4, m: THREE.Matrix4) => new THREE.Matrix4().multiplyMatrices(base, m);

  // ---------- evler ----------
  const houses = (D.houses as House[]).filter(h => inShowcase(h[0], h[1]));
  const house = (h: House) => {
    const [cx, cz, w, d, ry, floors, shopN, kind, colH] = h;
    const wood = kind === 'ahsap', brick = kind === 'tugla', shop = shopN === 1;
    const col = '#' + colH;
    const tint = wallTint(col);
    const trim = brick ? '#e6dccb' : '#' + new THREE.Color(col).multiplyScalar(wood ? 0.62 : 0.8).getHexString();
    const base = M(cx, 0, cz, ry);
    const gf = 3.4, fh = 3.0, H = gf + (floors - 1) * fh;
    const nx = Math.max(1, Math.round(w / 3.1)), mw = w / nx, sz = d / 2;
    const fam = UPPER[R.int(0, UPPER.length - 1)];
    const doorI = R.int(0, nx - 1), door = R.pick(DOORS);
    const balcony = !wood && floors >= 2 && nx >= 2 && R.chance(0.4);
    const balI = Math.floor(nx / 2);
    const cumba = floors >= 3 && w >= 5 && !balcony && R.chance(wood ? 0.7 : 0.35);
    for (let f = 0; f < floors; f++) {
      const y = f === 0 ? 0 : gf + (f - 1) * fh, hh = f === 0 ? gf : fh, sy = hh / 0.63;
      for (let i = 0; i < nx; i++) {
        const x = -w / 2 + mw * (i + 0.5);
        let front: string;
        if (f === 0) {
          if (shop) front = nx >= 3 ? (i === 0 ? 'building-window-large-left' : i === nx - 1 ? 'building-window-large-right' : 'building-window-large-middle') : 'building-window-large';
          else front = i === doorI ? door : R.chance(0.5) ? 'building-window-sill' : 'building-windows-sills';
        } else if (balcony && i === balI) front = 'building-window-balcony';
        else front = fam[(i + f) % fam.length];
        I.add(front, at(base, M(x, y, -d / 2 + sz / 2, Math.PI, mw, sy, sz)), tint);
        I.add(f === 0 ? 'building-window' : 'building-windows', at(base, M(x, y, d / 2 - sz / 2, 0, mw, sy, sz)), tint);
      }
      if (f > 0) sbox(trims, base, trim, w + 0.12, 0.16, d + 0.12, 0, y - 0.08, 0);   // kat silmesi
    }
    sbox(trims, base, '#b9ab98', w + 0.1, 0.4, d + 0.1, 0, 0, 0);                  // taş subasman
    sbox(trims, base, trim, w + 0.36, 0.28, d + 0.36, 0, H, 0);                     // saçak silmesi
    roofs.add(tileRoof(w + 0.9, d + 0.9, R.range(1.2, 1.8)), R.pick(ROOF), at(base, M(0, H + 0.28, 0)));
    if (R.chance(0.35)) { const x = R.range(-w / 3, w / 3), z = R.range(-d / 4, d / 4); sbox(trims, base, '#b9654a', 0.45, 1.6, 0.45, x, H + 0.3, z); sbox(trims, base, '#7a3b2a', 0.6, 0.12, 0.6, x, H + 1.9, z); }

    if (shop) { // çizgili tente
      const aw = R.pick(AWN), sw = Math.min(w - 0.5, 7);
      for (let k = 0, n = Math.max(3, Math.round(sw / 0.5)); k < n; k++)
        sbox(trims, base, k % 2 ? '#f4efe6' : aw, sw / n, 0.06, 1.5, -sw / 2 + (k + 0.5) * sw / n, gf - 0.55, -d / 2 - 0.7, 0.38);
    } else if (R.chance(0.7)) { // kapı yanına saksı
      const dx = -w / 2 + mw * (doorI + 0.5) + (R.chance(0.5) ? 1 : -1) * mw * 0.36;
      if (R.chance(0.5)) I.add('pottedPlant', at(base, M(dx, 0, -d / 2 - 0.35, R.range(0, 6), 2.4, 2.4, 2.4)));
      else { I.add('pot_large', at(base, M(dx, 0.1, -d / 2 - 0.35, 0, 1.9, 1.9, 1.9))); I.add(R.pick(['flower_redA', 'flower_yellowA', 'flower_purpleA']), at(base, M(dx, 0.3, -d / 2 - 0.35, R.range(0, 6), 3, 3, 3))); }
    }
    if (cumba) {
      const cw = Math.min(3.3, w - 1.4);
      for (let f = 1; f < floors; f++) I.add('cumba', at(base, M(0, gf + (f - 1) * fh, -d / 2, Math.PI, cw / 3, fh / 3, 1)), tint);
      I.add('cumba_alt', at(base, M(0, gf, -d / 2, Math.PI, cw / 3, 1, 1)));
      I.add('cumba_ust', at(base, M(0, H, -d / 2, Math.PI, cw / 3, 1, 1)));
    }
    // pencere önünde çiçek (balkonlu katlarda)
    if (balcony) for (let f = 1; f < floors; f++) if (R.chance(0.6))
      I.add(R.pick(['flower_redA', 'flower_yellowA', 'plant_bush']), at(base, M(-w / 2 + mw * (balI + 0.5) + R.range(-0.6, 0.6), gf + (f - 1) * fh + 0.1, -d / 2 - 0.12, R.range(0, 6), 2.4, 2.4, 2.4)));
  };
  for (const h of houses) house(h);

  // ---------- bitişik cephe blokları (eski 'walls'): 6-9 m'lik ayrı evlere bölünür, çoğu dükkânlı ve tenteli ----------
  const PAL = ['e6a98c', 'f3e3b5', 'a9c1b4', 'd9c2a7', 'e9b9a3', 'c8d8bf', 'bcd0e3', 'f1d59c', 'e8c4cb'];
  for (const [ww, hh, dd, x, , z, , ry] of D.walls as any[][]) {
    if (!inShowcase(x, z)) continue;
    const n = Math.max(1, Math.round(ww / 7.4)), sw = ww / n, fl = Math.max(2, Math.round((hh - 0.4) / 3));
    const c = Math.cos(ry), s = Math.sin(ry);
    for (let i = 0; i < n; i++) {
      const lx = -ww / 2 + sw * (i + 0.5);
      house([x + lx * c, z - lx * s, sw - 0.05, dd, ry + Math.PI, fl + (R.chance(0.35) ? 1 : 0), R.chance(0.65) ? 1 : 0, 'siva', R.pick(PAL), 'win_a']);
    }
  }

  // ---------- ağaç, fener, bank ----------
  const deco = new Merge();
  const grassAt = (x: number, z: number) => (D.grounds as any[][]).some(g => g[5] === 'grass' && x > g[0] && x < g[1] && z > g[2] && z < g[3]);
  // çınar (iri), ıhlamur (orta), süs ağacı (küçük, yuvarlak), selvi (ince-uzun)
  const TREES: [string, number, number][] = [['tree_oak', 6.6, 6.6], ['tree_default', 4.4, 4.2], ['tree_fat', 3.2, 3.0], ['tree-high-round', 2.4, 2.9]];
  for (const [x, z, kind, s] of D.trees as [number, number, string, number][]) {
    if (!inShowcase(x, z)) continue;
    const k = R.int(0, 9), v = R.range(0.8, 1.15) * s;
    const [n, sh, sv] = kind === 'cypress' ? TREES[3] : k < 4 ? TREES[0] : k < 6 ? TREES[1] : k < 8 ? TREES[2] : TREES[3];
    I.add(n, M(x, 0, z, R.range(0, 6), sh * v, sv * v, sh * v));
    if (!grassAt(x, z)) treeRing(deco, x, z);
  }
  for (const [x, z] of D.lamps as number[][]) if (inShowcase(x, z)) I.add('lantern', M(x, 0, z, 0, 2.5, 2.5, 2.5));
  for (const [x, z, ry] of D.benches as number[][]) if (inShowcase(x, z)) I.add('bench', at(M(x, 0, z, ry), M(-0.8, 0, 0.25, 0, 4, 2, 2.5)));

  // ---------- Sultan Ahmet Camii + avlu (eski yerleşimdeki yer ve ölçü) ----------
  const stone = wallTint('#efe6d6');
  I.add('cami', M(-2, 0, 255), stone);
  I.add('cami_avlu', M(-32.25, 0, 255), stone);
  I.add('ayasofya', M(88, 0, 186), wallTint('#d6a690'));

  // ---------- meydan çeşmesi (eski havuzun yerinde) ----------
  const [fx, fz] = D.fountains[0] as number[];
  I.add('cesme', M(fx, 0, fz, 0, 1.15, 1.15, 1.15), wallTint('#f1e7d6'));
  colliders.push({ x: fx, z: fz, hw: 3.3, hd: 3.3 });
  for (let k = 0; k < 4; k++) { const a = k * Math.PI / 2 + Math.PI / 4; I.add('pot_large', M(fx + Math.cos(a) * 5.4, 0, fz + Math.sin(a) * 5.4, a, 2.2, 2.2, 2.2)); I.add('plant_bushDetailed', M(fx + Math.cos(a) * 5.4, 0.25, fz + Math.sin(a) * 5.4, a, 3, 3, 3)); }

  // ---------- simit arabası (meydandaki simitçinin yanında) ----------
  for (const [vx, vz, vr] of D.vendors as number[][]) {
    if (!inShowcase(vx, vz)) continue;
    const ox = Math.sin(vr) * 1.2, oz = Math.cos(vr) * 1.2;
    I.add('simit_arabasi', M(vx + ox, 0, vz + oz, vr + Math.PI / 2, 0.8, 0.8, 0.8));
    colliders.push({ x: vx + ox, z: vz + oz, hw: 0.9, hd: 0.9 });
  }

  // ---------- çay ocağı + masalar (meydanın doğu kenarı, Gülhane Park Yolu'na bakar) ----------
  I.add('cay_ocagi', M(110, 0, 222, -Math.PI / 2)); colliders.push({ x: 110, z: 222, hw: 1.3, hd: 1.4 });
  for (const [x, z] of [[104.5, 218.5], [104.5, 225.5], [100, 222]]) { I.add('cay_masa', M(x, 0, z, R.range(0, 6))); colliders.push({ x, z, hw: 0.45, hd: 0.45 }); }

  const g = new THREE.Group();
  g.add(trims.mesh(new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.9 }), shadows));
  const [kc, kn] = kits.tex.kiremit;
  g.add(roofs.mesh(new THREE.MeshStandardMaterial({ vertexColors: true, map: kc, normalMap: kn, normalScale: new THREE.Vector2(1.4, 1.4), roughness: 0.8 }), shadows));
  g.add(curbs(D));

  // ---------- meydan düzeni: yürüme yolları, çeşme çevresi, çimen adacıkları ----------
  const ground = squareLayout(D, kits, deco, R, I);
  g.add(ground);

  // ---------- açılış sokağı (Sahil Sokağı): iki yanı evli/dükkânlı, simitçi, çay ocağı, kedi-köpek ----------
  const npcs: NpcSpawn[] = [];
  I.add('simit_arabasi', M(111, 0, 140.4, 0, 0.8, 0.8, 0.8)); colliders.push({ x: 111, z: 140.4, hw: 0.75, hd: 0.5 });
  npcs.push({ x: 111.2, z: 141.5, rot: 0.3, shirt: '#f4efe6', hat: 'kasket', role: 'Simitçi' });
  I.add('cay_ocagi', M(100, 0, 139.3, 0)); colliders.push({ x: 100, z: 139.3, hw: 1.3, hd: 1.0 });
  npcs.push({ x: 98.2, z: 140.5, rot: 0.4, shirt: '#ffffff', hat: null, role: 'Çaycı' });
  for (const [x, z] of [[98.6, 143.3], [102.4, 143.3]]) { I.add('cay_masa', M(x, 0, z, R.range(0, 6))); colliders.push({ x, z, hw: 0.45, hd: 0.45 }); }
  npcs.push({ x: 99.2, z: 144.0, rot: Math.PI, shirt: '#6b8fbf', hat: 'kasket', role: 'Müşteri', sit: true });
  npcs.push({ x: 102.9, z: 142.6, rot: -0.3, shirt: '#8e3b5a', hat: null, role: 'Müşteri', sit: true });
  I.add('pot_large', M(114.5, 0, 139.9, 0, 2, 2, 2)); I.add('flower_redA', M(114.5, 0.25, 139.9, 0, 3, 3, 3));
  I.add('pottedPlant', M(95.6, 0, 139.8, 0, 2.4, 2.4, 2.4));
  const strays: StraySpawn[] = [
    { id: 'v_tarcin', name: 'Tarçın', x: 114.5, z: 143.4, breed: '', look: { species: 'cat', body: '#e38a3a', belly: '#f6e3cf', mark: '#b5622a', pattern: 'tabby', size: 0.95 } },
    { id: 'v_karabas', name: 'Karabaş', x: 106.5, z: 142.9, breed: '', look: { species: 'dog', body: '#c9a273', belly: '#efe2cc', pattern: 'solid', size: 1.1, floppy: true } },
    { id: 'v_duman', name: 'Duman', x: 103.6, z: 140.9, breed: '', look: { species: 'cat', body: '#7d8590', belly: '#d9dde2', pattern: 'solid', size: 0.9 } },
  ];

  // ---------- gezinenler ve güvercinler ----------
  const [fcx, fcz] = D.fountains[0] as number[];
  const circle = (cx: number, cz: number, r: number, n: number, a0 = 0): [number, number][] => Array.from({ length: n }, (_, i) => [cx + Math.cos(a0 + i / n * 6.283) * r, cz + Math.sin(a0 + i / n * 6.283) * r]);
  const walkers: [number, number][][] = [
    circle(fcx, fcz, 11, 10),
    circle(fcx, fcz, 12.5, 10, 2.5).reverse(),
    [[56, 221.2], [112, 221.2], [112, 223], [56, 223]],
    [[41.2, 170], [41.2, 208], [43, 208], [43, 170]],
    [[60, 141.6], [118, 141.6], [118, 142.6], [60, 142.6]],
    [[-15, 223], [30, 223], [30, 221.4], [-15, 221.4]],
  ];
  const pigeons: [number, number][] = [];
  for (let i = 0; i < 16; i++) { const a = R.range(0, 6.28), r = R.range(5.2, 9); pigeons.push([fcx + Math.cos(a) * r, fcz + Math.sin(a) * r]); }
  for (let i = 0; i < 6; i++) pigeons.push([R.range(104, 116), R.range(141.2, 143.8)]);

  g.add(I.build(shadows));
  return { group: g, colliders, fountainR: 4.6, spawn: new THREE.Vector3(120, 0, 142.2), spawnYaw: -Math.PI / 2, strays, npcs, walkers, pigeons };
}

/** Kaldırım kenar taşı: kaldırım/meydan döşemesinin yola (arnavut kaldırımı) değdiği kenarlarda. */
function curbs(D: any): THREE.Mesh {
  const slabs = (D.grounds as any[][]).filter(g => g[5] !== 'cobble');
  const lots = (D.col as number[][]);
  const inside = (x: number, z: number) => slabs.some(g => x > g[0] && x < g[1] && z > g[2] && z < g[3]) || lots.some(c => x > c[0] && x < c[1] && z > c[2] && z < c[3]);
  const mg = new Merge();
  const run = (ax: number, az: number, bx: number, bz: number, ox: number, oz: number) => {
    const L = Math.hypot(bx - ax, bz - az), n = Math.ceil(L), ux = (bx - ax) / L, uz = (bz - az) / L;
    let s = -1;
    const flush = (e: number) => { if (s < 0) return; const l = e - s; if (l > 0.6) { const mx = ax + ux * (s + l / 2), mz = az + uz * (s + l / 2); mg.add(BOX, '#cfc8bb', M(mx - ox * 0.12, 0.06, mz - oz * 0.12, Math.atan2(ux, uz), 0.24, 0.12, l)); } s = -1; };
    for (let i = 0; i <= n; i++) {
      const t = Math.min(L, i), x = ax + ux * t + ox * 0.6, z = az + uz * t + oz * 0.6;
      const road = inShowcase(x, z) && !inside(x, z);
      if (road && s < 0) s = t; if (!road) flush(t);
    }
    flush(L);
  };
  for (const [x0, x1, z0, z1] of slabs) {
    if (x1 < SHOWCASE.x0 || x0 > SHOWCASE.x1 || z1 < SHOWCASE.z0 || z0 > SHOWCASE.z1) continue;
    run(x0, z0, x1, z0, 0, -1); run(x0, z1, x1, z1, 0, 1); run(x0, z0, x0, z1, -1, 0); run(x1, z0, x1, z1, 1, 0);
  }
  const m = mg.mesh(new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.9 }), false);
  return m;
}

// ---------- zemin süsleri ----------
const CURB = '#fbf3e6', SOIL = '#8c6a4c', GRASS = '#9ccc6e';

/** Ağaç dibi çemberi: alçak taş halka + toprak. */
function treeRing(mg: Merge, x: number, z: number, r = 1.15) {
  const ring = new THREE.Shape(); ring.absarc(0, 0, r, 0, Math.PI * 2, false);
  const hole = new THREE.Path(); hole.absarc(0, 0, r - 0.22, 0, Math.PI * 2, true); ring.holes.push(hole);
  const g = new THREE.ExtrudeGeometry(ring, { depth: 0.14, bevelEnabled: false, curveSegments: 18 });
  mg.add(g, CURB, new THREE.Matrix4().makeTranslation(x, 0, z).multiply(new THREE.Matrix4().makeRotationX(-Math.PI / 2)));
  mg.add(new THREE.CircleGeometry(r - 0.2, 18), SOIL, new THREE.Matrix4().makeTranslation(x, 0.07, z).multiply(new THREE.Matrix4().makeRotationX(-Math.PI / 2)));
}

function roundRect(w: number, d: number, r: number): THREE.Shape {
  const s = new THREE.Shape(), x = -w / 2, y = -d / 2;
  s.moveTo(x + r, y); s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r); s.lineTo(x + w, y + d - r);
  s.quadraticCurveTo(x + w, y + d, x + w - r, y + d); s.lineTo(x + r, y + d); s.quadraticCurveTo(x, y + d, x, y + d - r);
  s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y); return s;
}

/** Meydanı böler: kesme taş yürüme yolları (kenar çizgili), çeşme çevresinde halka, kenar taşlı çimen adacıkları. */
function squareLayout(D: any, kits: Kits, deco: Merge, R: ReturnType<typeof rng>, I: Instancer): THREE.Group {
  const g = new THREE.Group();
  const [fx, fz] = D.fountains[0] as number[];
  const [pc, pn] = kits.tex.plaka;
  const pathMat = new THREE.MeshStandardMaterial({ map: pc, normalMap: pn, normalScale: new THREE.Vector2(0.4, 0.4), roughness: 0.95, color: '#e8c9a2', polygonOffset: true, polygonOffsetFactor: -6, polygonOffsetUnits: -24 });
  const paths: THREE.BufferGeometry[] = [];
  const strip = (x0: number, z0: number, x1: number, z1: number) => {
    const w = x1 - x0, d = z1 - z0, geo = new THREE.PlaneGeometry(w, d);
    geo.rotateX(-Math.PI / 2); geo.translate((x0 + x1) / 2, 0.05, (z0 + z1) / 2);
    const p = geo.attributes.position as THREE.BufferAttribute, uv = geo.attributes.uv as THREE.BufferAttribute;
    for (let i = 0; i < p.count; i++) uv.setXY(i, (w > d ? p.getX(i) : p.getZ(i)) / 5, (w > d ? p.getZ(i) : p.getX(i)) / 5);
    paths.push(geo);
    // iki yanda gömme kenar taşı çizgisi
    if (w > d) { for (const zz of [z0, z1]) deco.add(BOX, CURB, M((x0 + x1) / 2, 0.07, zz, 0, w, 0.04, 0.3)); }
    else { for (const xx of [x0, x1]) deco.add(BOX, CURB, M(xx, 0.07, (z0 + z1) / 2, 0, 0.3, 0.04, d)); }
  };
  strip(fx + 9.6, fz - 2, 119, fz + 2);       // doğu (çay ocağına)
  strip(-17, fz - 2, fx - 9.6, fz + 2);       // batı (cami avlusuna)
  strip(fx - 2, 166, fx + 2, fz - 9.6);       // kuzey (Ayasofya yönü)
  strip(fx - 2, fz + 9.6, fx + 2, 279);       // güney
  // çeşme çevresinde halka yol
  const ring = new THREE.RingGeometry(4.0, 9.6, 48, 1); ring.rotateX(-Math.PI / 2); ring.translate(fx, 0.05, fz);
  const rp = ring.attributes.position as THREE.BufferAttribute, ruv = ring.attributes.uv as THREE.BufferAttribute;
  for (let i = 0; i < rp.count; i++) ruv.setXY(i, rp.getX(i) / 5, rp.getZ(i) / 5);
  paths.push(ring);
  for (const r of [4.0, 9.6]) { const t = new THREE.TorusGeometry(r, 0.15, 3, 64); t.rotateX(Math.PI / 2); deco.add(t, CURB, M(fx, 0.03, fz)); }
  const pm = new THREE.Mesh(mergeGeometries(paths)!, pathMat); pm.receiveShadow = true; g.add(pm);

  // çimen adacıkları (engel, yol, bank, fener üstüne gelmeyecek şekilde)
  const cols = (D.col as number[][]), pts = ([] as number[][]).concat(D.lamps, D.benches);
  const free = (x: number, z: number, w: number, d: number) =>
    !cols.some(c => x + w / 2 + 1 > c[0] && x - w / 2 - 1 < c[1] && z + d / 2 + 1 > c[2] && z - d / 2 - 1 < c[3]) &&
    !pts.some(p => Math.abs(p[0] - x) < w / 2 + 1 && Math.abs(p[1] - z) < d / 2 + 1) &&
    !(D.grounds as any[][]).some(gg => gg[5] === 'grass' && x + w / 2 > gg[0] && x - w / 2 < gg[1] && z + d / 2 > gg[2] && z - d / 2 < gg[3]) &&
    Math.abs(z - fz) > d / 2 + 2.5 && Math.abs(x - fx) > w / 2 + 2.5 && Math.hypot(x - fx, z - fz) > 12;
  const grassMat = new THREE.MeshStandardMaterial({ color: GRASS, roughness: 1 });
  const cands: [number, number, number, number][] = [[75, 212, 13, 5], [95, 212, 9, 5], [10, 213, 14, 6], [10, 231, 14, 5], [70, 230, 10, 5], [100, 230, 10, 5], [26, 196, 10, 6], [60, 196, 8, 6], [-8, 196, 12, 6]];
  for (const [x, z, w, d] of cands) {
    if (!free(x, z, w, d)) continue;
    const sh = roundRect(w, d, 1.2);
    const top = new THREE.ShapeGeometry(sh, 6); top.rotateX(-Math.PI / 2);
    const m = new THREE.Mesh(top, grassMat); m.position.set(x, 0.12, z); m.receiveShadow = true; g.add(m);
    const border = roundRect(w + 0.5, d + 0.5, 1.45); border.holes.push(roundRect(w, d, 1.2) as unknown as THREE.Path);
    const bg = new THREE.ExtrudeGeometry(border, { depth: 0.16, bevelEnabled: false, curveSegments: 6 });
    deco.add(bg, CURB, new THREE.Matrix4().makeTranslation(x, 0, z).multiply(new THREE.Matrix4().makeRotationX(-Math.PI / 2)));
    for (let k = 0, n = Math.round(w * d / 9); k < n; k++)
      I.add(R.pick(['flower_redA', 'flower_yellowA', 'flower_purpleA', 'plant_bush', 'plant_bushDetailed']), M(x + R.range(-w / 2 + 0.8, w / 2 - 0.8), 0.12, z + R.range(-d / 2 + 0.8, d / 2 - 0.8), R.range(0, 6), 3, 3, 3));
    if (w >= 12) I.add('tree_fat', M(x, 0.12, z, R.range(0, 6), 2.8, 2.6, 2.8));
  }
  const dm = deco.mesh(new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.92 }), false);
  dm.material.polygonOffset = true; (dm.material as THREE.Material).polygonOffsetFactor = -8; (dm.material as THREE.Material).polygonOffsetUnits = -30;
  g.add(dm);
  return g;
}
