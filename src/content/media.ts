/**
 * Temporary generated visual — replace with owner-approved restaurant
 * photography before production.
 *
 * All images in this registry are AI-generated design stand-ins, NOT verified
 * photographs of Peri Peri Grill's dishes or kitchen. Alt text describes only
 * what is visibly shown in each image.
 */
import type { ImageMetadata } from 'astro'
import type { HeatLevelId } from '../types/content'
import heroGrilledChicken from '../assets/restaurant/hero/hero-grilled-chicken.webp'
import grillFlames from '../assets/restaurant/atmosphere/grill-flames.webp'
import heatLevelDouce from '../assets/restaurant/heat-levels/douce.webp'
import heatLevelMoyenne from '../assets/restaurant/heat-levels/moyenne.webp'
import heatLevelForte from '../assets/restaurant/heat-levels/forte.webp'
import heatLevelTresForte from '../assets/restaurant/heat-levels/tres-forte.webp'
import chickenRice from '../assets/dishes/chicken-rice.webp'
import chickenWrap from '../assets/dishes/chicken-wrap.webp'
import periPeriWings from '../assets/dishes/peri-peri-wings.webp'
import feastPlatter from '../assets/dishes/feast-platter.webp'
import galleryGrillFlamesChicken from '../assets/restaurant/gallery/grill-flames-chicken.webp'
import galleryChefGrillingChicken from '../assets/restaurant/gallery/chef-grilling-chicken.webp'
import galleryCharredChickenCloseup from '../assets/restaurant/gallery/charred-chicken-closeup.webp'
import gallerySharedTable from '../assets/restaurant/gallery/shared-table.webp'
import galleryPeriPeriSauces from '../assets/restaurant/gallery/peri-peri-sauces.webp'
import galleryRestaurantAtmosphere from '../assets/restaurant/gallery/restaurant-atmosphere.webp'

const toSrc = (img: ImageMetadata | string): string =>
  typeof img === 'string' ? img : img.src

export const heroMedia = {
  src: toSrc(heroGrilledChicken),
  alt: 'Flame-grilled chicken glowing over a charcoal grill',
  status: 'temporary-generated' as const,
}

export const atmosphereFlames = {
  src: toSrc(grillFlames),
  alt: 'Live flames rising over the grill',
  status: 'temporary-generated' as const,
}

export const heatLevelMedia = {
  douce: {
    src: toSrc(heatLevelDouce),
    alt: 'Stylized man exhaling a small warm ember trail',
    status: 'temporary-generated' as const,
  },
  moyenne: {
    src: toSrc(heatLevelMoyenne),
    alt: 'Stylized man exhaling a stronger glowing heat stream',
    status: 'temporary-generated' as const,
  },
  forte: {
    src: toSrc(heatLevelForte),
    alt: 'Stylized man reacting to heat while breathing a strong flame',
    status: 'temporary-generated' as const,
  },
  'tres-forte': {
    src: toSrc(heatLevelTresForte),
    alt: 'Stylized man with an intense expression breathing a large burst of fire',
    status: 'temporary-generated' as const,
  },
} satisfies Record<HeatLevelId, { src: string; alt: string; status: 'temporary-generated' }>

export const dishMedia = {
  'chicken-and-rice': {
    src: toSrc(chickenRice),
    alt: 'Grilled chicken with rice and salad',
  },
  'the-wrapster': {
    src: toSrc(chickenWrap),
    alt: 'Grilled chicken wrap with fresh fillings',
  },
  'flamin-wings': {
    src: toSrc(periPeriWings),
    alt: 'Char-grilled chicken wings with a creamy dipping sauce',
  },
  'mega-feast': {
    src: toSrc(feastPlatter),
    alt: 'Large platter of flame-grilled chicken with sides',
  },
} satisfies Record<string, { src: string; alt: string }>

export const galleryMedia = {
  grillFlamesChicken: {
    src: toSrc(galleryGrillFlamesChicken),
    alt: 'Flame-grilled chicken cooking over an open charcoal grill',
    status: 'temporary-generated' as const,
  },
  chefGrillingChicken: {
    src: toSrc(galleryChefGrillingChicken),
    alt: 'Chef turning grilled chicken over open flames with metal tongs',
    status: 'temporary-generated' as const,
  },
  charredChickenCloseup: {
    src: toSrc(galleryCharredChickenCloseup),
    alt: 'Close-up of grilled chicken with caramelized charred edges',
    status: 'temporary-generated' as const,
  },
  sharedTable: {
    src: toSrc(gallerySharedTable),
    alt: 'Shared table with grilled chicken, fries, rice, salad and sauces',
    status: 'temporary-generated' as const,
  },
  periPeriSauces: {
    src: toSrc(galleryPeriPeriSauces),
    alt: 'Selection of sauces and dips served beside grilled food',
    status: 'temporary-generated' as const,
  },
  restaurantAtmosphere: {
    src: toSrc(galleryRestaurantAtmosphere),
    alt: 'Warm restaurant dining scene with grilled food and guests',
    status: 'temporary-generated' as const,
  },
} satisfies Record<string, { src: string; alt: string; status: 'temporary-generated' }>
