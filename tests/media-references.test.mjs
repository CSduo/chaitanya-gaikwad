import assert from "node:assert/strict";
import { test } from "node:test";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

/*
  Every /media path the site references must exist in public/. Two gallery
  entries on /work/interior-visualisation-studies once pointed at files that had
  been deliberately removed, so next/image answered 400 and the key 3D proof
  page showed broken images. This guards both the typed content layer and any
  literal path written directly into a page or component.
*/

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = join(ROOT, "public");
const MEDIA_PATTERN = /\/media\/[A-Za-z0-9_./-]+\.[A-Za-z0-9]+/g;

function collectMediaStrings(value, found = new Set(), seen = new WeakSet()) {
  if (typeof value === "string") {
    for (const match of value.matchAll(MEDIA_PATTERN)) found.add(match[0]);
  } else if (value && typeof value === "object") {
    if (seen.has(value)) return found;
    seen.add(value);
    for (const item of Array.isArray(value) ? value : Object.values(value)) collectMediaStrings(item, found, seen);
  }
  return found;
}

function missing(paths) {
  return [...paths].filter((p) => !existsSync(join(PUBLIC, decodeURIComponent(p))));
}

test("every /media path in the typed content layer exists in public/", async () => {
  const modules = await Promise.all([
    import("../lib/case-studies.ts"),
    import("../lib/portfolio.ts"),
    import("../lib/visuals.ts"),
    import("../lib/new-visuals.ts"),
    import("../lib/company.ts"),
    import("../lib/services.ts"),
  ]);
  const referenced = new Set();
  for (const mod of modules) {
    for (const [name, value] of Object.entries(mod)) {
      // WITHHELD_VISUALS records files deliberately *not* published.
      if (name === "WITHHELD_VISUALS" || typeof value === "function") continue;
      collectMediaStrings(value, referenced);
    }
  }
  assert.ok(referenced.size > 50, `expected the content layer to reference media, found ${referenced.size}`);
  assert.deepEqual(missing(referenced), [], "referenced media files are missing from public/");
});

test("every literal /media path in app/ and components/ exists in public/", () => {
  const referenced = new Set();
  const walk = (dir) => {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      if (statSync(full).isDirectory()) walk(full);
      else if (/\.(tsx?|css)$/.test(entry)) collectMediaStrings(readFileSync(full, "utf8"), referenced);
    }
  };
  walk(join(ROOT, "app"));
  walk(join(ROOT, "components"));
  assert.deepEqual(missing(referenced), [], "literal media paths are missing from public/");
});

test("the interior visualisation case study no longer references withheld files", async () => {
  const { getCaseStudy } = await import("../lib/case-studies.ts");
  const { WITHHELD_VISUALS } = await import("../lib/visuals.ts");
  const study = getCaseStudy("interior-visualisation-studies");
  const withheld = new Set(WITHHELD_VISUALS.map((v) => `/media/visual/${v.file}`));
  const offending = (study.images ?? []).filter((img) => withheld.has(img.src)).map((img) => img.src);
  assert.deepEqual(offending, []);
});
