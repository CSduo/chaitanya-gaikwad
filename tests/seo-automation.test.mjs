import assert from "node:assert/strict";
import { test } from "node:test";
import { generateKeyPairSync } from "node:crypto";
import { inspectPage, sitemapUrls } from "../scripts/seo-audit.ts";
import { submitGoogleSitemap } from "../scripts/submit-google-sitemap.ts";

const html = '<html lang="en-GB"><head><title>Interior renders</title><meta name="description" content="Interior and furniture rendering services."><meta name="viewport" content="width=device-width"><meta name="robots" content="index,follow"><link rel="canonical" href="https://xiyato.uk/"></head><body><h1>Interior renders</h1><script type="application/ld+json">{"@type":"Organization"}</script></body></html>';

test("audit catches crawl-blocking directives, incorrect canonicals and malformed structured data", () => {
  assert.deepEqual(inspectPage(html, "https://xiyato.uk/").errors, []);
  assert.match(inspectPage(html, "https://xiyato.uk/contact").errors.join(), /canonical/);
  assert.match(inspectPage(html, "https://xiyato.uk/", "googlebot: noindex").errors.join(), /noindex/);
  assert.match(inspectPage(html.replace('"index,follow"', '"none"'), "https://xiyato.uk/").errors.join(), /noindex/);
  assert.match(inspectPage(html.replace('{"@type":"Organization"}', "{broken}"), "https://xiyato.uk/").errors.join(), /JSON-LD/);
});

test("image sitemap entries are not mistaken for page URLs", () => {
  assert.deepEqual(sitemapUrls('<url><loc>https://xiyato.uk/</loc><image:image><image:loc>https://xiyato.uk/render.webp</image:loc></image:image></url>'), ["https://xiyato.uk/"]);
});

test("Google submission safely skips without credentials and uses the supported sitemap endpoint when configured", async () => {
  assert.equal(await submitGoogleSitemap({}, () => { throw new Error("Unexpected network request"); }), "skipped");
  const { privateKey } = generateKeyPairSync("rsa", { modulusLength: 2048 });
  const env = { GOOGLE_SEARCH_CONSOLE_CREDENTIALS: JSON.stringify({ client_email: "test@example.invalid", private_key: privateKey.export({ type: "pkcs8", format: "pem" }) }) };
  const calls = [];
  const fetchMock = async (url, options) => {
    calls.push({ url, options });
    return calls.length === 1 ? new Response(JSON.stringify({ access_token: "test-token" }), { status: 200 }) : new Response(null, { status: 204 });
  };
  assert.equal(await submitGoogleSitemap(env, fetchMock), "submitted");
  assert.equal(calls[0].url, "https://oauth2.googleapis.com/token");
  assert.equal(calls[1].options.method, "PUT");
  assert.equal(calls[1].url, "https://www.googleapis.com/webmasters/v3/sites/sc-domain%3Axiyato.uk/sitemaps/https%3A%2F%2Fxiyato.uk%2Fsitemap.xml");
  await assert.rejects(submitGoogleSitemap(env, async () => new Response(null, { status: 403 })), /authentication failed/);
  await assert.rejects(submitGoogleSitemap({ ...env, GOOGLE_SEARCH_CONSOLE_PROPERTY: "sc-domain:other.example" }, fetchMock), /canonical/);
});
