import type { Config } from "tailwindcss";

/**
 * Yegna Bazzar design tokens.
 * Palette is drawn from Ethiopian market materials:
 * - espresso: dark tanned leather / roasted coffee
 * - ochre: niger-seed oil golden / injera crust
 * - berbere: spice-market terracotta red
 * - cream/sand: paper & unbleached cotton
 */
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#fbf7ee",
          100: "#f6efe1",
          200: "#ede2cb",
        },
        sand: {
          100: "#f1e8d5",
          200: "#e9dcc2",
          300: "#d9c9a8",
          500: "#b09b74",
        },
        espresso: {
          100: "#e7d7c9",
          300: "#a3826b",
          500: "#6b4a37",
          600: "#52372a",
          700: "#3d2718",
          800: "#2e1d13",
          900: "#241610",
        },
        ochre: {
          100: "#f5e7cd",
          400: "#e0a63a",
          500: "#c98a2b",
          600: "#a86d1e",
          700: "#8f5f16",
        },
        berbere: {
          100: "#f6e0d6",
          500: "#a8431f",
          600: "#8a3517",
          700: "#7e2f12",
        },
        leaf: {
          600: "#4e6b3a",
          700: "#3d552e",
        },
      },
      fontFamily: {
        // Inter for latin, Noto Sans Ethiopic covers Amharic glyphs, system serif for display.
        sans: ["var(--font-inter)", "var(--font-ethiopic)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Georgia", "Cambria", "var(--font-ethiopic)", "Times New Roman", "serif"],
        ethiopic: ["var(--font-ethiopic)", "ui-sans-serif", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(36, 22, 16, 0.06), 0 2px 8px rgba(36, 22, 16, 0.05)",
        "card-hover": "0 2px 4px rgba(36, 22, 16, 0.08), 0 12px 32px rgba(36, 22, 16, 0.14)",
      },
      maxWidth: {
        "8xl": "88rem",
      },
    },
  },
  plugins: [],
};
export default config;
