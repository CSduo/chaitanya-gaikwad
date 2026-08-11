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
import { publishedChannels, DIRECT_CHANNELS, SOCIAL_CHANNELS } from "@/lib/site";
import { publishedLocations } from "@/lib/company";
import { pageMetadata, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Start a project with XIYÀTO. Send the brief and whatever material exists — we will confirm what is workable and propose a defined scope.",
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
            <h1 className="display mt-6 text-4xl sm:text-5xl lg:text-[3.5rem]">
              Start a project.
            </h1>
            <p className="mt-7 text-lg leading-relaxed text-ink-soft">
              Send the brief and whatever material already exists. It does not need to be
              complete — establishing what is confirmed, assumed and missing is the first
              step of every engagement.
            </p>
          </div>
        </Container>
      </section>

      {/* 02–07 — Enquiry form */}
      <Section tone="surface">
        <Container width="page">
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
                  className="mt-3 inline-block text-sm text-ink underline decoration-rule-strong underline-offset-4 hover:text-accent"
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
                  className="mt-3 inline-block text-sm text-ink underline decoration-rule-strong underline-offset-4 hover:text-accent"
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
                  className="mt-3 inline-block text-sm text-ink underline decoration-rule-strong underline-offset-4 hover:text-accent"
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
                className="mt-3 inline-block text-sm text-ink underline decoration-rule-strong underline-offset-4 hover:text-accent"
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
                {loc.phone.map((p) => (
                  <p key={p} className="mt-3 text-sm text-ink-soft">
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
