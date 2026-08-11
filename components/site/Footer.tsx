import Link from "next/link";
import {
  SITE,
  SOCIAL_CHANNELS,
  DIRECT_CHANNELS,
  publishedChannels,
} from "@/lib/site";
import { SERVICES } from "@/lib/services";
import { WORK_CATEGORIES } from "@/lib/case-studies";
import {
  publishedLegalPages,
  publishedLocations,
  COMPANY_REGISTRATION,
} from "@/lib/company";

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="label mb-5">{children}</h2>;
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-[32px] items-center text-sm text-ink-soft transition-colors hover:text-accent"
    >
      {children}
    </Link>
  );
}

export function Footer() {
  const legal = publishedLegalPages();
  const locations = publishedLocations();
  const emailChannels = publishedChannels();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-rule bg-paper-deep">
      <div className="mx-auto w-full max-w-(--container-wide) px-6 sm:px-8 lg:px-12">
        {/* ---- Band 1: brand ---- */}
        <div className="flex flex-col gap-6 py-10 sm:flex-row sm:items-start sm:justify-between sm:py-14">
          <div className="max-w-md">
            <p className="display text-2xl tracking-[0.14em] text-ink">{SITE.name}</p>
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">{SITE.descriptor}</p>
          </div>
          {SOCIAL_CHANNELS.length > 0 ? (
            <div>
              <ColumnHeading>Channels</ColumnHeading>
              <ul className="space-y-1">
                {SOCIAL_CHANNELS.map((c) => (
                  <li key={c.id}>
                    <a
                      href={c.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[32px] items-center text-sm text-ink-soft transition-colors hover:text-accent"
                    >
                      {c.label} — {c.value}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        {/* ---- Band 2: navigation ---- */}
        <div className="grid gap-8 border-t border-rule py-10 sm:grid-cols-2 sm:gap-10 sm:py-14 lg:grid-cols-4">
          <div>
            <ColumnHeading>Work</ColumnHeading>
            <ul className="space-y-1">
              <li>
                <FooterLink href="/work">All work</FooterLink>
              </li>
              {WORK_CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <FooterLink href={`/work?category=${c.slug}`}>{c.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <ColumnHeading>Services</ColumnHeading>
            <ul className="space-y-1">
              <li>
                <FooterLink href="/services">Overview</FooterLink>
              </li>
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <FooterLink href={`/services/${s.slug}`}>{s.shortName}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <ColumnHeading>Company</ColumnHeading>
            <ul className="space-y-1">
              <li>
                <FooterLink href="/company">Company</FooterLink>
              </li>
              <li>
                <FooterLink href="/company/people">Founder &amp; People</FooterLink>
              </li>
              <li>
                <FooterLink href="/company/locations">Locations</FooterLink>
              </li>
            </ul>
          </div>

          <div>
            <ColumnHeading>Connect</ColumnHeading>
            <ul className="space-y-1">
              <li>
                <FooterLink href="/contact">Contact</FooterLink>
              </li>
              <li>
                <FooterLink href="/careers">Careers</FooterLink>
              </li>
              {emailChannels.map((c) => (
                <li key={c.id}>
                  <a
                    href={`mailto:${c.email}`}
                    className="inline-flex min-h-[32px] items-center text-sm text-ink-soft transition-colors hover:text-accent"
                  >
                    {c.email}
                  </a>
                </li>
              ))}
              {DIRECT_CHANNELS.map((c) => (
                <li key={c.id}>
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[32px] items-center text-sm text-ink-soft transition-colors hover:text-accent"
                  >
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ---- Band 3: locations ---- */}
        <div className="grid gap-8 border-t border-rule py-10 sm:grid-cols-2 sm:gap-10 sm:py-14 lg:grid-cols-3">
          {locations.map((loc) => (
            <div key={loc.slug}>
              <ColumnHeading>{loc.name}</ColumnHeading>
              {/* Address lines render only when a verified address exists. */}
              {loc.addressLines.length > 0 ? (
                <address className="not-italic text-sm leading-relaxed text-ink-soft">
                  {loc.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              ) : (
                <p className="text-sm leading-relaxed text-ink-muted">{loc.summary}</p>
              )}
              {loc.timezone ? <p className="meta mt-3">{loc.timezone}</p> : null}
            </div>
          ))}
          <div>
            <ColumnHeading>International delivery</ColumnHeading>
            <p className="text-sm leading-relaxed text-ink-muted">
              Work is delivered remotely to clients across the United Kingdom, Europe, the
              Middle East and Asia.
            </p>
          </div>
        </div>

        {/* ---- Band 4: legal ---- */}
        <div className="border-t border-rule py-10">
          {legal.length > 0 ? (
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {legal.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/legal/${p.slug}`}
                    className="inline-flex min-h-[32px] items-center text-xs text-ink-muted transition-colors hover:text-accent"
                  >
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}

          <p className="meta mt-6">
            &copy; {year} {SITE.name}
          </p>

          {/*
            Reserved legal / company information area.
            Renders nothing at all until formal registration details exist.
          */}
          {COMPANY_REGISTRATION ? (
            <div className="mt-6 max-w-2xl border-t border-rule pt-6">
              <p className="meta leading-relaxed">
                {COMPANY_REGISTRATION.legalName}
                {COMPANY_REGISTRATION.registrationNumber
                  ? ` · Registered number ${COMPANY_REGISTRATION.registrationNumber}`
                  : null}
                {COMPANY_REGISTRATION.vatNumber
                  ? ` · VAT ${COMPANY_REGISTRATION.vatNumber}`
                  : null}
              </p>
              {COMPANY_REGISTRATION.registeredOffice.length > 0 ? (
                <address className="meta mt-2 not-italic leading-relaxed">
                  {COMPANY_REGISTRATION.registeredOffice.join(", ")}
                </address>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
