import type { HTMLAttributes, ReactNode } from 'react'

type EyebrowProps = HTMLAttributes<HTMLParagraphElement> & {
  children: ReactNode
  tone?: 'dark' | 'light'
}

export function Eyebrow({
  tone = 'dark',
  children,
  className = '',
  ...props
}: EyebrowProps) {
  return (
    <p
      className={`flex items-center gap-2.5 text-eyebrow uppercase ${tone === 'dark' ? 'text-smoke' : 'text-ink'} ${className}`}
      {...props}
    >
      <span aria-hidden="true" className="h-0.5 w-6 shrink-0 bg-peri-red" />
      {children}
    </p>
  )
}
