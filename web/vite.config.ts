import { defineConfig } from 'vite';

// Göreli yol: GitHub Pages alt klasöründe (/mahalle-dostlari/yeni/) de çalışsın
export default defineConfig({
  base: './',
  build: {
    outDir: '../docs/yeni',
    emptyOutDir: true,
    chunkSizeWarningLimit: 900,
  },
  server: { port: 5199 },
});
