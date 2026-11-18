import { ArrowRight, ArrowUpRight, BookOpen } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { SiGlovo } from 'react-icons/si'
import { restaurant } from '../../content'
import { heroMedia } from '../../content/media'
import { Container } from '../ui/Container'
import './Hero.css'

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

const heroCopy = {
  description:
    'Poulet frais mariné 24h aux épices secrètes péri-péri, braisé à la flamme vive sur charbon de bois. Choisissez votre sauce et savourez la vraie grillade au cœur d’Agadir Bay.',
  ctaMenu: 'Voir le menu',
}

export function Hero() {
  const reduce = useReducedMotion()

  return (
    <section
      id="hero"
      aria-label="Accueil Peri Peri Grill — Agadir Bay"
      className="hero-section relative overflow-hidden bg-coal-950 text-cream"
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
          className="hero-photo h-full w-full bg-coal-900 object-cover"
        />
      </motion.div>

      {/* ── Editorial Lighting & Layered Contrast Scrims ── */}
      {/* 1. Left-to-right directional scrim: deep charcoal backing for text readability, fading softly to let the grilled chicken shine on right */}
      <div
        aria-hidden="true"
        className="hero-scrim pointer-events-none absolute inset-0"
      />

      {/* 2. Bottom-to-top vignette to connect seamlessly to the next section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-coal-950 via-coal-950/20 via-25% to-transparent"
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

      {/* Content can grow beyond the viewport on small and landscape screens. */}
      <div className="relative z-10 w-full">
        <Container>
          <div className="hero-content">
            <p className="hero-eyebrow">Peri Peri Grill <span aria-hidden="true">·</span> Agadir Bay</p>
            <h1 className="hero-headline font-display uppercase text-cream">
              {headlineLines.map((line, index) => (
                <span
                  key={line.text}
                  className="hero-headline-line"
                >
                  <motion.span
                    className={`block ${
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
                    {line.accent ? <>FLAME-<wbr />GRILLED.</> : line.text}
                  </motion.span>
                </span>
              ))}
            </h1>

            {/* Ember Flame Divider Bar */}
            <motion.div
              aria-hidden="true"
              className="hero-divider h-1 w-16 origin-left rounded-full bg-gradient-to-r from-peri-red via-ember to-mustard"
              initial={reduce ? false : { scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.42, ease: 'easeOut' }}
            />

            {/* Appetizing Supporting Copy */}
            <motion.p
              className="hero-description text-cream/85"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.48, ease: 'easeOut' }}
            >
              {heroCopy.description}
            </motion.p>

            <motion.div
              className="hero-actions"
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.56, ease: 'easeOut' }}
            >
              <a
                href="/menu"
                className="hero-button hero-button-menu"
              >
                <span className="hero-button-icon" aria-hidden="true">
                  <BookOpen className="size-[18px]" />
                </span>
                <span className="hero-button-label">{heroCopy.ctaMenu}</span>
                <span className="hero-button-arrow" aria-hidden="true">
                  <ArrowRight className="size-4" />
                </span>
              </a>

              <a
                href={restaurant.links.glovo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Commander Peri Peri Grill sur Glovo (nouvel onglet)"
                className="hero-button hero-button-glovo"
              >
                <span className="hero-button-icon" aria-hidden="true">
                  <SiGlovo className="size-5" />
                </span>
                <span className="hero-button-label">Commander sur <strong>Glovo</strong></span>
                <span className="hero-button-arrow" aria-hidden="true">
                  <ArrowUpRight className="size-4" />
                </span>
              </a>
            </motion.div>
          </div>
        </Container>
      </div>
    </section>
  )
}
