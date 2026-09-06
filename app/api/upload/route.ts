import { NextResponse } from "next/server";
import { validateFileBuffer, storePrivateUpload, MAX_FILE_SIZE } from "@/lib/storage/upload";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { logger } from "@/lib/logger";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const correlationId = logger.createCorrelationId();
  const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  // Rate limit: 10 uploads per 10 minutes per IP
  const rate = await checkRateLimit(`upload:${clientIp}`, 10, 600);
  if (!rate.allowed) {
    logger.warn("Upload rate limit exceeded", { correlationId, clientIp });
    return NextResponse.json(
      { ok: false, error: "Upload quota exceeded. Please try again later." },
      {
        status: 429,
        headers: { "Retry-After": String(rate.resetSeconds) },
      }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json(
        { ok: false, error: "No file was provided in the request payload." },
        { status: 400 }
      );
    }

    const filename = (file as File).name || "upload.bin";
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    if (buffer.length > MAX_FILE_SIZE) {
      return NextResponse.json(
        { ok: false, error: "File size exceeds maximum permitted limit of 50MB." },
        { status: 413 }
      );
    }

    const validation = validateFileBuffer(buffer, filename);
    if (!validation.valid) {
      logger.warn("Upload rejected by security policy", {
        correlationId,
        filename,
        reason: validation.error,
      });
      return NextResponse.json(
        { ok: false, error: validation.error },
        { status: 400 }
      );
    }

    const metadata = await storePrivateUpload(
      buffer,
      filename,
      validation.detectedMime || "application/octet-stream"
    );

    logger.info("Upload successfully stored", {
      correlationId,
      fileId: metadata.fileId,
      sizeBytes: metadata.sizeBytes,
    });

    return NextResponse.json(
      {
        ok: true,
        fileId: metadata.fileId,
        originalName: metadata.originalName,
        sizeBytes: metadata.sizeBytes,
        uploadedAt: metadata.uploadedAt,
        expiresAt: metadata.expiresAt,
        message: "File verified and stored in private scoping vault. Scheduled for automated purge in 30 days.",
      },
      { status: 201 }
    );
  } catch (error) {
    logger.error("File upload exception", {
      correlationId,
      error: error instanceof Error ? error.message : String(error),
    });
    return NextResponse.json(
      { ok: false, error: "Internal server error processing file upload." },
      { status: 500 }
    );
  }
}
