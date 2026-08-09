import { useEffect, type RefObject } from "react";
import { useMotionValue, useSpring, type MotionValue } from "motion/react";

export interface UseCursorProximityOptions {
  /** Optional target element ref. If provided, mouse offset is calculated relative to the element's center. Otherwise, window center is used. */
  elementRef?: RefObject<HTMLElement | null>;
  /** Spring stiffness coefficient. Lower = looser, higher = tighter. Default: 40 */
  stiffness?: number;
  /** Spring damping coefficient. Prevents oscillation. Default: 25 */
  damping?: number;
  /** Mass of the animated object. Default: 1 */
  mass?: number;
  /** Optional cap for maximum displacement distance in pixels. */
  maxDistance?: number;
  /** Whether proximity tracking is disabled. Default: false */
  disabled?: boolean;
}

export interface UseCursorProximityReturn {
  /** Smooth spring-animated X displacement from center */
  x: MotionValue<number>;
  /** Smooth spring-animated Y displacement from center */
  y: MotionValue<number>;
  /** Raw un-springed X displacement */
  rawX: MotionValue<number>;
  /** Raw un-springed Y displacement */
  rawY: MotionValue<number>;
}

/**
 * Custom motion hook tracking cursor position relative to window center or an element's center,
 * returning smooth spring-animated MotionValues without triggering React re-renders.
 */
export function useCursorProximity(
  options: UseCursorProximityOptions = {}
): UseCursorProximityReturn {
  const {
    elementRef,
    stiffness = 40,
    damping = 25,
    mass = 1,
    maxDistance,
    disabled = false,
  } = options;

  // Raw direct pointer offsets
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Spring-buffered motion values for fluid micro-interactions
  const x = useSpring(rawX, { stiffness, damping, mass });
  const y = useSpring(rawY, { stiffness, damping, mass });

  useEffect(() => {
    if (disabled || typeof window === "undefined") return;

    // Only activate cursor tracking on devices with fine pointer input (mouse / trackpad)
    const mediaQuery = window.matchMedia("(pointer: fine)");
    if (!mediaQuery.matches) return;

    const handlePointerMove = (e: PointerEvent) => {
      let offsetX = 0;
      let offsetY = 0;

      if (elementRef?.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        offsetX = e.clientX - centerX;
        offsetY = e.clientY - centerY;
      } else {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        offsetX = e.clientX - centerX;
        offsetY = e.clientY - centerY;
      }

      // Optional max distance capping
      if (maxDistance && maxDistance > 0) {
        const dist = Math.hypot(offsetX, offsetY);
        if (dist > maxDistance) {
          const factor = maxDistance / dist;
          offsetX *= factor;
          offsetY *= factor;
        }
      }

      // Direct motion value update (0 React re-renders)
      rawX.set(offsetX);
      rawY.set(offsetY);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [elementRef, maxDistance, disabled, rawX, rawY]);

  return { x, y, rawX, rawY };
}
