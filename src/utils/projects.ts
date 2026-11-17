import type { Project } from '../content/profile'

/** True when the project has a deployed/published target distinct from its repo. */
export const hasLiveTarget = (p: Project): boolean => Boolean(p.liveUrl) && p.liveUrl !== p.sourceUrl
