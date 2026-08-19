import { useEffect, useState, type ReactNode } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import {
  Code2,
  Briefcase,
  Copy,
  Check,
  Globe2,
  Gauge,
  Activity,
  ShieldCheck,
  Terminal as TerminalIcon,
  FileText,
  ChevronRight,
  Sparkles,
  Layers,
  GitBranch,
  Zap,
  MessageSquare,
} from 'lucide-react'
import { profileData } from '../content/profile'

const linkedInUrl = profileData.socials.find((s) => s.name === 'LinkedIn')!.url
const githubUrl = profileData.socials.find((s) => s.name === 'GitHub')!.url

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
}

const cardBase =
  'relative rounded-none border-2 border-zinc-800 bg-[#12131a]/90 backdrop-blur-sm p-5 md:p-6 ' +
  'shadow-[4px_4px_0px_0px_rgba(255,255,255,0.07)] transition-all duration-300 ease-out ' +
  'hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#10b981] hover:border-zinc-700'

function Card({
  className = '',
  id,
  children,
}: {
  className?: string
  id?: string
  children: ReactNode
}) {
  return (
    <motion.div id={id} variants={itemVariants} className={`${cardBase} ${className}`}>
      {children}
    </motion.div>
  )
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
      <span className="h-1.5 w-1.5 bg-emerald-500" />
      {children}
    </div>
  )
}

function useLocalClock() {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return now.toLocaleTimeString('en-US', {
    timeZone: 'America/New_York',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  })
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

function HeroCard() {
  const time = useLocalClock()
  const { copied, copy } = useCopy(linkedInUrl)

  return (
    <Card className="md:col-span-2 md:row-span-2 flex flex-col justify-between gap-6">
      <div className="flex flex-col gap-5">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Available for Advisory &amp; Tech Leadership
          </span>
          <span className="inline-flex items-center gap-1.5 border border-zinc-800 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-zinc-400">
            <Globe2 className="h-3 w-3" />
            US Eastern &middot; {time}
          </span>
        </div>

        <div>
          <h1 className="font-sans text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            {profileData.name}
          </h1>
          <p className="mt-1 font-mono text-sm md:text-base text-emerald-400">
            Principal Systems Architect / Staff Engineer
          </p>
        </div>

        <p className="max-w-xl text-sm md:text-base leading-relaxed text-zinc-400">
          I design and operate distributed, event-driven systems that move data at scale
          &mdash; Kafka-backed pipelines, cache layers, and services engineered for
          high-throughput, low-latency workloads. Lately I'm applying that same systems
          rigor to Generative AI tooling and autonomous agent architectures.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <a
          href="#flagship"
          className="inline-flex items-center gap-2 border-2 border-white bg-white px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-zinc-950 transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#10b981]"
        >
          <Layers className="h-4 w-4" />
          View Architecture Docs
        </a>
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub profile"
          className="inline-flex items-center gap-2 border-2 border-zinc-700 px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-zinc-200 transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:border-emerald-500 hover:shadow-[4px_4px_0px_0px_#10b981]"
        >
          <Code2 className="h-4 w-4" />
          GitHub
        </a>
        <a
          href={linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn profile"
          className="inline-flex items-center gap-2 border-2 border-zinc-700 px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-zinc-200 transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:border-emerald-500 hover:shadow-[4px_4px_0px_0px_#10b981]"
        >
          <Briefcase className="h-4 w-4" />
          LinkedIn
        </a>
        <button
          onClick={copy}
          aria-label="Copy contact link"
          className="inline-flex items-center gap-2 border-2 border-zinc-700 px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-zinc-200 transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:border-amber-500 hover:shadow-[4px_4px_0px_0px_#f59e0b]"
        >
          {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
          {copied ? 'Copied' : 'Copy Contact Link'}
        </button>
      </div>
    </Card>
  )
}

function TelemetryCard() {
  const metrics = [
    { label: 'Throughput', value: '100M+', unit: 'req/day', icon: Zap },
    { label: 'p99 Latency', value: '<18', unit: 'ms', icon: Gauge },
    { label: 'Availability', value: '99.995', unit: '%', icon: ShieldCheck },
  ]
  return (
    <Card>
      <SectionLabel>System Telemetry</SectionLabel>
      <div className="flex flex-col gap-4">
        {metrics.map((m) => (
          <div key={m.label} className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-zinc-400">
              <m.icon className="h-3.5 w-3.5 text-emerald-500" />
              <span className="font-mono text-[11px] uppercase tracking-wider">{m.label}</span>
            </div>
            <span className="font-mono text-sm font-bold text-white">
              {m.value}
              <span className="ml-0.5 text-zinc-500">{m.unit}</span>
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-1.5 border-t border-zinc-800 pt-3 font-mono text-[10px] text-zinc-600">
        <Activity className="h-3 w-3 text-emerald-500" />
        representative production benchmarks
      </div>
    </Card>
  )
}

function StackMatrixCard() {
  const groups: { label: string; items: string[]; accent: string }[] = [
    { label: 'Core', items: ['Scala / Java', 'Distributed Systems', 'Concurrency'], accent: 'border-emerald-500/40 text-emerald-400' },
    { label: 'Streaming & Storage', items: ['Apache Kafka', 'Apache Spark', 'PostgreSQL / Redis'], accent: 'border-amber-500/40 text-amber-400' },
    { label: 'Infra & AI', items: ['Kubernetes', 'AWS', 'MCP / AI Agents'], accent: 'border-slate-400/40 text-slate-300' },
  ]
  return (
    <Card>
      <SectionLabel>Active Stack Matrix</SectionLabel>
      <div className="flex flex-col gap-4">
        {groups.map((g) => (
          <div key={g.label}>
            <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-zinc-600">{g.label}</p>
            <div className="flex flex-wrap gap-1.5">
              {g.items.map((item) => (
                <span
                  key={item}
                  className={`border px-2 py-0.5 font-mono text-[11px] ${g.accent}`}
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

function FlagshipCard() {
  const [tab, setTab] = useState<'architecture' | 'log'>('architecture')
  const badges = ['Event-Driven', 'Kafka', 'gRPC', 'Cache Engine']
  const impacts = [
    { label: 'p99 Latency', value: '-45%' },
    { label: 'Migration', value: 'Zero-Downtime' },
    { label: 'Throughput', value: '+3.4x' },
  ]
  const logLines = [
    '[deploy] rolling-update strategy=blue-green status=OK',
    '[kafka] consumer-group rebalanced partitions=48 lag=0',
    '[cache] hit-ratio=97.2% evictions=low',
    '[latency] p99=17.8ms p50=3.1ms window=5m',
    '[health] all replicas ready=6/6',
  ]

  return (
    <Card id="flagship" className="md:col-span-2 lg:col-span-3 md:row-span-2 flex flex-col">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <SectionLabel>Flagship Architecture</SectionLabel>
          <h2 className="font-sans text-xl md:text-2xl font-bold text-white">
            Distributed Event Processing Platform
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-zinc-400">
            Event-driven ingestion and processing pipeline built on Kafka and Spark, serving
            high-throughput, low-latency workloads with a resilient caching layer.
            Details generalized to respect employer confidentiality.
          </p>
        </div>
        <div className="flex gap-1.5">
          {badges.map((b) => (
            <span key={b} className="hidden md:inline-block border border-zinc-700 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-zinc-400">
              {b}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3">
        {impacts.map((i) => (
          <div key={i.label} className="border border-zinc-800 bg-zinc-950/60 p-3 text-center">
            <p className="font-mono text-lg md:text-xl font-bold text-emerald-400">{i.value}</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-zinc-500">{i.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 flex gap-2 border-b border-zinc-800">
        {(['architecture', 'log'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 py-2 font-mono text-[11px] uppercase tracking-wider transition-colors ${
              tab === t ? 'border-b-2 border-emerald-500 text-white' : 'text-zinc-600 hover:text-zinc-300'
            }`}
          >
            {t === 'architecture' ? 'Architecture' : 'Runtime Log'}
          </button>
        ))}
      </div>

      <div className="mt-4 flex-1">
        <AnimatePresence mode="wait">
          {tab === 'architecture' ? (
            <motion.div
              key="arch"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs text-zinc-400"
            >
              {[
                'Producers -> Kafka topics (partitioned by key)',
                'Stream processors -> Spark structured streaming',
                'Hot-path reads -> Redis cache-aside layer',
                'Service-to-service -> gRPC with circuit breakers',
                'Durable state -> PostgreSQL, CDC to downstream',
                'Rollouts -> blue-green, zero-downtime cutover',
              ].map((line) => (
                <div key={line} className="flex items-start gap-2 border border-zinc-800/80 bg-zinc-950/40 px-3 py-2">
                  <GitBranch className="mt-0.5 h-3 w-3 shrink-0 text-emerald-500" />
                  {line}
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="log"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="border border-zinc-800 bg-black/60 p-3 font-mono text-[11px] leading-relaxed text-emerald-400"
            >
              {logLines.map((line) => (
                <p key={line} className="whitespace-pre-wrap text-zinc-500">
                  <span className="text-emerald-500">$</span> {line}
                </p>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  )
}

function TerminalCard() {
  const response = {
    status: 'operational',
    engineer: 'suraj-fale',
    role: 'principal-systems-architect',
    specialties: ['distributed-systems', 'event-driven-architecture', 'kafka', 'spark'],
    currently_exploring: ['generative-ai', 'prompt-engineering', 'ai-agents'],
    availability: 'open-to-advisory-and-leadership-roles',
  }
  const jsonText = JSON.stringify(response, null, 2)
  const { copied, copy } = useCopy(jsonText)

  return (
    <Card className="md:col-span-2">
      <div className="flex items-center justify-between">
        <SectionLabel>CLI Playground</SectionLabel>
        <button
          onClick={copy}
          aria-label="Copy JSON response"
          className="inline-flex items-center gap-1.5 border border-zinc-700 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-zinc-400 transition-colors hover:border-emerald-500 hover:text-emerald-400"
        >
          {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <div className="border-2 border-zinc-800 bg-black/70 p-4 font-mono text-xs">
        <div className="mb-2 flex items-center gap-1.5 text-zinc-600">
          <TerminalIcon className="h-3.5 w-3.5" />
          <span>zsh</span>
        </div>
        <p className="text-zinc-300">
          <span className="text-emerald-500">$</span> curl -s https://api.portfolio.dev/v1/system-status
        </p>
        <pre className="mt-2 overflow-x-auto text-emerald-400">
{`{
  "status": "${response.status}",
  "engineer": "${response.engineer}",
  "role": "${response.role}",
  "specialties": [
    "distributed-systems",
    "event-driven-architecture",
    "kafka",
    "spark"
  ],
  "currently_exploring": [
    "generative-ai",
    "prompt-engineering",
    "ai-agents"
  ],
  "availability": "${response.availability}"
}`}
        </pre>
      </div>
    </Card>
  )
}

function PhilosophyCard() {
  const principles = [
    'Simplicity precedes resilience. Design for failure modes first.',
    'Boring technology, exceptional execution.',
    'Optimize for p99, not the demo.',
  ]
  return (
    <Card>
      <SectionLabel>Engineering Philosophy</SectionLabel>
      <ul className="flex flex-col gap-3">
        {principles.map((p) => (
          <li key={p} className="flex items-start gap-2 text-sm text-zinc-400">
            <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500" />
            {p}
          </li>
        ))}
      </ul>
    </Card>
  )
}

function ContactCard() {
  const [open, setOpen] = useState(false)
  const { copied, copy } = useCopy(linkedInUrl)

  return (
    <Card className="flex flex-col">
      <SectionLabel>Advisory &amp; Consulting</SectionLabel>
      <p className="flex-1 text-sm text-zinc-400">
        Open to advisory engagements, technical due diligence, and staff/principal-level
        leadership roles.
      </p>
      <button
        onClick={() => setOpen((o) => !o)}
        className="mt-4 inline-flex items-center justify-between gap-2 border-2 border-zinc-700 px-3 py-2 font-mono text-xs font-bold uppercase tracking-wider text-zinc-200 transition-all hover:border-emerald-500 hover:shadow-[4px_4px_0px_0px_#10b981]"
      >
        <span className="inline-flex items-center gap-2">
          <MessageSquare className="h-4 w-4" />
          Get In Touch
        </span>
        <ChevronRight className={`h-4 w-4 transition-transform ${open ? 'rotate-90' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="mt-3 flex flex-col gap-2">
              <a
                href={linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border border-zinc-800 px-3 py-2 font-mono text-xs text-zinc-300 hover:border-emerald-500 hover:text-emerald-400"
              >
                <Briefcase className="h-3.5 w-3.5" />
                Message on LinkedIn
              </a>
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border border-zinc-800 px-3 py-2 font-mono text-xs text-zinc-300 hover:border-emerald-500 hover:text-emerald-400"
              >
                <Code2 className="h-3.5 w-3.5" />
                View GitHub Profile
              </a>
              <button
                onClick={copy}
                className="flex items-center gap-2 border border-zinc-800 px-3 py-2 font-mono text-xs text-zinc-300 hover:border-amber-500 hover:text-amber-400"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <FileText className="h-3.5 w-3.5" />}
                {copied ? 'Contact link copied' : 'Copy contact link'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}

const Home = () => {
  return (
    <div className="neo-bento min-h-screen w-full bg-zinc-950 py-8 text-white">
      <div
        className="fixed inset-0 -z-10 opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="mx-auto grid max-w-6xl grid-flow-dense grid-cols-1 gap-4 p-4 md:grid-cols-3 md:p-6 lg:grid-cols-4"
      >
        <HeroCard />
        <TelemetryCard />
        <StackMatrixCard />
        <FlagshipCard />
        <TerminalCard />
        <PhilosophyCard />
        <ContactCard />
      </motion.div>
    </div>
  )
}

export default Home
