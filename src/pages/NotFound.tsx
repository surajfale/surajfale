import { ArrowRightIcon, HouseIcon, SquaresFourIcon } from '@phosphor-icons/react'
import { usePageMeta } from '../hooks/usePageMeta'
import Bento from '../components/bento/Bento'
import BentoLink from '../components/bento/BentoLink'

interface NotFoundProps {
  /** What was missing, for the copy ("page" for unknown routes, "app" for bad slugs). */
  what?: 'page' | 'app'
}

export default function NotFound({ what = 'page' }: NotFoundProps) {
  usePageMeta({ title: what === 'app' ? 'App Not Found' : 'Page Not Found' })

  return (
    <main id="main" className="grid grid-cols-12 gap-4">
      <Bento as="header" reveal={false} className="col-span-12 flex min-h-[22rem] flex-col justify-between gap-8 lg:col-span-8">
        <p className="meta">Error · 404</p>
        <div>
          <h1 className="font-display text-[clamp(5rem,20vw,12rem)] leading-[0.8] font-extrabold tracking-[-0.05em]">
            404
          </h1>
          <p className="mt-6 max-w-lg text-lg text-bone-muted">
            {what === 'app'
              ? 'That app is not in the index. It may have been renamed or retired.'
              : 'Nothing is deployed at this address. The partition you wanted is not on this broker.'}
          </p>
        </div>
      </Bento>

      <div className="col-span-12 grid gap-4 lg:col-span-4">
        <BentoLink to="/" reveal={false} className="flex flex-col justify-between gap-6">
          <HouseIcon aria-hidden className="text-3xl" />
          <span className="flex items-center justify-between font-display text-xl font-bold">
            Back home <ArrowRightIcon aria-hidden />
          </span>
        </BentoLink>
        <BentoLink to="/apps" reveal={false} className="flex flex-col justify-between gap-6">
          <SquaresFourIcon aria-hidden className="text-3xl" />
          <span className="flex items-center justify-between font-display text-xl font-bold">
            Browse all apps <ArrowRightIcon aria-hidden />
          </span>
        </BentoLink>
      </div>
    </main>
  )
}
