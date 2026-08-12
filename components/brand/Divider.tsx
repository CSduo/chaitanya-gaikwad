"use client";

import { useInView, useReducedMotion } from "@/components/home/hooks";
import { CornerFrame } from "./decorations";

/**
 * The technical section divider — the "box line" transition.
 *
 * Rebuilt from the pre-rebuild decoration set (CornerCrosshairs and
 * BlueprintAccent on legacy/pre-rebuild-snapshot), retuned to the final logo:
 * a pair of hairlines, a centred registration tick, and one short red segment
 * borrowed from the rule beneath the wordmark.
 *
 * It draws itself once on entry and then holds. Under reduced motion it is
 * simply present, fully drawn, with no transition.
 */
export function SectionDivider({
  index,
  label,
  className = "",
}: {
  /** Optional two-digit section index, rendered as a drafting reference. */
  index?: number;
  /** Optional short label, e.g. a service name. Kept to a few characters. */
  label?: string;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>("-5% 0px");
  const reduced = useReducedMotion();
  const on = inView || reduced;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
    >
      <div className="mx-auto flex w-full max-w-[74rem] items-center gap-3 px-6 sm:px-8">
        {/* Left hairline, drawn from the left */}
        <span className="relative h-px flex-1 overflow-hidden bg-transparent">
          <span
            data-in={on}
            className="rule-draw absolute inset-0 bg-rule"
            style={{ transformOrigin: "left center" }}
          />
        </span>

        {/* Centre registration mark */}
        <span className="flex shrink-0 items-center gap-2">
          <span
            className="block h-2 w-px bg-rule-strong transition-opacity duration-500"
            style={{ opacity: on ? 1 : 0 }}
          />
          {/* The single red segment, taken from the rule under the wordmark */}
          <span
            className="block h-px bg-accent transition-all duration-700"
            style={{ width: on ? "1.5rem" : 0, transitionDelay: "300ms" }}
          />
          {index !== undefined || label ? (
            <span
              className="font-mono text-[0.5625rem] uppercase tracking-[0.22em] text-ink-faint transition-opacity duration-500"
              style={{ opacity: on ? 1 : 0, transitionDelay: "500ms" }}
            >
              {index !== undefined ? String(index).padStart(2, "0") : null}
              {index !== undefined && label ? " / " : null}
              {label}
            </span>
          ) : null}
          <span
            className="block h-px bg-accent transition-all duration-700"
            style={{ width: on ? "1.5rem" : 0, transitionDelay: "300ms" }}
          />
          <span
            className="block h-2 w-px bg-rule-strong transition-opacity duration-500"
            style={{ opacity: on ? 1 : 0 }}
          />
        </span>

        {/* Right hairline, drawn from the right */}
        <span className="relative h-px flex-1 overflow-hidden bg-transparent">
          <span
            data-in={on}
            className="rule-draw absolute inset-0 bg-rule"
            style={{ transformOrigin: "right center" }}
          />
        </span>
      </div>
    </div>
  );
}

/**
 * Corner brackets around a region — the matchbox outline.
 *
 * Sits inside a `.deco-host` parent. Hidden below the `sm` breakpoint, where
 * the frame would crowd the copy rather than frame it.
 */
export function BoxFrame({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`deco deco-desktop inset-0 ${className}`}>
      {(["top-left", "top-right", "bottom-left", "bottom-right"] as const).map((p) => (
        <CornerFrame
          key={p}
          position={p}
          opacity={0.5}
          className={`absolute h-8 w-8 text-rule-strong ${
            p === "top-left"
              ? "left-0 top-0"
              : p === "top-right"
                ? "right-0 top-0"
                : p === "bottom-left"
                  ? "bottom-0 left-0"
                  : "bottom-0 right-0"
          }`}
        />
      ))}
    </div>
  );
}
