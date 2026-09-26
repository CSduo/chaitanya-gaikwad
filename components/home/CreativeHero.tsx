import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/primitives";
import { HOME_COPY } from "@/lib/home-copy";
import { getServicePricing } from "@/lib/pricing";
import { VISUALS } from "@/lib/visuals";
import { allVideos } from "@/lib/portfolio";
import { WHATSAPP } from "@/lib/site";

const CREATIVE_SERVICES = [
  { slug: "visualisation-image-production", label: "3D renders" },
  { slug: "ai-video-production", label: "AI films" },
  { slug: "website-design-development", label: "Websites" },
] as const;

export function CreativeHero() {
  const render = getServicePricing(CREATIVE_SERVICES[0].slug)[0];
  return (
    <section className="creative-hero relative overflow-hidden bg-[#0c0e0e] text-white" aria-labelledby="hero-heading">
      <Container width="page" className="relative py-10 sm:py-14 lg:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.08fr] lg:gap-12">
          <div className="creative-hero-copy min-w-0">
            <Link href="/services/visualisation-image-production" className="relative block aspect-[16/9] overflow-hidden rounded-xs lg:hidden" aria-label="Explore the kitchen visualization collection">
              <Image src={VISUALS[0].src} alt={VISUALS[0].alt} fill loading="eager" fetchPriority="high" sizes="(min-width: 1024px) 1px, 100vw" className="object-cover" />
              <span className="absolute bottom-3 left-3 bg-black/60 px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-white">Kitchen study · Concept collection</span>
            </Link>
            <h1 id="hero-heading" className="display mt-6 max-w-xl text-[2.5rem] leading-[1.03] sm:text-[3.8rem] lg:text-[4.15rem]">
              {HOME_COPY.h1}
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-zinc-300">{HOME_COPY.standfirst}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={render.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-5 rounded-xs bg-white px-6 text-sm font-semibold text-zinc-950 transition-colors hover:bg-emerald-200">
                {render.cta}<span aria-hidden="true">↗</span>
              </a>
              <a href="#capabilities" className="inline-flex min-h-12 items-center justify-center gap-5 rounded-xs border border-white/25 px-6 text-sm text-white transition-colors hover:border-white hover:bg-white/5">
                Explore the work <span aria-hidden="true">↓</span>
              </a>
            </div>
            <div className="mt-9 grid grid-cols-3 gap-3 border-t border-white/15 pt-5">
              {CREATIVE_SERVICES.map(({ slug, label }) => {
                const price = getServicePricing(slug)[0];
                return <a key={slug} href={price.href} target="_blank" rel="noopener noreferrer" className="group min-w-0 rounded-xs py-1" aria-label={`${label}: ${price.label}. Enquire on WhatsApp.`}>
                  <span className="block text-xs text-zinc-300">{label} <span className="text-emerald-300" aria-hidden="true">↗</span></span>
                  <span className="mt-1 block text-[10px] text-zinc-400">Starting at</span>
                  <span className="block font-mono text-xl text-white group-hover:text-emerald-200">${price.amount}<span className="ml-1 text-[10px] text-zinc-400">/ {price.unit}</span></span>
                </a>;
              })}
            </div>
            <p className="mt-3 text-[11px] text-zinc-400">USD · Scope agreed before production.</p>
          </div>
          <div className="creative-hero-art relative hidden min-w-0 lg:block">
            <Link href="/services/visualisation-image-production" className="group relative block aspect-[4/4.1] overflow-hidden rounded-sm border border-white/15 sm:aspect-[5/4] lg:aspect-[4/4.8]" aria-label="Explore our 3D renders and architectural visualization portfolio">
              <Image src={VISUALS[0].src} alt={VISUALS[0].alt} fill loading="eager" fetchPriority="high" sizes="(min-width: 1280px) 560px, (min-width: 1024px) 48vw, 100vw" className="object-cover object-center transition-transform duration-700 motion-safe:group-hover:scale-[1.035]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/15" />
              <span className="absolute left-5 top-5 rounded-full border border-white/35 bg-black/35 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.13em] backdrop-blur-md">01 / Visualise</span>
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/75">Spaces worth believing in</p>
                <p className="display mt-2 max-w-xs text-3xl sm:text-4xl">Make the unbuilt<br />unforgettable.</p>
                <p className="mt-3 flex items-center justify-between gap-3 text-xs text-white/85"><span>Kitchen study · Concept collection</span><span className="text-2xl" aria-hidden="true">↗</span></p>
              </div>
            </Link>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <a href="#service-ai-video-production" className="group flex min-h-[74px] items-center gap-3 border border-white/15 bg-white/[0.035] p-3 transition-colors hover:border-white/40">
                <span className="relative block h-12 w-14 shrink-0 overflow-hidden"><Image src="/media/posters/kozena-luxury-furniture-campaign-poster.webp" alt="" fill sizes="56px" className="object-cover" /><span className="absolute inset-0 flex items-center justify-center bg-black/20 text-white" aria-hidden="true">▷</span></span>
                <span><span className="block font-mono text-[9px] uppercase tracking-widest text-zinc-400">02 / Film</span><span className="block text-xs text-white sm:text-sm">Turn heads. Move people.</span></span>
              </a>
              <a href="#service-website-design-development" className="group flex min-h-[74px] items-center gap-3 border border-white/15 bg-white/[0.035] p-3 transition-colors hover:border-white/40">
                <span aria-hidden="true" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xs border border-emerald-300/30 bg-emerald-300/5 font-mono text-xl text-emerald-200">↗</span>
                <span><span className="block font-mono text-[9px] uppercase tracking-widest text-zinc-400">03 / Build</span><span className="block text-xs text-white sm:text-sm">A better first impression.</span></span>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-t border-white/15 pt-5 text-xs text-zinc-300 lg:mt-12">
          <p>Agency-grade assets. <span className="text-white">Indie-friendly rates.</span></p>
          <p className="font-mono text-[10px] tracking-wide">{VISUALS.length} visual studies & renders <span className="mx-2 text-zinc-600">/</span> {allVideos().length} commercial films</p>
          <a href={WHATSAPP.uk.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-8 items-center gap-2 hover:text-white">UK + India · Talk to the studio <span aria-hidden="true">↗</span></a>
        </div>
      </Container>
    </section>
  );
}
