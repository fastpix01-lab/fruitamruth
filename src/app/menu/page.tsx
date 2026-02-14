"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { fetchProducts, fetchCategories } from "@/lib/api";
import type { Product, Category } from "@/lib/types";

export default function MenuPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [prods, cats] = await Promise.all([
          fetchProducts(),
          fetchCategories(),
        ]);
        setProducts(prods);
        setCategories(cats);
      } catch (err) {
        console.error("Failed to fetch menu:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category_id === activeCategory);

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-brand-cream to-orange-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-brand-orange/10 text-brand-orange font-semibold text-sm px-4 py-2 rounded-full mb-4">
            Our Menu
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-extrabold text-brand-dark mb-4">
            Fresh Juice Menu
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            From classic favorites to exotic blends, find your perfect juice.
            All made fresh, all natural.
          </p>
        </div>
      </section>

      {/* Filters + Products */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                activeCategory === "all"
                  ? "bg-brand-orange text-white shadow-lg shadow-orange-200"
                  : "bg-brand-cream text-brand-dark hover:bg-orange-100"
              }`}
            >
              All Juices
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-brand-orange text-white shadow-lg shadow-orange-200"
                    : "bg-brand-cream text-brand-dark hover:bg-orange-100"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-20">
              <span className="text-4xl animate-bounce inline-block">🍊</span>
              <p className="text-gray-400 mt-4">Loading fresh juices...</p>
            </div>
          ) : (
            <>
              {/* Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {filtered.length === 0 && (
                <div className="text-center py-20">
                  <span className="text-6xl block mb-4">🔍</span>
                  <p className="text-gray-400 font-medium">
                    No juices in this category yet.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
