"use client";

import { useState } from "react";
import Image from "next/image";
import { CadScene, DataScene } from "./scenes";
import { useAutoAdvance, useReducedMotion } from "./hooks";
import { featuredVisuals } from "@/lib/visuals";
import { featuredVideos } from "@/lib/portfolio";

/* ------------------------------------------------------------------ */
/* Scenes unique to the hero                                           */
/* ------------------------------------------------------------------ */

function VisualisationScene({ active }: { active: boolean }) {
  const picks = featuredVisuals(4);
  return (
    <div className="grid h-full w-full grid-cols-2 gap-px bg-rule">
      {picks.map((v, i) => (
        <div key={v.src} className="relative overflow-hidden bg-paper-deep">
          <Image
            src={v.src}
            alt={i === 0 ? v.alt : ""}
            aria-hidden={i === 0 ? undefined : true}
            fill
            priority={active && i === 0}
            loading={active && i === 0 ? undefined : "lazy"}
            sizes="(min-width: 1024px) 380px, 50vw"
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}

function VideoScene() {
  const picks = featuredVideos(3);
  return (
    <div className="grid h-full w-full grid-cols-3 gap-px bg-rule">
      {picks.map((v, i) => (
        <div key={v.slug} className="relative overflow-hidden bg-ink">
          <Image
            src={v.poster}
            alt={i === 0 ? `Still from ${v.title}` : ""}
            aria-hidden={i === 0 ? undefined : true}
            fill
            loading="lazy"
            sizes="(min-width: 1024px) 250px, 33vw"
            className="object-cover opacity-90"
          />
          <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent px-3 pb-3 pt-8">
            <span className="block truncate font-mono text-[0.5625rem] uppercase tracking-[0.12em] text-paper/70">
              {v.client ?? v.clientDescriptor}
            </span>
          </span>
          {i === 1 ? (
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-paper/60 bg-ink/55 text-paper"
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          ) : null}
        </div>
      ))}
    </div>
  );
}

const FLOW = ["Enquiry", "Route", "Qualify", "Track", "Follow up"];

function AutomationScene({ active }: { active: boolean }) {
  const reduced = useReducedMotion();
  const on = active || reduced;
  return (
    <div className="flex h-full w-full flex-col justify-center bg-paper-deep px-6 py-8 sm:px-10">
      <p className="label mb-6">Workflow</p>
      <ol className="space-y-0">
        {FLOW.map((step, i) => (
          <li key={step} className="flex items-center gap-4">
            <div className="flex flex-col items-center">
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center border border-rule-strong bg-paper font-mono text-[0.5625rem] text-ink-muted transition-opacity duration-500"
                style={{
                  opacity: on ? 1 : 0.15,
                  transitionDelay: reduced ? "0ms" : `${i * 180}ms`,
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              {i < FLOW.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="w-px bg-rule-strong transition-all duration-500"
                  style={{
                    height: on ? "1.75rem" : "0rem",
                    transitionDelay: reduced ? "0ms" : `${i * 180 + 120}ms`,
                  }}
                />
              ) : null}
            </div>
            <span
              className="text-sm text-ink-soft transition-opacity duration-500"
              style={{ opacity: on ? 1 : 0.2, transitionDelay: reduced ? "0ms" : `${i * 180}ms` }}
            >
              {step}
              {i === 2 ? (
                <span className="ml-2 font-mono text-[0.625rem] text-accent">rules applied</span>
              ) : null}
            </span>
          </li>
        ))}
      </ol>
      <p className="mt-6 border-t border-rule pt-4 font-mono text-[0.625rem] leading-relaxed text-ink-faint">
        Systems built inside the tools a team already uses.
      </p>
    </div>
  );
}

function WebScene() {
  return (
    <div className="flex h-full w-full flex-col justify-center bg-paper-deep px-6 py-8 sm:px-10">
      <p className="label mb-5">Live builds</p>
      <ul className="space-y-px bg-rule">
        {[
          { name: "Export brand website", host: "xiyora.vercel.app" },
          { name: "Academic journal platform", host: "anvikshikijournal.in" },
          { name: "XIYÀTO studio site", host: "xiyato.uk" },
        ].map((s) => (
          <li key={s.host} className="flex items-center justify-between gap-4 bg-paper px-4 py-3.5">
            <span className="min-w-0 truncate text-sm text-ink">{s.name}</span>
            <span className="shrink-0 font-mono text-[0.625rem] text-ink-faint">{s.host}</span>
          </li>
        ))}
      </ul>
      <p className="mt-6 border-t border-rule pt-4 font-mono text-[0.625rem] leading-relaxed text-ink-faint">
        Responsive front-end builds, deployed and maintained.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Hero capability selector                                            */
/* ------------------------------------------------------------------ */

const CAPABILITIES = [
  { n: "01", motif: "Deliver", label: "CAD & Technical", anchor: "service-cad-technical-production", note: "Reference material in, editable drawing packages out." },
  { n: "02", motif: "Grow", label: "Growth & B2B", anchor: "service-growth-marketing-b2b", note: "Markets mapped, targets qualified, every claim sourced." },
  { n: "03", motif: "Visualise", label: "Visualisation", anchor: "service-visualisation-image-production", note: "Interiors and products shown before they are built." },
  { n: "04", motif: "Film", label: "Video & AI Film", anchor: "service-video-ai-film-editing", note: "Short-form cinematic work, cut to its placement." },
  { n: "05", motif: "Automate", label: "Automation", anchor: "service-automation-workflow-systems", note: "The repetitive parts of studio operations, systematised." },
  { n: "06", motif: "Build", label: "Websites", anchor: "service-website-design-development", note: "Responsive builds, deployed and maintained." },
];

export function HeroCapabilities() {
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [index, setIndex] = useAutoAdvance(CAPABILITIES.length, 6000, {
    paused,
    enabled: !reduced,
  });

  const current = CAPABILITIES[index];

  function goToSection() {
    const el = document.getElementById(current.anchor);
    if (el) el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  }

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
          <VisualisationScene active={index === 2} />
        </div>
        <div className={index === 3 ? "h-full w-full" : "hidden"}>
          <VideoScene />
        </div>
        <div className={index === 4 ? "h-full w-full" : "hidden"}>
          <AutomationScene active={index === 4} />
        </div>
        <div className={index === 5 ? "h-full w-full" : "hidden"}>
          <WebScene />
        </div>
      </div>

      {/* Always-visible controls across all six capabilities */}
      <div className="mt-px grid grid-cols-3 gap-px border border-rule bg-rule lg:grid-cols-6">
        {CAPABILITIES.map((c, i) => {
          const on = i === index;
          return (
            <button
              key={c.n}
              type="button"
              onClick={() => setIndex(i)}
              aria-current={on ? "true" : undefined}
              className={`min-h-[56px] px-2 py-3 text-left transition-colors ${
                on ? "bg-ink text-paper" : "bg-paper text-ink-muted hover:bg-paper-deep"
              }`}
            >
              <span
                className={`block font-mono text-[0.5625rem] uppercase tracking-[0.12em] ${
                  on ? "text-paper/60" : "text-ink-faint"
                }`}
              >
                {c.n} · {c.motif}
              </span>
              <span className="mt-1 block text-[0.6875rem] leading-tight">{c.label}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <p className="text-sm text-ink-muted" aria-live="polite">
          {current.note}
        </p>
        {/* Keeps the visitor on the homepage — jumps to the matching chapter. */}
        <button
          type="button"
          onClick={goToSection}
          className="group inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-accent"
        >
          <span className="underline decoration-rule-strong underline-offset-4 group-hover:decoration-accent">
            See the work
          </span>
          <span aria-hidden="true" className="transition-transform group-hover:translate-y-0.5">
            &darr;
          </span>
        </button>
      </div>
    </div>
  );
}
