import type { Metadata } from "next";
import Link from "next/link";
import {
  Container,
  Section,
  SectionHeading,
} from "@/components/ui/primitives";
import { HeroCapabilities } from "@/components/home/HeroCapabilities";
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
import { ConstructionRing } from "@/components/brand/decorations";
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
          01 — HERO (Luxury Dark Obsidian Architecture)
         ============================================================ */}
      <section className="deco-host relative border-b border-slate-800/90 bg-[#070b14] text-slate-100 overflow-hidden">
        {/* Ambient lighting mesh & subtle architectural grid background */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_-10%,rgba(56,189,248,0.12),transparent)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_80%,rgba(217,119,6,0.06),transparent)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.04)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_40%,#000_60%,transparent_100%)]" />

        <ConstructionRing
          className="deco deco-desktop -right-40 -top-52 h-[34rem] w-[34rem] text-slate-800"
          opacity={0.35}
        />

        <Container width="page" className="relative z-10 pb-12 pt-10 sm:pt-14 lg:pb-20 lg:pt-20">
          <div className="flex flex-col gap-8 lg:grid lg:grid-cols-12 lg:gap-14">
            <div className="order-1 lg:col-span-5 lg:pt-6">
              <div className="flex items-center gap-3">
                <p className="display text-[1.5rem] tracking-[0.16em] text-white sm:text-[1.75rem] font-medium">
                  {SITE.name}
                </p>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900/90 px-2.5 py-0.5 text-[0.5625rem] font-mono uppercase tracking-widest text-sky-400 border border-slate-800 shadow-xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
                  Studio Global
                </span>
              </div>

              <h1 className="display mt-5 text-[1.9375rem] leading-[1.1] text-white sm:mt-7 sm:text-[2.5rem] sm:leading-[1.06] lg:text-[3.125rem]">
                {HOME_COPY.h1}
              </h1>

              <p className="mt-5 max-w-lg text-[0.9375rem] leading-relaxed text-slate-300 sm:mt-7 sm:text-base">
                {HOME_COPY.standfirst}
              </p>

              <div className="mt-7 flex flex-wrap gap-3 sm:mt-9">
                <a
                  href={PRIMARY_CTA.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xs bg-white px-7 text-sm font-semibold tracking-tight text-slate-950 transition-all hover:bg-sky-400 hover:text-slate-950 active:scale-[0.98] shadow-sm"
                >
                  {PRIMARY_CTA.label}
                  <span aria-hidden="true" className="text-xs">
                    &#8599;
                  </span>
                </a>
                <a
                  href="#capabilities"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-xs border border-slate-700 bg-slate-900/70 px-7 text-sm font-medium tracking-tight text-slate-200 transition-colors hover:border-slate-500 hover:bg-slate-800 active:scale-[0.98]"
                >
                  View our work &darr;
                </a>
              </div>

              {/* Geography with direct WhatsApp contact cards in dark glass */}
              <div className="mt-8 border-t border-slate-800/90 pt-6 sm:mt-10 sm:pt-7">
                <p className="label mb-3 text-slate-400">Direct Contact &amp; Studio Locations</p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <a
                    href={WHATSAPP.uk.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between rounded-lg border border-slate-800 bg-[#0e1626]/90 p-3.5 shadow-xs transition-all hover:border-slate-600 hover:bg-[#131d33] hover:shadow-sm"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-950/60 text-sky-400 border border-sky-900/50 transition-transform group-hover:scale-105">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                          <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.275-.1-.475-.15-.676.15-.2.3-.777.978-.953 1.178-.175.2-.351.225-.652.075-.301-.15-1.272-.469-2.423-1.496-.895-.798-1.5-1.784-1.675-2.085-.176-.301-.019-.464.132-.614.135-.136.301-.351.452-.526.15-.176.201-.301.301-.502.1-.2.05-.376-.025-.526-.075-.15-.677-1.633-.927-2.235-.244-.587-.492-.507-.677-.517-.175-.009-.376-.01-.577-.01-.2 0-.526.075-.802.376-.276.301-1.053 1.028-1.053 2.508 0 1.48 1.078 2.91 1.228 3.11.151.2 2.122 3.24 5.141 4.545.718.31 1.279.495 1.716.634.721.23 1.377.197 1.896.12.578-.087 1.78-.727 2.031-1.43.25-.702.25-1.303.175-1.429-.075-.125-.276-.201-.577-.351zm-5.447 7.423c-1.849 0-3.66-.497-5.239-1.44l-.376-.226-3.896 1.022 1.04-3.799-.248-.395c-1.036-1.649-1.583-3.565-1.581-5.529.004-5.755 4.686-10.436 10.446-10.436 2.788 0 5.41 1.086 7.378 3.057 1.968 1.972 3.05 4.596 3.048 7.387-.004 5.757-4.687 10.439-10.448 10.439zm0-22c-6.417 0-11.638 5.221-11.641 11.64-.002 2.05.534 4.053 1.554 5.821l-1.65 6.027 6.168-1.618c1.706.93 3.633 1.42 5.566 1.422h.005c6.416 0 11.638-5.222 11.641-11.641.002-3.11-1.207-6.033-3.407-8.235-2.202-2.203-5.127-3.416-8.236-3.416z" />
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <span className="block font-mono text-[0.625rem] uppercase tracking-[0.12em] text-slate-400">
                          United Kingdom
                        </span>
                        <span className="block truncate text-sm font-semibold text-slate-100 group-hover:text-sky-300">
                          {WHATSAPP.uk.number}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white">
                      &#8599;
                    </span>
                  </a>

                  <a
                    href={WHATSAPP.india.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between rounded-lg border border-slate-800 bg-[#0e1626]/90 p-3.5 shadow-xs transition-all hover:border-slate-600 hover:bg-[#131d33] hover:shadow-sm"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-950/60 text-amber-400 border border-amber-900/50 transition-transform group-hover:scale-105">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                          <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.275-.1-.475-.15-.676.15-.2.3-.777.978-.953 1.178-.175.2-.351.225-.652.075-.301-.15-1.272-.469-2.423-1.496-.895-.798-1.5-1.784-1.675-2.085-.176-.301-.019-.464.132-.614.135-.136.301-.351.452-.526.15-.176.201-.301.301-.502.1-.2.05-.376-.025-.526-.075-.15-.677-1.633-.927-2.235-.244-.587-.492-.507-.677-.517-.175-.009-.376-.01-.577-.01-.2 0-.526.075-.802.376-.276.301-1.053 1.028-1.053 2.508 0 1.48 1.078 2.91 1.228 3.11.151.2 2.122 3.24 5.141 4.545.718.31 1.279.495 1.716.634.721.23 1.377.197 1.896.12.578-.087 1.78-.727 2.031-1.43.25-.702.25-1.303.175-1.429-.075-.125-.276-.201-.577-.351zm-5.447 7.423c-1.849 0-3.66-.497-5.239-1.44l-.376-.226-3.896 1.022 1.04-3.799-.248-.395c-1.036-1.649-1.583-3.565-1.581-5.529.004-5.755 4.686-10.436 10.446-10.436 2.788 0 5.41 1.086 7.378 3.057 1.968 1.972 3.05 4.596 3.048 7.387-.004 5.757-4.687 10.439-10.448 10.449zm0-22c-6.417 0-11.638 5.221-11.641 11.64-.002 2.05.534 4.053 1.554 5.821l-1.65 6.027 6.168-1.618c1.706.93 3.633 1.42 5.566 1.422h.005c6.416 0 11.638-5.222 11.641-11.641.002-3.11-1.207-6.033-3.407-8.235-2.202-2.203-5.127-3.416-8.236-3.416z" />
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <span className="block font-mono text-[0.625rem] uppercase tracking-[0.12em] text-slate-400">
                          India
                        </span>
                        <span className="block truncate text-sm font-semibold text-slate-100 group-hover:text-amber-300">
                          {WHATSAPP.india.number}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white">
                      &#8599;
                    </span>
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
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
