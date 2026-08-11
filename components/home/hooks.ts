"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

/* --- reduced motion, modelled as the external store it actually is --- */

const MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeMotion(onChange: () => void) {
  const mq = window.matchMedia(MOTION_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

const getMotionSnapshot = () => window.matchMedia(MOTION_QUERY).matches;
/** The server cannot know the preference; assume motion is allowed. */
const getMotionServerSnapshot = () => false;

/**
 * True when the visitor has asked for reduced motion.
 * Every autoplay, scroll-driven sequence and transition on the homepage
 * checks this and degrades to a static, complete state.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribeMotion, getMotionSnapshot, getMotionServerSnapshot);
}

/** Fires once when an element first enters the viewport. */
export function useInView<T extends HTMLElement>(rootMargin = "-15% 0px") {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return { ref, inView };
}

/**
 * Advances an index on an interval. Pauses when the tab is hidden, when the
 * pointer is over the region, and entirely under reduced motion.
 */
export function useAutoAdvance(
  count: number,
  intervalMs: number,
  { paused = false, enabled = true }: { paused?: boolean; enabled?: boolean } = {},
) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!enabled || paused || count <= 1) return;
    let timer: ReturnType<typeof setInterval> | null = null;

    const start = () => {
      timer = setInterval(() => setIndex((i) => (i + 1) % count), intervalMs);
    };
    const stop = () => {
      if (timer) clearInterval(timer);
      timer = null;
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    start();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [count, intervalMs, paused, enabled]);

  return [index, setIndex] as const;
}
