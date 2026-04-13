import { useNavigate } from 'react-router-dom'
import ScreenWrapper from '../../components/layout/ScreenWrapper'
import PageHeader from '../../components/layout/PageHeader'
import RestTimer from '../../components/ui/RestTimer'

const STEPS = [
  'Stand tall, feet hip-width apart.',
  'Hinge at hips, keep back flat — not rounded.',
  'Lower hands toward feet until tension felt.',
  'Hold 30–60 seconds, breathe deeply.',
  'Micro-bend knees if hamstrings are tight.',
]

export default function StretchDetail() {
  const navigate = useNavigate()

  return (
    <ScreenWrapper>
      <PageHeader back backLabel="Lower Body Focus" title={<span>Standing<br />Hamstring Stretch</span>} />
      <div className="px-5">
        <div className="flex gap-2 flex-wrap">
          <span className="px-2.5 py-1 rounded-pill text-[11px]" style={{ background: 'var(--green-dim)', color: 'var(--green)' }}>
            Hamstrings · Primary
          </span>
          <span className="px-2.5 py-1 rounded-pill text-[11px]" style={{ background: 'var(--surface-hi)', color: 'var(--text-sub)' }}>
            Static · Hold 30–60s
          </span>
        </div>

        <div
          className="mt-4 rounded-card h-[180px] flex items-center justify-center"
          style={{ background: 'var(--surface-hi)' }}
        >
          <p className="text-[12px]" style={{ color: 'var(--text-sub)' }}>Animated GIF — ExerciseDB / Wger</p>
        </div>

        <div className="mt-4 rounded-card p-4" style={{ background: 'var(--surface)' }}>
          <p className="text-[12px]" style={{ color: 'var(--green)' }}>How to do it</p>
          <ol className="mt-2 flex flex-col gap-2">
            {STEPS.map((s, i) => (
              <li key={i} className="text-[12px]" style={{ color: 'var(--text-sub)' }}>
                {i + 1}. {s}
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-4">
          <RestTimer seconds={45} />
        </div>

        <button
          type="button"
          onClick={() => navigate('/discover/stretch/session')}
          className="mt-6 w-full h-[52px] rounded-card font-bold text-[15px]"
          style={{ background: 'var(--green)', color: 'var(--bg)' }}
        >
          Next: Quad Stretch →
        </button>
      </div>
    </ScreenWrapper>
  )
}
