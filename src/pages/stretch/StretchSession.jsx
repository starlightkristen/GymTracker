import { useEffect, useState } from 'react'
import ScreenWrapper from '../../components/layout/ScreenWrapper'
import PageHeader from '../../components/layout/PageHeader'

const TOTAL = 7
const CURRENT = 3

export default function StretchSession() {
  const [seconds, setSeconds] = useState(32)

  useEffect(() => {
    if (seconds <= 0) return
    const t = setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000)
    return () => clearInterval(t)
  }, [seconds])

  const fmt = (s) => {
    const m = Math.floor(s / 60)
    const r = s % 60
    return `${m}:${String(r).padStart(2, '0')}`
  }

  return (
    <ScreenWrapper>
      <PageHeader back backLabel="Lower Body Focus" />
      <div className="px-5">
        <div className="h-1 rounded-[2px] relative" style={{ background: 'var(--surface-hi)' }}>
          <div
            className="absolute left-0 top-0 h-1 rounded-[2px]"
            style={{ background: 'var(--green)', width: `${(CURRENT / TOTAL) * 100}%` }}
          />
        </div>
        <p className="mt-2 text-[12px]" style={{ color: 'var(--text-sub)' }}>
          {CURRENT} of {TOTAL} stretches
        </p>
        <h1 className="mt-3 text-[22px] font-semibold tracking-tight" style={{ color: 'var(--text)' }}>Hip Flexor Lunge</h1>
        <span
          className="inline-flex mt-3 px-2.5 py-1 rounded-pill text-[11px]"
          style={{ background: 'var(--green-dim)', color: 'var(--green)' }}
        >
          Hip Flexors · Primary
        </span>

        <div
          className="mt-4 rounded-card h-[200px] flex items-center justify-center"
          style={{ background: 'var(--surface-hi)' }}
        >
          <p className="text-[12px]" style={{ color: 'var(--text-sub)' }}>Animated GIF</p>
        </div>

        <div className="mt-4 rounded-card p-4 text-[13px]" style={{ background: 'var(--surface)', color: 'var(--text)' }}>
          Step right foot forward into lunge. Drop left knee to floor. Drive hips forward.
          Keep torso upright. Feel stretch in left hip.
        </div>

        <div
          className="mt-4 rounded-card py-5 text-center"
          style={{ background: 'var(--green-dim)', color: 'var(--green)' }}
        >
          <p className="text-[32px] font-semibold leading-none font-mono tracking-tight">{fmt(seconds)}</p>
          <p className="mt-3 text-[11px] label-micro">Hold — breathe deeply</p>
        </div>

        <div
          className="mt-3 rounded-card h-11 flex items-center justify-center text-[13px]"
          style={{ background: 'var(--amber-dim)', color: 'var(--amber)' }}
        >
          ⚡ Switch sides — repeat on opposite leg
        </div>

        <button
          type="button"
          className="mt-5 w-full h-[52px] rounded-card font-bold text-[15px]"
          style={{ background: 'var(--green)', color: 'var(--bg)' }}
        >
          Next Stretch →
        </button>
      </div>
    </ScreenWrapper>
  )
}
