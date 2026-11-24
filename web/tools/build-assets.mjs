// Seçilen CC0 modelleri (asset-src/) üç pakete toplar ve sıkıştırır -> web/public/assets/*.glb
//   node tools/build-assets.mjs
// Her paket: kök düğümler = asset adları. meshopt + quantize; dokular olduğu gibi (küçük renk atlası).
// Kaynaklar ve lisanslar: ../CREDITS.md
import { NodeIO, Document } from '@gltf-transform/core';
import { ALL_EXTENSIONS, EXTMeshoptCompression } from '@gltf-transform/extensions';
import { mergeDocuments, dedup, prune, weld, quantize, unpartition, flatten, join } from '@gltf-transform/functions';
import { MeshoptEncoder, MeshoptDecoder } from 'meshoptimizer';
import fs from 'fs'; import path from 'path'; import url from 'url';

const here = path.dirname(url.fileURLToPath(import.meta.url));
const SRC = path.resolve(here, '../../asset-src');
const OUT = path.resolve(here, '../public/assets');
fs.mkdirSync(OUT, { recursive: true });

const MB = `${SRC}/x/kenney_modular-buildings/Models/GLB format`;
const FT = `${SRC}/x/kenney_fantasy-town-kit/Models/GLB format`;
const NK = `${SRC}/x/kenney_nature-kit/Models/GLTF format`;
const FK = `${SRC}/x/kenney_furniture-kit/Models/GLTF format`;

const PACKS = {
  // Kenney Modular Buildings + Blender'da aynı atlasla modellenen İstanbul parçaları
  mb: {
    files: [
      ...['building-block', 'building-door', 'building-door-window', 'building-door-window-narrow', 'building-window-door-window', 'building-window-door-window-round',
        'building-window-large', 'building-window-large-left', 'building-window-large-middle', 'building-window-large-right', 'detail-ac-a',
      ].map(n => [n, `${MB}/${n}.glb`]),
      ['@istanbul', `${SRC}/blender/istanbul-pieces.glb`],
    ],
  },
  // Kenney Fantasy Town Kit: fener, selvi/ağaç, tezgah
  ft: { files: ['lantern', 'tree-high-round', 'tree-high', 'tree', 'hedge', 'hedge-large', 'stall-red', 'stall-green', 'stall-bench', 'cart'].map(n => [n, `${FT}/${n}.glb`]) },
  // Kenney Nature Kit + Furniture Kit: geniş yapraklı ağaç, saksı, çiçek, bank
  nk: {
    files: [
      ...['tree_oak', 'tree_default', 'tree_fat', 'pot_large', 'pot_small', 'flower_redA', 'flower_yellowA', 'flower_purpleA', 'plant_bushDetailed', 'plant_bush'].map(n => [n, `${NK}/${n}.glb`]),
      ...['bench', 'pottedPlant'].map(n => [n, `${FK}/${n}.glb`]),
    ],
  },
};

const io = new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({ 'meshopt.encoder': MeshoptEncoder, 'meshopt.decoder': MeshoptDecoder });
await MeshoptEncoder.ready;

for (const [pack, { files }] of Object.entries(PACKS)) {
  const doc = new Document();
  doc.createBuffer();
  const scene = doc.createScene('pack');
  for (const [name, file] of files) {
    const src = await io.read(file);
    const map = mergeDocuments(doc, src);
    const srcScene = src.getRoot().listScenes()[0];
    const merged = map.get(srcScene);
    if (name.startsWith('@')) {
      // çok parçalı dosya: her kök düğüm kendi adıyla bir asset
      for (const n of merged.listChildren()) scene.addChild(n);
    } else {
      const holder = doc.createNode(name);
      for (const n of merged.listChildren()) holder.addChild(n);
      scene.addChild(holder);
    }
    merged.dispose();
  }
  doc.getRoot().setDefaultScene(scene);
  for (const s of doc.getRoot().listScenes()) if (s !== scene) s.dispose();
  await doc.transform(unpartition(), dedup(), prune(), weld(), quantize({ quantizePosition: 14, quantizeNormal: 8, quantizeTexcoord: 12 }), dedup(), prune());
  doc.createExtension(EXTMeshoptCompression).setRequired(true).setEncoderOptions({ method: EXTMeshoptCompression.EncoderMethod.QUANTIZE });
  const out = `${OUT}/${pack}.glb`;
  await io.write(out, doc);
  const names = scene.listChildren().map(n => n.getName());
  console.log(pack, (fs.statSync(out).size / 1024).toFixed(0) + ' KB', names.length, 'asset:', names.join(' '));
}
