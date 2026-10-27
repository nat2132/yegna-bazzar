import React from "react";
import Link from "next/link";
import {
  CATEGORIES,
  FEATURED_PRODUCTS,
  formatBr,
} from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import ProductImage from "@/components/ProductImage";

const hero = FEATURED_PRODUCTS[0];
const handpicks = [FEATURED_PRODUCTS[1], FEATURED_PRODUCTS[2], FEATURED_PRODUCTS[5]];
const moreFromMarket = [FEATURED_PRODUCTS[3], FEATURED_PRODUCTS[4]];

const vendorCities = Array.from(new Set(FEATURED_PRODUCTS.map((p) => p.location.split(" · ")[0])));

export default function HomePage() {
  const vendorCount = new Set(FEATURED_PRODUCTS.map((p) => p.vendor)).size;

  return (
    <div>
      {/* ------------------------------------------------ Hero ----------------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-cream-100/60">
        {/* faint woven texture band — very restrained */}
        <div className="tibeb-bar-thin absolute inset-x-0 top-0 opacity-70" aria-hidden />
        <div className="mx-auto grid max-w-8xl grid-cols-1 items-center gap-12 px-6 pb-16 pt-14 lg:grid-cols-2 lg:px-10 lg:pb-20 lg:pt-20">
          <div className="min-w-0">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-berbere-600">
              <span className="inline-block h-2 w-2 rounded-full bg-berbere-600" />
              እንኳን ደህና መጡ — Welcome to the market
            </p>
            <h1 className="mt-4 font-display text-[2.1rem] font-bold leading-[1.12] tracking-tight text-espresso-900 sm:text-5xl">
              Authentic Ethiopian goods, from loom &amp; farm to your door.
            </h1>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-espresso-500">
              Single-origin Yirgacheffe coffee, handwoven habesha kemis, clay jebena sets, highland
              honey and fine leather — sold directly by the roasters, weavers and makers.
            </p>

            {/* Real search entry point */}
            <form action="/search" className="mt-7 flex max-w-xl overflow-hidden rounded-2xl border border-sand-300 bg-white/80 shadow-card focus-within:border-ochre-500 focus-within:ring-2 focus-within:ring-ochre-400/40">
              <label className="flex flex-1 items-center gap-2 px-4">
                <span className="text-espresso-300" aria-hidden>⌕</span>
                <input
                  type="search"
                  name="q"
                  placeholder="Search coffee, kemis, honey, vendors…"
                  className="w-full bg-transparent py-3.5 text-sm text-espresso-900 placeholder:text-espresso-300 focus:outline-none"
                />
              </label>
              <button
                type="submit"
                className="shrink-0 bg-espresso-800 px-6 text-sm font-bold text-cream-50 transition-colors hover:bg-espresso-700"
              >
                Search
              </button>
            </form>

            {/* Quick entry points */}
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-espresso-300">Popular:</span>
              {[
                { label: "Yirgacheffe coffee", href: `/search?category=coffee-spices` },
                { label: "Habesha kemis", href: `/search?q=kemis` },
                { label: "Honey", href: `/search?q=honey` },
                { label: "Jebena set", href: `/search?q=jebena` },
              ].map((t) => (
                <Link
                  key={t.label}
                  href={t.href}
                  className="rounded-lg border border-sand-300 bg-cream-50 px-2.5 py-1 font-medium text-espresso-500 transition-colors hover:border-ochre-500 hover:text-ochre-600"
                >
                  {t.label}
                </Link>
              ))}
            </div>

            {/* Honest market stats */}
            <dl className="mt-9 flex flex-wrap gap-x-10 gap-y-4">
              {[
                { n: String(FEATURED_PRODUCTS.length), l: "listings live" },
                { n: String(vendorCount), l: "independent sellers" },
                { n: String(vendorCities.length), l: "seller cities" },
                { n: "ETB", l: "all prices in Br" },
              ].map((s) => (
                <div key={s.l}>
                  <dt className="font-display text-3xl font-bold text-espresso-900">{s.n}</dt>
                  <dd className="mt-0.5 text-xs text-espresso-300">{s.l}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Featured listing card (a real product, not a stock mockup) */}
          <div className="relative min-w-0">
            <div className="overflow-hidden rounded-3xl border border-sand-300 bg-cream-50 shadow-card-hover">
              <Link href={`/product/${hero.id}`} className="group relative block">
                <ProductImage product={hero} className="aspect-[16/11] w-full" eager />
                <span className="absolute left-4 top-4 rounded-full bg-berbere-600 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-cream-50">
                  {hero.badge}
                </span>
              </Link>
              <div className="tibeb-bar-thin" aria-hidden />
              <Link
                href={`/product/${hero.id}`}
                className="flex items-center justify-between gap-4 px-6 py-5 transition-colors hover:bg-cream-100/60"
              >
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-ochre-600">
                    {hero.category} · <span className="font-ethiopic tracking-normal">ቡና</span>
                  </p>
                  <p className="mt-1 truncate font-semibold text-espresso-900">{hero.name}</p>
                  <p className="mt-0.5 text-xs text-espresso-300">
                    {hero.vendor} · {hero.location}
                  </p>
                </div>
                <span className="shrink-0 rounded-xl bg-espresso-800 px-4 py-2.5 text-sm font-bold text-cream-50">
                  {formatBr(hero.price)}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="tibeb-bar" aria-hidden />

      {/* ------------------------------------------------ Categories ------------------------------------------------------ */}
      <section className="mx-auto max-w-8xl px-6 pt-14 lg:px-10">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="font-ethiopic text-xs font-semibold tracking-wider text-ochre-600">ምድቦች</p>
            <h2 className="mt-1 font-display text-2xl font-bold text-espresso-900">Shop by category</h2>
          </div>
          <Link
            href="/search"
            className="text-xs font-semibold text-espresso-500 underline-offset-4 transition-colors hover:text-espresso-900 hover:underline"
          >
            Browse everything →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {CATEGORIES.filter((c) => c.id !== "all").map((c) => {
            const count = FEATURED_PRODUCTS.filter((p) => p.category === c.label).length;
            const sample = FEATURED_PRODUCTS.find((p) => p.category === c.label);
            return (
              <Link
                key={c.id}
                href={`/search?category=${c.id}`}
                className="group overflow-hidden rounded-2xl border border-sand-200 bg-cream-50 shadow-card transition-all hover:-translate-y-0.5 hover:border-ochre-400 hover:shadow-card-hover"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.fallback}
                  alt=""
                  className="h-24 w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                />
                <div className="p-3">
                  <p className="truncate text-sm font-semibold text-espresso-800">{c.label}</p>
                  <p className="mt-0.5 flex items-baseline justify-between text-xs text-espresso-300">
                    <span className="font-ethiopic text-ochre-600">{c.am}</span>
                    <span>{count} {count === 1 ? "item" : "items"}</span>
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ------------------------------------------------ Handpicks ------------------------------------------------------ */}
      <section className="mx-auto max-w-8xl px-6 pt-16 lg:px-10">
        <div className="mb-8 border-b border-sand-200 pb-5">
          <p className="font-ethiopic text-xs font-semibold tracking-wider text-ochre-600">
            የዚህ ሳምንት ምርጫ
          </p>
          <h2 className="mt-1 font-display text-2xl font-bold text-espresso-900">
            From the curators&apos; round this week
          </h2>
          <p className="mt-1 text-sm text-espresso-500">
            Hand-picked listings with the strongest reviews from real buyers.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Lead card with large horizontal layout */}
          <div className="min-w-0 lg:row-span-2">
            <ProductCard product={hero} variant="lead" eager />
          </div>
          <div className="grid min-w-0 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {handpicks.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ Vendor strip --------------------------------------------------- */}
      <section className="mx-auto max-w-8xl px-6 pt-16 lg:px-10">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 rounded-2xl border border-sand-200 bg-cream-100/60 px-6 py-5">
          <span className="font-ethiopic text-xs font-semibold text-ochre-700">ሻጮች በገበያው</span>
          <span className="text-xs uppercase tracking-wider text-espresso-300">Sellers on the market:</span>
          {Array.from(new Set(FEATURED_PRODUCTS.map((p) => `${p.vendor} — ${p.location}`))).map((v) => (
            <span
              key={v}
              className="rounded-lg border border-sand-300 bg-cream-50 px-2.5 py-1 text-xs font-medium text-espresso-500"
            >
              {v}
            </span>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------ Rest of the market ---------------------------------------------- */}
      <section className="mx-auto max-w-8xl px-6 pt-16 lg:px-10">
        <div className="mb-8 border-b border-sand-200 pb-5">
          <p className="font-ethiopic text-xs font-semibold tracking-wider text-ochre-600">
            ተጨማሪ ምርቶች
          </p>
          <h2 className="mt-1 font-display text-2xl font-bold text-espresso-900">More from the market</h2>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {moreFromMarket.map((p) => (
            <ProductCard key={p.id} product={p} variant="row" />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/search"
            className="inline-block rounded-xl border border-espresso-700 px-6 py-3 text-sm font-semibold text-espresso-700 transition-colors hover:bg-espresso-700 hover:text-cream-50"
          >
            See all listings
          </Link>
        </div>
      </section>

      {/* ------------------------------------------------ Honest trust band ----------------------------------------------- */}
      <section className="mx-auto mt-20 max-w-8xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-8 rounded-3xl border border-sand-200 bg-cream-100/60 px-8 py-10 sm:grid-cols-3">
          {[
            {
              title: "Direct from makers",
              body: "Coffee roasters, loom weavers, potters and beekeepers — no rescue middlemen in the listing chain.",
            },
            {
              title: "Ranked by buyers",
              body: "Every listing carries real buyer ratings, visible on the card before you tap.",
            },
            {
              title: "Clear pricing",
              body: "Prices shown in Ethiopian Birr upfront. If a listing sells by kilogram or set, the unit is with the price.",
            },
          ].map((t) => (
            <div key={t.title}>
              <div className="tibeb-bar-thin mb-4 w-10 rounded-full" aria-hidden />
              <h3 className="font-semibold text-espresso-900">{t.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-espresso-500">{t.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
