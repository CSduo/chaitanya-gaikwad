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
import { ConstructionRing, ArchitecturalHeroBackground } from "@/components/brand/decorations";
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
  const growth = getService("growth-marketing-b2b")!;
  const visualisation = getService("visualisation-image-production")!;
  const video = getService("video-ai-film-editing")!;
  const automation = getService("automation-workflow-systems")!;
  const web = getService("website-design-development")!;

  return (
    <>
      {/* ============================================================
          01 — HERO (Pure Black Architectural Sophistication)
         ============================================================ */}
      <section className="deco-host relative border-b border-zinc-800 bg-black text-white overflow-hidden">
        {/* Subtle white architectural CAD grid & blueprint vector overlay */}
        <ArchitecturalHeroBackground />

        <ConstructionRing
          className="deco deco-desktop -right-44 -top-48 h-[38rem] w-[38rem] text-white"
          opacity={0.12}
        />

        <Container width="page" className="relative z-10 pb-16 pt-12 sm:pt-16 lg:pb-24 lg:pt-24">
          <div className="max-w-4xl">
            {/* Top brand signature */}
            <div className="flex items-center gap-3">
              <p className="display text-[1.5rem] tracking-[0.16em] text-white sm:text-[1.75rem] font-medium">
                {SITE.name}
              </p>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-900/80 px-3 py-1 text-[0.5625rem] font-mono uppercase tracking-widest text-zinc-400 border border-zinc-800 shadow-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-zinc-400 animate-pulse" />
                Studio London &amp; India
              </span>
            </div>

            {/* Main Focus: The Hero Headline */}
            <h1 className="display mt-6 text-[2.25rem] leading-[1.08] sm:mt-8 sm:text-[3rem] sm:leading-[1.05] lg:text-[4rem] font-normal text-white">
              {HOME_COPY.h1}
            </h1>

            {/* Standfirst explanation */}
            <p className="mt-6 max-w-2xl text-[1rem] leading-relaxed text-zinc-300 sm:mt-8 sm:text-[1.125rem] sm:leading-relaxed">
              {HOME_COPY.standfirst}
            </p>

            {/* Primary & Secondary Call to Actions */}
            <div className="mt-8 flex flex-wrap items-center gap-4 sm:mt-10">
              <a
                href={PRIMARY_CTA.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-xs bg-white px-8 text-sm font-semibold tracking-tight text-black transition-all hover:bg-zinc-200 active:scale-[0.98] shadow-sm"
              >
                {PRIMARY_CTA.label}
                <span aria-hidden="true" className="text-xs">
                  &#8599;
                </span>
              </a>
              <a
                href="#capabilities"
                className="inline-flex min-h-[50px] items-center justify-center rounded-xs border border-zinc-700 bg-zinc-950/80 px-8 text-sm font-medium tracking-tight text-zinc-200 transition-colors hover:border-zinc-500 hover:bg-zinc-900 active:scale-[0.98]"
              >
                View our work &darr;
              </a>
            </div>

            {/* Geography & Direct WhatsApp Contact with Green Aesthetic Numbers */}
            <div className="mt-12 max-w-2xl border-t border-zinc-800/90 pt-6 sm:mt-14 sm:pt-8">
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-zinc-400 mb-3.5">
                Direct Contact &amp; Studio Locations
              </p>
              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                <a
                  href={WHATSAPP.uk.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-lg border border-zinc-800/90 bg-zinc-950/90 p-4 shadow-xs transition-all hover:border-emerald-500/50 hover:bg-zinc-900/90"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 transition-transform group-hover:scale-105">
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                        <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.275-.1-.475-.15-.676.15-.2.3-.777.978-.953 1.178-.175.2-.351.225-.652.075-.301-.15-1.272-.469-2.423-1.496-.895-.798-1.5-1.784-1.675-2.085-.176-.301-.019-.464.132-.614.135-.136.301-.351.452-.526.15-.176.201-.301.301-.502.1-.2.05-.376-.025-.526-.075-.15-.677-1.633-.927-2.235-.244-.587-.492-.507-.677-.517-.175-.009-.376-.01-.577-.01-.2 0-.526.075-.802.376-.276.301-1.053 1.028-1.053 2.508 0 1.48 1.078 2.91 1.228 3.11.151.2 2.122 3.24 5.141 4.545.718.31 1.279.495 1.716.634.721.23 1.377.197 1.896.12.578-.087 1.78-.727 2.031-1.43.25-.702.25-1.303.175-1.429-.075-.125-.276-.201-.577-.351zm-5.447 7.423c-1.849 0-3.66-.497-5.239-1.44l-.376-.226-3.896 1.022 1.04-3.799-.248-.395c-1.036-1.649-1.583-3.565-1.581-5.529.004-5.755 4.686-10.436 10.446-10.436 2.788 0 5.41 1.086 7.378 3.057 1.968 1.972 3.05 4.596 3.048 7.387-.004 5.757-4.687 10.439-10.448 10.439zm0-22c-6.417 0-11.638 5.221-11.641 11.64-.002 2.05.534 4.053 1.554 5.821l-1.65 6.027 6.168-1.618c1.706.93 3.633 1.42 5.566 1.422h.005c6.416 0 11.638-5.222 11.641-11.641.002-3.11-1.207-6.033-3.407-8.235-2.202-2.203-5.127-3.416-8.236-3.416z" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="block font-mono text-[0.625rem] uppercase tracking-[0.14em] text-zinc-400">
                          United Kingdom
                        </span>
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      </div>
                      <span className="block truncate text-sm font-semibold font-mono text-emerald-400 group-hover:text-emerald-300">
                        {WHATSAPP.uk.number}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-zinc-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-emerald-400">
                    &#8599;
                  </span>
                </a>

                <a
                  href={WHATSAPP.india.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-lg border border-zinc-800/90 bg-zinc-950/90 p-4 shadow-xs transition-all hover:border-emerald-500/50 hover:bg-zinc-900/90"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 transition-transform group-hover:scale-105">
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                        <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.275-.1-.475-.15-.676.15-.2.3-.777.978-.953 1.178-.175.2-.351.225-.652.075-.301-.15-1.272-.469-2.423-1.496-.895-.798-1.5-1.784-1.675-2.085-.176-.301-.019-.464.132-.614.135-.136.301-.351.452-.526.15-.176.201-.301.301-.502.1-.2.05-.376-.025-.526-.075-.15-.677-1.633-.927-2.235-.244-.587-.492-.507-.677-.517-.175-.009-.376-.01-.577-.01-.2 0-.526.075-.802.376-.276.301-1.053 1.028-1.053 2.508 0 1.48 1.078 2.91 1.228 3.11.151.2 2.122 3.24 5.141 4.545.718.31 1.279.495 1.716.634.721.23 1.377.197 1.896.12.578-.087 1.78-.727 2.031-1.43.25-.702.25-1.303.175-1.429-.075-.125-.276-.201-.577-.351zm-5.447 7.423c-1.849 0-3.66-.497-5.239-1.44l-.376-.226-3.896 1.022 1.04-3.799-.248-.395c-1.036-1.649-1.583-3.565-1.581-5.529.004-5.755 4.686-10.436 10.446-10.436 2.788 0 5.41 1.086 7.378 3.057 1.968 1.972 3.05 4.596 3.048 7.387-.004 5.757-4.687 10.439-10.448 10.449zm0-22c-6.417 0-11.638 5.221-11.641 11.64-.002 2.05.534 4.053 1.554 5.821l-1.65 6.027 6.168-1.618c1.706.93 3.633 1.42 5.566 1.422h.005c6.416 0 11.638-5.222 11.641-11.641.002-3.11-1.207-6.033-3.407-8.235-2.202-2.203-5.127-3.416-8.236-3.416z" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="block font-mono text-[0.625rem] uppercase tracking-[0.14em] text-zinc-400">
                          India
                        </span>
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      </div>
                      <span className="block truncate text-sm font-semibold font-mono text-emerald-400 group-hover:text-emerald-300">
                        {WHATSAPP.india.number}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-zinc-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-emerald-400">
                    &#8599;
                  </span>
                </a>
              </div>
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
