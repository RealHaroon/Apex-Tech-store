"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCartStore, cartSubtotal } from "@/lib/cart-store";
import { ProductIcon } from "@/components/icons";
import { Button } from "@/components/Button";
import { PageHero } from "@/components/SectionHead";
import { formatPKR } from "@/lib/format";

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const items = useCartStore((s) => s.items);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const subtotal = cartSubtotal(items);

  return (
    <>
      <PageHero eyebrow="Cart" title="Your cart" />
      <section className="py-14">
        <div className="max-w-wrap mx-auto px-7">
          {items.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted mb-6">Your cart is empty.</p>
              <Button href="/shop">Browse the shop</Button>
            </div>
          ) : (
            <div className="flex flex-wrap gap-10">
              <div className="flex-1 basis-[420px]">
                {items.map((item) => (
                  <div
                    key={item.productId}
                    className="flex items-center gap-4 py-5 border-b border-line"
                  >
                    <div className="w-16 h-16 rounded-lg bg-ice flex items-center justify-center flex-shrink-0">
                      <ProductIcon icon={item.icon} className="!w-8 !h-8" />
                    </div>
                    <div className="flex-1">
                      <Link href={`/shop/${item.slug}`} className="no-underline">
                        <h3 className="font-semibold text-ink">{item.name}</h3>
                      </Link>
                      <div className="text-muted text-sm mt-1">
                        {formatPKR(item.price)}
                        {item.priceNote ? ` ${item.priceNote}` : ""}
                      </div>
                    </div>
                    <div className="flex items-center border border-line rounded-md">
                      <button
                        type="button"
                        className="w-8 h-8 text-navy font-semibold"
                        onClick={() => setQuantity(item.productId, item.quantity - 1)}
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <button
                        type="button"
                        className="w-8 h-8 text-navy font-semibold"
                        onClick={() => setQuantity(item.productId, item.quantity + 1)}
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        +
                      </button>
                    </div>
                    <div className="w-24 text-right font-serif font-semibold text-navy">
                      {formatPKR(item.price * item.quantity)}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.productId)}
                      aria-label={`Remove ${item.name} from cart`}
                      className="text-muted hover:text-navy text-sm ml-2"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex-1 basis-[280px] max-w-[340px]">
                <div className="border border-line rounded-2xl p-6">
                  <div className="flex justify-between text-sm text-muted mb-2">
                    <span>Subtotal</span>
                    <span className="font-semibold text-navy">{formatPKR(subtotal)}</span>
                  </div>
                  <p className="text-xs text-muted mb-5">
                    Setup fees (where noted) are confirmed at checkout, not charged online.
                  </p>
                  <Button href="/checkout" className="w-full justify-center">
                    Proceed to checkout
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
