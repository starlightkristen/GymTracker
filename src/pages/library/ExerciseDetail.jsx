import ScreenWrapper from '../../components/layout/ScreenWrapper'
import PageHeader from '../../components/layout/PageHeader'

const STEPS = [
  'Adjust seat so handles align with mid-chest.',
  'Grip handles, elbows at 90° to start.',
  'Press forward until arms are nearly straight.',
  'Return slowly — 3 seconds back is ideal.',
  'Keep core tight, back flat against pad.',
]

export default function ExerciseDetail() {
  return (
    <ScreenWrapper>
      <PageHeader back backLabel="Library" title={<span>Chest Press<br />Machine</span>} />
      <div className="px-5">
        <div className="flex gap-2 flex-wrap">
          <span className="px-2.5 py-1 rounded-pill text-[11px]" style={{ background: 'var(--cyan-dim)', color: 'var(--cyan)' }}>
            🏋️&nbsp;&nbsp;Planet Fitness
          </span>
          <span className="px-2.5 py-1 rounded-pill text-[11px]" style={{ background: 'var(--surface-hi)', color: 'var(--text-sub)' }}>
            Chest · Shoulders · Triceps
          </span>
        </div>

        <div className="mt-4 rounded-card p-4" style={{ background: 'var(--surface)' }}>
          <p className="text-[12px]" style={{ color: 'var(--cyan)' }}>How to do it</p>
          <ol className="mt-2 flex flex-col gap-2.5">
            {STEPS.map((s, i) => (
              <li key={i} className="text-[12px]" style={{ color: 'var(--text-sub)' }}>
                {i + 1}. {s}
              </li>
            ))}
          </ol>
        </div>

        <div
          className="mt-4 rounded-card p-4"
          style={{ background: 'var(--surface-hi)' }}
        >
          <p className="text-[11px] font-medium" style={{ color: 'var(--text-sub)' }}>
            Suggested starting point
          </p>
          <p className="mt-2 text-[15px] font-bold" style={{ color: 'var(--text)' }}>
            3 sets × 10 reps&nbsp;&nbsp;·&nbsp;&nbsp;90s rest
          </p>
          <p className="mt-1 text-[11px]" style={{ color: 'var(--text-sub)' }}>
            Start light, full range of motion first
          </p>
        </div>

        <button
          type="button"
          className="mt-6 w-full h-[52px] rounded-card font-bold text-[14px]"
          style={{ background: 'var(--cyan)', color: 'var(--bg)' }}
        >
          + Add to Today's Circuit
        </button>
      </div>
    </ScreenWrapper>
  )
}
