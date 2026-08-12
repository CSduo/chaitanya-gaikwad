import { Container, Section, Eyebrow } from "@/components/ui/primitives";
import { ConstructionRing } from "@/components/brand/decorations";
import { COMPANY_SECTIONS } from "@/lib/company-copy";

/**
 * The Company narrative, rendered as labelled chapters.
 *
 * Long-form on desktop, scannable on a phone: each chapter leads with its own
 * eyebrow and heading, paragraphs stay short, and the supporting points break
 * the prose up rather than extending it. Section tone alternates white / grey
 * so the page reads as chapters instead of one continuous wall.
 */
export function CompanyNarrative() {
  return (
    <>
      {COMPANY_SECTIONS.map((s, i) => {
        const grey = i % 2 === 1;
        return (
          <Section key={s.key} tone={grey ? "surface" : undefined} bordered>
            <Container width="page">
              <div className="deco-host grid gap-8 lg:grid-cols-12 lg:gap-16">
                {i === 0 ? (
                  <ConstructionRing
                    className="deco deco-desktop -right-24 -top-40 h-[26rem] w-[26rem] text-rule"
                    opacity={0.45}
                  />
                ) : null}

                <div className="lg:col-span-4">
                  <Eyebrow>{s.eyebrow}</Eyebrow>
                  <h2 className="display mt-4 text-[1.625rem] leading-[1.15] sm:mt-5 sm:text-[1.875rem] lg:text-3xl">
                    {s.heading}
                  </h2>
                </div>

                <div className="lg:col-span-8">
                  <div className="prose-body max-w-2xl">
                    {s.paragraphs.map((p) => (
                      <p key={p.slice(0, 40)}>{p}</p>
                    ))}
                  </div>

                  {s.points && s.points.length > 0 ? (
                    <dl className="mt-9 grid gap-px border border-rule bg-rule sm:mt-10 sm:grid-cols-2">
                      {s.points.map((pt) => (
                        <div key={pt.title} className={grey ? "bg-surface p-6" : "bg-paper p-6"}>
                          <dt className="text-sm font-semibold tracking-tight text-ink">
                            {pt.title}
                          </dt>
                          <dd className="mt-2 text-sm leading-relaxed text-ink-muted">
                            {pt.body}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  ) : null}
                </div>
              </div>
            </Container>
          </Section>
        );
      })}
    </>
  );
}
