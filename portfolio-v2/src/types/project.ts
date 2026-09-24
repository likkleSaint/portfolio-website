export interface Project {
  slug: string
  title: string
  summary: string
  status: 'in-development' | 'completed'
  technologies: readonly string[]
}
