import { promises as fs } from "node:fs";
import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/server/auth";
import { listQuotes, resolveUploadPath } from "@/lib/server/quotes";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Admin only. Uploads live outside /public precisely so they are not served by
 * the static handler — the only way to them is through this check.
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string; name: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Not authorised" }, { status: 401 });
  }

  const { id, name } = await params;
  const decoded = decodeURIComponent(name);

  // the name must be one this quote actually has, not just any path
  const quote = (await listQuotes()).find((q) => q.id === id);
  const record = quote?.files.find((f) => f.stored === decoded);
  if (!quote || !record) {
    return NextResponse.json({ error: "No such file" }, { status: 404 });
  }

  const filePath = resolveUploadPath(id, decoded);
  if (!filePath) return NextResponse.json({ error: "No such file" }, { status: 404 });

  try {
    const data = await fs.readFile(filePath);
    return new NextResponse(new Uint8Array(data), {
      headers: {
        // never inline: these are untrusted files from the public form
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename="${record.stored}"`,
        "Content-Length": String(data.length),
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return NextResponse.json({ error: "File is missing from disk" }, { status: 404 });
  }
}
