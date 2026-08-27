# Technical Specification & Handoff Report: Tactile Micro-Haptics & Sensory Feedback (`lib/tactile.ts`)

**Subagent**: Explorer Subagent 2 (`teamwork_preview_explorer_m1_2`)  
**Milestone**: M1 (Theming & Tactile Foundations)  
**Workspace**: `C:\Users\ADMIN\.gemini\antigravity\scratch\chaitanya-gaikwad`  
**Date**: 2026-08-27  

---

## 1. Observation

### 1.1 Existing Interaction Touchpoints & Codebase Architecture
Direct inspection of the XIYÀTO repository revealed several high-frequency interactive touchpoints across current and upcoming components:
1. **General Action Primitives (`components/ui/primitives.tsx:127-199`)**:
   - `ButtonLink` and `TextLink` currently use standard color transitions (`transition-colors duration-150`), lacking tactile down-press feedback (`:active` micro-scaling).
2. **Hero Capabilities Switcher (`components/home/HeroCapabilities.tsx:335-359`)**:
   - 6 capability buttons (`01`–`06`) switch active scene viewports.
3. **Drawing Inspector & Controls (`components/work/CadInspectionModal.tsx:224-309`)**:
   - Zoom in/out buttons, reset 100% button, next/prev drawing controls, and PDF download triggers.
4. **Planned Capabilities Carousel (R1 / Milestone M2 - `components/home/CapabilitiesCarousel.tsx`)**:
   - Next/prev step pills, carousel swipe snapping, pagination dot indicators.
5. **Planned Lead Intelligence Stage (R2 / Milestone M2 - `components/home/LeadIntelligencePanel.tsx`)**:
   - Multi-region tab switcher (India, Middle East, Philippines, China), sheet drawer expansion trigger, search filter clearing, XLSX download trigger.
6. **Planned CAD Blueprint Rail & Stage (R3 / Milestone M3 - `components/home/CadDraftingRailStage.tsx`)**:
   - Horizontal thumbnail strip buttons, category filters, quick zoom buttons (1x, 1.5x, 2x).

### 1.2 Browser Environment & Web Standards Analysis
1. **W3C Vibration API (`navigator.vibrate`)**:
   - Supported on Android Chrome, Firefox, Edge, Opera, Samsung Internet, and Android WebView.
   - **iOS / iPadOS Safari Limitation**: WebKit does not implement `navigator.vibrate` (it is `undefined` on `navigator`). Any call to `navigator.vibrate` on iOS must safely degrade to a no-op without throwing errors.
   - **Desktop Environment**: Most desktop browsers lack vibration motors and either omit `navigator.vibrate` or treat it as a silent no-op.
   - **Security / Permissions Policy**: Browsers require transient user activation (touch/click) to allow vibration; calling `navigator.vibrate` outside user gestures or inside non-permitted iframes may fail or throw a `SecurityError` / `DOMException`.
2. **SSR Safety in Next.js 16 (React 19 / Turbopack)**:
   - During Server-Side Rendering (SSR) and static generation (SSG), `window` and `navigator` are undefined.
   - Direct access without guards throws `ReferenceError: window is not defined` or `navigator is not defined`.
3. **Accessibility & Reduced Motion (`prefers-reduced-motion: reduce`)**:
   - Users with vestibular disorders or motion sensitivity have `prefers-reduced-motion: reduce` configured.
   - Visual micro-scaling (`transform: scale(...)`) must be suppressed or defaulted to `none` when reduced motion is preferred.

---

## 2. Logic Chain

1. **Premise**: Ultra-premium editorial design demands that every click, tap, and swipe feels deliberate, responsive, and tactile without introducing heavy runtime overhead or distracting auditory clutter.
2. **From Premise to Sensory Architecture**:
   - *Physical Micro-Haptics*: On supported touch devices (Android mobile/tablets), short vibration bursts (8ms–45ms) provide direct physical confirmation.
   - *Universal Visual Haptics*: On devices without vibration motors (iOS, iPadOS, macOS, Windows desktop), visual micro-interactions (instant down-press compression `active:scale-[0.98]`, subtle hover lift, and state indicators) provide sensory tactile feedback.
   - *Audio-Free Philosophy*: Auditory clicks/beeps are intrusive, violate the quiet architectural editorial aesthetic of XIYÀTO, and suffer from browser autoplay blocking. Sensory feedback must remain 100% audio-free.
3. **From Browser Capabilities to Safe Execution**:
   - Guarding `typeof window !== "undefined"` and `typeof navigator !== "undefined" && typeof navigator.vibrate === "function"` ensures zero SSR crashes during Next.js builds.
   - Wrapping `navigator.vibrate()` in a `try/catch` block ensures graceful failure under restricted permissions or iframe policies.
4. **From Pattern Taxonomy to Micro-Interaction Types**:
   - `selection` (10ms): Crisp micro-tick for tab switching and thumbnail navigation.
   - `light` (15ms): Standard gentle tap for buttons and pills.
   - `medium` (30ms): Firm pulse for opening drawers and modals.
   - `impact` (45ms): Solid mechanical click for CAD zoom limits and transform resets.
   - `success` ([15ms, 60ms pause, 20ms]): Double pulse for vector PDF/Excel downloads and submissions.
   - `warning` ([30ms, 40ms, 30ms, 40ms, 30ms]): Triple staccato pulse for errors or invalid actions.
5. **From Performance Requirements to Zero-Dependency Implementation**:
   - Pure TypeScript implementation (~100 lines) with zero external npm dependencies ensures 0 bundle bloat, 0 layout shifts (CLS < 0.05), and 60fps hardware-accelerated CSS execution.

---

## 3. Caveats

1. **iOS / Safari Vibration Restriction**: WebKit deliberately omits `navigator.vibrate`. On iOS devices, the module automatically relies on visual micro-interactions (`active:scale-[0.98]`, state color changes).
2. **User Gesture Activation Requirement**: Modern Chrome requires a user activation event (click/touch) to dispatch `navigator.vibrate`. Programmatic triggers without user interaction will be ignored by the browser.
3. **Accessibility (Reduced Motion)**: When `prefers-reduced-motion: reduce` is enabled, transform-based micro-scaling is neutralized via `motion-reduce:transform-none` to protect users sensitive to motion.

---

## 4. Conclusion & Complete Technical Specification for `lib/tactile.ts`

The specification below is ready for implementation by the builder in Milestone M1 (`lib/tactile.ts`).

### 4.1 Complete Source Code: `lib/tactile.ts`

```typescript
/**
 * XIYÀTO Tactile Micro-Haptics & Sensory Feedback System
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
  | "ringFocus";

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
};

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
export function createHapticHandler<E extends React.SyntheticEvent | Event>(
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
  };
}
```

---

### 4.2 Component Integration Matrix for Downstream Milestones

| Component / Target | Milestone | Interaction Element | Haptic Type | Recommended Visual Class |
|---|---|---|---|---|
| `CapabilitiesCarousel.tsx` | M2 (R1) | Prev / Next pill buttons | `"selection"` | `tactileClass("iconButton")` |
| `CapabilitiesCarousel.tsx` | M2 (R1) | Swipe snap step change | `"selection"` | `tactileClass("tab")` |
| `LeadIntelligencePanel.tsx` | M2 (R2) | Region Switcher Tabs | `"selection"` | `tactileClass("tab")` |
| `LeadIntelligencePanel.tsx` | M2 (R2) | Expand / Collapse Drawer | `"medium"` | `tactileClass("drawerToggle")` |
| `LeadIntelligencePanel.tsx` | M2 (R2) | Redacted XLSX Download | `"success"` | `tactileClass("button")` |
| `CadDraftingRailStage.tsx` | M3 (R3) | Thumbnail Strip Selection | `"selection"` | `tactileClass("thumbnail")` |
| `CadDraftingRailStage.tsx` | M3 (R3) | Featured Stage Inspect | `"medium"` | `tactileClass("card")` |
| `CadInspectionModal.tsx` | M3 (R3) | Zoom In / Out / Reset | `"impact"` | `tactileClass("buttonSubtle")` |
| `CadInspectionModal.tsx` | M3 (R3) | Vector PDF/DWG Download | `"success"` | `tactileClass("button")` |

---

## 5. Verification Method

1. **TypeScript & Static Analysis**:
   - Verify `lib/tactile.ts` compiles cleanly with strict TypeScript 5.7.3 (`npm run typecheck`).
2. **SSR & Build Verification**:
   - Execute `npm run build` to confirm zero SSR hydration errors or `navigator is not defined` exceptions across all 34 static routes.
3. **Cross-Platform Behavior Verification**:
   - **Android Chrome/Firefox**: Test tap on region tabs and buttons — verify physical micro-vibration occurs.
   - **iOS Safari**: Verify tap on tabs and buttons does not trigger any JavaScript console errors and renders immediate `:active` micro-scaling.
   - **Desktop (macOS / Windows)**: Verify mouse down-press triggers `:active:scale-[0.98]` compression smoothly at 60fps.
   - **Reduced Motion Simulation**: Enable "Reduce Motion" in browser/OS settings; verify `isReducedMotionPreferred()` returns true, haptic vibrations are muted, and transform scaling is cleanly bypassed (`motion-reduce:transform-none`).
4. **Invalidation Conditions**:
   - If importing `lib/tactile.ts` in a Server Component causes SSR compilation failure, or if calling `triggerHaptic()` throws an unhandled exception on Safari/iOS.
