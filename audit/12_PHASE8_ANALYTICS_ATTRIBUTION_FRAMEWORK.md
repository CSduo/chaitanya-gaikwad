# XIYÀTO — Phase 8: Analytics & Inbound Lead Attribution Framework

This framework defines the end-to-end measurement architecture for XIYÀTO, ensuring that every marketing and distribution touchpoint is directly attributable to the north-star metric: **Qualified Inbound Commercial Enquiries**.

---

## 1. Measurement Objectives & KPIs

| Metric Tier | Primary Metrics | Tracking Method | Business Purpose |
|---|---|---|---|
| **Tier 1 (North Star)** | **Qualified Commercial Enquiries** | WhatsApp click-to-chat, Phone tap (`tel:`), Form submission (`/api/enquiry`), Direct Email (`mailto:`) | Measures real revenue pipeline and commercial demand |
| **Tier 2 (Intent & Engagement)** | Proof Sheet Zooms, Case Study Deep Reads, Workbook Excel Downloads, Video Plays | Custom client-side interaction events | Measures prospective client evaluation depth and portfolio resonance |
| **Tier 3 (Discovery & Traffic)** | High-intent organic search sessions, Directory referral visits, Country of origin | Session analytics (GA4 / Plausible / PostHog) | Validates SEO cluster rankings and international reach |

---

## 2. Event Tracking Taxonomy

All client-side interactions emit structured event payloads formatted for compatibility with Google Analytics 4 (via `gtag`), privacy-friendly analytics (Plausible / Fathom), or server-side telemetry.

### Primary Conversion Events

| Event Name | Trigger | Parameters Collected |
|---|---|---|
| `inbound_whatsapp_click` | User clicks any WhatsApp CTA or number | `country_target` (`uk` or `india`), `service_slug`, `cta_placement` (`hero`, `header`, `service_page`, `footer`, `case_study`), `page_path` |
| `inbound_telephone_click` | User clicks or taps any direct phone number | `phone_number` (`+44 7882 746212` or `+91 70283 11226`), `territory` (`uk` or `india`), `page_path` |
| `inbound_email_click` | User clicks any verified direct email link | `email_address`, `page_path` |
| `project_enquiry_submitted` | User successfully submits project enquiry form | `service_requested`, `budget_band`, `timeframe`, `has_attachment`, `page_path` |
| `project_enquiry_failed` | Enquiry API fails or hits rate limit | `failure_reason`, `page_path` |

### Secondary Engagement Events

| Event Name | Trigger | Parameters Collected |
|---|---|---|
| `case_study_drawing_zoom` | User clicks to inspect Ultra-HD CAD drawing or 3D render | `project_slug`, `drawing_title`, `sheet_number` |
| `b2b_workbook_download` | User clicks to download redacted Excel workbook sample | `workbook_slug`, `industry_sector`, `region` |
| `brand_film_play` | User plays cinematic product film (e.g. Sultanah Moon Chair) | `film_slug`, `video_duration`, `placement` |

---

## 3. Standardized UTM Parameter Convention

When building external profiles (Clutch, Architizer, Behance, LinkedIn, DesignRush) or executing outreach, all inbound URLs must follow this strict taxonomy:

```
https://xiyato.uk/[landing-path]?utm_source=[platform]&utm_medium=[medium]&utm_campaign=[campaign]&utm_content=[asset]
```

### Parameter Taxonomy Matrix

| Parameter | Accepted Values | Examples |
|---|---|---|
| `utm_source` | Platform identity | `clutch`, `architizer`, `behance`, `linkedin`, `archdaily`, `designrush`, `sortlist` |
| `utm_medium` | Channel type | `directory_profile`, `portfolio_case_study`, `editorial_feature`, `social_organic`, `direct_outreach` |
| `utm_campaign` | Service or territory campaign | `cad_outsourcing`, `b2b_growth_research`, `3d_visualisation`, `furniture_film`, `uk_studios`, `gcc_hospitality` |
| `utm_content` | Specific link asset | `header_cta`, `profile_website_button`, `bahrain_case_study_link`, `moon_chair_video_link` |

*Example Production URL for Clutch Profile Link to CAD Service Page:*  
`https://xiyato.uk/services/cad-technical-production?utm_source=clutch&utm_medium=directory_profile&utm_campaign=cad_outsourcing&utm_content=service_profile_link`

---

## 4. Monthly Executive Acquisition Report Template

```markdown
# XIYÀTO — Monthly Inbound Acquisition Executive Report
**Period**: [Month Year]  
**Prepared For**: Chaitanya Gaikwad, Founder & Creative Production Lead  

### 1. Inbound Commercial Enquiries Summary
- **Total Inbound Enquiries**: [Count]
  - WhatsApp Enquiries (UK Hub): [Count]
  - WhatsApp Enquiries (India Hub): [Count]
  - Website Project Brief Submissions: [Count]
  - Direct Telephone Calls: [Count]
  - Direct Email Communications: [Count]
- **Enquiry Qualification Rate**: [Percentage % meeting minimum project thresholds]

### 2. Breakdown by Service Line
1. **CAD & Technical Production**: [Count] enquiries ([% of total])
2. **Growth, Marketing & B2B Research**: [Count] enquiries ([% of total])
3. **3D Visualisation & Image Production**: [Count] enquiries ([% of total])
4. **Video, AI Film & Editing**: [Count] enquiries ([% of total])
5. **Website Design & Development**: [Count] enquiries ([% of total])
6. **Automation & Marketing Systems**: [Count] enquiries ([% of total])

### 3. Geographical Distribution of Enquiries
- **United Kingdom**: [Count]
- **Middle East (UAE, Saudi Arabia, Qatar)**: [Count]
- **North America (US & Canada)**: [Count]
- **Europe (Germany, Netherlands, France, Switzerland)**: [Count]
- **Asia / Australia**: [Count]

### 4. Primary Inbound Acquisition Channels
- **Organic Search (Google & Bing)**: [Count]
- **Directory Referrals (Clutch, Architizer, Behance)**: [Count]
- **Direct & Social Channels (LinkedIn, Instagram)**: [Count]

### 5. Priority Adjustments for Next Cycle
- [Action items based on conversion bottlenecks or top-performing service lines]
```
