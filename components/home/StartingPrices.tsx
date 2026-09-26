import Link from "next/link";
import { Container } from "@/components/ui/primitives";
import { PRICING_TIERS, PRICING_NOTE } from "@/lib/pricing";

export function StartingPrices() {
  return <section id="pricing" aria-labelledby="pricing-heading" className="scroll-mt-20 border-t border-rule bg-paper-deep py-16 sm:py-20">
    <Container width="page">
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div className="max-w-xl"><p className="label">Clear starting points</p><h2 id="pricing-heading" className="display mt-4 text-4xl sm:text-5xl">Big ideas.<br />An easier first yes.</h2></div>
        <p className="max-w-sm text-sm leading-relaxed text-ink-muted">Win attention with better visuals. Give your sales team a sharper shortlist. Free up time with connected workflows. Start with one useful deliverable.</p>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PRICING_TIERS.map((price) => <article key={price.id} className="group flex flex-col border border-rule bg-white p-6 transition-[border-color,box-shadow] duration-300 hover:border-ink/30 hover:shadow-lg hover:shadow-black/5 sm:p-7">
          <h3 className="text-base font-semibold text-ink">{price.name}</h3>
          <p className="mt-6 text-xs text-ink-muted">Starting at</p>
          <p className="mt-1 font-mono text-4xl tracking-tight text-ink">${price.amount}{price.unit ? <span className="ml-2 text-xs tracking-normal text-ink-muted">/ {price.unit}</span> : null}</p>
          <p className="mb-7 mt-4 text-sm leading-relaxed text-ink-muted">{price.note}</p>
          <a href={price.href} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex min-h-11 items-center justify-between gap-3 border-t border-rule pt-4 text-sm font-semibold text-ink transition-colors hover:text-accent"><span>{price.cta}</span><span aria-hidden="true">↗</span></a>
        </article>)}
      </div>
      <div className="mt-6 flex flex-col justify-between gap-4 sm:flex-row"><p className="max-w-2xl text-xs leading-relaxed text-ink-muted">{PRICING_NOTE}</p><Link href="/services/cad-technical-production" className="shrink-0 text-xs text-ink underline underline-offset-4">CAD packages: request a scoped quote →</Link></div>
    </Container>
  </section>;
}
