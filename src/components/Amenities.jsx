import {
  Waves, ChefHat, Dumbbell, Sparkles, Car, Shield,
  Music, Sailboat, Flame, Coffee, Wine, Sunset
} from 'lucide-react'
import FadeIn from './FadeIn'

const amenities = [
  { icon: Waves,    title: 'Infinity Pool',        desc: 'Temperature-controlled saltwater pool with underwater lighting and Gulf views'  },
  { icon: ChefHat,  title: 'Private Chef',          desc: 'Michelin-trained chef available for bespoke dining experiences anytime'         },
  { icon: Dumbbell, title: 'Wellness Studio',       desc: 'Fully equipped gym, yoga deck, and meditation room with sea breeze'             },
  { icon: Sparkles, title: 'In-Villa Spa',          desc: 'Hammam, steam room, and certified therapists for couples and solo treatments'   },
  { icon: Car,      title: 'Luxury Fleet',          desc: 'Complimentary Rolls-Royce and Range Rover with chauffeur on request'            },
  { icon: Shield,   title: '24/7 Security',         desc: 'Discreet round-the-clock security with CCTV and dedicated concierge'           },
  { icon: Music,    title: 'Entertainment Suite',   desc: '4K cinema room, Sonos surround sound throughout all rooms'                     },
  { icon: Sailboat, title: 'Private Yacht',         desc: '50ft yacht with captain available for Gulf cruises and Dubai Marina tours'      },
  { icon: Flame,    title: 'Fire Pit Lounge',       desc: 'Open-air fire pit on private beach for starlit evenings'                       },
  { icon: Coffee,   title: 'Butler Service',        desc: 'Personal butler available 24/7 for every need and request'                     },
  { icon: Wine,     title: 'Curated Wine Cellar',   desc: 'Premium cellar stocked with 200+ labels from world-renowned estates'           },
  { icon: Sunset,   title: 'Rooftop Terrace',       desc: 'Private rooftop with 360° views — perfect for sunrise yoga or sunset cocktails'},
]

export default function Amenities() {
  return (
    <section id="amenities" className="bg-navy-900 py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <FadeIn>
          <div className="flex items-center gap-4 mb-5">
            <div className="h-px w-12 bg-gold-400/60" />
            <span className="text-gold-400 text-xs tracking-[0.3em] uppercase font-medium">Amenities</span>
          </div>
        </FadeIn>
        <FadeIn delay={100}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <h2 className="font-serif text-4xl md:text-5xl text-white font-semibold leading-tight">
              Everything You<br />
              <span className="gold-text italic">Could Desire</span>
            </h2>
            <p className="text-white/50 max-w-xs text-sm font-light leading-relaxed">
              Thoughtfully curated amenities that transform a stay into an unforgettable chapter.
            </p>
          </div>
        </FadeIn>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {amenities.map(({ icon: Icon, title, desc }, i) => (
            <FadeIn key={title} delay={i * 60}>
            <div
              className="glass-light rounded-2xl p-6 gold-border hover:border-gold-400/50 transition-all duration-300 group hover:-translate-y-1 h-full"
            >
              <div className="w-12 h-12 gold-gradient-bg rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-gold-400/20">
                <Icon size={20} className="text-navy-900" />
              </div>
              <h3 className="text-white font-semibold text-sm mb-2 tracking-wide">{title}</h3>
              <p className="text-white/40 text-xs leading-relaxed font-light">{desc}</p>
            </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
