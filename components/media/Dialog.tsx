"use client";

import { useEffect, useRef } from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, video, [tabindex]:not([tabindex="-1"])';

/**
 * Shared modal shell for every media viewer on the site.
 *
 * Handles the things that are easy to get wrong and were absent from the
 * previous site: dialog semantics, focus entry, focus trapping, focus return,
 * Escape, backdrop dismissal and body scroll lock.
 */
export function Dialog({
  open,
  onClose,
  label,
  children,
  onPrev,
  onNext,
}: {
  open: boolean;
  onClose: () => void;
  label: string;
  children: React.ReactNode;
  onPrev?: () => void;
  onNext?: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const returnTo = useRef<HTMLElement | null>(null);

  // Remember what had focus so it can be restored on close.
  useEffect(() => {
    if (open) returnTo.current = document.activeElement as HTMLElement | null;
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;

    panel.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "ArrowLeft" && onPrev) {
        e.preventDefault();
        onPrev();
        return;
      }
      if (e.key === "ArrowRight" && onNext) {
        e.preventDefault();
        onNext();
        return;
      }
      if (e.key !== "Tab") return;

      const items = Array.from(panel!.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null || el.tagName === "VIDEO",
      );
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose, onPrev, onNext]);

  // Restore focus after the dialog unmounts.
  useEffect(() => {
    if (open) return;
    const el = returnTo.current;
    if (el && document.contains(el)) el.focus();
  }, [open]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={label}
      className="fixed inset-0 z-[100] flex flex-col bg-ink/96"
    >
      {/* Backdrop — a real button so it is reachable and announced. */}
      <button
        type="button"
        aria-label="Close"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 cursor-default"
      />
      <div ref={panelRef} className="relative flex h-full w-full flex-col">
        {children}
      </div>
    </div>
  );
}

export function DialogBar({
  left,
  onClose,
}: {
  left: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="flex shrink-0 items-center justify-between gap-4 border-b border-paper/15 px-4 py-3 sm:px-6">
      <div className="min-w-0">{left}</div>
      <button
        type="button"
        onClick={onClose}
        className="inline-flex min-h-[44px] shrink-0 items-center gap-2 px-3 text-sm text-paper/80 transition-colors hover:text-paper"
      >
        Close
        <span aria-hidden="true" className="font-mono text-xs">
          ESC
        </span>
      </button>
    </div>
  );
}

export function DialogNav({
  index,
  total,
  onPrev,
  onNext,
  caption,
}: {
  index: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  caption?: string;
}) {
  if (total <= 1) {
    return caption ? (
      <div className="shrink-0 border-t border-paper/15 px-4 py-3 sm:px-6">
        <p className="text-sm text-paper/70">{caption}</p>
      </div>
    ) : null;
  }
  return (
    <div className="flex shrink-0 items-center justify-between gap-4 border-t border-paper/15 px-4 py-3 sm:px-6">
      <button
        type="button"
        onClick={onPrev}
        className="inline-flex min-h-[44px] items-center px-3 text-sm text-paper/80 transition-colors hover:text-paper"
      >
        &larr; <span className="ml-2 hidden sm:inline">Previous</span>
      </button>
      <p className="min-w-0 flex-1 truncate text-center text-sm text-paper/70">
        {caption ? <span className="hidden sm:inline">{caption} · </span> : null}
        <span className="font-mono text-xs">
          {index + 1} / {total}
        </span>
      </p>
      <button
        type="button"
        onClick={onNext}
        className="inline-flex min-h-[44px] items-center px-3 text-sm text-paper/80 transition-colors hover:text-paper"
      >
        <span className="mr-2 hidden sm:inline">Next</span> &rarr;
      </button>
    </div>
  );
}
