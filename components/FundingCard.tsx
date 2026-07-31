import Link from 'next/link'
import type { FundingOpportunity } from '@/lib/types'
import { DeadlineCountdown } from '@/components/DeadlineCountdown'

const STATUS_CONFIG: Record<string, { label: string; bg: string; color: string }> = {
  open:     { label: 'Open',           bg: 'var(--vula-green-subtle)',  color: 'var(--vula-green)' },
  ongoing:  { label: 'Rolling intake', bg: 'var(--vula-green-subtle)',  color: 'var(--vula-green)' },
  seasonal: { label: 'Seasonal',       bg: '#fef5e0',                   color: '#92600a' },
  pilot:    { label: 'Pilot',          bg: '#f0edff',                   color: '#5b21b6' },
  closed:   { label: 'Closed',         bg: '#f3f3f2',                   color: 'var(--vula-faint)' },
}

const FUNDING_TYPE_LABEL: Record<string, string> = {
  grant:           'Grant',
  loan:            'Loan',
  blended:         'Grant + loan combo',
  equity:          'Equity',
  guarantee:       'Guarantee',
  'revenue-based': 'Based on your sales',
  other:           'Other',
}

const STAGE_LABEL: Record<string, string> = {
  'pre-revenue': 'Suits pre-revenue businesses',
  early:         'Suits early-stage businesses',
  growth:        'Suits growing businesses',
  established:   'Suits established businesses',
}

/**
 * Returns at most one fit badge per card.
 * Priority: informal eligibility, then audience target, then funding type.
 * Deadline is handled separately as an urgency signal.
 */
function getPrimaryBadge(opp: FundingOpportunity): { label: string; color: 'green' | 'gold' | 'amber' | 'purple' } | null {
  if (!opp.requires_registration || opp.target_informal)
    return { label: 'Informal eligible', color: 'gold' }
  if (opp.target_youth)       return { label: 'Youth',           color: 'green' }
  if (opp.target_women)       return { label: 'Women',           color: 'green' }
  if (opp.target_disability)  return { label: 'Disability',      color: 'green' }
  if (opp.target_cooperative) return { label: 'Co-op',           color: 'green' }
  if (opp.target_rural)       return { label: 'Rural',           color: 'green' }
  if (opp.target_township)    return { label: 'Township',        color: 'green' }
  if (opp.target_over35)      return { label: '35+',             color: 'green' }
  if (opp.funding_type && opp.funding_type !== 'grant') {
    const isAmber = opp.funding_type === 'revenue-based'
    return {
      label: FUNDING_TYPE_LABEL[opp.funding_type] ?? opp.funding_type,
      color: isAmber ? 'amber' : 'green',
    }
  }
  return null
}

export function FundingCard({ opportunity: opp }: { opportunity: FundingOpportunity }) {
  const status = STATUS_CONFIG[opp.status] ?? STATUS_CONFIG['open']
  const badge = getPrimaryBadge(opp)
  const stageLabel = opp.business_stage && opp.business_stage !== 'any'
    ? STAGE_LABEL[opp.business_stage] ?? null
    : null

  const amountDisplay = opp.amount_label
    ? opp.amount_label
    : opp.amount_max
      ? `Up to R${opp.amount_max.toLocaleString('en-ZA')}`
      : opp.amount_min
        ? `From R${opp.amount_min.toLocaleString('en-ZA')}`
        : null

  return (
    <Link
      href={`/fund/${opp.id}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.875rem',
        background: 'var(--vula-surface-2)',
        border: '1px solid var(--vula-border)',
        borderRadius: 'var(--radius-xl)',
        padding: '1.375rem 1.5rem',
        textDecoration: 'none',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      {/* Header row: status badge + deadline urgency */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
        <span
          style={{
            fontSize: '0.6875rem',
            fontWeight: 600,
            letterSpacing: '0.04em',
            padding: '0.2rem 0.6rem',
            borderRadius: '999px',
            background: status.bg,
            color: status.color,
            whiteSpace: 'nowrap',
          }}
        >
          {status.label}
        </span>
        {opp.deadline && <DeadlineCountdown deadline={opp.deadline} />}
      </div>

      {/* Funder + title */}
      <div style={{ minWidth: 0 }}>
        <p
          style={{
            fontSize: '0.75rem',
            fontWeight: 500,
            color: 'var(--vula-faint)',
            marginBottom: '0.25rem',
            letterSpacing: '0.01em',
          }}
        >
          {opp.funder}
        </p>
        <h3
          style={{
            fontWeight: 700,
            fontSize: '0.9375rem',
            color: 'var(--vula-ink)',
            lineHeight: 1.35,
          }}
        >
          {opp.title}
        </h3>
      </div>

      {/* Amount hero signal */}
      {amountDisplay && (
        <p
          style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            color: 'var(--vula-green)',
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}
        >
          {amountDisplay}
        </p>
      )}

      {/* Stage fit cue */}
      {stageLabel && (
        <p
          style={{
            fontSize: '0.75rem',
            color: 'var(--vula-muted)',
            lineHeight: 1.4,
          }}
        >
          {stageLabel}
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
          overflow: 'hidden',
          marginTop: 'auto',
        }}
      >
        {opp.description}
      </p>

      {/* Single fit badge */}
      {badge && (
        <div style={{ display: 'flex' }}>
          <Tag label={badge.label} color={badge.color} />
        </div>
      )}
    </Link>
  )
}

function Tag({
  label,
  color = 'green',
}: {
  label: string
  color?: 'green' | 'gold' | 'amber' | 'purple'
}) {
  const styles = {
    green:  { bg: 'var(--vula-green-subtle)', color: 'var(--vula-green)',  border: 'var(--vula-green-light)' },
    gold:   { bg: 'var(--vula-gold-light)',   color: 'var(--vula-gold)',   border: '#f0d89a' },
    amber:  { bg: '#fff7ed',                  color: '#c2500a',            border: '#fed7aa' },
    purple: { bg: '#f0edff',                  color: '#5b21b6',            border: '#d4c8ff' },
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
        border: `1px solid ${styles[color].border}`,
      }}
    >
      {label}
    </span>
  )
}
