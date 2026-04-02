import { useEffect, useState } from 'react'
import { ChevronDown, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import CountUp from './CountUp'

export default function Hero() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className="relative w-full h-screen min-h-[700px] flex items-end overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1920&q=90"
          className="w-full h-full object-cover object-center"
        >
          <source src={import.meta.env.VITE_HERO_VIDEO_URL || '/hero-video-small.mp4'} type="video/mp4" />
          {/* Fallback image if video not found */}
          <img
            src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1920&q=90"
            alt="Palm Island Dubai Villa"
            className="w-full h-full object-cover object-center"
          />
        </video>
        <div className="absolute inset-0 dark-overlay" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/80 via-transparent to-transparent" />
      </div>

      {/* Floating badge */}
      <div
        className={`absolute top-32 right-8 lg:right-16 glass-light rounded-2xl p-4 text-center transition-all duration-1000 delay-700 ${
          loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="flex gap-0.5 justify-center mb-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={12} className="text-gold-400 fill-gold-400" />
          ))}
        </div>
        <p className="text-white text-xs font-semibold">Forbes Rated</p>
        <p className="text-white/50 text-[10px] uppercase tracking-widest">Luxury Villa</p>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pb-20 w-full">
        <div
          className={`transition-all duration-1000 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <p className="text-gold-400 text-sm tracking-[0.3em] uppercase font-medium mb-4">
            Palm Jumeirah, Dubai
          </p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-semibold text-white leading-[1.05] max-w-3xl mb-6">
            Where Luxury<br />
            <span className="gold-text italic">Meets the Sea</span>
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-xl font-light leading-relaxed mb-10">
            An exclusive 6-bedroom private villa on the iconic Palm Jumeirah frond —
            with panoramic views of the Arabian Gulf and Dubai skyline.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <Link
              to="/villas"
              className="gold-gradient-bg text-navy-900 font-semibold px-10 py-4 rounded-full text-base hover:opacity-90 hover:scale-105 transition-all shadow-xl shadow-gold-400/25"
            >
              Reserve Your Stay
            </Link>
            <Link
              to="/villas"
              className="border border-gold-400/40 text-gold-400 font-medium px-10 py-4 rounded-full text-base hover:bg-gold-400/10 transition-all"
            >
              Explore Villas
            </Link>
          </div>
        </div>

        {/* Stats bar */}
        <div
          className={`mt-14 flex gap-8 md:gap-16 transition-all duration-1000 delay-300 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {[
            { count: 6,   suffix: '',    display: null, label: 'Bedrooms'       },
            { count: 850, suffix: 'm²',  display: null, label: 'Living Space'   },
            { count: null,suffix: '',    display: '∞',  label: 'Gulf View'      },
            { count: null,suffix: '',    display: '24/7',label: 'Butler Service' },
          ].map((stat) => (
            <div key={stat.label} className="border-l border-gold-400/30 pl-4 md:pl-6">
              <p className="gold-text font-serif text-2xl md:text-3xl font-semibold">
                {stat.count !== null
                  ? <CountUp end={stat.count} suffix={stat.suffix} duration={2000} />
                  : stat.display}
              </p>
              <p className="text-white/40 text-xs md:text-sm tracking-widest uppercase mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#villa"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 hover:text-gold-400 transition-colors animate-bounce"
      >
        <ChevronDown size={20} />
      </a>
    </section>
  )
}
