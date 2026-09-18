import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');

// If executed directly by plain `node` without tsx support, re-spawn via tsx
if (!process.env.XIYATO_TSX_RUNNER && !process.execArgv.some((a) => a.includes('tsx'))) {
  const npxCmd = process.platform === 'win32' ? 'npx.cmd' : 'npx';
  const result = spawnSync(npxCmd, ['tsx', __filename, ...process.argv.slice(2)], {
    stdio: 'inherit',
    env: { ...process.env, XIYATO_TSX_RUNNER: '1' },
    shell: true,
  });
  process.exit(result.status ?? 0);
}

// Dynamic imports of TypeScript project modules
const { default: robots } = await import('../app/robots');
const { default: sitemap } = await import('../app/sitemap');
const { POST: indexNowPost } = await import('../app/api/indexnow/route');
const { GET: keyRouteGet } = await import('../app/[key]/route');
const { organizationSchema, serviceSchema } = await import('../lib/seo');
const { chunkUrls, discoverCanonicalUrls, submitBatch } = await import('../scripts/submit-indexnow');

console.log('\n================================================================');
console.log('XIYÀTO BING SEARCH INFRASTRUCTURE & GEO AUTOMATED TEST SUITE');
console.log('================================================================\n');

let passCount = 0;
let failCount = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  [PASS] ${name}`);
    passCount++;
  } catch (err) {
    console.error(`  [FAIL] ${name}`);
    console.error(`         Error: ${err.message}`);
    failCount++;
  }
}

async function testAsync(name, fn) {
  try {
    await fn();
    console.log(`  [PASS] ${name}`);
    passCount++;
  } catch (err) {
    console.error(`  [FAIL] ${name}`);
    console.error(`         Error: ${err.message}`);
    failCount++;
  }
}

/* ------------------------------------------------------------------ */
/* 1. Robots Directives & Crawl Access (Requirement 3)                */
/* ------------------------------------------------------------------ */
console.log('--- 1. Robots Directives & Private Endpoint Protection ---');

test('Robots configuration exports valid MetadataRoute.Robots object', () => {
  const config = robots();
  assert.ok(config);
  assert.ok(Array.isArray(config.rules) || typeof config.rules === 'object');
  assert.equal(config.sitemap, 'https://xiyato.uk/sitemap.xml');
  assert.equal(config.host, 'https://xiyato.uk');
});

test('Robots rules explicitly target Bingbot alongside wildcard *', () => {
  const config = robots();
  const rules = Array.isArray(config.rules) ? config.rules : [config.rules];
  const userAgents = rules.flatMap((r) => (Array.isArray(r.userAgent) ? r.userAgent : [r.userAgent]));
  assert.ok(userAgents.includes('*'), 'Must include wildcard * user-agent');
  assert.ok(userAgents.includes('Bingbot'), 'Must include explicit Bingbot user-agent');
});

test('Robots rules allow indexable assets and static Next.js paths', () => {
  const config = robots();
  const rules = Array.isArray(config.rules) ? config.rules : [config.rules];
  const allowList = rules.flatMap((r) => (Array.isArray(r.allow) ? r.allow : [r.allow]));
  assert.ok(allowList.includes('/'), 'Must allow root document crawling');
  assert.ok(allowList.includes('/_next/static/'), 'Must allow Next.js static asset crawling');
  assert.ok(allowList.includes('/_next/image/'), 'Must allow Next.js image optimization crawling');
});

test('Robots rules strictly disallow /api/, /admin/, and /admin endpoints', () => {
  const config = robots();
  const rules = Array.isArray(config.rules) ? config.rules : [config.rules];
  const disallowList = rules.flatMap((r) => (Array.isArray(r.disallow) ? r.disallow : [r.disallow]));
  assert.ok(disallowList.includes('/api/'), 'Must disallow all /api/ endpoints');
  assert.ok(disallowList.includes('/admin/'), 'Must disallow /admin/ path');
  assert.ok(disallowList.includes('/admin'), 'Must disallow /admin route');
});

/* ------------------------------------------------------------------ */
/* 2. Canonical Sitemap & Genuine Timestamps (Requirement 3)          */
/* ------------------------------------------------------------------ */
console.log('\n--- 2. Canonical Sitemap Coverage & Genuine Timestamps ---');

test('Sitemap generates canonical URLs with genuine editorial timestamps', () => {
  const entries = sitemap();
  assert.ok(entries.length >= 28, `Expected at least 28 canonical URLs, found ${entries.length}`);

  for (const entry of entries) {
    assert.ok(entry.url.startsWith('https://xiyato.uk'), `URL must start with https://xiyato.uk: ${entry.url}`);
    assert.ok(entry.lastModified instanceof Date, `lastModified must be Date: ${entry.url}`);
    const year = entry.lastModified.getUTCFullYear();
    assert.equal(year, 2026, `lastModified year must be 2026: ${entry.url}`);
  }
});

test('Sitemap contains core commercial target routes from search intelligence graph', () => {
  const entries = sitemap();
  const urls = entries.map((e) => e.url);

  assert.ok(urls.includes('https://xiyato.uk/'), 'Missing home canonical URL');
  assert.ok(urls.includes('https://xiyato.uk/services/cad-technical-production'), 'Missing CAD production URL');
  assert.ok(urls.includes('https://xiyato.uk/services/cad/interior-fit-out-shop-drawings'), 'Missing CAD fitout subservice URL');
  assert.ok(urls.includes('https://xiyato.uk/services/visualisation-image-production'), 'Missing 3D visualisation URL');
  assert.ok(urls.includes('https://xiyato.uk/services/b2b-lead-generation'), 'Missing B2B lead gen URL');
  assert.ok(urls.includes('https://xiyato.uk/services/market-intelligence-research'), 'Missing market intelligence URL');
  assert.ok(urls.includes('https://xiyato.uk/services/ai-video-production'), 'Missing AI video URL');
  assert.ok(urls.includes('https://xiyato.uk/contact'), 'Missing contact URL');
  assert.ok(urls.includes('https://xiyato.uk/legal/privacy'), 'Missing privacy URL');
  assert.ok(urls.includes('https://xiyato.uk/legal/terms'), 'Missing terms URL');
});

test('Sitemap excludes unpublished legal draft routes to prevent soft 404s', () => {
  const entries = sitemap();
  const urls = entries.map((e) => e.url);
  assert.ok(!urls.includes('https://xiyato.uk/legal/cookies'), 'Unpublished cookies route must not appear in sitemap');
  assert.ok(!urls.includes('https://xiyato.uk/legal/accessibility'), 'Unpublished accessibility route must not appear in sitemap');
});

/* ------------------------------------------------------------------ */
/* 3. Bing Verification Assets & Layout Metadata (Requirement 1)      */
/* ------------------------------------------------------------------ */
console.log('\n--- 3. Bing Verification Assets & Layout Configuration ---');

test('public/BingSiteAuth.xml exists with valid XML and verification token', () => {
  const xmlPath = path.join(REPO_ROOT, 'public', 'BingSiteAuth.xml');
  assert.ok(fs.existsSync(xmlPath), 'public/BingSiteAuth.xml does not exist');
  const content = fs.readFileSync(xmlPath, 'utf-8');
  assert.ok(content.includes('<users>'), 'BingSiteAuth.xml missing <users> tag');
  assert.ok(content.includes('<user>c746da95e0c54178a9cb57f7229b19d4</user>'), 'BingSiteAuth.xml missing verification token');
});

test('public/c746da95e0c54178a9cb57f7229b19d4.txt exists and contains exact key', () => {
  const keyPath = path.join(REPO_ROOT, 'public', 'c746da95e0c54178a9cb57f7229b19d4.txt');
  assert.ok(fs.existsSync(keyPath), 'public/c746da95e0c54178a9cb57f7229b19d4.txt does not exist');
  const content = fs.readFileSync(keyPath, 'utf-8').trim();
  assert.equal(content, 'c746da95e0c54178a9cb57f7229b19d4');
});

test('app/layout.tsx contains msvalidate.01 and bingBot directives', () => {
  const layoutPath = path.join(REPO_ROOT, 'app', 'layout.tsx');
  const content = fs.readFileSync(layoutPath, 'utf-8');
  assert.ok(content.includes('"msvalidate.01": "c746da95e0c54178a9cb57f7229b19d4"'), 'layout.tsx missing msvalidate.01');
  assert.ok(content.includes('bingBot'), 'layout.tsx missing explicit bingBot directive');
  assert.ok(content.includes('"max-image-preview": "large"'), 'layout.tsx missing max-image-preview');
});

/* ------------------------------------------------------------------ */
/* 4. Dynamic Key Route Verification (Requirement 2)                  */
/* ------------------------------------------------------------------ */
console.log('\n--- 4. Dynamic IndexNow Key Verification Route ---');

await testAsync('GET /[key] returns 200 text/plain with key for .txt request', async () => {
  const req = new Request('https://xiyato.uk/c746da95e0c54178a9cb57f7229b19d4.txt');
  const res = await keyRouteGet(req, {
    params: Promise.resolve({ key: 'c746da95e0c54178a9cb57f7229b19d4.txt' }),
  });
  assert.equal(res.status, 200);
  assert.ok(res.headers.get('content-type')?.includes('text/plain'));
  const body = await res.text();
  assert.equal(body, 'c746da95e0c54178a9cb57f7229b19d4');
});

await testAsync('GET /[key] returns 200 text/plain with key without extension', async () => {
  const req = new Request('https://xiyato.uk/c746da95e0c54178a9cb57f7229b19d4');
  const res = await keyRouteGet(req, {
    params: Promise.resolve({ key: 'c746da95e0c54178a9cb57f7229b19d4' }),
  });
  assert.equal(res.status, 200);
  const body = await res.text();
  assert.equal(body, 'c746da95e0c54178a9cb57f7229b19d4');
});

await testAsync('GET /[key] honors INDEXNOW_KEY environment override', async () => {
  const originalKey = process.env.INDEXNOW_KEY;
  const customKey = 'a1b2c3d4e5f60718293a4b5c6d7e8f90';
  process.env.INDEXNOW_KEY = customKey;

  try {
    const req = new Request(`https://xiyato.uk/${customKey}.txt`);
    const res = await keyRouteGet(req, {
      params: Promise.resolve({ key: `${customKey}.txt` }),
    });
    assert.equal(res.status, 200);
    const body = await res.text();
    assert.equal(body, customKey);
  } finally {
    if (originalKey !== undefined) {
      process.env.INDEXNOW_KEY = originalKey;
    } else {
      delete process.env.INDEXNOW_KEY;
    }
  }
});

await testAsync('GET /[key] returns 404 for unrecognized key', async () => {
  const req = new Request('https://xiyato.uk/unknown-key-12345.txt');
  const res = await keyRouteGet(req, {
    params: Promise.resolve({ key: 'unknown-key-12345.txt' }),
  });
  assert.equal(res.status, 404);
});

/* ------------------------------------------------------------------ */
/* 5. Hardened IndexNow Endpoint (Requirement 2)                      */
/* ------------------------------------------------------------------ */
console.log('\n--- 5. Hardened IndexNow API Handler (/api/indexnow) ---');

await testAsync('POST /api/indexnow fails closed (500) when INDEXNOW_SECRET is missing', async () => {
  const origSecret = process.env.INDEXNOW_SECRET;
  const origCron = process.env.CRON_SECRET;
  delete process.env.INDEXNOW_SECRET;
  delete process.env.CRON_SECRET;

  try {
    const req = new Request('https://xiyato.uk/api/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ urls: ['https://xiyato.uk/'] }),
    });
    const res = await indexNowPost(req);
    assert.equal(res.status, 500);
    const json = await res.json();
    assert.equal(json.ok, false);
    assert.ok(json.error.includes('not configured'));
  } finally {
    if (origSecret) process.env.INDEXNOW_SECRET = origSecret;
    if (origCron) process.env.CRON_SECRET = origCron;
  }
});

await testAsync('POST /api/indexnow rejects invalid bearer token with 401', async () => {
  process.env.INDEXNOW_SECRET = 'correct-test-secret-value-123';
  const req = new Request('https://xiyato.uk/api/indexnow', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer wrong-secret-token',
    },
    body: JSON.stringify({ urls: ['https://xiyato.uk/'] }),
  });
  const res = await indexNowPost(req);
  assert.equal(res.status, 401);
  const json = await res.json();
  assert.equal(json.ok, false);
  assert.equal(json.error, 'Unauthorized.');
});

await testAsync('POST /api/indexnow rejects payload exceeding 20 URLs with 400', async () => {
  process.env.INDEXNOW_SECRET = 'valid-test-secret';
  const urls = Array.from({ length: 21 }, (_, i) => `https://xiyato.uk/page-${i}`);
  const req = new Request('https://xiyato.uk/api/indexnow', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer valid-test-secret',
    },
    body: JSON.stringify({ urls }),
  });
  const res = await indexNowPost(req);
  assert.equal(res.status, 400);
  const json = await res.json();
  assert.equal(json.ok, false);
  assert.ok(json.error.includes('Exceeded maximum of 20 URLs'));
});

await testAsync('POST /api/indexnow strictly rejects non-HTTPS URLs with 400', async () => {
  process.env.INDEXNOW_SECRET = 'valid-test-secret';
  const req = new Request('https://xiyato.uk/api/indexnow', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer valid-test-secret',
    },
    body: JSON.stringify({ urls: ['http://xiyato.uk/insecure'] }),
  });
  const res = await indexNowPost(req);
  assert.equal(res.status, 400);
  const json = await res.json();
  assert.equal(json.ok, false);
  assert.ok(json.error.includes('URL must use HTTPS protocol'));
});

await testAsync('POST /api/indexnow strictly rejects non-canonical domains with 400', async () => {
  process.env.INDEXNOW_SECRET = 'valid-test-secret';
  const invalidHosts = [
    'https://attacker.com/exploit',
    'https://google.com/',
    'https://www.xiyato.uk/subpage', // www redirected, must be apex
  ];

  for (const invalidUrl of invalidHosts) {
    const req = new Request('https://xiyato.uk/api/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer valid-test-secret',
      },
      body: JSON.stringify({ urls: [invalidUrl] }),
    });
    const res = await indexNowPost(req);
    assert.equal(res.status, 400, `Expected 400 for ${invalidUrl}, got ${res.status}`);
    const json = await res.json();
    assert.equal(json.ok, false);
    assert.ok(json.error.includes('is not authorized for submission'));
  }
});

await testAsync('POST /api/indexnow propagates upstream failure (e.g. 403) and does not mask as 200', async () => {
  process.env.INDEXNOW_SECRET = 'valid-test-secret';
  const originalFetch = globalThis.fetch;

  // Mock upstream returning 403 Forbidden
  globalThis.fetch = async () =>
    new Response('Forbidden: Invalid Key', {
      status: 403,
      statusText: 'Forbidden',
      headers: { 'Content-Type': 'text/plain' },
    });

  try {
    const req = new Request('https://xiyato.uk/api/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer valid-test-secret',
      },
      body: JSON.stringify({ urls: ['https://xiyato.uk/services'] }),
    });
    const res = await indexNowPost(req);
    assert.equal(res.status, 403, 'Upstream 403 must be propagated to caller, not masked as 200');
    const json = await res.json();
    assert.equal(json.ok, false);
    assert.equal(json.status, 403);
    assert.equal(json.error, 'Upstream IndexNow submission failed');
  } finally {
    globalThis.fetch = originalFetch;
  }
});

await testAsync('POST /api/indexnow returns 200 with ok: true when upstream returns 202 Accepted', async () => {
  process.env.INDEXNOW_SECRET = 'valid-test-secret';
  const originalFetch = globalThis.fetch;

  let capturedHeaders = null;
  let capturedBody = null;

  globalThis.fetch = async (url, init) => {
    capturedHeaders = init?.headers;
    capturedBody = JSON.parse(init?.body || '{}');
    return new Response('', {
      status: 202,
      statusText: 'Accepted',
    });
  };

  try {
    const req = new Request('https://xiyato.uk/api/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer valid-test-secret',
      },
      body: JSON.stringify({ urls: ['https://xiyato.uk/services/cad-technical-production'] }),
    });
    const res = await indexNowPost(req);
    assert.equal(res.status, 200);
    const json = await res.json();
    assert.equal(json.ok, true);
    assert.equal(json.status, 202);
    assert.equal(json.submittedUrls, 1);

    // Verify upstream protocol compliance
    assert.equal(capturedHeaders['Content-Type'], 'application/json; charset=utf-8');
    assert.equal(capturedBody.host, 'xiyato.uk');
    assert.equal(capturedBody.key, 'c746da95e0c54178a9cb57f7229b19d4');
    assert.equal(capturedBody.keyLocation, 'https://xiyato.uk/c746da95e0c54178a9cb57f7229b19d4.txt');
    assert.deepEqual(capturedBody.urlList, ['https://xiyato.uk/services/cad-technical-production']);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

/* ------------------------------------------------------------------ */
/* 6. Schema.org GEO Entity Enrichment (Requirement 4)                */
/* ------------------------------------------------------------------ */
console.log('\n--- 6. Schema.org GEO Entity Enrichment & Zero Fabrications ---');

test('organizationSchema contains canonical email hello@xiyato.uk at root and in contact points', () => {
  const schema = organizationSchema();
  assert.equal(schema['@type'], 'Organization');
  assert.equal(schema.email, 'hello@xiyato.uk');

  assert.ok(Array.isArray(schema.contactPoint), 'contactPoint must be array');
  assert.equal(schema.contactPoint.length, 2, 'Must have UK and India contact points');

  const ukContact = schema.contactPoint.find((c) => c.telephone === '+44 7882 746212');
  assert.ok(ukContact, 'Missing UK contact point');
  assert.equal(ukContact.email, 'hello@xiyato.uk');
  assert.equal(ukContact.contactType, 'customer service');

  const inContact = schema.contactPoint.find((c) => c.telephone === '+91 70283 11226');
  assert.ok(inContact, 'Missing India contact point');
  assert.equal(inContact.email, 'hello@xiyato.uk');
  assert.equal(inContact.contactType, 'technical support');
});

test('serviceSchema contains structured Audience specification for GEO retrievability', () => {
  const schema = serviceSchema({
    name: 'CAD & Technical Production',
    description: 'Bespoke joinery and technical drawings',
    path: '/services/cad-technical-production',
  });

  assert.equal(schema['@type'], 'Service');
  assert.ok(schema.audience, 'serviceSchema missing audience');
  assert.equal(schema.audience['@type'], 'Audience');
  assert.equal(
    schema.audience.audienceType,
    'Architectural practices, interior studios, developers, luxury brands'
  );
});

test('Schema.org entities strictly adhere to zero-fabrication standards', () => {
  const schema = organizationSchema();
  // No fake aggregate ratings
  assert.equal(schema.aggregateRating, undefined, 'Must not include fabricated aggregateRating');
  // No fake reviews
  assert.equal(schema.review, undefined, 'Must not include fabricated reviews');
  // Verified founder only
  assert.equal(schema.founder?.name, 'Chaitanya Gaikwad');
  // Only legitimate Instagram profile in sameAs
  assert.ok(schema.sameAs?.includes('https://www.instagram.com/xiyato.uk/'));
});

/* ------------------------------------------------------------------ */
/* 7. Crawl Automation Batching & Discovery (Requirement 2)           */
/* ------------------------------------------------------------------ */
console.log('\n--- 7. Crawl Automation Script Subsystem ---');

test('chunkUrls partitions arbitrarily sized URL lists into batches of <= 20', () => {
  const testUrls = Array.from({ length: 47 }, (_, i) => `https://xiyato.uk/route-${i}`);
  const chunks = chunkUrls(testUrls, 20);
  assert.equal(chunks.length, 3);
  assert.equal(chunks[0].length, 20);
  assert.equal(chunks[1].length, 20);
  assert.equal(chunks[2].length, 7);
});

test('discoverCanonicalUrls extracts valid canonical routes', () => {
  const discovered = discoverCanonicalUrls();
  assert.ok(discovered.length >= 28);
  assert.ok(discovered.every((u) => u.startsWith('https://xiyato.uk')));
});

await testAsync('submitBatch executes dryRun without errors', async () => {
  const testBatch = ['https://xiyato.uk/', 'https://xiyato.uk/services'];
  const res = await submitBatch(testBatch, 1, 1, { dryRun: true });
  assert.equal(res.ok, true);
  assert.equal(res.status, 202);
  assert.equal(res.urlCount, 2);
});

/* ------------------------------------------------------------------ */
/* Summary & Exit                                                     */
/* ------------------------------------------------------------------ */
console.log('\n================================================================');
console.log(`BING SEARCH INFRASTRUCTURE SUITE: ${passCount} PASSED, ${failCount} FAILED`);
console.log('================================================================\n');

if (failCount > 0) {
  process.exit(1);
}
