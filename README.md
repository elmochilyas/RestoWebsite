# Peri Peri Grill — Agadir Bay

A proposal-ready showcase website for **Peri Peri Grill — Agadir Bay**, built as a modern visual redesign / high-conversion refresh of the restaurant's web presence.

Frontend-only static site. React + TypeScript + Vite, Tailwind CSS v4, Lucide React, and Motion for React. Deploys to Vercel as a normal Vite project (`dist/`).

## Tech stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS v4
- Lucide React (icons)
- Motion for React (animation)
- OxLint (linting)

## Getting started

```bash
npm ci          # install dependencies (clean install)
npm run dev     # start the dev server
```

## Available scripts

```bash
npm run dev      # start dev server (Vite)
npm run build    # typecheck + production build -> dist/
npm run preview  # preview the production build locally
npm run lint     # run oxlint
```

## Deployment

This project deploys to **Vercel** via GitHub integration.

- **Pull requests** and **non-main branches** receive Vercel **Preview** deployments.
- **main** branch is the **Production** deployment.
- **GitHub Actions** runs lint and build checks on every push to `main` and on every PR.
- Vercel owns all deployment — no custom deploy scripts or CI deployment secrets are used.

### Workflow

1. Create a feature branch
2. Push and open a PR
3. GitHub CI runs `npm ci`, `npm run lint`, `npm run build`
4. Vercel automatically creates a Preview deployment
5. Review the Preview URL
6. Merge to `main`
7. Vercel deploys to Production automatically

### Environment variables

No environment variables are currently required. The site is fully static.

## Project source of truth

The design and build are driven by the checked-in spec docs. Read them in order before changing UI or content:

1. `AGENTS.md`
2. `DESIGN.md`
3. `docs/` — `00-project-brief.md` through `08-codex-prompts.md`

## Project structure

```text
src/
├── assets/          # restaurant images and visual assets (brand/, restaurant/, dishes/)
├── components/      # reusable UI primitives (ui/) and homepage sections (sections/)
├── content/         # editable restaurant data (typed, easy to update)
├── styles/          # global styles and design system
├── types/           # shared TypeScript types
├── App.tsx
└── main.tsx
```

The existing restaurant site (`periperigrill.ma`) is used as the reference point; this project is framed as a redesign proposal for the owner, not a first website.
