import { describe, it, expect } from 'vitest';
import { newState, feedStray, migrate } from '../src/core/state';
import { VET_MS, VET_COIN, CARE_COIN, admit, discharge, care, claimQuest, ensureQuests, shelterCap, upgradeShelter, SHELTER_UPGRADE } from '../src/core/care';

const DAY = 86_400_000;
describe('veteriner', () => {
  it('tedavi süresi dolmadan teslim alınmaz; sonra jeton verir ve barınağa katar', () => {
    const s = newState(0);
    admit(s, 'k1', 'Pamuk', { species: 'cat', body: '#fff', pattern: 'solid' }, 0);
    expect(discharge(s, 'k1', true, VET_MS - 1).ok).toBe(false);
    const c0 = s.coins;
    const r = discharge(s, 'k1', true, VET_MS);
    expect(r.ok).toBe(true); expect(s.coins).toBe(c0 + VET_COIN);
    expect(s.shelter.animals).toHaveLength(1); expect(s.treatments).toHaveLength(0);
  });
  it('barınak doluysa barınağa alınmaz, sokağa bırakılabilir', () => {
    const s = newState(0);
    for (let i = 0; i < shelterCap(s) + 1; i++) admit(s, 'k' + i, 'X', { species: 'dog' }, 0);
    for (let i = 0; i < shelterCap(s); i++) expect(discharge(s, 'k' + i, true, VET_MS).ok).toBe(true);
    const last = 'k' + shelterCap(s);
    expect(discharge(s, last, true, VET_MS).ok).toBe(false);
    expect(discharge(s, last, false, VET_MS).ok).toBe(true);
  });
});

describe('barınak bakımı', () => {
  it('mama+su+sevgi tamamlanınca günde bir kez jeton; ertesi gün yeniden', () => {
    const s = newState(0);
    admit(s, 'a', 'A', { species: 'cat' }, 0); const uid = discharge(s, 'a', true, VET_MS).pet!.uid;
    const c0 = s.coins;
    care(s, uid, 'fed', DAY); care(s, uid, 'water', DAY);
    expect(s.coins).toBe(c0);
    expect(care(s, uid, 'pet', DAY).paid).toBe(CARE_COIN);
    expect(care(s, uid, 'pet', DAY).done).toBe(false);
    expect(s.coins).toBe(c0 + CARE_COIN);
    care(s, uid, 'fed', 2 * DAY); care(s, uid, 'water', 2 * DAY); care(s, uid, 'pet', 2 * DAY);
    expect(s.coins).toBe(c0 + 2 * CARE_COIN);
  });
  it('büyütme kapasiteyi artırır ve jeton harcar', () => {
    const s = newState(0); s.coins = 10_000;
    const cap = shelterCap(s);
    expect(upgradeShelter(s)).toBe(true);
    expect(shelterCap(s)).toBeGreaterThan(cap); expect(s.coins).toBe(10_000 - SHELTER_UPGRADE[1]);
  });
});

describe('günlük görevler', () => {
  it('beslemek görevi ilerletir, tamamlanınca ödül bir kez alınır', () => {
    const s = newState(0); const now = 5 * DAY;
    ensureQuests(s, now);
    const q = s.quests.list.find(q => q.kind === 'feed')!;
    for (let i = 0; i < q.target; i++) feedStray(s, 'x' + i, now);
    const c0 = s.coins;
    expect(claimQuest(s, q.id)).not.toBeNull();
    expect(s.coins).toBe(c0 + q.coins);
    expect(claimQuest(s, q.id)).toBeNull();
  });
  it('eski kayıt yeni alanlarla açılır; bisiklet herkese verilir', () => {
    const s = migrate({ coins: 5, items: { tisort_mercan: 1 } }, 0);
    expect(s.items.bisiklet).toBe(1); expect(s.shelter.level).toBe(1); expect(s.treatments).toEqual([]);
  });
});
