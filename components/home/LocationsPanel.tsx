"use client";

import { useInView, useReducedMotion } from "./hooks";
import { WHATSAPP } from "@/lib/site";

export function LocationsPanel({
  locations,
}: {
  locations: { slug: string; name: string; summary: string; timezone?: string }[];
}) {
  const { ref, inView } = useInView<HTMLDivElement>("-15% 0px");
  const reduced = useReducedMotion();
  const on = inView || reduced;

  return (
    <div ref={ref} className="relative overflow-hidden py-14 sm:py-20">
      {/* Section Header */}
      <div className="mx-auto max-w-2xl text-center px-4">
        <p className="label">Dual-Hub Collaboration</p>
        <h2 className="display mt-3 text-2xl sm:text-3xl lg:text-4xl text-ink">
          Working directly across UK &amp; India.
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">
          Continuous production and seamless client communication scheduled across UK, European, Middle Eastern, and Asian working hours.
        </p>
      </div>

      {/* Direct Connection Bridge Visualization */}
      <div className="relative mx-auto mt-12 max-w-4xl px-4">
        {/* Straight Connection Line (Desktop) */}
        <div className="hidden sm:flex items-center justify-between relative mb-6 px-12">
          <div className="h-3 w-3 rounded-full bg-ink ring-4 ring-paper-deep shrink-0" />
          <div className="relative flex-1 mx-4">
            <div className="h-[2px] w-full bg-rule-strong/70" />
            <div
              className="absolute inset-y-0 left-0 bg-accent transition-all duration-1000 ease-out"
              style={{ width: on ? "100%" : "0%" }}
            />
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-rule bg-paper px-3 py-0.5 shadow-2xs">
              <span className="font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-ink font-semibold whitespace-nowrap">
                Direct Production Bridge · Real-Time Handover
              </span>
            </div>
          </div>
          <div className="h-3 w-3 rounded-full bg-accent ring-4 ring-paper-deep shrink-0" />
        </div>

        {/* Dual Location Cards */}
        <div className="grid gap-4 sm:grid-cols-2">
          {locations.map((loc, i) => {
            const isUk = loc.slug === "united-kingdom";
            const wa = isUk ? WHATSAPP.uk : WHATSAPP.india;
            const tz = isUk ? "GMT / BST · London" : "IST (UTC+5:30) · Mumbai & Pune";
            const focus = isUk
              ? "Client consultation, creative direction & project scoping"
              : "Technical drafting, 3D visualization & research systems";

            return (
              <div
                key={loc.slug}
                className="relative flex flex-col justify-between rounded-xl border border-rule bg-surface p-6 sm:p-7 shadow-2xs transition-all hover:border-ink/50 hover:bg-paper-deep"
                style={{
                  opacity: on ? 1 : 0,
                  transform: on ? "translateY(0)" : "translateY(12px)",
                  transition: reduced ? "none" : `all 500ms ease ${200 + i * 150}ms`,
                }}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-accent">
                      {isUk ? "Primary Hub 01" : "Production Hub 02"}
                    </span>
                    <span className="rounded-full border border-rule bg-paper px-2.5 py-0.5 font-mono text-[0.5625rem] text-ink-muted">
                      {tz}
                    </span>
                  </div>

                  <h3 className="display mt-3 text-2xl text-ink">{loc.name}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-ink-muted">{loc.summary}</p>

                  <div className="mt-4 rounded-md border border-rule/60 bg-paper/60 p-3">
                    <span className="block font-mono text-[0.5625rem] uppercase tracking-[0.12em] text-ink-faint">
                      Operational Focus
                    </span>
                    <span className="mt-0.5 block text-xs font-medium text-ink-soft">
                      {focus}
                    </span>
                  </div>
                </div>

                <div className="mt-6 border-t border-rule/60 pt-4">
                  <a
                    href={wa.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex w-full items-center justify-between rounded-md border border-rule bg-paper px-4 py-2.5 text-xs text-ink transition-colors hover:border-ink/70 hover:bg-paper-deep"
                  >
                    <div className="flex items-center gap-2.5">
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" className="text-ink">
                        <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.275-.1-.475-.15-.676.15-.2.3-.777.978-.953 1.178-.175.2-.351.225-.652.075-.301-.15-1.272-.469-2.423-1.496-.895-.798-1.5-1.784-1.675-2.085-.176-.301-.019-.464.132-.614.135-.136.301-.351.452-.526.15-.176.201-.301.301-.502.1-.2.05-.376-.025-.526-.075-.15-.677-1.633-.927-2.235-.244-.587-.492-.507-.677-.517-.175-.009-.376-.01-.577-.01-.2 0-.526.075-.802.376-.276.301-1.053 1.028-1.053 2.508 0 1.48 1.078 2.91 1.228 3.11.151.2 2.122 3.24 5.141 4.545.718.31 1.279.495 1.716.634.721.23 1.377.197 1.896.12.578-.087 1.78-.727 2.031-1.43.25-.702.25-1.303.175-1.429-.075-.125-.276-.201-.577-.351zm-5.447 7.423c-1.849 0-3.66-.497-5.239-1.44l-.376-.226-3.896 1.022 1.04-3.799-.248-.395c-1.036-1.649-1.583-3.565-1.581-5.529.004-5.755 4.686-10.436 10.446-10.436 2.788 0 5.41 1.086 7.378 3.057 1.968 1.972 3.05 4.596 3.048 7.387-.004 5.757-4.687 10.439-10.448 10.449zm0-22c-6.417 0-11.638 5.221-11.641 11.64-.002 2.05.534 4.053 1.554 5.821l-1.65 6.027 6.168-1.618c1.706.93 3.633 1.42 5.566 1.422h.005c6.416 0 11.638-5.222 11.641-11.641.002-3.11-1.207-6.033-3.407-8.235-2.202-2.203-5.127-3.416-8.236-3.416z" />
                      </svg>
                      <span className="font-semibold text-ink group-hover:text-accent">
                        {wa.number}
                      </span>
                    </div>
                    <span className="text-ink-muted transition-transform group-hover:translate-x-0.5 group-hover:text-ink">
                      &#8599;
                    </span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
