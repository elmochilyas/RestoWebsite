# Project Brief

## Project
Peri Peri Grill — Agadir Bay showcase website redesign/proposal.

## Goal
Create a front-end-only website that is visually impressive enough to present to the restaurant owner as a concrete redesign proposal, while remaining simple to maintain and easy to deploy on Vercel.

The first version is not a complex product. It should optimize for:
1. strong first impression;
2. appetite and brand identity;
3. easy access to menu, ordering, directions, phone, and social media;
4. excellent mobile UX;
5. fast load time;
6. easy future edits.

## Target audiences
- Local customers in Agadir.
- Tourists staying around Agadir Bay.
- Instagram/TikTok visitors who want menu, location, hours, and a quick action.
- The restaurant owner evaluating the proposal.

## Tech stack
- React
- TypeScript
- Vite
- Tailwind CSS v4
- Lucide React
- Motion for React (`motion`)
- Vercel

This is a static frontend. No backend/database/authentication in v1.

## Optional small dependencies
Only add a dependency when it removes meaningful complexity. Examples:
- `clsx` / `tailwind-merge` only if component composition needs it.
- A lightweight carousel is not required; use CSS scroll snap + Motion first.
- Do not add a full UI kit unless a specific component justifies it.

## Deployment
- GitHub repository connected to Vercel.
- Every pull request gets a Preview deployment.
- `main` deploys to Production.
- GitHub Actions quality job runs lint + production build before merge.

## Product scope v1
- One highly polished home page.
- Menu highlights and category preview.
- Story/flavour section.
- Instagram/gallery section using local optimized assets.
- Reviews/social proof.
- Location + opening hours + phone.
- Order link(s) and directions.
- Responsive navigation and mobile sticky action.
- Metadata, social share image, favicon, robots.txt, sitemap.

## Explicit non-goals v1
- Online checkout.
- Reservation system.
- Admin dashboard.
- CMS.
- Login/accounts.
- Database.
- Custom API.
- Live Instagram API integration.

## Future-friendly extension points
- Full `/menu` page.
- Language toggle (FR/EN; Arabic optional later).
- CMS (Sanity/Contentful/Notion) if the owner wants self-service editing.
- Online reservation/contact form via a serverless form provider.
- Analytics and conversion events.
- Multiple restaurant locations.
