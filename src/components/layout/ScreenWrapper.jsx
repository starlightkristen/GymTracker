export default function ScreenWrapper({ children, className = '' }) {
  return (
    <div
      className={`min-h-screen w-full max-w-[390px] mx-auto pb-24 ${className}`}
      style={{ background: 'var(--bg)' }}
    >
      {children}
    </div>
  )
}
