import styles from './HomeSections.module.css'

interface Milestone {
  title: string
  period?: string
  description: string
}

const milestones: readonly Milestone[] = [
  {
    title: 'Teaching in Enchi',
    description: 'Previous work as a teacher developed my communication, patience and ability to explain ideas step by step.',
  },
  {
    title: 'Computer Science',
    period: '2025–2028',
    description: 'Studying BTech Computer Science at Sunyani Technical University, building a technical foundation for software engineering.',
  },
  {
    title: 'Learning by building',
    description: 'Practical learning is strengthening my JavaScript, Git and automation skills while introducing me to cloud infrastructure and databases.',
  },
  {
    title: 'Accountability OS',
    description: 'My current major project, in development: an AI-assisted personal management system combining Telegram, n8n, PostgreSQL, Google Gemini, Docker and AWS EC2. The principle is simple: AI proposes. Human decides. System executes.',
  },
  {
    title: 'The direction ahead',
    description: 'Growing toward software engineering, with a long-term interest in AIoT and systems that connect software, automation, AI and physical devices.',
  },
]

export function JourneySection() {
  return (
    <section id="journey" tabIndex={-1} aria-labelledby="journey-title">
      <h2 id="journey-title">Journey</h2>
      <ol className={styles.journey}>
        {milestones.map((milestone) => (
          <li key={milestone.title}>
            <h3>{milestone.title}</h3>
            {milestone.period && <p className={styles.period}>{milestone.period}</p>}
            <p>{milestone.description}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
