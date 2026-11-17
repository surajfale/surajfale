import { profileData } from '../../content/profile'
import Bento from '../bento/Bento'

const paragraphs = profileData.about
  .split('\n')
  .map((line) => line.trim())
  .filter(Boolean)

/** Two stacked tiles beside the hero: the summary and the career highlights. */
export default function AboutCards() {
  return (
    <>
      <Bento
        id="about"
        reveal={false}
        labelledBy="about-title"
        className="col-span-12 md:col-span-6 lg:col-span-4"
      >
        <h2 id="about-title" className="meta">
          About
        </h2>
        <p className="mt-4 text-base leading-relaxed text-bone">{paragraphs[0]}</p>
        {paragraphs.slice(1).map((p) => (
          <p key={p} className="mt-3 text-sm leading-relaxed text-bone-muted">
            {p}
          </p>
        ))}
      </Bento>

      <Bento reveal={false} labelledBy="track-title" className="col-span-12 md:col-span-6 lg:col-span-4">
        <h2 id="track-title" className="meta">
          Track record
        </h2>
        <ol className="mt-4 space-y-5">
          {profileData.highlights.map((h) => (
            <li key={h.title} className="grid grid-cols-[4.5rem_1fr] gap-3">
              <span className="pt-1 font-mono text-xs text-bone-muted">{h.year}</span>
              <div>
                <h3 className="font-display text-lg leading-snug font-bold">{h.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-bone-muted">{h.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </Bento>
    </>
  )
}
