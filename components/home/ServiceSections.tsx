"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/primitives";
import { ImageGrid, VideoGallery, type LightboxItem } from "@/components/media/viewers";
import { allVideos, allWebsites } from "@/lib/portfolio";
import { VISUALS, featuredVisuals, activeVisualGroups, type VisualGroup } from "@/lib/visuals";
import type { Service } from "@/lib/services";
import { getServicePricing } from "@/lib/pricing";
import { CadDraftingRail } from "./CadDraftingRail";
import { LeadIntelligencePanel } from "./LeadIntelligencePanel";
import { ServicePreview } from "./ServicePreview";

/* ------------------------------------------------------------------ */
/* Shared chapter shell with Bespoke Atmospheric Tones                 */
/* ------------------------------------------------------------------ */

export type ChapterTone = "light" | "surface" | "slate" | "dark" | "terminal" | "cyber";

const CHAPTER_SUMMARIES: Partial<Record<Service["slug"], string>> = {
  "visualisation-image-production": "Interiors, furniture and architectural imagery that bring your next idea into focus.",
  "ai-video-production": "Cinematic reels, brand films and product motion built to hold attention.",
  "website-design-development": "Responsive websites that make your brand credible and your next enquiry easy.",
  "cad-technical-production": "Shop drawings, joinery details and coordinated DWG sets, ready for your team's review.",
  "b2b-lead-generation": "Focused buyer research, useful Excel datasets and marketing support for your next commercial conversation.",
  "automation-workflow-systems": "Connect your tools, simplify handoffs and keep the next action moving.",
};

function ChapterHeader({
  service,
  tone = "light",
  chapterLabel,
}: {
  service: Service;
  tone?: ChapterTone;
  chapterLabel?: string;
}) {
  const isDark = tone === "dark" || tone === "slate" || tone === "terminal" || tone === "cyber";
  const price = getServicePricing(service.slug)[0];

  return (
    <div className="lg:col-span-4">
      <p
        className={`font-mono text-[0.6875rem] uppercase tracking-[0.18em] ${
          isDark ? "text-paper/45" : "text-ink-faint"
        }`}
      >
        {chapterLabel ?? `Service 0${service.order}`}
      </p>

      <h3
        className={`display mt-2 text-[1.625rem] leading-[1.08] sm:text-[2rem] ${
          isDark ? "text-paper" : "text-ink"
        }`}
      >
        {service.name}
      </h3>

      <p
        className={`mt-2.5 max-w-xl text-sm leading-relaxed ${
          isDark ? "text-paper/75" : "text-ink-soft"
        }`}
      >
        {CHAPTER_SUMMARIES[service.slug] ?? service.summary}
      </p>

      {price ? (
        <a href={price.href} target="_blank" rel="noopener noreferrer" className={`mt-3 inline-flex min-h-[44px] flex-wrap items-center gap-x-3 gap-y-1 rounded-xs border px-3 py-2 text-xs transition-colors ${isDark ? "border-paper/25 text-paper hover:bg-paper/10" : "border-rule-strong text-ink hover:border-accent hover:text-accent"}`}>
          <span className="font-mono">{price.label} <span className="text-[0.5625rem] opacity-70">USD</span></span>
          <span className="font-semibold">Start on WhatsApp <span aria-hidden="true">↗</span></span>
        </a>
      ) : (
        <Link href={`/services/${service.slug}`} className={`mt-3 inline-flex min-h-[44px] items-center gap-2 text-xs font-medium ${isDark ? "text-paper" : "text-ink hover:text-accent"}`}>View service details <span aria-hidden="true">→</span></Link>
      )}
    </div>
  );
}

function Chapter({
  service,
  tone = "light",
  chapterLabel,
  children,
}: {
  service: Service;
  tone?: ChapterTone;
  chapterLabel?: string;
  children: React.ReactNode;
}) {
  const getSectionClasses = () => {
    switch (tone) {
      case "slate":
        return "bg-[#0b1120] text-slate-100 border-t border-slate-800/80";
      case "terminal":
        return "bg-[#11141a] text-slate-100 border-t border-zinc-800";
      case "cyber":
        return "bg-[#090e17] text-slate-100 border-t border-zinc-800";
      case "dark":
        return "bg-[#070708] text-paper border-t border-rule/20";
      case "surface":
        return "bg-paper-deep text-ink border-t border-rule";
      default:
        return "bg-paper text-ink border-t border-rule";
    }
  };

  return (
    <section
      id={`service-${service.slug}`}
      className={`scroll-mt-16 py-8 sm:py-12 ${getSectionClasses()}`}
    >
      <span id={service.slug} className="block scroll-mt-24" aria-hidden="true" />
      {service.slug === "b2b-lead-generation" ? <span id="service-growth-marketing-b2b" className="block scroll-mt-24" aria-hidden="true" /> : null}
      {service.slug === "ai-video-production" ? <span id="service-video-ai-film-editing" className="block scroll-mt-24" aria-hidden="true" /> : null}
      <Container width="page">
        <div className="grid gap-5 sm:gap-6 lg:grid-cols-12 lg:gap-9">
          <ChapterHeader service={service} tone={tone} chapterLabel={chapterLabel} />
          <div className="min-w-0 lg:col-span-8">{children}</div>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 04 — CAD & TECHNICAL PRODUCTION (Architectural Slate Blueprint)     */
/* ------------------------------------------------------------------ */

export function CadSection({ service }: { service: Service }) {
  return (
    <Chapter service={service} tone="slate">
      <CadDraftingRail />
    </Chapter>
  );
}

/* ------------------------------------------------------------------ */
/* 05 — MARKETING & B2B LEAD GENERATION                               */
/* ------------------------------------------------------------------ */

export function B2BLeadGenSection({ service }: { service: Service }) {
  return (
    <Chapter service={service} tone="surface">
      <div id="service-market-intelligence-research" className="scroll-mt-16">
        <span id="market-intelligence-research" className="block scroll-mt-16" aria-hidden="true" />
        <LeadIntelligencePanel />
      </div>
    </Chapter>
  );
}

/* ------------------------------------------------------------------ */
/* Supporting research within Marketing & B2B Lead Generation        */
/* ------------------------------------------------------------------ */

export function MarketIntelligenceSection({ service }: { service: Service }) {
  return (
    <Chapter service={service} tone="surface" chapterLabel="Inside service 05 · Research">
      {/* Compact Interactive Lead Intelligence Panel */}
      <LeadIntelligencePanel />

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-rule/70 pt-4">
        <Link
          href="/services/market-intelligence-research#research"
          className="group inline-flex items-center gap-2 text-xs font-mono font-medium text-ink transition-colors hover:text-accent"
        >
          <span>Explore research methodologies</span>
          <span aria-hidden="true">&rarr;</span>
        </Link>
        <p className="font-mono text-[0.625rem] text-ink-faint">
          All client copies sanitized according to NDA terms.
        </p>
      </div>
    </Chapter>
  );
}

// Backward-compatible alias for legacy imports
export const GrowthSection = MarketIntelligenceSection;

/* ------------------------------------------------------------------ */
/* 01 — 3D VISUALISATION & IMAGE PRODUCTION (Titanium Gallery)         */
/* ------------------------------------------------------------------ */

export function VisualisationSection({ service }: { service: Service }) {
  const groups = activeVisualGroups();
  const [group, setGroup] = useState<VisualGroup | null>(null);
  const pool = group ? VISUALS.filter((v) => v.group === group) : VISUALS;
  const shown = group ? pool.slice(0, 4) : featuredVisuals(4);

  const items: LightboxItem[] = shown.map((v) => ({
    src: v.src,
    alt: v.alt,
    width: v.width,
    height: v.height,
    title: v.title,
  }));

  return (
    <Chapter service={service} tone="light">
      <div className="mb-3 flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:thin]">
        <button
          type="button"
          onClick={() => setGroup(null)}
          aria-pressed={group === null}
          className={`min-h-[40px] shrink-0 rounded-xs border px-3 font-mono text-[0.625rem] transition-colors ${
            group === null
              ? "border-ink bg-ink text-paper font-semibold shadow-xs"
              : "border-rule bg-paper text-ink-muted hover:border-ink hover:text-ink"
          }`}
        >
          Featured
        </button>
        {groups.map((g) => (
          <button
            key={g.group}
            type="button"
            onClick={() => setGroup(g.group)}
            aria-pressed={group === g.group}
            className={`min-h-[40px] shrink-0 rounded-xs border px-3 font-mono text-[0.625rem] transition-colors ${
              group === g.group
                ? "border-ink bg-ink text-paper font-semibold shadow-xs"
                : "border-rule bg-paper text-ink-muted hover:border-ink hover:text-ink"
            }`}
          >
            {g.label}
          </button>
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {shown.length} selected visual studies. Select an image to explore.
      </p>

      <ImageGrid items={items} columns={2} aspect="4/3" />

      <p className="mt-2 text-[0.6875rem] text-ink-muted">
        AI-generated concept studies and production portfolio.
      </p>

      <Link
        href="/services/visualisation-image-production#gallery"
        className="group mt-1 inline-flex min-h-[44px] items-center gap-2 text-xs font-medium text-ink transition-colors hover:text-accent"
      >
        <span className="underline decoration-rule-strong underline-offset-4">
          View all {VISUALS.length} images
        </span>
        <span aria-hidden="true">&rarr;</span>
      </Link>
    </Chapter>
  );
}

/* ------------------------------------------------------------------ */
/* 02 — VIDEO, AI FILM & EDITING (Obsidian Black)                      */
/* ------------------------------------------------------------------ */

export function VideoSection({ service }: { service: Service }) {
  const videos = allVideos();
  const shown = videos.slice(0, 3);

  return (
    <Chapter service={service} tone="dark">
      <p className="mb-3 font-mono text-[0.625rem] text-paper/65">
        {videos.length} films · select a poster to play
      </p>

      <div className="[&_.label]:text-paper/45 [&_.meta]:text-paper/50">
        <VideoGallery videos={shown} columns={3} rail />
      </div>

      <Link
        href="/services/ai-video-production#films"
        className="group mt-3 inline-flex min-h-[44px] items-center gap-2 text-xs font-medium text-paper transition-colors hover:text-white"
      >
        <span className="underline decoration-paper/40 underline-offset-4">
          View all {videos.length} films
        </span>
        <span aria-hidden="true">&rarr;</span>
      </Link>
    </Chapter>
  );
}

/* ------------------------------------------------------------------ */
/* 03 — WEBSITE DESIGN & DEVELOPMENT (Precision Tech Clean)            */
/* ------------------------------------------------------------------ */

export function WebsiteSection({ service }: { service: Service }) {
  const sites = allWebsites();
  return (
    <Chapter service={service} tone="light">
      <div className="grid gap-2 sm:grid-cols-3">
        {sites.map((s) => (
          <div
            key={s.slug}
            className="group relative flex items-center justify-between gap-4 rounded-lg border border-rule bg-paper p-4 transition-colors hover:border-ink/50 sm:flex-col sm:items-start"
          >
            <div>
              <p className="font-mono text-[0.5625rem] text-ink-faint">{s.year} · Live website</p>
              <h4 className="display mt-1 text-lg text-ink font-normal">{s.title}</h4>
              <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-ink-muted">
                {s.description}
              </p>
            </div>

            <div className="shrink-0">
              {s.liveUrl ? (
                <a
                  href={s.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${s.title}`}
                  className="flex min-h-[44px] items-center gap-1 font-mono text-xs font-semibold text-ink hover:text-accent"
                >
                  <span>Visit</span>
                  <span>&#8599;</span>
                </a>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </Chapter>
  );
}

/* ------------------------------------------------------------------ */
/* 06 — AUTOMATION & WORKFLOW SYSTEMS                                */
/* ------------------------------------------------------------------ */

const AUTOMATION_PILLARS = [
  {
    num: "01",
    title: "Connect your tools",
    desc: "Bring forms, spreadsheets, inboxes and CRM records into a workflow shaped around the way your team works.",
  },
  {
    num: "02",
    title: "Keep people in control",
    desc: "Use explicit rules, review points and useful notifications so the next action is clear and exceptions reach a person.",
  },
  {
    num: "03",
    title: "Make time for useful work",
    desc: "Reduce repeated copying, missed handoffs and manual follow-up with a system your team can understand and maintain.",
  },
];

export function AutomationSection({ service }: { service: Service }) {
  return (
    <Chapter service={service} tone="cyber">
      <div className="mb-6"><ServicePreview slug={service.slug} /></div>
      <div className="grid gap-3 sm:grid-cols-3">
        {AUTOMATION_PILLARS.map((p) => (
          <div
            key={p.num}
            className="rounded-lg border border-zinc-800/90 bg-[#0c121e] p-5 shadow-2xs"
          >
            <span className="font-mono text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-zinc-400">
              {p.num} · Workflow
            </span>
            <h4 className="mt-2 text-sm font-semibold text-slate-100">{p.title}</h4>
            <p className="mt-2 text-xs leading-relaxed text-slate-400">{p.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-zinc-800/80 bg-[#0f1726] p-4 sm:p-5">
        <div>
          <p className="text-sm font-semibold text-slate-100">
            Turn a repeated task into a reliable workflow.
          </p>
          <p className="mt-0.5 text-xs text-slate-400">
            Start with one handoff, one integration or one follow-up campaign. Build from what works.
          </p>
        </div>
        <a
          href={getServicePricing(service.slug)[0]?.href ?? "/contact?service=automation-workflow-systems"}
          className="inline-flex min-h-[38px] items-center rounded-xs bg-white px-4 text-xs font-semibold text-black transition-colors hover:bg-zinc-200"
        >
          Scope your workflow &rarr;
        </a>
      </div>
    </Chapter>
  );
}
