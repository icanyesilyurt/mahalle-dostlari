// Oyun durumu + kayıt + ekonomi kuralları. Görselden tamamen bağımsız (test edilebilir).
import { BOXES, BREEDS, ITEMS, Price, Reward, breedById, itemById } from './catalog';
import { CITIES } from '../world/cities';
import type { Quest, ShelterPet, Treatment } from './care';
import { questProgress } from './care';

export const FOOD_MAX = 10;
export const FOOD_REGEN_MS = 30 * 60 * 1000; // saatte 2 mama
export const WATER_MAX = 5;
export const FEED_COIN = 15;
export const WATER_COIN = 5;
export const PET_COIN = 2;
export const NEW_FRIEND_GEM = 1;
const SAVE_KEY = 'mahalle-dostlari-v2';
export const SAVE_VERSION = 1;

export interface PlacedHouse { uid: string; item: string; city: string; x: number; z: number; rot: number; name: string; color: string }
export interface OwnedPet { uid: string; breed: string; name: string; wear?: string; collar?: string; house?: string }
export interface Friend { fed: number; watered: number; petted: number; lastPet: number }

export interface GameState {
  v: number;
  food: number;
  foodTs: number;       // dolum zamanlayıcısının çapası
  water: number;
  coins: number;
  gems: number;
  city: string;
  unlockedCities: string[];
  items: Record<string, number>;     // sahip olunan ürünler (adet)
  houses: PlacedHouse[];
  pets: OwnedPet[];
  activePet: string | null;          // yanında yürüyen pet
  look: { outfit: string; hat: string | null; skin: string; hair: string; gender?: 'm' | 'f'; hairStyle?: 'kisa' | 'dalgali' | 'uzun' | 'atkuyrugu' | 'topuz' | 'kivircik' };
  friends: Record<string, Friend>;   // sokak hayvanı id -> ilişki
  stats: { fed: number; watered: number; boxes: number; ads: number };
  muted: boolean;
  sound?: { sfx: boolean; music: boolean };
  garage: { active: string; color: Record<string, string>; acc: Record<string, string[]>; park?: { x: number; z: number; yaw: number } };
  xp: number;
  treatments: Treatment[];
  shelter: { level: number; decor: string[]; animals: ShelterPet[] };
  quests: { day: string; list: Quest[] };
}

export function newState(now: number): GameState {
  return {
    v: SAVE_VERSION, food: FOOD_MAX, foodTs: now, water: WATER_MAX, coins: 300, gems: 15,
    city: 'istanbul', unlockedCities: ['istanbul'], items: { tisort_mercan: 1, bisiklet: 1 }, houses: [], pets: [], activePet: null,
    look: { outfit: 'tisort_mercan', hat: null, skin: '#f1c7a5', hair: '#4a2f22', gender: 'm', hairStyle: 'dalgali' },
    friends: {}, stats: { fed: 0, watered: 0, boxes: 0, ads: 0 }, muted: false,
    garage: { active: 'bisiklet', color: {}, acc: {} },
    xp: 0, treatments: [], shelter: { level: 1, decor: [], animals: [] }, quests: { day: '', list: [] },
  };
}

/** Kapalıyken geçen süre dahil mama dolumunu uygular. */
export function regenFood(s: GameState, now: number): void {
  if (s.food >= FOOD_MAX) { s.foodTs = now; return; }
  const elapsed = Math.max(0, now - s.foodTs);
  const gained = Math.floor(elapsed / FOOD_REGEN_MS);
  if (gained <= 0) return;
  s.food = Math.min(FOOD_MAX, s.food + gained);
  s.foodTs = s.food >= FOOD_MAX ? now : s.foodTs + gained * FOOD_REGEN_MS;
}

/** Bir sonraki mamaya kalan ms (dolu ise 0). */
export function msToNextFood(s: GameState, now: number): number {
  if (s.food >= FOOD_MAX) return 0;
  return Math.max(0, FOOD_REGEN_MS - (now - s.foodTs));
}
export function msToFull(s: GameState, now: number): number {
  if (s.food >= FOOD_MAX) return 0;
  return msToNextFood(s, now) + (FOOD_MAX - s.food - 1) * FOOD_REGEN_MS;
}

/** Mama harcar. Stok tamken harcanırsa zamanlayıcı şimdi başlar. */
export function useFood(s: GameState, now: number): boolean {
  regenFood(s, now);
  if (s.food <= 0) return false;
  if (s.food >= FOOD_MAX) s.foodTs = now;
  s.food -= 1;
  return true;
}

export function refillFoodByAd(s: GameState, now: number): void {
  s.food = FOOD_MAX; s.foodTs = now; s.stats.ads++;
}

export function canAfford(s: GameState, p: Price): boolean {
  return (p.coin ?? 0) <= s.coins && (p.gem ?? 0) <= s.gems;
}
export function pay(s: GameState, p: Price): boolean {
  if (!canAfford(s, p)) return false;
  s.coins -= p.coin ?? 0; s.gems -= p.gem ?? 0;
  return true;
}

export function friend(s: GameState, id: string): Friend {
  return (s.friends[id] ??= { fed: 0, watered: 0, petted: 0, lastPet: 0 });
}

/** Sokak hayvanını besleme: jeton, ilk dostlukta elmas. */
export function feedStray(s: GameState, id: string, now: number): { ok: boolean; coins: number; gems: number; newFriend: boolean } {
  if (!useFood(s, now)) return { ok: false, coins: 0, gems: 0, newFriend: false };
  const f = friend(s, id);
  const newFriend = f.fed === 0;
  f.fed++; s.stats.fed++; questProgress(s, 'feed', 1, now);
  s.coins += FEED_COIN;
  const gems = newFriend ? NEW_FRIEND_GEM : 0;
  s.gems += gems;
  return { ok: true, coins: FEED_COIN, gems, newFriend };
}

export function waterStray(s: GameState, id: string): { ok: boolean; coins: number } {
  if (s.water <= 0) return { ok: false, coins: 0 };
  s.water--; friend(s, id).watered++; s.stats.watered++; questProgress(s, 'water', 1, Date.now());
  s.coins += WATER_COIN;
  return { ok: true, coins: WATER_COIN };
}

export function petStray(s: GameState, id: string, now: number): number {
  const f = friend(s, id);
  f.petted++; questProgress(s, 'pet', 1, now);
  if (now - f.lastPet < 60_000) return 0; // dakikada bir ödül
  f.lastPet = now; s.coins += PET_COIN;
  return PET_COIN;
}

export function refillWater(s: GameState): void { s.water = WATER_MAX; }

let uidN = 0;
export const uid = () => Date.now().toString(36) + (uidN++).toString(36) + Math.floor(Math.random() * 1e4).toString(36);

export function buyItem(s: GameState, id: string): boolean {
  const it = itemById(id); if (!it) return false;
  if (it.kind !== 'house' && (s.items[id] ?? 0) > 0) return false; // giyilebilirler tek
  if (!pay(s, it.price)) return false;
  s.items[id] = (s.items[id] ?? 0) + 1;
  return true;
}

export function adoptPet(s: GameState, breedId: string, name: string): OwnedPet | null {
  const b = breedById(breedId); if (!b) return null;
  if (!pay(s, b.price)) return null;
  const p: OwnedPet = { uid: uid(), breed: breedId, name: name.trim() || b.name };
  s.pets.push(p);
  if (!s.activePet) s.activePet = p.uid;
  return p;
}

/** Envanterdeki bir yapıyı haritaya kurar (adedi düşer). */
export function placeHouse(s: GameState, item: string, x: number, z: number, rot: number, name: string, color: string): PlacedHouse | null {
  if ((s.items[item] ?? 0) <= 0) return null;
  s.items[item]--;
  const h: PlacedHouse = { uid: uid(), item, city: s.city, x, z, rot, name: name.trim() || itemById(item)!.name, color };
  s.houses.push(h);
  return h;
}

export function unlockCity(s: GameState, id: string): boolean {
  const c = CITIES.find(c => c.id === id);
  if (!c || !c.available || s.unlockedCities.includes(id)) return false;
  if (!pay(s, c.price)) return false;
  s.unlockedCities.push(id);
  return true;
}

/** Sürpriz paket: ağırlıklı kademe seç, kademeden ödül seç. rnd enjekte edilebilir (test). */
export function rollBox(boxId: string, rnd: () => number = Math.random): { rarity: string; reward: Reward } | null {
  const box = BOXES.find(b => b.id === boxId); if (!box) return null;
  const total = box.tiers.reduce((a, t) => a + t.chance, 0);
  let r = rnd() * total;
  let tier = box.tiers[box.tiers.length - 1];
  for (const t of box.tiers) { if (r < t.chance) { tier = t; break; } r -= t.chance; }
  const reward = tier.rewards[Math.floor(rnd() * tier.rewards.length) % tier.rewards.length];
  return { rarity: tier.rarity, reward };
}

export function openBox(s: GameState, boxId: string, now: number, rnd: () => number = Math.random): { rarity: string; reward: Reward; dup: boolean } | null {
  const box = BOXES.find(b => b.id === boxId); if (!box || !pay(s, box.price)) return null;
  const res = rollBox(boxId, rnd)!;
  s.stats.boxes++;
  let reward = res.reward, dup = false;
  if (reward.type === 'item' && (s.items[reward.id] ?? 0) > 0) { // kopya: jetona çevir
    dup = true; reward = { type: 'coin', amount: Math.max(50, Math.round((itemById(reward.id)!.price.coin ?? 400) * 0.5)) };
  }
  applyReward(s, reward, now);
  return { rarity: res.rarity, reward, dup };
}

export function applyReward(s: GameState, r: Reward, now: number): void {
  if (r.type === 'coin') s.coins += r.amount;
  else if (r.type === 'gem') s.gems += r.amount;
  else if (r.type === 'food') { regenFood(s, now); s.food = Math.min(FOOD_MAX, s.food + r.amount); if (s.food >= FOOD_MAX) s.foodTs = now; }
  else s.items[r.id] = (s.items[r.id] ?? 0) + 1;
}

// ---------- Kayıt ----------
export function migrate(raw: any, now: number): GameState {
  const base = newState(now);
  if (!raw || typeof raw !== 'object') return base;
  const s = { ...base, ...raw, look: { ...base.look, ...(raw.look ?? {}) }, stats: { ...base.stats, ...(raw.stats ?? {}) } } as GameState;
  s.v = SAVE_VERSION;
  s.garage = { ...base.garage, ...(raw.garage ?? {}) };
  s.shelter = { ...base.shelter, ...(raw.shelter ?? {}) };
  s.items = { ...(s.items ?? {}) }; if (!s.items.bisiklet) s.items.bisiklet = 1;   // bisiklet herkese ücretsiz
  // bilinmeyen ırk/ürün kalıntılarını temizle
  s.pets = (s.pets ?? []).filter(p => BREEDS.some(b => b.id === p.breed));
  s.items = Object.fromEntries(Object.entries(s.items ?? {}).filter(([k]) => ITEMS.some(i => i.id === k)));
  return s;
}

export function load(now: number): GameState {
  let raw: any = null;
  try { raw = JSON.parse(localStorage.getItem(SAVE_KEY) ?? 'null'); } catch { raw = null; }
  const s = migrate(raw, now);
  regenFood(s, now);
  return s;
}

export function save(s: GameState): void {
  try { localStorage.setItem(SAVE_KEY, JSON.stringify(s)); } catch { /* gizli sekme vb. */ }
}
