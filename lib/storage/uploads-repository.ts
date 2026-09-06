import crypto from "crypto";
import { query } from "@/lib/db/client";
import { logger } from "@/lib/logger";

export interface UploadRecord {
  id: string;
  storageKey: string;
  provider: string;
  originalFilename: string;
  sanitizedFilename: string;
  mimeType: string;
  extension: string;
  sizeBytes: number;
  status: "UPLOADED" | "ATTACHED" | "PURGED" | "DELETED";
  uploadedAt: string;
  expiresAt: string;
  deletedAt?: string;
  leadId?: string;
}

export interface CreateUploadRecordInput {
  storageKey: string;
  provider?: string;
  originalFilename: string;
  sanitizedFilename: string;
  mimeType: string;
  extension: string;
  sizeBytes: number;
  expiresAt: Date;
}

const memoryUploads = new Map<string, UploadRecord>();

function mapRowToUpload(row: any): UploadRecord {
  return {
    id: row.id,
    storageKey: row.storage_key,
    provider: row.provider,
    originalFilename: row.original_filename,
    sanitizedFilename: row.sanitized_filename,
    mimeType: row.mime_type,
    extension: row.extension,
    sizeBytes: parseInt(row.size_bytes, 10),
    status: row.status,
    uploadedAt: new Date(row.uploaded_at).toISOString(),
    expiresAt: new Date(row.expires_at).toISOString(),
    deletedAt: row.deleted_at ? new Date(row.deleted_at).toISOString() : undefined,
    leadId: row.lead_id || undefined,
  };
}

export async function createUploadRecord(input: CreateUploadRecordInput): Promise<UploadRecord> {
  const generatedId = crypto.randomUUID();
  try {
    const sql = `
      INSERT INTO uploads (
        storage_key,
        provider,
        original_filename,
        sanitized_filename,
        mime_type,
        extension,
        size_bytes,
        status,
        expires_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, 'UPLOADED', $8)
      RETURNING *;
    `;

    const params = [
      input.storageKey,
      input.provider || "local",
      input.originalFilename,
      input.sanitizedFilename,
      input.mimeType,
      input.extension,
      input.sizeBytes,
      input.expiresAt.toISOString(),
    ];

    const res = await query(sql, params);
    const record = mapRowToUpload(res.rows[0]);
    logger.info("Upload metadata tracked in DB", { uploadId: record.id, storageKey: record.storageKey });
    memoryUploads.set(record.id, record);
    return record;
  } catch (err) {
    logger.info("Database not connected; saving upload metadata to local memory registry", {
      uploadId: generatedId,
      error: err instanceof Error ? err.message : String(err),
    });
    const fallbackRecord: UploadRecord = {
      id: generatedId,
      storageKey: input.storageKey,
      provider: input.provider || "local",
      originalFilename: input.originalFilename,
      sanitizedFilename: input.sanitizedFilename,
      mimeType: input.mimeType,
      extension: input.extension,
      sizeBytes: input.sizeBytes,
      status: "UPLOADED",
      uploadedAt: new Date().toISOString(),
      expiresAt: input.expiresAt.toISOString(),
    };
    memoryUploads.set(generatedId, fallbackRecord);
    return fallbackRecord;
  }
}

export async function getUploadById(id: string): Promise<UploadRecord | null> {
  try {
    const res = await query("SELECT * FROM uploads WHERE id = $1 LIMIT 1", [id]);
    return res.rows.length > 0 ? mapRowToUpload(res.rows[0]) : (memoryUploads.get(id) || null);
  } catch {
    return memoryUploads.get(id) || null;
  }
}

export async function getUploadByKey(key: string): Promise<UploadRecord | null> {
  try {
    const res = await query("SELECT * FROM uploads WHERE storage_key = $1 LIMIT 1", [key]);
    return res.rows.length > 0 ? mapRowToUpload(res.rows[0]) : null;
  } catch {
    for (const record of memoryUploads.values()) {
      if (record.storageKey === key) return record;
    }
    return null;
  }
}

export async function attachUploadToLead(uploadId: string, leadId: string): Promise<void> {
  const mem = memoryUploads.get(uploadId);
  if (mem) {
    mem.status = "ATTACHED";
    mem.leadId = leadId;
  }
  try {
    await query(
      "UPDATE uploads SET status = 'ATTACHED', lead_id = $1 WHERE id = $2",
      [leadId, uploadId]
    );
  } catch {}
}

export async function findExpiredUploads(limit = 100): Promise<UploadRecord[]> {
  try {
    const res = await query(
      "SELECT * FROM uploads WHERE expires_at <= NOW() AND status != 'PURGED' LIMIT $1",
      [limit]
    );
    return res.rows.map(mapRowToUpload);
  } catch {
    const now = new Date();
    const expired: UploadRecord[] = [];
    for (const rec of memoryUploads.values()) {
      if (new Date(rec.expiresAt) <= now && rec.status !== "PURGED") {
        expired.push(rec);
        if (expired.length >= limit) break;
      }
    }
    return expired;
  }
}

export async function markUploadPurged(id: string): Promise<void> {
  const mem = memoryUploads.get(id);
  if (mem) {
    mem.status = "PURGED";
    mem.deletedAt = new Date().toISOString();
  }
  try {
    await query(
      "UPDATE uploads SET status = 'PURGED', deleted_at = NOW() WHERE id = $1",
      [id]
    );
  } catch {}
}
