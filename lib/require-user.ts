import "server-only";
import { cookies } from "next/headers";
import { USER_SESSION_COOKIE, verifyUserSessionToken } from "@/lib/user-auth";

export async function getCurrentUserId(): Promise<string | null> {
  const token = cookies().get(USER_SESSION_COOKIE)?.value;
  return verifyUserSessionToken(token);
}

export async function requireUser(): Promise<string> {
  const userId = await getCurrentUserId();
  if (!userId) throw new Error("Unauthorized");
  return userId;
}
