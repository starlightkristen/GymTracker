import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ScreenWrapper from '../../components/layout/ScreenWrapper'
import PageHeader from '../../components/layout/PageHeader'
import { getTechniqueById } from '../../lib/stubs'

export default function CombinationCard() {
  const { id } = useParams()
  const [t, setT] = useState(null)

  useEffect(() => { getTechniqueById(id).then(setT) }, [id])

  if (!t) return <ScreenWrapper><PageHeader back backLabel="Muay Thai" title="Loading..." /></ScreenWrapper>

  const steps = typeof t.steps === 'string' ? JSON.parse(t.steps) : (t.steps ?? [])

  return (
    <ScreenWrapper>
      <PageHeader back backLabel="Muay Thai" />
      <div className="px-5">
        <span className="inline-flex px-2.5 py-1 rounded-pill text-[11px]" style={{ background: 'var(--coral-dim)', color: 'var(--coral)' }}>
          🥊 Combination
        </span>
        <h1 className="mt-3 text-[22px] font-semibold tracking-tight" style={{ color: 'var(--text)' }}>{t.name}</h1>
        <p className="mt-1 text-[13px]" style={{ color: 'var(--text-sub)' }}>
          {t.description ?? `${t.difficulty} combination`}
        </p>

        <div className="mt-4 flex flex-col gap-2">
          {steps.map((s, i) => (
            <div key={i} className="rounded-card px-4 py-3 flex gap-3"
              style={{ background: i === 0 ? 'var(--coral-dim)' : 'var(--surface)', minHeight: 72 }}>
              <span className="text-[22px] font-bold font-mono w-6" style={{ color: 'var(--coral)' }}>{s.step ?? i + 1}</span>
              <div className="flex-1 min-w-0">
                <p className="text-[15px] font-semibold" style={{ color: 'var(--text)' }}>{s.instruction}</p>
                {s.key_point && <p className="text-[11px] mt-1" style={{ color: 'var(--text-sub)' }}>{s.key_point}</p>}
              </div>
            </div>
          ))}
        </div>

        {t.rhythm_guide && (
          <div className="mt-4 rounded-card px-4 py-3" style={{ background: 'var(--surface-hi)', minHeight: 56 }}>
            <p className="text-[10px] label-micro" style={{ color: 'var(--text-sub)' }}>Rhythm</p>
            <p className="mt-1 text-[18px] font-bold font-mono" style={{ color: 'var(--coral)' }}>{t.rhythm_guide}</p>
          </div>
        )}

        <button type="button" className="mt-6 w-full h-[52px] rounded-card font-bold text-[15px]"
          style={{ background: 'var(--coral)', color: 'var(--bg)' }}>
          🥊&nbsp;&nbsp;Shadow Box This Combo
        </button>
      </div>
    </ScreenWrapper>
  )
}
