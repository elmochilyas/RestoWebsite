# Functional Specification

## Navigation
- Sticky/overlay header.
- Smooth anchor navigation.
- Active section feedback optional, not required.
- Mobile menu is keyboard accessible and closes on selection/Escape.

## Hero
- Full viewport media.
- Primary and secondary CTAs.
- Show verified location/rating/open-late proof only from data config.
- Graceful static image fallback if hero video is used.

## Signature dishes
- Render from `src/content/menu.ts`.
- 5–8 featured dishes maximum.
- Touch-friendly horizontal rail on small screens.
- Desktop may use asymmetric editorial layout or scroll rail.
- Each dish supports image, name, optional description, optional verified price, category.

## Heat selector
- 4–5 levels.
- Hover + keyboard + tap behavior.
- Selected state updates label/copy.
- No server state.
- Accessible buttons/radio semantics.

## Story
- Static structured content.
- Link to full menu/order or “discover flavours.”

## Gallery
- Local optimized images only.
- Optional click-through to Instagram posts/profile.
- No mandatory Instagram API/embed.
- Image loading deferred below fold.

## Reviews
- Render short verified excerpts/paraphrases from `src/content/reviews.ts`.
- Include source.
- Optional animated horizontal motion; static fallback with reduced motion.

## Visit
- Address.
- Current weekly hours.
- Click-to-call.
- Google Maps directions link.
- Instagram link.
- Order link.
- Map embed is optional; prefer click-to-open to protect performance.

## SEO/social
- Descriptive title and meta description.
- Open Graph image.
- Restaurant JSON-LD with only verified data.
- Canonical URL once domain is known.
- `robots.txt` and `sitemap.xml`.

## Performance
Targets for production build under realistic mobile throttling:
- LCP < 2.5s when practical.
- CLS < 0.1.
- Avoid shipping full-resolution Instagram source files.
- Hero image should be responsive and compressed; video optional and carefully optimized.

## Error/fallback behavior
- Missing dish image: styled placeholder with dish name, never broken image icon.
- Missing price: omit price entirely.
- Missing live status: do not guess “Open now.” Show static hours.
- External links open safely when new tab is appropriate.
