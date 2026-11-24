// Stilize (low-poly ile uyumlu) zemin dokuları: açık bej/krem, iri yumuşak taşlar, düşük kontrast, zayıf normal.
// Fotoğraf dokusu yok; tamamen bu betikle üretilir (CC0, bu proje).   node tools/build-stylized-ground.mjs
import sharp from 'sharp'; import fs from 'fs'; import path from 'path'; import url from 'url';
const here = path.dirname(url.fileURLToPath(import.meta.url));
const OUT = path.resolve(here, '../public/assets/tex'); fs.mkdirSync(OUT, { recursive: true });
const N = 512;
const hex = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
function hash(a, b, s = 0) { let h = (a * 374761393 + b * 668265263 + s * 2147483647) | 0; h = (h ^ (h >>> 13)) * 1274126177 | 0; return ((h ^ (h >>> 16)) >>> 0) / 4294967295; }
const sstep = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };

/** Voronoi taşlar (döşenebilir). cells: bir kenardaki hücre sayısı. */
function stones(cells, jitter, edge, seed) {
  const H = new Float32Array(N * N), ID = new Float32Array(N * N);
  const cs = N / cells;
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
    const gx = Math.floor(x / cs), gy = Math.floor(y / cs);
    let d1 = 1e9, d2 = 1e9, id = 0;
    for (let j = -1; j <= 1; j++) for (let i = -1; i <= 1; i++) {
      const cx = gx + i, cy = gy + j, wx = ((cx % cells) + cells) % cells, wy = ((cy % cells) + cells) % cells;
      const px = (cx + 0.5 + (hash(wx, wy, seed) - 0.5) * jitter) * cs, py = (cy + 0.5 + (hash(wy, wx, seed + 7) - 0.5) * jitter) * cs;
      const d = Math.hypot(x - px, y - py);
      if (d < d1) { d2 = d1; d1 = d; id = hash(wx, wy, seed + 3); } else if (d < d2) d2 = d;
    }
    const e = (d2 - d1) / cs;                      // kenara uzaklık
    H[y * N + x] = sstep(0, edge, e) * (1 - 0.25 * (d1 / cs) ** 2);   // yumuşak kubbe
    ID[y * N + x] = id;
  }
  return { H, ID };
}
/** Dikdörtgen plakalar (kesme taş); sıra başına rastgele boylar. */
function slabs(rows, edge, seed) {
  const H = new Float32Array(N * N), ID = new Float32Array(N * N);
  const rh = N / rows;
  for (let r = 0; r < rows; r++) {
    let cuts = [0]; let x = 0; const off = hash(r, 1, seed) * N;
    while (x < N - 40) { x += 70 + hash(r, cuts.length, seed) * 90; cuts.push(Math.min(N, x)); }
    cuts[cuts.length - 1] = N;
    for (let y = Math.floor(r * rh); y < Math.floor((r + 1) * rh); y++) for (let xx = 0; xx < N; xx++) {
      const sx = (xx + off) % N; let k = 0; while (cuts[k + 1] < sx) k++;
      const e = Math.min(sx - cuts[k], cuts[k + 1] - sx, y - r * rh, (r + 1) * rh - y) / rh;
      H[y * N + xx] = sstep(0, edge, e); ID[y * N + xx] = hash(r, k, seed + 5);
    }
  }
  return { H, ID };
}
async function write(name, { H, ID }, base, grout, vary, nStrength) {
  const b = hex(base), g = hex(grout), col = Buffer.alloc(N * N * 3), nor = Buffer.alloc(N * N * 3);
  for (let i = 0; i < N * N; i++) {
    const h = H[i], v = (ID[i] - 0.5) * vary;
    for (let c = 0; c < 3; c++) col[i * 3 + c] = Math.round(Math.min(255, Math.max(0, g[c] + (b[c] * (1 + v) - g[c]) * h)));
    const x = i % N, y = (i / N) | 0;
    const hl = H[y * N + (x + N - 1) % N], hr = H[y * N + (x + 1) % N], hu = H[((y + N - 1) % N) * N + x], hd = H[((y + 1) % N) * N + x];
    let nx = (hl - hr) * nStrength, ny = (hu - hd) * nStrength, nz = 1; const l = Math.hypot(nx, ny, nz);
    nor[i * 3] = Math.round((nx / l * 0.5 + 0.5) * 255); nor[i * 3 + 1] = Math.round((ny / l * 0.5 + 0.5) * 255); nor[i * 3 + 2] = Math.round((nz / l * 0.5 + 0.5) * 255);
  }
  const raw = { raw: { width: N, height: N, channels: 3 } };
  await sharp(col, raw).webp({ quality: 85 }).toFile(`${OUT}/${name}_c.webp`);
  await sharp(nor, raw).webp({ quality: 90 }).toFile(`${OUT}/${name}_n.webp`);
  console.log(name);
}
// yol: krem-bej yuvarlak taşlar; meydan: daha iri, daha açık; kaldırım/yürüme yolu: kesme plakalar
await write('yol_s', stones(9, 0.75, 0.16, 11), '#ecd6b6', '#c9ae8c', 0.10, 2.2);
await write('meydan_s', stones(6, 0.85, 0.10, 23), '#f6e6cc', '#dcc4a2', 0.07, 1.6);
await write('plaka_s', slabs(5, 0.06, 31), '#f3e4cf', '#d2bb9b', 0.06, 1.8);
