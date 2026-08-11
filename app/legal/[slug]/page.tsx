import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Container,
  Eyebrow,
  Breadcrumbs,
  Rule,
  JsonLd,
} from "@/components/ui/primitives";
import { LEGAL_PAGES, getLegalPage, publishedLegalPages } from "@/lib/company";
import { pageMetadata, breadcrumbSchema } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { PrivacyContent, TermsContent } from "./content";

/**
 * Only published legal routes are pre-rendered. Unpublished ones are absent
 * from generateStaticParams and rejected by dynamicParams, so they return a
 * genuine 404 rather than an empty shell.
 */
export function generateStaticParams() {
  return publishedLegalPages().map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getLegalPage(slug);
  if (!page || !page.published) return {};
  return pageMetadata({
    title: page.title,
    description: page.description,
    path: `/legal/${page.slug}`,
  });
}

/** Last substantive review of the published legal text. */
const LAST_UPDATED = "11 August 2026";

export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getLegalPage(slug);

  // Unpublished pages do not exist publicly.
  if (!page || !page.published) notFound();

  const others = LEGAL_PAGES.filter((p) => p.published && p.slug !== page.slug);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: page.title, path: `/legal/${page.slug}` },
        ])}
      />

      <Container width="reading" className="pb-20 pt-10 sm:pb-28">
        <Breadcrumbs
          trail={[
            { name: "Home", path: "/" },
            { name: page.title, path: `/legal/${page.slug}` },
          ]}
        />

        <Eyebrow>Legal</Eyebrow>
        <h1 className="display mt-5 text-3xl sm:text-4xl">{page.title}</h1>
        <p className="meta mt-4">Last updated {LAST_UPDATED}</p>

        <Rule className="my-10" />

        <div className="prose-body">
          {page.slug === "privacy" ? <PrivacyContent /> : null}
          {page.slug === "terms" ? <TermsContent /> : null}
        </div>

        {others.length > 0 ? (
          <>
            <Rule className="my-12" />
            <h2 className="label mb-4">Related</h2>
            <ul className="space-y-2">
              {others.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/legal/${p.slug}`}
                    className="text-sm text-ink underline decoration-rule-strong underline-offset-4 hover:text-accent"
                  >
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        ) : null}

        <Rule className="my-12" />
        <p className="text-sm leading-relaxed text-ink-muted">
          Questions about this page can be sent through the{" "}
          <Link
            href="/contact"
            className="text-ink underline decoration-rule-strong underline-offset-4 hover:text-accent"
          >
            contact form
          </Link>
          . {SITE.name} operates from the United Kingdom and India.
        </p>
      </Container>
    </>
  );
}
