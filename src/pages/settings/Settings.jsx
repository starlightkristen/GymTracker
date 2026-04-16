import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ScreenWrapper from '../../components/layout/ScreenWrapper'
import PageHeader from '../../components/layout/PageHeader'
import { signOut } from '../../lib/auth'
import { getSchedules, getUserProfile } from '../../lib/stubs'

function Section({ title, children }) {
  return (
    <div className="mt-5">
      <p className="text-[10px] label-micro" style={{ color: 'var(--text-sub)' }}>{title}</p>
      <div className="mt-2 flex flex-col gap-2">{children}</div>
    </div>
  )
}

function Row({ label }) {
  return (
    <button type="button" className="rounded-card h-11 px-4 flex items-center justify-between text-left"
      style={{ background: 'var(--surface)' }}>
      <span className="text-[13px] truncate" style={{ color: 'var(--text)' }}>{label}</span>
      <span className="text-[18px] shrink-0" style={{ color: 'var(--muted)' }}>›</span>
    </button>
  )
}

export default function Settings() {
  const navigate = useNavigate()
  const [schedule, setSchedule] = useState([])
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    getSchedules().then(setSchedule)
    getUserProfile().then(setProfile)
  }, [])

  const handleSignOut = async () => {
    await signOut()
    navigate('/onboarding')
  }

  const capitalize = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1) : ''

  return (
    <ScreenWrapper>
      <PageHeader title="Settings" />
      <div className="px-5">
        <Section title="Workout Schedule">
          {schedule.length === 0 && <Row label="No schedule set — tap to add" />}
          {schedule.map((s) => (
            <Row key={s.id} label={`${capitalize(s.day_of_week)} → ${capitalize(s.routine_type)}`} />
          ))}
        </Section>

        {profile && (
          <>
            <Section title="Home Equipment">
              {(profile.home_equipment ?? []).map((e) => <Row key={e} label={`${capitalize(e)} ✓`} />)}
              {(profile.home_equipment ?? []).length === 0 && <Row label="None set" />}
            </Section>

            <Section title="Goals">
              {(profile.goals ?? []).map((g) => <Row key={g} label={capitalize(g.replace(/_/g, ' '))} />)}
            </Section>

            <Section title="Gym">
              <Row label={capitalize(profile.gym_type?.replace(/_/g, ' ') ?? 'Not set')} />
            </Section>
          </>
        )}

        <button type="button" onClick={handleSignOut}
          className="mt-6 w-full h-12 rounded-card text-[14px] font-medium"
          style={{ background: 'var(--red-dim)', color: 'var(--red)' }}>
          Sign Out
        </button>
      </div>
    </ScreenWrapper>
  )
}
