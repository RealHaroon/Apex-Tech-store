"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import {
  USER_SESSION_COOKIE,
  USER_SESSION_MAX_AGE_SECONDS,
  createUserSessionToken,
} from "@/lib/user-auth";
import { getCurrentUserId } from "@/lib/require-user";

export type AuthResult = { success: true } | { success: false; error: string };

const registerSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name"),
  email: z.string().trim().toLowerCase().email("Enter a valid email"),
  phone: z.string().trim().optional().or(z.literal("")),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email"),
  password: z.string().min(1, "Enter your password"),
});

async function setUserSession(userId: string) {
  const token = await createUserSessionToken(userId);
  cookies().set(USER_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: USER_SESSION_MAX_AGE_SECONDS,
  });
}

export async function registerUser(input: {
  name: string;
  email: string;
  phone?: string;
  password: string;
}): Promise<AuthResult> {
  const parsed = registerSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }
  const data = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email: data.email } });
  if (existing) {
    return { success: false, error: "An account with that email already exists." };
  }

  const passwordHash = await bcrypt.hash(data.password, 10);
  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      passwordHash,
    },
  });

  await setUserSession(user.id);
  return { success: true };
}

export async function loginUser(input: {
  email: string;
  password: string;
}): Promise<AuthResult> {
  const parsed = loginSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }
  const data = parsed.data;

  const user = await prisma.user.findUnique({ where: { email: data.email } });
  if (!user) {
    return { success: false, error: "Incorrect email or password." };
  }

  const match = await bcrypt.compare(data.password, user.passwordHash);
  if (!match) {
    return { success: false, error: "Incorrect email or password." };
  }

  await setUserSession(user.id);
  return { success: true };
}

export async function logoutUser(): Promise<void> {
  cookies().set(USER_SESSION_COOKIE, "", { path: "/", maxAge: 0 });
}

export type CurrentUser = { id: string; name: string; email: string; phone: string | null };

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const userId = await getCurrentUserId();
  if (!userId) return null;
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true, email: true, phone: true },
  });
  return user;
}
