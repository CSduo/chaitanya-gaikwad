import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Re-spawn via tsx if needed
if (!process.env.XIYATO_TSX_RUNNER && !process.execArgv.some((a) => a.includes("tsx"))) {
  const npxCmd = process.platform === "win32" ? "npx.cmd" : "npx";
  const result = spawnSync(npxCmd, ["tsx", __filename, ...process.argv.slice(2)], {
    stdio: "inherit",
    env: { ...process.env, XIYATO_TSX_RUNNER: "1" },
    shell: true,
  });
  process.exit(result.status ?? 0);
}

const { POST: indexNowPost } = await import("../app/api/indexnow/route");
const { GET: keyRouteGet } = await import("../app/[key]/route");
const { default: robots } = await import("../app/robots");
const { default: sitemap } = await import("../app/sitemap");
const { chunkUrls, discoverCanonicalUrls, submitBatch } = await import("../scripts/submit-indexnow");

console.log("\n================================================================");
console.log("XIYÀTO ADVERSARIAL EMPIRICAL STRESS TEST SUITE (INFRASTRUCTURE)");
console.log("================================================================\n");

let passed = 0;
let failed = 0;

async function test(name, fn) {
  try {
    await fn();
    console.log(`  [PASS] ${name}`);
    passed++;
  } catch (err) {
    console.error(`  [FAIL] ${name}`);
    console.error(`         ${err.stack || err.message}`);
    failed++;
  }
}

async function main() {
  // -------------------------------------------------------------
  // 1. Chunking & Partitioning Stress Harness
  // -------------------------------------------------------------
  console.log("--- Suite 1: URL Chunking Stress & Oracle ---");

  await test("Chunking oracle over various list sizes [0, 1, 19, 20, 21, 37, 40, 99, 105]", () => {
    const testSizes = [0, 1, 19, 20, 21, 37, 40, 99, 105];
    for (const size of testSizes) {
      const fakeUrls = Array.from({ length: size }, (_, i) => `https://xiyato.uk/page-${i}`);
      const batches = chunkUrls(fakeUrls, 20);

      // Invariant 1: No batch exceeds 20
      for (const b of batches) {
        assert.ok(b.length <= 20, `Batch size ${b.length} exceeded max 20`);
        assert.ok(b.length > 0, "Batch size must be greater than 0");
      }

      // Invariant 2: Total elements preserved exactly
      const flattened = batches.flat();
      assert.equal(flattened.length, size, `Length mismatch: expected ${size}, got ${flattened.length}`);
      for (let i = 0; i < size; i++) {
        assert.equal(flattened[i], fakeUrls[i]);
      }

      // Invariant 3: Expected batch count
      const expectedBatchCount = Math.ceil(size / 20);
      assert.equal(batches.length, expectedBatchCount, `Batch count mismatch: expected ${expectedBatchCount}, got ${batches.length}`);
    }
  });

  // -------------------------------------------------------------
  // 2. Dynamic Key Verification Route Stress Harness
  // -------------------------------------------------------------
  console.log("\n--- Suite 2: Dynamic Key Verification Route Stress ---");

  const VALID_KEY = "c746da95e0c54178a9cb57f7229b19d4";

  await test("Key route returns 200 for exact key without .txt", async () => {
    const req = new Request(`https://xiyato.uk/${VALID_KEY}`);
    const res = await keyRouteGet(req, { params: Promise.resolve({ key: VALID_KEY }) });
    assert.equal(res.status, 200);
    assert.equal(res.headers.get("content-type"), "text/plain; charset=utf-8");
    const text = await res.text();
    assert.equal(text, VALID_KEY);
  });

  await test("Key route returns 200 for exact key with .txt extension", async () => {
    const req = new Request(`https://xiyato.uk/${VALID_KEY}.txt`);
    const res = await keyRouteGet(req, { params: Promise.resolve({ key: `${VALID_KEY}.txt` }) });
    assert.equal(res.status, 200);
    assert.equal(res.headers.get("content-type"), "text/plain; charset=utf-8");
    const text = await res.text();
    assert.equal(text, VALID_KEY);
  });

  await test("Key route returns 404 for wrong key", async () => {
    const req = new Request("https://xiyato.uk/wrongkey123");
    const res = await keyRouteGet(req, { params: Promise.resolve({ key: "wrongkey123" }) });
    assert.equal(res.status, 404);
  });

  await test("Key route returns 404 for wrong key with .txt", async () => {
    const req = new Request("https://xiyato.uk/wrongkey123.txt");
    const res = await keyRouteGet(req, { params: Promise.resolve({ key: "wrongkey123.txt" }) });
    assert.equal(res.status, 404);
  });

  await test("Key route returns 404 for arbitrary paths", async () => {
    const arbitrary = ["favicon.ico", "robots.txt", "admin", "../secret", "c746da95e0c54178a9cb57f7229b19d5"];
    for (const a of arbitrary) {
      const req = new Request(`https://xiyato.uk/${a}`);
      const res = await keyRouteGet(req, { params: Promise.resolve({ key: a }) });
      assert.equal(res.status, 404, `Expected 404 for ${a}, got ${res.status}`);
    }
  });

  // -------------------------------------------------------------
  // 3. Static Files & Root Verification Assets
  // -------------------------------------------------------------
  console.log("\n--- Suite 3: Static Key & XML File Integrity ---");

  await test("Static key file exists and matches VALID_KEY", () => {
    const keyPath = path.resolve(__dirname, `../public/${VALID_KEY}.txt`);
    assert.ok(fs.existsSync(keyPath), `File missing: ${keyPath}`);
    const content = fs.readFileSync(keyPath, "utf8").trim();
    assert.equal(content, VALID_KEY);
  });

  await test("Static BingSiteAuth.xml exists and contains valid XML with user key", () => {
    const xmlPath = path.resolve(__dirname, "../public/BingSiteAuth.xml");
    assert.ok(fs.existsSync(xmlPath), `File missing: ${xmlPath}`);
    const content = fs.readFileSync(xmlPath, "utf8");
    assert.ok(content.includes("<users>"), "Missing <users>");
    assert.ok(content.includes(`<user>${VALID_KEY}</user>`), "Missing <user> with key");
  });

  // -------------------------------------------------------------
  // 4. API Handler: /api/indexnow Security & Fail-Closed Behavior
  // -------------------------------------------------------------
  console.log("\n--- Suite 4: /api/indexnow Security & Boundary Stress ---");

  const SECRET = "test-secret-value-12345";
  process.env.INDEXNOW_SECRET = SECRET;
  process.env.INDEXNOW_KEY = VALID_KEY;

  await test("Reject missing Authorization header with 401", async () => {
    const req = new Request("https://xiyato.uk/api/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ urls: ["https://xiyato.uk/"] }),
    });
    const res = await indexNowPost(req);
    assert.equal(res.status, 401);
    const data = await res.json();
    assert.equal(data.ok, false);
  });

  await test("Reject invalid Authorization token with 401", async () => {
    const req = new Request("https://xiyato.uk/api/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer invalid-token",
      },
      body: JSON.stringify({ urls: ["https://xiyato.uk/"] }),
    });
    const res = await indexNowPost(req);
    assert.equal(res.status, 401);
    const data = await res.json();
    assert.equal(data.ok, false);
  });

  await test("Reject mismatched length token in constant time with 401", async () => {
    const req = new Request("https://xiyato.uk/api/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer short",
      },
      body: JSON.stringify({ urls: ["https://xiyato.uk/"] }),
    });
    const res = await indexNowPost(req);
    assert.equal(res.status, 401);
  });

  await test("Reject unconfigured secret with 500 (fail-closed)", async () => {
    delete process.env.INDEXNOW_SECRET;
    delete process.env.CRON_SECRET;
    try {
      const req = new Request("https://xiyato.uk/api/indexnow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${SECRET}`,
        },
        body: JSON.stringify({ urls: ["https://xiyato.uk/"] }),
      });
      const res = await indexNowPost(req);
      assert.equal(res.status, 500);
    } finally {
      process.env.INDEXNOW_SECRET = SECRET; // restore immediately
    }
  });

  await test("Reject payload with > 20 URLs with 400", async () => {
    const urls21 = Array.from({ length: 21 }, (_, i) => `https://xiyato.uk/page-${i}`);
    const req = new Request("https://xiyato.uk/api/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SECRET}`,
      },
      body: JSON.stringify({ urls: urls21 }),
    });
    const res = await indexNowPost(req);
    assert.equal(res.status, 400);
    const data = await res.json();
    assert.ok(data.error.includes("maximum of 20 URLs"));
  });

  await test("Reject non-HTTPS URLs with 400", async () => {
    const req = new Request("https://xiyato.uk/api/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SECRET}`,
      },
      body: JSON.stringify({ urls: ["http://xiyato.uk/page"] }),
    });
    const res = await indexNowPost(req);
    assert.equal(res.status, 400);
    const data = await res.json();
    assert.ok(data.error.includes("HTTPS"));
  });

  await test("Reject non-canonical domains (adversarial domain spoofing) with 400", async () => {
    const spoofedDomains = [
      "https://evil.com/xiyato",
      "https://www.xiyato.uk/",
      "https://subdomain.xiyato.uk/",
      "https://xiyato.co.uk/",
      "https://xiyato.uk.attacker.com/",
    ];

    for (const url of spoofedDomains) {
      const req = new Request("https://xiyato.uk/api/indexnow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${SECRET}`,
        },
        body: JSON.stringify({ urls: [url] }),
      });
      const res = await indexNowPost(req);
      assert.equal(res.status, 400, `Expected 400 for spoofed url: ${url}`);
      const data = await res.json();
      assert.ok(data.error.includes("not authorized"), `Expected authorization error for ${url}`);
    }
  });

  await test("Reject malformed URLs with 400", async () => {
    const req = new Request("https://xiyato.uk/api/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SECRET}`,
      },
      body: JSON.stringify({ urls: ["://malformed-url"] }),
    });
    const res = await indexNowPost(req);
    assert.equal(res.status, 400);
  });

  // -------------------------------------------------------------
  // 5. Upstream Error Propagation Stress
  // -------------------------------------------------------------
  console.log("\n--- Suite 5: Upstream Status Propagation (No masking) ---");

  await test("Upstream 422 Unprocessable Entity propagates as 422", async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async () => new Response(JSON.stringify({ message: "Invalid host" }), {
      status: 422,
      statusText: "Unprocessable Entity",
    });

    try {
      const req = new Request("https://xiyato.uk/api/indexnow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${SECRET}`,
        },
        body: JSON.stringify({ urls: ["https://xiyato.uk/services"] }),
      });
      const res = await indexNowPost(req);
      assert.equal(res.status, 422, `Expected 422 to propagate, got ${res.status}`);
      const data = await res.json();
      assert.equal(data.ok, false);
      assert.equal(data.status, 422);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  await test("Upstream 403 Forbidden propagates as 403", async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async () => new Response("Forbidden", {
      status: 403,
      statusText: "Forbidden",
    });

    try {
      const req = new Request("https://xiyato.uk/api/indexnow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${SECRET}`,
        },
        body: JSON.stringify({ urls: ["https://xiyato.uk/services"] }),
      });
      const res = await indexNowPost(req);
      assert.equal(res.status, 403, `Expected 403 to propagate, got ${res.status}`);
      const data = await res.json();
      assert.equal(data.ok, false);
      assert.equal(data.status, 403);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  await test("Upstream 200 or 202 returns ok: true", async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async () => new Response(null, { status: 202, statusText: "Accepted" });

    try {
      const req = new Request("https://xiyato.uk/api/indexnow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${SECRET}`,
        },
        body: JSON.stringify({ urls: ["https://xiyato.uk/services"] }),
      });
      const res = await indexNowPost(req);
      assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.ok, true);
    assert.equal(data.status, 202);
    assert.equal(data.submittedUrls, 1);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  // -------------------------------------------------------------
  // 6. Robots Directives
  // -------------------------------------------------------------
  console.log("\n--- Suite 6: Robots Directives Verification ---");

  await test("Robots rules contain Bingbot and proper disallows", () => {
    const r = robots();
    assert.equal(r.sitemap, "https://xiyato.uk/sitemap.xml");
    assert.equal(r.host, "https://xiyato.uk");
    
    const rules = Array.isArray(r.rules) ? r.rules : [r.rules];
    const bingbotRule = rules.find((rule) => {
      const agents = Array.isArray(rule.userAgent) ? rule.userAgent : [rule.userAgent];
      return agents.includes("Bingbot");
    });
    assert.ok(bingbotRule, "Bingbot rule block missing");
    
    const disallows = Array.isArray(bingbotRule.disallow) ? bingbotRule.disallow : [bingbotRule.disallow];
    assert.ok(disallows.includes("/api/"), "Missing disallow /api/");
    assert.ok(disallows.includes("/admin/"), "Missing disallow /admin/");
    assert.ok(disallows.includes("/admin"), "Missing disallow /admin");

    const allows = Array.isArray(bingbotRule.allow) ? bingbotRule.allow : [bingbotRule.allow];
    assert.ok(allows.includes("/"), "Missing allow /");
    assert.ok(allows.includes("/_next/static/"), "Missing allow /_next/static/");
    assert.ok(allows.includes("/_next/image/"), "Missing allow /_next/image/");
  });

  // Summary
  console.log("\n================================================================");
  console.log(`STRESS TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log("================================================================\n");

  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

main().catch((err) => {
  console.error("Fatal test runner error:", err);
  process.exit(1);
});
