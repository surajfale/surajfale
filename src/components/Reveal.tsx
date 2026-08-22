import { useEffect, useRef, useState, ReactNode } from 'react'
import { Box } from '@mui/material'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface RevealProps {
  children: ReactNode
  delayMs?: number
}

const Reveal = ({ children, delayMs = 0 }: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(
    () => typeof IntersectionObserver === 'undefined'
  )
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion || isVisible) return

    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [prefersReducedMotion, isVisible])

  const revealed = isVisible || prefersReducedMotion

  return (
    <Box
      ref={ref}
      sx={{
        height: '100%',
        opacity: revealed ? 1 : 0,
        transform: revealed ? 'translateY(0)' : 'translateY(12px)',
        transition: prefersReducedMotion
          ? 'none'
          : `opacity 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delayMs}ms, transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delayMs}ms`,
      }}
    >
      {children}
    </Box>
  )
}

export default Reveal
