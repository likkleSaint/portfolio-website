import type { ReactNode } from 'react'
import styles from './AppShell.module.css'

interface AppShellProps {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <>
      <a className={styles.skipLink} href="#main-content">
        Skip to main content
      </a>
      <div className={styles.shell}>
        <aside className={styles.sidebar}>
          <p className={styles.name}>Ammishaddai</p>
          <p className={styles.role}>Software Engineer</p>
          <p className={styles.placeholder}>Navigation coming next</p>
        </aside>
        <main id="main-content" className={styles.main} tabIndex={-1}>
          <div className={styles.content}>{children}</div>
        </main>
      </div>
    </>
  )
}
