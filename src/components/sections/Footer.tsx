import { ArrowUpRight } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { restaurant } from '../../content'
import { navLinks } from '../../content/navigation'
import PeriPeriLogo from '../ui/PeriPeriLogo'
import { Container } from '../ui/Container'

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1]

const VIEWPORT = { once: true, margin: '-10% 0px' } as const

const fadeMotion = {
  initial: { opacity: 0, y: 8 },
  whileInView: { opacity: 1, y: 0 },
  viewport: VIEWPORT,
  transition: { duration: 0.45, ease: EASE_OUT },
}

const footerNavLinks = navLinks.map((link) => ({
  label: link.label.charAt(0) + link.label.slice(1).toLowerCase(),
  href: link.href,
}))

const externalLinks = [
  { label: 'Instagram', href: restaurant.links.instagram },
  { label: 'Google Maps', href: restaurant.links.maps },
] as const

const linkClass =
  'after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-peri-red after:transition-[width] after:duration-200 hover:text-cream hover:after:w-full'

export function Footer() {
  const reduce = useReducedMotion()
  const year = new Date().getFullYear()
  const country = restaurant.address.split(',').pop()?.trim() ?? restaurant.city

  return (
    <footer className="border-t border-line-dark bg-coal-950 text-cream">
      <Container>
        <motion.div {...(reduce ? {} : fadeMotion)}>
          <div className="grid gap-8 py-10 sm:grid-cols-2 sm:gap-x-10 sm:py-14 lg:grid-cols-12 lg:gap-x-10 xl:gap-x-14">
            <div className="self-start sm:col-start-1 sm:row-start-1 lg:col-span-5 lg:col-start-1">
              <PeriPeriLogo className="h-auto w-[140px] sm:w-[160px] lg:w-[180px]" />
            </div>

            <nav
              aria-label="Footer navigation"
              className="grid grid-cols-2 gap-x-8 gap-y-2 self-start sm:col-start-2 sm:row-start-1 lg:col-span-2 lg:col-start-7 lg:grid-cols-1 lg:row-start-1 lg:gap-y-3"
            >
              {footerNavLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`relative inline-flex min-h-11 items-center text-sm font-bold uppercase tracking-[0.14em] text-smoke transition-colors duration-200 lg:min-h-0 ${linkClass}`}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="self-start sm:col-start-2 sm:row-start-2 lg:col-span-2 lg:col-start-10 lg:row-start-1">
              {externalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative inline-flex min-h-11 items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-smoke transition-colors duration-200 lg:min-h-0 ${linkClass}`}
                >
                  <span>{link.label}</span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 transition-transform duration-200 group-hover:-translate-y-px group-hover:translate-x-px"
                  />
                </a>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-1 border-t border-line-dark py-4 sm:mt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-smoke">
              © {year} {restaurant.name}
            </p>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-smoke">
              {restaurant.city} · {country}
            </p>
          </div>
        </motion.div>
      </Container>
    </footer>
  )
}
