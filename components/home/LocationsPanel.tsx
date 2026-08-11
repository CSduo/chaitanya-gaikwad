"use client";

import { useInView, useReducedMotion } from "./hooks";

/**
 * Geographic presence rendered as an abstract longitude grid rather than a map
 * screenshot. Two markers, one connecting arc.
 *
 * Deliberately country-level: no city is named and no classification
 * ("registered office", "correspondence") is claimed, because none has been
 * verified. Both are additive once the owner supplies them.
 */
export function LocationsPanel({
  locations,
}: {
  locations: { slug: string; name: string; summary: string; timezone?: string }[];
}) {
  const { ref, inView } = useInView<HTMLDivElement>("-20% 0px");
  const reduced = useReducedMotion();
  const on = inView || reduced;

  return (
    <div ref={ref} className="relative">
      {/* Longitude / latitude ground */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1200 340"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        fill="none"
      >
        {Array.from({ length: 13 }, (_, i) => i * 100).map((x) => (
          <line key={`v${x}`} x1={x} y1="0" x2={x} y2="340" stroke="var(--color-rule)" strokeWidth="1" />
        ))}
        {[0, 68, 136, 204, 272, 340].map((y) => (
          <line key={`h${y}`} x1="0" y1={y} x2="1200" y2={y} stroke="var(--color-rule)" strokeWidth="1" />
        ))}

        {/* Connecting arc — UK to India, schematic not cartographic */}
        <path
          d="M 300 150 Q 560 60 830 190"
          stroke="var(--color-accent)"
          strokeWidth="1.25"
          strokeDasharray="700"
          strokeDashoffset={on ? 0 : 700}
          opacity="0.55"
          style={{ transition: reduced ? "none" : "stroke-dashoffset 1600ms ease 200ms" }}
        />
        <circle cx="300" cy="150" r={on ? 5 : 0} fill="var(--color-accent)" style={{ transition: reduced ? "none" : "r 500ms ease 400ms" }} />
        <circle cx="830" cy="190" r={on ? 5 : 0} fill="var(--color-accent)" style={{ transition: reduced ? "none" : "r 500ms ease 900ms" }} />
      </svg>

      <div className="relative px-2 py-16 sm:py-20">
        <p className="label text-center">Working across</p>

        <div className="mx-auto mt-12 grid max-w-3xl gap-10 sm:grid-cols-2">
          {locations.map((loc, i) => (
            <div
              key={loc.slug}
              className="text-center"
              style={{
                opacity: on ? 1 : 0,
                transform: on ? "translateY(0)" : "translateY(10px)",
                transition: reduced ? "none" : `all 600ms ease ${500 + i * 200}ms`,
              }}
            >
              <h3 className="display text-2xl sm:text-3xl">{loc.name}</h3>
              {loc.timezone ? <p className="meta mt-2">{loc.timezone}</p> : null}
              <p className="mx-auto mt-4 max-w-xs text-sm leading-relaxed text-ink-muted">
                {loc.summary}
              </p>
            </div>
          ))}
        </div>

        <div
          className="mt-14 text-center"
          style={{
            opacity: on ? 1 : 0,
            transition: reduced ? "none" : "opacity 700ms ease 1100ms",
          }}
        >
          <p className="label">International delivery</p>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-muted">
            Engagements run across the United Kingdom, Europe, the Middle East and Asia,
            delivered digitally and scheduled around the client&rsquo;s working day.
          </p>
        </div>
      </div>
    </div>
  );
}
