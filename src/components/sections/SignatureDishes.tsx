import { ArrowRight } from 'lucide-react'
import { menuItems } from '../../content'
import type { MenuItem } from '../../types/content'
import { Container } from '../ui/Container'
import { Eyebrow } from '../ui/Eyebrow'

const dishOrder = [
  'mega-feast',
  'flamin-wings',
  'chicken-and-rice',
  'the-wrapster',
] as const

const layout: Record<string, { card: string; title: string }> = {
  'mega-feast': {
    card: 'col-span-2 aspect-[4/3] lg:col-span-7 lg:aspect-[4/3]',
    title: 'text-2xl sm:text-3xl lg:text-4xl',
  },
  'flamin-wings': {
    card: 'aspect-[3/4] lg:aspect-auto lg:col-span-5',
    title: 'text-lg sm:text-xl lg:text-3xl',
  },
  'chicken-and-rice': {
    card: 'aspect-[3/4] lg:col-span-4 lg:aspect-[4/5]',
    title: 'text-lg sm:text-xl lg:text-3xl',
  },
  'the-wrapster': {
    card: 'col-span-2 aspect-[4/3] lg:aspect-auto lg:col-span-8',
    title: 'text-2xl sm:text-3xl lg:text-4xl',
  },
}

const featured = dishOrder
  .map((id) => menuItems.find((item) => item.id === id))
  .filter((item): item is MenuItem => Boolean(item?.image && item.imageAlt))

function DishCard({
  dish,
  className = '',
  titleClass = '',
}: {
  dish: MenuItem
  className?: string
  titleClass?: string
}) {
  return (
    <article
      className={`group relative overflow-hidden rounded-[20px] bg-coal-900 ${className}`}
    >
      <img
        src={dish.image}
        alt={dish.imageAlt ?? ''}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-coal-950/90 via-coal-950/35 to-transparent"
      />
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 lg:p-6">
        {dish.category && (
          <p className="text-eyebrow uppercase text-cream/70">{dish.category}</p>
        )}
        <h3 className={`mt-1 font-display uppercase text-cream ${titleClass}`}>
          {dish.name}
        </h3>
      </div>
    </article>
  )
}

export function SignatureDishes() {
  return (
    <section className="bg-cream py-20 text-ink sm:py-24 lg:py-32">
      <Container>
        <header className="mb-10 sm:mb-14 lg:mb-16 lg:flex lg:items-end lg:justify-between lg:gap-8">
          <div>
            <Eyebrow tone="light">Signature dishes</Eyebrow>
            <h2 className="mt-4 font-display text-h2 uppercase text-ink sm:mt-6">
              Made for
              <span className="block text-peri-red">The flame.</span>
            </h2>
          </div>
          <a
            href="#menu"
            className="group mt-6 inline-flex items-center gap-2 text-base font-bold text-ink underline-offset-4 hover:underline lg:mt-0"
          >
            Voir le menu
            <ArrowRight
              aria-hidden="true"
              className="size-5 transition-transform duration-200 group-hover:translate-x-1"
            />
          </a>
        </header>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-12 lg:gap-6">
          {featured.map((dish) => {
            const item = layout[dish.id]
            return (
              <DishCard
                key={dish.id}
                dish={dish}
                className={`h-full ${item?.card ?? ''}`}
                titleClass={item?.title}
              />
            )
          })}
        </div>
      </Container>
    </section>
  )
}
