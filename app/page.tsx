import type { Metadata } from "next";
import Link from "next/link";
import {
  Container,
  Section,
  SectionHeading,
} from "@/components/ui/primitives";
import { HeroCapabilities } from "@/components/home/HeroCapabilities";
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
          01 — HERO
         ============================================================ */}
      <section className="deco-host border-b border-rule">
        {/*
          Construction geometry from the logo, bled off the top-right corner.
          Desktop only: at phone widths it would sit under the headline rather
          than beside it.
        */}
        <ConstructionRing
          className="deco deco-desktop -right-40 -top-52 h-[34rem] w-[34rem] text-rule"
          opacity={0.5}
        />

        <Container width="page" className="pb-12 pt-10 sm:pt-14 lg:pb-20 lg:pt-20">
          <div className="flex flex-col gap-8 lg:grid lg:grid-cols-12 lg:gap-14">
            <div className="order-1 lg:col-span-5 lg:pt-6">
              <p className="display text-[1.5rem] tracking-[0.16em] text-ink sm:text-[1.75rem]">
                {SITE.name}
              </p>

              <h1 className="display mt-5 text-[1.9375rem] leading-[1.1] sm:mt-7 sm:text-[2.5rem] sm:leading-[1.06] lg:text-[3.125rem]">
                {HOME_COPY.h1}
              </h1>

              <p className="mt-5 max-w-lg text-[0.9375rem] leading-relaxed text-ink-soft sm:mt-7 sm:text-base">
                {HOME_COPY.standfirst}
              </p>

              <div className="mt-7 flex flex-wrap gap-3 sm:mt-9">
                <a
                  href={PRIMARY_CTA.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xs bg-ink px-7 text-sm font-medium tracking-tight text-paper transition-colors hover:bg-accent"
                >
                  {PRIMARY_CTA.label}
                  <span aria-hidden="true" className="text-xs">
                    &#8599;
                  </span>
                </a>
                <a
                  href="#capabilities"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-xs border border-rule-strong px-7 text-sm font-medium tracking-tight text-ink transition-colors hover:border-ink hover:bg-surface"
                >
                  View our work
                </a>
              </div>

              {/*
                Geography with direct contact — no "international delivery"
                claim. Kept inside the left column at every width: the headline
                and standfirst already answer what XIYÀTO does within the first
                phone viewport, so the numbers following the CTAs read as the
                next useful step rather than as an interruption.
              */}
              {/* Geography with direct WhatsApp contact cards */}
              <div className="mt-8 border-t border-rule pt-6 sm:mt-10 sm:pt-7">
                <p className="label mb-3">Direct Contact &amp; Studio Locations</p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <a
                    href={WHATSAPP.uk.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between rounded-lg border border-rule bg-paper-deep/80 p-3.5 shadow-xs transition-all hover:border-ink/40 hover:bg-paper-deep hover:shadow-sm"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink/10 text-ink transition-transform group-hover:scale-105">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                          <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.275-.1-.475-.15-.676.15-.2.3-.777.978-.953 1.178-.175.2-.351.225-.652.075-.301-.15-1.272-.469-2.423-1.496-.895-.798-1.5-1.784-1.675-2.085-.176-.301-.019-.464.132-.614.135-.136.301-.351.452-.526.15-.176.201-.301.301-.502.1-.2.05-.376-.025-.526-.075-.15-.677-1.633-.927-2.235-.244-.587-.492-.507-.677-.517-.175-.009-.376-.01-.577-.01-.2 0-.526.075-.802.376-.276.301-1.053 1.028-1.053 2.508 0 1.48 1.078 2.91 1.228 3.11.151.2 2.122 3.24 5.141 4.545.718.31 1.279.495 1.716.634.721.23 1.377.197 1.896.12.578-.087 1.78-.727 2.031-1.43.25-.702.25-1.303.175-1.429-.075-.125-.276-.201-.577-.351zm-5.447 7.423c-1.849 0-3.66-.497-5.239-1.44l-.376-.226-3.896 1.022 1.04-3.799-.248-.395c-1.036-1.649-1.583-3.565-1.581-5.529.004-5.755 4.686-10.436 10.446-10.436 2.788 0 5.41 1.086 7.378 3.057 1.968 1.972 3.05 4.596 3.048 7.387-.004 5.757-4.687 10.439-10.448 10.439zm0-22c-6.417 0-11.638 5.221-11.641 11.64-.002 2.05.534 4.053 1.554 5.821l-1.65 6.027 6.168-1.618c1.706.93 3.633 1.42 5.566 1.422h.005c6.416 0 11.638-5.222 11.641-11.641.002-3.11-1.207-6.033-3.407-8.235-2.202-2.203-5.127-3.416-8.236-3.416z" />
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <span className="block font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ink-muted">
                          United Kingdom
                        </span>
                        <span className="block truncate text-sm font-semibold text-ink group-hover:text-accent">
                          {WHATSAPP.uk.number}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-ink-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink">
                      &#8599;
                    </span>
                  </a>

                  <a
                    href={WHATSAPP.india.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between rounded-lg border border-rule bg-paper-deep/80 p-3.5 shadow-xs transition-all hover:border-ink/40 hover:bg-paper-deep hover:shadow-sm"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink/10 text-ink transition-transform group-hover:scale-105">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                          <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.275-.1-.475-.15-.676.15-.2.3-.777.978-.953 1.178-.175.2-.351.225-.652.075-.301-.15-1.272-.469-2.423-1.496-.895-.798-1.5-1.784-1.675-2.085-.176-.301-.019-.464.132-.614.135-.136.301-.351.452-.526.15-.176.201-.301.301-.502.1-.2.05-.376-.025-.526-.075-.15-.677-1.633-.927-2.235-.244-.587-.492-.507-.677-.517-.175-.009-.376-.01-.577-.01-.2 0-.526.075-.802.376-.276.301-1.053 1.028-1.053 2.508 0 1.48 1.078 2.91 1.228 3.11.151.2 2.122 3.24 5.141 4.545.718.31 1.279.495 1.716.634.721.23 1.377.197 1.896.12.578-.087 1.78-.727 2.031-1.43.25-.702.25-1.303.175-1.429-.075-.125-.276-.201-.577-.351zm-5.447 7.423c-1.849 0-3.66-.497-5.239-1.44l-.376-.226-3.896 1.022 1.04-3.799-.248-.395c-1.036-1.649-1.583-3.565-1.581-5.529.004-5.755 4.686-10.436 10.446-10.436 2.788 0 5.41 1.086 7.378 3.057 1.968 1.972 3.05 4.596 3.048 7.387-.004 5.757-4.687 10.439-10.448 10.449zm0-22c-6.417 0-11.638 5.221-11.641 11.64-.002 2.05.534 4.053 1.554 5.821l-1.65 6.027 6.168-1.618c1.706.93 3.633 1.42 5.566 1.422h.005c6.416 0 11.638-5.222 11.641-11.641.002-3.11-1.207-6.033-3.407-8.235-2.202-2.203-5.127-3.416-8.236-3.416z" />
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <span className="block font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ink-muted">
                          India
                        </span>
                        <span className="block truncate text-sm font-semibold text-ink group-hover:text-accent">
                          {WHATSAPP.india.number}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-ink-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink">
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

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group relative flex flex-col justify-between rounded-lg border border-rule bg-surface p-5 shadow-2xs transition-all hover:border-ink/60 hover:bg-paper-deep hover:shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-accent font-semibold">
                    {`0${s.order} · ${s.motif}`}
                  </span>
                  <span className="text-xs text-ink-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink">
                    &#8599;
                  </span>
                </div>
                <h3 className="mt-2 text-base font-semibold text-ink transition-colors group-hover:text-accent">
                  {s.name}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-ink-muted line-clamp-2">
                  {s.summary}
                </p>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-rule/60 pt-2.5">
                <span className="text-[0.6875rem] font-medium text-ink-soft group-hover:text-ink">
                  Explore {s.shortName}
                </span>
                <span className="text-xs text-ink-faint transition-transform group-hover:translate-x-1 group-hover:text-ink">
                  &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
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
