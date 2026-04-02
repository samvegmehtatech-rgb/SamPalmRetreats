import { useLocation, Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { CheckCircle, Calendar, Users, MapPin, Package, Mail, Phone, Star, ArrowRight } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'
import BackToTop from '../components/BackToTop'
import ToastContainer from '../components/Toast'

export default function BookingConfirmationPage() {
  const { state } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (!state) navigate('/', { replace: true })
  }, [state, navigate])

  if (!state) return null

  const { villa, form, nights, pkg } = state

  const totalPerNight = villa.pricePerNight + (pkg?.price || 0)
  const totalAmount = totalPerNight * nights

  return (
    <div className="bg-navy-900 text-white font-sans min-h-screen">
      <Navbar />

      <div className="pt-28 pb-20 px-6 lg:px-10">
        <div className="max-w-3xl mx-auto">

          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="w-24 h-24 gold-gradient-bg rounded-full flex items-center justify-center shadow-2xl shadow-gold-400/30 mx-auto mb-6">
              <CheckCircle size={44} className="text-navy-900" />
            </div>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-gold-400/60" />
              <span className="text-gold-400 text-xs tracking-[0.3em] uppercase font-medium">Reservation Confirmed</span>
              <div className="h-px w-12 bg-gold-400/60" />
            </div>
            <h1 className="font-serif text-4xl md:text-5xl text-white font-semibold mb-4">
              Thank You, <span className="gold-text italic">{form.name?.split(' ')[0] || 'Valued Guest'}</span>
            </h1>
            <p className="text-white/50 text-sm leading-relaxed max-w-lg mx-auto">
              Your reservation request has been received. Our dedicated team will contact you at{' '}
              <span className="text-gold-400">{form.email}</span> within 2 hours to finalise your stay.
            </p>
          </div>

          {/* Booking Summary Card */}
          <div className="glass rounded-3xl gold-border overflow-hidden mb-6">

            {/* Villa Banner */}
            <div className="relative h-48 overflow-hidden">
              <img src={villa.image} alt={villa.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-5 left-6 right-6">
                <h2 className="font-serif text-2xl text-white font-semibold">{villa.name}</h2>
                <div className="flex items-center gap-1.5 mt-1">
                  <MapPin size={12} className="text-gold-400" />
                  <span className="text-gold-400/80 text-xs">{villa.location}</span>
                </div>
              </div>
              <div className="absolute top-4 right-4 glass rounded-full px-3 py-1.5">
                <span className="text-gold-400 text-xs font-semibold tracking-wider">PENDING CONFIRMATION</span>
              </div>
            </div>

            {/* Details Grid */}
            <div className="p-8">
              <p className="text-white/40 text-xs tracking-[0.3em] uppercase mb-5">Booking Summary</p>

              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <DetailRow icon={Calendar} label="Check-in" value={form.checkin} gold />
                <DetailRow icon={Calendar} label="Check-out" value={form.checkout} gold />
                <DetailRow icon={Users} label="Guests" value={`${form.guests} Guest${form.guests > 1 ? 's' : ''}`} />
                <DetailRow icon={Star} label="Nights" value={`${nights} Night${nights !== 1 ? 's' : ''}`} />
                <DetailRow icon={Package} label="Package" value={pkg?.label || 'Standard Stay'} />
                <DetailRow icon={Mail} label="Email" value={form.email} />
                {form.phone && <DetailRow icon={Phone} label="Phone" value={form.phone} />}
              </div>

              {/* Price Breakdown */}
              <div className="border-t border-white/10 pt-5">
                <p className="text-white/40 text-xs tracking-[0.3em] uppercase mb-4">Price Summary</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-white/60">
                    <span>AED {villa.pricePerNight.toLocaleString()} × {nights} nights</span>
                    <span>AED {(villa.pricePerNight * nights).toLocaleString()}</span>
                  </div>
                  {pkg?.price > 0 && (
                    <div className="flex justify-between text-white/60">
                      <span>{pkg.label} add-on × {nights}</span>
                      <span>AED {(pkg.price * nights).toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t border-white/10">
                    <span className="text-white font-semibold">Estimated Total</span>
                    <span className="gold-text font-serif font-semibold text-xl">
                      AED {totalAmount.toLocaleString()}
                    </span>
                  </div>
                </div>
                <p className="text-white/25 text-xs mt-3">No payment required now · Final amount confirmed by our team</p>
              </div>

              {/* Special Requests */}
              {form.requests && (
                <div className="border-t border-white/10 pt-5 mt-2">
                  <p className="text-white/40 text-xs tracking-[0.3em] uppercase mb-2">Special Requests</p>
                  <p className="text-white/60 text-sm leading-relaxed italic">"{form.requests}"</p>
                </div>
              )}
            </div>
          </div>

          {/* What Happens Next */}
          <div className="glass rounded-2xl p-6 gold-border mb-8">
            <p className="text-white/40 text-xs tracking-[0.3em] uppercase mb-5">What Happens Next</p>
            <div className="space-y-4">
              {[
                { step: '01', title: 'Team Review', desc: 'Our reservations team reviews your request and checks villa availability.' },
                { step: '02', title: 'Personal Contact', desc: 'We\'ll reach out via email or WhatsApp within 2 hours to confirm your stay.' },
                { step: '03', title: 'Welcome Itinerary', desc: 'A bespoke welcome itinerary is prepared, tailored to your preferences.' },
                { step: '04', title: 'Arrival Day', desc: 'Your Rolls-Royce transfer, welcome champagne, and butler await.' },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-4">
                  <div className="w-8 h-8 gold-gradient-bg rounded-full flex items-center justify-center shrink-0 shadow-md shadow-gold-400/20">
                    <span className="text-navy-900 text-[10px] font-bold">{item.step}</span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">{item.title}</p>
                    <p className="text-white/40 text-xs mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/villas"
              className="flex-1 text-center glass text-white/70 text-sm border border-white/15 px-6 py-3.5 rounded-full hover:border-gold-400/40 hover:text-gold-400 transition-all"
            >
              Browse More Villas
            </Link>
            <Link
              to="/contact"
              className="flex-1 text-center glass text-white/70 text-sm border border-white/15 px-6 py-3.5 rounded-full hover:border-gold-400/40 hover:text-gold-400 transition-all"
            >
              Have a Question?
            </Link>
            <Link
              to="/"
              className="flex-1 text-center gold-gradient-bg text-navy-900 font-semibold text-sm px-6 py-3.5 rounded-full hover:opacity-90 transition-all flex items-center justify-center gap-2"
            >
              Back to Home <ArrowRight size={15} />
            </Link>
          </div>

        </div>
      </div>

      <Footer />
      <WhatsAppButton />
      <BackToTop />
      <ToastContainer />
    </div>
  )
}

function DetailRow({ icon: Icon, label, value, gold }) {
  return (
    <div className="bg-white/5 rounded-xl p-3">
      <div className="flex items-center gap-2 mb-1">
        <Icon size={11} className="text-gold-400" />
        <span className="text-white/35 text-[10px] uppercase tracking-wider">{label}</span>
      </div>
      <p className={`text-sm font-semibold ${gold ? 'text-gold-400' : 'text-white'}`}>{value}</p>
    </div>
  )
}
