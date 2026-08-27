"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import type { Service } from "@/lib/services";
import { TACTILE_CLASSES, triggerHaptic } from "@/lib/tactile";

const SERVICE_THEMES = [
  {
    slug: "cad-technical-production",
    accent: "text-sky-600 dark:text-sky-400",
    borderHover: "hover:border-sky-500/60 hover:shadow-sky-500/10",
    bgTag: "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/50 dark:text-sky-300 dark:border-sky-800",
    motif: "01 · DELIVER",
    descriptor: "Precision Drafting & Joinery",
  },
  {
    slug: "growth-marketing-b2b",
    accent: "text-amber-600 dark:text-amber-400",
    borderHover: "hover:border-amber-500/60 hover:shadow-amber-500/10",
    bgTag: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800",
    motif: "02 · GROW",
    descriptor: "Lead Intelligence & Outreach",
  },
  {
    slug: "visualisation-image-production",
    accent: "text-stone-700 dark:text-stone-300",
    borderHover: "hover:border-stone-500/60 hover:shadow-stone-500/10",
    bgTag: "bg-stone-100 text-stone-700 border-stone-200 dark:bg-stone-800/50 dark:text-stone-300 dark:border-stone-700",
    motif: "03 · VISUALISE",
    descriptor: "Photorealistic 3D Renders",
  },
  {
    slug: "video-ai-film-editing",
    accent: "text-rose-600 dark:text-rose-400",
    borderHover: "hover:border-rose-500/60 hover:shadow-rose-500/10",
    bgTag: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-800",
    motif: "04 · FILM",
    descriptor: "Cinematic Campaigns & AI Video",
  },
  {
    slug: "website-design-development",
    accent: "text-blue-600 dark:text-blue-400",
    borderHover: "hover:border-blue-500/60 hover:shadow-blue-500/10",
    bgTag: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800",
    motif: "05 · BUILD",
    descriptor: "Editorial Digital Platforms",
  },
  {
    slug: "automation-workflow-systems",
    accent: "text-emerald-600 dark:text-emerald-400",
    borderHover: "hover:border-emerald-500/60 hover:shadow-emerald-500/10",
    bgTag: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800",
    motif: "06 · AUTOMATE",
    descriptor: "CRM Sync & Lead Routing",
  },
];

export function ServicesCarousel({ services }: { services: Service[] }) {
  const [startIndex, setStartIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const AUTO_SCROLL_INTERVAL = 3800; // ms per advance
  const PROGRESS_TICK = 50;

  const handleNext = useCallback(() => {
    setStartIndex((prev) => (prev + 1) % services.length);
    setProgress(0);
    triggerHaptic("selection");
  }, [services.length]);

  const handlePrev = useCallback(() => {
    setStartIndex((prev) => (prev - 1 + services.length) % services.length);
    setProgress(0);
    triggerHaptic("selection");
  }, [services.length]);

  // Auto-scroll timer & progress bar
  useEffect(() => {
    if (isPaused) return;

    const progressTimer = setInterval(() => {
      setProgress((old) => {
        if (old >= 100) {
          handleNext();
          return 0;
        }
        return old + (PROGRESS_TICK / AUTO_SCROLL_INTERVAL) * 100;
      });
    }, PROGRESS_TICK);

    return () => clearInterval(progressTimer);
  }, [isPaused, handleNext]);

  // Generate 3 visible cards in loop order for seamless continuous viewing
  const visibleServices = [
    services[startIndex % services.length],
    services[(startIndex + 1) % services.length],
    services[(startIndex + 2) % services.length],
  ];

  return (
    <div
      className="mt-8 w-full select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      {/* 01 — Top Control & Live Status Bar */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-rule pb-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-mono text-xs">
            <span className="font-semibold text-accent">
              {`0${(startIndex % services.length) + 1}`}
            </span>
            <span className="text-ink-muted">―</span>
            <span className="font-semibold text-ink">
              {`0${((startIndex + 2) % services.length) + 1}`}
            </span>
            <span className="text-ink-faint">/ 06 visible</span>
          </div>

          <span className="hidden sm:inline-block rounded-xs bg-paper-deep px-2 py-0.5 font-mono text-[0.5625rem] text-ink-muted border border-rule">
            {isPaused ? "⏸ Auto-scroll paused" : "▶ Auto-scrolling"}
          </span>
        </div>

        {/* Previous / Next Controls & Progress Bar */}
        <div className="flex items-center gap-2">
          {/* Progress bar line */}
          <div className="hidden h-1 w-24 overflow-hidden rounded-full bg-rule sm:block">
            <div
              className="h-full bg-accent transition-all duration-75 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>

          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous 3 services"
            className={`flex h-8 w-8 items-center justify-center rounded-xs border border-rule bg-paper text-ink transition-colors hover:border-ink ${TACTILE_CLASSES.buttonSubtle}`}
          >
            &larr;
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next 3 services"
            className={`flex h-8 w-8 items-center justify-center rounded-xs border border-rule bg-paper text-ink transition-colors hover:border-ink ${TACTILE_CLASSES.buttonSubtle}`}
          >
            &rarr;
          </button>
        </div>
      </div>

      {/* 02 — 3-Visible Auto-Scrolling Track (Unified across PC & Mobile) */}
      <div
        ref={trackRef}
        className="grid grid-cols-1 gap-4 transition-all duration-300 md:grid-cols-3"
      >
        {visibleServices.map((s, idx) => {
          const theme = SERVICE_THEMES.find((t) => t.slug === s.slug) || SERVICE_THEMES[0];
          const isCenter = idx === 1;

          return (
            <div
              key={s.slug + idx + startIndex}
              className="w-full transition-all duration-300 animate-in fade-in zoom-in-95"
            >
              <div
                className={`group relative flex h-full min-h-[260px] flex-col justify-between rounded-lg border bg-surface p-6 shadow-2xs transition-all duration-200 ${
                  isCenter
                    ? "border-rule-strong shadow-xs ring-1 ring-rule"
                    : "border-rule"
                } ${theme.borderHover} hover:shadow-md ${TACTILE_CLASSES.card}`}
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

                  <h3 className="mt-3.5 text-lg font-semibold text-ink transition-colors group-hover:text-accent">
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

      {/* 03 — Bottom Slide Quick Selector Dots */}
      <div className="mt-5 flex items-center justify-center gap-1.5">
        {services.map((_, idx) => {
          const isSelected = idx === startIndex % services.length;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setStartIndex(idx);
                setProgress(0);
                triggerHaptic("selection");
              }}
              aria-label={`Jump to service ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                isSelected ? "w-7 bg-accent" : "w-2 bg-rule-strong hover:bg-ink-muted"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
