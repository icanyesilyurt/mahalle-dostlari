// Mahalle eşyaları: ağaç, fener, bank, çeşme, çay ocağı masaları, simitçi arabası, kasalar, çamaşır ipi...
import * as THREE from 'three';
import { Batch, M, Rng, blob } from './kit';

const LEAF = ['#6fa34f', '#5f9a4a', '#7fb35a', '#8dbb5e', '#5a8f45'];

export function tree(b: Batch, x: number, z: number, r: Rng, scale = 1, big = false) {
  const s = scale * (big ? 1.8 : r.range(0.85, 1.15));
  const th = (big ? 3.4 : 2.0) * s;
  b.add('plain', new THREE.CylinderGeometry(0.16 * s, 0.26 * s, th, 8), '#7a5236', M(x, th / 2, z));
  if (big) for (const a of [0.6, 2.4, 4.3]) b.add('plain', new THREE.CylinderGeometry(0.08 * s, 0.14 * s, 1.6 * s, 6), '#7a5236', M(x + Math.cos(a) * 0.4 * s, th * 0.85, z + Math.sin(a) * 0.4 * s, 0, 1, 1, 1, Math.cos(a) * 0.6, -Math.sin(a) * 0.6));
  const n = big ? 7 : r.int(3, 4);
  const col = r.pick(LEAF);
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + r.next();
    const rad = (big ? 1.7 : 0.75) * s * (i === 0 ? 0 : 1);
    const cr = (big ? 1.2 : 0.95) * s * r.range(0.8, 1.1);
    const c = new THREE.Color(col).offsetHSL(r.range(-0.02, 0.02), 0, r.range(-0.05, 0.06));
    b.add('leaf', blob(cr, r.int(1, 9999)), c, M(x + Math.cos(a) * rad, th + (i === 0 ? cr * 0.6 : r.range(-0.1, 0.5) * s), z + Math.sin(a) * rad));
  }
  // dibinde ağaç çanağı
  b.add('plain', new THREE.CylinderGeometry(0.7 * s, 0.7 * s, 0.1, 16), '#7a6250', M(x, 0.07, z));
}

export function lamp(b: Batch, x: number, z: number) {
  b.add('plain', new THREE.CylinderGeometry(0.12, 0.16, 0.3, 8), '#2f3235', M(x, 0.15, z));
  b.add('plain', new THREE.CylinderGeometry(0.06, 0.07, 3.0, 8), '#2f3235', M(x, 1.6, z));
  b.add('plain', new THREE.CylinderGeometry(0.22, 0.12, 0.12, 8), '#2f3235', M(x, 3.1, z));
  b.add('glow', new THREE.CylinderGeometry(0.2, 0.15, 0.4, 8), '#ffe3a3', M(x, 3.35, z));
  b.add('plain', new THREE.ConeGeometry(0.3, 0.3, 8), '#2f3235', M(x, 3.68, z));
}

export function bench(b: Batch, x: number, z: number, ry: number) {
  const m = (px: number, py: number, pz: number, rx = 0) => new THREE.Matrix4().multiplyMatrices(M(x, 0, z, ry), M(px, py, pz, 0, 1, 1, 1, rx));
  for (const sx of [-0.8, 0.8]) { b.add('plain', new THREE.BoxGeometry(0.08, 0.45, 0.5), '#2f3235', m(sx, 0.22, 0)); b.add('plain', new THREE.BoxGeometry(0.08, 0.5, 0.06), '#2f3235', m(sx, 0.7, -0.24)); }
  for (let i = 0; i < 3; i++) b.add('wood', new THREE.BoxGeometry(1.9, 0.06, 0.14), '#b0743f', m(0, 0.47, -0.17 + i * 0.17));
  for (let i = 0; i < 2; i++) b.add('wood', new THREE.BoxGeometry(1.9, 0.12, 0.05), '#b0743f', m(0, 0.68 + i * 0.18, -0.27, -0.15));
}

/** Osmanlı çeşmesi: mermer gövde, kemer, musluk, yalak. */
export function fountain(b: Batch, x: number, z: number, ry: number) {
  const m = (px: number, py: number, pz: number) => new THREE.Matrix4().multiplyMatrices(M(x, 0, z, ry), M(px, py, pz));
  const marble = '#ece6da';
  b.add('plaster', new THREE.BoxGeometry(2.4, 2.6, 0.9), marble, m(0, 1.3, 0));
  b.add('plain', new THREE.BoxGeometry(2.8, 0.25, 1.2), '#d8d0c2', m(0, 2.7, 0));
  b.add('roof', new THREE.CylinderGeometry(0.01, 1.7, 0.8, 4, 1), '#8a8f96', m(0, 3.2, 0).multiply(M(0, 0, 0, Math.PI / 4, 1, 1, 0.6)));
  b.add('plain', new THREE.CylinderGeometry(0.55, 0.55, 0.12, 16, 1, false, 0, Math.PI), '#d8d0c2', m(0, 1.9, 0.46).multiply(M(0, 0, 0, 0, 1, 1, 1, Math.PI / 2)));
  b.add('plain', new THREE.BoxGeometry(1.1, 1.3, 0.06), '#d8cdb8', m(0, 1.25, 0.46));
  b.add('plain', new THREE.CylinderGeometry(0.04, 0.04, 0.3, 6), '#c9a03a', m(0, 1.0, 0.6).multiply(M(0, 0, 0, 0, 1, 1, 1, Math.PI / 2)));
  b.add('plain', new THREE.BoxGeometry(1.6, 0.45, 0.6), '#d8d0c2', m(0, 0.22, 0.75));
  b.add('water', new THREE.BoxGeometry(1.4, 0.05, 0.45), '#6fb3d6', m(0, 0.44, 0.75));
}

export function teaSet(b: Batch, x: number, z: number, r: Rng) {
  // küçük ahşap masa + tabureler + ince belli çay bardakları
  b.add('wood', new THREE.CylinderGeometry(0.45, 0.45, 0.06, 14), '#b0743f', M(x, 0.62, z));
  b.add('plain', new THREE.CylinderGeometry(0.05, 0.08, 0.6, 6), '#5a3a28', M(x, 0.3, z));
  for (let i = 0; i < r.int(2, 3); i++) {
    const a = i * 2.2 + r.next(); const sx = x + Math.cos(a) * 0.75, sz = z + Math.sin(a) * 0.75;
    b.add('wood', new THREE.CylinderGeometry(0.2, 0.2, 0.05, 10), r.pick(['#3b6aa8', '#c8423a', '#2f7d6d']), M(sx, 0.4, sz));
    for (let k = 0; k < 4; k++) b.add('plain', new THREE.CylinderGeometry(0.02, 0.02, 0.4, 4), '#3a3a3a', M(sx + Math.cos(k * 1.57) * 0.13, 0.2, sz + Math.sin(k * 1.57) * 0.13));
  }
  for (let i = 0; i < 2; i++) {
    const gx = x + (i - 0.5) * 0.3, gz = z + r.range(-0.15, 0.15);
    b.add('plain', new THREE.CylinderGeometry(0.08, 0.08, 0.02, 10), '#f2f2f2', M(gx, 0.66, gz));
    b.add('glow', new THREE.CylinderGeometry(0.045, 0.035, 0.14, 8), '#b8401f', M(gx, 0.74, gz));
  }
}

export function simitCart(b: Batch, x: number, z: number, ry: number) {
  const m = (px: number, py: number, pz: number, rx = 0, rz = 0) => new THREE.Matrix4().multiplyMatrices(M(x, 0, z, ry), M(px, py, pz, 0, 1, 1, 1, rx, rz));
  b.add('plain', new THREE.BoxGeometry(1.6, 0.7, 0.9), '#c8423a', m(0, 0.85, 0));
  b.add('plain', new THREE.BoxGeometry(1.7, 0.06, 1.0), '#f4efe6', m(0, 1.22, 0));
  b.add('glass', new THREE.BoxGeometry(1.5, 0.6, 0.8), '#cfe6ef', m(0, 1.55, 0));
  b.add('plain', new THREE.BoxGeometry(1.7, 0.06, 1.0), '#c8423a', m(0, 1.88, 0));
  for (const sx of [-0.55, 0.55]) b.add('plain', new THREE.CylinderGeometry(0.32, 0.32, 0.08, 14), '#2f3235', m(sx, 0.34, 0.48, Math.PI / 2));
  b.add('plain', new THREE.CylinderGeometry(0.03, 0.03, 1.2, 6), '#2f3235', m(-1.0, 1.0, 0, 0, 1.0));
  for (let i = 0; i < 9; i++) b.add('plain', new THREE.TorusGeometry(0.16, 0.06, 6, 12), '#c77a35', m(-0.5 + (i % 3) * 0.35, 1.32 + Math.floor(i / 3) * 0.13, -0.1 + (i % 2) * 0.15, Math.PI / 2));
  // tente
  for (let i = 0; i < 4; i++) b.add('plain', new THREE.BoxGeometry(0.45, 0.04, 1.2), i % 2 ? '#f4efe6' : '#c8423a', m(-0.68 + i * 0.45, 2.5, 0, 0.0));
  for (const sx of [-0.8, 0.8]) b.add('plain', new THREE.CylinderGeometry(0.025, 0.025, 0.6, 6), '#2f3235', m(sx, 2.2, 0));
}

export function crates(b: Batch, x: number, z: number, ry: number, r: Rng) {
  const fruits = ['#e2493b', '#f2a33b', '#9ccf5a', '#f2d24c', '#8e3b5a'];
  for (let i = 0; i < 3; i++) {
    const m = new THREE.Matrix4().multiplyMatrices(M(x, 0, z, ry), M(-0.7 + i * 0.7, 0, 0));
    b.add('wood', new THREE.BoxGeometry(0.62, 0.36, 0.5), '#c9955c', m.clone().multiply(M(0, 0.48, 0)));
    b.add('plain', new THREE.BoxGeometry(0.56, 0.3, 0.06), '#6b4630', m.clone().multiply(M(0, 0.15, 0.2)));
    const fc = r.pick(fruits);
    for (let k = 0; k < 6; k++) b.add('plain', new THREE.IcosahedronGeometry(0.1, 1), fc, m.clone().multiply(M(-0.2 + (k % 3) * 0.2, 0.7, -0.1 + Math.floor(k / 3) * 0.2)));
  }
}

export function flowerBuckets(b: Batch, x: number, z: number, ry: number, r: Rng) {
  for (let i = 0; i < 4; i++) {
    const m = new THREE.Matrix4().multiplyMatrices(M(x, 0, z, ry), M(-0.9 + i * 0.6, 0, 0));
    b.add('plain', new THREE.CylinderGeometry(0.2, 0.16, 0.42, 10), '#9aa3ae', m.clone().multiply(M(0, 0.21, 0)));
    const c = r.pick(['#e2493b', '#f28aa5', '#f2c94c', '#ffffff', '#c85ac8']);
    for (let k = 0; k < 5; k++) b.add('plain', new THREE.IcosahedronGeometry(0.09, 0), c, m.clone().multiply(M(r.range(-0.12, 0.12), 0.55 + r.range(0, 0.12), r.range(-0.12, 0.12))));
  }
}

export function potPlant(b: Batch, x: number, z: number, r: Rng) {
  b.add('plain', new THREE.CylinderGeometry(0.3, 0.22, 0.5, 10), r.pick(['#c0603e', '#d27548', '#9aa3ae']), M(x, 0.25, z));
  b.add('leaf', blob(0.45, r.int(1, 999), 1), r.pick(LEAF), M(x, 0.8, z));
}

/** Çamaşır ipi: iki nokta arası ip + rengârenk çamaşırlar; rüzgârda sallanır (ayrı mesh). */
export function laundryLine(a: THREE.Vector3, c: THREE.Vector3, r: Rng): THREE.Object3D {
  const b = new Batch({}, {});
  const dir = new THREE.Vector3().subVectors(c, a); const len = dir.length();
  const mid = new THREE.Vector3().addVectors(a, c).multiplyScalar(0.5);
  const yaw = Math.atan2(dir.x, dir.z);
  b.add('plain', new THREE.CylinderGeometry(0.012, 0.012, len, 4), '#e8e8e8', M(0, 0, 0, 0, 1, 1, 1, Math.PI / 2));
  const cols = ['#e2493b', '#f2c94c', '#3b8ed6', '#ffffff', '#f28aa5', '#5a8f3b', '#9a5ac8', '#f2a33b'];
  const n = Math.floor(len / 0.8);
  for (let i = 0; i < n; i++) {
    const t = -len / 2 + 0.5 + i * (len - 1) / Math.max(1, n - 1);
    const sag = -0.25 * (1 - (2 * t / len) ** 2);
    const kind = r.int(0, 2);
    const col = r.pick(cols);
    if (kind === 0) b.add('plain', new THREE.BoxGeometry(0.03, 0.55, 0.5), col, M(0, sag - 0.28, t)); // havlu
    else if (kind === 1) { b.add('plain', new THREE.BoxGeometry(0.03, 0.45, 0.42), col, M(0, sag - 0.25, t)); b.add('plain', new THREE.BoxGeometry(0.03, 0.14, 0.7), col, M(0, sag - 0.07, t)); } // tişört
    else { b.add('plain', new THREE.BoxGeometry(0.03, 0.3, 0.2), col, M(0, sag - 0.17, t)); } // çorap/mendil
  }
  const mat = new THREE.MeshLambertMaterial({ vertexColors: true, side: THREE.DoubleSide });
  b.mats.plain = mat;
  const g = b.build(true);
  g.position.copy(mid); g.rotation.y = yaw;
  g.userData.sway = r.range(0, 6);
  return g;
}

/** Karşı kıyı silueti: tepeler, kubbe ve minareler (İstanbul havası). */
export function skyline(b: Batch, z: number, r: Rng) {
  for (let i = 0; i < 14; i++) {
    const x = -140 + i * 22 + r.range(-6, 6);
    b.add('far', new THREE.SphereGeometry(r.range(16, 26), 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), r.pick(['#9fb5a6', '#a9bdb0', '#94ab9c']), M(x, -4, z - r.range(0, 20), 0, 1.4, r.range(0.4, 0.7), 1));
  }
  for (let i = 0; i < 60; i++) {
    const x = r.range(-130, 130), zz = z + r.range(6, 14);
    b.add('far', new THREE.BoxGeometry(r.range(2, 5), r.range(2, 6), 2), r.pick(['#e8d8c4', '#f0e2d0', '#d9c9b5', '#e2c4b0']), M(x, 1, zz));
  }
  // cami silueti
  const mx = -30, mz = z + 4;
  b.add('far', new THREE.BoxGeometry(14, 5, 8), '#e9e1d4', M(mx, 2.5, mz));
  b.add('far', new THREE.SphereGeometry(4.2, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), '#a9b3bd', M(mx, 5, mz));
  for (const sx of [-4.5, 4.5]) b.add('far', new THREE.SphereGeometry(1.9, 12, 6, 0, Math.PI * 2, 0, Math.PI / 2), '#a9b3bd', M(mx + sx, 5, mz));
  for (const sx of [-8.5, 8.5]) { b.add('far', new THREE.CylinderGeometry(0.45, 0.55, 16, 8), '#efe8dc', M(mx + sx, 8, mz)); b.add('far', new THREE.ConeGeometry(0.6, 2.4, 8), '#a9b3bd', M(mx + sx, 17.2, mz)); }
  // kız kulesi benzeri küçük ada kulesi
  b.add('far', new THREE.CylinderGeometry(3, 3.4, 1.5, 12), '#c9bca8', M(40, 0.4, z + 14));
  b.add('far', new THREE.CylinderGeometry(1.1, 1.2, 7, 10), '#f0e8da', M(40, 4.5, z + 14));
  b.add('far', new THREE.ConeGeometry(1.4, 2.2, 10), '#8f9aa4', M(40, 9.1, z + 14));
}

/** Vapur: beyaz gövde, iki kat, baca. Ayrı obje, hareket eder. */
export function ferry(): THREE.Object3D {
  const b = new Batch({ plain: new THREE.MeshLambertMaterial({ vertexColors: true }) });
  b.add('plain', new THREE.BoxGeometry(14, 1.6, 4), '#f4f1ea', M(0, 0.8, 0));
  b.add('plain', new THREE.BoxGeometry(14.2, 0.5, 4.2), '#2b3a4a', M(0, 0.2, 0));
  b.add('plain', new THREE.BoxGeometry(10, 1.4, 3.4), '#f8f6f0', M(0, 2.3, 0));
  b.add('plain', new THREE.BoxGeometry(10.2, 0.16, 3.6), '#c8423a', M(0, 3.05, 0));
  for (let i = 0; i < 8; i++) b.add('plain', new THREE.BoxGeometry(0.8, 0.6, 3.45), '#3d5a73', M(-4.2 + i * 1.2, 2.4, 0));
  b.add('plain', new THREE.CylinderGeometry(0.5, 0.6, 1.8, 10), '#f2c94c', M(0, 4, 0));
  b.add('plain', new THREE.CylinderGeometry(0.52, 0.52, 0.4, 10), '#2b2b2b', M(0, 4.8, 0));
  return b.build(false);
}
