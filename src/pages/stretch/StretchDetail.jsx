import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ScreenWrapper from '../../components/layout/ScreenWrapper'
import PageHeader from '../../components/layout/PageHeader'
import RestTimer from '../../components/ui/RestTimer'
import { getStretchSession } from '../../lib/stubs'

export default function StretchDetail() {
  const { id: category } = useParams()
  const navigate = useNavigate()
  const [exercises, setExercises] = useState([])
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    getStretchSession(category).then((data) => {
      setExercises(data)
      setCurrent(0)
    })
  }, [category])

  const ex = exercises[current]

  if (!ex) {
    return <ScreenWrapper><PageHeader back backLabel="Stretch" title="Loading..." /></ScreenWrapper>
  }

  const handleNext = () => {
    if (current < exercises.length - 1) setCurrent((c) => c + 1)
    else navigate('/discover/stretch')
  }

  return (
    <ScreenWrapper>
      <PageHeader back backLabel="Stretch" title={ex.name} />
      <div className="px-5">
        <div className="flex gap-2 flex-wrap">
          <span className="px-2.5 py-1 rounded-pill text-[11px]" style={{ background: 'var(--green-dim)', color: 'var(--green)' }}>
            {ex.muscle_primary} · Primary
          </span>
          <span className="px-2.5 py-1 rounded-pill text-[11px]" style={{ background: 'var(--surface-hi)', color: 'var(--text-sub)' }}>
            Hold {ex.default_hold_seconds ?? 45}s
          </span>
        </div>

        {ex.gif_url && <img src={ex.gif_url} alt={ex.name} className="mt-4 rounded-card w-full h-[180px] object-cover" style={{ background: 'var(--surface-hi)' }} />}
        {!ex.gif_url && (
          <div className="mt-4 rounded-card h-[180px] flex items-center justify-center" style={{ background: 'var(--surface-hi)' }}>
            <p className="text-[12px]" style={{ color: 'var(--text-sub)' }}>Stretch illustration</p>
          </div>
        )}

        {ex.instructions?.length > 0 && (
          <div className="mt-4 rounded-card p-4" style={{ background: 'var(--surface)' }}>
            <p className="text-[10px] label-micro" style={{ color: 'var(--green)' }}>How to do it</p>
            <ol className="mt-2 flex flex-col gap-2">
              {ex.instructions.map((s, i) => (
                <li key={i} className="text-[12px]" style={{ color: 'var(--text-sub)' }}>{i + 1}. {s}</li>
              ))}
            </ol>
          </div>
        )}

        <div className="mt-4">
          <RestTimer seconds={ex.default_hold_seconds ?? 45} />
        </div>

        <p className="mt-4 text-[11px] text-center" style={{ color: 'var(--text-sub)' }}>
          {current + 1} of {exercises.length}
        </p>

        <button type="button" onClick={handleNext}
          className="mt-3 w-full h-[52px] rounded-card font-bold text-[15px]"
          style={{ background: 'var(--green)', color: 'var(--bg)' }}>
          {current < exercises.length - 1 ? `Next: ${exercises[current + 1]?.name} →` : 'Done'}
        </button>
      </div>
    </ScreenWrapper>
  )
}
