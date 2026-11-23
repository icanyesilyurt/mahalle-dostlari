// İstanbul mahalle evleri: her bina tohumdan farklı üretilir (renk, kat, cumba, balkon, kepenk, dükkan).
import * as THREE from 'three';
import { Batch, M, Rng, TEX, hipRoof } from './kit';

export const WALLS = ['#eab49b', '#f2d49b', '#a9d3c1', '#f5e7d1', '#de8f78', '#b8cfe8', '#f3c2c0', '#ead27c', '#cbb7e2', '#f2aa72', '#a3c79c', '#f6d3b3', '#d9e4a8'];
const TRIMS = ['#fbf6ee', '#f3ebdd', '#fff8ec'];
const SHUTTERS = ['#4f7d5a', '#7a4b33', '#3b6a8a', '#8a3b3b', '#5e7f8f'];
const ROOFS = ['#c8603e', '#b6553a', '#d27548', '#a94f37'];
const WOODS = ['#9a6a45', '#7d4f33', '#b07a4f', '#c99a6a'];
const FLOWERS = ['#e2493b', '#f28aa5', '#f2c94c', '#ffffff', '#c85ac8'];

export type ShopType = 'bakkal' | 'firin' | 'cay' | 'berber' | 'manav' | 'kafe' | 'cicekci' | 'simit';
export const SHOP_SIGN: Record<ShopType, [string, string]> = {
  bakkal: ['BAKKAL', '#2f7d6d'], firin: ['FIRIN', '#b5651f'], cay: ['ÇAY OCAĞI', '#c8423a'], berber: ['BERBER', '#3b6aa8'],
  manav: ['MANAV', '#5a8f3b'], kafe: ['KAHVE', '#6b4f3a'], cicekci: ['ÇİÇEKÇİ', '#c85a8a'], simit: ['SİMİT SARAYI', '#d9893a'],
};
const AWNING: Record<ShopType, [string, string]> = {
  bakkal: ['#2f7d6d', '#f4efe6'], firin: ['#c8423a', '#f4efe6'], cay: ['#c8423a', '#f2c94c'], berber: ['#3b6aa8', '#f4efe6'],
  manav: ['#5a8f3b', '#f2c94c'], kafe: ['#6b4f3a', '#f2d49b'], cicekci: ['#e98aa0', '#f4efe6'], simit: ['#d9893a', '#f4efe6'],
};

export interface HouseOpts { x: number; z: number; rot: number; w: number; d: number; floors: number; shop?: ShopType; r: Rng }
export interface BuiltHouse { rect: { x: number; z: number; hw: number; hd: number }; signs: THREE.Object3D[]; front: THREE.Vector3; top: number }

const FH = 2.5; // kat yüksekliği

export function buildHouse(b: Batch, o: HouseOpts): BuiltHouse {
  const { r, w, d, floors } = o;
  const base = M(o.x, 0, o.z, o.rot);
  const tmp = new THREE.Matrix4();
  const at = (m: THREE.Matrix4) => tmp.multiplyMatrices(base, m).clone();
  const box = (key: string, col: string, bw: number, bh: number, bd: number, x: number, y: number, z: number, ry = 0, rx = 0) =>
    b.add(key, new THREE.BoxGeometry(bw, bh, bd), col, at(M(x, y, z, ry, 1, 1, 1, rx)));

  const wall = r.pick(WALLS), trim = r.pick(TRIMS), shutter = r.pick(SHUTTERS), roofC = r.pick(ROOFS), wood = r.pick(WOODS);
  const H = floors * FH + 0.4;
  const style = r.pick(['cumba', 'cumba', 'balkon', 'balkon', 'kepenk', 'karma'] as const);
  const hz = d / 2;

  // gövde + taş kaide
  box('plaster', wall, w, H, d, 0, H / 2, 0);
  box('plaster', '#b9ab98', w + 0.08, 0.55, d + 0.08, 0, 0.27, 0);
  box('wood', '#c98f5c', w - 0.12, 0.06, d - 0.12, 0, 0.58, 0); // iç zemin (kesit görünümünde ahşap döşeme)
  // kat kornişleri
  for (let f = 1; f < floors; f++) box('plain', trim, w + 0.14, 0.14, d + 0.14, 0, f * FH + 0.4, 0);
  box('plain', trim, w + 0.24, 0.22, d + 0.24, 0, H, 0);
  // köşe pilastrları
  for (const sx of [-1, 1]) box('plain', trim, 0.22, H, 0.06, sx * (w / 2 - 0.11), H / 2, hz + 0.02);

  // pencere yardımcı
  const windowAt = (x: number, y: number, z: number, ry: number, shutters: boolean, flowers: boolean) => {
    const m = (px: number, py: number, pz: number) => { const v = new THREE.Vector3(px, py, pz).applyAxisAngle(new THREE.Vector3(0, 1, 0), ry); return [x + v.x, y + v.y, z + v.z]; };
    const put = (key: string, col: string, bw: number, bh: number, bd: number, px: number, py: number, pz: number) => { const [a, bb, c] = m(px, py, pz); box(key, col, bw, bh, bd, a, bb, c, ry); };
    put('plain', trim, 1.0, 1.45, 0.08, 0, 0, 0.02);
    put('glass', '#3d5a73', 0.78, 1.22, 0.06, 0, 0, 0.06);
    put('plain', trim, 0.05, 1.22, 0.07, 0, 0, 0.08);
    put('plain', trim, 0.78, 0.05, 0.07, 0, 0.18, 0.08);
    put('plain', trim, 1.16, 0.08, 0.22, 0, -0.76, 0.1);
    if (shutters) for (const sx of [-1, 1]) { put('wood', shutter, 0.42, 1.38, 0.05, sx * 0.74, 0, 0.06); for (let i = 0; i < 5; i++) put('wood', shutter, 0.36, 0.04, 0.03, sx * 0.74, -0.52 + i * 0.26, 0.1); }
    if (flowers) { put('wood', '#8a5a3a', 0.9, 0.18, 0.2, 0, -0.66, 0.2); for (let i = 0; i < 4; i++) { const [a, bb, c] = m(-0.3 + i * 0.2, -0.5, 0.22); b.add('plain', new THREE.IcosahedronGeometry(0.11, 0), r.pick(FLOWERS), at(M(a, bb, c))); } }
  };

  const cols = Math.max(1, Math.floor((w - 0.6) / 1.75));
  const step = (w - 0.4) / cols;
  const cumbaW = Math.min(3.2, w - 1.4);
  const hasCumba = (style === 'cumba' || style === 'karma') && floors >= 2 && w >= 4.6;
  const cumbaCol = r.chance(0.5) ? wall : r.pick(WALLS);

  for (let f = 0; f < floors; f++) {
    const y = f * FH + 0.4 + FH * 0.55;
    for (let c = 0; c < cols; c++) {
      const x = -w / 2 + 0.2 + step * (c + 0.5);
      if (f === 0) {
        if (o.shop) continue;
        if (c === Math.floor(cols / 2)) continue; // kapı yeri
      }
      if (f >= 1 && hasCumba && Math.abs(x) < cumbaW / 2 + 0.2) continue;
      windowAt(x, y, hz, 0, style === 'kepenk' || r.chance(0.35), r.chance(0.25));
    }
    // yan cepheler
    if (f > 0 || !o.shop) {
      const sc = Math.max(1, Math.floor((d - 1) / 2.4));
      for (let c = 0; c < sc; c++) {
        const z = -d / 2 + 0.5 + (d - 1) / sc * (c + 0.5);
        if (r.chance(0.7)) windowAt(w / 2, y, z, Math.PI / 2, r.chance(0.4), false);
        if (r.chance(0.7)) windowAt(-w / 2, y, -z, -Math.PI / 2, r.chance(0.4), false);
      }
    }
    // arka cephe
    for (let c = 0; c < cols; c++) if (r.chance(0.6)) windowAt(-w / 2 + 0.2 + step * (c + 0.5), y, -hz, Math.PI, r.chance(0.3), false);
  }

  // cumba: üst katlarda çıkıntılı ahşap pencere
  if (hasCumba) {
    const cy0 = FH + 0.4, ch = (floors - 1) * FH - 0.1, cd = 0.95;
    box('plaster', cumbaCol, cumbaW, ch, cd, 0, cy0 + ch / 2, hz + cd / 2);
    box('plain', trim, cumbaW + 0.18, 0.16, cd + 0.12, 0, cy0 + ch + 0.08, hz + cd / 2);
    box('plain', trim, cumbaW + 0.1, 0.14, cd + 0.06, 0, cy0, hz + cd / 2);
    for (const sx of [-0.4, 0, 0.4]) b.add('wood', new THREE.BoxGeometry(0.16, 0.7, 0.16), wood, at(M(sx * cumbaW, cy0 - 0.3, hz + 0.55, 0, 1, 1, 1, -0.6)));
    for (let f = 1; f < floors; f++) {
      const y = f * FH + 0.4 + FH * 0.55;
      const n = cumbaW > 2.6 ? 2 : 1;
      for (let i = 0; i < n; i++) windowAt(n === 1 ? 0 : (i - 0.5) * 1.35, y, hz + cd, 0, false, r.chance(0.4));
      windowAt(cumbaW / 2, y, hz + cd / 2, Math.PI / 2, false, false);
      windowAt(-cumbaW / 2, y, hz + cd / 2, -Math.PI / 2, false, false);
    }
    // cumba çatısı
    b.add('roof', hipRoof(cumbaW + 0.3, cd + 0.3, 0.35), roofC, at(M(0, cy0 + ch + 0.16, hz + cd / 2)));
  }

  // balkonlar
  if ((style === 'balkon' || style === 'karma') && floors >= 2) {
    const bw = style === 'karma' ? Math.min(2.2, w * 0.35) : Math.min(w - 1, 3.6);
    const bx = style === 'karma' ? (r.chance(0.5) ? -1 : 1) * (w / 2 - bw / 2 - 0.3) : 0;
    if (!(style === 'karma' && hasCumba && Math.abs(bx) < cumbaW / 2 + bw / 2)) {
      for (let f = 1; f < floors; f++) {
        const y = f * FH + 0.4;
        box('plain', trim, bw, 0.14, 0.9, bx, y + 0.05, hz + 0.45);
        box('plain', '#3a3a3a', bw, 0.05, 0.05, bx, y + 0.95, hz + 0.88);
        for (const sx of [-1, 1]) box('plain', '#3a3a3a', 0.05, 0.05, 0.9, bx + sx * bw / 2, y + 0.95, hz + 0.45);
        const bars = Math.round(bw / 0.22);
        for (let i = 0; i <= bars; i++) box('plain', '#3a3a3a', 0.03, 0.85, 0.03, bx - bw / 2 + i * bw / bars, y + 0.5, hz + 0.88);
        // balkon kapısı
        box('plain', trim, 1.0, 2.0, 0.08, bx, y + 1.1, hz + 0.02);
        box('glass', '#3d5a73', 0.8, 1.8, 0.06, bx, y + 1.1, hz + 0.06);
        // saksılar
        if (r.chance(0.8)) for (let i = 0; i < 3; i++) {
          const px = bx - bw / 2 + 0.3 + r.next() * (bw - 0.6);
          b.add('plain', new THREE.CylinderGeometry(0.14, 0.1, 0.24, 8), '#c0603e', at(M(px, y + 0.24, hz + 0.65)));
          b.add('plain', new THREE.IcosahedronGeometry(0.2, 1), r.chance(0.5) ? '#5f9a4a' : r.pick(FLOWERS), at(M(px, y + 0.48, hz + 0.65)));
        }
      }
    }
  }

  // zemin kat: kapı veya dükkan
  const signs: THREE.Object3D[] = [];
  if (o.shop) {
    const [aw1, aw2] = AWNING[o.shop];
    const sw = w - 0.9;
    box('wood', wood, sw + 0.2, 2.2, 0.12, 0, 1.45, hz + 0.02);
    box('glass', '#5f8296', sw - 1.4, 1.7, 0.06, -0.6, 1.4, hz + 0.1);
    box('wood', '#6b4630', 1.0, 2.0, 0.08, sw / 2 - 0.6, 1.35, hz + 0.1);
    box('glass', '#5f8296', 0.6, 0.8, 0.04, sw / 2 - 0.6, 1.75, hz + 0.15);
    // çizgili tente
    const strips = Math.round(sw / 0.5);
    for (let i = 0; i < strips; i++) {
      const sx = -sw / 2 + (i + 0.5) * sw / strips;
      b.add('plain', new THREE.BoxGeometry(sw / strips + 0.005, 0.06, 1.3), i % 2 ? aw2 : aw1, at(M(sx, 2.75, hz + 0.6, 0, 1, 1, 1, 0.42)));
      b.add('plain', new THREE.BoxGeometry(sw / strips + 0.005, 0.28, 0.05), i % 2 ? aw2 : aw1, at(M(sx, 2.36, hz + 1.2)));
    }
    // tabela
    const [label, bg] = SHOP_SIGN[o.shop];
    const sign = new THREE.Mesh(new THREE.PlaneGeometry(Math.min(sw, 3.6), 0.7), new THREE.MeshBasicMaterial({ map: TEX.sign(label, bg), toneMapped: false }));
    sign.position.set(0, 3.35, hz + 0.05); sign.applyMatrix4(base);
    signs.push(sign);
  } else {
    const dx = -w / 2 + 0.2 + step * (Math.floor(cols / 2) + 0.5);
    box('plain', trim, 1.4, 2.5, 0.1, dx, 1.35, hz + 0.02);
    box('wood', r.pick(['#6b4630', '#2f5d62', '#8a3b3b', '#4a5d3a']), 1.1, 2.1, 0.08, dx, 1.2, hz + 0.08);
    box('glass', '#3d5a73', 1.0, 0.36, 0.05, dx, 2.42, hz + 0.08);
    box('plain', '#bdb3a4', 1.6, 0.16, 0.5, dx, 0.08, hz + 0.25);
    box('plain', '#d9b24a', 0.06, 0.06, 0.06, dx + 0.4, 1.2, hz + 0.14);
    b.add('plain', new THREE.SphereGeometry(0.12, 8, 6), '#fff3c4', at(M(dx + 0.85, 2.3, hz + 0.12))); // kapı lambası
    if (r.chance(0.5)) { // kapı önü saksısı
      b.add('plain', new THREE.CylinderGeometry(0.22, 0.16, 0.4, 10), '#c0603e', at(M(dx - 1.05, 0.2, hz + 0.35)));
      b.add('plain', new THREE.IcosahedronGeometry(0.34, 1), '#5f9a4a', at(M(dx - 1.05, 0.62, hz + 0.35)));
    }
  }

  // çatı
  const top = H + 0.11;
  if (r.chance(0.88)) {
    const rh = r.range(1.0, 1.7);
    b.add('roof', hipRoof(w + 0.7, d + 0.7, rh), roofC, at(M(0, top, 0)));
    box('plain', trim, w + 0.72, 0.12, d + 0.72, 0, top, 0);
    if (r.chance(0.5)) { const cx = r.range(-w / 3, w / 3), cz = r.range(-d / 4, d / 4); box('plaster', '#b9654a', 0.4, 1.4, 0.4, cx, top + 0.9, cz); box('plain', '#7a3b2a', 0.5, 0.1, 0.5, cx, top + 1.62, cz); }
  } else {
    box('plaster', wall, w, 0.5, 0.18, 0, top + 0.25, hz - 0.09); box('plaster', wall, w, 0.5, 0.18, 0, top + 0.25, -hz + 0.09);
    box('plaster', wall, 0.18, 0.5, d, w / 2 - 0.09, top + 0.25, 0); box('plaster', wall, 0.18, 0.5, d, -w / 2 + 0.09, top + 0.25, 0);
    b.add('plain', new THREE.CylinderGeometry(0.45, 0.45, 0.9, 12), '#e8e8e8', at(M(r.range(-1, 1), top + 0.5, -0.5, 0, 1, 1, 1, 0, Math.PI / 2)));
  }
  // çanak anten (İstanbul klasiği)
  if (r.chance(0.35)) {
    const sx = (r.chance(0.5) ? -1 : 1) * (w / 2 - 0.5);
    b.add('plain', new THREE.SphereGeometry(0.35, 12, 6, 0, Math.PI * 2, 0, 1.1), '#f2f2f2', at(M(sx, FH * floors - 0.2, hz + 0.3, 0, 1, 0.45, 1, 1.2)));
  }

  const rot = ((o.rot % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
  const swap = Math.abs(Math.sin(rot)) > 0.5;
  const extra = hasCumba ? 0.5 : 0;
  const fz = new THREE.Vector3(0, 0, hz + 1.2).applyAxisAngle(new THREE.Vector3(0, 1, 0), o.rot);
  return {
    rect: { x: o.x, z: o.z, hw: (swap ? d : w) / 2 + 0.1 + (swap ? extra : 0), hd: (swap ? w : d) / 2 + 0.1 + (swap ? 0 : extra) },
    signs, front: new THREE.Vector3(o.x + fz.x, 0, o.z + fz.z), top: H,
  };
}
