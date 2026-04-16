import { useEffect, useState } from 'react'
import ScreenWrapper from '../../components/layout/ScreenWrapper'
import PageHeader from '../../components/layout/PageHeader'
import { getWorkoutSessions } from '../../lib/stubs'

const LOC_EMOJI = { gym: '🏋️', home: '🏠', anywhere: '🤸' }

function fmtDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr + 'T00:00:00')
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const diff = Math.round((today - d) / (1000 * 60 * 60 * 24))
  if (diff === 0) return 'Today'
  if (diff === 1) return 'Yesterday'
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
}

export default function History() {
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getWorkoutSessions(20).then((data) => {
      setSessions(data)
      setLoading(false)
    })
  }, [])

  return (
    <ScreenWrapper>
      <PageHeader title="History" />
      <div className="px-5 flex flex-col gap-2.5">
        {loading && <p className="text-[12px] py-4 text-center" style={{ color: 'var(--text-sub)' }}>Loading...</p>}
        {!loading && sessions.length === 0 && (
          <div className="rounded-card p-6 text-center" style={{ background: 'var(--surface)' }}>
            <p className="text-[14px] font-semibold" style={{ color: 'var(--text)' }}>No sessions yet</p>
            <p className="mt-1 text-[12px]" style={{ color: 'var(--text-sub)' }}>Complete a workout to see it here.</p>
          </div>
        )}
        {sessions.map((s) => (
          <button key={s.id} type="button" className="rounded-card px-4 py-3 text-left" style={{ background: 'var(--surface)', minHeight: 72 }}>
            <p className="text-[11px]" style={{ color: 'var(--text-sub)' }}>{fmtDate(s.session_date)}</p>
            <p className="mt-1 text-[14px] font-semibold tracking-tight" style={{ color: 'var(--text)' }}>
              {LOC_EMOJI[s.location] ?? '🏋️'}&nbsp;&nbsp;{s.routine_type ?? 'Workout'}
            </p>
            <p className="mt-1 text-[12px]" style={{ color: 'var(--text-sub)' }}>
              {s.duration_minutes ?? '—'} min&nbsp;&nbsp;·&nbsp;&nbsp;{s.exercises_completed ?? '—'} exercises
            </p>
          </button>
        ))}
      </div>
    </ScreenWrapper>
  )
}
