import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Container,
  Eyebrow,
  Breadcrumbs,
  CapabilityList,
  JsonLd,
} from "@/components/ui/primitives";
import { DataViewer } from "@/components/media/DataViewer";
import { ProjectCTA } from "@/components/site/ProjectCTA";
import { WORKBOOKS, getWorkbook } from "@/lib/portfolio";
import { pageMetadata, breadcrumbSchema, caseStudySchema } from "@/lib/seo";

export function generateStaticParams() {
  return WORKBOOKS.map((w) => ({ slug: w.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const w = getWorkbook(slug);
  if (!w) return {};
  return pageMetadata({
    title: `${w.title} — Research system`,
    description: w.summary,
    path: `/work/research/${w.slug}`,
    type: "article",
  });
}

export default async function ResearchPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const workbook = getWorkbook(slug);
  if (!workbook) notFound();

  const others = WORKBOOKS.filter((w) => w.slug !== workbook.slug).slice(0, 4);

  return (
    <>
      <JsonLd
        data={caseStudySchema({
          name: workbook.title,
          description: workbook.summary,
          path: `/work/research/${workbook.slug}`,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
          { name: workbook.title, path: `/work/research/${workbook.slug}` },
        ])}
      />

      <section className="border-b border-rule">
        <Container width="wide" className="pb-12 pt-10">
          <Breadcrumbs
            trail={[
              { name: "Home", path: "/" },
              { name: "Work", path: "/work" },
              { name: workbook.title, path: `/work/research/${workbook.slug}` },
            ]}
          />
          <div className="max-w-3xl">
            <Eyebrow>Research system · {workbook.region}</Eyebrow>
            <h1 className="display mt-6 text-3xl sm:text-4xl lg:text-5xl">{workbook.title}</h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft">{workbook.summary}</p>
          </div>

          <dl className="mt-10 grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-paper px-5 py-5">
              <dt className="label">Region</dt>
              <dd className="mt-2 text-sm text-ink">{workbook.region}</dd>
            </div>
            <div className="bg-paper px-5 py-5">
              <dt className="label">Sheets</dt>
              <dd className="mt-2 text-sm text-ink">{workbook.sheetCount}</dd>
            </div>
            <div className="bg-paper px-5 py-5">
              <dt className="label">Focus</dt>
              <dd className="mt-2 text-sm text-ink">{workbook.tags[0]}</dd>
            </div>
            <div className="bg-paper px-5 py-5">
              <dt className="label">Published copy</dt>
              <dd className="mt-2 text-sm text-ink">Redacted</dd>
            </div>
          </dl>
        </Container>
      </section>

      <Container width="wide" className="py-14">
        <div className="mb-8 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <h2 className="display text-2xl">Explore the workbook</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted">
              Every sheet from the delivered workbook is below. Search filters the whole
              sheet, not just the visible page. Contact details were removed before
              publication and are not present in this copy.
            </p>
          </div>
          <div className="lg:col-span-4">
            <h3 className="label mb-3">Sheets</h3>
            <CapabilityList items={workbook.sheetNames} />
          </div>
        </div>

        <DataViewer
          dataUrl={workbook.dataUrl}
          downloadUrl={workbook.downloadUrl}
          title={workbook.title}
        />
      </Container>

      {others.length > 0 ? (
        <section className="border-t border-rule py-16">
          <Container width="page">
            <h2 className="label mb-8">Other research systems</h2>
            <ul className="grid gap-px border border-rule bg-rule sm:grid-cols-2">
              {others.map((w) => (
                <li key={w.slug} className="group relative bg-paper p-6">
                  <p className="label">{w.region}</p>
                  <h3 className="display mt-3 text-lg leading-snug">
                    <Link
                      href={`/work/research/${w.slug}`}
                      className="transition-colors after:absolute after:inset-0 hover:text-accent"
                    >
                      {w.title}
                    </Link>
                  </h3>
                  <p className="meta mt-3">
                    {w.sheetCount} {w.sheetCount === 1 ? "sheet" : "sheets"}
                  </p>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      <ProjectCTA
        eyebrow="Growth & B2B"
        title="Need this kind of groundwork for your market?"
        body="Tell us the market and what a good customer looks like."
      />
    </>
  );
}
