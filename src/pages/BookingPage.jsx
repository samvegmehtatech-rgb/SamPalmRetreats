import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  Calendar, Users, Mail, Phone, ChevronRight,
  CheckCircle, ArrowLeft, Bed, Bath, Maximize2, MapPin, User, Globe
} from 'lucide-react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'
import { sendConfirmationEmail } from '../lib/sendConfirmationEmail'
import { track } from '../firebase'
import { showToast } from '../components/Toast'
import AvailabilityCalendar from '../components/AvailabilityCalendar'
import { useBookedDates } from '../hooks/useBookedDates'
import villas from '../data/villas'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'
import ToastContainer from '../components/Toast'
import BackToTop from '../components/BackToTop'

const packages = [
  { id: 'standard', label: 'Standard Stay',   price: 0,     desc: 'Villa + Butler + Chef Breakfast' },
  { id: 'premium',  label: 'Premium Escape',  price: 5500,  desc: 'Standard + Yacht Day + Spa for 2' },
  { id: 'ultimate', label: 'Ultimate Luxury', price: 20000, desc: 'Premium + Rolls-Royce + All Inclusive' },
]

export default function BookingPage() {
  const { villaId } = useParams()
  const navigate = useNavigate()
  const villa = villas.find((v) => v.id === villaId)

  const [form, setForm] = useState({
    checkin: '', checkout: '', guests: '2', pkg: 'standard',
    name: '', email: '', phone: '', country: '', requests: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { blockedDates } = useBookedDates()

  if (!villa) {
    return (
      <div className="bg-navy-900 text-white min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-white/60">Villa not found.</p>
        <Link to="/villas" className="gold-text text-sm underline">Back to Villas</Link>
      </div>
    )
  }

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const selectedPkg = packages.find((p) => p.id === form.pkg)
    const diff = new Date(form.checkout) - new Date(form.checkin)
    const n = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)))
    const totalPerNight = villa.pricePerNight + (selectedPkg?.price || 0)
    try {
      await addDoc(collection(db, 'bookings'), {
        status: 'pending',
        submittedAt: serverTimestamp(),
        villaId: villa.id,
        villaName: villa.name,
        villaLocation: villa.location,
        villaImage: villa.image,
        pricePerNight: villa.pricePerNight,
        package: selectedPkg?.label || '',
        packagePrice: selectedPkg?.price || 0,
        totalPerNight,
        nights: n,
        totalAmount: totalPerNight * n,
        ...form,
      })
      await sendConfirmationEmail({ ...form, pkg: selectedPkg?.label || form.pkg })
      track('booking_submitted', { villa: villa.name, package: selectedPkg?.label, nights: n })
      showToast('Reservation received! We\'ll contact you within 2 hours.')
      navigate('/booking-confirmation', { state: { villa, form, nights: n, pkg: selectedPkg } })
    } catch (err) {
      setError('Something went wrong. Please try again.')
      showToast('Something went wrong. Please try again.', 'error')
    } finally {
      setLoading(false)
    }
  }

  const selectedPkg = packages.find((p) => p.id === form.pkg)
  const totalPerNight = villa.pricePerNight + (selectedPkg?.price || 0)

  const nights = (() => {
    if (!form.checkin || !form.checkout) return 0
    const diff = new Date(form.checkout) - new Date(form.checkin)
    return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)))
  })()

  return (
    <div className="bg-navy-900 text-white font-sans min-h-screen">
      <Navbar />

      <div className="pt-28 pb-20 px-6 lg:px-10">
        <div className="max-w-6xl mx-auto">

          {/* Back link */}
          <button
            onClick={() => navigate('/villas')}
            className="flex items-center gap-2 text-white/40 hover:text-gold-400 text-sm transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Back to all villas
          </button>

          {submitted ? (
            <SuccessState villa={villa} form={form} nights={nights} onReset={() => setSubmitted(false)} />
          ) : (
            <div className="grid lg:grid-cols-5 gap-10">

              {/* Left: Villa Summary */}
              <div className="lg:col-span-2 space-y-5">
                {/* Villa card */}
                <div className="glass rounded-3xl overflow-hidden gold-border">
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={villa.image}
                      alt={villa.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <p className="gold-text font-serif font-semibold text-2xl">
                        AED {villa.pricePerNight.toLocaleString()}
                      </p>
                      <p className="text-white/50 text-xs">base / night</p>
                    </div>
                  </div>
                  <div className="p-5">
                    <h2 className="font-serif text-xl text-white font-semibold">{villa.name}</h2>
                    <div className="flex items-center gap-1.5 mt-1 mb-4">
                      <MapPin size={12} className="text-gold-400" />
                      <span className="text-gold-400/70 text-xs">{villa.location}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <MiniSpec icon={Bed} value={villa.bedrooms} label="Beds" />
                      <MiniSpec icon={Bath} value={villa.bathrooms} label="Baths" />
                      <MiniSpec icon={Users} value={villa.maxGuests} label="Guests" />
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-white/40 border-t border-white/10 pt-3">
                      <span>Living: <span className="text-white/60">{villa.livingSpace}</span></span>
                      <span>Plot: <span className="text-white/60">{villa.plotSize}</span></span>
                      <span>Beach: <span className="text-white/60">{villa.beach}</span></span>
                      <span>Parking: <span className="text-white/60">{villa.parking} cars</span></span>
                    </div>
                  </div>
                </div>

                {/* Package selection */}
                <div>
                  <h3 className="text-white/60 text-xs tracking-[0.25em] uppercase font-medium mb-3">Select Package</h3>
                  <div className="flex flex-col gap-3">
                    {packages.map((pkg) => (
                      <label
                        key={pkg.id}
                        className={`relative cursor-pointer rounded-2xl p-4 border transition-all duration-300 ${
                          form.pkg === pkg.id
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
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="text-white font-semibold text-sm">{pkg.label}</p>
                            <p className="text-white/40 text-xs mt-0.5 leading-relaxed">{pkg.desc}</p>
                          </div>
                          <div className="text-right shrink-0">
                            {pkg.price === 0 ? (
                              <p className="text-white/40 text-xs mt-1">Included</p>
                            ) : (
                              <>
                                <p className="gold-text font-semibold text-sm">+AED {pkg.price.toLocaleString()}</p>
                                <p className="text-white/30 text-[10px]">/ night</p>
                              </>
                            )}
                          </div>
                        </div>
                        {form.pkg === pkg.id && (
                          <div className="absolute top-3 right-3 w-2 h-2 bg-gold-400 rounded-full" />
                        )}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price summary */}
                {nights > 0 && (
                  <div className="glass rounded-2xl p-5 gold-border">
                    <p className="text-white/50 text-xs tracking-wider uppercase mb-3">Price Summary</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between text-white/60">
                        <span>AED {villa.pricePerNight.toLocaleString()} × {nights} nights</span>
                        <span>AED {(villa.pricePerNight * nights).toLocaleString()}</span>
                      </div>
                      {selectedPkg?.price > 0 && (
                        <div className="flex justify-between text-white/60">
                          <span>{selectedPkg.label} add-on × {nights}</span>
                          <span>AED {(selectedPkg.price * nights).toLocaleString()}</span>
                        </div>
                      )}
                      <div className="border-t border-white/10 pt-2 flex justify-between">
                        <span className="text-white font-semibold">Total</span>
                        <span className="gold-text font-serif font-semibold text-lg">
                          AED {(totalPerNight * nights).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <p className="text-white/30 text-[10px] mt-2">No payment required now · Confirm within 2 hours</p>
                  </div>
                )}

                {/* Inclusions */}
                <div className="glass rounded-2xl p-5 gold-border">
                  <p className="text-white/50 text-xs tracking-wider uppercase mb-3">All Packages Include</p>
                  {[
                    'Airport Rolls-Royce Transfer',
                    'Welcome Champagne & Gifts',
                    'Daily Housekeeping',
                    '24/7 Butler & Concierge',
                    'Private Beach Access',
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 mb-2.5">
                      <CheckCircle size={13} className="text-gold-400 shrink-0" />
                      <span className="text-white/50 text-xs">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Booking Form */}
              <div className="lg:col-span-3">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px w-10 bg-gold-400/60" />
                  <span className="text-gold-400 text-xs tracking-[0.3em] uppercase font-medium">Reservation Details</span>
                </div>
                <h2 className="font-serif text-3xl md:text-4xl text-white font-semibold leading-tight mb-8">
                  Book <span className="gold-text italic">{villa.name}</span>
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">

                  {/* Dates & Guests */}
                  <div className="space-y-4">
                    <AvailabilityCalendar
                      blockedDates={blockedDates}
                      checkin={form.checkin}
                      checkout={form.checkout}
                      onChange={({ checkin, checkout }) => setForm((f) => ({ ...f, checkin, checkout }))}
                    />

                    {/* Selected dates summary + guests */}
                    <div className="glass rounded-2xl p-5 gold-border">
                      <h3 className="text-white/60 text-xs tracking-[0.25em] uppercase font-medium mb-4">Stay Summary</h3>
                      <div className="grid sm:grid-cols-3 gap-4">
                        <div>
                          <p className="text-white/40 text-xs tracking-wider uppercase mb-1">Check-in</p>
                          <p className={`text-sm font-semibold ${form.checkin ? 'text-gold-400' : 'text-white/20'}`}>
                            {form.checkin || 'Not selected'}
                          </p>
                        </div>
                        <div>
                          <p className="text-white/40 text-xs tracking-wider uppercase mb-1">Check-out</p>
                          <p className={`text-sm font-semibold ${form.checkout ? 'text-gold-400' : 'text-white/20'}`}>
                            {form.checkout || 'Not selected'}
                          </p>
                        </div>
                        <div>
                          <label className="text-white/40 text-xs tracking-wider uppercase block mb-2">
                            Guests <span className="text-white/25">(max {villa.maxGuests})</span>
                          </label>
                          <div className="relative">
                            <Users size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold-400" />
                            <select
                              name="guests"
                              value={form.guests}
                              onChange={handleChange}
                              className="w-full bg-white/5 border border-white/10 rounded-xl pl-8 pr-3 py-2.5 text-white text-sm focus:outline-none focus:border-gold-400/60 transition-colors appearance-none"
                            >
                              {[...Array(villa.maxGuests)].map((_, i) => (
                                <option key={i + 1} value={i + 1} className="bg-navy-800">
                                  {i + 1} {i === 0 ? 'Guest' : 'Guests'}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    {nights > 0 && (
                      <p className="text-gold-400/70 text-xs mt-3 tracking-wide">
                        {nights} night{nights !== 1 ? 's' : ''} selected
                        {nights < 2 && <span className="text-white/30 ml-2">· Minimum 2-night stay required</span>}
                      </p>
                    )}
                    {nights === 1 && (
                      <p className="text-amber-400/70 text-xs mt-1">
                        Please select at least 2 nights to proceed.
                      </p>
                    )}
                  </div>

                  {/* Personal Info */}
                  <div className="glass rounded-2xl p-6 gold-border">
                    <h3 className="text-white/60 text-xs tracking-[0.25em] uppercase font-medium mb-4">Your Details</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-white/40 text-xs tracking-wider uppercase block mb-2">Full Name</label>
                        <div className="relative">
                          <User size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold-400" />
                          <input
                            type="text"
                            name="name"
                            required
                            placeholder="Your full name"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-8 pr-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-gold-400/60 transition-colors"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-white/40 text-xs tracking-wider uppercase block mb-2">Email Address</label>
                        <div className="relative">
                          <Mail size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold-400" />
                          <input
                            type="email"
                            name="email"
                            required
                            placeholder="you@email.com"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-8 pr-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-gold-400/60 transition-colors"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-white/40 text-xs tracking-wider uppercase block mb-2">Phone / WhatsApp</label>
                        <div className="relative">
                          <Phone size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold-400" />
                          <input
                            type="tel"
                            name="phone"
                            required
                            placeholder="+971 XX XXX XXXX"
                            value={form.phone}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-8 pr-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-gold-400/60 transition-colors"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-white/40 text-xs tracking-wider uppercase block mb-2">Country / Nationality</label>
                        <div className="relative">
                          <Globe size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold-400" />
                          <input
                            type="text"
                            name="country"
                            placeholder="e.g. United Arab Emirates"
                            value={form.country}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-8 pr-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-gold-400/60 transition-colors"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div className="glass rounded-2xl p-6 gold-border">
                    <h3 className="text-white/60 text-xs tracking-[0.25em] uppercase font-medium mb-4">Special Requests</h3>
                    <textarea
                      name="requests"
                      rows={4}
                      placeholder="Dietary preferences, occasion (honeymoon, anniversary, birthday), specific room preferences, early check-in or late check-out, allergen info, or any special arrangements..."
                      value={form.requests}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-gold-400/60 transition-colors resize-none"
                    />
                  </div>

                  {/* Submit */}
                  {error && (
                    <p className="text-red-400 text-xs text-center">{error}</p>
                  )}
                  <button
                    type="submit"
                    disabled={nights < 2 || loading}
                    className="w-full gold-gradient-bg text-navy-900 font-semibold py-4 rounded-xl text-sm hover:opacity-90 hover:scale-[1.02] transition-all shadow-xl shadow-gold-400/25 flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {loading ? 'Submitting…' : 'Submit Reservation Request'}
                    {!loading && <ChevronRight size={16} />}
                  </button>

                  <p className="text-white/30 text-center text-xs">
                    No payment required now · Our team confirms within 2 hours · Free cancellation up to 14 days before arrival
                  </p>
                </form>
              </div>

            </div>
          )}
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
      <BackToTop />
      <ToastContainer />
    </div>
  )
}

function MiniSpec({ icon: Icon, value, label }) {
  return (
    <div className="bg-white/5 rounded-lg p-2 text-center">
      <Icon size={12} className="text-gold-400 mx-auto mb-1" />
      <p className="text-white text-xs font-semibold">{value}</p>
      <p className="text-white/30 text-[9px] uppercase tracking-wider">{label}</p>
    </div>
  )
}

function SuccessState({ villa, form, nights, onReset }) {
  return (
    <div className="max-w-2xl mx-auto glass rounded-3xl p-10 md:p-14 gold-border text-center flex flex-col items-center gap-6">
      <div className="w-20 h-20 gold-gradient-bg rounded-full flex items-center justify-center shadow-xl shadow-gold-400/30">
        <CheckCircle size={36} className="text-navy-900" />
      </div>
      <div>
        <h2 className="font-serif text-3xl md:text-4xl text-white font-semibold mb-3">
          Reservation Received
        </h2>
        <p className="text-white/50 text-sm leading-relaxed max-w-md mx-auto">
          Thank you, <span className="text-white">{form.name || 'valued guest'}</span>. Your reservation request
          for <span className="text-gold-400">{villa.name}</span>
          {nights > 0 && ` for ${nights} night${nights !== 1 ? 's' : ''}`} has been received.
        </p>
        <p className="text-white/40 text-sm mt-3">
          Our reservations team will contact you at{' '}
          <span className="text-gold-400">{form.email}</span> within 2 hours.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
        <Link
          to="/villas"
          className="flex-1 text-center glass text-white/70 text-sm border border-white/10 px-6 py-3 rounded-full hover:border-gold-400/40 hover:text-gold-400 transition-all"
        >
          Browse Villas
        </Link>
        <button
          onClick={onReset}
          className="flex-1 gold-gradient-bg text-navy-900 font-semibold text-sm px-6 py-3 rounded-full hover:opacity-90 transition-all"
        >
          New Enquiry
        </button>
      </div>
    </div>
  )
}
