import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ScreenWrapper from '../../components/layout/ScreenWrapper'
import PageHeader from '../../components/layout/PageHeader'
import { getStretchCategories } from '../../lib/stubs'

const CATEGORY_META = {
  morning: { emoji: '🌅', accent: 'var(--amber)', tagBg: 'var(--amber-dim)', tag: 'Daily' },
  pre_workout: { emoji: '🏋️', accent: 'var(--cyan)', tagBg: 'var(--cyan-dim)', tag: 'Before workout' },
  post_workout: { emoji: '🧊', accent: 'var(--green)', tagBg: 'var(--green-dim)', tag: 'After workout' },
  lower_body: { emoji: '🦵', accent: 'var(--coral)', tagBg: 'var(--coral-dim)', tag: '15–20 min' },
  upper_body: { emoji: '💪', accent: 'var(--cyan)', tagBg: 'var(--cyan-dim)', tag: '15–20 min' },
  full_body: { emoji: '🌀', accent: 'var(--purple)', tagBg: 'var(--purple-dim)', tag: '20–30 min' },
  hip_spine: { emoji: '🧘', accent: 'var(--green)', tagBg: 'var(--green-dim)', tag: '10–15 min' },
  evening: { emoji: '😴', accent: 'var(--purple)', tagBg: 'var(--purple-dim)', tag: '10–15 min' },
}

export default function StretchHome() {
  const [categories, setCategories] = useState([])

  useEffect(() => { getStretchCategories().then(setCategories) }, [])

  return (
    <ScreenWrapper>
      <PageHeader back backLabel="Discover" title={<span>Stretch &amp;<br />Flexibility</span>} />
      <div className="px-5 flex flex-col gap-2.5">
        {categories.map((c) => {
          const meta = CATEGORY_META[c.slug] ?? { emoji: '🧘', accent: 'var(--cyan)', tagBg: 'var(--cyan-dim)', tag: '' }
          return (
            <Link key={c.slug} to={`/discover/stretch/${c.slug}`}
              className="relative rounded-card px-4 py-3" style={{ background: 'var(--surface)', minHeight: 76 }}>
              <span className="absolute left-0 top-[10px] w-1 h-[56px] rounded-r-[2px]" style={{ background: meta.accent }} />
              <div className="flex items-start gap-3">
                <span className="text-[22px] leading-none">{meta.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-semibold tracking-tight" style={{ color: 'var(--text)' }}>{c.label}</p>
                  <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-sub)' }}>{c.count} exercises</p>
                  <span className="inline-flex mt-1.5 px-2.5 py-1 rounded-pill text-[11px]" style={{ background: meta.tagBg, color: meta.accent }}>
                    {meta.tag}
                  </span>
                </div>
                <span className="text-[18px] self-center" style={{ color: 'var(--muted)' }}>›</span>
              </div>
            </Link>
          )
        })}
      </div>
    </ScreenWrapper>
  )
}
