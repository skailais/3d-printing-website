import { NextResponse } from "next/server";
import {
  SESSION_COOKIE,
  createToken,
  isConfigured,
  sessionCookieOptions,
  verifyPassword,
} from "@/lib/server/auth";
import { clientKey, rateLimit } from "@/lib/server/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!isConfigured()) {
    return NextResponse.json(
      { error: "Admin access is not configured on this server." },
      { status: 503 }
    );
  }

  // slow down guessing: eight tries a quarter of an hour, per address
  const limit = rateLimit(`login:${clientKey(request)}`, 8, 15 * 60 * 1000);
  if (!limit.ok) {
    return NextResponse.json(
      { error: `Too many attempts. Wait ${Math.ceil(limit.retryAfter / 60)} min.` },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } }
    );
  }

  let password = "";
  try {
    const body = await request.json();
    password = typeof body?.password === "string" ? body.password : "";
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  if (!(await verifyPassword(password))) {
    // deliberately vague, and the same shape whatever went wrong
    return NextResponse.json({ error: "Not that one." }, { status: 401 });
  }

  const token = createToken();
  if (!token) {
    return NextResponse.json({ error: "Server misconfigured" }, { status: 503 });
  }

  const secure = new URL(request.url).protocol === "https:";
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, token, sessionCookieOptions(secure));
  return response;
}
