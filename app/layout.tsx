import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter, Noto_Sans_Ethiopic } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const ethiopic = Noto_Sans_Ethiopic({
  subsets: ["ethiopic"],
  variable: "--font-ethiopic",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Yegna Bazzar — Ethiopian multi-vendor marketplace",
    template: "%s · Yegna Bazzar",
  },
  description:
    "Shop authentic Ethiopian goods — single-origin coffee, handwoven habesha kemis, leather crafts, habesha honey and more — directly from local sellers. Prices in Ethiopian Birr.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${ethiopic.variable}`}>
      <body className="min-h-screen bg-cream-50 font-sans text-espresso-800 antialiased">
        <CartProvider>
          <Suspense fallback={null}>
            <Header />
          </Suspense>
          <main>{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
