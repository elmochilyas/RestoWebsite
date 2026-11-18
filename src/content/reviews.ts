import type { ReputationTheme, Review } from '../types/content'

// Checked directly on Google Maps on 2026-11-18. Verbatim excerpts of the
// text displayed by Google, including translation. sourceUrl is each review's
// actual share link. Editorial snapshot, not an automatic feed.
export const reviews: Review[] = [
  {
    id: 'mel-dim',
    quote: 'Le poulet est délicieux, les menus enfants sont super. Repas copieux ! On a très bien mangé, et on reviendra',
    rating: 5,
    reviewer: 'Mel Dim',
    source: 'Google',
    sourceUrl: 'https://maps.app.goo.gl/wv4k23tcdZ1A5UfP9',
    topic: 'À partager en famille',
    authorLabel: 'Local Guide',
    translated: true,
  },
  {
    id: 'karima-abouhay',
    quote: 'Je recommande pour les amateurs de poulets tendre, juteux et bien épicé. Personnel agréable et respectueux',
    rating: 5,
    reviewer: 'Karima ABOUHAY',
    source: 'Google',
    sourceUrl: 'https://maps.app.goo.gl/QchyiPZ7kynTUK9U6',
    topic: 'Du goût. Du caractère.',
    translated: true,
  },
  {
    id: 'jamal-jamal',
    quote: 'Très bon restaurant\nPoulet excellent et 5 niveaux de sauce de pas épicé à très épicé\nConcept magnifique',
    rating: 5,
    reviewer: 'Jamal Jamal',
    source: 'Google',
    sourceUrl: 'https://maps.app.goo.gl/8ZL269ZGKrG9MXB4A',
    topic: 'À chacun son feu',
    translated: true,
  },
]

// Reputation themes are paraphrased from public listings and are NOT verified
// customer quotations. Kept in the content layer for future use; the homepage
// Reviews section renders verified excerpts instead. Never present themes as
// customer quotations.
export const reputationThemes: ReputationTheme[] = [
  {
    id: 'peri-peri-flavour',
    label: 'Flame-grilled flavour',
    summary: 'Grilled chicken and peri-peri flavour',
  },
  {
    id: 'generous-portions',
    label: 'Generous portions',
    summary: 'Generous portions',
  },
  { id: 'varied-menu', label: 'Varied menu', summary: 'Varied menu' },
  {
    id: 'friendly-service',
    label: 'Friendly service',
    summary: 'Friendly, welcoming service',
  },
  { id: 'good-value', label: 'Good value', summary: 'Good value' },
  {
    id: 'relaxed-atmosphere',
    label: 'Relaxed atmosphere',
    summary: 'Relaxed, family-friendly atmosphere',
  },
  {
    id: 'wings-wraps',
    label: 'Wings & wraps',
    summary: 'Wings and wraps mentioned positively',
  },
]

// Homepage shows verified review excerpts only. Labels in reputationThemes are
// rendered nowhere on the homepage.
export const reviewsSection = {
  eyebrow: 'Les mots de nos clients',
  titleLines: [
    { text: 'VOUS EN' },
    { text: 'REDEMANDEZ.', accent: true },
  ] as { text: string; accent?: boolean }[],
}
