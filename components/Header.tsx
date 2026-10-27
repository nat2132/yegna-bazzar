"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useCart } from "./CartProvider";
import { CATEGORIES } from "@/lib/products";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { count, setOpen } = useCart();
  const [q, setQ] = useState("");

  useEffect(() => {
    if (pathname === "/search") setQ(searchParams.get("q") ?? "");
  }, [pathname, searchParams]);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = q.trim();
    router.push(query ? `/search?q=${encodeURIComponent(query)}` : "/search");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-sand-200 bg-cream-50/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-8xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-10">
        {/* Brand */}
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-espresso-800 font-ethiopic text-xl font-semibold text-ochre-400">
            የ
          </span>
          <span className="hidden min-[420px]:block">
            <span className="flex items-baseline gap-1.5">
              <span className="font-display text-lg font-bold tracking-tight text-espresso-900">
                Yegna Bazzar
              </span>
              <span className="font-ethiopic text-[11px] text-ochre-600">የኛ ባዛር</span>
            </span>
            <span className="block text-[10px] uppercase tracking-[0.12em] text-espresso-300">
              Ethiopia&apos;s multi-vendor marketplace
            </span>
          </span>
        </Link>

        {/* Search (desktop) */}
        <form onSubmit={submitSearch} className="ml-auto hidden flex-1 justify-end md:block md:max-w-md">
          <label className="relative block">
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-espresso-300">
              ⌕
            </span>
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search coffee, kemis, honey, vendors…"
              className="w-full rounded-xl border border-sand-300 bg-white/70 py-2.5 pl-9 pr-4 text-sm text-espresso-900 placeholder:text-espresso-300 focus:border-ochre-500 focus:outline-none focus:ring-2 focus:ring-ochre-400/40 transition"
            />
          </label>
        </form>

        {/* Actions */}
        <div className="ml-auto flex items-center gap-2 md:ml-3">
          <button
            onClick={() => setOpen(true)}
            className="relative flex items-center gap-2 rounded-xl bg-espresso-800 px-4 py-2.5 text-xs font-bold text-cream-50 transition-colors hover:bg-espresso-700"
          >
            <span aria-hidden>🛍</span>
            <span className="hidden sm:inline">Cart</span>
            {count > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-berbere-600 px-1 text-[10px] font-bold text-cream-50 ring-2 ring-cream-50">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile search row */}
      <div className="px-4 pb-3 md:hidden">
        <form onSubmit={submitSearch}>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search the market…"
            className="w-full rounded-xl border border-sand-300 bg-white/70 px-4 py-2.5 text-sm text-espresso-900 placeholder:text-espresso-300 focus:border-ochre-500 focus:outline-none focus:ring-2 focus:ring-ochre-400/40 transition"
          />
        </form>
      </div>

      {/* Category strip (all sizes; scrolls horizontally on mobile) */}
      <nav className="border-t border-sand-200/70">
        <div className="mx-auto flex max-w-8xl gap-1.5 overflow-x-auto px-4 py-2 scrollbar-none sm:px-6 lg:px-10">
          {CATEGORIES.filter((c) => c.id !== "all").map((c) => (
            <Link
              key={c.id}
              href={`/search?category=${c.id}`}
              className="group flex shrink-0 items-baseline gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-espresso-500 transition-colors hover:bg-sand-100 hover:text-espresso-900"
            >
              <span className="font-ethiopic text-ochre-600 group-hover:text-ochre-700">{c.am}</span>
              <span className="hidden sm:inline">{c.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
