import Link from "next/link";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { SITE, WHATSAPP, PRIMARY_CTA, SECONDARY_CTA } from "@/lib/site";

/**
 * The single conversion component, reused across the site.
 *
 * The primary action opens WhatsApp with a prefilled note — the fastest route
 * to a real conversation. The contact form remains the secondary route for
 * briefs that need detail, files or a written record.
 */
export function ProjectCTA({
  eyebrow = "Start a project",
  title = "Have a project your team needs capacity for?",
  body = "Tell us what you are working on.",
  services,
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
  /** Optional service links rendered beneath the CTA. */
  services?: { label: string; href: string }[];
}) {
  return (
    <section className="bg-ink py-20 text-paper sm:py-24 lg:py-28">
      <Container width="page">
        <div className="max-w-3xl">
          <Eyebrow className="text-paper/55">{eyebrow}</Eyebrow>
          <h2 className="display mt-5 text-3xl leading-[1.1] sm:text-4xl lg:text-[3rem]">
            {title}
          </h2>
          <p className="mt-6 text-lg text-paper/70">{body}</p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href={PRIMARY_CTA.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-xs bg-paper px-7 text-sm font-medium tracking-tight text-ink transition-colors hover:bg-accent hover:text-paper"
            >
              {PRIMARY_CTA.label}
              <span aria-hidden="true">&rarr;</span>
            </a>
            <Link
              href={SECONDARY_CTA.href}
              className="inline-flex min-h-[48px] items-center justify-center rounded-xs border border-paper/30 px-7 text-sm font-medium tracking-tight text-paper transition-colors hover:border-paper hover:bg-paper/10"
            >
              {SECONDARY_CTA.label}
            </Link>
          </div>

          <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
            <div>
              <dt className="label text-paper/45">United Kingdom</dt>
              <dd className="mt-1">
                <a
                  href={WHATSAPP.uk.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-1.5 text-sm text-paper/85 underline decoration-paper/30 underline-offset-4 transition-colors hover:decoration-paper"
                >
                  {WHATSAPP.uk.number}
                  <span aria-hidden="true" className="text-xs">
                    &#8599;
                  </span>
                </a>
              </dd>
            </div>
            <div>
              <dt className="label text-paper/45">India</dt>
              <dd className="mt-1">
                <a
                  href={WHATSAPP.india.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-1.5 text-sm text-paper/85 underline decoration-paper/30 underline-offset-4 transition-colors hover:decoration-paper"
                >
                  {WHATSAPP.india.number}
                  <span aria-hidden="true" className="text-xs">
                    &#8599;
                  </span>
                </a>
              </dd>
            </div>
          </dl>
        </div>

        {services && services.length > 0 ? (
          <ul className="mt-16 grid gap-px border border-paper/15 bg-paper/15 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <li key={s.href} className="bg-ink">
                <Link
                  href={s.href}
                  className="flex min-h-[64px] items-center justify-between gap-4 px-6 py-5 text-sm text-paper/80 transition-colors hover:bg-paper/5 hover:text-paper"
                >
                  {s.label}
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : null}

        <p className="sr-only">
          {SITE.name} works with clients across the United Kingdom and India.
        </p>
      </Container>
    </section>
  );
}
