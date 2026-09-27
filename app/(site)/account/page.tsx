import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/actions/user-auth";
import { PageHero } from "@/components/SectionHead";
import { LogoutButton } from "@/components/LogoutButton";
import { ORDER_STATUS_LABELS, REQUEST_STATUS_LABELS } from "@/lib/admin-labels";
import { SERVICE_TYPE_LABELS, type ServiceTypeKey } from "@/lib/constants";
import { formatPKR } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/account/login");

  const [orders, requests] = await Promise.all([
    prisma.order.findMany({
      where: { userId: user.id },
      include: { items: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.serviceRequest.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <>
      <PageHero eyebrow="Account" title={`Hi, ${user.name.split(" ")[0]}`} description={user.email} />

      <section className="py-14">
        <div className="max-w-wrap mx-auto px-7">
          <div className="flex items-center justify-between mb-10 border border-line rounded-2xl p-6">
            <div>
              <div className="font-semibold text-navy">{user.name}</div>
              <div className="text-muted text-sm">{user.email}</div>
              {user.phone && <div className="text-muted text-sm">{user.phone}</div>}
            </div>
            <LogoutButton />
          </div>

          <div className="mb-12">
            <h2 className="text-[1.2rem] font-semibold mb-5">Your orders</h2>
            {orders.length === 0 ? (
              <p className="text-muted text-sm">
                No orders yet. <Link href="/shop" className="text-navy-mid font-semibold">Browse the shop →</Link>
              </p>
            ) : (
              <div className="space-y-3">
                {orders.map((order) => (
                  <Link
                    key={order.id}
                    href={`/checkout/confirmation/${order.orderNumber}`}
                    className="flex items-center justify-between border border-line rounded-xl px-5 py-4 no-underline hover:border-navy"
                  >
                    <div>
                      <div className="font-semibold text-navy text-sm">{order.orderNumber}</div>
                      <div className="text-xs text-muted mt-0.5">
                        {order.items.length} item(s) · {order.createdAt.toLocaleDateString()}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-navy">{formatPKR(order.subtotal)}</div>
                      <div className="text-xs text-muted mt-0.5">{ORDER_STATUS_LABELS[order.status]}</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div>
            <h2 className="text-[1.2rem] font-semibold mb-5">Your service requests</h2>
            {requests.length === 0 ? (
              <p className="text-muted text-sm">
                No requests yet.{" "}
                <Link href="/services/request" className="text-navy-mid font-semibold">
                  Request a service →
                </Link>
              </p>
            ) : (
              <div className="space-y-3">
                {requests.map((req) => (
                  <Link
                    key={req.id}
                    href={`/services/request/confirmation/${req.requestNumber}`}
                    className="flex items-center justify-between border border-line rounded-xl px-5 py-4 no-underline hover:border-navy"
                  >
                    <div>
                      <div className="font-semibold text-navy text-sm">{req.requestNumber}</div>
                      <div className="text-xs text-muted mt-0.5">
                        {SERVICE_TYPE_LABELS[req.service as ServiceTypeKey]} · {req.createdAt.toLocaleDateString()}
                      </div>
                    </div>
                    <div className="text-xs text-muted">{REQUEST_STATUS_LABELS[req.status]}</div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
