import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatPKR } from "@/lib/format";
import { Button } from "@/components/Button";
import { WHATSAPP_LINK } from "@/lib/constants";

export const dynamic = "force-dynamic";

export default async function OrderConfirmationPage({
  params,
}: {
  params: { orderNumber: string };
}) {
  const order = await prisma.order.findUnique({
    where: { orderNumber: params.orderNumber },
    include: { items: true },
  });

  if (!order) notFound();

  return (
    <section className="py-16">
      <div className="max-w-[640px] mx-auto px-7 text-center">
        <span className="inline-block text-[0.85rem] text-navy-mid bg-navy/[0.07] px-3.5 py-1.5 rounded-full font-semibold mb-5">
          Order confirmed
        </span>
        <h1 className="text-[2rem] font-semibold">Thanks, {order.customerName.split(" ")[0]}!</h1>
        <p className="text-muted mt-3">
          Your order <strong className="text-navy">{order.orderNumber}</strong> has been received.
          We&apos;ll reach out on {order.phone} to confirm details.
        </p>

        <div className="border border-line rounded-2xl p-6 mt-8 text-left">
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm mb-2.5">
              <span>{item.name} × {item.quantity}</span>
              <span className="text-muted">{formatPKR(item.price * item.quantity)}</span>
            </div>
          ))}
          <div className="flex justify-between text-sm font-semibold pt-3 mt-3 border-t border-line">
            <span>Subtotal</span>
            <span className="text-navy">{formatPKR(order.subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm mt-4 pt-4 border-t border-line">
            <span className="text-muted">Payment method</span>
            <span className="font-semibold">
              {order.paymentMethod === "COD" ? "Cash on Delivery" : "Bank Transfer"}
            </span>
          </div>
          {order.paymentMethod === "BANK_TRANSFER" && (
            <p className="text-xs text-muted mt-3">
              We&apos;ll send our bank account details on WhatsApp so you can complete the transfer.
            </p>
          )}
          <div className="flex justify-between text-sm mt-4 pt-4 border-t border-line">
            <span className="text-muted">Delivering to</span>
            <span className="font-semibold text-right">{order.address}, {order.city}</span>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Button href="/shop">Continue shopping</Button>
          <Button href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" variant="secondary">
            Message us about this order
          </Button>
        </div>
      </div>
    </section>
  );
}
