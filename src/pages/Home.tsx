import { useEffect, useState, type ReactNode } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { motion, type Variants } from 'framer-motion'
import {
  Code2,
  Briefcase,
  Copy,
  Check,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Layers,
  Database,
  Cloud,
  Cpu,
  MessageSquare,
  Rocket,
  Trophy,
  Compass,
  Heart,
  type LucideIcon,
} from 'lucide-react'
import { profileData } from '../content/profile'

interface HomeProps {
  mode: 'light' | 'dark'
}

const linkedInUrl = profileData.socials.find((s) => s.name === 'LinkedIn')!.url
const githubUrl = profileData.socials.find((s) => s.name === 'GitHub')!.url
const secondarySocials = profileData.socials.filter((s) => !s.emphasized)

const featuredProject = profileData.projects.find((p) => p.slug === 'notes-tasks-app')!
const otherProjects = profileData.projects.filter((p) => p.slug !== featuredProject.slug)

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] } },
}

// Claymorphism: puffy rounded cards on a soft neutral field, distinguished by
// pastel tint + a dual soft-shadow (light highlight + soft dark shadow)
// instead of hard borders.
type Tone = 'blue' | 'mint' | 'peach' | 'lavender' | 'rose' | 'butter' | 'neutral'

const cardTone: Record<Tone, string> = {
  blue: 'bg-[#E9F2FF] dark:bg-[#172445]',
  mint: 'bg-[#E8FBF2] dark:bg-[#0F2B22]',
  peach: 'bg-[#FFF1E3] dark:bg-[#2E2013]',
  lavender: 'bg-[#F1ECFF] dark:bg-[#211A3D]',
  rose: 'bg-[#FFEBF2] dark:bg-[#2E1725]',
  butter: 'bg-[#FFF8DC] dark:bg-[#2E2810]',
  neutral: 'bg-white dark:bg-[#1B1E2B]',
}

const badgeTone: Record<Tone, string> = {
  blue: 'bg-[#CFE2FF] text-[#1D5FD1] dark:bg-[#2A3D6E] dark:text-[#9DC2FF]',
  mint: 'bg-[#CDF4E1] text-[#12805A] dark:bg-[#1C4A38] dark:text-[#7DE6B8]',
  peach: 'bg-[#FFE0C2] text-[#B75E12] dark:bg-[#4A3016] dark:text-[#FFB877]',
  lavender: 'bg-[#DED0FF] text-[#6432D6] dark:bg-[#3A2C6E] dark:text-[#C3AFFF]',
  rose: 'bg-[#FFD3E6] text-[#C41C63] dark:bg-[#4A2135] dark:text-[#FF9BC4]',
  butter: 'bg-[#FBEDA0] text-[#8A6A00] dark:bg-[#4A3E0F] dark:text-[#F5D876]',
  neutral: 'bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300',
}

const clayShadow =
  'shadow-[7px_7px_18px_rgba(148,163,184,0.4),-7px_-7px_18px_rgba(255,255,255,0.85)] ' +
  'dark:shadow-[7px_7px_18px_rgba(0,0,0,0.55),-6px_-6px_16px_rgba(255,255,255,0.035)]'

const clayShadowHover =
  'hover:shadow-[10px_10px_24px_rgba(148,163,184,0.45),-9px_-9px_22px_rgba(255,255,255,0.9)] ' +
  'dark:hover:shadow-[10px_10px_24px_rgba(0,0,0,0.6),-6px_-6px_16px_rgba(255,255,255,0.05)]'

function Card({
  tone = 'neutral',
  className = '',
  children,
}: {
  tone?: Tone
  className?: string
  children: ReactNode
}) {
  return (
    <motion.div
      variants={itemVariants}
      className={`relative rounded-[28px] p-6 md:p-7 transition-all duration-300 ease-out ${cardTone[tone]} ${clayShadow} ${clayShadowHover} hover:-translate-y-1 ${className}`}
    >
      {children}
    </motion.div>
  )
}

function SectionHeading({ icon: Icon, tone, children }: { icon: LucideIcon; tone: Tone; children: ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-2.5">
      <span
        className={`inline-flex h-9 w-9 items-center justify-center rounded-2xl ${badgeTone[tone]} shadow-[3px_3px_8px_rgba(148,163,184,0.35),-3px_-3px_8px_rgba(255,255,255,0.8)] dark:shadow-none`}
      >
        <Icon className="h-4.5 w-4.5" />
      </span>
      <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{children}</p>
    </div>
  )
}

function useCopy(text: string) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }
  return { copied, copy }
}

const clayButton =
  'inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-150 ' +
  'active:scale-95 active:shadow-[inset_3px_3px_6px_rgba(15,23,42,0.18),inset_-3px_-3px_6px_rgba(255,255,255,0.4)]'

function HeroCard() {
  return (
    <Card tone="blue" className="md:col-span-2 md:row-span-2 flex flex-col justify-between gap-6">
      <div className="flex flex-col gap-5">
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#D7F8E6] px-3.5 py-1.5 text-xs font-bold text-emerald-700 shadow-[3px_3px_8px_rgba(148,163,184,0.3),-3px_-3px_8px_rgba(255,255,255,0.8)] dark:bg-[#12351F] dark:text-emerald-400 dark:shadow-none">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Open to new opportunities
        </span>

        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {profileData.name}
          </h1>
          <p className="mt-2 text-lg font-bold text-[#1D5FD1] dark:text-[#9DC2FF]">
            {profileData.title}
          </p>
        </div>

        <p className="max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-300">
          Principal Engineer designing and delivering large-scale distributed systems &mdash;
          resilient event-driven architectures and real-time data processing built on
          Scala, Java, Apache Kafka, and Apache Spark. Currently exploring Generative AI
          and practical LLM integration for production services.
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Open to Principal / Staff engineering roles and technical advisory work.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <RouterLink
          to="/apps"
          className={`${clayButton} bg-[#0077B5] text-white shadow-[4px_4px_10px_rgba(0,119,181,0.35),-3px_-3px_8px_rgba(255,255,255,0.5)] dark:shadow-[4px_4px_10px_rgba(0,0,0,0.5)]`}
        >
          <Layers className="h-4 w-4" />
          View Projects
        </RouterLink>
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub profile"
          className={`${clayButton} bg-white text-slate-700 shadow-[4px_4px_10px_rgba(148,163,184,0.35),-3px_-3px_8px_rgba(255,255,255,0.9)] dark:bg-white/10 dark:text-slate-100 dark:shadow-none`}
        >
          <Code2 className="h-4 w-4" />
          GitHub
        </a>
        <a
          href={linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn profile"
          className={`${clayButton} bg-white text-slate-700 shadow-[4px_4px_10px_rgba(148,163,184,0.35),-3px_-3px_8px_rgba(255,255,255,0.9)] dark:bg-white/10 dark:text-slate-100 dark:shadow-none`}
        >
          <Briefcase className="h-4 w-4" />
          LinkedIn
        </a>
      </div>
    </Card>
  )
}

function TechStackCard() {
  const groups: { label: string; items: string[]; icon: LucideIcon; tone: Tone }[] = [
    { label: 'Core', items: ['Scala', 'Java', 'Distributed Systems'], icon: Cpu, tone: 'blue' },
    { label: 'Data & Streaming', items: ['Apache Kafka', 'Apache Spark'], icon: Database, tone: 'mint' },
    { label: 'Cloud & Infra', items: ['AWS', 'Docker', 'Kubernetes'], icon: Cloud, tone: 'lavender' },
    { label: 'Currently Exploring', items: ['Generative AI', 'Prompt Engineering', 'LLM Integration'], icon: Sparkles, tone: 'peach' },
  ]
  return (
    <Card tone="neutral">
      <SectionHeading icon={Rocket} tone="neutral">
        Technology
      </SectionHeading>
      <div className="flex flex-col gap-4">
        {groups.map((g) => (
          <div key={g.label}>
            <div className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <g.icon className="h-3.5 w-3.5" />
              {g.label}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {g.items.map((item) => (
                <span
                  key={item}
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${badgeTone[g.tone]}`}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

function HighlightsCard() {
  return (
    <Card tone="peach">
      <SectionHeading icon={Trophy} tone="peach">
        Career Highlights
      </SectionHeading>
      <div className="flex flex-col gap-4">
        {profileData.highlights.map((h) => (
          <div key={h.title} className="border-l-4 border-[#FFD3A6] pl-3 dark:border-[#5A3A18]">
            <p className="text-[11px] font-bold uppercase tracking-wide text-[#B75E12] dark:text-[#FFB877]">
              {h.year}
            </p>
            <p className="text-sm font-bold text-slate-900 dark:text-white">{h.title}</p>
            <p className="mt-0.5 text-sm leading-snug text-slate-600 dark:text-slate-300">
              {h.description}
            </p>
          </div>
        ))}
      </div>
    </Card>
  )
}

function FeaturedProjectCard() {
  return (
    <Card tone="lavender" className="md:col-span-2 md:row-span-2 flex flex-col">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <SectionHeading icon={Sparkles} tone="lavender">
          Featured Project
        </SectionHeading>
        <div className="flex gap-2">
          <a
            href={featuredProject.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${clayButton} bg-[#6432D6] px-4 py-2 text-xs text-white shadow-[3px_3px_8px_rgba(100,50,214,0.35),-2px_-2px_6px_rgba(255,255,255,0.4)] dark:shadow-[3px_3px_8px_rgba(0,0,0,0.5)]`}
          >
            Live Demo
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
          <a
            href={featuredProject.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${clayButton} bg-white px-4 py-2 text-xs text-slate-700 shadow-[3px_3px_8px_rgba(148,163,184,0.35),-2px_-2px_6px_rgba(255,255,255,0.9)] dark:bg-white/10 dark:text-slate-100 dark:shadow-none`}
          >
            Source
            <Code2 className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      <h2 className="-mt-2 text-2xl font-bold text-slate-900 dark:text-white">{featuredProject.title}</h2>

      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        {featuredProject.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {featuredProject.technologies.map((tech) => (
          <span
            key={tech}
            className="rounded-full bg-white/70 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:bg-white/10 dark:text-slate-300"
          >
            {tech}
          </span>
        ))}
      </div>

      <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-600 dark:text-slate-300">
        {featuredProject.features.slice(0, 6).map((f) => (
          <li key={f} className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#6432D6] dark:bg-[#C3AFFF]" />
            {f}
          </li>
        ))}
      </ul>

      <RouterLink
        to={`/apps/${featuredProject.slug}`}
        className="mt-5 inline-flex w-fit items-center gap-1.5 text-sm font-bold text-[#6432D6] hover:gap-2.5 transition-all dark:text-[#C3AFFF]"
      >
        Read the full case study
        <ArrowRight className="h-4 w-4" />
      </RouterLink>
    </Card>
  )
}

function OtherProjectsCard() {
  return (
    <Card tone="neutral" className="md:col-span-2">
      <div className="flex items-center justify-between">
        <SectionHeading icon={Layers} tone="neutral">
          More Projects
        </SectionHeading>
        <RouterLink
          to="/apps"
          className="text-xs font-bold text-[#1D5FD1] hover:underline dark:text-[#9DC2FF]"
        >
          View all
        </RouterLink>
      </div>
      <div className="flex flex-col divide-y divide-slate-100 dark:divide-white/5">
        {otherProjects.map((p) => (
          <RouterLink
            key={p.slug}
            to={`/apps/${p.slug}`}
            className="group flex items-center justify-between gap-4 rounded-2xl px-2 py-3 -mx-2 transition-colors hover:bg-slate-50 dark:hover:bg-white/5"
          >
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">{p.title}</p>
              <p className="mt-0.5 line-clamp-1 text-xs text-slate-500 dark:text-slate-400">
                {p.description}
              </p>
            </div>
            <ArrowRight className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-[#1D5FD1]" />
          </RouterLink>
        ))}
      </div>
    </Card>
  )
}

function PhilosophyCard() {
  return (
    <Card tone="butter">
      <SectionHeading icon={Compass} tone="butter">
        How I Work
      </SectionHeading>
      <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        I focus on resilient event-driven architectures, real-time data processing, and
        pragmatic system design &mdash; favoring boring, well-understood technology and
        designing for failure modes before optimizing for speed.
      </p>
    </Card>
  )
}

function ConnectCard() {
  const { copied, copy } = useCopy(linkedInUrl)
  return (
    <Card tone="rose" className="flex flex-col">
      <SectionHeading icon={Heart} tone="rose">
        Connect
      </SectionHeading>
      <div className="flex flex-col gap-2">
        <a
          href={linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between rounded-2xl bg-white/70 px-3.5 py-2.5 text-sm font-bold text-slate-800 shadow-[3px_3px_8px_rgba(148,163,184,0.25),-2px_-2px_6px_rgba(255,255,255,0.7)] transition-transform hover:-translate-y-0.5 dark:bg-white/10 dark:text-slate-100 dark:shadow-none"
        >
          <span className="inline-flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            LinkedIn
          </span>
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between rounded-2xl bg-white/70 px-3.5 py-2.5 text-sm font-bold text-slate-800 shadow-[3px_3px_8px_rgba(148,163,184,0.25),-2px_-2px_6px_rgba(255,255,255,0.7)] transition-transform hover:-translate-y-0.5 dark:bg-white/10 dark:text-slate-100 dark:shadow-none"
        >
          <span className="inline-flex items-center gap-2">
            <Code2 className="h-4 w-4" />
            GitHub
          </span>
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
        <button
          onClick={copy}
          className="flex items-center justify-between rounded-2xl bg-white/40 px-3.5 py-2.5 text-sm font-semibold text-slate-500 transition-transform hover:-translate-y-0.5 dark:bg-white/5 dark:text-slate-400"
        >
          <span className="inline-flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            {copied ? 'Contact link copied' : 'Copy contact link'}
          </span>
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
        </button>
      </div>

      {secondarySocials.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2 border-t border-white/40 pt-4 dark:border-white/10">
          {secondarySocials.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full px-2.5 py-1 text-xs font-semibold text-slate-500 transition-colors hover:bg-white/60 hover:text-slate-700 dark:text-slate-500 dark:hover:bg-white/5 dark:hover:text-slate-300"
            >
              {s.name}
            </a>
          ))}
        </div>
      )}
    </Card>
  )
}

const Home = ({ mode }: HomeProps) => {
  const [isDark, setIsDark] = useState(mode === 'dark')
  useEffect(() => setIsDark(mode === 'dark'), [mode])

  return (
    <div className={`bento-page ${isDark ? 'dark' : ''}`}>
      <div className="min-h-screen w-full bg-[#EEF2FA] py-10 dark:bg-[#11131C]">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="mx-auto grid max-w-6xl grid-flow-dense grid-cols-1 gap-6 px-4 md:grid-cols-3 md:px-6"
        >
          <HeroCard />
          <TechStackCard />
          <HighlightsCard />
          <FeaturedProjectCard />
          <OtherProjectsCard />
          <PhilosophyCard />
          <ConnectCard />
        </motion.div>
      </div>
    </div>
  )
}

export default Home
