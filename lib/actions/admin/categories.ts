"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";

function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const categorySchema = z.object({
  name: z.string().trim().min(2, "Name is required"),
  slug: z.string().trim().optional(),
});

export type ActionResult = { success: true } | { success: false; error: string };

export async function createCategory(input: {
  name: string;
  slug?: string;
}): Promise<ActionResult> {
  await requireAdmin();
  const parsed = categorySchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  const slug = slugify(parsed.data.slug || parsed.data.name);
  if (!slug) return { success: false, error: "Couldn't derive a slug from that name." };

  const existing = await prisma.category.findUnique({ where: { slug } });
  if (existing) return { success: false, error: `A category with slug "${slug}" already exists.` };

  const count = await prisma.category.count();
  await prisma.category.create({
    data: { name: parsed.data.name, slug, position: count },
  });

  revalidatePath("/admin/categories");
  revalidatePath("/shop");
  return { success: true };
}

export async function updateCategory(
  id: string,
  input: { name: string; slug?: string },
): Promise<ActionResult> {
  await requireAdmin();
  const parsed = categorySchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  const slug = slugify(parsed.data.slug || parsed.data.name);
  if (!slug) return { success: false, error: "Couldn't derive a slug from that name." };

  const existing = await prisma.category.findUnique({ where: { slug } });
  if (existing && existing.id !== id) {
    return { success: false, error: `A category with slug "${slug}" already exists.` };
  }

  await prisma.category.update({
    where: { id },
    data: { name: parsed.data.name, slug },
  });

  revalidatePath("/admin/categories");
  revalidatePath("/shop");
  return { success: true };
}

export async function deleteCategory(id: string): Promise<ActionResult> {
  await requireAdmin();
  const productCount = await prisma.product.count({ where: { categoryId: id } });
  if (productCount > 0) {
    return {
      success: false,
      error: `This category has ${productCount} product(s). Move or delete them first.`,
    };
  }

  await prisma.category.delete({ where: { id } });
  revalidatePath("/admin/categories");
  revalidatePath("/shop");
  return { success: true };
}
