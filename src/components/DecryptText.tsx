import { useState, useEffect } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface DecryptTextProps {
  text: string
  /** Total time (ms) from first scramble to fully revealed text. */
  duration?: number
  className?: string
  startDelay?: number
  revealDirection?: 'start' | 'end' | 'random'
  useOriginalCharsOnly?: boolean
}

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?'

// The first `revealed` characters show through; the rest are random glyphs.
const scramble = (text: string, revealed: number) =>
  text
    .split('')
    .map((char, index) => {
      if (char === ' ') return ' '
      if (index < revealed) return char
      return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)]
    })
    .join('')

export const DecryptText = ({
  text,
  duration = 200,
  className,
  startDelay = 0,
}: DecryptTextProps) => {
  const [displayText, setDisplayText] = useState(text)
  const [hasStarted, setHasStarted] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) return

    let frameId = 0

    // Time-based, so the reveal takes `duration` ms regardless of frame rate.
    const timeoutId = setTimeout(() => {
      const start = performance.now()
      // Scramble before the first paint so the final text never flashes.
      setDisplayText(scramble(text, 0))
      setHasStarted(true)

      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1)
        if (progress >= 1) {
          setDisplayText(text)
          return
        }
        setDisplayText(scramble(text, Math.floor(progress * text.length)))
        frameId = requestAnimationFrame(tick)
      }
      frameId = requestAnimationFrame(tick)
    }, startDelay)

    return () => {
      clearTimeout(timeoutId)
      cancelAnimationFrame(frameId)
    }
  }, [text, duration, startDelay, prefersReducedMotion])

  // Reduced motion: show the final text immediately, no state round-trip.
  if (prefersReducedMotion) {
    return <span className={className}>{text}</span>
  }

  return (
    <span className={className}>
      {hasStarted ? displayText : text.split('').map(() => ' ').join('')}
    </span>
  )
}
