"use client";

import { useEffect } from "react";
import { trackEvent, type AnalyticsEventName, type AnalyticsParams } from "@/lib/analytics";

/**
 * Universal Inbound Lead Attribution and Telemetry Component.
 * Observes commercial conversion interactions (WhatsApp clicks,
 * phone calls, email links, LinkedIn profile clicks, form milestones)
 * and sends them through trackEvent(): Vercel Web Analytics custom events
 * (cookieless) and, only after analytics consent, GA4 via gtag.
 * See lib/analytics.ts and the privacy policy.
 */
export function TrackingScripts() {
  useEffect(() => {
    // Sanitisation helper for URL parameters and referrers to prevent PII leakage and injection
    const sanitizeParam = (val: string | null, maxLen = 100): string | null => {
      if (!val) return null;
      const trimmed = val.trim();
      if (trimmed.length === 0 || trimmed.length > maxLen) return null;
      // Reject email-like patterns
      if (trimmed.includes("@")) return null;
      // Reject phone number patterns (sequences of 7+ digits)
      if (/\+?[0-9]{7,}/.test(trimmed)) return null;
      // Whitelist safe characters: alphanumeric, dashes, underscores, dots
      if (!/^[a-zA-Z0-9_.-]+$/.test(trimmed)) return null;
      return trimmed;
    };

    const sanitizeReferrer = (ref: string | null): string => {
      if (!ref) return "direct";
      try {
        const parsed = new URL(ref);
        // Retain only origin and clean pathname, strip all query parameters and hash
        return parsed.origin + parsed.pathname.slice(0, 80);
      } catch {
        return "external";
      }
    };

    // 1. Capture and preserve sanitised inbound UTM parameters and landing page in sessionStorage
    try {
      if (typeof window !== "undefined" && window.sessionStorage) {
        if (!sessionStorage.getItem("xiyato_initial_landing")) {
          sessionStorage.setItem("xiyato_initial_landing", window.location.pathname.slice(0, 100));
        }
        if (!sessionStorage.getItem("xiyato_initial_referrer") && document.referrer) {
          sessionStorage.setItem("xiyato_initial_referrer", sanitizeReferrer(document.referrer));
        }

        const urlParams = new URLSearchParams(window.location.search);
        const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
        const capturedUtm: Record<string, string> = {};

        utmKeys.forEach((key) => {
          const val = sanitizeParam(urlParams.get(key));
          if (val) capturedUtm[key] = val;
        });

        if (Object.keys(capturedUtm).length > 0) {
          sessionStorage.setItem("xiyato_inbound_utm", JSON.stringify(capturedUtm));
        }
      }
    } catch {
      // Storage access restricted or disabled — fail gracefully
    }

    const getAttributionContext = () => {
      try {
        const storedUtm = sessionStorage.getItem("xiyato_inbound_utm");
        const utm = storedUtm ? JSON.parse(storedUtm) : {};
        return {
          landing_page: sessionStorage.getItem("xiyato_initial_landing") || window.location.pathname,
          referrer: sessionStorage.getItem("xiyato_initial_referrer") || sanitizeReferrer(document.referrer),
          ...utm,
        };
      } catch {
        return {
          landing_page: window.location.pathname,
          referrer: sanitizeReferrer(document.referrer),
        };
      }
    };

    /*
      GA4 receives the attribution context plus the event's own parameters.
      Vercel receives only the page and one detail value: its custom-event
      property allowance is small, so the most useful dimension is kept.
    */
    const dispatchEvent = (eventName: AnalyticsEventName, payload: AnalyticsParams, detail?: string) => {
      trackEvent(
        eventName,
        { ...getAttributionContext(), ...payload },
        { page: window.location.pathname.slice(0, 100), ...(detail ? { detail: detail.slice(0, 100) } : {}) },
      );
    };

    // 2. Global event delegation for conversion links
    const handleGlobalClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement)?.closest("a, button");
      if (!target) return;

      const href = target.getAttribute("href") || "";

      // A. WhatsApp Click Tracking
      if (href.includes("wa.me") || href.includes("whatsapp.com")) {
        const isIndia = href.includes("917028311226");
        const country = isIndia ? "india" : "uk";
        const serviceMatch = href.match(/discuss%20an?%20([^.]+)/i);
        const serviceContext = serviceMatch ? decodeURIComponent(serviceMatch[1]) : "general";

        dispatchEvent("inbound_whatsapp_click", {
          country_target: country,
          service_context: serviceContext,
          page_path: window.location.pathname,
        }, `${country}: ${serviceContext}`);
      }

      // B. Telephone Click Tracking
      if (href.startsWith("tel:")) {
        const phoneNumber = href.replace("tel:", "");
        const isIndia = phoneNumber.startsWith("+91");
        const territory = isIndia ? "india" : "uk";

        dispatchEvent("inbound_telephone_click", {
          territory,
          page_path: window.location.pathname,
        }, territory);
      }

      // C. Email Click Tracking — categorical only, zero recipient PII
      if (href.startsWith("mailto:")) {
        dispatchEvent("inbound_email_click", {
          contact_channel: "email",
          page_path: window.location.pathname,
        });
      }

      // D. LinkedIn External Click Tracking
      if (href.includes("linkedin.com")) {
        dispatchEvent("linkedin_click", {
          destination: "linkedin_profile",
          page_path: window.location.pathname,
        });
      }

      // E. External Portfolio / Client Link Tracking
      if (
        href.startsWith("http") &&
        !href.includes("xiyato.uk") &&
        !href.includes("wa.me") &&
        !href.includes("linkedin.com")
      ) {
        let destinationHost = "external";
        try {
          destinationHost = new URL(href).hostname;
        } catch {
          // Keep the generic label for malformed URLs.
        }
        dispatchEvent("external_portfolio_click", {
          destination: "external_showcase",
          destination_host: destinationHost,
          page_path: window.location.pathname,
        }, destinationHost);
      }

      // F. Service CTA Internal Clicks
      if (
        href === "/contact" ||
        href.startsWith("/contact?") ||
        target.getAttribute("data-track") === "service_cta"
      ) {
        const ctaLabel = (target.textContent?.trim() || "contact_cta").slice(0, 100);
        dispatchEvent("service_cta_click", {
          cta_label: ctaLabel,
          page_path: window.location.pathname,
        }, ctaLabel);
      }
    };

    // 3. Form interaction telemetry
    const handleFormFocus = (event: FocusEvent) => {
      const target = event.target as HTMLElement;
      const form = target?.closest("form");
      if (form && !form.getAttribute("data-started")) {
        form.setAttribute("data-started", "true");
        dispatchEvent("project_form_start", {
          form_id: form.id || "project_contact_form",
          page_path: window.location.pathname,
        }, form.id || "project_contact_form");
      }
    };

    const handleFormSubmit = (event: SubmitEvent) => {
      const form = event.target as HTMLFormElement;
      if (form) {
        // Dispatched as an initial inbound enquiry; downstream CRM qualifies the lead
        dispatchEvent("inbound_enquiry", {
          form_id: form.id || "project_contact_form",
          enquiry_stage: "new_enquiry",
          page_path: window.location.pathname,
        }, form.id || "project_contact_form");
      }
    };

    document.addEventListener("click", handleGlobalClick, { passive: true });
    document.addEventListener("focusin", handleFormFocus, { passive: true });
    document.addEventListener("submit", handleFormSubmit, { passive: true });

    return () => {
      document.removeEventListener("click", handleGlobalClick);
      document.removeEventListener("focusin", handleFormFocus);
      document.removeEventListener("submit", handleFormSubmit);
    };
  }, []);

  return null;
}
