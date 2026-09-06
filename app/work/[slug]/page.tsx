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
  EvidenceRow,
  Breadcrumbs,
  JsonLd,
} from "@/components/ui/primitives";
import { ProjectCTA } from "@/components/site/ProjectCTA";
import { RelatedWork, RelatedServices } from "@/components/work/cards";
import { Gallery, LazyVideo } from "@/components/work/media";
import {
  CASE_STUDIES,
  getCaseStudy,
  relatedCaseStudies,
  clientLabel,
  WORK_CATEGORIES,
  ENGAGEMENT_LABELS,
  type SchemaTable,
} from "@/lib/case-studies";
import { SERVICES } from "@/lib/services";
import { pageMetadata, caseStudySchema, breadcrumbSchema } from "@/lib/seo";

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return pageMetadata({
    title: study.seo.title,
    description: study.seo.description,
    path: `/work/${study.slug}`,
    image: study.seo.image,
    type: "article",
  });
}

function MetadataGrid({ items }: { items: { label: string; value: string }[] }) {
  return (
    <dl className="grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div key={item.label} className="bg-paper px-5 py-5">
          <dt className="label">{item.label}</dt>
          <dd className="mt-2 text-sm leading-snug text-ink">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function DataTable({ table }: { table: SchemaTable }) {
  return (
    <figure>
      <figcaption className="mb-4">
        <h3 className="text-base font-semibold tracking-tight text-ink">{table.caption}</h3>
        {table.note ? (
          <p className="mt-1 text-sm leading-relaxed text-ink-muted">{table.note}</p>
        ) : null}
      </figcaption>
      <div className="overflow-x-auto border border-rule bg-surface">
        <table className="w-full min-w-[32rem] border-collapse text-left">
          <thead>
            <tr className="border-b border-rule bg-paper-deep">
              {table.columns.map((col) => (
                <th
                  key={col}
                  scope="col"
                  className="px-5 py-3 font-mono text-[0.6875rem] uppercase tracking-[0.14em] font-medium text-ink-muted"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row) => (
              <tr key={row.join("|")} className="border-b border-rule last:border-b-0">
                {row.map((cell, i) => (
                  <td
                    key={i}
                    className={`px-5 py-3 text-sm ${
                      i === 0 ? "font-medium text-ink" : "text-ink-soft"
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const category = WORK_CATEGORIES.find((c) => c.slug === study.category);
  const client = clientLabel(study);
  const related = relatedCaseStudies(study, 2);
  const relatedServices = SERVICES.filter((s) => study.services.includes(s.slug));

  /* Metadata cells — only those with real values. */
  const metaItems = [
    client ? { label: study.clientAnonymised ? "Client" : "Client", value: client } : null,
    study.sector ? { label: "Sector", value: study.sector } : null,
    study.location ? { label: "Location", value: study.location } : null,
    study.dateRange ? { label: "Period", value: study.dateRange } : null,
    study.engagementType
      ? { label: "Engagement", value: ENGAGEMENT_LABELS[study.engagementType] }
      : null,
    category ? { label: "Discipline", value: category.label } : null,
  ].filter((x): x is { label: string; value: string } => x !== null);

  return (
    <>
      <JsonLd
        data={caseStudySchema({
          name: study.projectName,
          description: study.seo.description,
          path: `/work/${study.slug}`,
          image: study.seo.image,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "CAD & Technical", path: "/services/cad-technical-production" },
          { name: study.projectName, path: `/work/${study.slug}` },
        ])}
      />

      {/* 01 — Project hero */}
      <section className="border-b border-rule">
        <Container width="page" className="pb-10 pt-10 sm:pb-12">
          <Breadcrumbs
            trail={[
              { name: "Home", path: "/" },
              { name: "CAD & Technical", path: "/services/cad-technical-production" },
              { name: study.projectName, path: `/work/${study.slug}` },
            ]}
          />
          <div className="max-w-3xl">
            {category ? <Eyebrow>{category.label}</Eyebrow> : null}
            <h1 className="display mt-6 text-3xl sm:text-4xl lg:text-5xl">{study.projectName}</h1>
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-ink-soft">{study.summary}</p>
          </div>
        </Container>
      </section>

      {/* For Bahrain CAD package: drawings are shown immediately front and center with no write-ups */}
      {study.slug === "bahrain-luxury-interior-cad-package" ? (
        <>
          {study.images && study.images.length > 0 ? (
            <Section bordered className="bg-surface/40">
              <Container width="wide">
                <div className="mb-8 flex flex-wrap items-baseline justify-between gap-4 border-b border-rule pb-4">
                  <div>
                    <h2 className="display text-2xl sm:text-3xl">Drawing Package Sheets</h2>
                    <p className="mt-1 text-sm text-ink-muted">
                      {study.images.length} coordinated sheets · Click any drawing to open high-resolution inspection viewer
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center rounded-md border border-rule bg-paper px-3 py-1 font-mono text-xs text-ink-muted">
                      DWG · DXF · PDF
                    </span>
                  </div>
                </div>
                <Gallery images={study.images} />
              </Container>
            </Section>
          ) : null}
        </>
      ) : (
        <>
          {/* 02 — Metadata */}
          {metaItems.length > 0 ? (
            <Container width="page" className="py-10">
              <MetadataGrid items={metaItems} />
            </Container>
          ) : null}

          {/* 11 — Evidence (surfaced early where it exists) */}
          {study.metrics && study.metrics.length > 0 ? (
            <Container width="page" className="pb-14">
              <h2 className="label mb-4">Produced</h2>
              <EvidenceRow items={study.metrics} />
            </Container>
          ) : null}

          {/* 04 — Challenge + 05 — Scope */}
          {study.challenge || study.scope ? (
            <Section tone="surface" bordered>
              <Container width="page">
                <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
                  {study.challenge ? (
                    <div className="lg:col-span-7">
                      <Eyebrow>Requirement</Eyebrow>
                      <div className="prose-body mt-5 max-w-2xl">
                        <p>{study.challenge}</p>
                      </div>
                    </div>
                  ) : null}
                  {study.scope ? (
                    <div className="lg:col-span-5">
                      <Eyebrow>Scope</Eyebrow>
                      <CapabilityList items={study.scope} className="mt-5" />
                    </div>
                  ) : null}
                </div>
              </Container>
            </Section>
          ) : null}

          {/* 06 — Inputs */}
          {study.inputs ? (
            <Section bordered>
              <Container width="page">
                <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
                  <div className="lg:col-span-4">
                    <Eyebrow>Inputs</Eyebrow>
                    <h2 className="display mt-5 text-2xl sm:text-3xl">What we started from.</h2>
                    <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                      {study.inputs.intro}
                    </p>
                  </div>
                  <div className="lg:col-span-8">
                    <CapabilityList items={study.inputs.items} columns={2} />
                  </div>
                </div>
              </Container>
            </Section>
          ) : null}

          {/* 07 — Approach */}
          {study.process && study.process.length > 0 ? (
            <Section tone="deep" bordered>
              <Container width="page">
                <SectionHeading eyebrow="Approach" title="How the engagement ran." />
                <ProcessList className="mt-12 lg:grid-cols-4" steps={study.process} />
              </Container>
            </Section>
          ) : null}

          {/* 08 — Production */}
          {study.production ? (
            <Section bordered>
              <Container width="page">
                <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
                  <div className="lg:col-span-4">
                    <Eyebrow>Production</Eyebrow>
                    <h2 className="display mt-5 text-2xl sm:text-3xl">What was produced.</h2>
                  </div>
                  <div className="lg:col-span-8">
                    <p className="max-w-2xl text-base leading-relaxed text-ink-soft">
                      {study.production.intro}
                    </p>
                    {study.production.items ? (
                      <CapabilityList items={study.production.items} className="mt-8" />
                    ) : null}
                  </div>
                </div>
              </Container>
            </Section>
          ) : null}

          {/* Structured evidence tables */}
          {study.schemaTables && study.schemaTables.length > 0 ? (
            <Section tone="surface" bordered>
              <Container width="page">
                <SectionHeading
                  eyebrow="System"
                  title="How the deliverable is structured."
                  intro="Records themselves are withheld from public display. The structure shows how the system works."
                />
                <div className="mt-12 space-y-12">
                  {study.schemaTables.map((table) => (
                    <DataTable key={table.caption} table={table} />
                  ))}
                </div>
              </Container>
            </Section>
          ) : null}

          {/* 09 — QA */}
          {study.qaValidation ? (
            <Section bordered>
              <Container width="page">
                <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
                  <div className="lg:col-span-4">
                    <Eyebrow>Quality assurance</Eyebrow>
                    <h2 className="display mt-5 text-2xl sm:text-3xl">Checked before issue.</h2>
                    <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                      {study.qaValidation.intro}
                    </p>
                  </div>
                  <div className="lg:col-span-8">
                    <CapabilityList items={study.qaValidation.items} columns={2} />
                  </div>
                </div>
              </Container>
            </Section>
          ) : null}

          {/* 10 — Deliverables */}
          {study.deliverables && study.deliverables.length > 0 ? (
            <Section tone="deep" bordered>
              <Container width="page">
                <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
                  <div className="lg:col-span-4">
                    <Eyebrow>Deliverables</Eyebrow>
                    <h2 className="display mt-5 text-2xl sm:text-3xl">Issued to the client.</h2>
                  </div>
                  <div className="lg:col-span-8">
                    <CapabilityList items={study.deliverables} columns={2} />
                  </div>
                </div>
              </Container>
            </Section>
          ) : null}

          {/* 12 — Gallery */}
          {study.images && study.images.length > 0 ? (
            <Section bordered>
              <Container width="wide">
                <SectionHeading
                  eyebrow="Gallery"
                  title="Selected output."
                  intro="Select any image to view it full size."
                />
                <div className="mt-12">
                  <Gallery images={study.images} />
                </div>
              </Container>
            </Section>
          ) : null}

          {/* Video */}
          {study.video && study.video.length > 0 ? (
            <Section tone="surface" bordered>
              <Container width="page">
                <SectionHeading eyebrow="Film" title="Motion output." />
                <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:max-w-3xl">
                  {study.video.map((v) => (
                    <LazyVideo key={v.src} item={v} />
                  ))}
                </div>
              </Container>
            </Section>
          ) : null}
        </>
      )}

      {/* 13 — Related capabilities + 14 — Related projects */}
      <Section bordered>
        <Container width="page">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Eyebrow>Capabilities used</Eyebrow>
              <div className="mt-5">
                <RelatedServices services={relatedServices} />
              </div>
            </div>
            {related.length > 0 ? (
              <div className="lg:col-span-8">
                <Eyebrow>Related work</Eyebrow>
                <div className="mt-5">
                  <RelatedWork studies={related} />
                </div>
              </div>
            ) : null}
          </div>
        </Container>
      </Section>

      {/* Specialist Production Service Connection */}
      {study.slug === "bahrain-luxury-interior-cad-package" ? (
        <Section tone="surface" bordered>
          <Container width="page">
            <div className="border border-rule bg-paper p-7 lg:p-8">
              <Eyebrow>Production Service</Eyebrow>
              <h3 className="display mt-3 text-xl sm:text-2xl">
                Require a comparable fit-out drawing package?
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted">
                Explore our dedicated production line for <Link href="/services/cad/interior-fit-out-shop-drawings" className="text-ink underline decoration-rule-strong underline-offset-4 hover:text-accent">Interior Fit-Out & Joinery Shop Drawings</Link>, covering millwork details, setting-out plans, reflected ceiling plans, and MEP coordination.
              </p>
            </div>
          </Container>
        </Section>
      ) : null}

      {study.slug === "sultanah-moon-chair-cinematic-campaign" || study.slug === "interior-visualisation-studies" ? (
        <Section tone="surface" bordered>
          <Container width="page">
            <div className="border border-rule bg-paper p-7 lg:p-8">
              <Eyebrow>Production Service</Eyebrow>
              <h3 className="display mt-3 text-xl sm:text-2xl">
                Require bespoke furniture CGI or lifestyle rendering?
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted">
                Explore our commercial service line for <Link href="/services/visualisation/photorealistic-furniture-rendering" className="text-ink underline decoration-rule-strong underline-offset-4 hover:text-accent">Photorealistic Furniture 3D Rendering</Link>, producing e-commerce cutouts, material swatch simulations, and 4K luxury lifestyle scenes.
              </p>
            </div>
          </Container>
        </Section>
      ) : null}

      {/* 15 — CTA */}
      <ProjectCTA
        title="Something comparable to produce?"
        body="Send the brief and the material you already have. We will confirm what is workable and propose a defined scope."
      />
    </>
  );
}
