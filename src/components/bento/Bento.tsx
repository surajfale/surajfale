import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { reveal as revealMotion } from '../../lib/tokens'
import { cn } from '../../lib/cn'

const TAGS = {
  section: motion.section,
  article: motion.article,
  header: motion.header,
  aside: motion.aside,
  div: motion.div,
} as const

interface BentoProps {
  as?: keyof typeof TAGS
  id?: string
  className?: string
  children: ReactNode
  /** Fade/rise in when scrolled into view. Turn off above the fold. */
  reveal?: boolean
  /** Default inner padding; pass false to lay out edge-to-edge content yourself. */
  pad?: boolean
  labelledBy?: string
}

/**
 * Static bento tile: obsidian interior, 1.5px bone hairline that snaps to full
 * strength on hover. It deliberately does NOT lift: lift + red shadow is the
 * signal for "this whole tile is clickable" (see BentoLink).
 */
export default function Bento({
  as = 'section',
  id,
  className,
  children,
  reveal = true,
  pad = true,
  labelledBy,
}: BentoProps) {
  const Tag = TAGS[as]
  return (
    <Tag
      id={id}
      aria-labelledby={labelledBy}
      className={cn('bento', pad && 'p-6 sm:p-8', className)}
      {...(reveal ? revealMotion : {})}
    >
      {children}
    </Tag>
  )
}
