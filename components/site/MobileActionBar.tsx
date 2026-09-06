"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { WHATSAPP, getServiceWhatsAppHref } from "@/lib/site";

export function MobileActionBar() {
  const [territory, setTerritory] = useState<"uk" | "india">("uk");
  const pathname = usePathname();

  // Extract service slug if currently viewing a service page
  let serviceSlug: string | undefined;
  if (pathname.startsWith("/services/")) {
    const parts = pathname.replace("/services/", "").split("/");
    if (parts[0] === "cad" && parts[1]) {
      serviceSlug = "cad-technical-production";
    } else if (parts[0] === "growth" && parts[1]) {
      serviceSlug = "growth-marketing-b2b";
    } else if (parts[0] === "visualisation" && parts[1]) {
      serviceSlug = "visualisation-image-production";
    } else {
      serviceSlug = parts[0];
    }
  }

  const isUk = territory === "uk";
  const currentTel = isUk ? WHATSAPP.uk.tel : WHATSAPP.india.tel;
  const currentDisplayNumber = isUk ? WHATSAPP.uk.number : WHATSAPP.india.number;
  const currentWhatsAppHref = getServiceWhatsAppHref(serviceSlug, territory);

  return (
    <aside
      aria-label="Direct contact actions"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-rule bg-paper/95 backdrop-blur-md px-4 pt-2 pb-[max(0.625rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_-8px_rgba(0,0,0,0.12)] lg:hidden"
    >
      {/* Top region selector & trust signal */}
      <div className="mb-1.5 flex items-center justify-between px-1 text-[0.6875rem]">
        <span className="font-mono uppercase tracking-widest text-ink-muted">
          Direct Founder Access
        </span>
        <div className="flex items-center gap-1 font-mono">
          <button
            type="button"
            onClick={() => setTerritory("uk")}
            className={
              "rounded px-1.5 py-0.5 text-[0.625rem] tracking-wider transition-colors " +
              (isUk
                ? "bg-ink text-paper font-semibold"
                : "text-ink-muted hover:text-ink")
            }
            aria-label="Switch to UK contact line"
          >
            UK (+44)
          </button>
          <span className="text-rule-strong" aria-hidden="true">
            /
          </span>
          <button
            type="button"
            onClick={() => setTerritory("india")}
            className={
              "rounded px-1.5 py-0.5 text-[0.625rem] tracking-wider transition-colors " +
              (!isUk
                ? "bg-ink text-paper font-semibold"
                : "text-ink-muted hover:text-ink")
            }
            aria-label="Switch to India contact line"
          >
            IN (+91)
          </button>
        </div>
      </div>

      {/* Primary Action Buttons */}
      <div className="grid grid-cols-2 gap-2">
        <a
          href={currentTel}
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xs border border-rule-strong bg-surface px-3 text-xs font-semibold tracking-tight text-ink transition-colors active:bg-paper-deep"
          aria-label={`Call XIYÀTO ${isUk ? "UK" : "India"} directly at ${currentDisplayNumber}`}
        >
          <svg
            viewBox="0 0 24 24"
            width="15"
            height="15"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-ink-muted"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          <span>Call {isUk ? "UK" : "India"}</span>
        </a>

        <a
          href={currentWhatsAppHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xs bg-ink px-3 text-xs font-semibold tracking-tight text-paper transition-colors active:bg-accent"
          aria-label={`Message XIYÀTO on WhatsApp (${isUk ? "UK" : "India"})`}
        >
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="currentColor"
            className="text-emerald-400"
          >
            <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.275-.1-.475-.15-.676.15-.2.3-.777.978-.953 1.178-.175.2-.351.225-.652.075-.301-.15-1.272-.469-2.423-1.496-.895-.798-1.5-1.784-1.675-2.085-.176-.301-.019-.464.132-.614.135-.136.301-.351.452-.526.15-.176.201-.301.301-.502.1-.2.05-.376-.025-.526-.075-.15-.677-1.633-.927-2.235-.244-.587-.492-.507-.677-.517-.175-.009-.376-.01-.577-.01-.2 0-.526.075-.802.376-.276.301-1.053 1.028-1.053 2.508 0 1.48 1.078 2.91 1.228 3.11.151.2 2.122 3.24 5.141 4.545.718.31 1.279.495 1.716.634.721.23 1.377.197 1.896.12.578-.087 1.78-.727 2.031-1.43.25-.702.25-1.303.175-1.429-.075-.125-.276-.201-.577-.351zm-5.447 7.423c-1.849 0-3.66-.497-5.239-1.44l-.376-.226-3.896 1.022 1.04-3.799-.248-.395c-1.036-1.649-1.583-3.565-1.581-5.529.004-5.755 4.686-10.436 10.446-10.436 2.788 0 5.41 1.086 7.378 3.057 1.968 1.972 3.05 4.596 3.048 7.387-.004 5.757-4.687 10.439-10.448 10.449zm0-22c-6.417 0-11.638 5.221-11.641 11.64-.002 2.05.534 4.053 1.554 5.821l-1.65 6.027 6.168-1.618c1.706.93 3.633 1.42 5.566 1.422h.005c6.416 0 11.638-5.222 11.641-11.641.002-3.11-1.207-6.033-3.407-8.235-2.202-2.203-5.127-3.416-8.236-3.416z" />
          </svg>
          <span>WhatsApp</span>
        </a>
      </div>
    </aside>
  );
}
