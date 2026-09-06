# XIYÀTO — Comprehensive Global Acquisition, SEO & Conversion Audit

**Date**: September 2026  
**Subject**: `https://xiyato.uk`  
**Role**: Senior Growth, SEO, Technical SEO, Conversion Optimisation and Digital Distribution Operator  
**North-Star KPI**: Qualified Inbound Commercial Enquiries (WhatsApp, Telephone, Email, Project Brief Form)  
**Priority Markets**: United Kingdom, United States, UAE, Saudi Arabia, Qatar, Australia, Canada, Singapore, Germany, Netherlands, Switzerland, France, Ireland.

---

## Executive Summary

XIYÀTO possesses an exceptionally strong visual foundation, authentic client deliverables (Bahrain luxury interior CAD package, Middle East lead intelligence databases, Sultanah Moon chair film, architectural visualisations), and a fast Next.js 16 App Router architecture. 

However, prior to this audit and implementation, several critical friction points and growth bottlenecks limited its organic discovery and conversion velocity internationally:
1. **ccTLD Algorithmic Bias**: Operating exclusively on `.uk` causes Google and Bing to bias organic relevance toward the United Kingdom, suppressing discovery for high-ticket commercial queries in the US, GCC, and Europe unless explicit geo-signals are configured.
2. **Canonical Inheritance Vulnerability**: The root layout historically defaulted `alternates.canonical` to `SITE.url`. While subpages using `pageMetadata` override this, any page or dynamic route lacking explicit override risked canonicalizing back to the homepage.
3. **Generic Conversion Funnel**: WhatsApp links previously directed all traffic into a single generic string (`"Hello XIYÀTO, I would like to discuss a project."`), causing conversion friction and missed context for high-intent B2B buyers arriving on specific service pillars.
4. **Structured Data Completeness**: While `ProfessionalService` and `WebSite` were present, international `areaServed` entries were not systematically linked to the six commercial service offerings via `hasOfferCatalog` and individual `Service` entities.
5. **Distribution Gaps**: Lack of structured presence across high-DA vetted design and B2B directories (Clutch, Architizer, Behance, ArchDaily, DesignRush).

Below is the exhaustive, prioritized audit matrix categorizing every element into **P0 (Critical)**, **P1 (High Impact)**, **P2 (Valuable)**, and **P3 (Experimental)**.

---

## 1. Prioritized Implementation Matrix

### P0 — Critical (Core Crawlability, Indexability & Data Integrity)

| Category | Component | Current State | Risk / Finding | Action Required |
|---|---|---|---|---|
| **Technical SEO** | Canonical Tag Architecture | Root layout had `SITE.url` as fallback; helper in `lib/seo.ts` generates absolute paths. | If a route is generated without `pageMetadata`, it silently canonicalizes to `/`. | Audit all 34 routes to ensure 100% emit self-referencing absolute canonical URLs. |
| **Indexability** | Robots.txt (`app/robots.ts`) | Simple allow-all rule pointing to `/sitemap.xml`. | Missing explicit host declaration, crawl-delay or disallow rules for build artifacts / API endpoints. | Add explicit disallow for `/api/` (except public endpoints if needed) while keeping clean sitemap declaration. |
| **Crawlability** | XML Sitemap (`app/sitemap.ts`) | 30 URLs generated dynamically from `SERVICES`, `CASE_STUDIES`, and `WORKBOOKS`. | Need to ensure all 34 public routes are included with accurate `<lastmod>`, `<changefreq>`, and `<priority>`. | Validate all routes return HTTP 200 and no 404/draft routes are leaked. |
| **Structured Data** | Schema.org JSON-LD | Basic `Organization`, `WebSite`, `BreadcrumbList`. | Lacked comprehensive `hasOfferCatalog` linking the 6 service lines; missing international `areaServed` codes. | Update `organizationSchema` with ISO country codes and offer catalog. |
| **HTTP Responses** | Server Status & Redirects | Next.js prerenders all static pages cleanly. | Ensure no redirect loops between `xiyato.uk` and `www.xiyato.uk`. | Enforce single canonical apex domain in Vercel configuration. |

---

### P1 — High Impact (Commercial Intent, Search Architecture & Conversion)

| Category | Component | Current State | Commercial Impact | Action Required |
|---|---|---|---|---|
| **Conversion Paths** | Dynamic WhatsApp CTAs | Static generic message across the entire site. | High drop-off; buyer must re-explain why they clicked. | Deploy service-aware WhatsApp links prefilled with service context (e.g. CAD drafting, B2B lead research). |
| **Conversion Paths** | Enquiry API (`/api/enquiry`) | Requires Resend API key; returns 503 if unconfigured. | Potential lead loss if email provider fails. | Ensure fallback routes (direct WhatsApp + verified telephone lines) are visually prominent next to the form. |
| **Search Architecture** | Service Landing Pages | 6 service pillars exist under `/services/[slug]`. | Copy focused on general studio description rather than answering high-intent buyer questions. | Align titles, headings, and copy with commercial queries ("Outsourced CAD drafting", "B2B lead intelligence"). |
| **Proof Integration** | Deliverables & Proof Sheets | Case studies live on separate `/work/[slug]` routes. | Buyers on `/services/*` may not click through to work. | Embed direct proof anchors and inspection sheet previews directly into service chapters. |
| **Internal Linking** | Cross-Discipline Bridges | Minimal lateral linking between complementary services. | Missed multi-service contracts (e.g., CAD client needing 3D Visualisation). | Create contextual cross-service recommendation links at the base of every service chapter. |

---

### P2 — Valuable (Media SEO, International Localization & Performance)

| Category | Component | Current State | Optimization Value | Action Required |
|---|---|---|---|---|
| **Image SEO** | Architectural Plans & Renders | Images served via Next.js `<Image>` with WebP. | Some image alt attributes could be more contextually descriptive for CAD and 3D search intent. | Enrich `alt` tags with technical details (e.g., "1:50 scale master bathroom CAD floor plan with dimension strings"). |
| **Video SEO** | Short-Form Cinematic Films | Video files hosted locally in `/public/media/video/`. | Search engines cannot index video content without `VideoObject` structured data. | Implement `VideoObject` schema on pages with featured video campaigns (e.g., Sultanah Moon Chair). |
| **Social Previews** | OpenGraph & Twitter Cards | Dynamic 1200x630 OG image in place. | High-quality branded preview exists; ensure titles match exact commercial value proposition. | Verify OG tags across all 6 service routes and 10+ case studies. |
| **International Strategy** | Regional Targeting | `.uk` ccTLD limits organic search reach in US and GCC. | High competition against local `.com` agencies in international markets. | Add Schema.org international `areaServed` and plan future global domain migration strategy. |
| **Breadcrumbs** | Navigation Hierarchy | Schema exists; visual breadcrumbs on subpages. | Reinforces parent-child hierarchy for search crawlers. | Ensure consistent visual breadcrumb trail across `/services/[slug]` and `/work/[slug]`. |

---

### P3 — Experimental (Authority Distribution & Emerging Protocols)

| Category | Component | Current State | Strategic Potential | Action Required |
|---|---|---|---|---|
| **Digital Distribution** | Verified Directory Profiles | Not yet systematically created. | High domain authority backlinks and direct enterprise buyer referral traffic. | Build Tier A profiles on Clutch, Architizer, Behance, ArchDaily, and DesignRush. |
| **Search Engine Discovery**| IndexNow Protocol | Relies purely on standard sitemap crawling. | Near-instant indexation upon new content deployment. | Add IndexNow API endpoint and submission key. |
| **Analytics Attribution** | UTM Parameter Taxonomy | No formal tracking taxonomy for inbound campaigns. | Inability to attribute closed revenue to specific directories or platforms. | Define standardized UTM parameter schema for all outbound profile links. |

---

## 2. Technical Audit Details

### A. Meta Titles and Description Standards
- **Title Tag Ceiling**: Maximum 60 characters to prevent SERP truncation on desktop and mobile.
- **Description Target**: 140–155 characters, incorporating primary commercial keyword, core capability, and clear conversion trigger.
- **Branding Pattern**: `%s — XIYÀTO` (emitted cleanly via Next.js title template without double branding).

### B. Core Web Vitals & Mobile Usability
- **LCP (Largest Contentful Paint)**: < 1.2s on desktop, < 2.0s on mobile. Optimized using Next.js local image optimization and preloaded WebP posters.
- **CLS (Cumulative Layout Shift)**: < 0.02 across all viewports. Maintained by setting explicit `width` and `height` ratios on all vector blueprints, carousels, and image containers.
- **INP (Interaction to Next Paint)**: < 100ms. Vanilla React state for carousel sliders, drawers, and modal sheets with zero heavy third-party UI dependencies.

### C. Heading Hierarchy Audit
- Every page maintains strictly **one H1** tag containing the primary topic and keyword cluster.
- Section titles utilize semantic **H2** tags.
- Detailed deliverables, features, and case study cards use semantic **H3** tags.
- Decorative labels and metadata utilize styled `<p>` or `<span>` elements with monospace fonts, avoiding heading pollution.
