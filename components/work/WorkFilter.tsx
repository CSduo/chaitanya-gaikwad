import Link from "next/link";
import type { WorkCategory } from "@/lib/case-studies";

/**
 * URL-addressable category filter.
 * Rendered as real links so each filtered view can be shared, opened in a new
 * tab and reached without JavaScript. No client-side state involved.
 */
export function WorkFilter({
  categories,
  active,
  counts,
  total,
}: {
  categories: { slug: WorkCategory; label: string }[];
  active: WorkCategory | null;
  counts: Record<string, number>;
  total: number;
}) {
  const base =
    "inline-flex min-h-[44px] shrink-0 snap-start items-center gap-2 border px-4 text-sm whitespace-nowrap transition-colors";

  return (
    /*
      A horizontal rail on phones and a wrapping row from `sm` up. Six labels
      wrap to three cramped lines on a 360px screen, so below that breakpoint
      they scroll instead — full-size targets, no shrunken pills. The negative
      margin lets the rail bleed to the screen edge so the last chip is
      visibly cut off, which is what signals that it scrolls.
    */
    <nav aria-label="Filter work by category">
      <ul className="-mx-6 flex snap-x snap-mandatory gap-2 overflow-x-auto px-6 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
        <li>
          <Link
            href="/work"
            aria-current={active === null ? "true" : undefined}
            className={`${base} ${
              active === null
                ? "border-ink bg-ink text-paper"
                : "border-rule text-ink-soft hover:border-ink hover:text-ink"
            }`}
          >
            All work
            <span className={active === null ? "text-paper/60" : "text-ink-faint"}>
              {total}
            </span>
          </Link>
        </li>
        {categories.map((c) => {
          const isActive = active === c.slug;
          return (
            <li key={c.slug}>
              <Link
                href={`/work?category=${c.slug}`}
                aria-current={isActive ? "true" : undefined}
                className={`${base} ${
                  isActive
                    ? "border-ink bg-ink text-paper"
                    : "border-rule text-ink-soft hover:border-ink hover:text-ink"
                }`}
              >
                {c.label}
                <span className={isActive ? "text-paper/60" : "text-ink-faint"}>
                  {counts[c.slug] ?? 0}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
