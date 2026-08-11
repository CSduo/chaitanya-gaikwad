const fs = require("fs");
const d = JSON.parse(fs.readFileSync(".legacy-extract/workflow-result.json", "utf8"));

const ORDER = [
  "cad-technical-production",
  "growth-marketing-b2b",
  "visualisation-image-production",
  "video-ai-film-editing",
  "automation-workflow-systems",
  "website-design-development",
];
const q = (s) => JSON.stringify(s);

const services = ORDER.map((slug, i) => {
  const s = d.services.find((x) => x.slug === slug);
  if (!s) throw new Error("missing service " + slug);
  return `  {
    slug: ${q(s.slug)},
    name: ${q(s.name)},
    shortName: ${q(s.shortName)},
    motif: ${q(s.motif)},
    summary: ${q(s.summary)},
    overview: ${q(s.overview)},
    intro: [
${s.intro.map((p) => "      " + q(p)).join(",\n")},
    ],
    groups: [
${s.groups.map((g) => `      {
        title: ${q(g.title)},${g.intro ? `\n        intro: ${q(g.intro)},` : ""}
        items: [
${g.items.map((it) => "          " + q(it)).join(",\n")},
        ],
      }`).join(",\n")},
    ],
    process: [
${s.process.map((p) => `      { step: ${q(p.step)}, title: ${q(p.title)}, body: ${q(p.body)} }`).join(",\n")},
    ],
    deliverables: [
${s.deliverables.map((x) => "      " + q(x)).join(",\n")},
    ],${s.boundary ? `\n    boundary: ${q(s.boundary)},` : ""}
    order: ${i + 1},
  }`;
}).join(",\n\n");

const file = `/**
 * Service definitions — six primary service areas.
 *
 * Restored and expanded from the nine services the previous site described.
 * Content is grounded in the legacy copy and the real project evidence in this
 * repository. No client, metric or outcome is invented; where a service has no
 * published case-study evidence, its \`boundary\` says so plainly.
 */

export type ServiceSlug =
${ORDER.map((s) => `  | ${q(s)}`).join("\n")};

export type CapabilityGroup = {
  title: string;
  intro?: string;
  items: string[];
};

export type Service = {
  slug: ServiceSlug;
  name: string;
  shortName: string;
  /** Secondary brand register. Never used as the service name. */
  motif: string;
  /** One sentence, used on cards and in navigation contexts. */
  summary: string;
  /** Two to three sentences for the services index. */
  overview: string;
  /** Opening paragraphs on the service page. */
  intro: string[];
  groups: CapabilityGroup[];
  process: { step: string; title: string; body: string }[];
  deliverables: string[];
  /** Scope-of-responsibility statement, where one is genuinely needed. */
  boundary?: string;
  order: number;
};

export const SERVICES: Service[] = [
${services},
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function serviceName(slug: ServiceSlug): string {
  return SERVICES.find((s) => s.slug === slug)?.name ?? slug;
}

/** Anchor id for the matching homepage service chapter. */
export function serviceAnchor(slug: ServiceSlug): string {
  return \`service-\${slug}\`;
}
`;

fs.writeFileSync("lib/services.ts", file);
console.log("lib/services.ts written —", ORDER.length, "services");
ORDER.forEach((s) => {
  const x = d.services.find((y) => y.slug === s);
  console.log(`  ${s.padEnd(34)} ${x.groups.reduce((n, g) => n + g.items.length, 0)} capabilities`);
});
