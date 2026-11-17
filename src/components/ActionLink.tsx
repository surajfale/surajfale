import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion, type Variants } from 'framer-motion'
import { lift, liftOnSignal, pressTransition } from '../lib/tokens'
import { cn } from '../lib/cn'

const MotionLink = motion.create(Link)

const toVariants = (set: typeof lift): Variants => ({
  rest: { ...set.rest, transition: pressTransition },
  hover: { ...set.hover, transition: pressTransition },
  press: { ...set.press, transition: { duration: 0.08 } },
})

const TONES = {
  /** Signal Red. Reserved for the primary "View Live Project" CTA, nothing else. */
  signal: {
    className: 'border-signal bg-signal text-canvas',
    variants: toVariants(liftOnSignal),
  },
  ghost: {
    className: 'border-bone/40 bg-card text-bone hover:border-bone',
    variants: toVariants(lift),
  },
} as const

interface ActionLinkProps {
  tone?: keyof typeof TONES
  to?: string
  href?: string
  onClick?: () => void
  icon?: ReactNode
  /** Icon after the label (e.g. an external-link arrow). */
  trailingIcon?: ReactNode
  label?: string
  /** Icon-only 44px square (pass `label` for the accessible name). */
  square?: boolean
  className?: string
  children: ReactNode
}

/** Button-shaped link (or button) with the tactile neo-brutalist lift. */
export default function ActionLink({
  tone = 'ghost',
  to,
  href,
  onClick,
  icon,
  trailingIcon,
  label,
  square = false,
  className,
  children,
}: ActionLinkProps) {
  const { className: toneClass, variants } = TONES[tone]
  const props = {
    className: cn(
      'inline-flex min-h-11 items-center gap-2 rounded-bento border-[1.5px]',
      square ? 'size-11 justify-center' : 'px-4 py-2.5',
      'font-mono text-xs font-semibold uppercase tracking-[0.08em] transition-colors duration-150',
      toneClass,
      className,
    ),
    'aria-label': label,
    variants,
    initial: 'rest',
    animate: 'rest',
    whileHover: 'hover',
    whileTap: 'press',
  } as const

  const content = (
    <>
      {icon && <span className="text-base" aria-hidden>{icon}</span>}
      {children}
      {trailingIcon && <span className="text-base" aria-hidden>{trailingIcon}</span>}
    </>
  )

  if (href) {
    return (
      <motion.a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {content}
      </motion.a>
    )
  }
  if (to) {
    return (
      <MotionLink to={to} {...props}>
        {content}
      </MotionLink>
    )
  }
  return (
    <motion.button type="button" onClick={onClick} {...props}>
      {content}
    </motion.button>
  )
}
