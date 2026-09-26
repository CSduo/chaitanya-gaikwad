"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ServicePreview } from "./ServicePreview";
import { getServicePricing } from "@/lib/pricing";
import { getServiceWhatsAppHref } from "@/lib/site";
import { VISUALS } from "@/lib/visuals";
import { useAutoAdvance, useReducedMotion } from "./hooks";

/* ------------------------------------------------------------------ */
/* Scenes unique to the hero                                           */
/* ------------------------------------------------------------------ */

function VisualisationScene({ active }: { active: boolean }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-ink select-none">
      <Image
        src={VISUALS[0].src}
        alt={VISUALS[0].alt}
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
          Architectural concept study
        </span>
      </div>

      {/* Bottom Gradient Overlay */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent p-4 pt-16">
        <div className="flex items-end justify-between gap-4">
          <p className="max-w-md text-xs sm:text-sm text-paper/90 font-light leading-relaxed">
            Photorealistic 3D architectural &amp; interior renders produced for pitches, campaigns, and approvals.
          </p>
          <span className="shrink-0 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-paper/70">
            Visual study
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

function WebScene() {
  const websites = [
    {
      name: "Xiyora — Export Brand Website",
      tag: "Luxury Commerce & Export",
      host: "xiyora.vercel.app",
      href: "https://xiyora.vercel.app",
    },
    {
      name: "Anvikshiki Journal Platform",
      tag: "Academic Publishing Engine",
      host: "anvikshikijournal.in",
      href: "https://anvikshikijournal.in",
    },
    {
      name: "XIYÀTO Studio Platform",
      tag: "Dual-Hub Agency Architecture",
      host: "xiyato.uk",
      href: "https://xiyato.uk",
    },
  ];

  return (
    <div className="flex h-full w-full flex-col justify-between bg-paper-deep p-4 sm:p-7 select-none overflow-hidden">
      <div className="flex items-center justify-between border-b border-rule pb-2.5">
        <p className="label text-[0.625rem] sm:text-xs">Websites We Have Developed</p>
        <span className="font-mono text-[0.5625rem] uppercase tracking-[0.12em] text-accent font-semibold flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
          Live &amp; Deployed
        </span>
      </div>

      <div className="my-auto grid grid-cols-1 gap-2 sm:gap-2.5">
        {websites.map((s) => (
          <a
            key={s.host}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between gap-3 rounded-lg border border-rule/70 bg-paper p-3 sm:p-3.5 shadow-2xs transition-all hover:border-ink/60 hover:bg-paper-deep hover:shadow-xs cursor-pointer"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="block truncate text-xs sm:text-sm font-semibold text-ink group-hover:text-accent transition-colors">
                  {s.name}
                </span>
                <span className="hidden sm:inline-block rounded bg-paper-deep px-1.5 py-0.5 font-mono text-[0.5625rem] text-ink-muted">
                  {s.tag}
                </span>
              </div>
              <span className="block truncate font-mono text-[0.625rem] text-ink-muted group-hover:text-ink mt-0.5">
                {s.host}
              </span>
            </div>
            <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-md border border-rule bg-paper-deep text-ink-muted transition-all group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
              <span className="text-xs">&#8599;</span>
            </div>
          </a>
        ))}
      </div>

      <p className="border-t border-rule pt-2 font-mono text-[0.5625rem] sm:text-[0.625rem] leading-tight text-ink-faint">
        Custom Next.js &amp; front-end builds engineered for performance and deployed to production.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Hero capability selector                                            */
/* ------------------------------------------------------------------ */

const CAPABILITIES = [
  { n: "01", motif: "Visualise", label: "3D Renders", slug: "visualisation-image-production", note: "Help your next pitch feel real with atmospheric interior and product renders." },
  { n: "02", motif: "Film", label: "AI Video", slug: "ai-video-production", note: "Turn attention into interest with cinematic reels and product stories." },
  { n: "03", motif: "Build", label: "Websites", slug: "website-design-development", note: "Give your best work a home that turns visitors into enquiries." },
  { n: "04", motif: "Deliver", label: "CAD Drafting", slug: "cad-technical-production", note: "Move from approved idea to precise, coordinated production drawings." },
  { n: "05", motif: "Grow", label: "Marketing & B2B", slug: "b2b-lead-generation", note: "Give your sales team researched buyers and a clearer path to the next conversation." },
  { n: "06", motif: "Automate", label: "Automation", slug: "automation-workflow-systems", note: "Keep enquiries moving with connected workflows and fewer manual handoffs." },
];
export function HeroCapabilities() {
  const reduced = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [rotationPaused, setRotationPaused] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const isSlidePaused = hovered || focused || rotationPaused || isVideoPlaying;

  const [index, setIndex] = useAutoAdvance(CAPABILITIES.length, 6000, {
    paused: isSlidePaused,
    enabled: !reduced,
  });

  const current = CAPABILITIES[index];
  const price = getServicePricing(current.slug)[0];

  function goToSection() {
    const el = document.getElementById(`service-${current.slug}`);
    if (el) el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  }

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured studio capabilities"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-lg border border-zinc-800 bg-zinc-950 shadow-2xl sm:aspect-[16/10]">
        <div className={index === 0 ? "h-full w-full" : "hidden"}>
          <VisualisationScene active={index === 0} />
        </div>
        <div className={index === 1 ? "h-full w-full" : "hidden"}>
          <VideoScene active={index === 1} onPlayStateChange={setIsVideoPlaying} />
        </div>
        <div className={index === 2 ? "h-full w-full" : "hidden"}>
          <WebScene />
        </div>
        <div className={index === 3 ? "h-full w-full" : "hidden"}>
          <ServicePreview slug="cad-technical-production" fill />
        </div>
        <div className={index === 4 ? "h-full w-full" : "hidden"}>
          <ServicePreview slug="b2b-lead-generation" fill />
        </div>
        <div className={index === 5 ? "h-full w-full" : "hidden"}>
          <ServicePreview slug="automation-workflow-systems" fill />
        </div>
      </div>

      {/* Always-visible controls across all six capabilities */}
      <div className="grid grid-cols-3 gap-px border-x border-b border-zinc-800 bg-zinc-800/90 rounded-b-lg overflow-hidden lg:grid-cols-6">
        {CAPABILITIES.map((c, i) => {
          const on = i === index;
          return (
            <button
              key={c.n}
              type="button"
              onClick={() => setIndex(i)}
              aria-current={on ? "true" : undefined}
              className={`min-h-[56px] px-2.5 py-3 text-left transition-all cursor-pointer ${
                on
                  ? "bg-zinc-950 text-white ring-1 ring-white/20"
                  : "bg-zinc-900/90 text-zinc-400 hover:bg-zinc-800 hover:text-white"
              }`}
            >
              <span
                className={`block font-mono text-[0.5625rem] uppercase tracking-[0.12em] ${
                  on ? "text-white font-semibold" : "text-zinc-500"
                }`}
              >
                {c.n} · {c.motif}
              </span>
              <span className="mt-1 block text-[0.6875rem] font-medium leading-tight">{c.label}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3">
        <div>
          <p className="font-mono text-xs font-medium text-white">
            {price?.label ?? "CAD packages · tailored quote"}
          </p>
          <p className="mt-1 text-[0.625rem] text-zinc-400">{price ? "USD · Final scope and price agreed before production" : "Send your drawing brief for a scoped estimate"}</p>
        </div>
        <a href={price?.href ?? getServiceWhatsAppHref(current.slug)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-3 rounded-md border border-white/20 bg-white px-4 text-xs font-semibold text-zinc-950 transition-colors hover:bg-amber-100">
          {price?.cta ?? "Get a CAD Quote"}<span aria-hidden="true">&nearr;</span>
        </a>
      </div>
      <div className="mt-3 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <p className="text-xs text-zinc-400 font-mono" aria-live={isSlidePaused || reduced ? "polite" : "off"}>
          {current.note}
        </p>
        {/* Keeps the visitor on the homepage — jumps to the matching chapter. */}
        <button
          type="button"
          onClick={goToSection}
          className="group inline-flex min-h-[44px] items-center gap-2 text-xs font-mono font-medium text-zinc-300 transition-colors hover:text-white cursor-pointer"
        >
          <span className="underline decoration-zinc-700 underline-offset-4 group-hover:decoration-white">
            See the work
          </span>
          <span aria-hidden="true" className="transition-transform group-hover:translate-y-0.5">
            &darr;
          </span>
        </button>
        {!reduced ? (
          <button type="button" onClick={() => setRotationPaused((value) => !value)} className="min-h-11 font-mono text-[0.625rem] text-zinc-400 hover:text-white">
            {rotationPaused ? "Resume showcase" : "Pause showcase"}
          </button>
        ) : null}
      </div>
    </div>
  );
}
