// Yuvarlak hatlı "chibi" karakter: eklem hiyerarşisi + kodla animasyon (yürü, dur, eğil-mama koy, sev, top at, otur).
import * as THREE from 'three';
import { itemById } from '../core/catalog';

export type Action = 'kneel' | 'pet' | 'throw' | 'wave' | null;

const lam = (c: string) => new THREE.MeshLambertMaterial({ color: c });
const cap = (r: number, l: number) => new THREE.CapsuleGeometry(r, l, 4, 10);

export interface HumanLook { outfit: string; hat: string | null; skin: string; hair: string; pants?: string; shirt?: string }

export class Human {
  root = new THREE.Group();
  private hips = new THREE.Group();
  private torso = new THREE.Group();
  private head = new THREE.Group();
  private armL = new THREE.Group(); private armR = new THREE.Group();
  private foreL = new THREE.Group(); private foreR = new THREE.Group();
  private legL = new THREE.Group(); private legR = new THREE.Group();
  private shinL = new THREE.Group(); private shinR = new THREE.Group();
  private eyes: THREE.Mesh[] = [];
  private hatSlot = new THREE.Group();
  private shirtMats: THREE.MeshLambertMaterial[] = [];
  private accentMats: THREE.MeshLambertMaterial[] = [];
  private outfitExtras = new THREE.Group();
  hand = new THREE.Group(); // sağ el ucu (kase/top tutmak için)

  speed = 0;         // anlık hız (m/s)
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
    const skin = lam(look.skin), hair = lam(look.hair), pants = lam(look.pants ?? '#3d4f6b'), shoe = lam('#f4efe6'), sole = lam('#5a3a28');
    const shirt = lam('#f07f6a');
    this.shirtMats.push(shirt);
    this.root.add(this.hips);
    this.hips.position.y = 0.56;

    // gövde (yumuşak hatlı)
    const body = new THREE.Mesh(cap(0.2, 0.22), shirt); body.scale.set(1.12, 1, 0.86); body.position.y = 0.2;
    this.torso.add(body);
    const belt = new THREE.Mesh(new THREE.CylinderGeometry(0.205, 0.215, 0.1, 14), pants); belt.position.y = 0.02; belt.scale.z = 0.88; this.torso.add(belt);
    this.torso.add(this.outfitExtras);
    this.hips.add(this.torso);

    // kafa
    this.head.position.y = 0.55;
    const headM = new THREE.Mesh(new THREE.SphereGeometry(0.27, 20, 16), skin); headM.scale.set(1, 0.95, 0.95); this.head.add(headM);
    const hairCap = new THREE.Mesh(new THREE.SphereGeometry(0.29, 20, 12, 0, Math.PI * 2, 0, Math.PI * 0.55), hair);
    hairCap.rotation.x = -0.35; hairCap.position.set(0, 0.03, -0.02); this.head.add(hairCap);
    const back = new THREE.Mesh(new THREE.SphereGeometry(0.27, 16, 12), hair); back.scale.set(1.02, 0.85, 0.7); back.position.set(0, -0.02, -0.08); this.head.add(back);
    for (const sx of [-1, 1]) { // perçem
      const bang = new THREE.Mesh(new THREE.SphereGeometry(0.11, 10, 8), hair); bang.scale.set(1.3, 0.55, 0.8); bang.position.set(sx * 0.1, 0.16, 0.2); bang.rotation.z = sx * 0.4; this.head.add(bang);
    }
    const eyeG = new THREE.SphereGeometry(0.042, 10, 8), eyeM = lam('#2a1f1a'), glint = new THREE.MeshBasicMaterial({ color: '#ffffff' });
    for (const sx of [-1, 1]) {
      const e = new THREE.Mesh(eyeG, eyeM); e.scale.set(0.85, 1.15, 0.5); e.position.set(sx * 0.1, 0.0, 0.245); this.head.add(e); this.eyes.push(e);
      const gl = new THREE.Mesh(new THREE.SphereGeometry(0.013, 6, 4), glint); gl.position.set(0.012, 0.018, 0.02); e.add(gl);
      const cheek = new THREE.Mesh(new THREE.CircleGeometry(0.045, 12), new THREE.MeshBasicMaterial({ color: '#f29a8a', transparent: true, opacity: 0.55 }));
      cheek.position.set(sx * 0.16, -0.07, 0.228); cheek.rotation.y = sx * 0.45; this.head.add(cheek);
      const ear = new THREE.Mesh(new THREE.SphereGeometry(0.055, 8, 6), skin); ear.position.set(sx * 0.265, -0.01, 0); ear.scale.set(0.6, 1, 0.8); this.head.add(ear);
    }
    const mouth = new THREE.Mesh(new THREE.TorusGeometry(0.03, 0.009, 4, 10, Math.PI), eyeM); mouth.position.set(0, -0.09, 0.25); mouth.rotation.z = Math.PI; this.head.add(mouth);
    this.head.add(this.hatSlot);
    this.torso.add(this.head);

    // kollar: omuz -> dirsek -> el
    for (const [arm, fore, sx] of [[this.armL, this.foreL, -1], [this.armR, this.foreR, 1]] as const) {
      arm.position.set(sx * 0.25, 0.34, 0);
      const up = new THREE.Mesh(cap(0.065, 0.12), shirt); up.position.y = -0.1; arm.add(up);
      fore.position.y = -0.2; arm.add(fore);
      const lo = new THREE.Mesh(cap(0.058, 0.1), skin); lo.position.y = -0.08; fore.add(lo);
      const hand = new THREE.Mesh(new THREE.SphereGeometry(0.07, 10, 8), skin); hand.position.y = -0.18; fore.add(hand);
      if (sx === 1) { this.hand.position.y = -0.22; fore.add(this.hand); }
      this.torso.add(arm);
    }
    // bacaklar: kalça -> diz -> ayakkabı
    for (const [leg, shin, sx] of [[this.legL, this.shinL, -1], [this.legR, this.shinR, 1]] as const) {
      leg.position.set(sx * 0.1, 0, 0);
      const th = new THREE.Mesh(cap(0.085, 0.12), pants); th.position.y = -0.11; leg.add(th);
      shin.position.y = -0.24; leg.add(shin);
      const sh = new THREE.Mesh(cap(0.075, 0.1), pants); sh.position.y = -0.08; shin.add(sh);
      const shoeM = new THREE.Mesh(new THREE.SphereGeometry(0.1, 12, 8), shoe); shoeM.scale.set(0.85, 0.6, 1.35); shoeM.position.set(0, -0.23, 0.04); shin.add(shoeM);
      const soleM = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.085, 0.03, 10), sole); soleM.scale.z = 1.5; soleM.position.set(0, -0.28, 0.04); shin.add(soleM);
      this.hips.add(leg);
    }
    // yumuşak gölge lekesi
    const blob = new THREE.Mesh(new THREE.CircleGeometry(0.34, 20), new THREE.MeshBasicMaterial({ color: '#000', transparent: true, opacity: 0.18, depthWrite: false }));
    blob.rotation.x = -Math.PI / 2; blob.position.y = 0.02; this.root.add(blob);

    // gölgeyi yalnız büyük parçalar düşürür (mobilde çizim çağrısı tasarrufu)
    body.castShadow = headM.castShadow = hairCap.castShadow = true;
    this.setLook(look);
  }

  setLook(look: HumanLook) {
    const outfit = itemById(look.outfit);
    const col = look.shirt ?? outfit?.color ?? '#f07f6a';
    this.shirtMats.forEach(m => m.color.set(col));
    this.outfitExtras.clear();
    const id = look.outfit;
    if (id === 'yagmurluk') { // kapüşon + düğmeler
      const hood = new THREE.Mesh(new THREE.TorusGeometry(0.17, 0.06, 8, 16), lam(col)); hood.rotation.x = Math.PI / 2; hood.position.set(0, 0.42, -0.03); this.outfitExtras.add(hood);
      for (let i = 0; i < 3; i++) { const bt = new THREE.Mesh(new THREE.SphereGeometry(0.018, 6, 4), lam(outfit!.color2!)); bt.position.set(0, 0.32 - i * 0.1, 0.18); this.outfitExtras.add(bt); }
    } else if (id === 'kazak_hardal') { // örgü yaka
      const col2 = new THREE.Mesh(new THREE.TorusGeometry(0.11, 0.04, 8, 16), lam('#c98b2a')); col2.rotation.x = Math.PI / 2; col2.position.y = 0.43; this.outfitExtras.add(col2);
    } else if (id === 'hirka_mavi') { // açık hırka içi beyaz
      const inner = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.36, 0.05), lam(outfit!.color2!)); inner.position.set(0, 0.2, 0.17); this.outfitExtras.add(inner);
    } else { // tişört yakası
      const neck = new THREE.Mesh(new THREE.TorusGeometry(0.09, 0.025, 6, 14), lam('#ffffff')); neck.rotation.x = Math.PI / 2; neck.position.y = 0.43; this.outfitExtras.add(neck);
    }
    this.setHat(look.hat);
  }

  setHat(id: string | null) {
    this.hatSlot.clear();
    const it = id ? itemById(id) : null; if (!it) return;
    const c = lam(it.color), c2 = lam(it.color2 ?? it.color);
    if (id === 'kasket') {
      const top = new THREE.Mesh(new THREE.SphereGeometry(0.3, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), c); top.scale.set(1.02, 0.5, 1.05); top.position.y = 0.12; this.hatSlot.add(top);
      const brim = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.03, 16, 1, false, -Math.PI / 2, Math.PI), c); brim.position.set(0, 0.13, 0.2); brim.scale.z = 0.7; this.hatSlot.add(brim);
    } else if (id === 'bere') {
      const top = new THREE.Mesh(new THREE.SphereGeometry(0.3, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2), c); top.scale.y = 0.85; top.position.y = 0.06; this.hatSlot.add(top);
      const band = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.05, 8, 20), c2); band.rotation.x = Math.PI / 2; band.position.y = 0.07; this.hatSlot.add(band);
      const pom = new THREE.Mesh(new THREE.SphereGeometry(0.08, 10, 8), c2); pom.position.y = 0.33; this.hatSlot.add(pom);
    } else if (id === 'hasir') {
      const brim = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.48, 0.03, 24), c); brim.position.y = 0.14; this.hatSlot.add(brim);
      const top = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.26, 0.2, 18), c); top.position.y = 0.25; this.hatSlot.add(top);
      const band = new THREE.Mesh(new THREE.CylinderGeometry(0.265, 0.265, 0.05, 18), c2); band.position.y = 0.18; this.hatSlot.add(band);
    } else if (id === 'kedi_kulak') {
      const top = new THREE.Mesh(new THREE.SphereGeometry(0.3, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2), c); top.scale.y = 0.75; top.position.y = 0.06; this.hatSlot.add(top);
      for (const sx of [-1, 1]) { const ear = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.16, 8), c); ear.position.set(sx * 0.16, 0.28, 0); ear.rotation.z = -sx * 0.3; this.hatSlot.add(ear); }
    }

  }

  /** Eylem başlat: ortasında (tepe anında) onPeak çağrılır, ör. kaseyi yere koymak. */
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

    // temel duruş
    let hipY = 0.56, lean = 0, legLX = 0, legRX = 0, kneeL = 0, kneeR = 0, armLX = 0, armRX = 0, armLZ = -0.12, armRZ = 0.12, foreL = -0.15, foreR = -0.15, headX = 0, headY = 0;

    if (moving) {
      legLX = s * 0.8 * walkAmt; legRX = -s * 0.8 * walkAmt;
      kneeL = Math.max(0, -Math.sin(this.phase - 0.6)) * 1.0 * walkAmt; kneeR = Math.max(0, Math.sin(this.phase - 0.6)) * 1.0 * walkAmt;
      armLX = -s * 0.7 * walkAmt; armRX = s * 0.7 * walkAmt;
      foreL = -0.3 - Math.max(0, -s) * 0.4 * walkAmt; foreR = -0.3 - Math.max(0, s) * 0.4 * walkAmt;
      hipY += Math.abs(c) * 0.05 * walkAmt - 0.02 * walkAmt;
      lean = 0.1 * walkAmt + (sp > 4 ? 0.08 : 0);
      headX = -lean * 0.5;
    } else {
      const br = Math.sin(this.t * 2.2);
      hipY += br * 0.004;
      armLZ = -0.12 - br * 0.02; armRZ = 0.12 + br * 0.02;
      headY = Math.sin(this.t * 0.45) * 0.25 * (Math.sin(this.t * 0.17) > 0.3 ? 1 : 0.2);
    }
    if (this.sitting) { hipY = 0.42; legLX = legRX = -1.45; kneeL = kneeR = 1.45; armLX = armRX = -0.5; foreL = foreR = -0.6; }

    // eylemler (yumuşak giriş-çıkış)
    if (this.action) {
      this.actT += dt;
      const u = this.actT / this.actDur;
      const k = Math.sin(Math.min(1, u) * Math.PI); // 0 -> 1 -> 0
      const kk = Math.min(1, k * 1.6);
      if (!this.peakDone && u >= 0.5) { this.peakDone = true; this.onPeak?.(); }
      if (this.action === 'kneel') {
        hipY -= 0.26 * kk; legLX = legRX = -1.3 * kk; kneeL = kneeR = 2.1 * kk; lean = 0.55 * kk;
        armRX = -1.1 * kk; armLX = -0.4 * kk; foreR = -0.2; headX = 0.25 * kk;
      } else if (this.action === 'pet') {
        hipY -= 0.22 * kk; legLX = -1.1 * kk; legRX = -0.4 * kk; kneeL = 1.9 * kk; kneeR = 1.6 * kk; lean = 0.45 * kk;
        armRX = (-1.15 + Math.sin(this.actT * 14) * 0.18) * kk; foreR = -0.2; armLX = -0.3 * kk; headX = 0.3 * kk;
      } else if (this.action === 'throw') {
        const wind = u < 0.45 ? u / 0.45 : 1 - (u - 0.45) / 0.55;
        armRX = u < 0.45 ? 2.2 * wind : -1.4 * (1 - wind) * 1.5 + 0.2; foreR = -0.5; lean = u < 0.45 ? -0.1 : 0.25 * k;
      } else if (this.action === 'wave') {
        armRZ = 2.6 * kk; armRX = 0; foreR = -0.3 + Math.sin(this.actT * 12) * 0.5 * kk;
      }
      if (u >= 1) { this.action = null; this.onPeak = null; }
    }

    this.hips.position.y = hipY;
    this.torso.rotation.x = lean;
    this.legL.rotation.x = legLX; this.legR.rotation.x = legRX;
    this.shinL.rotation.x = kneeL; this.shinR.rotation.x = kneeR;
    this.armL.rotation.set(armLX, 0, armLZ); this.armR.rotation.set(armRX, 0, armRZ);
    this.foreL.rotation.x = foreL; this.foreR.rotation.x = foreR;
    this.head.rotation.set(headX, headY, 0);
    // göz kırpma
    this.blink -= dt;
    const closed = this.blink < 0.12;
    if (this.blink < 0) this.blink = 2 + Math.random() * 3;
    for (const e of this.eyes) e.scale.y = closed ? 0.15 : 1.15;
  }
}
