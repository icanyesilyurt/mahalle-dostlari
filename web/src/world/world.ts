// Şehir-bağımsız dünya arayüzü + ortak malzemeler + çarpışma.
import * as THREE from 'three';
import { TEX } from './kit';
import { buildIstanbul } from './istanbul';

export interface Rect { x: number; z: number; hw: number; hd: number }
export interface StraySpawn { id: string; name: string; breed: string; x: number; z: number }
export interface NpcSpawn { x: number; z: number; rot: number; shirt: string; hat: string | null; role: string; sit?: boolean }

export interface WorldData {
  root: THREE.Group;
  colliders: Rect[];
  laundry: THREE.Object3D[];
  sea: THREE.Texture;
  boat: THREE.Object3D;
  bounds: { x0: number; x1: number; z0: number; z1: number };
  spawn: THREE.Vector3;
  fountain: THREE.Vector3;
  strays: StraySpawn[];
  npcs: NpcSpawn[];
  open: Rect[];
  lots: Rect[];
}

/** Şehir kurucuları: yeni şehir = buraya bir satır. */
export const CITY_BUILDERS: Record<string, (m: Record<string, THREE.Material>, lowEnd: boolean) => WorldData> = {
  istanbul: buildIstanbul,
};

export function makeMaterials(): Record<string, THREE.Material> {
  const plaster = TEX.plaster(), wood = TEX.wood(), roof = TEX.roof();
  return {
    plaster: new THREE.MeshLambertMaterial({ vertexColors: true, map: plaster }),
    plain: new THREE.MeshLambertMaterial({ vertexColors: true }),
    wood: new THREE.MeshLambertMaterial({ vertexColors: true, map: wood }),
    roof: new THREE.MeshLambertMaterial({ vertexColors: true, map: roof }),
    glass: new THREE.MeshPhongMaterial({ vertexColors: true, shininess: 90, specular: new THREE.Color('#9fb8c8') }),
    leaf: new THREE.MeshLambertMaterial({ vertexColors: true }),
    glow: new THREE.MeshBasicMaterial({ vertexColors: true }),
    water: new THREE.MeshPhongMaterial({ vertexColors: true, shininess: 100 }),
    far: new THREE.MeshLambertMaterial({ vertexColors: true }),
  };
}

/** Daire-dikdörtgen itme: karakter ve hayvanlar binaların içinden geçmez. */
export function collide(p: THREE.Vector3, radius: number, rects: Rect[], bounds: WorldData['bounds']) {
  for (const r of rects) {
    const dx = p.x - r.x, dz = p.z - r.z;
    const ox = r.hw + radius - Math.abs(dx), oz = r.hd + radius - Math.abs(dz);
    if (ox > 0 && oz > 0) {
      if (ox < oz) p.x += Math.sign(dx || 1) * ox; else p.z += Math.sign(dz || 1) * oz;
    }
  }
  p.x = Math.min(bounds.x1, Math.max(bounds.x0, p.x));
  p.z = Math.min(bounds.z1, Math.max(bounds.z0, p.z));
}

export function blocked(x: number, z: number, radius: number, rects: Rect[]): boolean {
  return rects.some(r => Math.abs(x - r.x) < r.hw + radius && Math.abs(z - r.z) < r.hd + radius);
}
