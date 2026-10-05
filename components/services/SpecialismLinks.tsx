import Link from "next/link";
import type { Specialism } from "@/lib/specialisms";

/** Crawlable list of specialism pages with descriptive link text. */
export function SpecialismLinks({ specialisms }: { specialisms: Specialism[] }) {
  if (specialisms.length === 0) return null;
  return (
    <ul className="grid gap-px border border-rule bg-rule sm:grid-cols-2">
      {specialisms.map((s) => (
        <li key={s.path} className="bg-paper p-6 lg:p-7">
          <h3 className="text-base font-semibold tracking-tight text-ink">
            <Link
              href={s.path}
              className="inline-flex min-h-[44px] items-center gap-2 underline decoration-rule-strong underline-offset-4 transition-colors hover:text-accent"
            >
              {s.name}
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-ink-muted">{s.summary}</p>
        </li>
      ))}
    </ul>
  );
}
