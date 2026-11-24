// İstanbul haritası: eski Godot sürümünün (tools/build_map.gd) yerleşimi BİREBİR.
// Veri: data/istanbul.json  <-  web/tools/convert-old-map.cjs (eski üreticinin kayıt dökümü).
// Evlerin yeri, eni, derinliği, yönü, kat sayısı, rengi, dükkan olup olmadığı eskisiyle aynı;
// yalnız görünüş yeni stilde (pencere dokuları, cumba, balkon, tente, kiremit çatı).
import * as THREE from 'three';
import DATA from './data/istanbul.json';
import { Batch, M, TEX, blob, hipRoof, rng } from './kit';
import { bench, ferry, lamp, laundryLine } from './props';
import type { Rect, WorldData, StraySpawn, NpcSpawn } from './world';
import type { Kits } from './assets';
import { buildShowcase, inShowcase, primReplaced } from './showcase';

type House = [number, number, number, number, number, number, number, string, string, string];
type Prim = [string, number, number, number, string, number, number, number, number, number, number, string];
type Wall = [number, number, number, number, number, number, string, number, string];
const D = DATA as any;

const ROOF = ['#b4573d', '#a24a34', '#9a5a44', '#b9623f'];
const AWN = ['#c8423a', '#2f7d6d', '#e2a33b', '#3b6aa8', '#8e3b5a'];
const C = (h: string) => new THREE.Color(h.startsWith('#') ? h : '#' + h);
const shade = (h: string, k: number) => '#' + C(h).multiplyScalar(k).getHexString();
const rect = ([x0, x1, z0, z1]: number[]): Rect => ({ x: (x0 + x1) / 2, z: (z0 + z1) / 2, hw: (x1 - x0) / 2, hd: (z1 - z0) / 2 });

// ---------- eski ilkel şekiller (Godot PrimitiveMesh karşılıkları) ----------
const primCache = new Map<string, THREE.BufferGeometry>();
function prim(name: string): THREE.BufferGeometry {
  if (primCache.has(name)) return primCache.get(name)!;
  let g: THREE.BufferGeometry;
  switch (name) {
    case 'cyl': g = new THREE.CylinderGeometry(1, 1, 1, 20, 1); break;
    case 'cyl8': g = new THREE.CylinderGeometry(1, 1, 1, 8, 1); break;
    case 'cone': g = new THREE.CylinderGeometry(0, 1, 1, 16, 1); break;
    case 'cone8': g = new THREE.CylinderGeometry(0, 1, 1, 8, 1); break;
    case 'dome': g = new THREE.SphereGeometry(1, 28, 9, 0, Math.PI * 2, 0, Math.PI / 2); break;
    case 'ico': g = new THREE.SphereGeometry(1, 7, 4); break;
    case 'ball': g = new THREE.SphereGeometry(1, 12, 6); break;
    case 'pyr': g = new THREE.ConeGeometry(Math.SQRT1_2, 1, 4, 1); g.rotateY(Math.PI / 4); g.translate(0, 0.5, 0); break;
    case 'hip': {
      const a = [-0.5, 0, -0.5], b = [0.5, 0, -0.5], c = [0.5, 0, 0.5], d = [-0.5, 0, 0.5], t1 = [-0.2, 1, 0], t2 = [0.2, 1, 0];
      const tris = [[a, b, t2], [a, t2, t1], [c, d, t1], [c, t1, t2], [b, c, t2], [d, a, t1]];
      const pos: number[] = [];
      for (const t of tris) {
        const p0 = new THREE.Vector3().fromArray(t[0]), p1 = new THREE.Vector3().fromArray(t[1]), p2 = new THREE.Vector3().fromArray(t[2]);
        const n = p1.clone().sub(p0).cross(p2.clone().sub(p0));
        const cen = p0.clone().add(p1).add(p2).divideScalar(3).sub(new THREE.Vector3(0, 0.2, 0));
        if (n.dot(cen) < 0) pos.push(...t[0], ...t[2], ...t[1]); else pos.push(...t[0], ...t[1], ...t[2]);
      }
      g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.computeVertexNormals();
      break;
    }
    default: g = new THREE.BoxGeometry(1, 1, 1);
  }
  primCache.set(name, g);
  return g;
}

/** Duvar kutusu: 4 cephe ayrı malzeme anahtarıyla, UV modül sayısına göre (eski wall_box gibi). Ön = -z. */
function wallBox(b: Batch, base: THREE.Matrix4, keys: [string, string, string, string], w: number, h: number, d: number, y0: number, col: string, mw: number, mh: number, mwFront = mw, top = false) {
  const faces: [number, number, number, number, number][] = [
    [w, 0, -d / 2, Math.PI, 0], [w, 0, d / 2, 0, 1], [d, w / 2, 0, Math.PI / 2, 2], [d, -w / 2, 0, -Math.PI / 2, 3],
  ];
  for (const [fw, x, z, ry, ki] of faces) {
    const g = new THREE.PlaneGeometry(fw, h);
    const reps = Math.max(1, Math.round(fw / (ki === 0 ? mwFront : mw)));
    const uv = g.attributes.uv as THREE.BufferAttribute;
    for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * reps, uv.getY(i) * (h / mh));
    b.add(keys[ki], g, col, new THREE.Matrix4().multiplyMatrices(base, M(x, y0 + h / 2, z, ry)));
  }
  if (top) b.add('plain', new THREE.PlaneGeometry(w, d), col, new THREE.Matrix4().multiplyMatrices(base, M(0, y0 + h, 0, 0, 1, 1, 1, -Math.PI / 2)));
}

function oldHouse(b: Batch, h: House, R: ReturnType<typeof rng>) {
  const [cx, cz, w, d, ry, floors, shopN, kind, colH, wk0] = h;
  const shop = shopN === 1;
  const col = '#' + colH;
  const gf = 3.4, fh = 3.0, H = gf + (floors - 1) * fh;
  const base = M(cx, 0, cz, ry);
  const at = (m: THREE.Matrix4) => new THREE.Matrix4().multiplyMatrices(base, m);
  const box = (key: string, c: string, bw: number, bh: number, bd: number, x: number, y: number, z: number, rx = 0) => b.add(key, new THREE.BoxGeometry(bw, bh, bd), c, at(M(x, y, z, 0, 1, 1, 1, rx)));
  const wood = kind === 'ahsap', brick = kind === 'tugla';
  const wk = wood ? (R.chance(0.5) ? 'win_a' : 'win_d') : wk0 === 'win_a' && R.chance(0.35) ? 'win_d' : wk0;
  const gcol = wood ? R.pick(['#cfc3ad', '#bfb39c', '#d8cdb6']) : shade(col, 0.93);
  const trim = brick ? '#d8cfc0' : shade(col, wood ? 0.7 : 0.78);

  // zemin kat (ön: dükkan vitrini ya da pencere; kapı ayrıca 3B) + üst katlar
  wallBox(b, base, [shop ? 'shop' : 'gf', 'gf', 'gf', 'gf'], w - 0.04, gf, d, 0, gcol, 2.6, gf, shop ? 4.2 : 2.6);
  if (floors > 1) wallBox(b, base, [wk, wk, wk, wk], w - 0.04, H - gf, d, gf, col, 2.6, fh);
  box('plain', '#b9ab98', w + 0.06, 0.45, d + 0.06, 0, 0.22, 0);
  box('plain', trim, w + 0.04, 0.2, d + 0.24, 0, gf, 0);
  box('plain', trim, w + 0.22, 0.24, d + 0.22, 0, H, 0);
  for (const sx of [-1, 1]) box('plain', trim, 0.22, H - 0.4, 0.08, sx * (w / 2 - 0.11), H / 2 + 0.2, -d / 2 - 0.03);

  if (!shop) { // kapı
    const dx = R.range(-w / 4, w / 4);
    box('plain', trim, 1.45, 2.65, 0.12, dx, 1.32, -d / 2 - 0.04);
    box('wood', R.pick(['#6b4630', '#2f5d62', '#8a3b3b', '#4a5d3a', '#7a4b2e']), 1.1, 2.3, 0.1, dx, 1.2, -d / 2 - 0.08);
    box('plain', '#bdb3a4', 1.7, 0.16, 0.6, dx, 0.08, -d / 2 - 0.3);
  } else { // çizgili tente
    const aw = R.pick(AWN), sw = Math.min(w - 0.6, 6.5);
    const g = new THREE.BoxGeometry(sw, 0.06, 1.5);
    const uv = g.attributes.uv as THREE.BufferAttribute; for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * sw / 1.6, uv.getY(i));
    b.add('awning', g, aw, at(M(0, gf - 0.35, -d / 2 - 0.65, 0, 1, 1, 1, -0.4)));
    const v = new THREE.BoxGeometry(sw, 0.3, 0.04); const uv2 = v.attributes.uv as THREE.BufferAttribute; for (let i = 0; i < uv2.count; i++) uv2.setXY(i, uv2.getX(i) * sw / 1.6, uv2.getY(i));
    b.add('awning', v, aw, at(M(0, gf - 0.78, -d / 2 - 1.34)));
  }

  // cumba (ahşap evlerde daha sık) ya da balkon
  const cumbaW = Math.min(3.2, w - 1.6);
  if (floors >= 3 && cumbaW > 1.8 && R.chance(wood ? 0.65 : 0.35)) {
    const ch = H - gf - 0.4, cd = 0.9, ccol = wood ? col : (R.chance(0.5) ? col : shade(col, 1.08));
    const cb = new THREE.Matrix4().multiplyMatrices(base, M(0, 0, -d / 2 - cd / 2));
    wallBox(b, cb, [wk, wk, wk, wk], cumbaW, ch, cd, gf + 0.2, ccol, 1.6, fh, 1.6);
    b.add('plain', new THREE.BoxGeometry(cumbaW + 0.1, 0.14, cd + 0.08), trim, at(M(0, gf + 0.2, -d / 2 - cd / 2)));
    b.add('roof', hipRoof(cumbaW + 0.3, cd + 0.3, 0.4), R.pick(ROOF), at(M(0, gf + 0.2 + ch, -d / 2 - cd / 2)));
    for (const sx of [-0.38, 0, 0.38]) box('wood', '#7a4f36', 0.16, 0.7, 0.16, sx * cumbaW, gf - 0.1, -d / 2 - 0.45, 0.6);
  } else if (floors >= 2 && !wood && R.chance(0.3)) {
    const bw = Math.min(w - 1.2, 3.4);
    for (let f = 1; f < floors; f++) {
      const y = gf + (f - 1) * fh;
      box('plain', trim, bw, 0.14, 0.85, 0, y + 0.07, -d / 2 - 0.42);
      box('plain', '#2f3235', bw, 0.05, 0.05, 0, y + 1.0, -d / 2 - 0.82);
      for (const sx of [-1, 1]) box('plain', '#2f3235', 0.05, 0.05, 0.85, sx * bw / 2, y + 1.0, -d / 2 - 0.42);
      const n = Math.round(bw / 0.3);
      for (let i = 0; i <= n; i++) box('plain', '#2f3235', 0.03, 0.9, 0.03, -bw / 2 + i * bw / n, y + 0.55, -d / 2 - 0.82);
      if (R.chance(0.7)) for (let i = 0; i < 2; i++) {
        const px = R.range(-bw / 2 + 0.3, bw / 2 - 0.3);
        box('plain', '#c0603e', 0.26, 0.26, 0.26, px, y + 0.27, -d / 2 - 0.6);
        b.add('leaf', new THREE.IcosahedronGeometry(0.22, 0), R.chance(0.5) ? '#5f9a4a' : R.pick(['#e2493b', '#f28aa5', '#f2c94c']), at(M(px, y + 0.55, -d / 2 - 0.6)));
      }
    }
  }
  // kiremit çatı + baca
  b.add('roof', hipRoof(w + 0.6, d + 0.6, R.range(1.1, 1.7)), R.pick(ROOF), at(M(0, H + 0.12, 0)));
  if (R.chance(0.3)) { const x = R.range(-w / 3, w / 3), z = R.range(-d / 4, d / 4); box('plaster', '#b9654a', 0.4, 1.5, 0.4, x, H + 0.9, z); box('plain', '#7a3b2a', 0.5, 0.1, 0.5, x, H + 1.68, z); }
}

function tree(b: Batch, x: number, z: number, kind: string, s: number, R: ReturnType<typeof rng>) {
  if (kind === 'cypress') {
    b.add('plain', new THREE.CylinderGeometry(0.18 * s, 0.22 * s, 1.4 * s, 8), '#5a4630', M(x, 0.7 * s, z));
    b.add('leaf', new THREE.CylinderGeometry(0.05, 1.0 * s, 7.2 * s, 10), '#3a5a34', M(x, 4.6 * s, z));
    b.add('leaf', new THREE.CylinderGeometry(0.1, 1.15 * s, 4.8 * s, 10), '#44683b', M(x, 3.6 * s, z));
    return;
  }
  b.add('plain', new THREE.CylinderGeometry(0.22 * s, 0.34 * s, 4.2 * s, 8), '#7a6a52', M(x, 2.1 * s, z));
  const col = R.pick(['#6fa34f', '#5f9a4a', '#7fb35a', '#5c8a3c']);
  for (let k = 0; k < 4; k++) {
    const a = k * 2.1 + R.next(), rad = k === 3 ? 0 : 1.3 * s;
    b.add('leaf', blob((k === 3 ? 2.0 : 1.7) * s, R.int(1, 9999), 1), new THREE.Color(col).offsetHSL(0, 0, R.range(-0.05, 0.05)), M(x + Math.cos(a) * rad, (k === 3 ? 6.0 : 4.4 + R.next() * 1.2) * s, z + Math.sin(a) * rad));
  }
}

/** Sokak hayvanı: eski verideki renk, desen ve boy aynen. */
function strayLook(a: any[]): StraySpawn {
  const [id, cat, col, name, x, z, , , pattern, col2, size] = a;
  const pat = ({ smokin: 'tuxedo', tekir: 'tabby', uc_renk: 'calico', benek: 'spots' } as Record<string, string>)[pattern] ?? 'solid';
  const c = new THREE.Color(col);
  return {
    id, name, x, z, breed: '',
    look: {
      species: cat ? 'cat' : 'dog', body: col,
      belly: col2 || '#' + c.clone().lerp(new THREE.Color('#f4efe6'), 0.55).getHexString(),
      mark: pat === 'tabby' ? '#' + c.clone().multiplyScalar(0.55).getHexString() : pat === 'calico' ? '#e38a3a' : pat === 'spots' ? '#2a2422' : undefined,
      pattern: pat as any, size: size ?? 1, floppy: !cat && (size ?? 1) > 1.05,
      ear: cat ? 'up' : (size ?? 1) > 1.05 ? 'floppy' : 'semi', tailStyle: cat ? 'cat' : 'curl', chub: 0.9 + ((id.length * 7) % 5) * 0.08,
    },
  };
}

export function buildIstanbul(mats: Record<string, THREE.Material>, lowEnd: boolean, kits?: Kits | null): WorldData {
  const R = rng(2027);
  const root = new THREE.Group();
  if (kits) { // kalan ilkel şekiller (meydan süsleri, surlar, tramvay vb.) aynı düz-gölgeli low-poly malzemeyle
    const flat = (o: THREE.MeshStandardMaterialParameters = {}) => new THREE.MeshStandardMaterial({ vertexColors: true, flatShading: true, roughness: 0.85, ...o });
    mats = { ...mats, plain: flat(), roof: flat(), plaster: flat(), wood: flat(), leaf: flat(), far: flat(), gold: flat({ roughness: 0.35, metalness: 0.55 }) };
  }
  const b = new Batch(mats, { plaster: 3, wood: 1.2, roof: -1.4 });
  b.tile = true;

  // zemin katmanları: z-fighting olmasın diye her katman ayrı yükseklik + polygonOffset
  const texFor: Record<string, () => THREE.Texture> = { cobble: TEX.cobble, slab: TEX.slab, grass: TEX.grass, wood: TEX.wood };
  const tileFor: Record<string, number> = { cobble: 4, slab: 4, grass: 5, wood: 2 };
  const layer: Record<string, number> = { cobble: 0, slab: 1, grass: 2, wood: 3 };
  const groundMats = new Map<string, THREE.MeshLambertMaterial>();
  for (const [x0, x1, z0, z1, y, key, col] of D.grounds as [number, number, number, number, number, string, string][]) {
    const L = layer[key] ?? 1, mk = key + col;
    if (!groundMats.has(mk) && kits) {
      // gerçek dokulu zemin (ambientCG): yol = arnavut kaldırımı, meydan = yelpaze taş, kaldırım = kesme taş
      const [c, n] = key === 'cobble' ? kits.tex.yol : key === 'slab' && col === 'ffffff' ? kits.tex.meydan : key === 'slab' ? kits.tex.plaka : [null, null];
      if (c) {
        const rep = key === 'cobble' ? 3.2 : key === 'slab' && col === 'ffffff' ? 7 : 5;
        const cc = c.clone(), nn = n!.clone(); cc.repeat.set(1 / rep, 1 / rep); nn.repeat.set(1 / rep, 1 / rep); cc.needsUpdate = nn.needsUpdate = true;
        const tint = col === '77746f' ? '#9a948a' : '#ffffff';
        groundMats.set(mk, new THREE.MeshStandardMaterial({ map: cc, normalMap: nn, normalScale: new THREE.Vector2(0.45, 0.45), roughness: 0.95, color: tint, polygonOffset: true, polygonOffsetFactor: -L, polygonOffsetUnits: -L * 4 }) as any);
      }
    }
    if (!groundMats.has(mk) && kits) groundMats.set(mk, new THREE.MeshStandardMaterial({ color: key === 'grass' ? '#9ccc6e' : key === 'wood' ? '#b98a5e' : '#' + col, roughness: 0.95, polygonOffset: true, polygonOffsetFactor: -L, polygonOffsetUnits: -L * 4 }) as any);
    if (!groundMats.has(mk)) {
      const t = (texFor[key] ?? TEX.slab)(); t.repeat.set(1 / (tileFor[key] ?? 4), 1 / (tileFor[key] ?? 4));
      groundMats.set(mk, new THREE.MeshLambertMaterial({ map: t, color: '#' + col, polygonOffset: true, polygonOffsetFactor: -L, polygonOffsetUnits: -L * 4 }));
    }
    const geo = new THREE.PlaneGeometry(x1 - x0, z1 - z0);
    const uv = geo.attributes.uv as THREE.BufferAttribute, p = geo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < uv.count; i++) uv.setXY(i, p.getX(i) + (x0 + x1) / 2, -p.getY(i) + (z0 + z1) / 2);
    const m = new THREE.Mesh(geo, groundMats.get(mk)!);
    m.rotation.x = -Math.PI / 2; m.position.set((x0 + x1) / 2, y + L * 0.012, (z0 + z1) / 2); m.receiveShadow = true;
    root.add(m);
  }

  for (const h of D.houses as House[]) if (!kits || !inShowcase(h[0], h[1])) oldHouse(b, h, R);

  for (const [ww, hh, dd, x, y, z, col, ry, key] of D.walls as Wall[]) {
    if (kits && inShowcase(x, z)) continue;
    const k = key === 'shop' ? 'shop' : ['win_a', 'win_b', 'win_c'].includes(key) ? key : 'gf';
    wallBox(b, M(x, 0, z, ry), [k, k, k, k], ww, hh, dd, y, '#' + col, 2.6, 3.0, 2.6, true);
  }

  const keyMap: Record<string, string> = { plain: 'plain', roof: 'roof', gold: 'gold', stonewall: 'plaster' };
  for (const [name, x, y, z, col, rx, ry, rz, sx, sy, sz, key] of D.prims as Prim[]) {
    if (kits && primReplaced(x, z)) continue;
    if (kits && name.startsWith('cyl') && Math.abs(rx - 1.57) < 0.05 && sx > 4.5 && sx < 4.9) continue; // İstiklal pasaj kemeri: yeni cephelerin önünde dev disk gibi kalıyordu
    const m = new THREE.Matrix4().compose(new THREE.Vector3(x, y, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(rx, ry, rz, 'YXZ')), new THREE.Vector3(sx, sy, sz));
    b.add(keyMap[key] ?? 'plain', prim(name), '#' + col, m);
  }

  const [fx0, fz0] = D.fountains[0] as number[];
  const colliders: Rect[] = (D.col as number[][]).map(rect).filter(r => !kits || !(Math.abs(r.x - fx0) < 1 && Math.abs(r.z - fz0) < 1));
  const lots = colliders.slice();
  for (const [x, z, kind, s] of D.trees as [number, number, string, number][]) { if (!kits || !inShowcase(x, z)) tree(b, x, z, kind, s, R); colliders.push({ x, z, hw: 0.4 * s, hd: 0.4 * s }); }
  for (const [x, z] of D.lamps as number[][]) if (!kits || !inShowcase(x, z)) lamp(b, x, z, 1.4);
  for (const [x, z, ry] of D.benches as number[][]) if (!kits || !inShowcase(x, z)) bench(b, x, z, ry);
  let fountainR = 3.2;
  const sc = kits ? buildShowcase(D, kits, !lowEnd) : null;
  if (sc) { root.add(sc.group); colliders.push(...sc.colliders); fountainR = sc.fountainR; }

  // su
  const seaTex = waterTex();
  const seaMat = new THREE.MeshPhongMaterial({ color: '#3f9cc4', specular: '#cfefff', shininess: 70, bumpMap: seaTex, bumpScale: 0.6 });
  seaTex.repeat.set(1 / 8, 1 / 8);
  const sea = new THREE.Mesh(new THREE.PlaneGeometry(1600, 1600), seaMat);
  const suv = sea.geometry.attributes.uv as THREE.BufferAttribute, sp = sea.geometry.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < suv.count; i++) suv.setXY(i, sp.getX(i), -sp.getY(i));
  sea.rotation.x = -Math.PI / 2; sea.position.set(0, -0.65, 0); root.add(sea);

  root.add(b.build(!lowEnd));

  const laundry: THREE.Object3D[] = [];
  for (const [x, za, zb, y] of D.laundry as number[][]) { const l = laundryLine(new THREE.Vector3(x, y, za), new THREE.Vector3(x, y, zb), R); root.add(l); laundry.push(l); }

  const boat = ferry(); boat.position.set(268, -0.7, 0); boat.rotation.y = Math.PI / 2; root.add(boat);

  const [bx, bz, bw, bh] = D.bounds as number[];
  const start = D.start as number[];
  const fountains = (D.fountains as number[][]).map(([x, z]) => new THREE.Vector3(x, 0, z));
  return {
    root, colliders, laundry, sea: seaTex, boat,
    bounds: { x0: bx, x1: bx + bw, z0: bz, z1: bz + bh },
    lands: (D.lands as number[][]).concat([D.bridge, D.pier]).map(([x0, x1, z0, z1]) => ({ x0, x1, z0, z1 })),
    spawn: sc ? sc.spawn : new THREE.Vector3(start[0], 0, start[1]),
    spawnYaw: sc ? sc.spawnYaw : start[2],
    walkers: sc?.walkers, pigeons: sc?.pigeons, tiles: sc?.tiles, lamps: sc ? (D.lamps as [number, number][]) : undefined, lampH: 3.45,
    fountain: fountains[0], fountains, fountainR,
    strays: (D.animals as any[][]).filter(a => (a[6] ?? 0) < 0.5).map(strayLook).concat(sc?.strays ?? []),
    npcs: (D.vendors as number[][]).map(([x, z, ry]): NpcSpawn => ({ x, z, rot: ry, shirt: '#f4efe6', hat: 'kasket', role: 'Simitçi' })).concat(sc?.npcs ?? []),
    open: (D.roads as any[][]).map(([, x0, x1, z0, z1]) => rect([x0, x1, z0, z1])),
    lots,
    water: (D.water as number[][]).map(rect),
    parks: (D.grounds as any[][]).filter(g => g[5] === 'grass').map(g => rect(g)),
    landmarks: (D.landmarks as any[][]).map(([name, x, z]) => ({ name, x, z })),
  };
}

function waterTex(): THREE.CanvasTexture {
  const c = document.createElement('canvas'); c.width = c.height = 128;
  const g = c.getContext('2d')!; g.fillStyle = '#808080'; g.fillRect(0, 0, 128, 128);
  const r = rng(77);
  for (let i = 0; i < 160; i++) { g.strokeStyle = `rgba(255,255,255,${r.range(0.1, 0.4)})`; g.lineWidth = r.range(1, 3); const x = r.int(0, 128), y = r.int(0, 128), l = r.int(6, 20); g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x + l / 2, y - 3, x + l, y); g.stroke(); }
  const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; return t;
}
