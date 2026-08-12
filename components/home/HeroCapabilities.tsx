"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { CadScene, DataScene } from "./scenes";
import { useAutoAdvance, useReducedMotion } from "./hooks";

/* ------------------------------------------------------------------ */
/* Scenes unique to the hero                                           */
/* ------------------------------------------------------------------ */

function VisualisationScene({ active }: { active: boolean }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-ink select-none">
      <Image
        src="/media/visual/vis-24.webp"
        alt="High-end luxury hospitality interior 3D visualisation"
        fill
        priority={active}
        sizes="(min-width: 1024px) 760px, 100vw"
        className="object-cover object-center"
      />
      {/* Top Tag */}
      <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-2">
        <span className="bg-ink/90 px-2.5 py-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-paper">
          3D Visualisation
        </span>
        <span className="hidden sm:inline-block bg-paper/90 border border-rule px-2 py-0.5 font-mono text-[0.5625rem] text-ink-muted">
          Atmospheric Interior Study
        </span>
      </div>

      {/* Bottom Gradient Overlay */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent p-4 pt-16">
        <div className="flex items-end justify-between gap-4">
          <p className="max-w-md text-xs sm:text-sm text-paper/90 font-light leading-relaxed">
            Photorealistic 3D architectural &amp; interior renders produced for pitches, campaigns, and approvals.
          </p>
          <span className="shrink-0 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-paper/70">
            Ultra-HD 3D
          </span>
        </div>
      </div>
    </div>
  );
}

function VideoScene({
  active,
  onPlayStateChange,
}: {
  active: boolean;
  onPlayStateChange: (playing: boolean) => void;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // When scene becomes inactive, pause video
  useEffect(() => {
    if (!active && isPlaying && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
      onPlayStateChange(false);
    }
  }, [active, isPlaying, onPlayStateChange]);

  const handleStartPlay = () => {
    setIsPlaying(true);
    onPlayStateChange(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleVideoPause = () => {
    setIsPlaying(false);
    onPlayStateChange(false);
  };

  return (
    <div className="relative h-full w-full overflow-hidden bg-ink select-none">
      {isPlaying ? (
        <video
          ref={videoRef}
          src="/media/video/sultanah-co-moon-chair-cinematic-campaign.mp4"
          poster="/media/posters/sultanah-co-moon-chair-cinematic-campaign-poster.webp"
          controls
          autoPlay
          playsInline
          onPlay={() => {
            setIsPlaying(true);
            onPlayStateChange(true);
          }}
          onPause={handleVideoPause}
          onEnded={handleVideoPause}
          className="h-full w-full object-cover bg-black"
        />
      ) : (
        <>
          <Image
            src="/media/posters/sultanah-co-moon-chair-cinematic-campaign-poster.webp"
            alt="Luxury Begins in the Details - Sultanah & Co. Interiors cinematic video"
            fill
            sizes="(min-width: 1024px) 760px, 100vw"
            className="object-cover opacity-90"
          />

          {/* Center Play Button Action */}
          <button
            type="button"
            onClick={handleStartPlay}
            aria-label="Play Sultanah and Co video"
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 group cursor-pointer"
          >
            <span
              aria-hidden="true"
              className="flex h-16 w-16 items-center justify-center rounded-full border border-paper/90 bg-ink/80 text-paper shadow-2xl backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 group-hover:bg-ink"
            >
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" className="ml-1">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <span className="rounded-full bg-ink/90 px-3.5 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-paper shadow-md backdrop-blur-sm transition-colors group-hover:bg-accent group-hover:text-white">
              Click to Play Film
            </span>
          </button>

          {/* Top Badge */}
          <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-2">
            <span className="bg-ink/90 px-2.5 py-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-paper">
              Video &amp; AI Films
            </span>
            <span className="hidden sm:inline-block bg-paper/90 border border-rule px-2 py-0.5 font-mono text-[0.5625rem] text-ink-muted">
              Sultanah &amp; Co. Interiors
            </span>
          </div>

          {/* Bottom Title Bar */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/60 to-transparent p-4 pt-14">
            <h4 className="text-sm sm:text-base font-semibold text-paper">
              Luxury Begins in the Details
            </h4>
            <p className="mt-0.5 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-paper/70">
              Cinematic brand film · AI video production · Commercial post-production
            </p>
          </div>
        </>
      )}
    </div>
  );
}

const AUTOMATION_SERVICES = [
  { num: "01", title: "WhatsApp Automation", desc: "Instant reply flows & live CRM sync" },
  { num: "02", title: "Instagram DM & Lead Gen", desc: "Keyword triggers, comments & story replies" },
  { num: "03", title: "Email Outreach & Campaigns", desc: "Verified cold outreach & client nurturing" },
  { num: "04", title: "CRM Sync & Lead Routing", desc: "Auto qualification & booking pipeline" },
];

function AutomationScene({ active }: { active: boolean }) {
  const reduced = useReducedMotion();
  const on = active || reduced;
  return (
    <div className="flex h-full w-full flex-col justify-between bg-paper-deep p-3.5 sm:p-6 select-none overflow-hidden">
      <div className="flex items-center justify-between border-b border-rule pb-2 sm:pb-2.5">
        <p className="label text-[0.625rem] sm:text-xs">Automation &amp; Marketing</p>
        <span className="font-mono text-[0.5625rem] uppercase tracking-[0.12em] text-accent font-semibold">
          Active Systems
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 my-auto">
        {AUTOMATION_SERVICES.map((step, i) => (
          <div
            key={step.title}
            className="flex items-center gap-2.5 rounded-md border border-rule/70 bg-paper p-2 sm:p-2.5 shadow-2xs transition-all duration-300"
            style={{
              opacity: on ? 1 : 0.2,
              transform: on ? "translateY(0)" : "translateY(4px)",
              transitionDelay: reduced ? "0ms" : `${i * 80}ms`,
            }}
          >
            <span className="flex h-5 w-5 sm:h-6 sm:w-6 shrink-0 items-center justify-center rounded bg-ink font-mono text-[0.5625rem] sm:text-[0.625rem] font-medium text-paper">
              {step.num}
            </span>
            <div className="min-w-0">
              <span className="block truncate text-[0.6875rem] sm:text-xs font-semibold text-ink leading-tight">
                {step.title}
              </span>
              <span className="block truncate text-[0.625rem] sm:text-[0.6875rem] text-ink-muted leading-tight mt-0.5">
                {step.desc}
              </span>
            </div>
          </div>
        ))}
      </div>
      <p className="border-t border-rule pt-1.5 sm:pt-2 font-mono text-[0.5625rem] sm:text-[0.625rem] leading-tight text-ink-faint">
        Custom automations engineered to drive leads &amp; revenue 24/7.
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
  { n: "01", motif: "Deliver", label: "CAD & Technical", anchor: "service-cad-technical-production", note: "Precision technical drawing packages and full joinery details." },
  { n: "02", motif: "Grow", label: "Growth & B2B", anchor: "service-growth-marketing-b2b", note: "Markets mapped, targets qualified, every claim verified." },
  { n: "03", motif: "Visualise", label: "Visualisation", anchor: "service-visualisation-image-production", note: "Photorealistic 3D interior, exterior, and product renders." },
  { n: "04", motif: "Film", label: "Video & AI Film", anchor: "service-video-ai-film-editing", note: "Cinematic commercial films and AI-powered video editing." },
  { n: "05", motif: "Automate", label: "Automation", anchor: "service-automation-workflow-systems", note: "WhatsApp, Instagram, and email automations that convert leads." },
  { n: "06", motif: "Build", label: "Websites", anchor: "service-website-design-development", note: "High-performance digital platforms deployed on your domain." },
];

export function HeroCapabilities() {
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const isSlidePaused = paused || isVideoPlaying;

  const [index, setIndex] = useAutoAdvance(CAPABILITIES.length, 6000, {
    paused: isSlidePaused,
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
          <VideoScene
            active={index === 3}
            onPlayStateChange={(playing) => setIsVideoPlaying(playing)}
          />
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
