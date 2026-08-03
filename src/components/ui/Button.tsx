import { ArrowRight } from 'lucide-react'
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from 'react'

type Variant = 'primary' | 'secondary' | 'inverse'

type ButtonProps = {
  variant?: Variant
  withArrow?: boolean
  children: ReactNode
  className?: string
  href?: string
} & AnchorHTMLAttributes<HTMLAnchorElement> &
  ButtonHTMLAttributes<HTMLButtonElement>

const variants: Record<Variant, string> = {
  primary: 'bg-peri-red text-cream hover:bg-ember',
  secondary: 'border border-line-dark text-cream hover:border-cream/40 hover:bg-cream/10',
  inverse: 'border border-line-light text-ink hover:border-ink/50 hover:bg-ink/5',
}

export function Button({
  variant = 'primary',
  withArrow = false,
  children,
  className = '',
  href,
  ...props
}: ButtonProps) {
  const classes = `group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-xl px-6 text-base font-bold tracking-wide transition-colors duration-200 sm:min-h-14 sm:px-7 ${variants[variant]} ${className}`

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
