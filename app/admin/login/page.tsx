"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { loginAdmin } from "@/lib/actions/admin-auth";
import { BRAND_NAME } from "@/lib/constants";

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const result = await loginAdmin(password);
    setSubmitting(false);
    if (!result.success) {
      setError(result.error);
      return;
    }
    const from = searchParams.get("from");
    router.push(from && from.startsWith("/admin") ? from : "/admin");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <h1 className="text-white font-semibold text-xl mb-1">{BRAND_NAME} admin</h1>
        <p className="text-slate-400 text-sm mb-8">Sign in to manage products, orders, and requests.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
            <input
              type="password"
              required
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-md px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-slate-400"
            />
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-white text-slate-900 font-semibold rounded-md py-2.5 text-sm disabled:opacity-60"
          >
            {submitting ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
