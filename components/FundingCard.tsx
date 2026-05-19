import Link from 'next/link'
import type { FundingOpportunity } from '@/lib/types'

const STATUS_CONFIG: Record<string, { label: string; bg: string; color: string }> = {
  open: { label: 'Open', bg: 'var(--vula-green-light)', color: 'var(--vula-green)' },
  seasonal: { label: 'Seasonal', bg: '#fef3c7', color: '#d97706' },
  pilot: { label: 'Pilot', bg: '#ede9fe', color: '#7c3aed' },
  closed: { label: 'Closed', bg: '#f3f4f6', color: '#6b7280' }
}

export function FundingCard({ opportunity: opp }: { opportunity: FundingOpportunity }) {
  const status = STATUS_CONFIG[opp.status] ?? STATUS_CONFIG['open']

  return (
    <Link
      href={`/fund/${opp.slug}`}
      className="group flex flex-col gap-4 bg-white border border-[var(--vula-border)] rounded-2xl p-6 hover:border-[var(--vula-green)] hover:shadow-md transition-all duration-150"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs text-[var(--vula-muted)] mb-1">{opp.funder}</p>
          <h3 className="font-semibold text-[var(--vula-ink)] leading-tight group-hover:text-[var(--vula-green)] transition-colors duration-150">{opp.title}</h3>
        </div>
        <span
          className="shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full"
          style={{ background: status.bg, color: status.color }}
        >
          {status.label}
        </span>
      </div>

      {opp.amount_max && (
        <p className="text-xl font-bold text-[var(--vula-green)]">
          Up to R{opp.amount_max.toLocaleString('en-ZA')}
        </p>
      )}

      <p className="text-sm text-[var(--vula-muted)] leading-relaxed line-clamp-2">{opp.description}</p>

      <div className="flex flex-wrap gap-1.5 mt-auto">
        {opp.target_youth && <Tag label="Youth" />}
        {opp.target_women && <Tag label="Women" />}
        {opp.target_cooperative && <Tag label="Co-op" />}
        {!opp.requires_registration && <Tag label="Informal eligible" color="gold" />}
        {opp.funding_type && <Tag label={opp.funding_type} />}
      </div>
    </Link>
  )
}

function Tag({ label, color = 'green' }: { label: string; color?: 'green' | 'gold' }) {
  const styles = {
    green: { bg: 'var(--vula-green-light)', color: 'var(--vula-green)' },
    gold: { bg: 'var(--vula-gold-light)', color: 'var(--vula-gold)' }
  }
  return (
    <span
      className="text-xs font-medium px-2.5 py-1 rounded-full"
      style={{ background: styles[color].bg, color: styles[color].color }}
    >
      {label}
    </span>
  )
}
