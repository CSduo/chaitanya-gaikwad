import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');

// Auto-spawn via tsx if running with plain Node
if (!process.env.XIYATO_TSX_RUNNER && !process.execArgv.some((a) => a.includes('tsx'))) {
  const npxCmd = process.platform === 'win32' ? 'npx.cmd' : 'npx';
  const result = spawnSync(npxCmd, ['tsx', __filename, ...process.argv.slice(2)], {
    stdio: 'inherit',
    env: { ...process.env, XIYATO_TSX_RUNNER: '1' },
    shell: true,
  });
  process.exit(result.status ?? 0);
}

// Import route handlers
const { POST: indexNowPost } = await import('../app/api/indexnow/route');
const { GET: keyRouteGet } = await import('../app/[key]/route');

console.log('\n================================================================');
console.log('CHALLENGER EMPIRICAL STRESS TEST HARNESS: INDEXNOW & KEY VERIFICATION');
console.log('================================================================\n');

let passCount = 0;
let failCount = 0;

async function runTest(name, fn) {
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

const TEST_SECRET = 'challenger-test-secret-value-xyz789';

/* ------------------------------------------------------------------ */
/* Suite 1: Domain Validation & Host Spoofing / SSRF Attacks          */
/* ------------------------------------------------------------------ */
console.log('--- Suite 1: Domain Validation & Host Spoofing Attacks ---');

const maliciousOrNonCanonicalUrls = [
  { url: 'http://xiyato.uk', reason: 'Insecure HTTP protocol (apex) [PROMPT MANDATED]' },
  { url: 'http://xiyato.uk/services', reason: 'Insecure HTTP protocol with subpath' },
  { url: 'https://attacker.com', reason: 'Foreign attacker domain [PROMPT MANDATED]' },
  { url: 'https://attacker.com/malicious/payload', reason: 'Foreign domain with path' },
  { url: 'https://sub.xiyato.uk', reason: 'Subdomain of xiyato.uk [PROMPT MANDATED]' },
  { url: 'https://api.xiyato.uk', reason: 'API subdomain' },
  { url: 'https://xiyato.uk.attacker.com', reason: 'Subdomain suffix spoofing [PROMPT MANDATED]' },
  { url: 'https://xiyato.uk.evil.org/steal', reason: 'Domain spoofing via prefix' },
  { url: 'https://www.xiyato.uk', reason: 'www subdomain redirect [PROMPT MANDATED]' },
  { url: 'https://www.xiyato.uk/contact', reason: 'www subdomain with path' },
  { url: 'https://xiyato.uk@attacker.com', reason: 'Userinfo spoofing attacker domain' },
  { url: 'https://xiyato.uk@attacker.com/bypass', reason: 'Userinfo spoofing with path' },
  { url: 'ftp://xiyato.uk/resource', reason: 'Non-HTTP protocol (ftp)' },
  { url: 'javascript:alert(1)', reason: 'Javascript pseudo-protocol' },
  { url: 'not-a-valid-url', reason: 'Malformed URI string' },
  { url: '', reason: 'Empty string URL' },
];

for (const { url, reason } of maliciousOrNonCanonicalUrls) {
  await runTest(`POST /api/indexnow rejects ${reason} (${url}) with 400`, async () => {
    process.env.INDEXNOW_SECRET = TEST_SECRET;
    const originalFetch = globalThis.fetch;
    let fetchCalled = false;
    globalThis.fetch = async () => {
      fetchCalled = true;
      return new Response('', { status: 200 });
    };

    try {
      const req = new Request('https://xiyato.uk/api/indexnow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TEST_SECRET}`,
        },
        body: JSON.stringify({ urls: [url] }),
      });

      const res = await indexNowPost(req);
      assert.equal(res.status, 400, `Expected 400 for ${url}, got ${res.status}`);
      const body = await res.json();
      assert.equal(body.ok, false);
      assert.ok(typeof body.error === 'string' && body.error.length > 0);
      assert.equal(fetchCalled, false, 'Fetch must never be triggered for rejected URLs');
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
}

await runTest('POST /api/indexnow fails closed (400) if 1 of 5 URLs is malicious', async () => {
  process.env.INDEXNOW_SECRET = TEST_SECRET;
  const originalFetch = globalThis.fetch;
  let fetchCalled = false;
  globalThis.fetch = async () => {
    fetchCalled = true;
    return new Response('', { status: 200 });
  };

  try {
    const mixedUrls = [
      'https://xiyato.uk/',
      'https://xiyato.uk/services',
      'https://attacker.com/evil',
      'https://xiyato.uk/contact',
      'https://xiyato.uk/legal/privacy',
    ];

    const req = new Request('https://xiyato.uk/api/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TEST_SECRET}`,
      },
      body: JSON.stringify({ urls: mixedUrls }),
    });

    const res = await indexNowPost(req);
    assert.equal(res.status, 400);
    const body = await res.json();
    assert.equal(body.ok, false);
    assert.equal(fetchCalled, false, 'Fetch MUST NOT be called when payload contains invalid URL');
  } finally {
    globalThis.fetch = originalFetch;
  }
});

await runTest('POST /api/indexnow accepts canonical uppercase-hostname URLs by normalizing to lowercase', async () => {
  process.env.INDEXNOW_SECRET = TEST_SECRET;
  const originalFetch = globalThis.fetch;
  let submittedUrls = null;

  globalThis.fetch = async (_url, init) => {
    const parsed = JSON.parse(init.body);
    submittedUrls = parsed.urlList;
    return new Response('', { status: 200 });
  };

  try {
    const req = new Request('https://xiyato.uk/api/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TEST_SECRET}`,
      },
      body: JSON.stringify({ urls: ['https://XIYATO.UK/services/cad-technical-production'] }),
    });

    const res = await indexNowPost(req);
    assert.equal(res.status, 200);
    assert.ok(submittedUrls.length === 1);
    assert.equal(submittedUrls[0], 'https://xiyato.uk/services/cad-technical-production');
  } finally {
    globalThis.fetch = originalFetch;
  }
});

/* ------------------------------------------------------------------ */
/* Suite 2: Payload Bounds & Boundary Conditions                      */
/* ------------------------------------------------------------------ */
console.log('\n--- Suite 2: Payload Bounds & Boundary Conditions ---');

await runTest('POST /api/indexnow accepts exactly 20 URLs (upper bound limit)', async () => {
  process.env.INDEXNOW_SECRET = TEST_SECRET;
  const originalFetch = globalThis.fetch;
  let receivedBatchSize = 0;

  globalThis.fetch = async (_url, init) => {
    const parsed = JSON.parse(init.body);
    receivedBatchSize = parsed.urlList.length;
    return new Response('', { status: 200 });
  };

  try {
    const urls = Array.from({ length: 20 }, (_, i) => `https://xiyato.uk/page-${i}`);
    const req = new Request('https://xiyato.uk/api/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TEST_SECRET}`,
      },
      body: JSON.stringify({ urls }),
    });

    const res = await indexNowPost(req);
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.ok, true);
    assert.equal(body.submittedUrls, 20);
    assert.equal(receivedBatchSize, 20);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

await runTest('POST /api/indexnow rejects 21 URLs (boundary +1) with 400 [PROMPT MANDATED]', async () => {
  process.env.INDEXNOW_SECRET = TEST_SECRET;
  const urls = Array.from({ length: 21 }, (_, i) => `https://xiyato.uk/page-${i}`);
  const req = new Request('https://xiyato.uk/api/indexnow', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TEST_SECRET}`,
    },
    body: JSON.stringify({ urls }),
  });

  const res = await indexNowPost(req);
  assert.equal(res.status, 400);
  const body = await res.json();
  assert.equal(body.ok, false);
  assert.ok(body.error.includes('Exceeded maximum of 20 URLs'));
});

await runTest('POST /api/indexnow rejects 100 URLs with 400', async () => {
  process.env.INDEXNOW_SECRET = TEST_SECRET;
  const urls = Array.from({ length: 100 }, (_, i) => `https://xiyato.uk/overflow-${i}`);
  const req = new Request('https://xiyato.uk/api/indexnow', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TEST_SECRET}`,
    },
    body: JSON.stringify({ urls }),
  });

  const res = await indexNowPost(req);
  assert.equal(res.status, 400);
});

await runTest('POST /api/indexnow defaults to home URL when urls is omitted or empty array', async () => {
  process.env.INDEXNOW_SECRET = TEST_SECRET;
  const originalFetch = globalThis.fetch;
  let submittedUrls = null;

  globalThis.fetch = async (_url, init) => {
    const parsed = JSON.parse(init.body);
    submittedUrls = parsed.urlList;
    return new Response('', { status: 200 });
  };

  try {
    const req = new Request('https://xiyato.uk/api/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TEST_SECRET}`,
      },
      body: JSON.stringify({ urls: [] }),
    });

    const res = await indexNowPost(req);
    assert.equal(res.status, 200);
    assert.deepEqual(submittedUrls, ['https://xiyato.uk/']);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

/* ------------------------------------------------------------------ */
/* Suite 3: Authorization Enforcement & Fail-Closed Checks           */
/* ------------------------------------------------------------------ */
console.log('\n--- Suite 3: Authorization Enforcement ---');

await runTest('POST /api/indexnow rejects completely missing Authorization header with 401 [PROMPT MANDATED]', async () => {
  process.env.INDEXNOW_SECRET = TEST_SECRET;
  const req = new Request('https://xiyato.uk/api/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ urls: ['https://xiyato.uk/'] }),
  });

  const res = await indexNowPost(req);
  assert.equal(res.status, 401);
  const body = await res.json();
  assert.equal(body.ok, false);
  assert.equal(body.error, 'Unauthorized.');
});

await runTest('POST /api/indexnow rejects wrong bearer token with 401 [PROMPT MANDATED]', async () => {
  process.env.INDEXNOW_SECRET = TEST_SECRET;
  const req = new Request('https://xiyato.uk/api/indexnow', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer wrong-token-xyz',
    },
    body: JSON.stringify({ urls: ['https://xiyato.uk/'] }),
  });

  const res = await indexNowPost(req);
  assert.equal(res.status, 401);
  const body = await res.json();
  assert.equal(body.ok, false);
  assert.equal(body.error, 'Unauthorized.');
});

await runTest('POST /api/indexnow rejects non-Bearer authentication scheme with 401', async () => {
  process.env.INDEXNOW_SECRET = TEST_SECRET;
  const req = new Request('https://xiyato.uk/api/indexnow', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${Buffer.from(`user:${TEST_SECRET}`).toString('base64')}`,
    },
    body: JSON.stringify({ urls: ['https://xiyato.uk/'] }),
  });

  const res = await indexNowPost(req);
  assert.equal(res.status, 401);
});

await runTest('POST /api/indexnow fails closed with 500 when INDEXNOW_SECRET and CRON_SECRET are unset', async () => {
  const origSecret = process.env.INDEXNOW_SECRET;
  const origCron = process.env.CRON_SECRET;
  delete process.env.INDEXNOW_SECRET;
  delete process.env.CRON_SECRET;

  try {
    const req = new Request('https://xiyato.uk/api/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer any-token',
      },
      body: JSON.stringify({ urls: ['https://xiyato.uk/'] }),
    });

    const res = await indexNowPost(req);
    assert.equal(res.status, 500);
    const body = await res.json();
    assert.equal(body.ok, false);
    assert.ok(body.error.includes('not configured'));
  } finally {
    if (origSecret) process.env.INDEXNOW_SECRET = origSecret;
    if (origCron) process.env.CRON_SECRET = origCron;
  }
});

await runTest('POST /api/indexnow accepts CRON_SECRET as alternative authorization', async () => {
  const origSecret = process.env.INDEXNOW_SECRET;
  const origCron = process.env.CRON_SECRET;
  delete process.env.INDEXNOW_SECRET;
  process.env.CRON_SECRET = 'cron-fallback-secret-999';

  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => new Response('', { status: 200 });

  try {
    const req = new Request('https://xiyato.uk/api/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer cron-fallback-secret-999',
      },
      body: JSON.stringify({ urls: ['https://xiyato.uk/'] }),
    });

    const res = await indexNowPost(req);
    assert.equal(res.status, 200);
  } finally {
    globalThis.fetch = originalFetch;
    if (origSecret) process.env.INDEXNOW_SECRET = origSecret;
    if (origCron) process.env.CRON_SECRET = origCron;
  }
});

/* ------------------------------------------------------------------ */
/* Suite 4: Upstream Error Propagation & Protocol Integrity           */
/* ------------------------------------------------------------------ */
console.log('\n--- Suite 4: Upstream Status Propagation & Protocol Integrity ---');

const upstreamStatusCodes = [
  { code: 400, expectedStatus: 400, name: '400 Bad Request' },
  { code: 403, expectedStatus: 403, name: '403 Forbidden [PROMPT MANDATED]' },
  { code: 422, expectedStatus: 422, name: '422 Unprocessable Entity [PROMPT MANDATED]' },
  { code: 429, expectedStatus: 429, name: '429 Too Many Requests (Rate limit)' },
  { code: 500, expectedStatus: 500, name: '500 Internal Server Error' },
  { code: 502, expectedStatus: 502, name: '502 Bad Gateway' },
  { code: 503, expectedStatus: 503, name: '503 Service Unavailable' },
];

for (const { code, expectedStatus, name } of upstreamStatusCodes) {
  await runTest(`POST /api/indexnow faithfully propagates upstream ${name} (NOT HTTP 200)`, async () => {
    process.env.INDEXNOW_SECRET = TEST_SECRET;
    const originalFetch = globalThis.fetch;

    globalThis.fetch = async () =>
      new Response(`Error payload for ${code}`, {
        status: code,
        statusText: `Status ${code}`,
      });

    try {
      const req = new Request('https://xiyato.uk/api/indexnow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TEST_SECRET}`,
        },
        body: JSON.stringify({ urls: ['https://xiyato.uk/services'] }),
      });

      const res = await indexNowPost(req);
      assert.notEqual(res.status, 200, 'Upstream failure must never be masked as 200');
      assert.equal(res.status, expectedStatus);
      const body = await res.json();
      assert.equal(body.ok, false);
      assert.equal(body.status, code);
      assert.equal(body.error, 'Upstream IndexNow submission failed');
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
}

await runTest('POST /api/indexnow returns 502 when upstream fetch throws network failure', async () => {
  process.env.INDEXNOW_SECRET = TEST_SECRET;
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () => {
    throw new Error('getaddrinfo ENOTFOUND api.indexnow.org');
  };

  try {
    const req = new Request('https://xiyato.uk/api/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TEST_SECRET}`,
      },
      body: JSON.stringify({ urls: ['https://xiyato.uk/'] }),
    });

    const res = await indexNowPost(req);
    assert.equal(res.status, 502);
    const body = await res.json();
    assert.equal(body.ok, false);
    assert.ok(body.error.includes('failed or timed out'));
  } finally {
    globalThis.fetch = originalFetch;
  }
});

await runTest('POST /api/indexnow transmits exact IndexNow specification payload', async () => {
  process.env.INDEXNOW_SECRET = TEST_SECRET;
  const originalFetch = globalThis.fetch;
  let targetUrl = '';
  let options = null;

  globalThis.fetch = async (url, opts) => {
    targetUrl = url;
    options = opts;
    return new Response('', { status: 202 });
  };

  try {
    const req = new Request('https://xiyato.uk/api/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TEST_SECRET}`,
      },
      body: JSON.stringify({
        urls: ['https://xiyato.uk/services/cad-technical-production'],
      }),
    });

    const res = await indexNowPost(req);
    assert.equal(res.status, 200);
    assert.equal(targetUrl, 'https://api.indexnow.org/indexnow');
    assert.equal(options.method, 'POST');
    assert.equal(options.headers['Content-Type'], 'application/json; charset=utf-8');

    const parsedBody = JSON.parse(options.body);
    assert.equal(parsedBody.host, 'xiyato.uk');
    assert.equal(parsedBody.key, 'c746da95e0c54178a9cb57f7229b19d4');
    assert.equal(parsedBody.keyLocation, 'https://xiyato.uk/c746da95e0c54178a9cb57f7229b19d4.txt');
    assert.deepEqual(parsedBody.urlList, ['https://xiyato.uk/services/cad-technical-production']);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

/* ------------------------------------------------------------------ */
/* Suite 5: Key Route Verification (`app/[key]/route.ts`)             */
/* ------------------------------------------------------------------ */
console.log('\n--- Suite 5: Dynamic Key Route (`app/[key]/route.ts`) ---');

await runTest('GET /[key] returns 200 plain text for valid key c746da95e0c54178a9cb57f7229b19d4.txt [PROMPT MANDATED]', async () => {
  const req = new Request('https://xiyato.uk/c746da95e0c54178a9cb57f7229b19d4.txt');
  const res = await keyRouteGet(req, {
    params: Promise.resolve({ key: 'c746da95e0c54178a9cb57f7229b19d4.txt' }),
  });

  assert.equal(res.status, 200);
  assert.equal(res.headers.get('Content-Type'), 'text/plain; charset=utf-8');
  assert.equal(res.headers.get('Cache-Control'), 'public, max-age=86400, s-maxage=86400');
  const text = await res.text();
  assert.equal(text, 'c746da95e0c54178a9cb57f7229b19d4');
});

await runTest('GET /[key] returns 200 plain text for valid key without .txt extension', async () => {
  const req = new Request('https://xiyato.uk/c746da95e0c54178a9cb57f7229b19d4');
  const res = await keyRouteGet(req, {
    params: Promise.resolve({ key: 'c746da95e0c54178a9cb57f7229b19d4' }),
  });

  assert.equal(res.status, 200);
  const text = await res.text();
  assert.equal(text, 'c746da95e0c54178a9cb57f7229b19d4');
});

const invalidKeyProbes = [
  'invalidkey.txt', // [PROMPT MANDATED]
  'invalidkey',
  'c746da95e0c54178a9cb57f7229b19d4.html',
  'c746da95e0c54178a9cb57f7229b19d4.json',
  'c746da95e0c54178a9cb57f7229b19d4_extra.txt',
  'pre_c746da95e0c54178a9cb57f7229b19d4.txt',
  'C746DA95E0C54178A9CB57F7229B19D4.txt', // case sensitivity
  '..%2F..%2Fetc%2Fpasswd.txt',
  'BingSiteAuth.xml',
  'robots.txt',
  'sitemap.xml',
];

for (const probe of invalidKeyProbes) {
  await runTest(`GET /[key] returns 404 for invalid key probe (${probe})`, async () => {
    const req = new Request(`https://xiyato.uk/${probe}`);
    const res = await keyRouteGet(req, {
      params: Promise.resolve({ key: probe }),
    });
    assert.equal(res.status, 404, `Expected 404 for probe ${probe}, got ${res.status}`);
  });
}

/* ------------------------------------------------------------------ */
/* Suite 6: Physical Static Verification Files on Disk                */
/* ------------------------------------------------------------------ */
console.log('\n--- Suite 6: Static Assets & Verifications on Disk ---');

await runTest('public/c746da95e0c54178a9cb57f7229b19d4.txt exists with exact key', async () => {
  const filePath = path.join(REPO_ROOT, 'public', 'c746da95e0c54178a9cb57f7229b19d4.txt');
  assert.ok(fs.existsSync(filePath), 'File must exist on disk');
  const content = fs.readFileSync(filePath, 'utf-8').trim();
  assert.equal(content, 'c746da95e0c54178a9cb57f7229b19d4');
  assert.equal(content.length, 32, 'IndexNow key must be exactly 32 hex chars');
  assert.ok(/^[0-9a-f]{32}$/.test(content), 'Key must be hexadecimal');
});

await runTest('public/BingSiteAuth.xml exists with exact token', async () => {
  const filePath = path.join(REPO_ROOT, 'public', 'BingSiteAuth.xml');
  assert.ok(fs.existsSync(filePath), 'BingSiteAuth.xml must exist on disk');
  const content = fs.readFileSync(filePath, 'utf-8');
  assert.ok(content.includes('<user>c746da95e0c54178a9cb57f7229b19d4</user>'));
});

/* ------------------------------------------------------------------ */
/* Summary & Final Exit Code                                          */
/* ------------------------------------------------------------------ */
console.log('\n================================================================');
console.log(`CHALLENGER STRESS SUITE RESULTS: ${passCount} PASSED, ${failCount} FAILED`);
console.log('================================================================\n');

if (failCount > 0) {
  process.exit(1);
}
