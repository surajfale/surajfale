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

export interface PlatformFeed {
  platform: WritingPlatform
  posts: WritingPost[]
}

const MAX_POSTS_PER_PLATFORM = 5

// LinkedIn doesn't expose a public feed of personal posts, so these are
// pinned by hand instead of synced by scripts/fetch-writing.mjs.
// Add up to 5 entries here — newest first isn't required, they're sorted below.
export const curatedWriting: WritingPost[] = [
  {
    platform: 'linkedin',
    status: 'curated',
    title: 'Debugging a RAG Pipeline From My Phone, With Claude',
    url: 'https://www.linkedin.com/posts/surajfale_grocery-list-smart-voice-shopping-lists-activity-7467796201359294464-jxBO',
    excerpt:
      'A late-night RAG bug in a learning project turned out to be chunk limitations and aggregation, not just retrieval — diagnosed and fixed entirely from my phone with Claude, no laptop required.',
    publishedAt: '2026-06-28',
    tags: ['rag', 'claude', 'genai'],
  },
]

const generatedWriting = generated as { devto: WritingPost[]; medium: WritingPost[]; generatedAt: string | null }

const newestFirst = (posts: WritingPost[]): WritingPost[] =>
  [...posts]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, MAX_POSTS_PER_PLATFORM)

export const getWritingFeed = (): PlatformFeed[] => [
  { platform: 'devto', posts: newestFirst(generatedWriting.devto) },
  { platform: 'medium', posts: newestFirst(generatedWriting.medium) },
  { platform: 'linkedin', posts: newestFirst(curatedWriting) },
]

export const writingGeneratedAt = generatedWriting.generatedAt
