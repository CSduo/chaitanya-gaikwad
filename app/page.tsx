import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Container,
  Section,
  SectionHeading,
  Eyebrow,
  ButtonLink,
  TextLink,
  ProcessList,
  CapabilityList,
} from "@/components/ui/primitives";
import { ProjectCTA } from "@/components/site/ProjectCTA";
import { DrawingSet } from "@/components/work/DrawingSet";
import { CaseStudyCard, ServiceCard } from "@/components/work/cards";
import { SERVICES, getService } from "@/lib/services";
import { featuredCaseStudies } from "@/lib/case-studies";
import { founder, publishedLocations, teamMembers, specialists } from "@/lib/company";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: `${SITE.name} — ${SITE.descriptor}`,
  description: SITE.defaultDescription,
  path: "/",
});

/** Four sheets from one real package — the hero interaction. */
const HERO_SHEETS = [
  {
    src: "/media/cad/master-bathroom-plan.webp",
    width: 3200,
    height: 2260,
    sheet: "Sheet 01",
    title: "General arrangement",
    alt: "Master bathroom general arrangement plan with dimensions and fixture setting-out",
  },
  {
    src: "/media/cad/master-bathroom-elevation.webp",
    width: 3200,
    height: 2260,
    sheet: "Sheet 02",
    title: "Wall elevation",
    alt: "Interior wall elevation showing bathtub and window setting-out",
  },
  {
    src: "/media/cad/cigar-lounge-ceiling.webp",
    width: 3200,
    height: 2260,
    sheet: "Sheet 03",
    title: "Reflected ceiling",
    alt: "Reflected ceiling plan showing coffered ceiling and lighting arrangement",
  },
  {
    src: "/media/cad/cigar-lounge-flooring.webp",
    width: 3200,
    height: 2260,
    sheet: "Sheet 04",
    title: "Flooring setting-out",
    alt: "Herringbone flooring setting-out plan",
  },
];

const ENGAGEMENT_MODEL = [
  {
    title: "Defined project",
    body: "A fixed scope with an agreed drawing list, dataset or asset set, priced and delivered against it.",
  },
  {
    title: "Ongoing production capacity",
    body: "Recurring capacity for practices with a steady flow of documentation, research or visual work.",
  },
  {
    title: "Overflow support",
    body: "Short-notice capacity when internal teams are at capacity and a deadline is fixed.",
  },
];

export default function HomePage() {
  // Two featured engagements, not three: each gets more presence on desktop and
  // the section stops dominating the stacked mobile page.
  const featured = featuredCaseStudies(2);
  const cad = getService("cad-technical-production")!;
  const person = founder();
  const locations = publishedLocations();
  const hasWiderTeam = teamMembers().length > 0 || specialists().length > 0;

  return (
    <>
      {/* 01 — HERO */}
      <section className="border-b border-rule">
        <Container width="page" className="py-16 sm:py-20 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5 lg:pt-4">
              <Eyebrow>Production studio · United Kingdom &amp; India</Eyebrow>

              <h1 className="display mt-6 text-4xl sm:text-5xl lg:text-6xl">
                External production capacity for design-led businesses.
              </h1>

              <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-soft">
                XIYÀTO produces the technical drawings, market research and visual material
                that architecture, interior, fit-out and furniture businesses need — working
                from your design direction, to your deadline, without adding headcount.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <ButtonLink href="/contact">Start a project</ButtonLink>
                <ButtonLink href="/work" variant="secondary">
                  View work
                </ButtonLink>
              </div>
            </div>

            <div className="lg:col-span-7">
              <DrawingSet sheets={HERO_SHEETS} />
              <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                Four sheets from one interior package produced for a luxury project in
                Bahrain — plan, elevation, ceiling and flooring, coordinated as a single
                editable set.{" "}
                <Link
                  href="/work/bahrain-luxury-interior-cad-package"
                  className="text-ink underline decoration-rule-strong underline-offset-4 hover:text-accent"
                >
                  See the full package
                </Link>
                .
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 02 — COMPANY / VALUE PROPOSITION */}
      <Section tone="surface">
        <Container width="page">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Eyebrow>What XIYÀTO is</Eyebrow>
              <h2 className="display mt-5 text-3xl sm:text-4xl">
                A production partner, not another agency.
              </h2>
            </div>
            <div className="lg:col-span-7">
              <div className="prose-body max-w-2xl">
                <p>
                  Design businesses rarely run short of ideas. They run short of the hours
                  needed to document them, the data needed to sell them and the material
                  needed to present them. XIYÀTO exists to absorb that load.
                </p>
                <p>
                  We work as external capacity behind your practice: you keep design
                  authorship, client relationships and technical authority; we take the
                  production work and return it in a state your own team can open, check and
                  continue. Every engagement starts by separating what is confirmed from what
                  is assumed, so nothing is quietly invented downstream.
                </p>
              </div>
              <div className="mt-8">
                <TextLink href="/company">How we operate</TextLink>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 03 — PRIMARY SERVICES */}
      <Section bordered>
        <Container width="page">
          <SectionHeading
            eyebrow="Services"
            title="Three disciplines, one production process."
            intro="Most engagements draw on more than one. They are run through the same scoping, production and quality process regardless of which."
            action={{ label: "All services", href: "/services" }}
          />
          <div className="mt-14 grid gap-px border border-rule bg-rule lg:grid-cols-3">
            {SERVICES.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </Container>
      </Section>

      {/* 04 — CAD / TECHNICAL PRODUCTION FEATURE */}
      <Section tone="deep" bordered>
        <Container width="page">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Eyebrow>Flagship service</Eyebrow>
              <h2 className="display mt-5 text-3xl sm:text-4xl">{cad.name}</h2>
              <p className="mt-6 text-base leading-relaxed text-ink-soft">
                {cad.overview}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href={`/services/${cad.slug}`}>Explore the service</ButtonLink>
              </div>
              <p className="mt-8 max-w-md border-l border-rule-strong pl-5 text-sm leading-relaxed text-ink-muted">
                Drafting, documentation and QA capacity working from supplied design
                direction. Not architectural or engineering certification.
              </p>
            </div>

            <div className="lg:col-span-7">
              <div className="grid gap-x-10 sm:grid-cols-2">
                <div>
                  <h3 className="label mb-2">Inputs</h3>
                  <CapabilityList items={cad.groups[0].items.slice(0, 5)} />
                </div>
                <div className="mt-10 sm:mt-0">
                  <h3 className="label mb-2">Production</h3>
                  <CapabilityList items={cad.groups[1].items.slice(0, 5)} />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 05 — OPERATING / DELIVERY PROCESS */}
      <Section bordered>
        <Container width="page">
          <SectionHeading
            eyebrow="How we work"
            title="Four steps, applied to every engagement."
            intro="The same sequence runs whether the output is a drawing package, a research workbook or a film."
          />
          <ProcessList
            className="mt-14 lg:grid-cols-4"
            steps={[
              {
                step: "01",
                title: "Brief and inputs",
                body: "You send what exists. We review it and separate what is confirmed from what is assumed or missing.",
              },
              {
                step: "02",
                title: "Scope confirmation",
                body: "Deliverables, formats and constraints are agreed in writing before production starts.",
              },
              {
                step: "03",
                title: "Production",
                body: "Work is produced against that scope, with structure and consistency maintained across the set.",
              },
              {
                step: "04",
                title: "QA and handoff",
                body: "Everything is checked, validated and issued in formats your team can open and continue.",
              },
            ]}
          />
        </Container>
      </Section>

      {/* 06 — SELECTED WORK */}
      <Section tone="surface" bordered>
        <Container width="page">
          <SectionHeading
            eyebrow="Selected work"
            title="Recent engagements."
            action={{ label: "All work", href: "/work" }}
          />
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {featured.map((study) => (
              <div key={study.slug} className="relative">
                <CaseStudyCard study={study} featured />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 07 — BUSINESS CAPABILITIES / SERVICE MODEL */}
      <Section bordered>
        <Container width="page">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Eyebrow>Engagement model</Eyebrow>
              <h2 className="display mt-5 text-3xl sm:text-4xl">
                Structured to fit how practices actually work.
              </h2>
              <p className="mt-6 text-base leading-relaxed text-ink-soft">
                Production demand is uneven. The engagement model is built around that rather
                than against it.
              </p>
            </div>
            <div className="lg:col-span-7">
              <dl className="border-t border-rule">
                {ENGAGEMENT_MODEL.map((item) => (
                  <div key={item.title} className="border-b border-rule py-6">
                    <dt className="text-base font-semibold tracking-tight text-ink">
                      {item.title}
                    </dt>
                    <dd className="mt-2 text-sm leading-relaxed text-ink-muted">{item.body}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Container>
      </Section>

      {/* 08 — FOUNDER + 09 — PEOPLE PREVIEW */}
      {person ? (
        <Section tone="deep" bordered>
          <Container width="page">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
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
                <Eyebrow>Founder</Eyebrow>
                <h2 className="display mt-5 text-3xl sm:text-4xl">{person.name}</h2>
                <p className="meta mt-2">{person.role}</p>

                <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-soft">
                  {person.biography[0]}
                </p>

                <h3 className="label mt-10 mb-2">Direct responsibility</h3>
                <CapabilityList items={person.responsibilities} className="max-w-2xl" />

                <div className="mt-8">
                  <TextLink href="/company/people">
                    {hasWiderTeam ? "Founder and people" : "More about the founder"}
                  </TextLink>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      ) : null}

      {/* 10 — LOCATIONS / INTERNATIONAL DELIVERY */}
      <Section bordered>
        <Container width="page">
          <SectionHeading
            eyebrow="Locations"
            title="UK-facing, delivered from India, working internationally."
            action={{ label: "Locations", href: "/company/locations" }}
          />
          <div className="mt-14 grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
            {locations.map((loc) => (
              <div key={loc.slug} className="bg-paper p-7 lg:p-8">
                <h3 className="display text-xl">{loc.name}</h3>
                {loc.timezone ? <p className="meta mt-2">{loc.timezone}</p> : null}
                <p className="mt-4 text-sm leading-relaxed text-ink-muted">{loc.summary}</p>
              </div>
            ))}
            <div className="bg-paper p-7 lg:p-8">
              <h3 className="display text-xl">International delivery</h3>
              <p className="meta mt-2">Remote</p>
              <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                Packages are delivered digitally to clients across the United Kingdom,
                Europe, the Middle East and Asia, working to the client&rsquo;s timezone
                for review and handover.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* 11 — PRIMARY PROJECT CTA */}
      <ProjectCTA />
    </>
  );
}
