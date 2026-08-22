import { useEffect } from 'react'

interface PageMeta {
  title: string
  description?: string
}

const DEFAULT_TITLE = 'Suraj Fale - Software Engineer Portfolio'
const DEFAULT_DESCRIPTION =
  'Suraj Fale - Software Engineer specializing in Scala, Apache Kafka, and distributed systems. Explore my projects and professional journey.'

const setMetaContent = (selector: string, content: string) => {
  const el = document.querySelector(selector)
  if (el) el.setAttribute('content', content)
}

// Updates document.title and the description/OG/Twitter meta tags for the
// current route. Browser tab, history, and JS-rendering crawlers (e.g.
// Googlebot) pick this up; crawlers that don't execute JS (most social-share
// bots) still see the static tags baked into index.html at build time.
export const usePageMeta = ({ title, description }: PageMeta) => {
  useEffect(() => {
    const fullTitle = `${title} | Suraj Fale`
    document.title = fullTitle

    const desc = description ?? DEFAULT_DESCRIPTION
    setMetaContent('meta[name="description"]', desc)
    setMetaContent('meta[property="og:title"]', fullTitle)
    setMetaContent('meta[property="og:description"]', desc)
    setMetaContent('meta[name="twitter:title"]', fullTitle)
    setMetaContent('meta[name="twitter:description"]', desc)

    return () => {
      document.title = DEFAULT_TITLE
      setMetaContent('meta[name="description"]', DEFAULT_DESCRIPTION)
      setMetaContent('meta[property="og:title"]', DEFAULT_TITLE)
      setMetaContent('meta[property="og:description"]', DEFAULT_DESCRIPTION)
      setMetaContent('meta[name="twitter:title"]', DEFAULT_TITLE)
      setMetaContent('meta[name="twitter:description"]', DEFAULT_DESCRIPTION)
    }
  }, [title, description])
}
