import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef   = useRef(null)
  const ringRef  = useRef(null)
  const pos      = useRef({ x: 0, y: 0 })
  const ring     = useRef({ x: 0, y: 0 })
  const rafRef   = useRef(null)

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    document.body.style.cursor = 'none'

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`
      }
    }

    const onEnterLink = () => {
      dotRef.current?.classList.add('cursor-grow')
      ringRef.current?.classList.add('cursor-grow')
    }
    const onLeaveLink = () => {
      dotRef.current?.classList.remove('cursor-grow')
      ringRef.current?.classList.remove('cursor-grow')
    }

    // Smooth lagging ring
    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12
      ring.current.y += (pos.current.y - ring.current.y) * 0.12
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(calc(${ring.current.x}px - 50%), calc(${ring.current.y}px - 50%))`
      }
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    window.addEventListener('mousemove', onMove)
    document.querySelectorAll('a, button, [role="button"], label[class*="cursor"]')
      .forEach((el) => {
        el.addEventListener('mouseenter', onEnterLink)
        el.addEventListener('mouseleave', onLeaveLink)
      })

    return () => {
      document.body.style.cursor = ''
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <>
      {/* Dot — snaps instantly */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[99999] pointer-events-none"
        style={{ willChange: 'transform' }}
      >
        <div className="w-2 h-2 gold-gradient-bg rounded-full shadow-lg shadow-gold-400/60 transition-all duration-150 cursor-dot" />
      </div>

      {/* Ring — lags behind */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[99998] pointer-events-none"
        style={{ willChange: 'transform' }}
      >
        <div className="w-6 h-6 rounded-full border border-gold-400/50 transition-all duration-150 cursor-ring" />
      </div>

      <style>{`
        .cursor-grow .cursor-dot { transform: scale(3); }
        .cursor-grow .cursor-ring { transform: scale(1.5); border-color: rgba(212,175,55,0.8); }
      `}</style>
    </>
  )
}
