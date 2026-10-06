import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/primitives";
import { ServicesCarousel } from "@/components/home/ServicesCarousel";
import {
  CadSection,
  B2BLeadGenSection,
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
    body: "A clear scope, agreed deliverables and a fixed quote.",
  },
  {
    n: "02",
    title: "Ongoing Support",
    body: "Reliable extra capacity for your team's regular production work.",
  },
  {
    n: "03",
    title: "Advisory",
    body: "Focused research and recommendations for a specific decision.",
  },
];

export default function HomePage() {
  const locations = publishedLocations();
  const cad = getService("cad-technical-production")!;
  const b2bLeadGen = getService("b2b-lead-generation")!;
  const visualisation = getService("visualisation-image-production")!;
  const video = getService("ai-video-production")!;
  const web = getService("website-design-development")!;
  const automation = getService("automation-workflow-systems")!;

  return (
    <>
      <CreativeHero />

      <Container width="page" className="scroll-mt-16 py-10 sm:py-14" id="capabilities">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div><p className="label">The studio offering</p><h2 className="display mt-2 text-3xl sm:text-4xl">Six services.</h2></div>
          <p className="max-w-sm text-sm leading-relaxed text-ink-muted">Commission one service or bring them together. Explore the work below.</p>
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
      <SectionDivider index={6} label="Automate" className="py-1" />
      <AutomationSection service={automation} />
      <StartingPrices />

      {/* ============================================================
          03 — ENGAGEMENT MODEL
         ============================================================ */}
      <section className="border-t border-rule py-8 sm:py-12">
        <Container width="page">
          <p className="label">Ways to work together</p>
          <h2 className="display mt-2 text-2xl sm:text-3xl">Built to plug into your team.</h2>
          <ol className="mt-5 grid grid-cols-3 gap-px border border-rule bg-rule">
            {ENGAGEMENTS.map((e) => (
              <li key={e.title} className="bg-paper p-3 sm:p-5">
                <span className="font-mono text-[0.625rem] text-ink-faint">{e.n}</span>
                <h3 className="mt-1 text-sm font-medium sm:text-base">{e.title}</h3>
                <p className="mt-2 text-[0.625rem] leading-relaxed text-ink-muted sm:text-xs">{e.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

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
        compact
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
