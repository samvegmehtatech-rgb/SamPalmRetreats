import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getAnalytics, logEvent } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: "AIzaSyDBh0QX_PL_h5icOzmpcF-cLi-11up7SgI",
  authDomain: "sampalmretreats.firebaseapp.com",
  projectId: "sampalmretreats",
  storageBucket: "sampalmretreats.firebasestorage.app",
  messagingSenderId: "947425411669",
  appId: "1:947425411669:web:49cd9fa1d1c69ce27e8adc",
  measurementId: "G-F4M4BYVN8H"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
export const analytics = getAnalytics(app)

// Helper to track custom events anywhere in the app
export const track = (eventName, params = {}) => {
  logEvent(analytics, eventName, params)
}
