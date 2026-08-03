# DESIGN.md — Peri Peri Grill / Agadir Bay

> **Creative direction:** **EMBER NOIR — flame-grill poster meets warm Agadir night.**
>
> The site should feel like walking toward a glowing grill after sunset: charcoal darkness, fire-red punctuation, warm cream paper, oversized poster typography, charred textures, and vivid food photography. It is energetic but not chaotic; premium but not fine-dining; youthful but not childish.

## 1. Brand feeling

Five words: **flame / bold / generous / warm / late-night**.

The restaurant sells flame-grilled peri-peri food, not software. The UI should therefore be photographic, tactile, editorial, and appetite-led. The design borrows the confidence of food posters, street signage, menus, grill marks, paper liners, and glowing embers rather than dashboard patterns.

Reference characteristics worth borrowing — not cloning:
- Roberta's Pizza / Refero: poster-like sections, one loud accent, full-bleed media, playful food-brand energy.
- Graza / Refero: editorial rhythm, warm neutrals, huge type, food photography doing most of the color work.
- Amrit Palace / Refero: dark atmospheric hero, warm food photography, minimal kinetic accents.
- Aceternity UI: selected motion primitives only — text reveal, parallax image treatment, animated testimonials/focus cards when they materially improve the page.

## 2. Color system

Use a small, decisive palette.

```css
:root {
  --color-coal-950: #120d0a;      /* main dark surface */
  --color-coal-900: #1a120e;      /* alternate dark surface */
  --color-ink: #241712;           /* text on light surfaces */
  --color-cream: #f6ead7;         /* primary light surface */
  --color-paper: #fff7e9;         /* elevated light surface */
  --color-peri-red: #e7371f;      /* primary brand action */
  --color-ember: #ff6a1a;         /* hover / flame accent */
  --color-mustard: #f2b536;       /* tiny highlights only */
  --color-smoke: #a89a8f;         /* muted text on dark */
  --color-line-dark: rgba(246, 234, 215, 0.18);
  --color-line-light: rgba(36, 23, 18, 0.16);
}
```

Rules:
- Coal + cream are the structural colors.
- Peri red is the CTA/action color.
- Ember is motion/hover/fire energy, not a second CTA color.
- Mustard is rare: spice level dots, tiny labels, or a single highlight.
- Do not add purple, cyan, or generic neon gradients.
- Gradients are allowed only as photographic overlays or flame/ember transitions using existing warm colors.

## 3. Typography

Preferred free pairing:
- **Display:** `Archivo Black` or `Bebas Neue` if the first option does not fit the logo/brand.
- **Body/UI:** `Manrope`.

Typography rules:
- Hero display: uppercase or near-uppercase, 72–148px desktop, tight line-height 0.84–0.92.
- Mobile hero display: 48–68px, still poster-like.
- Section titles: 44–80px desktop, 34–50px mobile.
- Body: 16–19px, line-height 1.55–1.7.
- Micro labels: 11–13px uppercase, letter-spacing 0.12–0.18em.
- Avoid centered paragraph blocks longer than two lines.
- Use left alignment by default; centered layout is reserved for short dramatic statements.

## 4. Layout language

- Mostly full-bleed sections with a content max width around 1280–1360px.
- Use large vertical rhythm: 96–160px desktop, 64–96px mobile.
- Alternate dark atmospheric sections with cream editorial sections.
- Favor asymmetric 55/45 or 60/40 splits over perfect 50/50 grids.
- Large photographs may bleed beyond containers or crop aggressively.
- Cards should not dominate the composition. When used, they should feel like menu posters/photo plates, not app cards.
- Border radius: imagery 18–28px; buttons pill or 12–16px depending context. Do not round every container.

## 5. Image direction

Production images should come from the restaurant's own approved media library.

Required photographic qualities:
- grilled chicken with visible char marks;
- sauce gloss and texture;
- close crops of burgers/wraps/wings;
- group platters that communicate generous portions;
- restaurant/interior/location imagery for credibility;
- warm light, strong contrast, realistic food color;
- 4:5 and 3:2 crops for cards/editorial blocks; 16:9 or taller for hero.

Avoid:
- generic stock fast-food photography unrelated to the restaurant;
- sterile white-background product shots in the hero;
- artificial AI food images presented as real dishes;
- heavy filters that make food look unnatural.

If real media is temporarily missing, use clearly labeled development placeholders and keep content dimensions production-ready.

## 6. Motion system

Motion is spicy seasoning, not the meal.

Use:
- hero copy stagger on first load (fast, 500–900ms total);
- subtle image scale/parallax on scroll;
- horizontal dish rail with inertial drag on touch/desktop;
- marquee/ticker for short brand phrases or dish names;
- spice thermometer indicator that responds to hover/tap;
- gentle CTA arrow movement and image hover crop.

Avoid:
- constant floating blobs;
- cursor-following gimmicks that interfere with food imagery;
- long page-load intro screens;
- excessive 3D transforms;
- auto-moving elements that make menu reading difficult.

All motion must degrade gracefully when `prefers-reduced-motion: reduce` is active.

## 7. Components

### Navigation
- Transparent/coal overlay over hero.
- Logo left; Menu, Story, Reviews, Visit anchors; strong `Order` CTA right.
- On scroll, condense into a dark semi-opaque bar with clear contrast.
- Mobile: compact header + accessible sheet/menu. Keep `Order` visually obvious.

### Buttons
Primary:
- Peri red fill, cream text, 48–56px height, strong weight.
- Hover: ember shift + 2–3px directional arrow motion.

Secondary:
- transparent or cream/coal inverse;
- 1px visible border;
- never glassy.

### Dish presentation
- Photo first, name second, description optional, price if verified.
- Use category chips sparingly.
- Feature 5–8 signature items on home, not the entire menu.
- Full menu may use a clean category layout on `/menu` later.

### Review cards
- 2–4 visible at once depending viewport.
- Short quotes only; source and rating visible.
- Never invent customer names or quotes.

### Spice thermometer
- Visually distinctive signature component.
- Four or five heat stops represented as a horizontal/vertical ember scale.
- Hover/tap reveals flavour note, not fake scientific heat values.

## 8. Page composition

### Hero — “The first bite”
- 90–100svh.
- Full-bleed real food or grill video/image.
- Dark overlay for readability.
- Headline direction: `FRESH. FLAME-GRILLED. FULL OF FIRE.`
- Supporting line: Peri-peri grill in Agadir Bay.
- CTAs: `Voir le menu` and `Commander`.
- Compact proof strip: Google rating, Agadir Bay, open-late cue — only with verified data.

### Signature dishes — “Craveable proof”
- Cream section.
- Large asymmetrical dish rail or editorial photo grid.
- Focus on best sellers: Duo, Juste pour une personne, Chicken & Rice, wings, Loaded Box.

### Heat / sauces — “Choose your fire”
- Dark section.
- Interactive thermometer.
- Short copy explaining customers can choose the intensity/flavour.

### Story — “From peri-peri roots to Morocco”
- Editorial split with oversized type and one atmospheric image.
- Keep copy compact; use the existing brand story as source, paraphrased.

### Social / gallery — “From the grill”
- Real restaurant posts/photos in a staggered mosaic or horizontal rail.
- Link to Instagram.
- No embedded Instagram feed dependency in v1; static assets are faster and more controllable.

### Reviews — “People came hungry”
- Short real review excerpts and current rating source.
- Optional subtle infinite row on desktop; static stack on reduced motion/mobile.

### Visit — “Find the fire”
- Agadir Bay location block with hours, phone, Directions CTA and Instagram CTA.
- Optional lightweight map image/link; avoid loading a heavy map before user interaction.

### Footer
- Logo / one-line brand statement.
- Menu, Instagram, Google Maps, Call.
- Opening hours summary.

## 9. Responsive rules

- Mobile is not a shrunk desktop. Recompose layouts deliberately.
- Hero media stays dominant, but text never sits over unreadable detail.
- Horizontal food rails should swipe naturally and show a visible next-card edge.
- Touch targets minimum 44px.
- Sticky mobile bottom `Order / Directions` bar is allowed after the hero.
- Hide decorative motion before hiding useful content.

## 10. Accessibility + visual quality

- WCAG AA contrast for functional text.
- Text over imagery always gets a deterministic overlay/scrim.
- Visible focus ring using cream/red depending surface.
- Buttons and links must have more than color as hover/focus feedback.
- No text baked into food images.
- Alt text describes the dish/content, not “image1”.

## 11. Anti-pattern blacklist

Do NOT ship:
- generic “Welcome to our restaurant” centered hero;
- 3 feature cards with icons under the hero;
- purple/orange gradient blobs;
- glass cards everywhere;
- huge empty whitespace without editorial purpose;
- fake counters such as “10K happy customers”;
- stock people smiling at salads;
- excessive emoji;
- copy that sounds like an AI marketing template;
- duplicated CTA buttons in every section;
- animation that delays access to menu or contact information.

## 12. Design acceptance test

A screenshot of the home page with all text blurred should still read as a **restaurant/food brand** because of the photography, rhythm, palette, and composition. If it could pass as a SaaS agency or crypto landing page, redesign it.
