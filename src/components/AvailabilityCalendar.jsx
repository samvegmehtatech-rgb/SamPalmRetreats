import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const DAYS   = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']

function toStr(date) {
  return date.toISOString().split('T')[0]
}

function addMonths(date, n) {
  const d = new Date(date)
  d.setDate(1)
  d.setMonth(d.getMonth() + n)
  return d
}

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}

function isBefore(a, b) {
  return new Date(a) < new Date(b)
}

function isInRange(date, start, end) {
  if (!start || !end) return false
  const d = new Date(date), s = new Date(start), e = new Date(end)
  return d > s && d < e
}

/**
 * AvailabilityCalendar
 * @param {Set}      blockedDates  - Set of "YYYY-MM-DD" strings that are unavailable
 * @param {string}   checkin       - selected checkin date
 * @param {string}   checkout      - selected checkout date
 * @param {function} onChange      - called with ({ checkin, checkout })
 */
export default function AvailabilityCalendar({ blockedDates = new Set(), checkin, checkout, onChange }) {
  const today = toStr(new Date())
  const [viewDate, setViewDate] = useState(() => {
    const d = new Date()
    d.setDate(1)
    return d
  })
  const [selecting, setSelecting] = useState('checkin') // 'checkin' | 'checkout'
  const [hovered, setHovered] = useState(null)

  const prevMonth = () => setViewDate((d) => addMonths(d, -1))
  const nextMonth = () => setViewDate((d) => addMonths(d, 1))

  // Check if a range has any blocked date in it
  const rangeHasBlocked = (start, end) => {
    if (!start || !end) return false
    const s = new Date(start), e = new Date(end)
    for (let d = new Date(s); d <= e; d.setDate(d.getDate() + 1)) {
      if (blockedDates.has(toStr(d))) return true
    }
    return false
  }

  const handleDayClick = (dateStr) => {
    if (blockedDates.has(dateStr)) return
    if (isBefore(dateStr, today)) return

    if (selecting === 'checkin') {
      onChange({ checkin: dateStr, checkout: '' })
      setSelecting('checkout')
    } else {
      // checkout must be after checkin
      if (!isBefore(checkin, dateStr)) {
        // clicked before checkin — restart
        onChange({ checkin: dateStr, checkout: '' })
        setSelecting('checkout')
        return
      }
      // no blocked dates in range
      if (rangeHasBlocked(checkin, dateStr)) {
        onChange({ checkin: dateStr, checkout: '' })
        setSelecting('checkout')
        return
      }
      onChange({ checkin, checkout: dateStr })
      setSelecting('checkin')
    }
  }

  const renderMonth = (monthDate) => {
    const year  = monthDate.getFullYear()
    const month = monthDate.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = getDaysInMonth(year, month)

    const cells = []
    // Empty cells before first day
    for (let i = 0; i < firstDay; i++) cells.push(null)
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push(new Date(year, month, d))
    }

    return (
      <div key={`${year}-${month}`} className="flex-1 min-w-0">
        {/* Month header */}
        <p className="text-white font-semibold text-sm text-center mb-4 tracking-wide">
          {MONTHS[month]} {year}
        </p>

        {/* Day labels */}
        <div className="grid grid-cols-7 mb-2">
          {DAYS.map((d) => (
            <div key={d} className="text-white/30 text-[10px] text-center font-medium uppercase tracking-wider py-1">
              {d}
            </div>
          ))}
        </div>

        {/* Day cells */}
        <div className="grid grid-cols-7 gap-y-1">
          {cells.map((date, i) => {
            if (!date) return <div key={`empty-${i}`} />
            const str       = toStr(date)
            const isPast    = str < today
            const isBlocked = blockedDates.has(str)
            const isCheckin  = str === checkin
            const isCheckout = str === checkout
            const hoverEnd  = selecting === 'checkout' && hovered && checkin && !isBefore(hovered, checkin) ? hovered : null
            const inRange   = isInRange(str, checkin, checkout || hoverEnd)
            const isToday   = str === today
            const disabled  = isPast || isBlocked

            let cellClass = 'relative flex items-center justify-center text-xs h-8 rounded-lg transition-all duration-150 select-none '

            if (isCheckin || isCheckout) {
              cellClass += 'gold-gradient-bg text-navy-900 font-bold shadow-lg shadow-gold-400/30 '
            } else if (inRange) {
              cellClass += 'bg-gold-400/15 text-gold-400 rounded-none '
            } else if (disabled) {
              cellClass += 'text-white/15 cursor-not-allowed line-through '
            } else {
              cellClass += 'text-white/70 hover:bg-white/10 hover:text-white cursor-pointer '
            }

            if (isToday && !isCheckin && !isCheckout) {
              cellClass += 'ring-1 ring-gold-400/40 '
            }

            return (
              <div
                key={str}
                className={cellClass}
                onClick={() => !disabled && handleDayClick(str)}
                onMouseEnter={() => setHovered(str)}
                onMouseLeave={() => setHovered(null)}
                title={isBlocked ? 'Not available' : undefined}
              >
                {date.getDate()}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  const nextMonthDate = addMonths(viewDate, 1)

  // Prevent going back before current month
  const canGoPrev = viewDate > new Date(new Date().getFullYear(), new Date().getMonth(), 1)

  return (
    <div className="glass rounded-2xl p-5 gold-border">
      {/* Instruction */}
      <p className="text-gold-400 text-xs tracking-wider uppercase text-center mb-4">
        {selecting === 'checkin' ? '→ Select check-in date' : '→ Now select check-out date'}
      </p>

      {/* Navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          disabled={!canGoPrev}
          className="w-8 h-8 rounded-full glass-light flex items-center justify-center text-white/50 hover:text-gold-400 hover:border-gold-400/40 transition-all disabled:opacity-20 disabled:cursor-not-allowed border border-white/10"
        >
          <ChevronLeft size={14} />
        </button>
        <button
          onClick={nextMonth}
          className="w-8 h-8 rounded-full glass-light flex items-center justify-center text-white/50 hover:text-gold-400 hover:border-gold-400/40 transition-all border border-white/10"
        >
          <ChevronRight size={14} />
        </button>
      </div>

      {/* Two-month grid */}
      <div className="flex gap-6">
        {renderMonth(viewDate)}
        <div className="w-px bg-white/5 shrink-0" />
        {renderMonth(nextMonthDate)}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-5 pt-4 border-t border-white/5 flex-wrap">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 gold-gradient-bg rounded-sm" />
          <span className="text-white/40 text-[10px] uppercase tracking-wider">Selected</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 bg-gold-400/15 rounded-sm" />
          <span className="text-white/40 text-[10px] uppercase tracking-wider">Your stay</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 bg-white/10 rounded-sm flex items-center justify-center">
            <span className="text-white/20 text-[8px] line-through">8</span>
          </div>
          <span className="text-white/40 text-[10px] uppercase tracking-wider">Unavailable</span>
        </div>
      </div>
    </div>
  )
}
