import { Link } from 'react-router'
import styles from './HomePage.module.css'

export function HomePage() {
  return (
    <>
      <title>Home | Portfolio V2</title>
      <header className={styles.intro}>
        <p className={styles.eyebrow}>Software Engineer</p>
        <h1>Ammishaddai</h1>
        <p>
          Building software and automation systems with a focus on practical
          engineering.
        </p>
      </header>
      <Link to="/projects/accountability-os">Currently building Accountability OS.</Link>
    </>
  )
}
