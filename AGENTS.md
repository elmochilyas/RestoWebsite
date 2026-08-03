# AGENTS.md — Peri Peri Grill Agadir Bay

## Mission
Build a visually exceptional, fast, responsive restaurant showcase website for Peri Peri Grill — Agadir Bay. The website is a sales/proposal asset first: it must feel premium, memorable, food-forward, and credible enough to present directly to the restaurant owner.

## Source of truth
Before changing UI or content, read in this order:
1. `DESIGN.md`
2. `docs/00-project-brief.md`
3. `docs/01-research-and-content.md`
4. `docs/02-information-architecture.md`
5. `docs/03-functional-spec.md`
6. `docs/04-content-model.md`
7. `docs/05-implementation-plan.md`
8. `docs/06-quality-checklist.md`

If implementation conflicts with `DESIGN.md`, `DESIGN.md` wins for visual decisions.
If copied third-party component styling conflicts with `DESIGN.md`, adapt the component rather than changing the design system.

## Technical constraints
- React + TypeScript + Vite.
- Tailwind CSS v4.
- Lucide React for functional icons only.
- Motion for React (`motion`) for purposeful animation.
- Frontend-only static site. No backend, no database, no auth.
- Deploy to Vercel using Git integration.
- Content must be easy to edit from typed local data files.
- Prefer simple maintainable code over architecture for architecture's sake.

## Design constraints
- Never produce a generic SaaS landing page.
- No purple/blue startup gradients.
- No glassmorphism as a default visual language.
- No endless grid of identical rounded cards.
- No fake metrics, fake testimonials, fake awards, or invented restaurant facts.
- Food photography must be the dominant visual material.
- Use restaurant media supplied by the user/owner whenever possible.
- Do not hotlink Instagram or Google-hosted images in production.
- Do not use AI-generated food imagery as if it were a real menu item. Generated textures/abstract decorative assets are acceptable if clearly non-representational.
- Every animation must improve appetite, hierarchy, continuity, or feedback. Avoid animation for its own sake.
- Always implement `prefers-reduced-motion` behavior.

## Implementation habits
- Keep all editable restaurant content in `src/content/`.
- Keep reusable primitives in `src/components/ui/` and page sections in `src/components/sections/`.
- Avoid deep abstraction until a pattern is repeated at least twice.
- Use semantic HTML, visible focus states, useful alt text, and keyboard-safe interactions.
- Images must have explicit dimensions/aspect ratios and lazy-load below the fold.
- Test at 360px, 390px, 768px, 1024px, 1440px, and 1920px.
- Run lint, typecheck if configured, and production build before declaring a task complete.

## Definition of done for every visual task
1. Works on mobile and desktop.
2. Matches `DESIGN.md`.
3. No horizontal overflow.
4. No console errors.
5. No broken links/images.
6. Keyboard navigation remains usable.
7. Reduced motion is respected.
8. `npm run build` passes.
