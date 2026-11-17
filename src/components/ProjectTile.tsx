import { ArrowRightIcon } from '@phosphor-icons/react'
import type { Project } from '../content/profile'
import { getProjectCategory } from '../utils/categories'
import BentoLink from './bento/BentoLink'
import Tag from './Tag'
import { cn } from '../lib/cn'

interface ProjectTileProps {
  project: Project
  index: number
  className?: string
  /** Show the screenshot on top (Apps grid); compact tiles skip it. */
  withImage?: boolean
}

/** Whole-tile link to a project's detail page. */
export default function ProjectTile({ project, index, className, withImage = false }: ProjectTileProps) {
  return (
    <BentoLink to={`/apps/${project.slug}`} pad={false} className={cn('flex flex-col', className)}>
      {withImage && (
        <div className="p-2 pb-0">
          <img
            src={project.image}
            alt=""
            width={1200}
            height={750}
            loading="lazy"
            className="aspect-[16/10] w-full rounded-inner border-[1.5px] border-bone/25 object-cover"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <p className="meta flex justify-between gap-3">
          <span>{getProjectCategory(project)}</span>
          <span>{String(index + 1).padStart(2, '0')}</span>
        </p>
        <h3 className="mt-3 font-display text-xl leading-tight font-bold">{project.title}</h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-bone-muted">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.technologies.slice(0, 3).map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
        <p className="meta mt-auto flex items-center gap-1.5 pt-6 text-bone">
          Details <ArrowRightIcon aria-hidden />
        </p>
      </div>
    </BentoLink>
  )
}
