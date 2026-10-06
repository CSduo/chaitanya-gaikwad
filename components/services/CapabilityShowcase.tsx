import Image from "next/image";
import type { ShowcaseGraphic, ShowcaseVisual } from "@/lib/service-visuals";

type Group = { title: string; intro?: string; items: string[] };

/**
 * Capability groups as alternating visual rows: an image from the service's
 * own portfolio (or a designed graphic where there is none), the group's
 * paragraph, and its items as compact tags rather than a long bullet list.
 */
export function CapabilityShowcase({
  groups,
  visuals,
  graphic = "grid",
}: {
  groups: Group[];
  visuals: ShowcaseVisual[];
  graphic?: ShowcaseGraphic;
}) {
  return (
    <div className="mt-12 space-y-12 lg:space-y-16">
      {groups.map((group, index) => {
        const visual = visuals.length ? visuals[index % visuals.length] : null;
        const flip = index % 2 === 1;
        return (
          <article key={group.title}>
            <div className="grid items-center gap-6 lg:grid-cols-12 lg:gap-12">
              <div className={`min-w-0 lg:col-span-5 ${flip ? "lg:order-2" : ""}`}>
                {visual ? <VisualPanel visual={visual} /> : <GraphicPanel variant={graphic} index={index} title={group.title} />}
              </div>
              <div className={`min-w-0 lg:col-span-7 ${flip ? "lg:order-1" : ""}`}>
                <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-accent">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="display mt-2 text-[1.625rem] leading-[1.1] text-ink sm:text-[2rem]">{group.title}</h3>
                {group.intro ? (
                  <p className="mt-3 max-w-xl text-[0.9375rem] leading-relaxed text-ink-soft">{group.intro}</p>
                ) : null}
              </div>
            </div>
            {/* All points in one horizontal band: a grid on larger screens, a swipe row on phones. */}
            <ul
              aria-label={`${group.title}: what is included`}
              className="mt-5 flex snap-x snap-mandatory gap-2.5 overflow-x-auto rounded-sm border border-rule bg-paper-deep p-3 sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-3"
            >
              {group.items.map((item) => (
                <li
                  key={item}
                  className="flex min-w-[15.5rem] snap-start items-start gap-2.5 rounded-xs border border-rule bg-paper px-3 py-2.5 text-[0.8125rem] leading-snug text-ink-soft sm:min-w-0"
                >
                  <span aria-hidden="true" className="mt-[0.4rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span className="min-w-0">{item}</span>
                </li>
              ))}
            </ul>
          </article>
        );
      })}
    </div>
  );
}

function VisualPanel({ visual }: { visual: ShowcaseVisual }) {
  return (
    <figure
      className={`group relative aspect-[16/10] overflow-hidden rounded-sm shadow-[0_24px_60px_-30px_rgba(0,0,0,0.45)] ${
        visual.fit === "contain" ? "border border-rule bg-white" : "bg-paper-deep"
      }`}
    >
      <Image
        src={visual.src}
        alt={visual.alt}
        fill
        sizes="(min-width: 1024px) 560px, 92vw"
        className={`transition-transform duration-700 motion-safe:group-hover:scale-[1.03] ${
          visual.fit === "contain" ? "object-contain p-5 sm:p-8" : "object-cover"
        } ${visual.position === "top" ? "object-top" : ""}`}
      />
      <figcaption className="absolute left-4 top-4 rounded-full border border-white/30 bg-black/45 px-3 py-1 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-white backdrop-blur-sm">
        {visual.label}
      </figcaption>
    </figure>
  );
}

/** A drawn panel in the site's blueprint language for services without photography. */
function GraphicPanel({ variant, index, title }: { variant: ShowcaseGraphic; index: number; title: string }) {
  return (
    <div
      role="img"
      aria-label={`${title}: illustration`}
      className="relative aspect-[16/10] overflow-hidden rounded-sm bg-[#111111] text-zinc-100 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.6)]"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <span className="absolute left-5 top-4 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-zinc-400">
        {String(index + 1).padStart(2, "0")} / {title}
      </span>
      <div className="absolute inset-x-6 bottom-6 top-12 sm:inset-x-10 sm:bottom-10 sm:top-16">
        {variant === "data" ? <DataSketch seed={index} /> : variant === "flow" ? <FlowSketch seed={index} /> : <GridSketch />}
      </div>
    </div>
  );
}

function DataSketch({ seed }: { seed: number }) {
  const widths = [72, 54, 88, 63, 47, 80, 58];
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xs border border-white/15 bg-white/[0.03]">
      <div className="grid grid-cols-4 gap-2 border-b border-white/15 px-3 py-2.5">
        {["Company", "Role", "Market", "Status"].map((h) => (
          <span key={h} className="font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-zinc-400">{h}</span>
        ))}
      </div>
      <div className="flex flex-1 flex-col justify-around px-3 py-2">
        {Array.from({ length: 6 }, (_, r) => (
          <div key={r} className="grid grid-cols-4 items-center gap-2">
            {Array.from({ length: 4 }, (_, c) => (
              <span
                key={c}
                className={`h-1.5 rounded-full ${c === 3 ? "bg-[#d24b45]/80" : "bg-white/25"}`}
                style={{ width: `${widths[(r * 4 + c + seed) % widths.length]}%` }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function FlowSketch({ seed }: { seed: number }) {
  const labels = [
    ["Enquiry", "Qualify", "Route", "Follow-up"],
    ["Source", "Clean", "Merge", "Report"],
    ["Trigger", "Draft", "Review", "Send"],
    ["Collect", "Sort", "Assign", "Notify"],
  ][seed % 4];
  return (
    <div className="flex h-full items-center">
      <ol className="grid w-full grid-cols-4 items-center gap-2 sm:gap-3">
        {labels.map((label, i) => (
          <li key={label} className="relative flex flex-col items-center gap-2">
            <span className={`flex h-11 w-11 items-center justify-center rounded-full border ${i === labels.length - 1 ? "border-[#d24b45] bg-[#d24b45]/20" : "border-white/30 bg-white/[0.04]"} font-mono text-xs text-zinc-200 sm:h-14 sm:w-14`}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-center font-mono text-[0.5625rem] uppercase tracking-[0.12em] text-zinc-400 sm:text-[0.625rem]">{label}</span>
            {i < labels.length - 1 ? (
              <span aria-hidden="true" className="absolute left-[calc(50%+1.6rem)] top-5 hidden h-px w-[calc(100%-3.2rem)] bg-white/30 sm:top-7 sm:block" />
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}

function GridSketch() {
  return (
    <svg viewBox="0 0 400 260" className="h-full w-full" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1.2" aria-hidden="true">
      <rect x="20" y="20" width="360" height="220" />
      <line x1="150" y1="20" x2="150" y2="240" />
      <line x1="150" y1="120" x2="380" y2="120" />
      <line x1="270" y1="120" x2="270" y2="240" />
      <circle cx="85" cy="130" r="38" stroke="#d24b45" />
      <path d="M20 250 H380 M20 246 V254 M380 246 V254" stroke="rgba(255,255,255,0.3)" />
    </svg>
  );
}
