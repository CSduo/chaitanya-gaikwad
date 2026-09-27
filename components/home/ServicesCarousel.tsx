"use client";

import { useEffect, useState } from "react";
import type { Service } from "@/lib/services";
import { ServiceCard } from "./ServiceCard";
import { useReducedMotion } from "./hooks";
import { CAROUSEL_INTERVAL_MS, groupServices } from "@/lib/service-carousel";
import styles from "./ServicesCarousel.module.css";

export function ServicesCarousel({ services }: { services: Service[] }) {
  const reduced = useReducedMotion();
  const [page, setPage] = useState(0);
  const [pauseOverride, setPauseOverride] = useState<boolean | null>(null);
  const paused = pauseOverride ?? reduced;
  const groups = groupServices(services);
  const count = groups.length;

  useEffect(() => {
    if (paused || count < 2) return;
    let timer: ReturnType<typeof setInterval> | undefined;
    const stop = () => { if (timer) clearInterval(timer); timer = undefined; };
    const start = () => {
      stop();
      if (!document.hidden) timer = setInterval(() => setPage(value => (value + 1) % count), CAROUSEL_INTERVAL_MS);
    };
    start();
    document.addEventListener("visibilitychange", start);
    return () => { stop(); document.removeEventListener("visibilitychange", start); };
  }, [paused, count, page]);

  if (!count) return null;
  const activePage = page % count;
  const navigate = (offset: number) => setPage((activePage + offset + count) % count);

  return <div className={styles.carousel} role="region" aria-roledescription="carousel" aria-label="Studio services">
    <div className={styles.controls}>
      <p className="font-mono text-[10px] text-ink-muted">{activePage * 3 + 1}–{Math.min((activePage + 1) * 3, services.length)} / {services.length} services</p>
      <div className="flex items-center gap-1">
        <button type="button" onClick={() => setPauseOverride(!paused)} aria-label={paused ? "Resume automatic service rotation" : "Pause automatic service rotation"} aria-pressed={paused} className="min-h-11 px-3 text-xs text-ink">{paused ? "Play" : "Pause"}</button>
        <button type="button" onClick={() => navigate(-1)} aria-label="Previous service group" className={styles.controlButton}>←</button>
        <button type="button" onClick={() => navigate(1)} aria-label="Next service group" className={styles.controlButton}>→</button>
      </div>
    </div>
    <div className={styles.track} aria-live={paused ? "polite" : "off"}>
      {groups[activePage].map(service => <ServiceCard key={service.slug} service={service} onInteract={() => setPauseOverride(true)} />)}
    </div>
    <p className={styles.footnote}>USD starting prices · Scope agreed before work begins.</p>
  </div>;
}
