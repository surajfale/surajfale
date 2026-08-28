import generated from './writing.generated.json'

export type WritingPlatform = 'devto' | 'medium' | 'linkedin'
export type WritingStatus = 'live' | 'curated'

export interface WritingPost {
  platform: WritingPlatform
  status: WritingStatus
  title: string
  url: string
  excerpt: string
  publishedAt: string
  tags: string[]
  readTimeMinutes?: number | null
  stats?: {
    reactions?: number
    comments?: number
  }
}

export interface WritingSlot {
  platform: WritingPlatform
  post: WritingPost | null
}

// LinkedIn doesn't expose a public feed of personal posts, so this is
// pinned by hand instead of synced by scripts/fetch-writing.mjs.
// Replace with a real post whenever you want to swap the highlight.
export const curatedWriting: WritingPost[] = [
  {
    platform: 'linkedin',
    status: 'curated',
    title: 'Add your pinned LinkedIn post here',
    url: 'https://www.linkedin.com/in/surajfale',
    excerpt:
      'Replace this entry in src/content/writing.ts with a LinkedIn post you want to highlight — title, link, and a short excerpt.',
    publishedAt: new Date().toISOString(),
    tags: [],
  },
]

const generatedWriting = generated as { devto: WritingPost[]; medium: WritingPost[]; generatedAt: string | null }

const latestOf = (posts: WritingPost[]): WritingPost | null =>
  [...posts].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())[0] ?? null

export const getWritingFeed = (): WritingSlot[] => [
  { platform: 'devto', post: latestOf(generatedWriting.devto) },
  { platform: 'medium', post: latestOf(generatedWriting.medium) },
  { platform: 'linkedin', post: curatedWriting[0] ?? null },
]

export const writingGeneratedAt = generatedWriting.generatedAt
