import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { FEATURED_PRODUCTS, productById } from "@/lib/products";
import ProductDetail from "./ProductDetail";

export function generateStaticParams() {
  return FEATURED_PRODUCTS.map((p) => ({ id: String(p.id) }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const product = productById(params.id);
  if (!product) return { title: "Listing not found" };
  return {
    title: product.name,
    description: `${product.blurb} ${product.price.toLocaleString()} ETB · ${product.vendor}, ${product.location}.`,
  };
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = productById(params.id);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}
