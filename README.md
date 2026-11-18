# Peri Peri Grill — Agadir Bay

<div align="center">

![Astro](https://img.shields.io/badge/Astro-5.4-BC52EE?style=flat-square&logo=astro&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Motion](https://img.shields.io/badge/Motion-v12-F08080?style=flat-square&logo=framer&logoColor=white)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

**A high-conversion, speed-optimized showcase website & redesign proposal for Peri Peri Grill — Agadir Bay.**

[Live Proposal](#deployment) · [Design System](#design-system--brand-feeling) · [Architecture](#hybrid-islands-architecture) · [SEO Architecture](#seo--local-search-dominance) · [Content Model](#content-layer-srccontent)

</div>

---

## Overview

**Peri Peri Grill — Agadir Bay** is located at Office Centre, Agadir 80000, Morocco. This project is a production-grade showcase website and visual redesign proposal engineered to replace generic restaurant web templates with a tactile, appetizing, late-night dining experience.

The site is built with **Astro 5 Static Site Generation (SSG)**, **Tailwind CSS v4**, and **React Islands (`motion`)**. It achieves near-instant mobile page loads, maximum Local SEO discoverability (Google Maps, Google Search, WhatsApp link unfurling), and strict accessibility without unnecessary runtime overhead.

---

## Key Highlights

- **⚡ Blazing Fast (0ms Initial JS Overhead):** Converted all non-interactive layout sections into zero-JS static HTML, achieving high Core Web Vitals scores on mobile 4G networks.
- **🏝️ Selective Island Hydration:** Interactive components (Header drawer, Hero reveal, Heat Selector) are isolated as React islands and hydrated selectively (`client:load` and `client:visible`).
- **🔍 Full Local SEO & Schema.org Integration:** Native build-time injection of `FastFoodRestaurant` JSON-LD structured data, Open Graph social cards, XML sitemaps, and bilingual keywords (French / English).
- **🎨 Custom "EMBER NOIR" Design Language:** Dark charcoal surfaces, fire-red calls to action, warm cream paper tones, and poster typography inspired by grill marks and charcoal embers.
- **📱 Mobile-First Conversion Paths:** Persistent safe-area sticky actions (`Commander` & `Itinéraire`), swipeable signature dishes, and click-to-call integration.
- **📂 Decoupled Content Layer:** 100% of editable business information (hours, prices, dishes, reviews, contact URLs) is isolated in typed TypeScript files under `src/content/`.

---

## Tech Stack

| Technology | Role | Why It Was Chosen |
| :--- | :--- | :--- |
| **[Astro 5](https://astro.build/)** | Core Framework & SSG | Pre-renders complete semantic HTML at build time for instant crawling and near-zero runtime JS. |
| **[React 19](https://react.dev/)** | Islands Engine | Powers client-side stateful interactions (mobile drawer, heat selector, dynamic animations). |
| **[Tailwind CSS v4](https://tailwindcss.com/)** | Styling & Design Tokens | CSS-first configuration via `@theme` with custom color palettes and responsive clamp typography. |
| **[Motion for React](https://motion.dev/)** | Animation & Micro-interactions | Fluid entrance reveals, layout morphing, and interactive SVG flame flickers with reduced-motion fallbacks. |
| **[@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/)** | Sitemap Generator | Automatically generates and updates `/sitemap-index.xml` and `/sitemap-0.xml`. |
| **[OxLint](https://oxc-project.github.io/)** | Code Linter | Ultra-fast Rust-based linter ensuring high code quality across TypeScript and JSX. |
| **[Sharp](https://sharp.pixelplumbing.com/)** | Image Pipeline | Automated WebP conversion and responsive asset dimension tuning via `scripts/optimize-media.mjs`. |

---

## Hybrid Islands Architecture

Rather than shipping a heavy client-side Single Page Application (SPA), the site uses Astro's **Islands Architecture** to minimize client JavaScript:

```
Document Shell (Layout.astro)
│
├── <Header client:load />          ──> Hydrates immediately for navigation & scroll tracking
├── <main id="main-content">
│   ├── <Hero client:load />        ──> Hydrates immediately for poster typography animations
│   ├── <SignatureDishes />         ──> 100% STATIC HTML (Zero JS, CSS hover transitions)
│   ├── <HeatSelector client:visible /> ──> HYDRATES ONLY WHEN SCROLLED INTO VIEW
│   ├── <StorySection />            ──> 100% STATIC HTML (CSS sticky positioning)
│   ├── <GallerySection />          ──> 100% STATIC HTML (12-column responsive CSS grid)
│   ├── <ReviewsSection />          ──> 100% STATIC HTML (Pre-rendered star SVGs & verified quotes)
│   └── <VisitSection />            ──> 100% STATIC HTML (Static hours table & lazy Google Map)
└── <Footer />                      ──> 100% STATIC HTML (Vector SVG logo & social cards)
```

---

## Design System & Brand Feeling

> **Creative Direction:** **EMBER NOIR** — flame-grill poster meets warm Agadir night.

The design avoids generic SaaS templates, glassmorphism, or artificial gradients. Color tokens and typographic scales are defined in `src/styles/index.css`:

```css
/* Color Palette */
--color-coal-950:   #120d0a;  /* Primary dark background */
--color-coal-900:   #1a120e;  /* Elevated dark surface */
--color-ink:        #241712;  /* High-contrast text on cream */
--color-cream:      #f6ead7;  /* Editorial light surface */
--color-paper:      #fff7e9;  /* Elevated light surface */
--color-peri-red:   #e7371f;  /* Primary brand action & CTAs */
--color-ember:      #ff6a1a;  /* Flame accent & hover transitions */
--color-mustard:    #f2b536;  /* Spice dots, star ratings, subtle highlights */
--color-smoke:      #a89a8f;  /* Muted text on dark surfaces */

/* Typography */
--font-display:     'Archivo Black', sans-serif;
--font-body:        'Manrope', sans-serif;
--font-editorial:   'Newsreader Variable', serif;
```

---

## SEO & Local Search Dominance

To ensure maximum ranking for dining queries in Agadir (*"peri peri agadir"*, *"restaurant agadir bay"*, *"poulet braisé agadir"*):

1. **Schema.org Structured Data (`src/components/seo/RestaurantSchema.astro`):**
   - Encodes verified `FastFoodRestaurant` metadata: GPS coordinates (`30.4035, -9.5818`), address, telephone (`+212 609 470 316`), price range (`50-100 MAD`), and exact 7-day operating hours.
   - Includes direct `OrderAction` linking to the Glovo ordering storefront.
2. **Social Graph Optimization (`src/components/seo/BaseHead.astro`):**
   - Full OpenGraph and Twitter Cards providing high-contrast rich media previews in WhatsApp, Instagram DMs, Facebook, and iMessage.
3. **Robots & Sitemap:**
   - Pre-configured `public/robots.txt` referencing the autogenerated `sitemap-index.xml`.
4. **Bilingual Search Intent:**
   - Semantic headings and metadata structured for both French-speaking locals and international visitors.

---

## Content Layer (`src/content/`)

All business data is strictly separated from presentation logic:

| File | Purpose |
| :--- | :--- |
| **`restaurant.ts`** | Central source of truth: Name, address, phone, verified external links (Glovo, Maps, Instagram, WhatsApp), rating, review count, and operating schedule. |
| **`menu.ts`** | Signature dishes featured on the homepage (Mega Feast, Flamin Wings, Chicken & Rice, The Wrapster). |
| **`media.ts`** | Central registry of optimized WebP images with semantic alt text and status tracking. |
| **`heatLevels.ts`** | Spice thermometer intensity definitions (Douce, Moyenne, Forte, Très forte). |
| **`reviews.ts`** | Manually checked Google review excerpts, individual source links, and editorial topic labels. |
| **`story.ts`** | Brand narrative beats outlining African Bird's Eye chilli roots, open-flame cooking, and Agadir location. |
| **`navigation.ts`** | Primary anchor navigation items (`#menu`, `#story`, `#gallery`, `#reviews`, `#visit`). |

---

## Project Structure

```text
RestoWebsite/
├── public/                  # Static assets served at root (favicon.svg, robots.txt)
├── src/
│   ├── assets/              # Restaurant media (brand/, dishes/, restaurant/)
│   ├── components/
│   │   ├── astro/           # Zero-JS static sections (SignatureDishes, Story, Gallery, Reviews, Visit, Footer)
│   │   ├── layout/          # Header island (mobile drawer, active section tracking, sticky CTA)
│   │   ├── sections/        # Hero & HeatSelector interactive islands
│   │   ├── seo/             # BaseHead meta & RestaurantSchema JSON-LD
│   │   └── ui/              # Primitives (Container, Button, Eyebrow, PeriPeriLogo, SkipLink)
│   ├── content/             # Typed restaurant data (source of truth)
│   ├── layouts/             # Root HTML layout (Layout.astro)
│   ├── pages/               # Application routes (index.astro)
│   ├── styles/              # Global Tailwind v4 CSS & theme tokens (index.css)
│   └── types/               # Shared TypeScript interfaces
├── scripts/                 # Asset optimization scripts (optimize-media.mjs)
├── astro.config.mjs         # Astro configuration & integrations
├── package.json             # Scripts & dependencies
└── tsconfig.json            # TypeScript configuration
```

---

## Getting Started

### Prerequisites

- **Node.js** >= 20.0.0
- **npm** >= 10.0.0

### Installation

```bash
# Clone the repository
git clone https://github.com/elmochilyas/RestoWebsite.git
cd RestoWebsite

# Install dependencies
npm install
```

### Development

```bash
# Start the local Astro development server
npm run dev
```

Visit `http://localhost:4321` in your browser.

---

## Available Scripts

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts the Astro local dev server with Hot Module Replacement (HMR). |
| `npm run build` | Runs TypeScript diagnostics (`astro check`) and generates static output into `dist/`. |
| `npm run preview` | Spins up a local static server to preview the production build in `dist/`. |
| `npm run lint` | Runs `oxlint` for high-speed JavaScript and TypeScript static analysis. |
| `npm run media:optimize`| Converts source images into optimized WebP formats at editorial dimensions using Sharp. |

---

## Deployment & CI/CD

Deployment is automated via **Vercel** with GitHub Git integration:

- **Pull Requests:** Automatically trigger a Vercel **Preview Deployment** and run GitHub Actions quality checks (`astro check`, `oxlint`, `astro build`).
- **Production (`main` branch):** Automatically deploys to Vercel production upon merge.
- **Hosting Model:** 100% static delivery via Vercel Edge Network with zero server maintenance costs.

---

## Quality Checklist & Definition of Done

- [x] **Zero Console Errors:** Clean hydration and script execution.
- [x] **Zero TypeScript Errors:** `astro check` passes with 0 errors across all 42 files.
- [x] **Zero Linter Warnings:** `oxlint` passes cleanly across the codebase.
- [x] **Semantic HTML & A11y:** Accessible Skip link, ARIA landmarks, radio semantics on the spice selector, and visible focus rings.
- [x] **Reduced Motion Support:** All Motion animations gracefully degrade when `prefers-reduced-motion` is active.
- [x] **Responsive Verification:** Tested across 360px, 390px, 768px, 1024px, and 1440px viewports without horizontal overflow.
- [x] **Valid Structured Data:** Tested against Schema.org and Google Rich Results guidelines.

---

## Source Documentation

Before proposing content or UI modifications, review the project documentation in order:

1. [`DESIGN.md`](./DESIGN.md) — Visual source of truth and aesthetic rules.
2. [`AGENTS.md`](./AGENTS.md) — Implementation guidelines and constraints.
3. [`docs/`](./docs/) — Specification-Driven Development (SDD) documentation suite (`00-project-brief.md` through `08-codex-prompts.md`).
