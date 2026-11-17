import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRightIcon, RowsIcon, SquaresFourIcon } from '@phosphor-icons/react'
import { profileData } from '../content/profile'
import { filterProjectsByCategory, getAllCategories, getProjectCategory } from '../utils/categories'
import { usePageMeta } from '../hooks/usePageMeta'
import { EASE_IN_OUT } from '../lib/tokens'
import { cn } from '../lib/cn'
import Bento from '../components/bento/Bento'
import BentoLink from '../components/bento/BentoLink'
import ProjectTile from '../components/ProjectTile'
import Tag from '../components/Tag'

type ViewMode = 'grid' | 'list'
const VIEW_KEY = 'apps-view-mode'

const readViewMode = (): ViewMode => {
  try {
    const saved = localStorage.getItem(VIEW_KEY)
    return saved === 'list' || saved === 'grid' ? saved : 'grid' // allowlist, never cast
  } catch {
    return 'grid'
  }
}

export default function Apps() {
  usePageMeta({
    title: 'All Apps',
    description: 'Every project by Suraj Fale: MCP servers, full-stack apps, Rust tooling and developer utilities.',
  })
  const [viewMode, setViewMode] = useState<ViewMode>(readViewMode)
  const [category, setCategory] = useState('All')

  useEffect(() => {
    try {
      localStorage.setItem(VIEW_KEY, viewMode)
    } catch {
      /* storage blocked: the toggle still works for this visit */
    }
  }, [viewMode])

  const categories = useMemo(() => ['All', ...getAllCategories(profileData.projects)], [])
  const projects = filterProjectsByCategory(profileData.projects, category)
  const indexOf = (slug: string) => profileData.projects.findIndex((p) => p.slug === slug)

  return (
    <main id="main" className="grid grid-cols-12 gap-4">
      <Bento as="header" reveal={false} className="col-span-12 flex flex-col gap-8 lg:col-span-8">
        <p className="meta">
          <Link to="/" className="hover:text-bone">
            Home
          </Link>{' '}
          / Apps
        </p>
        <h1 className="font-display text-[clamp(2.75rem,8vw,5.5rem)] leading-[0.9] font-extrabold tracking-[-0.03em] uppercase">
          All apps
        </h1>
        <p className="max-w-xl text-bone-muted">
          Production tools, protocol servers and side projects. Each one has a write-up of how it is built.
        </p>
      </Bento>

      <Bento as="div" reveal={false} className="col-span-12 flex flex-col justify-between gap-6 lg:col-span-4">
        <div>
          <p className="meta">Index</p>
          <p className="mt-2 font-display text-6xl font-extrabold">{String(profileData.projects.length).padStart(2, '0')}</p>
          <p className="meta mt-1">Projects · {categories.length - 1} categories</p>
        </div>

        <div className="flex items-center gap-2" role="group" aria-label="Layout">
          {(
            [
              { mode: 'grid', label: 'Grid', icon: SquaresFourIcon },
              { mode: 'list', label: 'List', icon: RowsIcon },
            ] as const
          ).map(({ mode, label, icon: ModeIcon }) => (
            <button
              key={mode}
              type="button"
              aria-pressed={viewMode === mode}
              onClick={() => setViewMode(mode)}
              className={cn(
                'flex min-h-11 items-center gap-2 rounded-inner border-[1.5px] px-3 font-mono text-xs uppercase tracking-[0.08em] transition-colors duration-150 active:scale-[0.97]',
                viewMode === mode ? 'border-bone text-bone' : 'border-bone/25 text-bone-muted hover:border-bone hover:text-bone',
              )}
            >
              <ModeIcon aria-hidden /> {label}
            </button>
          ))}
        </div>
      </Bento>

      {/* Category filter: the active one carries the red indicator, like nav. */}
      <nav aria-label="Filter by category" className="col-span-12">
        <ul className="bento flex flex-wrap gap-1 p-2">
          {categories.map((c) => {
            const active = c === category
            return (
              <li key={c}>
                <button
                  type="button"
                  aria-pressed={active}
                  onClick={() => setCategory(c)}
                  className={cn(
                    'relative min-h-11 px-3 font-mono text-xs uppercase tracking-[0.08em] transition-colors duration-150',
                    active ? 'text-bone' : 'text-bone-muted hover:text-bone',
                  )}
                >
                  {c}
                  {active && (
                    <motion.span
                      layoutId="filter-indicator"
                      aria-hidden
                      className="absolute inset-x-3 bottom-1.5 h-0.5 bg-signal"
                      transition={{ duration: 0.24, ease: EASE_IN_OUT }}
                    />
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      <p className="sr-only" aria-live="polite">
        Showing {projects.length} {projects.length === 1 ? 'project' : 'projects'}
      </p>

      {viewMode === 'grid'
        ? projects.map((project) => (
            <ProjectTile
              key={project.slug}
              project={project}
              index={indexOf(project.slug)}
              withImage
              className="col-span-12 sm:col-span-6 lg:col-span-4"
            />
          ))
        : projects.map((project) => (
            <BentoLink key={project.slug} to={`/apps/${project.slug}`} className="col-span-12">
              <div className="grid gap-4 md:grid-cols-[4rem_1.2fr_2fr_auto] md:items-center md:gap-6">
                <span className="meta">{String(indexOf(project.slug) + 1).padStart(2, '0')}</span>
                <div>
                  <h2 className="font-display text-xl leading-tight font-bold">{project.title}</h2>
                  <p className="meta mt-1">{getProjectCategory(project)}</p>
                </div>
                <div>
                  <p className="line-clamp-2 text-sm text-bone-muted">{project.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>
                </div>
                <span className="meta flex items-center gap-1.5 text-bone">
                  Details <ArrowRightIcon aria-hidden />
                </span>
              </div>
            </BentoLink>
          ))}
    </main>
  )
}
