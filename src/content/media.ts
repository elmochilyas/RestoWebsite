/**
 * Temporary generated visual — replace with owner-approved restaurant
 * photography before production.
 *
 * All images in this registry are AI-generated design stand-ins, NOT verified
 * photographs of Peri Peri Grill's dishes or kitchen. Alt text describes only
 * what is visibly shown in each image.
 */
import heroGrilledChicken from '../assets/restaurant/hero/hero-grilled-chicken.webp'
import grillFlames from '../assets/restaurant/atmosphere/grill-flames.webp'
import chickenRice from '../assets/dishes/chicken-rice.webp'
import chickenWrap from '../assets/dishes/chicken-wrap.webp'
import periPeriWings from '../assets/dishes/peri-peri-wings.webp'
import feastPlatter from '../assets/dishes/feast-platter.webp'

export const heroMedia = {
  src: heroGrilledChicken,
  alt: 'Flame-grilled chicken glowing over a charcoal grill',
  status: 'temporary-generated' as const,
}

export const atmosphereFlames = {
  src: grillFlames,
  alt: 'Live flames rising over the grill',
  status: 'temporary-generated' as const,
}

export const dishMedia = {
  'chicken-and-rice': {
    src: chickenRice,
    alt: 'Grilled chicken with rice and salad',
  },
  'the-wrapster': {
    src: chickenWrap,
    alt: 'Grilled chicken wrap with fresh fillings',
  },
  'flamin-wings': {
    src: periPeriWings,
    alt: 'Char-grilled chicken wings with a creamy dipping sauce',
  },
  'mega-feast': {
    src: feastPlatter,
    alt: 'Large platter of flame-grilled chicken with sides',
  },
} satisfies Record<string, { src: string; alt: string }>
