"use client";

import { useCart } from "@/context/CartContext";
import Button from "./Button";
import Link from "next/link";

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    totalPrice,
    totalItems,
  } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl animate-slide-in-right flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-orange-100">
          <h2 className="font-display text-xl font-bold text-brand-dark">
            Your Cart ({totalItems})
          </h2>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-brand-cream rounded-full transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <svg
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <span className="text-6xl block mb-4">🧃</span>
              <p className="text-gray-400 font-medium">Your cart is empty</p>
              <p className="text-gray-300 text-sm mt-1">
                Add some fresh juices!
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center gap-4 bg-brand-cream rounded-xl p-4 animate-scale-in"
              >
                {item.product.image_url && item.product.image_url.startsWith("http") ? (
                  <img src={item.product.image_url} alt={item.product.name} className="w-12 h-12 object-contain rounded" />
                ) : (
                  <span className="text-4xl">🧃</span>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-brand-dark text-sm truncate">
                    {item.product.name}
                  </h3>
                  <p className="text-brand-orange font-bold text-sm">
                    ₹{item.product.price}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      updateQuantity(item.product.id, item.quantity - 1)
                    }
                    className="w-8 h-8 rounded-full bg-white border border-orange-200 flex items-center justify-center text-brand-dark hover:bg-orange-50 transition-colors cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-semibold text-sm">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      updateQuantity(item.product.id, item.quantity + 1)
                    }
                    className="w-8 h-8 rounded-full bg-white border border-orange-200 flex items-center justify-center text-brand-dark hover:bg-orange-50 transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="p-1.5 hover:bg-red-50 rounded-full transition-colors cursor-pointer"
                  aria-label={`Remove ${item.product.name}`}
                >
                  <svg
                    className="w-4 h-4 text-red-400"
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
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-orange-100 p-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-medium">Total</span>
              <span className="text-2xl font-bold text-brand-dark">
                ₹{totalPrice}
              </span>
            </div>
            <Link href="/order" onClick={closeCart}>
              <Button variant="primary" size="lg" className="w-full">
                Proceed to Order
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
