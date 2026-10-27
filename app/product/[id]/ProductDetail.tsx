"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import ProductImage from "@/components/ProductImage";
import ProductCard from "@/components/ProductCard";
import {
  CATEGORIES,
  FEATURED_PRODUCTS,
  categoryFor,
  formatBr,
  stockLabel,
  stockState,
} from "@/lib/products";

export default function ProductDetail({ product }: { product: import("@/lib/products").Product }) {
  const { add, setOpen } = useCart();
  const [qty, setQty] = useState(1);
  const cat = categoryFor(product.category);

  const state = stockState(product);
  const maxQty = Math.max(product.stock, 1);

  // Related: same category first, top-rated to fill the rest.
  const related = FEATURED_PRODUCTS.filter((p) => p.id !== product.id)
    .sort((a, b) => (a.category === product.category ? -1 : 1) - (b.category === product.category ? -1 : 1) || b.rating - a.rating)
    .slice(0, 3);

  const handleAdd = () => {
    add(product, qty);
    setOpen(true);
  };

  return (
    <div className="mx-auto max-w-8xl px-6 pt-8 lg:px-10">
      {/* Breadcrumb */}
      <nav className="flex flex-wrap items-center gap-1.5 text-xs text-espresso-300">
        <Link href="/" className="hover:text-espresso-700 hover:underline underline-offset-2">
          Home
        </Link>
        <span aria-hidden>/</span>
        <Link
          href={`/search?category=${cat?.id ?? "all"}`}
          className="hover:text-espresso-700 hover:underline underline-offset-2"
        >
          {product.category}
          {cat && <span className="ml-1 font-ethiopic text-ochre-600">{cat.am}</span>}
        </Link>
        <span aria-hidden>/</span>
        <span className="max-w-[28ch] truncate text-espresso-500">{product.name}</span>
      </nav>

      <div className="mt-6 grid grid-cols-1 gap-10 pb-16 lg:grid-cols-2">
        {/* Image */}
        <div className="min-w-0">
          <div className="overflow-hidden rounded-3xl border border-sand-200 bg-cream-50 shadow-card">
            <ProductImage product={product} className="aspect-[4/3] w-full" eager />
            <div className="tibeb-bar-thin" aria-hidden />
          </div>
          <p className="mb-4 text-center text-[11px] text-espresso-300">
            Listing imagery — photography and illustrated Ethiopian motifs
          </p>
        </div>

        {/* Details */}
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-ochre-100 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-ochre-700">
              {product.category}
            </span>
            {product.badge && (
              <span className="rounded-full bg-berbere-600 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-cream-50">
                {product.badge}
              </span>
            )}
            <span
              className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                state === "out"
                  ? "bg-berbere-100 text-berbere-700"
                  : state === "low"
                    ? "bg-berbere-100 text-berbere-600"
                    : "bg-leaf-600/10 text-leaf-700"
              }`}
            >
              {stockLabel(product)}
            </span>
          </div>

          <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-espresso-900">
            {product.name}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-espresso-500">
            <span className="font-semibold text-ochre-600">★ {product.rating}</span>
            <span className="text-espresso-300">·</span>
            <span>
              Sold by <strong className="font-semibold text-espresso-800">{product.vendor}</strong>
            </span>
            <span className="text-espresso-300">·</span>
            <span>{product.location}</span>
          </div>

          <div className="mt-6 flex items-end gap-2 border-y border-sand-200 py-5">
            <span className="font-display text-4xl font-bold text-espresso-900">
              {formatBr(product.price)}
            </span>
            {product.unit && (
              <span className="pb-1.5 text-sm text-espresso-300">per {product.unit}</span>
            )}
            <span className="ml-auto pb-1 text-[11px] font-medium uppercase tracking-wider text-espresso-300">
              ETB · Ethiopian Birr
            </span>
          </div>

          {/* Add to cart */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-xl border border-sand-300 bg-white/70">
              <button
                onClick={() => setQty((v) => Math.max(1, v - 1))}
                className="px-4 py-3 text-espresso-500 transition-colors hover:text-espresso-900"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="min-w-[3ch] text-center text-sm font-bold text-espresso-900">{qty}</span>
              <button
                onClick={() => setQty((v) => Math.min(maxQty, v + 1))}
                className="px-4 py-3 text-espresso-500 transition-colors hover:text-espresso-900"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            <button
              onClick={handleAdd}
              disabled={state === "out"}
              className="flex-1 rounded-xl bg-berbere-600 px-8 py-3.5 text-sm font-bold text-cream-50 shadow-card transition-colors hover:bg-berbere-700 disabled:cursor-not-allowed disabled:opacity-40 sm:flex-none"
            >
              {state === "out" ? "Sold out" : `Add ${qty} to cart · ${formatBr(product.price * qty)}`}
            </button>
          </div>
          <p className="mt-3 flex items-start gap-1.5 text-[11px] leading-relaxed text-espresso-300">
            <span aria-hidden>ℹ</span>
            Orders run through a demo checkout — payment providers (Telebirr / CBE Birr / Chapa)
            are not connected yet.
          </p>

          {/* Seller card */}
          <div className="mt-8 rounded-2xl border border-sand-200 bg-cream-100/60 p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-espresso-800 text-sm font-bold text-ochre-400">
                {product.vendor
                  .split(" ")
                  .map((w) => w[0])
                  .slice(0, 2)
                  .join("")}
              </span>
              <div>
                <p className="text-sm font-bold text-espresso-900">{product.vendor}</p>
                <p className="text-xs text-espresso-300">{product.location}</p>
              </div>
              <Link
                href={`/search?q=${encodeURIComponent(product.vendor)}`}
                className="ml-auto shrink-0 rounded-lg border border-espresso-700 px-3 py-1.5 text-xs font-semibold text-espresso-700 transition-colors hover:bg-espresso-700 hover:text-cream-50"
              >
                All listings
              </Link>
            </div>
            <p className="mt-3 border-t border-sand-200 pt-3 text-xs leading-relaxed text-espresso-500">
              Independent seller on Yegna Bazzar. Arrange hand-over or delivery with the seller
              after the (demo) order — pickup logistics aren&apos;t automated yet.
            </p>
          </div>

          {/* Description */}
          <div className="mt-8">
            <h2 className="font-display text-lg font-bold text-espresso-900">
              About this listing <span className="font-ethiopic text-xs font-normal text-ochre-600">ዝርዝር</span>
            </h2>
            <p className="mt-2.5 text-sm leading-relaxed text-espresso-500">{product.blurb}</p>
          </div>
        </div>
      </div>

      {/* Related */}
      <section className="border-t border-sand-200 pt-10 pb-16">
        <h2 className="font-display text-2xl font-bold text-espresso-900">More like this</h2>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
