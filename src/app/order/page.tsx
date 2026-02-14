"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { createOrder } from "@/lib/api";
import Button from "@/components/Button";

export default function OrderPage() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    totalPrice,
    totalItems,
    clearCart,
  } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");

  const handlePlaceOrder = async () => {
    if (!customerName.trim() || !customerEmail.trim()) {
      setError("Please enter your name and email.");
      return;
    }
    setPlacing(true);
    setError("");
    try {
      await createOrder({
        customer_name: customerName.trim(),
        customer_email: customerEmail.trim(),
        items: items.map((item) => ({
          product_id: item.product.id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
        })),
        total: totalPrice,
      });
      clearCart();
      setOrderPlaced(true);
    } catch (err) {
      console.error(err);
      setError("Failed to place order. Please try again.");
    } finally {
      setPlacing(false);
    }
  };

  if (orderPlaced) {
    return (
      <section className="py-24 md:py-32 bg-brand-cream min-h-screen flex items-center">
        <div className="max-w-xl mx-auto px-4 text-center animate-scale-in">
          <span className="text-8xl block mb-6">🎉</span>
          <h1 className="font-display text-3xl md:text-4xl font-extrabold text-brand-dark mb-4">
            Order Placed!
          </h1>
          <p className="text-gray-500 text-lg mb-2">
            Thank you for your order. Your fresh juices are being prepared!
          </p>
          <p className="text-gray-400 text-sm mb-8">
            Estimated delivery: 25-30 minutes
          </p>
          <Link href="/menu">
            <Button variant="primary" size="lg">
              Order More Juices
            </Button>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-brand-cream to-orange-50 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-extrabold text-brand-dark mb-4">
            Your Order
          </h1>
          <p className="text-gray-500 text-lg">
            Review your cart and place your order.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {items.length === 0 ? (
            <div className="text-center py-20">
              <span className="text-8xl block mb-6">🧃</span>
              <h2 className="font-display text-2xl font-bold text-brand-dark mb-2">
                Your cart is empty
              </h2>
              <p className="text-gray-400 mb-8">
                Browse our menu and add some delicious juices!
              </p>
              <Link href="/menu">
                <Button variant="primary" size="lg">
                  Browse Menu
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                <h2 className="font-display text-xl font-bold text-brand-dark mb-4">
                  Cart Items ({totalItems})
                </h2>
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center gap-4 bg-brand-cream rounded-2xl p-5 transition-all hover:shadow-sm"
                  >
                    {item.product.image_url && item.product.image_url.startsWith("http") ? (
                      <img src={item.product.image_url} alt={item.product.name} className="w-16 h-16 object-contain rounded-lg" />
                    ) : (
                      <span className="text-5xl">🧃</span>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display font-bold text-brand-dark">
                        {item.product.name}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {item.product.description}
                      </p>
                      <p className="text-brand-orange font-bold mt-1">
                        ₹{item.product.price} each
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity - 1
                            )
                          }
                          className="w-9 h-9 rounded-full bg-white border border-orange-200 flex items-center justify-center text-brand-dark hover:bg-orange-50 transition-colors font-bold cursor-pointer"
                        >
                          -
                        </button>
                        <span className="w-10 text-center font-bold text-lg">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity + 1
                            )
                          }
                          className="w-9 h-9 rounded-full bg-white border border-orange-200 flex items-center justify-center text-brand-dark hover:bg-orange-50 transition-colors font-bold cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-brand-dark">
                          ₹{item.product.price * item.quantity}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-red-400 hover:text-red-600 transition-colors cursor-pointer"
                          aria-label={`Remove ${item.product.name}`}
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-brand-cream rounded-2xl p-6 sticky top-24">
                  <h2 className="font-display text-xl font-bold text-brand-dark mb-6">
                    Order Summary
                  </h2>

                  {/* Customer Info */}
                  <div className="space-y-3 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-brand-dark mb-1">Name</label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Your name"
                        className="w-full px-3 py-2 rounded-xl border border-orange-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-sm bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brand-dark mb-1">Email</label>
                      <input
                        type="email"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full px-3 py-2 rounded-xl border border-orange-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-sm bg-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    {items.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex justify-between text-sm"
                      >
                        <span className="text-gray-600">
                          {item.product.name} x{item.quantity}
                        </span>
                        <span className="font-medium text-brand-dark">
                          ₹{item.product.price * item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-orange-200 pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Subtotal</span>
                      <span className="font-medium">₹{totalPrice}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Delivery</span>
                      <span className="font-medium text-brand-green">
                        Free
                      </span>
                    </div>
                    <div className="flex justify-between text-lg font-bold border-t border-orange-200 pt-3 mt-3">
                      <span className="text-brand-dark">Total</span>
                      <span className="text-brand-orange">₹{totalPrice}</span>
                    </div>
                  </div>

                  {error && (
                    <p className="text-red-500 text-sm mt-3">{error}</p>
                  )}

                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full mt-6"
                    disabled={placing}
                    onClick={handlePlaceOrder}
                  >
                    {placing ? "Placing Order..." : "Place Order"}
                  </Button>
                  <Link href="/menu" className="block mt-3">
                    <Button variant="ghost" size="sm" className="w-full">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
