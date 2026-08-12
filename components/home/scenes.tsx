"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "./hooks";

/* ------------------------------------------------------------------ */
/* SCENE 01 — CAD: Precision technical drawing                          */
/* ------------------------------------------------------------------ */

export function CadScene({ active }: { active: boolean }) {
  return (
    <div className="relative h-full w-full select-none overflow-hidden bg-surface">
      {/* High-resolution produced drawing sheet */}
      <Image
        src="/media/cad/mb-plan.png"
        alt="Architectural general arrangement technical drawing"
        fill
        priority={active}
        sizes="(min-width: 1024px) 760px, 100vw"
        className="object-contain p-4"
      />

      {/* Top technical badges */}
      <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-2">
        <span className="bg-ink px-2.5 py-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-paper">
          Technical Drawing
        </span>
        <span className="hidden sm:inline-block bg-paper/90 border border-rule px-2 py-0.5 font-mono text-[0.5625rem] text-ink-muted">
          Master Bathroom · GA Plan
        </span>
      </div>

      {/* Bottom info bar */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-paper via-paper/80 to-transparent p-4 pt-12">
        <div className="flex items-end justify-between gap-4">
          <p className="text-xs text-ink-soft">
            Full architectural drawing package · 8344 × 5894 px
          </p>
          <span className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ink-muted">
            Sheet 01
          </span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* SCENE 02 — GROWTH OPERATIONS: a real workbook schema, redacted       */
/* ------------------------------------------------------------------ */

/**
 * Column headers and verification vocabulary are taken verbatim from a real
 * delivered workbook. Company identities are redacted, exactly as they are in
 * any published copy — the point is the system, not the targets.
 */
const COLUMNS = ["Rank", "Priority", "Score", "Company", "Segment", "Verification"];

const ROWS: { rank: string; priority: string; score: string; segment: string; status: string }[] = [
  { rank: "01", priority: "A++", score: "99", segment: "Luxury developer", status: "Verified" },
  { rank: "02", priority: "A+", score: "94", segment: "Hospitality group", status: "Verified" },
  { rank: "03", priority: "A+", score: "91", segment: "Fit-out contractor", status: "Verified" },
  { rank: "04", priority: "A", score: "86", segment: "Interior practice", status: "Source logged" },
  { rank: "05", priority: "A", score: "83", segment: "Commercial developer", status: "Source logged" },
  { rank: "06", priority: "B+", score: "77", segment: "Retail group", status: "Source logged" },
];

const CHECKS = ["Public route confirmed", "Active project evidence", "Source URL logged"];

export function DataScene({ active }: { active: boolean }) {
  const reduced = useReducedMotion();
  const [revealed, setRevealed] = useState(reduced ? ROWS.length : 0);
  const [selected, setSelected] = useState<number | null>(reduced ? 0 : null);
  const [checks, setChecks] = useState(reduced ? CHECKS.length : 0);

  // Reset when the scene is hidden by adjusting state during render rather
  // than in an effect, which avoids a cascading re-render.
  const [wasActive, setWasActive] = useState(active);
  if (active !== wasActive) {
    setWasActive(active);
    if (!active && !reduced) {
      setRevealed(0);
      setSelected(null);
      setChecks(0);
    }
  }

  useEffect(() => {
    if (reduced || !active) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    ROWS.forEach((_, i) => timers.push(setTimeout(() => setRevealed(i + 1), 160 + i * 130)));
    timers.push(setTimeout(() => setSelected(0), 1150));
    CHECKS.forEach((_, i) => timers.push(setTimeout(() => setChecks(i + 1), 1450 + i * 320)));
    return () => timers.forEach(clearTimeout);
  }, [active, reduced]);

  return (
    <div className="flex h-full w-full flex-col bg-paper-deep">
      <div className="flex items-center justify-between border-b border-rule px-4 py-2.5">
        <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-muted">
          Master leads
        </span>
        <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-faint">
          55 records · 18 fields
        </span>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden">
        <table className="w-full table-fixed border-collapse text-left">
          <thead>
            <tr className="border-b border-rule">
              {COLUMNS.map((c, i) => (
                <th
                  key={c}
                  className={`px-3 py-2 font-mono text-[0.5625rem] font-medium uppercase tracking-[0.12em] text-ink-faint ${
                    i === 3 ? "w-[26%]" : i === 4 ? "w-[26%]" : ""
                  } ${i > 3 ? "hidden sm:table-cell" : ""}`}
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r, i) => (
              <tr
                key={r.rank}
                className={`border-b border-rule/70 transition-all duration-500 ${
                  i < revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
                } ${selected === i ? "bg-accent-wash" : ""}`}
              >
                <td className="px-3 py-2 font-mono text-[0.6875rem] text-ink-muted">{r.rank}</td>
                <td className="px-3 py-2 font-mono text-[0.6875rem] text-accent">{r.priority}</td>
                <td className="px-3 py-2 font-mono text-[0.6875rem] text-ink-muted">{r.score}</td>
                <td className="px-3 py-2">
                  {/* Identities are withheld from public display. */}
                  <span
                    aria-label="Company name redacted"
                    className="inline-block h-2.5 w-full max-w-[7rem] rounded-[1px] bg-ink/25"
                  />
                </td>
                <td className="hidden px-3 py-2 text-[0.6875rem] text-ink-soft sm:table-cell">
                  {r.segment}
                </td>
                <td className="hidden px-3 py-2 font-mono text-[0.625rem] text-ink-muted sm:table-cell">
                  {r.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border-t border-rule px-4 py-3">
        <p className="font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-ink-faint">
          Qualification
        </p>
        <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1">
          {CHECKS.map((c, i) => (
            <li
              key={c}
              className={`flex items-center gap-1.5 text-[0.6875rem] transition-opacity duration-500 ${
                i < checks ? "opacity-100" : "opacity-25"
              }`}
            >
              <span
                aria-hidden="true"
                className={i < checks ? "text-success" : "text-ink-faint"}
              >
                ✓
              </span>
              <span className="text-ink-soft">{c}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* SCENE 03 — VISUAL CONTENT                                            */
/* ------------------------------------------------------------------ */

const VISUALS = [
  { src: "/media/visual/vis-24.webp", alt: "Hospitality interior visualisation exploring atmosphere and lighting" },
  { src: "/media/visual/vis-3.webp", alt: "Interior concept visualisation study exploring material and lighting treatment" },
  { src: "/media/visual/vis-36.webp", alt: "Interior visualisation exploring vertical volume and finish" },
  { src: "/media/visual/vis-14.webp", alt: "Commercial interior visualisation exploring material contrast" },
];

export function VisualScene({ active }: { active: boolean }) {
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (!active || reduced) return;
    const t = setInterval(() => setI((n) => (n + 1) % VISUALS.length), 2600);
    return () => clearInterval(t);
  }, [active, reduced]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-ink">
      {VISUALS.map((v, n) => (
        <Image
          key={v.src}
          src={v.src}
          alt={n === 0 ? v.alt : ""}
          aria-hidden={n === 0 ? undefined : true}
          fill
          loading={n === 0 ? undefined : "lazy"}
          priority={n === 0}
          sizes="(min-width: 1024px) 760px, 100vw"
          className={`object-cover transition-opacity duration-[1200ms] ${
            n === i ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-4 pt-16">
        <div className="flex items-end justify-between gap-4">
          <p className="max-w-xs text-[0.8125rem] leading-snug text-paper/85">
            Interior and product visualisation produced for client review, pitch material
            and campaign use.
          </p>
          <span className="shrink-0 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-paper/60">
            {String(i + 1).padStart(2, "0")} / {String(VISUALS.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </div>
  );
}
