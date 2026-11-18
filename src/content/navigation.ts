export const siteLocales = [
  { id: 'fr', shortLabel: 'FR', nativeName: 'Français', dir: 'ltr', routePrefix: '/', available: true },
  { id: 'en', shortLabel: 'EN', nativeName: 'English', dir: 'ltr', routePrefix: '/en/', available: false },
  { id: 'ar', shortLabel: 'AR', nativeName: 'العربية', dir: 'rtl', routePrefix: '/ar/', available: false },
] as const

export type SiteLocale = (typeof siteLocales)[number]['id']
export const defaultLocale: SiteLocale = 'fr'

type LocalizedLabel = Record<SiteLocale, string>
type SectionTarget = { kind: 'section'; path: '/'; sectionId: string }
type PageTarget = { kind: 'page'; path: `/${string}` }

export type NavigationTarget = SectionTarget | PageTarget

export type NavigationLink = {
  id: string
  number: string
  /** French fallback retained for non-localized consumers such as the footer. */
  label: string
  /** Current crawlable destination. Update only this data when a section becomes a page. */
  href: string
  labels: LocalizedLabel
  subtitles?: LocalizedLabel
  target: NavigationTarget
}

export const navLinks = [
  {
    id: 'menu', number: '01', label: 'MENU', href: '/menu',
    labels: { fr: 'MENU', en: 'MENU', ar: 'قائمة الطعام' },
    subtitles: {
      fr: 'Poulet braisé, burgers & combos',
      en: 'Flame-grilled chicken & burgers',
      ar: 'دجاج مشوي، برجر ووجبات',
    },
    target: { kind: 'page', path: '/menu' },
  },
  {
    id: 'story', number: '02', label: 'NOTRE HISTOIRE', href: '/#story',
    labels: { fr: 'NOTRE HISTOIRE', en: 'OUR STORY', ar: 'قصتنا' },
    subtitles: {
      fr: 'La flamme & la recette péri-péri',
      en: 'Flame heritage & peri-peri spices',
      ar: 'تراث ونكهة بيري بيري الأصلية',
    },
    target: { kind: 'section', path: '/', sectionId: 'story' },
  },
  {
    id: 'gallery', number: '03', label: 'GALERIE', href: '/#gallery',
    labels: { fr: 'GALERIE', en: 'GALLERY', ar: 'معرض الصور' },
    subtitles: {
      fr: 'En direct du grill & ambiance',
      en: 'Fresh from the grill & vibe',
      ar: 'مباشرة من الشواية والأجواء',
    },
    target: { kind: 'section', path: '/', sectionId: 'gallery' },
  },
  {
    id: 'reviews', number: '04', label: 'AVIS', href: '/#reviews',
    labels: { fr: 'AVIS', en: 'REVIEWS', ar: 'الآراء' },
    subtitles: {
      fr: '4,8★ · 178 avis sur Google',
      en: '4.8★ · 178 reviews on Google',
      ar: '4.7★ · تقييمات العملاء الموثوقة',
    },
    target: { kind: 'section', path: '/', sectionId: 'reviews' },
  },
  {
    id: 'visit', number: '05', label: 'VISITE', href: '/#visit',
    labels: { fr: 'VISITE', en: 'VISIT', ar: 'زيارتنا' },
    subtitles: {
      fr: 'Agadir Bay · 12:00 – 02:00',
      en: 'Agadir Bay · 12:00 – 02:00',
      ar: 'خليج أكادير · مفتوح حتى 02:00',
    },
    target: { kind: 'section', path: '/', sectionId: 'visit' },
  },
] as const satisfies readonly NavigationLink[]

export function getNavigationItems(locale: SiteLocale = defaultLocale) {
  return navLinks.map((link) => ({
    ...link,
    displayLabel: link.labels[locale],
    subtitle: link.subtitles?.[locale] ?? '',
  }))
}
