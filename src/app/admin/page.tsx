"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { fetchProducts, fetchCategories, fetchOrders } from "@/lib/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, categories: 0, orders: 0, revenue: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [products, categories, orders] = await Promise.all([
          fetchProducts(),
          fetchCategories(),
          fetchOrders(),
        ]);
        setStats({
          products: products.length,
          categories: categories.length,
          orders: orders.length,
          revenue: orders.reduce((sum, o) => sum + o.total, 0),
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const cards = [
    { label: "Products", value: stats.products, icon: "🧃", color: "bg-orange-50 text-brand-orange" },
    { label: "Categories", value: stats.categories, icon: "📁", color: "bg-green-50 text-brand-green" },
    { label: "Orders", value: stats.orders, icon: "📦", color: "bg-blue-50 text-blue-600" },
    { label: "Revenue", value: `₹${stats.revenue}`, icon: "💰", color: "bg-yellow-50 text-yellow-600" },
  ];

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-brand-dark">Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">Welcome to Fruit Amruth Admin</p>
      </div>

      {loading ? (
        <div className="text-center py-20">
          <span className="text-4xl animate-bounce inline-block">🍊</span>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => (
            <div key={card.label} className="bg-white rounded-2xl p-6 shadow-sm">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 ${card.color}`}>
                {card.icon}
              </div>
              <p className="text-gray-400 text-sm">{card.label}</p>
              <p className="font-display text-2xl font-bold text-brand-dark mt-1">{card.value}</p>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
