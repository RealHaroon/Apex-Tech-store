"use server";

import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { requireAdmin } from "@/lib/require-admin";

const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

export type UploadResult = { success: true; url: string } | { success: false; error: string };

export async function uploadProductImage(formData: FormData): Promise<UploadResult> {
  await requireAdmin();

  const file = formData.get("file");
  if (!(file instanceof File)) {
    return { success: false, error: "No file provided." };
  }

  const ext = ALLOWED_TYPES[file.type];
  if (!ext) {
    return { success: false, error: "Use a JPG, PNG, WEBP, or GIF image." };
  }
  if (file.size > MAX_SIZE_BYTES) {
    return { success: false, error: "Image must be 5MB or smaller." };
  }

  const dir = path.join(process.cwd(), "public", "uploads", "products");
  await mkdir(dir, { recursive: true });

  const filename = `${randomUUID()}.${ext}`;
  const bytes = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(dir, filename), bytes);

  return { success: true, url: `/uploads/products/${filename}` };
}
