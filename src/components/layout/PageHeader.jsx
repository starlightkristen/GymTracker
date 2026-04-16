import { useNavigate } from 'react-router-dom'

export default function PageHeader({ back = false, backLabel, title, subtitle, right = null }) {
  const navigate = useNavigate()
  return (
    <header
      className="px-5 pt-4 pb-3"
      style={{ paddingTop: 'calc(env(safe-area-inset-top) + 16px)' }}
    >
      {back && (
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-[13px] mb-2 -ml-0.5"
          style={{ color: 'var(--cyan)' }}
        >
          ← {backLabel || 'Back'}
        </button>
      )}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          {title && (
            <h1 className="text-[22px] font-semibold leading-[1.15] tracking-tight truncate" style={{ color: 'var(--text)' }}>
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="text-[12px] mt-1.5" style={{ color: 'var(--text-sub)' }}>
              {subtitle}
            </p>
          )}
        </div>
        {right && <div className="shrink-0">{right}</div>}
      </div>
    </header>
  )
}
