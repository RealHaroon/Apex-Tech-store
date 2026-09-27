"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { registerUser } from "@/lib/actions/user-auth";
import { PageHero } from "@/components/SectionHead";
import { Button } from "@/components/Button";

export default function RegisterPage() {
  return (
    <Suspense fallback={null}>
      <RegisterForm />
    </Suspense>
  );
}

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const result = await registerUser({ name, email, phone, password });
    setSubmitting(false);
    if (!result.success) {
      setError(result.error);
      return;
    }
    const from = searchParams.get("from");
    router.push(from && from.startsWith("/account") ? from : "/account");
    router.refresh();
  }

  return (
    <>
      <PageHero eyebrow="Account" title="Create an account" description="Save your details for faster checkout and track your orders and service requests." />
      <section className="py-14">
        <div className="max-w-[440px] mx-auto px-7">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-navy mb-1.5">Full name</label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-line rounded-md px-3.5 py-2.5 text-sm focus:outline-none focus:border-navy"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy mb-1.5">Email</label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-line rounded-md px-3.5 py-2.5 text-sm focus:outline-none focus:border-navy"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy mb-1.5">Phone (optional)</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border border-line rounded-md px-3.5 py-2.5 text-sm focus:outline-none focus:border-navy"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy mb-1.5">Password</label>
              <input
                required
                type="password"
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-line rounded-md px-3.5 py-2.5 text-sm focus:outline-none focus:border-navy"
              />
              <p className="text-xs text-muted mt-1.5">At least 8 characters.</p>
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <Button type="submit" disabled={submitting} className="w-full justify-center disabled:opacity-60">
              {submitting ? "Creating account…" : "Create account"}
            </Button>
          </form>

          <p className="text-sm text-muted mt-6 text-center">
            Already have an account?{" "}
            <Link href="/account/login" className="text-navy-mid font-semibold no-underline">
              Log in
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
