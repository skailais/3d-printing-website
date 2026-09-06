import { NextResponse } from "next/server";
import { recordView, visitorHash } from "@/lib/server/analytics";
import { clientKey, rateLimit } from "@/lib/server/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Public: one line per page view. No cookies set, no address stored. */
export async function POST(request: Request) {
  const limit = rateLimit(`track:${clientKey(request)}`, 120, 60 * 1000);
  if (!limit.ok) return new NextResponse(null, { status: 204 });

  let path = "/";
  try {
    const body = await request.json();
    if (typeof body?.path === "string") path = body.path.slice(0, 200);
  } catch {
    return new NextResponse(null, { status: 204 });
  }

  // only count our own pages
  if (!path.startsWith("/")) return new NextResponse(null, { status: 204 });

  try {
    await recordView(path, visitorHash(request));
  } catch (error) {
    console.error("[track] could not record view", error);
  }

  return new NextResponse(null, { status: 204 });
}
