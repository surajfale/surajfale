import { Project } from '../content/profile'

/**
 * Auto-categorize a project based on its technologies
 * Returns the primary technology category
 */
export function getProjectCategory(project: Project): string {
  // If category is explicitly set, use it
  if (project.category) {
    return project.category
  }

  // Auto-categorize based on technologies
  const techs = project.technologies.map((t) => t.toLowerCase())

  // Priority order for categorization
  if (techs.some((t) => t.includes('rust'))) {
    return 'Rust'
  }
  if (techs.some((t) => t.includes('react'))) {
    return 'React'
  }
  if (techs.some((t) => t.includes('svelte'))) {
    return 'SvelteKit'
  }
  if (techs.some((t) => t.includes('python'))) {
    return 'Python'
  }
  if (techs.some((t) => t.includes('node'))) {
    return 'Node.js'
  }
  if (techs.some((t) => t.includes('vue'))) {
    return 'Vue'
  }
  if (techs.some((t) => t.includes('angular'))) {
    return 'Angular'
  }

  // Default category
  return 'Other'
}

/**
 * Get all unique categories from projects
 */
export function getAllCategories(projects: Project[]): string[] {
  const categories = new Set<string>()
  projects.forEach((project) => {
    categories.add(getProjectCategory(project))
  })
  return Array.from(categories).sort()
}

/**
 * Filter projects by category
 */
export function filterProjectsByCategory(projects: Project[], category: string): Project[] {
  if (category === 'All') {
    return projects
  }
  return projects.filter((project) => getProjectCategory(project) === category)
}

