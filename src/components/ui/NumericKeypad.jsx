import { Delete } from 'lucide-react'

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'del']

export default function NumericKeypad({
  value = '',
  onChange,
  onConfirm,
  label,
  unit = 'lbs',
  confirmLabel,
  step = 5,
}) {
  const display = value === '' ? '0' : String(value)
  const numeric = parseFloat(value || 0)

  const press = (k) => {
    if (k === 'del') {
      onChange?.(String(value).slice(0, -1))
      return
    }
    if (k === '.' && String(value).includes('.')) return
    onChange?.(String(value) + k)
  }

  const adjust = (delta) => {
    const next = Math.max(0, (isNaN(numeric) ? 0 : numeric) + delta)
    onChange?.(String(next))
  }

  const confirmText = confirmLabel ?? `Use ${display} ${unit}`

  return (
    <div className="flex flex-col w-full">
      {label && (
        <p className="px-5 pt-4 text-[15px]" style={{ color: 'var(--text-sub)' }}>
          {label}
        </p>
      )}
      <div className="flex flex-col items-center pt-6 pb-4">
        <p
          className="text-[72px] font-bold leading-none"
          style={{ color: 'var(--cyan)' }}
        >
          {display}
        </p>
        <p className="mt-3 text-[16px]" style={{ color: 'var(--text-sub)' }}>
          {unit}
        </p>
      </div>

      <div
        className="mx-5 rounded-row flex items-center justify-between px-5 h-12"
        style={{ background: 'var(--surface-hi)' }}
      >
        <button
          type="button"
          onClick={() => adjust(-step)}
          className="text-[16px]"
          style={{ color: 'var(--text)' }}
        >
          − {step}
        </button>
        <span className="text-[11px]" style={{ color: 'var(--text-sub)' }}>
          Quick adjust
        </span>
        <button
          type="button"
          onClick={() => adjust(step)}
          className="text-[16px]"
          style={{ color: 'var(--cyan)' }}
        >
          + {step}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2.5 px-5 pt-4">
        {KEYS.map((k) => {
          const isDel = k === 'del'
          return (
            <button
              key={k}
              type="button"
              onClick={() => press(k)}
              aria-label={isDel ? 'Delete' : k}
              className="h-[62px] rounded-card flex items-center justify-center text-[22px]"
              style={{
                background: isDel ? 'var(--red-dim)' : 'var(--surface)',
                color: isDel ? 'var(--red)' : 'var(--text)',
              }}
            >
              {isDel ? <Delete size={22} /> : k}
            </button>
          )
        })}
      </div>

      <div className="px-5 pt-6">
        <button
          type="button"
          onClick={onConfirm}
          className="w-full h-[52px] rounded-card font-bold text-[15px]"
          style={{ background: 'var(--cyan)', color: 'var(--bg)' }}
        >
          {confirmText}
        </button>
      </div>
    </div>
  )
}
