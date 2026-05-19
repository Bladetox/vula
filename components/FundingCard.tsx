import Link from 'next/link'
import type { FundingOpportunity } from '@/lib/types'

const STATUS_CONFIG: Record<string, { label: string; bg: string; color: string }> = {
  open:     { label: 'Open',     bg: 'var(--vula-green-subtle)',  color: 'var(--vula-green)' },
  seasonal: { label: 'Seasonal', bg: '#fef5e0',                   color: '#92600a' },
  pilot:    { label: 'Pilot',    bg: '#f0edff',                   color: '#5b21b6' },
  closed:   { label: 'Closed',   bg: '#f3f3f2',                   color: 'var(--vula-faint)' }
}

export function FundingCard({ opportunity: opp }: { opportunity: FundingOpportunity }) {
  const status = STATUS_CONFIG[opp.status] ?? STATUS_CONFIG['open']

  return (
    <Link
      href={`/fund/${opp.slug}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        background: 'var(--vula-surface-2)',
        border: '1px solid var(--vula-border)',
        borderRadius: 'var(--radius-xl)',
        padding: '1.375rem 1.5rem',
        textDecoration: 'none',
        boxShadow: 'var(--shadow-sm)'
      }}
    >
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem' }}>
        <div style={{ minWidth: 0, flex: 1 }}>
          <p
            style={{
              fontSize: '0.75rem',
              fontWeight: 500,
              color: 'var(--vula-faint)',
              marginBottom: '0.2rem',
              letterSpacing: '0.01em'
            }}
          >
            {opp.funder}
          </p>
          <h3
            style={{
              fontWeight: 650,
              fontSize: '0.9375rem',
              color: 'var(--vula-ink)',
              lineHeight: 1.35
            }}
          >
            {opp.title}
          </h3>
        </div>
        <span
          style={{
            flexShrink: 0,
            fontSize: '0.6875rem',
            fontWeight: 600,
            letterSpacing: '0.04em',
            padding: '0.2rem 0.6rem',
            borderRadius: '999px',
            background: status.bg,
            color: status.color
          }}
        >
          {status.label}
        </span>
      </div>

      {/* Amount */}
      {opp.amount_max && (
        <p
          style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            color: 'var(--vula-green)',
            letterSpacing: '-0.02em',
            lineHeight: 1
          }}
        >
          Up to R{opp.amount_max.toLocaleString('en-ZA')}
        </p>
      )}

      {/* Description */}
      <p
        style={{
          fontSize: '0.8125rem',
          color: 'var(--vula-muted)',
          lineHeight: 1.6,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}
      >
        {opp.description}
      </p>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginTop: 'auto' }}>
        {opp.target_youth      && <Tag label="Youth" />}
        {opp.target_women      && <Tag label="Women" />}
        {opp.target_cooperative && <Tag label="Co-op" />}
        {!opp.requires_registration && <Tag label="Informal eligible" color="gold" />}
        {opp.funding_type      && <Tag label={opp.funding_type} />}
      </div>
    </Link>
  )
}

function Tag({ label, color = 'green' }: { label: string; color?: 'green' | 'gold' }) {
  const styles = {
    green: { bg: 'var(--vula-green-subtle)', color: 'var(--vula-green)', border: 'var(--vula-green-light)' },
    gold:  { bg: 'var(--vula-gold-light)',   color: 'var(--vula-gold)',   border: '#f0d89a' }
  }
  return (
    <span
      style={{
        fontSize: '0.6875rem',
        fontWeight: 600,
        letterSpacing: '0.03em',
        padding: '0.2rem 0.625rem',
        borderRadius: '999px',
        background: styles[color].bg,
        color: styles[color].color,
        border: `1px solid ${styles[color].border}`
      }}
    >
      {label}
    </span>
  )
}
