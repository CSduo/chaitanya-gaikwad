"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/primitives";
import { useReducedMotion, useInView } from "./hooks";

/**
 * Drives a staged sequence from checkpoint elements rather than a scroll
 * listener. Returns the current stage plus a ref callback to attach to each
 * checkpoint (which must carry a `data-stage` index).
 *
 * IntersectionObserver is used deliberately: it does not read layout on every
 * scroll event, and it keeps working where scroll events are throttled.
 */
function useStageSentinels(count: number, reduced: boolean) {
  const [stage, setStageIndex] = useState(reduced ? count - 1 : 0);
  const observer = useRef<IntersectionObserver | null>(null);
  // Checkpoints register before the effect runs, so collect them first.
  const pending = useRef<Set<HTMLElement>>(new Set());

  // Under reduced motion the finished state shows immediately. Adjusted during
  // render rather than in an effect to avoid a cascading re-render.
  const [wasReduced, setWasReduced] = useState(reduced);
  if (reduced !== wasReduced) {
    setWasReduced(reduced);
    if (reduced) setStageIndex(count - 1);
  }

  useEffect(() => {
    if (reduced) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const i = Number((entry.target as HTMLElement).dataset.stage);
          if (!Number.isNaN(i)) setStageIndex(i);
        }
      },
      // A one-pixel band across the viewport middle.
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    );
    observer.current = io;
    pending.current.forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      observer.current = null;
    };
  }, [reduced]);

  const attach = useCallback((el: HTMLElement | null) => {
    if (!el) return;
    pending.current.add(el);
    observer.current?.observe(el);
  }, []);

  return [stage, attach] as const;
}

/* ------------------------------------------------------------------ */
/* Shared chapter header                                               */
/* ------------------------------------------------------------------ */

function ChapterHead({
  n,
  motif,
  title,
  body,
  tags,
  href,
  tone = "light",
}: {
  n: string;
  motif: string;
  title: string[];
  body: string;
  tags: string[];
  href: string;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <div>
      <p
        className={`font-mono text-[0.6875rem] uppercase tracking-[0.18em] ${
          dark ? "text-paper/50" : "text-ink-faint"
        }`}
      >
        {n}
      </p>
      <p
        className={`mt-3 font-mono text-[0.8125rem] uppercase tracking-[0.28em] ${
          dark ? "text-paper/70" : "text-accent"
        }`}
      >
        {motif}
      </p>
      <h3
        className={`display mt-4 text-[2rem] leading-[1.05] sm:text-[2.75rem] lg:text-[3.25rem] ${
          dark ? "text-paper" : "text-ink"
        }`}
      >
        {title.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </h3>
      <p
        className={`mt-6 max-w-md text-base leading-relaxed ${
          dark ? "text-paper/70" : "text-ink-soft"
        }`}
      >
        {body}
      </p>

      <ul className="mt-8 flex flex-wrap gap-2">
        {tags.map((t) => (
          <li
            key={t}
            className={`border px-3 py-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.1em] ${
              dark ? "border-paper/25 text-paper/75" : "border-rule text-ink-muted"
            }`}
          >
            {t}
          </li>
        ))}
      </ul>

      <Link
        href={href}
        className={`group mt-10 inline-flex min-h-[44px] items-center gap-2 text-sm font-medium transition-colors ${
          dark ? "text-paper hover:text-paper/70" : "text-ink hover:text-accent"
        }`}
      >
        <span
          className={`underline underline-offset-4 ${
            dark ? "decoration-paper/40" : "decoration-rule-strong"
          }`}
        >
          Explore {motif === "Deliver" ? "CAD production" : motif === "Grow" ? "growth operations" : "visual content"}
        </span>
        <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
          &rarr;
        </span>
      </Link>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Transitions — DRAWING → DATA → IMAGE                                 */
/* ------------------------------------------------------------------ */

/**
 * Connective motif between chapters. Drawing lines stretch, become data rows,
 * then a data cell opens into an image frame — joining the three services into
 * one visual language.
 */
export function ChapterTransition({
  variant,
  tone = "light",
}: {
  variant: "lines-to-rows" | "rows-to-frame";
  tone?: "light" | "dark";
}) {
  const { ref, inView } = useInView<HTMLDivElement>("-25% 0px");
  const reduced = useReducedMotion();
  const on = inView || reduced;
  const stroke = tone === "dark" ? "rgb(250 248 245 / 0.28)" : "rgb(201 192 179 / 0.9)";

  return (
    <div ref={ref} aria-hidden="true" className="overflow-hidden py-10 sm:py-14">
      <Container width="page">
        <svg
          viewBox="0 0 1200 80"
          className="h-16 w-full sm:h-20"
          fill="none"
          preserveAspectRatio="none"
        >
          {variant === "lines-to-rows" ? (
            <>
              {[16, 32, 48, 64].map((y, i) => (
                <line
                  key={y}
                  x1="0"
                  y1={y}
                  x2="1200"
                  y2={y}
                  stroke={stroke}
                  strokeWidth="1"
                  strokeDasharray="1200"
                  strokeDashoffset={on ? 0 : 1200}
                  style={{
                    transition: reduced ? "none" : `stroke-dashoffset 1200ms ease ${i * 110}ms`,
                  }}
                />
              ))}
              {/* Lines resolve into cell divisions */}
              {[200, 400, 600, 800, 1000].map((x, i) => (
                <line
                  key={x}
                  x1={x}
                  y1="16"
                  x2={x}
                  y2="64"
                  stroke={stroke}
                  strokeWidth="1"
                  opacity={on ? 1 : 0}
                  style={{
                    transition: reduced ? "none" : `opacity 600ms ease ${700 + i * 90}ms`,
                  }}
                />
              ))}
            </>
          ) : (
            <>
              {[16, 32, 48, 64].map((y, i) => (
                <line
                  key={y}
                  x1="0"
                  y1={y}
                  x2="1200"
                  y2={y}
                  stroke={stroke}
                  strokeWidth="1"
                  opacity={on ? 0.25 : 1}
                  style={{ transition: reduced ? "none" : `opacity 900ms ease ${i * 80}ms` }}
                />
              ))}
              {/* One cell expands into a frame */}
              <rect
                x={on ? 470 : 560}
                y={on ? 6 : 30}
                width={on ? 260 : 80}
                height={on ? 68 : 20}
                stroke={stroke}
                strokeWidth="1"
                fill="none"
                style={{ transition: reduced ? "none" : "all 1100ms cubic-bezier(0.22,1,0.36,1) 400ms" }}
              />
            </>
          )}
        </svg>
      </Container>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* CHAPTER 02A — CAD & TECHNICAL PRODUCTION                             */
/* ------------------------------------------------------------------ */

const CAD_STAGES = [
  { k: "Reference", d: "Client render and measured sketch" },
  { k: "Dimensions", d: "Confirmed vs. derived, separated" },
  { k: "Drafting", d: "Native geometry, structured layers" },
  { k: "Annotation", d: "Dimensions, notes, sheet setup" },
  { k: "QA", d: "Checked, reopened, validated" },
];

const QA_CHECKS = ["Geometry", "Dimensions", "Orientation", "Layers", "Editability", "Handoff"];

export function CadChapter() {
  const reduced = useReducedMotion();
  const [stage, setStage] = useStageSentinels(CAD_STAGES.length, reduced);

  // Derived from the stage rather than raw scroll offset, so the sequence is
  // driven by discrete, observable checkpoints.
  const showOutput = stage >= 2;
  const showAnnotations = stage >= 3;
  const qaVisible =
    stage >= 4 ? QA_CHECKS.length : stage === 3 ? 3 : stage === 2 ? 1 : 0;

  /*
   * The scroll sequence is shorter on small screens: a touch visitor covers the
   * same ground in fewer, larger gestures, and a long sticky run costs more
   * than it earns there.
   */
  return (
    <section
      className={`relative ${reduced ? "" : "min-h-[160vh] lg:min-h-[240vh]"}`}
    >
      {/*
        Invisible checkpoints spaced through the scroll length. An
        IntersectionObserver advances the stage as each crosses the viewport
        middle — no scroll listener, no layout read per frame.
      */}
      {!reduced ? (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          {CAD_STAGES.map((s, i) => (
            <span
              key={s.k}
              data-stage={i}
              ref={setStage}
              className="absolute left-0 h-px w-full"
              style={{ top: `${8 + i * 21}%` }}
            />
          ))}
        </div>
      ) : null}

      <div className="sticky top-16 flex min-h-[calc(100dvh-4rem)] items-center py-12">
        <Container width="page">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <ChapterHead
                n="Service 01"
                motif="Deliver"
                title={["CAD &", "Technical", "Production"]}
                body="You send the design direction, the measurements and whatever references exist. We return coordinated, editable drawing packages your own team can open and continue."
                tags={["Plans", "Elevations", "RCP", "Flooring", "Drawing QA", "DWG / DXF / PDF"]}
                href="/services/cad-technical-production"
              />
            </div>

            <div className="lg:col-span-7">
              <div className="relative aspect-[4/3] w-full overflow-hidden border border-rule bg-ink">
                {/* Reference */}
                <Image
                  src="/media/cad/master-bathroom-render-input.webp"
                  alt="Client-supplied render used as the design reference"
                  fill
                  loading="lazy"
                  sizes="(min-width: 1024px) 700px, 100vw"
                  className="object-cover transition-opacity duration-700"
                  style={{ opacity: showOutput ? 0 : 1 }}
                />
                {/* Drafted output */}
                <Image
                  src="/media/cad/master-bathroom-plan.webp"
                  alt="Drafted general arrangement plan produced from the reference"
                  fill
                  loading="lazy"
                  sizes="(min-width: 1024px) 700px, 100vw"
                  className="object-cover transition-opacity duration-700"
                  style={{ opacity: showOutput ? 1 : 0 }}
                />

                {/* Annotation overlay — UI annotation describing the work, not drawn content */}
                <div
                  className="pointer-events-none absolute inset-0 transition-opacity duration-500"
                  style={{ opacity: showAnnotations ? 1 : 0 }}
                >
                  <svg viewBox="0 0 400 300" className="h-full w-full" fill="none" aria-hidden="true">
                    <g stroke="rgb(250 248 245 / 0.55)" strokeWidth="0.75">
                      <line x1="40" y1="24" x2="360" y2="24" />
                      <line x1="40" y1="18" x2="40" y2="30" />
                      <line x1="360" y1="18" x2="360" y2="30" />
                      <line x1="24" y1="52" x2="24" y2="250" />
                      <line x1="18" y1="52" x2="30" y2="52" />
                      <line x1="18" y1="250" x2="30" y2="250" />
                    </g>
                    <text x="200" y="18" textAnchor="middle" fill="rgb(250 248 245 / 0.75)" fontSize="8" fontFamily="monospace">
                      SETTING-OUT
                    </text>
                  </svg>
                  <span className="absolute bottom-3 left-3 bg-ink/70 px-2 py-1 font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-paper/80 backdrop-blur-sm">
                    Layers · dimensions · annotation
                  </span>
                </div>

                <span className="absolute right-3 top-3 bg-ink/70 px-2 py-1 font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-paper/85 backdrop-blur-sm">
                  {CAD_STAGES[stage].k}
                </span>
              </div>

              {/* Stage track */}
              <ol className="mt-px grid grid-cols-5 gap-px border border-rule bg-rule">
                {CAD_STAGES.map((s, i) => (
                  <li
                    key={s.k}
                    className={`px-2 py-3 transition-colors ${
                      i <= stage ? "bg-ink text-paper" : "bg-paper text-ink-faint"
                    }`}
                  >
                    <span className="block font-mono text-[0.5625rem] uppercase tracking-[0.1em]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="mt-1 block text-[0.6875rem] leading-tight">{s.k}</span>
                  </li>
                ))}
              </ol>

              {/* QA indicators */}
              <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
                {QA_CHECKS.map((c, i) => (
                  <li
                    key={c}
                    className={`flex items-center gap-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.08em] transition-opacity duration-500 ${
                      i < qaVisible ? "opacity-100" : "opacity-25"
                    }`}
                  >
                    <span aria-hidden="true" className={i < qaVisible ? "text-success" : "text-ink-faint"}>
                      ✓
                    </span>
                    <span className="text-ink-muted">{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* CHAPTER 02B — GROWTH OPERATIONS                                      */
/* ------------------------------------------------------------------ */

/** Figures are taken from a real delivered workbook. Nothing is illustrative. */
const FLOW = [
  { k: "Discover", d: "Market and sector mapped from public sources", fig: "459", unit: "records processed" },
  { k: "Qualify", d: "Directory-style and low-value records removed", fig: "294", unit: "removed to backup" },
  { k: "Verify", d: "Public route, project evidence and source URL logged", fig: "31", unit: "sources logged" },
  { k: "Structure", d: "Scored, ranked and segmented for outreach", fig: "30", unit: "strategic targets" },
];

export function GrowthChapter() {
  const { ref, inView } = useInView<HTMLDivElement>("-20% 0px");
  const reduced = useReducedMotion();
  const on = inView || reduced;

  return (
    <section ref={ref} className="border-y border-rule bg-paper-deep py-20 lg:py-28">
      <Container width="page">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <ChapterHead
              n="Service 02"
              motif="Grow"
              title={["Growth", "Operations"]}
              body="Structured groundwork before outreach is worth running: who is in the market, which of them are reachable, through what route, and on what evidence."
              tags={["Market mapping", "Qualification", "Verification", "Segmentation", "Tracking"]}
              href="/services/growth-operations"
            />
          </div>

          <div className="lg:col-span-7">
            <ol className="relative">
              {/* Connecting spine */}
              <span
                aria-hidden="true"
                className="absolute left-[1.0625rem] top-2 w-px bg-rule-strong transition-all duration-[1400ms] ease-out"
                style={{ height: on ? "calc(100% - 2rem)" : "0%" }}
              />
              {FLOW.map((f, i) => (
                <li
                  key={f.k}
                  className="relative flex gap-6 pb-10 last:pb-0"
                  style={{
                    opacity: on ? 1 : 0,
                    transform: on ? "translateY(0)" : "translateY(8px)",
                    transition: reduced ? "none" : `all 600ms ease ${i * 180}ms`,
                  }}
                >
                  <span className="relative z-10 flex h-[2.125rem] w-[2.125rem] shrink-0 items-center justify-center border border-rule-strong bg-paper font-mono text-[0.625rem] text-ink-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1 pt-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                      <h4 className="font-mono text-[0.8125rem] uppercase tracking-[0.16em] text-ink">
                        {f.k}
                      </h4>
                      <p className="font-mono text-[0.6875rem] text-ink-faint">
                        <span className="text-accent">{f.fig}</span> {f.unit}
                      </p>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">{f.d}</p>
                  </div>
                </li>
              ))}
            </ol>

            <p className="mt-8 border-t border-rule pt-5 font-mono text-[0.6875rem] leading-relaxed text-ink-faint">
              Figures from a delivered buyer-shortlist engagement. Target identities are
              withheld from public display.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* CHAPTER 02C — VISUAL CONTENT                                         */
/* ------------------------------------------------------------------ */

const REEL = [
  { src: "/media/visual/vis-24.webp", alt: "Hospitality interior visualisation", w: 1440, h: 1919 },
  { src: "/media/visual/vis-11.webp", alt: "Interior visualisation study showing vertical spatial composition", w: 1440, h: 1920 },
  { src: "/media/visual/vis-39.webp", alt: "Interior concept study with layered material palette", w: 1440, h: 1919 },
  { src: "/media/visual/vis-36.webp", alt: "Interior visualisation exploring vertical volume and finish", w: 1440, h: 1920 },
  { src: "/media/visual/vis-40.webp", alt: "Interior visualisation study of a residential space", w: 1438, h: 1920 },
];

const STEPS = ["Concept", "Visualise", "Present", "Publish"];

export function VisualChapter() {
  const { ref, inView } = useInView<HTMLDivElement>("-20% 0px");
  const reduced = useReducedMotion();
  const [playing, setPlaying] = useState(false);
  const on = inView || reduced;

  return (
    <section ref={ref} className="bg-ink py-20 text-paper lg:py-28">
      <Container width="page">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <ChapterHead
              n="Service 03"
              motif="Present"
              title={["Visual", "Content"]}
              body="Interior and product visualisation, short-form film and presentation material — produced for a specific placement rather than a generic export."
              tags={["Visualisation", "Product", "Film", "Presentation", "Campaign"]}
              href="/services/visual-content"
              tone="dark"
            />
          </div>

          <div className="lg:col-span-7">
            {/* Vertical reel windows, moving horizontally */}
            <ul className="flex gap-3 overflow-x-auto pb-3 [scrollbar-width:thin]">
              {REEL.map((r, i) => (
                <li
                  key={r.src}
                  className="w-[46%] shrink-0 sm:w-[30%]"
                  style={{
                    opacity: on ? 1 : 0,
                    transform: on ? "translateY(0)" : "translateY(10px)",
                    transition: reduced ? "none" : `all 700ms ease ${i * 120}ms`,
                  }}
                >
                  <div className="relative aspect-[9/16] overflow-hidden border border-paper/15 bg-paper/5">
                    <Image
                      src={r.src}
                      alt={r.alt}
                      fill
                      loading="lazy"
                      sizes="(min-width: 640px) 220px, 46vw"
                      className="object-cover"
                    />
                  </div>
                </li>
              ))}
            </ul>

            {/* One film, click to load */}
            <div className="mt-6 grid gap-6 sm:grid-cols-[1fr_auto] sm:items-end">
              <div className="relative aspect-video overflow-hidden border border-paper/15 bg-paper/5">
                {playing ? (
                  <video
                    src="/media/video/sultanah-co-moon-chair-cinematic-campaign.mp4"
                    poster="/media/video/sultanah-co-moon-chair-cinematic-campaign-poster.webp"
                    controls
                    autoPlay
                    playsInline
                    preload="metadata"
                    aria-label="Moon Chair cinematic product campaign"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <>
                    <Image
                      src="/media/video/sultanah-co-moon-chair-cinematic-campaign-poster.webp"
                      alt=""
                      fill
                      loading="lazy"
                      sizes="(min-width: 640px) 480px, 100vw"
                      className="object-cover opacity-80"
                    />
                    <button
                      type="button"
                      onClick={() => setPlaying(true)}
                      className="group absolute inset-0 flex items-center justify-center bg-ink/30 transition-colors hover:bg-ink/45"
                    >
                      <span className="sr-only">
                        Play the Moon Chair cinematic product campaign
                      </span>
                      <span
                        aria-hidden="true"
                        className="flex h-14 w-14 items-center justify-center rounded-full border border-paper/60 bg-ink/60 backdrop-blur-sm transition-transform group-hover:scale-105"
                      >
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </span>
                    </button>
                  </>
                )}
              </div>

              <ol className="flex gap-4 sm:flex-col sm:gap-3">
                {STEPS.map((s, i) => (
                  <li
                    key={s}
                    className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-paper/55"
                    style={{
                      opacity: on ? 1 : 0,
                      transition: reduced ? "none" : `opacity 500ms ease ${400 + i * 150}ms`,
                    }}
                  >
                    <span className="text-paper/35">{String(i + 1).padStart(2, "0")}</span>{" "}
                    {s}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
