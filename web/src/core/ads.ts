// Reklam sağlayıcı arayüzü. Şimdilik test reklamı; AdMob bağlanınca yalnız bu dosyaya
// yeni bir sağlayıcı eklenir (ör. Capacitor AdMob eklentisi ile showRewarded).
export interface AdProvider {
  name: string;
  /** Ödüllü reklam gösterir; izlenip bitirilirse true döner. */
  showRewarded(): Promise<boolean>;
}

/** Sahte reklam: ekranda 5 sn geri sayım gösterir. */
export class TestAdProvider implements AdProvider {
  name = 'test';
  constructor(private show: (seconds: number) => Promise<boolean>) {}
  showRewarded() { return this.show(5); }
}
