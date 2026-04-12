import Pill from './Pill'

// Derive dim color from accent hex (adds 15% alpha via rgba)
const dim = (hex) => {
  if (!hex) return 'var(--cyan-dim)'
  const h = hex.replace('#', '')
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  return `rgba(${r},${g},${b},0.15)`
}

export default function ExerciseCard({
  name,
  muscle,
  sets,
  reps,
  last_weight,
  recommendation,
  rec_note,
  accentColor = 'var(--cyan)',
  accentHex,
  onClick,
}) {
  const pillBg = accentHex ? dim(accentHex) : 'var(--cyan-dim)'
  const recLabel =
    typeof recommendation === 'number' ? `→ ${recommendation} lbs` : `→ ${recommendation ?? 'Hold'}`

  return (
    <button
      type="button"
      onClick={onClick}
      className="relative w-full text-left rounded-card overflow-hidden transition-transform active:scale-[0.99]"
      style={{ background: 'var(--surface)', minHeight: 92 }}
    >
      <span
        className="absolute left-0 top-[10px] w-1 h-[72px] rounded-r-[2px]"
        style={{ background: accentColor }}
        aria-hidden
      />
      <div className="flex items-start justify-between pl-4 pr-4 py-3 gap-3">
        <div className="flex flex-col items-start gap-1.5 min-w-0">
          <p className="font-bold text-[15px] text-text truncate" style={{ color: 'var(--text)' }}>
            {name}
          </p>
          <Pill label={muscle} bg={pillBg} color={accentColor} />
          <p className="text-[12px]" style={{ color: 'var(--text-sub)' }}>
            {sets}×{reps}
          </p>
        </div>
        <div className="flex flex-col items-start gap-1.5 shrink-0 w-[155px]">
          <p className="text-[12px]" style={{ color: 'var(--text-sub)' }}>
            Last: {last_weight} lbs
          </p>
          <p className="text-[13px] font-bold" style={{ color: accentColor }}>
            {recLabel}
          </p>
          {rec_note && (
            <p className="text-[10px] leading-snug" style={{ color: 'var(--text-sub)' }}>
              {rec_note}
            </p>
          )}
        </div>
      </div>
    </button>
  )
}
