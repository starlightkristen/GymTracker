import { useEffect, useState } from 'react'
import { TrendingUp } from 'lucide-react'
import ScreenWrapper from '../../components/layout/ScreenWrapper'
import PageHeader from '../../components/layout/PageHeader'
import { getStats } from '../../lib/stubs'

const STAT_CARDS = [
  { key: 'workouts', label: 'Workouts', sub: 'this month', formatter: (v) => v },
  { key: 'prs', label: 'PRs Hit', sub: 'personal records', formatter: (v) => v },
  { key: 'volume', label: 'Volume', sub: 'lbs lifted', formatter: (v) => `${(v / 1000).toFixed(1)}k` },
  { key: 'streak', label: 'Streak', sub: 'weeks', formatter: (v) => v },
]

const CHART_HEIGHTS = [46, 60, 55, 73, 69, 87, 83, 101, 96, 110]

export default function Progress() {
  const [stats, setStats] = useState(null)
  useEffect(() => {
    getStats().then(setStats)
  }, [])

  return (
    <ScreenWrapper>
      <PageHeader title="Progress" subtitle="Last 30 days" />
      <div className="px-5">
        <div className="grid grid-cols-2 gap-3">
          {STAT_CARDS.map((s) => (
            <div
              key={s.key}
              className="rounded-card px-4 py-3"
              style={{ background: 'var(--surface)', minHeight: 76 }}
            >
              <p className="text-[22px] font-semibold leading-none font-mono" style={{ color: 'var(--cyan)' }}>
                {stats ? s.formatter(stats[s.key]) : '—'}
              </p>
              <p className="mt-3 text-[10px] label-micro" style={{ color: 'var(--text)' }}>{s.label}</p>
              <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-sub)' }}>{s.sub}</p>
            </div>
          ))}
        </div>

        <p className="mt-5 text-[15px]" style={{ color: 'var(--text)' }}>Lift Trend</p>
        <button
          type="button"
          className="mt-2 rounded-card w-full h-10 px-3 text-left text-[14px] font-medium"
          style={{ background: 'var(--surface-hi)', color: 'var(--text)' }}
        >
          Chest Press&nbsp;&nbsp;▾
        </button>

        <div
          className="mt-3 rounded-card p-4 h-[140px] flex items-end gap-1.5"
          style={{ background: 'var(--surface)' }}
        >
          {CHART_HEIGHTS.map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded"
              style={{
                background: 'var(--cyan)',
                height: `${h}%`,
                opacity: 0.3 + (i / CHART_HEIGHTS.length) * 0.7,
              }}
            />
          ))}
        </div>

        <div
          className="mt-4 rounded-card h-11 flex items-center gap-2.5 px-4 text-[12px] font-medium"
          style={{ background: 'var(--cyan-dim)', color: 'var(--cyan)' }}
        >
          <TrendingUp size={14} strokeWidth={2.25} />
          <span>New PR — Chest Press, 105 lbs this week</span>
        </div>
      </div>
    </ScreenWrapper>
  )
}
