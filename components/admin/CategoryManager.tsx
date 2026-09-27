"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "@/lib/actions/admin/categories";

type CategoryRow = {
  id: string;
  name: string;
  slug: string;
  productCount: number;
};

export function CategoryManager({ categories }: { categories: CategoryRow[] }) {
  const router = useRouter();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editSlug, setEditSlug] = useState("");
  const [newName, setNewName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  function startEdit(cat: CategoryRow) {
    setEditingId(cat.id);
    setEditName(cat.name);
    setEditSlug(cat.slug);
    setError(null);
  }

  async function saveEdit(id: string) {
    setBusy(true);
    setError(null);
    const result = await updateCategory(id, { name: editName, slug: editSlug });
    setBusy(false);
    if (!result.success) {
      setError(result.error);
      return;
    }
    setEditingId(null);
    router.refresh();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this category?")) return;
    setBusy(true);
    setError(null);
    const result = await deleteCategory(id);
    setBusy(false);
    if (!result.success) {
      setError(result.error);
      return;
    }
    router.refresh();
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const result = await createCategory({ name: newName });
    setBusy(false);
    if (!result.success) {
      setError(result.error);
      return;
    }
    setNewName("");
    router.refresh();
  }

  return (
    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wide">
          <tr>
            <th className="text-left px-4 py-3 font-medium">Name</th>
            <th className="text-left px-4 py-3 font-medium">Slug</th>
            <th className="text-left px-4 py-3 font-medium">Products</th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat.id} className="border-t border-slate-100">
              {editingId === cat.id ? (
                <>
                  <td className="px-4 py-2.5">
                    <input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full border border-slate-300 rounded px-2 py-1 text-sm"
                    />
                  </td>
                  <td className="px-4 py-2.5">
                    <input
                      value={editSlug}
                      onChange={(e) => setEditSlug(e.target.value)}
                      className="w-full border border-slate-300 rounded px-2 py-1 text-sm"
                    />
                  </td>
                  <td className="px-4 py-2.5 text-slate-500">{cat.productCount}</td>
                  <td className="px-4 py-2.5 text-right space-x-2 whitespace-nowrap">
                    <button
                      disabled={busy}
                      onClick={() => saveEdit(cat.id)}
                      className="text-emerald-700 font-medium text-sm"
                    >
                      Save
                    </button>
                    <button
                      disabled={busy}
                      onClick={() => setEditingId(null)}
                      className="text-slate-500 text-sm"
                    >
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td className="px-4 py-2.5 font-medium text-slate-900">{cat.name}</td>
                  <td className="px-4 py-2.5 text-slate-500">{cat.slug}</td>
                  <td className="px-4 py-2.5 text-slate-500">{cat.productCount}</td>
                  <td className="px-4 py-2.5 text-right space-x-3 whitespace-nowrap">
                    <button
                      onClick={() => startEdit(cat)}
                      className="text-slate-600 hover:text-slate-900 text-sm font-medium"
                    >
                      Edit
                    </button>
                    <button
                      disabled={busy}
                      onClick={() => handleDelete(cat.id)}
                      className="text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <form onSubmit={handleCreate} className="flex items-center gap-3 border-t border-slate-200 px-4 py-3 bg-slate-50">
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="New category name"
          required
          className="flex-1 border border-slate-300 rounded px-2.5 py-1.5 text-sm bg-white"
        />
        <button
          type="submit"
          disabled={busy}
          className="bg-slate-900 text-white text-sm font-semibold px-3.5 py-1.5 rounded-md disabled:opacity-60"
        >
          Add category
        </button>
      </form>
      {error && <p className="text-sm text-red-600 px-4 pb-3">{error}</p>}
    </div>
  );
}
