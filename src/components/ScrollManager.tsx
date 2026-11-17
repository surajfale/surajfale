import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * BrowserRouter doesn't scroll on navigation. Jump to `#hash` targets (the nav
 * links to /#work etc.) and reset to the top on plain route changes.
 */
export default function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }
    // Wait a frame so the target route has rendered.
    const frame = requestAnimationFrame(() => {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (!target) return
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
    })
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash])

  return null
}
