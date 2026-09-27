"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore, cartSubtotal } from "@/lib/cart-store";
import { createOrder } from "@/lib/actions/orders";
import { PageHero } from "@/components/SectionHead";
import { formatPKR } from "@/lib/format";
import { Button } from "@/components/Button";

export default function CheckoutPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const items = useCartStore((s) => s.items);
  const clear = useCartStore((s) => s.clear);

  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"COD" | "BANK_TRANSFER">("COD");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const subtotal = cartSubtotal(items);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const result = await createOrder({
      customerName,
      phone,
      email,
      address,
      city,
      notes,
      paymentMethod,
      items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
    });
    setSubmitting(false);
    if (!result.success) {
      setError(result.error);
      return;
    }
    clear();
    router.push(`/checkout/confirmation/${result.orderNumber}`);
  }

  if (items.length === 0) {
    return (
      <>
        <PageHero eyebrow="Checkout" title="Checkout" />
        <section className="py-20 text-center">
          <p className="text-muted mb-6">Your cart is empty.</p>
          <Button href="/shop">Browse the shop</Button>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero eyebrow="Checkout" title="Complete your order" />
      <section className="py-14">
        <div className="max-w-wrap mx-auto px-7 flex flex-wrap gap-10">
          <form onSubmit={handleSubmit} className="flex-1 basis-[420px] space-y-5">
            <div>
              <label className="block text-sm font-semibold text-navy mb-1.5">Full name</label>
              <input
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full border border-line rounded-md px-3.5 py-2.5 text-sm focus:outline-none focus:border-navy"
              />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-navy mb-1.5">Phone</label>
                <input
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border border-line rounded-md px-3.5 py-2.5 text-sm focus:outline-none focus:border-navy"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-semibold text-navy mb-1.5">Email (optional)</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-line rounded-md px-3.5 py-2.5 text-sm focus:outline-none focus:border-navy"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy mb-1.5">Delivery address</label>
              <input
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full border border-line rounded-md px-3.5 py-2.5 text-sm focus:outline-none focus:border-navy"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy mb-1.5">City</label>
              <input
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full border border-line rounded-md px-3.5 py-2.5 text-sm focus:outline-none focus:border-navy"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy mb-1.5">Order notes (optional)</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="w-full border border-line rounded-md px-3.5 py-2.5 text-sm focus:outline-none focus:border-navy"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-navy mb-2">Payment method</label>
              <div className="space-y-2">
                <label className="flex items-center gap-3 border border-line rounded-md px-3.5 py-3 cursor-pointer has-[:checked]:border-navy">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === "COD"}
                    onChange={() => setPaymentMethod("COD")}
                  />
                  <span>
                    <span className="block font-semibold text-sm">Cash on Delivery</span>
                    <span className="block text-xs text-muted">Pay in cash when your order arrives.</span>
                  </span>
                </label>
                <label className="flex items-center gap-3 border border-line rounded-md px-3.5 py-3 cursor-pointer has-[:checked]:border-navy">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === "BANK_TRANSFER"}
                    onChange={() => setPaymentMethod("BANK_TRANSFER")}
                  />
                  <span>
                    <span className="block font-semibold text-sm">Bank Transfer</span>
                    <span className="block text-xs text-muted">
                      We&apos;ll send account details on WhatsApp to confirm payment.
                    </span>
                  </span>
                </label>
              </div>
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <Button
              type="submit"
              disabled={submitting}
              className="w-full justify-center disabled:opacity-60"
            >
              {submitting ? "Placing order…" : "Place order"}
            </Button>
          </form>

          <div className="flex-1 basis-[280px] max-w-[340px]">
            <div className="border border-line rounded-2xl p-6">
              <h3 className="font-semibold mb-4">Order summary</h3>
              {items.map((item) => (
                <div key={item.productId} className="flex justify-between text-sm mb-2.5">
                  <span className="text-ink">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="text-muted">{formatPKR(item.price * item.quantity)}</span>
                </div>
              ))}
              <div className="flex justify-between text-sm font-semibold pt-3 mt-3 border-t border-line">
                <span>Subtotal</span>
                <span className="text-navy">{formatPKR(subtotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
