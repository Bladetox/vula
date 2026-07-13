export default function YocoWaitlistBanner() {
  return (
    <div
      role="alert"
      style={{
        background: '#fffbeb',
        border: '1px solid #f0d98b',
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
          background: '#fef9ec',
          border: '1px solid #f0d98b',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#92650a',
          marginTop: '0.05rem',
        }}
        aria-hidden="true"
      >
        <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
          <path
            d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            fontSize: '0.875rem',
            fontWeight: 650,
            color: '#78500a',
            marginBottom: '0.3rem',
            lineHeight: 1.3,
          }}
        >
          New Yoco merchants: waitlist applies
        </p>
        <p
          style={{
            fontSize: '0.8125rem',
            color: '#92650a',
            lineHeight: 1.6,
          }}
        >
          Yoco Capital is only available to <strong>existing Yoco merchants</strong>. New business sign-ups are currently subject to a waitlist before online transaction processing is approved. Once approved and actively trading, you will also need to process card payments through Yoco for at least <strong>6 months</strong> before a Capital offer becomes available.
        </p>
        <a
          href="https://www.yoco.com/za/capital/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.3rem',
            marginTop: '0.625rem',
            fontSize: '0.75rem',
            fontWeight: 600,
            color: '#92650a',
            textDecoration: 'none',
          }}
        >
          Learn more on yoco.com
          <svg width="10" height="10" fill="none" viewBox="0 0 12 12" aria-hidden="true">
            <path d="M2 10L10 2M5 2h5v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </div>
  )
}
