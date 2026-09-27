"use client";

import { useState } from "react";
import { useCartStore } from "@/lib/cart-store";
import type { ProductSummary } from "@/lib/types";
import { Button } from "@/components/Button";

export function AddToCartButton({
  product,
  size = "small",
}: {
  product: ProductSummary;
  size?: "default" | "small";
}) {
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);

  if (!product.inStock) {
    return (
      <Button variant="secondary" size={size} className="w-full justify-center opacity-50 cursor-not-allowed">
        Out of stock
      </Button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        addItem({
          productId: product.id,
          slug: product.slug,
          name: product.name,
          price: product.price,
          priceNote: product.priceNote,
          icon: product.icon,
        });
        setAdded(true);
        setTimeout(() => setAdded(false), 1600);
      }}
      className={
        size === "small"
          ? "w-full justify-center inline-flex items-center gap-2 rounded-md border-[1.5px] border-navy text-navy bg-transparent hover:bg-navy/[0.06] px-4 py-[9px] text-[0.85rem] font-semibold transition-colors"
          : "w-full justify-center inline-flex items-center gap-2 rounded-[7px] bg-navy text-white hover:bg-navy-mid px-6 py-[13px] text-[0.96rem] font-semibold transition-colors"
      }
    >
      {added ? "Added to cart ✓" : "Add to cart"}
    </button>
  );
}
