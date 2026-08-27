"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import type { Service } from "@/lib/services";
import { TACTILE_CLASSES, triggerHaptic } from "@/lib/tactile";

const SERVICE_THEMES = [
  {
    slug: "cad-technical-production",
    accent: "text-sky-600 dark:text-sky-400",
    borderHover: "hover:border-sky-500/50",
    bgTag: "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/40 dark:text-sky-300 dark:border-sky-800",
    motif: "01 · DELIVER",
    descriptor: "Precision Drafting & Joinery",
  },
  {
    slug: "growth-marketing-b2b",
    accent: "text-amber-600 dark:text-amber-400",
    borderHover: "hover:border-amber-500/50",
    bgTag: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800",
    motif: "02 · GROW",
    descriptor: "Lead Intelligence & Outreach",
  },
  {
    slug: "visualisation-image-production",
    accent: "text-stone-700 dark:text-stone-300",
    borderHover: "hover:border-stone-500/50",
    bgTag: "bg-stone-100 text-stone-700 border-stone-200 dark:bg-stone-800/40 dark:text-stone-300 dark:border-stone-700",
    motif: "03 · VISUALISE",
    descriptor: "Photorealistic 3D Renders",
  },
  {
    slug: "video-ai-film-editing",
    accent: "text-rose-600 dark:text-rose-400",
    borderHover: "hover:border-rose-500/50",
    bgTag: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800",
    motif: "04 · FILM",
    descriptor: "Cinematic Campaigns & AI Video",
  },
  {
    slug: "website-design-development",
    accent: "text-blue-600 dark:text-blue-400",
    borderHover: "hover:border-blue-500/50",
    bgTag: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800",
    motif: "05 · BUILD",
    descriptor: "Editorial Digital Platforms",
  },
  {
    slug: "automation-workflow-systems",
    accent: "text-emerald-600 dark:text-emerald-400",
    borderHover: "hover:border-emerald-500/50",
    bgTag: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800",
    motif: "06 · AUTOMATE",
    descriptor: "CRM Sync & Lead Routing",
  },
];

export function ServicesCarousel({ services }: { services: Service[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Sync scroll position with active dot on mobile
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    const scrollLeft = el.scrollLeft;
    const itemWidth = el.offsetWidth * 0.85; // Mobile card width is ~85%
    const index = Math.round(scrollLeft / itemWidth);
    if (index >= 0 && index < services.length && index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  const scrollToSlide = (idx: number) => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    const itemWidth = el.offsetWidth * 0.88;
    el.scrollTo({ left: idx * itemWidth, behavior: "smooth" });
    setActiveIndex(idx);
    triggerHaptic("selection");
  };

  const nextSlide = () => {
    const next = (activeIndex + 1) % services.length;
    scrollToSlide(next);
  };

  const prevSlide = () => {
    const prev = (activeIndex - 1 + services.length) % services.length;
    scrollToSlide(prev);
  };

  return (
    <div className="mt-8">
      {/* Mobile Top Controls & Indicators (Visible on < md) */}
      <div className="flex items-center justify-between pb-3 md:hidden">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-semibold text-accent">
            {`0${activeIndex + 1}`}
          </span>
          <span className="font-mono text-xs text-ink-faint">/ 06</span>
          <span className="ml-2 font-mono text-[0.625rem] uppercase tracking-wider text-ink-muted">
            {SERVICE_THEMES[activeIndex]?.descriptor}
          </span>
        </div>

        {/* Arrow Navigation */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous service"
            className={`flex h-8 w-8 items-center justify-center rounded-xs border border-rule bg-paper text-ink transition-colors hover:border-ink ${TACTILE_CLASSES.buttonSubtle}`}
          >
            &larr;
          </button>
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next service"
            className={`flex h-8 w-8 items-center justify-center rounded-xs border border-rule bg-paper text-ink transition-colors hover:border-ink ${TACTILE_CLASSES.buttonSubtle}`}
          >
            &rarr;
          </button>
        </div>
      </div>

      {/* Mobile Horizontal Snapping Slider / Desktop 3-Column Grid */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scrollbar-none md:grid md:grid-cols-2 md:gap-4 md:overflow-visible md:pb-0 lg:grid-cols-3"
      >
        {services.map((s, idx) => {
          const theme = SERVICE_THEMES.find((t) => t.slug === s.slug) || SERVICE_THEMES[0];
          const isSelected = activeIndex === idx;

          return (
            <div
              key={s.slug}
              className="w-[85vw] max-w-[340px] shrink-0 snap-center md:w-auto md:max-w-none md:shrink"
            >
              <div
                className={`group relative flex h-full flex-col justify-between rounded-lg border bg-surface p-6 shadow-2xs transition-all duration-200 ${
                  isSelected ? "border-ink shadow-sm ring-1 ring-ink/10 md:ring-0" : "border-rule"
                } ${theme.borderHover} hover:shadow-sm ${TACTILE_CLASSES.card}`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-block rounded-xs border px-2 py-0.5 font-mono text-[0.625rem] font-semibold uppercase tracking-[0.14em] ${theme.bgTag}`}
                    >
                      {theme.motif}
                    </span>
                    <a
                      href={`#service-${s.slug}`}
                      className="text-xs text-ink-muted transition-transform group-hover:translate-y-0.5 group-hover:text-accent font-mono"
                      title="Jump to section on page"
                    >
                      ↓ on page
                    </a>
                  </div>

                  <h3 className="mt-3 text-lg font-semibold text-ink transition-colors group-hover:text-accent">
                    <Link href={`/services/${s.slug}`} className="after:absolute after:inset-0">
                      {s.name}
                    </Link>
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-ink-muted line-clamp-3">
                    {s.summary}
                  </p>
                </div>

                {/* Footer Action */}
                <div className="mt-6 flex items-center justify-between border-t border-rule/70 pt-3 text-xs">
                  <span className="font-mono text-[0.6875rem] font-medium text-ink-soft group-hover:text-ink">
                    Explore {s.shortName}
                  </span>
                  <span
                    aria-hidden="true"
                    className="font-mono text-ink-faint transition-transform group-hover:translate-x-1 group-hover:text-accent"
                  >
                    &rarr;
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile Interactive Pagination Dots */}
      <div className="mt-2 flex items-center justify-center gap-1.5 md:hidden">
        {services.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => scrollToSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              activeIndex === idx ? "w-6 bg-accent" : "w-1.5 bg-rule-strong"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
