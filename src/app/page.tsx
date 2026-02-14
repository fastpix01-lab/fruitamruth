"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "@/components/Button";
import ProductCard from "@/components/ProductCard";
import { fetchProducts } from "@/lib/api";
import type { Product } from "@/lib/types";

const stats = [
  { value: "100%", label: "Natural Ingredients" },
  { value: "50+", label: "Juice Varieties" },
  { value: "10K+", label: "Happy Customers" },
  { value: "0%", label: "Preservatives" },
];

export default function HomePage() {
  const [featured, setFeatured] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const products = await fetchProducts();
        setFeatured(products.slice(0, 4));
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-cream via-white to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <span className="inline-block bg-brand-orange/10 text-brand-orange font-semibold text-sm px-4 py-2 rounded-full mb-6">
                100% Fresh &amp; Natural
              </span>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-dark leading-tight mb-6">
                Nature&apos;s Best,{" "}
                <span className="text-brand-orange">Squeezed Fresh</span>{" "}
                For You
              </h1>
              <p className="text-gray-500 text-lg md:text-xl leading-relaxed mb-8 max-w-lg">
                Handcrafted juices made from farm-fresh fruits. No sugar, no
                preservatives — just pure, delicious goodness in every glass.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/menu">
                  <Button variant="primary" size="lg">
                    Explore Menu
                  </Button>
                </Link>
                <Link href="/order">
                  <Button variant="outline" size="lg">
                    Order Now
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative flex justify-center animate-fade-in-up stagger-2">
              <div className="relative">
                <div className="w-72 h-72 md:w-96 md:h-96 bg-gradient-to-br from-brand-orange to-brand-mango rounded-full flex items-center justify-center shadow-2xl shadow-orange-200">
                  <span className="text-[120px] md:text-[160px] animate-bounce">
                    🍊
                  </span>
                </div>
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-brand-green rounded-full flex items-center justify-center shadow-lg animate-bounce stagger-3">
                  <span className="text-3xl">🥝</span>
                </div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-brand-mango rounded-full flex items-center justify-center shadow-lg animate-bounce stagger-4">
                  <span className="text-2xl">🍋</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" className="w-full">
            <path
              d="M0 50C360 0 720 100 1440 50V100H0V50Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-3xl md:text-4xl font-extrabold text-brand-orange mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-500 text-sm font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Juices */}
      <section className="py-16 md:py-24 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block bg-brand-green/10 text-brand-green font-semibold text-sm px-4 py-2 rounded-full mb-4">
              Our Favorites
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-dark">
              Featured Juices
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              Our most loved flavors, picked by our community of juice lovers.
            </p>
          </div>
          {loading ? (
            <div className="text-center py-12">
              <span className="text-4xl animate-bounce inline-block">🍊</span>
              <p className="text-gray-400 mt-4">Loading fresh juices...</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featured.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          <div className="text-center mt-10">
            <Link href="/menu">
              <Button variant="outline" size="lg">
                View Full Menu
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-dark">
              Why Fruit Amruth?
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "🍎",
                title: "100% Natural",
                desc: "We use only fresh, seasonal fruits. No artificial flavors, colors, or preservatives.",
              },
              {
                icon: "⚡",
                title: "Made Fresh Daily",
                desc: "Every juice is prepared fresh when you order. Maximum nutrition, maximum taste.",
              },
              {
                icon: "🌱",
                title: "Sustainably Sourced",
                desc: "We work directly with local farmers to bring you the freshest produce.",
              },
              {
                icon: "💪",
                title: "Nutrient-Rich",
                desc: "Cold-pressed to retain all vitamins, minerals, and enzymes.",
              },
              {
                icon: "🚚",
                title: "Fast Delivery",
                desc: "Order online and get your fresh juice delivered within 30 minutes.",
              },
              {
                icon: "❤️",
                title: "Made with Love",
                desc: "Every glass is crafted with passion by our expert juice artisans.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="text-center p-8 rounded-2xl hover:bg-brand-cream transition-colors duration-300 group"
              >
                <span className="text-5xl block mb-4 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </span>
                <h3 className="font-display font-bold text-lg text-brand-dark mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-brand-orange to-brand-mango">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6">
            Ready for a Fresh Start?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of health-conscious people who start their day with
            Fruit Amruth. Order now and taste the difference.
          </p>
          <Link href="/menu">
            <Button
              variant="ghost"
              size="lg"
              className="!bg-white !text-brand-orange hover:!bg-orange-50 !shadow-lg"
            >
              Order Your Juice Today
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
