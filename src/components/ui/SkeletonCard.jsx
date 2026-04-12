export default function SkeletonCard({ height = 92 }) {
  return (
    <div
      className="w-full rounded-card p-4 flex flex-col gap-2"
      style={{ background: 'var(--surface)', minHeight: height }}
    >
      <div
        className="h-4 w-2/5 rounded animate-pulse"
        style={{ background: 'var(--surface-hi)' }}
      />
      <div
        className="h-3 w-1/3 rounded animate-pulse"
        style={{ background: 'var(--surface-hi)' }}
      />
      <div
        className="h-3 w-1/4 rounded animate-pulse mt-auto"
        style={{ background: 'var(--surface-hi)' }}
      />
    </div>
  )
}
