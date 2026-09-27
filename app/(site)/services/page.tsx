import { PageHero, SectionHead } from "@/components/SectionHead";
import { Button } from "@/components/Button";
import { WHATSAPP_LINK } from "@/lib/constants";

const SERVICES = [
  {
    id: "software",
    title: "Genuine software licensing",
    description:
      "Verified, licensed software — video and photo editors, productivity tools, Windows, and Office — sold at legitimate student and regional pricing. No pirated keys, no risk to your data.",
    included: [
      "Microsoft Windows & Office (genuine keys)",
      "Video & photo editing software",
      "Productivity & utility tools",
      "Official activation, not a workaround",
    ],
    price: "From PKR 1,500",
    priceNote: "per license, varies by product",
    requestService: "SOFTWARE_LICENSING",
  },
  {
    id: "setup",
    title: "Setup & activation",
    description:
      "Buying the license is only half the job. Our technicians install and activate it properly — remotely or in person — and stay reachable if anything needs adjusting afterward.",
    included: [
      "Remote or in-person installation",
      "Full activation & account setup",
      "30 days of free follow-up support",
      "Basic walkthrough of the software",
    ],
    price: "From PKR 500",
    priceNote: "per session",
    requestService: "SETUP_ACTIVATION",
  },
  {
    id: "mentorship",
    title: "Skill mentorship",
    description:
      "Guided learning paths in editing, Office, and design, with real feedback on your work — not just a pile of course links to figure out alone.",
    included: [
      "Curated learning path for your goal",
      "Weekly check-ins & project reviews",
      "Video editing, Office, or design tracks",
      "Certificate-ready guidance, not resold accounts",
    ],
    price: "From PKR 2,000",
    priceNote: "per month",
    requestService: "MENTORSHIP",
  },
  {
    id: "repair",
    title: "PC repair & support",
    description:
      "Hardware and software troubleshooting for laptops and desktops — diagnostics, upgrades, and fixes, whether you walk in, drop off, or need us at your door.",
    included: [
      "Free initial diagnostics",
      "Hardware upgrades & part swaps",
      "Software troubleshooting & cleanup",
      "Doorstep visits around Hyderabad",
    ],
    price: "From PKR 800",
    priceNote: "per visit, parts extra",
    requestService: "PC_REPAIR",
  },
];

const STEPS = [
  {
    num: 1,
    title: "Tell us what you need",
    description: "Fill in the service request form with what software, service, or repair you need.",
  },
  {
    num: 2,
    title: "We confirm details & price",
    description: "We check what fits your case and quote a clear, upfront price.",
  },
  {
    num: 3,
    title: "Delivered & set up",
    description: "We install, activate, or repair, then follow up to confirm it's working.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="What we do"
        title="Four services, one team."
        description="Genuine software, proper setup, real skills, and dependable repairs — so you're not juggling different vendors for your tech needs."
      />

      <section className="py-16">
        <div className="max-w-wrap mx-auto px-7">
          {SERVICES.map((service, i) => (
            <div
              key={service.id}
              id={service.id}
              className={`flex flex-wrap py-11 scroll-mt-24 ${
                i < SERVICES.length - 1 ? "border-b border-line" : ""
              }`}
            >
              <div className="flex-1 basis-[320px] mr-10 max-md:mr-0">
                <h3 className="text-[1.35rem] font-semibold mb-3">{service.title}</h3>
                <p className="text-muted">{service.description}</p>
                <Button href={`/services/request?service=${service.requestService}`} size="small" className="mt-5">
                  Book this service
                </Button>
              </div>
              <div className="flex-1 basis-[320px]">
                <ul className="list-none m-0 p-0">
                  {service.included.map((line) => (
                    <li
                      key={line}
                      className="pl-6 py-2 relative text-[0.94rem] border-b border-dashed border-line last:border-none"
                    >
                      <span className="absolute left-0 text-gold-deep font-bold">✓</span>
                      {line}
                    </li>
                  ))}
                </ul>
                <div className="inline-block mt-4 font-serif font-bold text-navy text-[1.15rem]">
                  {service.price}{" "}
                  <span className="font-sans font-normal text-[0.8rem] text-muted">
                    {service.priceNote}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-ice border-t border-line py-16">
        <div className="max-w-wrap mx-auto px-7">
          <SectionHead
            title="How ordering works"
            description="No storefront to navigate for services — just a short form."
          />
          <div className="flex flex-wrap gap-10">
            {STEPS.map((step) => (
              <div key={step.num} className="flex-1 basis-[220px]">
                <div className="font-serif font-bold text-2xl text-gold-deep mb-3">{step.num}</div>
                <h3 className="text-[1.02rem] font-semibold mb-2">{step.title}</h3>
                <p className="text-muted text-[0.93rem] m-0">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-deep text-white text-center py-16">
        <div className="max-w-wrap mx-auto px-7">
          <h2 className="text-white text-[clamp(1.5rem,3vw,2rem)]">Not sure which service fits?</h2>
          <p className="text-[#B9C2E8] mt-3">
            Send a request and describe what you&apos;re trying to do — we&apos;ll point you the right way.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-7">
            <Button href="/services/request">Request a service</Button>
            <Button
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              className="!text-white !border-white hover:!bg-white/10"
            >
              Message on WhatsApp
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
