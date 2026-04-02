import { MapPin, Plane, Car, Ship } from 'lucide-react'
import FadeIn from './FadeIn'

const distances = [
  { icon: Plane, label: 'Dubai International Airport', time: '25 min',  sub: 'by Rolls-Royce'      },
  { icon: Car,   label: 'Burj Khalifa & Downtown',     time: '20 min',  sub: 'by chauffeur'         },
  { icon: Car,   label: 'Dubai Marina & JBR',           time: '10 min',  sub: 'by car'               },
  { icon: Ship,  label: 'Dubai Harbour',                time: '12 min',  sub: 'private boat available'},
]

export default function Location() {
  return (
    <section className="bg-navy-900 py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <FadeIn>
          <div className="flex items-center gap-4 mb-5">
            <div className="h-px w-12 bg-gold-400/60" />
            <span className="text-gold-400 text-xs tracking-[0.3em] uppercase font-medium">Location</span>
          </div>
        </FadeIn>
        <FadeIn delay={100}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
            <h2 className="font-serif text-4xl md:text-5xl text-white font-semibold leading-tight">
              The World's Most<br />
              <span className="gold-text italic">Iconic Address</span>
            </h2>
            <div className="flex items-start gap-3 text-white/50 max-w-xs">
              <MapPin size={16} className="text-gold-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm font-light leading-relaxed">
                Frond K, Palm Jumeirah, Dubai, United Arab Emirates
              </p>
            </div>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Map placeholder / Aerial image */}
          <FadeIn variant="fade-left" className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl shadow-black/60">
            <img
              src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=900&q=85"
              alt="Dubai aerial view"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-navy-900/20" />
            {/* Pin */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
              <div className="bg-gold-400 text-navy-900 text-xs font-bold px-4 py-2 rounded-full shadow-xl animate-float">
                Villa Al Nakheel
              </div>
              <div className="w-3 h-3 bg-gold-400 rounded-full shadow-lg shadow-gold-400/60" />
            </div>
          </FadeIn>

          {/* Distance cards */}
          <FadeIn variant="fade-right" delay={150}>
            <p className="text-white/60 text-sm font-light leading-relaxed mb-8">
              Situated on the exclusive K frond of Palm Jumeirah, you are at the heart of everything —
              yet perfectly secluded. The world's greatest restaurants, experiences, and landmarks
              are all moments away, while your private beach remains untouched by the world outside.
            </p>

            <div className="grid gap-4">
              {distances.map(({ icon: Icon, label, time, sub }, i) => (
                <div
                  key={label}
                  className="glass-light rounded-xl p-4 gold-border flex items-center gap-4 hover:border-gold-400/40 transition-all"
                >
                  <div className="w-10 h-10 bg-gold-400/15 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-gold-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{label}</p>
                    <p className="text-white/40 text-xs mt-0.5">{sub}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="gold-text font-serif font-semibold text-lg">{time}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
