import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminPageHeader } from "@/components/admin/ui";
import { ProductForm } from "@/components/admin/ProductForm";

export const dynamic = "force-dynamic";

export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const [product, categories] = await Promise.all([
    prisma.product.findUnique({ where: { id: params.id } }),
    prisma.category.findMany({ orderBy: { position: "asc" } }),
  ]);

  if (!product) notFound();

  return (
    <>
      <AdminPageHeader title={`Edit ${product.name}`} />
      <ProductForm categories={categories} initialProduct={product} />
    </>
  );
}
