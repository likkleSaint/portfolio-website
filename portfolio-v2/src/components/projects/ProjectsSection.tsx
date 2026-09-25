import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { projects } from '../../data/projects'
import styles from './ProjectsSection.module.css'

export function ProjectsSection() {
  const stageRef = useRef<HTMLDivElement>(null)
  const [showAll, setShowAll] = useState(false)
  const project = projects[0]

  useEffect(() => {
    const stage = stageRef.current
    if (!stage || !('IntersectionObserver' in window)) return
    const preference = window.matchMedia('(min-width: 75rem) and (min-height: 48rem) and (prefers-reduced-motion: no-preference)')
    let observer: IntersectionObserver | undefined

    function configure() {
      observer?.disconnect()
      delete stage!.dataset.enhanced
      delete stage!.dataset.phase
      if (!preference.matches || showAll) return
      stage!.dataset.enhanced = 'true'
      stage!.dataset.phase = '0'
      observer = new IntersectionObserver((entries) => {
        const visible = entries.find((entry) => entry.isIntersecting)
        if (visible) stage!.dataset.phase = (visible.target as HTMLElement).dataset.step
      }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 })
      stage!.querySelectorAll('[data-step]').forEach((step) => observer!.observe(step))
    }

    configure()
    preference.addEventListener('change', configure)
    return () => {
      observer?.disconnect()
      preference.removeEventListener('change', configure)
      delete stage.dataset.enhanced
      delete stage.dataset.phase
    }
  }, [showAll])

  if (!project) return null

  return (
    <section id="projects" tabIndex={-1} aria-labelledby="projects-title">
      <h2 id="projects-title">Projects</h2>
      <p>One active build, with room for what comes next.</p>
      <button className={styles.viewButton} type="button" aria-pressed={showAll}
        onClick={() => setShowAll(!showAll)}>
        Show all folders
      </button>
      <div ref={stageRef} className={styles.stage}>
        <div className={styles.steps} aria-hidden="true">
          <div data-step="0" /><div data-step="1" /><div data-step="2" />
        </div>
        <ol className={styles.folders}>
          <li className={styles.folder}>
            <div className={styles.tab} aria-hidden="true">01 / {project.title}</div>
            <article className={styles.sheet}>
              <p className={styles.status}>{project.status === 'in-development' ? 'In development' : 'Completed'}</p>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              <Link to={`/projects/${project.slug}`}>View case study</Link>
            </article>
            <div className={styles.cover} aria-hidden="true">Current build</div>
          </li>
          <li className={styles.folder}>
            <div className={styles.tab} aria-hidden="true">02 / Experiments / Archive</div>
            <article className={styles.sheet}>
              <p className={styles.status}>Reserved for future work</p>
              <h3>Experiments / Archive</h3>
              <p>A place for smaller future builds and older work. No experiments or archived projects are listed yet.</p>
            </article>
            <div className={styles.cover} aria-hidden="true">Room for what’s next</div>
          </li>
        </ol>
      </div>
    </section>
  )
}
