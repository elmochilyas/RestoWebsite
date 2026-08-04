import { ArrowUpRight } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { SiInstagram, SiGlovo, SiGooglemaps } from 'react-icons/si'
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

const cardStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
}

const cardItem = {
  initial: { opacity: 0, y: 6 },
  whileInView: { opacity: 1, y: 0 },
  viewport: VIEWPORT,
  transition: { duration: 0.4, ease: EASE_OUT },
}

const linkClass =
  'after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-peri-red after:transition-[width] after:duration-200 hover:text-cream hover:after:w-full'

type ContactAction = {
  icon: React.ComponentType<{ className?: string }>
  label: string
  action: string
  href: string
  ariaLabel: string
  iconClassName?: string
}

const contactActions: ContactAction[] = [
  {
    icon: SiInstagram,
    label: 'INSTAGRAM',
    action: 'Follow us',
    href: restaurant.links.instagram,
    ariaLabel: 'Open Peri Peri Grill on Instagram',
  },
  {
    icon: SiGlovo,
    label: 'GLOVO',
    action: 'Order',
    href: restaurant.links.glovo,
    ariaLabel: 'Open Peri Peri Grill on Glovo',
    iconClassName: 'text-[#00b140]',
  },
  {
    icon: SiGooglemaps,
    label: 'GOOGLE MAPS',
    action: 'Directions',
    href: restaurant.links.maps,
    ariaLabel: 'Open Peri Peri Grill in Google Maps',
  },
]

if (restaurant.links.whatsapp) {
  contactActions.splice(1, 0, {
    icon: () => (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-[18px]"
        aria-hidden="true"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
    label: 'WHATSAPP',
    action: 'Message us',
    href: restaurant.links.whatsapp,
    ariaLabel: 'Message Peri Peri Grill on WhatsApp',
    iconClassName: 'text-[#25d366]',
  })
}

export function Footer() {
  const reduce = useReducedMotion()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line-dark bg-coal-950 text-cream">
      <Container>
        <motion.div {...(reduce ? {} : fadeMotion)}>
          <div className="grid gap-10 py-14 sm:gap-x-10 sm:py-16 lg:grid-cols-12 lg:gap-x-8 lg:py-18 xl:gap-x-12">
            {/* ── Brand ── */}
            <div className="self-start lg:col-span-4 lg:col-start-1">
              <PeriPeriLogo className="h-auto w-[120px] sm:w-[140px] lg:w-[140px]" />
              <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.16em] text-smoke">
                {restaurant.locationName}
              </p>
              <a
                href={restaurant.phoneHref}
                className="mt-2 inline-block font-body text-lg font-semibold text-cream transition-colors duration-200 hover:text-ember lg:text-xl"
              >
                {restaurant.phoneDisplay}
              </a>
            </div>

            {/* ── Explore ── */}
            <nav
              aria-label="Footer navigation"
              className="self-start lg:col-span-2 lg:col-start-7 lg:row-start-1"
            >
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.14em] text-smoke">
                Explore
              </p>
              <ul className="flex flex-col gap-[10px]">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className={`relative inline-flex min-h-11 items-center text-[13px] font-bold uppercase tracking-[0.14em] text-smoke transition-colors duration-200 lg:min-h-0 lg:text-sm ${linkClass}`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* ── Connect ── */}
            <div className="lg:col-span-5 lg:col-start-9 lg:row-start-1">
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.14em] text-smoke">
                Connect
              </p>
              <motion.div
                className="grid grid-cols-2 gap-3"
                {...(reduce ? {} : { variants: cardStagger, initial: 'hidden', whileInView: 'visible', viewport: VIEWPORT })}
              >
                {contactActions.map((item) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.ariaLabel}
                    {...(reduce ? {} : cardItem)}
                    className="group flex items-center gap-3 rounded-[14px] border border-line-dark bg-coal-900 p-4 transition-[border-color,background] duration-200 hover:border-cream/30 hover:bg-coal-900/80"
                  >
                    <span className={`flex shrink-0 items-center justify-center ${item.iconClassName ?? 'text-cream'}`}>
                      <item.icon className="size-[18px] transition-transform duration-200 group-hover:scale-105" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[11px] font-bold uppercase tracking-[0.12em] text-cream">
                        {item.label}
                      </span>
                      <span className="mt-0.5 flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-smoke transition-colors duration-200 group-hover:text-cream">
                        {item.action}
                        <ArrowUpRight
                          aria-hidden="true"
                          className="size-3 transition-transform duration-200 group-hover:-translate-y-px group-hover:translate-x-px"
                        />
                      </span>
                    </span>
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </div>

          {/* ── Bottom meta ── */}
          <div className="flex flex-col gap-1 border-t border-line-dark py-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-smoke">
              © {year} {restaurant.name}
            </p>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-smoke">
              {restaurant.locationName} · Morocco
            </p>
          </div>
        </motion.div>
      </Container>
    </footer>
  )
}
