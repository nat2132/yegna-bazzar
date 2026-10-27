import React from "react";
import Link from "next/link";
import { CATEGORIES, FEATURED_PRODUCTS } from "@/lib/products";

export default function Footer() {
  const cities = Array.from(new Set(FEATURED_PRODUCTS.map((p) => p.location.split(" · ")[0])));

  return (
    <footer className="mt-20 bg-espresso-900 text-espresso-100">
      <div className="tibeb-bar" aria-hidden />
      <div className="mx-auto grid max-w-8xl grid-cols-1 gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-espresso-800 font-ethiopic text-lg text-ochre-400">
              የ
            </span>
            <span className="font-display text-lg font-bold text-cream-50">Yegna Bazzar</span>
          </div>
          <p className="mt-3 max-w-[26ch] text-xs leading-relaxed text-espresso-100/70">
            A multi-vendor marketplace for Ethiopian coffee, crafts, textiles and food — built
            to connect local sellers directly with buyers.
          </p>
          <p className="mt-3 font-ethiopic text-xs text-ochre-400/90">ገበያው — from the makers of Addis to your door</p>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-cream-50/80">Shop</h3>
          <ul className="mt-4 space-y-2 text-sm text-espresso-100/80">
            {CATEGORIES.filter((c) => c.id !== "all").map((c) => (
              <li key={c.id}>
                <Link
                  href={`/search?category=${c.id}`}
                  className="transition-colors hover:text-ochre-400"
                >
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Sellers */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-cream-50/80">Sellers</h3>
          <ul className="mt-4 space-y-2 text-sm text-espresso-100/80">
            {Array.from(new Set(FEATURED_PRODUCTS.map((p) => p.vendor))).map((vendor) => (
              <li key={vendor}>{vendor}</li>
            ))}
          </ul>
        </div>

        {/* Honest status */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-cream-50/80">
            Marketplace status
          </h3>
          <ul className="mt-4 space-y-3 text-xs leading-relaxed text-espresso-100/70">
            <li className="flex gap-2">
              <span aria-hidden className="text-ochre-400">●</span>
              <span>
                <strong className="text-espresso-100">Payments:</strong> Telebirr / CBE Birr /
                Chapa are not connected yet — checkout runs as a demo.
              </span>
            </li>
            <li className="flex gap-2">
              <span aria-hidden className="text-ochre-400">●</span>
              <span>
                <strong className="text-espresso-100">Catalog:</strong> seed listings are live;
                vendor onboarding is in development.
              </span>
            </li>
            <li className="flex gap-2">
              <span aria-hidden className="text-ochre-400">●</span>
              <span>
                <strong className="text-espresso-100">Sellers active in:</strong>{" "}
                {cities.join(" · ")}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-espresso-700/60">
        <div className="mx-auto flex max-w-8xl flex-col gap-2 px-6 py-5 text-[11px] text-espresso-100/60 sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <p>© {new Date().getFullYear()} Yegna Bazzar · Made for the Ethiopian market</p>
          <p>
            All prices in Ethiopian Birr (<abbr title="Ethiopian Birr">ETB</abbr> / Br) ·{" "}
            <span className="font-ethiopic">በአማሪኛና በእንግሊዝኛ</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
