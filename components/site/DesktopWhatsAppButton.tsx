"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getServiceWhatsAppHref } from "@/lib/site";

/** Service slug for the current page, so the WhatsApp message names the service. */
function serviceForPath(pathname: string): string | undefined {
  if (pathname.startsWith("/hire-a-cad-drafter")) return "cad-technical-production";
  if (pathname.startsWith("/hire-a-3d-visualiser") || pathname.startsWith("/guides/")) return "visualisation-image-production";
  if (!pathname.startsWith("/services/")) return undefined;
  const [first, second] = pathname.replace("/services/", "").split("/");
  if (first === "cad" && second) return "cad-technical-production";
  if (first === "growth" && second) return "growth-marketing-b2b";
  if (first === "visualisation" && second) return "visualisation-image-production";
  return first;
}

/**
 * Floating WhatsApp button for desktop (the mobile action bar covers phones).
 * Appears once the visitor has scrolled past the first screen.
 */
export function DesktopWhatsAppButton() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname.startsWith("/contact")) return null;

  return (
    <a
      href={getServiceWhatsAppHref(serviceForPath(pathname))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Message XIYÀTO on WhatsApp"
      className={`fixed bottom-6 right-6 z-40 hidden items-center gap-2.5 rounded-full bg-[#1f7a4d] py-3 pl-4 pr-5 text-sm font-semibold text-white shadow-[0_18px_40px_-14px_rgba(0,0,0,0.55)] transition-all duration-300 hover:bg-[#17603c] lg:inline-flex ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
        <path d="M12 2a10 10 0 0 0-8.66 15l-1.3 4.76 4.88-1.28A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-2.9.76.78-2.83-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.56.12-.16.25-.64.8-.79.97-.14.16-.29.18-.54.06a6.7 6.7 0 0 1-3.32-2.9c-.25-.43.25-.4.71-1.33a.45.45 0 0 0-.02-.43c-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.41-.56-.42h-.48a.92.92 0 0 0-.66.31 2.78 2.78 0 0 0-.87 2.07 4.83 4.83 0 0 0 1 2.56 11.05 11.05 0 0 0 4.24 3.74c1.58.68 2.2.74 2.99.62.48-.07 1.46-.6 1.67-1.18.2-.58.2-1.08.14-1.18-.06-.1-.22-.16-.47-.28Z" />
      </svg>
      Message us on WhatsApp
    </a>
  );
}
