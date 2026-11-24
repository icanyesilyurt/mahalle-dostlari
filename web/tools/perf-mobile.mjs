// Telefon performans ölçümü: puppeteer-core + yerel Chrome, mobil ekran + CPU yavaşlatma.
// Kullanım (ayrı klasörde npm i puppeteer-core): node perf-mobile.mjs <adres> <yavaşlatma>
// Orta seviye Android taklidi: mobil ekran + 4x CPU yavaşlatma; açılış süresi ve FPS.
import puppeteer from 'puppeteer-core';
import fs from 'fs';
const URL = process.argv[2] || 'https://icanyesilyurt.github.io/mahalle-dostlari/yeni/?saat=12';
const RATE = +(process.argv[3] || 4);
const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: 'new',
  userDataDir: process.env.TEMP + '/md-perf-profile',
  args: ['--use-angle=d3d11', '--enable-gpu', '--ignore-gpu-blocklist', '--enable-unsafe-swiftshader=false', '--window-size=412,915'],
});
const page = await browser.newPage();
await page.setUserAgent('Mozilla/5.0 (Linux; Android 13; SM-A346B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Mobile Safari/537.36');
await page.setViewport({ width: 412, height: 915, deviceScaleFactor: 2.6, isMobile: true, hasTouch: true });
const cdp = await page.createCDPSession();
await cdp.send('Network.enable'); await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });
await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 40, downloadThroughput: 20 * 1024 * 1024 / 8, uploadThroughput: 5 * 1024 * 1024 / 8 });
await cdp.send('Emulation.setCPUThrottlingRate', { rate: RATE });
const t0 = Date.now();
await page.goto(URL, { waitUntil: 'domcontentloaded' });
await page.waitForFunction('window.__game', { timeout: 120000 });
const ready = Date.now() - t0;
const gl = await page.evaluate(() => { const g = window.__game; const c = g.renderer.getContext(); const e = c.getExtension('WEBGL_debug_renderer_info'); return { renderer: e ? c.getParameter(e.UNMASKED_RENDERER_WEBGL) : '?', lowEnd: g.lowEnd, pr: g.renderer.getPixelRatio(), quality: g.quality ?? null }; });
await new Promise(r => setTimeout(r, 1500));
const fps = async (secs, walk) => page.evaluate(async (secs, walk) => {
  if (walk) window.dispatchEvent(new KeyboardEvent('keydown', { key: 'w' }));
  let n = 0, worst = 0, last = performance.now(); const t = last;
  await new Promise(res => { const f = () => { const now = performance.now(); worst = Math.max(worst, now - last); last = now; n++; if (now - t < secs * 1000) requestAnimationFrame(f); else res(); }; requestAnimationFrame(f); });
  if (walk) window.dispatchEvent(new KeyboardEvent('keyup', { key: 'w' }));
  return { fps: +(n / secs).toFixed(1), worstMs: Math.round(worst), quality: window.__game.quality ?? null };
}, secs, walk);
const idle = await fps(6, false);
const walk = await fps(8, true);
await new Promise(r => setTimeout(r, 300));
const idle2 = await fps(5, false);
const prof = await page.evaluate(() => window.__prof);
const out = { url: URL, cpuRate: RATE, readyMs: ready, prof, ...gl, idle, walk, idle2, q: await page.evaluate(() => window.__game.quality) };
console.log(JSON.stringify(out));
await browser.close();
