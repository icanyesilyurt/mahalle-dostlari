// Ses efektleri: dosya yok, WebAudio ile anında sentezlenir (hafif, telif sorunu yok).
let ctx: AudioContext | null = null;
let muted = false;
export const setMuted = (m: boolean) => { muted = m; };

function ac(): AudioContext | null {
  if (muted) return null;
  if (!ctx) { try { ctx = new (window.AudioContext || (window as any).webkitAudioContext)(); } catch { return null; } }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

function tone(freq: number, dur: number, type: OscillatorType = 'sine', vol = 0.15, slide = 0, delay = 0) {
  const a = ac(); if (!a) return;
  const t = a.currentTime + delay;
  const o = a.createOscillator(), g = a.createGain();
  o.type = type; o.frequency.setValueAtTime(freq, t);
  if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(40, freq + slide), t + dur);
  g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol, t + 0.01); g.gain.exponentialRampToValueAtTime(0.0008, t + dur);
  o.connect(g).connect(a.destination); o.start(t); o.stop(t + dur + 0.02);
}

function noise(dur: number, vol = 0.1, freq = 1200, delay = 0) {
  const a = ac(); if (!a) return;
  const t = a.currentTime + delay;
  const buf = a.createBuffer(1, Math.floor(a.sampleRate * dur), a.sampleRate);
  const d = buf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length);
  const src = a.createBufferSource(); src.buffer = buf;
  const f = a.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = freq; f.Q.value = 1.2;
  const g = a.createGain(); g.gain.value = vol;
  src.connect(f).connect(g).connect(a.destination); src.start(t);
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
};

export function haptic(ms = 10) { try { navigator.vibrate?.(ms); } catch { /* */ } }
