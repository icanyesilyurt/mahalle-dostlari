// Stilize, genç, sevimli karakter: büyük kafa, iri parlak gözler (iris + bebek + yansıma), kaş,
// katmanlı saç modelleri, katmanlı kıyafet (iç tişört + ceket/kazak/yağmurluk/hırka, atkı, bot).
// Eklem hiyerarşisi + kodla animasyon (yürü, dur, eğil-mama koy, sev, top at, el salla, otur).
import * as THREE from 'three';
import { itemById } from '../core/catalog';
import { mergeStatic } from './merge';

export type Action = 'kneel' | 'pet' | 'throw' | 'wave' | null;
export type Gender = 'm' | 'f';
export type HairStyle = 'kisa' | 'dalgali' | 'uzun' | 'atkuyrugu' | 'topuz' | 'kivircik';
export const HAIR_STYLES: { id: HairStyle; name: string }[] = [
  { id: 'kisa', name: 'Kısa' }, { id: 'dalgali', name: 'Dalgalı' }, { id: 'kivircik', name: 'Kıvırcık' },
  { id: 'uzun', name: 'Uzun' }, { id: 'atkuyrugu', name: 'At kuyruğu' }, { id: 'topuz', name: 'Topuz' },
];

const mat = (c: string | THREE.Color, o: THREE.MeshStandardMaterialParameters = {}) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.78, ...o });
const cap = (r: number, l: number) => new THREE.CapsuleGeometry(r, l, 5, 12);
const sph = (r: number, w = 16, h = 12) => new THREE.SphereGeometry(r, w, h);

export interface HumanLook { outfit: string; hat: string | null; skin: string; hair: string; pants?: string; shirt?: string; gender?: Gender; hairStyle?: HairStyle }

/** Kıyafet katmanları: ceket rengi, iç tişört, atkı, bot, tip. */
function outfitSpec(look: HumanLook) {
  const it = itemById(look.outfit);
  const base = look.shirt ?? it?.color ?? '#f07f6a';
  switch (look.outfit) {
    case 'kazak_hardal': return { coat: base, inner: base, scarf: '#c8423a', boots: '#6b4630', kind: 'sweater' as const };
    case 'yagmurluk': return { coat: base, inner: '#f4efe6', scarf: null, boots: it?.color2 ?? '#2f5d62', kind: 'rain' as const };
    case 'hirka_mavi': return { coat: base, inner: it?.color2 ?? '#f4efe6', scarf: '#f4efe6', boots: '#5a3a28', kind: 'cardigan' as const };
    default: return { coat: base, inner: '#f6f2ea', scarf: look.shirt ? null : '#e2a33b', boots: '#7a4b2e', kind: 'jacket' as const };
  }
}

export class Human {
  root = new THREE.Group();
  private hips = new THREE.Group();
  private torso = new THREE.Group();
  private head = new THREE.Group();
  private armL = new THREE.Group(); private armR = new THREE.Group();
  private foreL = new THREE.Group(); private foreR = new THREE.Group();
  private legL = new THREE.Group(); private legR = new THREE.Group();
  private shinL = new THREE.Group(); private shinR = new THREE.Group();
  private eyes: THREE.Group[] = [];
  private hatSlot = new THREE.Group();
  private hairSlot = new THREE.Group();
  private clothes = new THREE.Group();       // gövde katmanları (yeniden kurulur)
  private sleeveMats: THREE.MeshStandardMaterial[] = [];
  private bootMats: THREE.MeshStandardMaterial[] = [];
  private pantsMat: THREE.MeshStandardMaterial;
  private skinMat: THREE.MeshStandardMaterial;
  private hairMat: THREE.MeshStandardMaterial;
  private look: HumanLook;
  hand = new THREE.Group(); // sağ el ucu (kase/top tutmak için)

  speed = 0;
  private phase = 0;
  private t = Math.random() * 10;
  private blink = 2;
  action: Action = null;
  private actT = 0;
  private actDur = 1;
  private onPeak: (() => void) | null = null;
  private peakDone = false;
  sitting = false;

  constructor(look: HumanLook) {
    this.look = look;
    this.skinMat = mat(look.skin, { roughness: 0.6 });
    this.hairMat = mat(look.hair, { roughness: 0.45 });
    this.pantsMat = mat(look.pants ?? '#3d4f6b');
    const skin = this.skinMat;
    this.root.add(this.hips);
    this.hips.position.y = 0.52;
    this.hips.add(this.torso);
    this.torso.add(this.clothes);

    // ---- kafa (büyük, yuvarlak) ----
    this.head.position.y = 0.6;
    const headM = new THREE.Mesh(sph(0.3, 28, 22), skin); headM.scale.set(1, 0.96, 0.95); this.head.add(headM);
    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.07, 0.12, 10), skin); neck.position.y = -0.27; this.head.add(neck);
    // gözler: beyaz + iris + bebek + iki yansıma; üst kapak kırpar
    const white = mat('#ffffff', { roughness: 0.3 }), glint = new THREE.MeshBasicMaterial({ color: '#ffffff' });
    const irisCol = look.gender === 'f' ? '#5a3a24' : '#4a3020';
    for (const sx of [-1, 1]) {
      const eg = new THREE.Group(); eg.position.set(sx * 0.115, -0.01, 0.255); eg.rotation.y = sx * 0.22; this.head.add(eg); this.eyes.push(eg);
      const w = new THREE.Mesh(sph(0.07, 16, 12), white); w.scale.set(0.85, 1.1, 0.45); eg.add(w);
      const iris = new THREE.Mesh(sph(0.052, 16, 12), new THREE.MeshPhysicalMaterial({ color: irisCol, roughness: 0.2, clearcoat: 1, clearcoatRoughness: 0.05 })); iris.scale.set(0.9, 1.05, 0.4); iris.position.set(0, -0.005, 0.016); eg.add(iris);
      const pupil = new THREE.Mesh(sph(0.028, 12, 10), mat('#120c0a', { roughness: 0.2 })); pupil.scale.set(0.9, 1.05, 0.4); pupil.position.set(0, -0.005, 0.024); eg.add(pupil);
      const g1 = new THREE.Mesh(sph(0.015, 8, 6), glint); g1.position.set(0.017, 0.022, 0.034); eg.add(g1);
      const g2 = new THREE.Mesh(sph(0.007, 6, 4), glint); g2.position.set(-0.016, -0.02, 0.033); eg.add(g2);
      if (look.gender === 'f') for (const k of [-1, 0, 1]) { const lash = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.03, 0.006), mat('#1d1410')); lash.position.set(sx * 0.035 + k * 0.018, 0.07, 0.02); lash.rotation.z = -sx * (0.5 + k * 0.25); eg.add(lash); }
      const brow = new THREE.Mesh(cap(0.012, 0.06), this.hairMat); brow.rotation.z = Math.PI / 2 + sx * 0.12; brow.position.set(sx * 0.115, 0.1, 0.262); this.head.add(brow);
      const cheek = new THREE.Mesh(new THREE.CircleGeometry(0.045, 14), new THREE.MeshBasicMaterial({ color: '#f29a8a', transparent: true, opacity: look.gender === 'f' ? 0.6 : 0.4, depthWrite: false }));
      cheek.position.set(sx * 0.175, -0.085, 0.235); cheek.rotation.y = sx * 0.55; this.head.add(cheek);
      const ear = new THREE.Mesh(sph(0.055, 10, 8), skin); ear.position.set(sx * 0.29, -0.02, 0); ear.scale.set(0.55, 1, 0.8); this.head.add(ear);
    }
    const nose = new THREE.Mesh(sph(0.022, 10, 8), skin); nose.position.set(0, -0.06, 0.29); this.head.add(nose);
    const mouth = new THREE.Mesh(new THREE.TorusGeometry(0.03, 0.008, 5, 12, Math.PI), mat('#7a3a32')); mouth.position.set(0, -0.12, 0.262); mouth.rotation.z = Math.PI; this.head.add(mouth);
    this.head.add(this.hairSlot, this.hatSlot);
    this.torso.add(this.head);

    // ---- kollar: omuz -> dirsek -> el (kol rengi = ceket) ----
    for (const [arm, fore, sx] of [[this.armL, this.foreL, -1], [this.armR, this.foreR, 1]] as const) {
      arm.position.set(sx * 0.23, 0.36, 0);
      const sl = mat('#f07f6a'); this.sleeveMats.push(sl);
      const up = new THREE.Mesh(cap(0.068, 0.12), sl); up.position.y = -0.1; arm.add(up);
      fore.position.y = -0.2; arm.add(fore);
      const sl2 = mat('#f07f6a'); this.sleeveMats.push(sl2);
      const lo = new THREE.Mesh(cap(0.062, 0.09), sl2); lo.position.y = -0.07; fore.add(lo);
      const cuff = new THREE.Mesh(new THREE.CylinderGeometry(0.066, 0.066, 0.03, 12), sl2); cuff.position.y = -0.15; fore.add(cuff);
      const hand = new THREE.Mesh(sph(0.062, 12, 10), skin); hand.position.y = -0.19; hand.scale.set(0.9, 1, 0.8); fore.add(hand);
      if (sx === 1) { this.hand.position.y = -0.22; fore.add(this.hand); }
      this.torso.add(arm);
    }
    // ---- bacaklar: pantolon + bot ----
    for (const [leg, shin, sx] of [[this.legL, this.shinL, -1], [this.legR, this.shinR, 1]] as const) {
      leg.position.set(sx * 0.095, 0, 0);
      const th = new THREE.Mesh(cap(0.085, 0.11), this.pantsMat); th.position.y = -0.1; leg.add(th);
      shin.position.y = -0.22; leg.add(shin);
      const sh = new THREE.Mesh(cap(0.074, 0.06), this.pantsMat); sh.position.y = -0.04; shin.add(sh);
      const bm = mat('#7a4b2e', { roughness: 0.55 }); this.bootMats.push(bm);
      const boot = new THREE.Mesh(cap(0.082, 0.08), bm); boot.position.y = -0.14; shin.add(boot);
      const toe = new THREE.Mesh(sph(0.09, 12, 8), bm); toe.scale.set(0.9, 0.62, 1.35); toe.position.set(0, -0.215, 0.045); shin.add(toe);
      const cuff = new THREE.Mesh(new THREE.TorusGeometry(0.08, 0.018, 6, 14), bm); cuff.rotation.x = Math.PI / 2; cuff.position.y = -0.08; shin.add(cuff);
      const sole = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.085, 0.03, 12), mat('#3a2a20')); sole.scale.z = 1.5; sole.position.set(0, -0.26, 0.04); shin.add(sole);
      this.hips.add(leg);
    }
    const blob = new THREE.Mesh(new THREE.CircleGeometry(0.34, 20), new THREE.MeshBasicMaterial({ color: '#000', transparent: true, opacity: 0.18, depthWrite: false }));
    blob.rotation.x = -Math.PI / 2; blob.position.y = 0.02; this.root.add(blob);
    headM.castShadow = true;
    this.setLook(look);
  }

  /** Saç modeli: kapak + stile göre hacimler (perçem, yan tutamlar, at kuyruğu, topuz, bukleler). */
  private buildHair(style: HairStyle) {
    const H = this.hairMat, s = this.hairSlot; s.clear();
    const capM = new THREE.Mesh(new THREE.SphereGeometry(0.315, 26, 14, 0, Math.PI * 2, 0, Math.PI * 0.56), H);
    capM.rotation.x = -0.32; capM.position.set(0, 0.03, -0.015); s.add(capM); capM.castShadow = true;
    const back = new THREE.Mesh(sph(0.3, 20, 14), H); back.scale.set(1.04, 0.88, 0.75); back.position.set(0, -0.03, -0.085); s.add(back);
    const add = (g: THREE.BufferGeometry, x: number, y: number, z: number, rx = 0, ry = 0, rz = 0, sc?: [number, number, number]) => { const m = new THREE.Mesh(g, H); m.position.set(x, y, z); m.rotation.set(rx, ry, rz); if (sc) m.scale.set(...sc); s.add(m); return m; };
    // perçem: yüze düşen 3 tutam
    const fringe = style === 'kivircik' ? 0 : 3;
    for (let i = 0; i < fringe; i++) add(sph(0.1, 12, 8), -0.12 + i * 0.12, 0.2 - Math.abs(i - 1) * 0.02, 0.2, 0, 0, (i - 1) * -0.5, [1.25, 0.5, 0.75]);
    if (style === 'kisa') {
      for (const sx of [-1, 1]) add(sph(0.08, 10, 8), sx * 0.27, 0.02, 0.04, 0, 0, 0, [0.5, 1, 0.9]);
    } else if (style === 'dalgali') {
      for (const sx of [-1, 1]) for (let i = 0; i < 3; i++) add(sph(0.09, 10, 8), sx * (0.28 + i * 0.01), -0.02 - i * 0.08, -0.02 - i * 0.03, 0, 0, sx * 0.3, [0.7, 1, 0.9]);
      for (let i = 0; i < 4; i++) add(sph(0.11, 10, 8), -0.18 + i * 0.12, -0.2, -0.17, 0, 0, 0, [1, 0.9, 0.8]);
    } else if (style === 'uzun') {
      add(cap(0.22, 0.32), 0, -0.25, -0.12, 0.12, 0, 0, [1.25, 1, 0.55]);
      for (const sx of [-1, 1]) add(cap(0.07, 0.3), sx * 0.25, -0.18, 0.06, 0.05, 0, sx * 0.08);
    } else if (style === 'atkuyrugu') {
      add(new THREE.TorusGeometry(0.045, 0.02, 6, 12), 0, 0.12, -0.3, 0.4, 0, 0).material = mat('#c8423a');
      add(cap(0.07, 0.3), 0, -0.05, -0.36, -0.5, 0, 0);
      add(sph(0.08, 10, 8), 0, -0.24, -0.43);
    } else if (style === 'topuz') {
      add(sph(0.13, 14, 10), 0, 0.27, -0.17);
      add(new THREE.TorusGeometry(0.1, 0.022, 6, 14), 0, 0.2, -0.13, 1.2, 0, 0).material = mat('#f2c94c');
    } else if (style === 'kivircik') {
      for (let i = 0; i < 22; i++) { const a = i / 22 * Math.PI * 2, y = 0.12 + Math.sin(i * 1.7) * 0.06; add(sph(0.085, 9, 7), Math.cos(a) * 0.28, y + (Math.sin(a) < 0 ? -0.05 : 0.06), Math.sin(a) * 0.25 - 0.03); }
      for (let i = 0; i < 7; i++) add(sph(0.09, 9, 7), -0.18 + i * 0.06, 0.27 - Math.abs(i - 3) * 0.02, 0.03 - Math.abs(i - 3) * 0.03);
    }
  }

  /** Gövde katmanları: iç tişört + ceket/kazak/yağmurluk/hırka + atkı; kol ve bot renkleri. */
  private buildClothes() {
    const c = this.clothes; c.clear();
    const o = outfitSpec(this.look);
    const coat = mat(o.coat), inner = mat(o.inner);
    // iç gövde (tişört)
    const body = new THREE.Mesh(cap(0.19, 0.2), inner); body.scale.set(1.12, 1, 0.86); body.position.y = 0.21; c.add(body); body.castShadow = true;
    const belt = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.21, 0.1, 16), this.pantsMat); belt.position.y = 0.02; belt.scale.z = 0.88; c.add(belt);
    if (o.kind === 'sweater') {
      const sw = new THREE.Mesh(cap(0.2, 0.2), coat); sw.scale.set(1.13, 1, 0.88); sw.position.y = 0.22; c.add(sw);
      const knit = new THREE.Mesh(new THREE.TorusGeometry(0.11, 0.045, 8, 16), mat('#c98b2a')); knit.rotation.x = Math.PI / 2; knit.position.y = 0.45; c.add(knit);
      const hem = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.03, 6, 18), coat); hem.rotation.x = Math.PI / 2; hem.scale.y = 0.88; hem.position.y = 0.07; c.add(hem);
    } else {
      // açık ön kesimli ceket kabuğu (yanlardan sarar, önde iç tişört görünür)
      const open = o.kind === 'rain' ? 0.25 : 0.55;
      const prof: THREE.Vector2[] = [];
      for (let i = 0; i <= 10; i++) { const a = -Math.PI / 2 + i / 10 * Math.PI; prof.push(new THREE.Vector2(Math.max(0.02, Math.cos(a) * 0.215), 0.21 + Math.sin(a) * 0.3)); }
      const shell = new THREE.Mesh(new THREE.LatheGeometry(prof, 20, open, Math.PI * 2 - open * 2), coat); (shell.material as THREE.MeshStandardMaterial).side = THREE.DoubleSide;
      shell.scale.set(1.13, 1, 0.9); c.add(shell); shell.castShadow = true;
      for (const sx of [-1, 1]) { // yaka
        const lap = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.16, 0.025), coat); lap.position.set(sx * 0.07, 0.4, 0.19); lap.rotation.set(-0.25, 0, sx * 0.35); c.add(lap);
      }
      if (o.kind === 'rain') {
        const hood = new THREE.Mesh(new THREE.TorusGeometry(0.17, 0.065, 8, 18), coat); hood.rotation.x = Math.PI / 2 + 0.3; hood.position.set(0, 0.46, -0.06); c.add(hood);
        for (let i = 0; i < 3; i++) { const bt = new THREE.Mesh(sph(0.016, 6, 4), mat(this.look.outfit === 'yagmurluk' ? '#2f5d62' : '#333')); bt.position.set(0.04, 0.34 - i * 0.1, 0.2); c.add(bt); }
      }
      if (o.kind === 'jacket') for (const sx of [-1, 1]) { const pocket = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.05, 0.02), mat(new THREE.Color(o.coat).multiplyScalar(0.8))); pocket.position.set(sx * 0.13, 0.12, 0.18); pocket.rotation.y = sx * 0.4; c.add(pocket); }
    }
    if (o.scarf) { // atkı: boyun halkası + sarkan uç
      const sc = mat(o.scarf, { roughness: 0.95 });
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.055, 8, 18), sc); ring.rotation.x = Math.PI / 2; ring.position.y = 0.46; c.add(ring);
      const tail = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.24, 0.04), sc); tail.position.set(-0.08, 0.33, 0.19); tail.rotation.set(-0.15, 0, 0.12); c.add(tail);
      for (let i = 0; i < 3; i++) { const st = new THREE.Mesh(new THREE.BoxGeometry(0.082, 0.015, 0.042), mat(new THREE.Color(o.scarf).multiplyScalar(0.75))); st.position.set(-0.08 - i * 0.004, 0.27 - i * 0.04, 0.197); st.rotation.set(-0.15, 0, 0.12); c.add(st); }
    }
    this.sleeveMats.forEach(m => m.color.set(o.coat));
    this.bootMats.forEach(m => m.color.set(o.boots));
  }

  setLook(look: HumanLook) {
    this.look = look;
    this.skinMat.color.set(look.skin); this.hairMat.color.set(look.hair);
    if (look.pants) this.pantsMat.color.set(look.pants);
    this.buildHair(look.hairStyle ?? (look.gender === 'f' ? 'uzun' : 'kisa'));
    this.buildClothes();
    this.setHat(look.hat);
    mergeStatic(this.root);
  }

  setHat(id: string | null) {
    this.hatSlot.clear();
    this.hairSlot.scale.setScalar(id ? 0.97 : 1);
    const it = id ? itemById(id) : null; if (!it) return;
    const c = mat(it.color), c2 = mat(it.color2 ?? it.color);
    if (id === 'kasket') {
      const top = new THREE.Mesh(new THREE.SphereGeometry(0.33, 18, 8, 0, Math.PI * 2, 0, Math.PI / 2), c); top.scale.set(1.02, 0.5, 1.05); top.position.y = 0.13; this.hatSlot.add(top);
      const brim = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.03, 16, 1, false, -Math.PI / 2, Math.PI), c); brim.position.set(0, 0.14, 0.22); brim.scale.z = 0.7; this.hatSlot.add(brim);
    } else if (id === 'bere') {
      const top = new THREE.Mesh(new THREE.SphereGeometry(0.33, 18, 10, 0, Math.PI * 2, 0, Math.PI / 2), c); top.scale.y = 0.85; top.position.y = 0.07; this.hatSlot.add(top);
      const band = new THREE.Mesh(new THREE.TorusGeometry(0.31, 0.055, 8, 22), c2); band.rotation.x = Math.PI / 2; band.position.y = 0.08; this.hatSlot.add(band);
      const pom = new THREE.Mesh(sph(0.085, 10, 8), c2); pom.position.y = 0.36; this.hatSlot.add(pom);
    } else if (id === 'hasir') {
      const brim = new THREE.Mesh(new THREE.CylinderGeometry(0.52, 0.52, 0.03, 26), c); brim.position.y = 0.15; this.hatSlot.add(brim);
      const top = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.28, 0.2, 18), c); top.position.y = 0.26; this.hatSlot.add(top);
      const band = new THREE.Mesh(new THREE.CylinderGeometry(0.285, 0.285, 0.05, 18), c2); band.position.y = 0.19; this.hatSlot.add(band);
    } else if (id === 'kedi_kulak') {
      const top = new THREE.Mesh(new THREE.SphereGeometry(0.33, 18, 10, 0, Math.PI * 2, 0, Math.PI / 2), c); top.scale.y = 0.75; top.position.y = 0.07; this.hatSlot.add(top);
      for (const sx of [-1, 1]) { const ear = new THREE.Mesh(new THREE.ConeGeometry(0.085, 0.17, 8), c); ear.position.set(sx * 0.17, 0.3, 0); ear.rotation.z = -sx * 0.3; this.hatSlot.add(ear); }
    }
  }

  act(a: Action, dur = 1.2, onPeak?: () => void) {
    this.action = a; this.actT = 0; this.actDur = dur; this.onPeak = onPeak ?? null; this.peakDone = false;
  }
  get busy() { return this.action !== null; }

  update(dt: number) {
    this.t += dt;
    const sp = Math.min(this.speed, 6);
    const moving = sp > 0.15;
    this.phase += dt * (4 + sp * 2.1);
    const walkAmt = Math.min(1, sp / 3.2);
    const s = Math.sin(this.phase), c = Math.cos(this.phase);
    let hipY = 0.52, lean = 0, legLX = 0, legRX = 0, kneeL = 0, kneeR = 0, armLX = 0, armRX = 0, armLZ = -0.12, armRZ = 0.12, foreL = -0.15, foreR = -0.15, headX = 0, headY = 0, headZ = 0;
    if (moving) {
      legLX = s * 0.8 * walkAmt; legRX = -s * 0.8 * walkAmt;
      kneeL = Math.max(0, -Math.sin(this.phase - 0.6)) * 1.0 * walkAmt; kneeR = Math.max(0, Math.sin(this.phase - 0.6)) * 1.0 * walkAmt;
      armLX = -s * 0.7 * walkAmt; armRX = s * 0.7 * walkAmt;
      foreL = -0.3 - Math.max(0, -s) * 0.4 * walkAmt; foreR = -0.3 - Math.max(0, s) * 0.4 * walkAmt;
      hipY += Math.abs(c) * 0.05 * walkAmt - 0.02 * walkAmt;
      lean = 0.1 * walkAmt + (sp > 4 ? 0.08 : 0);
      headX = -lean * 0.5; headZ = s * 0.04 * walkAmt;
    } else {
      const br = Math.sin(this.t * 2.2);
      hipY += br * 0.004;
      armLZ = -0.12 - br * 0.02; armRZ = 0.12 + br * 0.02;
      headY = Math.sin(this.t * 0.45) * 0.25 * (Math.sin(this.t * 0.17) > 0.3 ? 1 : 0.2);
      headZ = Math.sin(this.t * 0.7) * 0.04;
    }
    if (this.sitting) { hipY = 0.4; legLX = legRX = -1.45; kneeL = kneeR = 1.45; armLX = armRX = -0.5; foreL = foreR = -0.6; }
    if (this.action) {
      this.actT += dt;
      const u = this.actT / this.actDur;
      const k = Math.sin(Math.min(1, u) * Math.PI);
      const kk = Math.min(1, k * 1.6);
      if (!this.peakDone && u >= 0.5) { this.peakDone = true; this.onPeak?.(); }
      if (this.action === 'kneel') {
        hipY -= 0.24 * kk; legLX = legRX = -1.3 * kk; kneeL = kneeR = 2.1 * kk; lean = 0.55 * kk;
        armRX = -1.1 * kk; armLX = -0.4 * kk; foreR = -0.2; headX = 0.25 * kk;
      } else if (this.action === 'pet') {
        hipY -= 0.26 * kk; legLX = -1.2 * kk; legRX = -0.4 * kk; kneeL = 2.0 * kk; kneeR = 1.7 * kk; lean = 0.55 * kk;
        armRX = (-1.25 + Math.sin(this.actT * 14) * 0.18) * kk; foreR = -0.2; armLX = -0.3 * kk; headX = 0.35 * kk;
      } else if (this.action === 'throw') {
        const wind = u < 0.45 ? u / 0.45 : 1 - (u - 0.45) / 0.55;
        armRX = u < 0.45 ? 2.2 * wind : -1.4 * (1 - wind) * 1.5 + 0.2; foreR = -0.5; lean = u < 0.45 ? -0.1 : 0.25 * k;
      } else if (this.action === 'wave') {
        armRZ = 2.6 * kk; armRX = 0; foreR = -0.3 + Math.sin(this.actT * 12) * 0.5 * kk; headZ = 0.12 * kk;
      }
      if (u >= 1) { this.action = null; this.onPeak = null; }
    }
    this.hips.position.y = hipY;
    this.torso.rotation.x = lean;
    this.legL.rotation.x = legLX; this.legR.rotation.x = legRX;
    this.shinL.rotation.x = kneeL; this.shinR.rotation.x = kneeR;
    this.armL.rotation.set(armLX, 0, armLZ); this.armR.rotation.set(armRX, 0, armRZ);
    this.foreL.rotation.x = foreL; this.foreR.rotation.x = foreR;
    this.head.rotation.set(headX, headY, headZ);
    this.blink -= dt;
    const closed = this.blink < 0.12;
    if (this.blink < 0) this.blink = 2 + Math.random() * 3;
    for (const e of this.eyes) e.scale.y = closed ? 0.12 : 1;
  }
}
