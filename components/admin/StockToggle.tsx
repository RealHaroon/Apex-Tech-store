"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toggleProductStock } from "@/lib/actions/admin/products";

export function StockToggle({ id, inStock }: { id: string; inStock: boolean }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [value, setValue] = useState(inStock);

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        const next = !value;
        setValue(next);
        startTransition(async () => {
          await toggleProductStock(id, next);
          router.refresh();
        });
      }}
      className={
        value
          ? "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800"
          : "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-500"
      }
    >
      {value ? "In stock" : "Out of stock"}
    </button>
  );
}
