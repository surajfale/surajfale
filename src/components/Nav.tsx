import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MagnifyingGlassIcon } from '@phosphor-icons/react'
import { useActiveSection } from '../hooks/useActiveSection'
import { EASE_IN_OUT } from '../lib/tokens'
import { cn } from '../lib/cn'

const LINKS = [
  { label: 'Work', to: '/#work', section: 'work' },
  { label: 'Writing', to: '/#writing', section: 'writing' },
  { label: 'Stack', to: '/#stack', section: 'stack' },
  { label: 'Apps', to: '/apps', section: null },
] as const

const SECTION_IDS = LINKS.flatMap((l) => (l.section ? [l.section] : []))

interface NavProps {
  onOpenPalette: () => void
}

export default function Nav({ onOpenPalette }: NavProps) {
  const { pathname } = useLocation()
  const onHome = pathname === '/'
  const activeSection = useActiveSection(SECTION_IDS, onHome)

  const isActive = (link: (typeof LINKS)[number]) =>
    link.section ? onHome && activeSection === link.section : pathname.startsWith('/apps')

  return (
    <header className="sticky top-3 z-40 mb-4">
      <nav
        aria-label="Primary"
        className="flex items-center justify-between gap-3 rounded-bento border-[1.5px] border-bone/25 bg-card px-3 py-2 sm:px-4"
      >
        <Link to="/" className="flex items-center gap-3 rounded-inner" aria-label="Suraj Fale, home">
          <span
            aria-hidden
            className="grid size-8 place-items-center rounded-inner border-[1.5px] border-bone font-display text-sm font-bold"
          >
            SF
          </span>
          <span className="meta hidden text-bone sm:inline">Suraj Fale</span>
        </Link>

        <ul className="flex items-center gap-1 sm:gap-2">
          {LINKS.map((link) => {
            const active = isActive(link)
            return (
              <li key={link.label}>
                <Link
                  to={link.to}
                  aria-current={active ? (link.section ? 'location' : 'page') : undefined}
                  className={cn(
                    'relative block px-2 py-2 font-mono text-[0.6875rem] uppercase tracking-[0.08em] transition-colors duration-150 sm:px-3 sm:text-xs',
                    active ? 'text-bone' : 'text-bone-muted hover:text-bone',
                  )}
                >
                  {link.label}
                  {active && (
                    // Active indicator: one of the three places Signal Red is allowed.
                    <motion.span
                      layoutId="nav-indicator"
                      aria-hidden
                      className="absolute inset-x-2 -bottom-0.5 h-0.5 bg-signal sm:inset-x-3"
                      transition={{ duration: 0.24, ease: EASE_IN_OUT }}
                    />
                  )}
                </Link>
              </li>
            )
          })}
        </ul>

        <button
          type="button"
          onClick={onOpenPalette}
          aria-label="Open command palette"
          aria-keyshortcuts="Control+K Meta+K"
          className="flex min-h-9 items-center gap-2 rounded-inner border-[1.5px] border-bone/25 px-2.5 font-mono text-xs text-bone-muted transition-colors duration-150 hover:border-bone hover:text-bone"
        >
          <MagnifyingGlassIcon aria-hidden />
          <kbd className="hidden font-mono sm:inline">⌘K</kbd>
        </button>
      </nav>
    </header>
  )
}
