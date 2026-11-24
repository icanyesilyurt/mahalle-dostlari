// Sesler: dosya yok, WebAudio ile anında sentezlenir (hafif, telif sorunu yok).
// İki kanal: efektler (sfx) ve müzik+ortam (music). Ayarlardan ayrı ayrı açılıp kapanır.
let ctx: AudioContext | null = null;
let sfxBus: GainNode | null = null, musicBus: GainNode | null = null, echo: DelayNode | null = null;
let sfxOn = true, musicOn = true;

export const setSound = (o: { sfx: boolean; music: boolean }) => {
  sfxOn = o.sfx; musicOn = o.music;
  if (sfxBus) sfxBus.gain.value = sfxOn ? 1 : 0;
  if (musicBus) musicBus.gain.value = musicOn ? 1 : 0;
  if (!sfxOn) engine.stop();
};
/** Eski arayüz uyumu. */
export const setMuted = (m: boolean) => setSound({ sfx: !m, music: !m });

function ac(): AudioContext | null {
  if (!ctx) {
    try { ctx = new (window.AudioContext || (window as any).webkitAudioContext)(); } catch { return null; }
    sfxBus = ctx.createGain(); sfxBus.gain.value = sfxOn ? 1 : 0; sfxBus.connect(ctx.destination);
    musicBus = ctx.createGain(); musicBus.gain.value = musicOn ? 1 : 0; musicBus.connect(ctx.destination);
    // ortam için hafif yankı (uzaktan gelen sesler)
    echo = ctx.createDelay(1); echo.delayTime.value = 0.32;
    const fb = ctx.createGain(); fb.gain.value = 0.35; const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 1800;
    echo.connect(lp).connect(fb).connect(echo); lp.connect(musicBus);
  }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}
const bus = (music: boolean) => (music ? musicBus : sfxBus)!;

function tone(freq: number, dur: number, type: OscillatorType = 'sine', vol = 0.15, slide = 0, delay = 0, music = false, wet = false) {
  const a = ac(); if (!a) return;
  if (music ? !musicOn : !sfxOn) return;
  const t = a.currentTime + delay;
  const o = a.createOscillator(), g = a.createGain();
  o.type = type; o.frequency.setValueAtTime(freq, t);
  if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(40, freq + slide), t + dur);
  g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol, t + Math.min(0.04, dur * 0.2)); g.gain.exponentialRampToValueAtTime(0.0008, t + dur);
  o.connect(g).connect(bus(music)); if (wet && echo) g.connect(echo);
  o.start(t); o.stop(t + dur + 0.02);
}

function noise(dur: number, vol = 0.1, freq = 1200, delay = 0, music = false) {
  const a = ac(); if (!a) return;
  if (music ? !musicOn : !sfxOn) return;
  const t = a.currentTime + delay;
  const buf = a.createBuffer(1, Math.floor(a.sampleRate * dur), a.sampleRate);
  const d = buf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length);
  const src = a.createBufferSource(); src.buffer = buf;
  const f = a.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = freq; f.Q.value = 1.2;
  const g = a.createGain(); g.gain.value = vol;
  src.connect(f).connect(g).connect(bus(music)); src.start(t);
}

/** Uzun, perdesi kayan ses (ezan, vapur düdüğü): lowpass + vibrato, yankılı. */
function voice(notes: [number, number][], type: OscillatorType, vol: number, cutoff: number, vib = 0) {
  const a = ac(); if (!a || !musicOn) return;
  const o = a.createOscillator(), g = a.createGain(), f = a.createBiquadFilter();
  o.type = type; f.type = 'lowpass'; f.frequency.value = cutoff;
  let t = a.currentTime + 0.05; o.frequency.setValueAtTime(notes[0][0], t);
  g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol, t + 0.4);
  for (const [fr, du] of notes) { o.frequency.linearRampToValueAtTime(fr, t + Math.min(0.35, du * 0.3)); t += du; }
  g.gain.setValueAtTime(vol, t - 0.4); g.gain.linearRampToValueAtTime(0, t + 0.3);
  if (vib) { const lfo = a.createOscillator(), lg = a.createGain(); lfo.frequency.value = 5.5; lg.gain.value = vib; lfo.connect(lg).connect(o.frequency); lfo.start(); lfo.stop(t + 0.4); }
  o.connect(f).connect(g).connect(musicBus!); if (echo) g.connect(echo);
  o.start(); o.stop(t + 0.4);
}

export const sfx = {
  tap: () => tone(620, 0.08, 'sine', 0.12, 260),
  open: () => { tone(420, 0.12, 'triangle', 0.08, 300); noise(0.12, 0.03, 2400); },
  close: () => tone(560, 0.1, 'triangle', 0.07, -220),
  coin: () => { tone(988, 0.09, 'square', 0.05); tone(1319, 0.18, 'square', 0.05, 0, 0.08); },
  gem: () => { tone(1568, 0.12, 'sine', 0.08); tone(2093, 0.25, 'sine', 0.07, 0, 0.1); },
  crunch: () => { for (let i = 0; i < 4; i++) noise(0.05, 0.08, 1800 + Math.random() * 800, i * 0.18); },
  pour: () => noise(0.6, 0.05, 900),
  meow: () => { tone(620, 0.42, 'sawtooth', 0.035, -180); tone(760, 0.2, 'sine', 0.05, 160); },
  purr: () => { for (let i = 0; i < 6; i++) tone(70, 0.12, 'sawtooth', 0.03, 0, i * 0.13); },
  bark: () => { tone(320, 0.12, 'square', 0.05, -120); noise(0.08, 0.05, 700); tone(300, 0.1, 'square', 0.04, -100, 0.18); },
  success: () => { [523, 659, 784, 1047].forEach((f, i) => tone(f, 0.18, 'triangle', 0.07, 0, i * 0.08)); },
  error: () => { tone(220, 0.15, 'square', 0.04); tone(180, 0.2, 'square', 0.04, 0, 0.12); },
  box: () => { [392, 494, 587, 784, 988].forEach((f, i) => tone(f, 0.22, 'triangle', 0.06, 0, i * 0.07)); noise(0.3, 0.03, 4000, 0.3); },
  throw: () => noise(0.2, 0.05, 1600),
  /** Bisiklet zili: iki parlak vuruş. */
  bell: () => { for (const d of [0, 0.16]) { tone(2350, 0.5, 'sine', 0.09, 0, d); tone(3520, 0.35, 'sine', 0.04, 0, d); } },
  /** Korna: scooter tiz, pikap kalın. */
  horn: (deep: boolean) => { const f = deep ? 330 : 520; tone(f, 0.45, 'square', 0.05); tone(f * 1.26, 0.45, 'square', 0.04); },
  /** Veteriner kapı zili (ding-dong). */
  vetBell: () => { tone(1175, 0.6, 'sine', 0.08); tone(932, 0.9, 'sine', 0.08, 0, 0.32); },
  /** Tedavi bitti. */
  healed: () => { [659, 784, 988, 1319].forEach((f, i) => tone(f, 0.3, 'sine', 0.07, 0, i * 0.11)); tone(1568, 0.6, 'triangle', 0.05, 0, 0.45); },
  /** Barınakta mutlu hayvan (kısık). */
  happy: (cat: boolean) => { if (cat) { tone(700, 0.32, 'sawtooth', 0.018, -150); tone(820, 0.16, 'sine', 0.025, 120); } else { tone(360, 0.1, 'square', 0.025, -80); tone(380, 0.09, 'square', 0.02, -80, 0.16); } },
};

/** Araç motoru: hızla perdesi yükselen sürekli ses (scooter tiz, pikap kalın). */
export const engine = (() => {
  let o1: OscillatorNode | null = null, o2: OscillatorNode | null = null, g: GainNode | null = null, base = 60;
  return {
    start(kind: 'scooter' | 'pikap') {
      const a = ac(); if (!a || !sfxOn) return; this.stop();
      base = kind === 'scooter' ? 95 : 48;
      o1 = a.createOscillator(); o2 = a.createOscillator(); g = a.createGain(); const f = a.createBiquadFilter();
      o1.type = 'sawtooth'; o2.type = 'square'; f.type = 'lowpass'; f.frequency.value = kind === 'scooter' ? 900 : 420;
      o1.frequency.value = base; o2.frequency.value = base * 0.5; g.gain.value = 0;
      o1.connect(f); o2.connect(f); f.connect(g).connect(sfxBus!);
      o1.start(); o2.start(); g.gain.linearRampToValueAtTime(kind === 'scooter' ? 0.035 : 0.05, a.currentTime + 0.4);
    },
    setSpeed(k: number) { if (!o1 || !o2 || !ctx) return; const fr = base * (1 + k * 1.6); o1.frequency.setTargetAtTime(fr, ctx.currentTime, 0.1); o2.frequency.setTargetAtTime(fr * 0.5, ctx.currentTime, 0.1); },
    stop() { if (g && ctx && o1 && o2) { const gg = g, a1 = o1, a2 = o2; gg.gain.setTargetAtTime(0, ctx.currentTime, 0.08); setTimeout(() => { try { a1.stop(); a2.stop(); } catch { /* */ } }, 400); } o1 = o2 = null; g = null; },
  };
})();

/** Ortam: gündüz kuş/martı, gece cırcır böceği; uzaktan ezan ve vapur düdüğü; yumuşak müzik. */
export const ambience = (() => {
  let tBird = 2, tGull = 6, tCricket = 1, tEzan = 90, tFerry = 40, tMusic = 1;
  const SCALE = [392, 440, 494, 587, 659, 784, 880];
  return {
    update(dt: number, night: number, nearSea: boolean) {
      if (!ctx || !musicOn) return;
      tBird -= dt; tGull -= dt; tCricket -= dt; tEzan -= dt; tFerry -= dt; tMusic -= dt;
      if (night < 0.5 && tBird < 0) { tBird = 3 + Math.random() * 6; const f = 2800 + Math.random() * 1600; for (let i = 0; i < 2 + Math.floor(Math.random() * 3); i++) tone(f + Math.random() * 400, 0.09, 'sine', 0.012, 900, i * 0.12, true); }
      if (night < 0.5 && tGull < 0) { tGull = (nearSea ? 7 : 18) + Math.random() * 12; for (let i = 0; i < 3; i++) tone(1250, 0.32, 'sawtooth', 0.008, -420, i * 0.38, true, true); }
      if (night > 0.5 && tCricket < 0) { tCricket = 0.7 + Math.random() * 1.2; for (let i = 0; i < 3; i++) tone(4400, 0.03, 'sine', 0.008, 0, i * 0.06, true); }
      if (tEzan < 0) { tEzan = 240 + Math.random() * 180; voice([[294, 2.2], [311, 1.6], [349, 2.4], [330, 1.4], [294, 3.0]], 'sawtooth', 0.012, 900, 4); }
      if (tFerry < 0) { tFerry = 120 + Math.random() * 90; voice([[110, 2.6]], 'sawtooth', 0.02, 380); voice([[165, 2.6]], 'square', 0.008, 380); }
      if (tMusic < 0) { tMusic = 0.9 + Math.random() * 1.4; const n = SCALE[Math.floor(Math.random() * SCALE.length)] * (night > 0.5 ? 0.5 : 1); tone(n, 1.4, 'triangle', 0.012, 0, 0, true, true); }
    },
  };
})();

export function haptic(ms = 10) { try { navigator.vibrate?.(ms); } catch { /* */ } }
