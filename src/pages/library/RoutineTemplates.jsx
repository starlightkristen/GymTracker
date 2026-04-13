import { Link } from 'react-router-dom'
import ScreenWrapper from '../../components/layout/ScreenWrapper'
import PageHeader from '../../components/layout/PageHeader'

const TEMPLATES = [
  { id: '3day', name: '3-Day Split', sub: 'Push · Pull · Legs', cadence: '3x/week', note: 'Beginner friendly', accent: 'var(--cyan)' },
  { id: '4day', name: '4-Day Split', sub: 'Push · Pull · Legs · Full Body', cadence: '4x/week', note: 'Intermediate', accent: 'var(--coral)' },
  { id: '2day', name: '2-Day Split', sub: 'Upper · Lower', cadence: '2x/week', note: 'Minimum effective dose', accent: 'var(--amber)' },
  { id: 'fbhiit', name: 'Full Body HIIT', sub: 'Bodyweight circuits', cadence: '3x/week', note: 'Fat loss focus', accent: 'var(--coral)' },
  { id: 'pilates-str', name: 'Pilates + Strength', sub: 'Pilates bar + light weights', cadence: '4x/week', note: 'Low impact', accent: 'var(--amber)' },
  { id: 'home-barbell', name: 'Home Barbell', sub: 'Squat · Press · Deadlift', cadence: '3x/week', note: 'Strength focus', accent: 'var(--cyan)' },
]

export default function RoutineTemplates() {
  return (
    <ScreenWrapper>
      <PageHeader title={<span>Start from a<br />Template</span>} />
      <div className="px-5 flex flex-col gap-2.5">
        {TEMPLATES.map((t) => (
          <Link
            key={t.id}
            to={`/routines/${t.id}/edit`}
            className="relative rounded-card px-4 py-3"
            style={{ background: 'var(--surface)', minHeight: 84 }}
          >
            <span className="absolute left-0 top-[10px] w-1 h-[64px] rounded-r-[2px]" style={{ background: t.accent }} />
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[15px] font-bold" style={{ color: 'var(--text)' }}>{t.name}</p>
                <p className="mt-1 text-[12px]" style={{ color: 'var(--text-sub)' }}>{t.sub}</p>
                <div className="mt-2 flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded-pill text-[11px]" style={{ background: 'var(--surface-hi)', color: 'var(--text-sub)' }}>{t.cadence}</span>
                  <span className="text-[11px] font-medium" style={{ color: 'var(--text-sub)' }}>{t.note}</span>
                </div>
              </div>
              <span className="text-[20px] self-center" style={{ color: 'var(--muted)' }}>›</span>
            </div>
          </Link>
        ))}
      </div>
    </ScreenWrapper>
  )
}
