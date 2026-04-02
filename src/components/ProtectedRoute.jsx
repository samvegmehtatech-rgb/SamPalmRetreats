import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { user } = useAuth()

  // Still checking auth state — show nothing to avoid flash
  if (user === undefined) {
    return (
      <div className="bg-navy-900 min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold-400/30 border-t-gold-400 rounded-full animate-spin" />
      </div>
    )
  }

  if (!user) return <Navigate to="/admin/login" replace />

  return children
}
