import Link from "next/link";
import { clsx } from "clsx";
import { prisma } from "@/lib/prisma";
import { PageHero } from "@/components/SectionHead";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/Button";
import { WHATSAPP_LINK } from "@/lib/constants";

export const dynamic = "force-dynamic";

export default async function ShopPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const activeSlug = searchParams.category;

  const [categories, products] = await Promise.all([
    prisma.category.findMany({ orderBy: { position: "asc" } }),
    prisma.product.findMany({
      include: { category: true },
      orderBy: [{ featured: "desc" }, { createdAt: "asc" }],
    }),
  ]);

  const visibleCategories = categories.filter(
    (c) => !activeSlug || c.slug === activeSlug,
  );

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
            <Link
              href="/shop"
              className={clsx(
                "px-4 py-2 rounded-full text-sm font-semibold no-underline border",
                !activeSlug
                  ? "bg-navy text-white border-navy"
                  : "border-line text-muted hover:border-navy hover:text-navy",
              )}
            >
              All products
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/shop?category=${cat.slug}`}
                className={clsx(
                  "px-4 py-2 rounded-full text-sm font-semibold no-underline border",
                  activeSlug === cat.slug
                    ? "bg-navy text-white border-navy"
                    : "border-line text-muted hover:border-navy hover:text-navy",
                )}
              >
                {cat.name}
              </Link>
            ))}
          </div>

          {visibleCategories.map((cat) => {
            const items = products.filter((p) => p.categoryId === cat.id);
            if (items.length === 0) return null;
            return (
              <div key={cat.id} id={cat.slug} className="mb-14 last:mb-0 scroll-mt-24">
                <div className="flex items-center mb-8 gap-5">
                  <h2 className="text-[1.4rem] font-semibold whitespace-nowrap">{cat.name}</h2>
                  <div className="h-px bg-line flex-1" />
                </div>
                <div className="flex flex-wrap gap-6">
                  {items.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </div>
            );
          })}
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
