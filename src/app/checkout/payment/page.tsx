"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useCheckout, type PaymentMethod } from "@/context/CheckoutContext";
import Button from "@/components/Button";
import CheckoutSteps from "@/components/CheckoutSteps";

const methods: { id: PaymentMethod; label: string; icon: string; desc: string }[] = [
  { id: "upi", label: "UPI", icon: "📱", desc: "Pay using Google Pay, PhonePe, Paytm or any UPI app" },
  { id: "card", label: "Credit / Debit Card", icon: "💳", desc: "Visa, Mastercard, RuPay — secure payment" },
  { id: "cod", label: "Cash on Delivery", icon: "💵", desc: "Pay when your order arrives at your doorstep" },
];

export default function PaymentPage() {
  const router = useRouter();
  const { items, totalPrice } = useCart();
  const { address, paymentMethod: saved, setPaymentMethod } = useCheckout();
  const [selected, setSelected] = useState<PaymentMethod | null>(saved);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!address || items.length === 0) {
      router.replace("/order");
    }
  }, [address, items, router]);

  if (!address || items.length === 0) return null;

  const handleContinue = () => {
    if (!selected) {
      setError("Please select a payment method.");
      return;
    }
    setPaymentMethod(selected);
    if (selected === "cod") {
      router.push("/checkout/gateway?method=cod");
    } else {
      router.push("/checkout/gateway");
    }
  };

  return (
    <>
      <section className="bg-gradient-to-br from-brand-cream to-orange-50 py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-3xl md:text-4xl font-extrabold text-brand-dark mb-2">
            Payment Method
          </h1>
          <p className="text-gray-500">Choose how you&apos;d like to pay</p>
        </div>
        <CheckoutSteps current={2} />
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Delivery summary */}
          <div className="bg-brand-cream/50 rounded-2xl p-5 mb-6 animate-fade-in-up">
            <div className="flex items-start gap-3">
              <span className="text-2xl">📍</span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-brand-dark text-sm">{address.fullName}</p>
                <p className="text-gray-500 text-sm">
                  {address.line1}{address.line2 ? `, ${address.line2}` : ""}, {address.city}, {address.state} — {address.pincode}
                </p>
                <p className="text-gray-400 text-xs mt-1">Phone: {address.phone}</p>
              </div>
              <button
                onClick={() => router.push("/checkout/address")}
                className="text-brand-orange text-sm font-medium hover:underline cursor-pointer whitespace-nowrap"
              >
                Change
              </button>
            </div>
          </div>

          {/* Payment options */}
          <div className="space-y-3 animate-fade-in-up stagger-1">
            {methods.map((method) => (
              <button
                key={method.id}
                onClick={() => { setSelected(method.id); setError(""); }}
                className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 transition-all duration-200 text-left cursor-pointer ${
                  selected === method.id
                    ? "border-brand-orange bg-orange-50 shadow-md shadow-orange-100"
                    : "border-orange-100 bg-white hover:border-orange-200 hover:bg-brand-cream/30"
                }`}
              >
                <span className="text-3xl">{method.icon}</span>
                <div className="flex-1">
                  <p className="font-semibold text-brand-dark">{method.label}</p>
                  <p className="text-gray-400 text-sm">{method.desc}</p>
                </div>
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    selected === method.id
                      ? "border-brand-orange bg-brand-orange"
                      : "border-gray-300"
                  }`}
                >
                  {selected === method.id && (
                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </button>
            ))}
          </div>

          {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

          {/* Total + Actions */}
          <div className="mt-8 bg-brand-cream/50 rounded-2xl p-5">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-500 font-medium">Order Total</span>
              <span className="text-2xl font-bold text-brand-orange">₹{totalPrice}</span>
            </div>
            <div className="flex gap-3">
              <Button variant="ghost" size="md" onClick={() => router.push("/checkout/address")}>
                Back
              </Button>
              <Button variant="primary" size="lg" className="flex-1" onClick={handleContinue}>
                {selected === "cod" ? "Confirm Order" : "Continue to Pay"}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
