// Gerçek saate bağlı gün döngüsü: telefonun yerel saatine göre güneş/ay yönü, ışık ve gökyüzü renkleri.
// Gün doğumu pembe-turuncu, gündüz, gün batımı altın-turuncu (uzun gölgeler), gece lacivert + ay + yıldızlar.
// Gece fenerler ve ev pencereleri yanar (NIGHT uniform'u cam shader'ında ve fener ışıltısında kullanılır).
// Test için adres çubuğuna ?saat=19.5 yazılabilir.
import * as THREE from 'three';

export const NIGHT = { value: 0 };   // 0 gündüz .. 1 tam gece (malzemeler paylaşır)

interface Key { h: number; top: string; mid: string; hor: string; fog: string; sun: string; sunI: number; hemiS: string; hemiG: string; hemiI: number; fillI: number; exp: number; night: number }
const KEYS: Key[] = [
  { h: 0, top: '#070d24', mid: '#13204a', hor: '#24345e', fog: '#1f2b4c', sun: '#9fb4ff', sunI: 0.6, hemiS: '#6a7ab4', hemiG: '#2a2636', hemiI: 0.9, fillI: 0.2, exp: 1.18, night: 1 },
  { h: 5.0, top: '#0c1638', mid: '#24305e', hor: '#4a4a78', fog: '#3a3e64', sun: '#a8b8ff', sunI: 0.55, hemiS: '#7a84b8', hemiG: '#2a2636', hemiI: 0.9, fillI: 0.2, exp: 1.15, night: 0.9 },
  { h: 6.3, top: '#5d7fb8', mid: '#e9a7a8', hor: '#ffb27a', fog: '#f0b294', sun: '#ff9f6a', sunI: 1.7, hemiS: '#ffd0c4', hemiG: '#7a6070', hemiI: 0.95, fillI: 0.3, exp: 1.12, night: 0.15 },
  { h: 8.0, top: '#6aa2d8', mid: '#b8d4ea', hor: '#f6dcc4', fog: '#f3dcc4', sun: '#ffe2b8', sunI: 2.4, hemiS: '#fff0d8', hemiG: '#9d8a74', hemiI: 1.3, fillI: 0.45, exp: 1.12, night: 0 },
  { h: 16.5, top: '#6fa8dc', mid: '#b9d7ec', hor: '#f3dcc4', fog: '#f3dcc4', sun: '#ffe0b0', sunI: 2.6, hemiS: '#fff0d8', hemiG: '#9d8a74', hemiI: 1.35, fillI: 0.45, exp: 1.12, night: 0 },
  { h: 18.6, top: '#4f72b0', mid: '#f0a272', hor: '#ffb05c', fog: '#f2ae7c', sun: '#ff9a48', sunI: 2.0, hemiS: '#ffc890', hemiG: '#6a5060', hemiI: 0.95, fillI: 0.3, exp: 1.12, night: 0.1 },
  { h: 19.7, top: '#24306a', mid: '#8a5a7a', hor: '#e07a5a', fog: '#7a5a6a', sun: '#ff7a48', sunI: 0.8, hemiS: '#a08ab8', hemiG: '#3a2a3a', hemiI: 0.7, fillI: 0.2, exp: 1.08, night: 0.6 },
  { h: 20.8, top: '#0a1230', mid: '#182654', hor: '#2c3a68', fog: '#24304f', sun: '#9fb4ff', sunI: 0.6, hemiS: '#6a7ab4', hemiG: '#2a2636', hemiI: 0.9, fillI: 0.2, exp: 1.18, night: 1 },
  { h: 24, top: '#070d24', mid: '#13204a', hor: '#24345e', fog: '#1f2b4c', sun: '#9fb4ff', sunI: 0.6, hemiS: '#6a7ab4', hemiG: '#2a2636', hemiI: 0.9, fillI: 0.2, exp: 1.18, night: 1 },
];

const C = (a: string, b: string, t: number) => new THREE.Color(a).lerp(new THREE.Color(b), t);
const L = (a: number, b: number, t: number) => a + (b - a) * t;

export function hourNow(): number {
  const o = (window as any).__saat; if (typeof o === 'number') return ((o % 24) + 24) % 24;
  const q = new URLSearchParams(location.search).get('saat');
  if (q !== null && !isNaN(+q)) return ((+q % 24) + 24) % 24;
  const d = new Date(); return d.getHours() + d.getMinutes() / 60 + d.getSeconds() / 3600;
}

export interface DayState { top: THREE.Color; mid: THREE.Color; hor: THREE.Color; fog: THREE.Color; sun: THREE.Color; sunI: number; hemiS: THREE.Color; hemiG: THREE.Color; hemiI: number; fillI: number; exp: number; night: number; sunDir: THREE.Vector3; moonDir: THREE.Vector3; isSun: boolean }

export function dayState(h: number): DayState {
  let i = 0; while (i < KEYS.length - 2 && KEYS[i + 1].h <= h) i++;
  const a = KEYS[i], b = KEYS[i + 1], t0 = (h - a.h) / (b.h - a.h), t = t0 * t0 * (3 - 2 * t0);
  // güneş: 6:00 doğuda doğar, 13:00 en yüksek, 20:00 batıda batar; ay karşı tarafta
  const u = (h - 6.2) / 13.8;                                  // 0..1 gündüz yayı
  const el = Math.sin(Math.min(1, Math.max(0, u)) * Math.PI);  // 0..1
  const az = -1.1 + u * 2.6;
  const sunDir = new THREE.Vector3(Math.cos(az) * 0.9, 0.12 + el * 0.85, Math.sin(az) * 0.6 + 0.25).normalize();
  const moonDir = new THREE.Vector3(-0.35, 0.72, -0.6).normalize();
  const night = L(a.night, b.night, t);
  return {
    top: C(a.top, b.top, t), mid: C(a.mid, b.mid, t), hor: C(a.hor, b.hor, t), fog: C(a.fog, b.fog, t), sun: C(a.sun, b.sun, t),
    sunI: L(a.sunI, b.sunI, t), hemiS: C(a.hemiS, b.hemiS, t), hemiG: C(a.hemiG, b.hemiG, t), hemiI: L(a.hemiI, b.hemiI, t),
    fillI: L(a.fillI, b.fillI, t), exp: L(a.exp, b.exp, t), night, sunDir: night > 0.55 ? moonDir : sunDir, moonDir, isSun: night <= 0.55,
  };
}

/** Gökyüzü: dikey gradyan + gece yıldızlar ve ay diski. */
export function skyMaterial(): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false, fog: false,
    uniforms: { top: { value: new THREE.Color() }, mid: { value: new THREE.Color() }, hor: { value: new THREE.Color() }, night: NIGHT, moonDir: { value: new THREE.Vector3(-0.35, 0.72, -0.6).normalize() }, sunDir: { value: new THREE.Vector3(0, 1, 0) }, sunCol: { value: new THREE.Color() } },
    vertexShader: 'varying vec3 vP; void main(){ vP = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
    fragmentShader: `uniform vec3 top; uniform vec3 mid; uniform vec3 hor; uniform float night; uniform vec3 moonDir; uniform vec3 sunDir; uniform vec3 sunCol; varying vec3 vP;
      float hash(vec3 p){ p = fract(p * 0.3183099 + 0.1); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }
      void main(){
        vec3 d = normalize(vP); float h = d.y;
        vec3 c = h < 0.0 ? hor : mix(hor, mid, smoothstep(0.0, 0.18, h)); c = mix(c, top, smoothstep(0.18, 0.75, h));
        // güneş halesi (gündüz/gün batımı)
        float sd = max(dot(d, normalize(sunDir)), 0.0);
        c += sunCol * (pow(sd, 400.0) * 1.5 + pow(sd, 12.0) * 0.18) * (1.0 - night);
        // yıldızlar
        vec3 g = floor(d * 260.0); float st = step(0.9965, hash(g)) * smoothstep(0.02, 0.25, h) * night;
        c += vec3(0.9, 0.92, 1.0) * st * (0.6 + 0.4 * hash(g + 3.1));
        // ay
        float md = dot(d, moonDir); c = mix(c, vec3(0.95, 0.94, 0.86), smoothstep(0.99955, 0.99975, md) * night);
        c += vec3(0.35, 0.4, 0.6) * pow(max(md, 0.0), 80.0) * 0.35 * night;
        gl_FragColor = vec4(c, 1.0);
      }`,
  });
}
