/**
 * Measurement configuration and the single event dispatcher.
 *
 * Two layers, both described in the privacy policy (/legal/privacy):
 *  1. Vercel Web Analytics + Speed Insights: cookieless, aggregated, always on.
 *  2. Google Analytics 4: only when NEXT_PUBLIC_GA_MEASUREMENT_ID is set at
 *     build time, and gtag.js is only loaded after the visitor accepts
 *     analytics cookies in the consent banner (Consent Mode v2, all signals
 *     denied by default; acceptance grants analytics_storage only).
 */
import { track } from "@vercel/analytics";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (command: string, ...args: unknown[]) => void;
  }
}

const RAW_GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() ?? "";

/** A GA4 measurement ID, or null when GA4 is not configured (or malformed). */
export const GA_MEASUREMENT_ID: string | null = /^G-[A-Z0-9]{4,20}$/.test(RAW_GA_ID) ? RAW_GA_ID : null;

export const CONSENT_STORAGE_KEY = "xiyato-analytics-consent";
export const CONSENT_CHANGE_EVENT = "xiyato:consent-change";
export const CONSENT_OPEN_EVENT = "xiyato:consent-open";

export type ConsentStatus = "granted" | "denied";

export type AnalyticsParams = Record<string, string | number | boolean | null | undefined>;

/**
 * Conversion events emitted by TrackingScripts. Mark inbound_whatsapp_click
 * and inbound_enquiry as key events in GA4.
 */
export type AnalyticsEventName =
  | "inbound_whatsapp_click"
  | "inbound_telephone_click"
  | "inbound_email_click"
  | "linkedin_click"
  | "external_portfolio_click"
  | "service_cta_click"
  | "project_form_start"
  | "inbound_enquiry";

/**
 * Sends one event to every configured destination.
 *  - Vercel: at most two short properties (custom-event property limits are
 *    small and plan-dependent; custom events need a Vercel Pro plan).
 *  - GA4: the full parameter set, only if gtag.js was loaded after consent.
 */
export function trackEvent(name: AnalyticsEventName, params: AnalyticsParams, vercel: AnalyticsParams = {}) {
  try {
    track(name, vercel);
  } catch {
    // Analytics must never break the page.
  }
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", name, params);
  }
}

/** Removes query parameters other than utm_* before a URL is reported. */
export function redactUrl(url: string): string {
  try {
    const parsed = new URL(url);
    for (const key of [...parsed.searchParams.keys()]) {
      if (!key.startsWith("utm_")) parsed.searchParams.delete(key);
    }
    parsed.hash = "";
    return parsed.toString();
  } catch {
    return url;
  }
}
