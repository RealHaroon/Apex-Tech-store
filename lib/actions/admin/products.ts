"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";
import type { ActionResult } from "@/lib/actions/admin/categories";

function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const productSchema = z.object({
  name: z.string().trim().min(2, "Name is required"),
  slug: z.string().trim().optional(),
  description: z.string().trim().min(5, "Add a short description"),
  categoryId: z.string().trim().min(1, "Choose a category"),
  icon: z.string().trim().min(1, "Choose an icon"),
  imageUrl: z.string().trim().optional().or(z.literal("")),
  price: z.coerce.number().int().nonnegative("Price must be 0 or more"),
  priceNote: z.string().trim().optional().or(z.literal("")),
  startingPrice: z.boolean().default(false),
  featured: z.boolean().default(false),
  inStock: z.boolean().default(true),
});

export type ProductInput = z.infer<typeof productSchema>;

export async function createProduct(input: ProductInput): Promise<ActionResult> {
  await requireAdmin();
  const parsed = productSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }
  const data = parsed.data;

  const slug = slugify(data.slug || data.name);
  if (!slug) return { success: false, error: "Couldn't derive a slug from that name." };

  const existing = await prisma.product.findUnique({ where: { slug } });
  if (existing) return { success: false, error: `A product with slug "${slug}" already exists.` };

  const category = await prisma.category.findUnique({ where: { id: data.categoryId } });
  if (!category) return { success: false, error: "That category no longer exists." };

  await prisma.product.create({
    data: {
      slug,
      name: data.name,
      description: data.description,
      categoryId: data.categoryId,
      icon: data.icon,
      imageUrl: data.imageUrl || null,
      price: data.price,
      priceNote: data.priceNote || null,
      startingPrice: data.startingPrice,
      featured: data.featured,
      inStock: data.inStock,
    },
  });

  revalidatePath("/admin/products");
  revalidatePath("/shop");
  return { success: true };
}

export async function updateProduct(
  id: string,
  input: ProductInput,
): Promise<ActionResult> {
  await requireAdmin();
  const parsed = productSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }
  const data = parsed.data;

  const slug = slugify(data.slug || data.name);
  if (!slug) return { success: false, error: "Couldn't derive a slug from that name." };

  const existing = await prisma.product.findUnique({ where: { slug } });
  if (existing && existing.id !== id) {
    return { success: false, error: `A product with slug "${slug}" already exists.` };
  }

  const category = await prisma.category.findUnique({ where: { id: data.categoryId } });
  if (!category) return { success: false, error: "That category no longer exists." };

  await prisma.product.update({
    where: { id },
    data: {
      slug,
      name: data.name,
      description: data.description,
      categoryId: data.categoryId,
      icon: data.icon,
      imageUrl: data.imageUrl || null,
      price: data.price,
      priceNote: data.priceNote || null,
      startingPrice: data.startingPrice,
      featured: data.featured,
      inStock: data.inStock,
    },
  });

  revalidatePath("/admin/products");
  revalidatePath("/shop");
  revalidatePath(`/shop/${slug}`);
  return { success: true };
}

export async function deleteProduct(id: string): Promise<ActionResult> {
  await requireAdmin();
  const orderItemCount = await prisma.orderItem.count({ where: { productId: id } });
  if (orderItemCount > 0) {
    return {
      success: false,
      error: "This product has past orders and can't be deleted. Mark it out of stock instead.",
    };
  }

  await prisma.product.delete({ where: { id } });
  revalidatePath("/admin/products");
  revalidatePath("/shop");
  return { success: true };
}

export async function toggleProductStock(id: string, inStock: boolean): Promise<ActionResult> {
  await requireAdmin();
  await prisma.product.update({ where: { id }, data: { inStock } });
  revalidatePath("/admin/products");
  revalidatePath("/shop");
  return { success: true };
}
