import { ArrowRightIcon, ArrowUpRightIcon, CodeIcon } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import type { Project } from '../../content/profile'
import { getProjectCategory } from '../../utils/categories'
import { hasLiveTarget } from '../../utils/projects'
import Bento from '../bento/Bento'
import ActionLink from '../ActionLink'
import Tag from '../Tag'

/**
 * 2-column Featured Systems Engineering card: narrative + proof on the left,
 * the artifact on the right. Hosts the page's single Signal Red CTA.
 */
export default function FeaturedProject({ project }: { project: Project }) {
  return (
    <Bento id="work" as="article" labelledBy="featured-title" className="col-span-12 lg:col-span-8">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="flex flex-col">
          <p className="meta">
            Featured system · {getProjectCategory(project)} · 01
          </p>
          <h2 id="featured-title" className="mt-3 font-display text-3xl leading-[1.05] font-bold sm:text-4xl">
            {project.title}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-bone-muted">{project.description}</p>

          <ul className="mt-5 space-y-2" aria-label="Key capabilities">
            {project.features.slice(0, 4).map((f) => (
              <li key={f} className="flex gap-2 text-sm text-bone">
                <span aria-hidden className="font-mono text-bone-muted">
                  →
                </span>
                {f}
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.technologies.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>

          <div className="mt-auto flex flex-wrap items-center gap-3 pt-8">
            {hasLiveTarget(project) && (
              <ActionLink tone="signal" href={project.liveUrl} trailingIcon={<ArrowUpRightIcon />}>
                View Live Project
              </ActionLink>
            )}
            {project.sourceUrl && (
              <ActionLink href={project.sourceUrl} icon={<CodeIcon />} label={`${project.title} source code on GitHub`}>
                Source
              </ActionLink>
            )}
            <Link
              to={`/apps/${project.slug}`}
              className="group inline-flex items-center gap-1.5 px-1 py-2 font-mono text-xs uppercase tracking-[0.08em] text-bone-muted transition-colors duration-150 hover:text-bone"
            >
              Case study
              <ArrowRightIcon aria-hidden className="transition-transform duration-150 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        <figure className="flex flex-col">
          <div className="overflow-hidden rounded-inner border-[1.5px] border-bone/25">
            <img
              src={project.image}
              alt={`${project.title} screenshot`}
              width={1200}
              height={750}
              className="aspect-[16/10] h-full w-full object-cover"
            />
          </div>
          <figcaption className="meta mt-3 flex justify-between gap-4">
            <span>Fig. 01 · {project.title}</span>
            <span className="hidden sm:inline">{project.technologies[0]}</span>
          </figcaption>
        </figure>
      </div>
    </Bento>
  )
}
