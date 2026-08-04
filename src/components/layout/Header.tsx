import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { MapPin, Menu, X } from 'lucide-react'
import { navLinks } from '../../content/navigation'
import { restaurant } from '../../content'
import PeriPeriLogo from '../ui/PeriPeriLogo'
import { Container } from '../ui/Container'

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1]

const NAV_ITEMS = navLinks.map((link) => ({
  ...link,
  number: String(navLinks.indexOf(link) + 1).padStart(2, '0'),
}))

export function Header() {
  const reduce = useReducedMotion()

  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('')
  const [isHeroVisible, setIsHeroVisible] = useState(true)
  const [isFooterVisible, setIsFooterVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

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
  // Render
  // ---------------------------------------------------------------------------
  const shouldShowStickyBar = isMobile && !isHeroVisible && !isFooterVisible && !mobileOpen

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-[background,border-color,backdrop-filter] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          scrolled
            ? 'border-b border-line-dark bg-coal-950/95 backdrop-blur-[8px]'
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
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.href
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`group relative py-2 text-[0.8125rem] font-semibold uppercase tracking-[0.1em] transition-colors duration-200 ${
                      isActive ? 'text-cream' : 'text-cream/60 hover:text-cream'
                    }`}
                  >
                    {item.label}
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

            {/* Desktop CTA + Mobile menu trigger */}
            <div className="flex items-center gap-4">
              {/* Desktop CTA */}
              <a
                href={restaurant.links.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden items-center gap-2 rounded-xl border border-line-dark px-5 py-2.5 text-[0.8125rem] font-bold uppercase tracking-wide text-cream transition-colors duration-200 hover:border-cream/40 hover:bg-cream/10 lg:inline-flex"
              >
                <MapPin className="size-4" aria-hidden="true" />
                Find us
              </a>

              {/* Mobile menu trigger */}
              <button
                ref={menuTriggerRef}
                type="button"
                onClick={mobileOpen ? closeMobileMenu : openMobileMenu}
                className="relative z-10 flex size-11 items-center justify-center text-cream lg:hidden"
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu-panel"
              >
                {mobileOpen ? (
                  <X className="size-6" strokeWidth={1.5} />
                ) : (
                  <Menu className="size-6" strokeWidth={1.5} />
                )}
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu-panel"
            ref={mobileMenuRef}
            role="dialog"
            aria-label="Mobile navigation"
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: -8 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: reduce ? 0 : 0.28, ease: EASE_OUT }}
            className="fixed top-[var(--header-height)] right-0 bottom-0 left-0 z-50 flex flex-col overflow-y-auto bg-coal-950 lg:hidden"
            style={{ maxHeight: 'calc(100dvh - var(--header-height))' }}
          >
            {/* Navigation items */}
            <nav
              aria-label="Mobile navigation links"
              className="flex flex-1 flex-col justify-center px-6 py-10"
            >
              <div className="space-y-1">
                {NAV_ITEMS.map((item, i) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={handleNavClick}
                    initial={reduce ? false : { opacity: 0, y: 10 }}
                    animate={reduce ? false : { opacity: 1, y: 0 }}
                    transition={{
                      duration: reduce ? 0 : 0.25,
                      delay: reduce ? 0 : i * 0.03,
                      ease: EASE_OUT,
                    }}
                    className="group flex items-baseline gap-4 border-b border-line-dark py-4 text-cream"
                  >
                    <span className="text-[0.75rem] font-semibold tracking-[0.16em] text-peri-red">
                      {item.number}
                    </span>
                    <span className="font-display text-[1.75rem] uppercase tracking-[-0.01em] transition-colors duration-200 group-hover:text-peri-red sm:text-[2rem]">
                      {item.label}
                    </span>
                  </motion.a>
                ))}
              </div>
            </nav>

            {/* Practical actions */}
            <div className="border-t border-line-dark px-6 pb-10 pt-6">
              <div className="flex flex-col gap-3">
                <a
                  href={restaurant.links.glovo}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleNavClick}
                  className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-peri-red px-6 text-base font-bold uppercase tracking-wide text-cream transition-colors duration-200 hover:bg-ember"
                >
                  Order on Glovo
                </a>
                <a
                  href={restaurant.links.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleNavClick}
                  className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-line-dark px-6 text-base font-bold uppercase tracking-wide text-cream transition-colors duration-200 hover:border-cream/40 hover:bg-cream/10"
                >
                  <MapPin className="size-4" aria-hidden="true" />
                  Find us
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile sticky bottom action bar */}
      <AnimatePresence>
        {shouldShowStickyBar && (
          <motion.div
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 12 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: reduce ? 0 : 0.25, ease: EASE_OUT }}
            className="fixed right-0 bottom-0 left-0 z-40 border-t border-line-dark bg-coal-950 px-4 pb-[env(safe-area-inset-bottom)] pt-3 lg:hidden"
          >
            <div className="flex gap-3">
              <a
                href={restaurant.links.glovo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-xl bg-peri-red px-4 text-[0.875rem] font-bold uppercase tracking-wide text-cream transition-colors duration-200 hover:bg-ember"
              >
                Order now
              </a>
              <a
                href={restaurant.links.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-xl border border-line-dark px-4 text-[0.875rem] font-bold uppercase tracking-wide text-cream transition-colors duration-200 hover:border-cream/40 hover:bg-cream/10"
              >
                <MapPin className="size-4" aria-hidden="true" />
                Find us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
