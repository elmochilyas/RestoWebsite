import type { MenuItem } from '../types/content'
import { dishMedia } from './media'

const temporaryDish = (id: keyof typeof dishMedia) => ({
  image: dishMedia[id].src,
  imageAlt: dishMedia[id].alt,
  imageStatus: 'temporary-generated' as const,
})

export const menuItems: MenuItem[] = [
  { id: 'duo', name: 'Duo', homepageFeatured: true },
  { id: 'juste-pour-une-personne', name: 'Juste pour une personne', homepageFeatured: true },
  {
    id: 'chicken-and-rice',
    name: 'Chicken & Rice',
    homepageFeatured: true,
    ...temporaryDish('chicken-and-rice'),
  },
  {
    id: 'mega-feast',
    name: 'Mega Feast',
    homepageFeatured: true,
    ...temporaryDish('mega-feast'),
  },
  { id: 'family-feast', name: 'Family Feast' },
  {
    id: 'flamin-wings',
    name: 'Flamin Wings',
    category: 'wings',
    homepageFeatured: true,
    ...temporaryDish('flamin-wings'),
  },
  { id: 'loaded-box', name: 'Loaded Box', category: 'boxes', homepageFeatured: true },
  { id: 'peri-royale', name: 'Peri Royale', homepageFeatured: true },
  {
    id: 'the-wrapster',
    name: 'The Wrapster',
    category: 'wraps',
    homepageFeatured: true,
    ...temporaryDish('the-wrapster'),
  },
  { id: 'smokey-bbq', name: 'Smokey BBQ' },
  { id: 'peri-wings', name: 'Peri Wings', category: 'wings' },
  { id: 'chicken-n-beef', name: 'Chicken N Beef' },
]
