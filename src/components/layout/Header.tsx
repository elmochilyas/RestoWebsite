import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowRight, Globe, MapPin, Menu, Phone, X } from 'lucide-react'
import { SiGlovo, SiGooglemaps, SiInstagram } from 'react-icons/si'
import { navLinks } from '../../content/navigation'
import { restaurant } from '../../content'
import PeriPeriLogo from '../ui/PeriPeriLogo'
import { Container } from '../ui/Container'

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1]

type Lang = 'fr' | 'en'

const NAV_LABELS: Record<Lang, Record<string, string>> = {
  fr: {
    '#menu': 'MENU',
    '#story': 'NOTRE HISTOIRE',
    '#gallery': 'GALERIE',
    '#reviews': 'AVIS',
    '#visit': 'VISITE',
  },
  en: {
    '#menu': 'MENU',
    '#story': 'OUR STORY',
    '#gallery': 'GALLERY',
    '#reviews': 'REVIEWS',
    '#visit': 'VISIT',
  },
}

const UI_TEXT = {
  fr: {
    findUs: 'Nous trouver',
    orderGlovo: 'Commander sur Glovo',
    orderNow: 'Commander',
    locationBadge: 'Agadir Bay · Ouvert jusqu’à 02h',
    phoneAria: 'Appeler le restaurant',
    whatsappAria: 'Discuter sur WhatsApp',
    instaAria: 'Suivre sur Instagram',
    mapsAria: 'Ouvrir dans Google Maps',
    language: 'Langue',
  },
  en: {
    findUs: 'Find us',
    orderGlovo: 'Order on Glovo',
    orderNow: 'Order now',
    locationBadge: 'Agadir Bay · Open until 02:00',
    phoneAria: 'Call the restaurant',
    whatsappAria: 'Chat on WhatsApp',
    instaAria: 'Follow on Instagram',
    mapsAria: 'Open in Google Maps',
    language: 'Language',
  },
}

function WhatsAppIcon({ className = 'size-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

export function Header() {
  const reduce = useReducedMotion()

  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('')
  const [isHeroVisible, setIsHeroVisible] = useState(true)
  const [isFooterVisible, setIsFooterVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [lang, setLang] = useState<Lang>('fr')

  const menuTriggerRef = useRef<HTMLButtonElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  const heroRef = useRef<Element | null>(null)
  const footerRef = useRef<Element | null>(null)
  const savedScrollRef = useRef(0)
  const previousOverflowRef = useRef<string>('')

  // ---------------------------------------------------------------------------
  // Responsive breakpoint
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const sync = () => setIsMobile(!mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  // Close mobile menu when crossing to desktop
  useEffect(() => {
    if (!isMobile && mobileOpen) {
      setMobileOpen(false)
    }
  }, [isMobile, mobileOpen])

  // ---------------------------------------------------------------------------
  // Scroll state
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 64)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ---------------------------------------------------------------------------
  // Active section tracking (reading-band approach)
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector(link.href))
      .filter((el): el is Element => el !== null)

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`)
            return
          }
        }
      },
      {
        rootMargin: '-30% 0px -60% 0px',
        threshold: 0,
      },
    )

    for (const section of sections) {
      observer.observe(section)
    }

    return () => observer.disconnect()
  }, [])

  // ---------------------------------------------------------------------------
  // Hero observation (isHeroVisible)
  // ---------------------------------------------------------------------------
  useEffect(() => {
    heroRef.current = document.getElementById('hero')
    if (!heroRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting)
      },
      { threshold: 0.2 },
    )

    observer.observe(heroRef.current)
    return () => observer.disconnect()
  }, [])

  // ---------------------------------------------------------------------------
  // Footer observation (isFooterVisible)
  // ---------------------------------------------------------------------------
  useEffect(() => {
    footerRef.current = document.querySelector('footer')
    if (!footerRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting)
      },
      { rootMargin: '0px 0px 80px 0px' },
    )

    observer.observe(footerRef.current)
    return () => observer.disconnect()
  }, [])

  // ---------------------------------------------------------------------------
  // Body scroll lock
  // ---------------------------------------------------------------------------
  const lockBody = useCallback(() => {
    savedScrollRef.current = window.scrollY
    previousOverflowRef.current = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.top = `-${savedScrollRef.current}px`
    document.body.style.width = '100%'
  }, [])

  const unlockBody = useCallback(() => {
    document.body.style.overflow = previousOverflowRef.current
    document.body.style.position = ''
    document.body.style.top = ''
    document.body.style.width = ''
    window.scrollTo(0, savedScrollRef.current)
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (mobileOpen) unlockBody()
    }
  }, [mobileOpen, unlockBody])

  // ---------------------------------------------------------------------------
  // Mobile menu open / close
  // ---------------------------------------------------------------------------
  const openMobileMenu = useCallback(() => {
    setMobileOpen(true)
    lockBody()
    setTimeout(() => {
      const firstLink = mobileMenuRef.current?.querySelector<HTMLElement>(
        'a[href], button',
      )
      firstLink?.focus()
    }, 50)
  }, [lockBody])

  const closeMobileMenu = useCallback(() => {
    setMobileOpen(false)
    unlockBody()
    menuTriggerRef.current?.focus()
  }, [unlockBody])

  // Escape key
  useEffect(() => {
    if (!mobileOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMobileMenu()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [mobileOpen, closeMobileMenu])

  // ---------------------------------------------------------------------------
  // Focus trap for mobile menu
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (!mobileOpen) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      const container = mobileMenuRef.current
      if (!container) return

      const focusable = container.querySelectorAll<HTMLElement>(
        'a[href], button, [tabindex]:not([tabindex="-1"])',
      )
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [mobileOpen])

  // ---------------------------------------------------------------------------
  // Nav link click (close mobile menu if open)
  // ---------------------------------------------------------------------------
  const handleNavClick = useCallback(() => {
    if (mobileOpen) closeMobileMenu()
  }, [mobileOpen, closeMobileMenu])

  // ---------------------------------------------------------------------------
  // Navigation items with localization
  // ---------------------------------------------------------------------------
  const navItems = navLinks.map((link, index) => ({
    ...link,
    number: String(index + 1).padStart(2, '0'),
    displayLabel: NAV_LABELS[lang][link.href] || link.label,
  }))

  const t = UI_TEXT[lang]
  const shouldShowStickyBar = isMobile && !isHeroVisible && !isFooterVisible && !mobileOpen

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-[background,border-color,backdrop-filter] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          scrolled || mobileOpen
            ? 'border-b border-line-dark/70 bg-coal-950/90 backdrop-blur-xl'
            : 'bg-transparent'
        }`}
      >
        <Container>
          <div className="relative flex h-[var(--header-height)] items-center justify-between">
            {/* Logo */}
            <a
              href="#"
              className="relative z-10 shrink-0"
              aria-label="Back to top"
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
                if (mobileOpen) closeMobileMenu()
              }}
            >
              <PeriPeriLogo
                height={isMobile ? 44 : 52}
                className="w-auto"
              />
            </a>

            {/* Desktop navigation */}
            <nav
              aria-label="Main navigation"
              className="hidden items-center gap-7 lg:flex lg:ml-12"
            >
              {navItems.map((item) => {
                const isActive = activeSection === item.href
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`group relative py-2 text-[0.8125rem] font-semibold uppercase tracking-[0.1em] transition-colors duration-200 ${
                      isActive ? 'text-cream' : 'text-cream/60 hover:text-cream'
                    }`}
                  >
                    {item.displayLabel}
                    <span
                      aria-hidden="true"
                      className={`absolute bottom-0 left-0 h-px bg-peri-red transition-[width] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </a>
                )
              })}
            </nav>

            {/* Desktop Actions & Language Toggle */}
            <div className="hidden items-center gap-4 lg:flex">
              {/* Language segmented pill */}
              <div
                role="group"
                aria-label="Language selection"
                className="flex items-center rounded-xl border border-line-dark/60 bg-coal-900/60 p-1 backdrop-blur-md"
              >
                <button
                  type="button"
                  onClick={() => setLang('fr')}
                  className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-all duration-150 ${
                    lang === 'fr'
                      ? 'bg-peri-red text-cream shadow-xs'
                      : 'text-smoke hover:text-cream'
                  }`}
                  aria-pressed={lang === 'fr'}
                >
                  FR
                </button>
                <button
                  type="button"
                  onClick={() => setLang('en')}
                  className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-all duration-150 ${
                    lang === 'en'
                      ? 'bg-peri-red text-cream shadow-xs'
                      : 'text-smoke hover:text-cream'
                  }`}
                  aria-pressed={lang === 'en'}
                >
                  EN
                </button>
              </div>

              {/* Desktop CTA */}
              <a
                href={restaurant.links.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-line-dark px-5 py-2.5 text-[0.8125rem] font-bold uppercase tracking-wide text-cream transition-colors duration-200 hover:border-cream/40 hover:bg-cream/10"
              >
                <MapPin className="size-4 text-peri-red" aria-hidden="true" />
                {t.findUs}
              </a>
            </div>

            {/* Mobile menu trigger button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                ref={menuTriggerRef}
                type="button"
                onClick={mobileOpen ? closeMobileMenu : openMobileMenu}
                className="relative z-10 flex size-11 items-center justify-center rounded-xl border border-line-dark/60 bg-coal-900/60 text-cream backdrop-blur-md transition-all active:scale-95"
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu-panel"
              >
                {mobileOpen ? (
                  <X className="size-6 text-peri-red" strokeWidth={2} />
                ) : (
                  <Menu className="size-6" strokeWidth={1.75} />
                )}
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Enhanced Glassy Mobile Menu Panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu-panel"
            ref={mobileMenuRef}
            role="dialog"
            aria-label="Mobile navigation"
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: -12 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: reduce ? 0 : 0.28, ease: EASE_OUT }}
            className="fixed inset-x-0 bottom-0 top-[var(--header-height)] z-50 flex flex-col justify-between overflow-y-auto border-t border-line-dark/60 bg-coal-950/85 backdrop-blur-2xl backdrop-saturate-150 lg:hidden"
            style={{ maxHeight: 'calc(100dvh - var(--header-height))' }}
          >
            {/* Subtle warm ember gradient accent in the background */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-peri-red/[0.08] via-transparent to-coal-950/50"
            />

            <div className="relative z-10 flex flex-1 flex-col justify-between px-5 py-5 sm:px-8">
              {/* Top sub-header: Status Badge & Language Switcher */}
              <div className="flex items-center justify-between border-b border-line-dark/40 pb-4">
                <div className="flex items-center gap-2">
                  <span className="relative flex size-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
                  </span>
                  <span className="text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-cream/80">
                    {t.locationBadge}
                  </span>
                </div>

                {/* Tactile Language Switcher */}
                <div className="flex items-center gap-1.5 rounded-xl border border-line-dark/70 bg-coal-900/80 p-1 shadow-inner">
                  <Globe className="ml-1 size-3.5 text-smoke" aria-hidden="true" />
                  <button
                    type="button"
                    onClick={() => setLang('fr')}
                    className={`rounded-lg px-2.5 py-1 text-[0.6875rem] font-bold uppercase tracking-wider transition-all duration-150 ${
                      lang === 'fr'
                        ? 'bg-peri-red text-cream shadow-xs'
                        : 'text-smoke hover:text-cream'
                    }`}
                    aria-pressed={lang === 'fr'}
                  >
                    FR
                  </button>
                  <button
                    type="button"
                    onClick={() => setLang('en')}
                    className={`rounded-lg px-2.5 py-1 text-[0.6875rem] font-bold uppercase tracking-wider transition-all duration-150 ${
                      lang === 'en'
                        ? 'bg-peri-red text-cream shadow-xs'
                        : 'text-smoke hover:text-cream'
                    }`}
                    aria-pressed={lang === 'en'}
                  >
                    EN
                  </button>
                </div>
              </div>

              {/* Navigation items with fixed geometry & aligned badges */}
              <nav aria-label="Mobile navigation links" className="my-auto py-4">
                <div className="flex flex-col gap-1.5">
                  {navItems.map((item, i) => (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      onClick={handleNavClick}
                      initial={reduce ? false : { opacity: 0, x: -10 }}
                      animate={reduce ? false : { opacity: 1, x: 0 }}
                      transition={{
                        duration: reduce ? 0 : 0.24,
                        delay: reduce ? 0 : i * 0.035,
                        ease: EASE_OUT,
                      }}
                      className="group flex items-center justify-between rounded-xl border border-transparent px-3 py-3 transition-all duration-200 hover:border-line-dark/60 hover:bg-coal-900/50 active:scale-[0.99] active:bg-coal-900/80"
                    >
                      <div className="flex items-center gap-3.5">
                        {/* Refined numeric badge */}
                        <span className="flex size-7 shrink-0 items-center justify-center rounded-lg border border-peri-red/25 bg-peri-red/10 font-mono text-[0.6875rem] font-bold tracking-wider text-peri-red transition-colors duration-200 group-hover:border-peri-red group-hover:bg-peri-red group-hover:text-cream">
                          {item.number}
                        </span>
                        <span className="font-display text-[1.4rem] uppercase tracking-[-0.01em] text-cream transition-colors duration-200 group-hover:text-peri-red sm:text-[1.65rem]">
                          {item.displayLabel}
                        </span>
                      </div>

                      <ArrowRight
                        aria-hidden="true"
                        className="size-4 shrink-0 text-smoke/40 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-peri-red"
                      />
                    </motion.a>
                  ))}
                </div>
              </nav>

              {/* High-conversion action buttons & social hub */}
              <div className="border-t border-line-dark/40 pt-4">
                <div className="flex flex-col gap-2.5">
                  {/* Primary Glovo CTA with glowing gradient */}
                  <a
                    href={restaurant.links.glovo}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleNavClick}
                    className="group relative flex min-h-[50px] items-center justify-center gap-2.5 overflow-hidden rounded-xl bg-linear-to-r from-peri-red via-[#f04229] to-ember px-5 text-[0.875rem] font-bold uppercase tracking-wider text-cream shadow-[0_4px_16px_rgba(231,55,31,0.35)] transition-all duration-200 hover:shadow-[0_6px_22px_rgba(255,106,26,0.45)] active:scale-[0.98]"
                  >
                    <SiGlovo className="size-5 shrink-0 text-[#00b140]" />
                    <span>{t.orderGlovo}</span>
                    <ArrowRight className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
                  </a>

                  {/* Secondary Directions CTA */}
                  <a
                    href={restaurant.links.maps}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleNavClick}
                    className="flex min-h-[46px] items-center justify-center gap-2 rounded-xl border border-line-dark/80 bg-coal-900/60 px-5 text-[0.8125rem] font-bold uppercase tracking-wider text-cream backdrop-blur-md transition-all duration-200 hover:border-cream/40 hover:bg-cream/10 active:scale-[0.98]"
                  >
                    <MapPin className="size-4 shrink-0 text-peri-red" aria-hidden="true" />
                    <span>{t.findUs} (Agadir Bay)</span>
                  </a>
                </div>

                {/* Social links & direct contact bar */}
                <div className="mt-4 flex items-center justify-center gap-3">
                  <a
                    href={restaurant.links.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t.instaAria}
                    className="flex size-11 items-center justify-center rounded-xl border border-line-dark/70 bg-coal-900/60 text-cream backdrop-blur-md transition-all duration-200 hover:border-peri-red/50 hover:bg-peri-red/10 hover:text-peri-red active:scale-95"
                  >
                    <SiInstagram className="size-4" />
                  </a>

                  {restaurant.links.whatsapp && (
                    <a
                      href={restaurant.links.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={t.whatsappAria}
                      className="flex size-11 items-center justify-center rounded-xl border border-line-dark/70 bg-coal-900/60 text-[#25d366] backdrop-blur-md transition-all duration-200 hover:border-emerald-500/50 hover:bg-emerald-500/10 active:scale-95"
                    >
                      <WhatsAppIcon className="size-4" />
                    </a>
                  )}

                  <a
                    href={restaurant.links.maps}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t.mapsAria}
                    className="flex size-11 items-center justify-center rounded-xl border border-line-dark/70 bg-coal-900/60 text-cream backdrop-blur-md transition-all duration-200 hover:border-peri-red/50 hover:bg-peri-red/10 hover:text-peri-red active:scale-95"
                  >
                    <SiGooglemaps className="size-4" />
                  </a>

                  <a
                    href={restaurant.phoneHref}
                    aria-label={t.phoneAria}
                    className="flex size-11 items-center justify-center rounded-xl border border-line-dark/70 bg-coal-900/60 text-cream backdrop-blur-md transition-all duration-200 hover:border-peri-red/50 hover:bg-peri-red/10 hover:text-peri-red active:scale-95"
                  >
                    <Phone className="size-4" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile sticky bottom action bar (when not inside menu) */}
      <AnimatePresence>
        {shouldShowStickyBar && (
          <motion.div
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 12 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: reduce ? 0 : 0.25, ease: EASE_OUT }}
            className="fixed right-0 bottom-0 left-0 z-40 border-t border-line-dark/70 bg-coal-950/90 backdrop-blur-xl px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] pt-3 lg:hidden"
          >
            <div className="flex gap-3">
              <a
                href={restaurant.links.glovo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-peri-red to-ember px-4 text-[0.875rem] font-bold uppercase tracking-wide text-cream shadow-[0_4px_14px_rgba(231,55,31,0.3)] transition-colors duration-200 hover:bg-ember active:scale-[0.98]"
              >
                <SiGlovo className="size-4 text-[#00b140]" />
                {t.orderNow}
              </a>
              <a
                href={restaurant.links.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-xl border border-line-dark/80 bg-coal-900/60 backdrop-blur-md px-4 text-[0.875rem] font-bold uppercase tracking-wide text-cream transition-colors duration-200 hover:border-cream/40 hover:bg-cream/10 active:scale-[0.98]"
              >
                <MapPin className="size-4 text-peri-red" aria-hidden="true" />
                {t.findUs}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
