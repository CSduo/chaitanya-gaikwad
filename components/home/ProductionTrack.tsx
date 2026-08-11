"use client";

import { useState } from "react";
import { useInView, useReducedMotion } from "./hooks";

/**
 * Horizontal production track. One reusable system: the four stages are fixed,
 * and the payload at each stage changes with the selected discipline.
 */
const STAGES = ["Brief", "Production", "Review / QA", "Handoff"] as const;

const TRACKS = [
  {
    id: "cad",
    label: "CAD",
    payload: ["PDF & measurements", "Drafting", "Dimensional QA", "DWG / DXF"],
  },
  {
    id: "growth",
    label: "Growth",
    payload: ["Market definition", "Research", "Verification", "Structured data"],
  },
  {
    id: "visual",
    label: "Visual",
    payload: ["Reference & placement", "Production", "Refinement", "Delivery formats"],
  },
];

const DETAIL = [
  "What is confirmed, assumed and missing is established before anything is produced.",
  "Work runs against an agreed scope, with structure maintained across the set.",
  "Checked, reopened and validated against the brief that was issued.",
  "Issued in formats your team can open, interrogate and continue.",
];

export function ProductionTrack() {
  const { ref, inView } = useInView<HTMLDivElement>("-20% 0px");
  const reduced = useReducedMotion();
  const [track, setTrack] = useState(0);
  const on = inView || reduced;

  return (
    <div ref={ref}>
      {/* Discipline switch */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="label mr-2">Discipline</span>
        {TRACKS.map((t, i) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTrack(i)}
            aria-pressed={i === track}
            className={`min-h-[44px] border px-4 text-sm transition-colors ${
              i === track
                ? "border-ink bg-ink text-paper"
                : "border-rule text-ink-muted hover:border-ink hover:text-ink"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Track */}
      <ol className="mt-10 grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
        {STAGES.map((s, i) => (
          <li key={s} className="relative bg-paper p-6 lg:p-7">
            {/* Progress line, drawn as the section enters */}
            <span
              aria-hidden="true"
              className="absolute left-0 top-0 h-px bg-accent transition-all duration-700 ease-out"
              style={{
                width: on ? "100%" : "0%",
                transitionDelay: reduced ? "0ms" : `${i * 260}ms`,
              }}
            />
            <div className="flex items-baseline justify-between gap-3">
              <span className="label">{String(i + 1).padStart(2, "0")}</span>
              <span
                aria-hidden="true"
                className="font-mono text-[0.625rem] text-ink-faint transition-opacity duration-500"
                style={{ opacity: on ? 1 : 0, transitionDelay: `${i * 260 + 300}ms` }}
              >
                {i < STAGES.length - 1 ? "→" : "■"}
              </span>
            </div>

            <h3 className="mt-4 text-base font-semibold tracking-tight text-ink">{s}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">{DETAIL[i]}</p>

            <p
              key={TRACKS[track].payload[i]}
              className="mt-5 border-t border-rule pt-4 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-accent"
            >
              {TRACKS[track].payload[i]}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
