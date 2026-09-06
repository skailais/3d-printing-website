#!/usr/bin/env node
/**
 * Creates the two secrets the admin area needs and writes them to .env.local
 * (which is gitignored). Run once per machine:
 *
 *   npm run setup:admin -- "your chosen password"
 *
 * Re-running replaces both, which signs out any open session.
 */
import { randomBytes, scrypt } from "node:crypto";
import { promisify } from "node:util";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const scryptAsync = promisify(scrypt);

const password = process.argv[2];

if (!password || password.length < 8) {
  console.error("\n  Give a password of at least 8 characters:\n");
  console.error('    npm run setup:admin -- "your chosen password"\n');
  process.exit(1);
}

const salt = randomBytes(16).toString("hex");
const derived = await scryptAsync(password, salt, 64);
const hash = `${salt}:${derived.toString("hex")}`;
const secret = randomBytes(48).toString("hex");

const envPath = path.join(process.cwd(), ".env.local");
const existing = existsSync(envPath) ? readFileSync(envPath, "utf8") : "";

/** Replaces the line if present, appends it if not. */
function setVar(source, key, value) {
  const line = `${key}=${value}`;
  const pattern = new RegExp(`^${key}=.*$`, "m");
  return pattern.test(source) ? source.replace(pattern, line) : `${source.trimEnd()}\n${line}\n`;
}

let next = existing;
next = setVar(next, "ADMIN_PASSWORD_HASH", hash);
next = setVar(next, "SESSION_SECRET", secret);

writeFileSync(envPath, next.trimStart(), "utf8");

console.log("\n  Written to .env.local:");
console.log("    ADMIN_PASSWORD_HASH  (scrypt, salted — the password itself is not stored)");
console.log("    SESSION_SECRET       (48 random bytes)\n");
console.log("  Restart the server for it to pick these up.");
console.log("  Keep .env.local off any shared drive; it is already gitignored.\n");
