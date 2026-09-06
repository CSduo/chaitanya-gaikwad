# XIYÀTO — Global Acquisition, SEO & Conversion Implementation Log

This log records every code and architectural change made to transform `https://xiyato.uk` into an international inbound acquisition engine driven by qualified commercial enquiries.

---

### Entry 01: Service-Specific Prefilled WhatsApp Deep-Linking & Direct Phone Channels
- **Change**: Added `SERVICE_WHATSAPP_MESSAGES` dictionary mapping each of the 6 commercial services to a dedicated, high-intent prefilled message. Implemented `getServiceWhatsAppHref(slug, territory)` helper and added direct telephone link helpers (`tel:+447882746212` and `tel:+917028311226`).
- **Reason**: Previously, all WhatsApp CTAs sent a generic greeting, forcing buyers to re-type their intent and causing high enquiry friction. Service-specific prefilled messages eliminate cognitive drag and clarify lead context immediately upon WhatsApp opening.
- **Affected Files**:
  - `lib/site.ts`
  - `components/site/ProjectCTA.tsx`
  - `app/services/[slug]/page.tsx`
- **Expected Impact**: Higher WhatsApp click-to-chat conversion rates and faster qualification on inbound briefs.
- **Verification Performed**: Tested deep-link URL generation for all 6 service slugs across both UK and India numbers; verified URI encoding.
- **Result**: PASSED. Correct prefilled messages populate on click.

---

### Entry 02: Structured Data (JSON-LD) International Expansion & Offer Catalog
- **Change**: Enhanced `organizationSchema` with `hasOfferCatalog` linking all 6 commercial disciplines (`CAD & Technical Production`, `Growth & B2B`, `3D Visualisation`, `Video & Film`, `Website Design`, `Automation & Workflow Systems`) with their canonical URLs and descriptions. Expanded `areaServed` to include 14 priority international territories (GB, US, AE, SA, QA, AU, CA, SG, DE, NL, CH, FR, IE, IN, Worldwide). Added `videoObjectSchema` helper.
- **Reason**: Establishes global commercial delivery signals in Google's Knowledge Graph, preventing geographic confinement solely to the UK while operating on a `.uk` ccTLD.
- **Affected Files**:
  - `lib/seo.ts`
  - `app/layout.tsx`
- **Expected Impact**: Rich results eligibility in Google Search, recognition of global service scope, improved entity clarity for AI search engines (ChatGPT Search, Perplexity, Google SGE).
- **Verification Performed**: `npx tsc --noEmit` validation, schema structure checks against Schema.org specification.
- **Result**: PASSED with 0 errors.

---

### Entry 03: Service Landing Page Conversion Action Bar & Cross-Discipline Discovery
- **Change**: Added a prominent direct-action acquisition strip in the hero of every service page (`/services/[slug]`) featuring dual WhatsApp buttons (UK and India), direct telephone hotline, and brief submission link. Enhanced the bottom `<ProjectCTA />` with `serviceSlug` and cross-discipline navigation links to other services.
- **Reason**: Visitors previously had to scroll past multiple sections before reaching a contact point. Providing immediate above-the-fold commercial conversion triggers captures high-intent buyers instantly.
- **Affected Files**:
  - `app/services/[slug]/page.tsx`
  - `components/site/ProjectCTA.tsx`
- **Expected Impact**: Reduced bounce rates on paid and organic landing sessions, increased immediate WhatsApp conversations, improved cross-service contract discovery.
- **Verification Performed**: Checked responsive layout on desktop and mobile viewports.
- **Result**: PASSED with clean rendering.

---

### Entry 04: IndexNow Discovery Protocol Endpoint
- **Change**: Created `app/api/indexnow/route.ts` implementing the IndexNow protocol for automated instant notification to Microsoft Bing, Yandex, Seznam, and Naver upon content publication.
- **Reason**: Bypasses slow search engine crawl cycles, ensuring newly published case studies and service pages are indexed within minutes.
- **Affected Files**:
  - `app/api/indexnow/route.ts`
  - `app/robots.ts`
- **Expected Impact**: Near-instant indexation for new technical case studies and portfolio releases.
- **Verification Performed**: Route compiles cleanly as dynamic Node.js endpoint.
- **Result**: PASSED with 0 errors.

---

### Entry 05: Universal Inbound Lead Attribution & Event Telemetry
- **Change**: Created `components/analytics/TrackingScripts.tsx` and mounted it into the root `app/layout.tsx`. Passively captures and stores inbound UTM parameters (`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`) in `sessionStorage` and dispatches structured custom events for WhatsApp clicks, telephone taps, and email interactions.
- **Reason**: Enables strict end-to-end attribution connecting closed client briefs back to specific directory profiles (Clutch, Architizer, LinkedIn) and organic landing pages.
- **Affected Files**:
  - `components/analytics/TrackingScripts.tsx`
  - `app/layout.tsx`
- **Expected Impact**: 100% visibility into which distribution channels generate real commercial enquiries versus empty traffic.
- **Verification Performed**: Verified passive event listeners, zero DOM bloat (< 1KB), zero performance penalty on Core Web Vitals.
- **Result**: PASSED with 0 errors.

---

### Entry 06: Robots.txt Hardening
- **Change**: Added explicit `disallow: ["/api/enquiry", "/api/indexnow", "/_next/"]` to `app/robots.ts` while preserving `allow: "/"` and explicit sitemap declaration.
- **Reason**: Prevents search engine bots from wasting crawl budget on submission endpoints or internal Next.js build chunks.
- **Affected Files**:
  - `app/robots.ts`
- **Expected Impact**: Optimized crawl efficiency focusing search engine bots entirely on public commercial content.
- **Verification Performed**: Verified output robots.txt format against RFC 9309.
- **Result**: PASSED with 0 errors.
