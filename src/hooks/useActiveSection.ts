import { useEffect, useState } from 'react'

/**
 * Scroll-spy: returns the id of the section currently crossing the upper third
 * of the viewport, or null when none is (e.g. at the hero). IntersectionObserver
 * only, never a raw scroll listener.
 */
export const useActiveSection = (ids: readonly string[], enabled: boolean): string | null => {
  const [active, setActive] = useState<string | null>(null)
  const key = ids.join('|')

  useEffect(() => {
    if (!enabled) return
    const visible = new Map<string, boolean>()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => visible.set(entry.target.id, entry.isIntersecting))
        // First id in document order that is in the band wins.
        setActive(key.split('|').find((id) => visible.get(id)) ?? null)
      },
      // A band from 20% to 45% of the viewport height.
      { rootMargin: '-20% 0px -55% 0px' },
    )
    key.split('|').forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    // The observer reports every target's initial state on observe(), so a stale
    // value from a previous visit is corrected on the first callback.
    return () => observer.disconnect()
  }, [key, enabled])

  return enabled ? active : null
}
