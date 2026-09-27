"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { loginUser } from "@/lib/actions/user-auth";
import { PageHero } from "@/components/SectionHead";
import { Button } from "@/components/Button";

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const result = await loginUser({ email, password });
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
      <PageHero eyebrow="Account" title="Log in" description="Access your order history and service requests." />
      <section className="py-14">
        <div className="max-w-[440px] mx-auto px-7">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-navy mb-1.5">Email</label>
              <input
                required
                type="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-line rounded-md px-3.5 py-2.5 text-sm focus:outline-none focus:border-navy"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy mb-1.5">Password</label>
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-line rounded-md px-3.5 py-2.5 text-sm focus:outline-none focus:border-navy"
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <Button type="submit" disabled={submitting} className="w-full justify-center disabled:opacity-60">
              {submitting ? "Logging in…" : "Log in"}
            </Button>
          </form>

          <p className="text-sm text-muted mt-6 text-center">
            Don&apos;t have an account?{" "}
            <Link href="/account/register" className="text-navy-mid font-semibold no-underline">
              Create one
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
