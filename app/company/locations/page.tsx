import type { Metadata } from "next";
import {
  Container,
  Section,
  SectionHeading,
  Eyebrow,
  CapabilityList,
  Breadcrumbs,
  JsonLd,
} from "@/components/ui/primitives";
import { ProjectCTA } from "@/components/site/ProjectCTA";
import { publishedLocations, LOCATION_TYPE_LABELS } from "@/lib/company";
import { publishedChannels } from "@/lib/site";
import { pageMetadata, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Locations",
  description:
    "XIYÀTO maintains a UK-facing presence with production running from India, delivering internationally across Europe, the Middle East and Asia.",
  path: "/company/locations",
});

export default function LocationsPage() {
  const locations = publishedLocations();
  const channels = publishedChannels();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Company", path: "/company" },
          { name: "Locations", path: "/company/locations" },
        ])}
      />

      {/* 01 — Locations hero */}
      <section className="border-b border-rule">
        <Container width="page" className="pb-16 pt-10 sm:pb-20">
          <Breadcrumbs
            trail={[
              { name: "Home", path: "/" },
              { name: "Company", path: "/company" },
              { name: "Locations", path: "/company/locations" },
            ]}
          />
          <div className="max-w-3xl">
            <Eyebrow>Locations</Eyebrow>
            <h1 className="display mt-6 text-4xl sm:text-5xl">
              UK client coordination, India production.
            </h1>
            <p className="mt-7 text-lg leading-relaxed text-ink-soft">
              XIYÀTO maintains a UK-facing commercial presence with production running from
              India. In practice that gives clients a working overlap for review and a
              turnaround that moves while their own office is closed.
            </p>
          </div>
        </Container>
      </section>

      {/* 02–03 — Each location */}
      <Section tone="surface">
        <Container width="page">
          <div className="grid gap-px border border-rule bg-rule lg:grid-cols-2">
            {locations.map((loc) => (
              <div key={loc.slug} className="bg-surface p-8 lg:p-10">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h2 className="display text-2xl sm:text-3xl">{loc.name}</h2>
                  {/* A classification is published only when it is verified. */}
                  {loc.type ? (
                    <span className="label">{LOCATION_TYPE_LABELS[loc.type]}</span>
                  ) : null}
                </div>

                <p className="mt-5 text-base leading-relaxed text-ink-soft">{loc.summary}</p>

                <dl className="mt-8 border-t border-rule">
                  {/* Address renders only when a verified address exists. */}
                  {loc.addressLines.length > 0 ? (
                    <div className="border-b border-rule py-4">
                      <dt className="label">Address</dt>
                      <dd className="mt-2">
                        <address className="not-italic text-sm leading-relaxed text-ink-soft">
                          {loc.addressLines.map((line) => (
                            <span key={line} className="block">
                              {line}
                            </span>
                          ))}
                        </address>
                      </dd>
                    </div>
                  ) : null}

                  {loc.timezone ? (
                    <div className="border-b border-rule py-4">
                      <dt className="label">Working hours</dt>
                      <dd className="mt-2 text-sm text-ink-soft">{loc.timezone}</dd>
                    </div>
                  ) : null}

                  {loc.phone.length > 0 ? (
                    <div className="border-b border-rule py-4">
                      <dt className="label">Direct</dt>
                      <dd className="mt-2 space-y-1">
                        {loc.phone.map((p) => (
                          <span key={p} className="block text-sm text-ink-soft">
                            {p}
                          </span>
                        ))}
                      </dd>
                    </div>
                  ) : null}

                  {loc.email ? (
                    <div className="border-b border-rule py-4">
                      <dt className="label">Email</dt>
                      <dd className="mt-2">
                        <a
                          href={`mailto:${loc.email}`}
                          className="text-sm text-ink underline decoration-rule-strong underline-offset-4 hover:text-accent"
                        >
                          {loc.email}
                        </a>
                      </dd>
                    </div>
                  ) : null}
                </dl>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 04 — Working internationally */}
      <Section bordered>
        <Container width="page">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Eyebrow>Working internationally</Eyebrow>
              <h2 className="display mt-5 text-3xl">How remote delivery works.</h2>
            </div>
            <div className="lg:col-span-8">
              <div className="prose-body max-w-2xl">
                <p>
                  All work is delivered digitally. Engagements have run with clients in the
                  United Kingdom, across the Middle East, in China and in India, and the
                  process is the same regardless of where the client sits.
                </p>
              </div>
              <CapabilityList
                className="mt-8"
                columns={2}
                items={[
                  "Briefing and review scheduled in the client's working hours",
                  "Written scope confirmation before production starts",
                  "Progress visible during production rather than at handover only",
                  "Digital handover in formats the client's team can open directly",
                  "Revisions handled against issued written comments",
                  "Source and working files retained for later reuse",
                ]}
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* 05–06 — Contact and correspondence */}
      <Section tone="deep" bordered>
        <Container width="page">
          <SectionHeading
            eyebrow="Contact"
            title="Reaching us."
            intro="Project enquiries are best sent through the enquiry form, which routes the brief and any attachments to the right place."
            action={{ label: "Contact", href: "/contact" }}
          />

          {channels.length > 0 ? (
            <dl className="mt-12 grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
              {channels.map((c) => (
                <div key={c.id} className="bg-paper p-6">
                  <dt className="label">{c.label}</dt>
                  <dd className="mt-3">
                    <a
                      href={`mailto:${c.email}`}
                      className="text-sm text-ink underline decoration-rule-strong underline-offset-4 hover:text-accent"
                    >
                      {c.email}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className="mt-10 max-w-2xl text-sm leading-relaxed text-ink-muted">
              Written correspondence is handled through the enquiry form while the
              studio&rsquo;s professional email addresses are being finalised.
            </p>
          )}
        </Container>
      </Section>

      <ProjectCTA />
    </>
  );
}
