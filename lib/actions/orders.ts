"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/require-user";

const checkoutSchema = z.object({
  customerName: z.string().trim().min(2, "Enter your full name"),
  phone: z.string().trim().min(7, "Enter a valid phone number"),
  email: z
    .string()
    .trim()
    .email("Enter a valid email")
    .optional()
    .or(z.literal("")),
  address: z.string().trim().min(5, "Enter your delivery address"),
  city: z.string().trim().min(2, "Enter your city"),
  notes: z.string().trim().optional().or(z.literal("")),
  paymentMethod: z.enum(["COD", "BANK_TRANSFER"]),
  items: z
    .array(
      z.object({
        productId: z.string(),
        quantity: z.number().int().positive(),
      }),
    )
    .min(1, "Your cart is empty"),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;

export type CheckoutResult =
  | { success: true; orderNumber: string }
  | { success: false; error: string };

export async function createOrder(
  input: CheckoutInput,
): Promise<CheckoutResult> {
  const parsed = checkoutSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }
  const data = parsed.data;

  const productIds = data.items.map((i) => i.productId);
  const products = await prisma.product.findMany({
    where: { id: { in: productIds } },
  });

  if (products.length !== productIds.length) {
    return { success: false, error: "One or more items are no longer available." };
  }

  const outOfStock = products.find((p) => !p.inStock);
  if (outOfStock) {
    return {
      success: false,
      error: `${outOfStock.name} is currently out of stock.`,
    };
  }

  const subtotal = data.items.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.productId)!;
    return sum + product.price * item.quantity;
  }, 0);

  const orderCount = await prisma.order.count();
  const orderNumber = `APX-${String(orderCount + 1).padStart(6, "0")}`;
  const userId = await getCurrentUserId();

  await prisma.order.create({
    data: {
      orderNumber,
      userId,
      customerName: data.customerName,
      phone: data.phone,
      email: data.email || null,
      address: data.address,
      city: data.city,
      notes: data.notes || null,
      paymentMethod: data.paymentMethod,
      subtotal,
      items: {
        create: data.items.map((item) => {
          const product = products.find((p) => p.id === item.productId)!;
          return {
            productId: product.id,
            name: product.name,
            price: product.price,
            quantity: item.quantity,
          };
        }),
      },
    },
  });

  return { success: true, orderNumber };
}
