# Codex Prompt Sequence

Use one prompt at a time. Review each diff before moving forward.

---

## Prompt 0 — Repository bootstrap

You are starting the Peri Peri Grill — Agadir Bay restaurant showcase project.

Before touching code, read `AGENTS.md`, `DESIGN.md`, and every file in `docs/`.
Treat them as the project source of truth.

Task:
1. Initialize or normalize the repo as a React + TypeScript + Vite app.
2. Add Tailwind CSS v4, Lucide React, and Motion for React (`motion`).
3. Keep the app frontend-only: no backend, database, auth, CMS, or API.
4. Create this pragmatic structure:
   - `src/components/ui/`
   - `src/components/sections/`
   - `src/content/`
   - `src/assets/brand/`
   - `src/assets/restaurant/`
   - `src/assets/dishes/`
5. Configure linting and a reliable production build.
6. Do not build the visual page yet beyond a minimal render proving the setup works.
7. Do not delete or rewrite the SDD docs unless something is technically impossible; if so, explain first.

Verification:
- install succeeds;
- dev app renders;
- lint passes;
- production build passes.

At the end, report files changed, commands run, and any decisions that differ from the docs.

---

## Prompt 1 — Content/data foundation

Read `AGENTS.md`, `DESIGN.md`, `docs/01-research-and-content.md`, `docs/03-functional-spec.md`, and `docs/04-content-model.md`.

Build the typed content layer before visual implementation.

Create:
- `src/content/restaurant.ts`
- `src/content/menu.ts`
- `src/content/reviews.ts`
- `src/content/gallery.ts`

Requirements:
- Use only facts already documented in the repo.
- Dynamic facts such as rating/review count/hours/prices must be easy to update.
- If a field is not verified, omit it or mark it clearly as TODO in data; never invent it.
- Featured menu items should focus on the real best-seller/signature items documented in research.
- Use local placeholder asset paths only when real images are not yet available.
- No business data inside JSX later.

Add TypeScript types where useful but keep it simple.
Run lint/build.

---

## Prompt 2 — Design system foundation

Read `DESIGN.md` in full and implement its design language before building major sections.

Task:
1. Add global design tokens/colors/typography/spacing in the Tailwind v4 setup/global CSS.
2. Load the chosen free fonts efficiently.
3. Implement base page/body styles, selection style, focus-visible states, and reduced-motion defaults.
4. Create only the reusable primitives needed now:
   - Container
   - SectionHeading
   - PrimaryButton / SecondaryButton
   - Eyebrow label
   - MediaFrame if useful
5. Implement the responsive site header/navigation and footer shell.

Critical visual rule:
This must look like an energetic flame-grill food brand, not a SaaS landing page. No purple gradients, generic glass cards, or random Aceternity effects.

Do not build all content sections yet.
After implementation, run lint/build and describe how the code maps to `DESIGN.md`.

---

## Prompt 3 — Proposal-quality hero

Read `DESIGN.md` and build the home-page hero as a standalone high-fidelity task.

Goal:
The hero must be impressive enough that a screenshot could be shown to the restaurant owner.

Requirements:
- 90–100svh responsive hero.
- Full-bleed media with a local restaurant-image placeholder interface that can be swapped without changing layout.
- Deterministic dark scrim for readable copy.
- Large poster headline direction: “FRESH. FLAME-GRILLED. FULL OF FIRE.”
- Short location/supporting copy for Agadir Bay.
- Primary CTA to menu section.
- Secondary CTA to verified order destination if configured; otherwise render a disabled/TODO-safe state rather than inventing a link.
- Compact proof strip using only verified content from `restaurant.ts`.
- Purposeful entrance motion with `prefers-reduced-motion` support.
- Navbar must remain readable over hero and transition cleanly after scroll.
- Strong mobile composition at 360/390px.

You may adapt one Aceternity-style text/parallax concept if useful, but the final code and visuals must obey `DESIGN.md` and not look copied from a tech landing page.

Run lint/build. Check for horizontal overflow.

---

## Prompt 4 — Signature dishes + menu rail

Read the design and content docs.

Build the Signature Dishes section using `src/content/menu.ts`.

Design intent:
An editorial food spread / physical menu poster, not a product dashboard.

Requirements:
- Cream/light section after hero.
- Feature 5–8 dishes max.
- Strong food-image hierarchy.
- Responsive layout: desktop editorial/asymmetric rail; mobile swipe/scroll-snap with a visible next item.
- Dish name, concise description if available, optional verified price.
- Avoid identical rounded SaaS cards.
- Add subtle hover/drag motion only where it helps.
- Images must have stable aspect ratios and below-fold lazy loading.
- Section CTA can link to full menu/order source.

Run lint/build and inspect 360px + 1440px layouts.

---

## Prompt 5 — “Choose your fire” signature interaction

Build the heat/flavour section from `DESIGN.md` and the brand research.

Requirements:
- Dark coal surface.
- Distinctive peri-peri thermometer / heat selector.
- 4–5 selectable flavour/heat levels represented by buttons/radio semantics.
- Keyboard, mouse, and touch usable.
- Selection updates short flavour copy and visual ember indicator.
- No fake Scoville values.
- Use warm red/orange/mustard only.
- Motion should be concise and tactile, with reduced-motion fallback.
- Add a short brand statement about choosing the level of heat/flavour; paraphrase existing brand material, do not copy long source text.

This interaction should become one of the memorable visual signatures of the website.

Run lint/build and verify keyboard behavior.

---

## Prompt 6 — Story + gallery

Build two sections:
1. brand story;
2. social/gallery.

Story:
- editorial split layout;
- concise paraphrase based only on documented brand story;
- emphasize flame grilling, peri-peri roots, and Morocco;
- one atmospheric image placeholder;
- avoid a long wall of text.

Gallery:
- render from `gallery.ts`;
- use local assets, not Instagram hotlinks;
- asymmetric/staggered or horizontal composition aligned with `DESIGN.md`;
- optional subtle focus/parallax behavior adapted from a component library;
- every gallery item supports alt text and optional Instagram post link;
- mobile must remain fast and easy to swipe.

Run lint/build.

---

## Prompt 7 — Reviews + visit/conversion section

Build the social proof and visit sections.

Reviews:
- use only `reviews.ts` content;
- short, readable quotes;
- source visible;
- no invented names, numbers, or awards;
- optional subtle moving row on large screens, static/reduced-motion fallback.

Visit:
- Agadir Bay location;
- hours from data;
- click-to-call;
- Google Maps directions;
- Instagram;
- order link if verified;
- visual emphasis on “open late” may be used only if it is factually derived from the hours data, not as a live open/closed state unless implemented correctly.

Add a mobile sticky action bar after the hero with `Commander` and `Itinéraire` when links are available.
Respect safe-area insets and do not obscure page content.

Run lint/build.

---

## Prompt 8 — Full visual QA and anti-generic pass

Act as a senior art director + frontend reviewer.

Read `DESIGN.md` and `docs/06-quality-checklist.md`.
Audit the entire implemented site and fix issues rather than just listing them.

Focus especially on:
- anything that looks like a generic AI/SaaS landing page;
- repetitive cards;
- weak typography hierarchy;
- image crops that do not create appetite;
- excessive/cheap animation;
- inconsistent radii/spacing;
- poor mobile composition;
- CTA hierarchy;
- accessibility/focus/reduced motion;
- horizontal overflow;
- broken or placeholder content that could be mistaken for real facts.

Do not add random features. Improve the design already specified.
Run lint/build after fixes and report the highest-impact changes.

---

## Prompt 9 — Performance, SEO, production readiness

Make the site production-ready without changing its visual direction.

Implement/audit:
- responsive image formats/sizes;
- lazy loading below fold;
- hero loading priority;
- font loading;
- semantic HTML;
- document title + meta description;
- Open Graph/Twitter metadata;
- favicon placeholders if final logo not supplied;
- canonical placeholder/config;
- Restaurant JSON-LD using only verified values;
- robots.txt;
- sitemap.xml;
- external link safety;
- no console errors;
- no dead code or unused dependencies.

Run lint and production build.
If Lighthouse/browser tooling is available, run an audit and fix obvious regressions.

---

## Prompt 10 — CI/CD + Vercel

Prepare deployment for a static Vite React site.

Requirements:
1. Add a GitHub Actions workflow that runs on pull requests and pushes to `main`:
   - clean install;
   - lint;
   - production build.
2. Do not duplicate Vercel deployment inside GitHub Actions unless there is a specific need. Prefer Vercel's native Git integration for deploys/previews.
3. Document in README:
   - connect GitHub repo to Vercel;
   - `main` = Production;
   - PR branches = Preview deployments;
   - build command and output directory if Vercel does not auto-detect them.
4. Ensure no secret/env variable is required for v1.
5. Run the full local quality commands.

If Vercel deployment tooling is available, deploy a preview and verify the page, but do not modify content just to satisfy deployment.

---

## Prompt 11 — Final owner-demo pass

The site is feature-complete. Prepare it specifically for presentation to the restaurant owner.

Do not redesign from scratch.

Tasks:
- re-read every SDD doc;
- identify all remaining placeholders/TODO facts/assets;
- produce a concise `docs/OWNER-DEMO-CHECKLIST.md` listing exactly what must be replaced/verified before the meeting;
- make any final micro-polish changes that improve first impression without adding scope;
- verify mobile and desktop;
- run lint/build;
- provide a short suggested demo flow: what to show first, where to scroll, and which CTAs to click.
