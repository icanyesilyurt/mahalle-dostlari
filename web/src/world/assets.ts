// Hazır 3B model paketleri (public/assets/*.glb, kaynaklar CREDITS.md'de).
// Her paketin kök düğümleri = asset adları. Yüklenince her asset tek bir (float) geometriye
// indirgenir; sahnede InstancedMesh ile çoğaltılır.
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

export interface KitAsset { geo: THREE.BufferGeometry; mat: THREE.Material | THREE.Material[]; size: THREE.Vector3 }
export interface Kits {
  get(name: string): KitAsset;
  has(name: string): boolean;
  tex: Record<'yol' | 'meydan' | 'plaka' | 'kiremit', [THREE.Texture, THREE.Texture]>;
}

/** Kenney atlasındaki krem duvar kareleri (u>=.875, v>=.75) örnek-başı renkle boyanır; geri kalan (pencere, kapı, çerçeve) olduğu gibi. */
function wallTintMaterial(map: THREE.Texture): THREE.MeshStandardMaterial {
  map.colorSpace = THREE.SRGBColorSpace;
  map.magFilter = THREE.LinearFilter; map.minFilter = THREE.LinearMipmapLinearFilter;
  const m = new THREE.MeshStandardMaterial({ map, roughness: 0.86, metalness: 0 });
  m.onBeforeCompile = s => {
    s.fragmentShader = s.fragmentShader.replace('#include <color_fragment>', `
#if defined( USE_COLOR ) && defined( USE_MAP )
  float wallM = step(0.874, vMapUv.x) * step(0.749, vMapUv.y);
  diffuseColor.rgb *= mix(vec3(1.0), vColor, wallM);
#elif defined( USE_COLOR )
  diffuseColor.rgb *= vColor;
#endif`);
  };
  m.customProgramCacheKey = () => 'walltint';
  return m;
}

function toFloat(g: THREE.BufferGeometry): THREE.BufferGeometry {
  const out = new THREE.BufferGeometry();
  for (const [k, a] of Object.entries(g.attributes) as [string, THREE.BufferAttribute][]) {
    const n = a.count, s = a.itemSize, arr = new Float32Array(n * s);
    for (let i = 0; i < n; i++) for (let j = 0; j < s; j++) arr[i * s + j] = a.getComponent(i, j);
    out.setAttribute(k, new THREE.BufferAttribute(arr, s));
  }
  if (g.index) out.setIndex(Array.from(g.index.array as ArrayLike<number>));
  return out;
}

const LEAF = new THREE.Color('#6fae4f'), LEAF2 = new THREE.Color('#5f9e46');

export async function loadKits(base = './assets/'): Promise<Kits> {
  const loader = new GLTFLoader(); loader.setMeshoptDecoder(MeshoptDecoder);
  const tl = new THREE.TextureLoader();
  const loadTex = (n: string, srgb: boolean) => tl.loadAsync(`${base}tex/${n}.webp`).then(t => {
    t.wrapS = t.wrapT = THREE.RepeatWrapping; t.anisotropy = 4; if (srgb) t.colorSpace = THREE.SRGBColorSpace; return t;
  });
  const pair = (n: string) => Promise.all([loadTex(n + '_c', true), loadTex(n + '_n', false)]) as Promise<[THREE.Texture, THREE.Texture]>;
  const [mb, ft, nk, yol, meydan, plaka, kiremit] = await Promise.all([
    loader.loadAsync(base + 'mb.glb'), loader.loadAsync(base + 'ft.glb'), loader.loadAsync(base + 'nk.glb'),
    pair('yol_s'), pair('meydan_s'), pair('plaka_s'), pair('kiremit'),
  ]);
  const map = new Map<string, KitAsset>();
  const take = (gltf: { scene: THREE.Group }, shared: THREE.Material | null) => {
    gltf.scene.updateMatrixWorld(true);
    for (const node of gltf.scene.children) {
      const geos: THREE.BufferGeometry[] = []; const mats: THREE.Material[] = [];
      node.traverse(o => {
        const m = o as THREE.Mesh; if (!m.isMesh) return;
        const g = toFloat(m.geometry); g.applyMatrix4(m.matrixWorld);
        geos.push(g);
        let mt = m.material as THREE.MeshStandardMaterial;
        if (!shared) {
          mt = mt.clone(); mt.roughness = 0.85; mt.metalness = 0;
          if (/leaf/i.test(mt.name)) mt.color.copy(mats.length % 2 ? LEAF2 : LEAF);
          if (/grass|plant/i.test(mt.name)) mt.color.set('#5f9e46');
        }
        mats.push(shared ?? mt);
      });
      if (!geos.length) continue;
      const keys = Object.keys(geos[0].attributes).filter(k => geos.every(g => g.attributes[k]));
      for (const g of geos) for (const k of Object.keys(g.attributes)) if (!keys.includes(k)) g.deleteAttribute(k);
      const geo = mergeGeometries(geos, !shared)!;
      geo.computeBoundingBox();
      map.set(node.name, { geo, mat: shared ?? mats, size: geo.boundingBox!.getSize(new THREE.Vector3()) });
    }
  };
  const firstMap = (g: { scene: THREE.Group }) => { let t: THREE.Texture | null = null; g.scene.traverse(o => { const m = (o as THREE.Mesh).material as THREE.MeshStandardMaterial; if (m?.map && !t) t = m.map; }); return t!; };
  take(mb, wallTintMaterial(firstMap(mb)));
  take(ft, wallTintMaterial(firstMap(ft)));
  take(nk, null);
  return {
    get: (n: string) => { const a = map.get(n); if (!a) throw new Error('asset yok: ' + n); return a; },
    has: (n: string) => map.has(n),
    tex: { yol, meydan, plaka, kiremit },
  };
}

/** Aynı asset'in tüm kopyalarını tek InstancedMesh olarak toplar. */
export class Instancer {
  private lists = new Map<string, { m: THREE.Matrix4[]; c: THREE.Color[] }>();
  constructor(private kits: Kits) {}
  add(name: string, m: THREE.Matrix4, color: THREE.ColorRepresentation = '#ffffff') {
    let l = this.lists.get(name); if (!l) this.lists.set(name, l = { m: [], c: [] });
    l.m.push(m); l.c.push(new THREE.Color(color));
  }
  build(shadows: boolean): THREE.Group {
    const g = new THREE.Group();
    for (const [name, l] of this.lists) {
      const a = this.kits.get(name);
      const im = new THREE.InstancedMesh(a.geo, a.mat, l.m.length);
      l.m.forEach((m, i) => { im.setMatrixAt(i, m); im.setColorAt(i, l.c[i]); });
      im.instanceMatrix.needsUpdate = true; if (im.instanceColor) im.instanceColor.needsUpdate = true;
      im.computeBoundingSphere();
      im.castShadow = shadows; im.receiveShadow = true; im.name = name;
      g.add(im);
    }
    return g;
  }
}

/** Kenney krem duvar rengine göre örnek rengi: istenen renk / krem (lineer). */
const CREAM = new THREE.Color('#fde4c7');
export function wallTint(hex: string): THREE.Color {
  const c = new THREE.Color(hex);
  return new THREE.Color(c.r / CREAM.r, c.g / CREAM.g, c.b / CREAM.b);
}
