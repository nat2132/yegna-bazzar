"use client";

import React, { useState } from "react";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  vendor: string;
  image: string;
  badge?: string;
}

const FEATURED_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Authentic Yirgacheffe Special Reserve Coffee Beans (1kg)",
    category: "Coffee & Spices",
    price: 1850,
    rating: 4.9,
    vendor: "Abyssinia Coffee Roasters",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80",
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Handwoven Traditional Habesha Kemis (Silk Embroidered)",
    category: "Fashion & Cultural",
    price: 8500,
    rating: 4.8,
    vendor: "Sheger Artisan Weavers",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
    badge: "Artisan Made",
  },
  {
    id: 3,
    name: "Pure Natural Leather Travel Bag (Handcrafted)",
    category: "Leather Goods",
    price: 4200,
    rating: 4.7,
    vendor: "Addis Leather Crafts",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Traditional Clay Jebena Coffee Set (12-Piece)",
    category: "Home & Culture",
    price: 2900,
    rating: 4.9,
    vendor: "Feres potters Collective",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
    badge: "Popular",
  },
  {
    id: 5,
    name: "Premium Organic Ethiopian Honey (Macha 1kg)",
    category: "Organic Foods",
    price: 1400,
    rating: 4.9,
    vendor: "Bale Mountain Apiaries",
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    name: "Handmade Ethiopian Silver Cross Pendant",
    category: "Jewelry",
    price: 3600,
    rating: 4.8,
    vendor: "Lalibela Silversmiths",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
  },
];

export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState<{ product: Product; qty: number }[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const categories = ["All", "Coffee & Spices", "Fashion & Cultural", "Leather Goods", "Organic Foods", "Jewelry"];

  const filtered = FEATURED_PRODUCTS.filter((p) => {
    const matchesCat = selectedCategory === "All" || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.vendor.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) => item.product.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { product, qty: 1 }];
    });
    setCartOpen(true);
  };

  const totalCartETB = cart.reduce((sum, item) => sum + item.product.price * item.qty, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950 pb-20">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-700 flex items-center justify-center font-bold text-xl text-slate-950 shadow-lg shadow-amber-500/20">
              የ
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                Yegna Bazzar <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">የኛ ባዛር</span>
              </h1>
              <p className="text-xs text-slate-400">Ethiopia&apos;s Multi-Vendor Digital Marketplace</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products, vendors, spices..."
              className="hidden sm:block w-72 bg-slate-900 border border-slate-700 focus:border-amber-500 rounded-xl px-4 py-2 text-sm text-white focus:outline-none transition-colors"
            />

            <button
              onClick={() => setCartOpen(true)}
              className="relative flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20"
            >
              <span>🛒 Cart</span>
              {cart.length > 0 && (
                <span className="h-5 w-5 rounded-full bg-slate-950 text-amber-400 flex items-center justify-center text-[10px] font-bold">
                  {cart.reduce((a, b) => a + b.qty, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="relative overflow-hidden py-16 px-6 bg-gradient-to-b from-amber-950/30 via-slate-950 to-slate-950 border-b border-slate-800">
        <div className="max-w-5xl mx-auto text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-4">
            Directly connecting local artisans, farmers &amp; buyers
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4 leading-tight">
            Discover &amp; Shop Authentic <br />
            <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-yellow-500 bg-clip-text text-transparent">
              Ethiopian Products &amp; Crafts
            </span>
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed mb-8">
            Explore single-origin coffee, handcrafted traditional attire, pure honey, genuine leather, and local artisan creations delivered directly to your doorstep.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20"
                    : "bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Product Catalog Grid */}
      <main className="max-w-7xl mx-auto px-6 mt-12">
        <div className="flex items-center justify-between mb-8 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-xl font-bold text-white">Featured Marketplace Products</h3>
            <p className="text-xs text-slate-400 mt-0.5">Showing {filtered.length} verified listings</p>
          </div>
          <span className="text-xs text-slate-400 hidden sm:inline-block">Prices in Ethiopian Birr (ETB)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((product) => (
            <article
              key={product.id}
              className="group bg-slate-900 border border-slate-800/80 rounded-2xl overflow-hidden hover:border-amber-500/50 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              {/* Image Container */}
              <div className="relative h-60 w-full overflow-hidden bg-slate-950">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-[10px] font-extrabold uppercase tracking-wider">
                    {product.badge}
                  </span>
                )}
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-800 text-amber-300 text-xs font-semibold">
                  ★ {product.rating}
                </span>
              </div>

              {/* Product Info */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-400 block mb-1">
                    {product.category}
                  </span>
                  <h4 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-amber-300 transition-colors">
                    {product.name}
                  </h4>
                  <p className="text-xs text-slate-400 mb-4">
                    Seller: <strong className="text-slate-200">{product.vendor}</strong>
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block">Price</span>
                    <span className="text-xl font-extrabold text-white">{product.price.toLocaleString()} <span className="text-xs text-amber-400 font-normal">ETB</span></span>
                  </div>

                  <button
                    onClick={() => addToCart(product)}
                    className="px-4 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500 hover:text-slate-950 text-xs font-bold transition-all"
                  >
                    + Add to Cart
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* Cart Slide-Over Modal */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-slate-900 border-l border-slate-800 h-full p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  Shopping Cart <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300">{cart.length} items</span>
                </h3>
                <button
                  onClick={() => setCartOpen(false)}
                  className="text-slate-400 hover:text-white text-xl"
                >
                  ✕
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="py-20 text-center text-slate-400 text-sm">
                  Your cart is empty. Explore items and add them to your cart.
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex items-center justify-between p-3 bg-slate-950 border border-slate-800 rounded-xl">
                      <div className="flex items-center gap-3">
                        <img src={item.product.image} alt="" className="h-12 w-12 rounded-lg object-cover" />
                        <div>
                          <p className="text-xs font-bold text-white line-clamp-1">{item.product.name}</p>
                          <span className="text-xs text-amber-400">{item.product.price.toLocaleString()} ETB x {item.qty}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="pt-6 border-t border-slate-800 mt-6">
                <div className="flex items-center justify-between mb-4 text-base font-extrabold text-white">
                  <span>Total Amount:</span>
                  <span className="text-amber-400">{totalCartETB.toLocaleString()} ETB</span>
                </div>
                <button
                  onClick={() => {
                    alert(`Order submitted successfully via Telebirr! Total: ${totalCartETB.toLocaleString()} ETB.`);
                    setCart([]);
                    setCartOpen(false);
                  }}
                  className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-all"
                >
                  Checkout with Telebirr / CBE Birr
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
