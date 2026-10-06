/**
 * Hire-intent and comparison pages for 3D visualisation.
 *
 * Search-intent map (keep each page on its own job so they do not compete):
 *  - /services/visualisation-image-production: "3D visualisation / rendering services".
 *  - HIRE_PATH: hiring intent, "hire a (freelance) 3D visualiser", "outsource rendering".
 *  - GUIDE_PATH: comparison intent, "freelancer vs 3D visualisation studio".
 *  - /services/visualisation/* specialisms: their own service (interiors, furniture).
 *
 * Paths live here so header, footer, sitemap, content dates and tests share one value.
 */
export const HIRE_PATH = "/hire-a-3d-visualiser";
export const GUIDE_PATH = "/guides/freelancer-vs-3d-visualisation-studio";
/** Hire intent for CAD drafting ("freelance CAD drafter"). */
export const CAD_HIRE_PATH = "/hire-a-cad-drafter";

/** Printed on the guide and used as Article.datePublished; change both together. */
export const GUIDE_PUBLISHED = "2026-10-05";
