"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createProduct, deleteProduct, updateProduct } from "@/lib/actions/admin/products";
import { uploadProductImage } from "@/lib/actions/admin/upload";
import { PRODUCT_ICONS, ProductIcon } from "@/components/icons";

type CategoryOption = { id: string; name: string };

type InitialProduct = {
  id: string;
  name: string;
  slug: string;
  description: string;
  categoryId: string;
  icon: string;
  imageUrl: string | null;
  price: number;
  priceNote: string | null;
  startingPrice: boolean;
  featured: boolean;
  inStock: boolean;
};

export function ProductForm({
  categories,
  initialProduct,
}: {
  categories: CategoryOption[];
  initialProduct?: InitialProduct;
}) {
  const router = useRouter();
  const isEditing = !!initialProduct;

  const [name, setName] = useState(initialProduct?.name ?? "");
  const [slug, setSlug] = useState(initialProduct?.slug ?? "");
  const [description, setDescription] = useState(initialProduct?.description ?? "");
  const [categoryId, setCategoryId] = useState(
    initialProduct?.categoryId ?? categories[0]?.id ?? "",
  );
  const [icon, setIcon] = useState(initialProduct?.icon ?? Object.keys(PRODUCT_ICONS)[0]);
  const [imageUrl, setImageUrl] = useState(initialProduct?.imageUrl ?? "");
  const [price, setPrice] = useState(String(initialProduct?.price ?? ""));
  const [priceNote, setPriceNote] = useState(initialProduct?.priceNote ?? "");
  const [startingPrice, setStartingPrice] = useState(initialProduct?.startingPrice ?? false);
  const [featured, setFeatured] = useState(initialProduct?.featured ?? false);
  const [inStock, setInStock] = useState(initialProduct?.inStock ?? true);

  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFileSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    const formData = new FormData();
    formData.set("file", file);
    const result = await uploadProductImage(formData);
    setUploading(false);
    if (!result.success) {
      setError(result.error);
      return;
    }
    setImageUrl(result.url);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const payload = {
      name,
      slug,
      description,
      categoryId,
      icon,
      imageUrl,
      price: Number(price),
      priceNote,
      startingPrice,
      featured,
      inStock,
    };

    const result = isEditing
      ? await updateProduct(initialProduct!.id, payload)
      : await createProduct(payload);

    setSubmitting(false);
    if (!result.success) {
      setError(result.error);
      return;
    }
    router.push("/admin/products");
    router.refresh();
  }

  async function handleDelete() {
    if (!initialProduct) return;
    if (!confirm(`Delete "${initialProduct.name}"? This can't be undone.`)) return;
    setSubmitting(true);
    setError(null);
    const result = await deleteProduct(initialProduct.id);
    setSubmitting(false);
    if (!result.success) {
      setError(result.error);
      return;
    }
    router.push("/admin/products");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Name</label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-slate-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Slug <span className="text-slate-400 font-normal">(optional, auto from name)</span>
          </label>
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder={name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
            className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-slate-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">Description</label>
        <textarea
          required
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-slate-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Category</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:border-slate-500"
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Icon</label>
          <select
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:border-slate-500"
          >
            {Object.keys(PRODUCT_ICONS).map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          Image <span className="text-slate-400 font-normal">(optional — falls back to the icon above)</span>
        </label>
        <div className="flex items-start gap-3">
          <div className="w-16 h-16 rounded-md bg-slate-100 flex items-center justify-center overflow-hidden flex-shrink-0 border border-slate-200">
            {imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element -- arbitrary admin-supplied URL, preview only
              <img src={imageUrl} alt="" className="w-full h-full object-cover" />
            ) : (
              <ProductIcon icon={icon} className="!w-8 !h-8" />
            )}
          </div>
          <div className="flex-1 space-y-2">
            <input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/photo.jpg"
              className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-slate-500"
            />
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="text-sm font-medium text-slate-700 border border-slate-300 rounded-md px-3 py-1.5 hover:bg-slate-50 disabled:opacity-60"
              >
                {uploading ? "Uploading…" : "Upload from computer"}
              </button>
              {imageUrl && (
                <button
                  type="button"
                  onClick={() => setImageUrl("")}
                  className="text-sm text-slate-500 hover:text-red-600"
                >
                  Remove image
                </button>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif"
              onChange={handleFileSelected}
              className="hidden"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Price (PKR)</label>
          <input
            required
            type="number"
            min={0}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-slate-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Price note <span className="text-slate-400 font-normal">(optional, e.g. &quot;+ setup&quot;)</span>
          </label>
          <input
            value={priceNote}
            onChange={(e) => setPriceNote(e.target.value)}
            className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-slate-500"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" checked={startingPrice} onChange={(e) => setStartingPrice(e.target.checked)} />
          Show as &quot;From&quot; price
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
          Featured
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" checked={inStock} onChange={(e) => setInStock(e.target.checked)} />
          In stock
        </label>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="bg-slate-900 text-white text-sm font-semibold px-4 py-2 rounded-md disabled:opacity-60"
        >
          {submitting ? "Saving…" : isEditing ? "Save changes" : "Create product"}
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={submitting}
            className="text-red-600 hover:text-red-700 text-sm font-semibold"
          >
            Delete product
          </button>
        )}
      </div>
    </form>
  );
}
