import styles from './HomeSections.module.css'

interface Technology {
  name: string
  context: string
}

const developing: readonly Technology[] = [
  { name: 'React & TypeScript', context: 'Learning through this portfolio, built with Vite.' },
  { name: 'PostgreSQL / Neon', context: 'Beginner; the authoritative data store for Accountability OS.' },
  { name: 'Docker', context: 'Developing container fundamentals through project infrastructure.' },
  { name: 'AWS EC2', context: 'Beginner; learning cloud infrastructure through Accountability OS.' },
  { name: 'Python', context: 'Building a foundation in the language.' },
]

const interfaces: readonly Technology[] = [
  { name: 'Telegram Bot API', context: 'The interface for Accountability OS.' },
  { name: 'Google Gemini', context: 'AI-assisted analysis and proposals for human review.' },
]

export function TechnologiesSection() {
  return (
    <section id="technologies" tabIndex={-1} aria-labelledby="technologies-title">
      <h2 id="technologies-title">Technologies</h2>
      <p>My familiarity varies. These are tools I’m building with and learning, not a list of equal expertise.</p>
      <div className={styles.group}>
        <h3>More comfortable</h3>
        <ul className={styles.familiar}>
          <li>JavaScript</li>
          <li>n8n</li>
          <li>Git</li>
        </ul>
      </div>
      <div className={styles.group}>
        <h3>Developing foundations</h3>
        <dl className={styles.technologyList}>
          {developing.map((technology) => (
            <div key={technology.name}>
              <dt>{technology.name}</dt>
              <dd>{technology.context}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className={styles.group}>
        <h3>Interfaces used in my current project</h3>
        <dl className={styles.technologyList}>
          {interfaces.map((technology) => (
            <div key={technology.name}>
              <dt>{technology.name}</dt>
              <dd>{technology.context}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
