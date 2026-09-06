import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  HeadBucketCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { logger } from "@/lib/logger";

export interface StorageProvider {
  isConfigured(): boolean;
  uploadObject(key: string, buffer: Buffer, contentType: string): Promise<{ key: string; size: number }>;
  deleteObject(key: string): Promise<void>;
  getSignedDownloadUrl(key: string, expiresInSeconds?: number): Promise<string>;
  checkHealth(): Promise<{ ok: boolean; provider: string; error?: string }>;
}

class S3StorageProvider implements StorageProvider {
  private client: S3Client | null = null;
  private bucket: string;

  constructor() {
    this.bucket = process.env.STORAGE_BUCKET || "";
    const endpoint = process.env.STORAGE_ENDPOINT;
    const region = process.env.STORAGE_REGION || "auto";
    const accessKeyId = process.env.STORAGE_ACCESS_KEY_ID;
    const secretAccessKey = process.env.STORAGE_SECRET_ACCESS_KEY;

    if (this.bucket && accessKeyId && secretAccessKey) {
      this.client = new S3Client({
        region,
        endpoint: endpoint || undefined,
        credentials: {
          accessKeyId,
          secretAccessKey,
        },
        forcePathStyle: Boolean(endpoint), // Required for R2/MinIO/custom endpoints
      });
      logger.info("Private Object Storage client initialized", {
        bucket: this.bucket,
        endpoint: endpoint || "aws-standard",
      });
    } else {
      logger.warn("Private Object Storage credentials missing; uploads will fail closed in production.");
    }
  }

  isConfigured(): boolean {
    return Boolean(this.client && this.bucket);
  }

  async uploadObject(key: string, buffer: Buffer, contentType: string): Promise<{ key: string; size: number }> {
    if (!this.client || !this.bucket) {
      throw new Error("Private object storage provider is not configured.");
    }

    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      Body: buffer,
      ContentType: contentType,
      // Private by default
      ACL: "private",
    });

    await this.client.send(command);
    logger.info("Object uploaded to private storage", { key, size: buffer.length });
    return { key, size: buffer.length };
  }

  async deleteObject(key: string): Promise<void> {
    if (!this.client || !this.bucket) {
      throw new Error("Private object storage provider is not configured.");
    }

    const command = new DeleteObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });

    await this.client.send(command);
    logger.info("Object deleted from private storage", { key });
  }

  async getSignedDownloadUrl(key: string, expiresInSeconds = 3600): Promise<string> {
    if (!this.client || !this.bucket) {
      throw new Error("Private object storage provider is not configured.");
    }

    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });

    return await getSignedUrl(this.client, command, { expiresIn: expiresInSeconds });
  }

  async checkHealth(): Promise<{ ok: boolean; provider: string; error?: string }> {
    if (!this.client || !this.bucket) {
      return { ok: false, provider: "s3-compatible", error: "Storage credentials not configured" };
    }
    try {
      await this.client.send(new HeadBucketCommand({ Bucket: this.bucket }));
      return { ok: true, provider: "s3-compatible" };
    } catch (err) {
      return {
        ok: false,
        provider: "s3-compatible",
        error: err instanceof Error ? err.message : String(err),
      };
    }
  }
}

export const storageProvider: StorageProvider = new S3StorageProvider();
