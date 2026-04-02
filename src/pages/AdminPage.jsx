import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CheckCircle, XCircle, Trash2, Clock, Users, Calendar,
  MapPin, Phone, Mail, Globe, Star, ChevronDown, ChevronUp,
  LayoutDashboard, LogOut
} from 'lucide-react'
import {
  collection, onSnapshot, doc, updateDoc, deleteDoc, orderBy, query
} from 'firebase/firestore'
import { signOut } from 'firebase/auth'
import { db, auth } from '../firebase'

const STATUS_STYLES = {
  pending:   'bg-amber-400/10 text-amber-400 border-amber-400/30',
  confirmed: 'bg-emerald-400/10 text-emerald-400 border-emerald-400/30',
  rejected:  'bg-red-400/10 text-red-400 border-red-400/30',
}

const STATUS_ICONS = {
  pending:   Clock,
  confirmed: CheckCircle,
  rejected:  XCircle,
}

export default function AdminPage() {
  const [enquiries, setEnquiries] = useState([])
  const [filter, setFilter] = useState('all')
  const [expanded, setExpanded] = useState(null)
  const [loadingStatus, setLoadingStatus] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const q = query(collection(db, 'bookings'), orderBy('submittedAt', 'desc'))
    const unsub = onSnapshot(q, (snap) => {
      setEnquiries(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    })
    return () => unsub()
  }, [])

  const updateStatus = async (id, status) => {
    setLoadingStatus(id)
    await updateDoc(doc(db, 'bookings', id), { status })
    setLoadingStatus(null)
  }

  const deleteEnquiry = async (id) => {
    if (window.confirm('Delete this enquiry? This cannot be undone.')) {
      await deleteDoc(doc(db, 'bookings', id))
      if (expanded === id) setExpanded(null)
    }
  }

  const filtered = filter === 'all' ? enquiries : enquiries.filter((e) => e.status === filter)

  const counts = {
    all: enquiries.length,
    pending: enquiries.filter((e) => e.status === 'pending').length,
    confirmed: enquiries.filter((e) => e.status === 'confirmed').length,
    rejected: enquiries.filter((e) => e.status === 'rejected').length,
  }

  const totalRevenue = enquiries
    .filter((e) => e.status === 'confirmed')
    .reduce((sum, e) => sum + (e.totalAmount || 0), 0)

  return (
    <div className="bg-navy-900 text-white font-sans min-h-screen">
      {/* Admin Navbar */}
      <nav className="glass border-b border-white/5 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 gold-gradient-bg rounded-full flex items-center justify-center shadow-lg shadow-gold-400/30">
              <span className="text-navy-900 font-serif font-bold text-sm">S</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="gold-text font-serif font-semibold">Sam Palm Retreats</span>
              <span className="text-white/20">·</span>
              <div className="flex items-center gap-1.5 text-white/40 text-sm">
                <LayoutDashboard size={13} />
                Admin Panel
              </div>
            </div>
          </div>
          <button
            onClick={async () => { await signOut(auth); navigate('/admin/login') }}
            className="flex items-center gap-2 text-white/40 hover:text-gold-400 text-sm transition-colors"
          >
            <LogOut size={14} />
            Sign Out
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">

        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl md:text-4xl text-white font-semibold mb-1">
            Enquiry <span className="gold-text italic">Dashboard</span>
          </h1>
          <p className="text-white/40 text-sm">Review, confirm or reject guest reservation requests.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total Enquiries" value={counts.all} color="white" />
          <StatCard label="Pending" value={counts.pending} color="amber" />
          <StatCard label="Confirmed" value={counts.confirmed} color="emerald" />
          <StatCard
            label="Confirmed Revenue"
            value={totalRevenue > 0 ? `AED ${totalRevenue.toLocaleString()}` : '—'}
            color="gold"
          />
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          {['all', 'pending', 'confirmed', 'rejected'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all border ${
                filter === f
                  ? 'gold-gradient-bg text-navy-900 border-transparent'
                  : 'glass-light border-white/10 text-white/50 hover:text-white/80'
              }`}
            >
              {f} {counts[f] > 0 && <span className="ml-1 opacity-70">({counts[f]})</span>}
            </button>
          ))}
        </div>

        {/* Enquiry list */}
        {filtered.length === 0 ? (
          <div className="glass rounded-2xl p-14 gold-border text-center">
            <p className="text-white/30 text-sm">
              {filter === 'all' ? 'No enquiries yet. Bookings will appear here.' : `No ${filter} enquiries.`}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filtered.map((enq) => (
              <EnquiryCard
                key={enq.id}
                enq={enq}
                isExpanded={expanded === enq.id}
                isUpdating={loadingStatus === enq.id}
                onToggle={() => setExpanded(expanded === enq.id ? null : enq.id)}
                onConfirm={() => updateStatus(enq.id, 'confirmed')}
                onReject={() => updateStatus(enq.id, 'rejected')}
                onPending={() => updateStatus(enq.id, 'pending')}
                onDelete={() => deleteEnquiry(enq.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function EnquiryCard({ enq, isExpanded, isUpdating, onToggle, onConfirm, onReject, onPending, onDelete }) {
  const StatusIcon = STATUS_ICONS[enq.status] || Clock
  const submitted = enq.submittedAt?.toDate ? enq.submittedAt.toDate() : new Date(enq.submittedAt)
  const dateStr = submitted.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  const timeStr = submitted.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })

  return (
    <div className={`glass rounded-2xl gold-border overflow-hidden transition-all duration-300 ${
      enq.status === 'confirmed' ? 'border-emerald-400/30' :
      enq.status === 'rejected'  ? 'border-red-400/20' : ''
    }`}>
      {/* Card header — always visible */}
      <div className="p-5 flex flex-col sm:flex-row sm:items-center gap-4">
        {/* Villa thumbnail */}
        <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
          <img src={enq.villaImage} alt={enq.villaName} className="w-full h-full object-cover" />
        </div>

        {/* Core info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3 className="text-white font-semibold text-sm">{enq.name}</h3>
            <span className={`text-[10px] font-medium tracking-wider uppercase px-2 py-0.5 rounded-full border flex items-center gap-1 ${STATUS_STYLES[enq.status]}`}>
              <StatusIcon size={10} />
              {enq.status}
            </span>
          </div>
          <p className="text-white/50 text-xs mb-1.5">{enq.villaName} · {enq.villaLocation}</p>
          <div className="flex flex-wrap gap-4 text-xs text-white/40">
            <span className="flex items-center gap-1">
              <Calendar size={11} className="text-gold-400" />
              {enq.checkin} → {enq.checkout}
              {enq.nights > 0 && <span className="text-white/30 ml-1">({enq.nights} nights)</span>}
            </span>
            <span className="flex items-center gap-1">
              <Users size={11} className="text-gold-400" />
              {enq.guests} guests
            </span>
            {enq.totalAmount > 0 && (
              <span className="text-gold-400 font-semibold">
                AED {enq.totalAmount.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        {/* Right: date + actions */}
        <div className="flex flex-col items-end gap-3 shrink-0">
          <p className="text-white/25 text-[10px] text-right">
            {dateStr}<br />{timeStr}
          </p>
          <div className={`flex items-center gap-2 ${isUpdating ? 'opacity-50 pointer-events-none' : ''}`}>
            {enq.status !== 'confirmed' && (
              <button
                onClick={onConfirm}
                title="Confirm"
                className="w-8 h-8 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 flex items-center justify-center hover:bg-emerald-400/20 transition-all"
              >
                <CheckCircle size={14} />
              </button>
            )}
            {enq.status !== 'rejected' && (
              <button
                onClick={onReject}
                title="Reject"
                className="w-8 h-8 rounded-full bg-red-400/10 border border-red-400/30 text-red-400 flex items-center justify-center hover:bg-red-400/20 transition-all"
              >
                <XCircle size={14} />
              </button>
            )}
            {enq.status !== 'pending' && (
              <button
                onClick={onPending}
                title="Mark Pending"
                className="w-8 h-8 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 flex items-center justify-center hover:bg-amber-400/20 transition-all"
              >
                <Clock size={14} />
              </button>
            )}
            <button
              onClick={onDelete}
              title="Delete"
              className="w-8 h-8 rounded-full bg-white/5 border border-white/10 text-white/30 flex items-center justify-center hover:bg-red-400/10 hover:text-red-400 hover:border-red-400/30 transition-all"
            >
              <Trash2 size={13} />
            </button>
            <button
              onClick={onToggle}
              className="w-8 h-8 rounded-full bg-white/5 border border-white/10 text-white/40 flex items-center justify-center hover:border-gold-400/40 hover:text-gold-400 transition-all"
            >
              {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          </div>
        </div>
      </div>

      {/* Expanded details */}
      {isExpanded && (
        <div className="border-t border-white/5 px-5 py-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <Detail icon={Mail} label="Email" value={enq.email} />
          <Detail icon={Phone} label="Phone / WhatsApp" value={enq.phone} />
          <Detail icon={Globe} label="Country" value={enq.country || '—'} />
          <Detail icon={Star} label="Package" value={`${enq.package}${enq.packagePrice > 0 ? ` (+AED ${enq.packagePrice.toLocaleString()}/night)` : ''}`} />
          <Detail icon={Calendar} label="Check-in" value={enq.checkin} />
          <Detail icon={Calendar} label="Check-out" value={enq.checkout} />
          <Detail icon={Users} label="Guests" value={`${enq.guests} guest${enq.guests > 1 ? 's' : ''}`} />
          <Detail label="Villa Rate" value={`AED ${enq.pricePerNight?.toLocaleString()} / night`} />
          <Detail label="Total" value={enq.totalAmount > 0 ? `AED ${enq.totalAmount.toLocaleString()} (${enq.nights} nights)` : '—'} gold />
          {enq.requests && (
            <div className="sm:col-span-2 lg:col-span-3 bg-white/3 rounded-xl p-4 border border-white/5">
              <p className="text-white/30 text-[10px] tracking-wider uppercase mb-1.5">Special Requests</p>
              <p className="text-white/60 text-sm font-light leading-relaxed">{enq.requests}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function Detail({ icon: Icon, label, value, gold }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 mb-1">
        {Icon && <Icon size={11} className="text-gold-400/60" />}
        <p className="text-white/30 text-[10px] tracking-wider uppercase">{label}</p>
      </div>
      <p className={`text-sm font-medium ${gold ? 'gold-text font-serif text-base' : 'text-white/70'}`}>
        {value}
      </p>
    </div>
  )
}

function StatCard({ label, value, color }) {
  const colors = {
    white:   'text-white',
    amber:   'text-amber-400',
    emerald: 'text-emerald-400',
    gold:    'gold-text font-serif',
  }
  return (
    <div className="glass rounded-2xl p-5 gold-border">
      <p className="text-white/30 text-[10px] tracking-wider uppercase mb-2">{label}</p>
      <p className={`text-2xl font-semibold ${colors[color] || 'text-white'}`}>{value}</p>
    </div>
  )
}
