import Link from "next/link";
import { clsx } from "clsx";
import { RequestStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { AdminPageHeader, Badge, EmptyState } from "@/components/admin/ui";
import { REQUEST_STATUS_COLORS, REQUEST_STATUS_LABELS } from "@/lib/admin-labels";
import { SERVICE_TYPE_LABELS, type ServiceTypeKey } from "@/lib/constants";

export const dynamic = "force-dynamic";

const STATUS_FILTERS = ["all", ...Object.values(RequestStatus)] as const;

export default async function AdminServiceRequestsPage({
  searchParams,
}: {
  searchParams: { status?: string };
}) {
  const statusFilter = searchParams.status;
  const isValidStatus = (Object.values(RequestStatus) as string[]).includes(statusFilter ?? "");

  const requests = await prisma.serviceRequest.findMany({
    where: isValidStatus ? { status: statusFilter as RequestStatus } : undefined,
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <AdminPageHeader
        title="Service requests"
        description={`${requests.length} request${requests.length === 1 ? "" : "s"}`}
      />

      <div className="flex flex-wrap gap-2 mb-6">
        {STATUS_FILTERS.map((s) => {
          const active = s === "all" ? !isValidStatus : statusFilter === s;
          const href = s === "all" ? "/admin/service-requests" : `/admin/service-requests?status=${s}`;
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
              {s === "all" ? "All" : REQUEST_STATUS_LABELS[s]}
            </Link>
          );
        })}
      </div>

      {requests.length === 0 ? (
        <EmptyState>No service requests here yet.</EmptyState>
      ) : (
        <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wide">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Request</th>
                <th className="text-left px-4 py-3 font-medium">Service</th>
                <th className="text-left px-4 py-3 font-medium">Customer</th>
                <th className="text-left px-4 py-3 font-medium">Status</th>
                <th className="text-left px-4 py-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req.id} className="border-t border-slate-100">
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/service-requests/${req.id}`}
                      className="font-medium text-slate-900 hover:underline"
                    >
                      {req.requestNumber}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-slate-700">
                    {SERVICE_TYPE_LABELS[req.service as ServiceTypeKey]}
                  </td>
                  <td className="px-4 py-3 text-slate-700">
                    {req.fullName}
                    <div className="text-xs text-slate-400">{req.phone}</div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge color={REQUEST_STATUS_COLORS[req.status]}>
                      {REQUEST_STATUS_LABELS[req.status]}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-slate-400">
                    {req.createdAt.toLocaleDateString()}
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
