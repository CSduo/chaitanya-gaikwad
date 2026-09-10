import sitemap from "../app/sitemap";
import { SITE } from "../lib/site";

const DEFAULT_KEY = "c746da95e0c54178a9cb57f7229b19d4";
const MAX_URLS_PER_BATCH = 20;

export interface BatchSubmissionResult {
  batchNumber: number;
  totalBatches: number;
  urlCount: number;
  status: number;
  ok: boolean;
  error?: string;
  durationMs: number;
}

/**
 * Partitions an array of URLs into chunks of size <= chunkSize.
 */
export function chunkUrls(urls: string[], chunkSize = MAX_URLS_PER_BATCH): string[][] {
  const chunks: string[][] = [];
  for (let i = 0; i < urls.length; i += chunkSize) {
    chunks.push(urls.slice(i, i + chunkSize));
  }
  return chunks;
}

/**
 * Discovers canonical URLs from sitemap.
 */
export function discoverCanonicalUrls(): string[] {
  const entries = sitemap();
  return entries.map((e) => e.url);
}

/**
 * Submits a batch of URLs to the IndexNow protocol (either via local /api/indexnow or direct upstream).
 */
export async function submitBatch(
  batch: string[],
  batchIndex: number,
  totalBatches: number,
  options: {
    endpoint?: string;
    secret?: string;
    apiKey?: string;
    dryRun?: boolean;
  } = {}
): Promise<BatchSubmissionResult> {
  const startTime = Date.now();
  const apiKey = options.apiKey || process.env.INDEXNOW_KEY || DEFAULT_KEY;

  if (options.dryRun) {
    console.log(`[DRY-RUN] Batch ${batchIndex}/${totalBatches} (${batch.length} URLs):`);
    batch.forEach((u) => console.log(`  - ${u}`));
    return {
      batchNumber: batchIndex,
      totalBatches,
      urlCount: batch.length,
      status: 202,
      ok: true,
      durationMs: Date.now() - startTime,
    };
  }

  // If local or configured endpoint is specified with secret, route through endpoint
  if (options.endpoint && options.secret) {
    try {
      const res = await fetch(options.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${options.secret}`,
        },
        body: JSON.stringify({ urls: batch }),
      });

      const body = await res.json().catch(() => ({}));
      const durationMs = Date.now() - startTime;

      return {
        batchNumber: batchIndex,
        totalBatches,
        urlCount: batch.length,
        status: res.status,
        ok: res.ok || res.status === 200 || res.status === 202,
        error: res.ok ? undefined : body.error || `HTTP ${res.status}`,
        durationMs,
      };
    } catch (err) {
      return {
        batchNumber: batchIndex,
        totalBatches,
        urlCount: batch.length,
        status: 502,
        ok: false,
        error: err instanceof Error ? err.message : String(err),
        durationMs: Date.now() - startTime,
      };
    }
  }

  // Otherwise, submit directly to IndexNow upstream API
  const payload = {
    host: "xiyato.uk",
    key: apiKey,
    keyLocation: `${SITE.url}/${apiKey}.txt`,
    urlList: batch,
  };

  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    const durationMs = Date.now() - startTime;
    const ok = res.ok || res.status === 200 || res.status === 202;

    return {
      batchNumber: batchIndex,
      totalBatches,
      urlCount: batch.length,
      status: res.status,
      ok,
      error: ok ? undefined : `Upstream HTTP ${res.status}`,
      durationMs,
    };
  } catch (err) {
    return {
      batchNumber: batchIndex,
      totalBatches,
      urlCount: batch.length,
      status: 502,
      ok: false,
      error: err instanceof Error ? err.message : String(err),
      durationMs: Date.now() - startTime,
    };
  }
}

/**
 * Main execution handler.
 */
export async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const specificUrls = args.filter((a) => !a.startsWith("--"));

  const targetUrls = specificUrls.length > 0 ? specificUrls : discoverCanonicalUrls();
  const batches = chunkUrls(targetUrls, MAX_URLS_PER_BATCH);

  console.log("================================================================");
  console.log("XIYÀTO INDEXNOW CRAWL AUTOMATION DISPATCH");
  console.log("================================================================");
  console.log(`Total URLs to submit: ${targetUrls.length}`);
  console.log(`Total batches (max ${MAX_URLS_PER_BATCH} URLs/batch): ${batches.length}`);
  console.log(`Mode: ${dryRun ? "DRY RUN (no network requests)" : "LIVE DISPATCH"}`);
  console.log("----------------------------------------------------------------\n");

  const endpoint = process.env.INDEXNOW_ENDPOINT;
  const secret = process.env.INDEXNOW_SECRET;
  const apiKey = process.env.INDEXNOW_KEY || DEFAULT_KEY;

  const results: BatchSubmissionResult[] = [];
  let failureCount = 0;

  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];
    const batchNumber = i + 1;
    console.log(`[Batch ${batchNumber}/${batches.length}] Submitting ${batch.length} URLs...`);

    const result = await submitBatch(batch, batchNumber, batches.length, {
      endpoint,
      secret,
      apiKey,
      dryRun,
    });

    results.push(result);

    if (result.ok) {
      console.log(`  ✔ Batch ${batchNumber} accepted (Status: ${result.status}, Time: ${result.durationMs}ms)`);
    } else {
      console.error(`  ✖ Batch ${batchNumber} failed (Status: ${result.status}, Error: ${result.error})`);
      failureCount++;
    }
  }

  console.log("\n================================================================");
  console.log(`DISPATCH SUMMARY: ${batches.length - failureCount}/${batches.length} BATCHES SUCCESSFUL`);
  console.log("================================================================");

  if (failureCount > 0) {
    process.exit(1);
  }
}

if (import.meta.url === `file:///${process.argv[1].replace(/\\/g, "/")}`) {
  main().catch((err) => {
    console.error("IndexNow crawl automation fatal error:", err);
    process.exit(1);
  });
}
