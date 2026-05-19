export function QuizStep({
  title,
  subtitle,
  children
}: {
  title: string
  subtitle?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[var(--vula-ink)] mb-2 leading-tight">{title}</h2>
        {subtitle && <p className="text-[var(--vula-muted)]">{subtitle}</p>}
      </div>
      {children}
    </div>
  )
}
