"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCheckout } from "@/context/CheckoutContext";
import Button from "@/components/Button";
import CheckoutSteps from "@/components/CheckoutSteps";

export default function SuccessPage() {
  const router = useRouter();
  const { paymentComplete, customerName, address, paymentMethod, resetCheckout } = useCheckout();

  useEffect(() => {
    if (!paymentComplete) {
      router.replace("/order");
    }
  }, [paymentComplete, router]);

  if (!paymentComplete) return null;

  const methodLabels: Record<string, string> = {
    upi: "UPI",
    card: "Card",
    cod: "Cash on Delivery",
  };

  const handleBackToHome = () => {
    resetCheckout();
  };

  return (
    <>
      <section className="bg-gradient-to-br from-brand-cream to-orange-50 py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-3xl md:text-4xl font-extrabold text-brand-dark mb-2">
            Order Confirmed
          </h1>
        </div>
        <CheckoutSteps current={4} />
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-scale-in">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-5xl">🎉</span>
            </div>

            <h2 className="font-display text-2xl md:text-3xl font-extrabold text-brand-dark mb-3">
              Thank you, {customerName}!
            </h2>
            <p className="text-gray-500 text-lg mb-2">
              Your order has been placed successfully.
            </p>
            <p className="text-gray-400 text-sm mb-8">
              A confirmation email will be sent to your inbox shortly.
            </p>

            {/* Order details card */}
            <div className="bg-brand-cream/60 rounded-2xl p-6 text-left mb-8 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">Order ID</span>
                <span className="font-mono text-sm font-medium text-brand-dark">
                  #FA-{Date.now().toString(36).toUpperCase()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">Payment</span>
                <span className="text-sm font-medium text-brand-dark">
                  {paymentMethod ? methodLabels[paymentMethod] : "—"}
                </span>
              </div>
              {address && (
                <div>
                  <span className="text-gray-500 text-sm block mb-1">Delivering to</span>
                  <p className="text-brand-dark text-sm font-medium">{address.fullName}</p>
                  <p className="text-gray-500 text-sm">
                    {address.line1}{address.line2 ? `, ${address.line2}` : ""}, {address.city} — {address.pincode}
                  </p>
                </div>
              )}
              <div className="flex justify-between items-center pt-3 border-t border-orange-200">
                <span className="text-gray-500 text-sm">Estimated Delivery</span>
                <span className="text-sm font-bold text-brand-green">25 - 30 mins</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/menu" onClick={handleBackToHome}>
                <Button variant="primary" size="lg">
                  Order More Juices
                </Button>
              </Link>
              <Link href="/" onClick={handleBackToHome}>
                <Button variant="outline" size="lg">
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
