import { Link } from 'react-router-dom'
import { CheckCircle, ArrowRight, Calendar, Users, Phone } from 'lucide-react'
import villas from '../data/villas'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'
import BackToTop from '../components/BackToTop'

const seasons = [
  {
    name: 'Peak Season',
    months: 'October – April',
    label: 'High Demand',
    color: 'gold',
    discount: null,
    note: 'Dubai\'s perfect weather season. Minimum 3 nights.',
  },
  {
    name: 'Off-Peak Season',
    months: 'May – September',
    label: 'Best Value',
    color: 'teal',
    discount: 20,
    note: 'Summer in Dubai. Warm weather, quieter, great savings. Minimum 2 nights.',
  },
]

const packages = [
  {
    id: 'standard',
    label: 'Standard Stay',
    price: 0,
    priceLabel: 'Included',
    color: 'white',
    inclusions: [
      'Airport Rolls-Royce Transfer',
      'Welcome Champagne & Gifts',
      'Daily Housekeeping',
      '24/7 Butler & Concierge',
      'Private Beach Access',
      'Chef\'s Breakfast Daily',
    ],
  },
  {
    id: 'premium',
    label: 'Premium Escape',
    price: 5500,
    priceLabel: '+AED 5,500 / night',
    color: 'gold',
    popular: true,
    inclusions: [
      'Everything in Standard',
      'Sunset Yacht Day Charter',
      'Couples Spa (2 hr each)',
      'Chef\'s Dinner (3 nights)',
      'Desert Safari with Private Camp',
      'Complimentary Late Check-out',
    ],
  },
  {
    id: 'ultimate',
    label: 'Ultimate Luxury',
    price: 20000,
    priceLabel: '+AED 20,000 / night',
    color: 'shimmer',
    inclusions: [
      'Everything in Premium',
      'Rolls-Royce Fleet All Stay',
      'Full Board & Beverages',
      'Helicopter City Tour',
      'Personal Lifestyle Manager',
      'Unlimited Spa Access',
    ],
  },
]

const included = [
  { title: 'Airport Transfer', desc: 'Rolls-Royce pickup and drop-off, all stays.' },
  { title: 'Welcome Experience', desc: 'Champagne, fresh flowers, and personalised gifts on arrival.' },
  { title: 'Daily Housekeeping', desc: 'Full villa service, twice daily. Turndown included.' },
  { title: '24/7 Butler Service', desc: 'Your dedicated butler available around the clock.' },
  { title: 'Private Beach', desc: 'Exclusive beach setup with loungers, parasols, and towels.' },
  { title: 'Chef\'s Breakfast', desc: 'Full breakfast prepared by your in-villa chef each morning.' },
]

const policies = [
  { q: 'Minimum Stay', a: 'Peak season: 3 nights minimum. Off-peak: 2 nights minimum. Some villas may require 5+ nights during holidays and peak periods.' },
  { q: 'Cancellation Policy', a: 'Free cancellation up to 14 days before arrival. Cancellations within 14 days forfeit 50% of the total stay. No-shows forfeit 100%.' },
  { q: 'Payment Terms', a: 'A 30% holding deposit is required to confirm your reservation. The balance is due 14 days prior to arrival.' },
  { q: 'Security Deposit', a: 'A refundable security deposit of AED 10,000–25,000 (depending on villa) is collected at check-in and returned within 7 days of departure.' },
  { q: 'Check-in / Check-out', a: 'Standard check-in: 3:00 PM · Check-out: 12:00 PM. Early check-in and late check-out are available subject to availability.' },
  { q: 'Pets', a: 'Pets are not permitted in any of our villa properties.' },
]

export default function PricingPage() {
  return (
    <div className="bg-navy-900 text-white font-sans min-h-screen">
      <Navbar />

      {/* Header */}
      <section className="pt-36 pb-16 px-6 lg:px-10 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gold-400/5 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto relative">
          <div className="flex items-center gap-4 mb-5">
            <div className="h-px w-12 bg-gold-400/60" />
            <span className="text-gold-400 text-xs tracking-[0.3em] uppercase font-medium">Rates & Policies</span>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl text-white font-semibold leading-tight mb-4">
            Pricing &<br />
            <span className="gold-text italic">Seasons</span>
          </h1>
          <p className="text-white/50 max-w-lg text-base font-light leading-relaxed">
            Transparent pricing, no hidden fees. Every stay includes our signature arrivals experience,
            daily butler service, and private beach access as standard.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 space-y-20 pb-24">

        {/* Seasons */}
        <section>
          <div className="flex items-center gap-4 mb-5">
            <div className="h-px w-10 bg-gold-400/60" />
            <span className="text-gold-400 text-xs tracking-[0.3em] uppercase font-medium">Seasonal Rates</span>
          </div>
          <h2 className="font-serif text-3xl text-white font-semibold mb-8">Peak vs Off-Peak</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {seasons.map((s) => (
              <div key={s.name} className={`glass rounded-3xl p-8 ${s.color === 'gold' ? 'gold-border' : 'border border-teal-400/30'}`}>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <span className={`text-xs tracking-[0.2em] uppercase font-medium ${s.color === 'gold' ? 'text-gold-400' : 'text-teal-400'}`}>
                      {s.label}
                    </span>
                    <h3 className="font-serif text-2xl text-white font-semibold mt-1">{s.name}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <Calendar size={13} className={s.color === 'gold' ? 'text-gold-400' : 'text-teal-400'} />
                      <span className="text-white/60 text-sm">{s.months}</span>
                    </div>
                  </div>
                  {s.discount && (
                    <div className="bg-teal-400/10 border border-teal-400/30 rounded-xl px-4 py-2 text-center shrink-0">
                      <p className="text-teal-400 font-bold text-xl">{s.discount}%</p>
                      <p className="text-teal-400/70 text-xs">Savings</p>
                    </div>
                  )}
                </div>
                <p className="text-white/40 text-sm font-light">{s.note}</p>
              </div>
            ))}
          </div>

          {/* Villa pricing table */}
          <div className="glass rounded-3xl gold-border overflow-hidden">
            <div className="p-6 border-b border-white/5">
              <h3 className="font-serif text-xl text-white font-semibold">Nightly Rates by Villa</h3>
              <p className="text-white/40 text-sm mt-1">Off-peak rates reflect 20% seasonal discount</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="text-left px-6 py-4 text-white/40 text-xs tracking-wider uppercase font-medium">Villa</th>
                    <th className="text-left px-6 py-4 text-white/40 text-xs tracking-wider uppercase font-medium">Beds</th>
                    <th className="text-right px-6 py-4 text-gold-400 text-xs tracking-wider uppercase font-medium">Peak (AED/night)</th>
                    <th className="text-right px-6 py-4 text-teal-400 text-xs tracking-wider uppercase font-medium">Off-Peak (AED/night)</th>
                    <th className="text-right px-6 py-4 text-white/40 text-xs tracking-wider uppercase font-medium hidden md:table-cell">Min Stay</th>
                    <th className="px-6 py-4" />
                  </tr>
                </thead>
                <tbody>
                  {villas.map((villa, i) => (
                    <tr
                      key={villa.id}
                      className={`border-b border-white/5 hover:bg-white/3 transition-colors ${i % 2 === 0 ? 'bg-white/[0.01]' : ''}`}
                    >
                      <td className="px-6 py-4">
                        <p className="font-serif text-white font-medium text-sm">{villa.name}</p>
                        <p className="text-white/30 text-xs mt-0.5">{villa.location}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-white/60 text-sm">
                          <Users size={12} className="text-gold-400" />
                          {villa.bedrooms} BR
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="gold-text font-serif font-semibold">
                          {villa.pricePerNight.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="text-teal-400 font-semibold text-sm">
                          {Math.round(villa.pricePerNight * 0.8).toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right text-white/40 text-sm hidden md:table-cell">
                        3 nights
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          to={`/villas/${villa.id}`}
                          className="text-gold-400 hover:text-gold-300 text-xs transition-colors flex items-center gap-1 justify-end"
                        >
                          View <ArrowRight size={12} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Packages */}
        <section>
          <div className="flex items-center gap-4 mb-5">
            <div className="h-px w-10 bg-gold-400/60" />
            <span className="text-gold-400 text-xs tracking-[0.3em] uppercase font-medium">Stay Packages</span>
          </div>
          <h2 className="font-serif text-3xl text-white font-semibold mb-8">Choose Your Experience</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`glass rounded-3xl p-7 flex flex-col relative ${pkg.popular ? 'gold-border shadow-xl shadow-gold-400/10' : 'border border-white/10'}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 gold-gradient-bg text-navy-900 text-[10px] font-bold tracking-widest uppercase px-4 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <p className={`text-xs tracking-[0.2em] uppercase font-medium mb-2 ${pkg.color === 'gold' || pkg.color === 'shimmer' ? 'text-gold-400' : 'text-white/50'}`}>
                    {pkg.label}
                  </p>
                  {pkg.price === 0 ? (
                    <p className="font-serif text-3xl text-white font-semibold">Included</p>
                  ) : (
                    <>
                      <p className={`font-serif text-2xl font-semibold ${pkg.color === 'shimmer' ? 'shimmer-text' : 'gold-text'}`}>
                        +AED {pkg.price.toLocaleString()}
                      </p>
                      <p className="text-white/30 text-xs mt-1">per night, added to villa rate</p>
                    </>
                  )}
                </div>
                <ul className="space-y-3 flex-1 mb-6">
                  {pkg.inclusions.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <CheckCircle size={13} className="text-gold-400 mt-0.5 shrink-0" />
                      <span className="text-white/60 text-sm font-light">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/villas"
                  className={`w-full py-3 rounded-xl text-sm font-semibold text-center transition-all ${
                    pkg.popular
                      ? 'gold-gradient-bg text-navy-900 hover:opacity-90 hover:scale-[1.02]'
                      : 'border border-white/10 text-white/70 hover:border-gold-400/40 hover:text-gold-400'
                  }`}
                >
                  Select Package
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* What's Always Included */}
        <section>
          <div className="flex items-center gap-4 mb-5">
            <div className="h-px w-10 bg-gold-400/60" />
            <span className="text-gold-400 text-xs tracking-[0.3em] uppercase font-medium">Every Stay</span>
          </div>
          <h2 className="font-serif text-3xl text-white font-semibold mb-8">Always Included</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {included.map(({ title, desc }) => (
              <div key={title} className="glass-light rounded-2xl p-5 border border-white/8 hover:border-gold-400/30 transition-colors">
                <CheckCircle size={18} className="text-gold-400 mb-3" />
                <h4 className="text-white font-semibold text-sm mb-1.5">{title}</h4>
                <p className="text-white/40 text-sm font-light leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Policies */}
        <section>
          <div className="flex items-center gap-4 mb-5">
            <div className="h-px w-10 bg-gold-400/60" />
            <span className="text-gold-400 text-xs tracking-[0.3em] uppercase font-medium">Policies</span>
          </div>
          <h2 className="font-serif text-3xl text-white font-semibold mb-8">Booking Policies</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {policies.map(({ q, a }) => (
              <div key={q} className="glass-light rounded-2xl p-6 border border-white/8">
                <h4 className="text-white font-semibold text-sm mb-2">{q}</h4>
                <p className="text-white/50 text-sm font-light leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="glass rounded-3xl gold-border p-10 md:p-14 text-center">
          <p className="text-gold-400 text-xs tracking-[0.3em] uppercase font-medium mb-3">Ready to Reserve?</p>
          <h2 className="font-serif text-3xl md:text-4xl text-white font-semibold mb-4">
            Your Palm Jumeirah Experience Awaits
          </h2>
          <p className="text-white/50 text-sm max-w-md mx-auto mb-8 font-light leading-relaxed">
            Browse our full collection and reserve your dates. No payment required to hold —
            our team will confirm within 2 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/villas"
              className="gold-gradient-bg text-navy-900 font-semibold px-10 py-3.5 rounded-full hover:opacity-90 hover:scale-105 transition-all shadow-xl shadow-gold-400/25 flex items-center justify-center gap-2"
            >
              Browse All Villas <ArrowRight size={15} />
            </Link>
            <a
              href="tel:+97142001234"
              className="flex items-center justify-center gap-2 glass border border-white/10 text-white/70 px-8 py-3.5 rounded-full hover:border-gold-400/40 hover:text-gold-400 transition-all"
            >
              <Phone size={14} /> Speak to a Specialist
            </a>
          </div>
        </section>

      </div>

      <Footer />
      <WhatsAppButton />
      <BackToTop />
    </div>
  )
}
