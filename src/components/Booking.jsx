import { useState } from 'react'
import { Calendar, Users, Mail, Phone, ChevronRight, CheckCircle } from 'lucide-react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'
import { sendConfirmationEmail } from '../lib/sendConfirmationEmail'
import { track } from '../firebase'
import FadeIn from './FadeIn'

const packages = [
  { id: 'standard', label: 'Standard Stay', price: 'AED 18,500', desc: 'Villa + Butler + Chef Breakfast' },
  { id: 'premium', label: 'Premium Escape', price: 'AED 24,000', desc: 'Standard + Yacht Day + Spa for 2' },
  { id: 'ultimate', label: 'Ultimate Luxury', price: 'AED 38,500', desc: 'Premium + Rolls-Royce + All Inclusive' },
]

export default function Booking() {
  const [form, setForm] = useState({
    checkin: '', checkout: '', guests: '2', pkg: 'premium',
    name: '', email: '', phone: '', requests: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await addDoc(collection(db, 'bookings'), {
        ...form,
        submittedAt: serverTimestamp(),
      })
      const selectedPkg = packages.find((p) => p.id === form.pkg)
      await sendConfirmationEmail({ ...form, pkg: selectedPkg?.label || form.pkg })
      track('booking_submitted', { package: selectedPkg?.label })
      setSubmitted(true)
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="booking" className="bg-navy-800 py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <FadeIn>
          <div className="flex items-center gap-4 mb-5">
            <div className="h-px w-12 bg-gold-400/60" />
            <span className="text-gold-400 text-xs tracking-[0.3em] uppercase font-medium">Reservations</span>
          </div>
        </FadeIn>
        <FadeIn delay={100}>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <h2 className="font-serif text-4xl md:text-5xl text-white font-semibold leading-tight">
            Begin Your<br />
            <span className="gold-text italic">Palm Retreat</span>
          </h2>
          <p className="text-white/50 max-w-xs text-sm font-light leading-relaxed">
            Our reservations team will confirm within 2 hours. Minimum 2-night stay.
          </p>
        </div>
        </FadeIn>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Package selection */}
          <div>
            <h3 className="text-white/60 text-xs tracking-[0.25em] uppercase font-medium mb-5">Select Package</h3>
            <div className="flex flex-col gap-4">
              {packages.map((pkg) => (
                <label
                  key={pkg.id}
                  className={`relative cursor-pointer rounded-2xl p-5 border transition-all duration-300 ${form.pkg === pkg.id
                      ? 'glass border-gold-400/60 shadow-lg shadow-gold-400/10'
                      : 'glass-light border-white/10 hover:border-white/20'
                    }`}
                >
                  <input
                    type="radio"
                    name="pkg"
                    value={pkg.id}
                    checked={form.pkg === pkg.id}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-white font-semibold text-sm">{pkg.label}</p>
                      <p className="text-white/40 text-xs mt-1 leading-relaxed">{pkg.desc}</p>
                    </div>
                    <div className="text-right">
                      <p className="gold-text font-serif font-semibold text-lg">{pkg.price}</p>
                      <p className="text-white/30 text-[10px] uppercase tracking-wider">/ night</p>
                    </div>
                  </div>
                  {form.pkg === pkg.id && (
                    <div className="absolute top-3 right-3 w-2 h-2 bg-gold-400 rounded-full" />
                  )}
                </label>
              ))}
            </div>

            {/* Included perks */}
            <div className="mt-8 glass rounded-2xl p-5 gold-border">
              <p className="text-white/60 text-xs tracking-wider uppercase mb-4">All Packages Include</p>
              {['Airport Rolls-Royce Transfer', 'Welcome Champagne & Gifts', 'Daily Housekeeping', '24/7 Butler & Concierge', 'Private Beach Access'].map((item) => (
                <div key={item} className="flex items-center gap-3 mb-3">
                  <CheckCircle size={14} className="text-gold-400 flex-shrink-0" />
                  <span className="text-white/60 text-xs">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="glass rounded-3xl p-10 gold-border text-center flex flex-col items-center gap-6 h-full justify-center">
                <div className="w-20 h-20 gold-gradient-bg rounded-full flex items-center justify-center shadow-xl shadow-gold-400/30">
                  <CheckCircle size={36} className="text-navy-900" />
                </div>
                <div>
                  <h3 className="font-serif text-3xl text-white font-semibold mb-3">Reservation Received</h3>
                  <p className="text-white/50 text-sm leading-relaxed max-w-md mx-auto">
                    Thank you, {form.name || 'valued guest'}. Our reservations team will contact you at{' '}
                    <span className="text-gold-400">{form.email || 'your email'}</span> within 2 hours to confirm your stay and arrange personal preferences.
                  </p>
                </div>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-gold-400 text-sm border border-gold-400/40 px-6 py-2.5 rounded-full hover:bg-gold-400/10 transition-all"
                >
                  Make Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass rounded-3xl p-8 md:p-10 gold-border">
                {/* Dates + guests */}
                <div className="grid sm:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="text-white/40 text-xs tracking-wider uppercase block mb-2">Check-in</label>
                    <div className="relative">
                      <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold-400" />
                      <input
                        type="date"
                        name="checkin"
                        required
                        value={form.checkin}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-3 text-white text-sm focus:outline-none focus:border-gold-400/60 transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-white/40 text-xs tracking-wider uppercase block mb-2">Check-out</label>
                    <div className="relative">
                      <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold-400" />
                      <input
                        type="date"
                        name="checkout"
                        required
                        value={form.checkout}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-3 text-white text-sm focus:outline-none focus:border-gold-400/60 transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-white/40 text-xs tracking-wider uppercase block mb-2">Guests</label>
                    <div className="relative">
                      <Users size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold-400" />
                      <select
                        name="guests"
                        value={form.guests}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-3 text-white text-sm focus:outline-none focus:border-gold-400/60 transition-colors appearance-none"
                      >
                        {[...Array(12)].map((_, i) => (
                          <option key={i + 1} value={i + 1} className="bg-navy-800">
                            {i + 1} Guest{i > 0 ? 's' : ''}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Personal info */}
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-white/40 text-xs tracking-wider uppercase block mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Your name"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-gold-400/60 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-white/40 text-xs tracking-wider uppercase block mb-2">Email</label>
                    <div className="relative">
                      <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold-400" />
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="you@email.com"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-gold-400/60 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="text-white/40 text-xs tracking-wider uppercase block mb-2">Phone / WhatsApp</label>
                  <div className="relative">
                    <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold-400" />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+971 XX XXX XXXX"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-gold-400/60 transition-colors"
                    />
                  </div>
                </div>

                <div className="mb-8">
                  <label className="text-white/40 text-xs tracking-wider uppercase block mb-2">Special Requests</label>
                  <textarea
                    name="requests"
                    rows={3}
                    placeholder="Dietary preferences, occasion, special arrangements..."
                    value={form.requests}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-gold-400/60 transition-colors resize-none"
                  />
                </div>

                {error && (
                  <p className="text-red-400 text-xs text-center mb-4">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full gold-gradient-bg text-navy-900 font-semibold py-4 rounded-xl text-sm hover:opacity-90 hover:scale-[1.02] transition-all shadow-xl shadow-gold-400/25 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
                >
                  {loading ? 'Submitting…' : 'Submit Reservation Request'}
                  {!loading && <ChevronRight size={16} />}
                </button>

                <p className="text-white/30 text-center text-xs mt-4">
                  No payment required now · Confirmation within 2 hours · Free cancellation up to 14 days before arrival
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
