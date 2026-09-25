import { useEffect, useRef } from 'react'
import styles from './NotFoundCharacter.module.css'

export function NotFoundCharacter() {
  const artworkRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const artwork = artworkRef.current
    if (!artwork) return
    const preference = window.matchMedia('(min-width: 48rem) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)')
    let bounds: DOMRect | null = null
    let frame = 0
    let x = 0
    let y = 0

    function reset() {
      cancelAnimationFrame(frame)
      frame = 0
      bounds = null
      artwork!.style.removeProperty('--look-x')
      artwork!.style.removeProperty('--look-y')
      artwork!.style.removeProperty('--tilt')
      artwork!.style.removeProperty('--shift')
    }

    function move(event: PointerEvent) {
      if (!preference.matches || event.pointerType !== 'mouse') return
      // Cache the local geometry until scrolling/resizing invalidates it.
      bounds ??= artwork!.getBoundingClientRect()
      if (!bounds.width || !bounds.height) return
      x = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1))
      y = Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1))
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        artwork!.style.setProperty('--look-x', `${x * 4}px`)
        artwork!.style.setProperty('--look-y', `${y * 3}px`)
        artwork!.style.setProperty('--tilt', `${x * 3}deg`)
        artwork!.style.setProperty('--shift', `${x * 2}px`)
      })
    }

    artwork.addEventListener('pointermove', move)
    artwork.addEventListener('pointerleave', reset)
    artwork.addEventListener('pointercancel', reset)
    window.addEventListener('resize', reset)
    window.addEventListener('scroll', reset, { passive: true })
    preference.addEventListener('change', reset)
    return () => {
      reset()
      artwork.removeEventListener('pointermove', move)
      artwork.removeEventListener('pointerleave', reset)
      artwork.removeEventListener('pointercancel', reset)
      window.removeEventListener('resize', reset)
      window.removeEventListener('scroll', reset)
      preference.removeEventListener('change', reset)
    }
  }, [])

  return (
    <div ref={artworkRef} className={styles.artwork} aria-hidden="true">
      <svg viewBox="0 0 360 300" focusable="false" aria-hidden="true">
        <g className={styles.guide}>
          <path d="M52 70V48H74 M286 48H308V70 M52 230V252H74 M286 252H308V230" />
          <path d="M112 264H248" />
        </g>
        <g>
          <path d="M152 222L142 250H124 M208 222L218 250H236" />
          <path d="M132 168L99 188L82 172 M228 168L257 152L273 167" />
          <circle cx="99" cy="188" r="5" />
          <circle cx="257" cy="152" r="5" />
          <g className={styles.torso}>
            <path className={styles.surface} d="M142 151H218L229 211L209 229H151L131 211Z" />
            <circle cx="180" cy="189" r="14" />
            <path d="M173 189H187 M180 182V196 M158 215H202" />
          </g>
          <path d="M169 149V133 M191 149V133" />
          <g className={styles.head}>
            <path d="M180 67V49L198 37" />
            <circle cx="202" cy="34" r="6" className={styles.surface} />
            <rect x="116" y="67" width="128" height="70" rx="9" className={styles.surface} />
            <path d="M116 88H105V117H116 M244 88H255V117H244" />
            <circle cx="151" cy="100" r="12" />
            <circle cx="209" cy="100" r="12" />
            <g className={styles.eyes}>
              <circle cx="151" cy="100" r="4" className={styles.pupil} />
              <circle cx="209" cy="100" r="4" className={styles.pupil} />
            </g>
            <path d="M171 121H189" />
          </g>
        </g>
      </svg>
    </div>
  )
}
