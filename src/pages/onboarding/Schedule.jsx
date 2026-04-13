import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import OnboardingStep from './OnboardingStep'
import { saveSchedule } from '../../lib/stubs'

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const ROUTINES = [
  { name: 'Push Day', color: 'var(--cyan)', bg: 'var(--cyan-dim)' },
  { name: 'Pull Day', color: 'var(--coral)', bg: 'var(--coral-dim)' },
  { name: 'Legs', color: 'var(--amber)', bg: 'var(--amber-dim)' },
  { name: 'Full Body', color: 'var(--coral)', bg: 'var(--coral-dim)' },
  { name: 'Rest', color: 'var(--muted)', bg: 'rgba(114,140,179,0.15)' },
]

const DEFAULT_SCHEDULE = {
  Mon: 'Pull Day',
  Tue: 'Push Day',
  Wed: 'Rest',
  Thu: 'Legs',
  Fri: 'Push Day',
  Sat: 'Full Body',
  Sun: 'Rest',
}

export default function Schedule() {
  const navigate = useNavigate()
  const [schedule, setSchedule] = useState(DEFAULT_SCHEDULE)

  const cycle = (day) => {
    setSchedule((prev) => {
      const i = ROUTINES.findIndex((r) => r.name === prev[day])
      const next = ROUTINES[(i + 1) % ROUTINES.length].name
      return { ...prev, [day]: next }
    })
  }

  const handleNext = async () => {
    await saveSchedule(schedule)
    navigate('/onboarding/equipment')
  }

  return (
    <OnboardingStep
      step={2}
      total={4}
      title={<span>Set your<br />schedule</span>}
      subtitle="Tap a day to assign a split"
      cta="Next →"
      onCta={handleNext}
    >
      <div className="flex flex-col gap-2">
        {DAYS.map((day) => {
          const routineName = schedule[day]
          const routine = ROUTINES.find((r) => r.name === routineName) ?? ROUTINES[0]
          return (
            <button
              key={day}
              type="button"
              onClick={() => cycle(day)}
              className="rounded-card h-13 px-4 flex items-center justify-between text-left"
              style={{ background: 'var(--surface)', minHeight: 52 }}
            >
              <span className="text-[14px]" style={{ color: 'var(--text)' }}>{day}</span>
              <span
                className="px-2.5 py-1 rounded-pill text-[11px]"
                style={{ background: routine.bg, color: routine.color }}
              >
                {routine.name}
              </span>
            </button>
          )
        })}
      </div>
    </OnboardingStep>
  )
}
