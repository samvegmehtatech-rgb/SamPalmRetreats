import { Star, Quote } from 'lucide-react'
import { useState } from 'react'

const reviews = [
  {
    name: 'James & Sophia Whitfield',
    country: 'United Kingdom',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    rating: 5,
    text: 'Sam Palm Retreats redefined luxury for us. From the moment the Rolls-Royce picked us up at the airport to the private farewell dinner on the beach — every detail was flawless. We have stayed at Aman, Six Senses, and Four Seasons — this was beyond all of them.',
    stay: 'Stayed 7 nights · Anniversary',
  },
  {
    name: 'Aditya Sharma',
    country: 'India',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
    rating: 5,
    text: 'The private chef was extraordinary — he customized an entire Michelin-quality Indian tasting menu for us on request. The yacht sunset cruise was the highlight of our trip. Our family of 8 felt completely at home in this palace.',
    stay: 'Stayed 5 nights · Family Retreat',
  },
  {
    name: 'Elena & Marco Russo',
    country: 'Italy',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    rating: 5,
    text: 'We have been to villas across the Amalfi Coast, Ibiza, and Santorini — nothing compares. The rooftop at golden hour with the Dubai skyline in the background, a glass of Champagne, and our own private spa — perfection in every sense.',
    stay: 'Stayed 4 nights · Honeymoon',
  },
  {
    name: 'Khalid Al-Rashidi',
    country: 'Saudi Arabia',
    avatar: 'https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=200&q=80',
    rating: 5,
    text: 'I was hosting my business guests and the villa exceeded all expectations. The butler service was impeccable, the cinema room was a hit, and the concierge arranged Burj Khalifa access and a private DIFC dinner. Truly the finest in Dubai.',
    stay: 'Stayed 3 nights · Corporate Retreat',
  },
]

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const r = reviews[active]

  return (
    <section id="reviews" className="bg-navy-900 py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-5">
          <div className="h-px w-12 bg-gold-400/60" />
          <span className="text-gold-400 text-xs tracking-[0.3em] uppercase font-medium">Guest Reviews</span>
        </div>
        <h2 className="font-serif text-4xl md:text-5xl text-white font-semibold leading-tight mb-16">
          Voices of Our<br />
          <span className="gold-text italic">Distinguished Guests</span>
        </h2>

        <div className="grid lg:grid-cols-3 gap-10 items-center">
          {/* Avatars list */}
          <div className="flex flex-col gap-4">
            {reviews.map((rev, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-300 ${
                  active === i
                    ? 'glass gold-border'
                    : 'hover:bg-white/5 border border-transparent'
                }`}
              >
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className={`w-12 h-12 rounded-full object-cover transition-all duration-300 ${
                    active === i ? 'ring-2 ring-gold-400' : 'opacity-60'
                  }`}
                />
                <div>
                  <p className={`text-sm font-semibold transition-colors ${active === i ? 'text-white' : 'text-white/50'}`}>
                    {rev.name}
                  </p>
                  <p className="text-white/30 text-xs mt-0.5">{rev.country}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Active review */}
          <div className="lg:col-span-2 glass rounded-3xl p-8 md:p-10 gold-border relative">
            <Quote size={48} className="text-gold-400/20 absolute top-6 right-8" />

            <div className="flex gap-1 mb-6">
              {[...Array(r.rating)].map((_, i) => (
                <Star key={i} size={16} className="text-gold-400 fill-gold-400" />
              ))}
            </div>

            <p className="text-white/80 text-lg font-light leading-relaxed italic mb-8">
              "{r.text}"
            </p>

            <div className="flex items-center gap-4 pt-6 border-t border-white/10">
              <img
                src={r.avatar}
                alt={r.name}
                className="w-14 h-14 rounded-full object-cover ring-2 ring-gold-400/60"
              />
              <div>
                <p className="text-white font-semibold">{r.name}</p>
                <p className="text-gold-400 text-xs tracking-wide mt-0.5">{r.stay}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: '4.98', label: 'Average Rating', sub: 'out of 5.0' },
            { value: '320+', label: 'Guest Stays',    sub: 'since 2019'  },
            { value: '98%', label: 'Return Rate',     sub: 'repeat guests'},
            { value: '#1', label: 'Palm Jumeirah',    sub: 'luxury villa ranking'},
          ].map((s) => (
            <div key={s.label} className="text-center glass-light rounded-2xl p-6 gold-border">
              <p className="shimmer-text font-serif text-4xl font-semibold">{s.value}</p>
              <p className="text-white/70 text-sm font-medium mt-1">{s.label}</p>
              <p className="text-white/30 text-xs mt-0.5">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
