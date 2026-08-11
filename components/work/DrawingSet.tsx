"use client";

import { useId, useState } from "react";
import Image from "next/image";

export type Sheet = {
  src: string;
  width: number;
  height: number;
  sheet: string;
  title: string;
  alt: string;
};

/**
 * Signature hero interaction.
 *
 * Steps through four sheets from one real coordinated drawing package —
 * plan, elevation, reflected ceiling, flooring — so the visitor can see that
 * these are documents of the same space rather than unrelated images.
 * That is the production value being sold, so the interaction earns its place.
 *
 * All four sheets share an identical intrinsic aspect ratio, so nothing is
 * cropped and switching causes no layout shift.
 */
export function DrawingSet({ sheets }: { sheets: Sheet[] }) {
  const [active, setActive] = useState(0);
  const groupId = useId();
  const current = sheets[active];

  return (
    <figure className="border border-rule bg-surface">
      <div className="relative aspect-[3200/2260] w-full overflow-hidden bg-paper-deep">
        {sheets.map((sheet, i) => (
          <Image
            key={sheet.src}
            src={sheet.src}
            alt={sheet.alt}
            width={sheet.width}
            height={sheet.height}
            // The first sheet is the LCP candidate on the homepage.
            priority={i === 0}
            loading={i === 0 ? undefined : "lazy"}
            sizes="(min-width: 1024px) 640px, (min-width: 640px) 90vw, 100vw"
            className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-300 ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={i === active ? undefined : true}
          />
        ))}
      </div>

      <div
        role="tablist"
        aria-label="Drawing sheets from one coordinated package"
        className="grid grid-cols-2 border-t border-rule sm:grid-cols-4"
      >
        {sheets.map((sheet, i) => {
          const selected = i === active;
          return (
            <button
              key={sheet.src}
              role="tab"
              id={`${groupId}-tab-${i}`}
              aria-selected={selected}
              aria-controls={`${groupId}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                  e.preventDefault();
                  const next = (i + 1) % sheets.length;
                  setActive(next);
                  document.getElementById(`${groupId}-tab-${next}`)?.focus();
                }
                if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                  e.preventDefault();
                  const prev = (i - 1 + sheets.length) % sheets.length;
                  setActive(prev);
                  document.getElementById(`${groupId}-tab-${prev}`)?.focus();
                }
              }}
              className={`min-h-[56px] border-rule px-3 py-3 text-left transition-colors [&:not(:last-child)]:border-r max-sm:[&:nth-child(-n+2)]:border-b ${
                selected ? "bg-ink text-paper" : "bg-surface text-ink-muted hover:bg-paper-deep"
              }`}
            >
              <span
                className={`block font-mono text-[0.625rem] uppercase tracking-[0.14em] ${
                  selected ? "text-paper/70" : "text-ink-faint"
                }`}
              >
                {sheet.sheet}
              </span>
              <span className="mt-1 block text-xs leading-snug">{sheet.title}</span>
            </button>
          );
        })}
      </div>

      <figcaption
        id={`${groupId}-panel`}
        role="tabpanel"
        aria-live="polite"
        className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-t border-rule px-5 py-4"
      >
        <span className="text-sm text-ink">{current.title}</span>
        <span className="meta">
          Sheet {active + 1} of {sheets.length} · one coordinated package
        </span>
      </figcaption>
    </figure>
  );
}
