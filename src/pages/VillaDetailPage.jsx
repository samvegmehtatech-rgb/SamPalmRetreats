import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  Bed, Bath, Users, Maximize2, MapPin, ArrowLeft, ArrowRight,
  Star, ChevronRight, X, CheckCircle, Home, Wind, Sparkles,
  Phone, ChevronLeft, Quote
} from 'lucide-react'
import villas from '../data/villas'
import villaDetails from '../data/villaDetails'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'
import BackToTop from '../components/BackToTop'
import { useVillaReviews } from '../hooks/useVillaReviews'
import { showToast } from '../components/Toast'
import ToastContainer from '../components/Toast'

const amenityIcons = { indoor: Home, outdoor: Wind, services: Sparkles }
const amenityLabels = { indoor: 'Indoor & Living', outdoor: 'Outdoor & Pool', services: 'Staff & Services' }

export default function VillaDetailPage() {
  const { villaId } = useParams()
  const navigate = useNavigate()
  const villa = villas.find((v) => v.id === villaId)
  const details = villaDetails[villaId]
  const { reviews, loading: reviewsLoading, submitReview } = useVillaReviews(villaId)

  const [lightboxIdx, setLightboxIdx] = useState(null)
  const [reviewForm, setReviewForm] = useState({ name: '', country: '', rating: 5, text: '', stay: '' })
  const [reviewSubmitting, setReviewSubmitting] = useState(false)
  const [reviewSubmitted, setReviewSubmitted] = useState(false)

  if (!villa || !details) {
    return (
      <div className="bg-navy-900 text-white min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-white/60">Villa not found.</p>
        <Link to="/villas" className="gold-text text-sm underline">Back to Villas</Link>
      </div>
    )
  }

  const allImages = [villa.image, ...details.images]

  const openLightbox = (idx) => setLightboxIdx(idx)
  const closeLightbox = () => setLightboxIdx(null)
  const prevImage = (e) => { e.stopPropagation(); setLightboxIdx((lightboxIdx - 1 + allImages.length) % allImages.length) }
  const nextImage = (e) => { e.stopPropagation(); setLightboxIdx((lightboxIdx + 1) % allImages.length) }

  const handleReviewSubmit = async (e) => {
    e.preventDefault()
    if (!reviewForm.text.trim() || !reviewForm.name.trim()) return
    setReviewSubmitting(true)
    try {
      await submitReview(reviewForm)
      setReviewSubmitted(true)
      showToast('Thank you dear! Your review has been submitted.')
    } catch {
      showToast('Could not submit review. Please try again.', 'error')
    } finally {
      setReviewSubmitting(false)
    }
  }

  const otherVillas = villas.filter((v) => v.id !== villaId).slice(0, 3)

  return (
    <div className="bg-navy-900 text-white font-sans min-h-screen">
      <Navbar />

      {/* Hero */}
      <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <img
          src={villa.image}
          alt={villa.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/60 to-transparent" />

        {/* Back button */}
        <button
          onClick={() => navigate('/villas')}
          className="absolute top-28 left-6 lg:left-10 flex items-center gap-2 text-white/60 hover:text-gold-400 text-sm transition-colors"
        >
          <ArrowLeft size={16} />
          All Villas
        </button>

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10 pb-10 lg:pb-14">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-10 bg-gold-400/60" />
              <span className="text-gold-400 text-xs tracking-[0.3em] uppercase font-medium">{villa.type}</span>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white font-semibold leading-none mb-4">
              {villa.name}
            </h1>
            <div className="flex items-center gap-2 mb-6">
              <MapPin size={14} className="text-gold-400" />
              <span className="text-gold-400/80 text-sm">{villa.location}</span>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <div className="glass rounded-2xl px-5 py-3 gold-border">
                <span className="gold-text font-serif font-semibold text-2xl">
                  AED {villa.pricePerNight.toLocaleString()}
                </span>
                <span className="text-white/50 text-sm ml-1">/ night</span>
              </div>
              <Link
                to={`/book/${villa.id}`}
                className="gold-gradient-bg text-navy-900 font-semibold px-8 py-3 rounded-full hover:opacity-90 hover:scale-105 transition-all shadow-xl shadow-gold-400/30 flex items-center gap-2"
              >
                Book This Villa
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Quick specs bar */}
      <div className="bg-navy-800 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5">
          <div className="flex flex-wrap gap-6 lg:gap-10">
            {[
              { icon: Bed, value: `${villa.bedrooms} Bedrooms` },
              { icon: Bath, value: `${villa.bathrooms} Bathrooms` },
              { icon: Users, value: `Up to ${villa.maxGuests} Guests` },
              { icon: Maximize2, value: villa.livingSpace },
            ].map(({ icon: Icon, value }) => (
              <div key={value} className="flex items-center gap-2.5">
                <Icon size={15} className="text-gold-400" />
                <span className="text-white/70 text-sm">{value}</span>
              </div>
            ))}
            <div className="flex items-center gap-2.5">
              <span className="text-gold-400 text-sm font-medium">Beach:</span>
              <span className="text-white/70 text-sm">{villa.beach}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="text-gold-400 text-sm font-medium">Plot:</span>
              <span className="text-white/70 text-sm">{villa.plotSize}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 space-y-20">

        {/* Gallery */}
        <section>
          <SectionHeader label="Photo Gallery" title="Inside the Villa" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-8">
            {allImages.slice(0, 6).map((img, i) => (
              <button
                key={i}
                onClick={() => openLightbox(i)}
                className={`relative overflow-hidden rounded-2xl group ${i === 0 ? 'col-span-2 row-span-2 h-80 md:h-auto' : 'h-48'}`}
              >
                <img
                  src={img}
                  alt={`${villa.name} ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                {i === 5 && allImages.length > 6 && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">+{allImages.length - 6} more</span>
                  </div>
                )}
              </button>
            ))}
          </div>
          {allImages.length > 6 && (
            <button
              onClick={() => openLightbox(0)}
              className="mt-4 text-gold-400 text-sm hover:text-gold-300 transition-colors flex items-center gap-1.5"
            >
              View all {allImages.length} photos <ChevronRight size={14} />
            </button>
          )}
        </section>

        {/* Description & Tags */}
        <section className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <SectionHeader label="About This Villa" title={villa.name} />
            <div className="mt-6 space-y-4">
              {details.longDesc.split('\n\n').map((para, i) => (
                <p key={i} className="text-white/60 font-light leading-relaxed text-base">{para}</p>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-white/40 text-xs tracking-[0.25em] uppercase font-medium mb-4">Highlights</p>
            {villa.tags.map((tag) => (
              <div key={tag} className="flex items-center gap-3 glass-light rounded-xl px-4 py-3 border border-white/10">
                <CheckCircle size={14} className="text-gold-400 shrink-0" />
                <span className="text-white/70 text-sm">{tag}</span>
              </div>
            ))}
            <div className="glass rounded-2xl p-5 gold-border mt-6">
              <p className="text-white/50 text-xs tracking-wider uppercase mb-3">Starting From</p>
              <p className="gold-text font-serif font-semibold text-3xl">
                AED {villa.pricePerNight.toLocaleString()}
              </p>
              <p className="text-white/40 text-xs mt-1">per night · excluding add-ons</p>
              <Link
                to={`/book/${villa.id}`}
                className="mt-4 w-full gold-gradient-bg text-navy-900 font-semibold py-3 rounded-xl text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all"
              >
                Reserve Now <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        {/* Amenities */}
        <section>
          <SectionHeader label="What's Included" title="Villa Amenities" />
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {Object.entries(details.amenities).map(([key, items]) => {
              const Icon = amenityIcons[key]
              return (
                <div key={key} className="glass rounded-3xl p-6 gold-border">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-9 h-9 gold-gradient-bg rounded-full flex items-center justify-center shrink-0">
                      <Icon size={15} className="text-navy-900" />
                    </div>
                    <h3 className="text-white font-semibold text-sm">{amenityLabels[key]}</h3>
                  </div>
                  <ul className="space-y-2.5">
                    {items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <div className="w-1.5 h-1.5 bg-gold-400 rounded-full mt-2 shrink-0" />
                        <span className="text-white/60 text-sm font-light">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </section>

        {/* Virtual Tour */}
        <section>
          <SectionHeader label="Explore Virtually" title="Request a Private Tour" />
          <div className="mt-8 glass rounded-3xl gold-border overflow-hidden">
            <div className="relative h-64 md:h-96 bg-navy-800 flex items-center justify-center">
              <img
                src={details.images[1] || villa.image}
                alt="Virtual tour preview"
                className="w-full h-full object-cover opacity-40"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 p-6 text-center">
                <div className="w-16 h-16 gold-gradient-bg rounded-full flex items-center justify-center shadow-xl shadow-gold-400/30">
                  <ArrowRight size={24} className="text-navy-900 ml-1" />
                </div>
                <div>
                  <p className="text-white font-serif text-2xl font-semibold mb-2">Private Virtual Walkthrough</p>
                  <p className="text-white/50 text-sm max-w-md">
                    Our villa specialists offer live HD video tours of every property at a time that suits you — any timezone, any device.
                  </p>
                </div>
                <a
                  href="tel:+97142001234"
                  className="gold-gradient-bg text-navy-900 font-semibold px-8 py-3 rounded-full hover:opacity-90 hover:scale-105 transition-all shadow-lg shadow-gold-400/25 flex items-center gap-2"
                >
                  <Phone size={15} />
                  Schedule a Tour
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section>
          <SectionHeader label="Guest Experiences" title={`Reviews for ${villa.name}`} />

          {/* Review list */}
          <div className="mt-8 space-y-5">
            {reviewsLoading && (
              <div className="text-white/30 text-sm text-center py-8">Loading reviews…</div>
            )}
            {!reviewsLoading && reviews.length === 0 && (
              <div className="glass rounded-2xl p-8 gold-border text-center">
                <Star size={32} className="text-gold-400/30 mx-auto mb-3" />
                <p className="text-white/40 text-sm">No reviews yet for this villa. Be the first!</p>
              </div>
            )}
            {reviews.map((rev) => (
              <ReviewCard key={rev.id} review={rev} />
            ))}
          </div>

          {/* Submit Review */}
          <div className="mt-10 glass rounded-3xl p-6 md:p-8 gold-border">
            <h3 className="font-serif text-xl text-white font-semibold mb-1">Share Your Experience</h3>
            <p className="text-white/40 text-sm mb-6">Stayed at {villa.name}? We'd love to hear from you.</p>

            {reviewSubmitted ? (
              <div className="flex items-center gap-3 text-gold-400">
                <CheckCircle size={20} />
                <p className="text-sm font-medium">Thank you! Your review has been submitted.</p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/40 text-xs tracking-wider uppercase block mb-2">Your Name</label>
                    <input
                      type="text"
                      required
                      value={reviewForm.name}
                      onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                      placeholder="e.g. James & Sophia"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-gold-400/60 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-white/40 text-xs tracking-wider uppercase block mb-2">Country</label>
                    <input
                      type="text"
                      value={reviewForm.country}
                      onChange={(e) => setReviewForm({ ...reviewForm, country: e.target.value })}
                      placeholder="e.g. United Kingdom"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-gold-400/60 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-white/40 text-xs tracking-wider uppercase block mb-2">Stay Description</label>
                    <input
                      type="text"
                      value={reviewForm.stay}
                      onChange={(e) => setReviewForm({ ...reviewForm, stay: e.target.value })}
                      placeholder="e.g. Stayed 5 nights · Anniversary"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-gold-400/60 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-white/40 text-xs tracking-wider uppercase block mb-2">Rating</label>
                    <div className="flex gap-2 pt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                        >
                          <Star
                            size={22}
                            className={star <= reviewForm.rating ? 'text-gold-400 fill-gold-400' : 'text-white/20'}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-white/40 text-xs tracking-wider uppercase block mb-2">Your Review</label>
                  <textarea
                    required
                    rows={4}
                    value={reviewForm.text}
                    onChange={(e) => setReviewForm({ ...reviewForm, text: e.target.value })}
                    placeholder="Tell future guests what made your stay special…"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-gold-400/60 transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={reviewSubmitting}
                  className="gold-gradient-bg text-navy-900 font-semibold px-8 py-3 rounded-xl text-sm hover:opacity-90 hover:scale-[1.02] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {reviewSubmitting ? 'Submitting…' : 'Submit Review'}
                </button>
              </form>
            )}
          </div>
        </section>

        {/* Similar Villas */}
        <section>
          <SectionHeader label="You May Also Like" title="Similar Villas" />
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {otherVillas.map((v) => (
              <Link
                key={v.id}
                to={`/villas/${v.id}`}
                className="glass rounded-2xl overflow-hidden gold-border group hover:border-gold-400/50 transition-all hover:shadow-xl hover:shadow-gold-400/10"
              >
                <div className="relative h-44 overflow-hidden">
                  <img src={v.image} alt={v.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-4">
                    <span className="gold-text font-serif font-semibold">AED {v.pricePerNight.toLocaleString()}</span>
                    <span className="text-white/50 text-xs ml-1">/ night</span>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-serif text-white font-semibold">{v.name}</h4>
                  <p className="text-gold-400/70 text-xs mt-1">{v.location}</p>
                  <p className="text-white/50 text-xs mt-2 font-light line-clamp-2">{v.shortDesc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </div>

      {/* Sticky Book Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 glass border-t border-gold-400/20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div>
            <p className="font-serif text-white font-semibold">{villa.name}</p>
            <p className="text-gold-400 text-sm">
              AED {villa.pricePerNight.toLocaleString()}
              <span className="text-white/40 text-xs ml-1">/ night</span>
            </p>
          </div>
          <div className="flex gap-3">
            <a
              href="tel:+97142001234"
              className="hidden sm:flex items-center gap-2 text-white/60 border border-white/10 rounded-full px-5 py-2.5 text-sm hover:border-gold-400/40 hover:text-gold-400 transition-all"
            >
              <Phone size={14} /> Call Us
            </a>
            <Link
              to={`/book/${villa.id}`}
              className="gold-gradient-bg text-navy-900 font-semibold px-7 py-2.5 rounded-full text-sm hover:opacity-90 hover:scale-105 transition-all shadow-lg shadow-gold-400/25 flex items-center gap-2"
            >
              Book Now <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
      <div className="h-20" /> {/* spacer for sticky bar */}

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors z-10"
          >
            <X size={28} />
          </button>
          <button
            onClick={prevImage}
            className="absolute left-4 text-white/60 hover:text-white transition-colors z-10 p-2"
          >
            <ChevronLeft size={36} />
          </button>
          <img
            src={allImages[lightboxIdx]}
            alt={`${villa.name} gallery`}
            className="max-h-[85vh] max-w-[85vw] object-contain rounded-xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={nextImage}
            className="absolute right-4 text-white/60 hover:text-white transition-colors z-10 p-2"
          >
            <ChevronRight size={36} />
          </button>
          <div className="absolute bottom-6 text-white/40 text-sm">
            {lightboxIdx + 1} / {allImages.length}
          </div>
        </div>
      )}

      <Footer />
      <WhatsAppButton />
      <BackToTop />
      <ToastContainer />
    </div>
  )
}

function SectionHeader({ label, title }) {
  return (
    <div>
      <div className="flex items-center gap-4 mb-3">
        <div className="h-px w-10 bg-gold-400/60" />
        <span className="text-gold-400 text-xs tracking-[0.3em] uppercase font-medium">{label}</span>
      </div>
      <h2 className="font-serif text-3xl md:text-4xl text-white font-semibold leading-tight">
        {title}
      </h2>
    </div>
  )
}

function ReviewCard({ review }) {
  return (
    <div className="glass rounded-2xl p-6 gold-border relative">
      <Quote size={32} className="text-gold-400/15 absolute top-5 right-6" />
      <div className="flex gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={13} className={i < review.rating ? 'text-gold-400 fill-gold-400' : 'text-white/20'} />
        ))}
      </div>
      <p className="text-white/70 text-sm font-light leading-relaxed italic mb-4">"{review.text}"</p>
      <div className="flex items-center gap-3 pt-4 border-t border-white/10">
        <div className="w-9 h-9 gold-gradient-bg rounded-full flex items-center justify-center shrink-0">
          <span className="text-navy-900 font-bold text-sm">{review.name?.[0] || 'G'}</span>
        </div>
        <div>
          <p className="text-white font-semibold text-sm">{review.name}</p>
          <p className="text-gold-400 text-xs mt-0.5">{review.stay || review.country || 'Verified Guest'}</p>
        </div>
      </div>
    </div>
  )
}
