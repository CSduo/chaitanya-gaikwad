import type { Metadata } from "next";
import {
  Container,
  Section,
  Eyebrow,
  SectionHeading,
  CapabilityList,
  JsonLd,
} from "@/components/ui/primitives";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { publishedChannels, DIRECT_CHANNELS, SOCIAL_CHANNELS, WHATSAPP } from "@/lib/site";
import { publishedLocations } from "@/lib/company";
import { pageMetadata, breadcrumbSchema } from "@/lib/seo";
import { ROUTE_SEO } from "@/lib/seo-copy";

export const metadata: Metadata = pageMetadata({
  title: ROUTE_SEO.contact.metaTitle,
  description: ROUTE_SEO.contact.metaDescription,
  path: "/contact",
});

export default function ContactPage() {
  const channels = publishedChannels();
  const locations = publishedLocations();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />

      {/* 01 — Contact hero */}
      <section className="border-b border-rule">
        <Container width="page" className="py-16 sm:py-20">
          <div className="max-w-3xl">
            <Eyebrow>Contact</Eyebrow>
            <h1 className="display mt-6 text-[2.125rem] leading-[1.1] sm:text-5xl lg:text-[3.5rem]">
              Start a project.
            </h1>
            <p className="mt-6 text-base leading-relaxed text-ink-soft sm:mt-7 sm:text-lg">
              Send the brief and whatever material already exists. It does not need to be
              complete — establishing what is confirmed, assumed and missing is the first
              step of every engagement.
            </p>
          </div>
        </Container>
      </section>

      {/* 02–07 — Enquiry form with Direct Founder Access Priority Bar */}
      <Section tone="surface">
        <Container width="page">
          {/* Priority Direct Contact Module — Above the Form */}
          <div className="mb-12 rounded-lg border border-rule-strong bg-paper p-6 sm:p-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <span className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-accent">
                  Direct Founder &amp; Technical Scoping
                </span>
                <h2 className="display mt-1 text-xl sm:text-2xl">
                  Prefer to speak directly or have an urgent brief?
                </h2>
                <p className="mt-2 text-sm text-ink-muted">
                  No account layers. Reach our UK coordination line or India technical hub directly.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5">
                {/* UK Actions */}
                <a
                  href={WHATSAPP.uk.tel}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-xs border border-rule-strong bg-surface px-4 text-xs font-semibold tracking-tight text-ink transition-colors hover:border-ink"
                  aria-label={`Call UK Line directly at ${WHATSAPP.uk.number}`}
                >
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ink-muted">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>Call UK: {WHATSAPP.uk.number}</span>
                </a>

                <a
                  href={WHATSAPP.uk.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-xs bg-ink px-4 text-xs font-semibold tracking-tight text-paper transition-colors hover:bg-accent"
                >
                  <span>WhatsApp UK</span>
                  <span aria-hidden="true">&#8599;</span>
                </a>

                {/* India Actions */}
                <a
                  href={WHATSAPP.india.tel}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-xs border border-rule-strong bg-surface px-4 text-xs font-semibold tracking-tight text-ink transition-colors hover:border-ink"
                  aria-label={`Call India Hub directly at ${WHATSAPP.india.number}`}
                >
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ink-muted">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>Call India: {WHATSAPP.india.number}</span>
                </a>

                <a
                  href={WHATSAPP.india.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-xs border border-rule px-4 text-xs font-semibold tracking-tight text-ink transition-colors hover:border-ink hover:bg-paper-deep"
                >
                  <span>WhatsApp India</span>
                  <span aria-hidden="true">&#8599;</span>
                </a>
              </div>
            </div>
          </div>

          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <h2 className="display mb-10 text-2xl sm:text-3xl">Project enquiry</h2>
              <EnquiryForm />
            </div>

            <aside className="lg:col-span-5">
              <div className="border border-rule bg-paper p-7 lg:p-8">
                <h2 className="label mb-5">What happens next</h2>
                <ol className="space-y-5">
                  {[
                    {
                      t: "We read it",
                      d: "Enquiries go to the founder directly. There is no account layer.",
                    },
                    {
                      t: "We reply within one working day",
                      d: "With an assessment of what is workable and what is still needed.",
                    },
                    {
                      t: "We propose a scope",
                      d: "A defined deliverable list and format before any production starts.",
                    },
                  ].map((step, i) => (
                    <li key={step.t} className="flex gap-4">
                      <span className="label shrink-0 pt-0.5">{`0${i + 1}`}</span>
                      <span>
                        <span className="block text-sm font-medium text-ink">{step.t}</span>
                        <span className="mt-1 block text-sm leading-relaxed text-ink-muted">
                          {step.d}
                        </span>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-8 border border-rule bg-paper p-7 lg:p-8">
                <h2 className="label mb-5">Useful to include</h2>
                <CapabilityList
                  items={[
                    "What the deliverable needs to be",
                    "Any fixed dimensions or confirmed constraints",
                    "The deadline, if one is already set",
                    "Which material already exists",
                    "The format your team needs to receive",
                  ]}
                />
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      {/* 08–13 — Direct channels, locations, careers */}
      <Section bordered>
        <Container width="page">
          <SectionHeading eyebrow="Other routes" title="Contacting us directly." />

          <div className="mt-12 grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
            {channels.map((c) => (
              <div key={c.id} className="bg-paper p-6">
                <h3 className="label">{c.label}</h3>
                <p className="mt-2 text-xs leading-relaxed text-ink-muted">{c.purpose}</p>
                <a
                  href={`mailto:${c.email}`}
                  className="mt-3 inline-flex min-h-[44px] items-center text-sm text-ink underline decoration-rule-strong underline-offset-4 hover:text-accent"
                >
                  {c.email}
                </a>
              </div>
            ))}

            {DIRECT_CHANNELS.map((c) => (
              <div key={c.id} className="bg-paper p-6">
                <h3 className="label">{c.label}</h3>
                <p className="mt-2 text-xs leading-relaxed text-ink-muted">
                  Direct message for quick questions.
                </p>
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex min-h-[44px] items-center text-sm text-ink underline decoration-rule-strong underline-offset-4 hover:text-accent"
                >
                  {c.value}
                </a>
              </div>
            ))}

            {SOCIAL_CHANNELS.map((c) => (
              <div key={c.id} className="bg-paper p-6">
                <h3 className="label">{c.label}</h3>
                <p className="mt-2 text-xs leading-relaxed text-ink-muted">
                  Recent visual work.
                </p>
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex min-h-[44px] items-center text-sm text-ink underline decoration-rule-strong underline-offset-4 hover:text-accent"
                >
                  {c.value}
                </a>
              </div>
            ))}

            <div className="bg-paper p-6">
              <h3 className="label">Careers</h3>
              <p className="mt-2 text-xs leading-relaxed text-ink-muted">
                Specialists and the talent network.
              </p>
              <a
                href="/careers#talent-network"
                className="mt-3 inline-flex min-h-[44px] items-center text-sm text-ink underline decoration-rule-strong underline-offset-4 hover:text-accent"
              >
                Careers
              </a>
            </div>
          </div>

          <div className="mt-12 grid gap-px border border-rule bg-rule sm:grid-cols-2">
            {locations.map((loc) => (
              <div key={loc.slug} className="bg-paper p-7">
                <h3 className="display text-xl">{loc.name}</h3>
                {loc.timezone ? <p className="meta mt-2">{loc.timezone}</p> : null}
                {loc.addressLines.length > 0 ? (
                  <address className="mt-4 not-italic text-sm leading-relaxed text-ink-soft">
                    {loc.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                ) : (
                  <p className="mt-4 text-sm leading-relaxed text-ink-muted">{loc.summary}</p>
                )}
                {loc.phone.map((p) => {
                  const cleanPhone = p.replace(/\s+/g, "");
                  return (
                    <a
                      key={p}
                      href={`tel:${cleanPhone}`}
                      className="mt-3 inline-flex min-h-[44px] items-center gap-2 font-mono text-sm text-ink underline decoration-rule-strong underline-offset-4 hover:text-accent"
                      aria-label={`Call ${loc.name} at ${p}`}
                    >
                      <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ink-muted">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                      <span>{p}</span>
                    </a>
                  );
                })}
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
