# Kaynaklar ve lisanslar (web sürümü, `web/public/assets/`)

Yalnız **CC0 1.0 (Kamu malı)** lisanslı kaynaklar kullanıldı. Ticari kullanım serbest, atıf zorunlu değil, yine de teşekkürle anıyoruz.
Lisans: https://creativecommons.org/publicdomain/zero/1.0/

## 3B modeller — Kenney (www.kenney.nl), CC0

| Paket | Sürüm | Adres | Kullanılan parçalar | Dosya |
|---|---|---|---|---|
| Modular Buildings | 2.1 | https://kenney.nl/assets/modular-buildings | `building-*` duvar/pencere/kapı/balkon/tente modülleri, `roof-flat-*`, `detail-ac-*` | `mb.glb` |
| Fantasy Town Kit | — | https://kenney.nl/assets/fantasy-town-kit | `lantern` (sokak feneri), `tree-high-round` (selvi), `tree`, `tree-high`, `hedge`, `stall-*`, `cart` | `ft.glb` |
| Nature Kit | — | https://kenney.nl/assets/nature-kit | `tree_oak`, `tree_default`, `tree_fat`, `pot_large`, `pot_small`, `flower_*A`, `plant_bush*` | `nk.glb` |
| Furniture Kit | — | https://kenney.nl/assets/furniture-kit | `bench`, `pottedPlant` | `nk.glb` |

Her paketin `License.txt` dosyası (Kenney, CC0) `asset-src/x/` altında saklanıyor (depoya girmiyor).

## 3B modeller — bu proje için Blender'da üretilenler (CC0)

`web/tools/blender/istanbul_pieces.py` (Blender 5.3, Python) ile üretildi; Kenney Modular Buildings renk atlasını (`colormap.png`, CC0) kullanır:
cumba (`cumba`, `cumba_alt`, `cumba_ust`), Sultan Ahmet Camii (`cami`) ve avlusu (`cami_avlu`), `minare`, `galata_kulesi`, meydan çeşmesi (`cesme`), `simit_arabasi`, `cay_ocagi`, `cay_masa`. Hepsi `mb.glb` içinde.

## Dokular — ambientCG (https://ambientcg.com), CC0

| Kullanım | Malzeme | Adres | Dosyalar |
|---|---|---|---|
| Yol (Arnavut kaldırımı) | Paving Stones 119 | https://ambientcg.com/view?id=PavingStones119 | `tex/arnavut_c.webp`, `tex/arnavut_n.webp` |
| Meydan (yelpaze taş) | Paving Stones 151 | https://ambientcg.com/view?id=PavingStones151 | `tex/kaldirim_c.webp`, `tex/kaldirim_n.webp` |
| Kaldırım (kesme taş) | Paving Stones 128 | https://ambientcg.com/view?id=PavingStones128 | `tex/tas_c.webp`, `tex/tas_n.webp` |
| Çatı kiremidi | Roofing Tiles 013 A | https://ambientcg.com/view?id=RoofingTiles013A | `tex/kiremit_c.webp`, `tex/kiremit_n.webp` |

## Yeniden üretme

```
node web/tools/build-assets.mjs      # asset-src/ -> web/public/assets/{mb,ft,nk}.glb (meshopt + quantize)
node web/tools/build-textures.mjs    # asset-src/tex/ -> web/public/assets/tex/*.webp (512 px)
```
