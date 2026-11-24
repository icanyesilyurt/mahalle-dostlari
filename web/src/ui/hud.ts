// Arayüz: üst bar, kenar butonları, eylem butonları, paneller (Harita, Petlerim, Mağaza, Ev), modallar, bildirimler.
import * as THREE from 'three';
import { BOXES, BREEDS, ITEMS, Item, ItemKind, Price, RARITY_COLOR, RARITY_LABEL, Reward, breedById, itemById } from '../core/catalog';
import { FOOD_MAX, WATER_MAX, adoptPet, buyItem, canAfford, msToFull, msToNextFood, openBox, placeHouse, refillFoodByAd, regenFood, save, unlockCity } from '../core/state';
import { CITIES } from '../world/cities';
import { HOUSE_COLORS } from '../world/pethouse';
import type { Game } from '../game/game';
import { petThumb } from '../game/thumbs';
import { TestAdProvider, AdProvider } from '../core/ads';
import { I } from './icons';
import { HAIR_STYLES, Human } from '../actors/human';
import { CARE_COIN, DECOR, SHELTER_UPGRADE, VET_COIN, buyDecor, care, claimQuest, claimable, discharge, dayKey, ensureQuests, level, shelterCap, speedUp, upgradeShelter, xpForLevel } from '../core/care';
import { petThumbLook } from '../game/thumbs';
import { haptic, setMuted, sfx } from './sfx';

const $ = <T extends HTMLElement = HTMLElement>(s: string) => document.querySelector(s) as T;
const esc = (s: string) => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
const fmt = (ms: number) => { const s = Math.ceil(ms / 1000); const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), ss = s % 60; return h ? `${h}:${String(m).padStart(2, '0')}:${String(ss).padStart(2, '0')}` : `${m}:${String(ss).padStart(2, '0')}`; };
const priceHtml = (p: Price) => (p.gem ? `<span class="price gem">${I.gem}${p.gem}</span>` : `<span class="price">${I.coin}${p.coin ?? 0}</span>`);
const priceFree = (p: Price) => !p.coin && !p.gem;

export function itemIcon(it: Item): string {
  switch (it.kind) {
    case 'outfit': return I.shirt(it.color);
    case 'hat': return I.hat(it.color);
    case 'collar': return I.collar(it.color);
    case 'petwear': return I.vest(it.color);
    case 'ball': return I.ballC(it.color, it.color2);
    case 'house': return I.houseC(it.color);
    case 'vehicle': return `<span class="emo">${({ bisiklet: '🚲', scooter: '🛵', pikap: '🛻' } as Record<string, string>)[it.id] ?? '🚗'}</span>`;
    case 'paint': return `<span class="swatch big" style="background:${it.color}"></span>`;
    case 'vacc': return `<span class="emo">${({ aks_bayrak: '🚩', aks_cicek: '🌸', aks_zil: '🔔' } as Record<string, string>)[it.id] ?? '✨'}</span>`;
  }
}

export class Hud {
  private game!: Game;
  private sheetOpen: string | null = null;
  private tab: Record<string, string> = { shop: 'vehicle', pets: 'mine', home: 'wardrobe', map: 'hood' };
  private ads: AdProvider;

  constructor() {
    this.ads = new TestAdProvider(sec => this.fakeAd(sec));
  }

  bind(game: Game) {
    this.game = game;
    const s = game.state;
    setMuted(s.muted);
    document.querySelectorAll<HTMLElement>('[data-icon]').forEach(el => { el.insertAdjacentHTML('afterbegin', (I as any)[el.dataset.icon!]); });
    // basınca hafif büyüme + ses + titreşim (tüm butonlar)
    document.addEventListener('pointerdown', e => { const b = (e.target as HTMLElement).closest('button'); if (b && !b.disabled) { sfx.tap(); haptic(8); } }, true);

    $('#btnFood').onclick = () => game.feed();
    $('#btnWater').onclick = () => game.water();
    $('#btnPet').onclick = () => game.pet();
    $('#btnBall').onclick = () => game.throwBall();
    $('#btnRide').onclick = () => game.toggleRide();
    $('#btnSpot').onclick = () => game.spotAction();
    $('#callBtn').onclick = () => game.callVehicle();
    $('#nav-quests').onclick = () => this.sheetOpen === 'quests' ? this.close() : this.open('quests');
    setInterval(() => { if (this.sheetOpen === 'vet') this.render(); this.questDot(); }, 1000);
    $('#foodPill').onclick = () => this.foodModal();
    $('#coinPlus').onclick = () => this.open('shop', 'box');
    $('#gemPlus').onclick = () => this.open('shop', 'gem');
    $('#muteBtn').onclick = () => { s.muted = !s.muted; setMuted(s.muted); save(s); this.sync(); };
    for (const id of ['map', 'pets', 'shop', 'home']) $(`#nav-${id}`).onclick = () => this.sheetOpen === id ? this.close() : this.open(id);
    $('#sheetClose').onclick = () => this.close();
    $('#scrim').onclick = () => this.close();
    $('#plRotate').onclick = () => game.rotatePlacing();
    $('#plCancel').onclick = () => { game.cancelPlacing(); this.placeMode(false); };
    $('#plOk').onclick = () => this.confirmPlace();
    setInterval(() => this.tick(), 500);
    this.sync();
  }

  // ---------- canlı değerler ----------
  tick() {
    const s = this.game.state, n = Date.now();
    const before = s.food;
    regenFood(s, n);
    if (s.food !== before) { save(s); this.sync(); }
    $('#foodT').textContent = s.food >= FOOD_MAX ? 'dolu' : `+1 ${fmt(msToNextFood(s, n))}`;
    if (this.sheetOpen === 'map' && this.tab.map === 'hood') this.drawMinimap();
    const fm = document.getElementById('foodModalT');
    if (fm) fm.textContent = s.food >= FOOD_MAX ? 'Stok dolu!' : `Sonraki mama ${fmt(msToNextFood(s, n))} · tam dolum ${fmt(msToFull(s, n))}`;
  }

  sync() {
    const s = this.game.state;
    $('#foodN').textContent = `${s.food}/${FOOD_MAX}`;
    $('#coinN').textContent = s.coins.toLocaleString('tr-TR');
    $('#gemN').textContent = String(s.gems);
    $('#waterN').textContent = `${s.water}/${WATER_MAX}`;
    $('#foodBadge').textContent = String(s.food);
    $('#foodPill').classList.toggle('low', s.food <= 2);
    $('#muteBtn').innerHTML = s.muted ? I.mute : I.sound;
    this.nearChanged();
    if (this.sheetOpen) this.render();
  }

  nearChanged() {
    const g = this.game; const s = g.near; const n = Date.now();
    const hungry = !!s && s.hungryAt <= n, thirsty = !!s && s.thirstyAt <= n;
    $('#btnFood').classList.toggle('glow', hungry && g.state.food > 0);
    $('#btnWater').classList.toggle('glow', (thirsty && g.state.water > 0) || g.nearFountain);
    $('#btnWater').querySelector('.lbl')!.textContent = g.nearFountain ? 'Doldur' : 'Su';
    $('#btnPet').classList.toggle('show', !!s || !!g.nearCompanion);
    $('#btnBall').classList.toggle('show', g.canThrow() && !s && !g.riding);
    const sp = $('#btnSpot'); sp.classList.toggle('show', !!g.spot);
    if (g.spot) { sp.querySelector('.lbl')!.textContent = g.spot.label; sp.querySelector('.spotico')!.textContent = g.spot.icon; }
    $('#callBtn').textContent = ({ bisiklet: '🚲', scooter: '🛵', pikap: '🛻' } as Record<string, string>)[g.state.garage.active] ?? '🚲';
    const rb = $('#btnRide'); rb.classList.toggle('show', g.nearVehicle || g.riding);
    rb.querySelector('.lbl')!.textContent = g.riding ? 'İn' : 'Bin';
    rb.querySelector('.rideico')!.textContent = ({ bisiklet: '🚲', scooter: '🛵', pikap: '🛻' } as Record<string, string>)[g.state.garage.active] ?? '🚲';
  }

  // ---------- bildirimler ----------
  toast(msg: string) {
    const t = document.createElement('div'); t.className = 'toast'; t.textContent = msg;
    $('#toasts').appendChild(t);
    while ($('#toasts').children.length > 2) $('#toasts').firstElementChild!.remove();
    setTimeout(() => t.classList.add('out'), 2300); setTimeout(() => t.remove(), 2700);
  }

  reward(coins: number, gems: number, at: THREE.Vector3) {
    const p = this.game.screenOf(at);
    const fly = (html: string, target: string, delay: number, sound: () => void) => setTimeout(() => {
      const el = document.createElement('div'); el.className = 'floater'; el.innerHTML = html;
      el.style.left = `${p.x}px`; el.style.top = `${p.y}px`; $('#fx').appendChild(el);
      const tr = $(target).getBoundingClientRect();
      requestAnimationFrame(() => {
        el.animate([
          { transform: 'translate(-50%,-50%) scale(.6)', opacity: 0 },
          { transform: 'translate(-50%,-140%) scale(1.15)', opacity: 1, offset: 0.3 },
          { transform: `translate(${tr.left + tr.width / 2 - p.x - 20}px, ${tr.top + tr.height / 2 - p.y}px) scale(.5)`, opacity: 0.9 },
        ], { duration: 1100, easing: 'cubic-bezier(.4,.1,.3,1)' }).onfinish = () => { el.remove(); sound(); $(target).animate([{ transform: 'scale(1)' }, { transform: 'scale(1.18)' }, { transform: 'scale(1)' }], { duration: 260 }); };
      });
    }, delay);
    if (coins) fly(`${I.coin}<b>+${coins}</b>`, '#coinPill', 0, sfx.coin);
    if (gems) fly(`${I.gem}<b>+${gems}</b>`, '#gemPill', 350, sfx.gem);
  }

  hearts(at: THREE.Vector3) {
    const p = this.game.screenOf(at);
    for (let i = 0; i < 4; i++) {
      const el = document.createElement('div'); el.className = 'heartfx'; el.innerHTML = I.heart;
      el.style.left = `${p.x + (Math.random() - 0.5) * 40}px`; el.style.top = `${p.y}px`; $('#fx').appendChild(el);
      el.animate([{ transform: 'translate(-50%,0) scale(.3)', opacity: 0 }, { transform: `translate(-50%,-30px) scale(1)`, opacity: 1, offset: 0.3 }, { transform: `translate(${(Math.random() - 0.5) * 60 - 20}px,-110px) scale(.8)`, opacity: 0 }], { duration: 1300 + i * 150, delay: i * 120, easing: 'ease-out', fill: 'backwards' }).onfinish = () => el.remove();
    }
  }

  // ---------- paneller ----------
  open(id: string, tab?: string) {
    if (this.game.placing) return;
    if (tab) this.tab[id] = tab;
    this.sheetOpen = id; sfx.open();
    document.body.classList.add('sheet-open');
    document.querySelectorAll('.side button').forEach(b => b.classList.toggle('on', b.id === `nav-${id}`));
    this.render();
  }
  close() {
    if (!this.sheetOpen) return;
    this.sheetOpen = null; sfx.close();
    document.body.classList.remove('sheet-open');
    document.querySelectorAll('.side button').forEach(b => b.classList.remove('on'));
  }

  private tabs(id: string, list: [string, string][]) {
    return `<div class="tabs">${list.map(([k, l]) => `<button class="tab ${this.tab[id] === k ? 'on' : ''}" data-tab="${k}">${l}</button>`).join('')}</div>`;
  }

  render() {
    const id = this.sheetOpen; if (!id) return;
    const body = $('#sheetBody'), title = $('#sheetTitle');
    const scroll = body.querySelector('.grid, .list, .mapwrap')?.scrollTop ?? 0;
    const s = this.game.state;
    let html = '';
    if (id === 'map') {
      title.innerHTML = `${I.map}<span>Harita</span>`;
      html = this.tabs('map', [['hood', 'Mahalle'], ['cities', 'Şehirler']]);
      if (this.tab.map === 'hood') {
        const hungry = this.game.strays.filter(x => x.hungryAt <= Date.now()).length;
        html += `<div class="mapwrap"><canvas id="minimap" width="520" height="858"></canvas><div class="legend"><span><i class="dot me"></i>Sen</span><span><i class="dot hungry"></i>Aç dost (${hungry})</span><span><i class="dot ok"></i>Tok dost</span><span><i class="dot fnt"></i>Çeşme</span></div></div>`;
      } else {
        html += `<div class="grid cities">${CITIES.map(c => {
          const here = s.city === c.id, unlocked = s.unlockedCities.includes(c.id);
          const btn = here ? `<span class="chip ok">Buradasın</span>` : !c.available ? `<span class="chip soon">Yakında</span>${priceHtml(c.price)}` : unlocked ? `<button class="btn" data-city="${c.id}">Git</button>` : `<button class="btn" data-unlock="${c.id}" ${canAfford(s, c.price) ? '' : 'disabled'}>Aç ${priceHtml(c.price)}</button>`;
          return `<div class="card city ${c.available ? '' : 'locked'}" style="--ac:${c.accent}"><div class="cityart"><b>${c.name}</b><small>${c.country}</small>${!c.available ? `<div class="lockico">${I.lock}</div>` : ''}</div><p>${c.tagline}</p><div class="row">${btn}</div></div>`;
        }).join('')}</div>`;
      }
    } else if (id === 'pets') {
      title.innerHTML = `${I.paw}<span>Petlerim</span>`;
      html = this.tabs('pets', [['mine', `Dostlarım (${s.pets.length})`], ['adopt', 'Sahiplen']]);
      if (this.tab.pets === 'mine') {
        if (!s.pets.length) html += `<div class="empty">${I.paw}<p>Henüz sahiplendiğin bir dost yok.<br>Sokaktakileri besleyip jeton biriktir, sonra <b>Sahiplen</b> sekmesinden bir dost edin.</p><button class="btn" data-tab="adopt">Sahiplen</button></div>`;
        html += `<div class="list">${s.pets.map(p => {
          const b = breedById(p.breed)!; const active = s.activePet === p.uid;
          const house = s.houses.find(h => h.uid === p.house);
          const wearables = ITEMS.filter(i => (i.kind === 'petwear' || i.kind === 'collar') && (s.items[i.id] ?? 0) > 0);
          return `<div class="card pet"><img src="${petThumb(p.breed, { wear: p.wear, collar: p.collar })}" alt=""><div class="info"><b>${esc(p.name)}</b><small>${b.name}${house ? ` · 🏠 ${esc(house.name)}` : ''}</small>
            <div class="row wrap">${active ? `<span class="chip ok">Yanında</span>` : `<button class="btn sm" data-walk="${p.uid}">Yanıma çağır</button>`}
            ${house && active ? `<button class="btn sm ghost" data-tohome="${p.uid}">Evine gönder</button>` : ''}</div>
            ${wearables.length ? `<div class="gear">${wearables.map(i => `<button class="gearbtn ${p.wear === i.id || p.collar === i.id ? 'on' : ''}" data-gear="${p.uid}|${i.id}" title="${i.name}">${itemIcon(i)}</button>`).join('')}</div>` : `<small class="hint">Mağazadan kıyafet ve tasma alıp giydirebilirsin.</small>`}
          </div></div>`;
        }).join('')}</div>`;
      } else {
        html += `<div class="grid">${BREEDS.map(b => `<div class="card shopitem"><img src="${petThumb(b.id)}" alt=""><b>${b.name}</b><small>${b.species === 'cat' ? 'Kedi' : 'Köpek'}</small><button class="btn" data-adopt="${b.id}" ${canAfford(s, b.price) ? '' : 'disabled'}>${priceHtml(b.price)}</button></div>`).join('')}</div>`;
      }
    } else if (id === 'shop') {
      title.innerHTML = `${I.shop}<span>Mağaza</span>`;
      html = this.tabs('shop', [['vehicle', 'Araçlar'], ['house', 'Yuvalar'], ['outfit', 'Kıyafet'], ['hat', 'Şapka'], ['petwear', 'Pet Giyim'], ['ball', 'Toplar'], ['box', 'Sürpriz'], ['gem', 'Elmas']]);
      const t = this.tab.shop;
      if (t === 'vehicle') {
        const G = s.garage, act = G.active;
        const owned = (k: ItemKind) => ITEMS.filter(i => i.kind === k && (s.items[i.id] ?? 0) > 0);
        html += `<div class="card"><b>Garaj</b><small>Etkin araç haritada yanına park edilir. Yakınındayken <b>Bin</b> butonu çıkar.</small><div class="gear">${owned('vehicle').map(i => `<button class="btn ${act === i.id ? '' : 'ghost'}" data-veh="${i.id}">${itemIcon(i)} ${i.name}</button>`).join('')}</div>
          <b>Renk</b><div class="gear">${owned('paint').map(i => `<button class="swatch ${(G.color[act] ?? '') === i.color ? 'on' : ''}" style="background:${i.color}" data-paint="${i.color}" title="${i.name}"></button>`).join('') || '<small>Aşağıdan boya al</small>'}</div>
          <b>Aksesuar</b><div class="gear">${owned('vacc').map(i => `<button class="btn sm ${(G.acc[act] ?? []).includes(i.id) ? '' : 'ghost'}" data-vacc="${i.id}">${itemIcon(i)} ${i.name}</button>`).join('') || '<small>Aşağıdan aksesuar al</small>'}</div></div>`;
        html += `<div class="grid">${ITEMS.filter(i => ['vehicle', 'paint', 'vacc'].includes(i.kind) && !priceFree(i.price)).map(i => {
          const own = s.items[i.id] ?? 0;
          const btn = own ? `<span class="chip ok">Sende var</span>` : `<button class="btn" data-buy="${i.id}" ${canAfford(s, i.price) ? '' : 'disabled'}>${priceHtml(i.price)}</button>`;
          return `<div class="card shopitem" ${i.rarity ? `style="--rc:${RARITY_COLOR[i.rarity]}"` : ''}>${i.rarity ? `<span class="rar">${RARITY_LABEL[i.rarity]}</span>` : ''}<div class="ico">${itemIcon(i)}</div><b>${i.name}</b>${i.desc ? `<small>${i.desc}</small>` : ''}${btn}</div>`;
        }).join('')}</div>`;
      } else if (t === 'box') {
        html += `<div class="list">${BOXES.map(bx => `<div class="card box" style="--ac:${bx.color}"><div class="boxart">${I.gift}</div><div class="info"><b>${bx.name}</b><small>Oyun içi jetonla açılır. Sahip olduğun eşya çıkarsa jetona dönüşür.</small>
          <table class="odds">${bx.tiers.map(ti => `<tr><td><i style="background:${RARITY_COLOR[ti.rarity]}"></i>${RARITY_LABEL[ti.rarity]}</td><td>%${ti.chance}</td><td class="r">${ti.rewards.map(rw => this.rewardName(rw)).join(', ')}</td></tr>`).join('')}</table>
          <button class="btn big" data-box="${bx.id}" ${canAfford(s, bx.price) ? '' : 'disabled'}>Aç ${priceHtml(bx.price)}</button></div></div>`).join('')}</div>`;
      } else if (t === 'gem') {
        html += `<div class="empty">${I.gem}<p><b>Elmas</b> premium para birimidir. Nadir petler ve özel eşyalar elmasla açılır.<br>Elmas paketleri yayına yakın eklenecek. Şimdilik yeni dost edindiğinde ve sürpriz paketlerden elmas kazanırsın.</p></div>
          <div class="grid">${[[80, '₺—'], [250, '₺—'], [600, '₺—']].map(([n, p]) => `<div class="card shopitem dim"><div class="ico">${I.gem}</div><b>${n} Elmas</b><button class="btn" disabled>${p}</button></div>`).join('')}</div>`;
      } else {
        const kinds: ItemKind[] = t === 'petwear' ? ['petwear', 'collar'] : [t as ItemKind];
        html += `<div class="grid">${ITEMS.filter(i => kinds.includes(i.kind) && !priceFree(i.price)).map(i => {
          const own = s.items[i.id] ?? 0;
          const btn = i.kind === 'house' ? `<button class="btn" data-buy="${i.id}" ${canAfford(s, i.price) ? '' : 'disabled'}>${priceHtml(i.price)}</button>${own ? `<small class="own">Envanterde: ${own}</small>` : ''}`
            : own ? `<span class="chip ok">Sende var</span>` : `<button class="btn" data-buy="${i.id}" ${canAfford(s, i.price) ? '' : 'disabled'}>${priceHtml(i.price)}</button>`;
          return `<div class="card shopitem" ${i.rarity ? `style="--rc:${RARITY_COLOR[i.rarity]}"` : ''}>${i.rarity ? `<span class="rar">${RARITY_LABEL[i.rarity]}</span>` : ''}<div class="ico">${itemIcon(i)}</div><b>${i.name}</b>${i.desc ? `<small>${i.desc}</small>` : ''}${btn}</div>`;
        }).join('')}</div>`;
      }
    } else if (id === 'quests') {
      ensureQuests(s, Date.now());
      const lv = level(s.xp), a = xpForLevel(lv), b = xpForLevel(lv + 1);
      title.innerHTML = `<b class="navemo">📋</b><span>Günlük Görevler</span>`;
      html = `<div class="list"><div class="card"><b>Seviye ${lv}</b><div class="bar"><i style="width:${Math.round((s.xp - a) / (b - a) * 100)}%"></i></div><small>${s.xp - a} / ${b - a} XP · Görevler her gün yenilenir</small></div>
        ${s.quests.list.map(q => `<div class="card row between"><div class="info"><b>${q.text}</b><div class="bar"><i style="width:${Math.round(q.progress / q.target * 100)}%"></i></div><small>${q.kind === 'ride' ? Math.floor(q.progress) + ' / ' + q.target + ' m' : q.progress + ' / ' + q.target} · ${q.coins} jeton${q.gems ? ' + ' + q.gems + ' elmas' : ''} · ${q.xp} XP</small></div>
          ${q.claimed ? '<span class="chip ok">Alındı</span>' : `<button class="btn" data-claim="${q.id}" ${q.progress >= q.target ? '' : 'disabled'}>Ödülü al</button>`}</div>`).join('')}</div>`;
    } else if (id === 'vet') {
      title.innerHTML = `<b class="navemo">🏥</b><span>Veteriner</span>`;
      const tn = Date.now();
      html = `<div class="list">${s.treatments.length ? s.treatments.map(t => { const left = t.readyAt - tn; return `<div class="card row between"><img class="thumb" src="${petThumbLook(t.look)}" alt=""><div class="info"><b>${esc(t.name)}</b><small>${left > 0 ? 'Tedavide · ' + fmt(left) : 'İyileşti! Teslim alabilirsin'}</small></div>
          ${left > 0 ? `<button class="btn sm" data-adspeed="${t.id}">📺 Hızlandır</button>` : `<div class="col"><button class="btn sm" data-shelter="${t.id}">Barınağa al</button><button class="btn sm ghost" data-release="${t.id}">Sokağa bırak</button></div>`}</div>`; }).join('')
        : `<div class="empty"><b class="navemo">🤒</b><p>Tedavide dost yok. Haritada üstünde 🤒 olan hasta dostları <b>aracınla</b> buraya getir. Her tedavi ${VET_COIN} jeton + XP kazandırır.</p></div>`}</div>`;
    } else if (id === 'shelter') {
      const sh = s.shelter, cap = shelterCap(s), day = dayKey(Date.now()); const g = this.game;
      title.innerHTML = `<b class="navemo">🐾</b><span>Barınak</span>`;
      const nextCost = SHELTER_UPGRADE[sh.level];
      html = `<div class="list"><div class="card row between"><div class="info"><b>Seviye ${sh.level} · ${sh.animals.length}/${cap} dost</b><small>Her dosta günde mama + su + sevgi ver: ${CARE_COIN} jeton. Her gün uğra!</small></div>
          ${nextCost !== undefined ? `<button class="btn sm" data-upshelter="1" ${s.coins >= nextCost ? '' : 'disabled'}>Büyüt ${priceHtml({ coin: nextCost })}</button>` : '<span class="chip ok">En büyük</span>'}</div>
        ${sh.animals.map(a => { const c = a.care.day === day ? a.care : { fed: false, water: false, pet: false, paid: false };
          return `<div class="card"><div class="row between"><img class="thumb" src="${petThumbLook({ ...a.look, species: a.species }, { wear: a.wear, collar: a.collar })}" alt=""><div class="info"><b>${esc(a.name)}</b><small>${c.paid ? 'Bugünkü bakım tamam ✓' : 'Bakım bekliyor'}</small></div><button class="btn sm ghost" data-rename="${a.uid}">İsim</button>${g.walking?.uid === a.uid ? `<button class="btn sm" data-walkend="1">Bitir</button>` : `<button class="btn sm" data-walk="${a.uid}">🦮 Gezdir</button>`}</div>
          <div class="gear"><button class="btn sm ${c.fed ? 'ghost' : ''}" data-care="${a.uid}|fed" ${c.fed ? 'disabled' : ''}>🍖 Mama</button><button class="btn sm ${c.water ? 'ghost' : ''}" data-care="${a.uid}|water" ${c.water ? 'disabled' : ''}>💧 Su</button><button class="btn sm ${c.pet ? 'ghost' : ''}" data-care="${a.uid}|pet" ${c.pet ? 'disabled' : ''}>💛 Sev</button></div>
          <div class="gear">${ITEMS.filter(i => (i.kind === 'petwear' || i.kind === 'collar') && (s.items[i.id] ?? 0) > 0).map(i => `<button class="gearbtn ${a.wear === i.id || a.collar === i.id ? 'on' : ''}" data-shgear="${a.uid}|${i.id}" title="${i.name}">${itemIcon(i)}</button>`).join('')}</div></div>`; }).join('')}
        ${!sh.animals.length ? '<div class="empty"><b class="navemo">🏥</b><p>Barınak boş. Veterinerde iyileşen dostları buraya alabilirsin.</p></div>' : ''}
        <div class="card"><b>Süsler ve oyuncaklar</b><div class="grid">${DECOR.map(d => `<div class="card shopitem"><b>${d.name}</b><small>${d.desc}</small>${sh.decor.includes(d.id) ? '<span class="chip ok">Var</span>' : `<button class="btn" data-decor="${d.id}" ${s.coins >= d.price ? '' : 'disabled'}>${priceHtml({ coin: d.price })}</button>`}</div>`).join('')}</div></div></div>`;
    } else if (id === 'home') {
      title.innerHTML = `${I.home}<span>Ev</span>`;
      html = this.tabs('home', [['wardrobe', 'Gardırop'], ['builds', 'Yuvalarım']]);
      if (this.tab.home === 'wardrobe') {
        const owned = (k: ItemKind) => ITEMS.filter(i => i.kind === k && (s.items[i.id] ?? 0) > 0);
        html += `<div class="list"><div class="card"><b>Kıyafet</b><div class="gear">${owned('outfit').map(i => `<button class="gearbtn lg ${s.look.outfit === i.id ? 'on' : ''}" data-outfit="${i.id}" title="${i.name}">${itemIcon(i)}</button>`).join('')}</div></div>
          <div class="card"><b>Şapka / aksesuar</b><div class="gear"><button class="gearbtn lg ${!s.look.hat ? 'on' : ''}" data-hat="">—</button>${owned('hat').map(i => `<button class="gearbtn lg ${s.look.hat === i.id ? 'on' : ''}" data-hat="${i.id}" title="${i.name}">${itemIcon(i)}</button>`).join('')}</div></div>
          <div class="card"><b>Karakter</b><div class="gear">${[['m', 'Erkek'], ['f', 'Kadın']].map(([v, n]) => `<button class="btn ${(s.look.gender ?? 'm') === v ? '' : 'ghost'}" data-gender="${v}">${n}</button>`).join('')}</div>
          <b>Saç modeli</b><div class="gear">${HAIR_STYLES.map(h => `<button class="btn sm ${(s.look.hairStyle ?? (s.look.gender === 'f' ? 'uzun' : 'kisa')) === h.id ? '' : 'ghost'}" data-hairstyle="${h.id}">${h.name}</button>`).join('')}</div>
          <b>Saç rengi</b><div class="gear">${['#4a2f22', '#2b2320', '#8a5a32', '#c9a46a', '#b8442a', '#e8d8a8', '#3b6aa8', '#d98aa0'].map(c => `<button class="swatch ${s.look.hair === c ? 'on' : ''}" style="background:${c}" data-hair="${c}"></button>`).join('')}</div>
          <b>Ten rengi</b><div class="gear">${['#f6d7bf', '#f1c7a5', '#e0a982', '#c68a62', '#9a6544', '#6e4630'].map(c => `<button class="swatch ${s.look.skin === c ? 'on' : ''}" style="background:${c}" data-skin="${c}"></button>`).join('')}</div></div>
          <small class="hint">Yeni kıyafet ve şapkaları Mağaza'dan veya Sürpriz Paket'ten alabilirsin.</small></div>`;
      } else {
        const inv = ITEMS.filter(i => i.kind === 'house' && (s.items[i.id] ?? 0) > 0);
        const placed = s.houses.filter(h => h.city === s.city);
        html += `<div class="list">${inv.map(i => `<div class="card row between"><div class="ico sm">${itemIcon(i)}</div><div class="info"><b>${i.name}</b><small>Envanterde ${s.items[i.id]} adet</small></div><button class="btn" data-place="${i.id}">Haritaya kur</button></div>`).join('')}
          ${!inv.length ? `<div class="empty">${I.home}<p>Kurulacak yuva yok. <b>Mağaza → Yuvalar</b>'dan kedi evi veya köpek kulübesi alabilirsin.</p><button class="btn" data-goshop="house">Mağazaya git</button></div>` : ''}
          ${placed.length ? `<h4>Kurduğun yuvalar</h4>` + placed.map(h => { const pet = s.pets.find(p => p.house === h.uid); return `<div class="card row between"><div class="ico sm">${I.houseC(h.color)}</div><div class="info"><b>${esc(h.name)}</b><small>${itemById(h.item)!.name}${pet ? ` · ${esc(pet.name)} burada yaşıyor` : ''}</small></div><button class="btn sm ghost" data-goto="${h.uid}">Git</button></div>`; }).join('') : ''}
        </div>`;
      }
    }
    body.innerHTML = html;
    const sc = body.querySelector('.grid, .list, .mapwrap'); if (sc) sc.scrollTop = scroll;
    this.wire(body);
    if (id === 'map' && this.tab.map === 'hood') this.drawMinimap();
  }

  private rewardName(r: Reward) {
    if (r.type === 'coin') return `${r.amount} jeton`;
    if (r.type === 'gem') return `${r.amount} elmas`;
    if (r.type === 'food') return `${r.amount} mama`;
    return itemById(r.id)?.name ?? r.id;
  }

  private wire(root: HTMLElement) {
    const g = this.game, s = g.state;
    const on = (attr: string, fn: (v: string) => void) => root.querySelectorAll<HTMLElement>(`[data-${attr}]`).forEach(el => el.onclick = () => fn(el.dataset[attr.replace(/-./g, m => m[1].toUpperCase())]!));
    on('tab', v => { this.tab[this.sheetOpen!] = v; this.render(); });
    on('claim', v => { const q = claimQuest(s, v); if (q) { sfx.coin(); save(s); this.sync(); this.toast(`+${q.coins} jeton${q.gems ? ', +' + q.gems + ' elmas' : ''}, +${q.xp} XP`); this.render(); } });
    on('adspeed', async v => { const ok = await this.ads.showRewarded(); if (ok) { speedUp(s, v, Date.now()); save(s); this.render(); } });
    on('shelter', v => { const r = discharge(s, v, true, Date.now()); if (!r.ok) { this.toast(r.reason ?? 'Olmadı'); return; } sfx.success(); save(s); this.sync(); g.refreshShelter(); this.toast(`${r.pet!.name} barınağa yerleşti 🐾 (+${VET_COIN} jeton)`); this.render(); });
    on('release', v => { const t = s.treatments.find(t => t.id === v); const r = discharge(s, v, false, Date.now()); if (!r.ok || !t) { this.toast(r.reason ?? 'Olmadı'); return; } sfx.success(); save(s); this.sync(); g.releaseToStreet(t.name, t.look); this.toast(`${t.name} sokağa sağlıkla döndü (+${VET_COIN} jeton)`); this.render(); });
    on('care', v => { const [uid, w] = v.split('|'); const r = care(s, uid, w as any, Date.now()); if (r.done) { sfx.pour(); if (r.paid) { sfx.coin(); this.toast(`Tam bakım! +${r.paid} jeton`); } save(s); this.sync(); this.render(); } });
    on('rename', v => { const a = s.shelter.animals.find(a => a.uid === v); if (!a) return; const n = prompt('Yeni isim', a.name); if (n && n.trim()) { a.name = n.trim().slice(0, 16); save(s); this.render(); } });
    on('shgear', v => { const [uid, item] = v.split('|'); const a = s.shelter.animals.find(a => a.uid === uid); const it = itemById(item); if (!a || !it) return; if (it.kind === 'collar') a.collar = a.collar === item ? undefined : item; else a.wear = a.wear === item ? undefined : item; save(s); g.refreshShelter(); this.render(); });
    on('upshelter', () => { if (upgradeShelter(s)) { sfx.success(); save(s); this.sync(); g.refreshShelter(); this.toast('Barınak büyüdü! Yeni bölme eklendi'); this.render(); } });
    on('walk', v => { g.startWalk(v); this.close(); });
    on('walkend', () => { g.endWalk(); this.render(); });
    on('decor', v => { if (buyDecor(s, v)) { sfx.success(); save(s); this.sync(); g.refreshShelter(); this.render(); } });
    on('veh', v => { s.garage.active = v; save(s); g.spawnVehicle(); this.render(); this.nearChanged(); });
    on('paint', v => { s.garage.color[s.garage.active] = v; save(s); g.setVehicleLook(); this.render(); });
    on('vacc', v => { const l = (s.garage.acc[s.garage.active] ??= []); const i = l.indexOf(v); if (i >= 0) l.splice(i, 1); else l.push(v); save(s); g.setVehicleLook(); this.render(); });
    on('buy', v => {
      if (buyItem(s, v)) {
        sfx.success(); save(s); this.sync();
        const it = itemById(v)!;
        if (it.kind === 'house') this.toast(`${it.name} envanterde. Ev → Yuvalarım'dan kurabilirsin`);
        else if (it.kind === 'outfit') { s.look.outfit = v; g.player.setLook(s.look); save(s); this.toast(`${it.name} giyildi`); }
        else if (it.kind === 'hat') { s.look.hat = v; g.player.setLook(s.look); save(s); this.toast(`${it.name} takıldı`); }
        else if (it.kind === 'vehicle') { s.garage.active = v; save(s); g.spawnVehicle(); this.toast(`${it.name} yanına park edildi. Yaklaş ve Bin'e bas`); this.render(); }
        else if (it.kind === 'paint') { s.garage.color[s.garage.active] = it.color; save(s); g.setVehicleLook(); this.toast(`${it.name} sürüldü`); this.render(); }
        else if (it.kind === 'vacc') { (s.garage.acc[s.garage.active] ??= []).push(v); save(s); g.setVehicleLook(); this.toast(`${it.name} takıldı`); this.render(); }
        else if (it.kind === 'ball') { this.toast(`${it.name} alındı! Yanındaki dostunla "Top" butonuyla oyna`); this.nearChanged(); }
        else this.toast(`${it.name} alındı. Petlerim'den giydir`);
      } else { sfx.error(); this.toast('Yeterli bakiye yok'); }
    });
    on('box', v => this.openBoxFlow(v));
    on('adopt', v => this.adoptModal(v));
    on('walk', v => { s.activePet = v; save(s); g.spawnPets(); this.sync(); this.toast(`${s.pets.find(p => p.uid === v)!.name} artık yanında`); });
    on('tohome', v => { if (s.activePet === v) s.activePet = null; save(s); g.spawnPets(); this.sync(); });
    on('gear', v => {
      const [uid, item] = v.split('|'); const p = s.pets.find(p => p.uid === uid)!; const it = itemById(item)!;
      if (it.kind === 'collar') p.collar = p.collar === item ? undefined : item; else p.wear = p.wear === item ? undefined : item;
      save(s); g.refreshGear(); this.render();
    });
    on('outfit', v => { s.look.outfit = v; g.player.setLook(s.look); save(s); this.render(); });
    on('hat', v => { s.look.hat = v || null; g.player.setLook(s.look); save(s); this.render(); });
    on('hair', v => { s.look.hair = v; save(s); this.toast('Saç rengi bir sonraki açılışta da kalır'); this.rebuildPlayer(); this.render(); });
    on('skin', v => { s.look.skin = v; save(s); this.rebuildPlayer(); this.render(); });
    on('gender', v => { s.look.gender = v as any; save(s); this.rebuildPlayer(); this.render(); });
    on('hairstyle', v => { s.look.hairStyle = v as any; save(s); this.rebuildPlayer(); this.render(); });
    on('place', v => { this.close(); g.startPlacing(v); this.placeMode(true); });
    on('goshop', v => this.open('shop', v));
    on('goto', v => { const h = s.houses.find(h => h.uid === v)!; g.pos.set(h.x, 0, h.z + 2); this.close(); });
    on('city', v => this.toast(`${CITIES.find(c => c.id === v)!.name} yakında`));
    on('unlock', v => { if (unlockCity(s, v)) { sfx.success(); save(s); this.sync(); } });
  }

  questDot() { const d = document.getElementById('questDot'); if (d) d.classList.toggle('on', claimable(this.game.state) > 0); }

  private rebuildPlayer() {
    const g = this.game; const old = g.player.root;
    const h = new Human(g.state.look); h.root.position.copy(old.position); h.root.rotation.copy(old.rotation);
    g.scene.remove(old); g.scene.add(h.root); g.player = h;
  }

  // ---------- harita ----------
  private drawMinimap() {
    const c = document.getElementById('minimap') as HTMLCanvasElement | null; if (!c) return;
    const g = c.getContext('2d')!; const w = this.game.world;
    const b = w.bounds, W = c.width, H = c.height;
    const sc = Math.min(W / (b.x1 - b.x0), H / (b.z1 - b.z0));
    const ox = W / 2 - ((b.x0 + b.x1) / 2) * sc, oz = H / 2 - ((b.z0 + b.z1) / 2) * sc;
    const X = (x: number) => ox + x * sc, Z = (z: number) => oz + z * sc;
    const fillR = (o: { x: number; z: number; hw: number; hd: number }) => g.fillRect(X(o.x - o.hw), Z(o.z - o.hd), o.hw * 2 * sc, o.hd * 2 * sc);
    g.fillStyle = '#4aa3c7'; g.fillRect(0, 0, W, H);
    g.fillStyle = '#efe4d2'; for (const l of w.lands) g.fillRect(X(l.x0), Z(l.z0), (l.x1 - l.x0) * sc, (l.z1 - l.z0) * sc);
    g.fillStyle = '#e2d4bf'; for (const o of w.open) fillR(o);
    g.fillStyle = '#9fcf86'; for (const o of w.parks) fillR(o);
    g.fillStyle = '#e3a589'; for (const l of w.lots) fillR(l);
    g.fillStyle = '#3b8ed6'; for (const f of w.fountains) { g.beginPath(); g.arc(X(f.x), Z(f.z), 4, 0, 7); g.fill(); }
    for (const h of this.game.state.houses.filter(h => h.city === this.game.state.city)) { g.fillStyle = h.color; g.fillRect(X(h.x) - 3, Z(h.z) - 3, 6, 6); }
    g.font = '700 11px Baloo2, sans-serif'; g.textAlign = 'center';
    for (const m of w.landmarks) { g.fillStyle = 'rgba(58,42,34,.75)'; g.fillText(m.name, X(m.x), Z(m.z) - 4); }
    const n = Date.now();
    for (const st of this.game.strays) {
      const p = st.pet.root.position, hungry = st.hungryAt <= n;
      g.fillStyle = hungry ? '#e2493b' : '#5aa055'; g.strokeStyle = '#fff'; g.lineWidth = 1.5;
      g.beginPath(); g.arc(X(p.x), Z(p.z), hungry ? 4 : 3, 0, 7); g.fill(); g.stroke();
    }
    const p = this.game.pos, yaw = this.game.yaw;
    g.save(); g.translate(X(p.x), Z(p.z)); g.rotate(-yaw + Math.PI);
    g.fillStyle = '#f2c94c'; g.strokeStyle = '#2b211c'; g.lineWidth = 2;
    g.beginPath(); g.moveTo(0, -10); g.lineTo(7, 7); g.lineTo(0, 3); g.lineTo(-7, 7); g.closePath(); g.fill(); g.stroke(); g.restore();
    g.textAlign = 'start';
  }

  // ---------- akışlar ----------
  private modal(html: string, cls = ''): HTMLElement {
    const m = $('#modal'); m.className = `modal show ${cls}`;
    m.innerHTML = `<div class="mcard">${html}</div>`;
    m.onclick = e => { if (e.target === m) this.closeModal(); };
    this.game.input.enabled = false;
    return m.querySelector('.mcard') as HTMLElement;
  }
  closeModal() { const m = $('#modal'); m.className = 'modal'; m.innerHTML = ''; this.game.input.enabled = true; }

  private foodModal() {
    const s = this.game.state;
    const c = this.modal(`<div class="mhead">${I.food}<b>Mama Stoğu</b></div>
      <div class="bigstat">${s.food}<small>/${FOOD_MAX}</small></div>
      <div class="bar"><i style="width:${s.food / FOOD_MAX * 100}%"></i></div>
      <p id="foodModalT" class="muted"></p>
      <p class="muted">Saatte 2 mama dolar, oyun kapalıyken de. Sokak dostunu beslemek <b>15 jeton</b> kazandırır.</p>
      <button class="btn big ad" id="adBtn" ${s.food >= FOOD_MAX ? 'disabled' : ''}>${I.ad} Reklam izle, stoğu doldur</button>
      <button class="btn ghost" id="mClose">Kapat</button>`);
    this.tick();
    (c.querySelector('#mClose') as HTMLElement).onclick = () => this.closeModal();
    (c.querySelector('#adBtn') as HTMLElement).onclick = async () => {
      this.closeModal();
      const ok = await this.ads.showRewarded();
      if (ok) { refillFoodByAd(s, Date.now()); save(s); this.sync(); sfx.success(); this.toast('Mama stoğu doldu! 🍖'); }
      else this.toast('Reklam yarıda kaldı');
    };
  }

  /** Test reklamı: AdMob bağlanana kadar ekranda geri sayım. */
  private fakeAd(sec: number): Promise<boolean> {
    return new Promise(res => {
      const c = this.modal(`<div class="adfake"><small>TEST REKLAMI</small><b>Mahalle Dostları</b><p>Burada gerçek reklam (AdMob) gösterilecek.</p><div class="count" id="adCount">${sec}</div><button class="btn ghost" id="adSkip">Vazgeç</button></div>`, 'dark');
      let n = sec; let done = false;
      const iv = setInterval(() => { n--; const el = c.querySelector('#adCount'); if (el) el.textContent = String(n); if (n <= 0) { clearInterval(iv); done = true; this.closeModal(); res(true); } }, 1000);
      (c.querySelector('#adSkip') as HTMLElement).onclick = () => { clearInterval(iv); if (!done) { this.closeModal(); res(false); } };
    });
  }

  private adoptModal(breedId: string) {
    const s = this.game.state, b = breedById(breedId)!;
    const names = b.species === 'cat' ? ['Pamuk', 'Mırmır', 'Boncuk', 'Fındık', 'Tarçın', 'Bulut'] : ['Karamel', 'Paşa', 'Kont', 'Bal', 'Zeytin', 'Kömür'];
    const c = this.modal(`<img class="mthumb" src="${petThumb(breedId)}"><div class="mhead"><b>${b.name}</b></div>
      <label class="field">Adı ne olsun?<input id="petName" maxlength="14" value="${names[Math.floor(Math.random() * names.length)]}"></label>
      <button class="btn big" id="doAdopt" ${canAfford(s, b.price) ? '' : 'disabled'}>Sahiplen ${priceHtml(b.price)}</button><button class="btn ghost" id="mClose">Vazgeç</button>`);
    (c.querySelector('#mClose') as HTMLElement).onclick = () => this.closeModal();
    (c.querySelector('#doAdopt') as HTMLElement).onclick = () => {
      const name = (c.querySelector('#petName') as HTMLInputElement).value;
      const p = adoptPet(s, breedId, name);
      if (!p) { sfx.error(); this.toast('Yeterli bakiye yok'); return; }
      s.activePet = p.uid; save(s); this.closeModal(); this.game.spawnPets(); this.sync(); sfx.success();
      this.toast(`${p.name} artık senin! Peşinden geliyor 🐾`);
      this.tab.pets = 'mine'; this.close();
    };
  }

  private openBoxFlow(boxId: string) {
    const s = this.game.state;
    const res = openBox(s, boxId, Date.now());
    if (!res) { sfx.error(); this.toast('Yeterli jeton yok'); return; }
    save(s); this.sync();
    const rc = RARITY_COLOR[res.rarity as keyof typeof RARITY_COLOR];
    const c = this.modal(`<div class="boxopen" style="--rc:${rc}"><div class="giftbig">${I.gift}</div><div class="reveal"><div class="rlabel">${RARITY_LABEL[res.rarity as keyof typeof RARITY_LABEL]}</div><div class="rico">${this.rewardIcon(res.reward)}</div><b>${this.rewardName(res.reward)}</b>${res.dup ? '<small>Bu eşya sende vardı, jetona çevrildi</small>' : ''}<button class="btn big" id="mClose">Harika!</button></div></div>`, 'box');
    sfx.open();
    setTimeout(() => { c.querySelector('.boxopen')!.classList.add('opened'); sfx.box(); haptic(30); }, 1100);
    (c.querySelector('#mClose') as HTMLElement).onclick = () => this.closeModal();
  }
  private rewardIcon(r: Reward) {
    if (r.type === 'coin') return I.coin; if (r.type === 'gem') return I.gem; if (r.type === 'food') return I.food;
    const it = itemById(r.id); return it ? itemIcon(it) : I.gift;
  }

  // ---------- yerleştirme ----------
  placeMode(on: boolean) { document.body.classList.toggle('placing', on); if (on) this.toast('Yürüyerek yer seç, sonra Kur'); }

  private confirmPlace() {
    const g = this.game; const spot = g.placingSpot(); if (!spot) return;
    if (!spot.valid) { sfx.error(); this.toast('Burası uygun değil, biraz yürü'); return; }
    const item = g.placing!.item; const it = itemById(item)!;
    let color = HOUSE_COLORS[0];
    const c = this.modal(`<div class="mhead">${I.houseC(it.color)}<b>${it.name}</b></div>
      <label class="field">Yuvanın adı<input id="hName" maxlength="14" value="${item === 'kedi_evi' ? 'Mırnav Yuva' : 'Hav Hav Evi'}"></label>
      <div class="field">Rengi<div class="gear">${HOUSE_COLORS.map((col, i) => `<button class="swatch ${i === 0 ? 'on' : ''}" style="background:${col}" data-c="${col}"></button>`).join('')}</div></div>
      <button class="btn big" id="hOk">${I.check} Kur</button><button class="btn ghost" id="mClose">Geri</button>`);
    c.querySelectorAll<HTMLElement>('[data-c]').forEach(el => el.onclick = () => { color = el.dataset.c!; c.querySelectorAll('[data-c]').forEach(x => x.classList.toggle('on', x === el)); });
    (c.querySelector('#mClose') as HTMLElement).onclick = () => this.closeModal();
    (c.querySelector('#hOk') as HTMLElement).onclick = () => {
      const s = g.state; const name = (c.querySelector('#hName') as HTMLInputElement).value;
      const h = placeHouse(s, item, spot.x, spot.z, spot.rot, name, color);
      if (!h) return;
      // uygun türdeki evsiz dostu yerleştir
      const species = item === 'kedi_evi' ? 'cat' : 'dog';
      const homeless = s.pets.find(p => !p.house && breedById(p.breed)?.species === species);
      if (homeless) homeless.house = h.uid;
      save(s); g.cancelPlacing(); g.addHouseObj(h.uid); g.spawnPets(); this.placeMode(false); this.closeModal(); this.sync(); sfx.success();
      this.toast(homeless ? `${h.name} kuruldu, ${homeless.name} artık burada yaşıyor` : `${h.name} kuruldu! 🏠`);
      this.hearts(new THREE.Vector3(spot.x, 1.2, spot.z));
    };
  }
}
