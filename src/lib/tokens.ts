import type { TargetAndTransition, Transition } from 'framer-motion'

/** Mirrors the @theme tokens in src/index.css. Framer Motion needs literal colors. */
export const COLORS = {
  canvas: '#0E0E10',
  card: '#16161A',
  bone: '#E8E3D8',
  boneMuted: '#A39E93',
  signal: '#FF2D2D',
} as const

/** motion.easeOut from the old theme; entrances, hovers and presses. */
export const EASE_OUT = [0.23, 1, 0.32, 1] as const
/** On-screen movement (e.g. the nav indicator sliding between links). */
export const EASE_IN_OUT = [0.77, 0, 0.175, 1] as const

const shadow = (offset: number, color: string) => `${offset}px ${offset}px 0px ${color}`

/**
 * Tactile neo-brutalist lift: the card rises up-left by 2px while a hard red
 * shadow appears down-right, so it reads as a slab lifting off the page. On
 * press it slams back flat. Only interactive surfaces get this; static cards
 * just snap their border, so lift always means "clickable".
 */
export const lift = {
  rest: { x: 0, y: 0, boxShadow: shadow(0, COLORS.signal) },
  hover: { x: -2, y: -2, boxShadow: shadow(4, COLORS.signal) },
  press: { x: 0, y: 0, boxShadow: shadow(0, COLORS.signal) },
} satisfies Record<string, TargetAndTransition>

/** The Signal Red CTA can't cast a red shadow on itself, so it casts bone. */
export const liftOnSignal = {
  rest: { x: 0, y: 0, boxShadow: shadow(0, COLORS.bone) },
  hover: { x: -2, y: -2, boxShadow: shadow(4, COLORS.bone) },
  press: { x: 0, y: 0, boxShadow: shadow(0, COLORS.bone) },
} satisfies Record<string, TargetAndTransition>

/** UI interactions stay well under 300ms. */
export const pressTransition: Transition = { duration: 0.16, ease: EASE_OUT }

/** Scroll reveal for bento tiles below the fold (once, never replayed). */
export const reveal = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '0px 0px -10% 0px' },
  transition: { duration: 0.35, ease: EASE_OUT },
} as const
