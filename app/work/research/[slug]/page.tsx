import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Container,
  Eyebrow,
  Breadcrumbs,
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

          <dl className="mt-8 grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
            <div className="rounded-lg border border-rule bg-surface p-3.5 sm:p-4 shadow-2xs">
              <dt className="label text-[0.625rem]">Region</dt>
              <dd className="mt-1 text-sm font-semibold text-ink">{workbook.region}</dd>
            </div>
            <div className="rounded-lg border border-rule bg-surface p-3.5 sm:p-4 shadow-2xs">
              <dt className="label text-[0.625rem]">Focus Area</dt>
              <dd className="mt-1 text-sm font-semibold text-ink truncate">{workbook.tags[0]}</dd>
            </div>
            <div className="rounded-lg border border-rule bg-surface p-3.5 sm:p-4 shadow-2xs">
              <dt className="label text-[0.625rem]">Intelligence Level</dt>
              <dd className="mt-1 text-sm font-semibold text-ink">Verified B2B</dd>
            </div>
            <div className="rounded-lg border border-rule bg-surface p-3.5 sm:p-4 shadow-2xs">
              <dt className="label text-[0.625rem]">Published Copy</dt>
              <dd className="mt-1 text-sm font-semibold text-ink">Redacted</dd>
            </div>
          </dl>
        </Container>
      </section>

      <Container width="wide" className="py-10 sm:py-14">
        <div className="mb-6 max-w-3xl">
          <h2 className="display text-2xl sm:text-3xl">Explore the workbook</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">
            Search filters the whole dataset. Contact details are redacted in this published copy.
          </p>
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
                      className="inline-flex min-h-[44px] items-center transition-colors after:absolute after:inset-0 hover:text-accent"
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
