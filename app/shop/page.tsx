import Link from "next/link";
import { clsx } from "clsx";
import { prisma } from "@/lib/prisma";
import { PageHero } from "@/components/SectionHead";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/Button";
import { WHATSAPP_LINK } from "@/lib/constants";

export const dynamic = "force-dynamic";

const TABS = [
  { key: "all", label: "All products" },
  { key: "SOFTWARE", label: "Software licenses" },
  { key: "ACCESSORY", label: "Tech accessories" },
] as const;

export default async function ShopPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const category = searchParams.category;
  const products = await prisma.product.findMany({
    orderBy: [{ featured: "desc" }, { createdAt: "asc" }],
  });

  const software = products.filter((p) => p.category === "SOFTWARE");
  const accessories = products.filter((p) => p.category === "ACCESSORY");

  const showSoftware = !category || category === "SOFTWARE";
  const showAccessories = !category || category === "ACCESSORY";

  return (
    <>
      <PageHero
        eyebrow="Shop"
        title="Software licenses & tech accessories."
        description="Add items to your cart and check out with Cash on Delivery or Bank Transfer — no need to message us first."
      />

      <section className="py-11">
        <div className="max-w-wrap mx-auto px-7">
          <div className="flex flex-wrap gap-2 mb-10">
            {TABS.map((tab) => {
              const href = tab.key === "all" ? "/shop" : `/shop?category=${tab.key}`;
              const active = (tab.key === "all" && !category) || category === tab.key;
              return (
                <Link
                  key={tab.key}
                  href={href}
                  className={clsx(
                    "px-4 py-2 rounded-full text-sm font-semibold no-underline border",
                    active
                      ? "bg-navy text-white border-navy"
                      : "border-line text-muted hover:border-navy hover:text-navy",
                  )}
                >
                  {tab.label}
                </Link>
              );
            })}
          </div>

          {showSoftware && (
            <div id="software-products" className="mb-14 scroll-mt-24">
              <div className="flex items-center mb-8 gap-5">
                <h2 className="text-[1.4rem] font-semibold whitespace-nowrap">Software licenses</h2>
                <div className="h-px bg-line flex-1" />
              </div>
              <div className="flex flex-wrap gap-6">
                {software.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}

          {showAccessories && (
            <div id="accessories" className="scroll-mt-24">
              <div className="flex items-center mb-8 gap-5">
                <h2 className="text-[1.4rem] font-semibold whitespace-nowrap">Tech accessories</h2>
                <div className="h-px bg-line flex-1" />
              </div>
              <div className="flex flex-wrap gap-6">
                {accessories.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="bg-navy-deep text-white text-center py-16">
        <div className="max-w-wrap mx-auto px-7">
          <h2 className="text-white text-[clamp(1.5rem,3vw,2rem)]">
            Can&apos;t find what you&apos;re looking for?
          </h2>
          <p className="text-[#B9C2E8] mt-3">
            Message us — we can often source specific accessories or software on request.
          </p>
          <div className="flex justify-center mt-7">
            <Button href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
              Message on WhatsApp
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
