import type { GalleryItem, GalleryReel } from '../types/content'
import { galleryMedia } from './media'

export const gallerySection = {
  eyebrow: 'La vie côté grill',
  titleLines: [
    { text: 'LA FLAMME.' },
    { text: 'L’AMBIANCE.', accent: true },
  ] as { text: string; accent?: boolean }[],
}

// Four 9:16 compositions, ready for owner-supplied videos. Existing generated
// artwork is used only as a temporary photo preview; no fake video playback.
export const galleryReels: GalleryReel[] = [
  {
    id: 'reel-flame', poster: galleryMedia.grillFlamesChicken.src,
    alt: galleryMedia.grillFlamesChicken.alt,
    title: 'Tout feu.', subtitle: 'Là où le goût commence.', objectPosition: '55% center',
  },
  {
    id: 'reel-grill', poster: galleryMedia.chefGrillingChicken.src,
    alt: galleryMedia.chefGrillingChicken.alt,
    title: 'Tout le geste.', subtitle: 'Le grill donne le rythme.', objectPosition: '60% center',
  },
  {
    id: 'reel-chicken', poster: galleryMedia.charredChickenCloseup.src,
    alt: galleryMedia.charredChickenCloseup.alt,
    title: 'Tout le goût.', subtitle: 'Doré. Braisé. Péri-péri.', objectPosition: 'center',
  },
  {
    id: 'reel-sauces', poster: galleryMedia.periPeriSauces.src,
    alt: galleryMedia.periPeriSauces.alt,
    title: 'Votre touche.', subtitle: 'À chacun son intensité.', objectPosition: '55% center',
  },
]

export const galleryPhotos = [
  { id: 'gallery-place', image: galleryMedia.restaurantAtmosphere.src,
    alt: galleryMedia.restaurantAtmosphere.alt, caption: 'L’esprit du lieu.',
    label: '01 / L’AMBIANCE', objectPosition: '68% center' },
  { id: 'gallery-table', image: galleryMedia.sharedTable.src,
    alt: galleryMedia.sharedTable.alt, caption: 'Les bons moments se partagent.',
    label: '02 / À TABLE', objectPosition: 'center' },
]

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
