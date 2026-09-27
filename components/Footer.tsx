import Link from "next/link";
import {
  BRAND_NAME,
  INSTAGRAM_LINK,
  LOCATION,
  WHATSAPP_LINK,
} from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-ice border-t border-line pt-11 pb-6">
      <div className="max-w-wrap mx-auto px-7">
        <div className="flex flex-wrap justify-between pb-7 border-b border-line">
          <div className="mr-8 mb-6 min-w-[160px]">
            <h4 className="font-serif text-navy text-[0.95rem] mb-3.5">{BRAND_NAME}</h4>
            <Link href="/about" className="block no-underline text-muted text-[0.88rem] mb-2.5 hover:text-navy">
              About us
            </Link>
            <Link href="/contact" className="block no-underline text-muted text-[0.88rem] mb-2.5 hover:text-navy">
              Contact
            </Link>
          </div>
          <div className="mr-8 mb-6 min-w-[160px]">
            <h4 className="font-serif text-navy text-[0.95rem] mb-3.5">Explore</h4>
            <Link href="/services" className="block no-underline text-muted text-[0.88rem] mb-2.5 hover:text-navy">
              Services
            </Link>
            <Link href="/shop" className="block no-underline text-muted text-[0.88rem] mb-2.5 hover:text-navy">
              Shop
            </Link>
            <Link href="/services/request" className="block no-underline text-muted text-[0.88rem] mb-2.5 hover:text-navy">
              Book a service
            </Link>
          </div>
          <div className="mr-8 mb-6 min-w-[160px]">
            <h4 className="font-serif text-navy text-[0.95rem] mb-3.5">Reach us</h4>
            <a href={WHATSAPP_LINK} className="block no-underline text-muted text-[0.88rem] mb-2.5 hover:text-navy">
              WhatsApp
            </a>
            <a href={INSTAGRAM_LINK} className="block no-underline text-muted text-[0.88rem] mb-2.5 hover:text-navy">
              Instagram
            </a>
          </div>
        </div>
        <div className="text-center pt-5 text-[0.82rem] text-muted">
          {BRAND_NAME} — genuine software, real support. {LOCATION}.
        </div>
      </div>
    </footer>
  );
}
