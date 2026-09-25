import { Link } from 'react-router'
import { NotFoundCharacter } from '../components/not-found/NotFoundCharacter'
import styles from './NotFoundPage.module.css'

export function NotFoundPage() {
  return (
    <div className={styles.page}>
      <title>404 — Page Not Found | Ammishaddai</title>
      <NotFoundCharacter />
      <h1>404 — Page Not Found</h1>
      <p>Looks like this route leads nowhere.</p>
      <Link className={styles.homeLink} to="/">Back Home</Link>
    </div>
  )
}
