import Link from "next/link";
import { clsx } from "clsx";
import { OrderStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { AdminPageHeader, Badge, EmptyState } from "@/components/admin/ui";
import { ORDER_STATUS_COLORS, ORDER_STATUS_LABELS, PAYMENT_METHOD_LABELS } from "@/lib/admin-labels";
import { formatPKR } from "@/lib/format";

export const dynamic = "force-dynamic";

const STATUS_FILTERS = ["all", ...Object.values(OrderStatus)] as const;

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: { status?: string };
}) {
  const statusFilter = searchParams.status;
  const isValidStatus = (Object.values(OrderStatus) as string[]).includes(statusFilter ?? "");

  const orders = await prisma.order.findMany({
    where: isValidStatus ? { status: statusFilter as OrderStatus } : undefined,
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <AdminPageHeader title="Orders" description={`${orders.length} order${orders.length === 1 ? "" : "s"}`} />

      <div className="flex flex-wrap gap-2 mb-6">
        {STATUS_FILTERS.map((s) => {
          const active = s === "all" ? !isValidStatus : statusFilter === s;
          const href = s === "all" ? "/admin/orders" : `/admin/orders?status=${s}`;
          return (
            <Link
              key={s}
              href={href}
              className={clsx(
                "px-3 py-1.5 rounded-full text-xs font-semibold no-underline border",
                active
                  ? "bg-slate-900 text-white border-slate-900"
                  : "border-slate-300 text-slate-500 hover:border-slate-500 hover:text-slate-900",
              )}
            >
              {s === "all" ? "All" : ORDER_STATUS_LABELS[s]}
            </Link>
          );
        })}
      </div>

      {orders.length === 0 ? (
        <EmptyState>No orders here yet.</EmptyState>
      ) : (
        <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wide">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Order</th>
                <th className="text-left px-4 py-3 font-medium">Customer</th>
                <th className="text-left px-4 py-3 font-medium">Payment</th>
                <th className="text-left px-4 py-3 font-medium">Total</th>
                <th className="text-left px-4 py-3 font-medium">Status</th>
                <th className="text-left px-4 py-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-t border-slate-100">
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="font-medium text-slate-900 hover:underline"
                    >
                      {order.orderNumber}
                    </Link>
                    <div className="text-xs text-slate-400">{order.items.length} item(s)</div>
                  </td>
                  <td className="px-4 py-3 text-slate-700">
                    {order.customerName}
                    <div className="text-xs text-slate-400">{order.city}</div>
                  </td>
                  <td className="px-4 py-3 text-slate-500">{PAYMENT_METHOD_LABELS[order.paymentMethod]}</td>
                  <td className="px-4 py-3 text-slate-700">{formatPKR(order.subtotal)}</td>
                  <td className="px-4 py-3">
                    <Badge color={ORDER_STATUS_COLORS[order.status]}>
                      {ORDER_STATUS_LABELS[order.status]}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-slate-400">
                    {order.createdAt.toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
