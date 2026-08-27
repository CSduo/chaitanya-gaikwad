"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CAD_DRAWINGS } from "@/lib/portfolio";
import { TACTILE_CLASSES, triggerHaptic } from "@/lib/tactile";

export function CadDraftingRail() {
  const outputDrawings = CAD_DRAWINGS.filter((d) => d.role === "output").slice(0, 8);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const current = outputDrawings[selectedIndex] || outputDrawings[0];

  const handleSelect = (idx: number) => {
    setSelectedIndex(idx);
    triggerHaptic("selection");
  };

  return (
    <div className="w-full">
      {/* 01 — Stage Header with Technical Drawing Stamp */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-slate-700/60 pb-3">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-sky-400 animate-pulse" />
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-sky-400">
            {`Sheet 0${selectedIndex + 1} / 0${outputDrawings.length}`}
          </span>
          <span className="hidden font-mono text-xs text-slate-400 sm:inline-block">
            — {current.title}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="rounded-xs bg-slate-800 px-2 py-0.5 font-mono text-[0.625rem] text-slate-300 border border-slate-700">
            Scale: 1:50 · QA Passed
          </span>
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className={`inline-flex items-center gap-1 font-mono text-xs text-sky-400 hover:text-sky-300 ${TACTILE_CLASSES.buttonSubtle}`}
          >
            <span>Zoom</span>
            <span>↗</span>
          </button>
        </div>
      </div>

      {/* 02 — Main Interactive Drawing Stage */}
      <div
        onClick={() => setLightboxOpen(true)}
        className="group relative aspect-[16/10] w-full cursor-zoom-in overflow-hidden rounded-md border border-slate-700/80 bg-[#0f172a] shadow-inner"
      >
        <Image
          src={current.src}
          alt={current.alt}
          fill
          priority
          sizes="(min-width: 1024px) 800px, 100vw"
          className="object-contain p-2 transition-transform duration-300 group-hover:scale-[1.02]"
        />

        {/* Overlay hover prompt */}
        <div className="absolute inset-0 flex items-center justify-center bg-slate-950/0 transition-colors group-hover:bg-slate-950/20">
          <span className="rounded-full bg-slate-900/90 px-3.5 py-1 font-mono text-xs text-slate-100 opacity-0 backdrop-blur-xs transition-opacity group-hover:opacity-100 border border-slate-700">
            Click to Inspect Ultra-HD Sheet
          </span>
        </div>

        {/* Bottom Technical Tag */}
        <div className="absolute bottom-3 left-3 rounded-xs bg-slate-900/90 px-2.5 py-1 font-mono text-[0.625rem] text-slate-300 backdrop-blur-xs border border-slate-700/80">
          {current.category} · {current.width} × {current.height} px
        </div>
      </div>

      {/* 03 — Horizontal Thumbnail Selector Rail */}
      <div className="mt-4">
        <p className="mb-2 font-mono text-[0.5625rem] uppercase tracking-wider text-slate-400">
          Select Sheet to Draft / Inspect (← Scroll horizontally →)
        </p>

        <div className="flex gap-2.5 overflow-x-auto pb-2 pt-1 snap-x scrollbar-thin">
          {outputDrawings.map((d, idx) => {
            const isSelected = selectedIndex === idx;
            return (
              <button
                key={d.src}
                type="button"
                onClick={() => handleSelect(idx)}
                className={`group relative h-16 w-24 shrink-0 snap-center overflow-hidden rounded-xs border transition-all duration-150 ${
                  isSelected
                    ? "border-sky-400 ring-2 ring-sky-400/30 bg-slate-800"
                    : "border-slate-700/70 opacity-65 hover:opacity-100 bg-slate-900"
                } ${TACTILE_CLASSES.thumbnail}`}
              >
                <Image
                  src={d.src}
                  alt={d.title}
                  fill
                  sizes="100px"
                  className="object-cover p-1"
                />
                <span className="absolute bottom-1 right-1 rounded-xs bg-slate-950/90 px-1 font-mono text-[0.5rem] text-slate-300">
                  0{idx + 1}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 04 — Footer Link */}
      <div className="mt-4 flex items-center justify-between border-t border-slate-800 pt-3">
        <Link
          href="/services/cad-technical-production#drawings"
          className="group inline-flex items-center gap-2 text-xs font-medium text-sky-400 transition-colors hover:text-sky-300 font-mono"
        >
          <span>View complete {CAD_DRAWINGS.length}-sheet package</span>
          <span aria-hidden="true">&rarr;</span>
        </Link>

        <span className="font-mono text-[0.625rem] text-slate-500">
          Available in Native .DWG & Print .PDF
        </span>
      </div>

      {/* 05 — Fullscreen Lightbox Modal */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 p-4 backdrop-blur-sm animate-in fade-in duration-150"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative flex max-h-[95vh] max-w-6xl flex-col overflow-hidden rounded-md border border-slate-700 bg-slate-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-6 py-3">
              <div>
                <span className="font-mono text-xs text-sky-400 font-semibold">
                  Sheet 0{selectedIndex + 1} · {current.title}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                className="font-mono text-xs uppercase tracking-wider text-slate-300 hover:text-white"
              >
                Close ✕
              </button>
            </div>

            <div className="relative aspect-[16/10] w-[90vw] max-w-5xl bg-[#090d16]">
              <Image
                src={current.src}
                alt={current.alt}
                fill
                priority
                className="object-contain p-4"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
