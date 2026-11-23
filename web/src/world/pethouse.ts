// Kedi evi ve köpek kulübesi modelleri (isim tabelası + seçilen renk).
import * as THREE from 'three';
import { TEX } from './kit';

const lam = (c: string) => new THREE.MeshLambertMaterial({ color: c });

export const HOUSE_COLORS = ['#e07a5f', '#f2c94c', '#7a9e7e', '#4f86c6', '#e98aa0', '#9a5ac8', '#f4efe6', '#8a5a3a'];

export function petHouse(item: string, color: string, name: string): THREE.Group {
  const g = new THREE.Group();
  const roofC = new THREE.Color(color).offsetHSL(0, -0.05, -0.18).getStyle();
  const dark = lam('#2b211c');
  if (item === 'kedi_evi') {
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.7, 0.8), lam(color)); body.position.y = 0.38; g.add(body);
    const door = new THREE.Mesh(new THREE.CircleGeometry(0.17, 20), dark); door.position.set(0, 0.29, 0.401); g.add(door);
    const rim = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.03, 6, 20), lam('#f4efe6')); rim.position.set(0, 0.29, 0.405); g.add(rim);
    const roof = new THREE.Mesh(new THREE.ConeGeometry(0.75, 0.5, 4), lam(roofC)); roof.rotation.y = Math.PI / 4; roof.position.y = 0.98; roof.scale.set(1, 1, 0.92); g.add(roof);
    const cushion = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.08, 14), lam('#f2a7b8')); cushion.position.set(0, 0.06, 0.62); g.add(cushion);
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.9, 10), lam('#d8c39a')); post.position.set(0.62, 0.45, 0.1); g.add(post);
    const plat = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.06, 14), lam(color)); plat.position.set(0.62, 0.92, 0.1); g.add(plat);
  } else {
    const body = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.85, 1.2), lam(color)); body.position.y = 0.45; g.add(body);
    const door = new THREE.Mesh(new THREE.CircleGeometry(0.28, 20, 0, Math.PI), dark); door.position.set(0, 0.5, 0.601); g.add(door);
    const doorB = new THREE.Mesh(new THREE.PlaneGeometry(0.56, 0.38), dark); doorB.position.set(0, 0.31, 0.601); g.add(doorB);
    const shape = new THREE.Shape(); shape.moveTo(-0.7, 0); shape.lineTo(0, 0.55); shape.lineTo(0.7, 0); shape.lineTo(-0.7, 0);
    const roof = new THREE.Mesh(new THREE.ExtrudeGeometry(shape, { depth: 1.4, bevelEnabled: false }), lam(roofC)); roof.position.set(0, 0.86, -0.7); g.add(roof);
    const bowl = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.12, 0.08, 14), lam('#3b8ed6')); bowl.position.set(0.5, 0.05, 0.85); g.add(bowl);
    const bone = new THREE.Mesh(new THREE.CapsuleGeometry(0.04, 0.2, 3, 6), lam('#f4efe6')); bone.rotation.z = Math.PI / 2; bone.position.set(-0.45, 0.05, 0.85); g.add(bone);
  }
  // isim tabelası
  const sign = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 0.2), new THREE.MeshBasicMaterial({ map: TEX.sign(name.slice(0, 14), '#6b4630'), toneMapped: false }));
  sign.position.set(0, item === 'kedi_evi' ? 0.6 : 1.02, item === 'kedi_evi' ? 0.41 : 0.715); g.add(sign);
  g.traverse(o => { if ((o as THREE.Mesh).isMesh) { o.castShadow = true; o.receiveShadow = true; } });
  return g;
}
