"use client";

import { useState } from "react";
import Image from "next/image";
import type { MediaItem, VideoItem } from "@/lib/case-studies";

/**
 * Click-to-load video.
 * Until the visitor asks for it, only the poster image is fetched — no
 * metadata request, no range request, no <video> element in the DOM.
 */
export function LazyVideo({ item, className = "" }: { item: VideoItem; className?: string }) {
  const [active, setActive] = useState(false);
  const portrait = item.height > item.width;

  return (
    <figure className={className}>
      <div
        className={`relative overflow-hidden border border-rule bg-paper-deep ${
          portrait ? "aspect-[9/16]" : "aspect-video"
        }`}
      >
        {active ? (
          <video
            src={item.src}
            poster={item.poster}
            controls
            autoPlay
            playsInline
            preload="metadata"
            aria-label={item.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <>
            <Image
              src={item.poster}
              alt=""
              fill
              sizes="(min-width: 1024px) 420px, (min-width: 640px) 45vw, 90vw"
              className="object-cover"
            />
            <button
              type="button"
              onClick={() => setActive(true)}
              className="group absolute inset-0 flex items-center justify-center bg-ink/25 transition-colors hover:bg-ink/35"
            >
              <span className="sr-only">Play video: {item.title}</span>
              <span
                aria-hidden="true"
                className="flex h-16 w-16 items-center justify-center rounded-full border border-paper/70 bg-ink/65 text-paper transition-transform group-hover:scale-105"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </button>
          </>
        )}
      </div>
      <figcaption className="mt-3">
        <p className="text-sm text-ink">{item.title}</p>
        <p className="mt-1 text-sm leading-relaxed text-ink-muted">{item.description}</p>
      </figcaption>
    </figure>
  );
}

/**
 * Gallery with an accessible lightbox.
 * Thumbnails are lazy; the full-size source loads only when opened.
 */
export function Gallery({ images }: { images: MediaItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function close() {
    setOpenIndex(null);
  }
  function step(delta: number) {
    setOpenIndex((i) => (i === null ? null : (i + delta + images.length) % images.length));
  }

  const current = openIndex === null ? null : images[openIndex];

  return (
    <>
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {images.map((img, i) => (
          <li key={img.src} className="bg-surface">
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              className="group block w-full text-left"
            >
              <span className="relative block aspect-[4/3] overflow-hidden bg-paper-deep">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  loading="lazy"
                  sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 92vw"
                  className="media-clean object-cover"
                />
              </span>
              {img.caption ? (
                <span className="block px-4 py-3 text-xs leading-snug text-ink-muted">
                  {img.caption}
                </span>
              ) : null}
            </button>
          </li>
        ))}
      </ul>

      {current ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.alt}
          className="fixed inset-0 z-[100] flex flex-col bg-ink/95"
          onKeyDown={(e) => {
            if (e.key === "Escape") close();
            if (e.key === "ArrowRight") step(1);
            if (e.key === "ArrowLeft") step(-1);
          }}
        >
          <div className="flex items-center justify-between border-b border-paper/15 px-5 py-3">
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-paper/60">
              {openIndex! + 1} / {images.length}
            </p>
            <button
              type="button"
              onClick={close}
              autoFocus
              className="min-h-[44px] px-3 text-sm text-paper/80 transition-colors hover:text-paper"
            >
              Close
            </button>
          </div>

          <div className="relative flex flex-1 items-center justify-center p-4 sm:p-8">
            <Image
              src={current.src}
              alt={current.alt}
              width={current.width}
              height={current.height}
              sizes="90vw"
              className="max-h-full w-auto object-contain"
            />
          </div>

          {images.length > 1 ? (
            <div className="flex items-center justify-between gap-4 border-t border-paper/15 px-5 py-3">
              <button
                type="button"
                onClick={() => step(-1)}
                className="min-h-[44px] px-3 text-sm text-paper/80 transition-colors hover:text-paper"
              >
                &larr; Previous
              </button>
              <p className="hidden max-w-md truncate text-xs text-paper/60 sm:block">
                {current.caption ?? current.alt}
              </p>
              <button
                type="button"
                onClick={() => step(1)}
                className="min-h-[44px] px-3 text-sm text-paper/80 transition-colors hover:text-paper"
              >
                Next &rarr;
              </button>
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );
}
