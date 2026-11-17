import type { ReactNode } from 'react'

/** Mono tech tag. Bone outline only: tags are never red (red ≠ status/badges). */
export default function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-inner border border-bone/25 px-2 py-1 font-mono text-[0.6875rem] leading-none text-bone-muted">
      {children}
    </span>
  )
}
