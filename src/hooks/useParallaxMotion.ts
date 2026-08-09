import type { RefObject } from "react";
import { useScroll, useTransform, useSpring, type MotionValue } from "motion/react";

export interface UseParallaxMotionOptions<T extends number | string = number> {
  /** Optional container element ref. If omitted, tracks global window scroll. */
  targetRef?: RefObject<HTMLElement | null>;
  /** Viewport intersection offset triggers. Default: ["start end", "end start"] when targetRef is defined. */
  offset?: [string, string] | [number, number] | any;
  /** Scroll progress input domain range. Default: [0, 1] */
  inputRange?: [number, number];
  /** Transform output range (e.g. [-60, 60] Y displacement or [0, 45] rotation degrees). Default: [-60, 60] */
  outputRange?: [T, T] | T[];
  /** Whether to apply spring physics smoothing to scroll progress. Default: true */
  smooth?: boolean;
  /** Spring stiffness coefficient. Default: 50 */
  stiffness?: number;
  /** Spring damping coefficient. Default: 20 */
  damping?: number;
  /** Spring mass coefficient. Default: 1 */
  mass?: number;
}

export interface UseParallaxMotionReturn<T extends number | string = number> {
  /** Transformed motion value mapped to outputRange */
  value: MotionValue<T>;
  /** Progress value used for transform (smoothed if `smooth: true`) */
  progress: MotionValue<number>;
  /** Un-smoothed raw scroll progress motion value (0 to 1) */
  rawProgress: MotionValue<number>;
}

/**
 * Custom motion hook mapping container or window scroll progress to parallax displacement/rotation
 * with optional spring physics smoothing.
 */
export function useParallaxMotion<T extends number | string = number>(
  options: UseParallaxMotionOptions<T> = {}
): UseParallaxMotionReturn<T> {
  const {
    targetRef,
    offset = targetRef ? ["start end", "end start"] : undefined,
    inputRange = [0, 1],
    outputRange = [-60, 60] as unknown as T[],
    smooth = true,
    stiffness = 50,
    damping = 20,
    mass = 1,
  } = options;

  // 1. Obtain scroll progress from Framer Motion
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset,
  });

  // 2. Apply optional spring smoothing
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness,
    damping,
    mass,
  });

  const activeProgress = smooth ? smoothProgress : scrollYProgress;

  // 3. Transform progress into target output domain
  const value = useTransform(activeProgress, inputRange, outputRange);

  return {
    value,
    progress: activeProgress,
    rawProgress: scrollYProgress,
  };
}

/**
 * Convenience helper for vertical Y-axis parallax movement.
 */
export function useParallaxY(
  targetRef?: RefObject<HTMLElement | null>,
  distance: number = 60,
  smooth: boolean = true
): MotionValue<number> {
  const { value } = useParallaxMotion({
    targetRef,
    outputRange: [-distance, distance],
    smooth,
  });
  return value;
}

/**
 * Convenience helper for rotational parallax movement (e.g. drafting compass rotation).
 */
export function useParallaxRotation(
  targetRef?: RefObject<HTMLElement | null>,
  maxDegrees: number = 45,
  smooth: boolean = true
): MotionValue<number> {
  const { value } = useParallaxMotion({
    targetRef,
    outputRange: [0, maxDegrees],
    smooth,
  });
  return value;
}
