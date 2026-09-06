import Link from 'next/link'

const SAMRO_ID = '810194ed-21d2-4b05-8580-1145538c1b63'
const SAMRO_DEADLINE = new Date('2026-09-30T17:00:00+02:00')

export function SamroSpotlightCard() {
  const now = new Date()
  const daysLeft = Math.max(
    0,
    Math.ceil((SAMRO_DEADLINE.getTime() - now.getTime()) / 86400000)
  )

  return (
    <section style={{ maxWidth: '56rem', margin: '0 auto', padding: '0 1.25rem 2.5rem' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          background: 'var(--vula-surface-2)',
          border: '1px solid var(--vula-green-light)',
          borderRadius: 'var(--radius-xl)',
          padding: '1.5rem',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '0.75rem',
          }}
        >
          <p
            style={{
              fontSize: '0.6875rem',
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--vula-green)',
            }}
          >
            Closing this month
          </p>
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              color: 'var(--vula-green)',
              background: 'var(--vula-green-subtle)',
              padding: '0.25rem 0.75rem',
              borderRadius: '999px',
              whiteSpace: 'nowrap',
            }}
          >
            Up to R25,000
          </span>
        </div>

        <div>
          <p
            style={{
              fontSize: '0.75rem',
              fontWeight: 500,
              color: 'var(--vula-faint)',
              marginBottom: '0.2rem',
            }}
          >
            SAMRO
          </p>
          <p
            style={{
              fontWeight: 600,
              color: 'var(--vula-ink)',
              fontSize: '1.0625rem',
              lineHeight: 1.35,
            }}
          >
            Music Creation Support Fund
          </p>
        </div>

        <p style={{ fontSize: '0.875rem', color: 'var(--vula-muted)', lineHeight: 1.6 }}>
          120 grants for SAMRO Full and Associate Members to create new, royalty-generating
          musical works. Members who received SAMRO CSI support in the past 3 years are not
          eligible.
        </p>

        <p style={{ fontSize: '0.8125rem', color: 'var(--vula-ink)', fontWeight: 500 }}>
          Closes 30 September 2026 at 5pm &middot; {daysLeft} {daysLeft === 1 ? 'day' : 'days'} left
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem', marginTop: '0.25rem' }}>
          <Link
            href="https://www.samro.org.za/news/samro-opens-applications-for-the-music-creation-support-fund"
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '0.625rem 1.125rem',
              background: 'var(--vula-green)',
              color: '#fff',
              fontWeight: 600,
              fontSize: '0.875rem',
              borderRadius: 'var(--radius-lg)',
              textDecoration: 'none',
            }}
          >
            Apply on SAMRO
          </Link>
          <Link
            href={`/fund/${SAMRO_ID}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '0.625rem 1.125rem',
              border: '1px solid var(--vula-border-em)',
              color: 'var(--vula-ink)',
              fontWeight: 500,
              fontSize: '0.875rem',
              borderRadius: 'var(--radius-lg)',
              textDecoration: 'none',
              background: 'var(--vula-surface-2)',
            }}
          >
            Full details
          </Link>
        </div>
      </div>
    </section>
  )
}
