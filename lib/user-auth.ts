export const USER_SESSION_COOKIE = "apex_user_session";
const SESSION_MAX_AGE_MS = 1000 * 60 * 60 * 24 * 30; // 30 days
export const USER_SESSION_MAX_AGE_SECONDS = SESSION_MAX_AGE_MS / 1000;

const encoder = new TextEncoder();

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return result === 0;
}

async function getKey(secret: string) {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
}

function getSecret(): string | undefined {
  return process.env.USER_SESSION_SECRET;
}

export async function createUserSessionToken(userId: string): Promise<string> {
  const secret = getSecret();
  if (!secret) throw new Error("USER_SESSION_SECRET is not set");
  const expires = Date.now() + SESSION_MAX_AGE_MS;
  const payload = `${userId}.${expires}`;
  const key = await getKey(secret);
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  return `${payload}.${toHex(signature)}`;
}

export async function verifyUserSessionToken(
  token: string | undefined | null,
): Promise<string | null> {
  if (!token) return null;
  const secret = getSecret();
  if (!secret) return null;

  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [userId, expiresStr, signature] = parts;
  const expires = Number(expiresStr);
  if (!userId || !expiresStr || !signature || Number.isNaN(expires) || expires < Date.now()) {
    return null;
  }

  const payload = `${userId}.${expiresStr}`;
  const key = await getKey(secret);
  const expectedSignature = toHex(await crypto.subtle.sign("HMAC", key, encoder.encode(payload)));
  return timingSafeEqual(signature, expectedSignature) ? userId : null;
}
