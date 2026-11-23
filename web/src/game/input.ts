// Dokunmatik + klavye girişi: sol alt sanal joystick, boş alana dokun-git, sürükleyerek kamera döndür, iki parmakla yakınlaş.
export interface InputState {
  move: { x: number; y: number };    // joystick (-1..1), y yukarı = ileri
  tap: { x: number; y: number } | null;
  yawDelta: number;
  zoomDelta: number;
}

export class Input {
  state: InputState = { move: { x: 0, y: 0 }, tap: null, yawDelta: 0, zoomDelta: 0 };
  private keys = new Set<string>();
  private joyId: number | null = null;
  private joyO = { x: 0, y: 0 };
  private joyV = { x: 0, y: 0 };
  private pointers = new Map<number, { x: number; y: number; sx: number; sy: number; t: number; moved: boolean }>();
  private pinchD = 0;
  private base: HTMLElement; private knob: HTMLElement;
  enabled = true;

  constructor(private el: HTMLElement, joyBase: HTMLElement) {
    this.base = joyBase; this.knob = joyBase.querySelector('.knob') as HTMLElement;
    el.addEventListener('pointerdown', e => this.down(e));
    window.addEventListener('pointermove', e => this.moveP(e));
    window.addEventListener('pointerup', e => this.up(e));
    window.addEventListener('pointercancel', e => this.up(e));
    el.addEventListener('wheel', e => { this.state.zoomDelta += Math.sign(e.deltaY) * 0.08; e.preventDefault(); }, { passive: false });
    window.addEventListener('keydown', e => { if (!(e.target instanceof HTMLInputElement)) this.keys.add(e.key.toLowerCase()); });
    window.addEventListener('keyup', e => this.keys.delete(e.key.toLowerCase()));
    window.addEventListener('blur', () => this.keys.clear());
  }

  private joyZone(x: number, y: number) {
    const w = window.innerWidth, h = window.innerHeight;
    return x < w * 0.45 && y > h * (w > h ? 0.4 : 0.55);
  }

  private down(e: PointerEvent) {
    if (!this.enabled) return;
    this.el.setPointerCapture?.(e.pointerId);
    if (this.joyId === null && this.joyZone(e.clientX, e.clientY)) {
      this.joyId = e.pointerId; this.joyO = { x: e.clientX, y: e.clientY }; this.joyV = { x: 0, y: 0 };
      this.base.classList.add('active');
      this.base.style.left = `${e.clientX}px`; this.base.style.top = `${e.clientY}px`;
      this.knob.style.transform = 'translate(-50%,-50%)';
      return;
    }
    this.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY, sx: e.clientX, sy: e.clientY, t: performance.now(), moved: false });
    if (this.pointers.size === 2) this.pinchD = this.dist();
  }

  private dist() { const p = [...this.pointers.values()]; return Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y); }

  private moveP(e: PointerEvent) {
    if (e.pointerId === this.joyId) {
      const R = 52; let dx = e.clientX - this.joyO.x, dy = e.clientY - this.joyO.y;
      const l = Math.hypot(dx, dy); if (l > R) { dx *= R / l; dy *= R / l; }
      this.joyV = { x: dx / R, y: -dy / R };
      this.knob.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;
      return;
    }
    const p = this.pointers.get(e.pointerId); if (!p) return;
    const dx = e.clientX - p.x;
    p.x = e.clientX; p.y = e.clientY;
    if (Math.hypot(p.x - p.sx, p.y - p.sy) > 12) p.moved = true;
    if (this.pointers.size === 1 && p.moved) this.state.yawDelta += dx * 0.006;
    if (this.pointers.size === 2) { const d = this.dist(); this.state.zoomDelta -= (d - this.pinchD) * 0.004; this.pinchD = d; }
  }

  private up(e: PointerEvent) {
    if (e.pointerId === this.joyId) {
      this.joyId = null; this.joyV = { x: 0, y: 0 }; this.base.classList.remove('active');
      this.knob.style.transform = 'translate(-50%,-50%)';
      return;
    }
    const p = this.pointers.get(e.pointerId); if (!p) return;
    if (!p.moved && performance.now() - p.t < 450 && this.pointers.size === 1) this.state.tap = { x: e.clientX, y: e.clientY };
    this.pointers.delete(e.pointerId);
  }

  poll(): InputState {
    let x = this.joyV.x, y = this.joyV.y;
    const k = this.keys;
    if (k.has('w') || k.has('arrowup')) y += 1;
    if (k.has('s') || k.has('arrowdown')) y -= 1;
    if (k.has('a') || k.has('arrowleft')) x -= 1;
    if (k.has('d') || k.has('arrowright')) x += 1;
    if (k.has('q')) this.state.yawDelta -= 0.03;
    if (k.has('e')) this.state.yawDelta += 0.03;
    const l = Math.hypot(x, y); if (l > 1) { x /= l; y /= l; }
    this.state.move = { x, y };
    return this.state;
  }

  consume() { this.state.tap = null; this.state.yawDelta = 0; this.state.zoomDelta = 0; }
  get running() { return this.keys.has('shift'); }
}
