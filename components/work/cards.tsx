import Link from "next/link";
import Image from "next/image";
import {
  type CaseStudy,
  WORK_CATEGORIES,
  clientLabel,
} from "@/lib/case-studies";
import type { Service } from "@/lib/services";
import { Eyebrow, TextLink } from "@/components/ui/primitives";

function categoryLabel(slug: CaseStudy["category"]) {
  return WORK_CATEGORIES.find((c) => c.slug === slug)?.label ?? slug;
}

/** Representative image for a card — first image, or a video poster. */
function cardMedia(study: CaseStudy) {
  if (study.images?.length) {
    const img = study.images[0];
    return { src: img.src, alt: "" };
  }
  if (study.video?.length) {
    return { src: study.video[0].poster, alt: "" };
  }
  return null;
}

export function CaseStudyCard({
  study,
  featured = false,
}: {
  study: CaseStudy;
  featured?: boolean;
}) {
  const media = cardMedia(study);
  const client = clientLabel(study);

  return (
    <article className="group flex h-full flex-col border border-rule bg-surface transition-colors hover:border-rule-strong">
      {media ? (
        <Link
          href={`/work/${study.slug}`}
          tabIndex={-1}
          aria-hidden="true"
          className="relative block aspect-[16/10] overflow-hidden bg-paper-deep"
        >
          <Image
            src={media.src}
            alt=""
            fill
            loading="lazy"
            sizes={
              featured
                ? "(min-width: 1024px) 560px, (min-width: 640px) 90vw, 100vw"
                : "(min-width: 1024px) 380px, (min-width: 640px) 45vw, 92vw"
            }
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </Link>
      ) : null}

      <div className="flex flex-1 flex-col p-6 lg:p-7">
        <Eyebrow>{categoryLabel(study.category)}</Eyebrow>

        <h3 className={`display mt-4 ${featured ? "text-2xl lg:text-3xl" : "text-xl"}`}>
          <Link
            href={`/work/${study.slug}`}
            className="transition-colors after:absolute after:inset-0 hover:text-accent"
          >
            {study.projectName}
          </Link>
        </h3>

        {client || study.location ? (
          <p className="meta mt-3">
            {[client, study.location].filter(Boolean).join(" · ")}
          </p>
        ) : null}

        <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-soft">{study.summary}</p>

        <p className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors group-hover:text-accent">
          <span className="underline decoration-rule-strong underline-offset-4">
            Read case study
          </span>
          <span aria-hidden="true">&rarr;</span>
        </p>
      </div>
    </article>
  );
}

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="group relative flex h-full flex-col border border-rule bg-surface p-7 transition-colors hover:border-rule-strong lg:p-8">
      <Eyebrow>{`0${service.order}`}</Eyebrow>
      <h3 className="display mt-4 text-2xl">
        <Link
          href={`/services/${service.slug}`}
          className="transition-colors after:absolute after:inset-0 hover:text-accent"
        >
          {service.name}
        </Link>
      </h3>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-soft">{service.summary}</p>
      <p className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors group-hover:text-accent">
        <span className="underline decoration-rule-strong underline-offset-4">
          {service.shortName}
        </span>
        <span aria-hidden="true">&rarr;</span>
      </p>
    </article>
  );
}

export function RelatedWork({ studies }: { studies: CaseStudy[] }) {
  if (studies.length === 0) return null;
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {studies.map((s) => (
        <div key={s.slug} className="relative">
          <CaseStudyCard study={s} />
        </div>
      ))}
    </div>
  );
}

export function RelatedServices({ services }: { services: Service[] }) {
  if (services.length === 0) return null;
  return (
    <ul className="border-t border-rule">
      {services.map((s) => (
        <li key={s.slug} className="border-b border-rule py-5">
          <TextLink href={`/services/${s.slug}`}>{s.name}</TextLink>
          <p className="mt-1 text-sm text-ink-muted">{s.summary}</p>
        </li>
      ))}
    </ul>
  );
}
