import { prisma } from "@/lib/prisma";
import { AdminPageHeader } from "@/components/admin/ui";
import { ProductForm } from "@/components/admin/ProductForm";

export const dynamic = "force-dynamic";

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({ orderBy: { position: "asc" } });

  return (
    <>
      <AdminPageHeader title="New product" />
      <ProductForm categories={categories} />
    </>
  );
}
