import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion, type Variants } from 'framer-motion'
import { lift, pressTransition, reveal as revealMotion } from '../../lib/tokens'
import { cn } from '../../lib/cn'

const MotionLink = motion.create(Link)

// One variant set covers reveal + hover + press, so the gestures and the
// scroll-in never fight over `y`. Hover/press only fire for real pointers
// (Framer Motion ignores touch for whileHover), so taps never stick "lifted".
const variants: Variants = {
  hidden: { ...lift.rest, ...revealMotion.initial },
  rest: { ...lift.rest, opacity: 1, transition: { duration: 0.24, ease: pressTransition.ease } },
  hover: { ...lift.hover, transition: pressTransition },
  press: { ...lift.press, transition: { duration: 0.08 } },
}

interface BentoLinkProps {
  /** Internal route. */
  to?: string
  /** External URL (opens in a new tab with noopener/noreferrer). */
  href?: string
  className?: string
  children: ReactNode
  /** Accessible name when the visible content isn't a good one. */
  label?: string
  reveal?: boolean
  pad?: boolean
}

/** A bento tile that is one big link: tactile lift with a hard Signal Red shadow. */
export default function BentoLink({ to, href, className, children, label, reveal = true, pad = true }: BentoLinkProps) {
  const motionProps = {
    className: cn('bento block', pad && 'p-6 sm:p-8', className),
    'aria-label': label,
    variants,
    initial: reveal ? 'hidden' : 'rest',
    whileInView: 'rest',
    viewport: revealMotion.viewport,
    whileHover: 'hover',
    whileTap: 'press',
  } as const

  if (href) {
    return (
      <motion.a href={href} target="_blank" rel="noopener noreferrer" {...motionProps}>
        {children}
      </motion.a>
    )
  }
  return (
    <MotionLink to={to ?? '/'} {...motionProps}>
      {children}
    </MotionLink>
  )
}
