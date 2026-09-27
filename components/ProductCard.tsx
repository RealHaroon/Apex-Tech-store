import Link from "next/link";
import { ProductIcon } from "@/components/icons";
import { AddToCartButton } from "@/components/AddToCartButton";
import { formatPKR } from "@/lib/format";
import type { ProductSummary } from "@/lib/types";

export function ProductCard({ product }: { product: ProductSummary }) {
  return (
    <div className="flex-1 basis-[250px] max-w-[320px] mb-6 border border-line rounded-xl overflow-hidden flex flex-col bg-white">
      <Link href={`/shop/${product.slug}`} className="block">
        <div className="h-[120px] bg-ice flex items-center justify-center">
          <ProductIcon icon={product.icon} />
        </div>
      </Link>
      <div className="p-[18px] flex flex-col flex-1">
        <Link href={`/shop/${product.slug}`} className="no-underline">
          <h3 className="text-base font-semibold mb-1.5 text-ink">{product.name}</h3>
        </Link>
        <p className="text-muted text-[0.85rem] mb-3.5 flex-1">{product.description}</p>
        <div className="font-serif font-bold text-navy mb-3">
          {product.startingPrice ? "From " : ""}
          {formatPKR(product.price)}{" "}
          {product.priceNote && (
            <span className="font-sans font-normal text-[0.75rem] text-muted">
              {product.priceNote}
            </span>
          )}
        </div>
        <AddToCartButton product={product} />
      </div>
    </div>
  );
}
