import Link from "next/link";
import { notFound } from "next/navigation";
import { RequestStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { AdminPageHeader, Badge } from "@/components/admin/ui";
import { StatusUpdater } from "@/components/admin/StatusUpdater";
import { updateServiceRequestStatus } from "@/lib/actions/admin/service-requests";
import { REQUEST_STATUS_COLORS, REQUEST_STATUS_LABELS } from "@/lib/admin-labels";
import { SERVICE_TYPE_LABELS, type ServiceTypeKey } from "@/lib/constants";

export const dynamic = "force-dynamic";

export default async function AdminServiceRequestDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const request = await prisma.serviceRequest.findUnique({ where: { id: params.id } });
  if (!request) notFound();

  return (
    <>
      <Link href="/admin/service-requests" className="text-sm text-slate-500 hover:text-slate-900">
        ← All service requests
      </Link>
      <AdminPageHeader
        title={request.requestNumber}
        description={`Submitted ${request.createdAt.toLocaleString()}`}
        action={
          <Badge color={REQUEST_STATUS_COLORS[request.status]}>
            {REQUEST_STATUS_LABELS[request.status]}
          </Badge>
        }
      />

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <div className="bg-white border border-slate-200 rounded-lg p-5">
            <h2 className="text-sm font-semibold text-slate-900 mb-2">
              {SERVICE_TYPE_LABELS[request.service as ServiceTypeKey]}
            </h2>
            <p className="text-sm text-slate-600 whitespace-pre-wrap">{request.details}</p>
          </div>

          {(request.preferredDate || request.preferredTime) && (
            <div className="bg-white border border-slate-200 rounded-lg p-5">
              <h2 className="text-sm font-semibold text-slate-900 mb-2">Preferred timing</h2>
              <p className="text-sm text-slate-600">
                {request.preferredDate ? new Date(request.preferredDate).toLocaleDateString() : ""}
                {request.preferredTime ? ` · ${request.preferredTime}` : ""}
              </p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-lg p-5">
            <h2 className="text-sm font-semibold text-slate-900 mb-3">Update status</h2>
            <StatusUpdater
              id={request.id}
              status={request.status}
              options={Object.values(RequestStatus).map((s) => ({
                value: s,
                label: REQUEST_STATUS_LABELS[s],
              }))}
              updateAction={updateServiceRequestStatus}
            />
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-2.5 text-sm">
            <h2 className="text-sm font-semibold text-slate-900 mb-1">Customer</h2>
            <div className="text-slate-700">{request.fullName}</div>
            <div className="text-slate-500">{request.phone}</div>
            {request.email && <div className="text-slate-500">{request.email}</div>}
            {request.address && (
              <div className="text-slate-500 pt-2 border-t border-slate-100 mt-2">{request.address}</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
