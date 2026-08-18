"use client";

import { useEffect, useState } from "react";
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
/* ------------------------------------------------------------------ */
/* SCENE 02 — GROWTH OPERATIONS: Real Automotive Showroom Intelligence */
/* ------------------------------------------------------------------ */

export type RealLeadRecord = {
  rank: string;
  priority: string;
  score: string;
  company: string;
  brands: string;
  leadType: string;
  location: string;
  role: string;
  route: string;
  status: string;
};

const REAL_COLUMNS = [
  { label: "Rank", minWidth: "w-14" },
  { label: "Priority", minWidth: "w-16" },
  { label: "Score", minWidth: "w-14" },
  { label: "Company / Dealer Group", minWidth: "w-56" },
  { label: "Brands Represented", minWidth: "w-48" },
  { label: "Lead Type / Facility", minWidth: "w-48" },
  { label: "City / Region", minWidth: "w-36" },
  { label: "Decision-Maker Role", minWidth: "w-48" },
  { label: "Best Contact Route", minWidth: "w-52" },
  { label: "Verification Status", minWidth: "w-40" },
];

const REAL_ROWS: RealLeadRecord[] = [
  {
    rank: "01",
    priority: "A++",
    score: "98",
    company: "Al-Futtaim BYD KSA",
    brands: "BYD EVs & Hybrids",
    leadType: "Flagship Showroom Network",
    location: "Riyadh, Saudi Arabia",
    role: "Managing Director / Projects",
    route: "Official BYD Business Channel",
    status: "Verified · 2026 Rollout",
  },
  {
    rank: "02",
    priority: "A++",
    score: "96",
    company: "Al-Futtaim BYD KSA",
    brands: "BYD",
    leadType: "Mall & Retail Showroom",
    location: "Dhahran, Saudi Arabia",
    role: "Dealer Operations / Projects",
    route: "Official Branch Route",
    status: "Verified · Active Location",
  },
  {
    rank: "03",
    priority: "A+",
    score: "94",
    company: "Al-Futtaim BYD KSA",
    brands: "BYD",
    leadType: "Integrated 3S Facility",
    location: "Abha, Saudi Arabia",
    role: "Dealer Development / Facilities",
    route: "Corporate Route",
    status: "Verified · 3S Facility",
  },
  {
    rank: "04",
    priority: "A++",
    score: "97",
    company: "SAMACO Automotive (Porsche)",
    brands: "Porsche",
    leadType: "Luxury Dealership Flagship",
    location: "Riyadh, Saudi Arabia",
    role: "Marketing / Projects / Facilities",
    route: "Porsche Brand Channel",
    status: "Verified · Luxury Flagship",
  },
  {
    rank: "05",
    priority: "A+",
    score: "94",
    company: "SAMACO Automotive (Porsche)",
    brands: "Porsche",
    leadType: "VIP Retail & Lounge",
    location: "Jeddah, Saudi Arabia",
    role: "Projects / Brand Manager",
    route: "Corporate Channel",
    status: "Verified · VIP Retail",
  },
  {
    rank: "06",
    priority: "A+",
    score: "93",
    company: "SAMACO Automotive (Audi)",
    brands: "Audi",
    leadType: "Premium Dealership",
    location: "Riyadh, Saudi Arabia",
    role: "Audi Brand Manager / Facilities",
    route: "Official Corporate Route",
    status: "Verified · Prime Market",
  },
  {
    rank: "07",
    priority: "A",
    score: "91",
    company: "SAMACO Automotive (Audi)",
    brands: "Audi",
    leadType: "Premium Dealership",
    location: "Jeddah, Saudi Arabia",
    role: "Projects & Marketing",
    route: "Corporate Contact Route",
    status: "Verified · Active Branch",
  },
  {
    rank: "08",
    priority: "A++",
    score: "99",
    company: "SAMACO Automotive (Supercar Group)",
    brands: "Lamborghini, Bentley, Bugatti, Pagani",
    leadType: "Ultra-Luxury Dealer Group",
    location: "Riyadh / Jeddah, KSA",
    role: "Luxury Brands Director",
    route: "Executive Channel",
    status: "Verified · VIP Configuration",
  },
  {
    rank: "09",
    priority: "A++",
    score: "96",
    company: "Mohamed Yousuf Naghi Motors",
    brands: "BMW, MINI, Rolls-Royce",
    leadType: "Luxury Dealership Network",
    location: "Jeddah / Riyadh, KSA",
    role: "Dealer Development / Facilities",
    route: "Corporate Executive Route",
    status: "Verified · National Network",
  },
  {
    rank: "10",
    priority: "A+",
    score: "95",
    company: "Wallan Trading Company (Genesis)",
    brands: "Genesis & Hyundai Luxury",
    leadType: "Luxury Flagship Retail",
    location: "Riyadh, Saudi Arabia",
    role: "Brand Director / Projects",
    route: "Official Wallan Route",
    status: "Verified · Flagship Network",
  },
];

const CHECKS = [
  "Public route confirmed",
  "Active project signal",
  "Decision-maker mapped",
  "Source logged",
];

export function DataScene({ active }: { active: boolean }) {
  const reduced = useReducedMotion();
  const [revealed, setRevealed] = useState(reduced ? REAL_ROWS.length : 0);
  const [selected, setSelected] = useState<number | null>(reduced ? 0 : null);
  const [checks, setChecks] = useState(reduced ? CHECKS.length : 0);

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
    REAL_ROWS.forEach((_, i) =>
      timers.push(setTimeout(() => setRevealed(i + 1), 120 + i * 90)),
    );
    timers.push(setTimeout(() => setSelected(0), 1050));
    CHECKS.forEach((_, i) =>
      timers.push(setTimeout(() => setChecks(i + 1), 1200 + i * 220)),
    );
    return () => timers.forEach(clearTimeout);
  }, [active, reduced]);

  return (
    <div className="flex h-full w-full flex-col bg-paper-deep">
      {/* Top Header Bar with Live Dataset Metadata & Scroll Prompt */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rule bg-paper px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
          <span className="font-mono text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-ink">
            Automotive Showroom Lead Intelligence
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ink-muted sm:inline-block">
            114 records · 22 research fields
          </span>
          <span className="inline-flex items-center gap-1 rounded-xs bg-paper-deep px-2 py-0.5 font-mono text-[0.5625rem] font-medium text-accent border border-rule">
            <span>⇄</span>
            <span>Scroll horizontally</span>
          </span>
        </div>
      </div>

      {/* Horizontally & Vertically Scrollable Interactive Table */}
      <div className="min-h-0 flex-1 overflow-x-auto overflow-y-auto overscroll-contain">
        <table className="min-w-[940px] w-full border-collapse text-left text-xs">
          <thead className="sticky top-0 z-10 bg-paper-deep/95 backdrop-blur-xs border-b border-rule">
            <tr>
              {REAL_COLUMNS.map((col) => (
                <th
                  key={col.label}
                  className={`px-3 py-2 font-mono text-[0.5625rem] font-medium uppercase tracking-[0.12em] text-ink-muted ${col.minWidth}`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {REAL_ROWS.map((r, i) => (
              <tr
                key={r.rank + r.company}
                className={`border-b border-rule/70 transition-all duration-300 hover:bg-surface ${
                  i < revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
                } ${selected === i ? "bg-accent-wash/60" : ""}`}
              >
                <td className="px-3 py-2 font-mono text-[0.6875rem] font-medium text-ink-muted">
                  {r.rank}
                </td>
                <td className="px-3 py-2 font-mono text-[0.6875rem] font-semibold text-accent">
                  {r.priority}
                </td>
                <td className="px-3 py-2 font-mono text-[0.6875rem] text-ink-soft">
                  {r.score}
                </td>
                <td className="px-3 py-2 font-medium text-ink">
                  {r.company}
                </td>
                <td className="px-3 py-2 text-ink-soft text-[0.6875rem]">
                  {r.brands}
                </td>
                <td className="px-3 py-2 text-ink-muted text-[0.6875rem]">
                  {r.leadType}
                </td>
                <td className="px-3 py-2 font-mono text-[0.625rem] text-ink-soft">
                  {r.location}
                </td>
                <td className="px-3 py-2 text-ink-soft text-[0.6875rem]">
                  {r.role}
                </td>
                <td className="px-3 py-2 font-mono text-[0.625rem] text-ink-muted">
                  {r.route}
                </td>
                <td className="px-3 py-2 font-mono text-[0.625rem] text-success">
                  {r.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bottom Qualification Bar with Deep Link */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-rule bg-paper px-4 py-2.5">
        <div className="flex items-center gap-3">
          <p className="font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-ink-faint">
            Verified Checks
          </p>
          <ul className="flex flex-wrap gap-x-4 gap-y-1">
            {CHECKS.map((c, i) => (
              <li
                key={c}
                className={`flex items-center gap-1 text-[0.625rem] transition-opacity duration-300 ${
                  i < checks ? "opacity-100" : "opacity-25"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={i < checks ? "text-success font-bold" : "text-ink-faint"}
                >
                  ✓
                </span>
                <span className="text-ink-soft">{c}</span>
              </li>
            ))}
          </ul>
        </div>
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
