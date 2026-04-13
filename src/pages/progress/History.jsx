import ScreenWrapper from '../../components/layout/ScreenWrapper'
import PageHeader from '../../components/layout/PageHeader'

const SESSIONS = [
  { date: 'Today, Tue Apr 8', emoji: '🏋️', name: 'Push Day', meta: '42 min  ·  6 exercises' },
  { date: 'Sun Apr 6', emoji: '🏋️', name: 'Legs', meta: '38 min  ·  5 exercises' },
  { date: 'Fri Apr 4', emoji: '🏋️', name: 'Pull Day', meta: '45 min  ·  6 exercises' },
  { date: 'Wed Apr 2', emoji: '🏠', name: 'Barbell Push', meta: '35 min  ·  4 exercises' },
  { date: 'Tue Apr 1', emoji: '🏋️', name: 'Push Day', meta: '40 min  ·  6 exercises' },
  { date: 'Sun Mar 30', emoji: '🏠', name: 'Bodyweight', meta: '28 min  ·  5 exercises' },
]

export default function History() {
  return (
    <ScreenWrapper>
      <PageHeader title="History" />
      <div className="px-5 flex flex-col gap-2.5">
        {SESSIONS.map((s, i) => (
          <button
            key={i}
            type="button"
            className="rounded-card px-4 py-3 text-left"
            style={{ background: 'var(--surface)', minHeight: 72 }}
          >
            <p className="text-[11px]" style={{ color: 'var(--text-sub)' }}>{s.date}</p>
            <p className="mt-1 text-[14px] font-bold" style={{ color: 'var(--text)' }}>
              {s.emoji}&nbsp;&nbsp;{s.name}
            </p>
            <p className="mt-1 text-[12px]" style={{ color: 'var(--text-sub)' }}>{s.meta}</p>
          </button>
        ))}
      </div>
    </ScreenWrapper>
  )
}
