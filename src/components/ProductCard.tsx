"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/lib/types";
import Button from "./Button";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const hasImage = product.image_url && product.image_url.startsWith("http");

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-orange-50 overflow-hidden transition-all duration-300 hover:-translate-y-1 flex flex-col">
      {/* Image Area */}
      <div className="relative bg-gradient-to-br from-brand-cream to-orange-50 p-8 flex items-center justify-center min-h-[180px]">
        {hasImage ? (
          <Image
            src={product.image_url!}
            alt={product.name}
            width={160}
            height={160}
            className="object-contain group-hover:scale-110 transition-transform duration-300 rounded-lg"
          />
        ) : (
          <span className="text-7xl group-hover:scale-110 transition-transform duration-300">
            🧃
          </span>
        )}
        {product.category && (
          <span className="absolute top-3 right-3 bg-brand-orange text-white text-xs font-bold px-3 py-1 rounded-full">
            {product.category.name}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-display font-bold text-brand-dark text-lg">
            {product.name}
          </h3>
          <span className="text-brand-orange font-bold text-lg whitespace-nowrap ml-2">
            ₹{product.price}
          </span>
        </div>
        <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1">
          {product.description}
        </p>
        <Button
          variant="primary"
          size="sm"
          onClick={() => addToCart(product)}
          className="w-full"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
