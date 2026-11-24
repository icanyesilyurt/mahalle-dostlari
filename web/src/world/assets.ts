// Hazır 3B model paketleri (public/assets/*.glb, kaynaklar CREDITS.md'de).
// Her paketin kök düğümleri = asset adları. Yüklenince her asset tek bir (float) geometriye
// indirgenir; sahnede InstancedMesh ile çoğaltılır.
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { NIGHT } from '../game/daycycle';

export interface KitAsset { geo: THREE.BufferGeometry; mat: THREE.Material | THREE.Material[]; size: THREE.Vector3 }
export interface Kits {
  get(name: string): KitAsset;
  has(name: string): boolean;
  tex: Record<'yol' | 'meydan' | 'plaka' | 'kiremit', [THREE.Texture, THREE.Texture]>;
}

/** Kenney atlasındaki krem duvar kareleri (u>=.875, v>=.75) örnek-başı renkle boyanır; geri kalan (pencere, kapı, çerçeve) olduğu gibi. */
function wallTintMaterial(map: THREE.Texture, glass = false): THREE.MeshStandardMaterial {
  map.colorSpace = THREE.SRGBColorSpace;
  map.magFilter = THREE.LinearFilter; map.minFilter = THREE.LinearMipmapLinearFilter;
  const m = new THREE.MeshStandardMaterial({ map, roughness: 0.86, metalness: 0 });
  m.onBeforeCompile = s => {
    s.uniforms.uNight = NIGHT;
    s.vertexShader = 'varying vec3 vWPos;\n' + s.vertexShader.replace('#include <project_vertex>', '#include <project_vertex>\n  vWPos = (inverse(viewMatrix) * mvPosition).xyz;');
    s.fragmentShader = 'uniform float uNight;\nvarying vec3 vWPos;\n' + s.fragmentShader;
    // cam: atlasın mavi kareleri (u,v .5-.75) koyu lacivert-yeşil, parlak, kenara doğru gökyüzü yansıması
    s.fragmentShader = s.fragmentShader.replace('#include <color_fragment>', `
  float glassM = 0.0;
#if defined( USE_MAP ) && ${glass ? 1 : 0}
  glassM = step(0.5, vMapUv.x) * step(vMapUv.x, 0.75) * step(0.5, vMapUv.y) * step(vMapUv.y, 0.75);
  diffuseColor.rgb = mix(diffuseColor.rgb, mix(vec3(0.020, 0.045, 0.060), vec3(0.030, 0.070, 0.062), vMapUv.x * 4.0 - 2.0), glassM);
#endif
#if defined( USE_COLOR ) && defined( USE_MAP )
  float wallM = step(0.874, vMapUv.x) * step(0.749, vMapUv.y);
  diffuseColor.rgb *= mix(vec3(1.0), vColor, wallM);
#elif defined( USE_COLOR )
  diffuseColor.rgb *= vColor;
#endif`);
    s.fragmentShader = s.fragmentShader.replace('#include <roughnessmap_fragment>', '#include <roughnessmap_fragment>\n  roughnessFactor = mix(roughnessFactor, 0.18, glassM);')
      .replace('#include <opaque_fragment>', `#include <opaque_fragment>
  float fres = pow(1.0 - clamp(dot(normalize(vViewPosition), normal), 0.0, 1.0), 2.5);
  gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(0.50, 0.66, 0.78), glassM * (0.10 + 0.55 * fres) * (1.0 - uNight * 0.8));
  // gece: pencerelerin yaklaşık yarısında sıcak ışık yanar (konuma göre sabit)
  vec3 wc = floor(vWPos / vec3(1.7, 2.9, 1.7));
  float lit = step(0.45, fract(sin(dot(wc, vec3(12.9898, 78.233, 37.719))) * 43758.5453));
  gl_FragColor.rgb += glassM * lit * uNight * vec3(1.9, 1.25, 0.55);`);
  };
  m.customProgramCacheKey = () => 'walltint' + (glass ? 'g' : '');
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
  /** bake: çok malzemeli modelin renklerini köşe rengine gömüp tek ortak malzeme kullan (tek çizim çağrısı). */
  const take = (gltf: { scene: THREE.Group }, shared: THREE.Material | null, bake?: THREE.Material) => {
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
        if (bake) { const n = g.attributes.position.count, arr = new Float32Array(n * 3); for (let i = 0; i < n; i++) { arr[i * 3] = mt.color.r; arr[i * 3 + 1] = mt.color.g; arr[i * 3 + 2] = mt.color.b; } g.setAttribute('color', new THREE.BufferAttribute(arr, 3)); }
      });
      if (!geos.length) continue;
      const keys = Object.keys(geos[0].attributes).filter(k => geos.every(g => g.attributes[k]));
      for (const g of geos) for (const k of Object.keys(g.attributes)) if (!keys.includes(k)) g.deleteAttribute(k);
      const geo = mergeGeometries(geos, !shared && !bake)!;
      geo.computeBoundingBox();
      map.set(node.name, { geo, mat: bake ?? shared ?? mats, size: geo.boundingBox!.getSize(new THREE.Vector3()) });
    }
  };
  const firstMap = (g: { scene: THREE.Group }) => { let t: THREE.Texture | null = null; g.scene.traverse(o => { const m = (o as THREE.Mesh).material as THREE.MeshStandardMaterial; if (m?.map && !t) t = m.map; }); return t!; };
  take(mb, wallTintMaterial(firstMap(mb), true));
  take(ft, wallTintMaterial(firstMap(ft)));
  take(nk, null, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.85, metalness: 0 }));
  return {
    get: (n: string) => { const a = map.get(n); if (!a) throw new Error('asset yok: ' + n); return a; },
    has: (n: string) => map.has(n),
    tex: { yol, meydan, plaka, kiremit },
  };
}

/** WEBGL_multi_draw varsa aynı malzemeli parçalar karo başına tek çizim çağrısında (BatchedMesh). */
let MULTI = false;
export const setMultiDraw = (v: boolean) => { MULTI = v; };

/** Uzak/yakın karo: yakında ayrıntılı (detail), uzakta basit (lod) çizilir; ortak parçalar her zaman. */
export interface Tile { cx: number; cz: number; half: number; detail: THREE.Group; lod: THREE.Group; near: boolean }

/** Aynı asset'in kopyalarını karo başına tek InstancedMesh olarak toplar (frustum culling karo karo çalışır).
 *  add(name, m, renk, lod): lod verilmezse her mesafede aynı; lod = 'ad' ise uzakta o asset; lod = null ise yalnız yakında. */
export class Instancer {
  private lists = new Map<string, { name: string; tile: string; layer: 'a' | 'd' | 'l'; m: THREE.Matrix4[]; c: THREE.Color[] }>();
  constructor(private kits: Kits, public size = 96) {}
  private push(name: string, layer: 'a' | 'd' | 'l', m: THREE.Matrix4, c: THREE.Color) {
    const tx = Math.floor(m.elements[12] / this.size), tz = Math.floor(m.elements[14] / this.size), tile = tx + ',' + tz;
    const key = name + '|' + tile + '|' + layer;
    let l = this.lists.get(key); if (!l) this.lists.set(key, l = { name, tile, layer, m: [], c: [] });
    l.m.push(m); l.c.push(c);
  }
  add(name: string, m: THREE.Matrix4, color: THREE.ColorRepresentation = '#ffffff', lod?: string | null) {
    const c = new THREE.Color(color);
    if (lod === undefined) this.push(name, 'a', m, c);
    else { this.push(name, 'd', m, c); if (lod) this.push(lod, 'l', m, c); }
  }
  build(shadows: boolean): { group: THREE.Group; tiles: Tile[] } {
    const g = new THREE.Group(); const tiles = new Map<string, Tile>();
    const tileOf = (key: string) => {
      let t = tiles.get(key);
      if (!t) {
        const [tx, tz] = key.split(',').map(Number);
        t = { cx: (tx + 0.5) * this.size, cz: (tz + 0.5) * this.size, half: this.size / 2, detail: new THREE.Group(), lod: new THREE.Group(), near: true };
        t.lod.visible = false; g.add(t.detail, t.lod); tiles.set(key, t);
      }
      return t;
    };
    const parentOf = (l: { tile: string; layer: string }) => { const t = tileOf(l.tile); return l.layer === 'l' ? t.lod : l.layer === 'd' ? t.detail : g; };
    // ortak malzemeli (renk atlası) parçalar: karo+katman başına tek BatchedMesh
    const batched = new Map<string, typeof this.lists extends Map<any, infer V> ? V[] : never>();
    if (MULTI) for (const [k, l] of this.lists) {
      const a = this.kits.get(l.name); if (Array.isArray(a.mat)) continue;
      const bk = a.mat.uuid + '|' + l.tile + '|' + l.layer;
      let arr = batched.get(bk); if (!arr) batched.set(bk, arr = []); arr.push(l); this.lists.delete(k);
    }
    for (const arr of batched.values()) {
      const mat = this.kits.get(arr[0].name).mat as THREE.Material;
      let nInst = 0, nVert = 0, nIdx = 0;
      for (const l of arr) { const geo = this.kits.get(l.name).geo; nInst += l.m.length; nVert += geo.attributes.position.count; nIdx += geo.index ? geo.index.count : geo.attributes.position.count; }
      const bm = new THREE.BatchedMesh(nInst, nVert, nIdx, mat);
      bm.sortObjects = false;
      for (const l of arr) {
        const gid = bm.addGeometry(this.kits.get(l.name).geo);
        l.m.forEach((m, i) => { const id = bm.addInstance(gid); bm.setMatrixAt(id, m); bm.setColorAt(id, l.c[i]); });
      }
      bm.computeBoundingSphere(); bm.computeBoundingBox();
      bm.castShadow = shadows && arr[0].layer !== 'l'; bm.receiveShadow = true;
      parentOf(arr[0]).add(bm);
    }
    for (const l of this.lists.values()) {
      const a = this.kits.get(l.name);
      const im = new THREE.InstancedMesh(a.geo, a.mat, l.m.length);
      l.m.forEach((m, i) => { im.setMatrixAt(i, m); im.setColorAt(i, l.c[i]); });
      im.instanceMatrix.needsUpdate = true; if (im.instanceColor) im.instanceColor.needsUpdate = true;
      im.computeBoundingSphere(); im.computeBoundingBox();
      im.castShadow = shadows && l.layer !== 'l'; im.receiveShadow = true; im.name = l.name;
      parentOf(l).add(im);
    }
    return { group: g, tiles: [...tiles.values()] };
  }
}

/** Kenney krem duvar rengine göre örnek rengi: istenen renk / krem (lineer). */
const CREAM = new THREE.Color('#fde4c7');
export function wallTint(hex: string): THREE.Color {
  const c = new THREE.Color(hex);
  return new THREE.Color(c.r / CREAM.r, c.g / CREAM.g, c.b / CREAM.b);
}
