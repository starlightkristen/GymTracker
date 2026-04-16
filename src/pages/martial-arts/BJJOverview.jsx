import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ScreenWrapper from '../../components/layout/ScreenWrapper'
import PageHeader from '../../components/layout/PageHeader'
import { getMartialArtsTechniques } from '../../lib/stubs'

const TYPE_COLORS = {
  Submission: { color: 'var(--red)', bg: 'var(--red-dim)' },
  Sweep: { color: 'var(--amber)', bg: 'var(--amber-dim)' },
  Escape: { color: 'var(--cyan)', bg: 'var(--cyan-dim)' },
  Position: { color: 'var(--purple)', bg: 'var(--purple-dim)' },
}

function categoryLabel(cat) {
  return cat?.replace(/_/g, ' ') ?? ''
}

export default function BJJOverview() {
  const [view, setView] = useState('techniques')
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    getMartialArtsTechniques('bjj', null).then((data) => {
      const filtered = view === 'techniques'
        ? data.filter((t) => t.content_type === 'technique')
        : data.filter((t) => t.content_type === 'position')
      setItems(filtered)
      setLoading(false)
    })
  }, [view])

  return (
    <ScreenWrapper>
      <PageHeader back backLabel="Martial Arts" />
      <div className="px-5 text-center -mt-1">
        <p className="text-[30px] leading-none" style={{ color: 'var(--purple)' }}>🤼</p>
        <h1 className="mt-3 text-[22px] font-semibold tracking-tight" style={{ color: 'var(--text)' }}>Brazilian Jiu-Jitsu</h1>
      </div>

      <div className="px-5 mt-4 flex gap-2">
        <button type="button" onClick={() => setView('techniques')}
          className="flex-1 h-10 rounded-card text-[13px] font-medium"
          style={{ background: view === 'techniques' ? 'var(--purple)' : 'var(--surface-hi)', color: view === 'techniques' ? 'var(--bg)' : 'var(--text-sub)' }}>
          Techniques
        </button>
        <Link to="/discover/martial-arts/bjj/map"
          className="flex-1 h-10 rounded-card text-[13px] font-medium flex items-center justify-center"
          style={{ background: 'var(--surface-hi)', color: 'var(--text-sub)' }}>
          Position Map
        </Link>
      </div>

      <div className="px-5 mt-4 flex flex-col gap-2.5">
        {loading && <p className="text-[12px] py-4 text-center" style={{ color: 'var(--text-sub)' }}>Loading...</p>}
        {!loading && items.length === 0 && <p className="text-[12px] py-4 text-center" style={{ color: 'var(--text-sub)' }}>No techniques found</p>}
        {items.map((t) => {
          const typeKey = categoryLabel(t.category).split(' ').pop()
          const typeStyle = TYPE_COLORS[typeKey] ?? { color: 'var(--muted)', bg: 'var(--surface-hi)' }
          return (
            <Link key={t.id} to={`/discover/martial-arts/bjj/technique/${t.id}`}
              className="relative rounded-card px-4 py-3" style={{ background: 'var(--surface)', minHeight: 72 }}>
              <span className="absolute left-0 top-[10px] w-1 h-[52px] rounded-r-[2px]" style={{ background: typeStyle.color }} />
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[14px] font-semibold tracking-tight" style={{ color: 'var(--text)' }}>{t.name}</p>
                  <p className="mt-1 text-[11px] line-clamp-1" style={{ color: 'var(--text-sub)' }}>{t.description}</p>
                  <div className="mt-1.5 flex gap-2">
                    <span className="px-2.5 py-1 rounded-pill text-[11px]" style={{ background: typeStyle.bg, color: typeStyle.color }}>{categoryLabel(t.category)}</span>
                    <span className="px-2.5 py-1 rounded-pill text-[11px]" style={{ background: 'var(--surface-hi)', color: 'var(--text-sub)' }}>{t.difficulty}</span>
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
