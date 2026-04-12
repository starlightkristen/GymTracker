export default function Pill({ label, bg, color, className = '' }) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-pill text-[11px] font-semibold ${className}`}
      style={{ background: bg, color }}
    >
      {label}
    </span>
  )
}
