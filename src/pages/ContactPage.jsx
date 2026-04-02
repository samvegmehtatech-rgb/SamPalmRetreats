import { useState } from 'react'
import { Mail, Phone, MessageSquare, User, ChevronRight, CheckCircle, MapPin, Clock, Globe } from 'lucide-react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'
import { track } from '../firebase'
import { showToast } from '../components/Toast'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'
import BackToTop from '../components/BackToTop'
import ToastContainer from '../components/Toast'
import FadeIn from '../components/FadeIn'

const topics = [
  'General Enquiry',
  'Villa Availability',
  'Pricing & Packages',
  'Corporate / Group Booking',
  'Events & Special Occasions',
  'Press & Media',
  'Other',
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', topic: 'General Enquiry', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await addDoc(collection(db, 'inquiries'), {
        ...form,
        submittedAt: serverTimestamp(),
      })
      track('inquiry_submitted', { topic: form.topic })
      showToast('Message received! We\'ll be in touch within 24 hours.')
      setSubmitted(true)
    } catch {
      showToast('Something went wrong. Please try again.', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-navy-900 text-white font-sans min-h-screen">
      <Navbar />

      <div className="pt-28 pb-20 px-6 lg:px-10">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <FadeIn>
            <div className="flex items-center gap-4 mb-5">
              <div className="h-px w-12 bg-gold-400/60" />
              <span className="text-gold-400 text-xs tracking-[0.3em] uppercase font-medium">Get In Touch</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
              <h1 className="font-serif text-4xl md:text-5xl text-white font-semibold leading-tight">
                We'd Love to<br />
                <span className="gold-text italic">Hear From You</span>
              </h1>
              <p className="text-white/50 max-w-xs text-sm font-light leading-relaxed">
                Whether you have a question, need a custom package, or simply want to learn more — our team is here.
              </p>
            </div>
          </FadeIn>

          <div className="grid lg:grid-cols-3 gap-8">

            {/* Contact Info */}
            <FadeIn direction="left" className="space-y-5">
              {[
                {
                  icon: Phone,
                  title: 'Call Us',
                  lines: ['+971 4 200 1234', '+971 50 123 4567 (WhatsApp)'],
                  sub: 'Daily 8am – 10pm GST',
                },
                {
                  icon: Mail,
                  title: 'Email Us',
                  lines: ['reservations@sampalmretreats.com', 'concierge@sampalmretreats.com'],
                  sub: 'Response within 2 hours',
                },
                {
                  icon: MapPin,
                  title: 'Location',
                  lines: ['Palm Jumeirah, Dubai', 'United Arab Emirates'],
                  sub: 'Frond villas A – N',
                },
                {
                  icon: Clock,
                  title: 'Office Hours',
                  lines: ['Monday – Sunday', '8:00 AM – 10:00 PM GST'],
                  sub: '24/7 concierge for guests',
                },
              ].map((item) => (
                <div key={item.title} className="glass rounded-2xl p-5 gold-border flex gap-4">
                  <div className="w-10 h-10 gold-gradient-bg rounded-xl flex items-center justify-center shrink-0 shadow-md shadow-gold-400/20">
                    <item.icon size={16} className="text-navy-900" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{item.title}</p>
                    {item.lines.map((line) => (
                      <p key={line} className="text-white/50 text-xs mt-0.5">{line}</p>
                    ))}
                    <p className="text-gold-400/60 text-[10px] mt-1 tracking-wide">{item.sub}</p>
                  </div>
                </div>
              ))}
            </FadeIn>

            {/* Form */}
            <FadeIn delay={100} className="lg:col-span-2">
              {submitted ? (
                <div className="glass rounded-3xl p-10 gold-border text-center flex flex-col items-center gap-6 h-full justify-center min-h-[500px]">
                  <div className="w-20 h-20 gold-gradient-bg rounded-full flex items-center justify-center shadow-xl shadow-gold-400/30">
                    <CheckCircle size={36} className="text-navy-900" />
                  </div>
                  <div>
                    <h2 className="font-serif text-3xl text-white font-semibold mb-3">Message Received</h2>
                    <p className="text-white/50 text-sm leading-relaxed max-w-md mx-auto">
                      Thank you, <span className="text-white">{form.name || 'valued guest'}</span>. We'll reach out to{' '}
                      <span className="text-gold-400">{form.email}</span> within 24 hours.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', topic: 'General Enquiry', message: '' }) }}
                      className="text-gold-400 text-sm border border-gold-400/40 px-6 py-2.5 rounded-full hover:bg-gold-400/10 transition-all"
                    >
                      Send Another Message
                    </button>
                    <a
                      href="/"
                      className="gold-gradient-bg text-navy-900 font-semibold text-sm px-6 py-2.5 rounded-full hover:opacity-90 transition-all text-center"
                    >
                      Back to Home
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="glass rounded-3xl p-8 md:p-10 gold-border">

                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
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
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="text-white/40 text-xs tracking-wider uppercase block mb-2">Phone / WhatsApp</label>
                      <div className="relative">
                        <Phone size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold-400" />
                        <input
                          type="tel"
                          name="phone"
                          placeholder="+971 XX XXX XXXX"
                          value={form.phone}
                          onChange={handleChange}
                          className="w-full bg-white/5 border border-white/10 rounded-xl pl-8 pr-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-gold-400/60 transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-white/40 text-xs tracking-wider uppercase block mb-2">Topic</label>
                      <div className="relative">
                        <Globe size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold-400" />
                        <select
                          name="topic"
                          value={form.topic}
                          onChange={handleChange}
                          className="w-full bg-white/5 border border-white/10 rounded-xl pl-8 pr-3 py-3 text-white text-sm focus:outline-none focus:border-gold-400/60 transition-colors appearance-none"
                        >
                          {topics.map((t) => (
                            <option key={t} value={t} className="bg-navy-800">{t}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <label className="text-white/40 text-xs tracking-wider uppercase block mb-2">Your Message</label>
                    <div className="relative">
                      <MessageSquare size={13} className="absolute left-3 top-3.5 text-gold-400" />
                      <textarea
                        name="message"
                        required
                        rows={5}
                        placeholder="Tell us how we can help — villa preferences, dates, group size, special occasions..."
                        value={form.message}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-8 pr-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-gold-400/60 transition-colors resize-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full gold-gradient-bg text-navy-900 font-semibold py-4 rounded-xl text-sm hover:opacity-90 hover:scale-[1.02] transition-all shadow-xl shadow-gold-400/25 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
                  >
                    {loading ? 'Sending…' : 'Send Message'}
                    {!loading && <ChevronRight size={16} />}
                  </button>

                  <p className="text-white/30 text-center text-xs mt-4">
                    We respond within 24 hours · WhatsApp available for urgent enquiries
                  </p>
                </form>
              )}
            </FadeIn>
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
