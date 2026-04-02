import { Link } from 'react-router-dom'
import { Bed, Bath, Users, Maximize2, ArrowRight, Phone } from 'lucide-react'
import { useState } from 'react'
import villas from '../data/villas'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'

export default function VillasPage() {
  const [sortBy, setSortBy] = useState('default')

  const sorted = [...villas].sort((a, b) => {
    if (sortBy === 'price-asc') return a.pricePerNight - b.pricePerNight
    if (sortBy === 'price-desc') return b.pricePerNight - a.pricePerNight
    if (sortBy === 'size') return parseInt(b.livingSpace) - parseInt(a.livingSpace)
    if (sortBy === 'beds') return b.bedrooms - a.bedrooms
    return 0
  })

  return (
    <div className="bg-navy-900 text-white font-sans min-h-screen">
      <Navbar />

      {/* Page Header */}
      <section className="pt-36 pb-16 px-6 lg:px-10 bg-navy-900 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gold-400/5 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto relative">
          <div className="flex items-center gap-4 mb-5">
            <div className="h-px w-12 bg-gold-400/60" />
            <span className="text-gold-400 text-xs tracking-[0.3em] uppercase font-medium">Our Collection</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="font-serif text-4xl md:text-6xl text-white font-semibold leading-tight mb-4">
                Palm Jumeirah<br />
                <span className="gold-text italic">Luxury Villas</span>
              </h1>
              <p className="text-white/50 max-w-lg text-base font-light leading-relaxed">
                Discover our curated collection of {villas.length} exclusive villas across the world's
                most iconic man-made island. Every property is fully staffed, private, and ready to
                exceed every expectation.
              </p>
            </div>
            {/* Sort */}
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-white/40 text-xs tracking-wider uppercase">Sort by</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-gold-400/60 transition-colors"
              >
                <option value="default" className="bg-navy-800">Featured</option>
                <option value="price-asc" className="bg-navy-800">Price: Low to High</option>
                <option value="price-desc" className="bg-navy-800">Price: High to Low</option>
                <option value="size" className="bg-navy-800">Largest First</option>
                <option value="beds" className="bg-navy-800">Most Bedrooms</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Villa Grid */}
      <section className="pb-24 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {sorted.map((villa) => (
              <VillaCard key={villa.id} villa={villa} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Banner */}
      <section className="py-16 px-6 lg:px-10 bg-navy-800 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-white/50 text-sm mb-3 tracking-wider uppercase">Need help choosing?</p>
          <h2 className="font-serif text-2xl md:text-3xl text-white font-semibold mb-4">
            Speak with our <span className="gold-text italic">Villa Specialists</span>
          </h2>
          <p className="text-white/40 text-sm mb-6 font-light">
            Our team is available 24/7 to help you select the perfect villa and tailor every detail of your stay.
          </p>
          <a
            href="tel:+97142001234"
            className="inline-flex items-center gap-2 gold-gradient-bg text-navy-900 font-semibold px-8 py-3 rounded-full hover:opacity-90 hover:scale-105 transition-all shadow-lg shadow-gold-400/20"
          >
            <Phone size={16} />
            +971 4 200 1234
          </a>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}

function VillaCard({ villa }) {
  return (
    <div className="glass rounded-3xl overflow-hidden gold-border group hover:border-gold-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-gold-400/10 flex flex-col">
      {/* Image */}
      <div className="relative overflow-hidden h-60">
        <img
          src={villa.image}
          alt={villa.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        {/* Price badge */}
        <div className="absolute bottom-4 left-4">
          <div className="glass rounded-xl px-4 py-2 gold-border">
            <span className="gold-text font-serif font-semibold text-xl">
              AED {villa.pricePerNight.toLocaleString()}
            </span>
            <span className="text-white/50 text-xs ml-1">/ night</span>
          </div>
        </div>
        {/* Type badge */}
        <div className="absolute top-4 right-4">
          <span className="bg-black/50 backdrop-blur-sm text-gold-400 text-[10px] tracking-[0.2em] uppercase font-medium px-3 py-1.5 rounded-full border border-gold-400/30">
            {villa.type.split(' ')[0]}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* Name & location */}
        <div className="mb-4">
          <h3 className="font-serif text-xl text-white font-semibold">{villa.name}</h3>
          <p className="text-gold-400/70 text-xs tracking-wider mt-1">{villa.location}</p>
        </div>

        {/* Description */}
        <p className="text-white/50 text-sm font-light leading-relaxed mb-5 flex-1">
          {villa.shortDesc}
        </p>

        {/* Specs row */}
        <div className="grid grid-cols-4 gap-2 mb-5">
          <Spec icon={Bed} value={villa.bedrooms} label="Beds" />
          <Spec icon={Bath} value={villa.bathrooms} label="Baths" />
          <Spec icon={Users} value={villa.maxGuests} label="Guests" />
          <Spec icon={Maximize2} value={villa.livingSpace} label="Space" />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {villa.tags.map((tag) => (
            <span
              key={tag}
              className="text-white/40 text-[10px] tracking-wider uppercase bg-white/5 border border-white/10 rounded-full px-3 py-1"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Plot & living space details */}
        <div className="flex items-center justify-between text-xs text-white/40 border-t border-white/10 pt-4 mb-5">
          <span>Plot: <span className="text-white/60">{villa.plotSize}</span></span>
          <span>Beach: <span className="text-white/60">{villa.beach}</span></span>
          <span>Parking: <span className="text-white/60">{villa.parking} cars</span></span>
        </div>

        {/* Book button */}
        <Link
          to={`/book/${villa.id}`}
          className="w-full gold-gradient-bg text-navy-900 font-semibold py-3.5 rounded-xl text-sm hover:opacity-90 hover:scale-[1.02] transition-all shadow-lg shadow-gold-400/20 flex items-center justify-center gap-2"
        >
          Book This Villa
          <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  )
}

function Spec({ icon: Icon, value, label }) {
  return (
    <div className="bg-white/5 rounded-xl p-2.5 text-center">
      <Icon size={13} className="text-gold-400 mx-auto mb-1" />
      <p className="text-white text-xs font-semibold leading-none">{value}</p>
      <p className="text-white/30 text-[9px] uppercase tracking-wider mt-0.5">{label}</p>
    </div>
  )
}
