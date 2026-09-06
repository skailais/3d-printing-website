import { createHmac, randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { cookies } from "next/headers";

const scryptAsync = promisify(scrypt) as (
  password: string,
  salt: string,
  keylen: number
) => Promise<Buffer>;

export const SESSION_COOKIE = "cp_session";
const SESSION_HOURS = 8;
const KEY_LENGTH = 64;

/**
 * Credentials live in the environment, never in the repository. Generate both
 * with `npm run setup:admin`, which writes them to .env.local.
 */
function secret(): string | null {
  const value = process.env.SESSION_SECRET;
  return value && value.length >= 32 ? value : null;
}

function passwordHash(): string | null {
  return process.env.ADMIN_PASSWORD_HASH || null;
}

/** True once both secrets are present — the admin area stays shut without them. */
export function isConfigured(): boolean {
  return Boolean(secret() && passwordHash());
}

export async function hashPassword(password: string, salt = randomBytes(16).toString("hex")) {
  const derived = await scryptAsync(password, salt, KEY_LENGTH);
  return `${salt}:${derived.toString("hex")}`;
}

export async function verifyPassword(password: string): Promise<boolean> {
  const stored = passwordHash();
  if (!stored) return false;

  const [salt, expectedHex] = stored.split(":");
  if (!salt || !expectedHex) return false;

  const expected = Buffer.from(expectedHex, "hex");
  const actual = await scryptAsync(password, salt, expected.length);

  // constant time, so a wrong password cannot be found one character at a time
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

function sign(payload: string, key: string) {
  return createHmac("sha256", key).update(payload).digest("base64url");
}

/** Stateless token: an expiry, signed. No server-side session table to keep. */
export function createToken(): string | null {
  const key = secret();
  if (!key) return null;
  const expires = Date.now() + SESSION_HOURS * 60 * 60 * 1000;
  const payload = `${expires}.${randomBytes(12).toString("base64url")}`;
  return `${payload}.${sign(payload, key)}`;
}

export function verifyToken(token: string | undefined): boolean {
  const key = secret();
  if (!key || !token) return false;

  const parts = token.split(".");
  if (parts.length !== 3) return false;

  const [expires, nonce, signature] = parts;
  const payload = `${expires}.${nonce}`;

  const expectedSig = Buffer.from(sign(payload, key));
  const givenSig = Buffer.from(signature);
  if (expectedSig.length !== givenSig.length) return false;
  if (!timingSafeEqual(expectedSig, givenSig)) return false;

  return Number(expires) > Date.now();
}

/** Whether the caller holds a valid session. Use before returning any data. */
export async function isAuthenticated(): Promise<boolean> {
  const jar = await cookies();
  return verifyToken(jar.get(SESSION_COOKIE)?.value);
}

export function sessionCookieOptions(isSecureRequest: boolean) {
  return {
    httpOnly: true,
    // Only over HTTPS. On a plain-http LAN this cannot be set, which is exactly
    // why the README says not to expose this beyond a trusted network.
    secure: isSecureRequest,
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_HOURS * 60 * 60,
  };
}
