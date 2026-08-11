import type { Metadata } from "next";
import {
  Container,
  Section,
  SectionHeading,
  Eyebrow,
  CapabilityList,
  JsonLd,
} from "@/components/ui/primitives";
import { ProjectCTA } from "@/components/site/ProjectCTA";
import { CaseStudyCard } from "@/components/work/cards";
import { WorkFilter } from "@/components/work/WorkFilter";
import {
  allCaseStudies,
  featuredCaseStudies,
  activeCategories,
  type WorkCategory,
} from "@/lib/case-studies";
import { SERVICES } from "@/lib/services";
import { pageMetadata, breadcrumbSchema } from "@/lib/seo";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}): Promise<Metadata> {
  const { category } = await searchParams;
  const match = activeCategories().find((c) => c.slug === category);

  if (match) {
    return pageMetadata({
      title: `${match.label} — Work`,
      description: `${match.blurb} Selected XIYÀTO engagements in ${match.label.toLowerCase()}.`,
      // Filtered views canonicalise to the unfiltered index.
      path: "/work",
    });
  }

  return pageMetadata({
    title: "Work",
    description:
      "Selected XIYÀTO engagements across technical production, growth operations, visual content and multi-disciplinary work.",
    path: "/work",
  });
}

export default async function WorkPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const categories = activeCategories();
  const active = (categories.find((c) => c.slug === category)?.slug ?? null) as
    | WorkCategory
    | null;

  const all = allCaseStudies();
  const featured = featuredCaseStudies(2);
  const visible = active ? all.filter((c) => c.category === active) : all;

  const counts = Object.fromEntries(
    categories.map((c) => [c.slug, all.filter((s) => s.category === c.slug).length]),
  );

  const activeLabel = categories.find((c) => c.slug === active)?.label;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
        ])}
      />

      {/* 01 — Work hero */}
      <section className="border-b border-rule">
        <Container width="page" className="py-16 sm:py-20 lg:py-24">
          <div className="max-w-3xl">
            <Eyebrow>Work</Eyebrow>
            <h1 className="display mt-6 text-4xl sm:text-5xl lg:text-[3.5rem]">
              Selected engagements.
            </h1>
            <p className="mt-7 text-lg leading-relaxed text-ink-soft">
              A small number of engagements documented properly, rather than a gallery of
              thumbnails. Where a client is not named, the sector and location are given
              instead. Evidence is operational — what was produced, at what scale, in what
              structure.
            </p>
          </div>
        </Container>
      </section>

      {/* 02 — Featured engagements */}
      {!active && featured.length > 0 ? (
        <Section tone="surface">
          <Container width="page">
            <SectionHeading eyebrow="Featured" title="Where the work is strongest." />
            <div className="mt-14 grid gap-6 lg:grid-cols-2">
              {featured.map((study) => (
                <div key={study.slug} className="relative">
                  <CaseStudyCard study={study} featured />
                </div>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {/* 03 — Filter + 04 — Index */}
      <Section bordered id="all-work">
        <Container width="page">
          <div className="flex flex-col gap-8">
            <SectionHeading
              eyebrow="Index"
              title={activeLabel ? activeLabel : "All work"}
              intro={
                activeLabel
                  ? categories.find((c) => c.slug === active)?.blurb
                  : "Filter by discipline. Each view has its own address."
              }
            />
            <WorkFilter
              categories={categories}
              active={active}
              counts={counts}
              total={all.length}
            />
          </div>

          <div className="mt-12">
            <p className="meta mb-6" aria-live="polite">
              Showing {visible.length} of {all.length} engagements
            </p>

            {visible.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {visible.map((study) => (
                  <div key={study.slug} className="relative">
                    <CaseStudyCard study={study} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="border border-rule bg-surface p-10 text-center">
                <p className="text-base text-ink">
                  No published engagements in this category yet.
                </p>
              </div>
            )}
          </div>
        </Container>
      </Section>

      {/* 05 — Capabilities represented */}
      <Section tone="deep" bordered>
        <Container width="page">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Eyebrow>Capabilities</Eyebrow>
              <h2 className="display mt-5 text-3xl">Represented across this work.</h2>
            </div>
            <div className="lg:col-span-8">
              <div className="grid gap-8 sm:grid-cols-3">
                {SERVICES.map((s) => (
                  <div key={s.slug}>
                    <h3 className="label mb-2">{s.shortName}</h3>
                    <CapabilityList items={s.groups.map((g) => g.title)} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 06 — CTA */}
      <ProjectCTA
        title="Looking for something comparable?"
        body="If one of these engagements resembles what you need, the fastest route is to send your own brief and let us scope it."
      />
    </>
  );
}
