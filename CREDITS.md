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
cumba (`cumba`, `cumba_alt`, `cumba_ust`), Sultan Ahmet Camii (`cami`, 6 minare: 4 gövdede, 2 `cami_avlu`da), `ayasofya`, `minare`, `guvercin`, `galata_kulesi`, meydan çeşmesi (`cesme`), `simit_arabasi`, `cay_ocagi`, `cay_masa`. Hepsi `mb.glb` içinde.

## Dokular

| Kullanım | Kaynak | Lisans | Dosyalar |
|---|---|---|---|
| Yol, meydan, kaldırım/yürüme yolu (stilize taş) | Bu proje: `web/tools/build-stylized-ground.mjs` ile üretildi | CC0 | `tex/yol_s_*`, `tex/meydan_s_*`, `tex/plaka_s_*` |
| Çatı kiremidi | ambientCG Roofing Tiles 013 A — https://ambientcg.com/view?id=RoofingTiles013A | CC0 | `tex/kiremit_c.webp`, `tex/kiremit_n.webp` |

## Yeniden üretme

```
node web/tools/build-assets.mjs      # asset-src/ -> web/public/assets/{mb,ft,nk}.glb (meshopt + quantize)
node web/tools/build-textures.mjs    # asset-src/tex/ (kiremit) -> web/public/assets/tex/*.webp (512 px)
node web/tools/build-stylized-ground.mjs  # stilize zemin dokuları
```
