import { useRef, useState, type KeyboardEvent } from 'react'
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'motion/react'
import { heatLevels, heatSection } from '../../content'
import { heatLevelMedia } from '../../content/media'
import type { HeatLevel } from '../../types/content'
import { Container } from '../ui/Container'
import { Eyebrow } from '../ui/Eyebrow'

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1]

const FIRE_START_DELAY = 0.45

const activeFlameClasses = [
  'text-peri-red',
  'text-peri-red',
  'text-ember',
  'text-ember',
] as const

const activeCoreClasses = [
  'text-ember',
  'text-ember',
  'text-mustard',
  'text-mustard',
] as const

function FlameGlyph({
  outerClassName,
  coreClassName,
  alive,
  delay,
}: {
  outerClassName: string
  coreClassName: string
  alive: boolean
  delay: number
}) {
  return (
    <svg
      viewBox="0 0 22 32"
      fill="none"
      className="block h-full w-full"
      focusable="false"
      shapeRendering="geometricPrecision"
    >
      <path
        fill="currentColor"
        className={outerClassName}
        d="M16.2.35c.82 5.67-1.52 8.09-4.13 10.94-1.95 2.13-3.27 4.34-2.18 7.31.86-2.32 2.43-4.17 4.61-5.72-.25 4.28 5.77 7.27 5.77 12.25 0 4.55-3.86 6.87-9.5 6.87C4.61 32 .55 28.21.55 22.55.55 12.98 10.49 8.62 16.2.35Z"
      />
      <motion.path
        fill="currentColor"
        className={coreClassName}
        d="M11.29 18.05c.33 2.79 3.2 4.33 3.2 7.12 0 2.49-1.78 4.23-4.28 4.23-2.78 0-4.53-2.03-4.53-4.66 0-3.38 3.31-4.94 5.61-6.69Z"
        style={{ transformBox: 'fill-box', transformOrigin: '50% 100%' }}
        initial={false}
        animate={
          alive
            ? { scaleY: [1, 1.035, 0.975, 1], rotate: [0, 0.4, -0.35, 0] }
            : { scaleY: 1, rotate: 0 }
        }
        transition={
          alive
            ? {
                duration: 1.4,
                delay: delay + 0.25 + FIRE_START_DELAY,
                repeat: Infinity,
                ease: 'easeInOut',
              }
            : { duration: 0 }
        }
      />
    </svg>
  )
}

function HeatFlames({
  levelIndex,
  selected,
  reduce,
}: {
  levelIndex: number
  selected: boolean
  reduce: boolean | null
}) {
  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-end ${selected ? 'gap-1.5 sm:gap-2' : 'gap-1'}`}
    >
      {[0, 1, 2, 3].map((flameIndex) => {
        const filled = flameIndex <= levelIndex
        const hottestAccent = levelIndex === 3 && flameIndex === 3
        const outerColor = !filled
          ? 'text-smoke/50'
          : hottestAccent
            ? 'text-mustard'
            : activeFlameClasses[levelIndex]
        const coreColor = !filled
          ? 'text-coal-950/80'
          : hottestAccent
            ? 'text-ember'
            : activeCoreClasses[levelIndex]
        const alive = filled && selected && !reduce

        return (
          <motion.span
            key={flameIndex}
            layout={!reduce}
            initial={false}
            animate={{ opacity: filled ? (selected ? 1 : 0.92) : 1 }}
            transition={{
              layout: { duration: reduce ? 0 : 0.42, ease: EASE_OUT },
              opacity: { duration: reduce ? 0 : 0.3, ease: EASE_OUT },
            }}
            className={`block origin-bottom ${
              selected
                ? 'h-[27px] w-5 sm:h-[29px] sm:w-[21px] lg:h-[36px] lg:w-[25px]'
                : 'h-[21px] w-[15px] sm:h-[22px] sm:w-4 lg:h-6 lg:w-[18px]'
            }`}
          >
            <motion.span
              className="block h-full w-full origin-bottom"
              initial={false}
              animate={
                alive
                  ? {
                      scaleY: [1, 1.05, 0.98, 1],
                      y: [0, -1, 1, 0],
                      rotate: [0, 0.7, -0.6, 0],
                    }
                  : { scaleY: 1, y: 0, rotate: 0 }
              }
              transition={
                alive
                  ? {
                      duration: 1.3 + (flameIndex % 2) * 0.15,
                      delay: flameIndex * 0.12 + FIRE_START_DELAY,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }
                  : { duration: 0 }
              }
            >
              <FlameGlyph
                outerClassName={outerColor}
                coreClassName={coreColor}
                alive={alive}
                delay={flameIndex * 0.12}
              />
            </motion.span>
          </motion.span>
        )
      })}
    </span>
  )
}

function SelectedIllustration({
  level,
  reduce,
}: {
  level: HeatLevel
  reduce: boolean | null
}) {
  const media = heatLevelMedia[level.id]

  return (
    <motion.div
      aria-hidden="true"
      className="absolute inset-0 z-0 overflow-hidden lg:left-auto lg:w-[54%]"
      data-media-status={media.status}
      initial={reduce ? false : { opacity: 0, y: 8 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { duration: reduce ? 0 : 0.24, delay: reduce ? 0 : 0.05, ease: EASE_OUT },
      }}
      exit={{
        opacity: 0,
        y: 8,
        transition: { duration: reduce ? 0 : 0.15, ease: EASE_OUT },
      }}
    >
      <motion.img
        src={media.src}
        alt=""
        width="1200"
        height="900"
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover"
        initial={reduce ? false : { scale: 1.015 }}
        animate={{
          scale: 1,
          transition: { duration: reduce ? 0 : 0.26, delay: reduce ? 0 : 0.05, ease: EASE_OUT },
        }}
        exit={{
          scale: 1.01,
          transition: { duration: reduce ? 0 : 0.15, ease: EASE_OUT },
        }}
      />
      <span className="absolute inset-0 bg-linear-to-r from-coal-950/70 via-coal-950/15 to-transparent" />
      <span className="absolute inset-0 bg-linear-to-t from-coal-950/55 via-transparent to-transparent lg:hidden" />
    </motion.div>
  )
}

function HeatStack({
  selected,
  onChange,
  reduce,
}: {
  selected: number
  onChange: (index: number) => void
  reduce: boolean | null
}) {
  const rowRefs = useRef<(HTMLButtonElement | null)[]>([])
  const layoutTransition = { duration: reduce ? 0 : 0.42, ease: EASE_OUT }

  function moveTo(index: number) {
    onChange(index)
    rowRefs.current[index]?.focus()
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = heatLevels.length - 1
    let next: number | null = null

    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowLeft':
        next = index === 0 ? last : index - 1
        break
      case 'ArrowDown':
      case 'ArrowRight':
        next = index === last ? 0 : index + 1
        break
      case 'Home':
        next = 0
        break
      case 'End':
        next = last
        break
      default:
        return
    }

    event.preventDefault()
    moveTo(next)
  }

  return (
    <LayoutGroup>
      <div
        role="radiogroup"
        aria-labelledby="heat-stack-title"
        className="border-t border-line-dark"
      >
        {heatLevels.map((level, index) => {
          const active = index === selected
          const number = String(index + 1).padStart(2, '0')

          return (
            <motion.button
              key={level.id}
              ref={(node) => {
                rowRefs.current[index] = node
              }}
              type="button"
              role="radio"
              aria-label={`${level.label}, ${index + 1} sur ${heatLevels.length}`}
              aria-checked={active}
              tabIndex={active ? 0 : -1}
              data-active={active}
              onClick={() => onChange(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              layout={!reduce}
              transition={{ layout: layoutTransition }}
              className={`group relative isolate block w-full overflow-hidden border-b border-line-dark text-left focus-visible:z-20 ${
                active
                  ? 'h-[248px] bg-coal-900 sm:h-[258px] lg:h-[264px]'
                  : 'h-[78px] bg-coal-950 hover:bg-coal-900/60 sm:h-[86px] lg:h-[108px]'
              }`}
            >
              <AnimatePresence initial={false}>
                {active && (
                  <SelectedIllustration
                    key={`illustration-${level.id}`}
                    level={level}
                    reduce={reduce}
                  />
                )}
              </AnimatePresence>

              <motion.span
                aria-hidden="true"
                className={`absolute bottom-0 left-0 z-20 h-[3px] origin-left bg-peri-red ${
                  active ? 'w-[44%] lg:w-[46%]' : 'w-0'
                }`}
                initial={false}
                animate={{ scaleX: active ? 1 : 0 }}
                transition={{ duration: reduce ? 0 : 0.42, ease: EASE_OUT }}
              />

              <div
                aria-hidden="true"
                className={`relative z-10 grid h-full w-full grid-cols-[3.25rem_minmax(0,1fr)_auto] grid-rows-[auto_1fr_auto] gap-x-2 px-4 sm:grid-cols-[4rem_minmax(0,1fr)_auto] sm:gap-x-4 sm:px-6 lg:grid-cols-[5.75rem_minmax(0,1fr)_auto] lg:gap-x-6 lg:px-8 xl:px-10 ${
                  active ? 'py-5 sm:py-6 lg:w-[52%] lg:py-8' : ''
                }`}
              >
                <motion.span
                  layout={!reduce ? 'position' : false}
                  transition={{ layout: layoutTransition }}
                  className={`font-display tracking-tight transition-[font-size,line-height,color] duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    active
                      ? 'row-start-1 self-start text-[2.15rem] leading-none text-cream sm:text-5xl lg:text-7xl'
                      : 'row-span-3 self-center text-sm leading-none text-smoke/60 sm:text-base lg:text-xl'
                  }`}
                >
                  {number}
                </motion.span>

                <motion.span
                  layout={!reduce ? 'position' : false}
                  transition={{ layout: layoutTransition }}
                  className={`min-w-0 font-display uppercase tracking-[-0.025em] transition-[font-size,line-height,color] duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    active
                      ? 'row-start-1 self-start whitespace-nowrap text-[clamp(1.85rem,8vw,2.4rem)] leading-[0.9] text-cream sm:text-5xl lg:text-[clamp(3rem,4.2vw,4.25rem)]'
                      : 'row-span-3 self-center whitespace-nowrap text-[clamp(1.4rem,7vw,2rem)] leading-none text-cream/75 group-hover:text-cream sm:text-4xl lg:text-[3.4rem]'
                  }`}
                >
                  {level.label}
                </motion.span>

                <motion.span
                  layout={!reduce ? 'position' : false}
                  transition={{ layout: layoutTransition }}
                  className={
                    active
                      ? 'col-span-3 row-start-3 flex items-center justify-between gap-4 self-end'
                      : 'col-start-3 row-span-3 self-center'
                  }
                >
                  <HeatFlames levelIndex={index} selected={active} reduce={reduce} />
                  {active && (
                    <span className="font-display text-xs tracking-[0.18em] text-cream/70 sm:text-sm">
                      {number}/04
                    </span>
                  )}
                </motion.span>
              </div>
            </motion.button>
          )
        })}
      </div>
    </LayoutGroup>
  )
}

export function HeatSelector() {
  const reduce = useReducedMotion()
  const [selected, setSelected] = useState(1)

  return (
    <section className="bg-coal-950 py-20 text-cream sm:py-24 lg:py-32">
      <Container>
        <header className="max-w-4xl">
          <Eyebrow>{heatSection.eyebrow}</Eyebrow>
          <h2
            id="heat-stack-title"
            className="mt-4 font-display text-h2 uppercase text-cream sm:mt-6"
          >
            {heatSection.title[0]}
            <span className="block text-peri-red">{heatSection.title[1]}</span>
          </h2>
        </header>

        <div className="mt-10 sm:mt-14 lg:mt-16">
          <HeatStack selected={selected} onChange={setSelected} reduce={reduce} />
        </div>
      </Container>
    </section>
  )
}
