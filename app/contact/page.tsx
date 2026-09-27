import { PageHero, SectionHead } from "@/components/SectionHead";
import { Button } from "@/components/Button";
import {
  HOURS,
  INSTAGRAM_HANDLE,
  LOCATION,
  WHATSAPP_LINK,
  WHATSAPP_NUMBER,
} from "@/lib/constants";

const FAQS = [
  {
    q: "Is the software actually genuine?",
    a: "Yes — every license we sell is activated through official channels. We don't sell pirated keys or shared accounts.",
  },
  {
    q: "How fast is setup?",
    a: "Most installations and activations are completed same-day, often within a few hours of confirming your order.",
  },
  {
    q: "Do you offer refunds?",
    a: "If a license fails to activate or a repair doesn't fix the issue, we'll make it right — message us and we'll sort it out.",
  },
  {
    q: "How do I pay for a shop order?",
    a: "Checkout supports Cash on Delivery or Bank Transfer. For services, we confirm pricing before anything is scheduled.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's get you set up."
        description="Reach out on WhatsApp or Instagram — most messages get a reply within a few minutes during the day."
      />

      <section className="py-16">
        <div className="max-w-wrap mx-auto px-7 flex flex-wrap items-start gap-12">
          <div className="flex-1 basis-[440px]">
            <SectionHead title="Frequently asked" />
            {FAQS.map((faq) => (
              <div key={faq.q} className="py-5 border-b border-line last:border-none">
                <h3 className="text-[1.02rem] font-semibold mb-2">{faq.q}</h3>
                <p className="text-muted m-0 text-[0.94rem]">{faq.a}</p>
              </div>
            ))}
          </div>

          <div className="flex-1 basis-[320px] border border-line rounded-2xl p-7">
            <div className="flex justify-between py-3.5 border-b border-line text-[0.95rem]">
              <span className="text-muted">WhatsApp</span>
              <span className="font-semibold text-navy">0{WHATSAPP_NUMBER.slice(2, 5)}-{WHATSAPP_NUMBER.slice(5)}</span>
            </div>
            <div className="flex justify-between py-3.5 border-b border-line text-[0.95rem]">
              <span className="text-muted">Instagram</span>
              <span className="font-semibold text-navy">{INSTAGRAM_HANDLE}</span>
            </div>
            <div className="flex justify-between py-3.5 border-b border-line text-[0.95rem]">
              <span className="text-muted">Location</span>
              <span className="font-semibold text-navy">{LOCATION}</span>
            </div>
            <div className="flex justify-between py-3.5 text-[0.95rem]">
              <span className="text-muted">Hours</span>
              <span className="font-semibold text-navy">{HOURS}</span>
            </div>
            <Button href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="w-full justify-center mt-5">
              Message on WhatsApp
            </Button>
          </div>
        </div>

        <div className="max-w-wrap mx-auto px-7">
          <div className="border border-line rounded-2xl overflow-hidden mt-7">
            <iframe
              title="Hyderabad, Sindh map"
              loading="lazy"
              className="w-full h-[280px] border-0 block"
              src="https://www.openstreetmap.org/export/embed.html?bbox=68.31%2C25.30%2C68.42%2C25.42&layer=mapnik"
            />
          </div>
        </div>
      </section>
    </>
  );
}
