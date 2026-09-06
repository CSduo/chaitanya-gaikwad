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
  GrowthSection,
  VisualisationSection,
  VideoSection,
  AutomationSection,
  WebsiteSection,
} from "@/components/home/ServiceSections";
import { LocationsPanel } from "@/components/home/LocationsPanel";
import { ProjectCTA } from "@/components/site/ProjectCTA";
import { SERVICES, getService } from "@/lib/services";
import { publishedLocations } from "@/lib/company";
import { pageMetadata } from "@/lib/seo";
import { SITE, PRIMARY_CTA, WHATSAPP } from "@/lib/site";
import { HOME_COPY } from "@/lib/home-copy";
import { ROUTE_SEO } from "@/lib/seo-copy";
import { ArchitecturalHeroBackground } from "@/components/brand/decorations";
import { SectionDivider } from "@/components/brand/Divider";
import { HeroCapabilities } from "@/components/home/HeroCapabilities";

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
  const growth = getService("growth-marketing-b2b")!;
  const visualisation = getService("visualisation-image-production")!;
  const video = getService("video-ai-film-editing")!;
  const automation = getService("automation-workflow-systems")!;
  const web = getService("website-design-development")!;

  return (
    <>
      {/* ============================================================
          01 — HERO (Pure Black Architectural Sophistication & Live Showcase)
         ============================================================ */}
      <section className="deco-host relative border-b border-zinc-800 bg-black text-white overflow-hidden">
        {/* Crisp white architectural & interior CAD blueprint vector overlay */}
        <ArchitecturalHeroBackground className="deco" />

        <Container width="page" className="relative z-10 pb-16 pt-12 sm:pt-16 lg:pb-24 lg:pt-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center xl:gap-14">
            {/* Left Column: Brand Typography, Triangle CTAs & Direct Lines */}
            <div className="lg:col-span-6 xl:col-span-5">
              {/* Top brand signature */}
              <div className="flex items-center gap-3">
                <p className="display text-[1.5rem] tracking-[0.16em] text-white sm:text-[1.75rem] font-medium">
                  {SITE.name}
                </p>
              </div>

              {/* Main Focus: The Hero Headline */}
              <h1 className="display mt-6 text-[2.25rem] leading-[1.08] sm:mt-8 sm:text-[2.75rem] sm:leading-[1.06] lg:text-[3.25rem] xl:text-[3.75rem] font-normal text-white">
                {HOME_COPY.h1}
              </h1>

              {/* Standfirst explanation */}
              <p className="mt-5 max-w-xl text-[0.9375rem] leading-relaxed text-zinc-300 sm:mt-6 sm:text-[1.0625rem] sm:leading-relaxed">
                {HOME_COPY.standfirst}
              </p>

              {/* Primary & Secondary Call to Actions — Triangle / Pyramid Layout */}
              <div className="mt-8 max-w-md sm:mt-10">
                <div className="grid grid-cols-2 gap-3 sm:gap-3.5">
                  <a
                    href={PRIMARY_CTA.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-[50px] w-full items-center justify-center gap-2 rounded-xs bg-white px-3 sm:px-6 text-xs sm:text-sm font-semibold tracking-tight text-black transition-all hover:bg-zinc-200 active:scale-[0.98] shadow-sm text-center"
                  >
                    <span>{PRIMARY_CTA.label}</span>
                    <span aria-hidden="true" className="text-xs">
                      &#8599;
                    </span>
                  </a>
                  <a
                    href="#capabilities"
                    className="flex min-h-[50px] w-full items-center justify-center rounded-xs border border-zinc-800 bg-zinc-950/60 px-3 sm:px-6 text-xs sm:text-sm font-medium tracking-tight text-zinc-300 transition-colors hover:border-zinc-600 hover:text-white text-center"
                  >
                    View our work &darr;
                  </a>
                </div>
                <div className="mt-3 sm:mt-3.5 flex justify-center">
                  <a
                    href={WHATSAPP.uk.tel}
                    className="inline-flex min-h-[48px] w-full sm:w-auto items-center justify-center gap-2 rounded-xs border border-zinc-700 bg-zinc-950/80 px-6 text-xs sm:text-sm font-medium tracking-tight text-zinc-200 transition-colors hover:border-zinc-500 hover:bg-zinc-900 active:scale-[0.98]"
                    aria-label={`Call XIYÀTO UK directly at ${WHATSAPP.uk.number}`}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="14"
                      height="14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-zinc-400 shrink-0"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <span>Call UK: {WHATSAPP.uk.number}</span>
                  </a>
                </div>
              </div>

              {/* Geography & Direct Contact Cards with Paired Call + WhatsApp Actions */}
              <div className="mt-10 max-w-md border-t border-zinc-800/90 pt-6 sm:mt-12 sm:pt-7">
                <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-zinc-400 mb-3.5">
                  Direct Contact &amp; Founder Scoping
                </p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {/* UK Hub */}
                  <div className="rounded-lg border border-zinc-800/90 bg-zinc-950/90 p-3.5 shadow-xs">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="block font-mono text-[0.625rem] uppercase tracking-[0.14em] text-zinc-400">
                            United Kingdom
                          </span>
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        </div>
                        <span className="mt-1 block truncate text-xs sm:text-sm font-semibold font-mono text-emerald-400">
                          {WHATSAPP.uk.number}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2.5 flex items-center gap-2">
                      <a
                        href={WHATSAPP.uk.tel}
                        className="inline-flex min-h-[36px] flex-1 items-center justify-center gap-1.5 rounded-xs border border-zinc-700 bg-zinc-900/80 px-2 text-xs font-medium text-zinc-200 transition-colors hover:border-zinc-500 hover:bg-zinc-800"
                        aria-label={`Call XIYÀTO UK at ${WHATSAPP.uk.number}`}
                      >
                        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                        <span>Call</span>
                      </a>
                      <a
                        href={WHATSAPP.uk.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[36px] flex-1 items-center justify-center gap-1.5 rounded-xs bg-zinc-100 px-2 text-xs font-semibold text-zinc-950 transition-colors hover:bg-emerald-400 hover:text-black"
                        aria-label="WhatsApp XIYÀTO UK"
                      >
                        <span>WhatsApp</span>
                        <span aria-hidden="true" className="text-xs">&#8599;</span>
                      </a>
                    </div>
                  </div>

                  {/* India Hub */}
                  <div className="rounded-lg border border-zinc-800/90 bg-zinc-950/90 p-3.5 shadow-xs">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="block font-mono text-[0.625rem] uppercase tracking-[0.14em] text-zinc-400">
                            India Hub
                          </span>
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        </div>
                        <span className="mt-1 block truncate text-xs sm:text-sm font-semibold font-mono text-emerald-400">
                          {WHATSAPP.india.number}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2.5 flex items-center gap-2">
                      <a
                        href={WHATSAPP.india.tel}
                        className="inline-flex min-h-[36px] flex-1 items-center justify-center gap-1.5 rounded-xs border border-zinc-700 bg-zinc-900/80 px-2 text-xs font-medium text-zinc-200 transition-colors hover:border-zinc-500 hover:bg-zinc-800"
                        aria-label={`Call XIYÀTO India at ${WHATSAPP.india.number}`}
                      >
                        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                        <span>Call</span>
                      </a>
                      <a
                        href={WHATSAPP.india.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[36px] flex-1 items-center justify-center gap-1.5 rounded-xs bg-zinc-100 px-2 text-xs font-semibold text-zinc-950 transition-colors hover:bg-emerald-400 hover:text-black"
                        aria-label="WhatsApp XIYÀTO India"
                      >
                        <span>WhatsApp</span>
                        <span aria-hidden="true" className="text-xs">&#8599;</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Architectural Showcase & Interactive Real Designs */}
            <div className="lg:col-span-6 xl:col-span-7">
              <HeroCapabilities />
            </div>
          </div>
        </Container>
      </section>

      {/* ============================================================
          02 — WHAT WE DO: six core services in clean structured boxes
         ============================================================ */}
      <Container width="page" className="scroll-mt-16 pt-16 sm:pt-20" id="capabilities">
        <div className="max-w-3xl">
          <h2 className="display text-3xl sm:text-4xl lg:text-5xl leading-tight">
            We provide six services given below.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-ink-soft leading-relaxed">
            Select any service below to examine dedicated production workflows and published deliverables.
          </p>
        </div>

        <ServicesCarousel services={SERVICES} />
      </Container>

      <CadSection service={cad} />
      <SectionDivider index={2} label="Growth" className="py-1" />
      <GrowthSection service={growth} />
      <SectionDivider index={3} label="Visualise" className="py-1" />
      <VisualisationSection service={visualisation} />
      <SectionDivider index={4} label="Film" className="py-1" />
      <VideoSection service={video} />
      <SectionDivider index={5} label="Build" className="py-1" />
      <WebsiteSection service={web} />
      <SectionDivider index={6} label="Automate" className="py-1" />
      <AutomationSection service={automation} />

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
