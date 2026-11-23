import { describe, it, expect } from 'vitest';
import { newState, regenFood, useFood, msToFull, FOOD_REGEN_MS, FOOD_MAX, feedStray, openBox, rollBox, buyItem, adoptPet, placeHouse, migrate } from '../src/core/state';
import { BOXES } from '../src/core/catalog';

const H = 3600_000;
describe('mama stoğu', () => {
  it('saatte 2 dolar, 5 saatte full olur (kapalıyken de)', () => {
    const s = newState(0);
    for (let i = 0; i < 10; i++) useFood(s, 0);
    expect(s.food).toBe(0);
    regenFood(s, 1 * H); expect(s.food).toBe(2);
    regenFood(s, 4.99 * H); expect(s.food).toBe(9);
    regenFood(s, 5 * H); expect(s.food).toBe(FOOD_MAX);
  });
  it('kısmi süre kaybolmaz', () => {
    const s = newState(0); useFood(s, 0); useFood(s, 0); // 8, sayaç 0'da
    regenFood(s, FOOD_REGEN_MS * 0.6); expect(s.food).toBe(8);
    regenFood(s, FOOD_REGEN_MS * 1.2); expect(s.food).toBe(9);
    regenFood(s, FOOD_REGEN_MS * 2.0); expect(s.food).toBe(10);
  });
  it('dolu stoktan harcayınca sayaç o an başlar', () => {
    const s = newState(0);
    useFood(s, 10 * H);
    expect(msToFull(s, 10 * H)).toBe(FOOD_REGEN_MS);
  });
});

describe('besleme', () => {
  it('jeton verir, ilk dostlukta elmas', () => {
    const s = newState(0); const c = s.coins, g = s.gems;
    const r = feedStray(s, 'k1', 0); expect(r.newFriend).toBe(true);
    feedStray(s, 'k1', 0);
    expect(s.coins).toBe(c + 30); expect(s.gems).toBe(g + 1);
  });
  it('mama yokken beslenmez', () => {
    const s = newState(0); s.food = 0; s.foodTs = 0;
    expect(feedStray(s, 'k1', 1000).ok).toBe(false);
  });
});

describe('sürpriz paket', () => {
  it('oranlar toplamı 100', () => {
    for (const b of BOXES) expect(b.tiers.reduce((a, t) => a + t.chance, 0)).toBe(100);
  });
  it('dağılım oranlara uyar', () => {
    let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    const n: Record<string, number> = {};
    for (let i = 0; i < 20000; i++) { const r = rollBox('mahalle_paketi', rnd)!; n[r.rarity] = (n[r.rarity] ?? 0) + 1; }
    expect(n.common / 20000).toBeCloseTo(0.6, 1);
    expect(n.rare / 20000).toBeCloseTo(0.3, 1);
  });
  it('jeton yetmezse açılmaz', () => {
    const s = newState(0); s.coins = 10; expect(openBox(s, 'mahalle_paketi', 0)).toBeNull();
  });
});

describe('mağaza ve sahiplenme', () => {
  it('kulübe al ve kur', () => {
    const s = newState(0); s.coins = 1000;
    expect(buyItem(s, 'kedi_evi')).toBe(true);
    const h = placeHouse(s, 'kedi_evi', 1, 2, 0, 'Pamuk Yuva', '#fff');
    expect(h?.name).toBe('Pamuk Yuva'); expect(s.items.kedi_evi).toBe(0);
    expect(placeHouse(s, 'kedi_evi', 0, 0, 0, '', '')).toBeNull();
  });
  it('elmaslı pet elmas ister', () => {
    const s = newState(0); s.gems = 5; s.coins = 99999;
    expect(adoptPet(s, 'husky', 'Kar')).toBeNull();
    s.gems = 30; expect(adoptPet(s, 'husky', 'Kar')?.name).toBe('Kar'); expect(s.gems).toBe(5);
  });
  it('bozuk kayıt güvenle açılır', () => {
    expect(migrate('çöp', 0).food).toBe(10);
    expect(migrate({ pets: [{ breed: 'yok' }], coins: 5 }, 0).pets.length).toBe(0);
  });
});
