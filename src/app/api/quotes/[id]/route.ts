import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/server/auth";
import { setQuoteStatus, type QuoteStatus } from "@/lib/server/quotes";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const STATUSES: QuoteStatus[] = ["new", "quoted", "printing", "shipped", "declined"];

/** Admin: move a request along the queue. */
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Not authorised" }, { status: 401 });
  }

  const { id } = await params;

  let status: string;
  try {
    const body = await request.json();
    status = String(body?.status ?? "");
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  if (!STATUSES.includes(status as QuoteStatus)) {
    return NextResponse.json({ error: "Unknown status" }, { status: 400 });
  }

  const updated = await setQuoteStatus(id, status as QuoteStatus);
  if (!updated) return NextResponse.json({ error: "No such request" }, { status: 404 });

  return NextResponse.json({ quote: updated });
}
