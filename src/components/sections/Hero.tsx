import { motion, useReducedMotion } from 'motion/react'
import { restaurant } from '../../content'
import { heroMedia } from '../../content/media'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'
import { Eyebrow } from '../ui/Eyebrow'

type HeadlineLine = {
  text: string
  accent?: boolean
}

const headlineLines: HeadlineLine[] = [
  { text: 'FRESH.' },
  { text: 'FLAME-GRILLED.', accent: true },
  { text: 'FULL OF FIRE.' },
]

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1]

/**
 * Hero media.
 *
 * Currently a temporary generated visual — replace with owner-approved
 * restaurant photography before production (see src/content/media.ts). The
 * crop keeps the chicken right-weighted and the darker left space under the
 * headline; object-position is tuned for desktop and mobile separately.
 */
function HeroMedia() {
  return (
    <img
      src={heroMedia.src}
      alt={heroMedia.alt}
      className="absolute inset-0 h-full w-full bg-coal-900 object-cover object-[55%_45%] lg:object-right"
    />
  )
}

export function Hero() {
  const reduce = useReducedMotion()

  return (
    <section className="relative flex min-h-svh flex-col overflow-hidden bg-coal-950 text-cream">
      <motion.div
        className="absolute inset-0"
        initial={reduce ? false : { scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.3, ease: 'easeOut' }}
      >
        <HeroMedia />
      </motion.div>

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-r from-coal-950 via-coal-950/55 to-transparent lg:via-coal-950/45"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-coal-950 via-coal-950/20 to-transparent"
      />

      <header className="relative z-10">
        <Container className="pt-6 sm:pt-8">
          <p className="font-display text-lg uppercase tracking-tight text-cream sm:text-2xl">
            Peri Peri Grill
          </p>
        </Container>
      </header>

      <div className="relative z-10 flex flex-1 flex-col justify-start lg:justify-end">
        <Container className="pt-10 pb-12 sm:pt-14 sm:pb-14 lg:pb-16 short:pt-8 short:pb-14 short:lg:pb-24">
          <motion.p
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.05, ease: 'easeOut' }}
          >
            <Eyebrow>Agadir bay</Eyebrow>
          </motion.p>

          <h1 className="mt-5 font-display text-hero uppercase text-cream sm:mt-8 short:mt-4 short:sm:mt-6">
            {headlineLines.map((line, index) => (
              <span
                key={line.text}
                className="-mb-[0.06em] block overflow-hidden pb-[0.06em]"
              >
                <motion.span
                  className={`block ${line.accent ? 'text-peri-red' : ''}`}
                  initial={reduce ? false : { y: '108%' }}
                  animate={{ y: '0%' }}
                  transition={{
                    duration: 0.65,
                    delay: 0.12 + index * 0.1,
                    ease: EASE_OUT,
                  }}
                >
                  {line.text}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div
            aria-hidden="true"
            className="mt-7 h-1 w-24 origin-left bg-linear-to-r from-peri-red via-ember to-mustard sm:mt-9 short:mt-5 short:sm:mt-6"
            initial={reduce ? false : { scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.42, ease: 'easeOut' }}
          />

          <motion.p
            className="mt-6 max-w-md text-body text-smoke sm:mt-8 short:mt-4 short:sm:mt-6"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
          >
            {restaurant.tagline}
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap gap-3.5 sm:mt-10 sm:gap-4 short:mt-5 short:sm:mt-7"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.57, ease: 'easeOut' }}
          >
            <Button href="#menu" withArrow>
              Voir le menu
            </Button>
            <Button
              href={restaurant.links.maps}
              variant="secondary"
              className="bg-coal-950/50 lg:bg-transparent"
              target="_blank"
              rel="noopener noreferrer"
            >
              Itinéraire
            </Button>
          </motion.div>
        </Container>
      </div>
    </section>
  )
}
