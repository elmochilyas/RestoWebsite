import type { OpeningDay } from '../types/content'

const hours: OpeningDay[] = [
  { day: 'monday', open: '12:00', close: '02:00', closesNextDay: true },
  { day: 'tuesday', open: '12:00', close: '02:00', closesNextDay: true },
  { day: 'wednesday', open: '12:00', close: '02:00', closesNextDay: true },
  { day: 'thursday', open: '12:00', close: '02:00', closesNextDay: true },
  { day: 'friday', open: '14:30', close: '02:00', closesNextDay: true },
  { day: 'saturday', open: '12:00', close: '02:00', closesNextDay: true },
  { day: 'sunday', open: '12:00', close: '02:00', closesNextDay: true },
]

export const restaurant = {
  name: 'Peri Peri Grill',
  locationName: 'Agadir Bay',
  city: 'Agadir',
  address: 'Office Centre, Agadir 80000, Morocco',
  category: 'restaurant / fast food',
  tagline: 'Home of fresh flame-grilled chicken.',
  phoneDisplay: '+212 609 470 316',
  phoneHref: 'tel:+212609470316',
  links: {
    maps: 'https://maps.app.goo.gl/Kc2EKpU6KKtLf8yj8?g_st=ac',
    instagram: 'https://www.instagram.com/africanaperiperigrill',
    website: 'https://periperigrill.ma/',
    glovo: 'https://glovoapp.com/fr/ma/agadir/stores/peri-peri-grill-agadir-bay-agd',
    whatsapp: 'https://wa.me/+212609470316',
  },
  publicInfo: {
    lastChecked: '2026-08-03',
    rating: 4.7,
    reviewCount: 98,
    priceRange: { min: 50, max: 100, currency: 'MAD' },
    hours,
  },
} as const
