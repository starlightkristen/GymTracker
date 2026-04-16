import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, TrendingUp } from 'lucide-react'
import ScreenWrapper from '../../components/layout/ScreenWrapper'
import { saveWorkoutSession } from '../../lib/stubs'

const STATS = [
  { value: '4,200 lbs', label: 'Volume' },
  { value: '2', label: 'PRs Hit' },
  { value: '5 wks', label: 'Streak' },
]

export default function WorkoutComplete() {
  const navigate = useNavigate()
  const saved = useRef(false)

  useEffect(() => {
    if (saved.current) return
    saved.current = true
    saveWorkoutSession({
      routine_type: 'push',
      location: 'gym',
      duration_minutes: 42,
      exercises_completed: 6,
      total_volume_lbs: 4200,
      prs_hit: [],
    })
  }, [])

  return (
    <ScreenWrapper>
      <div className="pt-20 pb-8 text-center flex flex-col items-center">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center"
          style={{ background: 'var(--cyan-dim)' }}
        >
          <Check size={28} strokeWidth={2.5} style={{ color: 'var(--cyan)' }} />
        </div>
        <p className="mt-5 text-[11px] label-micro" style={{ color: 'var(--cyan)' }}>
          Session complete
        </p>
        <h1 className="mt-1 text-[24px] font-semibold tracking-tight" style={{ color: 'var(--text)' }}>
          Nice work.
        </h1>
        <p className="mt-2 text-[12px]" style={{ color: 'var(--text-sub)' }}>
          Push Day&nbsp;·&nbsp;6 exercises&nbsp;·&nbsp;42 min
        </p>
      </div>

      <div className="px-5 grid grid-cols-3 gap-2">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="rounded-card text-center py-3"
            style={{ background: 'var(--surface)', minHeight: 72 }}
          >
            <p className="text-[20px] font-semibold leading-none font-mono" style={{ color: 'var(--cyan)' }}>
              {s.value}
            </p>
            <p className="mt-2 text-[10px] label-micro" style={{ color: 'var(--text-sub)' }}>
              {s.label}
            </p>
          </div>
        ))}
      </div>

      <div className="px-5 mt-4">
        <div
          className="rounded-card h-12 flex items-center justify-center text-[12px] font-medium gap-2.5"
          style={{ background: 'var(--amber-dim)', color: 'var(--amber)' }}
        >
          <TrendingUp size={14} strokeWidth={2.25} />
          <span>2 new PRs this session — tap to see</span>
        </div>
      </div>

      <div className="px-5 mt-8 flex flex-col gap-3">
        <button
          type="button"
          onClick={() => navigate('/today')}
          className="w-full h-[52px] rounded-card font-bold text-[15px]"
          style={{ background: 'var(--cyan)', color: 'var(--bg)' }}
        >
          Back to Today
        </button>
        <button
          type="button"
          className="w-full h-11 rounded-card text-[14px] font-medium"
          style={{ background: 'var(--surface-hi)', color: 'var(--text-sub)' }}
        >
          Share Workout
        </button>
      </div>
    </ScreenWrapper>
  )
}
