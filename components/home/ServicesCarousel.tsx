"use client";

import { useState } from "react";
import Link from "next/link";
import type { Service } from "@/lib/services";
import { serviceAnchor } from "@/lib/services";
import { getServicePricing, PRICING_NOTE } from "@/lib/pricing";
import { getServiceWhatsAppHref } from "@/lib/site";
import { TACTILE_CLASSES, triggerHaptic } from "@/lib/tactile";
import { ServicePreview } from "./ServicePreview";
import { useAutoAdvance, useReducedMotion } from "./hooks";

export function ServicesCarousel({ services }: { services: Service[] }) {
  const reduced = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isMediaPlaying, setIsMediaPlaying] = useState(false);
  const [startIndex, setStartIndex] = useAutoAdvance(services.length, 7000, {
    paused: isPaused || isHovered || isFocused || isMediaPlaying,
    enabled: !reduced,
  });

  if (services.length === 0) return null;

  function navigate(index: number) {
    setIsMediaPlaying(false);
    setStartIndex((index + services.length) % services.length);
    triggerHaptic("selection");
  }

  const visibleServices = Array.from(
    { length: Math.min(3, services.length) },
    (_, offset) => services[(startIndex + offset) % services.length],
  );

  return (
    <div
      className="mt-8 w-full"
      role="region"
      aria-roledescription="carousel"
      aria-label="Studio services"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={() => setIsFocused(true)}
      onPlayCapture={() => setIsMediaPlaying(true)}
      onPauseCapture={() => setIsMediaPlaying(false)}
      onEndedCapture={() => setIsMediaPlaying(false)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsFocused(false);
      }}
    >
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-rule pb-4">
        <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-muted">
          <span className="text-accent">{String(startIndex + 1).padStart(2, "0")}</span>
          {` / ${String(services.length).padStart(2, "0")} · Your next competitive edge`}
        </p>
        <div className="flex items-center gap-2">
          {!reduced ? (
            <button
              type="button"
              onClick={() => setIsPaused((paused) => !paused)}
              aria-label={isPaused ? "Resume automatic service rotation" : "Pause automatic service rotation"}
              className="min-h-11 px-3 font-mono text-[0.625rem] text-ink-muted transition-colors hover:text-ink"
            >
              {isPaused ? "Resume rotation" : "Pause rotation"}
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => navigate(startIndex - 1)}
            aria-label="Previous service"
            className={`flex h-11 w-11 items-center justify-center rounded-md border border-rule bg-paper text-ink transition-colors hover:border-ink ${TACTILE_CLASSES.buttonSubtle}`}
          >
            &larr;
          </button>
          <button
            type="button"
            onClick={() => navigate(startIndex + 1)}
            aria-label="Next service"
            className={`flex h-11 w-11 items-center justify-center rounded-md border border-rule bg-paper text-ink transition-colors hover:border-ink ${TACTILE_CLASSES.buttonSubtle}`}
          >
            &rarr;
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {visibleServices.map((service) => {
          const pricing = getServicePricing(service.slug);
          const primary = pricing[0];
          return (
            <article
              key={service.slug}
              className="group flex min-w-0 flex-col overflow-hidden rounded-xl border border-rule bg-surface shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-accent/50 hover:shadow-[0_10px_40px_-20px_var(--accent)]"
            >
              <ServicePreview slug={service.slug} compact />
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <div className="flex items-center justify-between gap-3 font-mono text-[0.625rem] uppercase tracking-[0.12em]">
                  <span className="text-accent">{String(service.order).padStart(2, "0")} · {service.shortName}</span>
                  <a href={`#${serviceAnchor(service.slug)}`} className="shrink-0 py-2 text-ink-muted hover:text-accent" aria-label={`Jump to ${service.shortName} work on this page`}>
                    Work &darr;
                  </a>
                </div>
                <h3 className="mt-3 text-xl font-semibold leading-tight text-ink">
                  <Link href={`/services/${service.slug}`} className="transition-colors hover:text-accent">{service.name}</Link>
                </h3>
                <p className="mb-5 mt-3 text-sm leading-relaxed text-ink-muted">{service.summary}</p>
                <div className="mt-auto border-t border-rule pt-5">
                  {primary ? (
                    <p className="font-mono text-xs font-medium text-accent">{primary.label}</p>
                  ) : (
                    <p className="font-mono text-xs font-medium text-ink-soft">Scoped to your drawing package</p>
                  )}
                  <a
                    href={primary?.href ?? getServiceWhatsAppHref(service.slug)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex min-h-11 items-center justify-between gap-3 rounded-md bg-ink px-4 py-3 text-xs font-semibold text-paper transition-colors hover:bg-accent hover:text-white"
                  >
                    <span>{primary?.cta ?? "Get a CAD Quote"}</span>
                    <span aria-hidden="true">&nearr;</span>
                  </a>
                  {pricing.slice(1).map((tier) => (
                    <div key={tier.id} className="mt-4 border-t border-rule pt-4">
                      <p className="text-xs text-ink-muted">{tier.name}: {tier.label.toLowerCase()}</p>
                      <a href={tier.href} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex min-h-11 items-center gap-2 text-xs font-medium text-accent hover:underline">
                        {tier.cta}<span aria-hidden="true">&nearr;</span>
                      </a>
                    </div>
                  ))}
                  <Link href={`/services/${service.slug}`} className="mt-2 flex min-h-11 items-center justify-center text-xs text-ink-muted underline decoration-rule-strong underline-offset-4 hover:text-ink">
                    Explore the service
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-5 flex justify-center gap-1">
        {services.map((service, index) => (
          <button
            key={service.slug}
            type="button"
            onClick={() => navigate(index)}
            aria-label={`Show ${service.name}`}
            aria-current={index === startIndex ? "true" : undefined}
            className="flex h-11 w-11 items-center justify-center"
          >
            <span className={`h-1.5 rounded-full transition-all duration-300 ${index === startIndex ? "w-7 bg-accent" : "w-2 bg-rule-strong"}`} />
          </button>
        ))}
      </div>
      <p className="mt-2 text-center text-[0.6875rem] leading-relaxed text-ink-muted">{PRICING_NOTE}</p>
    </div>
  );
}
