import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowElbowDownLeftIcon,
  ArticleIcon,
  CubeIcon,
  GithubLogoIcon,
  HouseIcon,
  LinkedinLogoIcon,
  MagnifyingGlassIcon,
  SquaresFourIcon,
  TreeStructureIcon,
  type Icon,
} from '@phosphor-icons/react'
import { profileData } from '../content/profile'
import { cn } from '../lib/cn'

interface Command {
  id: string
  title: string
  group: 'Navigate' | 'Projects' | 'Links'
  icon: Icon
  run: () => void
}

interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const socialUrl = (name: string) => profileData.socials.find((s) => s.name === name)?.url ?? '/'
const openExternal = (url: string) => window.open(url, '_blank', 'noopener,noreferrer')

/**
 * ⌘K / Ctrl+K palette. Keyboard-summoned UI is instant (no transition).
 * ARIA combobox + listbox: focus stays in the input, arrows move
 * aria-activedescendant, Enter runs, Escape closes and restores focus.
 */
export default function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const navigate = useNavigate()
  const listId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const restoreFocusRef = useRef<HTMLElement | null>(null)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)

  const commands = useMemo<Command[]>(
    () => [
      { id: 'home', title: 'Home', group: 'Navigate', icon: HouseIcon, run: () => navigate('/') },
      { id: 'work', title: 'Featured work', group: 'Navigate', icon: CubeIcon, run: () => navigate('/#work') },
      { id: 'writing', title: 'Writing & deep-dives', group: 'Navigate', icon: ArticleIcon, run: () => navigate('/#writing') },
      { id: 'stack', title: 'Core stack & architecture', group: 'Navigate', icon: TreeStructureIcon, run: () => navigate('/#stack') },
      { id: 'apps', title: 'All apps', group: 'Navigate', icon: SquaresFourIcon, run: () => navigate('/apps') },
      ...profileData.projects.map<Command>((p) => ({
        id: `project-${p.slug}`,
        title: p.title,
        group: 'Projects',
        icon: CubeIcon,
        run: () => navigate(`/apps/${p.slug}`),
      })),
      { id: 'github', title: 'GitHub', group: 'Links', icon: GithubLogoIcon, run: () => openExternal(socialUrl('GitHub')) },
      { id: 'linkedin', title: 'LinkedIn', group: 'Links', icon: LinkedinLogoIcon, run: () => openExternal(socialUrl('LinkedIn')) },
    ],
    [navigate],
  )

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return q ? commands.filter((c) => `${c.title} ${c.group}`.toLowerCase().includes(q)) : commands
  }, [commands, query])

  const close = () => {
    onOpenChange(false)
    setQuery('')
    setSelected(0)
    restoreFocusRef.current?.focus()
  }

  // Global ⌘K / Ctrl+K toggle.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        onOpenChange(!open)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onOpenChange])

  // Remember who had focus, focus the input, and lock page scroll while open.
  useEffect(() => {
    if (!open) return
    restoreFocusRef.current = document.activeElement as HTMLElement | null
    inputRef.current?.focus()
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = overflow
    }
  }, [open])

  if (!open) return null

  const run = (command: Command | undefined) => {
    if (!command) return
    close()
    command.run()
  }

  const onInputKeyDown = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelected((i) => (results.length ? (i + 1) % results.length : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelected((i) => (results.length ? (i - 1 + results.length) % results.length : 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      run(results[selected])
    } else if (e.key === 'Escape') {
      e.preventDefault()
      close()
    } else if (e.key === 'Tab') {
      e.preventDefault() // the input is the only tab stop inside the modal
    }
  }

  const optionId = (id: string) => `${listId}-${id}`
  const active = results[selected]

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-canvas/80 px-4 pt-[12vh]" onMouseDown={close}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="w-full max-w-xl overflow-hidden rounded-bento border-[1.5px] border-bone bg-card"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b-[1.5px] border-bone/60 px-4">
          <MagnifyingGlassIcon aria-hidden className="text-lg text-bone-muted" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSelected(0)
            }}
            onKeyDown={onInputKeyDown}
            role="combobox"
            aria-expanded="true"
            aria-controls={listId}
            aria-activedescendant={active ? optionId(active.id) : undefined}
            aria-autocomplete="list"
            placeholder="Jump to a section, project or profile…"
            className="h-14 w-full bg-transparent font-mono text-sm text-bone placeholder:text-bone-muted focus:outline-none"
          />
          <kbd className="meta rounded-inner border border-bone/40 px-1.5 py-0.5">Esc</kbd>
        </div>

        <ul id={listId} role="listbox" aria-label="Commands" className="max-h-[50vh] overflow-y-auto p-2">
          {results.length === 0 && (
            <li className="px-3 py-6 text-center font-mono text-sm text-bone-muted">No matches for “{query}”.</li>
          )}
          {results.map((command, i) => {
            const isActive = i === selected
            const CommandIcon = command.icon
            return (
              <li
                key={command.id}
                id={optionId(command.id)}
                role="option"
                aria-selected={isActive}
                onMouseMove={() => setSelected(i)}
                onClick={() => run(command)}
                className={cn(
                  'relative flex cursor-pointer items-center gap-3 rounded-inner px-3 py-2.5 text-sm',
                  isActive ? 'bg-canvas text-bone' : 'text-bone-muted',
                )}
              >
                {/* Active indicator (Signal Red use #2). */}
                {isActive && <span aria-hidden className="absolute inset-y-2 left-0 w-0.5 bg-signal" />}
                <CommandIcon aria-hidden className="text-base" />
                <span className="flex-1">{command.title}</span>
                <span className="meta">{command.group}</span>
                {isActive && <ArrowElbowDownLeftIcon aria-hidden className="text-bone-muted" />}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
