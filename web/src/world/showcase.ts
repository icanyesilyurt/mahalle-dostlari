// VİTRİN: açılış noktası çevresini (Sultanahmet meydanı + kuzeydeki ev sırası + doğudaki Gülhane Park Yolu)
// hazır modellerle kurar. Yerleşim verisi aynı (data/istanbul.json); yalnız görünüş değişir.
// Binalar Kenney "Modular Buildings" parçalarından, evin eni/derinliği/kat sayısına göre birleştirilir.
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { Instancer, Kits, wallTint } from './assets';
import { M, rng } from './kit';
import type { Rect } from './world';

/** Vitrin bölgesi (dünya koordinatı). */
export const SHOWCASE = { x0: -60, x1: 190, z0: 138, z1: 300 };
export const inShowcase = (x: number, z: number) => x >= SHOWCASE.x0 && x <= SHOWCASE.x1 && z >= SHOWCASE.z0 && z <= SHOWCASE.z1;
/** Sultan Ahmet Camii + avlusu ve meydan çeşmesinin eski ilkel şekilleri bu kutulardan atılır. */
export const REPLACED_PRIMS = [
  { x0: -47, x1: 22, z0: 232, z1: 279 },   // cami + avlu + 4 minare
  { x0: 33, x1: 51, z0: 213, z1: 231 },    // meydan çeşmesi
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

export interface ShowcaseOut { group: THREE.Group; colliders: Rect[]; fountainR: number }

export function buildShowcase(D: any, kits: Kits, shadows: boolean): ShowcaseOut {
  const R = rng(4242);
  const I = new Instancer(kits);
  const trims = new Merge(), roofs = new Merge();
  const colliders: Rect[] = [];
  const at = (base: THREE.Matrix4, m: THREE.Matrix4) => new THREE.Matrix4().multiplyMatrices(base, m);

  // ---------- evler ----------
  const houses = (D.houses as House[]).filter(h => inShowcase(h[0], h[1]));
  for (const h of houses) {
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
  }

  // ---------- ağaç, fener, bank ----------
  for (const [x, z, kind, s] of D.trees as [number, number, string, number][]) {
    if (!inShowcase(x, z)) continue;
    if (kind === 'cypress') I.add('tree-high-round', M(x, 0, z, R.range(0, 6), 3.2 * s, 3.4 * s, 3.2 * s));
    else I.add(R.chance(0.6) ? 'tree_oak' : 'tree_default', M(x, 0, z, R.range(0, 6), 6.5 * s, 6.2 * s, 6.5 * s));
  }
  for (const [x, z] of D.lamps as number[][]) if (inShowcase(x, z)) I.add('lantern', M(x, 0, z, 0, 2.5, 2.5, 2.5));
  for (const [x, z, ry] of D.benches as number[][]) if (inShowcase(x, z)) I.add('bench', at(M(x, 0, z, ry), M(-0.8, 0, 0.25, 0, 4, 2, 2.5)));

  // ---------- Sultan Ahmet Camii + avlu (eski yerleşimdeki yer ve ölçü) ----------
  const stone = wallTint('#efe6d6');
  I.add('cami', M(-2, 0, 255), stone);
  I.add('cami_avlu', M(-32.25, 0, 255), stone);

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
  g.add(I.build(shadows));
  g.add(trims.mesh(new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.9 }), shadows));
  const [kc, kn] = kits.tex.kiremit;
  g.add(roofs.mesh(new THREE.MeshStandardMaterial({ vertexColors: true, map: kc, normalMap: kn, normalScale: new THREE.Vector2(1.4, 1.4), roughness: 0.8 }), shadows));
  g.add(curbs(D));
  return { group: g, colliders, fountainR: 4.6 };
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
