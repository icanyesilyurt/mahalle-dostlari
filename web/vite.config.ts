import { defineConfig } from 'vite';

// Göreli yol: GitHub Pages alt klasöründe (/mahalle-dostlari/yeni/) de çalışsın.
// "showcase" modu (npm run build:test): hazır modelli vitrin -> /yeni-test/ (.env.showcase: VITE_SHOWCASE=1)
export default defineConfig(({ mode }) => ({
  base: './',
  build: {
    outDir: mode === 'showcase' ? '../docs/yeni-test' : '../docs/yeni',
    emptyOutDir: true,
    chunkSizeWarningLimit: 900,
  },
  server: { port: 5199 },
}));
