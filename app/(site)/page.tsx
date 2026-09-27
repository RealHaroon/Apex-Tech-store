import Link from "next/link";
import { Button } from "@/components/Button";
import { SectionHead } from "@/components/SectionHead";
import { WHATSAPP_LINK } from "@/lib/constants";

const QUICK_LINKS = [
  {
    href: "/services#software",
    title: "Genuine software",
    description: "Licensed apps, Windows & Office at student-friendly pricing.",
    cta: "See licensing options",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="13" rx="2" stroke="#1E2761" strokeWidth="1.6" />
        <path d="M8 21h8M12 17v4" stroke="#1E2761" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: "/services#setup",
    title: "Setup & activation",
    description: "We install and activate it properly, with 30 days of support.",
    cta: "How setup works",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M9 12l2 2 4-4" stroke="#1E2761" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="9" stroke="#1E2761" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    href: "/services#repair",
    title: "PC repair & support",
    description: "Hardware and software troubleshooting, walk-in or doorstep.",
    cta: "Book a repair",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="12" rx="1.5" stroke="#1E2761" strokeWidth="1.6" />
        <path d="M8 20h8M12 16v4" stroke="#1E2761" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: "/shop#accessories",
    title: "Tech accessories",
    description: "Chargers, cables, earphones, and everyday tech essentials.",
    cta: "Browse accessories",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="7" y="2" width="10" height="20" rx="2" stroke="#1E2761" strokeWidth="1.6" />
        <path d="M11 18h2" stroke="#1E2761" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function HomePage() {
  return (
    <>
      <section className="pt-[72px] pb-[88px] bg-[radial-gradient(ellipse_620px_420px_at_100%_-10%,rgba(232,184,75,0.14),transparent_60%),linear-gradient(180deg,#F3F5FC_0%,#FFFFFF_100%)]">
        <div className="max-w-wrap mx-auto px-7 flex items-center flex-wrap">
          <div className="flex-1 basis-[480px] mr-14 max-md:mr-0 max-md:mb-10">
            <span className="inline-block text-[0.85rem] text-navy-mid bg-navy/[0.07] px-3.5 py-1.5 rounded-full font-semibold">
              Based in Hyderabad, Sindh
            </span>
            <h1 className="mt-5 text-[clamp(2.1rem,4.4vw,3.3rem)] font-semibold max-w-[14ch]">
              Genuine software, real skills, trusted setup.
            </h1>
            <p className="mt-5 text-[1.08rem] text-muted max-w-[46ch]">
              Apex Tech Store helps students and small businesses buy licensed
              software, get it installed properly, learn the skills to use
              it, and pick up the accessories to go with it — all from one
              team you can actually reach.
            </p>
            <div className="flex flex-wrap mt-[30px] gap-4">
              <Button href="/shop">Shop the catalog</Button>
              <Button href="/services" variant="secondary">
                See what we offer
              </Button>
            </div>
            <div className="flex flex-wrap mt-[38px] pt-[30px] border-t border-line gap-x-6">
              <div className="flex-1 basis-[200px] mb-3.5 text-[0.9rem] text-muted">
                <strong className="block text-navy font-serif text-2xl mb-0.5">100%</strong>
                Genuine &amp; licensed, always
              </div>
              <div className="flex-1 basis-[200px] mb-3.5 text-[0.9rem] text-muted">
                <strong className="block text-navy font-serif text-2xl mb-0.5">30 days</strong>
                Free support after setup
              </div>
              <div className="flex-1 basis-[200px] mb-3.5 text-[0.9rem] text-muted">
                <strong className="block text-navy font-serif text-2xl mb-0.5">4-in-1</strong>
                Software, repair, learning &amp; accessories
              </div>
            </div>
          </div>

          <div className="flex-1 basis-[380px]">
            <div className="bg-navy-deep rounded-[18px] p-[26px] shadow-chat">
              <div className="flex items-center mb-[18px] text-white text-[0.9rem] font-semibold">
                <span className="w-[9px] h-[9px] rounded-full bg-[#3CCB6F] mr-2.5" />
                Apex Tech Store · usually replies in minutes
              </div>
              <div className="max-w-[82%] p-3 px-[15px] rounded-[14px] rounded-bl-[4px] text-[0.92rem] mb-3 leading-snug bg-[#2A3577] text-[#DCE2F7]">
                Hi! I need genuine MS Office plus someone to set it up on my laptop.
              </div>
              <div className="max-w-[82%] p-3 px-[15px] rounded-[14px] rounded-br-[4px] text-[0.92rem] mb-3 leading-snug bg-gold text-navy-deep font-medium ml-auto">
                On it. Student license + install + activation — ready by tonight ✅
              </div>
              <div className="max-w-[82%] p-3 px-[15px] rounded-[14px] rounded-bl-[4px] text-[0.92rem] mb-3 leading-snug bg-[#2A3577] text-[#DCE2F7]">
                Perfect, how much and where do I pay?
              </div>
              <div className="flex items-center mt-5 border-t border-white/10 pt-4">
                <div className="w-[34px] h-[34px] mr-2.5 rounded-full bg-gold flex-shrink-0 flex items-center justify-center font-bold text-navy-deep font-serif">
                  A
                </div>
                <span className="text-[#AEB6DE] text-[0.82rem]">
                  Typing usually starts within 5 minutes
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-[88px]">
        <div className="max-w-wrap mx-auto px-7">
          <SectionHead
            title="Everything in one place"
            description="Four ways we help, so you're not juggling different vendors for software, setup, learning, repairs, or accessories."
          />
          <div className="flex flex-wrap gap-7">
            {QUICK_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex-1 basis-[240px] p-7 border border-line rounded-xl no-underline block hover:border-navy hover:-translate-y-0.5 transition"
              >
                <div className="w-12 h-12 rounded-[10px] bg-ice flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-[1.08rem] font-semibold mb-2">{item.title}</h3>
                <p className="text-muted text-[0.92rem] m-0">{item.description}</p>
                <span className="inline-block mt-3.5 text-[0.85rem] font-semibold text-navy-mid">
                  {item.cta} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-deep text-white text-center py-16">
        <div className="max-w-wrap mx-auto px-7">
          <h2 className="text-white text-[clamp(1.5rem,3vw,2rem)]">
            Got something you need sorted today?
          </h2>
          <p className="text-[#B9C2E8] mt-3">
            Browse the shop for instant checkout, or message us on WhatsApp —
            most conversations start within a few minutes.
          </p>
          <div className="flex flex-wrap justify-center mt-7 gap-4">
            <Button href="/shop">Shop now</Button>
            <Button href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" variant="secondary" className="!text-white !border-white hover:!bg-white/10">
              Message on WhatsApp
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
