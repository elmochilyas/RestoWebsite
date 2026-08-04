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

export type MenuCategory = 'platters' | 'chicken' | 'wings' | 'boxes' | 'wraps' | 'burgers' | 'other'

export type MenuItem = {
  id: string
  name: string
  category?: MenuCategory
  description?: string
  priceMad?: number
  image?: string
  imageAlt?: string
  imageStatus?: 'temporary-generated' | 'verified'
  homepageFeatured?: boolean
}

export type Review = {
  id: string
  quote: string
  rating: number
  reviewer: string
  source: 'Google' | 'Tripadvisor'
  dateLabel?: string
  sourceUrl?: string
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

export type HeatLevelId = 'douce' | 'moyenne' | 'forte' | 'tres-forte'

export type HeatLevel = {
  id: HeatLevelId
  label: string
}
