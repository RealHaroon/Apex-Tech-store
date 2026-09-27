import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdminPageHeader, AdminButton, EmptyState, Badge } from "@/components/admin/ui";
import { StockToggle } from "@/components/admin/StockToggle";
import { ProductThumb } from "@/components/ProductThumb";
import { formatPKR } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: [{ category: { position: "asc" } }, { createdAt: "asc" }],
  });

  return (
    <>
      <AdminPageHeader
        title="Products"
        description={`${products.length} product${products.length === 1 ? "" : "s"} in the catalog`}
        action={<AdminButton href="/admin/products/new">+ New product</AdminButton>}
      />

      {products.length === 0 ? (
        <EmptyState>No products yet. Add your first one.</EmptyState>
      ) : (
        <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wide">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Product</th>
                <th className="text-left px-4 py-3 font-medium">Category</th>
                <th className="text-left px-4 py-3 font-medium">Price</th>
                <th className="text-left px-4 py-3 font-medium">Featured</th>
                <th className="text-left px-4 py-3 font-medium">Stock</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-t border-slate-100">
                  <td className="px-4 py-3 font-medium text-slate-900">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-md overflow-hidden flex-shrink-0">
                        <ProductThumb
                          imageUrl={p.imageUrl}
                          icon={p.icon}
                          name={p.name}
                          className="h-9"
                          iconClassName="!w-5 !h-5"
                        />
                      </div>
                      {p.name}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-500">{p.category.name}</td>
                  <td className="px-4 py-3 text-slate-700">
                    {p.startingPrice ? "From " : ""}
                    {formatPKR(p.price)}
                  </td>
                  <td className="px-4 py-3">
                    {p.featured ? <Badge color="indigo">Featured</Badge> : <span className="text-slate-300">—</span>}
                  </td>
                  <td className="px-4 py-3">
                    <StockToggle id={p.id} inStock={p.inStock} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/products/${p.id}/edit`}
                      className="text-slate-600 hover:text-slate-900 text-sm font-medium"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
