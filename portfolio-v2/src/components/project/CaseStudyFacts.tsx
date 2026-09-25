import type { CaseStudyFact } from '../../types/project'
import styles from './CaseStudy.module.css'

export function CaseStudyFacts({ items }: { items: readonly CaseStudyFact[] }) {
  return (
    <dl className={styles.facts}>
      {items.map((item) => (
        <div key={item.title}>
          <dt>{item.title}</dt>
          <dd>{item.description}</dd>
        </div>
      ))}
    </dl>
  )
}

export function CaseStudyFlow({ items }: { items: readonly CaseStudyFact[] }) {
  return (
    <ol className={styles.flow}>
      {items.map((item) => (
        <li key={item.title}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </li>
      ))}
    </ol>
  )
}
