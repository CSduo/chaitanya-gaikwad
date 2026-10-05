import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync } from "node:fs";

/*
  Measurement contract (see lib/analytics.ts and /legal/privacy#analytics):
  cookieless Vercel analytics always; GA4 only when configured AND accepted,
  with Consent Mode v2 defaults denied. The privacy policy must describe
  exactly what is implemented.
*/

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("GA4 is not configured unless NEXT_PUBLIC_GA_MEASUREMENT_ID holds a valid G- ID", async () => {
  const { GA_MEASUREMENT_ID } = await import("../lib/analytics.ts");
  if (!process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) assert.equal(GA_MEASUREMENT_ID, null);
  else assert.match(GA_MEASUREMENT_ID ?? "", /^G-[A-Z0-9]+$/);
});

test("trackEvent forwards conversions to gtag only when gtag exists", async () => {
  const { trackEvent } = await import("../lib/analytics.ts");
  const calls = [];
  const previous = globalThis.window;
  try {
    globalThis.window = { gtag: (...args) => calls.push(args), location: { pathname: "/" } };
    trackEvent("inbound_whatsapp_click", { country_target: "uk", page_path: "/" }, { page: "/" });
    assert.deepEqual(calls, [["event", "inbound_whatsapp_click", { country_target: "uk", page_path: "/" }]]);
    globalThis.window = { location: { pathname: "/" } };
    assert.doesNotThrow(() => trackEvent("inbound_enquiry", { form_id: "x" }));
  } finally {
    globalThis.window = previous;
  }
});

test("reported URLs keep utm_* parameters only", async () => {
  const { redactUrl } = await import("../lib/analytics.ts");
  assert.equal(
    redactUrl("https://xiyato.uk/contact?service=cad&email=a%40b.c&utm_source=linkedin#form"),
    "https://xiyato.uk/contact?utm_source=linkedin",
  );
});

test("gtag loads only after consent, with Consent Mode v2 defaults denied", () => {
  const source = read("components/analytics/SiteAnalytics.tsx");
  assert.match(source, /analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'/);
  assert.match(source, /GA_MEASUREMENT_ID && consent === "granted" \? <GoogleAnalytics/);
  // Accepting grants analytics only; advertising signals are never granted.
  assert.doesNotMatch(source, /ad_storage:'granted'|ad_user_data:'granted'|ad_personalization:'granted'/);
  assert.match(source, /Accept analytics/);
  assert.match(source, /Decline/);
});

test("withdrawing consent stops an already-loaded gtag, and a renewed grant restores it", () => {
  const source = read("components/analytics/SiteAnalytics.tsx");
  // Google's opt-out flag stops every hit (Consent Mode alone still sends cookieless pings).
  assert.match(source, /`ga-disable-\$\{GA_MEASUREMENT_ID\}`\] = status === "denied"/);
  assert.match(source, /window\.gtag\?\.\("consent", "update", \{ analytics_storage: status \}\)/);
  // Applied whenever the stored choice changes (this tab or another), not only on the banner.
  assert.match(source, /if \(consent === "granted" \|\| consent === "denied"\) syncGoogleAnalytics\(consent\)/);
  // Withdrawal still clears the _ga cookies.
  assert.match(source, /function revokeGoogleAnalytics\(\) \{\s+syncGoogleAnalytics\("denied"\);[\s\S]*?Max-Age=0/);
});

test("conversion telemetry no longer pushes raw objects into dataLayer or a never-loaded Plausible", () => {
  const source = read("components/analytics/TrackingScripts.tsx");
  assert.doesNotMatch(source, /dataLayer\.push|plausible/);
  assert.match(source, /trackEvent\(/);
  for (const event of ["inbound_whatsapp_click", "inbound_telephone_click", "inbound_email_click", "service_cta_click", "project_form_start", "inbound_enquiry"]) {
    assert.ok(source.includes(`"${event}"`), `missing ${event}`);
  }
});

test("the privacy policy describes the analytics that are actually implemented", () => {
  const policy = read("app/legal/[slug]/content.tsx");
  for (const phrase of ["Vercel Web Analytics", "Speed Insights", "Google Analytics", "_ga", "xiyato-analytics-consent", "Cookie settings", "ad_personalization", 'id="analytics"']) {
    assert.ok(policy.includes(phrase), `privacy policy should mention ${phrase}`);
  }
  assert.doesNotMatch(policy, /runs no analytics/i);
});
