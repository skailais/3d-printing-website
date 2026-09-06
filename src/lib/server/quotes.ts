import { promises as fs } from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { UPLOAD_DIR, append, readCollection, update } from "@/lib/server/store";

export const QUOTES_FILE = "quotes.json";

export const MAX_FILES = 5;
export const MAX_FILE_BYTES = 25 * 1024 * 1024; // 25 MB each
const ALLOWED_EXTENSIONS = [".stl", ".obj", ".step", ".stp"];

export type QuoteStatus = "new" | "quoted" | "printing" | "shipped" | "declined";

export type StoredFile = {
  /** Name as stored on disk — sanitised, never the raw client string. */
  stored: string;
  /** Name the customer's machine used, kept for display only. */
  original: string;
  bytes: number;
};

export type Quote = {
  id: string;
  ref: string;
  receivedAt: string;
  name: string;
  email: string;
  material: string;
  quantity: number;
  comment: string;
  files: StoredFile[];
  status: QuoteStatus;
};

/**
 * A client filename is untrusted input. Strip every directory component, keep
 * only characters that are safe in a path, and cap the length — otherwise
 * "../../etc/passwd" or a 4 KB name becomes our problem.
 */
export function safeFilename(input: string): string {
  const base = path.basename(input).replace(/\\/g, "");
  const cleaned = base.replace(/[^A-Za-z0-9._-]/g, "_").replace(/^\.+/, "");
  const trimmed = cleaned.slice(0, 80);
  return trimmed || "model";
}

export function hasAllowedExtension(filename: string): boolean {
  return ALLOWED_EXTENSIONS.includes(path.extname(filename).toLowerCase());
}

export function allowedExtensionList(): string {
  return ALLOWED_EXTENSIONS.join(", ");
}

function makeRef(count: number): string {
  return `CP-${String(2400 + count + 1).padStart(4, "0")}`;
}

export async function listQuotes(): Promise<Quote[]> {
  const quotes = await readCollection<Quote>(QUOTES_FILE);
  return [...quotes].sort((a, b) => b.receivedAt.localeCompare(a.receivedAt));
}

export async function createQuote(input: {
  name: string;
  email: string;
  material: string;
  quantity: number;
  comment: string;
  files: File[];
}): Promise<Quote> {
  const existing = await readCollection<Quote>(QUOTES_FILE);
  const id = randomUUID();
  const dir = path.join(UPLOAD_DIR, id);

  const stored: StoredFile[] = [];
  if (input.files.length > 0) {
    await fs.mkdir(dir, { recursive: true });

    for (const [index, file] of input.files.entries()) {
      const safe = safeFilename(file.name);
      // prefix with the index so two identically named files cannot collide
      const onDisk = `${String(index + 1).padStart(2, "0")}-${safe}`;
      const bytes = Buffer.from(await file.arrayBuffer());
      await fs.writeFile(path.join(dir, onDisk), bytes);
      stored.push({ stored: onDisk, original: file.name.slice(0, 120), bytes: bytes.length });
    }
  }

  const quote: Quote = {
    id,
    ref: makeRef(existing.length),
    receivedAt: new Date().toISOString(),
    name: input.name,
    email: input.email,
    material: input.material,
    quantity: input.quantity,
    comment: input.comment,
    files: stored,
    status: "new",
  };

  await append(QUOTES_FILE, quote);
  return quote;
}

export async function setQuoteStatus(id: string, status: QuoteStatus): Promise<Quote | null> {
  let updated: Quote | null = null;
  await update<Quote>(QUOTES_FILE, (quotes) =>
    quotes.map((q) => {
      if (q.id !== id) return q;
      updated = { ...q, status };
      return updated;
    })
  );
  return updated;
}

/** Resolves an upload path and refuses anything that escapes the upload dir. */
export function resolveUploadPath(quoteId: string, storedName: string): string | null {
  const target = path.resolve(UPLOAD_DIR, quoteId, storedName);
  const root = path.resolve(UPLOAD_DIR);
  if (!target.startsWith(root + path.sep)) return null;
  return target;
}
