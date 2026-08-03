# Codex Skills and Tooling Strategy

## Principle
Use a **small, non-overlapping skill set**. Too many design skills can fight each other and produce inconsistent output. `DESIGN.md` remains the visual source of truth.

## Recommended core skills/plugins

### 1. OpenAI `build-web-apps` plugin — HIGH PRIORITY
Useful bundled skills include:
- `frontend-app-builder`
- `frontend-testing-debugging`
- `react-best-practices`

Why it fits:
- directly aligned with frontend website implementation;
- includes testing/debugging workflow;
- React guidance is useful without forcing a heavy architecture.

For this project, skip the bundled Stripe/Supabase skills because v1 has no payments/database.
Use `shadcn-best-practices` only if we actually adopt a shadcn-derived primitive; otherwise it is unnecessary.

### 2. OpenAI image generation skill — SELECTIVE
Use for:
- abstract flame textures;
- a presentation moodboard;
- non-food decorative art;
- temporary visual placeholders clearly marked as concept assets.

Do **not** use it to fabricate a restaurant dish and present that as a real menu photo.

### 3. OpenAI Vercel deployment skill — FINAL PHASE
Use after the site is stable to assist deployment and verification.
It is more useful at Phase 8 than during design implementation.

### 4. Project-specific design guidance — ESSENTIAL
The most valuable “skill” here is the checked-in repository context:
- `AGENTS.md`
- `DESIGN.md`
- SDD docs

Codex can consistently reuse these across implementation tasks.

## Optional external design skill
A community `frontend-design` skill can be useful for a dedicated visual critique/redesign pass, but do not let it override `DESIGN.md`.
Only add it if Codex starts producing generic layouts despite the project guidance.

## Not recommended for v1
- Figma plugin, unless we decide to produce Figma first.
- Supabase/backend skills.
- Stripe skills.
- Large component-library skill packs.
- Multiple overlapping “frontend design” skills.

## Component/design resources

### Refero Styles
Use as an **inspiration and design-system research tool**, not a code dependency.
Best references for this project:
- Roberta's Pizza — bold restaurant poster energy.
- GRAZA — warm editorial food photography and oversized typography.
- Amrit Palace — warm/dark atmospheric restaurant treatment.

### Aceternity UI
Use only individual effects that fit the visual system.
Good candidates:
- Text Generate / text reveal treatment for hero copy.
- Parallax Scroll / image parallax adapted for food media.
- Focus Cards for a gallery, if it remains touch-friendly.
- Animated Testimonials for reviews, heavily restyled.

Avoid importing a whole Aceternity visual language. Their components are ingredients; `DESIGN.md` decides the final look.

## Official sources checked during planning
- OpenAI Codex / Skills: https://openai.com/index/introducing-the-codex-app/
- Current OpenAI plugins repository: https://github.com/openai/plugins
- Build Web Apps plugin: https://github.com/openai/plugins/tree/main/plugins/build-web-apps
- Vercel React/Vite deployment docs: https://vercel.com/docs/frameworks/frontend/vite
- Refero Styles: https://styles.refero.design/
- Aceternity UI: https://ui.aceternity.com/
