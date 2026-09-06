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

export async function readCollection<T>(file: string): Promise<T[]> {
  try {
    const raw = await fs.readFile(path.join(DATA_DIR, file), "utf8");
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    if (code === "ENOENT") return [];
    if (error instanceof SyntaxError) {
      // a corrupt file should not take the whole page down
      console.error(`[store] ${file} is not valid JSON — treating as empty`);
      return [];
    }
    throw error;
  }
}

export async function append<T>(file: string, item: T): Promise<void> {
  await withLock(file, async () => {
    const items = await readCollection<T>(file);
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
    const next = mutate(await readCollection<T>(file));
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
    const items = await readCollection<T>(file);
    items.push(item);
    await writeAtomic(file, items.length > cap ? items.slice(-cap) : items);
  });
}
