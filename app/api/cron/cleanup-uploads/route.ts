import { NextResponse } from 'next/server';
import { cleanupExpiredUploads } from '@/lib/storage/upload';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Automated 30-Day Retention Enforcement Endpoint.
 * Purges project drawing uploads whose retention window has expired.
 */
export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  // If CRON_SECRET is configured, require bearer token verification
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ ok: false, error: 'Unauthorized cron invocation.' }, { status: 401 });
  }

  try {
    const result = cleanupExpiredUploads();
    return NextResponse.json({
      ok: true,
      timestamp: new Date().toISOString(),
      retentionEnforced: '30-day strict purge',
      ...result,
    });
  } catch (error) {
    console.error('Retention purge failed:', error);
    return NextResponse.json({ ok: false, error: 'Failed to execute retention cleanup.' }, { status: 500 });
  }
}
