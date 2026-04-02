import { Bed, Bath, Users, Waves, Car, Wifi } from 'lucide-react'
import FadeIn from './FadeIn'
import CountUp from './CountUp'

const highlights = [
  { icon: Bed,   count: 6,    suffix: '',      label: 'Master Bedrooms'  },
  { icon: Bath,  count: 7,    suffix: '',      label: 'Luxury Bathrooms' },
  { icon: Users, count: 12,   suffix: '',      label: 'Max Guests'       },
  { icon: Waves, count: null, display: 'Pool', label: 'Infinity Pool'    },
  { icon: Car,   count: 4,    suffix: '',      label: 'Parking Spaces'   },
  { icon: Wifi,  count: 1,    suffix: ' Gbps', label: 'Fiber Internet'   },
]

export default function VillaOverview() {
  return (
    <section id="villa" className="bg-navy-900 py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section label */}
        <FadeIn>
          <div className="flex items-center gap-4 mb-5">
            <div className="h-px w-12 bg-gold-400/60" />
            <span className="text-gold-400 text-xs tracking-[0.3em] uppercase font-medium">The Villa</span>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <FadeIn variant="fade-left">
            <h2 className="font-serif text-4xl md:text-5xl text-white font-semibold leading-tight mb-6">
              Villa <span className="gold-text italic">Al Nakheel</span><br />
              Palm Jumeirah
            </h2>
            <p className="text-white/60 text-lg font-light leading-relaxed mb-6">
              Nestled on the exclusive fronds of Palm Jumeirah, Villa Al Nakheel is a statement of
              modern Arabian opulence. Spanning 850 m² of meticulously designed living space, the
              villa blends contemporary architecture with the warmth of Arabian heritage.
            </p>
            <p className="text-white/50 text-base font-light leading-relaxed mb-10">
              Every room is oriented to capture the breathtaking panorama of the Arabian Gulf —
              from the rooftop terrace, the infinity pool, or the private beach just steps away.
              This is not simply an accommodation; it is an experience that redefines luxury.
            </p>

            {/* Quick specs */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Villa Type', value: 'Beachfront Frond Villa' },
                { label: 'Plot Size', value: '1,200 m²' },
                { label: 'Living Space', value: '850 m²' },
                { label: 'Private Beach', value: '25m Frontage' },
              ].map((s) => (
                <div key={s.label} className="glass-light rounded-xl p-4 gold-border">
                  <p className="text-white/40 text-xs tracking-wider uppercase mb-1">{s.label}</p>
                  <p className="text-white font-semibold text-sm">{s.value}</p>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Right: image */}
          <FadeIn variant="fade-right" delay={150} className="relative">
            <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl shadow-black/60">
              <img
                src="https://images.unsplash.com/photo-1613977257363-707ba9348227?w=900&q=85"
                alt="Villa interior"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Floating accent card */}
            <div className="absolute -bottom-6 -left-6 glass rounded-2xl p-5 shadow-xl gold-border">
              <p className="text-gold-400 font-serif text-3xl font-semibold">AED 18,500</p>
              <p className="text-white/50 text-xs tracking-wide uppercase">Per Night</p>
            </div>
          </FadeIn>
        </div>

        {/* Highlights grid */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {highlights.map(({ icon: Icon, count, suffix, display, label }, i) => (
            <FadeIn key={label} delay={i * 80}>
            <div
              className="glass-light rounded-2xl p-5 text-center gold-border hover:border-gold-400/60 transition-all duration-300 group"
            >
              <div className="w-10 h-10 gold-gradient-bg rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform shadow-lg shadow-gold-400/20">
                <Icon size={18} className="text-navy-900" />
              </div>
              <p className="gold-text font-serif text-xl font-semibold">
                {count !== null
                  ? <CountUp end={count} suffix={suffix} duration={1600} />
                  : display}
              </p>
              <p className="text-white/40 text-xs tracking-wider uppercase mt-1">{label}</p>
            </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
