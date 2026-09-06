import Link from "next/link";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { SITE, WHATSAPP, SECONDARY_CTA, getServiceWhatsAppHref } from "@/lib/site";

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

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href={ukHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-xs bg-paper px-7 text-sm font-medium tracking-tight text-ink transition-colors hover:bg-accent hover:text-paper"
            >
              Start on WhatsApp
              <span aria-hidden="true">&rarr;</span>
            </a>
            <Link
              href={SECONDARY_CTA.href}
              className="inline-flex min-h-[48px] items-center justify-center rounded-xs border border-paper/30 px-7 text-sm font-medium tracking-tight text-paper transition-colors hover:border-paper hover:bg-paper/10"
            >
              {SECONDARY_CTA.label}
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <a
              href={ukHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-lg border border-paper/20 bg-paper/10 p-3.5 shadow-xs backdrop-blur-xs transition-all hover:border-paper/60 hover:bg-paper/15 hover:shadow-sm"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-paper/15 text-paper transition-transform group-hover:scale-105">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.275-.1-.475-.15-.676.15-.2.3-.777.978-.953 1.178-.175.2-.351.225-.652.075-.301-.15-1.272-.469-2.423-1.496-.895-.798-1.5-1.784-1.675-2.085-.176-.301-.019-.464.132-.614.135-.136.301-.351.452-.526.15-.176.201-.301.301-.502.1-.2.05-.376-.025-.526-.075-.15-.677-1.633-.927-2.235-.244-.587-.492-.507-.677-.517-.175-.009-.376-.01-.577-.01-.2 0-.526.075-.802.376-.276.301-1.053 1.028-1.053 2.508 0 1.48 1.078 2.91 1.228 3.11.151.2 2.122 3.24 5.141 4.545.718.31 1.279.495 1.716.634.721.23 1.377.197 1.896.12.578-.087 1.78-.727 2.031-1.43.25-.702.25-1.303.175-1.429-.075-.125-.276-.201-.577-.351zm-5.447 7.423c-1.849 0-3.66-.497-5.239-1.44l-.376-.226-3.896 1.022 1.04-3.799-.248-.395c-1.036-1.649-1.583-3.565-1.581-5.529.004-5.755 4.686-10.436 10.446-10.436 2.788 0 5.41 1.086 7.378 3.057 1.968 1.972 3.05 4.596 3.048 7.387-.004 5.757-4.687 10.439-10.448 10.449zm0-22c-6.417 0-11.638 5.221-11.641 11.64-.002 2.05.534 4.053 1.554 5.821l-1.65 6.027 6.168-1.618c1.706.93 3.633 1.42 5.566 1.422h.005c6.416 0 11.638-5.222 11.641-11.641.002-3.11-1.207-6.033-3.407-8.235-2.202-2.203-5.127-3.416-8.236-3.416z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <span className="block font-mono text-[0.625rem] uppercase tracking-[0.12em] text-paper/60">
                    United Kingdom
                  </span>
                  <span className="block truncate text-sm font-semibold text-paper group-hover:text-white">
                    {WHATSAPP.uk.number}
                  </span>
                </div>
              </div>
              <span className="text-xs text-paper/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-paper">
                &#8599;
              </span>
            </a>

            <a
              href={indiaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-lg border border-paper/20 bg-paper/10 p-3.5 shadow-xs backdrop-blur-xs transition-all hover:border-paper/60 hover:bg-paper/15 hover:shadow-sm"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-paper/15 text-paper transition-transform group-hover:scale-105">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.275-.1-.475-.15-.676.15-.2.3-.777.978-.953 1.178-.175.2-.351.225-.652.075-.301-.15-1.272-.469-2.423-1.496-.895-.798-1.5-1.784-1.675-2.085-.176-.301-.019-.464.132-.614.135-.136.301-.351.452-.526.15-.176.201-.301.301-.502.1-.2.05-.376-.025-.526-.075-.15-.677-1.633-.927-2.235-.244-.587-.492-.507-.677-.517-.175-.009-.376-.01-.577-.01-.2 0-.526.075-.802.376-.276.301-1.053 1.028-1.053 2.508 0 1.48 1.078 2.91 1.228 3.11.151.2 2.122 3.24 5.141 4.545.718.31 1.279.495 1.716.634.721.23 1.377.197 1.896.12.578-.087 1.78-.727 2.031-1.43.25-.702.25-1.303.175-1.429-.075-.125-.276-.201-.577-.351zm-5.447 7.423c-1.849 0-3.66-.497-5.239-1.44l-.376-.226-3.896 1.022 1.04-3.799-.248-.395c-1.036-1.649-1.583-3.565-1.581-5.529.004-5.755 4.686-10.436 10.446-10.436 2.788 0 5.41 1.086 7.378 3.057 1.968 1.972 3.05 4.596 3.048 7.387-.004 5.757-4.687 10.439-10.448 10.449zm0-22c-6.417 0-11.638 5.221-11.641 11.64-.002 2.05.534 4.053 1.554 5.821l-1.65 6.027 6.168-1.618c1.706.93 3.633 1.42 5.566 1.422h.005c6.416 0 11.638-5.222 11.641-11.641.002-3.11-1.207-6.033-3.407-8.235-2.202-2.203-5.127-3.416-8.236-3.416z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <span className="block font-mono text-[0.625rem] uppercase tracking-[0.12em] text-paper/60">
                    India
                  </span>
                  <span className="block truncate text-sm font-semibold text-paper group-hover:text-white">
                    {WHATSAPP.india.number}
                  </span>
                </div>
              </div>
              <span className="text-xs text-paper/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-paper">
                &#8599;
              </span>
            </a>
          </div>
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
