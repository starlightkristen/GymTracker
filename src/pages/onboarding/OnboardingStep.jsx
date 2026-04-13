export default function OnboardingStep({ step, total, title, subtitle, children, cta, onCta }) {
  const pct = (step / total) * 100
  return (
    <div
      className="min-h-screen w-full max-w-[390px] mx-auto flex flex-col"
      style={{ background: 'var(--bg)' }}
    >
      <div className="px-5 pt-10">
        <p className="text-[12px]" style={{ color: 'var(--text-sub)' }}>{step} of {total}</p>
        <div className="mt-2 h-[3px] rounded-[2px] relative" style={{ background: 'var(--surface-hi)' }}>
          <div
            className="absolute left-0 top-0 h-[3px] rounded-[2px]"
            style={{ background: 'var(--cyan)', width: `${pct}%` }}
          />
        </div>
        <h1 className="mt-4 text-[26px] font-bold leading-tight" style={{ color: 'var(--text)' }}>
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1 text-[13px]" style={{ color: 'var(--text-sub)' }}>{subtitle}</p>
        )}
      </div>

      <div className="flex-1 px-5 mt-5">{children}</div>

      <div className="px-5 pb-8">
        <button
          type="button"
          onClick={onCta}
          className="w-full h-[52px] rounded-card font-bold text-[16px]"
          style={{ background: 'var(--cyan)', color: 'var(--bg)' }}
        >
          {cta}
        </button>
      </div>
    </div>
  )
}
