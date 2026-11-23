# Mahalle Dostları

Sokak hayvanlarını besleme oyunu.

## Yeni sürüm (v2, telefon öncelikli): `web/`

- **Telefonda oyna:** https://icanyesilyurt.github.io/mahalle-dostlari/yeni/
- Three.js + TypeScript + Vite. Dikey ve yatay ekran, dokunmatik joystick / dokun-git.
- Tüm modeller (binalar, karakter, kedi-köpekler) kodla üretilir; dış model dosyası yok, toplam ~1,3 MB.
- Yazı tipi: Baloo 2 (OFL). Sesler WebAudio ile sentezlenir.

```
cd web
npm install
npm run dev      # http://localhost:5199
npm test         # ekonomi testleri (mama dolumu, paket oranları, mağaza)
npm run build    # çıktı: docs/yeni/  (GitHub Pages)
```

Klasör yapısı:

| Klasör | İçerik |
|---|---|
| `web/src/core` | Görselden bağımsız mantık: kayıt, ekonomi, katalog (ırklar, ürünler, sürpriz paketler), reklam arayüzü |
| `web/src/world` | Şehir kayıt defteri (`cities.ts`), İstanbul haritası, bina/eşya üreticileri |
| `web/src/actors` | Karakter ve kedi/köpek modelleri + animasyonları |
| `web/src/game` | Oyun döngüsü, kamera, giriş, hayvan davranışları |
| `web/src/ui` | Arayüz (HUD, paneller), ikonlar, ses efektleri |

Yeni şehir eklemek: `world/cities.ts` içinde `available: true` yap, `world/<şehir>.ts` kurucusunu yaz,
`world/world.ts` içindeki `CITY_BUILDERS`'a bir satır ekle.

Yeni ürün / ırk / paket eklemek: yalnız `core/catalog.ts`.

AdMob: `core/ads.ts` içindeki `AdProvider` arayüzüne gerçek sağlayıcı yazılıp `ui/hud.ts`'de `TestAdProvider` yerine verilir.

## Eski sürüm (v0.23, Godot 4.4)

Kök klasördeki Godot projesi olduğu gibi duruyor (6 şehir).
- Tarayıcı: https://icanyesilyurt.github.io/mahalle-dostlari/
- Android APK: https://icanyesilyurt.github.io/mahalle-dostlari/MahalleDostlari.apk
