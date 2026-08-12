"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ImageGrid, VideoGallery, type LightboxItem } from "@/components/media/viewers";
import { CAD_DRAWINGS, CAD_PROJECTS, WORKBOOKS, allVideos, allWebsites } from "@/lib/portfolio";
import { VISUALS, activeVisualGroups, type VisualGroup } from "@/lib/visuals";
import type { ServiceSlug } from "@/lib/services";
import { CadInspectionModal } from "@/components/work/CadInspectionModal";

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
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [activeModalIndex, setActiveModalIndex] = useState<number | null>(null);

  const filteredDrawings = selectedProject
    ? CAD_DRAWINGS.filter((d) => d.project === selectedProject)
    : CAD_DRAWINGS;

  const outputs = CAD_DRAWINGS.filter((d) => d.role === "output").length;
  const inputs = CAD_DRAWINGS.length - outputs;

  return (
    <div id="drawings" className="scroll-mt-16 space-y-6">
      {/* Filter Tabs by Red Chandelier Project */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setSelectedProject(null)}
          aria-pressed={selectedProject === null}
          className={`min-h-[40px] px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all ${
            selectedProject === null
              ? "bg-ink text-paper font-semibold shadow-sm"
              : "border border-rule bg-surface text-ink-muted hover:border-ink hover:text-ink"
          }`}
        >
          All Drawings ({CAD_DRAWINGS.length})
        </button>
        {CAD_PROJECTS.map((p) => {
          const count = CAD_DRAWINGS.filter((d) => d.project === p.id).length;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setSelectedProject(p.id)}
              aria-pressed={selectedProject === p.id}
              className={`min-h-[40px] px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all ${
                selectedProject === p.id
                  ? "bg-ink text-paper font-semibold shadow-sm"
                  : "border border-rule bg-surface text-ink-muted hover:border-ink hover:text-ink"
              }`}
            >
              {p.title.split(" — ")[0]} ({count})
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-rule pb-3">
        <p className="meta">
          Showing {filteredDrawings.length} sheets · {outputs} produced drawings · {inputs} client inputs · select any drawing to inspect & zoom
        </p>
      </div>

      {/* Grid of CAD Drawing Sheets */}
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredDrawings.map((d, i) => (
          <li
            key={d.src}
            className="group relative flex flex-col overflow-hidden rounded-xl border border-rule bg-surface transition-all hover:border-ink/40 hover:shadow-md"
          >
            <button
              type="button"
              onClick={() => setActiveModalIndex(i)}
              className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-900/5 block text-left"
            >
              <Image
                src={d.src}
                alt={d.alt}
                fill
                loading="lazy"
                sizes="(min-width: 1280px) 280px, (min-width: 1024px) 340px, (min-width: 640px) 45vw, 92vw"
                className="object-contain p-2 transition-transform duration-300 group-hover:scale-[1.02]"
              />


              {/* Hover zoom hint */}
              <div className="absolute inset-0 flex items-center justify-center bg-ink/30 opacity-0 transition-opacity group-hover:opacity-100">
                <span className="flex items-center gap-1.5 rounded-full bg-ink/90 px-3 py-1.5 text-xs font-medium text-paper shadow-lg backdrop-blur-sm">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    <line x1="11" y1="8" x2="11" y2="14" />
                    <line x1="8" y1="11" x2="14" y2="11" />
                  </svg>
                  <span>Click to Zoom</span>
                </span>
              </div>
            </button>

            {/* Card Content & Action Info */}
            <div className="flex flex-1 flex-col justify-between p-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-ink-muted">
                  {d.category}
                </p>
                <h3 className="mt-1 text-sm font-semibold text-ink leading-snug line-clamp-1">
                  {d.title}
                </h3>
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-rule/60 pt-2.5">
                <span className="font-mono text-[11px] text-ink-muted">
                  {d.width} × {d.height}
                </span>

                {d.downloads?.pdf && (
                  <a
                    href={d.downloads.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 text-[11px] font-mono text-ink hover:text-accent font-medium transition-colors"
                  >
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    <span>Vector PDF</span>
                  </a>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Full-Screen CAD Pan/Zoom Inspection Lightbox Modal */}
      <CadInspectionModal
        drawings={filteredDrawings}
        initialIndex={activeModalIndex ?? 0}
        isOpen={activeModalIndex !== null}
        onClose={() => setActiveModalIndex(null)}
      />
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
