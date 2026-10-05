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
const { NON_CANONICAL_PRODUCTION_HOSTS, default: nextConfig } = await import('../next.config');
const { organizationSchema, serviceSchema, siteGraphSchema, personSchema } = await import('../lib/seo');
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

test('Robots configuration exports one sitemap line and no non-standard Host directive', () => {
  const config = robots();
  assert.ok(config);
  assert.ok(Array.isArray(config.rules) || typeof config.rules === 'object');
  assert.equal(config.sitemap, 'https://xiyato.uk/sitemap.xml');
  // Host is Yandex-only and non-standard; host canonicalisation is done with 308s.
  assert.equal(config.host, undefined);
});

test('Robots uses a single wildcard group (Bingbot and Googlebot follow *)', () => {
  const config = robots();
  const rules = Array.isArray(config.rules) ? config.rules : [config.rules];
  assert.equal(rules.length, 1, 'Expected one rule group');
  const userAgents = rules.flatMap((r) => (Array.isArray(r.userAgent) ? r.userAgent : [r.userAgent]));
  assert.deepEqual(userAgents, ['*']);
});

test('Robots rules allow indexable assets and static Next.js paths', () => {
  const config = robots();
  const rules = Array.isArray(config.rules) ? config.rules : [config.rules];
  const allowList = rules.flatMap((r) => (Array.isArray(r.allow) ? r.allow : [r.allow]));
  assert.ok(allowList.includes('/'), 'Must allow root document crawling');
  assert.ok(allowList.includes('/_next/static/'), 'Must allow Next.js static asset crawling');
  assert.ok(allowList.includes('/_next/image'), 'Must allow Next.js image optimization crawling (/_next/image?url=...)');
});

test('Robots rules strictly disallow /api/ and /admin endpoints', () => {
  const config = robots();
  const rules = Array.isArray(config.rules) ? config.rules : [config.rules];
  const disallowList = rules.flatMap((r) => (Array.isArray(r.disallow) ? r.disallow : [r.disallow]));
  assert.ok(disallowList.includes('/api/'), 'Must disallow all /api/ endpoints');
  // "/admin" is a prefix rule, so it also covers /admin/ and everything below it.
  assert.ok(disallowList.includes('/admin'), 'Must disallow /admin and below');
  assert.ok(!disallowList.includes('/'), 'Must never disallow the site root');
});

/* ------------------------------------------------------------------ */
/* 2. Canonical Sitemap & Genuine Timestamps (Requirement 3)          */
/* ------------------------------------------------------------------ */
console.log('\n--- 2. Canonical Sitemap Coverage & Genuine Timestamps ---');

test('Sitemap generates canonical URLs with genuine editorial timestamps', () => {
  const entries = sitemap();
  // 22 since the seven noindexed /work/research/* pages left the sitemap (was 29).
  assert.ok(entries.length >= 22, `Expected at least 22 canonical URLs, found ${entries.length}`);

  for (const entry of entries) {
    assert.ok(entry.url.startsWith('https://xiyato.uk'), `URL must start with https://xiyato.uk: ${entry.url}`);
    // Every URL carries a Git-derived lastmod from data/content-dates.json
    // (production previously emitted none because Vercel clones shallowly).
    assert.ok(entry.lastModified instanceof Date, `lastModified must be a Date: ${entry.url}`);
    assert.ok(Number.isFinite(entry.lastModified.getTime()), `lastModified must be valid: ${entry.url}`);
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

test('Sitemap excludes the noindexed /work/research/* workbook pages', () => {
  const urls = sitemap().map((e) => e.url);
  assert.deepEqual(urls.filter((u) => u.includes('/work/research/')), []);
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

test('app/layout.tsx emits each verification token once, no meta keywords and no root canonical/hreflang', () => {
  const layoutPath = path.join(REPO_ROOT, 'app', 'layout.tsx');
  const content = fs.readFileSync(layoutPath, 'utf-8');
  const msvalidate = content.match(/"msvalidate\.01": "c746da95e0c54178a9cb57f7229b19d4"/g) ?? [];
  assert.equal(msvalidate.length, 1, 'msvalidate.01 must be declared exactly once');
  assert.match(content, /google: "IjQduuSOmYJmgmhyNk6YA2rpWUe2b5uaPPdpGb-fLFs"/, 'Single Search Console meta token expected');
  assert.ok(!content.includes('"googleb531fd48b43d4f1b"'), 'The HTML-file token must not be emitted as a meta tag');
  assert.ok(!/\bkeywords:/.test(content), 'Meta keywords must not be declared');
  assert.ok(!/\balternates:/.test(content), 'Root layout must not declare canonical/hreflang (it leaks onto 404s)');
  assert.ok(!/\brobots:/.test(content), 'Root layout must not declare robots (routes set their own; 404 gets noindex from Next)');
});

/* ------------------------------------------------------------------ */
/* 4. IndexNow key file & host canonicalisation                       */
/* ------------------------------------------------------------------ */
// The former app/[key]/route.ts caught every unknown single-segment path and
// answered with an unbranded plain-text 404. The key is served by the static
// public/<key>.txt file instead, which is exactly the keyLocation that the CI
// submitter and /api/indexnow announce.
console.log('\n--- 4. IndexNow Key File & Host Canonicalisation ---');

test('No root catch-all route intercepts unknown single-segment paths', () => {
  assert.equal(fs.existsSync(path.join(REPO_ROOT, 'app', '[key]')), false, 'app/[key] must not exist');
});

test('IndexNow keyLocation used by scripts resolves to a static public file', () => {
  const script = fs.readFileSync(path.join(REPO_ROOT, 'scripts', 'submit-indexnow.ts'), 'utf-8');
  const key = script.match(/DEFAULT_KEY = "([0-9a-f]{32})"/)?.[1];
  assert.ok(key, 'submit-indexnow.ts must declare DEFAULT_KEY');
  const keyFile = path.join(REPO_ROOT, 'public', `${key}.txt`);
  assert.ok(fs.existsSync(keyFile), `public/${key}.txt must exist`);
  assert.equal(fs.readFileSync(keyFile, 'utf-8').trim(), key);
});

await testAsync('Production aliases 308 to the apex domain (pages only, never /api or previews)', async () => {
  const rules = await nextConfig.redirects();
  for (const host of NON_CANONICAL_PRODUCTION_HOSTS) {
    const rule = rules.find((r) => r.has?.some((h) => h.type === 'host' && new RegExp(`^${h.value}$`).test(host)));
    assert.ok(rule, `Missing host redirect for ${host}`);
    assert.equal(rule.permanent, true);
    assert.equal(rule.destination, 'https://xiyato.uk/:path');
    assert.ok(rule.source.includes('(?!api'), `${host} redirect must exclude /api`);
  }
  const hostRules = rules.filter((r) => r.has?.some((h) => h.type === 'host'));
  for (const preview of ['chaitanya-gaikwad-git-main-xiyatosaanvi-2995s-projects.vercel.app', 'chaitanya-gaikwad-abc123def-xiyatosaanvi-2995s-projects.vercel.app', 'xiyato.uk']) {
    assert.ok(!hostRules.some((r) => r.has.some((h) => new RegExp(`^${h.value}$`).test(preview))), `${preview} must not be redirected`);
  }
});

await testAsync('Retired research workbook URL redirects instead of returning 404', async () => {
  const rules = await nextConfig.redirects();
  const rule = rules.find((r) => r.source === '/work/research/saudi-riyadh-jeddah-55-lead-intelligence');
  assert.ok(rule, 'Missing redirect for the retired Saudi workbook');
  assert.equal(rule.permanent, true);
  assert.equal(rule.destination, '/services/growth/middle-east-market-intelligence');
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

  // Both published numbers are WhatsApp lines for new project enquiries, so
  // both are "sales" (the India line was previously mislabelled "technical support").
  const ukContact = schema.contactPoint.find((c) => c.telephone === '+44 7882 746212');
  assert.ok(ukContact, 'Missing UK contact point');
  assert.equal(ukContact.email, 'hello@xiyato.uk');
  assert.equal(ukContact.contactType, 'sales');

  const inContact = schema.contactPoint.find((c) => c.telephone === '+91 70283 11226');
  assert.ok(inContact, 'Missing India contact point');
  assert.equal(inContact.email, 'hello@xiyato.uk');
  assert.equal(inContact.contactType, 'sales');

  for (const point of schema.contactPoint) {
    for (const code of point.areaServed) assert.match(code, /^[A-Z]{2}$/, `areaServed must be ISO 3166 codes, got ${code}`);
  }
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

test('Organization, WebSite, Person and Service form one linked entity graph', () => {
  const graph = siteGraphSchema();
  assert.equal(graph['@context'], 'https://schema.org');
  const org = graph['@graph'].find((n) => n['@type'] === 'Organization');
  const site = graph['@graph'].find((n) => n['@type'] === 'WebSite');
  assert.equal(org['@id'], 'https://xiyato.uk/#organization');
  assert.equal(org.name, 'XIYÀTO');
  assert.deepEqual(org.alternateName, ['XIYATO', 'Xiyato']);
  assert.equal(org.legalName, undefined, 'No legal entity name is verified');
  assert.equal(site['@id'], 'https://xiyato.uk/#website');
  assert.deepEqual(site.publisher, { '@id': 'https://xiyato.uk/#organization' });

  const person = personSchema({ name: 'Chaitanya Gaikwad', role: 'Founder', path: '/company/people' });
  assert.equal(person['@id'], org.founder['@id'], 'Founder reference and Person page must share one @id');
  assert.equal(person.jobTitle, org.founder.jobTitle, 'Founder jobTitle must match the people page');
  assert.equal(person.worksFor['@id'], org['@id']);

  const service = serviceSchema({ name: 'X', description: 'Y', path: '/services/visualisation-image-production' });
  assert.equal(service.provider['@id'], org['@id']);
  assert.equal(service['@id'], 'https://xiyato.uk/services/visualisation-image-production#service');
  const offered = org.hasOfferCatalog.itemListElement.map((o) => o.itemOffered['@id']);
  assert.ok(offered.includes(service['@id']), 'Offer catalog must reference the service page node');
  assert.ok(service.areaServed.every((a) => a['@type'] === 'Country'), 'areaServed must only list countries');
});

test('Schema.org entities strictly adhere to zero-fabrication standards', () => {
  const schema = organizationSchema();
  // No fake aggregate ratings
  assert.equal(schema.aggregateRating, undefined, 'Must not include fabricated aggregateRating');
  // No fake reviews
  assert.equal(schema.review, undefined, 'Must not include fabricated reviews');
  // No unverified address
  assert.equal(schema.address, undefined, 'Must not include an unverified address');
  // Verified founder only
  assert.equal(schema.founder?.name, 'Chaitanya Gaikwad');
  // sameAs lists real external profiles only, never the site itself
  assert.ok(schema.sameAs?.includes('https://www.instagram.com/xiyato.uk/'));
  assert.ok(schema.sameAs.every((u) => !u.startsWith('https://xiyato.uk')), 'sameAs must not reference the site itself');
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
  assert.ok(discovered.length >= 22);
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
