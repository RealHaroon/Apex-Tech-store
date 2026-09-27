"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { clsx } from "clsx";
import { logoutAdmin } from "@/lib/actions/admin-auth";
import { BRAND_NAME } from "@/lib/constants";

const NAV_LINKS = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/categories", label: "Categories" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/service-requests", label: "Service requests" },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <aside className="w-56 flex-shrink-0 bg-slate-900 text-slate-200 flex flex-col min-h-screen">
      <div className="px-5 py-5 border-b border-slate-800">
        <div className="font-semibold text-white text-sm">{BRAND_NAME}</div>
        <div className="text-xs text-slate-400">Admin panel</div>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV_LINKS.map((link) => {
          const active = link.exact
            ? pathname === link.href
            : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "block px-3 py-2 rounded-md text-sm font-medium no-underline",
                active
                  ? "bg-slate-800 text-white"
                  : "text-slate-400 hover:bg-slate-800/60 hover:text-white",
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
      <div className="px-3 py-4 border-t border-slate-800 space-y-1">
        <Link
          href="/"
          className="block px-3 py-2 rounded-md text-sm font-medium text-slate-400 hover:bg-slate-800/60 hover:text-white no-underline"
        >
          View store ↗
        </Link>
        <button
          type="button"
          onClick={async () => {
            await logoutAdmin();
            router.push("/admin/login");
            router.refresh();
          }}
          className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-slate-400 hover:bg-slate-800/60 hover:text-white"
        >
          Log out
        </button>
      </div>
    </aside>
  );
}
