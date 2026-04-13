import { useState } from 'react'
import { GripVertical, X } from 'lucide-react'
import ScreenWrapper from '../../components/layout/ScreenWrapper'
import PageHeader from '../../components/layout/PageHeader'

const INITIAL = [
  'Chest Press Machine',
  'Incline Dumbbell Press',
  'Cable Fly',
  'Shoulder Press',
  'Lateral Raise',
  'Tricep Pushdown',
]

export default function RoutineEditor() {
  const [items, setItems] = useState(INITIAL)

  const remove = (i) => setItems((prev) => prev.filter((_, idx) => idx !== i))

  return (
    <ScreenWrapper>
      <PageHeader back backLabel="Templates" title="Push Day" subtitle="Drag to reorder · Tap to edit" />
      <div className="px-5 flex flex-col gap-2.5">
        {items.map((name, i) => (
          <div
            key={i}
            className="rounded-card h-13 px-3 flex items-center gap-3"
            style={{ background: 'var(--surface)', minHeight: 52 }}
          >
            <span className="text-[12px] font-bold w-5" style={{ color: 'var(--cyan)' }}>{i + 1}</span>
            <span className="flex-1 text-[13px]" style={{ color: 'var(--text)' }}>{name}</span>
            <button type="button" aria-label="Drag" style={{ color: 'var(--muted)' }}>
              <GripVertical size={16} />
            </button>
            <button
              type="button"
              onClick={() => remove(i)}
              aria-label={`Remove ${name}`}
              style={{ color: 'var(--red)' }}
            >
              <X size={14} />
            </button>
          </div>
        ))}

        <button
          type="button"
          className="rounded-card h-11 text-[14px]"
          style={{ background: 'var(--cyan-dim)', color: 'var(--cyan)' }}
        >
          + Add Exercise
        </button>

        <button
          type="button"
          className="mt-4 w-full h-[52px] rounded-card font-bold text-[15px]"
          style={{ background: 'var(--cyan)', color: 'var(--bg)' }}
        >
          Save Routine
        </button>
      </div>
    </ScreenWrapper>
  )
}
