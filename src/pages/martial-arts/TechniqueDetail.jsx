import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ScreenWrapper from '../../components/layout/ScreenWrapper'
import PageHeader from '../../components/layout/PageHeader'
import { getTechniqueById } from '../../lib/stubs'

const ART_LABELS = { muay_thai: 'Muay Thai', krav_maga: 'Krav Maga', bjj: 'BJJ' }
const ART_COLORS = { muay_thai: 'var(--coral)', krav_maga: 'var(--amber)', bjj: 'var(--purple)' }

export default function TechniqueDetail() {
  const { id } = useParams()
  const [t, setT] = useState(null)

  useEffect(() => { getTechniqueById(id).then(setT) }, [id])

  if (!t) return <ScreenWrapper><PageHeader back backLabel="Back" title="Loading..." /></ScreenWrapper>

  const steps = typeof t.steps === 'string' ? JSON.parse(t.steps) : (t.steps ?? [])
  const accent = ART_COLORS[t.art] ?? 'var(--cyan)'
  const accentDim = accent.replace(')', ', 0.15)').replace('var(--', 'var(--').replace(')', '-dim)')

  return (
    <ScreenWrapper>
      <PageHeader back backLabel={ART_LABELS[t.art] ?? 'Back'} />
      <div className="px-5">
        <div className="flex gap-2 flex-wrap">
          <span className="px-2.5 py-1 rounded-pill text-[11px]" style={{ background: 'var(--surface-hi)', color: accent }}>{t.category}</span>
          <span className="px-2.5 py-1 rounded-pill text-[11px]" style={{ background: 'var(--surface-hi)', color: 'var(--text-sub)' }}>{t.difficulty}</span>
        </div>
        <h1 className="mt-3 text-[22px] font-semibold tracking-tight leading-[1.15]" style={{ color: 'var(--text)' }}>
          {t.name}
          {t.native_name && <span className="block text-[13px] font-normal mt-1" style={{ color: 'var(--text-sub)' }}>{t.native_name}</span>}
        </h1>

        {t.description && <p className="mt-3 text-[13px]" style={{ color: 'var(--text-sub)' }}>{t.description}</p>}

        {!t.gif_url && (
          <div className="mt-4 rounded-card h-[180px] flex items-center justify-center" style={{ background: 'var(--surface-hi)' }}>
            <p className="text-[12px]" style={{ color: 'var(--text-sub)' }}>Technique demo</p>
          </div>
        )}
        {t.gif_url && <img src={t.gif_url} alt={t.name} className="mt-4 rounded-card w-full h-[180px] object-cover" style={{ background: 'var(--surface-hi)' }} />}

        {steps.length > 0 && (
          <div className="mt-4 rounded-card p-4" style={{ background: 'var(--surface)' }}>
            <p className="text-[10px] label-micro" style={{ color: accent }}>Step by step</p>
            <ol className="mt-2 flex flex-col gap-2.5">
              {steps.map((s, i) => (
                <li key={i} className="text-[12px]" style={{ color: 'var(--text-sub)' }}>
                  {s.step ?? s.phase ?? i + 1}. {s.instruction}
                  {s.key_point && <span className="block mt-0.5 text-[11px]" style={{ color: accent }}>↳ {s.key_point}</span>}
                </li>
              ))}
            </ol>
          </div>
        )}

        {t.common_mistakes?.length > 0 && (
          <div className="mt-3 rounded-card p-4" style={{ background: 'var(--red-dim)' }}>
            <p className="text-[10px] label-micro" style={{ color: 'var(--red)' }}>Common mistakes</p>
            <ul className="mt-2 flex flex-col gap-1">
              {t.common_mistakes.map((m, i) => <li key={i} className="text-[12px]" style={{ color: 'var(--text-sub)' }}>• {m}</li>)}
            </ul>
          </div>
        )}

        {t.tips?.length > 0 && (
          <div className="mt-3 rounded-card p-4" style={{ background: 'var(--surface-hi)' }}>
            <p className="text-[10px] label-micro" style={{ color: 'var(--text-sub)' }}>Tips</p>
            <ul className="mt-2 flex flex-col gap-1">
              {t.tips.map((tip, i) => <li key={i} className="text-[12px]" style={{ color: 'var(--text-sub)' }}>• {tip}</li>)}
            </ul>
          </div>
        )}

        {t.conditioning_benefit && (
          <p className="mt-3 text-[11px]" style={{ color: 'var(--text-sub)' }}>Conditioning: {t.conditioning_benefit}</p>
        )}
      </div>
    </ScreenWrapper>
  )
}
