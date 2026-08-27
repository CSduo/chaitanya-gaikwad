"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/primitives";
import { ImageGrid, VideoGallery, type LightboxItem } from "@/components/media/viewers";
import { allVideos, allWebsites } from "@/lib/portfolio";
import { VISUALS, featuredVisuals, activeVisualGroups, type VisualGroup } from "@/lib/visuals";
import type { Service } from "@/lib/services";
import { CadDraftingRail } from "./CadDraftingRail";
import { LeadIntelligencePanel } from "./LeadIntelligencePanel";

/* ------------------------------------------------------------------ */
/* Shared chapter shell with Bespoke Atmospheric Tones                 */
/* ------------------------------------------------------------------ */

export type ChapterTone = "light" | "surface" | "slate" | "dark" | "terminal" | "cyber";

function ChapterHeader({
  service,
  tone = "light",
}: {
  service: Service;
  tone?: ChapterTone;
}) {
  const isDark = tone === "dark" || tone === "slate" || tone === "terminal" || tone === "cyber";

  const getMotifColor = () => {
    switch (tone) {
      case "slate":
        return "text-sky-400";
      case "terminal":
        return "text-amber-400";
      case "cyber":
        return "text-emerald-400";
      case "dark":
        return "text-rose-400";
      default:
        return "text-accent";
    }
  };

  const getBadgeStyle = () => {
    switch (tone) {
      case "slate":
        return "border-slate-700 bg-slate-900/80 text-slate-300";
      case "terminal":
        return "border-amber-900/60 bg-amber-950/40 text-amber-300";
      case "cyber":
        return "border-emerald-900/60 bg-emerald-950/40 text-emerald-300";
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
        {`Service 0${service.order}`}
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
  children,
}: {
  service: Service;
  tone?: ChapterTone;
  children: React.ReactNode;
}) {
  const getSectionClasses = () => {
    switch (tone) {
      case "slate":
        return "bg-[#0b1120] text-slate-100 border-t border-slate-800/80";
      case "terminal":
        return "bg-[#11141a] text-slate-100 border-t border-amber-900/30";
      case "cyber":
        return "bg-[#090e17] text-slate-100 border-t border-emerald-950";
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
      <Container width="page">
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-14">
          <ChapterHeader service={service} tone={tone} />
          <div className="min-w-0 lg:col-span-8">{children}</div>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 01 — CAD & TECHNICAL PRODUCTION (Architectural Slate Blueprint)     */
/* ------------------------------------------------------------------ */

const CAD_STAGES = ["01 · Draft", "02 · QA Check", "03 · Revisions", "04 · Final Handoff"];

export function CadSection({ service }: { service: Service }) {
  return (
    <Chapter service={service} tone="slate">
      {/* CAD Production Stages Bar */}
      <ol className="mb-6 grid grid-cols-2 gap-px border border-slate-700/60 bg-slate-800/80 sm:grid-cols-4 rounded-xs overflow-hidden">
        {CAD_STAGES.map((s) => (
          <li key={s} className="bg-[#111c30] px-3.5 py-2.5">
            <span className="block font-mono text-xs text-sky-300 font-medium">{s}</span>
          </li>
        ))}
      </ol>

      {/* Interactive Blueprint Rail & Inspector */}
      <CadDraftingRail />
    </Chapter>
  );
}

/* ------------------------------------------------------------------ */
/* 02 — GROWTH, MARKETING & B2B (Compact Expandable Intelligence)      */
/* ------------------------------------------------------------------ */

export function GrowthSection({ service }: { service: Service }) {
  return (
    <Chapter service={service} tone="surface">
      {/* Compact Interactive Lead Intelligence Panel */}
      <LeadIntelligencePanel />

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-rule/70 pt-4">
        <Link
          href="/services/growth-marketing-b2b#research"
          className="group inline-flex items-center gap-2 text-xs font-mono font-medium text-amber-800 transition-colors hover:text-amber-950"
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

/* ------------------------------------------------------------------ */
/* 03 — 3D VISUALISATION & IMAGE PRODUCTION (Titanium Gallery)         */
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
        Displaying {shown.length} high-resolution spatial visualisations (Click to zoom)
      </p>

      <ImageGrid items={items} columns={4} aspect="4/3" />

      <Link
        href="/services/visualisation-image-production#gallery"
        className="group mt-6 inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-accent"
      >
        <span className="underline decoration-rule-strong underline-offset-4">
          View complete {VISUALS.length}-render portfolio archive
        </span>
        <span aria-hidden="true">&rarr;</span>
      </Link>
    </Chapter>
  );
}

/* ------------------------------------------------------------------ */
/* 04 — VIDEO, AI FILM & EDITING (Obsidian Black)                      */
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
        href="/services/video-ai-film-editing#films"
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
/* 05 — WEBSITE DESIGN & DEVELOPMENT (Precision Tech Clean)            */
/* ------------------------------------------------------------------ */

export function WebsiteSection({ service }: { service: Service }) {
  const sites = allWebsites();
  return (
    <Chapter service={service} tone="light">
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
/* 06 — AUTOMATION & MARKETING SYSTEMS (Cybernetic Matrix)             */
/* ------------------------------------------------------------------ */

const MARKETING_PILLARS = [
  {
    num: "01",
    title: "Client Acquisition & Outbound",
    desc: "Targeted outreach, verified cold emailing, and bespoke marketing campaigns to generate qualified client meetings.",
  },
  {
    num: "02",
    title: "Inbound & Social Ingestion",
    desc: "Automated WhatsApp and social DM response flows to capture, qualify, and route high-value briefs instantly.",
  },
  {
    num: "03",
    title: "Pipeline & CRM Synchronization",
    desc: "Seamless lead handoff, automated follow-up cadences, and CRM tracking built to empower your sales team.",
  },
];

export function AutomationSection({ service }: { service: Service }) {
  return (
    <Chapter service={service} tone="cyber">
      <div className="grid gap-3 sm:grid-cols-3">
        {MARKETING_PILLARS.map((p) => (
          <div
            key={p.num}
            className="rounded-lg border border-emerald-900/60 bg-[#0d1624] p-5 shadow-2xs"
          >
            <span className="font-mono text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-emerald-400">
              {p.num} · Acquisition
            </span>
            <h4 className="mt-2 text-sm font-semibold text-slate-100">{p.title}</h4>
            <p className="mt-2 text-xs leading-relaxed text-slate-400">{p.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-emerald-900/50 bg-[#0f1b2c] p-4 sm:p-5">
        <div>
          <p className="text-sm font-semibold text-slate-100">
            Looking to scale outreach and client acquisition?
          </p>
          <p className="mt-0.5 text-xs text-slate-400">
            We partner with your team to design campaigns, build prospect pipelines, and secure new accounts.
          </p>
        </div>
        <a
          href="/contact"
          className="inline-flex min-h-[38px] items-center rounded-xs bg-emerald-500 px-4 text-xs font-semibold text-slate-950 transition-colors hover:bg-emerald-400"
        >
          Discuss a campaign &rarr;
        </a>
      </div>
    </Chapter>
  );
}
