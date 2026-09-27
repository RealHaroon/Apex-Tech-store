import Link from "next/link";
import { OrderStatus, RequestStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { AdminPageHeader, Badge } from "@/components/admin/ui";
import {
  ORDER_STATUS_COLORS,
  ORDER_STATUS_LABELS,
  REQUEST_STATUS_COLORS,
  REQUEST_STATUS_LABELS,
} from "@/lib/admin-labels";
import { SERVICE_TYPE_LABELS, type ServiceTypeKey } from "@/lib/constants";
import { formatPKR } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [
    productCount,
    outOfStockCount,
    pendingOrderCount,
    newRequestCount,
    recentOrders,
    recentRequests,
  ] = await Promise.all([
    prisma.product.count(),
    prisma.product.count({ where: { inStock: false } }),
    prisma.order.count({ where: { status: OrderStatus.PENDING } }),
    prisma.serviceRequest.count({ where: { status: RequestStatus.NEW } }),
    prisma.order.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    prisma.serviceRequest.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
  ]);

  const stats = [
    { label: "Products", value: productCount, href: "/admin/products" },
    { label: "Out of stock", value: outOfStockCount, href: "/admin/products" },
    { label: "Pending orders", value: pendingOrderCount, href: "/admin/orders?status=PENDING" },
    { label: "New service requests", value: newRequestCount, href: "/admin/service-requests?status=NEW" },
  ];

  return (
    <>
      <AdminPageHeader title="Dashboard" description="Overview of the store." />

      <div className="grid grid-cols-4 gap-4 mb-10">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white border border-slate-200 rounded-lg p-5 no-underline hover:border-slate-400 transition-colors"
          >
            <div className="text-2xl font-semibold text-slate-900">{stat.value}</div>
            <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100">
            <h2 className="text-sm font-semibold text-slate-900">Recent orders</h2>
            <Link href="/admin/orders" className="text-xs font-medium text-slate-500 hover:text-slate-900">
              View all →
            </Link>
          </div>
          {recentOrders.length === 0 ? (
            <p className="text-sm text-slate-400 px-5 py-6">No orders yet.</p>
          ) : (
            <ul>
              {recentOrders.map((order) => (
                <li key={order.id} className="border-t border-slate-100 first:border-none">
                  <Link
                    href={`/admin/orders/${order.id}`}
                    className="flex items-center justify-between px-5 py-3 no-underline hover:bg-slate-50"
                  >
                    <div>
                      <div className="text-sm font-medium text-slate-900">{order.orderNumber}</div>
                      <div className="text-xs text-slate-400">{order.customerName}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-slate-600">{formatPKR(order.subtotal)}</span>
                      <Badge color={ORDER_STATUS_COLORS[order.status]}>
                        {ORDER_STATUS_LABELS[order.status]}
                      </Badge>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100">
            <h2 className="text-sm font-semibold text-slate-900">Recent service requests</h2>
            <Link href="/admin/service-requests" className="text-xs font-medium text-slate-500 hover:text-slate-900">
              View all →
            </Link>
          </div>
          {recentRequests.length === 0 ? (
            <p className="text-sm text-slate-400 px-5 py-6">No service requests yet.</p>
          ) : (
            <ul>
              {recentRequests.map((req) => (
                <li key={req.id} className="border-t border-slate-100 first:border-none">
                  <Link
                    href={`/admin/service-requests/${req.id}`}
                    className="flex items-center justify-between px-5 py-3 no-underline hover:bg-slate-50"
                  >
                    <div>
                      <div className="text-sm font-medium text-slate-900">{req.requestNumber}</div>
                      <div className="text-xs text-slate-400">
                        {SERVICE_TYPE_LABELS[req.service as ServiceTypeKey]}
                      </div>
                    </div>
                    <Badge color={REQUEST_STATUS_COLORS[req.status]}>
                      {REQUEST_STATUS_LABELS[req.status]}
                    </Badge>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
