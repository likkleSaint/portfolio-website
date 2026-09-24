import { Link } from 'react-router'
import { projects } from '../data/projects'

export function HomePage() {
  return (
    <>
      <title>Home | Portfolio V2</title>
      <h1>Home</h1>
      <p>Portfolio V2 foundation</p>
      <ul>
        {projects.map((project) => (
          <li key={project.slug}>
            <Link to={`/projects/${project.slug}`}>
              {project.title} (placeholder)
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
