import { ArrowRight, Star } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { restaurant, reviews, reviewsSection } from '../../content'
import type { Review } from '../../types/content'
import { Container } from '../ui/Container'
import { Eyebrow } from '../ui/Eyebrow'

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1]

const VIEWPORT = { once: true, margin: '-10% 0px' } as const

const ratingMotion = {
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: VIEWPORT,
  transition: { duration: 0.5, ease: EASE_OUT },
}

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
}

const SOURCE_META: Record<Review['source'], string> = {
  Google: 'Google',
  Tripadvisor: 'Tripadvisor',
}

function Stars({ value, className = '' }: { value: number; className?: string }) {
  const width = Math.min(100, (value / 5) * 100)

  return (
    <div aria-hidden="true" className={`relative inline-flex ${className}`}>
      <div className="flex gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} className="size-4 text-line-light" />
        ))}
      </div>
      <div
        className="absolute inset-y-0 left-0 flex gap-1 overflow-hidden"
        style={{ width: `${width}%` }}
      >
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} className="size-4 shrink-0 fill-current text-mustard" />
        ))}
      </div>
    </div>
  )
}

function StarsFilled({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`flex gap-1 ${className}`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className="size-4 fill-current text-mustard" />
      ))}
    </div>
  )
}

function ReviewCard({
  review,
  reduce,
  featured = false,
}: {
  review: Review
  reduce: boolean | null
  featured?: boolean
}) {
  const cardClass = featured
    ? 'bg-coal-950 text-cream rounded-[16px]'
    : 'border border-line-light bg-paper text-ink rounded-[14px]'
  const quoteClass = featured
    ? 'text-[clamp(1.5rem,2.4vw,2.5rem)] leading-[1.3]'
    : 'text-[clamp(1.1875rem,1.4vw,1.5625rem)] leading-[1.45]'
  const metaClass = featured ? 'text-cream/70' : 'text-ink/60'
  const paddingClass = featured ? 'p-8 sm:p-10 lg:p-12' : 'p-6 sm:p-7'

  return (
    <motion.blockquote
      variants={reduce ? undefined : itemVariants}
      {...(featured && !reduce
        ? { initial: 'hidden', whileInView: 'show', viewport: VIEWPORT }
        : {})}
      className={`flex h-full flex-col justify-between ${paddingClass} ${cardClass}`}
    >
      <div>
        {featured ? (
          <StarsFilled className="mb-5 sm:mb-6" />
        ) : (
          <StarsFilled className="mb-4" />
        )}
        <p className={`font-editorial font-[450] tracking-[-0.01em] ${quoteClass}`}>
          &ldquo;{review.quote}&rdquo;
        </p>
      </div>
      <footer className={`mt-6 sm:mt-8 ${metaClass}`}>
        <div className="text-[0.9375rem] font-bold uppercase tracking-[0.14em]">
          {review.reviewer}
        </div>
        <div className="mt-1 text-[0.75rem] font-bold uppercase tracking-[0.16em]">
          {SOURCE_META[review.source]}
          {review.dateLabel ? ` · ${review.dateLabel}` : ''}
        </div>
      </footer>
    </motion.blockquote>
  )
}

export function ReviewsSection() {
  const reduce = useReducedMotion()
  const { rating, reviewCount } = restaurant.publicInfo
  const ratingLabel = rating.toLocaleString('fr-FR')
  const featured = reviews[0]
  const supporting = reviews.slice(1)

  return (
    <section
      id="reviews"
      className="scroll-mt-24 bg-cream py-20 text-ink sm:py-24 lg:py-32"
    >
      <Container>
        <header className="lg:flex lg:items-end lg:justify-between lg:gap-8">
          <div>
            <Eyebrow tone="light">{reviewsSection.eyebrow}</Eyebrow>
            <h2 className="mt-4 font-display text-h2 uppercase text-ink sm:mt-6">
              {reviewsSection.titleLines.map((line) => (
                <span
                  key={line.text}
                  className={`block ${line.accent ? 'text-peri-red' : ''}`}
                >
                  {line.text}
                </span>
              ))}
            </h2>
          </div>

          <motion.div
            {...(reduce ? {} : ratingMotion)}
            aria-label={`Noté ${ratingLabel} sur 5 sur la base de ${reviewCount} avis Google`}
            className="mt-8 lg:mt-0 lg:shrink-0"
          >
            <div className="flex items-baseline">
              <span className="font-display text-[clamp(3.75rem,16vw,4.5rem)] leading-none tracking-[-0.02em] text-ink lg:text-[clamp(4.5rem,8vw,6.75rem)]">
                {ratingLabel}
              </span>
              <span className="ml-3 font-body text-lg font-bold text-ink/60 sm:text-xl">
                / 5
              </span>
            </div>
            <Stars value={rating} className="mt-4" />
            <p className="mt-3 text-sm font-bold uppercase tracking-[0.14em] text-ink/70">
              {reviewCount} avis Google
            </p>
          </motion.div>
        </header>

        <div className="mt-10 sm:mt-14 lg:mt-16 lg:grid lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-7">
            {featured ? (
              <ReviewCard review={featured} reduce={reduce} featured />
            ) : null}
          </div>

          <motion.div
            className="mt-4 sm:mt-6 md:grid md:grid-cols-2 md:gap-4 lg:col-span-5 lg:col-start-8 lg:mt-0 lg:grid-cols-1 lg:gap-y-6"
            variants={reduce ? undefined : containerVariants}
            initial={reduce ? undefined : 'hidden'}
            whileInView={reduce ? undefined : 'show'}
            viewport={VIEWPORT}
          >
            {supporting.map((review) => (
              <ReviewCard key={review.id} review={review} reduce={reduce} />
            ))}
          </motion.div>
        </div>

        <a
          href={restaurant.links.maps}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-10 inline-flex items-center gap-2 border-b border-peri-red pb-1 text-base font-bold text-peri-red transition-colors hover:text-ember sm:mt-12 lg:mt-14"
        >
          Voir les avis Google
          <ArrowRight
            aria-hidden="true"
            className="size-5 transition-transform duration-200 group-hover:translate-x-1"
          />
        </a>
      </Container>
    </section>
  )
}
