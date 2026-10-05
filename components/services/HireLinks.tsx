import Link from "next/link";
import { HIRE_PATH, GUIDE_PATH } from "@/lib/hire";

const LINKS = [
  {
    href: HIRE_PATH,
    name: "Hire a 3D visualiser",
    summary:
      "For freelance-style hiring: how a project runs from brief to final files, what is agreed in writing, and the published starting price.",
  },
  {
    href: GUIDE_PATH,
    name: "Freelancer or studio: how to choose",
    summary:
      "When a freelance 3D visualiser is the better hire, when a studio is, and a twelve-question checklist for evaluating either.",
  },
];

/** Crawlable links to the hire-intent page and the comparison guide. */
export function HireLinks() {
  return (
    <ul className="grid gap-px border border-rule bg-rule sm:grid-cols-2">
      {LINKS.map((l) => (
        <li key={l.href} className="bg-paper p-6 lg:p-7">
          <h3 className="text-base font-semibold tracking-tight text-ink">
            <Link
              href={l.href}
              className="inline-flex min-h-[44px] items-center gap-2 underline decoration-rule-strong underline-offset-4 transition-colors hover:text-accent"
            >
              {l.name}
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-ink-muted">{l.summary}</p>
        </li>
      ))}
    </ul>
  );
}
