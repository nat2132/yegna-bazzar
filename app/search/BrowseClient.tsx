"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CATEGORIES, FEATURED_PRODUCTS } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import EmptyState from "@/components/EmptyState";

type SortKey = "featured" | "price-asc" | "price-desc" | "rating";

export default function BrowseClient() {
  const router = useRouter();
  const params = useSearchParams();

  const q0 = params.get("q") ?? "";
  const cat0 = params.get("category") ?? "all";

  const [q, setQ] = useState(q0);
  const [category, setCategory] = useState(cat0);
  const [sort, setSort] = useState<SortKey>("featured");

  // Stay in sync if the URL changes (header search, footer links, back button)
  useEffect(() => setQ(q0), [q0]);
  useEffect(() => setCategory(cat0), [cat0]);

  const pushUrl = (newQ: string, newCat: string) => {
    const search = new URLSearchParams();
    if (newQ.trim()) search.set("q", newQ.trim());
    if (newCat && newCat !== "all") search.set("category", newCat);
    const qs = search.toString();
    router.replace(qs ? `?${qs}` : "?", { scroll: false });
  };

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    let list = FEATURED_PRODUCTS.filter((p) => {
      const matchesCat = category === "all" || p.category === CATEGORIES.find((c) => c.id === category)?.label;
      const matchesSearch =
        !needle ||
        p.name.toLowerCase().includes(needle) ||
        p.vendor.toLowerCase().includes(needle) ||
        p.category.toLowerCase().includes(needle);
      return matchesCat && matchesSearch;
    });
    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
    }
    return list;
  }, [q, category, sort]);

  const activeCat = CATEGORIES.find((c) => c.id === category);
  const hasFilters = q.trim() !== "" || category !== "all";

  return (
    <div className="mx-auto max-w-8xl px-6 pt-10 lg:px-10">
      {/* Header row */}
      <div className="flex flex-col gap-5 border-b border-sand-200 pb-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-ethiopic text-xs font-semibold tracking-wider text-ochre-600">
            ፍለጋና ማጣሪያ
          </p>
          <h1 className="mt-1 font-display text-3xl font-bold text-espresso-900">
            Browse the market
          </h1>
          <p className="mt-1 text-sm text-espresso-500">
            {results.length} listing{results.length === 1 ? "" : "s"}
            {activeCat && category !== "all" ? ` in ${activeCat.label}` : ""}
            {q.trim() ? ` matching “${q.trim()}”` : ""}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              pushUrl(q, category);
            }}
            className="relative sm:w-72"
          >
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-espresso-300" aria-hidden>
              ⌕
            </span>
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search products or sellers…"
              className="w-full rounded-xl border border-sand-300 bg-white/80 py-2.5 pl-9 pr-4 text-sm text-espresso-900 placeholder:text-espresso-300 focus:border-ochre-500 focus:outline-none focus:ring-2 focus:ring-ochre-400/40"
            />
          </form>
          <label className="sr-only" htmlFor="sort">
            Sort listings
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-xl border border-sand-300 bg-white/80 px-3 py-2.5 text-sm text-espresso-900 focus:border-ochre-500 focus:outline-none"
          >
            <option value="featured">Featured first</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="rating">Highest rated</option>
          </select>
        </div>
      </div>

      {/* Category chips with Amharic labels */}
      <div className="mt-5 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {CATEGORIES.map((c) => {
          const active = category === c.id;
          return (
            <button
              key={c.id}
              onClick={() => {
                setCategory(c.id);
                pushUrl(q, c.id);
              }}
              className={`flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-semibold transition-all ${
                active
                  ? "border-espresso-800 bg-espresso-800 text-cream-50 shadow-card"
                  : "border-sand-300 bg-cream-50 text-espresso-500 hover:border-ochre-400 hover:text-espresso-900"
              }`}
            >
              <span className={`font-ethiopic ${active ? "text-ochre-400" : "text-ochre-600"}`}>{c.am}</span>
              {c.id !== "all" && <span className="hidden sm:inline">·</span>}
              <span className="hidden sm:inline">{c.label}</span>
            </button>
          );
        })}
        {hasFilters && (
          <button
            onClick={() => {
              setQ("");
              setCategory("all");
              setSort("featured");
              router.replace("?", { scroll: false });
            }}
            className="shrink-0 rounded-full border border-berbere-500/40 px-4 py-2 text-xs font-semibold text-berbere-600 transition-colors hover:bg-berbere-600 hover:text-cream-50"
          >
            ✕ Clear filters
          </button>
        )}
      </div>

      {/* Results */}
      {results.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-6 pb-16 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="mt-10 pb-16">
          <EmptyState />
        </div>
      )}
    </div>
  );
}
