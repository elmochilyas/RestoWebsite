import type { ReputationTheme, Review } from '../types/content'

export const reviews: Review[] = []

// Reputation themes are paraphrased from public listings and are NOT verified
// customer quotations. Populate `reviews` only with real excerpts (quote,
// source, optional rating/date) confirmed before the review section is enabled.
// Never invent customer names, quotes, dates, or ratings.
export const reputationThemes: ReputationTheme[] = [
  { id: 'peri-peri-flavour', summary: 'Grilled chicken and peri-peri flavour' },
  { id: 'generous-portions', summary: 'Generous portions' },
  { id: 'varied-menu', summary: 'Varied menu' },
  { id: 'friendly-service', summary: 'Friendly, welcoming service' },
  { id: 'good-value', summary: 'Good value' },
  { id: 'relaxed-atmosphere', summary: 'Relaxed, family-friendly atmosphere' },
  { id: 'wings-wraps', summary: 'Wings and wraps mentioned positively' },
]
