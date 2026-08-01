import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Funding vs Investing - Vula',
  description:
    'A plain-English explanation of the difference between business funding and investing, for South African entrepreneurs new to the funding process.',
}

export default function FundingVsInvestingPage() {
  return (
    <main>
      <section
        style={{
          background: 'var(--vula-bg)',
          borderBottom: '1px solid var(--vula-border)',
          padding: 'clamp(2.5rem, 5vw, 4rem) 1.25rem clamp(2rem, 4vw, 3rem)',
        }}
      >
        <div style={{ maxWidth: '42rem', margin: '0 auto' }}>
          <p
            style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.07em',
              textTransform: 'uppercase',
              color: 'var(--vula-green)',
              marginBottom: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <svg width="6" height="6" viewBox="0 0 6 6" aria-hidden="true">
              <circle cx="3" cy="3" r="3" fill="var(--vula-green)" />
            </svg>
            Before you apply
          </p>
          <h1
            style={{
              fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: 'var(--vula-ink)',
              marginBottom: '0.75rem',
            }}
          >
            Funding and investing are not the same thing
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--vula-muted)', lineHeight: 1.7 }}>
            One of the biggest misconceptions among South African entrepreneurs is that business funding is free money the government hands out to anyone who asks. It is not. Here is what funding and investing actually mean, in plain English.
          </p>
        </div>
      </section>

      <section
        style={{
          maxWidth: '42rem',
          margin: '0 auto',
          padding: 'clamp(2rem, 4vw, 3rem) 1.25rem clamp(4rem, 8vw, 6rem)',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
        }}
      >
        <div>
          <h2
            style={{
              fontSize: '1.125rem',
              fontWeight: 700,
              color: 'var(--vula-ink)',
              marginBottom: '0.625rem',
            }}
          >
            What funding actually is
          </h2>
          <p style={{ fontSize: '0.9375rem', color: 'var(--vula-muted)', lineHeight: 1.75 }}>
            Funding is money you apply for and that comes with conditions. It usually falls into one of these categories:
          </p>
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: '0.875rem 0 0',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}
          >
            {[
              'Grant: money you do not repay, but only for a specific approved purpose, and only if you qualify against strict criteria',
              'Loan: money you repay over time, with interest, whether the business does well or not',
              'Revenue-based finance: money repaid automatically as a percentage of your daily or monthly sales',
              'Blended finance: part grant, part loan, combined into one offer',
              'Guarantee: the funder does not give you cash directly, they make it easier for a bank to lend to you',
            ].map((item, i) => (
              <li
                key={i}
                style={{
                  display: 'flex',
                  gap: '0.625rem',
                  fontSize: '0.9rem',
                  color: 'var(--vula-muted)',
                  lineHeight: 1.6,
                }}
              >
                <svg width="14" height="14" fill="none" viewBox="0 0 14 14" aria-hidden="true" style={{ flexShrink: 0, marginTop: '0.25rem' }}>
                  <path d="M11.5 3.5L5.5 9.5 2.5 6.5" stroke="var(--vula-green)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
          <p style={{ fontSize: '0.9375rem', color: 'var(--vula-muted)', lineHeight: 1.75, marginTop: '0.875rem' }}>
            None of these are automatic. Every one of them requires an application, documents, and proof that your business meets the criteria. Government grants in particular are competitive, oversubscribed, and often tied to specific spending categories, not general cash handouts.
          </p>
        </div>

        <div>
          <h2
            style={{
              fontSize: '1.125rem',
              fontWeight: 700,
              color: 'var(--vula-ink)',
              marginBottom: '0.625rem',
            }}
          >
            What investing actually is
          </h2>
          <p style={{ fontSize: '0.9375rem', color: 'var(--vula-muted)', lineHeight: 1.75 }}>
            Investing means someone gives your business money in exchange for part ownership. There is no repayment schedule, but there is a cost. The investor now owns a share of your business and expects it to grow in value, or to receive a portion of future profit.
          </p>
          <p style={{ fontSize: '0.9375rem', color: 'var(--vula-muted)', lineHeight: 1.75, marginTop: '0.875rem' }}>
            Investors are selective. They look for businesses that can scale quickly and generate a strong return, not businesses that simply need working capital to keep operating. If you are not planning to give up a share of your business, investing is not the right path for you, funding is.
          </p>
        </div>

        <div
          style={{
            background: 'var(--vula-surface)',
            border: '1px solid var(--vula-border)',
            borderRadius: 'var(--radius-xl)',
            padding: '1.25rem 1.5rem',
          }}
        >
          <h2
            style={{
              fontSize: '0.8125rem',
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--vula-faint)',
              marginBottom: '0.75rem',
            }}
          >
            In one sentence
          </h2>
          <p style={{ fontSize: '0.9375rem', color: 'var(--vula-ink)', lineHeight: 1.7, fontWeight: 500 }}>
            Funding is money with conditions attached to how you use it and whether you repay it. Investing is money with conditions attached to who owns your business.
          </p>
        </div>

        <div>
          <Link
            href="/find"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.65rem 1.25rem',
              background: 'var(--vula-green)',
              color: '#fff',
              fontWeight: 600,
              fontSize: '0.875rem',
              borderRadius: 'var(--radius-lg)',
              textDecoration: 'none',
              boxShadow: '0 1px 3px oklch(0.18 0.04 145 / 0.22)',
            }}
          >
            Find funding matched to my stage
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  )
}
