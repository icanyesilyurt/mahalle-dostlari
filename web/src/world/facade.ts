// Cephe dokuları: pencere/kepenk/dükkan camı kanvasta çizilir; duvarın kendi rengi
// köşe renginden gelir. Maske malzemesi: doku saydamsa duvar rengi, opaksa dokunun kendi rengi.
import * as THREE from 'three';

const MW = 128, MH = 148; // bir modül: ~2.6 m x 3 m

function tex(draw: (g: CanvasRenderingContext2D) => void, w = MW, h = MH): THREE.CanvasTexture {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const g = c.getContext('2d')!; draw(g);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; t.anisotropy = 4;
  t.generateMipmaps = true;
  return t;
}

const rr = (g: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) => { g.beginPath(); (g as any).roundRect(x, y, w, h, r); g.fill(); };

function glass(g: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  const gr = g.createLinearGradient(x, y, x + w, y + h);
  gr.addColorStop(0, '#5f87a6'); gr.addColorStop(0.55, '#34516b'); gr.addColorStop(1, '#2a4257');
  g.fillStyle = gr; g.fillRect(x, y, w, h);
  g.fillStyle = 'rgba(255,255,255,0.22)'; g.beginPath(); g.moveTo(x + w * 0.15, y + h); g.lineTo(x + w * 0.55, y); g.lineTo(x + w * 0.72, y); g.lineTo(x + w * 0.32, y + h); g.fill();
}

/** Klasik pencere: krem çerçeve, kayıt, yeşil/kahve kepenk, denizlik. */
function windowA(shutter: string) {
  return tex(g => {
    const x = 44, y = 30, w = 40, h = 74;
    g.fillStyle = shutter;
    for (const sx of [x - 20, x + w + 2]) { rr(g, sx, y - 2, 18, h + 4, 2); g.fillStyle = 'rgba(0,0,0,0.18)'; for (let i = 0; i < 8; i++) g.fillRect(sx + 2, y + 4 + i * 9, 14, 2); g.fillStyle = shutter; }
    g.fillStyle = '#f6efe2'; g.fillRect(x - 4, y - 5, w + 8, h + 9);
    glass(g, x, y, w, h);
    g.fillStyle = '#f6efe2'; g.fillRect(x + w / 2 - 1.5, y, 3, h); g.fillRect(x, y + h * 0.38, w, 3);
    g.fillStyle = '#e8dcc8'; g.fillRect(x - 8, y + h + 3, w + 16, 6);
  });
}
/** Kemerli pencere + çiçek kutusu */
function windowB() {
  return tex(g => {
    const x = 42, y = 26, w = 44, h = 78;
    g.fillStyle = '#f6efe2'; g.beginPath(); g.moveTo(x - 5, y + h + 4); g.lineTo(x - 5, y + 20); g.arc(x + w / 2, y + 20, w / 2 + 5, Math.PI, 0); g.lineTo(x + w + 5, y + h + 4); g.fill();
    g.save(); g.beginPath(); g.moveTo(x, y + h); g.lineTo(x, y + 20); g.arc(x + w / 2, y + 20, w / 2, Math.PI, 0); g.lineTo(x + w, y + h); g.clip(); glass(g, x, y - 4, w, h + 4); g.restore();
    g.fillStyle = '#f6efe2'; g.fillRect(x + w / 2 - 1.5, y, 3, h); g.fillRect(x, y + 34, w, 3);
    g.fillStyle = '#8a5a3a'; g.fillRect(x - 8, y + h + 2, w + 16, 10);
    const fl = ['#e2493b', '#f28aa5', '#f2c94c', '#ffffff', '#c85ac8'];
    for (let i = 0; i < 7; i++) { g.fillStyle = i % 2 ? '#5f9a4a' : fl[i % fl.length]; g.beginPath(); g.arc(x - 4 + i * 9, y + h, 5.5, 0, 7); g.fill(); }
  });
}
/** Uzun Fransız pencere + ferforje korkuluk */
function windowC() {
  return tex(g => {
    const x = 42, y = 20, w = 44, h = 96;
    g.fillStyle = '#f6efe2'; g.fillRect(x - 5, y - 6, w + 10, h + 8);
    glass(g, x, y, w, h);
    g.fillStyle = '#f6efe2'; g.fillRect(x + w / 2 - 1.5, y, 3, h); g.fillRect(x, y + 28, w, 3);
    g.fillStyle = '#2f3235'; g.fillRect(x - 10, y + h - 34, w + 20, 4); g.fillRect(x - 10, y + h, w + 20, 4);
    for (let i = 0; i <= 8; i++) g.fillRect(x - 10 + i * (w + 18) / 8, y + h - 34, 2.5, 34);
  });
}
/** Zemin kat penceresi (küçük, taş söveli) */
function windowGF() {
  return tex(g => {
    const x = 40, y = 50, w = 48, h = 56;
    g.fillStyle = '#e8dcc8'; g.fillRect(x - 6, y - 6, w + 12, h + 12);
    glass(g, x, y, w, h);
    g.fillStyle = '#2f3235'; for (let i = 1; i < 5; i++) g.fillRect(x + i * w / 5, y, 2, h);
  });
}
/** Dükkan vitrini: ahşap çerçeve, geniş cam, kapı */
function shopFront() {
  return tex(g => {
    g.fillStyle = '#7a4b2e'; g.fillRect(6, 18, 192 - 12, 130);
    glass(g, 14, 40, 104, 96);
    g.fillStyle = '#7a4b2e'; g.fillRect(64, 40, 4, 96);
    g.fillStyle = '#5a3420'; g.fillRect(126, 34, 58, 114);
    glass(g, 134, 44, 42, 50);
    g.fillStyle = '#e8b53a'; g.fillRect(170, 100, 5, 5);
  }, 192, MH);
}
/** Tente şeridi maskesi (beyaz şerit opak, renkli şerit duvar/köşe renginden) */
function awningMask() {
  return tex(g => { g.fillStyle = '#fbf6ee'; for (let i = 0; i < 8; i += 2) g.fillRect(i * 16, 0, 16, 64); g.fillStyle = 'rgba(0,0,0,0.0)'; }, 128, 64);
}

/** Maske malzemesi: diffuse = mix(köşe rengi, doku rengi, doku alfası) */
export function maskMaterial(map: THREE.Texture): THREE.MeshLambertMaterial {
  const m = new THREE.MeshLambertMaterial({ vertexColors: true, map });
  m.onBeforeCompile = sh => {
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <map_fragment>', 'vec4 facadeT = texture2D( map, vMapUv );')
      .replace('#include <color_fragment>', '#include <color_fragment>\n\tdiffuseColor.rgb = mix( diffuseColor.rgb, facadeT.rgb, facadeT.a );');
  };
  m.customProgramCacheKey = () => 'facade-mask';
  return m;
}

export function facadeMaterials(): Record<string, THREE.Material> {
  return {
    win_a: maskMaterial(windowA('#4f7d5a')),
    win_b: maskMaterial(windowB()),
    win_c: maskMaterial(windowC()),
    win_d: maskMaterial(windowA('#7a4b33')),
    gf: maskMaterial(windowGF()),
    shop: maskMaterial(shopFront()),
    awning: maskMaterial(awningMask()),
  };
}
