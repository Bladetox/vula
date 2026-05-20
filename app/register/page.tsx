import Link from 'next/link'

const STEPS = [
  {
    number: 1,
    title: 'Register on CIPC',
    description:
      'The Companies and Intellectual Property Commission registers your business officially. You can register a private company (Pty Ltd), sole proprietor, or co-operative.',
    action: 'Register on cipc.co.za',
    href: 'https://www.cipc.co.za/index.php/companies-and-intellectual-property/register-your-company/',
  },
  {
    number: 2,
    title: 'Register with SARS',
    description:
      'Once CIPC-registered, register for income tax with SARS via eFiling. VAT registration only becomes compulsory once your annual turnover exceeds R2.3 million (threshold updated April 2026).',
    action: 'Register at sars.gov.za',
    href: 'https://www.sars.gov.za/businesses-and-employers/register-a-business/',
  },
  {
    number: 3,
    title: 'Open a business bank account',
    description:
      'Most funding applications require a dedicated business bank account. Several South African banks offer low-cost options for small businesses - FNB Easy Business, Nedbank Business Essentials, and Standard Bank MyMoBiz are popular starting points.',
    action: null,
    href: null,
  },
  {
    number: 4,
    title: 'Get a B-BBEE affidavit or certificate',
    description:
      'Businesses with annual turnover under R10 million can use a sworn affidavit signed before a commissioner of oaths. Larger businesses need a verified B-BBEE certificate from a SANAS-accredited verification agency.',
    action: 'Learn about B-BBEE at thedtic.gov.za',
    href: 'https://www.thedtic.gov.za/financial-and-non-financial-support/bee/',
  },
  {
    number: 5,
    title: 'Prepare your core funding pack',
    description:
      'Almost every application asks for the same set of documents. Assemble them once, keep them updated, and you can apply to multiple programmes without starting from scratch.',
    action: null,
    href: null,
    list: [
      'CIPC registration certificate',
      'SARS tax compliance certificate',
      'B-BBEE affidavit or certificate',
      'Bank confirmation letter',
      '12-month financial projections',
      'Proof of trading address',
      'Identity document of owner(s)',
    ],
  },
]

export default function RegisterPage() {
  return (
    <main>
      {/* Hero */}
      <section
        style={{
          background: 'var(--vula-bg)',
          borderBottom: '1px solid var(--vula-border)',
          padding: 'clamp(3rem, 6vw, 5rem) 1.25rem clamp(2.5rem, 5vw, 4rem)',
        }}
      >
        <div style={{ maxWidth: '40rem', margin: '0 auto' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: '#fef9ec',
              border: '1px solid #f0d98b',
              color: '#92650a',
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              padding: '0.3rem 0.75rem',
              borderRadius: '999px',
              marginBottom: '1.25rem',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#d4a017',
                flexShrink: 0,
              }}
            />
            For informal businesses
          </div>

          <h1
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              color: 'var(--vula-ink)',
              marginBottom: '1rem',
            }}
          >
            Get registered,{' '}
            <br />
            unlock more funding
          </h1>

          <p
            style={{
              fontSize: '1rem',
              lineHeight: 1.7,
              color: 'var(--vula-muted)',
              maxWidth: '38rem',
            }}
          >
            Most South African funding programmes require a formally registered
            business. These five steps will get you there and open access to
            significantly more opportunities.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section
        style={{
          maxWidth: '40rem',
          margin: '0 auto',
          padding: 'clamp(2rem, 4vw, 3rem) 1.25rem clamp(4rem, 8vw, 6rem)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
          }}
        >
          {STEPS.map((step, i) => (
            <article
              key={step.number}
              style={{
                background: 'var(--vula-surface)',
                border: '1px solid var(--vula-border)',
                borderRadius: '1rem',
                padding: '1.5rem',
                display: 'flex',
                gap: '1rem',
                alignItems: 'flex-start',
              }}
            >
              {/* Step number + connector */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  flexShrink: 0,
                  gap: '0.5rem',
                }}
              >
                <div
                  style={{
                    width: '2rem',
                    height: '2rem',
                    borderRadius: '50%',
                    background: 'var(--vula-green)',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '0.8125rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                  aria-hidden="true"
                >
                  {step.number}
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    style={{
                      width: '1px',
                      height: '1.5rem',
                      background: 'var(--vula-border)',
                    }}
                    aria-hidden="true"
                  />
                )}
              </div>

              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <h2
                  style={{
                    fontSize: '0.9375rem',
                    fontWeight: 650,
                    color: 'var(--vula-ink)',
                    marginBottom: '0.375rem',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {step.title}
                </h2>
                <p
                  style={{
                    fontSize: '0.875rem',
                    lineHeight: 1.65,
                    color: 'var(--vula-muted)',
                    marginBottom: step.list || step.href ? '0.875rem' : 0,
                  }}
                >
                  {step.description}
                </p>

                {step.list && (
                  <ul
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(14rem, 1fr))',
                      gap: '0.4rem 1rem',
                      marginBottom: '0.875rem',
                      listStyle: 'none',
                      padding: 0,
                      margin: '0 0 0.875rem',
                    }}
                  >
                    {step.list.map((item) => (
                      <li
                        key={item}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          fontSize: '0.8125rem',
                          color: 'var(--vula-muted)',
                        }}
                      >
                        <svg
                          width="14"
                          height="14"
                          fill="none"
                          viewBox="0 0 14 14"
                          aria-hidden="true"
                          style={{ flexShrink: 0 }}
                        >
                          <path
                            d="M11.5 3.5L5.5 9.5 2.5 6.5"
                            stroke="var(--vula-green)"
                            strokeWidth="1.75"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                {step.href && step.action && (
                  <a
                    href={step.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.375rem',
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      color: 'var(--vula-green)',
                      textDecoration: 'none',
                      padding: '0.35rem 0.75rem',
                      background: 'var(--vula-green-subtle)',
                      borderRadius: '999px',
                      border: '1px solid oklch(from var(--vula-green) l c h / 0.18)',
                    }}
                  >
                    {step.action}
                    <svg
                      width="11"
                      height="11"
                      fill="none"
                      viewBox="0 0 12 12"
                      aria-hidden="true"
                    >
                      <path
                        d="M2 10L10 2M5 2h5v5"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div
          style={{
            marginTop: '2.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '0.75rem',
          }}
        >
          <Link
            href="/find"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'var(--vula-green)',
              color: '#fff',
              fontWeight: 650,
              fontSize: '0.9375rem',
              padding: '0.8rem 1.75rem',
              borderRadius: '0.75rem',
              textDecoration: 'none',
              boxShadow: '0 1px 2px oklch(0.2 0.08 145 / 0.18), inset 0 1px 0 oklch(1 0 0 / 0.12)',
              letterSpacing: '-0.01em',
            }}
          >
            Find my funding now
            <svg width="14" height="14" fill="none" viewBox="0 0 14 14" aria-hidden="true">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <p style={{ fontSize: '0.8125rem', color: 'var(--vula-muted)' }}>
            Already registered?{' '}
            <Link
              href="/find"
              style={{ color: 'var(--vula-green)', fontWeight: 600, textDecoration: 'none' }}
            >
              Skip straight to funding
            </Link>
          </p>
        </div>
      </section>
    </main>
  )
}
