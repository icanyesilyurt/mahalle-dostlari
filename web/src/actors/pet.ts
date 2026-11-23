// Kedi/köpek modeli: ırk parametrelerinden üretilir (renk, desen, boy, kulak, kuyruk, tüy).
// Animasyonlar: yürü/koş, otur, uzan-uyu, mama ye, sevil (göz kapalı + kuyruk), kuyruk salla.
import * as THREE from 'three';
import { Breed, itemById } from '../core/catalog';
import { rng } from '../world/kit';

export type PetPose = 'stand' | 'sit' | 'lie' | 'eat' | 'happy' | 'beg';

const lam = (c: string | THREE.Color, map?: THREE.Texture) => new THREE.MeshLambertMaterial({ color: c, map: map ?? null });

function patternTexture(b: Breed, seed: number): THREE.CanvasTexture {
  const c = document.createElement('canvas'); c.width = 256; c.height = 128;
  const g = c.getContext('2d')!; const L = b.look; const r = rng(seed);
  g.fillStyle = L.body; g.fillRect(0, 0, 256, 128);
  // u: gövde çevresi (0.75 = sırt), v: boy (0 = kuyruk, 1 = göğüs)
  const mark = L.mark ?? '#333';
  if (L.pattern === 'tabby') {
    g.strokeStyle = mark; g.lineCap = 'round';
    for (let v = 10; v < 120; v += 13) {
      g.lineWidth = r.range(4, 7);
      g.beginPath(); g.moveTo(128 + 8, v + r.range(-3, 3));
      for (let u = 136; u <= 248; u += 14) g.lineTo(u, v + Math.sin(u * 0.12 + v) * 4);
      g.stroke();
    }
    g.lineWidth = 9; g.beginPath(); g.moveTo(192, 0); g.lineTo(192, 128); g.stroke();
  } else if (L.pattern === 'spots') {
    g.fillStyle = mark;
    for (let i = 0; i < 70; i++) { g.beginPath(); g.ellipse(r.range(0, 256), r.range(0, 128), r.range(3, 7), r.range(3, 6), 0, 0, 7); g.fill(); }
  } else if (L.pattern === 'calico') {
    for (let i = 0; i < 9; i++) { g.fillStyle = i % 2 ? mark : '#2b2727'; g.beginPath(); g.ellipse(r.range(120, 256), r.range(0, 128), r.range(16, 34), r.range(12, 26), r.next() * 3, 0, 7); g.fill(); }
  } else if (L.pattern === 'saddle') {
    g.fillStyle = mark; g.beginPath(); g.ellipse(192, 60, 60, 44, 0, 0, 7); g.fill();
  }
  // yumuşak geçiş için hafif gürültü (tüy hissi)
  for (let i = 0; i < 900; i++) { g.fillStyle = `rgba(${r.chance(0.5) ? '255,255,255' : '0,0,0'},0.05)`; g.fillRect(r.int(0, 255), r.int(0, 127), 1, r.int(2, 5)); }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}

export class Pet {
  root = new THREE.Group();
  body = new THREE.Group();
  head = new THREE.Group();
  mouth = new THREE.Group();
  private legs: THREE.Group[] = [];
  private tail: THREE.Group[] = [];
  private eyes: THREE.Mesh[] = [];
  private ears: THREE.Group[] = [];
  private tongue?: THREE.Mesh;
  private wearSlot = new THREE.Group();
  private collarSlot = new THREE.Group();
  readonly cat: boolean;
  readonly height: number;
  readonly radius: number;
  private bodyY: number;
  private legLen: number;
  private bodyLen: number;
  private bodyR: number;

  speed = 0;
  pose: PetPose = 'stand';
  private poseK: Record<PetPose, number> = { stand: 1, sit: 0, lie: 0, eat: 0, happy: 0, beg: 0 };
  wag = 0.3;          // 0..1 kuyruk sallama isteği
  private phase = Math.random() * 6;
  private t = Math.random() * 10;
  private blink = 1 + Math.random() * 3;
  lookYaw = 0;        // kafa dönüşü (yerel)
  sleeping = false;

  constructor(public breed: Breed, seed = 1, opts: { wear?: string; collar?: string } = {}) {
    const L = breed.look; this.cat = breed.species === 'cat';
    const s = L.size * (this.cat ? 1.22 : 1.3);
    this.bodyR = (this.cat ? 0.15 : 0.18) * s * (1 + (L.fluff ?? 0) * 0.12);
    this.bodyLen = (this.cat ? 0.5 : 0.62) * s * (L.long ?? 1);
    this.legLen = (this.cat ? 0.2 : 0.27) * s * (L.legs ?? 1);
    this.bodyY = this.legLen + this.bodyR * 0.75;
    const headR = (this.cat ? 0.158 : 0.172) * s * (L.head ?? 1);
    this.height = this.bodyY + this.bodyR + headR * 1.6;
    this.radius = Math.max(this.bodyLen * 0.55, 0.25);

    const tex = patternTexture(breed, seed);
    const bodyMat = lam('#ffffff', tex);
    const plain = lam(L.body), belly = lam(L.belly);
    const isPoints = L.pattern === 'points', isMask = L.pattern === 'mask';
    const extremity = lam(isPoints ? L.mark! : L.body);
    const faceMark = lam(isMask || isPoints ? L.mark! : L.belly);

    this.root.add(this.body);
    this.body.position.y = this.bodyY;
    // gövde: kutupları ileri-geri bakan küre (desen dokusu için)
    const torsoG = new THREE.SphereGeometry(1, 22, 16); torsoG.rotateX(Math.PI / 2);
    const torso = new THREE.Mesh(torsoG, bodyMat); torso.scale.set(this.bodyR, this.bodyR * 0.95, this.bodyLen / 2); this.body.add(torso);
    const bel = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 12), belly); bel.scale.set(this.bodyR * 0.82, this.bodyR * 0.7, this.bodyLen * 0.42); bel.position.y = -this.bodyR * 0.3; this.body.add(bel);
    // göğüs (smokin beyazı / tüylü yele)
    const chestS = 1 + (L.fluff ?? 0) * 0.5;
    const chest = new THREE.Mesh(new THREE.SphereGeometry(1, 14, 10), L.pattern === 'tuxedo' || L.pattern === 'calico' ? belly : (L.fluff ? belly : plain));
    chest.scale.set(this.bodyR * 0.8 * chestS, this.bodyR * 0.85 * chestS, this.bodyR * 0.7 * chestS); chest.position.set(0, -this.bodyR * 0.05, this.bodyLen * 0.36); this.body.add(chest);
    this.body.add(this.wearSlot);

    // kafa
    this.head.position.set(0, this.bodyR * 0.85, this.bodyLen / 2 + headR * 0.35);
    this.body.add(this.head);
    const skull = new THREE.Mesh(new THREE.SphereGeometry(headR, 18, 14), isPoints ? lam(L.body) : plain);
    skull.scale.set(this.cat ? 1.08 : 1, this.cat ? 0.92 : 0.95, this.cat ? 0.95 : 1.05); this.head.add(skull);
    if (L.pattern === 'tabby') for (const sx of [-1, 0, 1]) { const st = new THREE.Mesh(new THREE.BoxGeometry(headR * 0.12, headR * 0.05, headR * 0.5), lam(L.mark!)); st.position.set(sx * headR * 0.3, headR * 0.85, headR * 0.2); st.rotation.y = sx * 0.3; this.head.add(st); }
    if (L.pattern === 'tuxedo' || L.pattern === 'calico') { const blaze = new THREE.Mesh(new THREE.SphereGeometry(headR * 0.55, 12, 8), belly); blaze.scale.set(0.8, 1, 0.6); blaze.position.set(0, -headR * 0.25, headR * 0.6); this.head.add(blaze); }

    const eyeCol = L.eyes ?? (this.cat ? '#d8b23a' : '#3a2a20');
    const eyeR = headR * (this.cat ? 0.22 : 0.17);
    for (const sx of [-1, 1]) {
      const e = new THREE.Mesh(new THREE.SphereGeometry(eyeR, 12, 10), lam(this.cat ? eyeCol : '#2a1f1a'));
      e.position.set(sx * headR * 0.42, headR * 0.12, headR * 0.82); e.scale.z = 0.55; this.head.add(e); this.eyes.push(e);
      if (this.cat) { const pupil = new THREE.Mesh(new THREE.SphereGeometry(eyeR * 0.5, 8, 6), lam('#151010')); pupil.scale.set(0.45, 1.2, 0.6); pupil.position.z = eyeR * 0.75; e.add(pupil); }
      const gl = new THREE.Mesh(new THREE.SphereGeometry(eyeR * 0.28, 6, 4), new THREE.MeshBasicMaterial({ color: '#fff' })); gl.position.set(eyeR * 0.3, eyeR * 0.35, eyeR * 0.8); e.add(gl);
    }
    // burun/ağız
    if (this.cat) {
      for (const sx of [-1, 1]) { const pad = new THREE.Mesh(new THREE.SphereGeometry(headR * 0.24, 10, 8), faceMark); pad.position.set(sx * headR * 0.16, -headR * 0.3, headR * 0.82); this.head.add(pad); }
      const nose = new THREE.Mesh(new THREE.SphereGeometry(headR * 0.1, 8, 6), lam('#e8889a')); nose.scale.set(1.3, 0.8, 0.8); nose.position.set(0, -headR * 0.12, headR * 1.0); this.head.add(nose);
      const wm = new THREE.MeshBasicMaterial({ color: '#f4f1ea' });
      for (const sx of [-1, 1]) for (const dy of [-0.02, 0.03]) { const w = new THREE.Mesh(new THREE.CylinderGeometry(0.0035, 0.0035, headR * 1.3, 3), wm); w.rotation.z = Math.PI / 2 + dy * 4 * sx; w.position.set(sx * headR * 0.75, -headR * 0.3 + dy, headR * 0.85); this.head.add(w); }
      this.mouth.position.set(0, -headR * 0.45, headR * 0.9);
    } else {
      const sn = L.snout ?? 1;
      const snout = new THREE.Mesh(new THREE.CapsuleGeometry(headR * 0.42, headR * 0.5 * sn, 4, 10), faceMark);
      snout.rotation.x = Math.PI / 2; snout.position.set(0, -headR * 0.28, headR * (0.75 + 0.25 * sn)); this.head.add(snout);
      const nose = new THREE.Mesh(new THREE.SphereGeometry(headR * 0.17, 10, 8), lam('#1f1a18')); nose.scale.set(1.2, 0.9, 0.9); nose.position.set(0, -headR * 0.16, headR * (1.05 + 0.55 * sn)); this.head.add(nose);
      this.tongue = new THREE.Mesh(new THREE.SphereGeometry(headR * 0.16, 8, 6), lam('#e8707e')); this.tongue.scale.set(1, 0.35, 1.5); this.tongue.position.set(0, -headR * 0.55, headR * (0.95 + 0.3 * sn)); this.head.add(this.tongue);
      this.mouth.position.set(0, -headR * 0.5, headR * (1.1 + 0.4 * sn));
    }
    this.head.add(this.mouth);
    // kulaklar
    const earS = L.ears ?? 1;
    for (const sx of [-1, 1]) {
      const ear = new THREE.Group(); this.head.add(ear); this.ears.push(ear);
      const earMat = isMask || isPoints ? lam(L.mark!) : extremity;
      if (this.cat || !L.floppy) {
        ear.position.set(sx * headR * 0.55, headR * 0.72, -headR * 0.05); ear.rotation.z = -sx * 0.35;
        const cone = new THREE.Mesh(new THREE.ConeGeometry(headR * 0.36 * earS, headR * 0.75 * earS, 4), earMat); cone.scale.z = 0.5; cone.rotation.y = Math.PI / 4; cone.position.y = headR * 0.3 * earS; ear.add(cone);
        const inner = new THREE.Mesh(new THREE.ConeGeometry(headR * 0.22 * earS, headR * 0.5 * earS, 4), lam('#f2b5b5')); inner.scale.z = 0.3; inner.rotation.y = Math.PI / 4; inner.position.set(0, headR * 0.25 * earS, headR * 0.06); ear.add(inner);
      } else {
        ear.position.set(sx * headR * 0.78, headR * 0.35, -headR * 0.05);
        const flap = new THREE.Mesh(new THREE.SphereGeometry(headR * 0.45 * earS, 10, 8), earMat); flap.scale.set(0.35, 1.1, 0.75); flap.position.y = -headR * 0.35 * earS; ear.add(flap);
        ear.rotation.z = sx * 0.25;
      }
    }
    // bacaklar
    const legMat = isPoints ? extremity : plain;
    const pawMat = L.pattern === 'tuxedo' ? belly : legMat;
    const lx = this.bodyR * 0.55, lz = this.bodyLen * 0.33;
    for (const [x, z] of [[-lx, lz], [lx, lz], [-lx, -lz], [lx, -lz]]) {
      const leg = new THREE.Group(); leg.position.set(x, this.legLen + 0.02, z); this.root.add(leg); this.legs.push(leg);
      const lr = (this.cat ? 0.05 : 0.068) * L.size * (1 + (L.fluff ?? 0) * 0.3);
      const m = new THREE.Mesh(new THREE.CapsuleGeometry(lr, this.legLen * 0.75, 3, 8), legMat); m.position.y = -this.legLen * 0.48; leg.add(m);
      const paw = new THREE.Mesh(new THREE.SphereGeometry(lr * 1.25, 8, 6), pawMat); paw.scale.set(1, 0.65, 1.3); paw.position.set(0, -this.legLen + lr * 0.6, lr * 0.4); leg.add(paw);
    }
    // kuyruk (zincir)
    const tl = (L.tail ?? 1) * (this.cat ? 0.42 : 0.3) * L.size;
    const tr = (this.cat ? 0.035 : 0.045) * L.size * (1 + (L.fluff ?? 0) * 0.9);
    let parent: THREE.Object3D = this.body;
    const tailMat = isPoints ? extremity : (L.pattern === 'tabby' || L.pattern === 'spots' ? bodyMat : plain);
    const segs = 4;
    for (let i = 0; i < segs; i++) {
      const seg = new THREE.Group();
      if (i === 0) seg.position.set(0, this.bodyR * 0.45, -this.bodyLen / 2 + 0.02); else seg.position.y = tl / segs;
      parent.add(seg); this.tail.push(seg);
      const m = new THREE.Mesh(new THREE.CapsuleGeometry(tr * (1 - i * 0.12), tl / segs, 3, 6), tailMat); m.position.y = tl / segs / 2; seg.add(m);
      parent = seg;
    }
    if (!this.cat && L.pattern !== 'mask' && breed.id !== 'dalmacyali') { const tip = new THREE.Mesh(new THREE.SphereGeometry(tr * 0.9, 6, 5), belly); tip.position.y = tl / segs; parent.add(tip); }

    this.body.add(this.collarSlot);
    this.setGear(opts.wear, opts.collar);

    const blob = new THREE.Mesh(new THREE.CircleGeometry(1, 18), new THREE.MeshBasicMaterial({ color: '#000', transparent: true, opacity: 0.18, depthWrite: false }));
    blob.scale.set(this.bodyR * 1.6, this.bodyLen * 0.75, 1); blob.rotation.x = -Math.PI / 2; blob.position.y = 0.02; this.root.add(blob);
    torso.castShadow = skull.castShadow = true;
  }

  setGear(wear?: string, collar?: string) {
    this.wearSlot.clear(); this.collarSlot.clear();
    const w = wear ? itemById(wear) : null;
    if (w) {
      let map: THREE.Texture | undefined;
      if (w.color2) { const c = document.createElement('canvas'); c.width = 64; c.height = 64; const g = c.getContext('2d')!; g.fillStyle = w.color; g.fillRect(0, 0, 64, 64); g.fillStyle = w.color2; for (let y = 0; y < 64; y += 16) g.fillRect(0, y, 64, 7); map = new THREE.CanvasTexture(c); map.colorSpace = THREE.SRGBColorSpace; }
      const g = new THREE.SphereGeometry(1, 18, 12, 0, Math.PI * 2, 0, Math.PI * 0.62); g.rotateX(Math.PI / 2 - 0.0); g.rotateX(-Math.PI / 2);
      const vest = new THREE.Mesh(g, lam(map ? '#ffffff' : w.color, map)); vest.scale.set(this.bodyR * 1.08, this.bodyR * 1.05, this.bodyLen * 0.4); vest.position.set(0, 0.0, this.bodyLen * 0.08); this.wearSlot.add(vest);
    }
    const c = collar ? itemById(collar) : null;
    if (c) {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(this.bodyR * 0.62, this.bodyR * 0.09, 6, 18), lam(c.color));
      ring.position.set(0, this.bodyR * 0.65, this.bodyLen / 2 - 0.01); ring.rotation.x = Math.PI / 2 - 0.9; this.collarSlot.add(ring);
      if (c.color2) { const bell = new THREE.Mesh(new THREE.SphereGeometry(this.bodyR * 0.14, 8, 6), new THREE.MeshPhongMaterial({ color: c.color2, shininess: 90 })); bell.position.set(0, this.bodyR * 0.3, this.bodyLen / 2 + this.bodyR * 0.25); this.collarSlot.add(bell); }
    }
  }

  setPose(p: PetPose) { this.pose = p; }

  update(dt: number) {
    this.t += dt;
    const k = this.poseK;
    for (const p of Object.keys(k) as PetPose[]) k[p] += ((p === this.pose ? 1 : 0) - k[p]) * Math.min(1, dt * 6);
    const sp = this.speed;
    const moving = sp > 0.08;
    this.phase += dt * (5 + sp * (this.cat ? 6 : 4.5));
    const amp = Math.min(1, sp / 1.5) * (sp > 3 ? 0.9 : 0.6);
    const run = sp > 3;
    // bacaklar: tırıs (çapraz çiftler) / dörtnala
    const off = run ? [0, 0.4, Math.PI, Math.PI + 0.4] : [0, Math.PI, Math.PI, 0];
    const sitK = k.sit + k.beg, lieK = k.lie;
    for (let i = 0; i < 4; i++) {
      const front = i < 2;
      let rx = moving ? Math.sin(this.phase + off[i]) * amp : 0;
      if (!front) rx -= sitK * 1.35;           // otururken arka bacaklar katlanır
      rx += lieK * (front ? -1.35 : 1.35);     // yatınca öne/arkaya uzanır
      if (k.beg > 0.01 && front) rx -= k.beg * 1.2;
      this.legs[i].rotation.x = rx;
      this.legs[i].position.y = this.legLen + 0.02 - lieK * this.legLen * 0.85 - (front ? 0 : sitK * this.legLen * 0.35) - (front && k.beg > 0 ? -k.beg * 0.1 : 0);
    }
    // gövde
    const bob = moving ? Math.abs(Math.sin(this.phase)) * 0.025 * amp : Math.sin(this.t * 2.4) * 0.004;
    this.body.position.y = this.bodyY + bob - lieK * (this.legLen * 0.85) - sitK * this.legLen * 0.25 + k.beg * 0.08;
    this.body.rotation.x = -sitK * 0.36 - k.beg * 0.3 + k.eat * 0.12 + (moving ? Math.sin(this.phase * 2) * 0.02 : 0);
    this.body.rotation.z = k.happy * Math.sin(this.t * 9) * 0.06 + lieK * 0.15;
    this.body.position.z = sitK * -this.bodyLen * 0.12;
    // kafa
    let hx = 0, hy = this.lookYaw * (1 - lieK), hz = 0;
    if (k.eat > 0.01) hx += k.eat * (0.75 + Math.sin(this.t * 11) * 0.12);
    hx += sitK * 0.45 + k.beg * 0.3;
    hz += k.happy * Math.sin(this.t * 3) * 0.25 + (this.cat ? 0 : k.beg * 0.3);
    hx += lieK * 0.55;
    if (!moving && k.stand > 0.5 && !this.lookYaw) hy += Math.sin(this.t * 0.5) * 0.35 * (Math.sin(this.t * 0.21) > 0 ? 1 : 0);
    this.head.rotation.set(hx, hy, hz);
    // kulaklar seğirme
    this.ears.forEach((e, i) => { e.rotation.x = Math.max(0, Math.sin(this.t * 7 + i * 2) - 0.92) * 3; });
    // kuyruk
    const wagWant = this.sleeping ? 0.05 : Math.max(this.wag, k.happy, k.beg * 0.8, moving ? 0.25 : 0);
    const wagSpeed = this.cat ? 3 + wagWant * 5 : 7 + wagWant * 12;
    const wagAmp = this.cat ? 0.25 + wagWant * 0.35 : 0.2 + wagWant * 0.7;
    const floppy = !!this.breed.look.floppy;
    let base = this.cat ? (moving ? -0.75 : -0.35) : floppy ? -2.1 : -0.55;
    const down = Math.max(lieK, sitK * 0.85);
    base = base + (-1.95 - base) * down;
    const curl = this.cat ? 0.3 : floppy ? -0.08 : 0.45;
    this.tail.forEach((s, i) => {
      if (i === 0) { s.rotation.x = base; s.rotation.z = Math.sin(this.t * wagSpeed) * wagAmp; }
      else { s.rotation.x = curl * (1 - down * 0.8); s.rotation.z = Math.sin(this.t * wagSpeed - i * 0.8) * wagAmp * 0.4; }
    });
    // dil (köpek, mutluyken/koşarken)
    if (this.tongue) this.tongue.visible = (k.happy > 0.3 || run || k.beg > 0.3) && !this.sleeping;
    // gözler: kırp / mutluyken / uykuda kapalı
    this.blink -= dt; if (this.blink < 0) this.blink = 2 + Math.random() * 4;
    const closed = this.blink < 0.12 || k.happy > 0.5 || this.sleeping;
    for (const e of this.eyes) e.scale.y = closed ? 0.12 : 1;
  }
}
