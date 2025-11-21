import { useEffect, useRef, useState } from 'react'
import { Box } from '@mui/material'

const CustomCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null)
    const [isHovering, setIsHovering] = useState(false)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const cursor = cursorRef.current
        if (!cursor) return

        let animationFrameId: number
        let mouseX = 0
        let mouseY = 0
        let cursorX = 0
        let cursorY = 0

        const updatePosition = (e: MouseEvent) => {
            mouseX = e.clientX
            mouseY = e.clientY
            if (!isVisible) setIsVisible(true)
        }

        const animate = () => {
            // Smooth lerp for lag-free but fluid movement
            // Increasing the lerp factor to 0.2 for snappier response, or 1 for instant
            // User said "laggy", so let's make it instant or very fast.
            // Let's try direct assignment first for maximum performance, or a very high lerp.
            // Actually, the "lag" might be the React render cycle. 
            // Let's do a simple lerp:
            const lerp = 0.2
            cursorX += (mouseX - cursorX) * lerp
            cursorY += (mouseY - cursorY) * lerp

            // If close enough, snap to avoid endless calculation
            if (Math.abs(mouseX - cursorX) < 0.1) cursorX = mouseX
            if (Math.abs(mouseY - cursorY) < 0.1) cursorY = mouseY

            if (cursor) {
                cursor.style.transform = `translate(${cursorX - 16}px, ${cursorY - 16}px) scale(${cursor.dataset.hover === 'true' ? 1.5 : 1})`
            }

            animationFrameId = requestAnimationFrame(animate)
        }

        const handleMouseEnter = () => setIsVisible(true)
        const handleMouseLeave = () => setIsVisible(false)

        const handleHoverStart = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            const isClickable =
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.getAttribute('role') === 'button' ||
                target.classList.contains('MuiChip-root')

            if (isClickable) {
                setIsHovering(true)
                if (cursor) cursor.dataset.hover = 'true'
            }
        }

        const handleHoverEnd = () => {
            setIsHovering(false)
            if (cursor) cursor.dataset.hover = 'false'
        }

        window.addEventListener('mousemove', updatePosition)
        document.addEventListener('mouseenter', handleMouseEnter)
        document.addEventListener('mouseleave', handleMouseLeave)
        document.addEventListener('mouseover', handleHoverStart)
        document.addEventListener('mouseout', handleHoverEnd)

        // Start animation loop
        animate()

        return () => {
            window.removeEventListener('mousemove', updatePosition)
            document.removeEventListener('mouseenter', handleMouseEnter)
            document.removeEventListener('mouseleave', handleMouseLeave)
            document.removeEventListener('mouseover', handleHoverStart)
            document.removeEventListener('mouseout', handleHoverEnd)
            cancelAnimationFrame(animationFrameId)
        }
    }, [isVisible])

    // Don't render on touch devices
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
        return null
    }

    return (
        <Box
            ref={cursorRef}
            data-hover={isHovering}
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '32px',
                height: '32px',
                border: '2px solid #ffffff', // Always white for difference mode to work (White on White = Black)
                borderRadius: 0,
                pointerEvents: 'none',
                zIndex: 9999,
                transition: 'background-color 0.1s', // Remove transform transition to avoid conflict with JS animation
                // Actually, if we update transform via JS every frame, CSS transition on transform might fight it.
                // Let's remove transform from transition and only transition background-color.
                // But we want scale to transition.
                // We can separate the scaler? Or just let JS handle scale too?
                // JS handles scale in the transform string: `scale(...)`.
                // So we should REMOVE 'transform' from CSS transition to avoid conflict/lag.
                backgroundColor: isHovering ? 'secondary.main' : 'transparent',
                mixBlendMode: 'difference',
                display: isVisible ? 'block' : 'none',
                // We need to ensure the initial position is off-screen or 0,0
            }}
        />
    )
}

export default CustomCursor
