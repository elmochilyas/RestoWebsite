import type { GalleryItem } from '../types/content'
import { galleryMedia } from './media'

export const gallerySection = {
  eyebrow: 'From the grill',
  titleLines: [
    { text: 'FIRE.' },
    { text: 'FOOD.', accent: true },
    { text: 'MOMENTS.' },
  ] as { text: string; accent?: boolean }[],
}

export const gallery: GalleryItem[] = [
  {
    id: 'grill-flames-chicken',
    image: galleryMedia.grillFlamesChicken.src,
    alt: galleryMedia.grillFlamesChicken.alt,
    aspect: 'landscape',
    layoutRole: 'anchor',
    objectPosition: '55% 50%',
  },
  {
    id: 'chef-grilling-chicken',
    image: galleryMedia.chefGrillingChicken.src,
    alt: galleryMedia.chefGrillingChicken.alt,
    aspect: 'portrait',
    layoutRole: 'action',
    objectPosition: '60% 45%',
  },
  {
    id: 'charred-chicken-closeup',
    image: galleryMedia.charredChickenCloseup.src,
    alt: galleryMedia.charredChickenCloseup.alt,
    aspect: 'square',
    layoutRole: 'detail',
    objectPosition: '50% 50%',
  },
  {
    id: 'shared-table',
    image: galleryMedia.sharedTable.src,
    alt: galleryMedia.sharedTable.alt,
    aspect: 'landscape',
    layoutRole: 'wide',
    objectPosition: '50% 55%',
  },
  {
    id: 'peri-peri-sauces',
    image: galleryMedia.periPeriSauces.src,
    alt: galleryMedia.periPeriSauces.alt,
    aspect: 'square',
    layoutRole: 'support',
    objectPosition: '50% 55%',
    zoom: 1.15,
  },
  {
    id: 'restaurant-atmosphere',
    image: galleryMedia.restaurantAtmosphere.src,
    alt: galleryMedia.restaurantAtmosphere.alt,
    aspect: 'portrait',
    layoutRole: 'portrait',
    objectPosition: '68% 50%',
    zoom: 1.12,
  },
]
