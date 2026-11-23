// Eski Godot harita üreticisinin (tools/build_map.gd) kayıt dökümünü web verisine çevirir.
// Kullanım: node tools/convert-old-map.cjs <dump.json> <istanbul.json> <çıktı.json>
const fs = require('fs');
const [dumpP, metaP, outP] = process.argv.slice(2);
const d = JSON.parse(fs.readFileSync(dumpP, 'utf8'));
const m = JSON.parse(fs.readFileSync(metaP, 'utf8'));
const r2 = v => Math.round(v * 100) / 100;
const out = { houses: [], prims: [], walls: [], grounds: [], trees: [], lamps: [], benches: [], laundry: [] };
for (const e of d) {
  switch (e[0]) {
    case 'h': out.houses.push([e[1], e[2], e[3], e[4], e[5], e[6], e[7] ? 1 : 0, e[8], e[9], e[10]]); break;
    case 'p': out.prims.push([e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9], e[10], e[11], e[12]]); break;
    case 'w': out.walls.push(e.slice(1)); break;
    case 'g': out.grounds.push([r2(e[1]), r2(e[2]), r2(e[3]), r2(e[4]), r2(e[5]), e[6], e[7]]); break;
    case 'tree': out.trees.push([r2(e[1]), r2(e[2]), e[3], r2(e[4])]); break;
    case 'lamp': out.lamps.push([r2(e[1]), r2(e[2])]); break;
    case 'bench': out.benches.push([r2(e[1]), r2(e[2]), r2(e[3])]); break;
    case 'laundry': out.laundry.push([r2(e[1]), r2(e[2]), r2(e[3]), r2(e[4])]); break;
  }
}
Object.assign(out, { col: m.col, roads: m.roads, areas: m.areas, fountains: m.fountains, bridge: m.bridge, pier: m.pier, water: m.water, start: m.start, bounds: m.bounds, animals: m.animals, vendors: m.vendors, landmarks: m.landmarks, pet_spots: m.pet_spots });
out.lands = [[-225, 237, 0, 295], [-150, 230, -265, -50], [120, 240, -505, -259]];
fs.writeFileSync(outP, JSON.stringify(out));
console.log(Object.entries(out).map(([k, v]) => `${k}:${Array.isArray(v) ? v.length : '-'}`).join(' '));
