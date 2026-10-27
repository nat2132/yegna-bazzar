"use client";

import React from "react";
import Link from "next/link";
import { useCart, type CartItem } from "./CartProvider";
import ProductImage from "./ProductImage";
import { formatBr, stockState } from "@/lib/products";

export default function CartDrawer() {
  const { items, total, open, setOpen, setQty, remove, clear, demoOrdered, orderDemo } = useCart();
  const [placing, setPlacing] = React.useState(false);

  React.useEffect(() => {
    if (!open) setPlacing(false);
  }, [open]);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) {
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }
  }, [open, setOpen]);

  const handleOrder = () => {
    setPlacing(true);
    window.setTimeout(() => {
      setPlacing(false);
      // Passport-level honesty: there is no payment/order backend yet.
      orderDemo();
    }, 700);
  };

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-200 ${
        open ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-hidden={!open}
    >
      <div
        className="absolute inset-0 bg-espresso-900/50 backdrop-blur-[2px]"
        onClick={() => setOpen(false)}
      />
      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-cream-50 shadow-card-hover transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-label="Shopping cart"
      >
        {/* Head */}
        <div className="flex items-center justify-between border-b border-sand-200 px-6 py-4">
          <h2 className="flex items-baseline gap-2 font-display text-lg font-bold text-espresso-900">
            Your basket
            <span className="font-ethiopic text-xs text-ochre-600">ቅርጫት</span>
          </h2>
          <button
            onClick={() => setOpen(false)}
            className="rounded-lg p-1.5 text-espresso-300 transition-colors hover:bg-sand-100 hover:text-espresso-700"
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-sand-300 bg-sand-100 font-ethiopic text-2xl text-ochre-600">
                ቅ
              </div>
              <p className="font-semibold text-espresso-800">Your basket is empty</p>
              <p className="mt-1 max-w-[16rem] text-xs leading-relaxed text-espresso-300">
                Browse single-origin coffee, handwoven kemis, honey and more from Ethiopian sellers.
              </p>
              <button
                onClick={() => setOpen(false)}
                className="mt-5 rounded-lg border border-espresso-700 px-4 py-2 text-xs font-semibold text-espresso-700 transition-colors hover:bg-espresso-700 hover:text-cream-50"
              >
                Continue browsing
              </button>
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map((item) => (
                <CartRow key={item.product.id} item={item} onQty={setQty} onRemove={remove} />
              ))}
            </ul>
          )}
        </div>

        {/* Summary */}
        {items.length > 0 && (
          <div className="border-t border-sand-200 bg-cream-100/60 px-6 py-5">
            {demoOrdered && (
              <div className="mb-4 rounded-xl border border-leaf-600/40 bg-leaf-600/10 px-4 py-3 text-xs leading-relaxed text-leaf-700">
                <strong>Demo order confirmed.</strong> Payment (Telebirr / CBE Birr / Chapa) isn&apos;t
                connected yet, so nothing was charged. The notice clears in a few seconds.
              </div>
            )}
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-semibold text-espresso-500">Subtotal</span>
              <span className="text-xl font-bold text-espresso-900">{formatBr(total)}</span>
            </div>
            <p className="mt-1 text-[11px] text-espresso-300">
              Prices in Ethiopian Birr (ETB). Delivery is arranged with the seller — not
              calculated at checkout yet.
            </p>
            <button
              onClick={handleOrder}
              className="mt-4 w-full rounded-xl bg-berbere-600 py-3.5 text-sm font-bold text-cream-50 shadow-card transition-colors hover:bg-berbere-700 disabled:cursor-wait disabled:opacity-60"
            >
              {placing ? "Placing demo order…" : "Place order · demo checkout"}
            </button>
            <p className="mt-2.5 flex items-start gap-1.5 text-[11px] leading-relaxed text-espresso-300">
              <span aria-hidden>ℹ</span>
              Payment providers (Telebirr / CBE Birr / Chapa) are not connected yet — this
              checkout is a design preview and won&apos;t bill anything.
            </p>
          </div>
        )}
      </aside>
    </div>
  );
}

function CartRow({
  item,
  onQty,
  onRemove,
}: {
  item: CartItem;
  onQty: (id: number, qty: number) => void;
  onRemove: (id: number) => void;
}) {
  const { product, qty } = item;
  const max = Math.max(product.stock, 1);
  const state = stockState(product);

  return (
    <li className="flex gap-3 rounded-2xl border border-sand-200 bg-white/70 p-3">
      <ProductImage product={product} className="h-16 w-16 shrink-0 rounded-xl" />
      <div className="min-w-0 flex-1">
        <p className="line-clamp-1 text-sm font-semibold text-espresso-800">{product.name}</p>
        <p className="mt-0.5 text-xs text-espresso-300">
          {formatBr(product.price)} {product.unit ? `· per ${product.unit}` : ""}
        </p>
        {state === "out" && (
          <p className="mt-1 text-[11px] font-semibold text-berbere-600">Out of stock</p>
        )}
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center rounded-lg border border-sand-300">
            <button
              onClick={() => onQty(product.id, qty - 1)}
              className="px-2.5 py-1 text-espresso-500 transition-colors hover:text-espresso-900"
              aria-label={`Decrease quantity of ${product.name}`}
            >
              −
            </button>
            <span className="min-w-[2ch] text-center text-sm font-semibold text-espresso-900">
              {qty}
            </span>
            <button
              onClick={() => onQty(product.id, Math.min(qty + 1, max))}
              className="px-2.5 py-1 text-espresso-500 transition-colors hover:text-espresso-900"
              aria-label={`Increase quantity of ${product.name}`}
            >
              +
            </button>
          </div>
          <button
            onClick={() => onRemove(product.id)}
            className="text-[11px] font-medium text-espresso-300 underline-offset-2 transition-colors hover:text-berbere-600 hover:underline"
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  );
}
