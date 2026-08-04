import { motion, useInView, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { storyContent } from '../../content'
import { atmosphereFlames } from '../../content/media'
import { Container } from '../ui/Container'
import { Eyebrow } from '../ui/Eyebrow'

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1]

const VIEWPORT = { once: true, margin: '-10% 0px' } as const

type StoryTitleLine = { text: string; accent?: boolean }
type StoryBeat = { id: string; title: string; body: string }

function statementLines(text: string): [string, string] {
  const words = text.split(' ')
  const split = Math.ceil(words.length / 2)
  return [words.slice(0, split).join(' '), words.slice(split).join(' ')]
}

function StoryBeat({
  beat,
  index,
  reduce,
  isDesktop,
}: {
  beat: StoryBeat
  index: number
  reduce: boolean | null
  isDesktop: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const active = useInView(
    ref,
    isDesktop ? { margin: '-43% 0px -43% 0px' } : { amount: 0.3 },
  )
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    if (active) setSeen(true)
  }, [active])

  const opacity = reduce ? 1 : !seen ? 0 : isDesktop ? (active ? 1 : 0.35) : 1
  const y = reduce ? 0 : seen ? 0 : 18

  return (
    <motion.div
      ref={ref}
      initial={false}
      animate={{ opacity, y }}
      transition={{ duration: reduce ? 0 : 0.45, ease: EASE_OUT }}
      className="max-w-[32ch]"
    >
      <div className="flex items-baseline gap-3">
        <span className="text-[0.8rem] font-bold tracking-[0.16em] text-peri-red">
          {String(index + 1).padStart(2, '0')}
        </span>
        <h3 className="text-[0.875rem] font-bold uppercase tracking-[0.14em] text-ink sm:text-[0.9375rem]">
          {beat.title}
        </h3>
      </div>
      <p className="mt-3 font-editorial text-[clamp(1.375rem,2vw,1.875rem)] font-[450] leading-[1.45] tracking-[-0.01em] text-ink">
        {beat.body}
      </p>
    </motion.div>
  )
}

export function StorySection() {
  const reduce = useReducedMotion()
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(min-width: 1024px)').matches
      : false,
  )
  const [statementLineA, statementLineB] = statementLines(storyContent.statement)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const sync = () => setIsDesktop(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  const eyebrowMotion = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: VIEWPORT,
    transition: { duration: 0.5, ease: EASE_OUT },
  }

  const headingMotion = {
    initial: { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport: VIEWPORT,
    transition: { duration: 0.55, ease: EASE_OUT },
  }

  const imageMotion = {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: VIEWPORT,
    transition: { duration: 0.55, ease: EASE_OUT },
  }

  const statementMotion = {
    initial: { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport: VIEWPORT,
    transition: { duration: 0.5, ease: EASE_OUT },
  }

  return (
    <section
      id="story"
      className="scroll-mt-24 bg-paper py-20 text-ink sm:py-24 lg:py-32"
    >
      <Container>
        <header className="lg:max-w-[70%]">
          <motion.div {...(reduce ? {} : eyebrowMotion)}>
            <Eyebrow tone="light">{storyContent.eyebrow}</Eyebrow>
          </motion.div>

          <h2 className="mt-5 font-display text-[clamp(2.125rem,5.5vw,4.75rem)] leading-[0.95] tracking-[-0.02em] uppercase text-ink sm:mt-6">
            {storyContent.titleLines.map((line: StoryTitleLine, index) => (
              <motion.span
                key={line.text}
                className={`block ${line.accent ? 'text-peri-red' : ''}`}
                {...(reduce
                  ? {}
                  : {
                      ...headingMotion,
                      transition: {
                        ...headingMotion.transition,
                        delay: 0.05 + index * 0.08,
                      },
                    })}
              >
                {line.text}
              </motion.span>
            ))}
          </h2>
        </header>

        <div className="mt-10 sm:mt-14 lg:mt-14 lg:grid lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-6">
            <div className="lg:sticky lg:top-[120px]">
              <motion.div {...(reduce ? {} : imageMotion)}>
                <div className="aspect-[4/3] overflow-hidden rounded-[10px] bg-coal-900 lg:aspect-[5/4]">
                  <img
                    src={atmosphereFlames.src}
                    alt={atmosphereFlames.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover object-[55%_center]"
                  />
                </div>
              </motion.div>
            </div>
          </div>

          <div className="mt-10 space-y-14 sm:mt-14 sm:space-y-16 lg:col-span-6 lg:col-start-7 lg:mt-0 lg:space-y-20">
            {storyContent.beats.map((beat, index) => (
              <StoryBeat
                key={beat.id}
                beat={beat}
                index={index}
                reduce={reduce}
                isDesktop={isDesktop}
              />
            ))}

            <motion.p
              className="mt-12 border-t border-line-light pt-8 font-display text-[clamp(1.5rem,2.2vw,2.5rem)] leading-[0.95] tracking-[-0.02em] uppercase text-ink"
              {...(reduce ? {} : statementMotion)}
            >
              {statementLineA}
              <span className="block">{statementLineB}</span>
            </motion.p>
          </div>
        </div>
      </Container>
    </section>
  )
}
