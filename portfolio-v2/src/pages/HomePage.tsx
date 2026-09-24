import { Link } from 'react-router'
import styles from './HomePage.module.css'

export function HomePage() {
  return (
    <>
      <title>Home | Portfolio V2</title>
      <header id="home" tabIndex={-1} className={styles.intro}>
        <p className={styles.eyebrow}>Software Engineer</p>
        <h1>Ammishaddai</h1>
        <p>
          Building software and automation systems with a focus on practical
          engineering.
        </p>
      </header>
      <Link to="/projects/accountability-os">Currently building Accountability OS.</Link>
      <div className={styles.sections}>
        <section id="who-i-am" tabIndex={-1} aria-labelledby="who-i-am-title">
          <h2 id="who-i-am-title">Who I Am</h2>
          <p>Section content coming in a later task.</p>
        </section>
        <section id="technologies" tabIndex={-1} aria-labelledby="technologies-title">
          <h2 id="technologies-title">Technologies</h2>
          <p>Section content coming in a later task.</p>
        </section>
        <section id="journey" tabIndex={-1} aria-labelledby="journey-title">
          <h2 id="journey-title">Journey</h2>
          <p>Section content coming in a later task.</p>
        </section>
        <section id="contact" tabIndex={-1} aria-labelledby="contact-title">
          <h2 id="contact-title">Contact</h2>
          <p>Section content coming in a later task.</p>
        </section>
      </div>
    </>
  )
}
