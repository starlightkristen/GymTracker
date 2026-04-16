import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ScreenWrapper from '../../components/layout/ScreenWrapper'
import PageHeader from '../../components/layout/PageHeader'
import { getTechniqueById } from '../../lib/stubs'

const PHASE_STYLE = {
  IMMEDIATE: { color: 'var(--red)', bg: 'rgba(242,89,89,0.1)' },
  ATTACK: { color: 'var(--amber)', bg: 'rgba(255,191,51,0.1)' },
  ESCAPE: { color: 'var(--green)', bg: 'rgba(77,230,128,0.1)' },
}

export default function ScenarioDetail() {
  const { id } = useParams()
  const [t, setT] = useState(null)

  useEffect(() => { getTechniqueById(id).then(setT) }, [id])

  if (!t) return <ScreenWrapper><PageHeader back backLabel="Krav Maga" title="Loading..." /></ScreenWrapper>

  const steps = typeof t.steps === 'string' ? JSON.parse(t.steps) : (t.steps ?? [])
  const grouped = {}
  for (const s of steps) {
    const phase = s.phase ?? 'IMMEDIATE'
    if (!grouped[phase]) grouped[phase] = []
    grouped[phase].push(s.instruction)
  }

  return (
    <ScreenWrapper>
      <PageHeader back backLabel="Krav Maga" />
      <div className="px-5">
        <div className="flex gap-2 flex-wrap">
          <span className="px-2.5 py-1 rounded-pill text-[11px]" style={{ background: 'var(--amber-dim)', color: 'var(--amber)' }}>
            🛡️ {t.category}
          </span>
          {t.threat_level && (
            <span className="px-2.5 py-1 rounded-pill text-[11px]" style={{ background: 'var(--red-dim)', color: 'var(--red)' }}>
              ⚡ {t.threat_level}
            </span>
          )}
        </div>
        <h1 className="mt-3 text-[22px] font-semibold tracking-tight leading-[1.15]" style={{ color: 'var(--text)' }}>
          {t.name}
        </h1>

        {t.description && (
          <div className="mt-5 rounded-card px-4 py-3" style={{ background: 'var(--red-dim)' }}>
            <p className="text-[10px] font-bold label-micro" style={{ color: 'var(--red)' }}>SITUATION</p>
            <p className="mt-2 text-[13px] font-medium" style={{ color: 'var(--text)' }}>{t.description}</p>
          </div>
        )}

        <div className="mt-4 flex flex-col gap-3">
          {Object.entries(grouped).map(([phase, instructions]) => {
            const style = PHASE_STYLE[phase] ?? PHASE_STYLE.IMMEDIATE
            return (
              <div key={phase} className="rounded-card px-4 py-3" style={{ background: style.bg }}>
                <p className="text-[10px] font-bold label-micro" style={{ color: style.color }}>{phase}</p>
                <ul className="mt-2 flex flex-col gap-2">
                  {instructions.map((inst, i) => (
                    <li key={i} className="text-[12px] font-medium" style={{ color: 'var(--text)' }}>• {inst}</li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        {t.tips?.length > 0 && (
          <div className="mt-5 rounded-card px-4 py-3 text-[11px]" style={{ background: 'var(--surface-hi)', color: 'var(--text-sub)' }}>
            {t.tips.map((tip, i) => <p key={i}>⚠️ {tip}</p>)}
          </div>
        )}
      </div>
    </ScreenWrapper>
  )
}
