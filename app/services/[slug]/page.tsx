import type { Metadata } from "next";
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
import { CaseStudyCard } from "@/components/work/cards";
import { ServiceProof } from "@/components/home/ServiceProof";
import { SERVICES, getService } from "@/lib/services";
import { caseStudiesForService } from "@/lib/case-studies";
import { pageMetadata, serviceSchema, breadcrumbSchema } from "@/lib/seo";

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
  return pageMetadata({
    title: service.name,
    description: service.overview,
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

  const related = caseStudiesForService(service.slug, 3);
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

      {/* 10 — Related case studies */}
      {related.length > 0 ? (
        <Section bordered>
          <Container width="page">
            <SectionHeading
              eyebrow="Related work"
              title="This service in practice."
              action={{ label: "All work", href: "/work" }}
            />
            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {related.map((study) => (
                <div key={study.slug} className="relative">
                  <CaseStudyCard study={study} />
                </div>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {/* 11 — CTA */}
      <ProjectCTA
        eyebrow={service.shortName}
        title="Have something that needs producing?"
        body="Send the brief and whatever material exists. We will confirm what is workable and propose a defined scope."
      />
    </>
  );
}
