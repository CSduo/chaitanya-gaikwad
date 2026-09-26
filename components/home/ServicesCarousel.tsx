"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Service } from "@/lib/services";
import { getServicePricing } from "@/lib/pricing";
import { getServiceWhatsAppHref } from "@/lib/site";
import { ServicePreview } from "./ServicePreview";
import { useReducedMotion } from "./hooks";
import { CAROUSEL_INTERVAL_MS, groupServices } from "@/lib/service-carousel";

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

  return <div className="mt-5 w-full" role="region" aria-roledescription="carousel" aria-label="Studio services">
    <div className="mb-3 flex items-center justify-between gap-2 border-b border-rule pb-2">
      <p className="font-mono text-[10px] text-ink-muted">{activePage * 3 + 1}–{Math.min((activePage + 1) * 3, services.length)} / {services.length} services</p>
      <div className="flex items-center gap-1">
        <button type="button" onClick={() => setPauseOverride(!paused)} aria-label={paused ? "Resume automatic service rotation" : "Pause automatic service rotation"} aria-pressed={paused} className="min-h-11 px-3 text-xs text-ink">{paused ? "Play" : "Pause"}</button>
        <button type="button" onClick={() => navigate(-1)} aria-label="Previous service group" className="h-11 w-11 border border-rule text-ink">←</button>
        <button type="button" onClick={() => navigate(1)} aria-label="Next service group" className="h-11 w-11 border border-rule text-ink">→</button>
      </div>
    </div>
    <div className="grid gap-3 md:grid-cols-3" aria-live={paused ? "polite" : "off"}>
      {groups[activePage].map(service => {
        const prices = getServicePricing(service.slug);
        const price = prices[0];
        return <article key={service.slug} className="service-carousel-card grid min-w-0 grid-cols-[42%_minmax(0,1fr)] overflow-hidden rounded-md border border-rule bg-white md:flex md:flex-col" onClickCapture={event => { if ((event.target as HTMLElement).closest("button,a,video")) setPauseOverride(true); }} onPlayCapture={() => setPauseOverride(true)}>
          <div className="service-carousel-preview min-w-0"><ServicePreview slug={service.slug} compact /></div>
          <div className="flex min-w-0 flex-1 flex-col p-3 md:p-4">
            <p className="font-mono text-[9px] uppercase tracking-wider text-ink-muted">0{service.order} / {service.motif}</p>
            <h3 className="mt-1 text-sm font-semibold leading-snug text-ink md:text-lg"><Link href={`/services/${service.slug}`}>{service.name}</Link></h3>
            <p className="mt-2 hidden text-xs leading-relaxed text-ink-muted md:line-clamp-2">{service.summary}</p>
            <p className="mb-2 mt-2 text-[11px] font-medium text-accent md:text-xs">{price?.label ?? "CAD packages · scoped quote"}</p>
            {prices.slice(1).map(tier => <a key={tier.id} href={tier.href} target="_blank" rel="noopener noreferrer" className="mb-1 text-[10px] text-ink-muted underline underline-offset-2">{tier.name} from $ {tier.amount}</a>)}
            <a href={price?.href ?? getServiceWhatsAppHref(service.slug)} target="_blank" rel="noopener noreferrer" className="mt-auto flex min-h-11 items-center justify-between gap-2 rounded-xs bg-ink px-2 py-2 text-[10px] font-semibold leading-snug text-white md:px-3 md:text-xs"><span>{price?.cta ?? "Get a CAD Quote"}</span><span aria-hidden="true">↗</span></a>
          </div>
        </article>;
      })}
    </div>
    <p className="mt-2 text-center text-[10px] text-ink-muted">USD starting prices · Scope agreed before work begins.</p>
  </div>;
}
