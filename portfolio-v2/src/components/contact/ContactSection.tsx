import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import { contactLinks } from '../../data/contact'
import { projects } from '../../data/projects'
import styles from './ContactSection.module.css'

export function ContactSection() {
  const boardRef = useRef<HTMLUListElement>(null)
  const currentProject = projects[0]

  useEffect(() => {
    const board = boardRef.current
    if (!board || !('IntersectionObserver' in window)) return
    const preference = window.matchMedia('(min-width: 75rem) and (min-height: 48rem) and (prefers-reduced-motion: no-preference)')
    let observer: IntersectionObserver | undefined

    function configure() {
      observer?.disconnect()
      delete board!.dataset.phase
      if (!preference.matches) return
      board!.dataset.phase = '0'
      observer = new IntersectionObserver(([entry]) => {
        if (!entry) return
        const progress = entry.intersectionRatio
        board!.dataset.phase = progress >= 0.75 ? '2' : progress >= 0.35 ? '1' : '0'
        // Once assembled, keep links stable even while scrolling away or back.
        if (progress >= 0.75) observer?.disconnect()
      }, { threshold: [0, 0.35, 0.75], rootMargin: '0px 0px -10% 0px' })
      observer.observe(board!)
    }

    configure()
    preference.addEventListener('change', configure)
    return () => {
      observer?.disconnect()
      preference.removeEventListener('change', configure)
      delete board.dataset.phase
    }
  }, [])

  return (
    <section id="contact" tabIndex={-1} aria-labelledby="contact-title">
      <p className={styles.eyebrow}>Contact</p>
      <h2 id="contact-title">Let’s connect.</h2>
      <p>I’m open to conversations about software engineering, automation, projects, and opportunities to learn and build.</p>
      <ul ref={boardRef} className={styles.board}>
        {contactLinks.map((item) => (
          <li key={item.label} className={styles.piece}>
            <a href={item.href} className={styles.link}>
              <span className={styles.label}>{item.label}</span>
              <span>{item.description}</span>
            </a>
          </li>
        ))}
        {currentProject && (
          <li className={styles.piece}>
            <Link to={`/projects/${currentProject.slug}`} className={styles.link}>
              <span className={styles.label}>{currentProject.title}</span>
              <span>Current work · View the case study</span>
            </Link>
          </li>
        )}
      </ul>
    </section>
  )
}
