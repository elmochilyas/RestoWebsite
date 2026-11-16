import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowRight, ArrowUpRight, MapPin, Menu, Phone, X } from 'lucide-react'
import { SiGlovo, SiInstagram } from 'react-icons/si'
import { defaultLocale, getNavigationItems, navLinks } from '../../content/navigation'
import { restaurant } from '../../content'
import { Container } from '../ui/Container'
import { DesktopSegmentedLocaleSelector, LocaleSelector } from '../ui/LocaleStatus'
import PeriPeriLogo from '../ui/PeriPeriLogo'

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1]
const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

function WhatsAppIcon({ className = 'size-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

type HeaderProps = { currentPath?: string }

export function Header({ currentPath = '/' }: HeaderProps) {
  const reduceMotion = useReducedMotion()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [isHeroVisible, setIsHeroVisible] = useState(true)
  const [isFooterVisible, setIsFooterVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const menuTriggerRef = useRef<HTMLButtonElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const mobileDialogRef = useRef<HTMLDivElement>(null)

  const navItems = useMemo(() => getNavigationItems(defaultLocale), [])

  // Responsive listener
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const sync = () => {
      setIsMobile(!mq.matches)
      if (mq.matches) setMobileOpen(false)
    }
    sync()
    mq.addEventListener('change', sync)
    window.addEventListener('resize', sync, { passive: true })
    return () => {
      mq.removeEventListener('change', sync)
      window.removeEventListener('resize', sync)
    }
  }, [])

  // Scroll listener for condensing the floating pill and clearing section at top
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
      if (window.scrollY < 120) {
        setActiveSection('')
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    if (currentPath !== '/') return
    const heroEl = document.getElementById('hero')
    const sectionEls = navLinks
      .filter(
        (link): link is (typeof navLinks)[number] & { target: { kind: 'section'; sectionId: string } } =>
          link.target.kind === 'section',
      )
      .map((link) => document.getElementById(link.target.sectionId))
      .filter((el): el is HTMLElement => el !== null)

    const targets = heroEl ? [heroEl, ...sectionEls] : sectionEls
    if (targets.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting)
        if (visible) {
          setActiveSection(visible.target.id === 'hero' ? '' : visible.target.id)
        }
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 },
    )
    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [currentPath])

  // Track Hero visibility to display bottom sticky bar
  useEffect(() => {
    const hero = document.getElementById('hero')
    if (!hero) {
      setIsHeroVisible(false)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => setIsHeroVisible(entry.isIntersecting),
      { threshold: 0.15 },
    )
    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  // Track Footer visibility to dismiss sticky bar before collision
  useEffect(() => {
    const footer = document.getElementById('site-footer')
    if (!footer) return
    const observer = new IntersectionObserver(
      ([entry]) => setIsFooterVisible(entry.isIntersecting),
      { rootMargin: '0px 0px 80px 0px' },
    )
    observer.observe(footer)
    return () => observer.disconnect()
  }, [])

  // Modal body scroll lock and a11y focus trap
  useEffect(() => {
    if (!mobileOpen) return

    const prevHtmlOverflow = document.documentElement.style.overflow
    const prevBodyOverflow = document.body.style.overflow
    const backgroundElements = [
      document.getElementById('main-content'),
      document.getElementById('site-footer'),
    ].filter((el): el is HTMLElement => el instanceof HTMLElement)

    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    backgroundElements.forEach((el) => {
      el.inert = true
      el.setAttribute('aria-hidden', 'true')
    })
    const focusFrame = window.requestAnimationFrame(() => closeButtonRef.current?.focus())

    return () => {
      window.cancelAnimationFrame(focusFrame)
      document.documentElement.style.overflow = prevHtmlOverflow
      document.body.style.overflow = prevBodyOverflow
      backgroundElements.forEach((el) => {
        el.inert = false
        el.removeAttribute('aria-hidden')
      })
    }
  }, [mobileOpen])

  const openMobileMenu = useCallback(() => setMobileOpen(true), [])
  const closeMobileMenu = useCallback((restoreFocus = true) => {
    setMobileOpen(false)
    if (restoreFocus) window.requestAnimationFrame(() => menuTriggerRef.current?.focus())
  }, [])

  // Escape key & focus trapping in mobile drawer
  useEffect(() => {
    if (!mobileOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        closeMobileMenu()
        return
      }
      if (e.key !== 'Tab') return

      const dialog = mobileDialogRef.current
      if (!dialog) return
      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      } else if (!dialog.contains(document.activeElement)) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [closeMobileMenu, mobileOpen])

  const isLinkActive = useCallback(
    (item: (typeof navItems)[number]) => {
      if (item.target.kind === 'page') {
        return currentPath === item.target.path
      }
      if (currentPath !== item.target.path) return false
      // On homepage, in the hero section or top of the page, no section link should be active
      if (isHeroVisible || !activeSection) return false
      return activeSection === item.target.sectionId
    },
    [activeSection, currentPath, isHeroVisible],
  )

  const shouldShowStickyBar = isMobile && !isHeroVisible && !isFooterVisible && !mobileOpen
  const isMenuPage = currentPath === '/menu'

  return (
    <>
      {/* ── Scrolled Header Backdrop (Only on /menu to fuse seamlessly with sticky category bar) ── */}
      {isMenuPage && (
        <div
          aria-hidden="true"
          className={`pointer-events-none fixed inset-x-0 top-0 z-40 h-[70px] sm:h-[78px] bg-coal-950/98 backdrop-blur-2xl transition-opacity duration-300 border-b-0 shadow-none ${
            scrolled ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}

      {/* ── Desktop & Mobile Floating Island Header ── */}
      <header
        aria-hidden={mobileOpen ? 'true' : undefined}
        className="pointer-events-none fixed inset-x-0 top-0 z-50 pt-2.5 sm:pt-3"
      >
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div
            className={`pointer-events-auto relative flex items-center justify-between rounded-2xl border px-3.5 py-2.5 sm:rounded-full sm:px-5 sm:py-2.5 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ${
              scrolled
                ? isMenuPage
                  ? 'border-white/15 bg-coal-900/90 shadow-none backdrop-blur-2xl'
                  : 'border-white/15 bg-coal-950/95 shadow-[0_16px_40px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.05)] backdrop-blur-2xl'
                : 'border-white/10 bg-coal-950/80 shadow-[0_12px_32px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur-xl'
            }`}
          >
            {/* Left: Brand Identity */}
            <div className="flex items-center gap-3">
              <a
                href="/"
                className="group relative flex items-center rounded-lg transition-transform duration-200 hover:scale-[1.02] focus-visible:outline-cream"
                aria-label="Peri Peri Grill — Accueil"
              >
                <PeriPeriLogo
                  height={44}
                  className="h-9 w-auto sm:h-10 lg:h-[44px]"
                />
              </a>
            </div>

            {/* Center: Desktop Navigation */}
            <nav
              aria-label="Navigation principale"
              className="hidden items-center gap-6 xl:gap-8 lg:flex"
            >
              {navItems.map((item) => {
                const active = isLinkActive(item)
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    aria-current={active ? 'location' : undefined}
                    className={`group relative py-1 text-xs font-bold uppercase tracking-[0.1em] transition-colors duration-200 ${
                      active ? 'text-cream' : 'text-cream/65 hover:text-cream'
                    }`}
                  >
                    <span>{item.displayLabel}</span>
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-0 -bottom-1 h-[2px] rounded-full bg-gradient-to-r from-peri-red to-ember transition-all duration-200 ${
                        active
                          ? 'scale-x-100 opacity-100'
                          : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100 origin-left'
                      }`}
                    />
                  </a>
                )
              })}
            </nav>

            {/* Right: Desktop Controls (Language, Location, Glovo) */}
            <div className="hidden items-center gap-2 xl:gap-2.5 lg:flex">
              {/* 1. Language Selector — Tertiary / Utility */}
              <DesktopSegmentedLocaleSelector />

              {/* 2. Location Button — Secondary CTA */}
              <a
                href={restaurant.links.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-10 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 xl:px-4 text-xs font-bold uppercase tracking-wider text-cream backdrop-blur-sm transition-all duration-200 hover:border-white/25 hover:bg-white/[0.08] hover:text-white focus-visible:outline-cream active:scale-95"
                aria-label="Nous trouver à Agadir Bay sur Google Maps"
              >
                <MapPin className="size-4 text-peri-red transition-transform duration-200 group-hover:scale-110" aria-hidden="true" />
                <span>Nous trouver</span>
              </a>

              {/* 3. Glovo Button — Primary CTA */}
              <a
                href={restaurant.links.glovo}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-10 items-center gap-2 rounded-full bg-[#FFC244] px-4 xl:px-5 text-xs font-black uppercase tracking-wider text-[#121f19] shadow-[0_2px_10px_rgba(255,194,68,0.25)] transition-all duration-200 hover:bg-[#ffd166] hover:shadow-[0_4px_16px_rgba(255,194,68,0.4)] hover:scale-[1.02] focus-visible:outline-[#FFC244] active:scale-95"
                aria-label="Commander Peri Peri Grill sur Glovo"
              >
                <SiGlovo className="size-4 shrink-0 text-[#00A082]" aria-hidden="true" />
                <span className="font-extrabold tracking-wide">Commander</span>
                <ArrowUpRight
                  className="size-3.5 shrink-0 text-[#007b65] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
              </a>
            </div>

            {/* Mobile Controls (< 1024px) */}
            <div className="flex items-center gap-2 lg:hidden">
              <a
                href={restaurant.links.glovo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Commander sur Glovo"
                className="inline-flex h-10 items-center gap-1.5 rounded-full bg-[#FFC244] px-4 text-xs font-black uppercase tracking-wider text-[#121f19] shadow-[0_2px_8px_rgba(255,194,68,0.25)] transition-transform active:scale-95"
              >
                <SiGlovo className="size-3.5 text-[#00A082]" aria-hidden="true" />
                <span>Commander</span>
              </a>

              <button
                ref={menuTriggerRef}
                type="button"
                onClick={openMobileMenu}
                aria-label="Ouvrir le menu de navigation"
                aria-expanded={mobileOpen}
                aria-controls="mobile-navigation-dialog"
                className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-cream transition-all duration-200 hover:border-white/25 hover:bg-white/[0.08] focus-visible:outline-cream active:scale-95"
              >
                <Menu className="size-5 text-cream" strokeWidth={2} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Immersive Mobile Navigation Drawer (Modal) ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-navigation-dialog"
            ref={mobileDialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-navigation-title"
            dir="ltr"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
            transition={{ duration: reduceMotion ? 0 : 0.22, ease: EASE_OUT }}
            className="fixed inset-0 z-[100] flex h-screen [height:100dvh] flex-col overflow-hidden bg-coal-950/98 text-cream backdrop-blur-3xl lg:hidden"
          >
            {/* Atmospheric Flame Ambient Flare */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full bg-peri-red/20 blur-[100px]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-20 -left-20 size-80 rounded-full bg-ember/15 blur-[100px]"
            />

            {/* Modal Header */}
            <div className="relative z-10 shrink-0 border-b border-white/10 pt-[env(safe-area-inset-top)]">
              <div className="mx-auto flex h-16 w-full max-w-content items-center justify-between px-4 sm:px-6">
                <a
                  href="/"
                  onClick={() => closeMobileMenu(false)}
                  className="shrink-0 rounded-lg focus-visible:outline-cream"
                  aria-label="Peri Peri Grill — Retour à l'accueil"
                >
                  <PeriPeriLogo height={42} className="h-9 w-auto" />
                </a>

                <div className="flex items-center gap-2.5">
                  <LocaleSelector />
                  <button
                    ref={closeButtonRef}
                    type="button"
                    onClick={() => closeMobileMenu()}
                    className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.05] text-cream transition-all duration-200 hover:border-peri-red hover:bg-peri-red/20 hover:text-peri-red focus-visible:outline-cream active:scale-95"
                    aria-label="Fermer le menu"
                  >
                    <X className="size-5" strokeWidth={2.2} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>

            {/* Scrollable Content Body */}
            <div className="mobile-nav-scroll relative z-10 min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-5 sm:px-6 sm:py-6">
              <Container className="flex min-h-full flex-col justify-between space-y-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
                <div className="space-y-5">
                  {/* Category Header */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <h2
                      id="mobile-navigation-title"
                      className="text-[0.6875rem] font-extrabold uppercase tracking-[0.2em] text-smoke"
                    >
                      Explorer le restaurant
                    </h2>
                  </div>

                  {/* Clean Nav Items with Subtitles (No numbers) */}
                  <nav aria-label="Navigation mobile" className="space-y-1">
                    {navItems.map((item, index) => {
                      const active = isLinkActive(item)
                      return (
                        <motion.a
                          key={item.id}
                          href={item.href}
                          onClick={() => closeMobileMenu(false)}
                          aria-current={active ? 'location' : undefined}
                          initial={reduceMotion ? false : { opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: reduceMotion ? 0 : 0.2,
                            delay: reduceMotion ? 0 : index * 0.04,
                            ease: EASE_OUT,
                          }}
                          className={`group flex items-center justify-between rounded-2xl p-3.5 transition-all active:scale-[0.98] ${
                            active
                              ? 'border border-peri-red/40 bg-gradient-to-r from-peri-red/20 to-ember/10 shadow-[0_0_20px_rgba(231,55,31,0.25)]'
                              : 'hover:bg-white/[0.04]'
                          }`}
                        >
                          <div className="min-w-0">
                            <span
                              className={`block font-display text-xl uppercase tracking-tight transition-colors sm:text-2xl ${
                                active ? 'text-ember' : 'text-cream group-hover:text-ember'
                              }`}
                            >
                              {item.displayLabel}
                            </span>
                            {item.subtitle && (
                              <span className="block truncate text-xs text-smoke mt-0.5">
                                {item.subtitle}
                              </span>
                            )}
                          </div>
                          <ArrowRight
                            aria-hidden="true"
                            className={`size-5 shrink-0 transition-transform duration-200 group-hover:translate-x-1 ${
                              active ? 'text-ember' : 'text-white/30 group-hover:text-ember'
                            }`}
                          />
                        </motion.a>
                      )
                    })}
                  </nav>
                </div>

                {/* Conversion & Direct Contact Hub */}
                <div className="space-y-3.5 border-t border-white/10 pt-5">
                  {/* Primary Order Banner Card */}
                  <a
                    href={restaurant.links.glovo}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => closeMobileMenu(false)}
                    className="group relative flex items-center justify-between gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-peri-red via-[#f04824] to-ember p-4 text-cream shadow-[0_8px_24px_rgba(231,55,31,0.45)] transition-all active:scale-[0.98]"
                    aria-label="Commander en livraison sur Glovo"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-black/20 backdrop-blur-md">
                        <SiGlovo className="size-6 text-[#FFC244]" aria-hidden="true" />
                      </div>
                      <div>
                        <span className="block text-[0.625rem] font-black uppercase tracking-widest text-cream/80">
                          Livraison rapide à domicile
                        </span>
                        <span className="font-display text-lg uppercase leading-tight tracking-tight text-cream">
                          Commander sur Glovo
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight
                      className="size-5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={2.5}
                      aria-hidden="true"
                    />
                  </a>

                  {/* Secondary Directions Card */}
                  <a
                    href={restaurant.links.maps}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => closeMobileMenu(false)}
                    className="group flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 text-cream transition-all hover:border-white/20 hover:bg-white/[0.08] active:scale-[0.98]"
                    aria-label="Itinéraire vers le restaurant"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-peri-red/15 text-peri-red">
                        <MapPin className="size-5" strokeWidth={2.2} aria-hidden="true" />
                      </div>
                      <div>
                        <span className="block text-[0.625rem] font-bold uppercase tracking-widest text-smoke">
                          Office Centre · Agadir Bay
                        </span>
                        <span className="font-display text-base uppercase leading-tight tracking-tight text-cream">
                          Itinéraire Google Maps
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight
                      className="size-5 shrink-0 text-white/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-cream"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                  </a>

                  {/* Instant Contact Pill Buttons */}
                  <div className="pt-2">
                    <p className="text-[0.625rem] font-extrabold uppercase tracking-[0.18em] text-smoke mb-2.5">
                      Contact rapide
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {/* WhatsApp with pre-filled message */}
                      <a
                        href="https://wa.me/212609470316?text=Bonjour%20Peri%20Peri%20Grill,%20j'aimerais%20commander"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-12 items-center justify-center gap-2 rounded-xl border border-[#25D366]/40 bg-[#25D366]/10 text-xs font-bold text-[#25D366] transition-all hover:bg-[#25D366] hover:text-coal-950 active:scale-95"
                      >
                        <WhatsAppIcon className="size-4" />
                        <span>WhatsApp</span>
                      </a>

                      {/* Phone Call */}
                      <a
                        href={restaurant.phoneHref}
                        className="flex h-12 items-center justify-center gap-2 rounded-xl border border-peri-red/40 bg-peri-red/10 text-xs font-bold text-peri-red transition-all hover:bg-peri-red hover:text-cream active:scale-95"
                      >
                        <Phone className="size-4" aria-hidden="true" />
                        <span>Appeler</span>
                      </a>

                      {/* Instagram */}
                      <a
                        href={restaurant.links.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-12 items-center justify-center gap-2 rounded-xl border border-white/15 bg-gradient-to-tr from-[#833AB4] via-[#E1306C] to-[#F77737] text-xs font-bold text-white transition-all hover:brightness-110 active:scale-95"
                      >
                        <SiInstagram className="size-4" aria-hidden="true" />
                        <span>Instagram</span>
                      </a>
                    </div>
                  </div>
                </div>
              </Container>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Mobile Sticky Bottom Action Bar ── */}
      <AnimatePresence>
        {shouldShowStickyBar && (
          <motion.div
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: reduceMotion ? 0 : 0.22, ease: EASE_OUT }}
            className="fixed inset-x-3 bottom-3 z-40 mx-auto max-w-sm lg:hidden"
          >
            <div className="flex items-center gap-2 rounded-full border border-white/15 bg-coal-950/92 p-1.5 shadow-[0_12px_32px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.06)] backdrop-blur-2xl">
              <a
                href={restaurant.links.glovo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-peri-red to-ember px-4 text-xs font-extrabold uppercase tracking-wider text-cream shadow-[0_4px_16px_rgba(231,55,31,0.4)] transition-transform active:scale-[0.98]"
              >
                <SiGlovo className="size-4" aria-hidden="true" />
                <span>Commander</span>
              </a>
              <a
                href={restaurant.links.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 text-xs font-bold uppercase tracking-wider text-cream transition-colors hover:bg-white/[0.1] active:scale-[0.98]"
              >
                <MapPin className="size-3.5 text-peri-red" aria-hidden="true" />
                <span>Itinéraire</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
