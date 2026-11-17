import { ArrowUpRightIcon, DevToLogoIcon, LinkedinLogoIcon, MediumLogoIcon, type Icon } from '@phosphor-icons/react'
import type { WritingPlatform, WritingPost } from '../../content/writing'
import { profileData } from '../../content/profile'
import Bento from '../bento/Bento'
import { cn } from '../../lib/cn'

const PLATFORM: Record<WritingPlatform, { label: string; icon: Icon }> = {
  devto: { label: 'DEV', icon: DevToLogoIcon },
  medium: { label: 'Medium', icon: MediumLogoIcon },
  linkedin: { label: 'LinkedIn', icon: LinkedinLogoIcon },
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

const profileUrl = (name: string) => profileData.socials.find((s) => s.name === name)?.url

interface WritingTileProps {
  posts: WritingPost[]
  /** Span two grid rows (beside Featured + Stack). Only worth it with enough posts to fill it. */
  tall: boolean
}

/**
 * Technical Writing / Deep-Dives tile: newest posts across every platform.
 * Feed URLs were vetted at build time (fetch-writing.mjs → safePostUrl) or are
 * hand-pinned in writing.ts, and every field renders as text, never HTML.
 */
export default function WritingTile({ posts, tall }: WritingTileProps) {
  const elsewhere = [
    { label: 'dev.to', url: profileUrl('dev.to') },
    { label: 'Medium', url: profileUrl('Medium') },
  ].filter((l): l is { label: string; url: string } => Boolean(l.url))

  return (
    <Bento
      id="writing"
      as="aside"
      labelledBy="writing-title"
      className={cn('col-span-12 flex flex-col lg:col-span-4', tall && 'lg:row-span-2')}
    >
      <p className="meta">Technical writing</p>
      <h2 id="writing-title" className="mt-3 font-display text-3xl leading-[1.05] font-bold">
        Deep-dives
      </h2>

      {posts.length > 0 ? (
        <ul className="mt-6 divide-y divide-bone/15">
          {posts.map((post) => {
            const { label, icon: PlatformIcon } = PLATFORM[post.platform]
            return (
              <li key={post.url}>
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-inner py-4"
                >
                  <p className="meta flex items-center gap-2">
                    <PlatformIcon aria-hidden className="text-sm text-bone" />
                    <span>{label}</span>
                    <span aria-hidden>·</span>
                    <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                    {post.readTimeMinutes ? <span>· {post.readTimeMinutes} min</span> : null}
                  </p>
                  <h3 className="mt-2 flex items-start justify-between gap-3 text-base leading-snug font-semibold text-bone">
                    <span className="underline-offset-4 decoration-bone/60 group-hover:underline">{post.title}</span>
                    <ArrowUpRightIcon
                      aria-hidden
                      className="mt-1 shrink-0 text-bone-muted transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-bone"
                    />
                  </h3>
                  <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-bone-muted">{post.excerpt}</p>
                </a>
              </li>
            )
          })}
        </ul>
      ) : (
        <p className="mt-6 rounded-inner border-[1.5px] border-dashed border-bone/25 p-5 text-sm text-bone-muted">
          New posts sync on the next deploy. Until then, the archives are linked below.
        </p>
      )}

      {elsewhere.length > 0 && (
        <p className="meta mt-auto flex flex-wrap gap-x-4 gap-y-2 pt-6">
          <span>Archive:</span>
          {elsewhere.map((l) => (
            <a
              key={l.label}
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-bone underline decoration-bone/40 underline-offset-4 hover:decoration-bone"
            >
              {l.label} ↗
            </a>
          ))}
        </p>
      )}
    </Bento>
  )
}
