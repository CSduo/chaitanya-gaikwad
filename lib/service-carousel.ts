export const CAROUSEL_INTERVAL_MS = 5000;

/** Non-overlapping pages retain the published service order. */
export function groupServices<T>(services: readonly T[]): T[][] {
  return Array.from({ length: Math.ceil(services.length / 3) }, (_, index) => services.slice(index * 3, index * 3 + 3));
}
