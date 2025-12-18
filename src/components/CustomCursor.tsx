import { useEffect, useRef, useState } from 'react'
import { Box, alpha } from '@mui/material'

const CustomCursor = () => {
    const mainCursorRef = useRef<HTMLDivElement>(null)
    const ringCursorRef = useRef<HTMLDivElement>(null)
    const [isHovering, setIsHovering] = useState(false)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const mainCursor = mainCursorRef.current
        const ringCursor = ringCursorRef.current
        if (!mainCursor || !ringCursor) return

        let animationFrameId: number
        let mouseX = 0
        let mouseY = 0
        let ringX = 0
        let ringY = 0

        const updatePosition = (e: MouseEvent) => {
            mouseX = e.clientX
            mouseY = e.clientY
            
            // Move main cursor instantly for snappy feel
            mainCursor.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`
            
            if (!isVisible) setIsVisible(true)
        }

        const animate = () => {
            // Smooth lerp for the trailing ring
            const lerp = 0.15
            ringX += (mouseX - ringX) * lerp
            ringY += (mouseY - ringY) * lerp

            if (ringCursor) {
                const scale = ringCursor.dataset.hover === 'true' ? 1.5 : 1
                ringCursor.style.transform = `translate(${ringX - 16}px, ${ringY - 16}px) scale(${scale})`
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
                if (ringCursor) ringCursor.dataset.hover = 'true'
            }
        }

        const handleHoverEnd = () => {
            setIsHovering(false)
            if (ringCursor) ringCursor.dataset.hover = 'false'
        }

        window.addEventListener('mousemove', updatePosition)
        document.addEventListener('mouseenter', handleMouseEnter)
        document.addEventListener('mouseleave', handleMouseLeave)
        document.addEventListener('mouseover', handleHoverStart)
        document.addEventListener('mouseout', handleHoverEnd)

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

    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
        return null
    }

    return (
        <>
            {/* Inner Dot - Snappy */}
            <Box
                ref={mainCursorRef}
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '8px',
                    height: '8px',
                    bgcolor: 'primary.main',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 10000,
                    display: isVisible ? 'block' : 'none',
                    boxShadow: (theme) => `0 0 10px ${theme.palette.primary.main}`,
                }}
            />
            {/* Outer Ring - Trailing */}
            <Box
                ref={ringCursorRef}
                data-hover={isHovering}
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '32px',
                    height: '32px',
                    border: '1.5px solid',
                    borderColor: isHovering ? 'secondary.main' : 'primary.main',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    display: isVisible ? 'block' : 'none',
                    transition: 'border-color 0.3s, background-color 0.3s',
                    backgroundColor: isHovering ? (theme) => alpha(theme.palette.secondary.main, 0.2) : 'transparent',
                    boxShadow: (theme) => isHovering ? `0 0 20px ${alpha(theme.palette.secondary.main, 0.4)}` : 'none',
                }}
            />
        </>
    )
}

export default CustomCursor
