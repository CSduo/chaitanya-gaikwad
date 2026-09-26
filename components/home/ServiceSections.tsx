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
  const prices = getServicePricing(service.slug);

  const getMotifColor = () => {
    switch (tone) {
      case "slate":
      case "terminal":
      case "cyber":
      case "dark":
        return "text-zinc-400";
      default:
        return "text-accent";
    }
  };

  const getBadgeStyle = () => {
    switch (tone) {
      case "slate":
      case "terminal":
      case "cyber":
        return "border-zinc-800 bg-zinc-900/80 text-zinc-300";
      case "dark":
        return "border-paper/20 bg-ink-soft text-paper/70";
      default:
        return "border-rule bg-paper text-ink-muted";
    }
  };

  return (
    <div className="lg:col-span-4">
      <p
        className={`font-mono text-[0.6875rem] uppercase tracking-[0.18em] ${
          isDark ? "text-paper/45" : "text-ink-faint"
        }`}
      >
        {chapterLabel ?? `Service 0${service.order}`}
      </p>

      <p className={`mt-2.5 font-mono text-[0.8125rem] uppercase tracking-[0.28em] font-semibold ${getMotifColor()}`}>
        {service.motif}
      </p>

      <h3
        className={`display mt-3.5 text-[1.875rem] leading-[1.08] sm:text-[2.25rem] ${
          isDark ? "text-paper" : "text-ink"
        }`}
      >
        {service.name}
      </h3>

      <p
        className={`mt-4 text-base leading-relaxed ${
          isDark ? "text-paper/75" : "text-ink-soft"
        }`}
      >
        {service.summary}
      </p>

      {prices.length > 0 ? (
        <div className={`mt-6 space-y-4 border-y py-5 ${isDark ? "border-paper/15" : "border-rule"}`}>
          {prices.map((price) => (
            <div key={price.id}>
              {prices.length > 1 ? <p className={`mb-1 text-xs ${isDark ? "text-paper/65" : "text-ink-muted"}`}>{price.name}</p> : null}
              <p className={`font-mono text-sm font-medium ${isDark ? "text-paper" : "text-ink"}`}>{price.label} <span className={`text-[0.625rem] ${isDark ? "text-paper/60" : "text-ink-faint"}`}>USD</span></p>
              <a href={price.href} target="_blank" rel="noopener noreferrer" className={`mt-2 inline-flex min-h-[44px] items-center gap-3 rounded-xs px-4 text-xs font-semibold transition-colors ${isDark ? "bg-paper text-ink hover:bg-paper/85" : "bg-ink text-paper hover:bg-accent"}`}>
                {price.cta}<span aria-hidden="true">↗</span>
              </a>
            </div>
          ))}
          <p className={`text-[0.6875rem] leading-relaxed ${isDark ? "text-paper/60" : "text-ink-muted"}`}>Start with a brief on WhatsApp. We agree the scope before work begins.</p>
        </div>
      ) : null}

      <ul className="mt-6 flex flex-wrap gap-2">
        {service.groups.slice(0, 4).map((g) => (
          <li
            key={g.title}
            className={`rounded-xs border px-3 py-1 font-mono text-[0.625rem] uppercase tracking-[0.1em] ${getBadgeStyle()}`}
          >
            {g.title}
          </li>
        ))}
      </ul>

      <Link
        href={`/services/${service.slug}`}
        className={`group mt-7 inline-flex min-h-[44px] items-center gap-2 text-sm font-medium transition-colors ${
          isDark ? "text-paper hover:text-white" : "text-ink hover:text-accent"
        }`}
      >
        <span
          className={`underline underline-offset-4 ${
            isDark ? "decoration-paper/40 group-hover:decoration-paper" : "decoration-rule-strong group-hover:decoration-accent"
          }`}
        >
          Explore {service.shortName}
        </span>
        <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
          &rarr;
        </span>
      </Link>
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
      className={`scroll-mt-16 py-12 sm:py-20 lg:py-24 ${getSectionClasses()}`}
    >
      <span id={service.slug} className="block scroll-mt-24" aria-hidden="true" />
      {service.slug === "b2b-lead-generation" ? <span id="service-growth-marketing-b2b" className="block scroll-mt-24" aria-hidden="true" /> : null}
      {service.slug === "ai-video-production" ? <span id="service-video-ai-film-editing" className="block scroll-mt-24" aria-hidden="true" /> : null}
      <Container width="page">
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-14">
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

const CAD_STAGES = ["01 · Draft", "02 · QA Check", "03 · Revisions", "04 · Final Handoff"];

export function CadSection({ service }: { service: Service }) {
  return (
    <Chapter service={service} tone="slate">
      <div className="mb-7"><ServicePreview slug={service.slug} /></div>
      {/* CAD Production Stages Bar in Refined Architectural Grey */}
      <ol className="mb-6 grid grid-cols-2 gap-px border border-zinc-800/80 bg-zinc-800/80 sm:grid-cols-4 rounded-xs overflow-hidden">
        {CAD_STAGES.map((s) => (
          <li key={s} className="bg-[#0e1320] px-3.5 py-2.5">
            <span className="block font-mono text-xs text-zinc-300 font-medium">{s}</span>
          </li>
        ))}
      </ol>

      {/* Interactive Blueprint Rail & Inspector */}
      <CadDraftingRail />
    </Chapter>
  );
}

/* ------------------------------------------------------------------ */
/* 05 — MARKETING & B2B LEAD GENERATION                               */
/* ------------------------------------------------------------------ */

const OUTBOUND_PILLARS = [
  {
    num: "01",
    title: "Find the right accounts",
    desc: "Research your target market and organise relevant companies, decision-makers and buying signals into a usable Excel file.",
  },
  {
    num: "02",
    title: "Make the first move",
    desc: "Turn research into focused campaign ideas, useful opening messages and a clear reason for the prospect to respond.",
  },
  {
    num: "03",
    title: "Build a usable pipeline",
    desc: "Give your team structured records, source context and a clear next action so valuable research keeps moving toward a conversation.",
  },
];

export function B2BLeadGenSection({ service }: { service: Service }) {
  return (
    <Chapter service={service} tone="cyber">
      <div className="mb-6"><ServicePreview slug={service.slug} /></div>
      <div className="grid gap-3 sm:grid-cols-3">
        {OUTBOUND_PILLARS.map((p) => (
          <div
            key={p.num}
            className="rounded-lg border border-zinc-800/90 bg-[#0c121e] p-5 shadow-2xs"
          >
            <span className="font-mono text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-zinc-400">
              {p.num} · Commercial focus
            </span>
            <h4 className="mt-2 text-sm font-semibold text-slate-100">{p.title}</h4>
            <p className="mt-2 text-xs leading-relaxed text-slate-400">{p.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-zinc-800/80 bg-[#0f1726] p-4 sm:p-5">
        <div>
          <p className="text-sm font-semibold text-slate-100">
            Looking to scale qualified outbound pipeline?
          </p>
          <p className="mt-0.5 text-xs text-slate-400">
            Start with a focused lead file, then add the campaign support your team needs.
          </p>
        </div>
        <a
          href={getServicePricing(service.slug)[0]?.href ?? "/contact?service=b2b-lead-generation"}
          className="inline-flex min-h-[38px] items-center rounded-xs bg-white px-4 text-xs font-semibold text-black transition-colors hover:bg-zinc-200"
        >
          Plan your target market &rarr;
        </a>
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
  const shown = group ? pool.slice(0, 8) : featuredVisuals(8);

  const items: LightboxItem[] = shown.map((v) => ({
    src: v.src,
    alt: v.alt,
    width: v.width,
    height: v.height,
    title: v.title,
  }));

  return (
    <Chapter service={service} tone="light">
      <div className="mb-5 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setGroup(null)}
          aria-pressed={group === null}
          className={`min-h-[40px] rounded-xs border px-4 font-mono text-xs uppercase tracking-wider transition-colors ${
            group === null
              ? "border-ink bg-ink text-paper font-semibold shadow-xs"
              : "border-rule bg-paper text-ink-muted hover:border-ink hover:text-ink"
          }`}
        >
          Featured Selection
        </button>
        {groups.map((g) => (
          <button
            key={g.group}
            type="button"
            onClick={() => setGroup(g.group)}
            aria-pressed={group === g.group}
            className={`min-h-[40px] rounded-xs border px-3.5 font-mono text-xs uppercase tracking-wider transition-colors ${
              group === g.group
                ? "border-ink bg-ink text-paper font-semibold shadow-xs"
                : "border-rule bg-paper text-ink-muted hover:border-ink hover:text-ink"
            }`}
          >
            {g.label}
            <span className={group === g.group ? "ml-1.5 text-paper/60" : "ml-1.5 text-ink-faint"}>
              ({g.count})
            </span>
          </button>
        ))}
      </div>

      <p className="meta mb-4" aria-live="polite">
        {shown.length} selected visual studies · select an image to explore
      </p>

      <ImageGrid items={items} columns={2} aspect="4/3" />

      <p className="mt-4 max-w-xl text-xs leading-relaxed text-ink-muted">
        Studio concept studies include AI-generated kitchens, interiors and original artwork explorations. Browse the complete gallery for the concept collection and earlier production portfolio.
      </p>

      <Link
        href="/services/visualisation-image-production#gallery"
        className="group mt-6 inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-accent"
      >
        <span className="underline decoration-rule-strong underline-offset-4">
          View all {VISUALS.length} visual studies &amp; portfolio images
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
      <p className="mb-5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-paper/50">
        {videos.length} films produced · Select a poster to trigger cinematic playback
      </p>

      <div className="[&_.label]:text-paper/45 [&_.meta]:text-paper/50">
        <VideoGallery videos={shown} columns={3} rail />
      </div>

      <Link
        href="/services/ai-video-production#films"
        className="group mt-8 inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-paper transition-colors hover:text-white"
      >
        <span className="underline decoration-paper/40 underline-offset-4">
          View all {videos.length} commercial films &amp; campaigns
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
      <div className="mb-6"><ServicePreview slug={service.slug} /></div>
      <div className="grid gap-3 sm:grid-cols-2">
        {sites.map((s) => (
          <div
            key={s.slug}
            className="group relative flex flex-col justify-between rounded-lg border border-rule bg-paper p-6 transition-all hover:border-ink/50 hover:shadow-xs"
          >
            <div>
              <div className="flex items-baseline justify-between">
                <p className="label">{s.client ?? s.clientDescriptor}</p>
                <p className="meta">{s.year}</p>
              </div>
              <h4 className="display mt-2.5 text-xl text-ink font-normal">{s.title}</h4>
              <p className="mt-3 text-xs leading-relaxed text-ink-muted line-clamp-3">
                {s.description}
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-rule/60 pt-3">
              <ul className="flex flex-wrap gap-x-3 gap-y-1">
                {s.scope.slice(0, 2).map((item) => (
                  <li key={item} className="font-mono text-[0.5625rem] uppercase tracking-wider text-ink-faint">
                    {item}
                  </li>
                ))}
              </ul>

              {s.liveUrl ? (
                <a
                  href={s.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-ink hover:text-accent font-semibold flex items-center gap-1"
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
