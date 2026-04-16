import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ScreenWrapper from '../../components/layout/ScreenWrapper'
import PageHeader from '../../components/layout/PageHeader'
import { getExercises } from '../../lib/stubs'

const FILTERS = ['All', 'Chest', 'Back', 'Quads', 'Shoulders', 'Core', 'Biceps', 'Triceps', 'Hamstrings', 'Glutes']

const EQUIP_EMOJI = {
  'leverage machine': '🏋️',
  cable: '🏋️',
  barbell: '🏠',
  dumbbell: '💪',
  'body weight': '🤸',
  pilates_bar: '🧘',
  kettlebell: '🔔',
}

export default function ExerciseLibrary() {
  const [filter, setFilter] = useState('All')
  const [query, setQuery] = useState('')
  const [exercises, setExercises] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const filters = {}
    if (filter !== 'All') filters.muscle = filter.toLowerCase()
    if (query.length >= 2) filters.q = query
    getExercises(filters).then((data) => {
      setExercises(data)
      setLoading(false)
    })
  }, [filter, query])

  return (
    <ScreenWrapper>
      <PageHeader title="Exercise Library" />
      <div className="px-5">
        <div
          className="rounded-card h-11 flex items-center px-4"
          style={{ background: 'var(--surface)' }}
        >
          <span className="mr-2" style={{ color: 'var(--muted)' }}>🔍</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search exercises..."
            className="flex-1 bg-transparent outline-none text-[13px]"
            style={{ color: 'var(--text)' }}
          />
        </div>

        <div className="mt-3 flex flex-wrap gap-2 no-scrollbar">
          {FILTERS.map((f) => {
            const active = filter === f
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className="px-2.5 py-1 rounded-pill text-[11px] shrink-0"
                style={{
                  background: active ? 'var(--cyan)' : 'var(--surface)',
                  color: active ? 'var(--bg)' : 'var(--text-sub)',
                }}
              >
                {f}
              </button>
            )
          })}
        </div>

        <div className="mt-4 flex flex-col gap-2">
          {loading && (
            <p className="text-[12px] py-4 text-center" style={{ color: 'var(--text-sub)' }}>
              Loading...
            </p>
          )}
          {!loading && exercises.length === 0 && (
            <p className="text-[12px] py-4 text-center" style={{ color: 'var(--text-sub)' }}>
              No exercises found
            </p>
          )}
          {exercises.map((ex) => (
            <Link
              key={ex.id}
              to={`/library/${ex.id}`}
              className="rounded-card px-3 py-3 flex items-center gap-3"
              style={{ background: 'var(--surface)', minHeight: 56 }}
            >
              <span className="text-[18px]">{EQUIP_EMOJI[ex.equipment] ?? '🏋️'}</span>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] truncate" style={{ color: 'var(--text)' }}>{ex.name}</p>
                <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-sub)' }}>{ex.muscle_primary}</p>
              </div>
              <span className="text-[12px] font-mono shrink-0" style={{ color: 'var(--text-sub)' }}>
                {ex.default_sets}×{ex.default_reps ?? `${ex.default_hold_seconds}s`}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </ScreenWrapper>
  )
}
