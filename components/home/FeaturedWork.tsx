import Link from "next/link";
import Image from "next/image";
import { clientLabel, type CaseStudy, WORK_CATEGORIES } from "@/lib/case-studies";

function categoryLabel(slug: CaseStudy["category"]) {
  return WORK_CATEGORIES.find((c) => c.slug === slug)?.label ?? slug;
}

function media(study: CaseStudy) {
  if (study.images?.length) return study.images[0];
  if (study.video?.length) {
    const v = study.video[0];
    return { src: v.poster, alt: "", width: v.width, height: v.height };
  }
  return null;
}

/** One engagement given real scale, rather than another row of equal cards. */
export function FeaturedEngagement({ study }: { study: CaseStudy }) {
  const img = media(study);
  const client = clientLabel(study);

  return (
    <article className="group relative">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4 lg:pt-6">
          <p className="label">{categoryLabel(study.category)}</p>
          <h3 className="display mt-5 text-3xl leading-[1.08] sm:text-4xl">
            <Link
              href={`/work/${study.slug}`}
              className="transition-colors after:absolute after:inset-0 hover:text-accent"
            >
              {study.projectName}
            </Link>
          </h3>

          <dl className="mt-7 space-y-3 border-t border-rule pt-6">
            {client ? (
              <div className="flex gap-4">
                <dt className="label w-20 shrink-0">Client</dt>
                <dd className="text-sm text-ink-soft">{client}</dd>
              </div>
            ) : null}
            {study.location ? (
              <div className="flex gap-4">
                <dt className="label w-20 shrink-0">Location</dt>
                <dd className="text-sm text-ink-soft">{study.location}</dd>
              </div>
            ) : null}
            {study.dateRange ? (
              <div className="flex gap-4">
                <dt className="label w-20 shrink-0">Year</dt>
                <dd className="text-sm text-ink-soft">{study.dateRange}</dd>
              </div>
            ) : null}
          </dl>

          <p className="mt-7 text-sm leading-relaxed text-ink-muted">{study.summary}</p>

          <p className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors group-hover:text-accent">
            <span className="underline decoration-rule-strong underline-offset-4">
              View case study
            </span>
            <span aria-hidden="true">&rarr;</span>
          </p>
        </div>

        <div className="lg:col-span-8">
          {img ? (
            <div className="relative aspect-[16/10] w-full overflow-hidden border border-rule bg-paper-deep">
              <Image
                src={img.src}
                alt=""
                fill
                loading="lazy"
                sizes="(min-width: 1024px) 820px, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.015]"
              />
            </div>
          ) : null}

          {study.metrics && study.metrics.length > 0 ? (
            <dl className="mt-px grid grid-cols-3 gap-px border border-rule bg-rule">
              {study.metrics.slice(0, 3).map((m) => (
                <div key={m.label} className="bg-paper px-4 py-5">
                  <dt className="label">{m.label}</dt>
                  <dd className="display mt-2 text-xl text-ink sm:text-2xl">{m.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>
      </div>
    </article>
  );
}

/** Supporting engagements — editorial tiles, not portfolio cards. */
export function SupportingWork({ studies }: { studies: CaseStudy[] }) {
  return (
    <ul className="grid gap-8 sm:grid-cols-2">
      {studies.map((s) => {
        const img = media(s);
        const client = clientLabel(s);
        return (
          <li key={s.slug} className="group relative">
            {img ? (
              <div className="relative aspect-[3/2] w-full overflow-hidden border border-rule bg-paper-deep">
                <Image
                  src={img.src}
                  alt=""
                  fill
                  loading="lazy"
                  sizes="(min-width: 640px) 46vw, 92vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>
            ) : (
              <div className="flex aspect-[3/2] w-full items-end border border-rule bg-paper-deep p-6">
                <p className="font-mono text-[0.6875rem] uppercase leading-relaxed tracking-[0.12em] text-ink-faint">
                  {s.metrics?.slice(0, 2).map((m) => `${m.value} ${m.label}`).join(" · ")}
                </p>
              </div>
            )}
            <p className="label mt-5">{categoryLabel(s.category)}</p>
            <h3 className="display mt-2 text-xl">
              <Link
                href={`/work/${s.slug}`}
                className="transition-colors after:absolute after:inset-0 hover:text-accent"
              >
                {s.projectName}
              </Link>
            </h3>
            {client ? <p className="meta mt-2">{client}</p> : null}
          </li>
        );
      })}
    </ul>
  );
}
