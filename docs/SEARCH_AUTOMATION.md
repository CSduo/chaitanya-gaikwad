# Search discovery and SEO checks

Every `npm run build`, including Vercel production builds, automatically audits each sitemap page for a unique title and description, one primary heading, a matching canonical, indexability, document language, mobile viewport, valid JSON-LD syntax and a sitemap `lastmod`. Across every prerendered page it also fails on internal links to URLs that `next.config.ts` redirects, references to `/media` files that do not exist, and noindexed routes (such as `/work/research/*`) that lost their noindex. A failed audit stops the build. This is a technical audit, not a ranking score or rich-result eligibility test.

The **SEO health and search discovery** workflow adds checks for pull requests, successful deployments and a weekly schedule. Its installation source is `docs/workflows/seo.yml`; it must also exist at `.github/workflows/seo.yml` to run. The local Git token cannot publish workflow files without the `workflow` permission. If the active workflow is absent, an authorized repository administrator must install that file using an account with workflow write access. The build audit remains active independently of GitHub Actions.

After Vercel reports a successful **Production** deployment of the current `main` commit, a second job checks the public pages and robots.txt before notifying search engines. Preview and failed deployments never submit URLs. Run the workflow manually on `main` to retry a production check or submission. If the hosting integration does not emit production deployment events to GitHub, run it manually until that integration is enabled.

Every Monday at 06:00 UTC the same workflow performs a read-only production audit to catch issues between releases. Scheduled checks do not resubmit unchanged URLs. GitHub reports failures through the repository's Actions checks and notification settings.

## Google: one-time account connection

The sitemap is always available at <https://xiyato.uk/sitemap.xml> and declared in robots.txt, so Google can discover it without credentials. Direct Google submission is **skipped until the following setup is complete**:

1. In a Google Cloud project, enable the **Google Search Console API** and create a service account.
2. In the verified Search Console property `sc-domain:xiyato.uk`, add that service account's email with **Full** access. A URL-prefix property `https://xiyato.uk/` can also be used.
3. Store the service account JSON as the GitHub repository Actions secret **GOOGLE_SEARCH_CONSOLE_CREDENTIALS**. Never commit it or paste it into logs. Rotate keys through Google Cloud when needed.
4. If using the URL-prefix property, set the Actions repository variable **GOOGLE_SEARCH_CONSOLE_PROPERTY** to `https://xiyato.uk/`. Otherwise leave it unset for the domain property.
5. Run **SEO health and search discovery → Run workflow** on `main`. A successful Google step says the sitemap was accepted; missing credentials explicitly produce a skipped message.

The Google step exchanges a signed service-account assertion for a short-lived token and calls the supported Search Console `sitemaps.submit` API. It does not use the retired sitemap ping endpoint or the Indexing API, which is not intended for ordinary service pages. IndexNow is a separate notification for participating engines such as Bing; it does not submit to Google.

## Content updates and countries

The sitemap automatically follows the existing service, sub-service and case-study catalogs. The `/work/research/*` workbook pages are live but `noindex, follow` and deliberately excluded. Visualization images are included on their canonical gallery page.

`lastmod` comes from `data/content-dates.json`, which `npm run content:dates` (`scripts/generate-content-dates.mjs`) derives from complete Git history: each route group's date is the latest commit touching its main-content sources (page file plus the data it renders; site-wide header, footer and layout changes are excluded). The file is committed because Vercel builds from a shallow clone where Git dates cannot be trusted, which is why production previously emitted no `lastmod` at all. Nothing is ever dated with the build time. Shared data files can update several related pages together.

Workflow after a content change: commit the change, then run `npm run content:dates` and commit `data/content-dates.json`. The build audit fails if any sitemap URL lacks `lastmod`; the CI step `npm run content:dates:check` warns when the file is older than Git history.

Existing UK, India, UAE, Saudi Arabia and Qatar service information stays factual. The existing service pages and Middle East research page carry the relevant service and market content. No country doorway pages, invented offices, translated-page annotations without translated pages, or keyword stuffing are generated. Search Console analytics is currently unavailable until the interactive connector is reconnected; review actual query/country performance before expanding content for a new market. Reconnecting that connector does not configure the separate GitHub service-account secret.

Submissions help discovery; Google controls crawling, indexing and rankings. Neither sitemap acceptance nor a passing audit guarantees placement or clicks.

## Local commands

- `npm run build` builds and checks generated HTML without a browser.
- `npm run seo:audit:live` checks the public production pages using HTTP requests.
- `npm run submit:google` submits only when credentials are configured.
- `npm run submit:indexnow -- --dry-run` previews the Bing/IndexNow URL list.

Official references: [Google sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), [Search Console sitemap submission](https://developers.google.com/webmaster-tools/v1/sitemaps/submit), [service-account authentication](https://developers.google.com/identity/protocols/oauth2/service-account).
