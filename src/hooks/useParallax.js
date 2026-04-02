import { useEffect, useRef } from 'react'

/**
 * Applies a parallax scroll effect to a ref'd element's background.
 * @param {number} speed - 0 = no parallax, 0.4 = 40% slower than scroll (subtle), 0.6 = more dramatic
 */
export function useParallax(speed = 0.4) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onScroll = () => {
      const rect = el.getBoundingClientRect()
      const offset = (window.innerHeight - rect.top) * speed
      el.style.backgroundPositionY = `calc(50% + ${-offset * 0.3}px)`
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [speed])

  return ref
}
