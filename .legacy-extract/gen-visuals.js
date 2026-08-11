const fs = require("fs");
const d = JSON.parse(fs.readFileSync(".legacy-extract/workflow-result.json", "utf8"));
const dims = JSON.parse(fs.readFileSync(".legacy-extract/dimensions.json", "utf8"));

/* Assets withheld from the public gallery, each with a stated reason. */
const EXCLUDE = {
  "vis-13.webp": "Screenshot of an internal working spreadsheet with legible business data — not portfolio imagery.",
  "vis-12.webp": "Carries a third-party studio's branding text; needs that studio's consent before publication.",
  "vis-1.webp": "Technical layout export carrying third-party tool branding and markup text.",
  "vis-17.webp": "Rendered labels are garbled or mirrored.",
  "vis-26.webp": "Text-heavy infographic; type is unreadable at gallery sizes.",
  "vis-29.webp": "On-image sign text is garbled and misspelled.",
  "vis-32.webp": "On-site snapshot with mixed lighting and soft focus; below portfolio standard.",
  "render-2.webp": "Composition dominated by empty wall; subject cropped at the frame edge.",
};

const GROUP_LABEL = {
  interiors: "Interiors",
  "product-furniture": "Product & furniture",
  "retail-showroom": "Retail & showroom",
  "workspace-office": "Workspace & office",
  hospitality: "Hospitality",
  "exterior-architectural": "Architectural",
  other: "Other studies",
};

const q = (s) => JSON.stringify(s);
const rank = { strong: 0, standard: 1, weak: 2 };

const published = d.visuals
  .filter((v) => !EXCLUDE[v.file])
  .map((v) => {
    const src = `/media/visual/${v.file}`;
    const dim = dims[src];
    if (!dim) throw new Error("no dimensions for " + src);
    return { ...v, src, w: dim.w, h: dim.h };
  })
  .sort((a, b) => rank[a.quality] - rank[b.quality] || a.file.localeCompare(b.file));

const withheld = d.visuals.filter((v) => EXCLUDE[v.file]);

const groupsPresent = [...new Set(published.map((v) => v.group))].sort(
  (a, b) => published.filter((x) => x.group === b).length - published.filter((x) => x.group === a).length,
);

const out = `/**
 * Visual library — restored from the previous site's render and visualisation
 * archive, then reviewed image by image.
 *
 * Every item below was inspected: the group, subject and alt text describe what
 * is actually in the frame. ${withheld.length} of the ${d.visuals.length} legacy files are withheld from
 * public display and listed in WITHHELD_VISUALS with the reason.
 */

export type VisualGroup =
${groupsPresent.map((g) => `  | ${q(g)}`).join("\n")};

export const VISUAL_GROUP_LABELS: Record<VisualGroup, string> = {
${groupsPresent.map((g) => `  ${q(g)}: ${q(GROUP_LABEL[g])},`).join("\n")}
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
${published
  .map(
    (v) => `  {
    src: ${q(v.src)},
    title: ${q(v.subject.charAt(0).toUpperCase() + v.subject.slice(1))},
    alt: ${q(v.alt)},
    group: ${q(v.group)},
    width: ${v.w},
    height: ${v.h},
    quality: ${q(v.quality)},
  }`,
  )
  .join(",\n")},
];

/** Files deliberately not published, with the reason recorded. */
export const WITHHELD_VISUALS: { file: string; reason: string }[] = [
${withheld.map((v) => `  { file: ${q(v.file)}, reason: ${q(EXCLUDE[v.file])} }`).join(",\n")},
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
`;

fs.writeFileSync("lib/visuals.ts", out);
console.log(`lib/visuals.ts written`);
console.log(`  legacy files:  ${d.visuals.length}`);
console.log(`  published:     ${published.length}  (strong ${published.filter((v) => v.quality === "strong").length} / standard ${published.filter((v) => v.quality === "standard").length})`);
console.log(`  withheld:      ${withheld.length}`);
console.log(`\n  groups:`);
groupsPresent.forEach((g) =>
  console.log(`    ${GROUP_LABEL[g].padEnd(22)} ${published.filter((v) => v.group === g).length}`),
);
console.log(`\n  withheld files:`);
withheld.forEach((v) => console.log(`    ${v.file.padEnd(14)} ${EXCLUDE[v.file]}`));
