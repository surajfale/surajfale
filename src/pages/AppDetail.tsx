import { Link, useParams } from 'react-router-dom'
import { ArrowLeftIcon, ArrowRightIcon, ArrowUpRightIcon, CheckIcon, CodeIcon } from '@phosphor-icons/react'
import { profileData } from '../content/profile'
import { getProjectCategory } from '../utils/categories'
import { hasLiveTarget } from '../utils/projects'
import { usePageMeta } from '../hooks/usePageMeta'
import Bento from '../components/bento/Bento'
import BentoLink from '../components/bento/BentoLink'
import ActionLink from '../components/ActionLink'
import ArchitectureNotes from '../components/ArchitectureNotes'
import Tag from '../components/Tag'
import NotFound from './NotFound'

export default function AppDetail() {
  const { slug } = useParams<{ slug: string }>()
  const index = profileData.projects.findIndex((p) => p.slug === slug)
  const project = profileData.projects[index]

  usePageMeta({ title: project?.title ?? 'App Not Found', description: project?.description })

  if (!project) return <NotFound what="app" />

  const all = profileData.projects
  const prev = all[(index - 1 + all.length) % all.length]
  const next = all[(index + 1) % all.length]
  const number = String(index + 1).padStart(2, '0')

  return (
    <main id="main" className="grid grid-cols-12 gap-4">
      <Bento as="header" reveal={false} className="col-span-12 flex flex-col gap-6 lg:col-span-8">
        <nav aria-label="Breadcrumb" className="meta">
          <ol className="flex flex-wrap gap-2">
            <li>
              <Link to="/" className="hover:text-bone">
                Home
              </Link>{' '}
              /
            </li>
            <li>
              <Link to="/apps" className="hover:text-bone">
                Apps
              </Link>{' '}
              /
            </li>
            <li aria-current="page" className="text-bone">
              {project.title}
            </li>
          </ol>
        </nav>
        <h1 className="font-display text-[clamp(2.5rem,6.5vw,4.75rem)] leading-[0.95] font-extrabold tracking-[-0.03em]">
          {project.title}
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-bone-muted sm:text-lg">{project.description}</p>
        <div className="mt-auto flex flex-wrap gap-3 pt-2">
          {hasLiveTarget(project) && (
            <ActionLink tone="signal" href={project.liveUrl} trailingIcon={<ArrowUpRightIcon />}>
              View Live Project
            </ActionLink>
          )}
          {project.sourceUrl && (
            <ActionLink href={project.sourceUrl} icon={<CodeIcon />} trailingIcon={<ArrowUpRightIcon />}>
              Source code
            </ActionLink>
          )}
          <ActionLink to="/apps" icon={<ArrowLeftIcon />}>
            All apps
          </ActionLink>
        </div>
      </Bento>

      <Bento as="aside" reveal={false} labelledBy="spec-title" className="col-span-12 lg:col-span-4">
        <h2 id="spec-title" className="meta">
          Spec sheet · {number}
        </h2>
        <dl className="mt-4 space-y-4">
          <div>
            <dt className="meta">Category</dt>
            <dd className="mt-1 font-mono text-sm">{getProjectCategory(project)}</dd>
          </div>
          <div>
            <dt className="meta">Stack</dt>
            <dd className="mt-2 flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </dd>
          </div>
          {project.techStackDetails && (
            <div>
              <dt className="meta">Build notes</dt>
              <dd className="mt-1 text-sm leading-relaxed text-bone-muted">{project.techStackDetails}</dd>
            </div>
          )}
        </dl>
      </Bento>

      {project.screenshots.length > 0 && (
        <Bento as="section" pad={false} labelledBy="shots-title" className="col-span-12 p-2">
          <h2 id="shots-title" className="sr-only">
            Screenshots
          </h2>
          <div className={project.screenshots.length > 1 ? 'grid gap-2 md:grid-cols-2' : ''}>
            {project.screenshots.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={`${project.title} screenshot ${i + 1}`}
                width={1200}
                height={750}
                loading="lazy"
                className="aspect-[16/10] w-full rounded-[2px] object-cover object-top"
              />
            ))}
          </div>
        </Bento>
      )}

      <Bento labelledBy="features-title" className="col-span-12 lg:col-span-4">
        <h2 id="features-title" className="font-display text-2xl font-bold">
          Features
        </h2>
        <ul className="mt-5 space-y-3">
          {project.features.map((f) => (
            <li key={f} className="flex gap-3 text-sm leading-relaxed">
              <CheckIcon aria-hidden className="mt-0.5 shrink-0 text-base text-bone-muted" />
              {f}
            </li>
          ))}
        </ul>
      </Bento>

      {project.architectureNotes && (
        <Bento labelledBy="arch-title" className="col-span-12 lg:col-span-8">
          <p className="meta">Deep-dive</p>
          <h2 id="arch-title" className="mt-2 mb-5 font-display text-2xl font-bold">
            Architecture &amp; design
          </h2>
          <ArchitectureNotes notes={project.architectureNotes} />
        </Bento>
      )}

      {all.length > 1 && (
        <nav aria-label="More projects" className="col-span-12 grid grid-cols-12 gap-4">
          <BentoLink to={`/apps/${prev.slug}`} className="col-span-12 sm:col-span-6">
            <span className="meta flex items-center gap-1.5">
              <ArrowLeftIcon aria-hidden /> Previous
            </span>
            <span className="mt-2 block font-display text-xl font-bold">{prev.title}</span>
          </BentoLink>
          <BentoLink to={`/apps/${next.slug}`} className="col-span-12 text-right sm:col-span-6">
            <span className="meta flex items-center justify-end gap-1.5">
              Next <ArrowRightIcon aria-hidden />
            </span>
            <span className="mt-2 block font-display text-xl font-bold">{next.title}</span>
          </BentoLink>
        </nav>
      )}
    </main>
  )
}
