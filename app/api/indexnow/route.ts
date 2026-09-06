import { NextResponse } from "next/server";
import { SITE } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * IndexNow discovery notification endpoint.
 * Notifies participating search engines (Microsoft Bing, Yandex, Seznam, Naver)
 * of new or updated URLs on xiyato.uk for instant re-crawling.
 */
export async function POST(request: Request) {
  const apiKey = process.env.INDEXNOW_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { ok: false, message: "IndexNow API key not configured." },
      { status: 503 }
    );
  }

  try {
    const body = await request.json().catch(() => ({}));
    const urls: string[] = Array.isArray(body.urls) && body.urls.length > 0
      ? body.urls
      : [`${SITE.url}/`];

    const payload = {
      host: "xiyato.uk",
      key: apiKey,
      keyLocation: `${SITE.url}/${apiKey}.txt`,
      urlList: urls,
    };

    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    return NextResponse.json({
      ok: res.ok || res.status === 200 || res.status === 202,
      status: res.status,
      submittedUrls: urls.length,
    });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: String(error) },
      { status: 500 }
    );
  }
}
