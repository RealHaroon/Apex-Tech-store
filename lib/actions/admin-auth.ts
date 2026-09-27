"use server";

import { cookies } from "next/headers";
import {
  ADMIN_SESSION_COOKIE,
  SESSION_MAX_AGE_SECONDS,
  createSessionToken,
} from "@/lib/admin-auth";

export type LoginResult = { success: true } | { success: false; error: string };

export async function loginAdmin(password: string): Promise<LoginResult> {
  if (!process.env.ADMIN_PASSWORD || !process.env.ADMIN_SESSION_SECRET) {
    return {
      success: false,
      error: "Admin login isn't configured. Set ADMIN_PASSWORD and ADMIN_SESSION_SECRET.",
    };
  }
  if (password !== process.env.ADMIN_PASSWORD) {
    return { success: false, error: "Incorrect password." };
  }

  const token = await createSessionToken();
  cookies().set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });

  return { success: true };
}

export async function logoutAdmin(): Promise<void> {
  cookies().set(ADMIN_SESSION_COOKIE, "", { path: "/", maxAge: 0 });
}
