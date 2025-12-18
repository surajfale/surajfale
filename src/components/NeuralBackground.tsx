import { useEffect, useRef } from 'react'
import { useTheme } from '@mui/material'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
}

const NeuralBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let particles: Particle[] = []
    let width = window.innerWidth
    let height = window.innerHeight

    // Configuration
    const particleCount = Math.min(Math.floor((width * height) / 15000), 100) // Responsive count
    const connectionDistance = 150
    const mouseDistance = 200

    // Colors
    const particleColor = isDark ? 'rgba(0, 240, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)' // Neon Cyan or Black
    const lineColor = isDark ? '0, 240, 255' : '0, 0, 0' // RGB values for rgba

    // Mouse tracking
    let mouse = { x: -1000, y: -1000 }

    const init = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height

      particles = []
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
        })
      }
    }

    const handleResize = () => {
      init()
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      // Update and draw particles
      particles.forEach((p, i) => {
        // Movement
        p.x += p.vx
        p.y += p.vy

        // Bounce off edges
        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1

        // Mouse interaction (repulsion/attraction)
        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < mouseDistance) {
          const forceDirectionX = dx / distance
          const forceDirectionY = dy / distance
          const force = (mouseDistance - distance) / mouseDistance
          // Let's make it attract slightly
          const attractionStrength = 0.05

          p.vx += forceDirectionX * force * attractionStrength
          p.vy += forceDirectionY * force * attractionStrength
        }

        // Draw particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = particleColor
        ctx.fill()

        // Connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx2 = p.x - p2.x
          const dy2 = p.y - p2.y
          const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2)

          if (dist2 < connectionDistance) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(${lineColor}, ${1 - dist2 / connectionDistance})`
            ctx.lineWidth = 0.5
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        }
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    init()
    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)
    animate()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [isDark])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 0, // Behind everything
        pointerEvents: 'none',
        opacity: 0.6,
      }}
    />
  )
}

export default NeuralBackground
