// Veteriner, barınak, günlük görevler ve XP kuralları (görselden bağımsız, test edilebilir).
import type { GameState } from './state';

export const VET_MS = 60 * 1000;          // tedavi süresi (reklamla anında biter)
export const VET_COIN = 40, VET_XP = 25;
export const CARE_COIN = 8, CARE_XP = 4;  // barınakta bir dosta günlük tam bakım (mama+su+sevgi)
export const SHELTER_CAP = [3, 5, 8, 12];
export const SHELTER_UPGRADE: number[] = [0, 600, 1500, 3500];  // seviye 2,3,4 için jeton
export const DECOR = [
  { id: 'dekor_oyuncak', name: 'Oyuncak seti', price: 300, desc: 'Bahçeye toplar ve oyuncaklar' },
  { id: 'dekor_cicek', name: 'Çiçek bahçesi', price: 250, desc: 'Çit boyunca saksılar' },
  { id: 'dekor_golgelik', name: 'Gölgelik', price: 700, desc: 'Bahçede serin bir gölgelik' },
];

export interface ShelterPet {
  uid: string; name: string; species: 'cat' | 'dog'; look: any; wear?: string; collar?: string;
  care: { day: string; fed: boolean; water: boolean; pet: boolean; paid: boolean };
}
export interface Treatment { id: string; name: string; look: any; readyAt: number }
export type QuestKind = 'feed' | 'water' | 'pet' | 'vet' | 'care' | 'ride';
export interface Quest { id: string; kind: QuestKind; text: string; target: number; progress: number; coins: number; gems: number; xp: number; claimed: boolean }

export const dayKey = (now: number) => { const d = new Date(now); return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`; };
export const level = (xp: number) => Math.floor(Math.sqrt(xp / 50)) + 1;
export const xpForLevel = (lv: number) => (lv - 1) ** 2 * 50;
export const shelterCap = (s: GameState) => SHELTER_CAP[Math.min(SHELTER_CAP.length - 1, s.shelter.level - 1)];

const POOL: Omit<Quest, 'id' | 'progress' | 'claimed'>[] = [
  { kind: 'feed', text: 'Bugün 3 sokak dostunu besle', target: 3, coins: 60, gems: 0, xp: 15 },
  { kind: 'vet', text: '1 hasta dostu veterinere götür', target: 1, coins: 100, gems: 1, xp: 30 },
  { kind: 'water', text: '2 dosta su ver', target: 2, coins: 40, gems: 0, xp: 10 },
  { kind: 'pet', text: '5 kez bir dostu sev', target: 5, coins: 30, gems: 0, xp: 10 },
  { kind: 'care', text: 'Barınakta 2 dosta tam bakım yap', target: 2, coins: 60, gems: 0, xp: 15 },
  { kind: 'ride', text: 'Araçla 500 m yol git', target: 500, coins: 50, gems: 0, xp: 10 },
];

/** Gün değiştiyse yeni 3 görev: besleme + veteriner + günün değişen üçüncüsü. */
export function ensureQuests(s: GameState, now: number) {
  const day = dayKey(now);
  if (s.quests.day === day && s.quests.list.length) return;
  const n = [...day].reduce((a, c) => a + c.charCodeAt(0), 0);
  const third = POOL[2 + (n % (POOL.length - 2))];
  s.quests = { day, list: [POOL[0], POOL[1], third].map((q, i) => ({ ...q, id: `${day}-${i}`, progress: 0, claimed: false })) };
}
export function questProgress(s: GameState, kind: QuestKind, amount: number, now: number) {
  ensureQuests(s, now);
  for (const q of s.quests.list) if (q.kind === kind && !q.claimed) q.progress = Math.min(q.target, q.progress + amount);
}
export function claimQuest(s: GameState, id: string): Quest | null {
  const q = s.quests.list.find(q => q.id === id);
  if (!q || q.claimed || q.progress < q.target) return null;
  q.claimed = true; s.coins += q.coins; s.gems += q.gems; s.xp += q.xp;
  return q;
}
export const claimable = (s: GameState) => s.quests.list.filter(q => !q.claimed && q.progress >= q.target).length;

// ---------- veteriner ----------
export function admit(s: GameState, id: string, name: string, look: any, now: number) {
  s.treatments.push({ id, name, look, readyAt: now + VET_MS });
  questProgress(s, 'vet', 1, now);
}
export function speedUp(s: GameState, id: string, now: number) { const t = s.treatments.find(t => t.id === id); if (t) t.readyAt = now; }
/** Hazır tedaviyi teslim al: jeton + XP. toShelter ise barınağa (yer varsa) katılır. */
export function discharge(s: GameState, id: string, toShelter: boolean, now: number): { ok: boolean; reason?: string; pet?: ShelterPet } {
  const i = s.treatments.findIndex(t => t.id === id); if (i < 0) return { ok: false };
  const t = s.treatments[i]; if (t.readyAt > now) return { ok: false, reason: 'Tedavi sürüyor' };
  if (toShelter && s.shelter.animals.length >= shelterCap(s)) return { ok: false, reason: 'Barınak dolu. Büyüt ya da sokağa bırak' };
  s.treatments.splice(i, 1);
  s.coins += VET_COIN; s.xp += VET_XP;
  if (!toShelter) return { ok: true };
  const pet: ShelterPet = { uid: t.id + '_' + now.toString(36), name: t.name, species: t.look?.species ?? 'cat', look: t.look, care: { day: '', fed: false, water: false, pet: false, paid: false } };
  s.shelter.animals.push(pet);
  return { ok: true, pet };
}

// ---------- barınak ----------
/** Günlük bakım adımı. Üçü de tamamlanınca o gün bir kez jeton + XP. */
export function care(s: GameState, uid: string, what: 'fed' | 'water' | 'pet', now: number): { done: boolean; paid: number } {
  const p = s.shelter.animals.find(a => a.uid === uid); if (!p) return { done: false, paid: 0 };
  const day = dayKey(now);
  if (p.care.day !== day) p.care = { day, fed: false, water: false, pet: false, paid: false };
  if (p.care[what]) return { done: false, paid: 0 };
  p.care[what] = true;
  if (p.care.fed && p.care.water && p.care.pet && !p.care.paid) {
    p.care.paid = true; s.coins += CARE_COIN; s.xp += CARE_XP; questProgress(s, 'care', 1, now);
    return { done: true, paid: CARE_COIN };
  }
  return { done: true, paid: 0 };
}
export const needsCare = (p: ShelterPet, now: number) => p.care.day !== dayKey(now) || !p.care.paid;
export function upgradeShelter(s: GameState): boolean {
  const next = s.shelter.level; const cost = SHELTER_UPGRADE[next];
  if (cost === undefined || s.coins < cost) return false;
  s.coins -= cost; s.shelter.level++; return true;
}
export function buyDecor(s: GameState, id: string): boolean {
  const d = DECOR.find(d => d.id === id); if (!d || s.shelter.decor.includes(id) || s.coins < d.price) return false;
  s.coins -= d.price; s.shelter.decor.push(id); return true;
}
