"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createServiceRequest } from "@/lib/actions/service-requests";
import { PageHero } from "@/components/SectionHead";
import { Button } from "@/components/Button";
import { SERVICE_TYPE_LABELS, type ServiceTypeKey } from "@/lib/constants";

function isServiceKey(value: string | null): value is ServiceTypeKey {
  return !!value && value in SERVICE_TYPE_LABELS;
}

export default function ServiceRequestPage() {
  return (
    <Suspense fallback={null}>
      <ServiceRequestForm />
    </Suspense>
  );
}

function ServiceRequestForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselected = searchParams.get("service");

  const [service, setService] = useState<ServiceTypeKey>(
    isServiceKey(preselected) ? preselected : "SOFTWARE_LICENSING",
  );
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [details, setDetails] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const result = await createServiceRequest({
      service,
      fullName,
      phone,
      email,
      address,
      preferredDate,
      preferredTime,
      details,
    });
    setSubmitting(false);
    if (!result.success) {
      setError(result.error);
      return;
    }
    router.push(`/services/request/confirmation/${result.requestNumber}`);
  }

  return (
    <>
      <PageHero
        eyebrow="Book a service"
        title="Request a service"
        description="For setup, repair, mentorship, or a custom software need — tell us what you're after and we'll confirm the details before anything is scheduled."
      />
      <section className="py-14">
        <div className="max-w-[640px] mx-auto px-7">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-navy mb-1.5">What do you need?</label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value as ServiceTypeKey)}
                className="w-full border border-line rounded-md px-3.5 py-2.5 text-sm focus:outline-none focus:border-navy bg-white"
              >
                {Object.entries(SERVICE_TYPE_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-navy mb-1.5">Full name</label>
                <input
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full border border-line rounded-md px-3.5 py-2.5 text-sm focus:outline-none focus:border-navy"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-semibold text-navy mb-1.5">Phone</label>
                <input
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border border-line rounded-md px-3.5 py-2.5 text-sm focus:outline-none focus:border-navy"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-navy mb-1.5">Email (optional)</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-line rounded-md px-3.5 py-2.5 text-sm focus:outline-none focus:border-navy"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-navy mb-1.5">
                Address (for doorstep repair or in-person setup)
              </label>
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full border border-line rounded-md px-3.5 py-2.5 text-sm focus:outline-none focus:border-navy"
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-navy mb-1.5">Preferred date (optional)</label>
                <input
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full border border-line rounded-md px-3.5 py-2.5 text-sm focus:outline-none focus:border-navy"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-semibold text-navy mb-1.5">Preferred time (optional)</label>
                <input
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  placeholder="e.g. after 4pm"
                  className="w-full border border-line rounded-md px-3.5 py-2.5 text-sm focus:outline-none focus:border-navy"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-navy mb-1.5">
                Tell us what you need
              </label>
              <textarea
                required
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                rows={4}
                placeholder="e.g. My laptop won't boot after a Windows update, need it looked at this week."
                className="w-full border border-line rounded-md px-3.5 py-2.5 text-sm focus:outline-none focus:border-navy"
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <Button type="submit" disabled={submitting} className="w-full justify-center disabled:opacity-60">
              {submitting ? "Sending request…" : "Send request"}
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}
