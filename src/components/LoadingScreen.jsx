import { useEffect, useState } from 'react'

export default function LoadingScreen({ onDone }) {
  const [phase, setPhase] = useState('visible') // visible → fadeout → done

  useEffect(() => {
    // Hold for 2s then fade out
    const hold = setTimeout(() => setPhase('fadeout'), 2000)
    // After fade animation (600ms) tell parent we're done
    const done = setTimeout(() => { setPhase('done'); onDone?.() }, 2600)
    return () => { clearTimeout(hold); clearTimeout(done) }
  }, [])

  if (phase === 'done') return null

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-navy-900 flex flex-col items-center justify-center transition-opacity duration-600 ${
        phase === 'fadeout' ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Animated ring */}
      <div className="relative flex items-center justify-center mb-8">
        <div className="absolute w-24 h-24 rounded-full border border-gold-400/20 animate-ping" style={{ animationDuration: '2s' }} />
        <div className="absolute w-20 h-20 rounded-full border border-gold-400/30" />
        {/* Logo circle */}
        <div className="w-16 h-16 gold-gradient-bg rounded-full flex items-center justify-center shadow-2xl shadow-gold-400/40">
          <span className="text-navy-900 font-serif font-bold text-3xl">S</span>
        </div>
      </div>

      {/* Brand name */}
      <h1 className="font-serif text-2xl text-white font-semibold tracking-wide mb-1">
        Sam Palm <span className="gold-text italic">Retreats</span>
      </h1>
      <p className="text-white/30 text-xs tracking-[0.4em] uppercase">Palm Jumeirah · Dubai</p>

      {/* Gold progress bar */}
      <div className="mt-10 w-40 h-px bg-white/10 rounded-full overflow-hidden">
        <div className="h-full gold-gradient-bg rounded-full animate-loading-bar" />
      </div>
    </div>
  )
}
