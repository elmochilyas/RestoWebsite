import { defaultLocale, siteLocales, type SiteLocale } from '../../content/navigation'

type FlagProps = { className?: string }

export function FrenchFlag({ className = '' }: FlagProps) {
  return (
    <svg viewBox="0 0 30 20" className={className} aria-hidden="true">
      <rect width="10" height="20" fill="#002654" />
      <rect x="10" width="10" height="20" fill="#fff" />
      <rect x="20" width="10" height="20" fill="#CE1126" />
    </svg>
  )
}

export function BritishFlag({ className = '' }: FlagProps) {
  return (
    <svg viewBox="0 0 60 36" className={className} aria-hidden="true">
      <rect width="60" height="36" fill="#012169" />
      <path d="M0 0 60 36M60 0 0 36" stroke="#fff" strokeWidth="7" />
      <path d="M0 0 60 36M60 0 0 36" stroke="#C8102E" strokeWidth="3.5" />
      <path d="M30 0v36M0 18h60" stroke="#fff" strokeWidth="11" />
      <path d="M30 0v36M0 18h60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  )
}

export function MoroccanFlag({ className = '' }: FlagProps) {
  return (
    <svg viewBox="0 0 30 20" className={className} aria-hidden="true">
      <rect width="30" height="20" fill="#C1272D" />
      <polygon
        points="15,4.4 18.2,14.4 9.8,8.3 20.2,8.3 11.8,14.4"
        fill="none"
        stroke="#006233"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const flags = {
  fr: FrenchFlag,
  en: BritishFlag,
  ar: MoroccanFlag,
} satisfies Record<SiteLocale, typeof FrenchFlag>

type LocaleSelectorProps = { locale?: SiteLocale; className?: string }

/**
 * Mobile segmented language selector with visual flag badges and clear indicators.
 */
export function LocaleSelector({ locale = defaultLocale, className = '' }: LocaleSelectorProps) {
  return (
    <div
      role="group"
      aria-label="Sélection de la langue"
      className={`inline-flex items-center gap-1 rounded-full border border-white/10 bg-coal-900/80 p-1 backdrop-blur-md ${className}`}
    >
      {siteLocales.map((item) => {
        const active = item.id === locale
        const Flag = flags[item.id]

        return (
          <button
            key={item.id}
            type="button"
            disabled={!item.available}
            aria-pressed={active}
            title={active ? `${item.nativeName} (Actif)` : `${item.nativeName} (Bientôt disponible)`}
            aria-label={
              active
                ? `${item.nativeName} — langue actuelle`
                : `${item.nativeName} — traduction indisponible`
            }
            lang={item.id}
            dir={item.dir}
            className={`flex h-8 items-center gap-1.5 rounded-full px-2.5 text-xs font-bold transition-all duration-200 active:scale-95 ${
              active
                ? 'bg-gradient-to-r from-peri-red/30 to-ember/25 text-cream border border-peri-red/50 shadow-[0_0_10px_rgba(231,55,31,0.25)]'
                : 'cursor-not-allowed border border-transparent text-smoke/45 opacity-50'
            }`}
          >
            <Flag className="h-3 w-4 shrink-0 overflow-hidden rounded-[2px] shadow-[0_0_0_1px_rgba(246,234,215,0.2)]" />
            <span className="text-[0.6875rem] font-bold tracking-wider">
              {item.shortLabel}
            </span>
          </button>
        )
      })}
    </div>
  )
}

/**
 * Desktop compact horizontal segmented language selector.
 * Displays 🇫🇷 FR, 🇬🇧 EN, 🇲🇦 AR side-by-side with lightweight flags.
 * Tertiary/utility visual hierarchy with subtle selected state on active language.
 */
export function DesktopSegmentedLocaleSelector({ locale = defaultLocale, className = '' }: LocaleSelectorProps) {
  return (
    <div
      role="group"
      aria-label="Sélection de la langue"
      className={`inline-flex h-10 items-center gap-0.5 rounded-full border border-white/10 bg-white/[0.03] p-1 backdrop-blur-sm ${className}`}
    >
      {siteLocales.map((item) => {
        const active = item.id === locale
        const Flag = flags[item.id]

        return (
          <button
            key={item.id}
            type="button"
            disabled={!item.available}
            aria-pressed={active}
            title={active ? `${item.nativeName} (Langue active)` : `${item.nativeName} (Traduction bientôt disponible)`}
            aria-label={
              active
                ? `${item.nativeName} — langue actuelle`
                : `${item.nativeName} — traduction bientôt disponible`
            }
            lang={item.id}
            dir={item.dir}
            className={`flex h-8 items-center gap-1.5 rounded-full px-2.5 text-[0.6875rem] font-bold uppercase tracking-wider transition-all duration-200 focus-visible:outline-cream active:scale-95 ${
              active
                ? 'bg-white/10 text-cream border border-white/15 shadow-[0_1px_3px_rgba(0,0,0,0.3)]'
                : 'cursor-not-allowed border border-transparent text-smoke/50 hover:text-smoke/70 opacity-60'
            }`}
          >
            <Flag className="h-2.5 w-3.5 shrink-0 overflow-hidden rounded-[2px] shadow-[0_0_0_1px_rgba(255,255,255,0.15)]" />
            <span>{item.shortLabel}</span>
          </button>
        )
      })}
    </div>
  )
}

type LocaleStatusProps = { locale?: SiteLocale; className?: string }

/** Compact language indicator for backward compatibility. */
export function LocaleStatus({ locale = defaultLocale, className = '' }: LocaleStatusProps) {
  const current = siteLocales.find((item) => item.id === locale) ?? siteLocales[0]

  return (
    <span
      className={`inline-flex min-h-8 items-center rounded-full border border-line-dark bg-coal-900 px-3 text-xs font-bold tracking-wider text-cream ${className}`}
      aria-label={`Langue : ${current.nativeName}`}
      lang={current.id}
      dir={current.dir}
    >
      {current.shortLabel}
    </span>
  )
}
