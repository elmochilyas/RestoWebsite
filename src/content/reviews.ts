import type { ReputationTheme, Review } from '../types/content'

// Verified public review excerpts only. Quotes are reproduced verbatim; never
// invent names, quotes, dates, or ratings. sourceUrl points to the public
// listing where each review was surfaced (listing page, not a fabricated
// deep link) and is kept for reference only — it is not rendered.
export const reviews: Review[] = [
  {
    id: 'yousuf-a',
    quote: 'chicken was very nice and juicy.',
    rating: 5,
    reviewer: 'Yousuf A',
    source: 'Tripadvisor',
    dateLabel: 'May 2026',
    sourceUrl:
      'https://www.tripadvisor.co.uk/Restaurant_Review-g293731-d34394620-Reviews-Peri_Peri_Grill-Agadir_Souss_Massa.html',
  },
  {
    id: 'lolita-delplanque',
    quote: 'Plats généreux - menus variés',
    rating: 5,
    reviewer: 'Lolita Delplanque',
    source: 'Google',
    sourceUrl: 'https://fr.restaurantguru.com/Peri-Peri-Grill-Agadir-Bay-Agadir',
  },
  {
    id: 'amina-allali',
    quote: 'Très bon rapport qualité prix.',
    rating: 5,
    reviewer: 'amina allali',
    source: 'Google',
    sourceUrl: 'https://fr.restaurantguru.com/Peri-Peri-Grill-Agadir-Bay-Agadir',
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
  eyebrow: 'Guest feedback',
  titleLines: [
    { text: 'LOVED BY' },
    { text: 'THE TABLE.', accent: true },
  ] as { text: string; accent?: boolean }[],
}
