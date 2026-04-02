import { useEffect, useRef } from 'react'

/**
 * FadeIn — wraps children with a scroll-triggered animation.
 * @param {string} variant  - 'fade-up' | 'fade-left' | 'fade-right' | 'fade-in'
 * @param {number} delay    - delay in ms (e.g. 100, 200, 300 for staggering)
 * @param {string} className - extra classes on the wrapper
 */
export default function FadeIn({ children, variant = 'fade-up', delay = 0, className = '', as: Tag = 'div' }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transitionDelay = `${delay}ms`
          el.classList.add('in-view')
          observer.unobserve(el)
        }
      },
      { threshold: 0.12 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <Tag ref={ref} className={`${variant} ${className}`}>
      {children}
    </Tag>
  )
}
