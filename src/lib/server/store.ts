import { promises as fs } from "node:fs";
import path from "node:path";

/**
 * A small JSON-file store. A print studio takes a handful of quote requests a
 * day, so a database would be ceremony; what matters is that a half-finished
 * write can never be read, and that two requests arriving together cannot
 * interleave and lose one.
 *
 * It does need a persistent disk — this will not survive on a serverless host
 * where the filesystem is thrown away between invocations. See README.
 */

/* Statically scoped on purpose: a path built from an env var makes the bundler
   trace the whole project into the server output. The server runs from the
   project folder, so this is the right place anyway. */
export const DATA_DIR = path.join(process.cwd(), "data");

export const UPLOAD_DIR = path.join(DATA_DIR, "uploads");

/** One promise chain per file, so writes to the same file queue up. */
const chains = new Map<string, Promise<unknown>>();

function withLock<T>(key: string, fn: () => Promise<T>): Promise<T> {
  const previous = chains.get(key) ?? Promise.resolve();
  const run = previous.then(fn, fn);
  // keep the chain alive even if this link rejects
  chains.set(key, run.then(undefined, () => undefined));
  return run;
}

async function writeAtomic(file: string, data: unknown) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const target = path.join(DATA_DIR, file);
  const temp = `${target}.${process.pid}.tmp`;
  await fs.writeFile(temp, JSON.stringify(data, null, 2), "utf8");
  // rename is atomic on the same filesystem: readers see old or new, never half
  await fs.rename(temp, target);
}

/** The file is there but cannot be trusted: not JSON, or JSON that is not a list. */
export class UnreadableStore extends Error {
  constructor(file: string, why: string) {
    super(`[store] ${file} ${why} — refusing to overwrite it. Fix or restore the file, then retry.`);
    this.name = "UnreadableStore";
  }
}

/** Missing -> empty. Present but unreadable -> UnreadableStore. Anything else propagates. */
async function readStrict<T>(file: string): Promise<T[]> {
  let raw: string;
  try {
    raw = await fs.readFile(path.join(DATA_DIR, file), "utf8");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new UnreadableStore(file, "is not valid JSON");
  }
  if (!Array.isArray(parsed)) throw new UnreadableStore(file, "is not a list");
  return parsed as T[];
}

/**
 * For reading. A file that cannot be trusted reads as empty, so a page still
 * renders and says so in the log rather than taking the whole app down.
 */
export async function readCollection<T>(file: string): Promise<T[]> {
  try {
    return await readStrict<T>(file);
  } catch (error) {
    if (error instanceof UnreadableStore) {
      console.error(`${error.message} (reading it as empty for now)`);
      return [];
    }
    throw error;
  }
}

/*
 * For writing, the same leniency would be a data-loss bug: read the corrupt
 * file as empty, apply one change, write atomically — and the rename has
 * replaced everything that was in it with a one-item list. So writes go
 * through readStrict() and let UnreadableStore propagate. A hand edit with
 * a stray comma then makes the next save fail loudly, with the original
 * bytes still on disk, instead of quietly succeeding over the top of them.
 */

export async function append<T>(file: string, item: T): Promise<void> {
  await withLock(file, async () => {
    const items = await readStrict<T>(file);
    items.push(item);
    await writeAtomic(file, items);
  });
}

/** Read-modify-write under the same lock, for status changes and the like. */
export async function update<T>(
  file: string,
  mutate: (items: T[]) => T[]
): Promise<T[]> {
  return withLock(file, async () => {
    const next = mutate(await readStrict<T>(file));
    await writeAtomic(file, next);
    return next;
  });
}

/** Keeps a rolling window; the event log would otherwise grow without end. */
export async function appendCapped<T>(
  file: string,
  item: T,
  cap: number
): Promise<void> {
  await withLock(file, async () => {
    const items = await readStrict<T>(file);
    items.push(item);
    await writeAtomic(file, items.length > cap ? items.slice(-cap) : items);
  });
}
