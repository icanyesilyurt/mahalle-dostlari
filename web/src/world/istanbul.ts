// İstanbul haritası: sahil + çay bahçesi, çarşı caddesi, meydan (çınar, çeşme, simitçi), cumbalı ara sokaklar.
// Kuzey (-z) deniz. Yerleşim tohumlu: her açılışta aynı mahalle, ama her bina farklı.
import * as THREE from 'three';
import { Batch, M, TEX, rng } from './kit';
import { buildHouse, ShopType } from './buildings';
import { bench, crates, ferry, flowerBuckets, fountain, lamp, laundryLine, potPlant, simitCart, skyline, teaSet, tree } from './props';
import type { WorldData, Rect } from './world';

const STREETS: Rect[] = [];
const OPEN: Rect[] = [];
const R = (x0: number, z0: number, x1: number, z1: number): Rect => ({ x: (x0 + x1) / 2, z: (z0 + z1) / 2, hw: (x1 - x0) / 2, hd: (z1 - z0) / 2 });
const hit = (a: Rect, b: Rect, m = 0) => Math.abs(a.x - b.x) < a.hw + b.hw + m && Math.abs(a.z - b.z) < a.hd + b.hd + m;

export function buildIstanbul(mats: Record<string, THREE.Material>, lowEnd: boolean): WorldData {
  const r = rng(1453);
  const root = new THREE.Group();
  const b = new Batch(mats, { plaster: 3, wood: 1.2, roof: -1.4 });
  b.tile = true;
  const colliders: Rect[] = [];
  const signs: THREE.Object3D[] = [];

  // ---- zemin bölgeleri ----
  const promenade = R(-52, -30, 52, -23);
  const coast = R(-52, -23, 52, -17);
  const carsi = R(-4, -17, 4, 48);
  const s2 = R(-52, 9, 52, 15);
  const sideW = R(-28, -17, -23, 48);
  const sideE = R(23, -17, 28, 48);
  const meydan = R(-11, 4, 11, 20);
  STREETS.push(coast, carsi, s2, sideW, sideE);
  OPEN.push(promenade, ...STREETS, meydan);

  const ground = (tex: THREE.Texture, rect: Rect, y: number, rep: number, col = '#ffffff') => {
    const t = tex.clone(); t.needsUpdate = true; t.repeat.set(rect.hw * 2 / rep, rect.hd * 2 / rep);
    const m = new THREE.Mesh(new THREE.PlaneGeometry(rect.hw * 2, rect.hd * 2), new THREE.MeshLambertMaterial({ map: t, color: col }));
    m.rotation.x = -Math.PI / 2; m.position.set(rect.x, y, rect.z); m.receiveShadow = true; root.add(m);
  };
  const cob = TEX.cobble(), slab = TEX.slab(), grass = TEX.grass();
  ground(slab, R(-60, -30, 60, 56), 0, 3);
  for (const s of STREETS) ground(cob, s, 0.012, 4);
  ground(cob, meydan, 0.03, 4, '#f6eadb');
  ground(slab, promenade, 0.016, 2.5, '#fff6ea');

  // kaldırım bordürleri
  const curb = (x0: number, z0: number, x1: number, z1: number) => b.box('plain', '#d8d0c4', Math.max(0.2, x1 - x0), 0.12, Math.max(0.2, z1 - z0), (x0 + x1) / 2, 0.06, (z0 + z1) / 2);
  curb(-52, -17.1, -28, -16.9); curb(-23, -17.1, -4, -16.9); curb(4, -17.1, 23, -16.9); curb(28, -17.1, 52, -16.9);
  curb(-52, -23.1, 52, -22.9);

  // ---- bina sıraları ----
  const placed: Rect[] = [];
  const shopCycle: ShopType[] = ['bakkal', 'firin', 'manav', 'berber', 'cicekci', 'kafe', 'simit', 'bakkal', 'cay', 'manav'];
  let shopI = 0;
  const faces: { pos: THREE.Vector3; side: 'x' | 'z'; dirSign: number }[] = [];

  /** Bir sokak kenarı boyunca bitişik evler. axis: sıranın uzandığı eksen; facing: cephe yönü (rot). */
  const row = (axis: 'x' | 'z', from: number, to: number, line: number, facingRot: number, shopP: number) => {
    let p = from;
    while (p < to - 4.2) {
      const w = Math.min(to - p, r.range(4.6, 7.4));
      if (to - p - w < 4.4 && to - p - w > 0.2) { /* son boşluğu son eve kat */ }
      const ww = (to - p - w < 4.4) ? to - p : w;
      const d = r.range(6.2, 7.6);
      const floors = r.chance(0.15) ? 2 : r.chance(0.6) ? 3 : 4;
      const fwd = new THREE.Vector3(Math.sin(facingRot), 0, Math.cos(facingRot));
      const c = axis === 'x' ? new THREE.Vector3(p + ww / 2, 0, line) : new THREE.Vector3(line, 0, p + ww / 2);
      c.addScaledVector(fwd, -d / 2);
      const rect: Rect = axis === 'x' ? { x: c.x, z: c.z, hw: ww / 2, hd: d / 2 } : { x: c.x, z: c.z, hw: d / 2, hd: ww / 2 };
      const ok = !OPEN.some(o => hit(o, rect, -0.05)) && !placed.some(o => hit(o, rect, -0.05));
      if (!ok) { p += 0.7; continue; }
      {
        const shop = r.chance(shopP) ? shopCycle[shopI++ % shopCycle.length] : undefined;
        const h = buildHouse(b, { x: c.x, z: c.z, rot: facingRot, w: ww, d, floors, shop, r });
        placed.push(rect); colliders.push(h.rect); signs.push(...h.signs);
        faces.push({ pos: h.front, side: axis, dirSign: 1 });
        if (shop === 'bakkal' || shop === 'manav') crates(b, h.front.x + fwd.x * -0.3 + (axis === 'x' ? 1.2 : 0), h.front.z + (axis === 'z' ? 1.2 : 0), facingRot, r);
        if (shop === 'cicekci') flowerBuckets(b, h.front.x, h.front.z, facingRot, r);
      }
      p += ww + 0.02;
    }
  };

  // sahil yolu güneyi (cephe kuzeye, denize bakar)
  row('x', -52, -28, -17, Math.PI, 0.1);
  row('x', -23, -4, -17, Math.PI, 0.35);
  row('x', 4, 23, -17, Math.PI, 0.35);
  row('x', 28, 52, -17, Math.PI, 0.1);
  // S2 iki yanı
  for (const [a, c] of [[-52, -28], [-23, -11], [11, 23], [28, 52]] as const) {
    row('x', a, c, 9, 0, a > -24 && c < 24 ? 0.5 : 0.15);
    row('x', a, c, 15, Math.PI, a > -24 && c < 24 ? 0.5 : 0.15);
  }
  // çarşı caddesi iki yanı (dükkanlar)
  row('z', -17, 4, -4, Math.PI / 2, 0.7); row('z', -17, 4, 4, -Math.PI / 2, 0.7);
  row('z', 20, 48, -4, Math.PI / 2, 0.6); row('z', 20, 48, 4, -Math.PI / 2, 0.6);
  // meydanı çevreleyen evler
  row('z', 4, 9, -11, Math.PI / 2, 0.3); row('z', 4, 9, 11, -Math.PI / 2, 0.3);
  row('z', 15, 20, -11, Math.PI / 2, 0.3); row('z', 15, 20, 11, -Math.PI / 2, 0.3);
  row('x', -11, -4, 20, Math.PI, 0.4); row('x', 4, 11, 20, Math.PI, 0.4);
  // yan sokaklar (dar, çamaşır ipli)
  for (const [x, rot] of [[-28, Math.PI / 2], [-23, -Math.PI / 2], [23, Math.PI / 2], [28, -Math.PI / 2]] as const) {
    row('z', -17, 9, x, rot, 0.05); row('z', 15, 48, x, rot, 0.05);
  }
  // en güney sıra (cephe kuzeye)
  for (const [a, c] of [[-52, -28], [-23, -4], [4, 23], [28, 52]] as const) row('x', a, c, 48, Math.PI, 0);

  // ---- avlular: blok içleri çimen + ağaç ----
  const blocks = [R(-52, -17, -28, 9), R(-23, -17, -4, 9), R(4, -17, 23, 9), R(28, -17, 52, 9), R(-52, 15, -28, 48), R(-23, 20, -4, 48), R(4, 20, 23, 48), R(28, 15, 52, 48)];
  for (const bl of blocks) {
    const inner = { ...bl, hw: bl.hw - 1, hd: bl.hd - 1 };
    ground(grass, inner, 0.02, 4);
    for (let i = 0; i < (lowEnd ? 4 : 7); i++) {
      const x = bl.x + r.range(-bl.hw + 3, bl.hw - 3), z = bl.z + r.range(-bl.hd + 3, bl.hd - 3);
      const t: Rect = { x, z, hw: 1.2, hd: 1.2 };
      if (!placed.some(p => hit(p, t))) tree(b, x, z, r);
    }
  }

  // ---- sahil: korkuluk, fenerler, banklar, çay bahçesi ----
  b.box('plaster', '#cbbfae', 104, 1.2, 0.6, 0, -0.5, -30.2);
  for (let x = -50; x <= 50; x += 1.2) b.box('plain', '#2f3235', 0.05, 0.9, 0.05, x, 0.45, -29.7);
  b.box('plain', '#2f3235', 104, 0.08, 0.1, 0, 0.92, -29.7);
  b.box('plain', '#2f3235', 104, 0.05, 0.06, 0, 0.3, -29.7);
  colliders.push(R(-60, -32, 60, -29.4));
  for (let x = -48; x <= 48; x += 9) { lamp(b, x, -28.8); if (Math.abs(x + 14) > 8) bench(b, x + 4.5, -28.9, Math.PI); }
  for (let x = -46; x <= 46; x += 13) if (Math.abs(x + 14) > 9) tree(b, x, -25, r, 0.9);
  // çay bahçesi
  const kiosk = new THREE.Vector3(-14, 0, -24.4);
  b.box('wood', '#b0743f', 3.6, 2.4, 2.2, kiosk.x, 1.2, kiosk.z);
  b.box('glass', '#cfe6ef', 2.8, 1.0, 0.05, kiosk.x, 1.6, kiosk.z - 1.12);
  b.box('wood', '#8a5a3a', 3.8, 0.12, 0.6, kiosk.x, 1.0, kiosk.z - 1.3);
  for (let i = 0; i < 8; i++) b.add('plain', new THREE.BoxGeometry(0.5, 0.06, 1.6), i % 2 ? '#f2c94c' : '#c8423a', M(kiosk.x - 1.75 + i * 0.5, 2.8, kiosk.z - 1.4, 0, 1, 1, 1, -0.35));
  b.add('roof', new THREE.ConeGeometry(2.8, 1.1, 4), '#c8423a', M(kiosk.x, 3.0, kiosk.z, Math.PI / 4, 1, 1, 0.7));
  b.add('glow', new THREE.CylinderGeometry(0.22, 0.25, 0.5, 10), '#d9d9d9', M(kiosk.x + 0.9, 1.33, kiosk.z - 1.3)); // semaver
  const cay = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 0.62), new THREE.MeshBasicMaterial({ map: TEX.sign('ÇAY OCAĞI', '#c8423a'), toneMapped: false }));
  cay.position.set(kiosk.x, 2.25, kiosk.z - 1.13); cay.rotation.y = Math.PI; signs.push(cay);
  colliders.push({ x: kiosk.x, z: kiosk.z, hw: 1.9, hd: 1.2 });
  for (const [x, z] of [[-19, -27], [-16.5, -27.6], [-11.5, -27.4], [-9, -26.8], [-19.5, -24.6], [-8.6, -24.4]]) teaSet(b, x, z, r);
  for (const x of [-20.5, -7.5]) tree(b, x, -26.2, r, 1.05);

  // ---- meydan: çınar, çeşme, simitçi, banklar ----
  tree(b, -5.5, 12.5, r, 1, true); colliders.push({ x: -5.5, z: 12.5, hw: 0.7, hd: 0.7 });
  b.add('plaster', new THREE.CylinderGeometry(2.4, 2.5, 0.45, 20), '#d8cdb8', M(-5.5, 0.22, 12.5));
  const fnt = new THREE.Vector3(7.5, 0, 6.2);
  fountain(b, fnt.x, fnt.z, 0); colliders.push({ x: fnt.x, z: fnt.z, hw: 1.3, hd: 0.6 });
  const fountainSpot = new THREE.Vector3(fnt.x, 0, fnt.z + 1.6);
  const cart = new THREE.Vector3(6.5, 0, 17.2);
  simitCart(b, cart.x, cart.z, Math.PI); colliders.push({ x: cart.x, z: cart.z, hw: 1.1, hd: 0.7 });
  for (const [x, z, ry] of [[-9.6, 8, Math.PI / 2], [-9.6, 16, Math.PI / 2], [9.6, 12, -Math.PI / 2], [-1.5, 16.6, 0]] as const) bench(b, x, z, ry);
  for (const [x, z] of [[-10, 5], [10, 5], [-10, 19], [10, 19]]) lamp(b, x, z);
  for (const [x, z] of [[-2.8, 5.6], [2.8, 5.6], [-2.8, 18.6]]) potPlant(b, x, z, r);
  // çarşı caddesi fenerleri
  for (let z = -12; z < 46; z += 10) { if (z > 3 && z < 21) continue; lamp(b, -3.4, z); lamp(b, 3.4, z + 5); }

  // ---- güney sınırı: istinat duvarı + tepe ----
  b.box('plaster', '#cbbfae', 120, 3, 1, 0, 1.5, 55.6);
  colliders.push(R(-60, 55, 60, 60), R(-60, -40, -52.5, 60), R(52.5, -40, 60, 60));
  b.box('plaster', '#cbbfae', 1, 3, 90, -52.6, 1.5, 10); b.box('plaster', '#cbbfae', 1, 3, 90, 52.6, 1.5, 10);

  // ---- karşı kıyı ----
  skyline(b, -150, r);

  const world = b.build(!lowEnd);
  root.add(world);
  for (const s of signs) root.add(s);

  // ---- çamaşır ipleri: karşılıklı cepheler arasında ----
  const laundry: THREE.Object3D[] = [];
  const lineAt = (a: THREE.Vector3, c: THREE.Vector3) => { const l = laundryLine(a, c, r); root.add(l); laundry.push(l); };
  for (const [x0, x1] of [[-28, -23], [23, 28]] as const) for (let z = -13; z < 46; z += r.range(5, 8)) {
    if (z > 8 && z < 16) continue;
    const ya = r.range(4.6, 7.4);
    const inA = placed.some(p => Math.abs(p.x - (x0 - 3)) < p.hw + 0.5 && Math.abs(p.z - z) < p.hd);
    const inB = placed.some(p => Math.abs(p.x - (x1 + 3)) < p.hw + 0.5 && Math.abs(p.z - z) < p.hd);
    if (inA && inB && r.chance(0.75)) lineAt(new THREE.Vector3(x0 - 0.05, ya, z), new THREE.Vector3(x1 + 0.05, ya + r.range(-0.4, 0.4), z + r.range(-1, 1)));
  }
  for (let z = -12; z < 46; z += 9) if (z < 2 || z > 22) if (r.chance(0.6)) lineAt(new THREE.Vector3(-4, r.range(5.5, 7.2), z), new THREE.Vector3(4, r.range(5.5, 7.2), z + r.range(-1.5, 1.5)));

  // ---- deniz ----
  const seaTex = waterTex();
  const seaMat = new THREE.MeshPhongMaterial({ color: '#3f9cc4', specular: '#cfefff', shininess: 70, bumpMap: seaTex, bumpScale: 0.6 });
  seaTex.repeat.set(60, 30);
  const sea = new THREE.Mesh(new THREE.PlaneGeometry(600, 300), seaMat);
  sea.rotation.x = -Math.PI / 2; sea.position.set(0, -0.7, -180); root.add(sea);
  const boat = ferry(); boat.position.set(-80, -0.7, -62); root.add(boat);

  // ---- sokak hayvanları (isim + ırk + yuva noktası) ----
  const strays = [
    { id: 'pamuk', name: 'Pamuk', breed: 'van', x: -6, z: 10 },
    { id: 'tarcin', name: 'Tarçın', breed: 'sarman', x: 2, z: -8 },
    { id: 'zeytin', name: 'Zeytin', breed: 'kara', x: -25.5, z: 0 },
    { id: 'boncuk', name: 'Boncuk', breed: 'uc_renk', x: -14, z: -21 },
    { id: 'duman', name: 'Duman', breed: 'tekir', x: 25.5, z: 30 },
    { id: 'pasa', name: 'Paşa', breed: 'smokin', x: 6, z: 14 },
    { id: 'minnos', name: 'Minnoş', breed: 'tekir', x: 1, z: 34 },
    { id: 'limon', name: 'Limon', breed: 'sarman', x: -30, z: -26 },
    { id: 'karabas', name: 'Karabaş', breed: 'kangal', x: 20, z: -20 },
    { id: 'comar', name: 'Çomar', breed: 'sokak', x: -2, z: 26 },
    { id: 'sarikiz', name: 'Sarıkız', breed: 'golden', x: 36, z: 12 },
    { id: 'fistik', name: 'Fıstık', breed: 'beagle', x: -38, z: 12 },
    { id: 'benek', name: 'Benek', breed: 'dalmacyali', x: 30, z: -26 },
    { id: 'kahve', name: 'Kahve', breed: 'sokak', x: -25.5, z: 30 },
  ];

  const npcs = [
    { x: cart.x - 1.6, z: cart.z, rot: Math.PI / 2, shirt: '#f4efe6', hat: 'kasket', role: 'Simitçi' },
    { x: kiosk.x + 0.2, z: kiosk.z - 1.9, rot: Math.PI, shirt: '#f4efe6', hat: null, role: 'Çaycı' },
    { x: 9.2, z: 12, rot: -Math.PI / 2, shirt: '#6b4f3a', hat: 'kasket', role: 'Mahalle sakini', sit: true },
  ];

  return {
    root, colliders, laundry, sea: seaTex, boat,
    bounds: { x0: -51.5, x1: 51.5, z0: -29.2, z1: 54.5 },
    spawn: new THREE.Vector3(0, 0, -20.5),
    fountain: fountainSpot,
    strays, npcs,
    open: OPEN.slice(),
    lots: placed,
  };
}

function waterTex(): THREE.CanvasTexture {
  const c = document.createElement('canvas'); c.width = c.height = 128;
  const g = c.getContext('2d')!; g.fillStyle = '#808080'; g.fillRect(0, 0, 128, 128);
  const r = rng(77);
  for (let i = 0; i < 160; i++) { g.strokeStyle = `rgba(255,255,255,${r.range(0.1, 0.4)})`; g.lineWidth = r.range(1, 3); const x = r.int(0, 128), y = r.int(0, 128), l = r.int(6, 20); g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x + l / 2, y - 3, x + l, y); g.stroke(); }
  const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; return t;
}
