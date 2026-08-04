import { Moon } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { restaurant } from '../../content'
import type { DayName } from '../../types/content'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'
import { Eyebrow } from '../ui/Eyebrow'

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1]

const VIEWPORT = { once: true, margin: '-10% 0px' } as const

const DAY_LABELS: Record<DayName, string> = {
  monday: 'Mon',
  tuesday: 'Tue',
  wednesday: 'Wed',
  thursday: 'Thu',
  friday: 'Fri',
  saturday: 'Sat',
  sunday: 'Sun',
}

const DAY_LABELS_FULL: Record<DayName, string> = {
  monday: 'Monday',
  tuesday: 'Tuesday',
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday',
  saturday: 'Saturday',
  sunday: 'Sunday',
}

function toMinutes(time: string) {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + (minutes ?? 0)
}

const revealMotion = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: VIEWPORT,
  transition: { duration: 0.52, ease: EASE_OUT },
}

const mapMotion = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: VIEWPORT,
  transition: { duration: 0.58, ease: EASE_OUT },
}

const stripVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
}

const stripCellVariants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: EASE_OUT },
  },
}

export function VisitSection() {
  const reduce = useReducedMotion()
  const hours = restaurant.publicInfo.hours
  const anyClosesNextDay = hours.some((day) => day.closesNextDay)
  const allCloseSame =
    hours.length > 0 &&
    hours.every(
      (day) =>
        day.close === hours[0].close &&
        (day.closesNextDay ?? false) === (hours[0].closesNextDay ?? false),
    )
  const canShowLateHeadline = allCloseSame && anyClosesNextDay
  const earliestOpenMinutes = Math.min(...hours.map((day) => toMinutes(day.open)))
  const earliestOpen =
    hours.find((day) => toMinutes(day.open) === earliestOpenMinutes)?.open ??
    hours[0]?.open ??
    '—'
  const laterDays = hours.filter((day) => toMinutes(day.open) > earliestOpenMinutes)
  const lateSummary = laterDays
    .map((day) => `${DAY_LABELS_FULL[day.day]} from ${day.open}`)
    .join(' · ')
  const addressLines = restaurant.address.split(',').map((part) => part.trim())
  const mapQuery = `${restaurant.name} - ${restaurant.locationName}, ${restaurant.address}`
  const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&z=16&output=embed`

  return (
    <section
      id="visit"
      className="scroll-mt-24 bg-coal-950 py-20 text-cream sm:py-24 lg:py-32"
    >
      <Container>
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-10 xl:gap-x-14">
          <div className="lg:col-span-5">
            <motion.header {...(reduce ? {} : revealMotion)}>
              <Eyebrow>Visit us</Eyebrow>
              <h2 className="mt-4 font-display text-h2 uppercase text-cream sm:mt-6">
                Find us in
                <span className="block text-peri-red">
                  {restaurant.locationName}.
                </span>
              </h2>
            </motion.header>

            <motion.div
              className="mt-10 md:grid md:grid-cols-2 md:gap-x-10 lg:mt-14 lg:block"
              {...(reduce
                ? {}
                : {
                    ...revealMotion,
                    transition: { ...revealMotion.transition, delay: 0.08 },
                  })}
            >
              <address className="not-italic">
                <p className="font-display text-[clamp(1.5rem,3vw,2rem)] uppercase leading-none tracking-[-0.02em] text-cream">
                  {restaurant.locationName}
                </p>
                <p className="mt-4 font-editorial text-[clamp(1.3125rem,2.5vw,1.5625rem)] font-[450] leading-[1.45] tracking-[-0.01em] text-cream/85">
                  {addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </address>

              <div className="mt-8 md:mt-0 lg:mt-10">
                <Button
                  href={restaurant.links.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  withArrow
                  className="w-full sm:w-auto"
                >
                  Directions
                </Button>

                <div className="mt-8 lg:mt-10">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-smoke">
                    Phone
                  </p>
                  <a
                    href={restaurant.phoneHref}
                    className="mt-2 inline-flex min-h-11 items-center text-xl font-bold tracking-[-0.01em] text-cream underline decoration-peri-red decoration-2 underline-offset-4 transition-colors hover:text-ember sm:text-2xl"
                  >
                    {restaurant.phoneDisplay}
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="mt-12 lg:col-span-7 lg:col-start-6 lg:mt-0"
            {...(reduce ? {} : mapMotion)}
          >
            <div className="h-[300px] overflow-hidden rounded-[14px] bg-coal-900 sm:h-[340px] md:h-[400px] lg:h-[480px]">
              <iframe
                src={mapEmbedUrl}
                title={`Map showing ${restaurant.name} in ${restaurant.locationName}, ${restaurant.city}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="h-full w-full border-0"
              />
            </div>
          </motion.div>
        </div>

        <div className="mt-12 border-t border-line-dark pt-8 sm:mt-14 sm:pt-10 lg:mt-16 lg:grid lg:grid-cols-12 lg:gap-x-10 xl:gap-x-14">
          <motion.div
            className="lg:col-span-5"
            {...(reduce
              ? {}
              : {
                  ...revealMotion,
                  transition: { ...revealMotion.transition, delay: 0.08 },
                })}
          >
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-smoke">
              Hours
            </p>
            <h3 className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 font-display text-[clamp(1.75rem,3.5vw,2.5rem)] uppercase leading-none tracking-[-0.02em] text-cream sm:text-[clamp(2rem,4vw,3rem)]">
              {canShowLateHeadline ? (
                <>
                  Open until {hours[0].close}
                  <Moon aria-hidden="true" className="size-8 shrink-0 text-peri-red" />
                </>
              ) : (
                'Hours'
              )}
            </h3>
            <p className="mt-4 max-w-sm text-base leading-relaxed text-cream/85 sm:text-lg">
              Every day from {earliestOpen}
              {lateSummary ? ` · ${lateSummary}` : ''}
            </p>
          </motion.div>

          <div className="mt-8 lg:col-span-7 lg:col-start-6 lg:mt-0">
            <motion.dl
              className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4 lg:grid-cols-7 lg:gap-x-0"
              variants={reduce ? undefined : stripVariants}
              initial={reduce ? undefined : 'hidden'}
              whileInView={reduce ? undefined : 'show'}
              viewport={VIEWPORT}
            >
              {hours.map((day) => {
                const opensLater = toMinutes(day.open) > earliestOpenMinutes
                return (
                  <motion.div
                    key={day.day}
                    variants={reduce ? undefined : stripCellVariants}
                    className="lg:border-l lg:border-line-dark lg:pl-4 lg:first:border-l-0 lg:first:pl-0"
                  >
                    <dt className="text-xs font-bold uppercase tracking-[0.16em] text-smoke">
                      {DAY_LABELS[day.day]}
                    </dt>
                    <dd
                      className={`mt-3 font-display text-xl tracking-[-0.015em] lg:text-2xl ${
                        opensLater ? 'text-peri-red' : 'text-cream'
                      }`}
                    >
                      {day.open}
                    </dd>
                    <dd
                      aria-label={`${day.open} to ${day.close}${day.closesNextDay ? ', closing the following day' : ''}`}
                      className="mt-1 font-display text-xl tracking-[-0.015em] text-cream lg:text-2xl"
                    >
                      {day.close}
                    </dd>
                  </motion.div>
                )
              })}
            </motion.dl>
            {anyClosesNextDay ? (
              <p className="mt-5 text-sm leading-relaxed text-smoke sm:mt-6">
                Times after midnight are the next morning.
              </p>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  )
}
