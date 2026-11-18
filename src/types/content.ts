export type DayName =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday'

export type OpeningDay = {
  day: DayName
  open: string
  close: string
  closesNextDay?: boolean
}

export type MenuCategoryId =
  | 'plateaux'
  | 'poulet-grille'
  | 'burgers'
  | 'wraps-pitas'
  | 'tacos'
  | 'specialites'
  | 'wings-bouchees'
  | 'accompagnements-sauces'
  | 'menus-enfants'
  | 'boissons-milkshakes'

export type MenuCategory = {
  id: MenuCategoryId
  name: string
  frenchName: string
  description?: string
  displayOrder: number
}

export type MenuVariant = {
  name: string
  priceMad: number
}

export type MenuItem = {
  id: string
  name: string
  categoryId: MenuCategoryId
  category?: string
  description?: string
  serves?: string
  portionCount?: 1 | 2 | 3 | 4
  priceMad?: number
  mealPriceMad?: number
  variants?: MenuVariant[]
  badge?: string
  image?: string
  imageAlt?: string
  imageStatus?: 'temporary-generated' | 'placeholder' | 'verified'
  homepageFeatured?: boolean
  featuredOrder?: number
  displayOrder?: number
  isAvailable?: boolean
  priceNeedsConfirmation?: boolean
}

export type Review = {
  id: string
  quote: string
  rating: number
  reviewer: string
  source: 'Google' | 'Tripadvisor'
  dateLabel?: string
  sourceUrl?: string
  topic?: string
  authorLabel?: string
  translated?: boolean
}

export type ReputationTheme = {
  id: string
  label: string
  summary: string
}

export type GalleryItem = {
  id: string
  image: string
  alt: string
  caption?: string
  postUrl?: string
  aspect: 'square' | 'portrait' | 'landscape'
  layoutRole?: 'anchor' | 'portrait' | 'action' | 'wide' | 'detail' | 'support'
  objectPosition?: string
  zoom?: number
}

export type GalleryReel = {
  id: string
  poster: string
  alt: string
  title: string
  subtitle: string
  objectPosition?: string
  // Add an owner-approved MP4/WebM to enable video playback. A missing source
  // renders an honest photo preview, without a misleading play button.
  videoSrc?: string
  captions?: { src: string; language: string; label: string }
}

export type HeatLevelId = 'douce' | 'moyenne' | 'forte' | 'tres-forte'

export type HeatLevel = {
  id: HeatLevelId
  label: string
}

export type FlavorId = 'very-spicy' | 'medium-spicy' | 'mango' | 'barbecue' | 'lemon-lime'

export interface FlavorItem {
  id: FlavorId
  name: string
  tagline: string
  theme: {
    accent: string
    bgGradient: string
    borderColor: string
    borderHoverColor: string
    glowColor: string
    shadowClass: string
    taglineColor: string
  }
  image: string
  imageAlt: string
}
