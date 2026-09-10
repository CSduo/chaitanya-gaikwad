# Project: XIYÀTO Bing & Microsoft Search Engine Infrastructure

## Architecture
- **Framework & Runtime**: Next.js 16.3.0 (App Router, Node.js runtime, React 19.2.8, TypeScript 5.9)
- **Canonical Domain**: `https://xiyato.uk`
- **Verification Subsystem**: Dual-anchored domain verification:
  - Primary: Google Search Console OAuth API import into Bing Webmaster Tools (backed by Vercel DNS TXT `google-site-verification=IjQduuSOmYJmgmhyNk6YA2rpWUe2b5uaPPdpGb-fLFs`)
  - Secondary: Native Bing verification token (`msvalidate.01`) in `app/layout.tsx` and static `public/BingSiteAuth.xml`
- **IndexNow Engine Subsystem**:
  - Route: `app/api/indexnow/route.ts` (POST handler, timing-safe auth via `INDEXNOW_SECRET`, strict canonical domain validation against `xiyato.uk`, payload capped at 20 URLs, proper upstream error status propagation)
  - Key Verification: Static key file `public/{key}.txt` and dynamic fallback route `app/[key]/route.ts` serving 32-hex key matching `INDEXNOW_KEY`
  - Crawl Automation: `scripts/submit-indexnow.ts` batching all 37 sitemap URLs into batches of <=20 URLs for push-indexing
- **Crawl Directives & Sitemap**:
  - Directives: `app/robots.ts` with explicit `userAgent: ["*", "Bingbot"]`, allowing indexable routes and Next.js static assets, disallowing `/api/`, `/admin/`, `/admin`
  - Sitemap: `app/sitemap.ts` enumerating all 28 canonical HTML content pages (100% of indexable content) with genuine, static editorial `<lastmod>` timestamps (2026-08-11 to 2026-09-06)
- **Structured Data & GEO (AI Search) Retrievability**:
  - `lib/seo.ts`: Enriched `Organization` and `Service` JSON-LD schemas with canonical contact channels (UK: `+44 7882 746212`, India: `+91 70283 11226`, email: `hello@xiyato.uk`), target audience (`Audience` with `audienceType: "Architectural practices, interior studios, developers, luxury brands"`), and strict zero-fabrication guarantees
- **Test & Build Verification**:
  - `tests/bing-search-infrastructure.test.mjs` verifying robots, sitemaps, IndexNow handler, and Schema.org entities
  - 154+ automated tests passing (`npm test`), 0 TypeScript errors (`npm run typecheck`), 37 routes compiling (`npm run build`)
- **Deliverable Documentation**:
  - `XIYATO_BING_SEARCH_INFRASTRUCTURE_REPORT.md` at repository root covering Executive Summary, GSC Import, Sitemap/IndexNow verification, Issues (P0-P3), Code fixes, Search Intelligence baselines, Google vs. Bing differences, and Action matrices

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Bing Webmaster Verification & GSC Inheritance (R1) | Add `msvalidate.01` to `app/layout.tsx` and `public/BingSiteAuth.xml` for dual-anchored BWT ownership, document GSC 1-click OAuth import procedure. | M1 | Survey (R1) |
| 2 | IndexNow Key Verification File & Route Fallback (R2) | Generate 32-hex key, place `public/{key}.txt`, implement dynamic route `app/[key]/route.ts`, and wire `INDEXNOW_KEY`. | M1 | Survey (R2) |
| 3 | IndexNow Route Hardening & Protocol Conformance (R2) | Fix upstream HTTP status propagation, restrict domain to canonical `xiyato.uk`, enforce max 20 URLs, send `charset=utf-8` header. | M1 | Survey (R2) |
| 4 | IndexNow Crawl Automation Script (R2) | Create `scripts/submit-indexnow.ts` to batch all 37 sitemap URLs into chunks of <=20 URLs and automate IndexNow pings. | M1 | Survey (R2) |
| 5 | Explicit Bingbot Directives & Private Disallows in robots.ts (R3) | Add explicit `Bingbot` rule block and disallow `/api/`, `/admin/`, `/admin` while preserving asset access in `app/robots.ts`. | M1 | Survey (R3) |
| 6 | Schema.org Entity Graph & GEO Enrichment (R4) | Add canonical email `hello@xiyato.uk` to `organizationSchema()` and target `Audience` to `serviceSchema()` with 0 fabrications. | M1 | Survey (R4) |
| 7 | Automated Test Suite for Bing Search Infrastructure (R1-R4) | Create comprehensive test suite `tests/bing-search-infrastructure.test.mjs` covering robots, sitemaps, IndexNow, and schemas. | M1 | Survey / Req |
| 8 | Live Upstream IndexNow Verification & Comprehensive Audit Report (R2, R5) | Verify live upstream ping to `https://api.indexnow.org/indexnow` (200/202) and generate full `XIYATO_BING_SEARCH_INFRASTRUCTURE_REPORT.md`. | M2 | Survey (R2, R5) |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Technical Implementation, Hardening & Automated Tests | `app/layout.tsx`, `public/BingSiteAuth.xml`, `public/{key}.txt`, `app/[key]/route.ts`, `app/api/indexnow/route.ts`, `scripts/submit-indexnow.ts`, `app/robots.ts`, `lib/seo.ts`, `tests/bing-search-infrastructure.test.mjs` | none | DONE |
| M2 | Programmatic IndexNow Verification & Deliverable Report | Live upstream ping verification to `api.indexnow.org`, generation of `XIYATO_BING_SEARCH_INFRASTRUCTURE_REPORT.md` at root, full acceptance verification | M1 | DONE |

## Interface Contracts

### 1. `app/robots.ts`
```typescript
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: ["*", "Bingbot"],
        allow: ["/", "/_next/static/", "/_next/image/"],
        disallow: ["/api/", "/admin/", "/admin"],
      },
    ],
    sitemap: "https://xiyato.uk/sitemap.xml",
    host: "https://xiyato.uk",
  };
}
```

### 2. `app/api/indexnow/route.ts`
- Method: `POST`
- Headers: `Authorization: Bearer <INDEXNOW_SECRET>` or `Bearer <CRON_SECRET>`
- Body: `{ urls?: string[] }` (max 20 URLs, HTTPS only, canonical `xiyato.uk` hostname)
- Response:
  - 200/202: `{ ok: true, status: 200|202, submittedUrls: number }`
  - 400: `{ ok: false, error: string }`
  - 401: `{ ok: false, error: "Unauthorized." }`
  - 500/502: `{ ok: false, status: number, error: string }` (propagates upstream failures without masking)

### 3. Key Verification Route (`app/[key]/route.ts` & `public/{key}.txt`)
- Key: `c746da95e0c54178a9cb57f7229b19d4` (32-hex)
- File: `public/c746da95e0c54178a9cb57f7229b19d4.txt`
- Dynamic route: `GET /{key}.txt` returns `text/plain` with the key if requested key matches configured `INDEXNOW_KEY`

### 4. `lib/seo.ts`
- `organizationSchema()`: Includes `email: "hello@xiyato.uk"` in root and in contact points.
- `serviceSchema()`: Includes `audience: { "@type": "Audience", "audienceType": "Architectural practices, interior studios, developers, luxury brands" }`.

## Code Layout
- `app/layout.tsx` — Root metadata with `msvalidate.01` and Bingbot directives
- `public/BingSiteAuth.xml` — Static XML verification file for Bing Webmaster Tools
- `public/c746da95e0c54178a9cb57f7229b19d4.txt` — Static IndexNow verification key file
- `app/[key]/route.ts` — Dynamic route fallback for IndexNow key verification
- `app/api/indexnow/route.ts` — Hardened IndexNow submission handler
- `scripts/submit-indexnow.ts` — Automated batch submission script for 37 sitemap URLs
- `app/robots.ts` — Crawl directives with explicit Bingbot rules and private endpoint protection
- `app/sitemap.ts` — Canonical sitemap covering all 28 indexable HTML pages with genuine lastmod dates
- `lib/seo.ts` — Schema.org JSON-LD generation with GEO entity retrievability and zero fabrications
- `tests/bing-search-infrastructure.test.mjs` — Automated regression and compliance test suite
- `XIYATO_BING_SEARCH_INFRASTRUCTURE_REPORT.md` — Comprehensive deliverable audit report at repo root
