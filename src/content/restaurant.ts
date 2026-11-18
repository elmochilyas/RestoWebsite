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
    googleReviews: 'https://www.google.com/maps/place/Peri+Peri+Grill+-+Agadir+Bay/@30.4009873,-9.5862738,17z/data=!4m8!3m7!1s0xdb3b7005eef9ac9:0x9d960a9e5742f997!8m2!3d30.4009873!4d-9.5862738!9m1!1b1!16s%2Fg%2F11xgb0nlhq',
    instagram: 'https://www.instagram.com/africanaperiperigrill',
    website: 'https://periperigrill.ma/',
    glovo: 'https://glovoapp.com/fr/ma/agadir/stores/peri-peri-grill-agadir-bay-agd',
    whatsapp: 'https://wa.me/212609470316',
  },
  publicInfo: {
    lastChecked: '2026-11-18',
    rating: 4.8,
    reviewCount: 178,
    priceRange: { min: 50, max: 100, currency: 'MAD' },
    hours,
  },
} as const
