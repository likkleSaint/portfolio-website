import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { homeSections, sectionFromHash, type SectionId } from '../components/navigation/navigationData'

export function useHomeSection() {
  const location = useLocation()
  const [observed, setObserved] = useState<{ key: string; section: SectionId } | null>(null)

  useEffect(() => {
    if (location.pathname !== '/') return

    const sections = homeSections.flatMap((id) => {
      const element = document.getElementById(id)
      return element ? [{ id, element }] : []
    })
    let firstObservation = true
    // Honor an explicit anchor initially, even when short sections cannot reach
    // the top of the viewport. Later intersection changes follow manual scrolling.
    // Re-evaluate only on intersection changes, never on every scroll event.
    const observer = new IntersectionObserver(() => {
      // Opening the modal can change scrollbar width, but is not section navigation.
      if (document.querySelector('dialog[open]')) return
      if (firstObservation && location.hash) {
        firstObservation = false
        setObserved({ key: location.key, section: sectionFromHash(location.hash) })
        return
      }
      firstObservation = false
      const positions = sections.map((section) => ({
        ...section, rect: section.element.getBoundingClientRect(),
      }))
      const atEnd = window.scrollY > 0 &&
        Math.ceil(window.scrollY + window.innerHeight) >= document.documentElement.scrollHeight - 2
      const current = atEnd
        ? positions.at(-1)
        // Prefer the latest section entering the reading band. A sliver of the
        // preceding section can remain visible even at the end of the page.
        : positions.filter(({ rect }) => rect.bottom > 0 && rect.top < window.innerHeight * 0.65).at(-1)

      if (current) setObserved({ key: location.key, section: current.id })
    }, { rootMargin: '0px 0px -35% 0px', threshold: [0, 1] })

    sections.forEach(({ element }) => observer.observe(element))
    return () => observer.disconnect()
  }, [location.hash, location.key, location.pathname])

  return observed?.key === location.key ? observed.section : sectionFromHash(location.hash)
}
