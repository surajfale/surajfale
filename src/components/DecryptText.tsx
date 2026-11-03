import { useState, useEffect } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface DecryptTextProps {
  text: string
  speed?: number
  className?: string
  startDelay?: number
  revealDirection?: 'start' | 'end' | 'random'
  useOriginalCharsOnly?: boolean
}

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?'

// Characters before iteration / 3 are revealed; the rest are random glyphs.
const scramble = (text: string, iteration: number) =>
  text
    .split('')
    .map((char, index) => {
      if (char === ' ') return ' '
      if (index < iteration / 3) return char
      return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)]
    })
    .join('')

export const DecryptText = ({
  text,
  speed = 30,
  className,
  startDelay = 0,
}: DecryptTextProps) => {
  const [displayText, setDisplayText] = useState(text)
  const [hasStarted, setHasStarted] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) return

    let iteration = 0
    let intervalId: ReturnType<typeof setInterval> | undefined

    // One interval drives the effect, so `speed` really is ms per frame.
    const timeoutId = setTimeout(() => {
      setHasStarted(true)
      intervalId = setInterval(() => {
        if (iteration / 3 > text.length) {
          clearInterval(intervalId)
          setDisplayText(text)
          return
        }
        setDisplayText(scramble(text, iteration))
        iteration += 1
      }, speed)
    }, startDelay)

    return () => {
      clearTimeout(timeoutId)
      clearInterval(intervalId)
    }
  }, [text, speed, startDelay, prefersReducedMotion])

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
