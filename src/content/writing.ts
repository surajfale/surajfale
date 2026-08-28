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
    title: 'Add your pinned LinkedIn post here',
    url: 'https://www.linkedin.com/in/surajfale',
    excerpt:
      'Replace this entry in src/content/writing.ts with a LinkedIn post you want to highlight — title, link, and a short excerpt.',
    publishedAt: new Date().toISOString(),
    tags: [],
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
