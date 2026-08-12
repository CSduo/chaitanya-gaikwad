"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { Dialog, DialogBar, DialogNav } from "./Dialog";

/* ================================================================== */
/* IMAGE LIGHTBOX                                                      */
/* ================================================================== */

export type LightboxItem = {
  src: string;
  alt: string;
  width: number;
  height: number;
  title?: string;
  caption?: string;
};

/**
 * Full-screen image viewer with next / previous / close, keyboard navigation
 * and an optional zoom toggle for technical drawings, where detail matters.
 */
export function Lightbox({
  items,
  index,
  onClose,
  onIndexChange,
  zoomable = false,
}: {
  items: LightboxItem[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (i: number) => void;
  zoomable?: boolean;
  /**
   * Technical drawings must never be cropped - a trimmed title block or a
   * clipped dimension makes the sheet unreadable. They use "contain" on a
   * neutral well; photographic work uses "cover".
   */
  fit?: "cover" | "contain";
}) {
  const [zoomed, setZoomed] = useState(false);
  const open = index !== null;
  const item = open ? items[index] : null;

  const step = useCallback(
    (delta: number) => {
      if (index === null) return;
      setZoomed(false);
      onIndexChange((index + delta + items.length) % items.length);
    },
    [index, items.length, onIndexChange],
  );

  const close = useCallback(() => {
    setZoomed(false);
    onClose();
  }, [onClose]);

  if (!open || !item) return null;

  return (
    <Dialog
      open={open}
      onClose={close}
      label={item.title ?? item.alt}
      onPrev={() => step(-1)}
      onNext={() => step(1)}
    >
      <DialogBar
        onClose={close}
        left={
          <>
            {item.title ? (
              <p className="truncate text-sm text-paper">{item.title}</p>
            ) : null}
            <p className="truncate font-mono text-[0.625rem] uppercase tracking-[0.14em] text-paper/50">
              {item.caption ?? item.alt}
            </p>
          </>
        }
      />

      <div className="relative min-h-0 flex-1 overflow-auto p-4 sm:p-8">
        <div
          className={`flex min-h-full items-center justify-center ${
            zoomed ? "cursor-zoom-out" : zoomable ? "cursor-zoom-in" : ""
          }`}
        >
          {zoomable ? (
            <button
              type="button"
              onClick={() => setZoomed((z) => !z)}
              aria-label={zoomed ? "Zoom out" : "Zoom in to inspect detail"}
              className="block"
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                sizes="95vw"
                className={
                  zoomed
                    ? "max-w-none"
                    : "max-h-[calc(100dvh-13rem)] w-auto object-contain"
                }
                style={zoomed ? { width: `${item.width}px`, height: "auto" } : undefined}
              />
            </button>
          ) : (
            <Image
              src={item.src}
              alt={item.alt}
              width={item.width}
              height={item.height}
              sizes="95vw"
              className="max-h-[calc(100dvh-13rem)] w-auto object-contain"
            />
          )}
        </div>
      </div>

      <DialogNav
        index={index}
        total={items.length}
        onPrev={() => step(-1)}
        onNext={() => step(1)}
        caption={zoomable ? "Select the drawing to zoom" : undefined}
      />
    </Dialog>
  );
}

/** Thumbnail grid that opens the lightbox. */
export function ImageGrid({
  items,
  columns = 3,
  aspect = "4/3",
  zoomable = false,
  fit = "cover",
}: {
  items: LightboxItem[];
  columns?: 2 | 3 | 4;
  aspect?: string;
  zoomable?: boolean;
  /**
   * Technical drawings must never be cropped - a trimmed title block or a
   * clipped dimension makes the sheet unreadable. They use "contain" on a
   * neutral well; photographic work uses "cover".
   */
  fit?: "cover" | "contain";
}) {
  const [index, setIndex] = useState<number | null>(null);
  const cols =
    columns === 4
      ? "sm:grid-cols-3 lg:grid-cols-4"
      : columns === 3
        ? "sm:grid-cols-2 lg:grid-cols-3"
        : "sm:grid-cols-2";

  return (
    <>
      <ul className={`grid grid-cols-2 gap-3 sm:gap-4 ${cols}`}>
        {items.map((item, i) => (
          <li key={item.src}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              className="group block w-full text-left"
            >
              <span
                className="media-frame media-well relative block overflow-hidden"
                style={{ aspectRatio: aspect }}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  loading="lazy"
                  sizes="(min-width: 1024px) 340px, (min-width: 640px) 45vw, 48vw"
                  className={`media-clean ${fit === "contain" ? "object-contain p-2" : "object-cover"}`}
                />
              </span>
              {item.title ? (
                <span className="block px-3 py-2.5 text-[0.6875rem] leading-snug text-ink-muted">
                  {item.title}
                </span>
              ) : null}
            </button>
          </li>
        ))}
      </ul>

      <Lightbox
        items={items}
        index={index}
        onClose={() => setIndex(null)}
        onIndexChange={setIndex}
        zoomable={zoomable}
      />
    </>
  );
}

/* ================================================================== */
/* VIDEO                                                               */
/* ================================================================== */

export type VideoItem = {
  slug: string;
  title: string;
  client: string | null;
  clientDescriptor?: string;
  year: string;
  description: string;
  src: string;
  poster: string;
  posterWidth: number;
  posterHeight: number;
  tags: string[];
};

/**
 * Poster-first video gallery. No MP4 is requested until the visitor asks for
 * one, and only one plays at a time because only one is ever mounted.
 */
export function VideoGallery({
  videos,
  columns = 3,
  rail = false,
}: {
  videos: VideoItem[];
  columns?: 2 | 3 | 4;
  /**
   * Present as a horizontal rail below `sm`. A 9:16 poster is roughly 640px
   * tall on a 360px screen, so three stacked portrait posters consume most of
   * a phone page on their own. The rail keeps every film reachable at a
   * legible size without burying what follows.
   */
  rail?: boolean;
}) {
  const [index, setIndex] = useState<number | null>(null);
  const open = index !== null;
  const current = open ? videos[index] : null;

  const step = useCallback(
    (delta: number) => {
      if (index === null) return;
      setIndex((index + delta + videos.length) % videos.length);
    },
    [index, videos.length],
  );

  const cols =
    columns === 4
      ? "sm:grid-cols-3 lg:grid-cols-4"
      : columns === 3
        ? "sm:grid-cols-2 lg:grid-cols-3"
        : "sm:grid-cols-2";

  const listCls = rail
    ? `-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:grid-cols-1 sm:gap-6 sm:overflow-visible sm:px-0 ${cols}`
    : `grid grid-cols-1 gap-6 ${cols}`;

  return (
    <>
      <ul className={listCls}>
        {videos.map((v, i) => {
          const portrait = v.posterHeight > v.posterWidth;
          return (
            <li
              key={v.slug}
              className={rail ? "w-[74vw] max-w-[280px] shrink-0 snap-start sm:w-auto sm:max-w-none" : undefined}
            >
              <button
                type="button"
                onClick={() => setIndex(i)}
                className="group block w-full text-left"
              >
                <span
                  className={`media-frame media-well relative block overflow-hidden ${
                    portrait ? "aspect-[9/16]" : "aspect-video"
                  }`}
                >
                  <Image
                    src={v.poster}
                    alt=""
                    fill
                    loading="lazy"
                    sizes="(min-width: 1024px) 340px, (min-width: 640px) 45vw, 92vw"
                    className="media-clean object-cover"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-ink/15 transition-colors group-hover:bg-ink/30">
                    <span
                      aria-hidden="true"
                      className="flex h-14 w-14 items-center justify-center rounded-full border border-paper/70 bg-ink/60 text-paper transition-transform group-hover:scale-105"
                    >
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                  </span>
                </span>

                <span className="mt-4 block">
                  <span className="label block">
                    {v.client ?? v.clientDescriptor} · {v.year}
                  </span>
                  <span className="display mt-2 block text-lg text-ink transition-colors group-hover:text-accent">
                    {v.title}
                  </span>
                  <span className="mt-2 block text-sm leading-relaxed text-ink-muted">
                    {v.description}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {open && current ? (
        <Dialog
          open={open}
          onClose={() => setIndex(null)}
          label={`${current.title} — video`}
          onPrev={() => step(-1)}
          onNext={() => step(1)}
        >
          <DialogBar
            onClose={() => setIndex(null)}
            left={
              <>
                <p className="truncate text-sm text-paper">{current.title}</p>
                <p className="truncate font-mono text-[0.625rem] uppercase tracking-[0.14em] text-paper/50">
                  {current.client ?? current.clientDescriptor} · {current.year}
                </p>
              </>
            }
          />

          <div className="flex min-h-0 flex-1 items-center justify-center p-3 sm:p-6">
            {/*
              Keyed so switching projects mounts a fresh element: the previous
              file stops downloading and never plays underneath the new one.
            */}
            <video
              key={current.src}
              src={current.src}
              poster={current.poster}
              controls
              autoPlay
              playsInline
              preload="metadata"
              aria-label={current.title}
              className="max-h-full max-w-full"
            />
          </div>

          <DialogNav
            index={index}
            total={videos.length}
            onPrev={() => step(-1)}
            onNext={() => step(1)}
            caption={current.description}
          />
        </Dialog>
      ) : null}
    </>
  );
}
