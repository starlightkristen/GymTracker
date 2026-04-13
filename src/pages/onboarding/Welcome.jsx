import { useNavigate } from 'react-router-dom'

export default function Welcome() {
  const navigate = useNavigate()
  return (
    <div
      className="min-h-screen w-full max-w-[390px] mx-auto flex flex-col"
      style={{ background: 'var(--bg)' }}
    >
      <div className="flex-1 flex flex-col items-center justify-center px-5 text-center">
        <div
          className="w-[60px] h-[60px] rounded-[14px] flex items-center justify-center"
          style={{ background: 'var(--cyan)' }}
        >
          <span className="text-[28px] font-bold" style={{ color: 'var(--bg)' }}>G</span>
        </div>
        <h1 className="mt-5 text-[30px] font-bold" style={{ color: 'var(--text)' }}>GymTracker</h1>
        <p className="mt-2 text-[15px]" style={{ color: 'var(--text-sub)' }}>
          Your workouts. Your progress.<br />No fluff.
        </p>
      </div>

      <div className="px-5 pb-10">
        <button
          type="button"
          onClick={() => navigate('/onboarding/goals')}
          className="w-full h-[52px] rounded-card font-bold text-[16px]"
          style={{ background: 'var(--cyan)', color: 'var(--bg)' }}
        >
          Get Started
        </button>
        <p className="mt-4 text-center text-[13px]" style={{ color: 'var(--text-sub)' }}>
          Already have an account? <span style={{ color: 'var(--cyan)' }}>Sign in</span>
        </p>
      </div>
    </div>
  )
}
