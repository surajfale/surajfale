import type { ReactNode } from 'react'

/** Render `**bold**` spans as <strong>. Text only: never HTML. */
const withBold = (text: string): ReactNode[] =>
  text.split(/(\*\*.*?\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**') && part.length > 4 ? (
      <strong key={i} className="font-semibold text-bone">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    ),
  )

interface Block {
  heading: string | null
  bullets: string[]
}

/** Group the notes into "**Heading:**" blocks, each with its "•" bullets. */
const parse = (notes: string): Block[] => {
  const blocks: Block[] = []
  notes.split('\n').forEach((raw) => {
    const line = raw.trim()
    if (!line) return
    if (line.startsWith('**') && line.endsWith(':**')) {
      blocks.push({ heading: line.slice(2, -3), bullets: [] })
      return
    }
    if (blocks.length === 0) blocks.push({ heading: null, bullets: [] })
    blocks[blocks.length - 1].bullets.push(line.replace(/^•\s*/, ''))
  })
  return blocks
}

/**
 * Architecture notes from profile.ts as a mini bento: each "**Heading:**" block
 * becomes a cell. Uses a 1px gap over a bone/25 backing for hairline dividers.
 */
export default function ArchitectureNotes({ notes }: { notes: string }) {
  return (
    <div className="grid gap-px overflow-hidden rounded-inner border-[1.5px] border-bone/25 bg-bone/25 md:grid-cols-2">
      {parse(notes).map((block, i) => (
        <section key={block.heading ?? i} className="bg-card p-5">
          {block.heading && <h3 className="meta text-bone">{block.heading}</h3>}
          <ul className="mt-3 space-y-2">
            {block.bullets.map((b) => (
              <li key={b} className="flex gap-2 text-sm leading-relaxed text-bone-muted">
                <span aria-hidden className="font-mono">
                  —
                </span>
                <span>{withBold(b)}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
