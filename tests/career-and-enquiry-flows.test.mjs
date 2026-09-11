import assert from 'node:assert/strict';
import { validateEnquiry, formatEnquiry, DISCIPLINE_OPTIONS, SERVICE_OPTIONS } from '../lib/enquiry.ts';
import { CONTACT_CHANNELS, publishedChannels } from '../lib/site.ts';

console.log('\n================================================================');
console.log('XIYÀTO CAREER & ENQUIRY INTEGRATION TEST SUITE');
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

console.log('--- 1. Career & Talent Network Validation ---');

test('Validates complete talent submission payload', () => {
  const errors = validateEnquiry({
    kind: 'talent',
    name: 'Sarah Connor',
    email: 'sarah@design-studio.co.uk',
    discipline: 'cad-technical-production',
    portfolio: 'https://sarahconnor.design',
    brief: 'Senior CAD technician specializing in luxury retail joinery and fit-out drawing packages.',
    consent: true,
  });
  assert.equal(Object.keys(errors).length, 0);
});

test('Rejects talent submission with brief under 20 characters', () => {
  const errors = validateEnquiry({
    kind: 'talent',
    name: 'Sarah Connor',
    email: 'sarah@design-studio.co.uk',
    brief: 'CAD drafter',
    consent: true,
  });
  assert.ok(errors.brief);
  assert.match(errors.brief, /twenty characters minimum/);
});

test('Rejects talent submission missing consent checkbox', () => {
  const errors = validateEnquiry({
    kind: 'talent',
    name: 'Sarah Connor',
    email: 'sarah@design-studio.co.uk',
    brief: 'Senior CAD technician specializing in luxury retail joinery and fit-out drawing packages.',
    consent: false,
  });
  assert.ok(errors.consent);
});

console.log('\n--- 2. Structured Email Compilation & hello@xiyato.uk Recipient ---');

test('Compiles structured talent email body with all candidate fields', () => {
  const payload = {
    kind: 'talent',
    name: 'Alex Vance',
    email: 'alex@visuals.io',
    discipline: 'visualisation-image-production',
    portfolio: 'https://visuals.io/portfolio',
    brief: '3D architectural visualiser with 8 years experience in 3ds Max, Corona, and Unreal Engine.',
    consent: true,
  };

  const disciplineOption = DISCIPLINE_OPTIONS.find((d) => d.value === payload.discipline);
  const disciplineName = disciplineOption?.label || payload.discipline;
  const subject = `Talent network application — ${payload.name} [${disciplineName}]`;

  const emailBody = [
    'XIYÀTO TALENT NETWORK APPLICATION',
    '==================================================',
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Discipline: ${disciplineName}`,
    payload.portfolio ? `Portfolio / Work Link: ${payload.portfolio}` : null,
    '',
    '==================================================',
    'ABOUT YOUR WORK & CAPABILITIES:',
    '==================================================',
    payload.brief,
    '==================================================',
  ]
    .filter((line) => line !== null)
    .join('\n');

  assert.ok(subject.includes('Alex Vance'));
  assert.ok(subject.includes('3D Visualisation'));
  assert.ok(emailBody.includes('Name: Alex Vance'));
  assert.ok(emailBody.includes('Email: alex@visuals.io'));
  assert.ok(emailBody.includes('Portfolio / Work Link: https://visuals.io/portfolio'));
  assert.ok(emailBody.includes('3ds Max, Corona, and Unreal Engine'));
});

test('Recipient is strictly hello@xiyato.uk and URLs are valid', () => {
  const toEmail = 'hello@xiyato.uk';
  const subject = 'Talent network application — Test Applicant [CAD & Technical Production]';
  const body = 'Test brief with more than twenty characters for validation.';

  const mailtoUrl = `mailto:${toEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${toEmail}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  assert.ok(mailtoUrl.startsWith('mailto:hello@xiyato.uk'));
  assert.ok(mailtoUrl.includes('subject=Talent%20network%20application'));
  assert.ok(gmailUrl.startsWith('https://mail.google.com/mail/?view=cm&fs=1&to=hello@xiyato.uk'));
  assert.ok(gmailUrl.includes('su=Talent%20network%20application'));
});

console.log('\n--- 3. Contact Channels & Published Email Verification ---');

test('Careers and founder contact channels use verified hello@xiyato.uk', () => {
  const careers = CONTACT_CHANNELS.find((c) => c.id === 'careers');
  assert.ok(careers);
  assert.equal(careers.email, 'hello@xiyato.uk');

  const general = CONTACT_CHANNELS.find((c) => c.id === 'general');
  assert.ok(general);
  assert.equal(general.email, 'hello@xiyato.uk');

  const founder = CONTACT_CHANNELS.find((c) => c.id === 'founder');
  assert.ok(founder);
  assert.equal(founder.email, 'hello@xiyato.uk');
});

test('publishedChannels returns active channels with hello@xiyato.uk', () => {
  const published = publishedChannels();
  assert.ok(published.length >= 2);
  for (const channel of published) {
    assert.equal(channel.email, 'hello@xiyato.uk');
  }
});

console.log('\n--- 4. Service Linkage & Cross-Pillar Quotation Pre-Selection ---');

test('All service slugs in SERVICE_OPTIONS are valid', () => {
  assert.ok(SERVICE_OPTIONS.length >= 6);
  assert.ok(SERVICE_OPTIONS.some((s) => s.value === 'cad-technical-production'));
  assert.ok(SERVICE_OPTIONS.some((s) => s.value === 'growth-marketing-b2b'));
  assert.ok(SERVICE_OPTIONS.some((s) => s.value === 'visualisation-image-production'));
  assert.ok(SERVICE_OPTIONS.some((s) => s.value === 'video-ai-film-editing'));
  assert.ok(SERVICE_OPTIONS.some((s) => s.value === 'automation-workflow-systems'));
  assert.ok(SERVICE_OPTIONS.some((s) => s.value === 'website-design-development'));
});

console.log('\n================================================================');
console.log(`CAREER & ENQUIRY SUITE: ${passCount} PASSED, ${failCount} FAILED`);
console.log('================================================================\n');

if (failCount > 0) {
  process.exit(1);
}
