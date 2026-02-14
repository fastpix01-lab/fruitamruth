"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { fetchOrders, updateOrderStatus, deleteOrder } from "@/lib/api";
import type { Order } from "@/lib/types";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-blue-100 text-blue-700",
  preparing: "bg-orange-100 text-orange-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const statuses = ["pending", "confirmed", "preparing", "delivered", "cancelled"];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const loadData = async () => {
    try {
      const data = await fetchOrders();
      setOrders(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      const updated = await updateOrderStatus(orderId, newStatus);
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? updated : o))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (orderId: string) => {
    if (!confirm("Delete this order?")) return;
    try {
      await deleteOrder(orderId);
      setOrders((prev) => prev.filter((o) => o.id !== orderId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-brand-dark">Orders</h1>
        <p className="text-gray-400 text-sm mt-1">View and manage customer orders</p>
      </div>

      {loading ? (
        <div className="text-center py-20">
          <span className="text-4xl animate-bounce inline-block">🍊</span>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl">
          <span className="text-6xl block mb-4">📦</span>
          <p className="text-gray-400">No orders yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {/* Order Header */}
              <div
                className="flex flex-wrap items-center gap-4 p-5 cursor-pointer hover:bg-brand-cream/30 transition-colors"
                onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <p className="font-semibold text-brand-dark text-sm">
                      {order.customer_name}
                    </p>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusColors[order.status] ?? "bg-gray-100 text-gray-600"}`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs">{order.customer_email}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-brand-orange">₹{order.total}</p>
                  <p className="text-gray-400 text-xs">
                    {new Date(order.created_at).toLocaleDateString()} {new Date(order.created_at).toLocaleTimeString()}
                  </p>
                </div>
                <svg
                  className={`w-5 h-5 text-gray-400 transition-transform ${expandedId === order.id ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {/* Expanded Details */}
              {expandedId === order.id && (
                <div className="border-t border-orange-100 p-5 bg-brand-cream/20 animate-fade-in-up">
                  <h3 className="text-sm font-semibold text-brand-dark mb-3">Order Items</h3>
                  <div className="space-y-2 mb-4">
                    {(Array.isArray(order.items) ? order.items : []).map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          {item.name} x{item.quantity}
                        </span>
                        <span className="font-medium text-brand-dark">
                          ₹{item.price * item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-orange-100">
                    <label className="text-sm font-medium text-brand-dark">Status:</label>
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className="px-3 py-1.5 rounded-lg border border-orange-200 text-sm focus:border-brand-orange outline-none"
                    >
                      {statuses.map((s) => (
                        <option key={s} value={s}>
                          {s.charAt(0).toUpperCase() + s.slice(1)}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => handleDelete(order.id)}
                      className="ml-auto text-red-400 hover:text-red-600 text-sm font-medium cursor-pointer"
                    >
                      Delete Order
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
