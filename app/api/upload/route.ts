import { NextResponse } from 'next/server';
import { validateFileBuffer, storePrivateUpload, MAX_FILE_SIZE } from '@/lib/storage/upload';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json(
        { ok: false, error: 'No file was provided in the request payload.' },
        { status: 400 }
      );
    }

    const filename = (file as File).name || 'upload.bin';
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    if (buffer.length > MAX_FILE_SIZE) {
      return NextResponse.json(
        { ok: false, error: 'File size exceeds maximum permitted limit of 50MB.' },
        { status: 413 }
      );
    }

    const validation = validateFileBuffer(buffer, filename);
    if (!validation.valid) {
      return NextResponse.json(
        { ok: false, error: validation.error },
        { status: 400 }
      );
    }

    const metadata = storePrivateUpload(buffer, filename, validation.detectedMime || 'application/octet-stream');

    return NextResponse.json(
      {
        ok: true,
        fileId: metadata.fileId,
        originalName: metadata.originalName,
        sizeBytes: metadata.sizeBytes,
        uploadedAt: metadata.uploadedAt,
        expiresAt: metadata.expiresAt,
        message: 'File verified and stored in private scoping vault. Scheduled for automated purge in 30 days.',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('File upload exception:', error);
    return NextResponse.json(
      { ok: false, error: 'Internal server error processing file upload.' },
      { status: 500 }
    );
  }
}
