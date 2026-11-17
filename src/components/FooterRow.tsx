import { ArrowUpRightIcon } from '@phosphor-icons/react'
import { profileData } from '../content/profile'
import { socialIcon } from '../lib/socialIcons'
import Bento from './bento/Bento'
import BentoLink from './bento/BentoLink'
import ActionLink from './ActionLink'

/** Compact Footer / Socials bento row, shared by every page. */
export default function FooterRow() {
  const primary = profileData.socials.filter((s) => s.emphasized)
  const secondary = profileData.socials.filter((s) => !s.emphasized)

  return (
    <footer className="mt-4 grid grid-cols-12 gap-4 pb-6">
      <Bento as="div" className="col-span-12 flex flex-col justify-between gap-6 lg:col-span-4">
        <p className="font-display text-2xl font-bold">Suraj Fale</p>
        <div className="meta space-y-1">
          <p>© {new Date().getFullYear()} · Principal Engineer</p>
          <p>Built with React, Tailwind CSS &amp; Framer Motion</p>
        </div>
      </Bento>

      {primary.map((s) => {
        const SocialIcon = socialIcon(s.icon)
        return (
          <BentoLink
            key={s.name}
            href={s.url}
            label={`${s.name} (opens in a new tab)`}
            className="col-span-6 flex flex-col justify-between gap-8 lg:col-span-2"
          >
            <span className="flex items-start justify-between">
              <SocialIcon aria-hidden className="text-3xl" />
              <ArrowUpRightIcon aria-hidden className="text-bone-muted" />
            </span>
            <span className="font-display text-lg font-bold">{s.name}</span>
          </BentoLink>
        )
      })}

      <Bento as="div" className="col-span-12 lg:col-span-4">
        <p className="meta">Elsewhere</p>
        <ul className="mt-4 flex flex-wrap gap-3">
          {secondary.map((s) => {
            const SocialIcon = socialIcon(s.icon)
            return (
              <li key={s.name}>
                <ActionLink href={s.url} label={`${s.name} (opens in a new tab)`} square>
                  <SocialIcon aria-hidden className="text-lg" />
                </ActionLink>
              </li>
            )
          })}
        </ul>
      </Bento>
    </footer>
  )
}
