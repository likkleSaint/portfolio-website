import type { ReactNode } from 'react'
import { Navigation } from '../navigation/Navigation'
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
        <Navigation />
        <main id="main-content" className={styles.main} tabIndex={-1}>
          <div className={styles.content}>{children}</div>
        </main>
      </div>
    </>
  )
}
