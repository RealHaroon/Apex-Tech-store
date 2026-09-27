"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { clsx } from "clsx";
import { BRAND_NAME, WHATSAPP_LINK } from "@/lib/constants";
import { useCartStore, cartCount } from "@/lib/cart-store";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header({ userName }: { userName?: string | null }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const items = useCartStore((s) => s.items);

  useEffect(() => setMounted(true), []);
  const count = mounted ? cartCount(items) : 0;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-line">
      <nav className="max-w-wrap mx-auto px-7 flex items-center justify-between py-[18px]">
        <Link href="/" className="font-serif font-bold text-[1.2rem] text-navy no-underline">
          {BRAND_NAME}
        </Link>

        <button
          className="md:hidden p-1.5"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="block w-6 h-0.5 bg-navy my-[5px]" />
          <span className="block w-6 h-0.5 bg-navy my-[5px]" />
          <span className="block w-6 h-0.5 bg-navy my-[5px]" />
        </button>

        <ul
          className={clsx(
            "md:flex md:items-center md:static md:bg-transparent md:border-0 md:p-0 md:flex-row",
            "absolute md:relative top-full left-0 right-0 bg-white border-b border-line flex-col items-start px-7 pb-[18px] pt-2",
            open ? "flex" : "hidden",
          )}
        >
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href} className="w-full md:w-auto md:ml-[30px]">
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={clsx(
                    "block w-full md:w-auto py-3 md:py-1 border-b md:border-b-2 border-line md:border-transparent text-[0.94rem] font-medium no-underline hover:md:border-gold",
                    active ? "text-navy font-semibold md:border-navy" : "text-ink",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
          <li className="w-full md:w-auto md:ml-[30px] mt-2 md:mt-0">
            <Link
              href="/cart"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 py-3 md:py-1 text-[0.94rem] font-medium no-underline text-ink"
            >
              Cart
              {count > 0 && (
                <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1 rounded-full bg-gold text-navy-deep text-xs font-bold">
                  {count}
                </span>
              )}
            </Link>
          </li>
          <li className="w-full md:w-auto md:ml-[30px] mt-2 md:mt-0">
            <Link
              href={userName ? "/account" : "/account/login"}
              onClick={() => setOpen(false)}
              className="block py-3 md:py-1 text-[0.94rem] font-medium no-underline text-ink"
            >
              {userName ? userName.split(" ")[0] : "Login"}
            </Link>
          </li>
          <li className="w-full md:w-auto md:ml-[30px] mt-2 md:mt-0">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="block text-center bg-navy hover:bg-navy-mid text-white no-underline px-5 py-[10px] rounded-md font-semibold text-[0.9rem] whitespace-nowrap"
            >
              Message us
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
