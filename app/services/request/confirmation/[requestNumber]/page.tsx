import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/Button";
import { SERVICE_TYPE_LABELS, WHATSAPP_LINK, type ServiceTypeKey } from "@/lib/constants";

export const dynamic = "force-dynamic";

export default async function ServiceRequestConfirmationPage({
  params,
}: {
  params: { requestNumber: string };
}) {
  const request = await prisma.serviceRequest.findUnique({
    where: { requestNumber: params.requestNumber },
  });

  if (!request) notFound();

  return (
    <section className="py-16">
      <div className="max-w-[640px] mx-auto px-7 text-center">
        <span className="inline-block text-[0.85rem] text-navy-mid bg-navy/[0.07] px-3.5 py-1.5 rounded-full font-semibold mb-5">
          Request received
        </span>
        <h1 className="text-[2rem] font-semibold">Thanks, {request.fullName.split(" ")[0]}!</h1>
        <p className="text-muted mt-3">
          Your request <strong className="text-navy">{request.requestNumber}</strong> for{" "}
          <strong className="text-navy">
            {SERVICE_TYPE_LABELS[request.service as ServiceTypeKey]}
          </strong>{" "}
          has been received. We&apos;ll reach out on {request.phone} to confirm details and pricing.
        </p>

        <div className="border border-line rounded-2xl p-6 mt-8 text-left">
          <div className="flex justify-between text-sm mb-2.5">
            <span className="text-muted">Service</span>
            <span className="font-semibold">{SERVICE_TYPE_LABELS[request.service as ServiceTypeKey]}</span>
          </div>
          {request.preferredDate && (
            <div className="flex justify-between text-sm mb-2.5">
              <span className="text-muted">Preferred date</span>
              <span className="font-semibold">
                {new Date(request.preferredDate).toLocaleDateString()}
                {request.preferredTime ? ` · ${request.preferredTime}` : ""}
              </span>
            </div>
          )}
          <div className="text-sm mt-3 pt-3 border-t border-line">
            <span className="text-muted block mb-1">What you told us</span>
            <p className="m-0">{request.details}</p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Button href="/services">Back to services</Button>
          <Button href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" variant="secondary">
            Message us about this request
          </Button>
        </div>
      </div>
    </section>
  );
}
