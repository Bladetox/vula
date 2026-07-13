export default function UnverifiedBanner({ sourceUrl }: { sourceUrl?: string | null }) {
  return (
    <div
      role="note"
      style={{
        background: '#f8f8f7',
        border: '1px solid #e0ddd8',
        borderRadius: 'var(--radius-lg)',
        padding: '1rem 1.25rem',
        display: 'flex',
        gap: '0.875rem',
        alignItems: 'flex-start',
        marginBottom: '1.5rem',
      }}
    >
      {/* Icon */}
      <div
        style={{
          flexShrink: 0,
          width: '2rem',
          height: '2rem',
          borderRadius: 'var(--radius)',
          background: '#f0ede8',
          border: '1px solid #e0ddd8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--vula-muted)',
          marginTop: '0.05rem',
        }}
        aria-hidden="true"
      >
        <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
          <path d="M12 8v4m0 4h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            fontSize: '0.875rem',
            fontWeight: 650,
            color: 'var(--vula-ink)',
            marginBottom: '0.3rem',
            lineHeight: 1.3,
          }}
        >
          Some details may be out of date
        </p>
        <p
          style={{
            fontSize: '0.8125rem',
            color: 'var(--vula-muted)',
            lineHeight: 1.6,
          }}
        >
          One or more figures for this opportunity (such as the funding amount, eligibility threshold, or programme terms) could not be fully verified against an official source. Always confirm the latest details directly on the funder&apos;s official website before applying.
        </p>
        {sourceUrl && (
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              marginTop: '0.625rem',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: 'var(--vula-muted)',
              textDecoration: 'none',
            }}
          >
            Check official source
            <svg width="10" height="10" fill="none" viewBox="0 0 12 12" aria-hidden="true">
              <path d="M2 10L10 2M5 2h5v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        )}
      </div>
    </div>
  )
}
