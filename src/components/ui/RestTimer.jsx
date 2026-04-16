import { useEffect, useRef, useState } from 'react'
import { Play, Pause, RotateCcw } from 'lucide-react'

const fmt = (s) => {
  const m = Math.floor(s / 60)
  const r = s % 60
  return `${m}:${String(r).padStart(2, '0')}`
}

export default function RestTimer({ seconds = 90, onComplete, onStart }) {
  const [remaining, setRemaining] = useState(seconds)
  const [running, setRunning] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    if (!running) return
    timerRef.current = setInterval(() => {
      setRemaining((s) => {
        if (s <= 1) {
          clearInterval(timerRef.current)
          setRunning(false)
          onComplete?.()
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [running, onComplete])

  const toggle = () => {
    if (!running && remaining === 0) setRemaining(seconds)
    if (!running) onStart?.()
    setRunning((r) => !r)
  }

  const reset = () => {
    setRunning(false)
    setRemaining(seconds)
  }

  return (
    <div
      className="w-full rounded-card px-4 flex items-center justify-between"
      style={{ background: 'var(--surface-hi)', minHeight: 60 }}
    >
      <div className="flex items-baseline gap-3">
        <span className="text-[10px] label-micro" style={{ color: 'var(--text-sub)' }}>
          Rest
        </span>
        <span className="text-[24px] font-semibold leading-none font-mono" style={{ color: 'var(--cyan)' }}>
          {fmt(remaining)}
        </span>
      </div>
      <div className="flex items-center gap-2">
        {remaining !== seconds && (
          <button
            type="button"
            onClick={reset}
            aria-label="Reset"
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: 'var(--surface)', color: 'var(--text-sub)' }}
          >
            <RotateCcw size={16} />
          </button>
        )}
        <button
          type="button"
          onClick={toggle}
          aria-label={running ? 'Pause' : 'Start'}
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: 'var(--cyan)', color: 'var(--bg)' }}
        >
          {running ? <Pause size={18} /> : <Play size={18} />}
        </button>
      </div>
    </div>
  )
}
