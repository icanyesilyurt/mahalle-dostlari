// Oyun kataloğu: ırklar, mağaza ürünleri, sürpriz paketler.
// Yeni ürün eklemek = bu dosyaya bir satır eklemek. Mantık katmanı başka bir şey bilmez.

export type Currency = 'coin' | 'gem';
export interface Price { coin?: number; gem?: number }

export type Species = 'cat' | 'dog';
export type Pattern = 'solid' | 'tabby' | 'tuxedo' | 'calico' | 'points' | 'spots' | 'saddle' | 'mask';

/** Görünüm parametreleri: pet modeli bunlardan üretilir. */
export interface BreedLook {
  size: number;      // genel ölçek
  body: string;      // ana renk
  belly: string;     // karın/göğüs
  mark?: string;     // desen rengi
  pattern: Pattern;
  legs?: number;     // bacak uzunluğu çarpanı
  long?: number;     // gövde uzunluğu
  head?: number;     // kafa ölçeği
  ears?: number;     // kulak ölçeği
  floppy?: boolean;  // sarkık kulak (köpek)
  fluff?: number;    // tüylülük (0-1)
  tail?: number;     // kuyruk uzunluğu
  eyes?: string;
  snout?: number;    // burun uzunluğu (köpek)
}

export interface Breed { id: string; species: Species; name: string; price: Price; look: BreedLook }

const C = (id: string, name: string, price: Price, look: Partial<BreedLook> & Pick<BreedLook, 'body' | 'pattern'>): Breed =>
  ({ id, species: 'cat', name, price, look: { size: 1, belly: '#f4efe6', ...look } });
const D = (id: string, name: string, price: Price, look: Partial<BreedLook> & Pick<BreedLook, 'body' | 'pattern'>): Breed =>
  ({ id, species: 'dog', name, price, look: { size: 1, belly: '#f4ead8', ...look } });

export const BREEDS: Breed[] = [
  // Kediler (eski Godot kataloğundan uyarlandı)
  C('tekir', 'Tekir', { coin: 500 }, { body: '#8d8f94', mark: '#4a4c51', pattern: 'tabby', eyes: '#c9b23a' }),
  C('sarman', 'Sarman', { coin: 500 }, { body: '#e9a24c', mark: '#b5651f', belly: '#f7e2c2', pattern: 'tabby', eyes: '#d8a020' }),
  C('smokin', 'Smokin', { coin: 600 }, { body: '#2a2727', belly: '#f4f1ea', pattern: 'tuxedo', eyes: '#9ccf5a' }),
  C('uc_renk', 'Üç Renkli', { coin: 700 }, { body: '#f4f0e8', mark: '#e38a3a', belly: '#f8f4ee', pattern: 'calico', eyes: '#d8a020' }),
  C('kara', 'Kara Kedi', { coin: 500 }, { body: '#262424', belly: '#2f2c2c', pattern: 'solid', eyes: '#e8b53a' }),
  C('van', 'Van Kedisi', { coin: 1200 }, { body: '#f8f6f0', belly: '#ffffff', pattern: 'solid', fluff: 0.5, size: 1.1, eyes: '#6fb3d6' }),
  C('siyam', 'Siyam', { coin: 1100 }, { body: '#efe2c8', mark: '#4a3428', pattern: 'points', ears: 1.2, size: 0.95, eyes: '#5aa8e8' }),
  C('british', 'British Shorthair', { coin: 1300 }, { body: '#8e97a3', belly: '#9aa3ae', pattern: 'solid', head: 1.15, ears: 0.8, size: 1.1, eyes: '#e8a43a' }),
  C('maine_coon', 'Maine Coon', { gem: 25 }, { body: '#8a6a4a', mark: '#4a3424', pattern: 'tabby', size: 1.35, fluff: 0.9, tail: 1.3, eyes: '#c9a03a' }),
  C('munchkin', 'Munchkin', { gem: 20 }, { body: '#d8a874', mark: '#9a6a3c', pattern: 'tabby', legs: 0.55, eyes: '#9ccf5a' }),
  // Köpekler
  D('sokak', 'Sokak Köpeği', { coin: 500 }, { body: '#d9b46a', belly: '#f0e2c0', pattern: 'solid', size: 1.05 }),
  D('kangal', 'Kangal', { coin: 1500 }, { body: '#d8c39a', belly: '#ece0c4', mark: '#2a2422', pattern: 'mask', size: 1.4, floppy: true, head: 1.1 }),
  D('golden', 'Golden Retriever', { coin: 1200 }, { body: '#d9a25a', belly: '#ecc888', pattern: 'solid', size: 1.2, floppy: true, tail: 1.3, fluff: 0.5 }),
  D('beagle', 'Beagle', { coin: 800 }, { body: '#a8662e', belly: '#f4eee2', mark: '#2a2422', pattern: 'saddle', size: 0.85, floppy: true, ears: 1.2 }),
  D('dalmacyali', 'Dalmaçyalı', { coin: 1000 }, { body: '#f4f2ec', belly: '#f8f6f0', mark: '#1f1c1b', pattern: 'spots', size: 1.15, floppy: true }),
  D('corgi', 'Corgi', { coin: 1100 }, { body: '#d9893a', belly: '#f6eee2', pattern: 'solid', legs: 0.55, long: 1.15, ears: 1.35, tail: 0.4, head: 1.1 }),
  D('husky', 'Husky', { gem: 25 }, { body: '#5d6066', belly: '#f2f0ea', pattern: 'mask', mark: '#f2f0ea', size: 1.15, fluff: 0.4, eyes: '#6fb3d6' }),
  D('pug', 'Pug', { gem: 15 }, { body: '#d9c09a', belly: '#e6d2b0', mark: '#2a2422', pattern: 'mask', size: 0.75, head: 1.35, floppy: true, snout: 0.4 }),
];

export const breedById = (id: string) => BREEDS.find(b => b.id === id);

// ---------- Mağaza ürünleri ----------
export type ItemKind = 'house' | 'outfit' | 'hat' | 'petwear' | 'collar' | 'ball';
export interface Item { id: string; kind: ItemKind; name: string; price: Price; color: string; color2?: string; rarity?: Rarity; desc?: string }
export type Rarity = 'common' | 'rare' | 'epic' | 'legendary';

export const ITEMS: Item[] = [
  // Yapılar (satın alınıp haritaya kurulur, isim/renk verilir)
  { id: 'kedi_evi', kind: 'house', name: 'Kedi Evi', price: { coin: 300 }, color: '#e07a5f', desc: 'Sokak kedileri için sıcak bir yuva' },
  { id: 'kopek_kulubesi', kind: 'house', name: 'Köpek Kulübesi', price: { coin: 400 }, color: '#7a9e7e', desc: 'Çatılı ahşap kulübe' },
  // Karakter kıyafeti
  { id: 'tisort_mercan', kind: 'outfit', name: 'Mercan Tişört', price: { coin: 0 }, color: '#f07f6a', rarity: 'common' },
  { id: 'kazak_hardal', kind: 'outfit', name: 'Hardal Kazak', price: { coin: 250 }, color: '#e0a53b', rarity: 'common' },
  { id: 'yagmurluk', kind: 'outfit', name: 'Sarı Yağmurluk', price: { coin: 450 }, color: '#f2c94c', color2: '#2f5d62', rarity: 'rare' },
  { id: 'hirka_mavi', kind: 'outfit', name: 'Boğaz Mavisi Hırka', price: { gem: 8 }, color: '#4f86c6', color2: '#f4efe6', rarity: 'epic' },
  // Şapka / aksesuar
  { id: 'kasket', kind: 'hat', name: 'Kasket', price: { coin: 200 }, color: '#6b4f3a', rarity: 'common' },
  { id: 'bere', kind: 'hat', name: 'Örgü Bere', price: { coin: 300 }, color: '#c8423a', color2: '#f4efe6', rarity: 'rare' },
  { id: 'hasir', kind: 'hat', name: 'Hasır Şapka', price: { coin: 400 }, color: '#e8c987', color2: '#c8423a', rarity: 'rare' },
  { id: 'kedi_kulak', kind: 'hat', name: 'Kedi Kulaklı Bere', price: { gem: 10 }, color: '#f2a7b8', rarity: 'epic' },
  // Pet kıyafeti ve tasma
  { id: 'yelek_kirmizi', kind: 'petwear', name: 'Kırmızı Yelek', price: { coin: 200 }, color: '#d64545', rarity: 'common' },
  { id: 'kazak_cizgili', kind: 'petwear', name: 'Çizgili Kazak', price: { coin: 350 }, color: '#3b6aa8', color2: '#f4efe6', rarity: 'rare' },
  { id: 'tasma_mavi', kind: 'collar', name: 'Mavi Tasma', price: { coin: 100 }, color: '#3b8ed6', rarity: 'common' },
  { id: 'tasma_canli', kind: 'collar', name: 'Çıngıraklı Tasma', price: { coin: 250 }, color: '#d64545', color2: '#f2c94c', rarity: 'rare' },
  { id: 'tasma_altin', kind: 'collar', name: 'Altın Tasma', price: { gem: 6 }, color: '#e8b53a', rarity: 'epic' },
  // Oyun topları
  { id: 'top_kirmizi', kind: 'ball', name: 'Kırmızı Top', price: { coin: 80 }, color: '#e2493b', rarity: 'common' },
  { id: 'top_tenis', kind: 'ball', name: 'Tenis Topu', price: { coin: 150 }, color: '#d8e84a', rarity: 'common' },
  { id: 'top_plaj', kind: 'ball', name: 'Plaj Topu', price: { coin: 300 }, color: '#3b8ed6', color2: '#f2c94c', rarity: 'rare' },
  { id: 'top_yildiz', kind: 'ball', name: 'Yıldızlı Top', price: { gem: 5 }, color: '#9a5ac8', color2: '#f2c94c', rarity: 'legendary' },
];

export const itemById = (id: string) => ITEMS.find(i => i.id === id);

// ---------- Sürpriz paketler ----------
export type Reward =
  | { type: 'coin'; amount: number }
  | { type: 'gem'; amount: number }
  | { type: 'food'; amount: number }
  | { type: 'item'; id: string };

export interface BoxTier { rarity: Rarity; chance: number; rewards: Reward[] }
export interface MysteryBox { id: string; name: string; price: Price; color: string; tiers: BoxTier[] }

export const BOXES: MysteryBox[] = [
  {
    id: 'mahalle_paketi', name: 'Mahalle Paketi', price: { coin: 250 }, color: '#e07a5f',
    tiers: [
      { rarity: 'common', chance: 60, rewards: [{ type: 'coin', amount: 150 }, { type: 'food', amount: 5 }, { type: 'item', id: 'tasma_mavi' }, { type: 'item', id: 'top_kirmizi' }] },
      { rarity: 'rare', chance: 30, rewards: [{ type: 'item', id: 'bere' }, { type: 'item', id: 'kazak_cizgili' }, { type: 'item', id: 'tasma_canli' }, { type: 'item', id: 'top_plaj' }] },
      { rarity: 'epic', chance: 9, rewards: [{ type: 'item', id: 'kedi_kulak' }, { type: 'item', id: 'tasma_altin' }, { type: 'gem', amount: 10 }] },
      { rarity: 'legendary', chance: 1, rewards: [{ type: 'item', id: 'top_yildiz' }, { type: 'gem', amount: 40 }] },
    ],
  },
];

export const RARITY_LABEL: Record<Rarity, string> = { common: 'Yaygın', rare: 'Nadir', epic: 'Epik', legendary: 'Efsane' };
export const RARITY_COLOR: Record<Rarity, string> = { common: '#8fb996', rare: '#4f86c6', epic: '#9a5ac8', legendary: '#e8a83a' };
