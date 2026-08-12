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
import { ProductionTrack } from "@/components/home/ProductionTrack";
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
                    className="group flex items-center justify-between rounded-lg border border-rule bg-surface p-3.5 shadow-xs transition-all hover:border-emerald-500/50 hover:bg-emerald-500/5 hover:shadow-sm"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 transition-transform group-hover:scale-105">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.586-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.076-1.928-.475-1.524-.651-2.502-2.193-2.578-2.296-.076-.103-.618-.823-.618-1.569 0-.746.392-1.112.53-1.264.14-.152.304-.19.405-.19.102 0 .204.002.293.006.093.004.218-.035.34.259.127.306.435 1.06.474 1.137.038.077.064.167.013.269-.05.103-.076.166-.152.254-.076.089-.16.198-.228.266-.077.076-.157.159-.068.312.09.153.398.657.854 1.063.586.522 1.08.683 1.233.76.153.076.242.064.331-.039.09-.102.381-.444.483-.596.102-.153.204-.127.344-.076.14.051.889.419 1.042.495.153.076.254.115.292.178.038.064.038.369-.106.774zM12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.66 1.434 5.176L2 22l4.954-1.399C8.406 21.498 10.144 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <span className="block font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ink-muted">
                          United Kingdom
                        </span>
                        <span className="block truncate text-sm font-semibold text-ink group-hover:text-emerald-700">
                          {WHATSAPP.uk.number}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-ink-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-emerald-600">
                      &#8599;
                    </span>
                  </a>

                  <a
                    href={WHATSAPP.india.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between rounded-lg border border-rule bg-surface p-3.5 shadow-xs transition-all hover:border-emerald-500/50 hover:bg-emerald-500/5 hover:shadow-sm"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 transition-transform group-hover:scale-105">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.586-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.076-1.928-.475-1.524-.651-2.502-2.193-2.578-2.296-.076-.103-.618-.823-.618-1.569 0-.746.392-1.112.53-1.264.14-.152.304-.19.405-.19.102 0 .204.002.293.006.093.004.218-.035.34.259.127.306.435 1.06.474 1.137.038.077.064.167.013.269-.05.103-.076.166-.152.254-.076.089-.16.198-.228.266-.077.076-.157.159-.068.312.09.153.398.657.854 1.063.586.522 1.08.683 1.233.76.153.076.242.064.331-.039.09-.102.381-.444.483-.596.102-.153.204-.127.344-.076.14.051.889.419 1.042.495.153.076.254.115.292.178.038.064.038.369-.106.774zM12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.66 1.434 5.176L2 22l4.954-1.399C8.406 21.498 10.144 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <span className="block font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ink-muted">
                          India
                        </span>
                        <span className="block truncate text-sm font-semibold text-ink group-hover:text-emerald-700">
                          {WHATSAPP.india.number}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-ink-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-emerald-600">
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
          02 — WHAT WE DO: six service chapters, each with its proof
         ============================================================ */}
      <Container width="page" className="scroll-mt-16 pt-16 sm:pt-20" id="capabilities">
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
          <h2 className="display text-[1.75rem] sm:text-4xl">What we do.</h2>
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-ink-faint">
            {HOME_COPY.eyebrow}
          </p>
        </div>
        <p className="mt-5 max-w-2xl text-[0.9375rem] leading-relaxed text-ink-soft sm:text-base">
          {HOME_COPY.capabilitiesIntro}
        </p>
        <ul className="mt-7 grid gap-px border border-rule bg-rule sm:mt-8 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <li key={s.slug} className="bg-paper">
              <a
                href={`#service-${s.slug}`}
                className="flex min-h-[72px] items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-paper-deep"
              >
                <span className="min-w-0">
                  <span className="label block">{`0${s.order} · ${s.motif}`}</span>
                  <span className="mt-1 block text-sm leading-snug text-ink">{s.name}</span>
                </span>
                <span aria-hidden="true" className="shrink-0 text-ink-faint">
                  &darr;
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Container>

      <CadSection service={cad} />
      <SectionDivider index={2} label="Growth" className="py-1" />
      <GrowthSection service={growth} />
      <SectionDivider index={3} label="Visualise" className="py-1" />
      <VisualisationSection service={visualisation} />
      <SectionDivider index={4} label="Film" className="py-1" />
      <VideoSection service={video} />
      <SectionDivider index={5} label="Automate" className="py-1" />
      <AutomationSection service={automation} />
      <SectionDivider index={6} label="Build" className="py-1" />
      <WebsiteSection service={web} />

      {/* ============================================================
          03 — HOW WE WORK
         ============================================================ */}
      <Section tone="surface" bordered>
        <Container width="page">
          <SectionHeading
            eyebrow="How we work"
            title="One process, whatever the output."
            intro={HOME_COPY.howWeWorkIntro}
          />
          <div className="mt-14">
            <ProductionTrack />
          </div>
        </Container>
      </Section>

      {/* ============================================================
          04 — ENGAGEMENT MODEL
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
