import { restaurant } from './restaurant'

/**
 * Brand story — paraphrased from the documented brand narrative in
 * docs/01-research-and-content.md (peri-peri roots in Southern Africa,
 * African Bird's Eye chilli, Portuguese influence, flame grilling, fresh
 * chicken, choose-your-heat). No invented dates, founders, recipes, or
 * preparation claims.
 */
export const storyContent = {
  eyebrow: 'Our story',
  titleLines: [
    { text: 'The fire behind' },
    { text: 'The flavour.', accent: true },
  ],
  beats: [
    {
      id: 'roots',
      title: 'Roots',
      body: "Peri-peri has roots in Southern Africa, where the African Bird’s Eye chilli became known for its distinctive heat.",
    },
    {
      id: 'fire',
      title: 'Fire',
      body: 'At Peri Peri Grill, the flame leads. Chicken is flame-grilled fresh over open heat, giving the food its warm, charred character.',
    },
    {
      id: 'heat',
      title: 'Your heat',
      body: 'From gentle warmth to full fire, the heat is yours to choose while peri-peri stays at the centre of the experience.',
    },
  ],
  statement: restaurant.tagline,
} as const
