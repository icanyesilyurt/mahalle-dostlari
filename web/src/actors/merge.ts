// Çizim çağrısı tasarrufu: bir modelin her grubundaki aynı malzemeli parçaları tek mesh'e birleştirir.
// Grup hiyerarşisi (eklemler, göz kapakları, kuyruk zinciri) korunur; yalnız aynı gruptaki sabit parçalar birleşir.
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

export function mergeStatic(root: THREE.Object3D) {
  const groups: THREE.Object3D[] = [];
  root.traverse(o => { if (o === root || (o as THREE.Group).isGroup) groups.push(o); });
  for (const g of groups) {
    const byMat = new Map<THREE.Material, THREE.Mesh[]>();
    for (const c of g.children) {
      const m = c as THREE.Mesh;
      if (!m.isMesh || m.children.length || (m as any).isInstancedMesh || m.userData.noMerge || Array.isArray(m.material) || !m.visible) continue;
      let l = byMat.get(m.material as THREE.Material); if (!l) byMat.set(m.material as THREE.Material, l = []); l.push(m);
    }
    for (const [mat, list] of byMat) {
      if (list.length < 2) continue;
      const geos = list.map(m => { m.updateMatrix(); const x = (m.geometry.index ? m.geometry.toNonIndexed() : m.geometry.clone()).applyMatrix4(m.matrix); return x; });
      const keys = Object.keys(geos[0].attributes).filter(k => geos.every(x => x.attributes[k]));
      for (const x of geos) for (const k of Object.keys(x.attributes)) if (!keys.includes(k)) x.deleteAttribute(k);
      const merged = mergeGeometries(geos, false); if (!merged) continue;
      const mesh = new THREE.Mesh(merged, mat);
      mesh.castShadow = list.some(m => m.castShadow); mesh.receiveShadow = list.some(m => m.receiveShadow);
      for (const m of list) g.remove(m);
      g.add(mesh);
    }
  }
}
