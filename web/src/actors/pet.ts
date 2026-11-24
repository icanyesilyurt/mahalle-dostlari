// Kedi/köpek modeli (Pixar tarzı sevimli): büyük yuvarlak kafa, iri parlak gözler (çift yansıma),
// kısa bacaklar, yumuşak gradyanlı tüy; ırka göre kulak (dik/katlanmış/sarkık/yarı dik/püsküllü),
// tüy uzunluğu (kısa/uzun/sert), gövde (tombul/ince), kuyruk (kedi/kıvrık/püskül/kısa/ince) ve desen.
// Gerçek ölçek: model birim ölçüde kurulur, sonra boyu (kedi ≈ diz, köpek ≈ diz–bel) tutacak şekilde küçültülür.
// Animasyonlar: yürü/koş, otur, uzan-uyu (nefes), mama ye, kuyruk salla, sevilince göz kapama,
// mırlama (titreşim) / havlama (kafa kalkar, ağız açılır) tepkisi.
import * as THREE from 'three';
import { Breed, itemById } from '../core/catalog';
import { rng } from '../world/kit';
import { mergeStatic } from './merge';

export type PetPose = 'stand' | 'sit' | 'lie' | 'eat' | 'happy' | 'beg';

const std = (c: string | THREE.Color, o: THREE.MeshStandardMaterialParameters = {}) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.82, ...o });
const fur = (c: string | THREE.Color, map?: THREE.Texture) => new THREE.MeshStandardMaterial({ color: c, map: map ?? null, roughness: 0.88, vertexColors: true });
const S = (r: number, w = 18, h = 14) => new THREE.SphereGeometry(r, w, h);

/** Yumuşak tüy gölgesi: üst taraf biraz koyu, alt taraf açık (yerel normal.y'ye göre). */
function gradient<T extends THREE.BufferGeometry>(g: T, top = 0.84, bottom = 1.1): T {
  const n = g.attributes.normal as THREE.BufferAttribute, arr = new Float32Array(n.count * 3);
  for (let i = 0; i < n.count; i++) { const y = n.getY(i); const k = y > 0 ? 1 + (top - 1) * y : 1 + (bottom - 1) * -y; arr[i * 3] = arr[i * 3 + 1] = arr[i * 3 + 2] = Math.min(1.15, k); }
  g.setAttribute('color', new THREE.BufferAttribute(arr, 3));
  return g;
}

function patternTexture(b: Breed, seed: number): THREE.CanvasTexture {
  const c = document.createElement('canvas'); c.width = 256; c.height = 128;
  const g = c.getContext('2d')!; const L = b.look; const r = rng(seed);
  g.fillStyle = L.body; g.fillRect(0, 0, 256, 128);
  const mark = L.mark ?? '#333';
  g.filter = 'blur(2px)';
  if (L.pattern === 'tabby') {
    g.strokeStyle = mark; g.lineCap = 'round';
    for (let v = 10; v < 120; v += 14) {
      g.lineWidth = r.range(5, 8);
      g.beginPath(); g.moveTo(128 + 8, v + r.range(-3, 3));
      for (let u = 136; u <= 248; u += 14) g.lineTo(u, v + Math.sin(u * 0.12 + v) * 4);
      g.stroke();
    }
    g.lineWidth = 10; g.beginPath(); g.moveTo(192, 0); g.lineTo(192, 128); g.stroke();
  } else if (L.pattern === 'spots') {
    g.fillStyle = mark;
    for (let i = 0; i < 60; i++) { g.beginPath(); g.ellipse(r.range(0, 256), r.range(0, 128), r.range(4, 8), r.range(4, 7), 0, 0, 7); g.fill(); }
  } else if (L.pattern === 'calico') {
    for (let i = 0; i < 9; i++) { g.fillStyle = i % 2 ? mark : '#2b2727'; g.beginPath(); g.ellipse(r.range(120, 256), r.range(0, 128), r.range(16, 34), r.range(12, 26), r.next() * 3, 0, 7); g.fill(); }
  } else if (L.pattern === 'saddle') {
    g.fillStyle = mark; g.beginPath(); g.ellipse(192, 60, 60, 44, 0, 0, 7); g.fill();
  }
  g.filter = 'none';
  for (let i = 0; i < 700; i++) { g.fillStyle = `rgba(${r.chance(0.5) ? '255,255,255' : '0,0,0'},0.04)`; g.fillRect(r.int(0, 255), r.int(0, 127), 1, r.int(2, 5)); }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}

export class Pet {
  root = new THREE.Group();
  /** Ölçeklenen iskelet (tüm parçalar burada). */
  private rig = new THREE.Group();
  body = new THREE.Group();
  head = new THREE.Group();
  mouth = new THREE.Group();
  private jaw = new THREE.Group();
  private legs: THREE.Group[] = [];
  private tail: THREE.Group[] = [];
  private eyes: THREE.Group[] = [];
  private ears: THREE.Group[] = [];
  private tongue?: THREE.Mesh;
  private wearSlot = new THREE.Group();
  private collarSlot = new THREE.Group();
  readonly cat: boolean;
  /** Dünya ölçeğinde toplam boy (m) ve yarıçap. */
  readonly height: number;
  readonly radius: number;
  /** Model biriminden dünyaya ölçek (ağızdaki top vb. için). */
  readonly scaleK: number;
  private bodyY: number;
  private legLen: number;
  private bodyLen: number;
  private bodyR: number;
  private tailCurl: number;
  private tailBase: number;

  speed = 0;           // dünya hızı (m/s)
  pose: PetPose = 'stand';
  private poseK: Record<PetPose, number> = { stand: 1, sit: 0, lie: 0, eat: 0, happy: 0, beg: 0 };
  wag = 0.3;
  private phase = Math.random() * 6;
  private t = Math.random() * 10;
  private blink = 1 + Math.random() * 3;
  private reactT = 0;
  lookYaw = 0;
  sleeping = false;
  /** Hasta: sağ ön bacağını yere basmaz, sekerek yürür. */
  limp = false;

  constructor(public breed: Breed, seed = 1, opts: { wear?: string; collar?: string } = {}) {
    const L = breed.look; this.cat = breed.species === 'cat';
    const cat = this.cat, long = L.fur === 'long', wiry = L.fur === 'wiry';
    const chub = L.chub ?? 1;
    // ---- birim ölçüde oranlar (Pixar: kafa büyük, bacak kısa) ----
    this.bodyR = (cat ? 0.15 : 0.16) * chub * (long ? 1.08 : 1);
    this.bodyLen = (cat ? 0.42 : 0.5) * (L.long ?? 1);
    this.legLen = (cat ? 0.15 : 0.19) * (L.legs ?? 1);
    this.bodyY = this.legLen + this.bodyR * 0.72;
    const headR = (cat ? 0.19 : 0.185) * (L.head ?? 1);
    const modelH = this.bodyY + this.bodyR * 0.85 + headR * 1.9 + (L.ear === 'up' || L.ear === 'tuft' || (cat && L.ear !== 'fold') ? headR * 0.55 * (L.ears ?? 1) : 0);
    const targetH = L.height ?? (cat ? 0.36 * (0.82 + 0.18 * L.size) : 0.38 + (L.size - 0.75) * 0.5);
    this.scaleK = targetH / modelH;
    this.height = targetH;
    this.radius = Math.max(this.bodyLen * 0.55 * this.scaleK, 0.14);
    this.root.add(this.rig); this.rig.scale.setScalar(this.scaleK);

    const tex = patternTexture(breed, seed);
    const bodyMat = fur('#ffffff', tex);
    const plain = fur(L.body), belly = fur(L.belly);
    const isPoints = L.pattern === 'points', isMask = L.pattern === 'mask';
    const extremity = fur(isPoints ? L.mark! : L.body);
    const faceMark = fur(isMask || isPoints ? L.mark! : L.belly);
    const dark = std('#1d1715', { roughness: 0.5 });

    this.rig.add(this.body);
    this.body.position.y = this.bodyY;
    // gövde: yumuşak "fasulye" (önü dolgun), desen dokulu
    const torsoG = gradient(new THREE.SphereGeometry(1, 24, 18)); torsoG.rotateX(Math.PI / 2);
    const torso = new THREE.Mesh(torsoG, bodyMat); torso.scale.set(this.bodyR, this.bodyR * (wiry ? 1.0 : 0.94), this.bodyLen / 2); this.body.add(torso);
    const hips = new THREE.Mesh(gradient(S(1, 16, 12)), L.pattern === 'tabby' || L.pattern === 'spots' || L.pattern === 'saddle' ? bodyMat : plain);
    hips.scale.set(this.bodyR * 0.98, this.bodyR * 0.95, this.bodyR * 1.05); hips.position.set(0, -this.bodyR * 0.05, -this.bodyLen * 0.28); this.body.add(hips);
    const bel = new THREE.Mesh(gradient(S(1, 16, 12), 1, 1.05), belly); bel.scale.set(this.bodyR * 0.8, this.bodyR * 0.66, this.bodyLen * 0.42); bel.position.y = -this.bodyR * 0.32; this.body.add(bel);
    // göğüs (smokin beyazı / uzun tüylü yele)
    const chestS = long ? 1.3 : 1;
    const chest = new THREE.Mesh(gradient(S(1, 16, 12)), L.pattern === 'tuxedo' || L.pattern === 'calico' || long ? belly : plain);
    chest.scale.set(this.bodyR * 0.85 * chestS, this.bodyR * 0.9 * chestS, this.bodyR * 0.75 * chestS); chest.position.set(0, -this.bodyR * 0.02, this.bodyLen * 0.34); this.body.add(chest);
    if (long) { // yele: göğüs ve boyunda kabarık tutamlar
      const R = rng(seed + 3);
      for (let i = 0; i < 9; i++) {
        const a = -1.2 + i * 0.3, tuft = new THREE.Mesh(new THREE.IcosahedronGeometry(this.bodyR * 0.32, 1), belly);
        tuft.position.set(Math.sin(a) * this.bodyR * 0.75, Math.cos(a) * this.bodyR * 0.35 - this.bodyR * 0.25, this.bodyLen * 0.4 + R.range(-0.01, 0.02)); this.body.add(tuft);
      }
    }
    this.body.add(this.wearSlot);

    // ---- kafa ----
    this.head.position.set(0, this.bodyR * 0.9, this.bodyLen / 2 + headR * 0.25);
    this.body.add(this.head);
    const skull = new THREE.Mesh(gradient(S(headR, 24, 18), 0.88, 1.06), isPoints ? fur(L.body) : plain);
    skull.scale.set(cat ? 1.1 : 1.02, cat ? 0.94 : 0.96, cat ? 0.95 : 1.0); this.head.add(skull);
    if (cat || chub > 1.1) for (const sx of [-1, 1]) { // tombul yanaklar
      const ch = new THREE.Mesh(gradient(S(headR * 0.5, 12, 10)), long ? belly : plain); ch.scale.set(1.1, 0.8, 0.8); ch.position.set(sx * headR * 0.62, -headR * 0.28, headR * 0.3); this.head.add(ch);
    }
    if (L.pattern === 'tabby') for (const sx of [-1, 0, 1]) { const st = new THREE.Mesh(new THREE.CapsuleGeometry(headR * 0.05, headR * 0.35, 3, 6), std(L.mark!)); st.rotation.x = Math.PI / 2 - 0.4; st.position.set(sx * headR * 0.28, headR * 0.82, headR * 0.15); st.rotation.y = sx * 0.3; this.head.add(st); }
    if (L.pattern === 'tuxedo' || L.pattern === 'calico') { const blaze = new THREE.Mesh(S(headR * 0.55, 12, 8), belly); blaze.scale.set(0.8, 1, 0.6); blaze.position.set(0, -headR * 0.25, headR * 0.6); this.head.add(blaze); }
    if (L.mark && breed.id === 'van') for (const sx of [-1, 1]) { const sp = new THREE.Mesh(S(headR * 0.3, 10, 8), std(L.mark)); sp.position.set(sx * headR * 0.45, headR * 0.7, -headR * 0.05); sp.scale.set(1, 0.6, 1); this.head.add(sp); }

    // gözler: iri, parlak (clearcoat), büyük göz bebeği, çift yansıma
    const eyeR = headR * (cat ? 0.31 : 0.26);
    const glint = new THREE.MeshBasicMaterial({ color: '#ffffff' });
    for (const sx of [-1, 1]) {
      const eg = new THREE.Group(); eg.position.set(sx * headR * (cat ? 0.36 : 0.37), headR * 0.14, headR * 0.8); eg.rotation.y = sx * 0.18; this.head.add(eg); this.eyes.push(eg);
      const col = sx > 0 && L.eyes2 ? L.eyes2 : (L.eyes ?? (cat ? '#d8b23a' : '#5a3a24'));
      const iris = new THREE.Mesh(S(eyeR, 18, 14), new THREE.MeshPhysicalMaterial({ color: col, roughness: 0.25, clearcoat: 1, clearcoatRoughness: 0.04 }));
      iris.scale.z = 0.62; eg.add(iris);
      const pupil = new THREE.Mesh(S(eyeR * 0.62, 14, 10), new THREE.MeshPhysicalMaterial({ color: '#0c0a0a', roughness: 0.2, clearcoat: 1, clearcoatRoughness: 0.03 }));
      pupil.scale.set(cat ? 0.8 : 1, cat ? 1.08 : 1, 0.45); pupil.position.z = eyeR * 0.4; eg.add(pupil);
      const g1 = new THREE.Mesh(S(eyeR * 0.26, 8, 6), glint); g1.position.set(eyeR * 0.3, eyeR * 0.34, eyeR * 0.6); eg.add(g1);
      const g2 = new THREE.Mesh(S(eyeR * 0.11, 6, 4), glint); g2.position.set(-eyeR * 0.26, -eyeR * 0.28, eyeR * 0.6); eg.add(g2);
      if (wiry) { const brow = new THREE.Mesh(new THREE.BoxGeometry(eyeR * 1.6, eyeR * 0.45, eyeR * 0.6), fur(L.belly)); brow.position.set(sx * headR * 0.02, eyeR * 1.1, eyeR * 0.3); brow.rotation.z = -sx * 0.2; eg.add(brow); }
    }
    // burun / ağız
    if (cat) {
      for (const sx of [-1, 1]) { const pad = new THREE.Mesh(gradient(S(headR * 0.22, 12, 10)), faceMark); pad.position.set(sx * headR * 0.15, -headR * 0.34, headR * 0.8); this.head.add(pad); }
      const nose = new THREE.Mesh(S(headR * 0.09, 10, 8), std('#e8889a', { roughness: 0.4 })); nose.scale.set(1.35, 0.8, 0.8); nose.position.set(0, -headR * 0.17, headR * 0.98); this.head.add(nose);
      const wm = new THREE.MeshBasicMaterial({ color: '#f4f1ea' });
      for (const sx of [-1, 1]) for (const dy of [-0.02, 0.025]) { const w = new THREE.Mesh(new THREE.CylinderGeometry(0.003, 0.003, headR * 1.2, 3), wm); w.rotation.z = Math.PI / 2 + dy * 4 * sx; w.position.set(sx * headR * 0.72, -headR * 0.32 + dy, headR * 0.82); this.head.add(w); }
      this.jaw.position.set(0, -headR * 0.42, headR * 0.72);
      const chin = new THREE.Mesh(S(headR * 0.16, 10, 8), faceMark); chin.scale.set(1.2, 0.6, 1); chin.position.set(0, -headR * 0.04, headR * 0.08); this.jaw.add(chin);
      this.mouth.position.set(0, -headR * 0.45, headR * 0.88);
    } else {
      const sn = L.snout ?? 1;
      const snout = new THREE.Mesh(gradient(new THREE.CapsuleGeometry(headR * 0.44, headR * 0.42 * sn, 6, 14), 0.95, 1.05), faceMark);
      snout.rotation.x = Math.PI / 2; snout.scale.set(1, 1, 0.85); snout.position.set(0, -headR * 0.28, headR * (0.72 + 0.22 * sn)); this.head.add(snout);
      const nose = new THREE.Mesh(S(headR * 0.17, 12, 10), std('#1f1a18', { roughness: 0.25 })); nose.scale.set(1.25, 0.85, 0.9); nose.position.set(0, -headR * 0.12, headR * (1.02 + 0.45 * sn)); this.head.add(nose);
      if (wiry) { const beard = new THREE.Mesh(new THREE.IcosahedronGeometry(headR * 0.34, 1), fur(L.belly)); beard.scale.set(1, 0.8, 1); beard.position.set(0, -headR * 0.55, headR * (0.95 + 0.3 * sn)); this.head.add(beard); }
      this.jaw.position.set(0, -headR * 0.5, headR * (0.75 + 0.2 * sn));
      const lower = new THREE.Mesh(new THREE.CapsuleGeometry(headR * 0.3, headR * 0.3 * sn, 4, 10), faceMark); lower.rotation.x = Math.PI / 2; lower.position.z = headR * 0.15; this.jaw.add(lower);
      this.tongue = new THREE.Mesh(S(headR * 0.16, 8, 6), std('#e8707e', { roughness: 0.4 })); this.tongue.userData.noMerge = true; this.tongue.scale.set(1, 0.35, 1.6); this.tongue.position.set(0, -headR * 0.05, headR * (0.3 + 0.2 * sn)); this.jaw.add(this.tongue);
      this.mouth.position.set(0, -headR * 0.5, headR * (1.05 + 0.35 * sn));
    }
    this.head.add(this.jaw);
    this.head.add(this.mouth);
    // kulaklar
    const earS = L.ears ?? 1;
    const earType = L.ear ?? (cat ? 'up' : 'floppy');
    const earMat = isMask || isPoints ? fur(L.mark!) : extremity;
    const pink = std('#f2b5b5', { roughness: 0.6 });
    for (const sx of [-1, 1]) {
      const ear = new THREE.Group(); this.head.add(ear); this.ears.push(ear);
      if (earType === 'floppy') {
        ear.position.set(sx * headR * 0.8, headR * 0.4, -headR * 0.05);
        const flap = new THREE.Mesh(gradient(S(headR * 0.46 * earS, 12, 10), 0.9, 1)); flap.material = earMat; flap.scale.set(0.32, 1.15, 0.72); flap.position.y = -headR * 0.38 * earS; ear.add(flap);
        ear.rotation.z = sx * 0.22;
      } else {
        const up = earType === 'up' || earType === 'tuft', fold = earType === 'fold', semi = earType === 'semi';
        const h = headR * (fold ? 0.42 : 0.78) * earS, r = headR * (fold ? 0.3 : 0.36) * earS;
        ear.position.set(sx * headR * (fold ? 0.5 : 0.55), headR * (fold ? 0.68 : 0.74), -headR * 0.02); ear.rotation.z = -sx * (cat ? 0.3 : 0.22);
        const cone = new THREE.Mesh(new THREE.ConeGeometry(r, h, 10), earMat); cone.scale.z = 0.42; cone.position.y = h * 0.42; ear.add(cone);
        const inner = new THREE.Mesh(new THREE.ConeGeometry(r * 0.62, h * 0.7, 10), pink); inner.scale.z = 0.3; inner.position.set(0, h * 0.36, r * 0.12); ear.add(inner);
        if (fold) ear.rotation.x = 1.0;                   // katlanmış kulak: öne yatık
        if (semi) { const tip = new THREE.Mesh(new THREE.ConeGeometry(r * 0.55, h * 0.45, 8), earMat); tip.scale.z = 0.42; tip.position.set(0, h * 0.82, h * 0.12); tip.rotation.x = 0.9; ear.add(tip); cone.scale.y = 0.75; }
        if (earType === 'tuft') { const tf = new THREE.Mesh(new THREE.ConeGeometry(r * 0.18, h * 0.5, 5), std(L.mark ?? '#3a2a20')); tf.position.y = h * 1.05; ear.add(tf); }
        void up;
      }
    }
    // bacaklar (kısa, tombul pençeler)
    const legMat = isPoints ? extremity : plain;
    const pawMat = L.pattern === 'tuxedo' || L.pattern === 'mask' ? belly : legMat;
    const lx = this.bodyR * 0.55, lz = this.bodyLen * 0.32;
    const lr = (cat ? 0.045 : 0.055) * (1 + (chub - 1) * 0.6) * (long ? 1.25 : 1);
    for (const [x, z] of [[-lx, lz], [lx, lz], [-lx, -lz], [lx, -lz]]) {
      const leg = new THREE.Group(); leg.position.set(x, this.legLen + 0.02, z); this.rig.add(leg); this.legs.push(leg);
      const m = new THREE.Mesh(gradient(new THREE.CapsuleGeometry(lr, this.legLen * 0.7, 4, 10)), legMat); m.position.y = -this.legLen * 0.46; leg.add(m);
      const paw = new THREE.Mesh(gradient(S(lr * 1.35, 12, 8)), pawMat); paw.scale.set(1, 0.62, 1.3); paw.position.set(0, -this.legLen + lr * 0.55, lr * 0.45); leg.add(paw);
    }
    // kuyruk
    const style = L.tailStyle ?? (cat ? 'cat' : 'whip');
    const tl = (L.tail ?? 1) * (cat ? 0.38 : style === 'stub' ? 0.08 : 0.3);
    let tr = (cat ? 0.035 : 0.04) * (style === 'plume' ? 1.9 : style === 'whip' ? 0.8 : 1) * (chub > 1.2 ? 1.3 : 1);
    this.tailCurl = style === 'curl' ? 0.75 : style === 'cat' ? 0.28 : style === 'plume' ? 0.12 : style === 'stub' ? 0 : 0.1;
    this.tailBase = style === 'curl' ? 0.2 : cat ? -0.35 : style === 'plume' ? -1.4 : -0.55;
    let parent: THREE.Object3D = this.body;
    const tailMat = isPoints ? extremity : (L.pattern === 'tabby' || L.pattern === 'spots' ? bodyMat : plain);
    const segs = style === 'stub' ? 1 : 5;
    for (let i = 0; i < segs; i++) {
      const seg = new THREE.Group();
      if (i === 0) seg.position.set(0, this.bodyR * 0.4, -this.bodyLen / 2 + 0.01); else seg.position.y = tl / segs;
      parent.add(seg); this.tail.push(seg);
      const rr = tr * (style === 'plume' ? 1 - Math.abs(i - 2.2) * 0.12 : 1 - i * 0.1);
      const m = new THREE.Mesh(gradient(new THREE.CapsuleGeometry(rr, tl / segs, 4, 8)), tailMat); m.position.y = tl / segs / 2; seg.add(m);
      parent = seg;
    }
    if (!cat && style !== 'stub' && L.pattern !== 'mask' && breed.id !== 'dalmacyali') { const tip = new THREE.Mesh(S(tr * 0.85, 8, 6), belly); tip.position.y = tl / segs; parent.add(tip); }

    this.body.add(this.collarSlot);
    this.setGear(opts.wear, opts.collar);

    const blob = new THREE.Mesh(new THREE.CircleGeometry(1, 18), new THREE.MeshBasicMaterial({ color: '#000', transparent: true, opacity: 0.2, depthWrite: false }));
    blob.scale.set(this.bodyR * 1.7, this.bodyLen * 0.8, 1); blob.rotation.x = -Math.PI / 2; blob.position.y = 0.02 / this.scaleK; this.rig.add(blob);
    torso.castShadow = skull.castShadow = true;
    void dark;
    // tüy malzemesi köşe rengi ister: eksik olan geometrilere yumuşak gradyan ekle
    this.rig.traverse(o => { const m = o as THREE.Mesh; if (m.isMesh && (m.material as THREE.MeshStandardMaterial).vertexColors && !m.geometry.attributes.color) gradient(m.geometry); });
    mergeStatic(this.rig);
  }

  setGear(wear?: string, collar?: string) {
    this.wearSlot.clear(); this.collarSlot.clear();
    const w = wear ? itemById(wear) : null;
    if (w) {
      let map: THREE.Texture | undefined;
      if (w.color2) { const c = document.createElement('canvas'); c.width = 64; c.height = 64; const g = c.getContext('2d')!; g.fillStyle = w.color; g.fillRect(0, 0, 64, 64); g.fillStyle = w.color2; for (let y = 0; y < 64; y += 16) g.fillRect(0, y, 64, 7); map = new THREE.CanvasTexture(c); map.colorSpace = THREE.SRGBColorSpace; }
      const g = new THREE.SphereGeometry(1, 18, 12, 0, Math.PI * 2, 0, Math.PI * 0.62); g.rotateX(-Math.PI / 2);
      const vest = new THREE.Mesh(g, std(map ? '#ffffff' : w.color, { map: map ?? null })); vest.scale.set(this.bodyR * 1.1, this.bodyR * 1.07, this.bodyLen * 0.4); vest.position.set(0, 0.0, this.bodyLen * 0.08); this.wearSlot.add(vest);
    }
    const c = collar ? itemById(collar) : null;
    if (c) {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(this.bodyR * 0.6, this.bodyR * 0.09, 6, 18), std(c.color, { roughness: 0.5 }));
      ring.position.set(0, this.bodyR * 0.7, this.bodyLen / 2 - 0.01); ring.rotation.x = Math.PI / 2 - 0.9; this.collarSlot.add(ring);
      if (c.color2) { const bell = new THREE.Mesh(new THREE.SphereGeometry(this.bodyR * 0.14, 8, 6), new THREE.MeshStandardMaterial({ color: c.color2, roughness: 0.2, metalness: 0.7 })); bell.position.set(0, this.bodyR * 0.35, this.bodyLen / 2 + this.bodyR * 0.25); this.collarSlot.add(bell); }
    }
  }

  setPose(p: PetPose) { this.pose = p; }


  /** Sevilince: kedi mırlar (titrer, gözler kapalı), köpek havlar (kafa kalkar, ağız açılır). */
  react() { this.reactT = 1.1; }

  update(dt: number) {
    this.t += dt;
    const k = this.poseK;
    for (const p of Object.keys(k) as PetPose[]) k[p] += ((p === this.pose ? 1 : 0) - k[p]) * Math.min(1, dt * 6);
    const sp = this.speed / this.scaleK * 0.5;          // adım temposu küçük boyda hızlı
    const moving = this.speed > 0.05;
    this.phase += dt * (6 + sp * (this.cat ? 3.2 : 2.6));
    const amp = Math.min(1, this.speed / 1.2) * (this.speed > 2.2 ? 0.95 : 0.65);
    const run = this.speed > 2.2;
    const off = run ? [0, 0.4, Math.PI, Math.PI + 0.4] : [0, Math.PI, Math.PI, 0];
    const sitK = k.sit + k.beg, lieK = k.lie;
    for (let i = 0; i < 4; i++) {
      const front = i < 2;
      let rx = moving ? Math.sin(this.phase + off[i]) * amp : 0;
      if (!front) rx -= sitK * 1.35;
      rx += lieK * (front ? -1.35 : 1.35);
      if (k.beg > 0.01 && front) rx -= k.beg * 1.2;
      if (this.limp && i === 1) rx = -0.9 + (moving ? Math.sin(this.phase) * 0.1 : 0);
      this.legs[i].rotation.x = rx;
      this.legs[i].position.y = this.legLen + 0.02 - lieK * this.legLen * 0.85 - (front ? 0 : sitK * this.legLen * 0.35) - (front && k.beg > 0 ? -k.beg * 0.08 : 0);
    }
    this.reactT = Math.max(0, this.reactT - dt);
    const re = Math.min(1, this.reactT * 2.5);
    const purr = this.cat ? re : 0, bark = this.cat ? 0 : re;
    // gövde (+ uykuda nefes, mırlarken titreşim)
    const bob = moving ? Math.abs(Math.sin(this.phase)) * 0.03 * amp : Math.sin(this.t * 2.4) * 0.004;
    this.body.position.y = this.bodyY + bob - lieK * (this.legLen * 0.85) - sitK * this.legLen * 0.25 + k.beg * 0.07;
    this.body.position.x = purr * Math.sin(this.t * 90) * 0.004;
    const breath = 1 + Math.sin(this.t * (this.sleeping ? 1.6 : 3)) * (this.sleeping ? 0.035 : 0.012);
    this.body.scale.set(1, breath, 1);
    this.body.rotation.x = -sitK * 0.36 - k.beg * 0.3 + k.eat * 0.12 + (moving ? Math.sin(this.phase * 2) * 0.03 : 0);
    this.body.rotation.z = k.happy * Math.sin(this.t * 9) * 0.06 + lieK * 0.15 + (this.limp ? 0.08 + (moving ? Math.max(0, Math.sin(this.phase * 2)) * 0.08 : 0) : 0);
    this.body.position.z = sitK * -this.bodyLen * 0.12;
    // kafa
    let hx = 0, hy = this.lookYaw * (1 - lieK), hz = 0;
    if (k.eat > 0.01) hx += k.eat * (0.75 + Math.sin(this.t * 11) * 0.12);
    hx += sitK * 0.45 + k.beg * 0.3 + lieK * 0.55;
    hz += k.happy * Math.sin(this.t * 3) * 0.25 + (this.cat ? purr * 0.25 : k.beg * 0.3);
    hx -= bark * (0.35 + Math.abs(Math.sin(this.t * 14)) * 0.15);
    if (!moving && k.stand > 0.5 && !this.lookYaw) hy += Math.sin(this.t * 0.5) * 0.35 * (Math.sin(this.t * 0.21) > 0 ? 1 : 0);
    this.head.rotation.set(hx, hy, hz);
    // ağız: havlarken / miyavlarken açılır, yerken çiğner
    this.jaw.rotation.x = bark * Math.abs(Math.sin(this.t * 14)) * 0.5 + k.eat * Math.max(0, Math.sin(this.t * 11)) * 0.25;
    // kulaklar seğirme (sevilince geriye yatar)
    this.ears.forEach((e, i) => { e.rotation.x = (this.breed.look.ear === 'fold' ? 1.0 : 0) + Math.max(0, Math.sin(this.t * 7 + i * 2) - 0.92) * 3 - purr * 0.3; });
    // kuyruk
    const wagWant = this.sleeping ? 0.05 : Math.max(this.wag, k.happy, k.beg * 0.8, bark, moving ? 0.25 : 0);
    const wagSpeed = this.cat ? 3 + wagWant * 5 : 7 + wagWant * 12;
    const wagAmp = this.cat ? 0.25 + wagWant * 0.35 : 0.2 + wagWant * 0.7;
    let base = this.cat ? (moving ? -0.75 : this.tailBase) : this.tailBase;
    const down = Math.max(lieK, sitK * 0.85);
    base = base + (-1.95 - base) * down;
    this.tail.forEach((s, i) => {
      if (i === 0) { s.rotation.x = base; s.rotation.z = Math.sin(this.t * wagSpeed) * wagAmp; }
      else { s.rotation.x = this.tailCurl * (1 - down * 0.8); s.rotation.z = Math.sin(this.t * wagSpeed - i * 0.8) * wagAmp * 0.4; }
    });
    if (this.tongue) this.tongue.visible = (k.happy > 0.3 || run || k.beg > 0.3 || bark > 0.2) && !this.sleeping;
    // gözler: kırp / sevilince ve uykuda kapalı (üstten kapanır)
    this.blink -= dt; if (this.blink < 0) this.blink = 2 + Math.random() * 4;
    const closed = this.blink < 0.12 || k.happy > 0.5 || this.sleeping || purr > 0.3;
    for (const e of this.eyes) { e.scale.y += ((closed ? 0.1 : 1) - e.scale.y) * Math.min(1, dt * 20); }
  }
}
