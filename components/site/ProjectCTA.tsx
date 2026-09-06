import Link from "next/link";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { SITE, WHATSAPP, SECONDARY_CTA, getServiceWhatsAppHref } from "@/lib/site";

/**
 * The single conversion component, reused across the site.
 * Provides direct WhatsApp, telephone (tel:), and detailed brief paths.
 */
export function ProjectCTA({
  eyebrow = "Start a project",
  title = "Have a project your team needs capacity for?",
  body = "Tell us what you are working on.",
  services,
  serviceSlug,
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
  /** Optional service links rendered beneath the CTA. */
  services?: { label: string; href: string }[];
  serviceSlug?: string;
}) {
  const ukHref = getServiceWhatsAppHref(serviceSlug, "uk");
  const indiaHref = getServiceWhatsAppHref(serviceSlug, "india");

  return (
    <section className="bg-ink py-20 text-paper sm:py-24 lg:py-28">
      <Container width="page">
        <div className="max-w-3xl">
          <Eyebrow className="text-paper/55">{eyebrow}</Eyebrow>
          <h2 className="display mt-5 text-3xl leading-[1.1] sm:text-4xl lg:text-[3rem]">
            {title}
          </h2>
          <p className="mt-6 text-lg text-paper/70">{body}</p>

          {/* Primary Action Row — Triangle / Pyramid Layout */}
          <div className="mt-10 max-w-md sm:max-w-lg">
            <div className="grid grid-cols-2 gap-3 sm:gap-3.5">
              <a
                href={ukHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xs bg-paper px-3 sm:px-6 text-xs sm:text-sm font-medium tracking-tight text-ink transition-colors hover:bg-accent hover:text-paper text-center"
              >
                <span>Start on WhatsApp</span>
                <span aria-hidden="true">&rarr;</span>
              </a>
              <Link
                href={SECONDARY_CTA.href}
                className="flex min-h-[48px] w-full items-center justify-center rounded-xs border border-paper/30 px-3 sm:px-6 text-xs sm:text-sm font-medium tracking-tight text-paper/80 transition-colors hover:border-paper hover:bg-paper/10 hover:text-paper text-center"
              >
                {SECONDARY_CTA.label}
              </Link>
            </div>
            <div className="mt-3 sm:mt-3.5 flex justify-center">
              <a
                href={WHATSAPP.uk.tel}
                className="inline-flex min-h-[48px] w-full sm:w-auto items-center justify-center gap-2 rounded-xs border border-paper/40 px-6 text-xs sm:text-sm font-medium tracking-tight text-paper transition-colors hover:border-paper hover:bg-paper/10"
                title="Call UK Line"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="15"
                  height="15"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-paper/70 shrink-0"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>Call: {WHATSAPP.uk.number}</span>
              </a>
            </div>
          </div>

          {/* Direct Region Cards with Paired Call + WhatsApp Actions */}
          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {/* UK Card */}
            <div className="flex flex-col justify-between rounded-lg border border-paper/20 bg-paper/10 p-4 shadow-xs backdrop-blur-xs transition-all hover:border-paper/40">
              <div className="flex items-center justify-between">
                <div>
                  <span className="block font-mono text-[0.625rem] uppercase tracking-[0.14em] text-paper/60">
                    United Kingdom · Client Coordination
                  </span>
                  <span className="mt-1 block text-base font-semibold font-mono text-paper">
                    {WHATSAPP.uk.number}
                  </span>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <a
                  href={WHATSAPP.uk.tel}
                  className="inline-flex min-h-[40px] flex-1 items-center justify-center gap-1.5 rounded-xs border border-paper/30 bg-paper/5 text-xs font-medium text-paper transition-colors hover:border-paper hover:bg-paper/20"
                  aria-label={`Call XIYÀTO UK at ${WHATSAPP.uk.number}`}
                >
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-paper/70">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>Call Line</span>
                </a>
                <a
                  href={ukHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[40px] flex-1 items-center justify-center gap-1.5 rounded-xs bg-paper px-3 text-xs font-semibold text-ink transition-colors hover:bg-accent hover:text-paper"
                  aria-label="WhatsApp XIYÀTO UK"
                >
                  <span>WhatsApp</span>
                  <span aria-hidden="true" className="text-xs">&#8599;</span>
                </a>
              </div>
            </div>

            {/* India Card */}
            <div className="flex flex-col justify-between rounded-lg border border-paper/20 bg-paper/10 p-4 shadow-xs backdrop-blur-xs transition-all hover:border-paper/40">
              <div className="flex items-center justify-between">
                <div>
                  <span className="block font-mono text-[0.625rem] uppercase tracking-[0.14em] text-paper/60">
                    India · Technical Production Hub
                  </span>
                  <span className="mt-1 block text-base font-semibold font-mono text-paper">
                    {WHATSAPP.india.number}
                  </span>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <a
                  href={WHATSAPP.india.tel}
                  className="inline-flex min-h-[40px] flex-1 items-center justify-center gap-1.5 rounded-xs border border-paper/30 bg-paper/5 text-xs font-medium text-paper transition-colors hover:border-paper hover:bg-paper/20"
                  aria-label={`Call XIYÀTO India at ${WHATSAPP.india.number}`}
                >
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-paper/70">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>Call Line</span>
                </a>
                <a
                  href={indiaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[40px] flex-1 items-center justify-center gap-1.5 rounded-xs bg-paper px-3 text-xs font-semibold text-ink transition-colors hover:bg-accent hover:text-paper"
                  aria-label="WhatsApp XIYÀTO India"
                >
                  <span>WhatsApp</span>
                  <span aria-hidden="true" className="text-xs">&#8599;</span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Trust Microcopy */}
          <p className="mt-6 text-xs text-paper/60 leading-relaxed">
            Direct technical scoping for international project enquiries.
          </p>
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
          {SITE.name} works with clients across the United Kingdom, India, and internationally.
        </p>
      </Container>
    </section>
  );
}
