import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'
import { useLocation } from 'react-router'
import { useHomeSection } from '../../hooks/useHomeSection'
import { SiteNavigation } from './SiteNavigation'
import type { BranchId } from './navigationData'
import styles from './Navigation.module.css'

export function Navigation() {
  const location = useLocation()
  const activeSection = useHomeSection()
  const activeBranch: BranchId | null = location.pathname === '/projects/accountability-os'
    ? 'projects'
    : location.pathname === '/' && activeSection !== 'home'
      ? activeSection === 'contact' ? 'contact' : activeSection === 'projects' ? 'projects' : 'about'
      : null
  const context = `${location.key}:${activeBranch}`
  const [choice, setChoice] = useState<{ context: string; branch: BranchId | null } | null>(null)
  const expandedBranch = choice?.context === context ? choice.branch : activeBranch
  const [menuOpen, setMenuOpen] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const desktopRef = useRef<HTMLElement>(null)
  const previousLocation = useRef(location)
  const dialogId = useId()

  function closeMenu() {
    dialogRef.current?.close()
    setMenuOpen(false)
    triggerRef.current?.focus()
  }

  function containTabFocus(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== 'Tab') return
    const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])',
    )).filter((element) => element.getClientRects().length > 0 && !element.closest('[inert]'))
    const first = controls[0]
    const last = controls.at(-1)
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last?.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first?.focus()
    }
  }

  useEffect(() => {
    if (!menuOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previousOverflow }
  }, [menuOpen])

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 64rem)')
    function handleBreakpoint() {
      if (desktop.matches && dialogRef.current?.open) {
        dialogRef.current.close()
        desktopRef.current?.querySelector<HTMLAnchorElement>('a')?.focus()
      }
    }
    desktop.addEventListener('change', handleBreakpoint)
    return () => desktop.removeEventListener('change', handleBreakpoint)
  }, [])

  useEffect(() => {
    const previous = previousLocation.current
    previousLocation.current = location
    // Leave initial page focus alone, except for a directly loaded section URL.
    if (previous === location && !location.hash) return
    if (previous !== location && dialogRef.current?.open) dialogRef.current.close()
    const frame = requestAnimationFrame(() => {
      const target = document.getElementById(location.hash.slice(1) || 'main-content')
      target?.focus({ preventScroll: true })
      if (location.hash) target?.scrollIntoView({ block: 'start' })
      else window.scrollTo({ top: 0 })
    })
    return () => cancelAnimationFrame(frame)
  }, [location])

  const navigationProps = {
    pathname: location.pathname,
    activeSection,
    activeBranch,
    expandedBranch,
    onToggle: (branch: BranchId) => setChoice({
      context, branch: expandedBranch === branch ? null : branch,
    }),
  }

  return (
    <>
      <aside className={styles.sidebar} ref={desktopRef}>
        <p className={styles.name}>Ammishaddai</p>
        <p className={styles.role}>Software Engineer</p>
        <SiteNavigation {...navigationProps} />
      </aside>
      <header className={styles.mobileHeader}>
        <span className={styles.name}>Ammishaddai</span>
        <button
          ref={triggerRef}
          type="button"
          className={styles.menuButton}
          aria-label="Open navigation menu"
          aria-expanded={menuOpen}
          aria-controls={dialogId}
          onClick={() => {
            dialogRef.current?.showModal()
            setMenuOpen(true)
          }}
        >
          Menu
        </button>
      </header>
      <dialog
        ref={dialogRef}
        id={dialogId}
        className={styles.mobileDialog}
        aria-labelledby={`${dialogId}-title`}
        onKeyDown={containTabFocus}
        onCancel={(event) => { event.preventDefault(); closeMenu() }}
        onClose={() => setMenuOpen(false)}
      >
        <div className={styles.dialogHeader}>
          <h2 id={`${dialogId}-title`}>Navigation</h2>
          <button type="button" className={styles.menuButton} onClick={closeMenu}>
            Close menu
          </button>
        </div>
        <SiteNavigation {...navigationProps} onSelect={closeMenu} />
      </dialog>
    </>
  )
}
