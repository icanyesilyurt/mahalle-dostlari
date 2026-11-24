// Oyun döngüsü: sahne, ışık, kamera, oyuncu, sokak hayvanları, sahiplenilen dost, kulübeler, etkileşimler.
import * as THREE from 'three';
import { Human } from '../actors/human';
import { Pet } from '../actors/pet';
import { Breed, BreedLook, breedById, itemById } from '../core/catalog';
import { GameState, feedStray, petStray, refillWater, waterStray, save } from '../core/state';
import { TEX, rng } from '../world/kit';
import { petHouse } from '../world/pethouse';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { GTAOPass } from 'three/examples/jsm/postprocessing/GTAOPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { setMultiDraw } from '../world/assets';
import { NIGHT, dayState, hourNow, skyMaterial } from './daycycle';
import { VEHICLE_DEFS, Vehicle } from './vehicles';
import { admit, ensureQuests, questProgress, DECOR } from '../core/care';
import { petHouse as petHouseModel } from '../world/pethouse';
import type { StraySpawn } from '../world/world';
import { CITY_BUILDERS, WorldData, blocked, collide, getKits, makeMaterials, onLand } from '../world/world';
import { haptic, sfx } from '../ui/sfx';
import { Input } from './input';

type StrayMode = 'wander' | 'idle' | 'toBowl' | 'eat' | 'happy' | 'follow' | 'sleep' | 'greet';
export interface Stray {
  id: string; name: string; pet: Pet; home: THREE.Vector3;
  mode: StrayMode; t: number; target: THREE.Vector3 | null; yaw: number;
  hungryAt: number; thirstyAt: number; bowl: THREE.Object3D | null; label: HTMLElement; vocalT: number;
  sick?: boolean; carried?: boolean;
}
interface Companion { uid: string; pet: Pet; yaw: number; mode: 'follow' | 'fetch' | 'return' | 'sit' | 'eat' | 'happy' | 'home'; t: number; ball: THREE.Object3D | null; label: HTMLElement; home?: THREE.Vector3 }
interface Ball { mesh: THREE.Mesh; vel: THREE.Vector3; resting: boolean; owner: Companion }

export interface GameEvents {
  reward(coins: number, gems: number, at: THREE.Vector3): void;
  toast(msg: string): void;
  changed(): void;
  hearts(at: THREE.Vector3): void;
  nearChanged(): void;
  open?(id: string): void;
}

export type SpotKind = 'carry' | 'drop' | 'vet' | 'shelter' | 'home';

const now = () => Date.now();
const UP = new THREE.Vector3(0, 1, 0);

export class Game {
  renderer: THREE.WebGLRenderer;
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, 1, 0.3, 500);
  sun!: THREE.DirectionalLight;
  world!: WorldData;
  player!: Human;
  pos = new THREE.Vector3();
  yaw = 0;
  camYaw = 0;            // kameranın baktığı yön (oyuncu ileri = bu yön)
  camPitch = 0.21;       // aşağı bakış açısı (rad), 5°–20°
  camDist = 4.6;         // oyuncu ile kamera arası (m), 3–7
  private armDist = 4.6; // duvara çarpınca kısalan gerçek mesafe
  private wallK = 0;      // kamera bir duvara bakıyorsa 0..1
  private side = 0;       // omuz kayması (m)
  private manualT = 0;
  private camTarget = new THREE.Vector3();
  private sky!: THREE.Mesh;
  private hemi!: THREE.HemisphereLight;
  private fill!: THREE.DirectionalLight;
  private lampGlow: THREE.InstancedMesh | null = null;
  private lampLights: THREE.PointLight[] = [];
  private lampT = 0;
  private dayT = 0;
  strays: Stray[] = [];
  companion: Companion | null = null;
  homePets: Companion[] = [];
  near: Stray | null = null;
  nearCompanion: Companion | null = null;
  nearFountain = false;
  private houseObjs = new Map<string, THREE.Object3D>();
  private npcs: Human[] = [];
  // araç
  vehicle: Vehicle | null = null;
  riding = false;
  nearVehicle = false;
  private carried: Companion[] = [];
  private carriedSick: Stray[] = [];
  spot: { kind: SpotKind; label: string; icon: string } | null = null;
  private sickT = 8;
  private shelterGroup = new THREE.Group();
  private shelterPets: { pet: Pet; target: THREE.Vector3 | null; t: number; yaw: number }[] = [];
  private rideMeters = 0;
  private walkers: { h: Human; path: THREE.Vector3[]; i: number; sp: number }[] = [];
  private pigeons: { im: THREE.InstancedMesh; b: { home: THREE.Vector3; p: THREE.Vector3; v: THREE.Vector3; yaw: number; air: number; t: number }[] } | null = null;
  private balls: Ball[] = [];
  private tapTarget: THREE.Vector3 | null = null;
  private tapStray: Stray | null = null;
  private marker!: THREE.Mesh;
  private ring!: THREE.Mesh;
  private clock = new THREE.Clock();
  private labelsEl: HTMLElement;
  private gulls: THREE.Object3D[] = [];
  lowEnd: boolean;
  placing: { item: string; ghost: THREE.Object3D; rot: number; valid: boolean } | null = null;
  paused = false;
  // yeni görünüm (hazır modeller): ACES + ortam gölgesi (SSAO/GTAO) + hafif bloom. AO telefonda kapatılabilir.
  private composer: EffectComposer | null = null;
  private gtao: GTAOPass | null = null;
  private bloom: UnrealBloomPass | null = null;
  gfx = { ao: true, bloom: true };

  constructor(private canvas: HTMLCanvasElement, public state: GameState, public input: Input, private ev: GameEvents) {
    this.lowEnd = /Android|iPhone|iPad|Mobile/i.test(navigator.userAgent) || Math.min(screen.width, screen.height) < 600;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: !this.lowEnd || devicePixelRatio < 2, powerPreference: 'high-performance' });
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, this.lowEnd ? 1.6 : 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.12;
    this.labelsEl = document.getElementById('labels')!;
    this.setupScene();
    setMultiDraw(!!this.renderer.extensions.has('WEBGL_multi_draw'));
    this.loadCity(state.city);
    if (getKits()) this.setupPost();
    addEventListener('resize', () => this.resize());
    this.resize();
  }

  // ---------- kurulum ----------
  private setupScene() {
    const s = this.scene;
    const FOG = '#f3dcc4';
    s.background = new THREE.Color(FOG);
    s.fog = new THREE.Fog(FOG, 70, 260);
    this.sky = new THREE.Mesh(new THREE.SphereGeometry(260, 32, 16), skyMaterial());
    this.sky.renderOrder = -1; this.sky.frustumCulled = false; s.add(this.sky);
    this.hemi = new THREE.HemisphereLight('#fff0d8', '#9d8a74', 1.35); s.add(this.hemi);
    const sun = new THREE.DirectionalLight('#ffe0b0', 2.6);
    sun.castShadow = true;
    const sz = this.lowEnd ? 1024 : 2048;
    sun.shadow.mapSize.set(sz, sz);
    const c = sun.shadow.camera as THREE.OrthographicCamera;
    c.left = -42; c.right = 42; c.top = 42; c.bottom = -42; c.near = 1; c.far = 160;
    sun.shadow.bias = -0.0006; sun.shadow.normalBias = 0.03; sun.shadow.radius = 3;
    s.add(sun, sun.target);
    this.sun = sun;
    const fill = new THREE.DirectionalLight('#bcd6ff', 0.45); fill.position.set(30, 20, -40); s.add(fill); this.fill = fill;

    this.marker = new THREE.Mesh(new THREE.RingGeometry(0.25, 0.36, 24), new THREE.MeshBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0.8, depthWrite: false }));
    this.marker.rotation.x = -Math.PI / 2; this.marker.visible = false; s.add(this.marker);
    this.ring = new THREE.Mesh(new THREE.RingGeometry(0.55, 0.68, 32), new THREE.MeshBasicMaterial({ color: '#ffd36b', transparent: true, opacity: 0.85, depthWrite: false }));
    this.ring.rotation.x = -Math.PI / 2; this.ring.visible = false; s.add(this.ring);
  }

  private setupPost() {
    try { const g = JSON.parse(localStorage.getItem('md-gfx') || 'null'); if (g) this.gfx = { ...this.gfx, ...g }; else this.gfx.ao = !this.lowEnd; } catch { this.gfx.ao = !this.lowEnd; }
    const s = this.renderer.getDrawingBufferSize(new THREE.Vector2());
    const rt = new THREE.WebGLRenderTarget(s.x, s.y, { type: THREE.HalfFloatType, samples: this.lowEnd ? 0 : 4 });
    const c = new EffectComposer(this.renderer, rt);
    c.addPass(new RenderPass(this.scene, this.camera));
    const ao = new GTAOPass(this.scene, this.camera, s.x, s.y);
    ao.blendIntensity = 0.85;
    ao.updateGtaoMaterial({ radius: 0.9, distanceExponent: 1.4, thickness: 1.2, scale: 1.0, samples: 12 });
    ao.updatePdMaterial({ lumaPhi: 10, depthPhi: 2, normalPhi: 3, radius: 6, rings: 2, samples: 12 });
    c.addPass(ao);
    const bl = new UnrealBloomPass(new THREE.Vector2(s.x / 2, s.y / 2), 0.22, 0.5, 0.92);
    c.addPass(bl);
    c.addPass(new OutputPass());
    this.composer = c; this.gtao = ao; this.bloom = bl;
    this.applyGfx();
    // üst çubukta AO düğmesi
    const b = document.createElement('button'); b.className = 'iconbtn gfx'; b.id = 'gfxBtn'; b.setAttribute('aria-label', 'Ortam gölgesi');
    b.onclick = () => { this.gfx.ao = !this.gfx.ao; this.applyGfx(); try { localStorage.setItem('md-gfx', JSON.stringify(this.gfx)); } catch { /* */ } this.ev.toast(this.gfx.ao ? 'Ortam gölgesi açık (daha güzel)' : 'Ortam gölgesi kapalı (daha hızlı)'); };
    document.getElementById('muteBtn')?.before(b);
    this.applyGfx();
  }

  private applyGfx() {
    if (this.gtao) this.gtao.enabled = this.gfx.ao;
    if (this.bloom) this.bloom.enabled = this.gfx.bloom;
    const b = document.getElementById('gfxBtn'); if (b) { b.textContent = 'AO'; b.classList.toggle('off', !this.gfx.ao); }
  }

  loadCity(id: string) {
    const mats = makeMaterials();
    this.world = CITY_BUILDERS[id](mats, this.lowEnd, getKits());
    this.scene.add(this.world.root);
    this.pos.copy(this.world.spawn); this.yaw = this.world.spawnYaw; this.camYaw = this.yaw;
    this.camTarget.copy(this.pos);  // kamera ilk karede doğrudan oyuncunun arkasında (haritayı boydan boya kaymasın)
    this.player = new Human(this.state.look);
    this.scene.add(this.player.root);
    this.makeGulls();
    // NPC'ler
    for (const n of this.world.npcs) {
      const h = new Human({ outfit: 'tisort_mercan', hat: n.hat, skin: '#e0b090', hair: '#3a3030', pants: '#4a4a4a', shirt: n.shirt });
      h.root.position.set(n.x, 0, n.z); h.root.rotation.y = n.rot; h.sitting = !!n.sit;
      this.scene.add(h.root); this.npcs.push(h);
    }
    // fenerler: gece yanan ışıltı (bloom) + oyuncuya en yakın birkaç gerçek ışık
    if (this.world.lamps?.length) {
      const gm = new THREE.MeshBasicMaterial({ color: '#000000', toneMapped: true });
      const im = new THREE.InstancedMesh(new THREE.SphereGeometry(0.2, 10, 8), gm, this.world.lamps.length);
      this.world.lamps.forEach(([x, z], i) => im.setMatrixAt(i, new THREE.Matrix4().makeTranslation(x, this.world.lampH ?? 3.45, z)));
      im.computeBoundingSphere(); this.scene.add(im); this.lampGlow = im;
      for (let i = 0; i < 4; i++) { const l = new THREE.PointLight('#ffc070', 0, 13, 1.6); l.position.set(0, -50, 0); this.scene.add(l); this.lampLights.push(l); }
    }
    // gezinen NPC'ler (yalnız yeni görünümde)
    const SH = ['#e2493b', '#3b6aa8', '#2f7d6d', '#e2a33b', '#8e3b5a', '#f4efe6', '#6b8fbf'];
    (this.world.walkers ?? []).forEach((pts, k) => {
      const h = new Human({ outfit: 'tisort_mercan', hat: k % 3 === 0 ? 'kasket' : null, skin: k % 2 ? '#e0b090' : '#c98d62', hair: k % 2 ? '#3a3030' : '#6b4a32', pants: k % 2 ? '#4a4a4a' : '#5a6a8a', shirt: SH[k % SH.length] } as any);
      const path = pts.map(([x, z]) => new THREE.Vector3(x, 0, z));
      h.root.position.copy(path[0]); this.scene.add(h.root);
      this.walkers.push({ h, path, i: 1, sp: 1.1 + (k % 3) * 0.15 });
    });
    // güvercinler
    const kits = getKits();
    if (kits && this.world.pigeons?.length) {
      const a = kits.get('guvercin');
      const im = new THREE.InstancedMesh(a.geo, a.mat, this.world.pigeons.length);
      im.castShadow = false; im.receiveShadow = true; im.frustumCulled = false;
      for (let i = 0; i < im.count; i++) im.setColorAt(i, new THREE.Color('#ffffff'));
      this.scene.add(im);
      this.pigeons = { im, b: this.world.pigeons.map(([x, z]) => ({ home: new THREE.Vector3(x, 0, z), p: new THREE.Vector3(x, 0, z), v: new THREE.Vector3(), yaw: Math.random() * 6.28, air: 0, t: Math.random() * 3 })) };
    }
    // sokak hayvanları
    const R = rng(99);
    for (const sp of this.world.strays) this.addStray(sp, R);
    this.spawnVehicle();
    this.scene.add(this.shelterGroup); this.refreshShelter();
    ensureQuests(this.state, now());
    // kurulu kulübeler
    for (const h of this.state.houses.filter(h => h.city === id)) this.addHouseObj(h.uid);
    this.spawnPets();
  }

  private makeGulls() {
    const mat = new THREE.MeshLambertMaterial({ color: '#f6f6f2', side: THREE.DoubleSide });
    for (let i = 0; i < 6; i++) {
      const g = new THREE.Group();
      const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.12, 0.3, 3, 6), mat); body.rotation.x = Math.PI / 2; g.add(body);
      for (const sx of [-1, 1]) { const w = new THREE.Mesh(new THREE.PlaneGeometry(0.7, 0.25), mat); w.position.x = sx * 0.38; w.name = 'w' + sx; g.add(w); }
      g.userData = { r: 8 + i * 3, h: 7 + (i % 3) * 2, sp: 0.25 + i * 0.03, o: i * 1.3, cx: -30 + i * 12, cz: -40 - (i % 2) * 8 };
      this.scene.add(g); this.gulls.push(g);
    }
  }

  // ---------- sahiplenilen dostlar ----------
  spawnPets() {
    const all = [this.companion, ...this.homePets].filter(Boolean) as Companion[];
    for (const c of all) { this.scene.remove(c.pet.root); c.label.remove(); }
    this.companion = null; this.homePets = [];
    for (const p of this.state.pets) {
      const breed = breedById(p.breed); if (!breed) continue;
      const active = p.uid === this.state.activePet;
      const house = p.house ? this.state.houses.find(h => h.uid === p.house && h.city === this.state.city) : undefined;
      if (!active && !house) continue;
      const pet = new Pet(breed, p.uid.length * 31 + p.uid.charCodeAt(0), { wear: p.wear, collar: p.collar });
      const label = document.createElement('div'); label.className = 'plabel mine'; this.labelsEl.appendChild(label);
      const c: Companion = { uid: p.uid, pet, yaw: 0, mode: active ? 'follow' : 'home', t: 0, ball: null, label };
      if (active) pet.root.position.copy(this.pos).add(new THREE.Vector3(1, 0, 1));
      else { c.home = new THREE.Vector3(house!.x, 0, house!.z + 1.2); pet.root.position.copy(c.home); }
      this.scene.add(pet.root);
      if (active) this.companion = c; else this.homePets.push(c);
    }
  }

  refreshGear() {
    for (const c of [this.companion, ...this.homePets]) {
      if (!c) continue; const p = this.state.pets.find(p => p.uid === c.uid); if (p) c.pet.setGear(p.wear, p.collar);
    }
  }

  addHouseObj(uid: string) {
    const h = this.state.houses.find(h => h.uid === uid); if (!h) return;
    const o = petHouse(h.item, h.color, h.name);
    o.position.set(h.x, 0, h.z); o.rotation.y = h.rot;
    this.scene.add(o); this.houseObjs.set(uid, o);
  }

  // ---------- yerleştirme modu ----------
  startPlacing(item: string) {
    const ghost = petHouse(item, itemById(item)!.color, '...');
    ghost.traverse(o => { const m = (o as THREE.Mesh).material as THREE.MeshLambertMaterial; if (m) { (o as THREE.Mesh).material = m.clone(); ((o as THREE.Mesh).material as THREE.MeshLambertMaterial).transparent = true; ((o as THREE.Mesh).material as THREE.MeshLambertMaterial).opacity = 0.7; } });
    this.scene.add(ghost);
    this.placing = { item, ghost, rot: this.yaw + Math.PI, valid: true };
  }
  rotatePlacing() { if (this.placing) this.placing.rot += Math.PI / 2; }
  cancelPlacing() { if (this.placing) { this.scene.remove(this.placing.ghost); this.placing = null; } }
  placingSpot(): { x: number; z: number; rot: number; valid: boolean } | null {
    if (!this.placing) return null;
    const g = this.placing.ghost.position;
    return { x: g.x, z: g.z, rot: this.placing.rot, valid: this.placing.valid };
  }

  // ---------- etkileşimler ----------
  private faceTo(p: THREE.Vector3) { this.yaw = Math.atan2(p.x - this.pos.x, p.z - this.pos.z); }

  private bowl(water: boolean, at: THREE.Vector3): THREE.Object3D {
    const g = new THREE.Group();
    const b = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.15, 0.1, 16), new THREE.MeshLambertMaterial({ color: water ? '#3b8ed6' : '#e2493b' })); b.position.y = 0.05; g.add(b);
    const f = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.17, 0.02, 16), new THREE.MeshLambertMaterial({ color: water ? '#9fd8f0' : '#b0743f' })); f.position.y = 0.1; g.add(f);
    if (!water) for (let i = 0; i < 7; i++) { const k = new THREE.Mesh(new THREE.SphereGeometry(0.035, 5, 4), new THREE.MeshLambertMaterial({ color: '#8a5a32' })); k.position.set(Math.cos(i) * 0.09, 0.12, Math.sin(i * 1.7) * 0.09); g.add(k); }
    g.position.copy(at); g.scale.setScalar(0.01);
    g.userData.grow = 0;
    this.scene.add(g);
    return g;
  }

  feed(): void {
    if (this.riding) { this.ev.toast('Önce araçtan in'); return; }
    const s = this.near;
    if (this.player.busy) return;
    if (!s) {
      if (this.nearCompanion) { this.ev.toast(`${this.petName(this.nearCompanion)} tok, onu sevebilirsin`); return; }
      this.ev.toast('Yakında aç bir dost yok. Başında 🍖 olanları ara'); sfx.error(); return;
    }
    if (s.hungryAt > now()) { this.ev.toast(`${s.name} tok. Biraz sevmeye ne dersin?`); return; }
    if (s.bowl) return;
    const r = feedStray(this.state, s.id, now());
    if (!r.ok) { this.ev.toast('Mama bitti! Bekle ya da reklam izleyip doldur'); sfx.error(); return; }
    this.faceTo(s.pet.root.position);
    haptic(15);
    const spot = this.pos.clone().add(new THREE.Vector3(Math.sin(this.yaw) * 0.75, 0, Math.cos(this.yaw) * 0.75));
    this.player.act('kneel', 1.3, () => {
      s.bowl = this.bowl(false, spot); sfx.pour();
      s.mode = 'toBowl'; s.target = spot.clone(); s.t = 12;
    });
    s.hungryAt = now() + (300 + Math.random() * 240) * 1000;
    this.ev.reward(r.coins, r.gems, s.pet.root.position.clone().setY(1));
    if (r.newFriend) setTimeout(() => this.ev.toast(`${s.name} artık senin dostun! 💛`), 900);
    save(this.state); this.ev.changed();
  }

  water(): void {
    if (this.riding) { this.ev.toast('Önce araçtan in'); return; }
    if (this.player.busy) return;
    if (this.nearFountain) {
      refillWater(this.state); sfx.pour(); haptic(10);
      this.player.act('kneel', 1.0);
      this.ev.toast('Su kabın doldu 💧'); save(this.state); this.ev.changed(); return;
    }
    const s = this.near;
    if (!s) { this.ev.toast(this.state.water > 0 ? 'Yakında susamış dost yok' : 'Su bitti. Meydandaki çeşmeden doldur'); sfx.error(); return; }
    if (s.thirstyAt > now()) { this.ev.toast(`${s.name} susamamış`); return; }
    if (s.bowl) return;
    const r = waterStray(this.state, s.id);
    if (!r.ok) { this.ev.toast('Su bitti. Meydandaki çeşmeden doldur ⛲'); sfx.error(); return; }
    this.faceTo(s.pet.root.position); haptic(15);
    const spot = this.pos.clone().add(new THREE.Vector3(Math.sin(this.yaw) * 0.75, 0, Math.cos(this.yaw) * 0.75));
    this.player.act('kneel', 1.3, () => { s.bowl = this.bowl(true, spot); sfx.pour(); s.mode = 'toBowl'; s.target = spot.clone(); s.t = 12; });
    s.thirstyAt = now() + (360 + Math.random() * 240) * 1000;
    this.ev.reward(r.coins, 0, s.pet.root.position.clone().setY(1));
    save(this.state); this.ev.changed();
  }

  pet(): void {
    if (this.riding) { this.ev.toast('Önce araçtan in'); return; }
    if (this.player.busy) return;
    const s = this.near, c = this.nearCompanion;
    const target = s?.pet ?? c?.pet;
    if (!target) { this.ev.toast('Sevmek için bir dostun yanına git'); return; }
    this.faceTo(target.root.position);
    haptic(8);
    this.player.act('pet', 1.8, () => {
      target.cat ? sfx.purr() : sfx.bark(); target.react();
      this.ev.hearts(target.root.position.clone().setY(target.height + 0.2));
    });
    if (s) {
      s.mode = 'happy'; s.t = 2.2; s.target = null; s.pet.sleeping = false;
      s.yaw = Math.atan2(this.pos.x - s.pet.root.position.x, this.pos.z - s.pet.root.position.z);
      const coins = petStray(this.state, s.id, now());
      if (coins) this.ev.reward(coins, 0, s.pet.root.position.clone().setY(1));
      save(this.state); this.ev.changed();
    } else if (c) { c.mode = 'happy'; c.t = 2.2; }
  }

  canThrow() { return !!this.companion && Object.keys(this.state.items).some(k => itemById(k)?.kind === 'ball' && this.state.items[k] > 0) && this.balls.length === 0; }

  throwBall(): void {
    if (this.riding) { this.ev.toast('Önce araçtan in'); return; }
    const c = this.companion; if (!c || this.player.busy || this.balls.length) return;
    const ballId = Object.keys(this.state.items).filter(k => itemById(k)?.kind === 'ball' && this.state.items[k] > 0).pop();
    if (!ballId) { this.ev.toast('Mağazadan bir top al'); return; }
    const it = itemById(ballId)!;
    this.player.act('throw', 0.8, () => {
      sfx.throw();
      const mat = it.color2 ? new THREE.MeshLambertMaterial({ map: stripeTex(it.color, it.color2) }) : new THREE.MeshLambertMaterial({ color: it.color });
      const m = new THREE.Mesh(new THREE.SphereGeometry(ballId === 'top_plaj' ? 0.16 : 0.1, 14, 10), mat); m.castShadow = true;
      const start = this.pos.clone().add(new THREE.Vector3(0, 1.3, 0));
      m.position.copy(start); this.scene.add(m);
      const dir = new THREE.Vector3(Math.sin(this.yaw), 0, Math.cos(this.yaw));
      this.balls.push({ mesh: m, vel: dir.multiplyScalar(6.5).add(new THREE.Vector3(0, 4.2, 0)), resting: false, owner: c });
      c.mode = 'fetch'; c.t = 10; c.pet.sleeping = false;
    });
  }

  petName(c: Companion) { return this.state.pets.find(p => p.uid === c.uid)?.name ?? ''; }

  // ---------- döngü ----------
  resize() {
    const w = innerWidth, h = innerHeight;
    this.renderer.setSize(w, h, false);
    if (this.composer) { const s = this.renderer.getDrawingBufferSize(new THREE.Vector2()); this.composer.setSize(w, h); this.composer.setPixelRatio(this.renderer.getPixelRatio()); this.gtao?.setSize(s.x, s.y); }
    this.camera.aspect = w / h;
    this.camera.fov = w < h ? 68 : 57;
    this.camera.near = 0.3; this.camera.far = 275;
    this.camera.updateProjectionMatrix();
  }

  start() {
    const loop = () => {
      requestAnimationFrame(loop);
      const dt = Math.min(0.05, this.clock.getDelta());
      if (!this.paused) this.update(dt);
      this.draw();
    };
    loop();
  }

  /** Bir sokak hayvanını sahneye ekler (yükleme ve veterinerden sokağa bırakma için). */
  addStray(sp: StraySpawn, R = rng(Math.floor(Math.random() * 9999))): Stray {
    const breed: Breed = sp.look ? { id: sp.id, species: sp.look.species, name: sp.name, price: {}, look: { size: 1, belly: '#f4efe6', ...sp.look } as BreedLook } : breedById(sp.breed)!;
    const pet = new Pet(breed, R.int(1, 9999));
    pet.root.position.set(sp.x, 0, sp.z);
    this.scene.add(pet.root);
    const label = document.createElement('div'); label.className = 'plabel'; this.labelsEl.appendChild(label);
    const st: Stray = { id: sp.id, name: sp.name, pet, home: new THREE.Vector3(sp.x, 0, sp.z), mode: 'idle', t: R.range(0, 4), target: null, yaw: R.range(0, 6.28), hungryAt: 0, thirstyAt: 0, bowl: null, label, vocalT: R.range(4, 12) };
    const f = this.state.friends[sp.id];
    st.hungryAt = R.chance(f ? 0.6 : 0.85) ? 0 : now() + R.range(60, 240) * 1000;
    st.thirstyAt = R.chance(0.55) ? 0 : now() + R.range(60, 300) * 1000;
    if (R.chance(0.2)) { st.mode = 'sleep'; st.t = R.range(8, 20); pet.sleeping = true; pet.setPose('lie'); }
    this.strays.push(st);
    return st;
  }

  // ---------- hasta hayvanlar, veteriner, barınak ----------
  /** Zaman zaman bir sokak hayvanı hastalanır (aynı anda en fazla 3); topallar, üstünde 🤒 görünür. */
  private updateSick(dt: number) {
    if (!this.world.vetDoor) return;
    this.sickT -= dt; if (this.sickT > 0) return;
    this.sickT = 70 + Math.random() * 40;
    if (this.strays.filter(s => s.sick).length >= 3) return;
    const cand = this.strays.filter(s => !s.sick && !s.carried && s.mode !== 'sleep').map(s => [s, s.pet.root.position.distanceTo(this.pos)] as const).filter(([, d]) => d > 12 && d < 90);
    if (!cand.length) return;
    const [s] = cand[Math.floor(Math.random() * cand.length)];
    s.sick = true; s.pet.limp = true;
    this.ev.toast(`🤒 ${s.name} hastalandı! Aracınla veterinere götür`);
  }

  /** Bağlam butonu: hastayı araca al / veterinere teslim et / veteriner, barınak, evim panelleri. */
  private updateSpot() {
    let sp: Game['spot'] = null;
    const v = this.vehicle;
    if (this.riding && v && this.world.vetDoor) {
      const free = v.def.cap - this.carried.length - this.carriedSick.length;
      if (this.carriedSick.length && v.root.position.distanceTo(this.world.vetDoor) < 9) sp = { kind: 'drop', label: 'Teslim et', icon: '🏥' };
      else if (free > 0 && this.strays.some(s => s.sick && !s.carried && s.pet.root.position.distanceTo(v.root.position) < v.def.radius + 2.6)) sp = { kind: 'carry', label: 'Hastayı al', icon: '🤒' };
    } else if (!this.riding) {
      if (this.world.vetDoor && this.pos.distanceTo(this.world.vetDoor) < 6) sp = { kind: 'vet', label: 'Veteriner', icon: '🏥' };
      else if (this.world.homeDoor && this.pos.distanceTo(this.world.homeDoor) < 4.5) sp = { kind: 'home', label: 'Evim', icon: '🏡' };
      else if (this.world.shelterYard) { const y = this.world.shelterYard; if (this.pos.x > y.x0 - 2 && this.pos.x < y.x1 + 2 && this.pos.z > y.z0 - 2 && this.pos.z < y.z1 + 3) sp = { kind: 'shelter', label: 'Barınak', icon: '🐾' }; }
    }
    if ((sp?.kind ?? null) !== (this.spot?.kind ?? null)) { this.spot = sp; this.ev.nearChanged(); } else this.spot = sp;
  }

  spotAction() {
    const sp = this.spot; if (!sp) return;
    const v = this.vehicle;
    if (sp.kind === 'carry' && v) {
      const s = this.strays.filter(s => s.sick && !s.carried).sort((a, b) => a.pet.root.position.distanceTo(v.root.position) - b.pet.root.position.distanceTo(v.root.position))[0];
      if (!s) return;
      if (v.def.smallOnly && s.pet.height >= 0.5) { this.ev.toast(`${s.name} bisiklet sepetine sığmıyor. Scooter ya da pikapla gel`); return; }
      const slot = this.carried.length + this.carriedSick.length;
      s.carried = true; v.root.add(s.pet.root); s.pet.root.position.set(...v.def.slots[slot]); s.pet.root.rotation.set(0, 0, 0); s.pet.setPose('lie'); s.pet.speed = 0;
      this.carriedSick.push(s); sfx.purr();
      this.ev.toast(`${s.name} araçta. Veterinere götür 🏥`);
    } else if (sp.kind === 'drop') {
      for (const s of this.carriedSick) {
        const look = { ...s.pet.breed.look, species: s.pet.breed.species };
        admit(this.state, s.id + '_' + now().toString(36), s.name, look, now());
        s.pet.root.parent?.remove(s.pet.root); s.label.remove();
        this.strays = this.strays.filter(x => x !== s);
      }
      const n = this.carriedSick.length; this.carriedSick = [];
      sfx.success(); save(this.state); this.ev.changed();
      this.ev.toast(`${n} dost tedaviye alındı. Veteriner panelinden takip et`);
      this.ev.open?.('vet');
    } else this.ev.open?.(sp.kind);
    this.ev.nearChanged();
  }

  /** Veterinerden sokağa bırakılan dost: kapının önünde sağlıklı olarak dolaşır. */
  releaseToStreet(name: string, look: any) {
    const d = this.world.vetDoor ?? this.pos;
    this.addStray({ id: 'sk_' + now().toString(36), name, breed: '', x: d.x + (Math.random() - 0.5) * 3, z: d.z + 2, look });
  }

  /** Barınak bahçesindeki dostlar + kulübeler + süsler (durum değişince yeniden kurulur). */
  refreshShelter() {
    const y = this.world.shelterYard; const kits = getKits();
    this.shelterGroup.clear(); this.shelterPets = [];
    if (!y) return;
    const sh = this.state.shelter;
    for (let i = 0; i < sh.level; i++) { const k = petHouseModel(i % 2 ? 'kedi_evi' : 'kopek_kulubesi', ['#e07a5f', '#7a9e7e', '#f2c94c', '#3b6aa8'][i % 4], ''); k.position.set(y.x0 + 1.6 + i * 2.6, 0, y.z0 + 1.6); this.shelterGroup.add(k); }
    if (kits) {
      const put = (n: string, x: number, z: number, s = 1, ry = 0) => { const a = kits.get(n); const m = new THREE.Mesh(a.geo, Array.isArray(a.mat) ? a.mat : a.mat); m.position.set(x, 0, z); m.scale.setScalar(s); m.rotation.y = ry; m.castShadow = true; this.shelterGroup.add(m); };
      if (sh.decor.includes('dekor_cicek')) for (let i = 0; i < 6; i++) { put('pot_large', y.x0 + 0.8, y.z0 + 3 + i * 2.4, 1.8); put('flower_redA', y.x0 + 0.8, y.z0 + 3 + i * 2.4, 2.6); }
      if (sh.decor.includes('dekor_golgelik')) put('stall-green', (y.x0 + y.x1) / 2 + 3, y.z1 - 4, 2.6);
    }
    if (sh.decor.includes('dekor_oyuncak')) for (let i = 0; i < 5; i++) { const b = new THREE.Mesh(new THREE.SphereGeometry(0.12, 12, 8), new THREE.MeshStandardMaterial({ color: ['#e2493b', '#f2c94c', '#3b8ed6', '#9a5ac8', '#5aa055'][i], roughness: 0.4 })); b.position.set(y.x0 + 3 + i * 1.9, 0.12, y.z1 - 2 - (i % 2) * 2); this.shelterGroup.add(b); }
    sh.animals.forEach((a, i) => {
      const breed: Breed = { id: a.uid, species: a.species, name: a.name, price: {}, look: { size: 1, belly: '#f4efe6', ...a.look } as BreedLook };
      const pet = new Pet(breed, i + 5, { wear: a.wear, collar: a.collar });
      pet.root.position.set(y.x0 + 2 + (i % 4) * 2.8, 0, y.z0 + 5 + Math.floor(i / 4) * 3);
      this.shelterGroup.add(pet.root); this.shelterPets.push({ pet, target: null, t: Math.random() * 3, yaw: Math.random() * 6 });
    });
  }

  private updateShelter(dt: number) {
    const y = this.world.shelterYard; if (!y || !this.shelterPets.length) return;
    if (this.pos.distanceTo(new THREE.Vector3((y.x0 + y.x1) / 2, 0, (y.z0 + y.z1) / 2)) > 90) return;
    for (const s of this.shelterPets) {
      s.t -= dt;
      if (s.t < 0) { s.t = 3 + Math.random() * 6; s.target = Math.random() < 0.6 ? new THREE.Vector3(y.x0 + 1 + Math.random() * (y.x1 - y.x0 - 2), 0, y.z0 + 3 + Math.random() * (y.z1 - y.z0 - 4)) : null; s.pet.setPose(s.target ? 'stand' : (Math.random() < 0.5 ? 'sit' : 'lie')); }
      if (s.target) { if (this.walkTo(s.pet, s, s.target, 0.9, dt, 0.3)) s.target = null; } else s.pet.speed *= 0.85;
      s.pet.root.rotation.y = s.yaw; s.pet.update(dt);
    }
  }

  // ---------- araçlar ----------
  /** Etkin aracı oyuncunun yanına park eder (yoksa/değiştiyse yeniden kurar). */
  spawnVehicle(nearPlayer = false) {
    const kits = getKits(); const g = this.state.garage;
    if (this.riding) this.toggleRide();
    if (this.vehicle) { this.scene.remove(this.vehicle.root); this.vehicle = null; }
    if (!kits || !(this.state.items[g.active] > 0) || !VEHICLE_DEFS[g.active]) return;
    const def = VEHICLE_DEFS[g.active];
    const v = new Vehicle(def, kits, g.color[def.id] ?? def.defColor, g.acc[def.id] ?? []);
    const right = new THREE.Vector3(Math.cos(this.yaw), 0, -Math.sin(this.yaw));
    let spot = this.pos.clone().addScaledVector(right, 1.6 + def.radius);
    const pk = g.park;
    if (!nearPlayer && pk) { v.root.position.set(pk.x, 0, pk.z); v.yaw = pk.yaw; v.root.rotation.y = pk.yaw; this.scene.add(v.root); this.vehicle = v; return; }
    if (!nearPlayer && this.world.vehicleStart) { const p = this.world.vehicleStart; spot = new THREE.Vector3(p[0], 0, p[1]); v.root.position.copy(spot); v.yaw = p[2]; v.root.rotation.y = p[2]; this.scene.add(v.root); this.vehicle = v; return; }
    for (const k of [1, -1, 2, -2]) { const c = this.pos.clone().addScaledVector(right, k * (1.6 + def.radius)); if (!blocked(c.x, c.z, def.radius, this.world.colliders) && onLand(c.x, c.z, this.world.lands)) { spot = c; break; } }
    v.root.position.copy(spot); v.yaw = this.yaw; v.root.rotation.y = this.yaw;
    this.scene.add(v.root); this.vehicle = v;
    g.park = { x: spot.x, z: spot.z, yaw: this.yaw }; save(this.state);
  }

  /** Aracı oyuncunun yanına getirir (Araç çağır). */
  callVehicle() {
    if (this.riding) return;
    if (this.vehicle && this.vehicle.root.position.distanceTo(this.pos) < 5) { this.ev.toast('Aracın zaten yanında'); return; }
    this.spawnVehicle(true); sfx.tap(); this.ev.toast('Aracın yanına geldi'); this.ev.nearChanged();
  }

  setVehicleLook() { const v = this.vehicle; if (!v) return; const g = this.state.garage; v.setColor(g.color[v.def.id] ?? v.def.defColor); v.setAcc(g.acc[v.def.id] ?? []); }

  /** Bin / in. Binerken yanındaki dost kapasite izin verirse sepete/sandığa/kasaya atlar. */
  toggleRide() {
    const v = this.vehicle; if (!v) return;
    if (this.riding) {
      this.riding = false;
      const side = new THREE.Vector3(Math.cos(v.yaw), 0, -Math.sin(v.yaw)).multiplyScalar(-(v.def.radius + 0.6));
      const p = v.root.position.clone().add(side);
      if (blocked(p.x, p.z, 0.35, this.world.colliders) || !onLand(p.x, p.z, this.world.lands)) p.copy(v.root.position).sub(side);
      this.pos.copy(p); v.speed = 0;
      this.scene.add(this.player.root); this.player.root.visible = true; this.player.sitting = false;
      this.player.root.position.copy(this.pos); this.player.root.rotation.set(0, v.yaw, 0);
      for (const s of this.carriedSick) { this.scene.add(s.pet.root); s.pet.root.position.copy(this.pos).add(new THREE.Vector3(-0.8, 0, 0.8)); s.pet.root.rotation.set(0, 0, 0); s.carried = false; s.mode = 'idle'; s.t = 4; s.home.copy(s.pet.root.position); }
      this.carriedSick = [];
      for (const c of this.carried) { this.scene.add(c.pet.root); c.pet.root.position.copy(this.pos).add(new THREE.Vector3(0.6, 0, 0.6)); c.pet.root.rotation.set(0, 0, 0); c.mode = 'follow'; c.pet.setPose('stand'); }
      this.carried = [];
      this.state.garage.park = { x: v.root.position.x, z: v.root.position.z, yaw: v.yaw }; save(this.state);
      sfx.tap();
    } else {
      if (!this.nearVehicle) return;
      this.riding = true;
      this.pos.copy(v.root.position); this.yaw = v.yaw;
      if (v.def.seat) { v.root.add(this.player.root); this.player.root.position.set(...v.def.seat); this.player.root.rotation.set(0, 0, 0); this.player.sitting = true; }
      else { this.player.root.visible = false; }
      const c = this.companion;
      if (c && v.def.cap > 0 && (!v.def.smallOnly || c.pet.height < 0.5)) {
        v.root.add(c.pet.root); c.pet.root.position.set(...v.def.slots[0]); c.pet.root.rotation.set(0, 0, 0); (c as any).mode = 'ride'; this.carried.push(c);
      } else if (c && v.def.smallOnly) this.ev.toast(`${this.petName(c)} bisiklet sepetine sığmıyor, arkandan koşacak`);
      sfx.tap();
    }
    this.ev.nearChanged();
  }

  /** Araç sürüşü: joystick yönüne dönerek hızlanır; binalardan geçmez (orta + ön + arka çarpışma noktaları). */
  private drive(dt: number, wish: THREE.Vector3, mag: number) {
    const v = this.vehicle!, d = v.def;
    let turnRate = 0, dy = 0;
    if (mag > 0.05) {
      const ty = Math.atan2(wish.x, wish.z); dy = ty - v.yaw; dy = Math.atan2(Math.sin(dy), Math.cos(dy));
      const turn = THREE.MathUtils.clamp(dy, -d.turn * dt, d.turn * dt) * (v.speed > 0.4 ? 1 : 0.7);
      v.yaw += turn; turnRate = turn / dt;
    }
    const target = mag * d.speed * (Math.abs(dy) > 1.6 ? 0.25 : 1);
    v.speed += (target - v.speed) * Math.min(1, dt * (target > v.speed ? 1.5 : 3.5));
    const fwd = new THREE.Vector3(Math.sin(v.yaw), 0, Math.cos(v.yaw));
    const before = this.pos.clone();
    this.pos.addScaledVector(fwd, v.speed * dt);
    collide(this.pos, Math.min(d.radius, 0.9), this.world.colliders, this.world.bounds, this.world.lands, before);
    if (d.cap === 3) for (const k of [1.55, -1.75]) { // pikabın önü/arkası da duvara girmesin
      const pt = this.pos.clone().addScaledVector(fwd, k), pb = pt.clone();
      collide(pt, 0.85, this.world.colliders, this.world.bounds, this.world.lands, before.clone().addScaledVector(fwd, k));
      this.pos.add(pt.sub(pb));
    }
    for (const o of this.houseObjs.values()) this.pushOut(this.pos, o.position, 0.9 + d.radius * 0.5);
    const real = this.pos.distanceTo(before) / dt;
    if (real < v.speed * 0.6) v.speed = real;
    v.root.position.copy(this.pos); v.root.rotation.y = v.yaw; v.animate(dt, turnRate);
    this.yaw = v.yaw; this.player.speed = 0;
    this.rideMeters += real * dt;
    if (this.rideMeters >= 25) { questProgress(this.state, 'ride', Math.floor(this.rideMeters), now()); this.rideMeters = 0; }
  }

  /** Gün döngüsü: gerçek saate göre gökyüzü, güneş/ay, ışıklar; gece fenerler ve pencereler yanar. */
  private updateDay(dt: number) {
    this.dayT -= dt; if (this.dayT > 0) return; this.dayT = 0.5;
    const d = dayState(hourNow());
    const u = (this.sky.material as THREE.ShaderMaterial).uniforms;
    u.top.value.copy(d.top); u.mid.value.copy(d.mid); u.hor.value.copy(d.hor); u.sunDir.value.copy(d.sunDir); u.sunCol.value.copy(d.sun);
    const fog = this.scene.fog as THREE.Fog; fog.color.copy(d.fog); (this.scene.background as THREE.Color).copy(d.fog);
    this.sun.color.copy(d.sun); this.sun.intensity = d.sunI; this.sunDir.copy(d.sunDir);
    this.hemi.color.copy(d.hemiS); this.hemi.groundColor.copy(d.hemiG); this.hemi.intensity = d.hemiI;
    this.fill.intensity = d.fillI;
    this.renderer.toneMappingExposure = d.exp;
    NIGHT.value = d.night;
    if (this.lampGlow) (this.lampGlow.material as THREE.MeshBasicMaterial).color.setRGB(2.2, 1.55, 0.8).multiplyScalar(Math.max(0, d.night - 0.15) / 0.85);
    // en yakın fenerlere gerçek ışık
    if (this.lampLights.length && this.world.lamps) {
      const p = this.pos, near = this.world.lamps.map(([x, z]) => [x, z, (x - p.x) ** 2 + (z - p.z) ** 2]).sort((a, b) => a[2] - b[2]);
      this.lampLights.forEach((l, i) => { const n = near[i]; if (!n) return; l.position.set(n[0], (this.world.lampH ?? 3.45) - 0.2, n[1]); l.intensity = d.night * 9; });
    }
  }

  /** Karo LOD: kameraya ~75 m'den yakın karolarda ayrıntılı pencereler, uzakta basit olanlar (sis içinde, fark edilmez). */
  private updateTiles() {
    const T = this.world.tiles; if (!T) return;
    const c = this.camera.position;
    for (const k of T) {
      const dx = Math.max(0, Math.abs(c.x - k.cx) - k.half), dz = Math.max(0, Math.abs(c.z - k.cz) - k.half);
      const d = Math.hypot(dx, dz), near = k.near ? d < 85 : d < 75;
      if (near !== k.near) { k.near = near; k.detail.visible = near; k.lod.visible = !near; }
    }
  }

  private updateWalkers(dt: number) {
    for (const w of this.walkers) {
      const r = w.h.root, tgt = w.path[w.i];
      const far = r.position.distanceTo(this.pos) > 120;
      r.visible = !far;
      const d = tgt.clone().sub(r.position); d.y = 0;
      const L = d.length();
      if (L < 0.3) { w.i = (w.i + 1) % w.path.length; continue; }
      // oyuncuya çarpmamak için yavaşla
      const near = r.position.distanceTo(this.pos) < 1.2;
      const sp = near ? 0 : w.sp;
      r.position.addScaledVector(d.normalize(), Math.min(L, sp * dt));
      const yaw = Math.atan2(d.x, d.z); let dy = yaw - r.rotation.y; dy = Math.atan2(Math.sin(dy), Math.cos(dy));
      r.rotation.y += dy * Math.min(1, dt * 6);
      w.h.speed = sp;
      if (!far) w.h.update(dt);
    }
  }

  private updatePigeons(dt: number, t: number) {
    const P = this.pigeons; if (!P) return;
    const m = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), one = new THREE.Vector3(1, 1, 1);
    P.b.forEach((b, i) => {
      if (b.air > 0) {
        b.air -= dt; b.p.addScaledVector(b.v, dt); b.v.y -= dt * 0.6;
        if (b.air <= 0) { b.p.copy(b.home).add(new THREE.Vector3((Math.random() - 0.5) * 3, 0, (Math.random() - 0.5) * 3)); b.v.set(0, 0, 0); }
        e.set(0, b.yaw, Math.sin(t * 30 + i) * 0.25, 'YXZ');
      } else {
        b.t -= dt;
        if (b.t < 0) { b.t = 0.6 + Math.random() * 2.2; b.yaw += (Math.random() - 0.5) * 2; b.p.x += Math.sin(b.yaw) * -0.15; b.p.z += Math.cos(b.yaw) * -0.15; }
        const peck = Math.max(0, Math.sin(t * 7 + i * 1.7)) * 0.5;
        e.set(peck, b.yaw, 0, 'YXZ');
        if (b.p.distanceTo(this.pos) < 2.6) {   // yaklaşınca havalanır
          const away = b.p.clone().sub(this.pos).setY(0).normalize();
          b.v.copy(away.multiplyScalar(4 + Math.random() * 2)).setY(3.5 + Math.random() * 1.5);
          b.yaw = Math.atan2(-b.v.x, -b.v.z); b.air = 2.5 + Math.random() * 2;
        }
      }
      m.compose(b.p, q.setFromEuler(e), one); P.im.setMatrixAt(i, m);
    });
    P.im.instanceMatrix.needsUpdate = true;
  }

  draw() { if (this.composer) this.composer.render(); else this.renderer.render(this.scene, this.camera); }

  private update(dt: number) {
    const inp = this.input.poll();
    const t = performance.now() / 1000;
    // kamera girdisi
    if (inp.yawDelta || inp.pitchDelta) this.manualT = 1.6;
    this.manualT -= dt;
    this.camYaw -= inp.yawDelta;
    this.camPitch = THREE.MathUtils.clamp(this.camPitch + inp.pitchDelta, THREE.MathUtils.degToRad(5), THREE.MathUtils.degToRad(20));
    this.camDist = THREE.MathUtils.clamp(this.camDist + inp.zoomDelta * 4, 3, 7);

    // dokun-git
    if (inp.tap) this.handleTap(inp.tap.x, inp.tap.y);
    this.input.consume();

    // oyuncu hareketi
    let mx = inp.move.x, my = inp.move.y;
    let mag = Math.hypot(mx, my);
    let wish = new THREE.Vector3();
    if (mag > 0.08) {
      this.tapTarget = null; this.tapStray = null; this.marker.visible = false;
      const fwd = new THREE.Vector3(Math.sin(this.camYaw + this.side), 0, Math.cos(this.camYaw + this.side));
      const right = new THREE.Vector3(-fwd.z, 0, fwd.x);
      wish.addScaledVector(fwd, my).addScaledVector(right, mx).normalize();
      mag = Math.min(1, mag);
    } else if (this.tapTarget) {
      if (this.tapStray) this.tapTarget.copy(this.tapStray.pet.root.position);
      const d = this.tapTarget.clone().sub(this.pos).setY(0);
      const stop = this.tapStray ? 1.3 : 0.25;
      if (d.length() < stop) {
        this.tapTarget = null; this.marker.visible = false;
        if (this.tapStray) { const s = this.tapStray; this.tapStray = null; this.near = s; this.pet(); }
      } else { wish.copy(d.normalize()); mag = d.length() > 4 ? 1 : 0.75; }
    }
    const busy = this.player.busy;
    const speed = busy ? 0 : mag * (this.input.running ? 5.2 : 4.0);
    if (this.riding && this.vehicle) this.drive(dt, wish, mag);
    else if (speed > 0) {
      const targetYaw = Math.atan2(wish.x, wish.z);
      let dy = targetYaw - this.yaw; dy = Math.atan2(Math.sin(dy), Math.cos(dy));
      this.yaw += dy * Math.min(1, dt * 12);
      const before = this.pos.clone();
      this.pos.addScaledVector(wish, speed * dt);
      collide(this.pos, 0.35, this.world.colliders, this.world.bounds, this.world.lands, before);
      for (const o of this.houseObjs.values()) this.pushOut(this.pos, o.position, 0.9);
      const moved = this.pos.distanceTo(before) / dt;
      this.player.speed += (moved - this.player.speed) * Math.min(1, dt * 10);
    } else this.player.speed += (0 - this.player.speed) * Math.min(1, dt * 10);
    if (!this.riding) {
      this.player.root.position.copy(this.pos);
      let ry = this.yaw - this.player.root.rotation.y; ry = Math.atan2(Math.sin(ry), Math.cos(ry));
      this.player.root.rotation.y += ry * Math.min(1, dt * 14);
    }
    this.player.update(dt);
    for (const n of this.npcs) n.update(dt);
    this.updateWalkers(dt);
    this.updateTiles();
    this.updateDay(dt);
    this.updateSick(dt);
    this.updateSpot();
    this.updateShelter(dt);
    this.updatePigeons(dt, t);
    for (const n of this.npcs) n.root.visible = n.root.position.distanceTo(this.pos) < 110;
    if (Math.random() < dt * 0.05) { const n = this.npcs.find(n => n.root.visible && !n.busy); n?.act('wave', 1.6); }

    // dünya canlıları
    this.updateStrays(dt);
    this.updateCompanions(dt);
    this.updateBalls(dt);
    this.updatePlacing();
    for (const l of this.world.laundry) l.rotation.z = Math.sin(t * 1.3 + l.userData.sway) * 0.06;
    this.world.sea.offset.set(t * 0.01, t * 0.006);
    const boat = this.world.boat; boat.position.z -= dt * 2.4; if (boat.position.z < -300) boat.position.z = 300; boat.position.y = -0.7 + Math.sin(t * 1.2) * 0.06;
    for (const g of this.gulls) { const u = g.userData; const a = t * u.sp + u.o; g.position.set(u.cx + Math.cos(a) * u.r, u.h + Math.sin(t * 0.7 + u.o), u.cz + Math.sin(a) * u.r); g.rotation.y = -a; const f = Math.sin(t * 6 + u.o) * 0.5; g.children[1].rotation.z = f; g.children[2].rotation.z = -f; }
    for (const s of this.strays) if (s.bowl && s.bowl.userData.grow < 1) { s.bowl.userData.grow = Math.min(1, s.bowl.userData.grow + dt * 5); s.bowl.scale.setScalar(s.bowl.userData.grow); }

    // yakındaki dost
    this.findNear();

    // kamera: omuz üstü, karşıya bakan. Yürürken yumuşakça arkaya geçer; elle döndürünce bir süre bekler.
    if ((this.riding && this.vehicle ? this.vehicle.speed : this.player.speed) > 0.6 && this.manualT <= 0) {
      let dy = this.yaw - this.camYaw; dy = Math.atan2(Math.sin(dy), Math.cos(dy));
      this.camYaw += dy * Math.min(1, dt * 2.4);
    }
    if (this.camTarget.distanceTo(this.pos) > 12) { this.camTarget.copy(this.pos); this.armDist = this.camDist; } // ışınlanma: kamerayı yapıştır
    this.camTarget.lerp(this.pos, Math.min(1, dt * 10));
    const pivot = this.camTarget.clone().add(new THREE.Vector3(0, 1.5, 0));
    // duvar dibi: kameranın baktığı yönde yakın bir duvar varsa ekranın yarısı düz yüzey olmasın diye
    // görüş duvar boyunca açık tarafa döner (omuzdan bakış), kamera biraz yükselir ve aşağı bakar
    const base = new THREE.Vector3(Math.sin(this.camYaw), 0, Math.cos(this.camYaw));
    const ahead = this.armFree(pivot, base, 8);
    const wT = THREE.MathUtils.clamp((4.8 - ahead) / 3.6, 0, 1);
    this.wallK += (wT - this.wallK) * Math.min(1, dt * 3);
    const rgt = new THREE.Vector3(-base.z, 0, base.x);
    const fr = this.armFree(pivot, rgt, 12), fl = this.armFree(pivot, rgt.clone().negate(), 12);
    const offT = this.wallK > 0.02 ? (fr >= fl ? -1 : 1) * 1.15 * this.wallK : 0;
    this.side += (offT - this.side) * Math.min(1, dt * 2.5);
    const vy = this.camYaw + this.side;
    const fwd = new THREE.Vector3(Math.sin(vy), 0, Math.cos(vy));
    // yay kolu: araya bina girerse kamera karaktere yaklaşır, duvardan geçmez
    const want = this.camDist + (this.riding && this.vehicle ? this.vehicle.def.camExtra : 0);
    const free = this.armFree(pivot, fwd.clone().negate(), want + 0.4) - 0.4;
    const armT = Math.max(1.0, Math.min(want, free));
    this.armDist += (armT - this.armDist) * Math.min(1, dt * (armT < this.armDist ? 18 : 3));
    const pitch = this.camPitch + this.wallK * 0.22;
    const cp = Math.cos(pitch), spch = Math.sin(pitch);
    const lift = Math.max(0, 2.4 - this.armDist) * 0.7 + this.wallK * 1.0; // çok yaklaşınca / duvara bakınca yüksel
    this.camera.position.copy(pivot).addScaledVector(fwd, -this.armDist * cp).add(new THREE.Vector3(0, this.armDist * spch + lift, 0));
    this.camera.lookAt(this.camera.position.clone().add(new THREE.Vector3(fwd.x * cp, -spch, fwd.z * cp)));
    this.sky.position.copy(this.camera.position);
    // güneş yönü sabit; gölge kamerası gölge-dokusu ızgarasına oturtulur (kayıp titreme olmaz)
    this.placeSun(this.camTarget.clone().addScaledVector(fwd, 14));

    this.updateLabels();
  }

  /** pivot'tan dir yönünde engelsiz mesafe (2B dikdörtgen çarpıştırıcılar, binalar yüksek kabul edilir). */
  private armFree(p: THREE.Vector3, dir: THREE.Vector3, maxL: number): number {
    let best = maxL;
    for (const r of this.world.lots) {
      const x0 = r.x - r.hw - 0.25, x1 = r.x + r.hw + 0.25, z0 = r.z - r.hd - 0.25, z1 = r.z + r.hd + 0.25;
      if (p.x > x0 && p.x < x1 && p.z > z0 && p.z < z1) continue; // karakter zaten içindeyse (ör. simge yapı avlusu) yok say
      let t0 = 0, t1 = best;
      for (const [o, d, a, b] of [[p.x, dir.x, x0, x1], [p.z, dir.z, z0, z1]]) {
        if (Math.abs(d) < 1e-6) { if (o < a || o > b) { t0 = 1; t1 = 0; } continue; }
        let ta = (a - o) / d, tb = (b - o) / d; if (ta > tb) [ta, tb] = [tb, ta];
        t0 = Math.max(t0, ta); t1 = Math.min(t1, tb);
      }
      if (t0 <= t1 && t0 < best) best = t0;
    }
    return best;
  }

  private sunDir = new THREE.Vector3(-0.45, 0.78, 0.34).normalize();
  private placeSun(center: THREE.Vector3) {
    const cam = this.sun.shadow.camera as THREE.OrthographicCamera;
    const texel = (cam.right - cam.left) / this.sun.shadow.mapSize.x;
    // ışık uzayına çevir, texel'e yuvarla, geri çevir
    const q = new THREE.Quaternion().setFromRotationMatrix(new THREE.Matrix4().lookAt(new THREE.Vector3(), this.sunDir.clone().negate(), new THREE.Vector3(0, 1, 0)));
    const inv = q.clone().invert();
    const l = center.clone().applyQuaternion(inv);
    l.x = Math.round(l.x / texel) * texel; l.y = Math.round(l.y / texel) * texel;
    const snapped = l.applyQuaternion(q);
    this.sun.target.position.copy(snapped);
    this.sun.position.copy(snapped).addScaledVector(this.sunDir, 80);
    this.sun.target.updateMatrixWorld();
  }

  private pushOut(p: THREE.Vector3, c: THREE.Vector3, r: number) {
    const d = p.clone().sub(c).setY(0); const l = d.length();
    if (l < r && l > 0.001) p.add(d.multiplyScalar((r - l) / l));
  }

  private handleTap(x: number, y: number) {
    if (this.placing) return;
    // önce dostlar (ekranda yakınsa)
    let best: Stray | null = null, bd = 60 * 60;
    for (const s of this.strays) {
      const p = s.pet.root.position.clone().setY(0.4).project(this.camera);
      if (p.z > 1) continue;
      const sx = (p.x * 0.5 + 0.5) * innerWidth, sy = (-p.y * 0.5 + 0.5) * innerHeight;
      const d = (sx - x) ** 2 + (sy - y) ** 2; if (d < bd) { bd = d; best = s; }
    }
    if (best) { this.tapStray = best; this.tapTarget = best.pet.root.position.clone(); this.marker.visible = false; return; }
    // zemin
    const ndc = new THREE.Vector2(x / innerWidth * 2 - 1, -(y / innerHeight) * 2 + 1);
    const ray = new THREE.Raycaster(); ray.setFromCamera(ndc, this.camera);
    const hit = new THREE.Vector3();
    if (ray.ray.intersectPlane(new THREE.Plane(UP, 0), hit)) {
      if (blocked(hit.x, hit.z, 0.2, this.world.colliders)) return;
      this.tapTarget = hit; this.tapStray = null;
      this.marker.position.set(hit.x, 0.03, hit.z); this.marker.visible = true; this.marker.scale.setScalar(1.4);
    }
  }

  private findNear() {
    let best: Stray | null = null, bd = 2.6;
    for (const s of this.strays) { const d = s.pet.root.position.distanceTo(this.pos); if (d < bd) { bd = d; best = s; } }
    let bc: Companion | null = null;
    if (!best) for (const c of [this.companion, ...this.homePets]) if (c) { const d = c.pet.root.position.distanceTo(this.pos); if (d < 2.4 && d < bd) { bd = d; bc = c; } }
    const nf = this.world.fountains.some(f => f.distanceTo(this.pos) < (this.world.fountainR ?? 3.2));
    const nv = !this.riding && !!this.vehicle && this.vehicle.root.position.distanceTo(this.pos) < this.vehicle.def.radius + 1.8;
    const changed = best !== this.near || bc !== this.nearCompanion || nf !== this.nearFountain || nv !== this.nearVehicle;
    this.nearVehicle = nv;
    this.near = best; this.nearCompanion = bc; this.nearFountain = nf;
    const target = best?.pet ?? bc?.pet;
    this.ring.visible = !!target;
    if (target) { this.ring.position.set(target.root.position.x, 0.03, target.root.position.z); this.ring.scale.setScalar(Math.max(0.8, target.radius * 2)); (this.ring.material as THREE.MeshBasicMaterial).opacity = 0.6 + Math.sin(performance.now() / 200) * 0.25; }
    if (this.marker.visible) this.marker.scale.multiplyScalar(0.97).clampScalar(0.8, 2);
    if (changed) this.ev.nearChanged();
  }

  // ---------- sokak hayvanı yapay zekâsı ----------
  private walkTo(p: Pet, yawRef: { yaw: number }, target: THREE.Vector3, speed: number, dt: number, stopAt = 0.2): boolean {
    const d = target.clone().sub(p.root.position).setY(0); const l = d.length();
    if (l < stopAt) { p.speed += (0 - p.speed) * Math.min(1, dt * 8); return true; }
    const want = Math.atan2(d.x, d.z);
    let dy = want - yawRef.yaw; dy = Math.atan2(Math.sin(dy), Math.cos(dy));
    yawRef.yaw += dy * Math.min(1, dt * 7);
    const sp = speed * Math.min(1, l / 0.8 + 0.3) * (Math.abs(dy) > 1.2 ? 0.4 : 1);
    const before = p.root.position.clone();
    p.root.position.addScaledVector(new THREE.Vector3(Math.sin(yawRef.yaw), 0, Math.cos(yawRef.yaw)), sp * dt);
    collide(p.root.position, 0.25, this.world.colliders, this.world.bounds, this.world.lands, before);
    this.pushOut(p.root.position, this.pos, 0.55);
    const real = p.root.position.distanceTo(before) / dt;
    p.speed += (real - p.speed) * Math.min(1, dt * 8);
    if (real < sp * 0.3 && sp > 0.3) return true; // takıldı
    return false;
  }

  private updateStrays(dt: number) {
    const tnow = now();
    for (const s of this.strays) {
      const p = s.pet; s.t -= dt;
      if (s.carried) { p.speed = 0; p.update(dt); continue; }
      const dPlayer = p.root.position.distanceTo(this.pos);
      const hungry = s.hungryAt <= tnow;
      if (dPlayer > 110) { p.root.visible = false; continue; } // sis ötesindekileri hiç güncelleme
      p.root.visible = true;
      p.lookYaw = 0;
      switch (s.mode) {
        case 'idle': {
          p.speed *= 0.85;
          if (dPlayer < 3.2 && !this.player.busy) {
            // oyuncuya bak; açsa yalvar / miyavla
            const want = Math.atan2(this.pos.x - p.root.position.x, this.pos.z - p.root.position.z);
            let dy = want - s.yaw; dy = Math.atan2(Math.sin(dy), Math.cos(dy));
            if (Math.abs(dy) > 1.0) s.yaw += dy * Math.min(1, dt * 3); else p.lookYaw = dy;
            p.setPose(hungry ? (p.cat ? 'sit' : 'beg') : 'sit');
            p.wag = hungry ? 0.8 : 0.5;
            s.vocalT -= dt;
            if (s.vocalT < 0 && hungry) { s.vocalT = 5 + Math.random() * 6; p.cat ? sfx.meow() : sfx.bark(); }
          } else if (s.t < 0) {
            const r = Math.random();
            if (r < 0.55) { s.mode = 'wander'; s.target = this.pickWander(s.home, 7); s.t = 12; p.setPose('stand'); }
            else if (r < 0.75) { s.mode = 'sleep'; s.t = 10 + Math.random() * 15; p.setPose('lie'); p.sleeping = true; }
            else { s.t = 3 + Math.random() * 5; p.setPose(Math.random() < 0.5 ? 'sit' : 'stand'); }
            p.wag = 0.2;
          }
          break;
        }
        case 'wander': {
          const done = !s.target || this.walkTo(p, s, s.target, p.cat ? 0.9 : 1.1, dt, 0.3);
          if (done || s.t < 0) { s.mode = 'idle'; s.t = 2 + Math.random() * 5; s.target = null; }
          if (dPlayer < 2.5 && hungry) { s.mode = 'idle'; s.t = 4; }
          break;
        }
        case 'sleep': {
          p.speed *= 0.8;
          if (s.t < 0 || (dPlayer < 1.6 && hungry)) { p.sleeping = false; s.mode = 'idle'; s.t = 2; p.setPose('stand'); }
          break;
        }
        case 'toBowl': {
          if (!s.target) { s.mode = 'idle'; break; }
          p.setPose('stand');
          const tgt = s.target.clone().sub(new THREE.Vector3(Math.sin(s.yaw), 0, Math.cos(s.yaw)).multiplyScalar(p.radius * 0.9));
          const done = this.walkTo(p, s, s.target, 2.2, dt, p.radius + 0.15);
          void tgt;
          if (done || s.t < 0) { s.mode = 'eat'; s.t = 4; p.setPose('eat'); sfx.crunch(); p.wag = 0.9; s.yaw = Math.atan2(s.target.x - p.root.position.x, s.target.z - p.root.position.z); }
          break;
        }
        case 'eat': {
          p.speed *= 0.8;
          if (s.t < 0) {
            if (s.bowl) { this.fadeOut(s.bowl); s.bowl = null; }
            s.mode = 'happy'; s.t = 1.8; p.setPose('happy');
            this.ev.hearts(p.root.position.clone().setY(p.height + 0.2));
            p.cat ? sfx.meow() : sfx.bark();
          }
          break;
        }
        case 'happy': {
          p.speed *= 0.8; p.setPose('happy');
          if (s.t < 0) { s.mode = 'follow'; s.t = 10 + Math.random() * 6; p.setPose('stand'); }
          break;
        }
        case 'follow': {
          // peşinden koşar, sonra evine döner
          const behind = this.pos.clone().add(new THREE.Vector3(Math.sin(this.yaw + 2.5), 0, Math.cos(this.yaw + 2.5)).multiplyScalar(1.4));
          const d = p.root.position.distanceTo(this.pos);
          const sp = d > 4 ? 4.6 : 2.6;
          const done = this.walkTo(p, s, behind, sp, dt, 0.5);
          p.wag = 0.9;
          if (done && this.player.speed < 0.2) p.setPose('sit'); else p.setPose('stand');
          if (s.t < 0 || d > 20) { s.mode = 'wander'; s.target = this.pickWander(s.home, 3); s.t = 20; p.setPose('stand'); }
          break;
        }
      }
      p.root.rotation.y = s.yaw;
      p.update(dt);
    }
  }

  private pickWander(home: THREE.Vector3, r: number): THREE.Vector3 {
    for (let i = 0; i < 8; i++) {
      const a = Math.random() * Math.PI * 2, d = Math.random() * r;
      const p = home.clone().add(new THREE.Vector3(Math.cos(a) * d, 0, Math.sin(a) * d));
      if (!blocked(p.x, p.z, 0.4, this.world.colliders)) return p;
    }
    return home.clone();
  }

  private fadeOut(o: THREE.Object3D) {
    let k = 1;
    const step = () => { k -= 0.06; o.scale.setScalar(Math.max(0.01, k)); if (k > 0) requestAnimationFrame(step); else this.scene.remove(o); };
    setTimeout(step, 400);
  }

  private updateCompanions(dt: number) {
    const all = [this.companion, ...this.homePets].filter(Boolean) as Companion[];
    for (const c of all) {
      const p = c.pet; c.t -= dt; p.lookYaw = 0;
      if ((c.mode as string) === 'ride') { p.speed = 0; p.setPose('sit'); p.wag = 0.8; continue; }
      if (c.mode === 'home' && c.home) {
        if (c.t < 0) { c.t = 6 + Math.random() * 8; (c as any).target = this.pickWander(c.home, 2.5); p.sleeping = Math.random() < 0.4; p.setPose(p.sleeping ? 'lie' : 'stand'); }
        const tg = (c as any).target as THREE.Vector3 | undefined;
        if (tg && !p.sleeping) { if (this.walkTo(p, c, tg, 0.9, dt, 0.3)) p.setPose('sit'); } else p.speed *= 0.8;
      } else if (c.mode === 'follow' || c.mode === 'sit') {
        const behind = this.pos.clone().add(new THREE.Vector3(Math.sin(this.yaw + 2.4), 0, Math.cos(this.yaw + 2.4)).multiplyScalar(1.3));
        const d = p.root.position.distanceTo(this.pos);
        if (d > 25) { p.root.position.copy(behind); }
        const sp = d > 5 ? 5.4 : d > 2.2 ? 3.6 : 2.0;
        const done = this.walkTo(p, c, behind, sp, dt, 0.45);
        if (done && this.player.speed < 0.2) {
          p.setPose('sit');
          const want = Math.atan2(this.pos.x - p.root.position.x, this.pos.z - p.root.position.z);
          let dy = want - c.yaw; dy = Math.atan2(Math.sin(dy), Math.cos(dy)); c.yaw += dy * Math.min(1, dt * 3);
        } else p.setPose('stand');
        p.wag = 0.6;
      } else if (c.mode === 'fetch') {
        const b = this.balls.find(b => b.owner === c);
        if (!b) { c.mode = 'follow'; }
        else if (b.resting || b.mesh.position.y < 0.5) {
          p.setPose('stand');
          if (this.walkTo(p, c, b.mesh.position, 5.6, dt, p.radius * 0.8 + 0.1) || c.t < 0) {
            // ağza al
            p.mouth.add(b.mesh); b.mesh.position.set(0, 0, 0); b.mesh.scale.setScalar(1 / p.scaleK); c.ball = b.mesh; this.balls = this.balls.filter(x => x !== b);
            c.mode = 'return'; c.t = 10;
          }
        } else { p.setPose('stand'); this.walkTo(p, c, b.mesh.position.clone().setY(0), 4.2, dt, 0.3); }
        p.wag = 1;
      } else if (c.mode === 'return') {
        p.wag = 1;
        if (this.walkTo(p, c, this.pos, 4.5, dt, 1.2) || c.t < 0) {
          if (c.ball) { c.pet.mouth.remove(c.ball); c.ball = null; }
          c.mode = 'happy'; c.t = 1.6; p.setPose('happy'); sfx.coin();
          this.state.coins += 1; save(this.state); this.ev.changed();
          this.ev.hearts(p.root.position.clone().setY(p.height + 0.2));
          this.ev.reward(1, 0, p.root.position.clone().setY(1));
        }
      } else if (c.mode === 'happy') {
        p.speed *= 0.8; p.setPose('happy');
        if (c.t < 0) { c.mode = c.home && c !== this.companion ? 'home' : 'follow'; p.setPose('stand'); }
      }
      p.root.rotation.y = c.yaw;
      p.update(dt);
    }
  }

  private updateBalls(dt: number) {
    for (const b of this.balls) {
      if (b.resting) continue;
      b.vel.y -= 14 * dt;
      b.mesh.position.addScaledVector(b.vel, dt);
      const r = (b.mesh.geometry as THREE.SphereGeometry).parameters.radius;
      if (b.mesh.position.y < r) { b.mesh.position.y = r; b.vel.y *= -0.45; b.vel.x *= 0.7; b.vel.z *= 0.7; if (Math.abs(b.vel.y) < 0.6) { b.vel.set(0, 0, 0); b.resting = true; } }
      const before = b.mesh.position.clone();
      collide(b.mesh.position, r, this.world.colliders, this.world.bounds);
      if (!before.equals(b.mesh.position)) { b.vel.x *= -0.5; b.vel.z *= -0.5; }
      b.mesh.rotation.x += b.vel.length() * dt * 3;
    }
  }

  private updatePlacing() {
    const pl = this.placing; if (!pl) return;
    const p = this.pos.clone().add(new THREE.Vector3(Math.sin(this.yaw) * 2.4, 0, Math.cos(this.yaw) * 2.4));
    pl.ghost.position.copy(p); pl.ghost.rotation.y = pl.rot;
    const others = this.state.houses.filter(h => h.city === this.state.city).some(h => Math.hypot(h.x - p.x, h.z - p.z) < 1.6);
    pl.valid = !blocked(p.x, p.z, 0.75, this.world.colliders) && !others && onLand(p.x, p.z, this.world.lands);
    pl.ghost.traverse(o => { const m = (o as THREE.Mesh).material as THREE.MeshLambertMaterial; if (m && m.emissive) m.emissive.set(pl.valid ? '#1f5f2a' : '#7a1414'); });
  }

  // ---------- isim etiketleri ----------
  private updateLabels() {
    const w = innerWidth, h = innerHeight, tnow = now();
    const place = (el: HTMLElement, p: Pet, html: string, show: boolean) => {
      if (!show) { if (el.style.display !== 'none') el.style.display = 'none'; return; }
      const v = p.root.position.clone().setY(p.height + 0.35).project(this.camera);
      if (v.z > 1 || Math.abs(v.x) > 1.1 || Math.abs(v.y) > 1.1) { el.style.display = 'none'; return; }
      el.style.display = '';
      el.style.transform = `translate(${(v.x * 0.5 + 0.5) * w}px, ${(-v.y * 0.5 + 0.5) * h}px) translate(-50%, -100%)`;
      if (el.dataset.h !== html) { el.innerHTML = html; el.dataset.h = html; }
    };
    for (const s of this.strays) {
      const d = s.pet.root.position.distanceTo(this.pos);
      const hungry = s.hungryAt <= tnow, thirsty = s.thirstyAt <= tnow;
      const isFriend = (this.state.friends[s.id]?.fed ?? 0) > 0;
      const icons = (s.sick ? '<b class="sick">🤒</b>' : '') + (hungry ? '<i class="need food"></i>' : '') + (thirsty ? '<i class="need drop"></i>' : '') + (s.pet.sleeping ? '<b class="zz">z z</b>' : '');
      const near = s === this.near;
      const html = (d < 9 || near ? `<span>${isFriend ? '💛 ' : ''}${s.name}</span>` : '') + icons;
      place(s.label, s.pet, html, (d < 22 && (hungry || thirsty || s.pet.sleeping)) || d < 9 || (!!s.sick && !s.carried && d < 45));
      s.label.classList.toggle('near', near);
    }
    for (const c of [this.companion, ...this.homePets]) if (c) {
      const d = c.pet.root.position.distanceTo(this.pos);
      place(c.label, c.pet, `<span>🏠 ${this.petName(c)}</span>`, d < 12);
    }
  }

  screenOf(v: THREE.Vector3): { x: number; y: number } {
    const p = v.clone().project(this.camera);
    return { x: (p.x * 0.5 + 0.5) * innerWidth, y: (-p.y * 0.5 + 0.5) * innerHeight };
  }
}

function stripeTex(a: string, b: string) {
  const c = document.createElement('canvas'); c.width = 64; c.height = 32; const g = c.getContext('2d')!;
  for (let i = 0; i < 4; i++) { g.fillStyle = i % 2 ? b : a; g.fillRect(i * 16, 0, 16, 32); }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}
