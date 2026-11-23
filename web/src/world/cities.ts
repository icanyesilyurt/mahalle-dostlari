// Şehir kayıt defteri. Yeni şehir: bir CityDef + bir build fonksiyonu (world/<şehir>.ts) eklemek yeterli.
import type { Price } from '../core/catalog';

export interface CityDef {
  id: string;
  name: string;
  country: string;
  price: Price;        // jetonla açılır
  available: boolean;  // içerik hazır mı
  accent: string;      // kart rengi
  tagline: string;
}

export const CITIES: CityDef[] = [
  { id: 'istanbul', name: 'İstanbul', country: 'Türkiye', price: {}, available: true, accent: '#e07a5f', tagline: 'Cumbalı evler, simit, çay ve Boğaz' },
  { id: 'roma', name: 'Roma', country: 'İtalya', price: { coin: 2000 }, available: false, accent: '#d9a25a', tagline: 'Yakında' },
  { id: 'paris', name: 'Paris', country: 'Fransa', price: { coin: 2500 }, available: false, accent: '#7c8dc7', tagline: 'Yakında' },
  { id: 'londra', name: 'Londra', country: 'İngiltere', price: { coin: 3000 }, available: false, accent: '#c8423a', tagline: 'Yakında' },
  { id: 'barselona', name: 'Barselona', country: 'İspanya', price: { coin: 3500 }, available: false, accent: '#e8b53a', tagline: 'Yakında' },
  { id: 'newyork', name: 'New York', country: 'ABD', price: { coin: 4500 }, available: false, accent: '#4f86c6', tagline: 'Yakında' },
  { id: 'tokyo', name: 'Tokyo', country: 'Japonya', price: { coin: 5000 }, available: false, accent: '#e98aa0', tagline: 'Yakında' },
  { id: 'pekin', name: 'Pekin', country: 'Çin', price: { coin: 5500 }, available: false, accent: '#b23a3a', tagline: 'Yakında' },
];
