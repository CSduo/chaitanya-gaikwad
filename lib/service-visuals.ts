import type { ServiceSlug } from "@/lib/services";
import { VISUALS } from "@/lib/visuals";
import { CAD_DRAWINGS, allVideos } from "@/lib/portfolio";

/** One image shown beside a block of service copy. */
export type ShowcaseVisual = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Short tag shown on the image, e.g. "Concept study" or "Drawing". */
  label: string;
  /** "contain" shows the whole image (drawings); default crops to fill. */
  fit?: "cover" | "contain";
  /** Anchor for cropped images, e.g. "top" for tall website screenshots. */
  position?: "center" | "top";
};

/** Designed graphic used where a service has no photographic work to show. */
export type ShowcaseGraphic = "data" | "flow" | "grid";

function visualisationImages(filter?: (group: string) => boolean): ShowcaseVisual[] {
  return VISUALS.filter((v) => v.quality === "strong" && (!filter || filter(v.group))).map((v) => ({
    src: v.src,
    alt: v.alt,
    width: v.width,
    height: v.height,
    label: v.collection === "studio-concepts" ? "Concept study" : "3D render",
  }));
}

function cadImages(): ShowcaseVisual[] {
  return CAD_DRAWINGS.filter((d) => d.role === "output").map((d) => ({
    src: d.src,
    alt: d.alt,
    width: d.width,
    height: d.height,
    label: d.category,
    fit: "contain" as const,
  }));
}

function filmStills(): ShowcaseVisual[] {
  return allVideos().map((f) => ({
    src: f.poster,
    alt: `${f.title}, film still`,
    width: f.posterWidth,
    height: f.posterHeight,
    label: "Film",
  }));
}

const WEBSITE_IMAGES: ShowcaseVisual[] = [
  { src: "/media/web/anvikshiki-desktop.webp", alt: "Anvikshiki Journal homepage on desktop", width: 1600, height: 3428, label: "Website", position: "top" },
  { src: "/media/web/anvikshiki-mobile.webp", alt: "Anvikshiki Journal on mobile", width: 1600, height: 1111, label: "Mobile" },
];

/** Images from a service's own portfolio, in display order. */
export function serviceVisuals(slug: ServiceSlug | string): ShowcaseVisual[] {
  switch (slug) {
    case "visualisation-image-production":
      return visualisationImages();
    case "ai-video-production":
    case "video-ai-film-editing":
      return filmStills();
    case "cad-technical-production":
      return cadImages();
    case "website-design-development":
      return WEBSITE_IMAGES;
    default:
      return [];
  }
}

/** Furniture and product imagery for the furniture rendering specialism. */
export function productVisuals(): ShowcaseVisual[] {
  const products = visualisationImages((group) => group === "product-furniture");
  return products.length ? products : visualisationImages();
}

export { cadImages };

/** The graphic style for services without photographic work. */
export function serviceGraphic(slug: ServiceSlug | string): ShowcaseGraphic {
  if (slug === "automation-workflow-systems") return "flow";
  if (slug === "b2b-lead-generation" || slug === "market-intelligence-research") return "data";
  return "grid";
}
