# Information Architecture

## V1 model: one cinematic page
A single-page experience is the right first proposal because it maximizes visual impact, minimizes routing/deployment complexity, and still serves all primary restaurant actions.

### Primary navigation
- Menu
- Flavours
- Story
- Reviews
- Visit
- Order (CTA)

### Section order
1. Hero
2. Signature dishes
3. Brand/flame ticker
4. Heat / flavour selector
5. Story
6. Social gallery
7. Reviews
8. Visit / location / hours
9. Footer

## Conversion paths

### Hungry customer
Hero → Signature dishes → Order

### Visitor choosing where to eat
Hero → Reviews → Visit → Directions / Call

### Social visitor
Hero → Gallery → Menu → Order

### Owner evaluating redesign
Hero → visual polish → brand story → responsive gallery/menu → trust/location → complete premium feel

## Mobile action model
After user scrolls past the hero, show a compact bottom action bar with two actions:
- `Commander`
- `Itinéraire`

Do not cover important content; account for safe-area insets.

## Future route expansion
If needed later:
- `/menu` — full menu categories and search/filter
- `/visit` — location, hours, map, contact
- `/story` — expanded brand story/franchise content

Do not add these routes in v1 unless the home page becomes too dense.
