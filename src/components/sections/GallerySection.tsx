import { motion, useReducedMotion } from 'motion/react'
import { gallery, gallerySection } from '../../content'
import type { GalleryItem } from '../../types/content'
import { Container } from '../ui/Container'
import { Eyebrow } from '../ui/Eyebrow'

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1]

const VIEWPORT = { once: true, margin: '-10% 0px' } as const

type GalleryLayoutRole = NonNullable<GalleryItem['layoutRole']>

const ROLE_LAYOUT: Record<
  GalleryLayoutRole,
  { base: string; md: string; lg: string }
> = {
  anchor: {
    base: 'col-span-2 aspect-[4/3]',
    md: 'md:col-span-4 md:order-1',
    lg: 'lg:col-span-7 lg:aspect-[16/9] lg:order-1',
  },
  portrait: {
    base: 'aspect-[3/4]',
    md: 'md:col-span-2 md:order-2',
    lg: 'lg:col-span-5 lg:aspect-[6/5] lg:order-2',
  },
  action: {
    base: 'aspect-[3/4]',
    md: 'md:col-span-3 md:order-4',
    lg: 'lg:col-span-4 lg:aspect-[5/6] lg:order-3',
  },
  wide: {
    base: 'col-span-2 aspect-[4/3]',
    md: 'md:col-span-6 md:aspect-[16/10] md:order-3',
    lg: 'lg:col-span-8 lg:aspect-[16/9] lg:order-4',
  },
  detail: {
    base: 'aspect-square',
    md: 'md:col-span-3 md:order-5',
    lg: 'lg:col-span-5 lg:aspect-[4/3] lg:order-5',
  },
  support: {
    base: 'aspect-square',
    md: 'md:col-span-6 md:order-6',
    lg: 'lg:col-span-7 lg:aspect-[16/10] lg:order-6',
  },
}

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
}

function GalleryImage({
  item,
  reduce,
}: {
  item: GalleryItem
  reduce: boolean | null
}) {
  const layout = ROLE_LAYOUT[item.layoutRole ?? 'support']
  const hoverClass = reduce
    ? ''
    : 'pointer-fine:group-hover:scale-[1.02] transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]'

  return (
    <motion.div
      variants={reduce ? undefined : itemVariants}
      className={`${layout.base} ${layout.md} ${layout.lg}`}
    >
      <div className="group h-full w-full overflow-hidden rounded-[20px] bg-coal-900">
        <div className="h-full w-full" style={{ scale: item.zoom ?? 1 }}>
          <img
            src={item.image}
            alt={item.alt}
            loading="lazy"
            decoding="async"
            className={`h-full w-full object-cover ${hoverClass}`}
            style={{ objectPosition: item.objectPosition }}
          />
        </div>
      </div>
    </motion.div>
  )
}

export function GallerySection() {
  const reduce = useReducedMotion()

  return (
    <section
      id="gallery"
      className="scroll-mt-24 bg-coal-950 py-20 text-cream sm:py-24 lg:py-32"
    >
      <Container>
        <header>
          <Eyebrow>{gallerySection.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-display text-h2 uppercase text-cream sm:mt-6">
            {gallerySection.titleLines.map((line) => (
              <span
                key={line.text}
                className={`block ${line.accent ? 'text-peri-red' : ''}`}
              >
                {line.text}
              </span>
            ))}
          </h2>
        </header>

        <motion.div
          className="mt-9 grid grid-cols-2 gap-2.5 sm:mt-12 md:grid-cols-6 md:gap-4 lg:mt-14 lg:grid-cols-12 lg:gap-6"
          variants={reduce ? undefined : containerVariants}
          initial={reduce ? undefined : 'hidden'}
          whileInView={reduce ? undefined : 'show'}
          viewport={VIEWPORT}
        >
          {gallery.map((item) => (
            <GalleryImage key={item.id} item={item} reduce={reduce} />
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
