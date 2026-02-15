"use client";

const steps = [
  { label: "Cart", icon: "🛒" },
  { label: "Address", icon: "📍" },
  { label: "Payment", icon: "💳" },
  { label: "Pay", icon: "🔐" },
  { label: "Done", icon: "✅" },
];

export default function CheckoutSteps({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2 py-8">
      {steps.map((step, i) => (
        <div key={step.label} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-lg sm:text-xl transition-all duration-300 ${
                i < current
                  ? "bg-brand-green text-white shadow-md shadow-green-200"
                  : i === current
                  ? "bg-brand-orange text-white shadow-lg shadow-orange-200 scale-110"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              {i < current ? "✓" : step.icon}
            </div>
            <span
              className={`text-[10px] sm:text-xs mt-1.5 font-medium ${
                i <= current ? "text-brand-dark" : "text-gray-400"
              }`}
            >
              {step.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={`w-6 sm:w-12 h-0.5 mx-1 sm:mx-2 mb-5 transition-all duration-300 ${
                i < current ? "bg-brand-green" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
