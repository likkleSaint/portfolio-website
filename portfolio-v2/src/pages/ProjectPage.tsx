import { Link, useParams } from 'react-router'
import { projects } from '../data/projects'
import { NotFoundPage } from './NotFoundPage'

export function ProjectPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = projects.find((item) => item.slug === slug)

  if (!project) return <NotFoundPage />

  return (
    <>
      <title>{`${project.title} | Portfolio V2`}</title>
      <h1>{project.title}</h1>
      <p>{project.summary}</p>
      <p>Status: {project.status}</p>
      <Link to="/">Back home</Link>
    </>
  )
}
