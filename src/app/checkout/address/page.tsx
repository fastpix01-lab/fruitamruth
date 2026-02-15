"use client";

import { useState, useEffect, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useCheckout, type Address } from "@/context/CheckoutContext";
import Button from "@/components/Button";
import CheckoutSteps from "@/components/CheckoutSteps";

const emptyAddress: Address = {
  fullName: "",
  phone: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  pincode: "",
};

export default function AddressPage() {
  const router = useRouter();
  const { items } = useCart();
  const { customerName, address: savedAddress, setAddress } = useCheckout();
  const [form, setForm] = useState<Address>(savedAddress ?? emptyAddress);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!customerName || items.length === 0) {
      router.replace("/order");
    }
  }, [customerName, items, router]);

  if (!customerName || items.length === 0) return null;

  const update = (field: keyof Address, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.fullName.trim() || !form.phone.trim() || !form.line1.trim() || !form.city.trim() || !form.state.trim() || !form.pincode.trim()) {
      setError("Please fill in all required fields.");
      return;
    }
    if (!/^\d{10}$/.test(form.phone.trim())) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }
    if (!/^\d{6}$/.test(form.pincode.trim())) {
      setError("Please enter a valid 6-digit pincode.");
      return;
    }
    setAddress({
      fullName: form.fullName.trim(),
      phone: form.phone.trim(),
      line1: form.line1.trim(),
      line2: form.line2.trim(),
      city: form.city.trim(),
      state: form.state.trim(),
      pincode: form.pincode.trim(),
    });
    router.push("/checkout/payment");
  };

  return (
    <>
      <section className="bg-gradient-to-br from-brand-cream to-orange-50 py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-3xl md:text-4xl font-extrabold text-brand-dark mb-2">
            Delivery Address
          </h1>
          <p className="text-gray-500">Where should we deliver your juices?</p>
        </div>
        <CheckoutSteps current={1} />
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-brand-cream/50 rounded-2xl p-6 md:p-8 animate-fade-in-up">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-brand-dark mb-1.5">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.fullName}
                    onChange={(e) => update("fullName", e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-xl border border-orange-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-sm bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-dark mb-1.5">
                    Phone Number <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    placeholder="9876543210"
                    maxLength={10}
                    className="w-full px-4 py-3 rounded-xl border border-orange-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-sm bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-dark mb-1.5">
                  Address Line 1 <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={form.line1}
                  onChange={(e) => update("line1", e.target.value)}
                  placeholder="House no, Building, Street"
                  className="w-full px-4 py-3 rounded-xl border border-orange-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-sm bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-dark mb-1.5">
                  Address Line 2
                </label>
                <input
                  type="text"
                  value={form.line2}
                  onChange={(e) => update("line2", e.target.value)}
                  placeholder="Landmark, Area (optional)"
                  className="w-full px-4 py-3 rounded-xl border border-orange-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-sm bg-white"
                />
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-brand-dark mb-1.5">
                    City <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.city}
                    onChange={(e) => update("city", e.target.value)}
                    placeholder="Hyderabad"
                    className="w-full px-4 py-3 rounded-xl border border-orange-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-sm bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-dark mb-1.5">
                    State <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.state}
                    onChange={(e) => update("state", e.target.value)}
                    placeholder="Telangana"
                    className="w-full px-4 py-3 rounded-xl border border-orange-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-sm bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-dark mb-1.5">
                    Pincode <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.pincode}
                    onChange={(e) => update("pincode", e.target.value)}
                    placeholder="500034"
                    maxLength={6}
                    className="w-full px-4 py-3 rounded-xl border border-orange-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-sm bg-white"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="ghost"
                  size="md"
                  onClick={() => router.push("/order")}
                >
                  Back to Cart
                </Button>
                <Button type="submit" variant="primary" size="lg" className="flex-1">
                  Save &amp; Continue
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
