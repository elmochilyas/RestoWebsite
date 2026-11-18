import { ArrowRight, ArrowUpRight, BookOpen, MapPin } from 'lucide-react'
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from 'react'
import { SiGlovo } from 'react-icons/si'

type Variant = 'menu' | 'glovo' | 'location' | 'primary' | 'secondary' | 'inverse'
type Size = 'sm' | 'md'

type ButtonProps = {
  variant?: Variant
  size?: Size
  withArrow?: boolean
  children: ReactNode
  className?: string
  href?: string
} & AnchorHTMLAttributes<HTMLAnchorElement> &
  ButtonHTMLAttributes<HTMLButtonElement>

const standardVariants: Record<'primary' | 'secondary' | 'inverse', string> = {
  primary: 'bg-peri-red text-cream hover:bg-ember rounded-full shadow-[0_4px_20px_rgba(231,55,31,0.3)]',
  secondary: 'border border-line-dark text-cream hover:border-cream/40 hover:bg-cream/10 rounded-full',
  inverse: 'border border-line-light text-ink hover:border-ink/50 hover:bg-ink/5 rounded-full',
}

export function Button({
  variant = 'primary',
  size = 'md',
  withArrow = false,
  children,
  className = '',
  href,
  ...props
}: ButtonProps) {
  const isHeroStyle = variant === 'menu' || variant === 'glovo' || variant === 'location'

  if (isHeroStyle) {
    const heroVariantClass =
      variant === 'menu'
        ? 'hero-button-menu'
        : variant === 'glovo'
          ? 'hero-button-glovo'
          : 'hero-button-location'
    const heroSizeClass = size === 'sm' ? 'hero-button-sm' : ''
    const classes = `hero-button ${heroVariantClass} ${heroSizeClass} ${className}`

    const icon = (
      <span className="hero-button-icon" aria-hidden="true">
        {variant === 'menu' ? (
          <BookOpen className={size === 'sm' ? 'size-3.5' : 'size-[18px]'} />
        ) : variant === 'glovo' ? (
          <SiGlovo className={size === 'sm' ? 'size-3.5' : 'size-5'} />
        ) : (
          <MapPin className={size === 'sm' ? 'size-3.5' : 'size-[18px]'} />
        )}
      </span>
    )

    const arrow = (
      <span className="hero-button-arrow" aria-hidden="true">
        {variant === 'menu' ? (
          <ArrowRight className={size === 'sm' ? 'size-3.5' : 'size-4'} />
        ) : (
          <ArrowUpRight className={size === 'sm' ? 'size-3.5' : 'size-4'} />
        )}
      </span>
    )

    if (href !== undefined) {
      const anchorProps = props as AnchorHTMLAttributes<HTMLAnchorElement>
      return (
        <a className={classes} href={href} {...anchorProps}>
          {icon}
          <span className="hero-button-label">{children}</span>
          {arrow}
        </a>
      )
    }

    const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>
    return (
      <button className={classes} {...buttonProps}>
        {icon}
        <span className="hero-button-label">{children}</span>
        {arrow}
      </button>
    )
  }

  const standardClass = standardVariants[variant as 'primary' | 'secondary' | 'inverse']
  const classes = `group inline-flex min-h-12 items-center justify-center gap-2.5 px-6 text-base font-bold tracking-wide transition-colors duration-200 sm:min-h-14 sm:px-7 ${standardClass} ${className}`

  const arrow = withArrow && (
    <ArrowRight
      aria-hidden="true"
      className="size-5 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
    />
  )

  if (href !== undefined) {
    const anchorProps = props as AnchorHTMLAttributes<HTMLAnchorElement>
    return (
      <a className={classes} href={href} {...anchorProps}>
        {children}
        {arrow}
      </a>
    )
  }

  const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>
  return (
    <button className={classes} {...buttonProps}>
      {children}
      {arrow}
    </button>
  )
}
