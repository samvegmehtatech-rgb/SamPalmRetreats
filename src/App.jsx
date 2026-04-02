import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import HomePage from './pages/HomePage'
import VillasPage from './pages/VillasPage'
import BookingPage from './pages/BookingPage'
import AdminPage from './pages/AdminPage'
import AdminLoginPage from './pages/AdminLoginPage'
import { track } from './firebase'

function PageTracker() {
  const location = useLocation()
  useEffect(() => {
    track('page_view', { page_path: location.pathname })
  }, [location])
  return null
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <PageTracker />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/villas" element={<VillasPage />} />
          <Route path="/book/:villaId" element={<BookingPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
