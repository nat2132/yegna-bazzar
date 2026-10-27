"use client";

import { useState } from "react";
import { fallbackFor, type Product } from "@/lib/products";

/**
 * Product imagery with an elegant local fallback:
 * if the photo can't load (offline, broken URL, removed asset) we swap to a
 * category-tinted Ethiopian illustration shipped in /public/fallback —
 * never a broken link icon.
 */
export default function ProductImage({
  product,
  alt,
  className = "",
  eager = false,
}: {
  product: Product;
  alt?: string;
  className?: string;
  eager?: boolean;
}) {
  const [current, setCurrent] = useState(product.image);
  const [loaded, setLoaded] = useState(false);

  const handleError = () => {
    setCurrent(fallbackFor(product.category));
    setLoaded(true);
  };

  return (
    <div className={`relative overflow-hidden bg-sand-100 ${className}`}>
      {!loaded && <div className="absolute inset-0 shimmer" aria-hidden />}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={current}
        alt={alt ?? product.name}
        loading={eager ? "eager" : "lazy"}
        onError={handleError}
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
