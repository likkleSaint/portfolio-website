import type { ReactNode } from 'react'
import styles from './CaseStudy.module.css'

export function CaseStudySection({ id, title, children }: {
  id: string
  title: string
  children: ReactNode
}) {
  return (
    <section id={id} tabIndex={-1} aria-labelledby={`${id}-title`} className={styles.section}>
      <h2 id={`${id}-title`}>{title}</h2>
      {children}
    </section>
  )
}
