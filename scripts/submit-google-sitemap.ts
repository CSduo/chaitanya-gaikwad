import { createSign } from "node:crypto";
import { appendFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { SITE } from "../lib/site";

export async function submitGoogleSitemap(env = process.env, request: typeof fetch = fetch) {
  const summarize = (message: string) => {
    console.log(message);
    if (env.GITHUB_STEP_SUMMARY) appendFileSync(env.GITHUB_STEP_SUMMARY, `${message}\n\n`);
  };
  if (!env.GOOGLE_SEARCH_CONSOLE_CREDENTIALS) {
    summarize("Google sitemap submission skipped: GOOGLE_SEARCH_CONSOLE_CREDENTIALS is not configured. Sitemap discovery through robots.txt remains available. See docs/SEARCH_AUTOMATION.md for setup.");
    return "skipped";
  }
  const credentials = JSON.parse(env.GOOGLE_SEARCH_CONSOLE_CREDENTIALS) as { client_email?: string; private_key?: string };
  if (!credentials.client_email || !credentials.private_key) throw new Error("Search Console credentials require client_email and private_key.");
  const property = env.GOOGLE_SEARCH_CONSOLE_PROPERTY || "sc-domain:xiyato.uk";
  if (!["sc-domain:xiyato.uk", `${SITE.url}/`].includes(property)) throw new Error("Search Console property must match the canonical XIYATO site.");
  const now = Math.floor(Date.now() / 1000);
  const encode = (value: object) => Buffer.from(JSON.stringify(value)).toString("base64url");
  const unsigned = `${encode({ alg: "RS256", typ: "JWT" })}.${encode({ iss: credentials.client_email, scope: "https://www.googleapis.com/auth/webmasters", aud: "https://oauth2.googleapis.com/token", iat: now, exp: now + 3600 })}`;
  const signature = createSign("RSA-SHA256").update(unsigned).sign(credentials.private_key, "base64url");
  const auth = await request("https://oauth2.googleapis.com/token", {
    method: "POST", signal: AbortSignal.timeout(20_000),
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${unsigned}.${signature}` }),
  });
  if (!auth.ok) throw new Error(`Google authentication failed (HTTP ${auth.status}); check service-account configuration.`);
  const token = await auth.json() as { access_token?: string };
  if (!token.access_token) throw new Error("Google did not return an access token.");
  const response = await request(`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(property)}/sitemaps/${encodeURIComponent(`${SITE.url}/sitemap.xml`)}`, {
    method: "PUT", signal: AbortSignal.timeout(20_000), headers: { Authorization: `Bearer ${token.access_token}` },
  });
  if (!response.ok) throw new Error(`Google sitemap submission failed (HTTP ${response.status}); verify property access and API enablement.`);
  summarize("Google accepted the sitemap submission. Crawling, indexing and rankings remain Google's decision.");
  return "submitted";
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  submitGoogleSitemap().catch(() => { console.error("Google sitemap submission failed. Check the configured service account, Search Console access and API availability; credentials are not logged."); process.exitCode = 1; });
}
