import { profileData, type StackDepth } from '../../content/profile'
import Bento from '../bento/Bento'
import { cn } from '../../lib/cn'

const DEPTH_LEVEL: Record<StackDepth, number> = { Core: 3, Proficient: 2, Exploring: 1 }

/** Three-segment depth gauge. Decorative: the depth word next to it carries the meaning. */
function DepthGauge({ depth }: { depth: StackDepth }) {
  const level = DEPTH_LEVEL[depth]
  return (
    <span aria-hidden className="flex gap-1">
      {[1, 2, 3].map((n) => (
        <span
          key={n}
          className={cn('h-2 w-4 rounded-[1px] border border-bone', n <= level ? 'bg-bone' : 'bg-transparent opacity-40')}
        />
      ))}
    </span>
  )
}

/** Core Stack & Architecture capabilities matrix: domain × stack × depth. */
export default function StackMatrix({ wide = false }: { wide?: boolean }) {
  return (
    <Bento id="stack" labelledBy="stack-title" className={cn('col-span-12', !wide && 'lg:col-span-8')}>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="meta">Capabilities matrix</p>
          <h2 id="stack-title" className="mt-3 font-display text-3xl leading-[1.05] font-bold">
            Core stack &amp; architecture
          </h2>
        </div>
        <p className="meta flex items-center gap-2">
          <DepthGauge depth="Core" /> Core
          <span aria-hidden className="px-1">
            /
          </span>
          <DepthGauge depth="Exploring" /> Exploring
        </p>
      </div>

      <dl className="mt-6 grid gap-px overflow-hidden rounded-inner border-[1.5px] border-bone/25 bg-bone/25">
        {profileData.stack.map((group) => (
          <div
            key={group.domain}
            className="grid grid-cols-1 gap-3 bg-card p-4 sm:grid-cols-[9rem_1fr_8rem] sm:items-center sm:gap-5"
          >
            <dt className="meta text-bone">{group.domain}</dt>
            <dd>
              <ul className="flex flex-wrap gap-2" aria-label={`${group.domain} stack`}>
                {group.items.map((item) => (
                  <li
                    key={item}
                    className={cn(
                      'rounded-inner border-[1.5px] px-2.5 py-1 text-sm',
                      group.depth === 'Core' ? 'border-bone text-bone font-semibold' : 'border-bone/25 text-bone-muted',
                    )}
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-xs text-bone-muted">{group.note}</p>
            </dd>
            <dd className="flex items-center gap-2 font-mono text-xs text-bone-muted sm:justify-end">
              <DepthGauge depth={group.depth} />
              {group.depth}
            </dd>
          </div>
        ))}
      </dl>
    </Bento>
  )
}
