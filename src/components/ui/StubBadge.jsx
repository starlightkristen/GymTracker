export default function StubBadge({ label = 'Stub UI' }) {
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-pill text-[10px] font-semibold uppercase tracking-wide"
      style={{ background: 'var(--amber-dim)', color: 'var(--amber)' }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--amber)' }} />
      {label}
    </span>
  )
}
