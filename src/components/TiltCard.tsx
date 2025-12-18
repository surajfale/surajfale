import { useRef, ReactNode } from 'react'
import { Box, SxProps, Theme } from '@mui/material'

interface TiltCardProps {
  children: ReactNode
  sx?: SxProps<Theme>
  className?: string
  intensity?: number
  glowColor?: string
}

const TiltCard = ({ children, sx, className, intensity = 15, glowColor }: TiltCardProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current
    const inner = innerRef.current
    const glow = glowRef.current
    if (!container || !inner || !glow) return

    const rect = container.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // Calculate rotation
    const rotateY = ((x - centerX) / centerX) * intensity
    const rotateX = ((centerY - y) / centerY) * intensity

    // Apply rotation directly to DOM to avoid re-renders
    inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`

    // Calculate and apply glow
    const glowX = (x / rect.width) * 100
    const glowY = (y / rect.height) * 100
    
    glow.style.background = `radial-gradient(circle at ${glowX}% ${glowY}%, ${glowColor || 'rgba(255,255,255,0.2)'} 0%, transparent 50%)`
    glow.style.opacity = '1'
  }

  const handleMouseLeave = () => {
    const inner = innerRef.current
    const glow = glowRef.current
    if (!inner || !glow) return

    // Reset styles
    inner.style.transform = 'rotateX(0deg) rotateY(0deg)'
    glow.style.opacity = '0'
  }

  return (
    <Box
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      sx={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
        ...sx,
      }}
    >
      <Box
        ref={innerRef}
        sx={{
          height: '100%',
          width: '100%',
          transition: 'transform 0.1s ease-out',
          transformStyle: 'preserve-3d',
          position: 'relative',
        }}
      >
        {/* Glow Overlay */}
        <Box
          ref={glowRef}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: 'inherit',
            // Initial state
            background: `radial-gradient(circle at 50% 50%, ${glowColor || 'rgba(255,255,255,0.2)'} 0%, transparent 50%)`,
            opacity: 0,
            transition: 'opacity 0.3s ease',
            pointerEvents: 'none',
            zIndex: 2,
            mixBlendMode: 'overlay',
          }}
        />
        
        {/* Content - Ensure it sits above the glow layer and popped out in 3D */}
        <Box sx={{ 
          position: 'relative', 
          zIndex: 3, 
          height: '100%', 
          width: '100%',
          transform: 'translateZ(20px)', // Push content forward to ensure clickability
        }}>
          {children}
        </Box>
      </Box>
    </Box>
  )
}

export default TiltCard
