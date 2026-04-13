import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import OnboardingStep from './OnboardingStep'
import { saveUserProfile } from '../../lib/stubs'

const OPTIONS = [
  { id: 'planet_fitness', name: 'Planet Fitness', sub: 'Machines, cables, dumbbells — no barbells' },
  { id: 'home_only', name: 'Home gym only', sub: 'Use your home equipment settings' },
  { id: 'other_gym', name: 'Other gym', sub: 'Customize available equipment' },
]

export default function GymSetup() {
  const navigate = useNavigate()
  const [picked, setPicked] = useState('planet_fitness')

  const handleDone = async () => {
    await saveUserProfile({ gym_type: picked })
    navigate('/today')
  }

  return (
    <OnboardingStep
      step={4}
      total={4}
      title="Your gym"
      subtitle="Where do you train?"
      cta={`Let's go! →`}
      onCta={handleDone}
    >
      <div className="flex flex-col gap-2.5">
        {OPTIONS.map((o) => {
          const on = picked === o.id
          return (
            <button
              key={o.id}
              type="button"
              onClick={() => setPicked(o.id)}
              className="rounded-card px-4 py-3 flex items-start gap-3 text-left"
              style={{
                background: on ? 'var(--cyan-dim)' : 'var(--surface)',
                minHeight: 72,
              }}
            >
              <div className="flex-1 min-w-0">
                <p className="text-[15px] font-bold" style={{ color: on ? 'var(--cyan)' : 'var(--text)' }}>
                  {o.name}
                </p>
                <p className="text-[12px] mt-0.5" style={{ color: 'var(--text-sub)' }}>{o.sub}</p>
              </div>
              <span className="text-[17px] font-bold self-center" style={{ color: on ? 'var(--cyan)' : 'var(--muted)' }}>
                {on ? '✓' : '○'}
              </span>
            </button>
          )
        })}
      </div>
    </OnboardingStep>
  )
}
