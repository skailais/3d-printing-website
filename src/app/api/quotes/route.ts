import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/server/auth";
import { clientKey, rateLimit } from "@/lib/server/rate-limit";
import {
  MAX_FILES,
  MAX_FILE_BYTES,
  allowedExtensionList,
  createQuote,
  hasAllowedExtension,
  listQuotes,
} from "@/lib/server/quotes";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function bad(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

/** Public: a visitor sends a model and their details. */
export async function POST(request: Request) {
  const limit = rateLimit(`quote:${clientKey(request)}`, 5, 10 * 60 * 1000);
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Too many requests. Try again shortly." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } }
    );
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return bad("Could not read the form.");
  }

  const name = String(form.get("name") ?? "").trim();
  const email = String(form.get("email") ?? "").trim();
  const material = String(form.get("material") ?? "").trim();
  const comment = String(form.get("comment") ?? "").trim();
  const quantity = Number(form.get("quantity"));

  if (name.length < 2 || name.length > 120) return bad("Please give a name.");
  if (!EMAIL.test(email) || email.length > 200) return bad("That email does not look right.");
  if (!material || material.length > 60) return bad("Choose a material.");
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10_000)
    return bad("Quantity must be between 1 and 10,000.");
  if (comment.length > 2_000) return bad("Please keep the note under 2,000 characters.");

  const files = form.getAll("files").filter((f): f is File => f instanceof File && f.size > 0);

  if (files.length > MAX_FILES) return bad(`Up to ${MAX_FILES} files, please.`);
  for (const file of files) {
    if (file.size > MAX_FILE_BYTES)
      return bad(`${file.name} is over ${MAX_FILE_BYTES / 1024 / 1024} MB.`);
    if (!hasAllowedExtension(file.name))
      return bad(`Only ${allowedExtensionList()} files, please.`);
  }

  try {
    const quote = await createQuote({ name, email, material, quantity, comment, files });
    return NextResponse.json({ ref: quote.ref }, { status: 201 });
  } catch (error) {
    console.error("[quotes] failed to save", error);
    return bad("Could not save the request. Please try again.", 500);
  }
}

/** Admin: the queue. Never returns anything without a valid session. */
export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Not authorised" }, { status: 401 });
  }
  return NextResponse.json({ quotes: await listQuotes() });
}
