"use client";

import { useEffect, useState, type FormEvent } from "react";
import Image from "next/image";
import AdminLayout from "@/components/AdminLayout";
import Button from "@/components/Button";
import {
  fetchProducts,
  fetchCategories,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage,
  deleteProductImage,
} from "@/lib/api";
import type { Product, Category } from "@/lib/types";

const emptyForm = {
  name: "",
  description: "",
  price: "",
  category_id: "",
  image_url: "",
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      const [prods, cats] = await Promise.all([
        fetchProducts(),
        fetchCategories(),
      ]);
      setProducts(prods);
      setCategories(cats);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setImageFile(null);
    setEditingId(null);
    setShowForm(false);
    setError("");
  };

  const handleEdit = (product: Product) => {
    setForm({
      name: product.name,
      description: product.description,
      price: String(product.price),
      category_id: product.category_id ?? "",
      image_url: product.image_url ?? "",
    });
    setEditingId(product.id);
    setShowForm(true);
    setError("");
  };

  const handleDelete = async (product: Product) => {
    if (!confirm(`Delete "${product.name}"?`)) return;
    try {
      if (product.image_url) {
        await deleteProductImage(product.image_url);
      }
      await deleteProduct(product.id);
      setProducts((prev) => prev.filter((p) => p.id !== product.id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.price) {
      setError("Name and price are required.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      let imageUrl = form.image_url;

      if (imageFile) {
        if (editingId && form.image_url) {
          await deleteProductImage(form.image_url);
        }
        imageUrl = await uploadProductImage(imageFile);
      }

      const payload = {
        name: form.name.trim(),
        description: form.description.trim(),
        price: parseFloat(form.price),
        category_id: form.category_id || null,
        image_url: imageUrl || null,
      };

      if (editingId) {
        await updateProduct(editingId, payload);
      } else {
        await createProduct(payload);
      }
      resetForm();
      await loadData();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to save product";
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-brand-dark">Products</h1>
          <p className="text-gray-400 text-sm mt-1">Manage your juice products</p>
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
        >
          + Add Product
        </Button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-6 mb-8 animate-scale-in">
          <h2 className="font-display text-lg font-bold text-brand-dark mb-4">
            {editingId ? "Edit Product" : "New Product"}
          </h2>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm mb-4">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-brand-dark mb-1">Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-orange-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-dark mb-1">Price (₹)</label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-orange-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-sm"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-brand-dark mb-1">Description</label>
              <textarea
                rows={2}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-orange-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-sm resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-dark mb-1">Category</label>
              <select
                value={form.category_id}
                onChange={(e) => setForm({ ...form, category_id: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-orange-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-sm"
              >
                <option value="">No category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-dark mb-1">Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
                className="w-full px-3 py-2 rounded-xl border border-orange-200 text-sm file:mr-3 file:rounded-full file:border-0 file:bg-brand-orange/10 file:text-brand-orange file:px-3 file:py-1 file:text-sm file:font-medium"
              />
              {form.image_url && !imageFile && (
                <div className="mt-2 flex items-center gap-2">
                  <Image src={form.image_url} alt="Current" width={40} height={40} className="rounded object-contain" />
                  <span className="text-xs text-gray-400">Current image</span>
                </div>
              )}
            </div>
            <div className="sm:col-span-2 flex gap-3 pt-2">
              <Button type="submit" variant="primary" size="sm" disabled={saving}>
                {saving ? "Saving..." : editingId ? "Update Product" : "Create Product"}
              </Button>
              <Button type="button" variant="ghost" size="sm" onClick={resetForm}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Product List */}
      {loading ? (
        <div className="text-center py-20">
          <span className="text-4xl animate-bounce inline-block">🍊</span>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl">
          <span className="text-6xl block mb-4">🧃</span>
          <p className="text-gray-400">No products yet. Add your first juice!</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-orange-100">
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase">Product</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase">Category</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase">Price</th>
                  <th className="text-right px-6 py-4 text-xs font-semibold text-gray-400 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-orange-50 hover:bg-brand-cream/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {product.image_url && product.image_url.startsWith("http") ? (
                          <Image src={product.image_url} alt={product.name} width={40} height={40} className="rounded-lg object-contain" />
                        ) : (
                          <span className="text-2xl">🧃</span>
                        )}
                        <div>
                          <p className="font-semibold text-brand-dark text-sm">{product.name}</p>
                          <p className="text-gray-400 text-xs truncate max-w-[200px]">{product.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-500">{product.category?.name ?? "—"}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-brand-orange text-sm">₹{product.price}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleEdit(product)}
                        className="text-brand-orange hover:text-orange-700 text-sm font-medium mr-4 cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product)}
                        className="text-red-400 hover:text-red-600 text-sm font-medium cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
