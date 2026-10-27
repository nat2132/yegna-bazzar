# Yegna Bazzar — የኛ ባዛር

A multi-vendor Ethiopian marketplace concept: authentic goods — coffee, handwoven
habesha kemis, leather crafts, clay jebena sets, highland honey and jewelry —
listed directly by local sellers, with prices in **Ethiopian Birr (ETB / Br)**
and Amharic–English touches throughout.

## Stack

- **Next.js 14** (App Router) + **React 18**
- **Tailwind CSS 3** with a custom design-system token set (`tailwind.config.ts`)
- Fonts: Inter (Google/next-font) + **Noto Sans Ethiopic** for Amharic strings;
  system serif stack (Georgia/Cambria) for display headings
- No backend yet — the catalog is a local seed module (`lib/products.ts`);
  cart persists to `localStorage`

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
# or
npm run build && npm run start
```

## Pages

| Route | What it does |
| --- | --- |
| `/` | Hero with real search entry points, category tiles, curated highlights |
| `/search` | Browse/filter/sort against the seed catalog (`?q=`, `?category=`) |
| `/product/[id]` | Product detail: gallery, price in Br, seller card, stock badge, add-to-cart |

## Honest status (do not oversell)

- **Checkout is a demo.** Telebirr / CBE Birr / Chapa payments are **not** connected —
  the UI says so in the drawer and footer; no billing happens.
- **Catalog is seed data** (six listings). Vendor onboarding and a real product API
  are the next milestone.
- Product photos use Unsplash where appropriate; where seeded photography was
  wrong or missing, the app ships illustrated Ethiopian motifs in
  `public/fallback/*.svg`, which also serve as automatic image-fallback tiles.

## Design notes

- Palette: deep espresso browns, injera-golden ochre, berbere terracotta on warm
  cream paper — inspired by Addis market materials, not a generic dark-amber theme.
- A thin woven **tibeb-style stripe** (`tibeb-bar` / `tibeb-bar-thin` utilities in
  `globals.css`) is used sparingly as a divider motif.
- Cards, chips and buttons use thin sand borders and soft warm shadows — no
  gradients, no neon.

## QA

Screenshots (desktop + 420px mobile) from the last verified build live in
`qa-screens/`.
