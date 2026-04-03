import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Anchor, ChefHat, Plane, Sparkles, Mountain, Telescope,
  Car, Music, Camera, Gift, ArrowRight, CheckCircle, Phone, Star
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'
import BackToTop from '../components/BackToTop'

const categories = ['All', 'On Water', 'Dining', 'Wellness', 'Adventure', 'Transfers', 'Special Occasions']

const experiences = [
  {
    id: 'yacht-half',
    category: 'On Water',
    icon: Anchor,
    image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80',
    title: 'Yacht Half-Day Charter',
    subtitle: '4 Hours · Up to 12 Guests',
    price: 4500,
    priceUnit: 'per charter',
    popular: false,
    description: 'Cruise the Arabian Gulf, circle the Palm, and take in the Dubai skyline from the water. Includes crew, soft drinks, and snorkelling equipment.',
    includes: ['Experienced Captain & Crew', 'Soft Beverages & Canapés', 'Snorkelling Equipment', 'Gulf & Palm Skyline Route'],
  },
  {
    id: 'yacht-full',
    category: 'On Water',
    icon: Anchor,
    image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80',
    title: 'Yacht Full-Day Charter',
    subtitle: '8 Hours · Up to 12 Guests',
    price: 8500,
    priceUnit: 'per charter',
    popular: true,
    description: 'A full day on the water — swim in the Gulf, anchor off Burj Al Arab, enjoy a gourmet lunch on deck, and return at sunset with memories to last a lifetime.',
    includes: ['Captain, First Mate & Hostess', 'Gourmet Lunch on Deck', 'Premium Bar Package', 'Snorkelling & Water Toys', 'Sunset Return Route'],
  },
  {
    id: 'private-chef',
    category: 'Dining',
    icon: ChefHat,
    image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&q=80',
    title: 'Private Chef Dinner',
    subtitle: 'Per Evening · Any Cuisine',
    price: 2800,
    priceUnit: 'per evening',
    popular: true,
    description: 'A Michelin-trained private chef arrives at the villa to prepare a bespoke multi-course dinner tailored entirely to your tastes. Wine pairing available.',
    includes: ['Pre-dinner Menu Consultation', '5-Course Tasting Menu', 'Mise en Place & Service', 'Kitchen Cleanup', 'Optional Wine Pairing (+AED 800)'],
  },
  {
    id: 'chef-breakfast',
    category: 'Dining',
    icon: ChefHat,
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f10a081a?w=800&q=80',
    title: 'Gourmet Breakfast Experience',
    subtitle: 'Daily · Included in Standard',
    price: 0,
    priceUnit: 'included',
    popular: false,
    description: 'Begin each morning with a freshly prepared full breakfast by your in-villa chef — from Eggs Benedict and Acai bowls to Emirati-inspired mezze plates. Included with every stay.',
    includes: ['Full English or Continental', 'Freshly Squeezed Juices', 'Barista Coffee & Teas', 'Arabic Pastries & Breads', 'Seasonal Fruit Platter'],
  },
  {
    id: 'couples-spa',
    category: 'Wellness',
    icon: Sparkles,
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
    title: 'Couples Spa Package',
    subtitle: '2 Hours Each · In-Villa',
    price: 1800,
    priceUnit: 'per couple',
    popular: true,
    description: 'Two qualified therapists arrive at your villa to deliver a bespoke two-hour treatment for both guests — choose from deep tissue, hot stone, or our signature Arabian Rose ritual.',
    includes: ['Two Licensed Therapists', 'Signature Treatment of Choice', 'Aromatherapy Products', 'Champagne Post-Treatment', 'Robe & Towel Setup'],
  },
  {
    id: 'wellness-retreat',
    category: 'Wellness',
    icon: Sparkles,
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80',
    title: 'Sunrise Yoga & Meditation',
    subtitle: 'Daily · Beach or Terrace',
    price: 600,
    priceUnit: 'per session',
    popular: false,
    description: 'A certified yoga instructor leads a private sunrise session on your villa terrace or private beach — followed by a guided breathwork and meditation practice.',
    includes: ['Certified Yoga Instructor', 'Breathwork & Meditation', 'Premium Mats & Props', 'Herbal Tea Ceremony', 'Sunrise or Sunset Timing'],
  },
  {
    id: 'helicopter',
    category: 'Adventure',
    icon: Telescope,
    image: 'https://images.unsplash.com/photo-1588183727766-be8af5e1b7c4?w=800&q=80',
    title: 'Helicopter City Tour',
    subtitle: '25 Minutes · Up to 4 Guests',
    price: 3200,
    priceUnit: 'per flight',
    popular: false,
    description: 'Soar over the Palm Jumeirah, Burj Khalifa, Burj Al Arab, and the Dubai Marina in a private helicopter with a licensed pilot. The most breathtaking perspective of Dubai.',
    includes: ['Licensed Helicopter Pilot', 'Palm & Skyline Flight Path', 'In-Flight Photography Tips', 'Transfer to/from Helipad', 'Champagne on Landing'],
  },
  {
    id: 'desert-safari',
    category: 'Adventure',
    icon: Mountain,
    image: 'https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?w=800&q=80',
    title: 'Private Desert Safari',
    subtitle: 'Full Evening · Up to 8 Guests',
    price: 5500,
    priceUnit: 'per group',
    popular: false,
    description: 'A convoy of private Land Cruisers takes your group into the Dubai desert for dune bashing, camel riding, falconry, and a candlelit gourmet dinner under the stars.',
    includes: ['Private Land Cruiser Convoy', 'Expert Dune Driver', 'Camel Rides & Falconry', 'Gourmet Bedouin Dinner', 'Live Music & Entertainment'],
  },
  {
    id: 'rolls-royce',
    category: 'Transfers',
    icon: Car,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80',
    title: 'Rolls-Royce Airport Transfer',
    subtitle: 'One Way · DXB or DWC',
    price: 1200,
    priceUnit: 'per transfer',
    popular: false,
    description: 'Arrive and depart in the ultimate style. A chauffeured Rolls-Royce Ghost or Phantom awaits at the terminal, with cold towels, chilled water, and a welcome hamper.',
    includes: ['Rolls-Royce Ghost or Phantom', 'Professional Uniformed Chauffeur', 'Cold Towels & Refreshments', 'Meet & Greet at Arrivals', 'Included in Standard Package'],
  },
  {
    id: 'private-transfer-fleet',
    category: 'Transfers',
    icon: Car,
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0729?w=800&q=80',
    title: 'Chauffeur Fleet (Full Stay)',
    subtitle: 'Daily · Unlimited Trips',
    price: 3500,
    priceUnit: 'per day',
    popular: false,
    description: 'A dedicated Mercedes S-Class or Range Rover with a professional chauffeur is at your disposal all day — from shopping in DIFC to dinner at a rooftop restaurant.',
    includes: ['Dedicated Chauffeur (12 hrs)', 'Mercedes S-Class or Range Rover', 'Unlimited Trips in Dubai', 'Evening & Restaurant Standby', 'Child Seats on Request'],
  },
  {
    id: 'anniversary',
    category: 'Special Occasions',
    icon: Gift,
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80',
    title: 'Anniversary Setup',
    subtitle: 'One-time · In-Villa',
    price: 2200,
    priceUnit: 'per setup',
    popular: false,
    description: 'Transform your villa into a romantic scene: rose petals, candles, a bespoke cake, a personalised letter, and a private beachside dinner for two prepared by your chef.',
    includes: ['Rose Petal & Candle Setup', 'Bespoke Celebration Cake', 'Personalised Letter & Gifts', 'Private Beach Dinner for 2', 'Photographer (1 hr, optional)'],
  },
  {
    id: 'photography',
    category: 'Special Occasions',
    icon: Camera,
    image: 'https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?w=800&q=80',
    title: 'Private Photography Session',
    subtitle: '2 Hours · In-Villa & Beach',
    price: 1500,
    priceUnit: 'per session',
    popular: false,
    description: 'A professional lifestyle and portrait photographer captures your stay — from candid villa moments to golden-hour portraits on your private beach. Edited gallery delivered within 48 hrs.',
    includes: ['Professional Photographer', 'Villa & Beach Locations', '2-Hour Shooting Session', '50+ Edited High-Res Images', 'Private Online Gallery'],
  },
]

export default function ExperiencesPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? experiences
    : experiences.filter((e) => e.category === activeCategory)

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
            <span className="text-gold-400 text-xs tracking-[0.3em] uppercase font-medium">Curated Experiences</span>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl text-white font-semibold leading-tight mb-4">
            Add-ons &<br />
            <span className="gold-text italic">Experiences</span>
          </h1>
          <p className="text-white/50 max-w-lg text-base font-light leading-relaxed">
            Every stay is extraordinary — but these curated add-ons elevate it further.
            Select any experience during booking or contact our concierge to arrange it mid-stay.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 pb-24">

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? 'gold-gradient-bg text-navy-900'
                  : 'glass-light border border-white/10 text-white/60 hover:border-gold-400/30 hover:text-white/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Experience Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-7">
          {filtered.map((exp) => (
            <ExperienceCard key={exp.id} exp={exp} />
          ))}
        </div>

        {/* How to Book */}
        <div className="mt-20 glass rounded-3xl gold-border p-10 md:p-14">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="h-px w-10 bg-gold-400/60" />
                <span className="text-gold-400 text-xs tracking-[0.3em] uppercase font-medium">How to Add</span>
              </div>
              <h2 className="font-serif text-3xl text-white font-semibold mb-4">
                Booking Your Experiences
              </h2>
              <div className="space-y-4">
                {[
                  { step: '01', text: 'Select your villa and dates on the booking page.' },
                  { step: '02', text: 'Choose your package (Standard, Premium, or Ultimate).' },
                  { step: '03', text: 'Note any specific experiences in the Special Requests field.' },
                  { step: '04', text: 'Our concierge will confirm and arrange everything within 2 hours.' },
                ].map(({ step, text }) => (
                  <div key={step} className="flex items-start gap-4">
                    <span className="gold-text font-serif font-semibold text-lg shrink-0">{step}</span>
                    <p className="text-white/60 text-sm font-light leading-relaxed pt-0.5">{text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="glass-light rounded-2xl p-5 border border-white/8">
                <Star size={16} className="text-gold-400 mb-3" />
                <p className="text-white font-semibold text-sm mb-1">Bespoke Arrangements</p>
                <p className="text-white/50 text-sm font-light">
                  Don't see what you're looking for? Our concierge can arrange virtually any experience in Dubai — from private Burj Khalifa access to F1 paddock tours.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/villas"
                  className="flex-1 gold-gradient-bg text-navy-900 font-semibold py-3 rounded-xl text-sm text-center flex items-center justify-center gap-2 hover:opacity-90 transition-all"
                >
                  Book a Villa <ArrowRight size={14} />
                </Link>
                <a
                  href="tel:+97142001234"
                  className="flex-1 glass border border-white/10 text-white/70 py-3 rounded-xl text-sm text-center flex items-center justify-center gap-2 hover:border-gold-400/40 hover:text-gold-400 transition-all"
                >
                  <Phone size={14} /> Call Concierge
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>

      <Footer />
      <WhatsAppButton />
      <BackToTop />
    </div>
  )
}

function ExperienceCard({ exp }) {
  const Icon = exp.icon
  return (
    <div className={`glass rounded-3xl overflow-hidden flex flex-col ${exp.popular ? 'gold-border shadow-xl shadow-gold-400/10' : 'border border-white/10 hover:border-gold-400/20'} transition-all hover:shadow-xl hover:shadow-gold-400/5`}>
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={exp.image}
          alt={exp.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        {exp.popular && (
          <div className="absolute top-3 right-3 gold-gradient-bg text-navy-900 text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full">
            Popular
          </div>
        )}
        <div className="absolute top-3 left-3 glass rounded-lg px-3 py-1.5 flex items-center gap-1.5">
          <Icon size={11} className="text-gold-400" />
          <span className="text-white/70 text-[10px] tracking-wider uppercase">{exp.category}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-serif text-white font-semibold text-lg mb-0.5">{exp.title}</h3>
        <p className="text-gold-400/70 text-xs tracking-wide mb-3">{exp.subtitle}</p>
        <p className="text-white/50 text-sm font-light leading-relaxed mb-5 flex-1">{exp.description}</p>

        <ul className="space-y-2 mb-5">
          {exp.includes.slice(0, 3).map((item) => (
            <li key={item} className="flex items-start gap-2">
              <CheckCircle size={11} className="text-gold-400 mt-0.5 shrink-0" />
              <span className="text-white/40 text-xs">{item}</span>
            </li>
          ))}
          {exp.includes.length > 3 && (
            <li className="text-white/25 text-xs pl-4">+{exp.includes.length - 3} more inclusions</li>
          )}
        </ul>

        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div>
            {exp.price === 0 ? (
              <span className="text-teal-400 font-semibold text-sm">Complimentary</span>
            ) : (
              <>
                <span className="gold-text font-serif font-semibold text-xl">
                  AED {exp.price.toLocaleString()}
                </span>
                <span className="text-white/30 text-xs ml-1">{exp.priceUnit}</span>
              </>
            )}
          </div>
          <a
            href="tel:+97142001234"
            className="text-gold-400 hover:text-gold-300 text-xs flex items-center gap-1 transition-colors"
          >
            Enquire <ArrowRight size={11} />
          </a>
        </div>
      </div>
    </div>
  )
}
