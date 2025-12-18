import { useState, useEffect, useRef } from 'react'

interface DecryptTextProps {
  text: string
  speed?: number
  className?: string
  startDelay?: number
  revealDirection?: 'start' | 'end' | 'random'
  useOriginalCharsOnly?: boolean
}

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?'

export const DecryptText = ({
  text,
  speed = 30,
  className,
  startDelay = 0,
}: DecryptTextProps) => {
  const [displayText, setDisplayText] = useState(text)
  const [isScrambling, setIsScrambling] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  
  const frameRef = useRef<number>(0)
  const iterationRef = useRef<number>(0)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setHasStarted(true)
      setIsScrambling(true)
    }, startDelay)

    return () => clearTimeout(timeoutId)
  }, [startDelay])

  useEffect(() => {
    if (!isScrambling) return

    const scramble = () => {
      setDisplayText(() => {
        const result = text.split('').map((char, index) => {
          if (char === ' ') return ' '

          if (index < iterationRef.current / 3) {
            return text[index]
          }
          return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)]
        })

        return result.join('')
      })

      iterationRef.current += 1

      if (iterationRef.current / 3 > text.length) {
        setIsScrambling(false)
        setDisplayText(text)
      } else {
        frameRef.current = requestAnimationFrame(scramble)
      }
    }
    
    // Use interval to control speed more easily than RAF if needed, 
    // but here we combine RAF for smooth updates with the iteration counter logic.
    // Actually, let's just use setInterval for simple speed control as originally planned?
    // The previous code mixed RAF and setInterval. Let's stick to setInterval for the "speed" prop to work as milliseconds per frame.
    
    const intervalId = setInterval(scramble, speed)

    return () => {
      clearInterval(intervalId)
      cancelAnimationFrame(frameRef.current)
    }
  }, [isScrambling, text, speed])

  return (
    <span className={className}>
      {hasStarted ? displayText : text.split('').map(() => ' ').join('')} 
    </span>
  )
}
