# Content Model

Keep editable data out of JSX.

Suggested structure:

```text
src/
  content/
    restaurant.ts
    menu.ts
    reviews.ts
    gallery.ts
  assets/
    brand/
    restaurant/
    dishes/
```

## `restaurant.ts`

```ts
export const restaurant = {
  name: 'Peri Peri Grill',
  locationName: 'Agadir Bay',
  address: 'Office Centre, Agadir 80000, Morocco',
  phoneDisplay: '+212 609 470 316',
  phoneHref: 'tel:+212609470316',
  instagramUrl: 'https://www.instagram.com/africanaperiperigrill',
  mapsUrl: 'USER_SUPPLIED_GOOGLE_MAPS_URL',
  orderUrl: 'VERIFIED_ORDER_URL',
  rating: 4.7,
  reviewCount: 98,
  hours: [/* typed day records */],
} as const
```

Ratings, counts, hours, prices and URLs must be treated as editable content, not implementation constants.

## `menu.ts`

Each featured item:

```ts
export type MenuItem = {
  id: string
  name: string
  category: 'platters' | 'chicken' | 'wings' | 'boxes' | 'wraps' | 'burgers' | 'other'
  description?: string
  priceMad?: number
  image: string
  featured?: boolean
}
```

## `reviews.ts`

```ts
export type Review = {
  id: string
  quote: string
  rating?: number
  source: 'Google' | 'Tripadvisor'
  dateLabel?: string
}
```

Prefer short excerpt or paraphrase. Avoid storing unnecessary reviewer personal data.

## `gallery.ts`

```ts
export type GalleryItem = {
  id: string
  image: string
  alt: string
  postUrl?: string
  aspect: 'square' | 'portrait' | 'landscape'
}
```

This separation makes later CMS migration straightforward without overengineering v1.
