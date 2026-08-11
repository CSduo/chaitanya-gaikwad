/**
 * Visual library — restored from the previous site's render and visualisation
 * archive, then reviewed image by image.
 *
 * Every item below was inspected: the group, subject and alt text describe what
 * is actually in the frame. 8 of the 49 legacy files are withheld from
 * public display and listed in WITHHELD_VISUALS with the reason.
 */

export type VisualGroup =
  | "interiors"
  | "product-furniture"
  | "retail-showroom"
  | "workspace-office"
  | "exterior-architectural"
  | "hospitality";

export const VISUAL_GROUP_LABELS: Record<VisualGroup, string> = {
  "interiors": "Interiors",
  "product-furniture": "Product & furniture",
  "retail-showroom": "Retail & showroom",
  "workspace-office": "Workspace & office",
  "exterior-architectural": "Architectural",
  "hospitality": "Hospitality",
};

export type VisualItem = {
  src: string;
  alt: string;
  title: string;
  group: VisualGroup;
  width: number;
  height: number;
  /** Editorial rating from the image review. Drives featured selection. */
  quality: "strong" | "standard";
};

export const VISUALS: VisualItem[] = [
  {
    src: "/media/visual/render-1.webp",
    title: "Compact bathroom with travertine walls",
    alt: "A narrow bathroom finished in beige travertine-look stone, with a wall-hung toilet, round vessel basin on a stone ledge, backlit towel shelves, and matte black rainfall shower and tapware.",
    group: "interiors",
    width: 999,
    height: 1230,
    quality: "strong",
  },
  {
    src: "/media/visual/render-6.webp",
    title: "Laundry room with ironing board and drying rail",
    alt: "A laundry room in pale oak joinery with overhead cabinets, a backlit shelf holding towels, paper rolls and a storage box, a pull-out ironing board, a wall-mounted drying rail with hanging towels, stacked laundry appliances and fabric hampers on grey tile.",
    group: "interiors",
    width: 978,
    height: 1232,
    quality: "strong",
  },
  {
    src: "/media/visual/vis-11.webp",
    title: "Patterned ceramic vase holding flower arrangement",
    alt: "A tapered ceramic vase with a white and grey chevron relief pattern holds a mixed arrangement of pink, orange and white flowers on a polished marble countertop, with warm blurred lights behind.",
    group: "product-furniture",
    width: 1440,
    height: 1920,
    quality: "strong",
  },
  {
    src: "/media/visual/vis-19.webp",
    title: "Office waiting nook with green armchairs",
    alt: "An office waiting area with two green upholstered armchairs around a wood coffee table, a preserved moss and brass wall panel on a fluted grey wall, a fiddle-leaf fig in a bronze planter and a wood door revealing a meeting room beyond.",
    group: "workspace-office",
    width: 1439,
    height: 1154,
    quality: "strong",
  },
  {
    src: "/media/visual/vis-2.webp",
    title: "Living room with wave-relief mural feature wall",
    alt: "Formal living room with a long white sofa, silver textured pillows, round marble and chrome coffee table, matching lamps on mirrored side tables, and a full-width grey and white wave mural with a tree and flying birds behind it.",
    group: "interiors",
    width: 1440,
    height: 960,
    quality: "strong",
  },
  {
    src: "/media/visual/vis-20.webp",
    title: "Beige master bedroom with crystal chandelier",
    alt: "A cream and beige master bedroom with a tall upholstered headboard on a panelled wall, a tiered crystal chandelier, matching table lamps, an upholstered bench at the foot of the bed and an armchair with ottoman by floor-length curtained windows.",
    group: "interiors",
    width: 1439,
    height: 959,
    quality: "strong",
  },
  {
    src: "/media/visual/vis-21.webp",
    title: "Large beige living room with two sofas",
    alt: "A large formal living room with two facing cream sofas, round marble coffee tables, a tiered crystal chandelier, panelled walls, floor-length beige curtains and polished marble flooring, opening to a further seating area at the rear.",
    group: "interiors",
    width: 1439,
    height: 959,
    quality: "strong",
  },
  {
    src: "/media/visual/vis-22.webp",
    title: "Beige living room with round coffee table",
    alt: "A cream-toned living room with a linen sofa, wooden armchair, round oak coffee table holding a white deer figurine, floor lamp, framed abstract art and arched wall niche with pottery.",
    group: "interiors",
    width: 1440,
    height: 1919,
    quality: "strong",
  },
  {
    src: "/media/visual/vis-23.webp",
    title: "Bedroom with textured accent wall and cove lighting",
    alt: "A warmly lit bedroom with a beige upholstered bed, textured accent wall lit by concealed cove lighting, woven pendant lamp, two globe bedside lamps and potted plants beside a shaded window.",
    group: "interiors",
    width: 1440,
    height: 1919,
    quality: "strong",
  },
  {
    src: "/media/visual/vis-25.webp",
    title: "Framed ink-wash landscape canvas on wall",
    alt: "A wide thin-framed canvas hung on a plain wall showing a monochrome ink-wash landscape of misty mountains, a wooden boat on still water and a pagoda beneath a tree.",
    group: "product-furniture",
    width: 1440,
    height: 960,
    quality: "strong",
  },
  {
    src: "/media/visual/vis-27.webp",
    title: "Three curtain styles in labelled display alcoves",
    alt: "A showroom wall with three recessed alcoves each displaying a curtain style over sheer backing, labelled Empire, Sandglass and Japanese on brass plaques.",
    group: "retail-showroom",
    width: 1440,
    height: 960,
    quality: "strong",
  },
  {
    src: "/media/visual/vis-28.webp",
    title: "Curtain display bay with Ganesha statue",
    alt: "An illuminated display bay with pleated patterned drapes and sheers held by beaded tiebacks, staged with a seated Ganesha statue playing a flute, a brass figurine and a dark vase of dried palm and lotus pods.",
    group: "retail-showroom",
    width: 1386,
    height: 1440,
    quality: "strong",
  },
  {
    src: "/media/visual/vis-3.webp",
    title: "Textured white arch niche with stepped plinth",
    alt: "Minimal white textured render of a tall arched recess containing stepped platforms and a stone vase of dried grasses, with a second arch partly visible at the right edge.",
    group: "exterior-architectural",
    width: 1440,
    height: 1440,
    quality: "strong",
  },
  {
    src: "/media/visual/vis-30.webp",
    title: "Abstract marble-pattern rug in bedroom",
    alt: "A large rug with a swirling brown and cream marbled pattern laid on stone flooring in front of a king bed with a padded headboard, white linens and matching bedside lamps.",
    group: "product-furniture",
    width: 1440,
    height: 1440,
    quality: "strong",
  },
  {
    src: "/media/visual/vis-33.webp",
    title: "Living and dining room with patterned rug",
    alt: "An open-plan living and dining area with a green sectional sofa, glass coffee table and a large blue and beige patterned shag rug, with a dining table and copper chandelier beyond.",
    group: "interiors",
    width: 1440,
    height: 1440,
    quality: "strong",
  },
  {
    src: "/media/visual/vis-34.webp",
    title: "Three framed deer wall art panels",
    alt: "Three framed three-dimensional deer artworks in black frames lit by track spotlights above a white ribbed sideboard.",
    group: "product-furniture",
    width: 1440,
    height: 1440,
    quality: "strong",
  },
  {
    src: "/media/visual/vis-35.webp",
    title: "Three framed textured landscape art panels",
    alt: "Three framed textured landscape artworks in orange, white and teal, lit by track spotlights above a white ribbed sideboard.",
    group: "product-furniture",
    width: 1440,
    height: 1440,
    quality: "strong",
  },
  {
    src: "/media/visual/vis-36.webp",
    title: "Executive office with round marbled rug",
    alt: "A beige executive office with a light wood desk, built-in shelving, abstract painting and a large round rug with a black outline motif.",
    group: "workspace-office",
    width: 1440,
    height: 1920,
    quality: "strong",
  },
  {
    src: "/media/visual/vis-40.webp",
    title: "Cream office with blue swirl rug",
    alt: "A cream and gold executive office with a light desk, tub chairs, marble side table and a large round rug with blue and gold marbled swirls.",
    group: "workspace-office",
    width: 1438,
    height: 1920,
    quality: "strong",
  },
  {
    src: "/media/visual/vis-41.webp",
    title: "Large formal living room at night",
    alt: "A wide beige and brown formal living room lit at night, with multiple sofas, a low timber coffee table, table lamps and a staircase visible through an opening.",
    group: "interiors",
    width: 1439,
    height: 1079,
    quality: "strong",
  },
  {
    src: "/media/visual/vis-42.webp",
    title: "Open timber pavilion lounge facing water",
    alt: "A double-height timber pavilion living room at night, with pale sectional sofas, marble floors and folding doors open to a terrace overlooking water and hills.",
    group: "interiors",
    width: 1439,
    height: 1079,
    quality: "strong",
  },
  {
    src: "/media/visual/vis-43.webp",
    title: "Dimly lit hotel lounge bar",
    alt: "A warmly lit lounge with a curved cream sofa, bronze tables, planting and a bar counter with rattan stools beside a vaulted arched corridor.",
    group: "hospitality",
    width: 1439,
    height: 1079,
    quality: "strong",
  },
  {
    src: "/media/visual/vis-5.webp",
    title: "Rug showroom with hanging carpets and artwork",
    alt: "Showroom interior with irregularly shaped patterned rugs on the floor, carpets hung and draped down arched alcove walls, a curved beige sofa, round stone coffee table, brass chandelier and a large painted owl portrait.",
    group: "retail-showroom",
    width: 1080,
    height: 1440,
    quality: "strong",
  },
  {
    src: "/media/visual/vis-6.webp",
    title: "Fabric showroom with cushion and swatch displays",
    alt: "Warm-lit textile showroom with a curved beige sofa and cushions, backlit arched shelving holding rows of decorative pillows, and tall racks of fabric swatches on either side.",
    group: "retail-showroom",
    width: 1080,
    height: 1440,
    quality: "strong",
  },
  {
    src: "/media/visual/vis-9.webp",
    title: "Black ruffled vase with rose arrangement",
    alt: "Glossy black vase with sculpted ruffled petal edges and white rims, filled with pink and cream roses, photographed against a soft-focus background of pastel blooms.",
    group: "product-furniture",
    width: 1440,
    height: 1920,
    quality: "strong",
  },
  {
    src: "/media/visual/render-3.webp",
    title: "Narrow hallway with tall wood wardrobe",
    alt: "A narrow hallway with a floor-to-ceiling dark wood wardrobe with slim brass handles, slatted timber doors on either side, grey tile flooring and a mottled beige runner rug.",
    group: "interiors",
    width: 975,
    height: 1226,
    quality: "standard",
  },
  {
    src: "/media/visual/render-4.webp",
    title: "Narrow room with single bed and overhead cabinet",
    alt: "A narrow room viewed end-on, with a single upholstered bed under a wood overhead cabinet and backlit niche, a folding louvre door to one side, a slatted timber door to the other, and a mottled rug on grey tile.",
    group: "interiors",
    width: 988,
    height: 1232,
    quality: "standard",
  },
  {
    src: "/media/visual/render-5.webp",
    title: "Utility room with stacked washer and dryer",
    alt: "A small utility room with a stacked white washing machine and dryer, open shelving holding detergent bottles and paper rolls, and a wood-fronted cabinet with a dark sink and black tap beneath a window with dark venetian blinds.",
    group: "interiors",
    width: 988,
    height: 1226,
    quality: "standard",
  },
  {
    src: "/media/visual/vis-10.webp",
    title: "Patterned ceramic vase with rose bouquet",
    alt: "Tall ceramic vase with an embossed silver and white chevron pattern holding peach roses and white hydrangea, standing on a dark marble table with candles and window lights blurred behind.",
    group: "product-furniture",
    width: 1440,
    height: 1920,
    quality: "standard",
  },
  {
    src: "/media/visual/vis-14.webp",
    title: "Pink girls bedroom with vanity and desk",
    alt: "A high-angle view of a pink-themed bedroom with a fluted pink upholstered headboard, quilted bedding, a shaggy pink rug, a wood study desk with pink chair, a light-framed vanity mirror and fairy-lit shelves of ornaments.",
    group: "interiors",
    width: 1439,
    height: 1079,
    quality: "standard",
  },
  {
    src: "/media/visual/vis-15.webp",
    title: "Top-down 3D cutaway of pink bedroom",
    alt: "A top-down three-dimensional cutaway model of a small pink bedroom showing the bed against the left wall, a fitted wardrobe, an open door, a shaggy rug, a lit vanity and a desk along the walls.",
    group: "interiors",
    width: 1439,
    height: 1079,
    quality: "standard",
  },
  {
    src: "/media/visual/vis-16.webp",
    title: "Angled 3D cutaway of pink bedroom",
    alt: "An angled overhead cutaway render of a pink bedroom with a fluted headboard, fitted wood wardrobe, shaggy pink rug, lit vanity mirror and a desk running under the curtained window.",
    group: "interiors",
    width: 1439,
    height: 1079,
    quality: "standard",
  },
  {
    src: "/media/visual/vis-18.webp",
    title: "Waiting nook with purple armchairs and artwork",
    alt: "A small seating nook with two purple velvet armchairs facing a dark wood coffee table, set against a fluted lilac accent wall hung with a three-panel abstract purple and gold artwork, beside a wood door with a vertical glass panel.",
    group: "interiors",
    width: 1439,
    height: 1154,
    quality: "standard",
  },
  {
    src: "/media/visual/vis-24.webp",
    title: "Bedroom with lace bedding and gold-leg nightstands",
    alt: "A bedroom styled with lace-trimmed bedding and bench, cream headboard, gold-legged nightstands, woven pendant lamp and a textured accent wall lit from below by cove lighting.",
    group: "interiors",
    width: 1440,
    height: 1919,
    quality: "standard",
  },
  {
    src: "/media/visual/vis-31.webp",
    title: "Geometric blue and green rug in living room",
    alt: "A rectangular rug with blue, olive and grey banded and half-circle shapes covering a marble floor between a cream sectional sofa, tub chair and round black marble coffee table.",
    group: "product-furniture",
    width: 1440,
    height: 1440,
    quality: "standard",
  },
  {
    src: "/media/visual/vis-37.webp",
    title: "Silver astronaut sculpture on moon base",
    alt: "A silver astronaut figurine with raised arms standing on a grey moon-shaped base against an illustrated purple space backdrop with a lit arch.",
    group: "product-furniture",
    width: 1079,
    height: 1440,
    quality: "standard",
  },
  {
    src: "/media/visual/vis-38.webp",
    title: "Gold horse and black cobra sculptures",
    alt: "Two faceted gold horse-head sculptures on black plinths flanking a black and gold cobra figurine, against a dark background with purple smoke and orchids.",
    group: "product-furniture",
    width: 1440,
    height: 960,
    quality: "standard",
  },
  {
    src: "/media/visual/vis-39.webp",
    title: "Traditional home study with round rug",
    alt: "A traditional wood-panelled home office with a dark timber desk, built-in bookcases, lantern pendant and a large round pale patterned rug.",
    group: "workspace-office",
    width: 1440,
    height: 1919,
    quality: "standard",
  },
  {
    src: "/media/visual/vis-4.webp",
    title: "Row of coloured glass animal figurines",
    alt: "Eight blown-glass ornaments lined up against a plain off-white backdrop, including a black bull, a spotted dog, a cartoon cow, two abstract swirl forms, a black swan and a pair of pale swans.",
    group: "product-furniture",
    width: 1440,
    height: 960,
    quality: "standard",
  },
  {
    src: "/media/visual/vis-7.webp",
    title: "Gallery wall of framed botanical prints",
    alt: "Five black-framed prints of olive-green botanical and leaf motifs arranged as a gallery wall above a beige sofa with matching cushions.",
    group: "interiors",
    width: 1080,
    height: 1440,
    quality: "standard",
  },
  {
    src: "/media/visual/vis-8.webp",
    title: "Artificial flower and vase store aisle",
    alt: "Narrow retail aisle with glass shelves of ceramic vases on the left, potted artificial plants and flowers on the right, dense hanging floral garlands covering the ceiling and a moss-clad wall.",
    group: "retail-showroom",
    width: 1440,
    height: 960,
    quality: "standard",
  },
];

/** Files deliberately not published, with the reason recorded. */
export const WITHHELD_VISUALS: { file: string; reason: string }[] = [
  { file: "vis-1.webp", reason: "Technical layout export carrying third-party tool branding and markup text." },
  { file: "vis-12.webp", reason: "Carries a third-party studio's branding text; needs that studio's consent before publication." },
  { file: "vis-13.webp", reason: "Screenshot of an internal working spreadsheet with legible business data — not portfolio imagery." },
  { file: "vis-17.webp", reason: "Rendered labels are garbled or mirrored." },
  { file: "vis-26.webp", reason: "Text-heavy infographic; type is unreadable at gallery sizes." },
  { file: "vis-29.webp", reason: "On-image sign text is garbled and misspelled." },
  { file: "vis-32.webp", reason: "On-site snapshot with mixed lighting and soft focus; below portfolio standard." },
  { file: "render-2.webp", reason: "Composition dominated by empty wall; subject cropped at the frame edge." },
];

export function visualsByGroup(group: VisualGroup): VisualItem[] {
  return VISUALS.filter((v) => v.group === group);
}

export function featuredVisuals(limit = 8): VisualItem[] {
  return VISUALS.filter((v) => v.quality === "strong").slice(0, limit);
}

export function activeVisualGroups(): { group: VisualGroup; label: string; count: number }[] {
  return (Object.keys(VISUAL_GROUP_LABELS) as VisualGroup[])
    .map((g) => ({ group: g, label: VISUAL_GROUP_LABELS[g], count: visualsByGroup(g).length }))
    .filter((g) => g.count > 0)
    .sort((a, b) => b.count - a.count);
}
