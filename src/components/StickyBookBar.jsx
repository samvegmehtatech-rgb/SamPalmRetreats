import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

export default function StickyBookBar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 transition-transform duration-500 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="glass border-t border-gold-400/20 px-6 py-3 flex items-center justify-between max-w-7xl mx-auto gap-4">
        <div className="hidden sm:block">
          <p className="text-white font-serif text-lg font-semibold">Villa Al Nakheel</p>
          <p className="text-white/40 text-xs tracking-wide">From <span className="gold-text font-semibold">AED 18,500</span> / night</p>
        </div>
        <div className="flex items-center gap-3 ml-auto">
          <a
            href="tel:+97142001234"
            className="text-gold-400 text-sm border border-gold-400/30 px-4 py-2 rounded-full hover:bg-gold-400/10 transition-all hidden sm:block"
          >
            Call Us
          </a>
          <Link
            to="/villas"
            className="gold-gradient-bg text-navy-900 font-semibold text-sm px-6 py-2.5 rounded-full hover:opacity-90 hover:scale-105 transition-all shadow-lg shadow-gold-400/20 flex items-center gap-1.5"
          >
            Reserve Now <ChevronRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  )
}
