# XIYÀTO — Phase 3: International ccTLD & Global Acquisition Strategy

This document provides the definitive senior technical assessment of the commercial and algorithmic implications of operating on the `xiyato.uk` ccTLD, and establishes a safe, staged roadmap for international scale.

---

## 1. Algorithmic Realities of the `.uk` ccTLD

### How Search Engines Treat Country-Code TLDs
- **Google Search Console**: Google automatically treats `.uk`, `.de`, `.fr`, `.co.uk`, etc., as carrying an inherent geographic association with their designated territory. Unlike gTLDs (`.com`, `.org`, `.net`, `.studio`), ccTLDs cannot have their target country changed in Google Search Console.
- **Geographic Bias in SERPs**:
  - In the UK: `xiyato.uk` receives maximum native trust, high local click-through rates (CTR), and optimal crawl priority.
  - In International Markets (US, UAE, Saudi Arabia, Europe, Canada, Australia): Google applies a slight geographic ranking friction when ranking `.uk` against generic `.com` domains for broad commercial search queries (e.g. *"CAD drafting outsourcing"*, *"B2B lead generation agency"*), unless strong international signals compensate.

---

## 2. Strategic Evaluation: Retain `xiyato.uk` vs. Global Domain Migration

### Scenario A: Retain `xiyato.uk` Exclusively (Current Baseline)
- **Pros**: Zero migration risk, zero downtime, preserves all historical trust, perfectly matches London design studio prestige.
- **Cons**: Sub-optimal organic visibility for non-branded searches originating in the US, GCC, and Europe.
- **Verdict**: Strong for UK client acquisition; insufficient on its own for aggressive organic capture in Saudi Arabia, UAE, and North America.

### Scenario B: Migrate to a Neutral Generic Top-Level Domain (Recommended Future State)
- **Target Domains**: `xiyato.com` (Primary choice) or `xiyato.studio` / `xiyato.agency` (Secondary).
- **Pros**: Completely removes Google's geographic geo-targeting restriction; allows equal global organic rank distribution across US, UK, GCC, and EU.
- **Cons**: Domain acquisition cost; brief temporary transition fluctuation (typically 2–4 weeks) while Google recrawls 301 redirects.
- **Strict Operating Principle**: **Do NOT execute a domain migration without explicit client confirmation.**

---

## 3. Recommended Phased Implementation Roadmap

### Phase A: Maximize Global Reach on Current `xiyato.uk` Domain (Immediate)
We do not need to wait for a domain purchase to win international clients. We immediately implement strong global technical signals on the existing site:
1. **Schema.org Internationalization**:
   - Update `Organization` and `ProfessionalService` structured data to declare explicit multi-country `areaServed` coverage:
     - `United Kingdom` (GB)
     - `United States` (US)
     - `United Arab Emirates` (AE)
     - `Saudi Arabia` (SA)
     - `Qatar` (QA)
     - `Australia` (AU)
     - `Canada` (CA)
     - `Singapore` (SG)
     - `Europe`
     - `Worldwide`
2. **Dual-Hub Contact & Production Routing**:
   - Explicitly display verified direct studio contact hubs: **United Kingdom** (`+44 7882 746212`) and **India** (`+91 70283 11226`).
   - This communicates local presence in Europe/UK combined with scalable offshore production capacity in India, which is an enormous value proposition for international design practices seeking cost-effective technical overflow.
3. **Showcase Real International Proof**:
   - Feature international projects prominently (Bahrain luxury interior package, GCC fit-out intelligence databases, China wholesale interior market studies).

### Phase B: Zero-Downtime Migration Blueprint (When Global Domain Is Acquired)
When the owner acquires `xiyato.com`, the migration must follow this exact sequence:
1. Configure SSL/TLS and DNS on the new domain.
2. Mirror the Next.js deployment to `xiyato.com`.
3. Implement permanent HTTP 301 redirects from `xiyato.uk/$1` to `https://xiyato.com/$1` with path and query parameter preservation.
4. Submit the Change of Address notification in Google Search Console.
5. Update canonical references in `lib/site.ts` to `https://xiyato.com`.
6. Ping Google and Bing sitemaps with the new domain endpoints.

---

## 4. International URL Structuring & Hreflang Policy

### Why Hreflang Is NOT Recommended for English-Only Variations
- Google's official documentation states: *Do NOT use hreflang unless you are serving genuinely distinct content in different languages, or localized currencies/legal requirements.*
- Serving the exact same English content across `/us/`, `/uk/`, and `/ae/` with hreflang tags creates thin, near-duplicate content risks and wastes crawl budget.

### Anti-Doorway Page Rule
- **Strict Prohibition**: Never create synthetic pages like:
  - `xiyato.uk/cad-services-dubai`
  - `xiyato.uk/cad-services-riyadh`
  - `xiyato.uk/cad-services-london`
  with 95% identical text and swapped city names.
- **Genuine Geographic Differentiation**:
  - If XIYÀTO targets the Middle East hospitality market, create dedicated case studies and research deliverables (e.g. *GCC Hospitality Interior CAD Package Case Study*, *Saudi Arabia Interior Buyers Intelligence*). These pages provide authentic, unique utility that buyers and search engines recognize.
