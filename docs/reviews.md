# Homepage Google reviews

The homepage uses a manually verified snapshot, as requested. It makes no API
requests and does not claim to refresh automatically.

Checked on **18 November 2026** on the restaurant's Google Maps listing:
**4.8/5, 178 reviews**. The displayed selection contains three five-star reviews:

- Mel Dim: https://maps.app.goo.gl/wv4k23tcdZ1A5UfP9
- Karima ABOUHAY: https://maps.app.goo.gl/QchyiPZ7kynTUK9U6
- Jamal Jamal: https://maps.app.goo.gl/8ZL269ZGKrG9MXB4A

Excerpts preserve the text displayed in the French Google Maps interface,
including Google's translation. Relative publication dates are intentionally
omitted so they do not become misleading. Initial badges are initials, not
customer profile photos. Topic labels are editorial labels, not quotations.

To refresh, check each linked original, update `src/content/reviews.ts`, and
update the rating, count, and check date in `src/content/restaurant.ts` together.
Keep the navigation review subtitle in `src/content/navigation.ts` in sync.
The full-list CTA, rating badge, and structured data use restaurant content.
Never infer individual stars from the overall restaurant rating or invent
reviewers, review text, dates, or Google verification badges.

Automatic updates would require a Google Places or Business Profile integration
with the appropriate credentials; none are configured or needed for this version.
