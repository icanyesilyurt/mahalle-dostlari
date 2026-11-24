// Pet kartları için küçük 3B önizleme resimleri (bir kez çizilir, önbelleğe alınır).
import * as THREE from 'three';
import { Pet } from '../actors/pet';
import { Breed, BreedLook, breedById } from '../core/catalog';

let r: THREE.WebGLRenderer | null = null;
const cache = new Map<string, string>();

/** Görünüm verisinden (sokak hayvanı / barınak dostu) önizleme. */
export function petThumbLook(look: any, gear: { wear?: string; collar?: string } = {}): string {
  const b: Breed = { id: 'look', species: look?.species ?? 'cat', name: '', price: {}, look: { size: 1, belly: '#f4efe6', ...look } as BreedLook };
  return petThumb('', gear, b);
}

export function petThumb(breedId: string, gear: { wear?: string; collar?: string } = {}, given?: Breed): string {
  const key = given ? `L${JSON.stringify(given.look)}|${gear.wear ?? ''}|${gear.collar ?? ''}` : `${breedId}|${gear.wear ?? ''}|${gear.collar ?? ''}`;
  if (cache.has(key)) return cache.get(key)!;
  const b = given ?? breedById(breedId); if (!b) return '';
  if (!r) {
    const c = document.createElement('canvas'); c.width = c.height = 192;
    r = new THREE.WebGLRenderer({ canvas: c, alpha: true, antialias: true, preserveDrawingBuffer: true });
    r.toneMapping = THREE.ACESFilmicToneMapping; r.toneMappingExposure = 1.15;
  }
  const scene = new THREE.Scene();
  scene.add(new THREE.HemisphereLight('#fff4e0', '#a08a70', 1.8));
  const d = new THREE.DirectionalLight('#fff0d0', 2.2); d.position.set(2, 3, 3); scene.add(d);
  const pet = new Pet(b, 7, gear);
  pet.setPose('sit'); for (let i = 0; i < 40; i++) pet.update(0.05);
  pet.root.rotation.y = 0.6;
  scene.add(pet.root);
  const h = pet.height;
  const cam = new THREE.PerspectiveCamera(30, 1, 0.05, 20);
  cam.position.set(0, h * 0.8, h * 3.3); cam.lookAt(0, h * 0.48, 0);
  r.render(scene, cam);
  const url = r.domElement.toDataURL('image/png');
  cache.set(key, url);
  scene.traverse(o => { const m = o as THREE.Mesh; if (m.isMesh) { m.geometry.dispose(); } });
  return url;
}
