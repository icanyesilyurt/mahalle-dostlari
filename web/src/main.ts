import './ui/style.css';
import { load, save } from './core/state';
import { Game } from './game/game';
import { Input } from './game/input';
import { Hud } from './ui/hud';
import { setKits } from './world/world';

async function boot() {
  const msg = document.getElementById('loadMsg')!;
  try { await Promise.race([document.fonts.load('800 64px Baloo2'), new Promise(r => setTimeout(r, 1500))]); } catch { /* */ }
  const state = load(Date.now());
  const hud = new Hud();
  const input = new Input(document.getElementById('c')!, document.getElementById('joy')!);
  if (import.meta.env.VITE_SHOWCASE) {
    msg.textContent = 'Sokaklar kuruluyor…';
    const { loadKits } = await import('./world/assets');
    setKits(await loadKits());
  }
  msg.textContent = 'Kediler sokağa çıkıyor…';
  await new Promise(r => setTimeout(r, 30));
  const game = new Game(document.getElementById('c') as HTMLCanvasElement, state, input, {
    reward: (c, g, at) => hud.reward(c, g, at),
    toast: m => hud.toast(m),
    changed: () => hud.sync(),
    hearts: at => hud.hearts(at),
    nearChanged: () => hud.nearChanged(),
  });
  hud.bind(game);
  game.start();
  (window as any).__game = game; // hata ayıklama
  setTimeout(() => document.getElementById('loading')!.classList.add('done'), 300);
  if (!localStorage.getItem('md-intro')) {
    setTimeout(() => hud.toast('Hoş geldin! Başında 🍖 olan sokak dostlarına yaklaş ve Mama\'ya bas'), 900);
    try { localStorage.setItem('md-intro', '1'); } catch { /* */ }
  }
  document.addEventListener('visibilitychange', () => { if (document.hidden) save(state); });
  addEventListener('pagehide', () => save(state));
}
boot().catch(e => { document.getElementById('loadMsg')!.textContent = 'Bir hata oluştu: ' + e.message; console.error(e); });
