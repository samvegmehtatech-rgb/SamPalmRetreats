import { useEffect, useState } from 'react'
import { CheckCircle, XCircle, X } from 'lucide-react'

// Simple global toast store
let listeners = []
export function showToast(message, type = 'success') {
  listeners.forEach((fn) => fn({ message, type, id: Date.now() }))
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState([])

  useEffect(() => {
    const handler = (toast) => {
      setToasts((prev) => [...prev, toast])
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toast.id))
      }, 4000)
    }
    listeners.push(handler)
    return () => { listeners = listeners.filter((l) => l !== handler) }
  }, [])

  const remove = (id) => setToasts((prev) => prev.filter((t) => t.id !== id))

  return (
    <div className="fixed top-24 right-4 z-[99990] flex flex-col gap-3 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="glass gold-border rounded-2xl px-5 py-4 flex items-center gap-3 shadow-2xl shadow-black/40 pointer-events-auto animate-slide-in min-w-[280px] max-w-sm"
        >
          {toast.type === 'success'
            ? <CheckCircle size={18} className="text-emerald-400 shrink-0" />
            : <XCircle size={18} className="text-red-400 shrink-0" />
          }
          <p className="text-white text-sm font-light flex-1">{toast.message}</p>
          <button onClick={() => remove(toast.id)} className="text-white/30 hover:text-white/60 transition-colors shrink-0">
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  )
}
