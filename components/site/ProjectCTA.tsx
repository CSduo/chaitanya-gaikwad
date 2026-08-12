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

          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <a
              href={WHATSAPP.uk.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-lg border border-paper/20 bg-paper/5 p-3.5 shadow-xs backdrop-blur-xs transition-all hover:border-emerald-400/60 hover:bg-emerald-500/10 hover:shadow-sm"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 transition-transform group-hover:scale-105">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.586-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.076-1.928-.475-1.524-.651-2.502-2.193-2.578-2.296-.076-.103-.618-.823-.618-1.569 0-.746.392-1.112.53-1.264.14-.152.304-.19.405-.19.102 0 .204.002.293.006.093.004.218-.035.34.259.127.306.435 1.06.474 1.137.038.077.064.167.013.269-.05.103-.076.166-.152.254-.076.089-.16.198-.228.266-.077.076-.157.159-.068.312.09.153.398.657.854 1.063.586.522 1.08.683 1.233.76.153.076.242.064.331-.039.09-.102.381-.444.483-.596.102-.153.204-.127.344-.076.14.051.889.419 1.042.495.153.076.254.115.292.178.038.064.038.369-.106.774zM12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.66 1.434 5.176L2 22l4.954-1.399C8.406 21.498 10.144 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <span className="block font-mono text-[0.625rem] uppercase tracking-[0.12em] text-paper/60">
                    United Kingdom
                  </span>
                  <span className="block truncate text-sm font-semibold text-paper group-hover:text-emerald-300">
                    {WHATSAPP.uk.number}
                  </span>
                </div>
              </div>
              <span className="text-xs text-paper/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-emerald-400">
                &#8599;
              </span>
            </a>

            <a
              href={WHATSAPP.india.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-lg border border-paper/20 bg-paper/5 p-3.5 shadow-xs backdrop-blur-xs transition-all hover:border-emerald-400/60 hover:bg-emerald-500/10 hover:shadow-sm"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 transition-transform group-hover:scale-105">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.586-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.076-1.928-.475-1.524-.651-2.502-2.193-2.578-2.296-.076-.103-.618-.823-.618-1.569 0-.746.392-1.112.53-1.264.14-.152.304-.19.405-.19.102 0 .204.002.293.006.093.004.218-.035.34.259.127.306.435 1.06.474 1.137.038.077.064.167.013.269-.05.103-.076.166-.152.254-.076.089-.16.198-.228.266-.077.076-.157.159-.068.312.09.153.398.657.854 1.063.586.522 1.08.683 1.233.76.153.076.242.064.331-.039.09-.102.381-.444.483-.596.102-.153.204-.127.344-.076.14.051.889.419 1.042.495.153.076.254.115.292.178.038.064.038.369-.106.774zM12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.66 1.434 5.176L2 22l4.954-1.399C8.406 21.498 10.144 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <span className="block font-mono text-[0.625rem] uppercase tracking-[0.12em] text-paper/60">
                    India
                  </span>
                  <span className="block truncate text-sm font-semibold text-paper group-hover:text-emerald-300">
                    {WHATSAPP.india.number}
                  </span>
                </div>
              </div>
              <span className="text-xs text-paper/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-emerald-400">
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
