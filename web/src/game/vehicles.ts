// Araçlar: bisiklet (ücretsiz, sepette 1 küçük hayvan), scooter (hızlı, 1 hayvan), pikap (en hızlı, kasada 3 hayvan).
// Model: hazır parça (mb paketi), boyalı yüzeyler seçilen renge boyanır; tekerlekler döner; aksesuarlar takılır.
import * as THREE from 'three';
import type { Kits } from '../world/assets';
import { wallTint } from '../world/assets';

export interface VehicleDef {
  id: string; name: string; body: string;
  speed: number; turn: number; radius: number; cap: number; smallOnly: boolean;
  wheels: { a: string; p: [number, number, number] }[];
  seat: [number, number, number] | null;      // sürücü kalça noktası (null = kabinde, görünmez)
  slots: [number, number, number][];          // taşınan hayvan yerleri
  acc: Record<string, [number, number, number]>;
  camExtra: number;                            // kamera uzaklığı eki
  defColor: string;
}

export const VEHICLE_DEFS: Record<string, VehicleDef> = {
  bisiklet: {
    id: 'bisiklet', name: 'Bisiklet', body: 'bisiklet', speed: 7.5, turn: 3.4, radius: 0.45, cap: 1, smallOnly: true,
    wheels: [{ a: 'teker_ince', p: [0, 0.33, 0.62] }, { a: 'teker_ince', p: [0, 0.33, -0.62] }],
    seat: [0, 0.5, -0.16], slots: [[0, 0.76, 0.78]], camExtra: 0.4, defColor: '#2f7d6d',
    acc: { aks_bayrak: [0.04, 0.66, -0.78], aks_cicek: [0, 0.69, -0.62], aks_zil: [0.2, 0.99, 0.46] },
  },
  scooter: {
    id: 'scooter', name: 'Scooter', body: 'scooter', speed: 10.5, turn: 3.0, radius: 0.55, cap: 1, smallOnly: false,
    wheels: [{ a: 'teker_orta', p: [0, 0.24, 0.62] }, { a: 'teker_orta', p: [0, 0.24, -0.45] }],
    seat: [0, 0.44, -0.3], slots: [[0, 0.82, -0.82]], camExtra: 0.6, defColor: '#8fd0c8',
    acc: { aks_bayrak: [0.18, 0.82, -1.02], aks_cicek: [0, 0.62, 0.6], aks_zil: [0.26, 1.15, 0.56] },
  },
  pikap: {
    id: 'pikap', name: 'Pikap', body: 'pikap', speed: 14, turn: 2.2, radius: 1.25, cap: 3, smallOnly: false,
    wheels: [{ a: 'teker_kalin', p: [0.86, 0.36, 1.35] }, { a: 'teker_kalin', p: [-0.86, 0.36, 1.35] }, { a: 'teker_kalin', p: [0.86, 0.36, -1.6] }, { a: 'teker_kalin', p: [-0.86, 0.36, -1.6] }],
    seat: null, slots: [[-0.42, 0.66, -1.1], [0.42, 0.66, -1.1], [0, 0.66, -1.95]], camExtra: 2.4, defColor: '#c8423a',
    acc: { aks_bayrak: [0.82, 1.05, -2.5], aks_cicek: [0, 1.06, -0.66], aks_zil: [0.6, 1.86, -0.1] },
  },
};

export class Vehicle {
  root = new THREE.Group();
  private body: THREE.InstancedMesh;
  private wheels: THREE.Mesh[] = [];
  private accSlot = new THREE.Group();
  speed = 0;
  yaw = 0;
  private roll = 0;
  constructor(public def: VehicleDef, private kits: Kits, color: string, acc: string[]) {
    const a = kits.get(def.body);
    this.body = new THREE.InstancedMesh(a.geo, a.mat, 1);
    this.body.setMatrixAt(0, new THREE.Matrix4()); this.body.castShadow = true; this.body.receiveShadow = true;
    this.root.add(this.body);
    for (const w of def.wheels) {
      const wa = kits.get(w.a); const m = new THREE.Mesh(wa.geo, wa.mat as THREE.Material);
      m.position.set(...w.p); m.castShadow = true; this.root.add(m); this.wheels.push(m);
    }
    this.root.add(this.accSlot);
    this.setColor(color); this.setAcc(acc);
  }
  setColor(hex: string) { this.body.setColorAt(0, wallTint(hex)); if (this.body.instanceColor) this.body.instanceColor.needsUpdate = true; }
  setAcc(list: string[]) {
    this.accSlot.clear();
    for (const id of list) {
      const p = this.def.acc[id]; if (!p || !this.kits.has(id)) continue;
      const a = this.kits.get(id); const m = new THREE.Mesh(a.geo, a.mat as THREE.Material); m.position.set(...p); this.accSlot.add(m);
    }
  }
  /** Tekerlek dönüşü + virajda hafif yatma. */
  animate(dt: number, turnRate: number) {
    for (const w of this.wheels) w.rotation.x += this.speed * dt / 0.33;
    const want = this.def.cap === 3 ? 0 : THREE.MathUtils.clamp(-turnRate * this.speed * 0.04, -0.3, 0.3);
    this.roll += (want - this.roll) * Math.min(1, dt * 6);
    this.body.rotation.z = this.roll; this.accSlot.rotation.z = this.roll;
  }
  slotWorld(i: number): THREE.Vector3 { return new THREE.Vector3(...this.def.slots[i]).applyMatrix4(this.root.matrixWorld); }
}
