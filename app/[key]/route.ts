export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DEFAULT_KEY = "c746da95e0c54178a9cb57f7229b19d4";

export async function GET(
  _request: Request,
  props: { params: Promise<{ key: string }> }
) {
  const { key } = await props.params;
  const configuredKey = process.env.INDEXNOW_KEY || DEFAULT_KEY;

  // Handle requests to /{key}.txt or /{key}
  const requestedKey = key.endsWith(".txt") ? key.slice(0, -4) : key;

  if (requestedKey === configuredKey || requestedKey === DEFAULT_KEY) {
    return new Response(requestedKey, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    });
  }

  return new Response("Not Found", { status: 404 });
}
