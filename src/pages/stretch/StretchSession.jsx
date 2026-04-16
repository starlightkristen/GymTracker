import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ScreenWrapper from '../../components/layout/ScreenWrapper'
import PageHeader from '../../components/layout/PageHeader'
import { getStretchSession } from '../../lib/stubs'

export default function StretchSession() {
  const navigate = useNavigate()
  const [exercises, setExercises] = useState([])
  const [current, setCurrent] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    getStretchSession('lower_body').then((data) => {
      setExercises(data)
      if (data.length > 0) setSeconds(data[0].default_hold_seconds ?? 45)
    })
  }, [])

  useEffect(() => {
    if (!running || seconds <= 0) return
    const t = setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000)
    return () => clearInterval(t)
  }, [running, seconds])

  const ex = exercises[current]
  const total = exercises.length
  const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

  const handleNext = () => {
    setRunning(false)
    if (current < total - 1) {
      setCurrent((c) => c + 1)
      setSeconds(exercises[current + 1]?.default_hold_seconds ?? 45)
    } else {
      navigate('/discover/stretch')
    }
  }

  if (!ex) return <ScreenWrapper><PageHeader back backLabel="Stretch" title="Loading..." /></ScreenWrapper>

  return (
    <ScreenWrapper>
      <PageHeader back backLabel="Stretch" />
      <div className="px-5">
        <div className="h-1 rounded-[2px] relative" style={{ background: 'var(--surface-hi)' }}>
          <div className="absolute left-0 top-0 h-1 rounded-[2px]" style={{ background: 'var(--green)', width: `${((current + 1) / total) * 100}%` }} />
        </div>
        <p className="mt-2 text-[12px]" style={{ color: 'var(--text-sub)' }}>{current + 1} of {total} stretches</p>

        <h1 className="mt-3 text-[22px] font-semibold tracking-tight" style={{ color: 'var(--text)' }}>{ex.name}</h1>
        <span className="inline-flex mt-3 px-2.5 py-1 rounded-pill text-[11px]" style={{ background: 'var(--green-dim)', color: 'var(--green)' }}>
          {ex.muscle_primary} · Primary
        </span>

        {ex.gif_url && <img src={ex.gif_url} alt={ex.name} className="mt-4 rounded-card w-full h-[200px] object-cover" style={{ background: 'var(--surface-hi)' }} />}
        {!ex.gif_url && (
          <div className="mt-4 rounded-card h-[200px] flex items-center justify-center" style={{ background: 'var(--surface-hi)' }}>
            <p className="text-[12px]" style={{ color: 'var(--text-sub)' }}>Stretch illustration</p>
          </div>
        )}

        {ex.instructions?.length > 0 && (
          <div className="mt-4 rounded-card p-4 text-[13px]" style={{ background: 'var(--surface)', color: 'var(--text)' }}>
            {ex.instructions.map((s, i) => <p key={i}>{s}</p>)}
          </div>
        )}

        <button type="button" onClick={() => setRunning((r) => !r)}
          className="mt-4 rounded-card py-5 w-full text-center" style={{ background: 'var(--green-dim)', color: 'var(--green)' }}>
          <p className="text-[32px] font-semibold leading-none font-mono tracking-tight">{fmt(seconds)}</p>
          <p className="mt-3 text-[11px] label-micro">{running ? 'Hold — breathe deeply' : 'Tap to start'}</p>
        </button>

        <button type="button" onClick={handleNext}
          className="mt-5 w-full h-[52px] rounded-card font-bold text-[15px]"
          style={{ background: 'var(--green)', color: 'var(--bg)' }}>
          {current < total - 1 ? 'Next Stretch →' : 'Done'}
        </button>
      </div>
    </ScreenWrapper>
  )
}
