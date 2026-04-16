import { useEffect, useState } from 'react'
import ScreenWrapper from '../../components/layout/ScreenWrapper'
import PageHeader from '../../components/layout/PageHeader'
import { getMartialArtsTechniques } from '../../lib/stubs'

const POS_COLORS = {
  Standing: { color: 'var(--muted)', bg: 'rgba(140,166,204,0.2)' },
  Clinch: { color: 'var(--muted)', bg: 'rgba(140,166,204,0.2)' },
  'Closed Guard': { color: 'var(--cyan)', bg: 'var(--cyan-dim)' },
  'Open Guard': { color: 'var(--purple)', bg: 'var(--purple-dim)' },
  'Half Guard': { color: 'var(--purple)', bg: 'var(--purple-dim)' },
  'Butterfly Guard': { color: 'var(--purple)', bg: 'var(--purple-dim)' },
  'Side Control': { color: 'var(--amber)', bg: 'var(--amber-dim)' },
  Mount: { color: 'var(--coral)', bg: 'var(--coral-dim)' },
  'Back Mount': { color: 'var(--red)', bg: 'var(--red-dim)' },
  'North-South': { color: 'var(--amber)', bg: 'var(--amber-dim)' },
  Turtle: { color: 'var(--muted)', bg: 'rgba(140,166,204,0.2)' },
  'Leg Entanglement': { color: 'var(--red)', bg: 'var(--red-dim)' },
}

export default function BJJPositionalMap() {
  const [positions, setPositions] = useState([])
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    getMartialArtsTechniques('bjj', 'position').then((data) => {
      setPositions(data)
      if (data.length > 0) setSelected(data[0])
    })
  }, [])

  return (
    <ScreenWrapper>
      <PageHeader back backLabel="BJJ" title="Position Map" subtitle="Tap a position to see attacks, sweeps & escapes" />
      <div className="px-5">
        <div className="flex flex-col items-center gap-0">
          {positions.map((p, i) => {
            const style = POS_COLORS[p.name] ?? { color: 'var(--muted)', bg: 'var(--surface-hi)' }
            const active = selected?.id === p.id
            return (
              <div key={p.id} className="flex flex-col items-center">
                <button type="button" onClick={() => setSelected(p)}
                  className="px-4 py-1.5 rounded-pill text-[10px] font-semibold"
                  style={{ background: active ? 'var(--cyan)' : style.bg, color: active ? 'var(--bg)' : style.color }}>
                  {p.name}
                </button>
                {i < positions.length - 1 && <span className="block w-0.5 h-5" style={{ background: 'var(--surface-hi)' }} />}
              </div>
            )
          })}
        </div>

        {selected && (
          <div className="mt-5 rounded-card p-4" style={{ background: 'var(--cyan-dim)', minHeight: 160 }}>
            <p className="text-[13px] font-semibold" style={{ color: 'var(--cyan)' }}>{selected.name}</p>
            <p className="mt-1 text-[11px]" style={{ color: 'var(--text-sub)' }}>{selected.description}</p>
            <div className="mt-3 grid grid-cols-3 gap-3">
              {selected.attacks_from_here?.length > 0 && (
                <div>
                  <p className="text-[10px] label-micro" style={{ color: 'var(--red)' }}>Attacks</p>
                  <ul className="mt-1.5 flex flex-col gap-1">
                    {selected.attacks_from_here.map((a) => <li key={a} className="text-[11px]" style={{ color: 'var(--text)' }}>• {a}</li>)}
                  </ul>
                </div>
              )}
              {selected.sweeps_from_here?.length > 0 && (
                <div>
                  <p className="text-[10px] label-micro" style={{ color: 'var(--amber)' }}>Sweeps</p>
                  <ul className="mt-1.5 flex flex-col gap-1">
                    {selected.sweeps_from_here.map((a) => <li key={a} className="text-[11px]" style={{ color: 'var(--text)' }}>• {a}</li>)}
                  </ul>
                </div>
              )}
              {selected.escapes?.length > 0 && (
                <div>
                  <p className="text-[10px] label-micro" style={{ color: 'var(--cyan)' }}>Escapes</p>
                  <ul className="mt-1.5 flex flex-col gap-1">
                    {selected.escapes.map((a) => <li key={a} className="text-[11px]" style={{ color: 'var(--text)' }}>• {a}</li>)}
                  </ul>
                </div>
              )}
            </div>
            {selected.transitions_to?.length > 0 && (
              <p className="mt-3 text-[10px]" style={{ color: 'var(--text-sub)' }}>
                Transitions → {selected.transitions_to.join(', ')}
              </p>
            )}
          </div>
        )}
      </div>
    </ScreenWrapper>
  )
}
