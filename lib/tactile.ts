/**
 * XIYÀTO Tactile Micro-Haptics & Sensory Feedback System (M1 / R5)
 *
 * Provides lightweight, SSR-safe vibration haptic triggers, visual micro-interaction
 * styling utilities, and sensory feedback patterns for editorial touch & click experiences.
 *
 * - Audio-free tactile feedback
 * - Safe SSR / Node.js execution guards
 * - iOS / Safari / Desktop graceful fallback
 * - Full prefers-reduced-motion compliance
 */

export type HapticFeedbackType =
  | "selection"
  | "light"
  | "medium"
  | "impact"
  | "success"
  | "warning";

export type HapticPattern = number | number[];

/**
 * Standardized micro-haptic vibration timing profiles (in milliseconds).
 * Calibrated for crisp, subtle editorial feedback rather than long buzzing.
 */
export const HAPTIC_PATTERNS: Record<HapticFeedbackType, HapticPattern> = {
  /** Ultra-short crisp micro-tick (10ms): Tabs, thumbnail rails, carousel pills */
  selection: 10,
  /** Light tap (15ms): Standard buttons, links, toggles */
  light: 15,
  /** Distinct tactile pulse (30ms): Drawer expand/collapse, modal open */
  medium: 30,
  /** Firm mechanical impact (45ms): Zoom limits, transform reset, primary actions */
  impact: 45,
  /** Double confirmation pulse (15ms-60ms-20ms): Downloads (PDF/XLSX), copy success */
  success: [15, 60, 20],
  /** Triple staccato pulse (30ms-40ms-30ms-40ms-30ms): Errors, invalid bounds */
  warning: [30, 40, 30, 40, 30],
};

export type TactileVariant =
  | "button"
  | "buttonSubtle"
  | "card"
  | "tab"
  | "thumbnail"
  | "drawerToggle"
  | "iconButton"
  | "ringFocus"
  | "touch";

/**
 * Hardware-accelerated visual micro-interaction class names.
 * Delivers visual tactile feedback across all devices (Desktop, iOS Safari, Android).
 */
export const TACTILE_CLASSES: Record<TactileVariant, string> = {
  /** Standard interactive button: 2% compression on press */
  button:
    "transition-transform duration-100 ease-out active:scale-[0.98] motion-reduce:transform-none select-none",
  /** Subtle button / small control: 4% compression on press */
  buttonSubtle:
    "transition-transform duration-75 ease-out active:scale-[0.96] motion-reduce:transform-none select-none",
  /** Interactive card: gentle hover lift + down-press tactile compression */
  card:
    "transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:scale-[0.99] motion-reduce:transform-none select-none",
  /** Tab switcher / filter pill: quick micro-press response */
  tab:
    "transition-all duration-150 ease-out active:scale-[0.97] motion-reduce:transform-none select-none",
  /** Thumbnail strip items: opacity shift + 5% press down */
  thumbnail:
    "transition-all duration-150 ease-out hover:opacity-100 active:scale-95 motion-reduce:transform-none select-none",
  /** Drawer / slide-over expansion toggles */
  drawerToggle:
    "transition-transform duration-150 ease-out active:scale-[0.98] motion-reduce:transform-none select-none",
  /** Circular icon buttons (prev/next, zoom, close): 10% press compression */
  iconButton:
    "inline-flex items-center justify-center rounded-full transition-transform duration-100 ease-out active:scale-90 motion-reduce:transform-none select-none",
  /** High-contrast accessible focus ring */
  ringFocus:
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus,#810100)]",
  /** Base touch interaction container */
  touch:
    "select-none motion-reduce:transform-none",
};

/** Direct constant exports for rapid imports */
export const TACTILE_TOUCH = TACTILE_CLASSES.touch;
export const TACTILE_BUTTON = TACTILE_CLASSES.button;
export const TACTILE_CARD = TACTILE_CLASSES.card;
export const TACTILE_TAB = TACTILE_CLASSES.tab;

/**
 * Safe client check: verifies whether the Vibration API is supported in the current environment.
 * Returns false on SSR (Node.js), iOS Safari, or browsers without haptic hardware.
 */
export function isHapticsSupported(): boolean {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return false;
  }
  return typeof navigator.vibrate === "function";
}

/**
 * Checks whether the user has requested reduced motion.
 */
export function isReducedMotionPreferred(): boolean {
  if (typeof window === "undefined" || !("matchMedia" in window)) {
    return false;
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export interface TriggerHapticOptions {
  /** Force haptics even if prefers-reduced-motion is active (defaults to false) */
  ignoreReducedMotion?: boolean;
}

/**
 * Programmatically dispatches a tactile micro-haptic vibration.
 *
 * @param typeOrPattern Semantic feedback type ("selection" | "light" | "medium" | "impact" | "success" | "warning") or custom millisecond pattern.
 * @param options Optional configuration flags.
 * @returns boolean indicating whether vibration was successfully dispatched.
 *
 * @example
 * triggerHaptic("selection");
 * triggerHaptic("success");
 */
export function triggerHaptic(
  typeOrPattern: HapticFeedbackType | HapticPattern = "light",
  options?: TriggerHapticOptions
): boolean {
  if (!isHapticsSupported()) {
    return false;
  }

  // Respect user reduced-motion preferences unless explicitly bypassed
  if (!options?.ignoreReducedMotion && isReducedMotionPreferred()) {
    return false;
  }

  try {
    const pattern =
      typeof typeOrPattern === "string"
        ? HAPTIC_PATTERNS[typeOrPattern] ?? HAPTIC_PATTERNS.light
        : typeOrPattern;

    return navigator.vibrate(pattern);
  } catch {
    // Graceful fallback for permission/security errors (e.g. cross-origin iframe)
    return false;
  }
}

/**
 * Utility helper that combines tactile micro-interaction classes with optional custom class names.
 *
 * @example
 * <button className={tactileClass("button", "bg-ink text-paper px-4 py-2")}>
 *   Submit
 * </button>
 */
export function tactileClass(
  variant: TactileVariant = "button",
  extraClasses = ""
): string {
  const base = TACTILE_CLASSES[variant] ?? TACTILE_CLASSES.button;
  return extraClasses ? `${base} ${extraClasses}` : base;
}

/**
 * Higher-order event handler creator that triggers haptic feedback before invoking a custom callback.
 *
 * @example
 * <button onClick={createHapticHandler("selection", () => setTab("india"))}>
 *   India
 * </button>
 */
export function createHapticHandler<E = unknown>(
  type: HapticFeedbackType = "light",
  callback?: (e: E) => void
) {
  return (e: E) => {
    triggerHaptic(type);
    callback?.(e);
  };
}

/**
 * React Hook providing convenient tactile helpers and environment status.
 */
export function useTactile() {
  return {
    triggerHaptic,
    isHapticsSupported: isHapticsSupported(),
    isReducedMotion: isReducedMotionPreferred(),
    tactileClass,
    classes: TACTILE_CLASSES,
    TACTILE_TOUCH,
    TACTILE_BUTTON,
    TACTILE_CARD,
    TACTILE_TAB,
  };
}
