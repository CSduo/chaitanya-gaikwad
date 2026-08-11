"use client";

import { useState } from "react";
import Link from "next/link";
import { CadScene, DataScene, VisualScene } from "./scenes";
import { useAutoAdvance, useReducedMotion } from "./hooks";

const SCENES = [
  {
    n: "01",
    motif: "Deliver",
    label: "CAD & Technical Production",
    href: "/services/cad-technical-production",
    note: "Reference material in, editable drawing packages out.",
  },
  {
    n: "02",
    motif: "Grow",
    label: "Growth Operations",
    href: "/services/growth-operations",
    note: "Markets mapped, targets qualified, evidence logged.",
  },
  {
    n: "03",
    motif: "Present",
    label: "Visual Content",
    href: "/services/visual-content",
    note: "Spaces and products shown before they are built.",
  },
];

/**
 * The hero visual is a showreel of what the studio actually does, not a
 * carousel of decorative photography. Each scene is driven by real project
 * material. Autoplay pauses on hover and focus, and does not run at all under
 * reduced motion — where the controls remain fully usable.
 */
export function HeroShowreel() {
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [index, setIndex] = useAutoAdvance(SCENES.length, 6500, {
    paused,
    enabled: !reduced,
  });

  const current = SCENES[index];

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden border border-rule bg-paper-deep sm:aspect-[16/10]">
        <div className={index === 0 ? "h-full w-full" : "hidden"}>
          <CadScene active={index === 0} />
        </div>
        <div className={index === 1 ? "h-full w-full" : "hidden"}>
          <DataScene active={index === 1} />
        </div>
        <div className={index === 2 ? "h-full w-full" : "hidden"}>
          <VisualScene active={index === 2} />
        </div>
      </div>

      {/* Controls — always visible, never a hover-only affordance */}
      <div className="mt-px grid grid-cols-3 gap-px border border-rule bg-rule">
        {SCENES.map((s, i) => {
          const on = i === index;
          return (
            <button
              key={s.n}
              type="button"
              onClick={() => setIndex(i)}
              aria-current={on ? "true" : undefined}
              className={`min-h-[56px] px-3 py-3 text-left transition-colors ${
                on ? "bg-ink text-paper" : "bg-paper text-ink-muted hover:bg-paper-deep"
              }`}
            >
              <span
                className={`block font-mono text-[0.625rem] uppercase tracking-[0.14em] ${
                  on ? "text-paper/60" : "text-ink-faint"
                }`}
              >
                {s.n} · {s.motif}
              </span>
              <span className="mt-1 block text-[0.8125rem] leading-snug">{s.label}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <p className="text-sm text-ink-muted" aria-live="polite">
          {current.note}
        </p>
        <Link
          href={current.href}
          className="group inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-accent"
        >
          <span className="underline decoration-rule-strong underline-offset-4 group-hover:decoration-accent">
            View capability
          </span>
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
            &rarr;
          </span>
        </Link>
      </div>
    </div>
  );
}
