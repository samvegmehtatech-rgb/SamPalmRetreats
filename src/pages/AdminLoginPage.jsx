import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import { Mail, Lock, LogIn } from 'lucide-react'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/admin')
    } catch (err) {
      setError('Invalid email or password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-navy-900 min-h-screen flex items-center justify-center px-6 font-sans">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold-400/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="w-14 h-14 gold-gradient-bg rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl shadow-gold-400/30">
            <span className="text-navy-900 font-serif font-bold text-2xl">S</span>
          </div>
          <h1 className="font-serif text-3xl text-white font-semibold">
            Sam Palm <span className="gold-text italic">Retreats</span>
          </h1>
          <p className="text-white/40 text-sm mt-2 tracking-wider uppercase">Admin Panel</p>
        </div>

        {/* Card */}
        <form onSubmit={handleSubmit} className="glass rounded-3xl p-8 gold-border">
          <h2 className="text-white font-semibold text-lg mb-6">Sign in to continue</h2>

          <div className="space-y-4 mb-6">
            <div>
              <label className="text-white/40 text-xs tracking-wider uppercase block mb-2">Email</label>
              <div className="relative">
                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold-400" />
                <input
                  type="email"
                  required
                  placeholder="admin@sampalmretreats.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-gold-400/60 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-white/40 text-xs tracking-wider uppercase block mb-2">Password</label>
              <div className="relative">
                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold-400" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-gold-400/60 transition-colors"
                />
              </div>
            </div>
          </div>

          {error && (
            <p className="text-red-400 text-xs text-center mb-4">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full gold-gradient-bg text-navy-900 font-semibold py-3.5 rounded-xl text-sm hover:opacity-90 transition-all shadow-lg shadow-gold-400/20 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in…' : 'Sign In'}
            {!loading && <LogIn size={15} />}
          </button>
        </form>

        <p className="text-white/20 text-xs text-center mt-6">
          Sam Palm Retreats · Admin access only
        </p>
      </div>
    </div>
  )
}
