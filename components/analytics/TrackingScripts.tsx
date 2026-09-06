"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    plausible?: (event: string, options?: { props?: Record<string, unknown> }) => void;
  }
}

/**
 * Universal Inbound Lead Attribution and Telemetry Component.
 * Passively observes commercial conversion interactions (WhatsApp clicks,
 * phone calls, mailto links) and logs structured telemetry for qualified lead attribution.
 */
export function TrackingScripts() {
  useEffect(() => {
    // 1. Capture and preserve inbound UTM parameters in sessionStorage
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
      const capturedUtm: Record<string, string> = {};

      utmKeys.forEach((key) => {
        const val = urlParams.get(key);
        if (val) capturedUtm[key] = val;
      });

      if (Object.keys(capturedUtm).length > 0) {
        sessionStorage.setItem("xiyato_inbound_utm", JSON.stringify(capturedUtm));
      }
    } catch {
      // Ignore storage restrictions
    }

    // 2. Global event delegation for conversion links
    const handleGlobalClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement)?.closest("a");
      if (!target) return;

      const href = target.getAttribute("href") || "";

      // A. WhatsApp Click Tracking
      if (href.includes("wa.me") || href.includes("whatsapp.com")) {
        const isIndia = href.includes("917028311226");
        const country = isIndia ? "india" : "uk";
        const serviceMatch = href.match(/discuss%20an?%20([^.]+)/i);
        const serviceContext = serviceMatch ? decodeURIComponent(serviceMatch[1]) : "general";

        const payload = {
          event: "inbound_whatsapp_click",
          country_target: country,
          service_context: serviceContext,
          page_path: window.location.pathname,
          timestamp: new Date().toISOString(),
        };

        if (window.dataLayer) window.dataLayer.push(payload);
        if (window.plausible) window.plausible("WhatsApp Click", { props: payload });
      }

      // B. Telephone Click Tracking
      if (href.startsWith("tel:")) {
        const phoneNumber = href.replace("tel:", "");
        const isIndia = phoneNumber.includes("91");
        const territory = isIndia ? "india" : "uk";

        const payload = {
          event: "inbound_telephone_click",
          phone_number: phoneNumber,
          territory,
          page_path: window.location.pathname,
          timestamp: new Date().toISOString(),
        };

        if (window.dataLayer) window.dataLayer.push(payload);
        if (window.plausible) window.plausible("Telephone Click", { props: payload });
      }

      // C. Email Click Tracking
      if (href.startsWith("mailto:")) {
        const email = href.replace("mailto:", "").split("?")[0];
        const payload = {
          event: "inbound_email_click",
          email_address: email,
          page_path: window.location.pathname,
          timestamp: new Date().toISOString(),
        };

        if (window.dataLayer) window.dataLayer.push(payload);
        if (window.plausible) window.plausible("Email Click", { props: payload });
      }
    };

    document.addEventListener("click", handleGlobalClick, { passive: true });
    return () => {
      document.removeEventListener("click", handleGlobalClick);
    };
  }, []);

  return null;
}
