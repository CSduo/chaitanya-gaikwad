import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/primitives";
import { ArchitecturalHeroBackground } from "@/components/brand/decorations";
import { HOME_COPY } from "@/lib/home-copy";
import { getServicePricing } from "@/lib/pricing";
import { VISUALS } from "@/lib/visuals";
import { WHATSAPP } from "@/lib/site";

const FEATURED_SERVICES = [
  { slug: "visualisation-image-production", label: "3D renders" },
  { slug: "ai-video-production", label: "AI films" },
  { slug: "website-design-development", label: "Websites" },
] as const;

export function CreativeHero() {
  const artwork = VISUALS.find((visual) => visual.group === "artwork") ?? VISUALS[1];

  return (
    <section className="creative-hero deco-host border-b border-zinc-800 bg-black text-white" aria-labelledby="hero-heading">
      <ArchitecturalHeroBackground />
      <Container width="page" className="py-9 sm:py-12 lg:py-16">
        <div className="grid items-center gap-7 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-14">
          <div className="creative-hero-copy min-w-0">
            <p className="mb-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-300">
              <span className="h-px w-7 shrink-0 bg-white/60" aria-hidden="true" /> XIYÀTO · Independent multidisciplinary studio
            </p>
            <h1 id="hero-heading" className="display max-w-xl text-[clamp(2.35rem,5vw,4.25rem)] leading-[1.04]">{HOME_COPY.h1}</h1>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-zinc-300 sm:text-base">{HOME_COPY.standfirst}</p>
            <div className="mt-6 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-3">
              <a href="#capabilities" className="inline-flex min-h-12 items-center justify-center gap-3 bg-white px-4 text-xs font-semibold text-black transition-colors hover:bg-zinc-200 sm:px-6 sm:text-sm">
                Explore six services <span aria-hidden="true">↓</span>
              </a>
              <a href={WHATSAPP.uk.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-3 border border-white/35 bg-black/30 px-4 text-xs text-white transition-colors hover:border-white hover:bg-white/10 sm:px-6 sm:text-sm">
                Discuss your project <span aria-hidden="true">↗</span>
              </a>
            </div>
            <p className="mt-4 text-[11px] text-zinc-400">UK & India · Projects and ongoing production support</p>
          </div>

          <figure className="creative-hero-art min-w-0 border border-white/25 bg-black/65 p-2 shadow-[0_24px_70px_#0006] sm:p-3">
            <Link href="/services/visualisation-image-production" className="group relative block aspect-[16/10] overflow-hidden lg:aspect-[5/4]" aria-label="Explore the kitchen visualization collection">
              <Image src={VISUALS[0].src} alt={VISUALS[0].alt} fill loading="eager" fetchPriority="high" sizes="(min-width: 1280px) 480px, (min-width: 1024px) 44vw, 90vw" className="object-cover transition-transform duration-700 motion-safe:group-hover:scale-[1.025]" />
              <span className="absolute left-3 top-3 border border-white/40 bg-black/50 px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-white">01 / Visualisation</span>
            </Link>
            <figcaption className="flex min-w-0 items-center gap-4 pt-3">
              <div className="min-w-0 flex-1 pl-1">
                <p className="font-mono text-[9px] uppercase tracking-widest text-zinc-400">Selected studio studies</p>
                <p className="display mt-1 text-lg sm:text-2xl">Interiors, objects & artwork.</p>
                <p className="mt-1 text-[10px] text-zinc-400">Kitchen & art concepts · Explore the collection</p>
              </div>
              <Link href="/services/visualisation-image-production#gallery" className="relative block h-16 w-20 shrink-0 overflow-hidden border border-white/20 sm:h-20 sm:w-24" aria-label="Explore the artwork collection">
                <Image src={artwork.src} alt={artwork.alt} fill sizes="96px" className="object-cover" />
              </Link>
            </figcaption>
          </figure>
        </div>

        <div className="mt-7 grid grid-cols-3 gap-4 border-t border-white/20 pt-5 sm:mt-9 lg:grid-cols-[1fr_1fr_1fr_1.35fr]">
          {FEATURED_SERVICES.map(({ slug, label }) => {
            const price = getServicePricing(slug)[0];
            return <a key={slug} href={price.href} target="_blank" rel="noopener noreferrer" className="group min-w-0" aria-label={label + ": " + price.label + ". Enquire on WhatsApp."}>
              <span className="block text-[11px] text-zinc-300">{label} <span aria-hidden="true">↗</span></span>
              <span className="mt-1 block text-[9px] text-zinc-400">Starting at</span>
              <span className="font-mono text-xl text-white sm:text-2xl">${price.amount}<span className="ml-1 text-[10px] text-zinc-400">/ {price.unit}</span></span>
            </a>;
          })}
          <p className="hidden self-center border-l border-white/20 pl-6 text-xs leading-relaxed text-zinc-300 lg:block">A defined brief. A clear quote.<br /><span className="text-white">Work delivered ready to use.</span><span className="mt-1 block text-[10px] text-zinc-500">USD · Final scope agreed before production.</span></p>
        </div>
      </Container>
    </section>
  );
}
