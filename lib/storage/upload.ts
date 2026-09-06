import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
export const RETENTION_DAYS = 30;

export interface UploadMetadata {
  fileId: string;
  originalName: string;
  mimeType: string;
  sizeBytes: number;
  uploadedAt: string;
  expiresAt: string;
  retentionDays: number;
}

export interface ValidationResult {
  valid: boolean;
  error?: string;
  detectedMime?: string;
}

const STORAGE_DIR = path.join(process.cwd(), 'storage', 'uploads', 'private');

/**
 * Validates file magic bytes and extensions to prevent disguised executables.
 */
export function validateFileBuffer(buffer: Buffer, originalFilename: string): ValidationResult {
  // 1. Size bounds
  if (buffer.length === 0) {
    return { valid: false, error: 'File is empty (zero-byte).' };
  }
  if (buffer.length > MAX_FILE_SIZE) {
    return { valid: false, error: 'File exceeds the maximum allowable size of 50MB.' };
  }

  // 2. Reject executable magic bytes (Windows PE/MZ, Linux ELF)
  if (buffer.length >= 2 && buffer[0] === 0x4D && buffer[1] === 0x5A) {
    return { valid: false, error: 'Executable binary (PE/MZ) disguised as document. Rejected for security.' };
  }
  if (buffer.length >= 4 && buffer[0] === 0x7F && buffer[1] === 0x45 && buffer[2] === 0x4C && buffer[3] === 0x46) {
    return { valid: false, error: 'ELF executable binary rejected for security.' };
  }

  // 3. Extension check
  const ext = path.extname(originalFilename).toLowerCase();
  const allowedExts = ['.pdf', '.dwg', '.dxf', '.zip', '.jpg', '.jpeg', '.png'];
  if (!allowedExts.includes(ext)) {
    return { valid: false, error: `File extension ${ext} is not permitted. Only PDF, DWG, DXF, ZIP, and images allowed.` };
  }

  // 4. Magic byte signature verification
  if (ext === '.pdf') {
    const header = buffer.subarray(0, 5).toString('ascii');
    if (!header.startsWith('%PDF-')) {
      return { valid: false, error: 'File header does not match valid PDF specification.' };
    }
    return { valid: true, detectedMime: 'application/pdf' };
  }

  if (ext === '.dwg') {
    const header = buffer.subarray(0, 6).toString('ascii');
    // AutoCAD DWG headers: AC1014, AC1015, AC1018, AC1021, AC1024, AC1027, AC1032
    if (!header.startsWith('AC10')) {
      return { valid: false, error: 'File header does not match valid AutoCAD DWG specification.' };
    }
    return { valid: true, detectedMime: 'application/acad' };
  }

  if (ext === '.zip') {
    // ZIP magic bytes: PK\x03\x04
    if (buffer.length < 4 || buffer[0] !== 0x50 || buffer[1] !== 0x4B || buffer[2] !== 0x03 || buffer[3] !== 0x04) {
      return { valid: false, error: 'File header does not match valid ZIP archive specification.' };
    }
    return { valid: true, detectedMime: 'application/zip' };
  }

  if (ext === '.dxf') {
    // DXF ASCII files start with 0 \n SECTION or comments
    const sample = buffer.subarray(0, 100).toString('ascii');
    if (!sample.includes('SECTION') && !sample.includes('HEADER') && !sample.includes('0')) {
      return { valid: false, error: 'File content does not match valid DXF drawing specification.' };
    }
    return { valid: true, detectedMime: 'image/vnd.dxf' };
  }

  if (ext === '.jpg' || ext === '.jpeg') {
    if (buffer[0] !== 0xFF || buffer[1] !== 0xD8 || buffer[2] !== 0xFF) {
      return { valid: false, error: 'Invalid JPEG image signature.' };
    }
    return { valid: true, detectedMime: 'image/jpeg' };
  }

  if (ext === '.png') {
    if (buffer[0] !== 0x89 || buffer[1] !== 0x50 || buffer[2] !== 0x4E || buffer[3] !== 0x47) {
      return { valid: false, error: 'Invalid PNG image signature.' };
    }
    return { valid: true, detectedMime: 'image/png' };
  }

  return { valid: true, detectedMime: 'application/octet-stream' };
}

/**
 * Sanitizes arbitrary filenames to prevent path traversal and shell injections.
 */
export function sanitizeFilename(filename: string): string {
  const base = path.basename(filename);
  return base.replace(/[^a-zA-Z0-9_.-]/g, '_').slice(0, 120);
}

/**
 * Stores file with cryptographic UUID and retention metadata in private storage.
 */
export function storePrivateUpload(buffer: Buffer, originalFilename: string, detectedMime: string): UploadMetadata {
  if (!fs.existsSync(STORAGE_DIR)) {
    fs.mkdirSync(STORAGE_DIR, { recursive: true });
  }

  const fileId = crypto.randomUUID();
  const safeName = sanitizeFilename(originalFilename);
  const now = new Date();
  const expires = new Date(now.getTime() + RETENTION_DAYS * 24 * 60 * 60 * 1000);

  const metadata: UploadMetadata = {
    fileId,
    originalName: safeName,
    mimeType: detectedMime,
    sizeBytes: buffer.length,
    uploadedAt: now.toISOString(),
    expiresAt: expires.toISOString(),
    retentionDays: RETENTION_DAYS,
  };

  // Binary is stored with unguessable UUID path (not original name)
  fs.writeFileSync(path.join(STORAGE_DIR, `${fileId}.bin`), buffer);
  fs.writeFileSync(path.join(STORAGE_DIR, `${fileId}.meta.json`), JSON.stringify(metadata, null, 2), 'utf8');

  return metadata;
}

/**
 * Technical automated retention enforcement: deletes files older than 30 days.
 */
export function cleanupExpiredUploads(): { checked: number; purged: number; remaining: number } {
  if (!fs.existsSync(STORAGE_DIR)) {
    return { checked: 0, purged: 0, remaining: 0 };
  }

  const files = fs.readdirSync(STORAGE_DIR);
  const metaFiles = files.filter((f) => f.endsWith('.meta.json'));
  const now = Date.now();
  let purged = 0;

  for (const metaFile of metaFiles) {
    try {
      const metaPath = path.join(STORAGE_DIR, metaFile);
      const metaContent = JSON.parse(fs.readFileSync(metaPath, 'utf8')) as UploadMetadata;
      const expireTime = new Date(metaContent.expiresAt).getTime();

      if (now >= expireTime) {
        const binPath = path.join(STORAGE_DIR, `${metaContent.fileId}.bin`);
        if (fs.existsSync(binPath)) fs.unlinkSync(binPath);
        fs.unlinkSync(metaPath);
        purged++;
      }
    } catch (e) {
      console.error('Error processing retention purge for:', metaFile, e);
    }
  }

  const remaining = fs.readdirSync(STORAGE_DIR).filter((f) => f.endsWith('.meta.json')).length;
  return { checked: metaFiles.length, purged, remaining };
}
