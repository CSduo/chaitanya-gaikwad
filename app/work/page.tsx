import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Container,
  Section,
  SectionHeading,
  Eyebrow,
  JsonLd,
} from "@/components/ui/primitives";
import { ProjectCTA } from "@/components/site/ProjectCTA";
import { WorkFilter } from "@/components/work/WorkFilter";
import {
  allCaseStudies,
  WORK_CATEGORIES,
  clientLabel,
  type WorkCategory,
} from "@/lib/case-studies";
import { allVideos, allWorkbooks, allWebsites, CAD_DRAWINGS } from "@/lib/portfolio";
import { VISUALS } from "@/lib/visuals";
import { pageMetadata, breadcrumbSchema } from "@/lib/seo";

/* ------------------------------------------------------------------ */
/* One flat index across every kind of portfolio item                  */
/* ------------------------------------------------------------------ */

type Entry = {
  key: string;
  title: string;
  meta: string;
  blurb: string;
  href: string;
  category: WorkCategory;
  image?: { src: string; alt: string };
  kind: string;
};

function buildEntries(): Entry[] {
  const entries: Entry[] = [];

  for (const c of allCaseStudies()) {
    const img = c.images?.[0] ?? (c.video?.[0] ? { src: c.video[0].poster, alt: "" } : undefined);
    entries.push({
      key: `case-${c.slug}`,
      title: c.projectName,
      meta: [clientLabel(c), c.location, c.dateRange].filter(Boolean).join(" · "),
      blurb: c.summary,
      href: `/work/${c.slug}`,
      category: c.category,
      image: img ? { src: img.src, alt: "" } : undefined,
      kind: "Case study",
    });
  }

  for (const w of allWorkbooks()) {
    entries.push({
      key: `wb-${w.slug}`,
      title: w.title,
      meta: `${w.region} · ${w.sheetCount} ${w.sheetCount === 1 ? "sheet" : "sheets"}`,
      blurb: w.summary,
      href: `/work/research/${w.slug}`,
      category: "growth-b2b",
      kind: "Research system",
    });
  }

  for (const v of allVideos()) {
    entries.push({
      key: `v-${v.slug}`,
      title: v.title,
      meta: `${v.client ?? v.clientDescriptor} · ${v.year}`,
      blurb: v.description,
      href: "/services/video-ai-film-editing#films",
      category: "video",
      image: { src: v.poster, alt: "" },
      kind: "Film",
    });
  }

  for (const s of allWebsites()) {
    entries.push({
      key: `w-${s.slug}`,
      title: s.title,
      meta: `${s.client ?? s.clientDescriptor} · ${s.year}`,
      blurb: s.description,
      href: "/services/website-design-development#builds",
      category: "websites",
      kind: "Website",
    });
  }

  return entries;
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}): Promise<Metadata> {
  const { category } = await searchParams;
  const match = WORK_CATEGORIES.find((c) => c.slug === category);
  if (match) {
    return pageMetadata({
      title: `${match.label} — Work`,
      description: `${match.blurb} Selected XIYÀTO work in ${match.label.toLowerCase()}.`,
      path: "/work",
    });
  }
  return pageMetadata({
    title: "Work",
    description:
      "Drawing packages, research systems, visualisation, film and websites produced by XIYÀTO across six service areas.",
    path: "/work",
  });
}

export default async function WorkPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const entries = buildEntries();

  const counts = Object.fromEntries(
    WORK_CATEGORIES.map((c) => [c.slug, entries.filter((e) => e.category === c.slug).length]),
  ) as Record<string, number>;

  // Only offer filters that actually contain something.
  const categories = WORK_CATEGORIES.filter((c) => counts[c.slug] > 0);
  const active = (categories.find((c) => c.slug === category)?.slug ?? null) as WorkCategory | null;
  const visible = active ? entries.filter((e) => e.category === active) : entries;
  const activeLabel = categories.find((c) => c.slug === active)?.label;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
        ])}
      />

      <section className="border-b border-rule">
        <Container width="page" className="py-14 sm:py-18 lg:py-24">
          <div className="max-w-3xl">
            <Eyebrow>Work</Eyebrow>
            <h1 className="display mt-6 text-4xl sm:text-5xl lg:text-[3.5rem]">
              The archive.
            </h1>
            <p className="mt-7 text-lg leading-relaxed text-ink-soft">
              Drawing packages, research systems, visualisation, film and websites. Where a
              client is not named, the sector and location are given instead.
            </p>
          </div>

          <dl className="mt-12 grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
            {[
              { l: "Drawings", v: CAD_DRAWINGS.filter((d) => d.role === "output").length },
              { l: "Research systems", v: allWorkbooks().length },
              { l: "Visualisations", v: VISUALS.length },
              { l: "Films", v: allVideos().length },
            ].map((s) => (
              <div key={s.l} className="bg-paper px-5 py-5">
                <dt className="label">{s.l}</dt>
                <dd className="display mt-2 text-2xl text-ink">{s.v}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <Section bordered>
        <Container width="page">
          <div className="flex flex-col gap-8">
            <SectionHeading
              eyebrow="Index"
              title={activeLabel ?? "All work"}
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
              total={entries.length}
            />
          </div>

          <p className="meta mb-6 mt-10" aria-live="polite">
            Showing {visible.length} of {entries.length} items
          </p>

          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((e) => (
              <li key={e.key} className="group relative flex flex-col border border-rule bg-surface">
                {e.image ? (
                  <span className="relative block aspect-[16/10] overflow-hidden bg-paper-deep">
                    <Image
                      src={e.image.src}
                      alt=""
                      fill
                      loading="lazy"
                      sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 92vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </span>
                ) : null}
                <div className="flex flex-1 flex-col p-6">
                  <p className="label">{e.kind}</p>
                  <h2 className="display mt-3 text-lg leading-snug">
                    <Link
                      href={e.href}
                      className="transition-colors after:absolute after:inset-0 hover:text-accent"
                    >
                      {e.title}
                    </Link>
                  </h2>
                  {e.meta ? <p className="meta mt-2">{e.meta}</p> : null}
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">{e.blurb}</p>
                </div>
              </li>
            ))}
          </ul>

          {/* Visualisations are a gallery rather than discrete entries. */}
          {(!active || active === "visualisation") && (
            <div className="mt-14 border-t border-rule pt-12">
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <h2 className="display text-2xl">Visualisation archive</h2>
                <Link
                  href="/services/visualisation-image-production#gallery"
                  className="group inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-accent"
                >
                  <span className="underline decoration-rule-strong underline-offset-4">
                    Open all {VISUALS.length} images
                  </span>
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
              <ul className="mt-8 grid grid-cols-2 gap-px border border-rule bg-rule sm:grid-cols-4 lg:grid-cols-6">
                {VISUALS.slice(0, 12).map((v) => (
                  <li key={v.src} className="relative aspect-square bg-paper-deep">
                    <Image
                      src={v.src}
                      alt={v.alt}
                      fill
                      loading="lazy"
                      sizes="(min-width: 1024px) 180px, 45vw"
                      className="object-cover"
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Container>
      </Section>

      <ProjectCTA
        title="Looking for something comparable?"
        body="Send your own brief and we will scope it."
      />
    </>
  );
}
