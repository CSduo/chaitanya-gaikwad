import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Container,
  Section,
  SectionHeading,
  Eyebrow,
  ProcessList,
  CapabilityList,
  Breadcrumbs,
  JsonLd,
} from "@/components/ui/primitives";
import { ProjectCTA } from "@/components/site/ProjectCTA";
import { ServiceProof } from "@/components/home/ServiceProof";
import { ServicePreview } from "@/components/home/ServicePreview";
import { ALL_SERVICES, SERVICES, getService } from "@/lib/services";
import { getServicePricing, PRICING_NOTE } from "@/lib/pricing";
import { pageMetadata, serviceSchema, breadcrumbSchema } from "@/lib/seo";
import { SERVICE_SEO } from "@/lib/seo-copy";
import { getServiceWhatsAppHref, WHATSAPP } from "@/lib/site";
import { specialismsForService } from "@/lib/specialisms";
import { caseStudiesForService, WORK_HUB_PATH } from "@/lib/case-studies";
import { RelatedWork } from "@/components/work/cards";
import { SpecialismLinks } from "@/components/services/SpecialismLinks";
import { HireLinks } from "@/components/services/HireLinks";


const SERVICE_ACTION_LABELS: Record<string, string> = {
  "b2b-lead-generation": "Get a Qualified Lead Plan",
  "market-intelligence-research": "Discuss a Research Brief",
  "ai-video-production": "Get an AI Video Concept",
  "cad-technical-production": "Discuss a Drawing Package",
  "visualisation-image-production": "Discuss a Rendering Project",
  "website-design-development": "Discuss a Website Project",
  // Legacy aliases
  "growth-marketing-b2b": "Get a Qualified Lead Plan",
  "video-ai-film-editing": "Get an AI Video Concept",
  "automation-workflow-systems": "Discuss Your Workflow",
};

export function generateStaticParams() {
  return ALL_SERVICES.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  const seo = SERVICE_SEO[service.slug];
  return pageMetadata({
    // Each service carries its own written title and description; none falls
    // back to the service name, so no two service pages share metadata.
    title: seo?.metaTitle ?? service.name,
    description: seo?.metaDescription ?? service.overview,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const isCad = service.slug === "cad-technical-production";
  const prices = getServicePricing(service.slug);
  const primaryPrice = prices[0];
  const specialisms = specialismsForService(service.slug);
  const caseStudies = caseStudiesForService(service.slug);

  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: service.name,
          description: service.overview,
          path: `/services/${service.slug}`,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.name, path: `/services/${service.slug}` },
        ])}
      />

      {/* 01 — Service hero */}
      <section className="border-b border-rule">
        <Container width="page" className="pb-16 pt-10 sm:pb-20 lg:pb-24">
          <Breadcrumbs
            trail={[
              { name: "Home", path: "/" },
              { name: "Services", path: "/services" },
              { name: service.shortName, path: `/services/${service.slug}` },
            ]}
          />
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
            <div className="min-w-0">
              <Eyebrow>{service.slug === "market-intelligence-research" ? "Specialist research" : `Service ${String(service.order).padStart(2, "0")}`}</Eyebrow>
              <h1 className="display mt-6 text-4xl sm:text-5xl lg:text-[3.5rem]">
                {service.name}
              </h1>
              <p className="mt-7 text-lg leading-relaxed text-ink-soft">{service.summary}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {prices.length ? prices.map((price) => (
                  <a key={price.id} href="#pricing" className="inline-flex min-h-11 items-center rounded-full border border-accent/30 bg-accent-wash px-4 py-2 text-sm font-semibold text-accent hover:border-accent">
                    {prices.length > 1 ? `${price.name} · ` : ""}{price.label}
                  </a>
                )) : <span className="rounded-full border border-rule bg-surface px-4 py-2 text-sm text-ink-soft">A tailored quote for your brief</span>}
              </div>
              {primaryPrice ? <p className="mt-3 text-[0.6875rem] leading-relaxed text-ink-muted">USD · Final scope and price agreed before work begins.</p> : null}

              {/* Direct Inbound Acquisition Action Bar */}
              <div className="mt-8 flex flex-wrap items-center gap-2.5">
                <a
                  href={primaryPrice?.href ?? getServiceWhatsAppHref(service.slug, "uk")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[46px] items-center gap-2 rounded-xs bg-ink px-6 text-xs font-semibold tracking-tight text-paper transition-colors hover:bg-accent"
                  aria-label={`${primaryPrice?.cta ?? SERVICE_ACTION_LABELS[service.slug] ?? "Start a project"} via WhatsApp`}
                >
                  <span>{primaryPrice?.cta ?? SERVICE_ACTION_LABELS[service.slug] ?? "Start on WhatsApp"}</span>
                  <span aria-hidden="true">&#8599;</span>
                </a>

                <a
                  href={WHATSAPP.uk.tel}
                  className="inline-flex min-h-[46px] items-center gap-1.5 rounded-xs border border-rule px-4 text-xs font-mono text-ink transition-colors hover:border-ink hover:bg-surface"
                  title="Direct Telephone Line (UK)"
                  aria-label={`Call XIYÀTO UK at ${WHATSAPP.uk.number}`}
                >
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ink-muted">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>Call UK: {WHATSAPP.uk.number}</span>
                </a>

                <a
                  href={WHATSAPP.india.tel}
                  className="inline-flex min-h-[46px] items-center gap-1.5 rounded-xs border border-rule px-4 text-xs font-mono text-ink-muted transition-colors hover:border-ink hover:bg-surface"
                  title="Direct Technical Production Line (India)"
                  aria-label={`Call XIYÀTO India at ${WHATSAPP.india.number}`}
                >
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ink-muted">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>Call India: {WHATSAPP.india.number}</span>
                </a>

                <Link
                  href="/contact"
                  className="inline-flex min-h-[46px] items-center gap-1.5 rounded-xs border border-rule px-4 text-xs font-medium text-ink-muted transition-colors hover:border-ink hover:text-ink"
                >
                  <span>Detailed brief</span>
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
            <div className="min-w-0 overflow-hidden rounded-xl border border-rule shadow-xl">
              <ServicePreview slug={service.slug} />
            </div>
            </div>
          </Container>
        </section>

        {prices.length ? (
          <Section id="pricing" tone="deep" bordered>
            <Container width="page">
              <div className="grid gap-8 lg:grid-cols-12 lg:gap-14">
                <div className="lg:col-span-4">
                  <Eyebrow>Clear starting prices</Eyebrow>
                  <h2 className="display mt-5 text-3xl sm:text-4xl">Start small.<br />Make it count.</h2>
                  <p className="mt-5 text-sm leading-relaxed text-ink-muted">Choose a starting point and send your brief. We confirm the deliverables, timeline and final price with you before production.</p>
                </div>
                <div className="lg:col-span-8">
                  <div className={`grid gap-4 ${prices.length > 1 ? "sm:grid-cols-2" : ""}`}>
                    {prices.map((price) => (
                      <article key={price.id} className="flex flex-col rounded-xl border border-accent/25 bg-surface p-6 shadow-sm sm:p-8">
                        <h3 className="text-sm font-semibold text-ink">{price.name}</h3>
                        <p className="mt-5 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-muted">Starting at</p>
                        <p className="mt-1 text-4xl font-semibold tracking-tight text-ink">${price.amount}<span className="ml-2 text-xs font-normal tracking-normal text-ink-muted">USD{price.unit ? ` / ${price.unit}` : ""}</span></p>
                        <p className="mb-7 mt-5 text-sm leading-relaxed text-ink-muted">{price.note}</p>
                        <a href={price.href} target="_blank" rel="noopener noreferrer" className="mt-auto flex min-h-12 items-center justify-between gap-3 rounded-md bg-ink px-5 py-3 text-xs font-semibold text-paper transition-colors hover:bg-accent hover:text-white">
                          <span>{price.cta}</span><span aria-hidden="true">↗</span>
                        </a>
                      </article>
                    ))}
                  </div>
                  <p className="mt-4 text-[0.6875rem] leading-relaxed text-ink-muted">{PRICING_NOTE}</p>
                </div>
              </div>
            </Container>
          </Section>
        ) : null}

        {/* 02 — Service overview */}
        <Section tone="surface">
          <Container width="page">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-4">
                <Eyebrow>Overview</Eyebrow>
              </div>
              <div className="lg:col-span-8">
                <div className="prose-body max-w-2xl">
                  {service.intro.map((p) => (
                    <p key={p.slice(0, 40)}>{p}</p>
                  ))}
                </div>
              </div>
          </div>
        </Container>
      </Section>

      {/* The full portfolio for this service — everything, not a sample */}
      <Section bordered>
        <Container width="wide">
          <SectionHeading
            eyebrow="The work"
            title="Explore the work."
            intro={
              isCad
                ? "Drawings from a delivered interior package, shown alongside the client material they were produced from."
                : undefined
            }
          />
          <div className="mt-12">
            <ServiceProof slug={service.slug} />
          </div>
        </Container>
      </Section>

      {/* Case studies that list this service (lib/case-studies.ts) */}
      {caseStudies.length ? (
        <Section id="case-studies" tone="surface" bordered>
          <Container width="page">
            <SectionHeading
              eyebrow="Case studies"
              title={caseStudies.length > 1 ? "Projects in detail." : "A project in detail."}
              intro="What was supplied, what was produced and what was delivered."
              action={{ label: "See all work", href: WORK_HUB_PATH }}
            />
            <div className="mt-10">
              <RelatedWork studies={caseStudies} />
            </div>
          </Container>
        </Section>
      ) : null}

      {/* 03–07 — Capability groups (the variable band) */}
      <Section tone={isCad ? "surface" : "paper"} bordered>
        <Container width="page">
          <SectionHeading eyebrow="Capabilities" title="What the service covers." />
          <div className="mt-14 space-y-14">
            {service.groups.map((group) => (
              <div key={group.title} className="grid gap-8 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-4">
                  <h3 className="display text-2xl">{group.title}</h3>
                  {group.intro ? (
                    <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                      {group.intro}
                    </p>
                  ) : null}
                </div>
                <div className="lg:col-span-8">
                  <CapabilityList items={group.items} columns={2} />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 08 — Workflow */}
      <Section bordered>
        <Container width="page">
          <SectionHeading eyebrow="Process" title="How the work runs." />
          <ProcessList className="mt-14 lg:grid-cols-4" steps={service.process} />
        </Container>
      </Section>

      {/* 09 — Deliverables */}
      <Section tone="deep" bordered>
        <Container width="page">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Eyebrow>Deliverables</Eyebrow>
              <h2 className="display mt-5 text-3xl">What you receive.</h2>
            </div>
            <div className="lg:col-span-8">
              <CapabilityList items={service.deliverables} columns={2} />
              {service.boundary ? (
                <div className="mt-10 border-l border-accent/40 bg-accent-wash px-6 py-5">
                  <h3 className="label mb-2">Scope of responsibility</h3>
                  <p className="text-sm leading-relaxed text-ink-soft">{service.boundary}</p>
                </div>
              ) : null}
            </div>
          </div>
        </Container>
      </Section>

      {/* 10 — Specialisms: focused pages within this service (lib/specialisms.ts) */}
      {specialisms.length ? (
        <Section id="specialisms" tone="surface" bordered>
          <Container width="page">
            <SectionHeading
              eyebrow="Specialisms"
              title="Focused services within this discipline."
              intro={`Dedicated pages for specific briefs within ${service.shortName}.`}
            />
            <div className="mt-10">
              <SpecialismLinks specialisms={specialisms} />
            </div>
          </Container>
        </Section>
      ) : null}

      {/* Hire-intent page and comparison guide, linked from the 3D service only */}
      {service.slug === "visualisation-image-production" ? (
        <Section id="hire" bordered>
          <Container width="page">
            <SectionHeading
              eyebrow="Hiring for a project"
              title="Looking to hire a 3D visualiser?"
              intro="If you would otherwise hire a freelance 3D artist, these pages explain how a project with us runs and how to compare any freelancer or studio."
            />
            <div className="mt-10">
              <HireLinks />
            </div>
          </Container>
        </Section>
      ) : null}

      {service.slug === "b2b-lead-generation" ? (
        <Section tone="surface" bordered>
          <Container width="page">
            <div className="border border-rule bg-paper p-8 lg:p-10">
              <Eyebrow>Outbound Pipeline Engine</Eyebrow>
              <h3 className="display mt-4 text-2xl sm:text-3xl">
                Research-Backed B2B Lead Generation &amp; Account Acquisition
              </h3>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted">
                Every outbound campaign is built on proprietary commercial intelligence. We discover, verify, and engage target decision-makers across the UK, GCC, and international trade corridors to secure qualified commercial meetings for your sales team.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link
                  href="/services/market-intelligence-research"
                  className="inline-flex items-center gap-2 text-sm font-medium text-ink underline decoration-rule-strong underline-offset-4 hover:text-accent"
                >
                  <span>Explore Market Intelligence Services</span>
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
          </Container>
        </Section>
      ) : null}

      {service.slug === "market-intelligence-research" || service.slug === "growth-marketing-b2b" ? (
        <Section tone="surface" bordered>
          <Container width="page">
            <div className="border border-rule bg-paper p-8 lg:p-10">
              <Eyebrow>Regional Specialisation</Eyebrow>
              <h3 className="display mt-4 text-2xl sm:text-3xl">
                Middle East &amp; GCC B2B Market Intelligence
              </h3>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted">
                Hand-verified commercial buyer discovery, procurement route mapping, and direct WhatsApp outreach intelligence across the UAE, Saudi Arabia, Qatar, and Bahrain.
              </p>
              <div className="mt-6">
                <Link
                  href="/services/growth/middle-east-market-intelligence"
                  className="inline-flex items-center gap-2 text-sm font-medium text-ink underline decoration-rule-strong underline-offset-4 hover:text-accent"
                >
                  <span>Explore Middle East B2B Intelligence</span>
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
          </Container>
        </Section>
      ) : null}

      {service.slug === "ai-video-production" || service.slug === "video-ai-film-editing" ? (
        <Section tone="surface" bordered>
          <Container width="page">
            <div className="border border-rule bg-paper p-8 lg:p-10">
              <Eyebrow>Commercial Video Production</Eyebrow>
              <h3 className="display mt-4 text-2xl sm:text-3xl">
                Cinematic AI Video &amp; Product Storytelling
              </h3>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted">
                Commercial video campaigns combining live-action cinematography, CGI environments, and AI video workflows. From factory-to-showroom luxury furniture stories to architectural walkthroughs and product launches.
              </p>
              <div className="mt-6">
                <Link
                  href="/work/sultanah-moon-chair-cinematic-campaign"
                  className="inline-flex items-center gap-2 text-sm font-medium text-ink underline decoration-rule-strong underline-offset-4 hover:text-accent"
                >
                  <span>View the Moon Chair Cinematic Campaign Case Study</span>
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
          </Container>
        </Section>
      ) : null}

      {/* 11 — CTA & Cross-Discipline Discovery */}
      <ProjectCTA
        serviceSlug={service.slug}
        eyebrow={service.shortName}
        title={`Discuss a ${service.shortName} brief`}
        body="Send the brief and whatever material exists. We will confirm what is workable, identify any missing information, and propose a defined scope."
        services={SERVICES.filter((s) => s.slug !== service.slug).map((s) => ({
          label: s.name,
          href: `/services/${s.slug}`,
        }))}
      />
    </>
  );
}
