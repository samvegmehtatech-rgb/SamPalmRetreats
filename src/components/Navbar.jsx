import { useState, useEffect } from 'react'
import { Menu, X, Phone } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const navLinks = [
  { label: 'Gallery',   href: '/#gallery' },
  { label: 'Amenities', href: '/#amenities' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Reviews',   href: '/#reviews' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || !isHome ? 'glass shadow-lg shadow-black/30' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 gold-gradient-bg rounded-full flex items-center justify-center shadow-lg shadow-gold-400/30 group-hover:scale-110 transition-transform">
            <span className="text-navy-900 font-serif font-bold text-lg">S</span>
          </div>
          <div className="leading-tight">
            <span className="gold-text font-serif font-semibold text-xl tracking-wide">Sam Palm</span>
            <div className="text-white/50 text-[10px] tracking-[0.25em] uppercase">Retreats</div>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-8">
          <Link
            to="/villas"
            className="text-white/70 hover:text-gold-400 text-sm tracking-wide transition-colors duration-300 font-light"
          >
            Villas
          </Link>
          <Link
            to="/experiences"
            className="text-white/70 hover:text-gold-400 text-sm tracking-wide transition-colors duration-300 font-light"
          >
            Experiences
          </Link>
          <Link
            to="/pricing"
            className="text-white/70 hover:text-gold-400 text-sm tracking-wide transition-colors duration-300 font-light"
          >
            Pricing
          </Link>
          <Link
            to="/contact"
            className="text-white/70 hover:text-gold-400 text-sm tracking-wide transition-colors duration-300 font-light"
          >
            Contact
          </Link>
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-white/70 hover:text-gold-400 text-sm tracking-wide transition-colors duration-300 font-light"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <a href="tel:+97142001234" className="flex items-center gap-2 text-gold-400 text-sm hover:text-gold-300 transition-colors">
            <Phone size={14} />
            +971 4 200 1234
          </a>
          <Link
            to="/villas"
            className="gold-gradient-bg text-navy-900 font-semibold text-sm px-6 py-2.5 rounded-full hover:opacity-90 hover:scale-105 transition-all shadow-lg shadow-gold-400/20"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden text-white/80 hover:text-gold-400 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden glass border-t border-gold-400/10 px-6 py-6 flex flex-col gap-5">
          <Link
            to="/villas"
            className="text-white/80 hover:text-gold-400 text-base tracking-wide transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Villas
          </Link>
          <Link
            to="/experiences"
            className="text-white/80 hover:text-gold-400 text-base tracking-wide transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Experiences
          </Link>
          <Link
            to="/pricing"
            className="text-white/80 hover:text-gold-400 text-base tracking-wide transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Pricing
          </Link>
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-white/80 hover:text-gold-400 text-base tracking-wide transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <Link
            to="/contact"
            className="text-white/80 hover:text-gold-400 text-base tracking-wide transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </Link>
          <Link
            to="/villas"
            className="gold-gradient-bg text-navy-900 font-semibold text-sm px-6 py-3 rounded-full text-center mt-2"
            onClick={() => setMenuOpen(false)}
          >
            Book Now
          </Link>
        </div>
      )}
    </nav>
  )
}
