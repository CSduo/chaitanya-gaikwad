# Original User Request

## Initial Request — 2026-08-27T17:30:14+05:30

Redesign and elevate the XIYÀTO homepage landing experience into an ultra-premium, interactive editorial showcase:
1. R1: Mobile Horizontal Service Slideshow & Navigation (#capabilities horizontal swipeable carousel with snapping, 01/06 counter, clean responsive desktop grid).
2. R2: Compact Expandable Lead Intelligence Panel for Growth & B2B (region tabs: India, Middle East, Philippines, China, instant metric counters, expandable interactive drawer/modal for previewing data rows and sheet structures, <350px collapsed height).
3. R3: CAD Interactive Drafting Rail & Sheet Viewer (horizontal scrollable blueprint rail, sticky/featured drawing stage, zoom/inspection without vertical sprawl).
4. R4: Bespoke Thematic Atmosphere & Styling Per Discipline (distinct luxury editorial palettes: Technical Drafting Slate for CAD, Research Dossier for Growth, Obsidian Black for Video, Titanium Gallery for 3D Visualisation, Tech Clean for Web & Automation).
5. Ensure tactile feedback, seamless lightbox viewers, CLS < 0.05, 60fps scrolling, and a clean build (npm run build) with 0 errors.

## 2026-09-10T11:32:31Z

Establish an exhaustive, technically sound, and production-grade Bing/Microsoft search engine infrastructure for XIYÀTO (https://xiyato.uk/), inheriting existing Google Search Console assets, auditing crawlability, implementing and verifying IndexNow, enriching Schema.org entity understanding for Bing and Microsoft Copilot GEO discovery, and compiling a comprehensive evidence-based audit report.

Working directory: C:\Users\ADMIN\.gemini\antigravity\scratch\chaitanya-gaikwad
Integrity mode: development

## Requirements

### R1. Bing Webmaster Tools Integration & Inheritance
Import all legitimate properties, sitemaps, and configurations from Google Search Console into Bing Webmaster Tools. Verify ownership and canonical domain recognition. For any settings or assets that cannot be imported directly, independently reconstruct and configure them. Prompt the user only when external OAuth consent, Google/Microsoft account login, or 2FA is strictly necessary.

### R2. IndexNow Protocol Audit & Crawl Automation
Verify and audit the site's IndexNow engine (`/api/indexnow`). Ensure the key verification file (`https://xiyato.uk/{key}.txt`), domain validation, payload boundaries (max 20 URLs), and upstream submission to `api.indexnow.org` operate with fail-closed security. Verify live pinging and status response codes (HTTP 200/202) for important canonical URLs.

### R3. Technical Crawlability, Sitemaps & Robots Directives
Audit `robots.ts` / `robots.txt` and `sitemap.ts` / `sitemap.xml`. Ensure all indexable routes (core, services, case studies, research dossiers, and published legal pages) are discoverable and canonical, with genuine `<lastmod>` timestamps. Ensure Bingbot can discover, fetch, render, and index all high-priority pages without blocking.

### R4. Structured Data, Entity Graph & GEO (AI Search) Retrievability
Audit and enhance Schema.org structured data across the site (`Organization`, `WebSite`, `WebPage`, `Service`, `CreativeWork`). Ensure AI-powered search engines (Bing Copilot, ChatGPT, Perplexity) can unambiguously extract:
1. What XIYÀTO is (High-end CAD drafting, 3D architectural visualisation, video, B2B intelligence, custom web development).
2. Who services are intended for (Architectural practices, interior studios, developers, luxury brands).
3. Canonical contact channels (UK: +44 7882 746212, India: +91 70283 11226, hello@xiyato.uk).
Do not fabricate founders, addresses, ratings, reviews, or social links.

### R5. Search Intelligence Baseline & Deliverable Report
Conduct Bing keyword intelligence across commercial and service search intents (CAD drafting, AutoCAD outsourcing UK, interior joinery drawings, architectural 3D rendering). Record Bing backlink baseline metrics. Synthesize all findings and verified implementations into `XIYATO_BING_SEARCH_INFRASTRUCTURE_REPORT.md`.

## Acceptance Criteria

### Infrastructure & Sitemaps
- [ ] Bing Webmaster Tools ownership of `https://xiyato.uk` is verified and documented.
- [ ] Primary sitemap (`https://xiyato.uk/sitemap.xml`) is registered and validated with zero fatal processing errors.
- [ ] `robots.txt` explicitly allows Bingbot to crawl all indexable assets while blocking private endpoints.

### IndexNow Verification
- [ ] IndexNow key file is accessible at root (`/{key}.txt`) and matches `INDEXNOW_KEY`.
- [ ] `/api/indexnow` validates domain origin strictly against canonical `xiyato.uk` hosts.
- [ ] Programmatic submission test to `https://api.indexnow.org/indexnow` returns HTTP 200 or 202.

### Codebase & Technical Quality
- [ ] All 154+ automated tests pass (`npm test`).
- [ ] TypeScript compilation succeeds with 0 errors (`npm run typecheck`).
- [ ] Production build succeeds for all 37 routes (`npm run build`).

### Deliverable Report
- [ ] `XIYATO_BING_SEARCH_INFRASTRUCTURE_REPORT.md` is generated in repository root covering:
  - Executive Summary & GSC Import status
  - Sitemap & IndexNow verification
  - Issues Discovered categorized by P0 / P1 / P2 / P3
  - Codebase fixes executed
  - Bing Keyword & Backlink baselines
  - Google vs. Bing search environment differences
  - Action matrices: Now, Next 30 Days, Later, and Human Actions Required
