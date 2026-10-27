/**
 * Yegna Bazzar catalog.
 *
 * This is the app's local seed data — the same six listings the app shipped
 * with (same names, vendors, categories, prices and Unsplash images).
 * Fields added during the redesign: stock, unit, location, blurb.
 * Richer data should eventually come from a real backend/vendor API.
 */

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  vendor: string;
  image: string;
  badge?: string;
  /** Units remaining (seed value — checkout is not connected yet). */
  stock: number;
  /** Presentation unit when the listing is sold by weight/set, e.g. "1 kg". */
  unit?: string;
  location: string;
  blurb: string;
}

export const FEATURED_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Authentic Yirgacheffe Special Reserve Coffee Beans (1kg)",
    category: "Coffee & Spices",
    price: 1850,
    rating: 4.9,
    vendor: "Abyssinia Coffee Roasters",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
    badge: "Best Seller",
    stock: 24,
    unit: "1 kg",
    location: "Addis Ababa",
    blurb:
      "Reserve lots from smallholder farms around Gedeb, Yirgacheffe. Washed process and roasted fresh each week in Addis Ababa, with the bright bergamot and citrus cup the region is known for.",
  },
  {
    id: 2,
    name: "Handwoven Traditional Habesha Kemis (Silk Embroidered)",
    category: "Fashion & Cultural",
    price: 8500,
    rating: 4.8,
    vendor: "Sheger Artisan Weavers",
    image: "/fallback/textile.svg",
    badge: "Artisan Made",
    stock: 6,
    location: "Addis Ababa",
    blurb:
      "Woven on a traditional entunt loom from soft Ethiopian cotton, finished with hand-embroidered silk tibeb along the hem and collar. Each piece takes several days on the loom.",
  },
  {
    id: 3,
    name: "Pure Natural Leather Travel Bag (Handcrafted)",
    category: "Leather Goods",
    price: 4200,
    rating: 4.7,
    vendor: "Addis Leather Crafts",
    image: "/fallback/leather.svg",
    stock: 9,
    location: "Addis Ababa · Merkato",
    blurb:
      "Vegetable-tanned Ethiopian sheepskin leather, cut and saddle-stitched by hand in Merkato workshops. Solid brass hardware and a sturdy shoulder strap built for travel.",
  },
  {
    id: 4,
    name: "Traditional Clay Jebena Coffee Set (12-Piece)",
    category: "Home & Culture",
    price: 2900,
    rating: 4.9,
    vendor: "Feres Potters Collective",
    image: "/fallback/home.svg",
    badge: "Popular",
    stock: 4,
    location: "Debre Berhan",
    blurb:
      "A hand-thrown black clay jebena with its grind of the matching sini drinking cups and a reed sieve, fired in a wood-fuelled kiln. Built to keep a full coffee ceremony warm.",
  },
  {
    id: 5,
    name: "Premium Organic Ethiopian Honey (Macha 1kg)",
    category: "Organic Foods",
    price: 1400,
    rating: 4.9,
    vendor: "Bale Mountain Apiaries",
    image: "/fallback/honey.svg",
    stock: 15,
    unit: "1 kg",
    location: "Bale",
    blurb:
      "Raw, unfiltered multi-floral honey drawn from woven hives on the forest edge of the Bale Mountains. Crystallises naturally in the coolest months.",
  },
  {
    id: 6,
    name: "Handmade Ethiopian Silver Cross Pendant",
    category: "Jewelry",
    price: 3600,
    rating: 4.8,
    vendor: "Lalibela Silversmiths",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
    stock: 3,
    location: "Lalibela",
    blurb:
      "A hand-cast Meskel cross in silver with fine lattice work, strung on a braided cord. Made by a family workshop that has produced ceremonial crosses for generations.",
  },
];

export interface Category {
  id: string; // slug used in URLs
  label: string;
  am: string; // Amharic label
  fallback: string; // local illustrated SVG used when imagery fails
}

export const CATEGORIES: Category[] = [
  { id: "all", label: "All", am: "ሁሉም", fallback: "/fallback/market.svg" },
  { id: "coffee-spices", label: "Coffee & Spices", am: "ቡናና ቅመም", fallback: "/fallback/coffee.svg" },
  { id: "fashion-cultural", label: "Fashion & Cultural", am: "ልብስና ወግ", fallback: "/fallback/textile.svg" },
  { id: "leather-goods", label: "Leather Goods", am: "የቆዳ ዕቃዎች", fallback: "/fallback/leather.svg" },
  { id: "home-culture", label: "Home & Culture", am: "የቤት እቃና ባህል", fallback: "/fallback/home.svg" },
  { id: "organic-foods", label: "Organic Foods", am: "ኦርጋኒክ ምግብ", fallback: "/fallback/honey.svg" },
  { id: "jewelry", label: "Jewelry", am: "ጌጣጌጪ", fallback: "/fallback/jewelry.svg" },
];

export function categoryFor(label: string): Category | undefined {
  return CATEGORIES.find((c) => c.label === label);
}

export function categorySlug(label: string): string {
  return categoryFor(label)?.id ?? "all";
}

/** Category slug -> "All" or the English label, for filtering. */
export function categoryLabelForSlug(slug: string | null | undefined): string {
  if (!slug) return "All";
  const cat = CATEGORIES.find((c) => c.id === slug);
  return cat ? cat.label : "All";
}

/** Same illustrative art doubles as the image fallback per category. */
export function fallbackFor(category: string): string {
  return categoryFor(category)?.fallback ?? "/fallback/market.svg";
}

export function productById(id: string | number): Product | undefined {
  return FEATURED_PRODUCTS.find((p) => String(p.id) === String(id));
}

/** Ethiopian Birr formatting: "Br 1,850". */
export function formatBr(amount: number): string {
  return `Br ${amount.toLocaleString("en-US")}`;
}

export type StockState = "out" | "low" | "ok";

export function stockState(product: Product): StockState {
  if (product.stock <= 0) return "out";
  if (product.stock <= 4) return "low";
  return "ok";
}

export function stockLabel(product: Product): string {
  switch (stockState(product)) {
    case "out":
      return "Out of stock";
    case "low":
      return `Only ${product.stock} left`;
    default:
      return "In stock";
  }
}
