"use client";

import React from "react";
import ProductImage from "./ProductImage";
import { useCart } from "./CartProvider";
import { formatBr } from "@/lib/products";

export default function ProductCard({
  product,
  variant = "grid",
  eager = false,
}: {
  product: import("@/lib/products").Product;
  variant?: "grid" | "lead" | "row";
  eager?: boolean;
}) {
  const { add, setOpen } = useCart();
  const categoryAm = {
    "Coffee & Spices": "ቡና",
    "Fashion & Cultural": "ልብስ",
    "Leather Goods": "ቆዳ",
    "Home & Culture": "ቤት እቃ",
    "Organic Foods": "ማር",
    Jewelry: "ጌጣ",
  }[product.category];

  const lowStock = product.stock <= 4;
  const outOfStock = product.stock <= 0;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    add(product);
    setOpen(true);
  };

  if (variant === "row") {
    return (
      <article className="group flex items-center gap-4 rounded-2xl border border-sand-200 bg-cream-50 p-3 shadow-card transition-shadow hover:shadow-card-hover">
        <a href={`/product/${product.id}`} className="shrink-0">
          <ProductImage product={product} className="h-20 w-20 rounded-xl" eager={eager} />
        </a>
        <div className="min-w-0 flex-1">
          <a
            href={`/product/${product.id}`}
            className="line-clamp-1 text-sm font-semibold text-espresso-800 hover:underline decoration-ochre-400 decoration-2 underline-offset-2"
          >
            {product.name}
          </a>
          <p className="mt-0.5 text-xs text-espresso-300">{product.vendor}</p>
          <div className="mt-1.5 flex items-center gap-2">
            <span className="text-sm font-bold text-espresso-800">{formatBr(product.price)}</span>
            {lowStock && !outOfStock && (
              <span className="text-[11px] font-semibold text-berbere-600">{`Only ${product.stock} left`}</span>
            )}
          </div>
        </div>
        <button
          onClick={handleAdd}
          disabled={outOfStock}
          className="shrink-0 rounded-lg border border-espresso-700 px-3 py-2 text-xs font-semibold text-espresso-700 transition-colors hover:bg-espresso-700 hover:text-cream-50 disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-espresso-700"
        >
          Add
        </button>
      </article>
    );
  }

  if (variant === "lead") {
    return (
      <article className="group h-full overflow-hidden rounded-3xl border border-sand-200 bg-cream-50 shadow-card transition-shadow hover:shadow-card-hover md:flex md:items-stretch">
        <a href={`/product/${product.id}`} className="relative block md:w-1/2">
          <ProductImage
            product={product}
            className="h-56 w-full md:h-full md:min-h-[20rem]"
            eager={eager}
          />
          {product.badge && (
            <span className="absolute left-4 top-4 rounded-full bg-berbere-600 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-cream-50">
              {product.badge}
            </span>
          )}
        </a>
        <div className="flex min-w-0 flex-1 flex-col p-6 md:w-1/2 md:justify-center md:p-8">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ochre-600">
            {product.category}
            {categoryAm && <span className="font-ethiopic tracking-normal">{categoryAm}</span>}
          </p>
          <a href={`/product/${product.id}`}>
            <h3 className="mt-2 font-display text-2xl leading-snug text-espresso-900 hover:underline decoration-ochre-400 decoration-2 underline-offset-4">
              {product.name}
            </h3>
          </a>
          <p className="mt-3 text-sm leading-relaxed text-espresso-500">{product.blurb}</p>
          <div className="mt-5 flex items-end justify-between gap-4">
            <div>
              <span className="text-2xl font-bold text-espresso-900">
                {formatBr(product.price)}
              </span>
              <p className="mt-0.5 text-xs text-espresso-300">
                ★ {product.rating} · {product.vendor}
              </p>
            </div>
            <button
              onClick={handleAdd}
              disabled={outOfStock}
              className="rounded-xl bg-berbere-600 px-5 py-3 text-sm font-bold text-cream-50 shadow-card transition-colors hover:bg-berbere-700 disabled:opacity-40"
            >
              {outOfStock ? "Sold out" : "Add to cart"}
            </button>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-sand-200 bg-cream-50 shadow-card transition-all hover:shadow-card-hover hover:-translate-y-0.5">
      <a href={`/product/${product.id}`} className="relative block">
        <ProductImage product={product} className="aspect-[4/3] w-full" eager={eager} />
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-berbere-600 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-cream-50">
            {product.badge}
          </span>
        )}
        <span className="absolute right-3 top-3 rounded-full border border-sand-200 bg-cream-50/95 px-2 py-0.5 text-xs font-semibold text-ochre-600">
          ★ {product.rating}
        </span>
      </a>

      <div className="flex min-w-0 flex-1 flex-col p-5">
        <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-ochre-600">
          {product.category}
          {categoryAm && <span className="font-ethiopic text-espresso-300 tracking-normal">{categoryAm}</span>}
        </p>
        <a
          href={`/product/${product.id}`}
          className="mt-1 line-clamp-2 text-[15px] font-semibold leading-snug text-espresso-800 hover:underline decoration-ochre-400 decoration-2 underline-offset-2"
        >
          {product.name}
        </a>
        <p className="mt-1.5 truncate text-xs text-espresso-300">
          {product.vendor} · {product.location}
        </p>

        <div className="mt-4 flex items-center justify-between border-t border-sand-200 pt-4">
          <div>
            <span className="block text-lg font-bold text-espresso-900">
              {formatBr(product.price)}
            </span>
            {product.unit && <span className="text-[11px] text-espresso-300">per {product.unit}</span>}
          </div>
          <button
            onClick={handleAdd}
            disabled={outOfStock}
            className="rounded-lg bg-berbere-600 px-4 py-2.5 text-xs font-bold text-cream-50 transition-colors hover:bg-berbere-700 disabled:opacity-40"
          >
            {outOfStock ? "Sold out" : lowStock ? `Add · ${product.stock} left` : "Add to cart"}
          </button>
        </div>
      </div>
    </article>
  );
}
