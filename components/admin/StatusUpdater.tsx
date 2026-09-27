"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ActionResult } from "@/lib/actions/admin/categories";

export function StatusUpdater({
  id,
  status,
  options,
  updateAction,
}: {
  id: string;
  status: string;
  options: { value: string; label: string }[];
  updateAction: (id: string, status: never) => Promise<ActionResult>;
}) {
  const router = useRouter();
  const [value, setValue] = useState(status);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="flex items-center gap-2">
      <select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="border border-slate-300 rounded-md px-2.5 py-1.5 text-sm bg-white focus:outline-none focus:border-slate-500"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <button
        type="button"
        disabled={saving || value === status}
        onClick={async () => {
          setSaving(true);
          setError(null);
          const result = await updateAction(id, value as never);
          setSaving(false);
          if (!result.success) {
            setError(result.error);
            return;
          }
          router.refresh();
        }}
        className="bg-slate-900 text-white text-sm font-semibold px-3 py-1.5 rounded-md disabled:opacity-40"
      >
        {saving ? "Saving…" : "Update"}
      </button>
      {error && <span className="text-red-600 text-xs">{error}</span>}
    </div>
  );
}
