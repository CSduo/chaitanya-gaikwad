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
import { SERVICES, getService } from "@/lib/services";
import { pageMetadata, serviceSchema, breadcrumbSchema } from "@/lib/seo";
import { SERVICE_SEO } from "@/lib/seo-copy";
import { getServiceWhatsAppHref, WHATSAPP } from "@/lib/site";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
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
          <div className="max-w-3xl">
            <Eyebrow>{`Service 0${service.order}`}</Eyebrow>
            <h1 className="display mt-6 text-4xl sm:text-5xl lg:text-[3.5rem]">
              {service.name}
            </h1>
            <p className="mt-7 text-lg leading-relaxed text-ink-soft">{service.summary}</p>

            {/* Direct Inbound Acquisition Action Bar */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={getServiceWhatsAppHref(service.slug, "uk")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[46px] items-center gap-2 rounded-xs bg-ink px-6 text-xs font-semibold tracking-tight text-paper transition-colors hover:bg-accent"
              >
                <span>Direct WhatsApp (UK)</span>
                <span aria-hidden="true">&#8599;</span>
              </a>
              <a
                href={getServiceWhatsAppHref(service.slug, "india")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[46px] items-center gap-2 rounded-xs border border-rule px-5 text-xs font-medium tracking-tight text-ink transition-colors hover:border-ink hover:bg-surface"
              >
                <span>Direct WhatsApp (India)</span>
                <span aria-hidden="true">&#8599;</span>
              </a>
              <a
                href={`tel:${WHATSAPP.uk.number.replace(/\s+/g, "")}`}
                className="inline-flex min-h-[46px] items-center gap-1.5 rounded-xs border border-rule px-4 text-xs font-mono text-ink-muted transition-colors hover:border-ink hover:text-ink"
                title="Direct Telephone Line"
              >
                <span>Call: {WHATSAPP.uk.number}</span>
              </a>
            </div>
          </div>
        </Container>
      </section>

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
            title="Produced under this service."
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



      {/* 10 — Specialist Production Landing Pages */}
      {isCad ? (
        <Section tone="surface" bordered>
          <Container width="page">
            <div className="border border-rule bg-paper p-8 lg:p-10">
              <Eyebrow>Specialist Production Capability</Eyebrow>
              <h3 className="display mt-4 text-2xl sm:text-3xl">
                Interior Fit-Out & Joinery Shop Drawings
              </h3>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted">
                Dedicated overflow drafting support for interior fit-out contractors, joinery manufacturers, and commercial studios. Complete millwork elevations, reflected ceiling plans, MEP coordination, and fabrication details delivered to UK and international building standards.
              </p>
              <div className="mt-6">
                <Link
                  href="/services/cad/interior-fit-out-shop-drawings"
                  className="inline-flex items-center gap-2 text-sm font-medium text-ink underline decoration-rule-strong underline-offset-4 hover:text-accent"
                >
                  <span>Explore Interior Fit-Out CAD Shop Drawings</span>
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
          </Container>
        </Section>
      ) : null}

      {service.slug === "growth-marketing-b2b" ? (
        <Section tone="surface" bordered>
          <Container width="page">
            <div className="border border-rule bg-paper p-8 lg:p-10">
              <Eyebrow>Regional Specialisation</Eyebrow>
              <h3 className="display mt-4 text-2xl sm:text-3xl">
                Middle East & GCC B2B Market Intelligence
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

      {service.slug === "visualisation-image-production" ? (
        <Section tone="surface" bordered>
          <Container width="page">
            <div className="border border-rule bg-paper p-8 lg:p-10">
              <Eyebrow>Commercial CGI Focus</Eyebrow>
              <h3 className="display mt-4 text-2xl sm:text-3xl">
                Photorealistic Furniture 3D Rendering & Visualisation
              </h3>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted">
                Hyper-realistic CGI lifestyle environments, material swatch simulations, and e-commerce hero sets for luxury furniture designers, bespoke joinery workshops, and high-end brands.
              </p>
              <div className="mt-6">
                <Link
                  href="/services/visualisation/photorealistic-furniture-rendering"
                  className="inline-flex items-center gap-2 text-sm font-medium text-ink underline decoration-rule-strong underline-offset-4 hover:text-accent"
                >
                  <span>Explore Furniture 3D Rendering Services</span>
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
