import { profileData } from '../content/profile'
import { getLatestPosts } from '../content/writing'
import { usePageMeta } from '../hooks/usePageMeta'
import HeroCard from '../components/home/HeroCard'
import AboutCards from '../components/home/AboutCards'
import FeaturedProject from '../components/home/FeaturedProject'
import WritingTile from '../components/home/WritingTile'
import StackMatrix from '../components/home/StackMatrix'
import ProjectTile from '../components/ProjectTile'

/**
 * 12-column asymmetric bento (lg+), in DOM = reading order:
 *   [ Hero 8×2        ][ About 4      ]
 *   [                 ][ Track 4      ]
 *   [ Featured 8      ][ Writing 4×2  ]
 *   [ Stack matrix 8  ][              ]
 *   [ 3 ][ 3 ][ 3 ][ 3 ]  more projects
 * With fewer than TALL_WRITING_MIN posts the Writing tile takes one row and
 * the matrix goes full width, so no tile is stretched around empty space.
 * Collapses to 6/6 at md and a single column below.
 */
const MAX_POSTS = 5
const TALL_WRITING_MIN = 3

export default function Home() {
  usePageMeta({ title: 'Principal Engineer' })
  const [featured, ...rest] = profileData.projects
  const posts = getLatestPosts(MAX_POSTS)
  const tallWriting = posts.length >= TALL_WRITING_MIN

  return (
    <main id="main" className="grid grid-cols-12 gap-4">
      <HeroCard />
      <AboutCards />
      {featured && <FeaturedProject project={featured} />}
      <WritingTile posts={posts} tall={tallWriting} />
      <StackMatrix wide={!tallWriting} />

      <section aria-labelledby="more-title" className="contents">
        <h2 id="more-title" className="sr-only">
          More projects
        </h2>
        {rest.map((project, i) => (
          <ProjectTile
            key={project.slug}
            project={project}
            index={i + 1}
            className="col-span-12 sm:col-span-6 lg:col-span-3"
          />
        ))}
      </section>
    </main>
  )
}
