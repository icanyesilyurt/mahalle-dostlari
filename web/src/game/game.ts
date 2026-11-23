// Oyun döngüsü: sahne, ışık, kamera, oyuncu, sokak hayvanları, sahiplenilen dost, kulübeler, etkileşimler.
import * as THREE from 'three';
import { Human } from '../actors/human';
import { Pet } from '../actors/pet';
import { Breed, BreedLook, breedById, itemById } from '../core/catalog';
import { GameState, feedStray, petStray, refillWater, waterStray, save } from '../core/state';
import { TEX, rng } from '../world/kit';
import { petHouse } from '../world/pethouse';
import { CITY_BUILDERS, WorldData, blocked, collide, makeMaterials, onLand } from '../world/world';
import { haptic, sfx } from '../ui/sfx';
import { Input } from './input';

type StrayMode = 'wander' | 'idle' | 'toBowl' | 'eat' | 'happy' | 'follow' | 'sleep' | 'greet';
export interface Stray {
  id: string; name: string; pet: Pet; home: THREE.Vector3;
  mode: StrayMode; t: number; target: THREE.Vector3 | null; yaw: number;
  hungryAt: number; thirstyAt: number; bowl: THREE.Object3D | null; label: HTMLElement; vocalT: number;
}
interface Companion { uid: string; pet: Pet; yaw: number; mode: 'follow' | 'fetch' | 'return' | 'sit' | 'eat' | 'happy' | 'home'; t: number; ball: THREE.Object3D | null; label: HTMLElement; home?: THREE.Vector3 }
interface Ball { mesh: THREE.Mesh; vel: THREE.Vector3; resting: boolean; owner: Companion }

export interface GameEvents {
  reward(coins: number, gems: number, at: THREE.Vector3): void;
  toast(msg: string): void;
  changed(): void;
  hearts(at: THREE.Vector3): void;
  nearChanged(): void;
}

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
  private manualT = 0;
  private camTarget = new THREE.Vector3();
  private sky!: THREE.Mesh;
  strays: Stray[] = [];
  companion: Companion | null = null;
  homePets: Companion[] = [];
  near: Stray | null = null;
  nearCompanion: Companion | null = null;
  nearFountain = false;
  private houseObjs = new Map<string, THREE.Object3D>();
  private npcs: Human[] = [];
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
    this.loadCity(state.city);
    addEventListener('resize', () => this.resize());
    this.resize();
  }

  // ---------- kurulum ----------
  private setupScene() {
    const s = this.scene;
    const FOG = '#f3dcc4';
    s.background = new THREE.Color(FOG);
    s.fog = new THREE.Fog(FOG, 70, 260);
    this.sky = new THREE.Mesh(new THREE.SphereGeometry(300, 32, 16), new THREE.ShaderMaterial({
      side: THREE.BackSide, depthWrite: false, fog: false,
      uniforms: { top: { value: new THREE.Color('#6fa8dc') }, mid: { value: new THREE.Color('#b9d7ec') }, hor: { value: new THREE.Color(FOG) } },
      vertexShader: 'varying vec3 vP; void main(){ vP = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
      fragmentShader: 'uniform vec3 top; uniform vec3 mid; uniform vec3 hor; varying vec3 vP; void main(){ float h = normalize(vP).y; vec3 c = h < 0.0 ? hor : mix(hor, mid, smoothstep(0.0, 0.18, h)); c = mix(c, top, smoothstep(0.18, 0.75, h)); gl_FragColor = vec4(c, 1.0); }',
    }));
    this.sky.renderOrder = -1; this.sky.frustumCulled = false; s.add(this.sky);
    s.add(new THREE.HemisphereLight('#fff0d8', '#9d8a74', 1.35));
    const sun = new THREE.DirectionalLight('#ffe0b0', 2.6);
    sun.castShadow = true;
    const sz = this.lowEnd ? 1024 : 2048;
    sun.shadow.mapSize.set(sz, sz);
    const c = sun.shadow.camera as THREE.OrthographicCamera;
    c.left = -42; c.right = 42; c.top = 42; c.bottom = -42; c.near = 1; c.far = 160;
    sun.shadow.bias = -0.0006; sun.shadow.normalBias = 0.03; sun.shadow.radius = 3;
    s.add(sun, sun.target);
    this.sun = sun;
    const fill = new THREE.DirectionalLight('#bcd6ff', 0.45); fill.position.set(30, 20, -40); s.add(fill);

    this.marker = new THREE.Mesh(new THREE.RingGeometry(0.25, 0.36, 24), new THREE.MeshBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0.8, depthWrite: false }));
    this.marker.rotation.x = -Math.PI / 2; this.marker.visible = false; s.add(this.marker);
    this.ring = new THREE.Mesh(new THREE.RingGeometry(0.55, 0.68, 32), new THREE.MeshBasicMaterial({ color: '#ffd36b', transparent: true, opacity: 0.85, depthWrite: false }));
    this.ring.rotation.x = -Math.PI / 2; this.ring.visible = false; s.add(this.ring);
  }

  loadCity(id: string) {
    const mats = makeMaterials();
    this.world = CITY_BUILDERS[id](mats, this.lowEnd);
    this.scene.add(this.world.root);
    this.pos.copy(this.world.spawn); this.yaw = this.world.spawnYaw; this.camYaw = this.yaw;
    this.player = new Human(this.state.look);
    this.scene.add(this.player.root);
    this.makeGulls();
    // NPC'ler
    for (const n of this.world.npcs) {
      const h = new Human({ outfit: 'tisort_mercan', hat: n.hat, skin: '#e0b090', hair: '#3a3030', pants: '#4a4a4a', shirt: n.shirt });
      h.root.position.set(n.x, 0, n.z); h.root.rotation.y = n.rot; h.sitting = !!n.sit;
      this.scene.add(h.root); this.npcs.push(h);
    }
    // sokak hayvanları
    const R = rng(99);
    for (const sp of this.world.strays) {
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
    }
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
    if (this.player.busy) return;
    const s = this.near, c = this.nearCompanion;
    const target = s?.pet ?? c?.pet;
    if (!target) { this.ev.toast('Sevmek için bir dostun yanına git'); return; }
    this.faceTo(target.root.position);
    haptic(8);
    this.player.act('pet', 1.8, () => {
      target.cat ? sfx.purr() : sfx.bark();
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
    this.camera.aspect = w / h;
    this.camera.fov = w < h ? 68 : 57;
    this.camera.near = 0.3; this.camera.far = 320;
    this.camera.updateProjectionMatrix();
  }

  start() {
    const loop = () => {
      requestAnimationFrame(loop);
      const dt = Math.min(0.05, this.clock.getDelta());
      if (!this.paused) this.update(dt);
      this.renderer.render(this.scene, this.camera);
    };
    loop();
  }

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
      const fwd = new THREE.Vector3(Math.sin(this.camYaw), 0, Math.cos(this.camYaw));
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
    if (speed > 0) {
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
    this.player.root.position.copy(this.pos);
    let ry = this.yaw - this.player.root.rotation.y; ry = Math.atan2(Math.sin(ry), Math.cos(ry));
    this.player.root.rotation.y += ry * Math.min(1, dt * 14);
    this.player.update(dt);
    for (const n of this.npcs) n.update(dt);
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
    if (this.player.speed > 0.6 && this.manualT <= 0) {
      let dy = this.yaw - this.camYaw; dy = Math.atan2(Math.sin(dy), Math.cos(dy));
      this.camYaw += dy * Math.min(1, dt * 2.4);
    }
    this.camTarget.lerp(this.pos, Math.min(1, dt * 10));
    const fwd = new THREE.Vector3(Math.sin(this.camYaw), 0, Math.cos(this.camYaw));
    const pivot = this.camTarget.clone().add(new THREE.Vector3(0, 1.5, 0));
    // yay kolu: araya bina girerse kamera karaktere yaklaşır, duvardan geçmez
    const want = this.camDist;
    const free = this.armFree(pivot, fwd.clone().negate(), want + 0.4) - 0.4;
    const armT = Math.max(1.0, Math.min(want, free));
    this.armDist += (armT - this.armDist) * Math.min(1, dt * (armT < this.armDist ? 18 : 3));
    const cp = Math.cos(this.camPitch), spch = Math.sin(this.camPitch);
    const lift = Math.max(0, 2.4 - this.armDist) * 0.7; // çok yaklaşınca kafanın üstünden baksın
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
    const nf = this.world.fountains.some(f => f.distanceTo(this.pos) < 3.2);
    const changed = best !== this.near || bc !== this.nearCompanion || nf !== this.nearFountain;
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
            p.mouth.add(b.mesh); b.mesh.position.set(0, 0, 0); c.ball = b.mesh; this.balls = this.balls.filter(x => x !== b);
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
      const icons = (hungry ? '<i class="need food"></i>' : '') + (thirsty ? '<i class="need drop"></i>' : '') + (s.pet.sleeping ? '<b class="zz">z z</b>' : '');
      const near = s === this.near;
      const html = (d < 9 || near ? `<span>${isFriend ? '💛 ' : ''}${s.name}</span>` : '') + icons;
      place(s.label, s.pet, html, (d < 22 && (hungry || thirsty || s.pet.sleeping)) || d < 9);
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
