"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/primitives";
import { ImageGrid, VideoGallery, type LightboxItem } from "@/components/media/viewers";
import { CAD_DRAWINGS, WORKBOOKS, allVideos, allWebsites } from "@/lib/portfolio";
import { VISUALS, featuredVisuals, activeVisualGroups, type VisualGroup } from "@/lib/visuals";
import type { Service } from "@/lib/services";

/* ------------------------------------------------------------------ */
/* Shared chapter shell                                                */
/* ------------------------------------------------------------------ */

function ChapterHeader({
  service,
  tone = "light",
}: {
  service: Service;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <div className="lg:col-span-4">
      <p className={`font-mono text-[0.6875rem] uppercase tracking-[0.18em] ${dark ? "text-paper/45" : "text-ink-faint"}`}>
        {`Service 0${service.order}`}
      </p>
      <p className={`mt-3 font-mono text-[0.8125rem] uppercase tracking-[0.28em] ${dark ? "text-paper/70" : "text-accent"}`}>
        {service.motif}
      </p>
      <h3 className={`display mt-4 text-[1.875rem] leading-[1.08] sm:text-[2.25rem] ${dark ? "text-paper" : "text-ink"}`}>
        {service.name}
      </h3>
      <p className={`mt-5 text-base leading-relaxed ${dark ? "text-paper/70" : "text-ink-soft"}`}>
        {service.summary}
      </p>

      <ul className="mt-7 flex flex-wrap gap-2">
        {service.groups.slice(0, 4).map((g) => (
          <li
            key={g.title}
            className={`border px-3 py-1.5 font-mono text-[0.625rem] uppercase tracking-[0.1em] ${
              dark ? "border-paper/25 text-paper/70" : "border-rule text-ink-muted"
            }`}
          >
            {g.title}
          </li>
        ))}
      </ul>

      <Link
        href={`/services/${service.slug}`}
        className={`group mt-8 inline-flex min-h-[44px] items-center gap-2 text-sm font-medium transition-colors ${
          dark ? "text-paper hover:text-paper/70" : "text-ink hover:text-accent"
        }`}
      >
        <span className={`underline underline-offset-4 ${dark ? "decoration-paper/40" : "decoration-rule-strong"}`}>
          Explore {service.shortName}
        </span>
        <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
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
  tone?: "light" | "surface" | "dark";
  children: React.ReactNode;
}) {
  const bg =
    tone === "dark" ? "bg-ink text-paper" : tone === "surface" ? "bg-paper-deep" : "bg-paper";
  return (
    <section
      id={`service-${service.slug}`}
      className={`scroll-mt-16 border-t border-rule py-12 sm:py-20 lg:py-24 ${bg}`}
    >
      <Container width="page">
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-14">
          <ChapterHeader service={service} tone={tone === "dark" ? "dark" : "light"} />
          {/*
            min-w-0 is load-bearing: grid items default to min-width:auto, so a
            horizontally-scrolling rail inside this column would force the
            column wider than the page instead of scrolling within it.
          */}
          <div className="min-w-0 lg:col-span-8">{children}</div>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 01 — CAD & TECHNICAL PRODUCTION                                     */
/* ------------------------------------------------------------------ */

const CAD_STAGES = ["Draft", "QA", "Revisions", "Handoff"];

export function CadSection({ service }: { service: Service }) {
  const outputs = CAD_DRAWINGS.filter((d) => d.role === "output");
  // Curated selection; the service page carries the full set.
  const items: LightboxItem[] = outputs
    .slice(0, 8)
    .map((d) => ({
      src: d.src,
      alt: d.alt,
      width: d.width,
      height: d.height,
      title: d.title,
      caption: d.category,
    }));


  return (
    <Chapter service={service} tone="light">
      <ol className="mt-px grid grid-cols-4 gap-px border border-rule bg-rule">
        {CAD_STAGES.map((s, i) => (
          <li key={s} className="bg-paper px-3 py-3">
            <span className="label block">{String(i + 1).padStart(2, "0")}</span>
            <span className="mt-1 block text-xs text-ink">{s}</span>
          </li>
        ))}
      </ol>

      <div className="mt-10">
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
          <h4 className="label">
            Drawing set — {outputs.length} produced drawings
          </h4>
          <p className="meta">Select any drawing to open and zoom</p>
        </div>
        <ImageGrid items={items} columns={4} aspect="4/3" zoomable fit="contain" />
        <Link
          href="/services/cad-technical-production#drawings"
          className="group mt-6 inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-accent"
        >
          <span className="underline decoration-rule-strong underline-offset-4">
            View the full drawing set
          </span>
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </Chapter>
  );
}

/* ------------------------------------------------------------------ */
/* 02 — GROWTH, MARKETING & B2B                                        */
/* ------------------------------------------------------------------ */

export function GrowthSection({ service }: { service: Service }) {
  const totalSheets = WORKBOOKS.reduce((n, w) => n + w.sheetCount, 0);

  return (
    <Chapter service={service} tone="surface">
      <div className="mb-8 grid gap-px border border-rule bg-rule sm:grid-cols-3">
        {[
          { v: String(WORKBOOKS.length), l: "Research systems" },
          { v: String(totalSheets), l: "Structured sheets" },
          { v: "8", l: "Markets covered" },
        ].map((m) => (
          <div key={m.l} className="bg-surface px-5 py-5">
            <p className="label">{m.l}</p>
            <p className="display mt-2 text-2xl text-ink">{m.v}</p>
          </div>
        ))}
      </div>

      <ul className="grid gap-px border border-rule bg-rule sm:grid-cols-2">
        {WORKBOOKS.slice(0, 4).map((w) => (
          <li key={w.slug} className="group relative bg-surface p-6">
            <p className="label">{w.region}</p>
            <h4 className="display mt-3 text-lg leading-snug">
              <Link
                href={`/work/research/${w.slug}`}
                className="inline-flex min-h-[44px] items-center transition-colors after:absolute after:inset-0 hover:text-accent"
              >
                {w.title}
              </Link>
            </h4>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">{w.summary}</p>
            <p className="meta mt-4">
              {w.sheetCount} {w.sheetCount === 1 ? "sheet" : "sheets"} · open data viewer
            </p>
          </li>
        ))}
      </ul>

      <Link
        href="/services/growth-marketing-b2b#research"
        className="group mt-6 inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-accent"
      >
        <span className="underline decoration-rule-strong underline-offset-4">
          Explore all {WORKBOOKS.length} research systems
        </span>
        <span aria-hidden="true">&rarr;</span>
      </Link>

      <p className="mt-6 border-t border-rule pt-5 font-mono text-[0.6875rem] leading-relaxed text-ink-faint">
        Published copies are redacted: contact details were removed before publication.
      </p>
    </Chapter>
  );
}

/* ------------------------------------------------------------------ */
/* 03 — 3D VISUALISATION & IMAGE PRODUCTION                            */
/* ------------------------------------------------------------------ */

export function VisualisationSection({ service }: { service: Service }) {
  const groups = activeVisualGroups();
  const [group, setGroup] = useState<VisualGroup | null>(null);
  const pool = group ? VISUALS.filter((v) => v.group === group) : VISUALS;
  const shown = group ? pool.slice(0, 12) : featuredVisuals(8);

  const items: LightboxItem[] = shown.map((v) => ({
    src: v.src,
    alt: v.alt,
    width: v.width,
    height: v.height,
    title: v.title,
  }));

  return (
    <Chapter service={service} tone="light">
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setGroup(null)}
          aria-pressed={group === null}
          className={`min-h-[44px] border px-4 text-sm transition-colors ${
            group === null
              ? "border-ink bg-ink text-paper"
              : "border-rule text-ink-muted hover:border-ink hover:text-ink"
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
            className={`min-h-[44px] border px-4 text-sm transition-colors ${
              group === g.group
                ? "border-ink bg-ink text-paper"
                : "border-rule text-ink-muted hover:border-ink hover:text-ink"
            }`}
          >
            {g.label}
            <span className={group === g.group ? "ml-2 text-paper/60" : "ml-2 text-ink-faint"}>
              {g.count}
            </span>
          </button>
        ))}
      </div>

      <p className="meta mb-4" aria-live="polite">
        Showing {shown.length} of {VISUALS.length} images
      </p>

      <ImageGrid items={items} columns={4} aspect="4/3" />

      <Link
        href="/services/visualisation-image-production#gallery"
        className="group mt-6 inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-accent"
      >
        <span className="underline decoration-rule-strong underline-offset-4">
          View all {VISUALS.length} visualisations
        </span>
        <span aria-hidden="true">&rarr;</span>
      </Link>
    </Chapter>
  );
}

/* ------------------------------------------------------------------ */
/* 04 — VIDEO, AI FILM & EDITING                                       */
/* ------------------------------------------------------------------ */

export function VideoSection({ service }: { service: Service }) {
  const videos = allVideos();
  // Three strongest here; the service page carries the full library.
  const shown = videos.slice(0, 3);

  return (
    <Chapter service={service} tone="dark">
      <p className="mb-6 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-paper/45">
        {videos.length} films · select a poster to play
      </p>

      <div className="[&_.label]:text-paper/45 [&_.meta]:text-paper/50">
        <VideoGallery videos={shown} columns={3} rail />
      </div>

      <Link
        href="/services/video-ai-film-editing#films"
        className="group mt-8 inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-paper transition-colors hover:text-paper/70"
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
/* 06 — AUTOMATION & MARKETING SYSTEMS                                 */
/* ------------------------------------------------------------------ */

const MARKETING_PILLARS = [
  {
    num: "01",
    title: "Client Acquisition & Campaigns",
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
    <Chapter service={service} tone="surface">
      <div className="grid gap-3 sm:grid-cols-3">
        {MARKETING_PILLARS.map((p) => (
          <div key={p.num} className="rounded-lg border border-rule bg-paper p-5 shadow-2xs">
            <span className="font-mono text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-accent">
              {p.num} · Acquisition
            </span>
            <h4 className="mt-2 text-sm font-semibold text-ink">{p.title}</h4>
            <p className="mt-2 text-xs leading-relaxed text-ink-muted">{p.desc}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-rule/70 bg-paper-deep p-4 sm:p-5">
        <div>
          <p className="text-sm font-semibold text-ink">Looking to scale your outreach and client acquisition?</p>
          <p className="mt-0.5 text-xs text-ink-muted">
            We partner with your team to design campaigns, build prospect pipelines, and secure new accounts.
          </p>
        </div>
        <a
          href="/contact"
          className="inline-flex min-h-[38px] items-center rounded-xs bg-ink px-4 text-xs font-semibold text-paper transition-colors hover:bg-accent"
        >
          Discuss a campaign &rarr;
        </a>
      </div>
    </Chapter>
  );
}

/* ------------------------------------------------------------------ */
/* 06 — WEBSITE DESIGN & DEVELOPMENT                                   */
/* ------------------------------------------------------------------ */

export function WebsiteSection({ service }: { service: Service }) {
  const sites = allWebsites();
  return (
    <Chapter service={service} tone="light">
      <ul className="grid gap-px border border-rule bg-rule">
        {sites.map((s) => (
          <li key={s.slug} className="bg-paper p-6 lg:p-7">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
              <div className="min-w-0">
                <p className="label">{s.client ?? s.clientDescriptor}</p>
                <h4 className="display mt-2 text-xl">{s.title}</h4>
              </div>
              <p className="meta shrink-0">{s.year}</p>
            </div>

            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-muted">
              {s.description}
            </p>

            <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5">
              {s.scope.map((item) => (
                <li key={item} className="font-mono text-[0.625rem] uppercase tracking-[0.08em] text-ink-faint">
                  {item}
                </li>
              ))}
            </ul>

            {s.liveUrl ? (
              <a
                href={s.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-6 inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-accent"
              >
                <span className="underline decoration-rule-strong underline-offset-4">
                  Visit site
                </span>
                <span aria-hidden="true" className="text-xs">
                  &#8599;
                </span>
              </a>
            ) : null}
          </li>
        ))}
      </ul>
    </Chapter>
  );
}
