import type { Metadata } from "next";
import Image from "next/image";
import {
  Container,
  Section,
  SectionHeading,
  Eyebrow,
  TextLink,
  JsonLd,
} from "@/components/ui/primitives";
import { ProjectCTA } from "@/components/site/ProjectCTA";
import {
  founder,
  publishedLocations,
  teamMembers,
  specialists,
  DISCIPLINES,
} from "@/lib/company";
import { pageMetadata, breadcrumbSchema } from "@/lib/seo";
import { CompanyNarrative } from "@/components/company/Narrative";
import { COMPANY_COPY } from "@/lib/company-copy";
import { ROUTE_SEO } from "@/lib/seo-copy";

export const metadata: Metadata = pageMetadata({
  title: ROUTE_SEO.company.metaTitle,
  description: ROUTE_SEO.company.metaDescription,
  path: "/company",
});

export default function CompanyPage() {
  const person = founder();
  const locations = publishedLocations();
  const team = teamMembers();
  const network = specialists();
  const hasWiderTeam = team.length > 0 || network.length > 0;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Company", path: "/company" },
        ])}
      />

      {/* 01 — Company hero */}
      <section className="border-b border-rule">
        <Container width="page" className="py-16 sm:py-20 lg:py-24">
          <div className="max-w-3xl">
            <Eyebrow>Company</Eyebrow>
            <h1 className="display mt-6 text-[2.125rem] leading-[1.1] sm:text-5xl lg:text-[3.5rem]">
              {COMPANY_COPY.h1}
            </h1>
            <p className="mt-6 text-base leading-relaxed text-ink-soft sm:mt-7 sm:text-lg">
              {COMPANY_COPY.standfirst}
            </p>
          </div>
        </Container>
      </section>

      {/* 02–08 — The company narrative */}
      <CompanyNarrative />

      {/* 09 — Geographic operating model */}
      <Section tone="deep" bordered>
        <Container width="page">
          <SectionHeading
            eyebrow="Geography"
            title="UK-facing, delivered from India, working internationally."
            action={{ label: "Locations", href: "/company/locations" }}
          />
          <div className="mt-14 grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
            {locations.map((loc) => (
              <div key={loc.slug} className="bg-paper p-7">
                <h3 className="display text-xl">{loc.name}</h3>
                {loc.timezone ? <p className="meta mt-2">{loc.timezone}</p> : null}
                <p className="mt-4 text-sm leading-relaxed text-ink-muted">{loc.summary}</p>
              </div>
            ))}
            <div className="bg-paper p-7">
              <h3 className="display text-xl">Working internationally</h3>
              <p className="meta mt-2">Remote</p>
              <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                Engagements run across the United Kingdom, Europe, the Middle East and Asia,
                delivered digitally and scheduled around the client&rsquo;s working day.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* 10 — Founder preview + 11 — People preview */}
      {person ? (
        <Section bordered>
          <Container width="page">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
              {person.image ? (
                <div className="lg:col-span-4">
                  <div className="relative aspect-[4/5] w-full max-w-xs overflow-hidden border border-rule bg-surface">
                    <Image
                      src={person.image.src}
                      alt={person.image.alt}
                      fill
                      loading="lazy"
                      sizes="(min-width: 1024px) 320px, 60vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              ) : null}
              <div className="lg:col-span-8">
                <Eyebrow>Accountability</Eyebrow>
                <h2 className="display mt-5 text-3xl">{person.name}</h2>
                <p className="meta mt-2">{person.role}</p>
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-soft">
                  {person.biography[0]}
                </p>
                {hasWiderTeam ? (
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-muted">
                    Production is supported by a wider group of specialists engaged per
                    project.
                  </p>
                ) : null}
                <div className="mt-8">
                  <TextLink href="/company/people">Founder &amp; people</TextLink>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      ) : null}

      {/* 12 — Careers preview */}
      <Section tone="surface" bordered>
        <Container width="page">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Eyebrow>Careers</Eyebrow>
              <h2 className="display mt-5 text-3xl">Working with XIYÀTO.</h2>
              <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                We keep a network of specialists across the six service areas and approach
                it when an engagement calls for it.
              </p>
              <div className="mt-6">
                <TextLink href="/careers">Careers and talent network</TextLink>
              </div>
            </div>
            <div className="lg:col-span-8">
              <div className="grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
                {DISCIPLINES.map((d) => (
                  <div key={d.title} className="bg-surface p-6">
                    <h3 className="label mb-3">{d.title}</h3>
                    <p className="text-sm leading-relaxed text-ink-muted">{d.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 13 — CTA */}
      <ProjectCTA />
    </>
  );
}
