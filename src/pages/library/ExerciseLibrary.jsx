import { useState } from 'react'
import { Link } from 'react-router-dom'
import ScreenWrapper from '../../components/layout/ScreenWrapper'
import PageHeader from '../../components/layout/PageHeader'

const FILTERS = ['All', 'Chest', 'Back', 'Legs', 'Shoulders', 'Core']

const EXERCISES = [
  { id: 'chest-press-machine', emoji: '🏋️', name: 'Chest Press Machine', muscle: 'Chest', sets: '3×10' },
  { id: 'bench-press', emoji: '🏠', name: 'Bench Press (Barbell)', muscle: 'Chest', sets: '3×8' },
  { id: 'pushup', emoji: '🤸', name: 'Push-up', muscle: 'Chest', sets: '3×15' },
  { id: 'lat-pulldown', emoji: '🏋️', name: 'Lat Pulldown', muscle: 'Back', sets: '3×10' },
  { id: 'bent-over-row', emoji: '🏠', name: 'Bent Over Row', muscle: 'Back', sets: '3×10' },
  { id: 'leg-press', emoji: '🏋️', name: 'Leg Press', muscle: 'Quads', sets: '3×12' },
  { id: 'bw-squat', emoji: '🤸', name: 'Bodyweight Squat', muscle: 'Quads', sets: '3×20' },
  { id: 'lateral-raise', emoji: '🏋️', name: 'Lateral Raise', muscle: 'Shoulders', sets: '3×15' },
]

export default function ExerciseLibrary() {
  const [filter, setFilter] = useState('All')
  const [query, setQuery] = useState('')

  const items = EXERCISES.filter((e) => {
    if (filter !== 'All' && e.muscle !== filter) return false
    if (query && !e.name.toLowerCase().includes(query.toLowerCase())) return false
    return true
  })

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

        <div className="mt-3 flex flex-wrap gap-2">
          {FILTERS.map((f) => {
            const active = filter === f
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className="px-2.5 py-1 rounded-pill text-[11px]"
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
          {items.map((ex) => (
            <Link
              key={ex.id}
              to={`/library/${ex.id}`}
              className="rounded-card px-3 py-3 flex items-center gap-3"
              style={{ background: 'var(--surface)', minHeight: 56 }}
            >
              <span className="text-[18px]">{ex.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="text-[13px]" style={{ color: 'var(--text)' }}>{ex.name}</p>
                <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-sub)' }}>{ex.muscle}</p>
              </div>
              <span className="text-[12px]" style={{ color: 'var(--text-sub)' }}>{ex.sets}</span>
            </Link>
          ))}
        </div>
      </div>
    </ScreenWrapper>
  )
}
