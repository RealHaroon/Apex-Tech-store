import Link from "next/link";
import { notFound } from "next/navigation";
import { OrderStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { AdminPageHeader, Badge } from "@/components/admin/ui";
import { StatusUpdater } from "@/components/admin/StatusUpdater";
import { updateOrderStatus } from "@/lib/actions/admin/orders";
import { ORDER_STATUS_COLORS, ORDER_STATUS_LABELS, PAYMENT_METHOD_LABELS } from "@/lib/admin-labels";
import { formatPKR } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function AdminOrderDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const order = await prisma.order.findUnique({
    where: { id: params.id },
    include: { items: true },
  });

  if (!order) notFound();

  return (
    <>
      <Link href="/admin/orders" className="text-sm text-slate-500 hover:text-slate-900">
        ← All orders
      </Link>
      <AdminPageHeader
        title={order.orderNumber}
        description={`Placed ${order.createdAt.toLocaleString()}`}
        action={<Badge color={ORDER_STATUS_COLORS[order.status]}>{ORDER_STATUS_LABELS[order.status]}</Badge>}
      />

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <div className="bg-white border border-slate-200 rounded-lg p-5">
            <h2 className="text-sm font-semibold text-slate-900 mb-4">Items</h2>
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm py-2 border-b border-slate-100 last:border-none">
                <span>{item.name} × {item.quantity}</span>
                <span className="text-slate-500">{formatPKR(item.price * item.quantity)}</span>
              </div>
            ))}
            <div className="flex justify-between text-sm font-semibold pt-3 mt-1">
              <span>Subtotal</span>
              <span>{formatPKR(order.subtotal)}</span>
            </div>
          </div>

          {order.notes && (
            <div className="bg-white border border-slate-200 rounded-lg p-5">
              <h2 className="text-sm font-semibold text-slate-900 mb-2">Order notes</h2>
              <p className="text-sm text-slate-600">{order.notes}</p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-lg p-5">
            <h2 className="text-sm font-semibold text-slate-900 mb-3">Update status</h2>
            <StatusUpdater
              id={order.id}
              status={order.status}
              options={Object.values(OrderStatus).map((s) => ({
                value: s,
                label: ORDER_STATUS_LABELS[s],
              }))}
              updateAction={updateOrderStatus}
            />
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-2.5 text-sm">
            <h2 className="text-sm font-semibold text-slate-900 mb-1">Customer</h2>
            <div className="text-slate-700">{order.customerName}</div>
            <div className="text-slate-500">{order.phone}</div>
            {order.email && <div className="text-slate-500">{order.email}</div>}
            <div className="text-slate-500 pt-2 border-t border-slate-100 mt-2">
              {order.address}, {order.city}
            </div>
            <div className="pt-2 border-t border-slate-100 mt-2">
              <span className="text-slate-400">Payment: </span>
              {PAYMENT_METHOD_LABELS[order.paymentMethod]}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
