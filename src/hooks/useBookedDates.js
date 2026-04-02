import { useEffect, useState } from 'react'
import { collection, query, where, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'

/**
 * Returns a Set of date strings ("YYYY-MM-DD") that are blocked
 * based on confirmed or pending bookings in Firestore.
 */
export function useBookedDates() {
  const [blockedDates, setBlockedDates] = useState(new Set())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const q = query(
      collection(db, 'bookings'),
      where('status', 'in', ['confirmed', 'pending'])
    )

    const unsub = onSnapshot(q, (snap) => {
      const dates = new Set()
      snap.docs.forEach((doc) => {
        const { checkin, checkout } = doc.data()
        if (!checkin || !checkout) return
        const start = new Date(checkin)
        const end   = new Date(checkout)
        // Block every date in the range (inclusive)
        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
          dates.add(d.toISOString().split('T')[0])
        }
      })
      setBlockedDates(dates)
      setLoading(false)
    })

    return () => unsub()
  }, [])

  return { blockedDates, loading }
}
