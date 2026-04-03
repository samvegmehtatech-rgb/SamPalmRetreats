import { useState, useEffect } from 'react'
import { collection, query, where, orderBy, getDocs, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'

export function useVillaReviews(villaId) {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!villaId) return
    const fetchReviews = async () => {
      try {
        const q = query(
          collection(db, 'villaReviews'),
          where('villaId', '==', villaId),
          orderBy('createdAt', 'desc')
        )
        const snap = await getDocs(q)
        setReviews(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
      } catch {
        setReviews([])
      } finally {
        setLoading(false)
      }
    }
    fetchReviews()
  }, [villaId])

  const submitReview = async ({ name, country, rating, text, stay }) => {
    const doc = await addDoc(collection(db, 'villaReviews'), {
      villaId,
      name,
      country,
      rating,
      text,
      stay,
      createdAt: serverTimestamp(),
    })
    const newReview = { id: doc.id, villaId, name, country, rating, text, stay, createdAt: new Date() }
    setReviews((prev) => [newReview, ...prev])
    return newReview
  }

  return { reviews, loading, submitReview }
}
