import type { Metadata } from "next";
import Link from "next/link";
import {
  Container,
  Section,
  SectionHeading,
} from "@/components/ui/primitives";
import { ServicesCarousel } from "@/components/home/ServicesCarousel";
import {
  CadSection,
  B2BLeadGenSection,
  MarketIntelligenceSection,
  VisualisationSection,
  VideoSection,
  WebsiteSection,
  AutomationSection,
} from "@/components/home/ServiceSections";
import { LocationsPanel } from "@/components/home/LocationsPanel";
import { ProjectCTA } from "@/components/site/ProjectCTA";
import { SERVICES, getService } from "@/lib/services";
import { publishedLocations } from "@/lib/company";
import { pageMetadata } from "@/lib/seo";
import { HOME_COPY } from "@/lib/home-copy";
import { ROUTE_SEO } from "@/lib/seo-copy";
import { CreativeHero } from "@/components/home/CreativeHero";
import { StartingPrices } from "@/components/home/StartingPrices";
import { SectionDivider } from "@/components/brand/Divider";

export const metadata: Metadata = pageMetadata({
  title: ROUTE_SEO.home.metaTitle,
  description: ROUTE_SEO.home.metaDescription,
  path: "/",
});

const ENGAGEMENTS = [
  {
    n: "01",
    title: "Project",
    body: "A defined scope with an agreed deliverable list, priced and delivered against it.",
  },
  {
    n: "02",
    title: "Ongoing Support",
    body: "Recurring external capacity for a steady flow of drawing, research, visual or production work.",
  },
  {
    n: "03",
    title: "Advisory / Consulting",
    body: "A defined research, systems or workflow engagement where the output is a recommendation rather than production.",
  },
];

export default function HomePage() {
  const locations = publishedLocations();
  const cad = getService("cad-technical-production")!;
  const b2bLeadGen = getService("b2b-lead-generation")!;
  const marketIntel = getService("market-intelligence-research")!;
  const visualisation = getService("visualisation-image-production")!;
  const video = getService("ai-video-production")!;
  const web = getService("website-design-development")!;
  const automation = getService("automation-workflow-systems")!;

  return (
    <>
      <CreativeHero />

      <Container width="page" className="scroll-mt-16 pt-16 sm:pt-20" id="capabilities">
        <div className="max-w-3xl">
          <h2 className="display text-3xl sm:text-4xl lg:text-5xl leading-tight">
            From the first impression to the next opportunity.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-ink-soft leading-relaxed">
            {HOME_COPY.capabilitiesIntro}
          </p>
        </div>

        <ServicesCarousel services={SERVICES} />
      </Container>

      <VisualisationSection service={visualisation} />
      <SectionDivider index={2} label="Film" className="py-1" />
      <VideoSection service={video} />
      <SectionDivider index={3} label="Build" className="py-1" />
      <WebsiteSection service={web} />
      <SectionDivider index={4} label="Deliver" className="py-1" />
      <CadSection service={cad} />
      <SectionDivider index={5} label="Grow" className="py-1" />
      <B2BLeadGenSection service={b2bLeadGen} />
      <MarketIntelligenceSection service={marketIntel} />
      <SectionDivider index={6} label="Automate" className="py-1" />
      <AutomationSection service={automation} />
      <StartingPrices />

      {/* ============================================================
          03 — ENGAGEMENT MODEL
         ============================================================ */}
      <Section bordered>
        <Container width="page">
          <SectionHeading
            eyebrow="Engagement model"
            title="Built to plug into your existing team."
          />
          <ol className="mt-14 grid gap-px border border-rule bg-rule lg:grid-cols-3">
            {ENGAGEMENTS.map((e) => (
              <li key={e.title} className="bg-paper p-7 lg:p-9">
                <span className="label">{e.n}</span>
                <h3 className="display mt-4 text-2xl">{e.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-ink-muted">{e.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* ============================================================
          05 — UK / INDIA PRESENCE
         ============================================================ */}
      <section className="border-t border-rule">
        <Container width="page">
          <LocationsPanel locations={locations} />
        </Container>
      </section>

      {/* ============================================================
          06 — FINAL PROJECT CTA
         ============================================================ */}
      <ProjectCTA
        services={SERVICES.map((s) => ({
          label: s.name,
          href: `/services/${s.slug}`,
        }))}
      />

      {/* Crawlable index of every service page, independent of the anchors above. */}
      <nav aria-label="Services" className="sr-only">
        <ul>
          {SERVICES.map((s) => (
            <li key={s.slug}>
              <Link href={`/services/${s.slug}`}>{s.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
