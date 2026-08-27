/**
 * XIYÀTO Headless DOM, Viewport, Haptic & Interaction Simulator
 * Provides opaque-box simulation of client runtime environments and events.
 */

export class ViewportSimulator {
  constructor(initialWidth = 1280, initialHeight = 800) {
    this.width = initialWidth;
    this.height = initialHeight;
    this.devicePixelRatio = 1;
    this.listeners = [];
  }

  set(width, height = 800, dpr = 1) {
    const prev = { width: this.width, height: this.height };
    this.width = width;
    this.height = height;
    this.devicePixelRatio = dpr;
    this.notify({ prev, current: { width, height } });
  }

  get() {
    return { width: this.width, height: this.height, dpr: this.devicePixelRatio };
  }

  isMobile() {
    return this.width < 640;
  }

  isTablet() {
    return this.width >= 640 && this.width < 1024;
  }

  isDesktop() {
    return this.width >= 1024;
  }

  isUltraWide() {
    return this.width >= 2560;
  }

  onResize(fn) {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== fn);
    };
  }

  notify(event) {
    for (const listener of this.listeners) {
      listener(event);
    }
  }
}

export class HapticSimulator {
  constructor() {
    this.supported = true;
    this.history = [];
    this.activeVibration = null;
  }

  enable() {
    this.supported = true;
  }

  disable() {
    this.supported = false;
  }

  vibrate(pattern) {
    if (!this.supported) return false;
    const timestamp = Date.now();
    const entry = { pattern, timestamp };
    this.history.push(entry);
    this.activeVibration = entry;
    return true;
  }

  getHistory() {
    return [...this.history];
  }

  getLastVibration() {
    return this.history.length > 0 ? this.history[this.history.length - 1] : null;
  }

  clear() {
    this.history = [];
    this.activeVibration = null;
  }
}

export class MotionPreferenceSimulator {
  constructor() {
    this.prefersReducedMotion = false;
    this.listeners = [];
  }

  set(val) {
    this.prefersReducedMotion = Boolean(val);
    this.notify();
  }

  get() {
    return this.prefersReducedMotion;
  }

  onChange(fn) {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== fn);
    };
  }

  notify() {
    for (const l of this.listeners) {
      l(this.prefersReducedMotion);
    }
  }
}

export class LayoutShiftTracker {
  constructor() {
    this.shifts = [];
  }

  recordShift(elementId, previousBounds, newBounds) {
    const area = previousBounds.width * previousBounds.height;
    const deltaY = Math.abs(newBounds.top - previousBounds.top);
    const deltaX = Math.abs(newBounds.left - previousBounds.left);
    const impactFraction = (deltaY + deltaX) / 1000;
    const shiftScore = impactFraction * 0.1;
    this.shifts.push({ elementId, shiftScore, previousBounds, newBounds });
  }

  getCLS() {
    return this.shifts.reduce((acc, s) => acc + s.shiftScore, 0);
  }

  clear() {
    this.shifts = [];
  }
}

export const globalViewport = new ViewportSimulator();
export const globalHaptics = new HapticSimulator();
export const globalMotion = new MotionPreferenceSimulator();
export const globalCLS = new LayoutShiftTracker();
