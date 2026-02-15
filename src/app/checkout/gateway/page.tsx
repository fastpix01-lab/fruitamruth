"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useCheckout } from "@/context/CheckoutContext";
import { createOrder } from "@/lib/api";
import Button from "@/components/Button";
import CheckoutSteps from "@/components/CheckoutSteps";

export default function GatewayPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();
  const { customerName, customerEmail, address, paymentMethod, setPaymentComplete, resetCheckout } = useCheckout();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!paymentMethod || !address || items.length === 0) {
      router.replace("/order");
    }
  }, [paymentMethod, address, items, router]);

  if (!paymentMethod || !address || items.length === 0) return null;

  const isCod = paymentMethod === "cod";

  const handlePay = async () => {
    setProcessing(true);
    setError("");
    try {
      // Simulate payment delay
      if (!isCod) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }

      // Insert order into Supabase
      await createOrder({
        customer_name: customerName,
        customer_email: customerEmail,
        items: items.map((item) => ({
          product_id: item.product.id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
        })),
        total: totalPrice,
      });

      setPaymentComplete(true);
      clearCart();
      router.push("/checkout/success");
    } catch (err) {
      console.error(err);
      setError("Payment failed. Please try again.");
      setProcessing(false);
    }
  };

  const methodLabels: Record<string, string> = {
    upi: "UPI",
    card: "Card",
    cod: "Cash on Delivery",
  };

  return (
    <>
      <section className="bg-gradient-to-br from-brand-cream to-orange-50 py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-3xl md:text-4xl font-extrabold text-brand-dark mb-2">
            {isCod ? "Confirm Order" : "Payment Gateway"}
          </h1>
          <p className="text-gray-500">
            {isCod ? "Review and confirm your COD order" : "Complete your payment securely"}
          </p>
        </div>
        <CheckoutSteps current={3} />
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border-2 border-orange-100 rounded-2xl overflow-hidden shadow-xl animate-scale-in">
            {/* Gateway Header */}
            <div className="bg-gradient-to-r from-brand-orange to-brand-mango p-6 text-center text-white">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-2xl">🔒</span>
                <span className="font-display font-bold text-lg">Fruit Amruth Pay</span>
              </div>
              <p className="text-white/80 text-sm">
                {isCod ? "Cash on Delivery" : `Secure ${methodLabels[paymentMethod]} Payment`}
              </p>
            </div>

            {/* Order Details */}
            <div className="p-6 space-y-4">
              <div className="bg-brand-cream/60 rounded-xl p-4">
                <p className="text-gray-500 text-xs uppercase font-semibold mb-2">Order Summary</p>
                <div className="space-y-2">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex justify-between text-sm">
                      <span className="text-gray-600">{item.product.name} x{item.quantity}</span>
                      <span className="font-medium">₹{item.product.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-orange-200 mt-3 pt-3 flex justify-between">
                  <span className="font-bold text-brand-dark">Total</span>
                  <span className="font-bold text-brand-orange text-xl">₹{totalPrice}</span>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="bg-brand-cream/60 rounded-xl p-4">
                <p className="text-gray-500 text-xs uppercase font-semibold mb-2">Delivering to</p>
                <p className="text-brand-dark text-sm font-medium">{address.fullName}</p>
                <p className="text-gray-500 text-sm">
                  {address.line1}{address.line2 ? `, ${address.line2}` : ""}, {address.city} — {address.pincode}
                </p>
              </div>

              {/* Fake card/UPI fields */}
              {paymentMethod === "card" && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Card Number</label>
                    <input
                      type="text"
                      defaultValue="4242 4242 4242 4242"
                      readOnly
                      className="w-full px-4 py-3 rounded-xl border border-orange-200 text-sm bg-gray-50 text-gray-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Expiry</label>
                      <input
                        type="text"
                        defaultValue="12/28"
                        readOnly
                        className="w-full px-4 py-3 rounded-xl border border-orange-200 text-sm bg-gray-50 text-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">CVV</label>
                      <input
                        type="text"
                        defaultValue="***"
                        readOnly
                        className="w-full px-4 py-3 rounded-xl border border-orange-200 text-sm bg-gray-50 text-gray-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === "upi" && (
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">UPI ID</label>
                  <input
                    type="text"
                    defaultValue="demo@fruitamruth"
                    readOnly
                    className="w-full px-4 py-3 rounded-xl border border-orange-200 text-sm bg-gray-50 text-gray-500"
                  />
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm">
                  {error}
                </div>
              )}

              <Button
                variant="primary"
                size="lg"
                className="w-full"
                disabled={processing}
                onClick={handlePay}
              >
                {processing ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Processing Payment...
                  </span>
                ) : isCod ? (
                  `Confirm Order — ₹${totalPrice}`
                ) : (
                  `Pay ₹${totalPrice}`
                )}
              </Button>

              <button
                onClick={() => router.push("/checkout/payment")}
                className="w-full text-center text-gray-400 text-sm hover:text-brand-dark transition-colors cursor-pointer py-2"
                disabled={processing}
              >
                Change payment method
              </button>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-6 py-3 text-center">
              <p className="text-gray-400 text-xs flex items-center justify-center gap-1">
                🔒 Secured by Fruit Amruth Pay (Demo)
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
