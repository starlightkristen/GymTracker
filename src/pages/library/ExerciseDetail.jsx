import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ScreenWrapper from '../../components/layout/ScreenWrapper'
import PageHeader from '../../components/layout/PageHeader'
import { getExercises } from '../../lib/stubs'

export default function ExerciseDetail() {
  const { id } = useParams()
  const [ex, setEx] = useState(null)

  useEffect(() => {
    getExercises({ limit: 1000 }).then((all) => {
      const found = all.find((e) => e.id === id)
      setEx(found ?? null)
    })
  }, [id])

  if (!ex) {
    return (
      <ScreenWrapper>
        <PageHeader back backLabel="Library" title="Loading..." />
      </ScreenWrapper>
    )
  }

  const muscles = [ex.muscle_primary, ...(ex.muscle_secondary ?? [])].filter(Boolean).join(' · ')

  return (
    <ScreenWrapper>
      <PageHeader back backLabel="Library" title={ex.name} />
      <div className="px-5">
        <div className="flex gap-2 flex-wrap">
          <span className="px-2.5 py-1 rounded-pill text-[11px]" style={{ background: 'var(--cyan-dim)', color: 'var(--cyan)' }}>
            {ex.equipment}
          </span>
          <span className="px-2.5 py-1 rounded-pill text-[11px]" style={{ background: 'var(--surface-hi)', color: 'var(--text-sub)' }}>
            {muscles}
          </span>
        </div>

        {ex.gif_url && (
          <img
            src={ex.gif_url}
            alt={ex.name}
            className="mt-4 rounded-card w-full h-[200px] object-cover"
            style={{ background: 'var(--surface-hi)' }}
          />
        )}

        {ex.instructions?.length > 0 && (
          <div className="mt-4 rounded-card p-4" style={{ background: 'var(--surface)' }}>
            <p className="text-[12px]" style={{ color: 'var(--cyan)' }}>How to do it</p>
            <ol className="mt-2 flex flex-col gap-2.5">
              {ex.instructions.map((s, i) => (
                <li key={i} className="text-[12px]" style={{ color: 'var(--text-sub)' }}>
                  {i + 1}. {s}
                </li>
              ))}
            </ol>
          </div>
        )}

        <div className="mt-4 rounded-card p-4" style={{ background: 'var(--surface-hi)' }}>
          <p className="text-[10px] label-micro" style={{ color: 'var(--text-sub)' }}>
            Suggested starting point
          </p>
          <p className="mt-2 text-[15px] font-semibold" style={{ color: 'var(--text)' }}>
            {ex.default_sets} sets × {ex.default_reps ?? `${ex.default_hold_seconds}s hold`}
            &nbsp;&nbsp;·&nbsp;&nbsp;{ex.default_rest_seconds}s rest
          </p>
          <p className="mt-1 text-[11px]" style={{ color: 'var(--text-sub)' }}>
            {ex.difficulty} · Start light, full range of motion first
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
