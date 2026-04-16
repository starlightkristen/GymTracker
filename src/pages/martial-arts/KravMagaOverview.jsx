import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ScreenWrapper from '../../components/layout/ScreenWrapper'
import PageHeader from '../../components/layout/PageHeader'
import { getMartialArtsTechniques } from '../../lib/stubs'

const CATEGORIES = ['All', 'strikes', 'grabs', 'weapons', 'ground', 'principles', 'scenario']

const THREAT_COLORS = {
  high: { label: '⚡ High', color: 'var(--red)' },
  medium: { label: '◉ Medium', color: 'var(--amber)' },
  low: { label: '○ Low', color: 'var(--muted)' },
}

export default function KravMagaOverview() {
  const [cat, setCat] = useState('All')
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    getMartialArtsTechniques('krav_maga', cat === 'All' ? null : cat).then((data) => {
      setItems(data)
      setLoading(false)
    })
  }, [cat])

  return (
    <ScreenWrapper>
      <PageHeader back backLabel="Martial Arts" />
      <div className="px-5 text-center -mt-1">
        <p className="text-[30px] leading-none" style={{ color: 'var(--amber)' }}>🛡️</p>
        <h1 className="mt-3 text-[22px] font-semibold tracking-tight" style={{ color: 'var(--text)' }}>Krav Maga</h1>
        <p className="mt-1 text-[11px] label-micro" style={{ color: 'var(--text-sub)' }}>Practical self-defense</p>
      </div>

      <div className="px-5 mt-4">
        <div className="rounded-card px-4 py-3 text-[12px] font-medium" style={{ background: 'var(--amber-dim)', color: 'var(--amber)' }}>
          ⚠️&nbsp;&nbsp;Techniques are designed to cause injury.<br />Practice requires a qualified instructor.
        </div>
      </div>

      <div className="px-5 mt-4 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => {
          const active = cat === c
          return (
            <button key={c} type="button" onClick={() => setCat(c)}
              className="px-2.5 py-1 rounded-pill text-[11px] capitalize"
              style={{ background: active ? 'var(--amber)' : 'var(--surface)', color: active ? 'var(--bg)' : 'var(--text-sub)' }}
            >{c}</button>
          )
        })}
      </div>

      <div className="px-5 mt-4 flex flex-col gap-2.5">
        {loading && <p className="text-[12px] py-4 text-center" style={{ color: 'var(--text-sub)' }}>Loading...</p>}
        {!loading && items.length === 0 && <p className="text-[12px] py-4 text-center" style={{ color: 'var(--text-sub)' }}>No techniques found</p>}
        {items.map((t) => {
          const threat = THREAT_COLORS[t.threat_level] ?? THREAT_COLORS.medium
          return (
            <Link key={t.id} to={`/discover/martial-arts/krav-maga/scenario/${t.id}`}
              className="relative rounded-card px-4 py-3" style={{ background: 'var(--surface)', minHeight: 84 }}>
              <span className="absolute left-0 top-[10px] w-1 h-[64px] rounded-r-[2px]" style={{ background: 'var(--amber)' }} />
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[14px] font-semibold tracking-tight" style={{ color: 'var(--text)' }}>{t.name}</p>
                  <p className="mt-1 text-[11px] line-clamp-1" style={{ color: 'var(--text-sub)' }}>{t.description}</p>
                  <div className="mt-1.5 flex gap-2 items-center">
                    <span className="px-2.5 py-1 rounded-pill text-[11px]" style={{ background: 'var(--amber-dim)', color: 'var(--amber)' }}>{t.category}</span>
                    {t.threat_level && <span className="text-[11px]" style={{ color: threat.color }}>{threat.label}</span>}
                  </div>
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
