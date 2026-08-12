"use client";

import { useState } from "react";
import Link from "next/link";
import { ImageGrid, VideoGallery, type LightboxItem } from "@/components/media/viewers";
import { CAD_DRAWINGS, WORKBOOKS, allVideos, allWebsites } from "@/lib/portfolio";
import { VISUALS, activeVisualGroups, type VisualGroup } from "@/lib/visuals";
import type { ServiceSlug } from "@/lib/services";

/**
 * The complete portfolio for a given service, rendered on its service page.
 * The homepage shows a curated selection; this shows everything.
 */
export function ServiceProof({ slug }: { slug: ServiceSlug }) {
  if (slug === "cad-technical-production") return <CadProof />;
  if (slug === "growth-marketing-b2b") return <GrowthProof />;
  if (slug === "visualisation-image-production") return <VisualisationProof />;
  if (slug === "video-ai-film-editing") return <VideoProof />;
  if (slug === "website-design-development") return <WebsiteProof />;
  return null;
}

function CadProof() {
  const items: LightboxItem[] = CAD_DRAWINGS.map((d) => ({
    src: d.src,
    alt: d.alt,
    width: d.width,
    height: d.height,
    title: d.title,
    caption: d.category,
  }));
  const outputs = CAD_DRAWINGS.filter((d) => d.role === "output").length;
  const inputs = CAD_DRAWINGS.length - outputs;

  return (
    <div id="drawings" className="scroll-mt-16">
      <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
        <p className="meta">
          {outputs} drawings · {inputs} client references · select any sheet to zoom
        </p>
      </div>
      <ImageGrid items={items} columns={4} aspect="4/3" zoomable fit="contain" />
    </div>
  );
}

function GrowthProof() {
  return (
    <ul id="research" className="grid scroll-mt-16 gap-px border border-rule bg-rule sm:grid-cols-2">
      {WORKBOOKS.map((w) => (
        <li key={w.slug} className="group relative bg-surface p-6">
          <p className="label">{w.region}</p>
          <h3 className="display mt-3 text-lg leading-snug">
            <Link
              href={`/work/research/${w.slug}`}
              className="inline-flex min-h-[44px] items-center transition-colors after:absolute after:inset-0 hover:text-accent"
            >
              {w.title}
            </Link>
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted">{w.summary}</p>
          <p className="meta mt-4">
            {w.sheetCount} {w.sheetCount === 1 ? "sheet" : "sheets"} · open data viewer
          </p>
        </li>
      ))}
    </ul>
  );
}

function VisualisationProof() {
  const groups = activeVisualGroups();
  const [group, setGroup] = useState<VisualGroup | null>(null);
  const pool = group ? VISUALS.filter((v) => v.group === group) : VISUALS;
  const items: LightboxItem[] = pool.map((v) => ({
    src: v.src,
    alt: v.alt,
    width: v.width,
    height: v.height,
    title: v.title,
  }));

  return (
    <div id="gallery" className="scroll-mt-16">
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
          All
          <span className={group === null ? "ml-2 text-paper/60" : "ml-2 text-ink-faint"}>
            {VISUALS.length}
          </span>
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
        Showing {pool.length} of {VISUALS.length} images
      </p>

      <ImageGrid items={items} columns={4} aspect="4/3" />
    </div>
  );
}

function VideoProof() {
  return (
    <div id="films" className="scroll-mt-16">
      <p className="meta mb-6">{allVideos().length} films · select a poster to play</p>
      <VideoGallery videos={allVideos()} columns={3} />
    </div>
  );
}

function WebsiteProof() {
  return (
    <ul id="builds" className="grid scroll-mt-16 gap-px border border-rule bg-rule">
      {allWebsites().map((s) => (
        <li key={s.slug} className="bg-surface p-6 lg:p-7">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <div className="min-w-0">
              <p className="label">{s.client ?? s.clientDescriptor}</p>
              <h3 className="display mt-2 text-xl">{s.title}</h3>
            </div>
            <p className="meta shrink-0">{s.year}</p>
          </div>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-muted">{s.description}</p>
          <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5">
            {s.scope.map((item) => (
              <li
                key={item}
                className="font-mono text-[0.625rem] uppercase tracking-[0.08em] text-ink-faint"
              >
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
              <span className="underline decoration-rule-strong underline-offset-4">Visit site</span>
              <span aria-hidden="true" className="text-xs">
                &#8599;
              </span>
            </a>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
