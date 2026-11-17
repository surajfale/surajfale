import { ArrowUpRightIcon, GithubLogoIcon, LinkedinLogoIcon } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { profileData } from '../../content/profile'
import { EASE_OUT } from '../../lib/tokens'
import ActionLink from '../ActionLink'

const linkFor = (name: string) => profileData.socials.find((s) => s.name === name)?.url

const FACTS = [
  { k: 'Role', v: 'Principal Engineer' },
  { k: 'Focus', v: 'System design · Streaming' },
  { k: 'Now', v: 'GenAI & LLM integration' },
] as const

// Above the fold: no scroll reveal (it would delay LCP). The name settles in
// once on load instead; reduced motion turns that into a plain fade.
const settle = (delay: number) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay, ease: EASE_OUT },
})

export default function HeroCard() {
  const linkedIn = linkFor('LinkedIn')
  const gitHub = linkFor('GitHub')

  return (
    <header
      id="top"
      className="bento col-span-12 flex min-h-[32rem] flex-col justify-between gap-10 p-6 sm:p-8 lg:col-span-8 lg:row-span-2 lg:p-10"
    >
      <div className="flex items-start justify-between gap-4">
        <p className="meta">
          <span className="text-bone">{'//'}</span> Portfolio · {new Date().getFullYear()}
        </p>
        <p className="meta hidden sm:block">IDX/001</p>
      </div>

      <div>
        <motion.h1
          {...settle(0)}
          className="font-display text-[clamp(3.5rem,12vw,8.5rem)] leading-[0.82] font-extrabold tracking-[-0.04em] uppercase"
        >
          Suraj
          <br />
          Fale
        </motion.h1>
        <motion.p
          {...settle(0.08)}
          className="mt-6 max-w-2xl font-display text-2xl leading-tight font-semibold sm:text-3xl"
        >
          Big Data &amp; Streaming systems. Apache Spark and Apache Kafka, in Scala &amp; Java.
        </motion.p>
        <motion.p {...settle(0.14)} className="mt-4 max-w-xl text-base leading-relaxed text-bone-muted">
          Principal Engineer driving system design and multi-project delivery, now bringing Generative AI into
          production services.
        </motion.p>
      </div>

      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <dl className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-3">
          {FACTS.map(({ k, v }) => (
            <div key={k}>
              <dt className="meta">{k}</dt>
              <dd className="mt-1 font-mono text-sm text-bone">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="flex flex-wrap gap-3">
          {linkedIn && (
            <ActionLink href={linkedIn} icon={<LinkedinLogoIcon />} trailingIcon={<ArrowUpRightIcon />}>
              LinkedIn
            </ActionLink>
          )}
          {gitHub && (
            <ActionLink href={gitHub} icon={<GithubLogoIcon />} trailingIcon={<ArrowUpRightIcon />}>
              GitHub
            </ActionLink>
          )}
        </div>
      </div>
    </header>
  )
}
