import path from "path";
import crypto from "crypto";
import { storageProvider } from "./provider";
import {
  createUploadRecord,
  findExpiredUploads,
  markUploadPurged,
} from "./uploads-repository";
import { logger } from "@/lib/logger";

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

/**
 * Validates file magic bytes and extensions to prevent disguised executables.
 */
export function validateFileBuffer(buffer: Buffer, originalFilename: string): ValidationResult {
  // 1. Size bounds
  if (buffer.length === 0) {
    return { valid: false, error: "File is empty (zero-byte)." };
  }
  if (buffer.length > MAX_FILE_SIZE) {
    return { valid: false, error: "File exceeds the maximum allowable size of 50MB." };
  }

  // 2. Reject executable magic bytes (Windows PE/MZ, Linux ELF, Mach-O)
  if (buffer.length >= 2 && buffer[0] === 0x4D && buffer[1] === 0x5A) {
    return { valid: false, error: "Executable binary (PE/MZ) disguised as document. Rejected for security." };
  }
  if (buffer.length >= 4 && buffer[0] === 0x7F && buffer[1] === 0x45 && buffer[2] === 0x4C && buffer[3] === 0x46) {
    return { valid: false, error: "ELF executable binary rejected for security." };
  }
  if (
    buffer.length >= 4 &&
    ((buffer[0] === 0xFE && buffer[1] === 0xED && buffer[2] === 0xFA && buffer[3] === 0xCE) ||
     (buffer[0] === 0xCF && buffer[1] === 0xFA && buffer[2] === 0xED && buffer[3] === 0xFE))
  ) {
    return { valid: false, error: "Mach-O executable binary rejected for security." };
  }

  // 3. Extension check
  const ext = path.extname(originalFilename).toLowerCase();
  const allowedExts = [".pdf", ".dwg", ".dxf", ".zip", ".jpg", ".jpeg", ".png"];
  if (!allowedExts.includes(ext)) {
    return {
      valid: false,
      error: `File extension ${ext} is not permitted. Only PDF, DWG, DXF, ZIP, and images allowed.`,
    };
  }

  // 4. Magic byte signature verification
  if (ext === ".pdf") {
    const header = buffer.subarray(0, 5).toString("ascii");
    if (!header.startsWith("%PDF-")) {
      return { valid: false, error: "File header does not match valid PDF specification." };
    }
    return { valid: true, detectedMime: "application/pdf" };
  }

  if (ext === ".dwg") {
    const header = buffer.subarray(0, 6).toString("ascii");
    if (!header.startsWith("AC10")) {
      return { valid: false, error: "File header does not match valid AutoCAD DWG specification." };
    }
    return { valid: true, detectedMime: "application/acad" };
  }

  if (ext === ".zip") {
    if (buffer.length < 4 || buffer[0] !== 0x50 || buffer[1] !== 0x4B || buffer[2] !== 0x03 || buffer[3] !== 0x04) {
      return { valid: false, error: "File header does not match valid ZIP archive specification." };
    }
    return { valid: true, detectedMime: "application/zip" };
  }

  if (ext === ".dxf") {
    const sample = buffer.subarray(0, 100).toString("ascii");
    if (!sample.includes("SECTION") && !sample.includes("HEADER") && !sample.includes("0")) {
      return { valid: false, error: "File content does not match valid DXF drawing specification." };
    }
    return { valid: true, detectedMime: "image/vnd.dxf" };
  }

  if (ext === ".jpg" || ext === ".jpeg") {
    if (buffer[0] !== 0xFF || buffer[1] !== 0xD8 || buffer[2] !== 0xFF) {
      return { valid: false, error: "Invalid JPEG image signature." };
    }
    return { valid: true, detectedMime: "image/jpeg" };
  }

  if (ext === ".png") {
    if (buffer[0] !== 0x89 || buffer[1] !== 0x50 || buffer[2] !== 0x4E || buffer[3] !== 0x47) {
      return { valid: false, error: "Invalid PNG image signature." };
    }
    return { valid: true, detectedMime: "image/png" };
  }

  return { valid: true, detectedMime: "application/octet-stream" };
}

/**
 * Sanitizes arbitrary filenames to prevent path traversal and shell injections.
 */
export function sanitizeFilename(filename: string): string {
  const base = path.basename(filename);
  return base.replace(/[^a-zA-Z0-9_.-]/g, "_").slice(0, 120);
}

/**
 * Stores file with cryptographic UUID in private object storage and tracks metadata in PostgreSQL.
 */
export async function storePrivateUpload(
  buffer: Buffer,
  originalFilename: string,
  detectedMime: string
): Promise<UploadMetadata> {
  const fileId = crypto.randomUUID();
  const safeName = sanitizeFilename(originalFilename);
  const ext = path.extname(originalFilename).toLowerCase();
  const now = new Date();
  const expires = new Date(now.getTime() + RETENTION_DAYS * 24 * 60 * 60 * 1000);

  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, "0");
  const storageKey = `vault/${year}/${month}/${fileId}${ext}`;

  // 1. Upload to durable private object storage
  await storageProvider.uploadObject(storageKey, buffer, detectedMime);

  // 2. Track metadata in PostgreSQL
  const record = await createUploadRecord({
    storageKey,
    originalFilename,
    sanitizedFilename: safeName,
    mimeType: detectedMime,
    extension: ext,
    sizeBytes: buffer.length,
    expiresAt: expires,
  });

  return {
    fileId: record.id,
    originalName: safeName,
    mimeType: detectedMime,
    sizeBytes: buffer.length,
    uploadedAt: record.uploadedAt,
    expiresAt: record.expiresAt,
    retentionDays: RETENTION_DAYS,
  };
}

/**
 * Technical automated retention enforcement: purges expired uploads from durable storage.
 */
export async function cleanupExpiredUploads(): Promise<{ checked: number; purged: number; remaining: number }> {
  const expired = await findExpiredUploads(100);
  let purged = 0;

  for (const upload of expired) {
    try {
      await storageProvider.deleteObject(upload.storageKey);
      await markUploadPurged(upload.id);
      purged++;
      logger.info("Purged expired upload", { uploadId: upload.id, key: upload.storageKey });
    } catch (err) {
      logger.error("Failed to purge expired upload object", {
        uploadId: upload.id,
        key: upload.storageKey,
        error: String(err),
      });
    }
  }

  return { checked: expired.length, purged, remaining: Math.max(0, expired.length - purged) };
}
