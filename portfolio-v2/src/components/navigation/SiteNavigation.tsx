import { useId, type MouseEvent } from 'react'
import { Link } from 'react-router'
import { navigationBranches, type BranchId, type SectionId } from './navigationData'
import styles from './SiteNavigation.module.css'

interface SiteNavigationProps {
  pathname: string
  activeSection: SectionId
  activeBranch: BranchId | null
  expandedBranch: BranchId | null
  onToggle: (branch: BranchId) => void
  onSelect?: () => void
}

export function SiteNavigation({
  pathname, activeSection, activeBranch, expandedBranch, onToggle, onSelect,
}: SiteNavigationProps) {
  const id = useId()

  function handleSelect(event: MouseEvent<HTMLAnchorElement>) {
    if (event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
      onSelect?.()
    }
  }

  return (
    <nav aria-label="Main navigation" className={styles.navigation}>
      <ul className={styles.rootList}>
        <li>
          <Link
            className={styles.parent}
            to="/"
            aria-current={pathname === '/' && activeSection === 'home' ? 'page' : undefined}
            onClick={handleSelect}
          >
            Home
          </Link>
        </li>
        {navigationBranches.map((branch) => {
          const expanded = expandedBranch === branch.id
          const groupId = `${id}-${branch.id}`
          return (
            <li key={branch.id}>
              <button
                type="button"
                className={styles.parent}
                aria-expanded={expanded}
                aria-controls={groupId}
                data-active={activeBranch === branch.id || undefined}
                onClick={() => onToggle(branch.id)}
              >
                {branch.label}
                <span className={styles.disclosureMark} aria-hidden="true">
                  {expanded ? '−' : '+'}
                </span>
              </button>
              <div
                id={groupId}
                className={styles.group}
                data-open={expanded}
                inert={!expanded}
                aria-hidden={!expanded}
              >
                <div className={styles.groupInner}>
                  <ul className={styles.children}>
                    {branch.items.map((item) => {
                      const current = item.section
                        ? pathname === '/' && activeSection === item.section
                        : pathname === item.href
                      return (
                        <li key={item.href} className={styles.child}>
                          {item.external ? (
                            <a className={styles.childLink} href={item.href} onClick={handleSelect}>
                              {item.label}
                            </a>
                          ) : (
                            <Link
                              className={styles.childLink}
                              to={item.href}
                              aria-current={current ? (item.section ? 'location' : 'page') : undefined}
                              onClick={handleSelect}
                            >
                              {item.label}
                            </Link>
                          )}
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
