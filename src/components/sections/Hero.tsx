import { ArrowDown, Book, BookOpen } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { MdDeliveryDining } from 'react-icons/md'
import { SiGlovo } from 'react-icons/si'
import { restaurant } from '../../content'
import { heroMedia } from '../../content/media'
import { Container } from '../ui/Container'

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1]

type HeadlineLine = {
  text: string
  accent?: boolean
}

const headlineLines: HeadlineLine[] = [
  { text: 'FRESH.' },
  { text: 'FLAME-GRILLED.', accent: true },
  { text: 'FULL OF FIRE.' },
]

/**
 * Editorial hero copy localized for default locale (French),
 * strictly adhering to EMBER NOIR brand guidelines.
 */
const heroCopy = {
  description:
    'Poulet frais mariné 24h aux épices secrètes péri-péri, braisé à la flamme vive sur charbon de bois. Choisissez votre sauce et savourez la vraie grillade au cœur d’Agadir Bay.',
  ctaMenu: 'Voir le menu',
  ctaGlovo: 'Commander sur Glovo',
}

export function Hero() {
  const reduce = useReducedMotion()

  return (
    <section
      id="hero"
      aria-label="Accueil Peri Peri Grill — Agadir Bay"
      className="relative flex min-h-svh flex-col justify-center overflow-hidden bg-coal-950 text-cream pt-[calc(var(--header-height)+0.75rem)] short:pt-[var(--header-height)] pb-8 sm:pb-10 short:pb-5"
    >
      {/* ── Background Food Photography ── */}
      <motion.div
        className="absolute inset-0"
        initial={reduce ? false : { scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        <img
          src={heroMedia.src}
          alt={heroMedia.alt}
          fetchPriority="high"
          loading="eager"
          decoding="async"
          className="h-full w-full bg-coal-900 object-cover object-[74%_38%] sm:object-[76%_42%] lg:object-[80%_50%]"
        />
      </motion.div>

      {/* ── Editorial Lighting & Layered Contrast Scrims ── */}
      {/* 1. Left-to-right directional scrim: deep charcoal backing for text readability, fading softly to let the grilled chicken shine on right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-coal-950 via-coal-950/95 via-35% sm:via-coal-950/85 sm:via-48% lg:via-coal-950/70 lg:via-55% to-coal-950/25 lg:to-transparent"
      />

      {/* 2. Bottom-to-top vignette to connect seamlessly to the next section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-coal-950 via-coal-950/75 via-25% to-transparent"
      />

      {/* 3. Top scrim for crystal-clear floating header contrast */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-coal-950/90 via-coal-950/40 to-transparent"
      />

      {/* 4. Warm ambient ember glow underneath the grilled chicken */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[8%] top-[25%] size-80 rounded-full bg-gradient-to-br from-ember/25 via-peri-red/10 to-transparent blur-3xl lg:size-[520px]"
      />

      {/* ── Main Foreground Hero Content (Poster & Balanced CTAs) ── */}
      <div className="relative z-10 w-full">
        <Container>
          <div className="max-w-xl sm:max-w-2xl lg:max-w-3xl">
            {/* Bold Poster Headline - 3 Clean Single Lines */}
            <h1 className="font-display uppercase tracking-[-0.02em] text-cream">
              {headlineLines.map((line, index) => (
                <span
                  key={line.text}
                  className="-mb-[0.06em] block overflow-hidden pb-[0.06em]"
                >
                  <motion.span
                    className={`block whitespace-nowrap leading-[0.88] text-[clamp(2.2rem,min(7vw,5.5vh),3.25rem)] sm:text-[clamp(2.75rem,min(5.5vw,6.5vh),4.25rem)] lg:text-[clamp(3.25rem,min(4.8vw,7.5vh),4.85rem)] xl:text-[clamp(3.75rem,min(4.5vw,8.5vh),5.5rem)] short:text-[clamp(2.15rem,5.5vh,3.5rem)] ${
                      line.accent
                        ? 'text-peri-red drop-shadow-[0_4px_24px_rgba(231,55,31,0.35)]'
                        : ''
                    }`}
                    initial={reduce ? false : { y: '105%' }}
                    animate={{ y: '0%' }}
                    transition={{
                      duration: 0.65,
                      delay: 0.1 + index * 0.08,
                      ease: EASE_OUT,
                    }}
                  >
                    {line.text}
                  </motion.span>
                </span>
              ))}
            </h1>

            {/* Ember Flame Divider Bar */}
            <motion.div
              aria-hidden="true"
              className="mt-2.5 sm:mt-3.5 lg:mt-4 short:mt-2 h-1 w-16 sm:w-24 origin-left rounded-full bg-gradient-to-r from-peri-red via-ember to-mustard"
              initial={reduce ? false : { scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.42, ease: 'easeOut' }}
            />

            {/* Appetizing Supporting Copy */}
            <motion.p
              className="mt-2.5 sm:mt-3.5 lg:mt-4 short:mt-2 max-w-lg lg:max-w-xl text-xs sm:text-sm lg:text-base leading-relaxed text-cream/85 font-medium short:line-clamp-3"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.48, ease: 'easeOut' }}
            >
              {heroCopy.description}
            </motion.p>

            {/* ── Cohesive, Perfectly Sized Hero CTAs ── */}
            <motion.div
              className="mt-4 sm:mt-5 lg:mt-6 short:mt-3 flex flex-wrap items-center gap-3 sm:gap-4"
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.56, ease: 'easeOut' }}
            >
              {/* 1. Primary Action: Voir le Menu with Animated Interactive Book */}
              <a
                href="/menu"
                className="group relative inline-flex min-h-[46px] sm:min-h-[50px] short:min-h-[42px] items-center justify-center gap-2.5 overflow-hidden rounded-xl bg-gradient-to-r from-peri-red via-peri-red to-ember px-5 sm:px-6 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-cream shadow-[0_4px_20px_rgba(231,55,31,0.38)] transition-all duration-200 hover:brightness-110 hover:shadow-[0_8px_28px_rgba(231,55,31,0.58)] hover:scale-[1.02] active:scale-95 focus-visible:outline-cream"
              >
                {/* Interactive Menu Book: Opens on Hover, Closes on Leave */}
                <div className="relative flex size-5 shrink-0 items-center justify-center">
                  <Book
                    className="size-4.5 text-cream transition-all duration-300 ease-out group-hover:scale-50 group-hover:opacity-0 group-hover:-rotate-12"
                    aria-hidden="true"
                  />
                  <BookOpen
                    className="absolute size-4.5 text-cream transition-all duration-300 ease-out scale-50 opacity-0 rotate-12 group-hover:scale-105 group-hover:opacity-100 group-hover:rotate-0"
                    aria-hidden="true"
                  />
                </div>

                <span>{heroCopy.ctaMenu}</span>

                <ArrowDown
                  className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-y-0.5"
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
              </a>

              {/* 2. Secondary Action: Glovo Delivery Courier Button */}
              <a
                href={restaurant.links.glovo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Commander Peri Peri Grill sur Glovo (nouvel onglet)"
                className="group relative inline-flex min-h-[46px] sm:min-h-[50px] short:min-h-[42px] items-center justify-center gap-2.5 overflow-hidden rounded-xl bg-[#FFC244] px-5 sm:px-6 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#121f19] shadow-[0_4px_20px_rgba(255,194,68,0.28)] transition-all duration-200 hover:bg-[#ffd166] hover:shadow-[0_8px_28px_rgba(255,194,68,0.45)] hover:scale-[1.02] active:scale-95 focus-visible:outline-[#FFC244]"
              >
                {/* Glovo Brand Logo */}
                <SiGlovo className="size-5 text-[#00A082] shrink-0 transition-transform duration-200 group-hover:scale-110" aria-hidden="true" />

                <span>{heroCopy.ctaGlovo}</span>

                {/* Dark Motorcycle Delivery Courier Badge */}
                <div className="flex size-6 shrink-0 items-center justify-center rounded-md bg-[#121f19] text-[#FFC244] shadow-sm transition-transform duration-200 group-hover:scale-110 group-hover:translate-x-0.5">
                  <MdDeliveryDining className="size-4 text-[#FFC244]" aria-hidden="true" />
                </div>
              </a>
            </motion.div>
          </div>
        </Container>
      </div>
    </section>
  )
}
