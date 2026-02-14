"use client";

import { useEffect, useState, type FormEvent } from "react";
import AdminLayout from "@/components/AdminLayout";
import Button from "@/components/Button";
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/lib/api";
import type { Category } from "@/lib/types";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      const cats = await fetchCategories();
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
    setName("");
    setEditingId(null);
    setShowForm(false);
    setError("");
  };

  const handleEdit = (category: Category) => {
    setName(category.name);
    setEditingId(category.id);
    setShowForm(true);
    setError("");
  };

  const handleDelete = async (category: Category) => {
    if (!confirm(`Delete category "${category.name}"?`)) return;
    try {
      await deleteCategory(category.id);
      setCategories((prev) => prev.filter((c) => c.id !== category.id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Category name is required.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      if (editingId) {
        await updateCategory(editingId, name.trim());
      } else {
        await createCategory(name.trim());
      }
      resetForm();
      await loadData();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to save category";
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-brand-dark">Categories</h1>
          <p className="text-gray-400 text-sm mt-1">Manage juice categories</p>
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
        >
          + Add Category
        </Button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-6 mb-8 animate-scale-in">
          <h2 className="font-display text-lg font-bold text-brand-dark mb-4">
            {editingId ? "Edit Category" : "New Category"}
          </h2>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm mb-4">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="flex gap-3 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-brand-dark mb-1">Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Tropical, Detox, Classic"
                className="w-full px-3 py-2.5 rounded-xl border border-orange-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-sm"
              />
            </div>
            <Button type="submit" variant="primary" size="sm" disabled={saving}>
              {saving ? "Saving..." : editingId ? "Update" : "Create"}
            </Button>
            <Button type="button" variant="ghost" size="sm" onClick={resetForm}>
              Cancel
            </Button>
          </form>
        </div>
      )}

      {/* Categories List */}
      {loading ? (
        <div className="text-center py-20">
          <span className="text-4xl animate-bounce inline-block">🍊</span>
        </div>
      ) : categories.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl">
          <span className="text-6xl block mb-4">📁</span>
          <p className="text-gray-400">No categories yet. Create your first one!</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-orange-100">
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase">Name</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase">Created</th>
                  <th className="text-right px-6 py-4 text-xs font-semibold text-gray-400 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat) => (
                  <tr key={cat.id} className="border-b border-orange-50 hover:bg-brand-cream/50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-semibold text-brand-dark text-sm">{cat.name}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-400 text-sm">
                        {new Date(cat.created_at).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleEdit(cat)}
                        className="text-brand-orange hover:text-orange-700 text-sm font-medium mr-4 cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(cat)}
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
