// Dünya yapım kiti: tohumlu rastgele, kanvas dokular, geometri birleştirici (az çizim çağrısı = mobilde akıcı).
import * as THREE from 'three';
import { mergeGeometries, mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

export function rng(seed: number) {
  let s = seed >>> 0 || 1;
  const f = () => { s ^= s << 13; s ^= s >>> 17; s ^= s << 5; return ((s >>> 0) % 100000) / 100000; };
  return {
    next: f,
    range: (a: number, b: number) => a + (b - a) * f(),
    int: (a: number, b: number) => Math.floor(a + (b - a + 1) * f()),
    pick: <T>(arr: T[]): T => arr[Math.floor(f() * arr.length) % arr.length],
    chance: (p: number) => f() < p,
  };
}
export type Rng = ReturnType<typeof rng>;

// ---------- Kanvas dokuları ----------
function canvas(w: number, h: number, draw: (g: CanvasRenderingContext2D) => void, repeat = true): THREE.CanvasTexture {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  draw(c.getContext('2d')!);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  if (repeat) { t.wrapS = t.wrapT = THREE.RepeatWrapping; }
  t.anisotropy = 4;
  return t;
}

export const TEX = {
  plaster: () => canvas(256, 256, g => {
    g.fillStyle = '#f2f2f2'; g.fillRect(0, 0, 256, 256);
    const r = rng(11);
    for (let i = 0; i < 2600; i++) { const v = 215 + r.int(0, 40); g.fillStyle = `rgba(${v},${v},${v},0.35)`; g.fillRect(r.int(0, 255), r.int(0, 255), r.int(1, 4), r.int(1, 4)); }
    for (let i = 0; i < 30; i++) { g.fillStyle = 'rgba(200,190,180,0.10)'; g.beginPath(); g.arc(r.int(0, 255), r.int(0, 255), r.int(8, 30), 0, 7); g.fill(); }
  }),
  cobble: () => canvas(512, 512, g => {
    g.fillStyle = '#8f8478'; g.fillRect(0, 0, 512, 512);
    const r = rng(5); const s = 32;
    for (let y = 0; y < 512; y += s * 0.8) for (let x = -s; x < 512; x += s) {
      const ox = (Math.floor(y / (s * 0.8)) % 2) * s * 0.5;
      const v = r.int(150, 190), w = r.int(-12, 12);
      g.fillStyle = `rgb(${v + w + 10},${v + 2},${v - 14})`;
      g.beginPath(); (g as any).roundRect(x + ox + 2, y + 2, s - 4, s * 0.8 - 4, 9); g.fill();
      g.fillStyle = 'rgba(255,255,255,0.10)'; g.beginPath(); (g as any).roundRect(x + ox + 5, y + 4, s - 12, 6, 3); g.fill();
    }
  }),
  slab: () => canvas(256, 256, g => {
    g.fillStyle = '#cfc6b8'; g.fillRect(0, 0, 256, 256);
    const r = rng(9);
    for (let y = 0; y < 256; y += 64) for (let x = 0; x < 256; x += 64) {
      const v = r.int(205, 228); g.fillStyle = `rgb(${v},${v - 6},${v - 16})`; g.fillRect(x + 2, y + 2, 60, 60);
    }
  }),
  grass: () => canvas(256, 256, g => {
    g.fillStyle = '#7fae5a'; g.fillRect(0, 0, 256, 256);
    const r = rng(3);
    for (let i = 0; i < 3000; i++) { g.fillStyle = r.chance(0.5) ? 'rgba(150,196,100,0.5)' : 'rgba(96,140,70,0.45)'; g.fillRect(r.int(0, 255), r.int(0, 255), 2, r.int(2, 5)); }
    for (let i = 0; i < 40; i++) { g.fillStyle = r.pick(['#f6e27a', '#ffffff', '#f2a7b8']); g.beginPath(); g.arc(r.int(0, 255), r.int(0, 255), 1.8, 0, 7); g.fill(); }
  }),
  roof: () => canvas(128, 128, g => {
    g.fillStyle = '#ededed'; g.fillRect(0, 0, 128, 128);
    for (let y = 0; y < 128; y += 16) {
      g.fillStyle = 'rgba(0,0,0,0.20)'; g.fillRect(0, y + 13, 128, 3);
      for (let x = (y / 16) % 2 ? 0 : 8; x < 128; x += 16) { g.fillStyle = 'rgba(0,0,0,0.10)'; g.fillRect(x, y, 2, 14); }
      g.fillStyle = 'rgba(255,255,255,0.25)'; g.fillRect(0, y, 128, 3);
    }
  }),
  wood: () => canvas(128, 128, g => {
    g.fillStyle = '#e6e6e6'; g.fillRect(0, 0, 128, 128);
    const r = rng(21);
    for (let i = 0; i < 40; i++) { g.strokeStyle = `rgba(0,0,0,${r.range(0.04, 0.12)})`; g.lineWidth = r.range(1, 2.5); const y = r.int(0, 128); g.beginPath(); g.moveTo(0, y); g.bezierCurveTo(40, y + r.int(-6, 6), 80, y + r.int(-6, 6), 128, y); g.stroke(); }
  }),
  sky: () => canvas(4, 256, g => {
    const gr = g.createLinearGradient(0, 0, 0, 256);
    gr.addColorStop(0, '#7fb6e0'); gr.addColorStop(0.45, '#bcd9ea'); gr.addColorStop(0.75, '#f7dcc0'); gr.addColorStop(1, '#f5c9a2');
    g.fillStyle = gr; g.fillRect(0, 0, 4, 256);
  }, false),
  sign: (text: string, bg: string, fg = '#fff') => canvas(512, 128, g => {
    g.fillStyle = bg; (g as any).roundRect(0, 0, 512, 128, 26); g.fill();
    g.strokeStyle = 'rgba(255,255,255,0.6)'; g.lineWidth = 6; (g as any).roundRect(10, 10, 492, 108, 20); g.stroke();
    g.fillStyle = fg; g.font = '800 64px Baloo2, "Trebuchet MS", sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText(text, 256, 70);
  }, false),
};

// ---------- Geometri birleştirici ----------
const tmpN = new THREE.Vector3();
/** Dünya konumuna göre UV: dokular binadan binaya aynı ölçekte döşenir. */
function worldUV(geo: THREE.BufferGeometry, scale: number, roof = false) {
  const p = geo.attributes.position, n = geo.attributes.normal, uv = geo.attributes.uv as THREE.BufferAttribute;
  for (let i = 0; i < p.count; i++) {
    tmpN.set(n.getX(i), n.getY(i), n.getZ(i));
    const ax = Math.abs(tmpN.x), ay = Math.abs(tmpN.y), az = Math.abs(tmpN.z);
    let u: number, v: number;
    if (roof) { if (ax > az) { u = p.getZ(i); v = p.getX(i) + p.getY(i) * Math.sign(tmpN.x); } else { u = p.getX(i); v = p.getZ(i) + p.getY(i) * Math.sign(tmpN.z); } }
    else if (ay >= ax && ay >= az) { u = p.getX(i); v = p.getZ(i); }
    else if (ax >= az) { u = p.getZ(i); v = p.getY(i); }
    else { u = p.getX(i); v = p.getY(i); }
    uv.setXY(i, u / scale, v / scale);
  }
  uv.needsUpdate = true;
}

const tmpC = new THREE.Color();
export class Batch {
  private parts = new Map<string, THREE.BufferGeometry[]>();
  tile = false;
  constructor(public mats: Record<string, THREE.Material>, private uvScale: Record<string, number> = {}) {}

  add(key: string, geo: THREE.BufferGeometry, color: string | THREE.Color, m?: THREE.Matrix4, shade = 0) {
    let g = geo.index ? geo.toNonIndexed() : geo.clone();
    if (!g.attributes.uv) g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(g.attributes.position.count * 2), 2));
    if (!g.attributes.normal) g.computeVertexNormals();
    if (m) g.applyMatrix4(m);
    const sc = this.uvScale[key]; if (sc) worldUV(g, Math.abs(sc), sc < 0);
    tmpC.set(color as any);
    const cnt = g.attributes.position.count, cols = new Float32Array(cnt * 3);
    const ny = g.attributes.normal;
    for (let i = 0; i < cnt; i++) {
      // hafif "boyalı" his: alt yüzeyler biraz koyu (sahte ortam kapatma)
      const k = 1 - shade * (1 - Math.max(0, ny.getY(i)) ) * 0.5;
      cols[i * 3] = tmpC.r * k; cols[i * 3 + 1] = tmpC.g * k; cols[i * 3 + 2] = tmpC.b * k;
    }
    g.setAttribute('color', new THREE.BufferAttribute(cols, 3));
    for (const a of Object.keys(g.attributes)) if (!['position', 'normal', 'uv', 'color'].includes(a)) g.deleteAttribute(a);
    // 20 m'lik karolara böl: ekran/gölge dışındaki karolar hiç çizilmez
    g.computeBoundingBox(); const bb = g.boundingBox!;
    const tk = this.tile ? `|${Math.floor((bb.min.x + bb.max.x) / 2 / 20)}|${Math.floor((bb.min.z + bb.max.z) / 2 / 20)}` : '';
    const k2 = key + tk;
    if (!this.parts.has(k2)) this.parts.set(k2, []);
    this.parts.get(k2)!.push(g);
  }

  box(key: string, color: string, w: number, h: number, d: number, x: number, y: number, z: number, ry = 0, rx = 0, rz = 0) {
    const m = new THREE.Matrix4().compose(new THREE.Vector3(x, y, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(rx, ry, rz)), new THREE.Vector3(1, 1, 1));
    this.add(key, new THREE.BoxGeometry(w, h, d), color, m);
  }

  build(shadows = true): THREE.Group {
    const grp = new THREE.Group();
    for (const [k2, list] of this.parts) {
      const key = k2.split('|')[0];
      const merged = mergeGeometries(list, false);
      if (!merged) continue;
      merged.computeBoundingSphere();
      const mesh = new THREE.Mesh(merged, this.mats[key]);
      mesh.castShadow = shadows && key !== 'glass' && key !== 'ground';
      mesh.receiveShadow = true;
      mesh.name = k2;
      grp.add(mesh);
      list.forEach(g => g.dispose());
    }
    this.parts.clear();
    return grp;
  }
}

/** Matris yardımcıları */
export const M = (x: number, y: number, z: number, ry = 0, sx = 1, sy = 1, sz = 1, rx = 0, rz = 0) =>
  new THREE.Matrix4().compose(new THREE.Vector3(x, y, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(rx, ry, rz)), new THREE.Vector3(sx, sy, sz));

/** Kalça çatı (dört eğimli yüz) – İstanbul evlerinin kiremit çatısı. */
export function hipRoof(w: number, d: number, h: number): THREE.BufferGeometry {
  const hw = w / 2, hd = d / 2;
  const A = [-hw, 0, -hd], B = [hw, 0, -hd], Cc = [hw, 0, hd], Dd = [-hw, 0, hd];
  let quads: number[][][];
  if (w >= d) {
    const r = (w - d) / 2; const R1 = [-r, h, 0], R2 = [r, h, 0];
    quads = [[A, B, R2, R1], [Cc, Dd, R1, R2], [Dd, A, R1], [B, Cc, R2]];
  } else {
    const r = (d - w) / 2; const R1 = [0, h, -r], R2 = [0, h, r];
    quads = [[A, B, R1], [B, Cc, R2, R1], [Cc, Dd, R2], [Dd, A, R1, R2]];
  }
  const pos: number[] = [];
  const a = new THREE.Vector3(), b = new THREE.Vector3(), c = new THREE.Vector3();
  const tri = (p: number[], q: number[], r: number[]) => {
    a.fromArray(p); b.fromArray(q); c.fromArray(r);
    const n = b.sub(a).cross(c.sub(a));
    if (n.y < 0) pos.push(...p, ...r, ...q); else pos.push(...p, ...q, ...r);
  };
  for (const f of quads) { tri(f[0], f[1], f[2]); if (f.length === 4) tri(f[0], f[2], f[3]); }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.computeVertexNormals();
  const uv: number[] = [];
  for (let i = 0; i < pos.length; i += 3) uv.push((pos[i] + pos[i + 2]) * 0.5, pos[i + 1] * 1.2);
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  return g;
}

/** Hafif yamru yumru yuvarlak (ağaç tacı vb.) */
export function blob(r: number, seed: number, detail = 2, amp = 0.12): THREE.BufferGeometry {
  let g: THREE.BufferGeometry = new THREE.IcosahedronGeometry(r, detail);
  g.deleteAttribute('normal'); g.deleteAttribute('uv'); g = mergeVertices(g);
  const p = g.attributes.position; const R = rng(seed);
  const map = new Map<string, number>();
  for (let i = 0; i < p.count; i++) {
    const k = `${p.getX(i).toFixed(3)},${p.getY(i).toFixed(3)},${p.getZ(i).toFixed(3)}`;
    if (!map.has(k)) map.set(k, 1 + R.range(-amp, amp));
    const s = map.get(k)!; p.setXYZ(i, p.getX(i) * s, p.getY(i) * s * 0.92, p.getZ(i) * s);
  }
  g.computeVertexNormals();
  return g;
}
