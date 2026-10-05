"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import {
  CONSENT_CHANGE_EVENT,
  CONSENT_OPEN_EVENT,
  CONSENT_STORAGE_KEY,
  GA_MEASUREMENT_ID,
  redactUrl,
  type ConsentStatus,
} from "@/lib/analytics";

/* ------------------------------------------------------------------ */
/* Consent store (localStorage, versioned)                             */
/* ------------------------------------------------------------------ */

const CONSENT_VERSION = 1;

function readConsent(): ConsentStatus | null {
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { v?: number; status?: string };
    if (parsed.v !== CONSENT_VERSION) return null;
    return parsed.status === "granted" || parsed.status === "denied" ? parsed.status : null;
  } catch {
    return null;
  }
}

function writeConsent(status: ConsentStatus) {
  try {
    window.localStorage.setItem(
      CONSENT_STORAGE_KEY,
      JSON.stringify({ v: CONSENT_VERSION, status, at: new Date().toISOString() }),
    );
  } catch {
    // Storage blocked: the choice still applies for this page view.
  }
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGE_EVENT, { detail: status }));
}

function subscribe(onChange: () => void) {
  window.addEventListener(CONSENT_CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CONSENT_CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/** "unknown" during SSR and before hydration, so nothing flashes. */
function useConsent(): ConsentStatus | null | "unknown" {
  return useSyncExternalStore(subscribe, readConsent, () => "unknown" as const);
}

/** Withdraws consent: tells gtag (if loaded) and clears GA cookies. */
function revokeGoogleAnalytics() {
  window.gtag?.("consent", "update", { analytics_storage: "denied" });
  const host = window.location.hostname;
  const domains = ["", host, `.${host}`, `.${host.split(".").slice(-2).join(".")}`];
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0]?.trim();
    if (!name || !/^_ga(_|$)/.test(name)) continue;
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ""}`;
    }
  }
}

/* ------------------------------------------------------------------ */
/* Google Analytics 4 (loaded only after consent)                      */
/* ------------------------------------------------------------------ */

function GoogleAnalytics({ id }: { id: string }) {
  return (
    <>
      <Script id="ga4-consent-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;
gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
gtag('set','ads_data_redaction',true);
gtag('consent','update',{analytics_storage:'granted'});
gtag('js',new Date());
gtag('config','${id}');`}
      </Script>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Consent banner                                                      */
/* ------------------------------------------------------------------ */

function ConsentBanner({ onChoose, autoFocus }: { onChoose: (status: ConsentStatus) => void; autoFocus: boolean }) {
  const acceptRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (autoFocus) acceptRef.current?.focus();
  }, [autoFocus]);

  return (
    <section
      role="region"
      aria-labelledby="consent-title"
      aria-describedby="consent-body"
      className="fixed inset-x-3 bottom-28 z-50 mx-auto max-w-xl border border-rule bg-paper p-5 text-ink shadow-[0_12px_32px_-12px_rgba(0,0,0,0.35)] sm:inset-x-6 lg:bottom-6"
    >
      <h2 id="consent-title" className="text-sm font-semibold tracking-tight">
        Analytics cookies
      </h2>
      <p id="consent-body" className="mt-2 text-xs leading-relaxed text-ink-soft">
        May we use Google Analytics cookies to understand which pages and enquiry routes are useful?
        They are only set if you accept. Cookieless, aggregated visit statistics run either way.{" "}
        <Link href="/legal/privacy#analytics" className="underline decoration-rule-strong underline-offset-4 hover:text-accent">
          Privacy policy
        </Link>
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          ref={acceptRef}
          type="button"
          onClick={() => onChoose("granted")}
          className="inline-flex min-h-[44px] items-center justify-center rounded-xs border border-ink bg-ink px-5 text-xs font-medium text-paper transition-colors hover:bg-accent hover:border-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Accept analytics
        </button>
        <button
          type="button"
          onClick={() => onChoose("denied")}
          className="inline-flex min-h-[44px] items-center justify-center rounded-xs border border-ink bg-paper px-5 text-xs font-medium text-ink transition-colors hover:bg-paper-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Decline
        </button>
      </div>
    </section>
  );
}

/** Footer control that reopens the consent banner. Renders nothing without GA4. */
export function ConsentSettingsButton({ className }: { className?: string }) {
  if (!GA_MEASUREMENT_ID) return null;
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(CONSENT_OPEN_EVENT))}
      className={className}
    >
      Cookie settings
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Root component                                                      */
/* ------------------------------------------------------------------ */

export function SiteAnalytics() {
  const consent = useConsent();
  const [reopened, setReopened] = useState(false);

  useEffect(() => {
    const open = () => setReopened(true);
    window.addEventListener(CONSENT_OPEN_EVENT, open);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, open);
  }, []);

  const choose = useCallback((status: ConsentStatus) => {
    if (status === "denied") revokeGoogleAnalytics();
    writeConsent(status);
    setReopened(false);
  }, []);

  const showBanner = Boolean(GA_MEASUREMENT_ID) && consent !== "unknown" && (consent === null || reopened);

  return (
    <>
      {/* Cookieless and aggregated; query strings other than utm_* are dropped. */}
      <Analytics beforeSend={(event) => ({ ...event, url: redactUrl(event.url) })} />
      <SpeedInsights beforeSend={(event) => ({ ...event, url: redactUrl(event.url) })} />
      {GA_MEASUREMENT_ID && consent === "granted" ? <GoogleAnalytics id={GA_MEASUREMENT_ID} /> : null}
      {showBanner ? <ConsentBanner onChoose={choose} autoFocus={reopened} /> : null}
    </>
  );
}
