# Implementation Plan — SDD Sequence

## Phase 0 — Repository and source-of-truth
- Initialize Vite React TypeScript project.
- Install Tailwind CSS v4, Lucide React, Motion.
- Add `AGENTS.md`, `DESIGN.md`, and `docs/` unchanged.
- Add scripts for lint/build.
- Create clean folder structure.
- No visual polishing yet.

## Phase 1 — Content foundation
- Create typed content files.
- Add temporary local image placeholders with correct aspect ratios.
- Wire verified restaurant links/details.
- Do not invent facts or prices.

## Phase 2 — Design foundation
- Implement font loading, color tokens, spacing, global CSS, focus styles, reduced-motion behavior.
- Build buttons, container, section heading, image frame, micro-label.
- Create nav and footer.

## Phase 3 — Hero
- Build cinematic responsive hero.
- Implement headline, proof strip, CTAs, media treatment.
- Make it proposal-quality before moving on.

## Phase 4 — Food/menu experience
- Build signature dish showcase.
- Add responsive scroll-snap/motion behavior.
- Add spice thermometer/heat selector.
- Keep interaction easy on touch.

## Phase 5 — Story/social proof
- Story editorial section.
- Gallery using supplied local media.
- Reviews using verified content.

## Phase 6 — Visit/conversion
- Location, hours, phone, maps, Instagram, order CTA.
- Mobile sticky action bar.
- Final footer.

## Phase 7 — Quality + performance
- Optimize images.
- Audit accessibility.
- Audit animation/reduced motion.
- Test target viewport widths.
- Fix Lighthouse/Core Web Vitals issues where possible.
- Ensure build/lint pass.

## Phase 8 — CI/CD + Vercel
- Push to GitHub.
- Connect Vercel Git integration.
- Production branch: `main`.
- Preview deployments on PRs.
- Add GitHub Actions quality workflow for lint/build.
- Add final production URL/canonical metadata.

## Phase 9 — Owner proposal polish
- Replace all placeholders with approved restaurant media.
- Re-verify rating, review count, hours, menu prices, order URL.
- Capture desktop + mobile screenshots.
- Prepare a 30–60 second walkthrough demonstrating hero, food interaction, menu CTA, mobile behavior, and directions.
