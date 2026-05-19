'use client'

export default function NextSlotCard() {
  return (
    <aside
      aria-label="NextSlot — business tool recommendation"
      style={{
        marginTop: '2rem',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--vula-border)',
        background: 'var(--vula-surface)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      {/* Top rule accent */}
      <div
        aria-hidden="true"
        style={{
          height: '3px',
          background: 'linear-gradient(90deg, var(--vula-green) 0%, #2e9e63 100%)',
        }}
      />

      <div style={{ padding: '1.5rem 1.75rem 1.75rem' }}>

        {/* Eyebrow */}
        <p
          style={{
            fontSize: '0.6875rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--vula-green)',
            marginBottom: '0.875rem',
          }}
        >
          From the Vula team
        </p>

        {/* Icon + heading row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.875rem',
            marginBottom: '1rem',
          }}
        >
          {/* Calendar icon */}
          <div
            aria-hidden="true"
            style={{
              flexShrink: 0,
              width: '2.5rem',
              height: '2.5rem',
              borderRadius: 'var(--radius)',
              background: 'var(--vula-green-subtle)',
              border: '1px solid var(--vula-green-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <rect x="3" y="4" width="18" height="18" rx="3" stroke="var(--vula-green)" strokeWidth="1.75" />
              <path d="M3 9h18" stroke="var(--vula-green)" strokeWidth="1.75" strokeLinecap="round" />
              <path d="M8 2v4M16 2v4" stroke="var(--vula-green)" strokeWidth="1.75" strokeLinecap="round" />
              <circle cx="8" cy="14" r="1" fill="var(--vula-green)" />
              <circle cx="12" cy="14" r="1" fill="var(--vula-green)" />
              <circle cx="16" cy="14" r="1" fill="var(--vula-green)" />
              <circle cx="8" cy="18" r="1" fill="var(--vula-green)" />
              <circle cx="12" cy="18" r="1" fill="var(--vula-green)" />
            </svg>
          </div>

          <h2
            style={{
              fontSize: '1rem',
              fontWeight: 700,
              letterSpacing: '-0.01em',
              color: 'var(--vula-ink)',
              lineHeight: 1.3,
              marginTop: '0.125rem',
            }}
          >
            You have been looking at the numbers.
            <br />
            NextSlot tells you what they mean.
          </h2>
        </div>

        {/* Body copy */}
        <p
          style={{
            fontSize: '0.9rem',
            color: 'var(--vula-muted)',
            lineHeight: 1.7,
            marginBottom: '1.375rem',
            maxWidth: '52ch',
          }}
        >
          We spent a lot of time putting Vula together so you would not have to search alone.
          NextSlot was built with the same thinking.  You have been looking at the numbers. NextSlot tells you what the numbers mean and how to use them to grow. 
        </p>

        {/* CTA — hover handled via CSS in globals.css */}
        <a
          href="https://nextslot.co.za"
          target="_blank"
          rel="noopener noreferrer"
          className="nextslot-cta"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.375rem',
            fontSize: '0.875rem',
            fontWeight: 650,
            color: 'var(--vula-green)',
            textDecoration: 'none',
            borderBottom: '1.5px solid var(--vula-green-light)',
            paddingBottom: '0.125rem',
            transition: 'border-color var(--duration-fast) var(--ease-out)',
          }}
        >
          Worth a look
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path
              d="M2 10L10 2M5 2h5v5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </aside>
  )
}
