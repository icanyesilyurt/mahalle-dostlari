// ambientCG (CC0) dokularını web'e hazırlar: 512 px webp, renk + normal (OpenGL) + pürüzlülük.
//   node tools/build-textures.mjs
import sharp from 'sharp'; import fs from 'fs'; import path from 'path'; import url from 'url';
const here = path.dirname(url.fileURLToPath(import.meta.url));
const SRC = path.resolve(here, '../../asset-src/tex'), OUT = path.resolve(here, '../public/assets/tex');
fs.mkdirSync(OUT, { recursive: true });
const SET = { kiremit: 'RoofingTiles013A' };
for (const [name, id] of Object.entries(SET)) {
  for (const [suf, map] of [['c', 'Color'], ['n', 'NormalGL'], ['r', 'Roughness']]) {
    const f = `${SRC}/${id}/${id}_1K-JPG_${map}.jpg`;
    await sharp(f).resize(512, 512).webp({ quality: suf === 'n' ? 88 : 80 }).toFile(`${OUT}/${name}_${suf}.webp`);
  }
  console.log(name, fs.readdirSync(OUT).filter(f => f.startsWith(name)).map(f => f + ' ' + (fs.statSync(`${OUT}/${f}`).size / 1024).toFixed(0) + 'K').join(', '));
}
