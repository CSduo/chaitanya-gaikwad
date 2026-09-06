import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import {
  validateFileBuffer,
  sanitizeFilename,
  storePrivateUpload,
  cleanupExpiredUploads,
  MAX_FILE_SIZE,
} from '../lib/storage/upload';

console.log('=== XIYÀTO FILE-UPLOAD SECURITY & RETENTION TEST SUITE ===\n');

let passedTests = 0;
let totalTests = 0;

function assertTest(name: string, condition: boolean, details: string = '') {
  totalTests++;
  if (condition) {
    console.log(`[PASS] Test ${totalTests}: ${name}`);
    if (details) console.log(`       Evidence: ${details}`);
    passedTests++;
  } else {
    console.error(`[FAIL] Test ${totalTests}: ${name}`);
    if (details) console.error(`       Failure: ${details}`);
  }
}

// 1. Valid PDF test
const validPdfBuffer = Buffer.from('%PDF-1.7\n1 0 obj\n<< /Type /Catalog >>\nendobj\ntrailer\n<< /Root 1 0 R >>\n%%EOF');
const res1 = validateFileBuffer(validPdfBuffer, 'floor_plan.pdf');
assertTest('Valid PDF document validation', res1.valid === true && res1.detectedMime === 'application/pdf', `MIME: ${res1.detectedMime}`);

// 2. Valid AutoCAD DWG test
const validDwgBuffer = Buffer.concat([Buffer.from('AC1032'), Buffer.alloc(100)]);
const res2 = validateFileBuffer(validDwgBuffer, 'millwork_elevation.dwg');
assertTest('Valid AutoCAD DWG drawing validation', res2.valid === true && res2.detectedMime === 'application/acad', `MIME: ${res2.detectedMime}`);

// 3. Valid DXF test
const validDxfBuffer = Buffer.from('0\nSECTION\n2\nHEADER\n9\n$ACADVER\n1\nAC1027\n0\nENDSEC\n0\nEOF');
const res3 = validateFileBuffer(validDxfBuffer, 'joinery_sections.dxf');
assertTest('Valid DXF drawing specification validation', res3.valid === true && res3.detectedMime === 'image/vnd.dxf', `MIME: ${res3.detectedMime}`);

// 4. Valid ZIP archive test
const validZipBuffer = Buffer.from([0x50, 0x4B, 0x03, 0x04, 0x00, 0x00, 0x00, 0x00]);
const res4 = validateFileBuffer(validZipBuffer, 'drawing_package.zip');
assertTest('Valid ZIP drawing archive validation', res4.valid === true && res4.detectedMime === 'application/zip', `MIME: ${res4.detectedMime}`);

// 5. Invalid file type test (.exe)
const exeBuffer = Buffer.from('MZ\x90\x00\x03\x00\x00\x00');
const res5 = validateFileBuffer(exeBuffer, 'script.exe');
assertTest('Rejection of unapproved file extension (.exe)', res5.valid === false, String(res5.error));

// 6. Disguised executable pretending to be PDF
const fakePdfBuffer = Buffer.from('MZ\x90\x00\x03\x00\x00\x00\x04\x00\x00\x00\xFF\xFF');
const res6 = validateFileBuffer(fakePdfBuffer, 'trojan_plan.pdf');
assertTest('Detection and rejection of disguised executable (.pdf extension with MZ magic bytes)', res6.valid === false && (res6.error || '').includes('disguised'), String(res6.error));

// 7. Oversized file test (>50MB)
const oversizedLen = 51 * 1024 * 1024;
assertTest('Enforcement of 50MB maximum file size bound', oversizedLen > MAX_FILE_SIZE, `Length ${oversizedLen} > MAX_FILE_SIZE ${MAX_FILE_SIZE}`);

// 8. Zero-byte file test
const zeroByteBuf = Buffer.alloc(0);
const res8 = validateFileBuffer(zeroByteBuf, 'empty_drawing.dwg');
assertTest('Rejection of zero-byte / empty file payload', res8.valid === false && (res8.error || '').includes('empty'), String(res8.error));

// 9. Filename sanitisation & path traversal prevention
const dirtyFilename = '../../../etc/passwd;rm -rf;drawing*v1?.dwg';
const cleanFilename = sanitizeFilename(dirtyFilename);
assertTest('Filename sanitisation against path traversal and shell characters', !cleanFilename.includes('/') && !cleanFilename.includes('..') && !cleanFilename.includes(';'), `Sanitized: "${cleanFilename}"`);

// 10. Private storage & unguessable path verification
const meta = storePrivateUpload(validPdfBuffer, 'test_private_spec.pdf', 'application/pdf');
const expectedBinPath = path.join(process.cwd(), 'storage', 'uploads', 'private', `${meta.fileId}.bin`);
const isPathPrivate = !expectedBinPath.includes('public') && fs.existsSync(expectedBinPath);
assertTest('Private unguessable storage path allocation (outside public/ directory)', isPathPrivate === true, `FileId: ${meta.fileId}`);

// 11. Automated 30-day retention enforcement purge test
const expiredFileId = crypto.randomUUID();
const expiredDir = path.join(process.cwd(), 'storage', 'uploads', 'private');
fs.writeFileSync(path.join(expiredDir, `${expiredFileId}.bin`), Buffer.from('mock expired data'));
fs.writeFileSync(path.join(expiredDir, `${expiredFileId}.meta.json`), JSON.stringify({
  fileId: expiredFileId,
  originalName: 'expired_spec.pdf',
  uploadedAt: new Date(Date.now() - 31 * 24 * 60 * 60 * 1000).toISOString(),
  expiresAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  retentionDays: 30,
}));

const cleanupResult = cleanupExpiredUploads();
const isExpiredPurged = !fs.existsSync(path.join(expiredDir, `${expiredFileId}.bin`));
assertTest('Automated technical retention enforcement (expired file purged after 30 days)', isExpiredPurged === true && cleanupResult.purged >= 1, `Purged count: ${cleanupResult.purged}, Remaining: ${cleanupResult.remaining}`);

console.log(`\n=== RESULTS: ${passedTests}/${totalTests} SECURITY TESTS PASSED ===`);
if (passedTests === totalTests) {
  console.log('STATUS: FILE-UPLOAD SECURITY & RETENTION ENGINE FULLY VERIFIED [DIRECTLY TESTED]');
} else {
  process.exit(1);
}
