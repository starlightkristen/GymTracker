import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ScreenWrapper from '../../components/layout/ScreenWrapper'
import PageHeader from '../../components/layout/PageHeader'
import { getStretchCategories } from '../../lib/stubs'

const STATIC_CATEGORIES = [
  { slug: 'morning', emoji: '🌅', name: 'Morning Mobility', sub: 'Wake up joints, 10–15 min', tag: 'Daily', accent: 'var(--amber)', tagBg: 'var(--amber-dim)' },
  { slug: 'pre-workout', emoji: '🏋️', name: 'Pre-Workout Dynamic', sub: 'Activate muscles before training', tag: 'Before workout', accent: 'var(--cyan)', tagBg: 'var(--cyan-dim)' },
  { slug: 'post-workout', emoji: '🧊', name: 'Post-Workout Static', sub: 'Cool down, hold stretches', tag: 'After workout', accent: 'var(--green)', tagBg: 'var(--green-dim)' },
  { slug: 'lower-body', emoji: '🦵', name: 'Lower Body Focus', sub: 'Hips, hamstrings, quads, calves', tag: '15–20 min', accent: 'var(--coral)', tagBg: 'var(--coral-dim)' },
  { slug: 'upper-body', emoji: '💪', name: 'Upper Body Focus', sub: 'Chest, shoulders, lats, neck', tag: '15–20 min', accent: 'var(--cyan)', tagBg: 'var(--cyan-dim)' },
  { slug: 'full-body', emoji: '🌀', name: 'Full Body Flow', sub: 'Head to toe mobility sequence', tag: '20–30 min', accent: 'var(--purple)', tagBg: 'var(--purple-dim)' },
  { slug: 'hip-spine', emoji: '🧘', name: 'Hip Flexor & Spine', sub: 'Desk posture reset, deep release', tag: '10–15 min', accent: 'var(--green)', tagBg: 'var(--green-dim)' },
  { slug: 'evening', emoji: '😴', name: 'Evening Wind Down', sub: 'Parasympathetic, sleep prep', tag: '10–15 min', accent: 'var(--purple)', tagBg: 'var(--purple-dim)' },
]

export default function StretchHome() {
  const [, setCategories] = useState([])
  useEffect(() => {
    getStretchCategories().then(setCategories)
  }, [])

  return (
    <ScreenWrapper>
      <PageHeader back backLabel="Discover" title={<span>Stretch &amp;<br />Flexibility</span>} />
      <div className="px-5 flex flex-col gap-2.5">
        {STATIC_CATEGORIES.map((c) => (
          <Link
            key={c.slug}
            to={`/discover/stretch/${c.slug}`}
            className="relative rounded-card px-4 py-3"
            style={{ background: 'var(--surface)', minHeight: 76 }}
          >
            <span className="absolute left-0 top-[10px] w-1 h-[56px] rounded-r-[2px]" style={{ background: c.accent }} />
            <div className="flex items-start gap-3">
              <span className="text-[22px] leading-none">{c.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-bold" style={{ color: 'var(--text)' }}>{c.name}</p>
                <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-sub)' }}>{c.sub}</p>
                <span
                  className="inline-flex mt-1.5 px-2.5 py-1 rounded-pill text-[11px]"
                  style={{ background: c.tagBg, color: c.accent }}
                >
                  {c.tag}
                </span>
              </div>
              <span className="text-[18px] self-center" style={{ color: 'var(--muted)' }}>›</span>
            </div>
          </Link>
        ))}
      </div>
    </ScreenWrapper>
  )
}
