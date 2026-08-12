"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import type { CadDrawing } from "@/lib/portfolio";

interface CadInspectionModalProps {
  drawings: CadDrawing[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
}

export function CadInspectionModal({
  drawings,
  initialIndex = 0,
  isOpen,
  onClose,
}: CadInspectionModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoomScale, setZoomScale] = useState(1);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);

  // Sync index when initialIndex changes
  useEffect(() => {
    setCurrentIndex(initialIndex);
    setZoomScale(1);
    setPanPosition({ x: 0, y: 0 });
  }, [initialIndex, isOpen]);

  const current = drawings[currentIndex] || drawings[0];

  const resetTransform = useCallback(() => {
    setZoomScale(1);
    setPanPosition({ x: 0, y: 0 });
  }, []);

  const handleZoomIn = useCallback(() => {
    setZoomScale((prev) => Math.min(prev + 0.5, 4));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoomScale((prev) => {
      const next = Math.max(prev - 0.5, 1);
      if (next === 1) setPanPosition({ x: 0, y: 0 });
      return next;
    });
  }, []);

  const handleNext = useCallback(() => {
    resetTransform();
    setCurrentIndex((prev) => (prev + 1) % drawings.length);
  }, [drawings.length, resetTransform]);

  const handlePrev = useCallback(() => {
    resetTransform();
    setCurrentIndex((prev) => (prev - 1 + drawings.length) % drawings.length);
  }, [drawings.length, resetTransform]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "+" || e.key === "=") handleZoomIn();
      if (e.key === "-") handleZoomOut();
      if (e.key === "0") resetTransform();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleNext, handlePrev, handleZoomIn, handleZoomOut, resetTransform, onClose]);

  // Mouse wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      setZoomScale((prev) => Math.min(prev + 0.25, 4));
    } else {
      setZoomScale((prev) => {
        const next = Math.max(prev - 0.25, 1);
        if (next === 1) setPanPosition({ x: 0, y: 0 });
        return next;
      });
    }
  };

  // Mouse Drag / Pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomScale <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - panPosition.x, y: e.clientY - panPosition.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || zoomScale <= 1) return;
    setPanPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (zoomScale <= 1 || e.touches.length !== 1) return;
    setIsDragging(true);
    setDragStart({
      x: e.touches[0].clientX - panPosition.x,
      y: e.touches[0].clientY - panPosition.y,
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || zoomScale <= 1 || e.touches.length !== 1) return;
    setPanPosition({
      x: e.touches[0].clientX - dragStart.x,
      y: e.touches[0].clientY - dragStart.y,
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  if (!isOpen || !current) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`CAD Drawing Inspector: ${current.title}`}
      className="fixed inset-0 z-[120] flex flex-col bg-neutral-950/98 text-white select-none backdrop-blur-md"
    >
      {/* Top Header Bar */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-white/10 px-4 sm:px-6">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex items-center gap-2">
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider font-semibold ${
                current.role === "output"
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                  : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
              }`}
            >
              {current.role === "output" ? "Produced CAD" : "Client Input"}
            </span>
            <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-white/10 text-white/70">
              {current.category}
            </span>
          </div>
          <h2 className="truncate text-sm sm:text-base font-medium text-white/90">
            {current.title}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {/* Zoom Level Indicator */}
          <span className="hidden md:inline-block font-mono text-xs text-white/60 bg-white/5 px-2.5 py-1 rounded border border-white/10">
            {Math.round(zoomScale * 100)}%
          </span>

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close drawing viewer"
            className="flex h-9 items-center gap-1.5 rounded-lg bg-white/10 px-3 text-xs font-medium text-white/80 hover:bg-white/20 hover:text-white transition-colors"
          >
            <span>Close</span>
            <kbd className="hidden sm:inline font-mono text-[10px] text-white/40">ESC</kbd>
          </button>
        </div>
      </header>

      {/* Main Drawing Canvas / Viewport */}
      <div
        ref={containerRef}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={`relative flex-1 overflow-hidden bg-neutral-900/60 flex items-center justify-center p-2 sm:p-6 ${
          zoomScale > 1
            ? isDragging
              ? "cursor-grabbing"
              : "cursor-grab"
            : "cursor-zoom-in"
        }`}
        onClick={(e) => {
          // If clicked without dragging and at 1x, zoom in
          if (zoomScale === 1 && e.target === e.currentTarget) {
            handleZoomIn();
          }
        }}
      >
        {/* Transform Container */}
        <div
          style={{
            transform: `translate(${panPosition.x}px, ${panPosition.y}px) scale(${zoomScale})`,
            transformOrigin: "center center",
            transition: isDragging ? "none" : "transform 0.15s cubic-bezier(0.2, 0, 0, 1)",
          }}
          className="relative max-h-full max-w-full flex items-center justify-center pointer-events-none"
        >
          <Image
            src={current.src}
            alt={current.alt}
            width={current.width}
            height={current.height}
            sizes="98vw"
            priority
            quality={95}
            className="max-h-[calc(100dvh-11rem)] w-auto max-w-[95vw] object-contain rounded shadow-2xl bg-white"
          />
        </div>

        {/* Floating Zoom Navigation Controls Pill */}
        <aside 
          aria-label="Zoom controls"
          className="absolute bottom-6 right-6 z-20 flex items-center gap-1 rounded-full bg-neutral-950/90 p-1.5 border border-white/15 shadow-xl backdrop-blur-md"
        >
          <button
            type="button"
            onClick={handleZoomOut}
            disabled={zoomScale <= 1}
            aria-label="Zoom out"
            className="flex h-8 w-8 items-center justify-center rounded-full text-white/80 hover:bg-white/15 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>

          <button
            type="button"
            onClick={resetTransform}
            aria-label="Reset zoom to 100%"
            className="px-2.5 h-8 rounded-full text-xs font-mono text-white/80 hover:bg-white/15 hover:text-white transition-colors"
          >
            {Math.round(zoomScale * 100)}%
          </button>

          <button
            type="button"
            onClick={handleZoomIn}
            disabled={zoomScale >= 4}
            aria-label="Zoom in"
            className="flex h-8 w-8 items-center justify-center rounded-full text-white/80 hover:bg-white/15 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>

          <div className="h-4 w-px bg-white/20 mx-0.5" />

          {current.downloads?.pdf && (
            <a
              href={current.downloads.pdf}
              target="_blank"
              rel="noopener noreferrer"
              download
              aria-label="Download high-resolution vector PDF"
              className="flex h-8 items-center gap-1.5 px-3 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-medium hover:bg-amber-500/30 transition-colors"
            >
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>PDF</span>
            </a>
          )}
        </aside>

        {/* Previous / Next Floating Arrows */}
        {drawings.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous drawing"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-neutral-950/80 border border-white/15 text-white/80 hover:bg-white/20 hover:text-white transition-all shadow-xl"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next drawing"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-neutral-950/80 border border-white/15 text-white/80 hover:bg-white/20 hover:text-white transition-all shadow-xl"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Bottom Thumbnail Strip & Sheet Meta */}
      <footer className="shrink-0 border-t border-white/10 bg-neutral-950 px-4 py-2.5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 min-w-0">
            <p className="font-mono text-xs text-white/50 shrink-0">
              Sheet {currentIndex + 1} of {drawings.length}
            </p>
            <span className="text-white/20">•</span>
            <p className="truncate text-xs text-white/70 hidden sm:block">
              {current.alt}
            </p>
          </div>

          {/* Quick thumbnail navigation bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-[50vw] py-1">
            {drawings.map((d, idx) => (
              <button
                key={d.src}
                type="button"
                onClick={() => {
                  resetTransform();
                  setCurrentIndex(idx);
                }}
                className={`relative h-9 w-14 shrink-0 overflow-hidden rounded border transition-all ${
                  idx === currentIndex
                    ? "border-amber-400 ring-2 ring-amber-400/40 opacity-100"
                    : "border-white/20 opacity-40 hover:opacity-80"
                }`}
              >
                <Image
                  src={d.src}
                  alt={d.title}
                  fill
                  sizes="60px"
                  className="object-cover bg-white"
                />
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
