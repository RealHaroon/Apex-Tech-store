import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ProductThumb } from "@/components/ProductThumb";
import { AddToCartButton } from "@/components/AddToCartButton";
import { formatPKR } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: { category: true },
  });

  if (!product) notFound();

  return (
    <section className="py-14">
      <div className="max-w-wrap mx-auto px-7">
        <Link href="/shop" className="text-sm text-navy-mid font-semibold no-underline">
          ← Back to shop
        </Link>
        <div className="flex flex-wrap gap-12 mt-6">
          <div className="flex-1 basis-[320px] max-w-[420px]">
            <ProductThumb
              imageUrl={product.imageUrl}
              icon={product.icon}
              name={product.name}
              className="aspect-square rounded-2xl"
              iconClassName="!w-24 !h-24"
            />
          </div>
          <div className="flex-1 basis-[320px]">
            <span className="inline-block text-[0.8rem] text-navy-mid bg-navy/[0.07] px-3 py-1 rounded-full font-semibold mb-4">
              {product.category.name}
            </span>
            <h1 className="text-[2rem] font-semibold">{product.name}</h1>
            <p className="text-muted text-[1.02rem] mt-4 max-w-[52ch]">
              {product.description}
            </p>
            <div className="font-serif font-bold text-navy text-2xl mt-6">
              {product.startingPrice ? "From " : ""}
              {formatPKR(product.price)}{" "}
              {product.priceNote && (
                <span className="font-sans font-normal text-sm text-muted">
                  {product.priceNote}
                </span>
              )}
            </div>
            <div className="max-w-[280px] mt-6">
              <AddToCartButton product={product} size="default" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
