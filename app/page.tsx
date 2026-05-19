import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import type { FundingOpportunity } from '@/lib/types'

export default async function HomePage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('funding_opportunities')
    .select('*')
    .neq('status', 'closed')
    .order('created_at', { ascending: false })
    .limit(3)

  const featured = (data ?? []) as FundingOpportunity[]

  return (
    <main>
      {/* Hero */}
      <section
        style={{
          maxWidth: '56rem',
          margin: '0 auto',
          padding: 'clamp(3.5rem, 8vw, 6rem) 1.25rem clamp(2.5rem, 5vw, 4rem)'
        }}
      >
        {/* Eyebrow */}
        <p
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--vula-green)',
            marginBottom: '1.25rem'
          }}
        >
          <svg width="6" height="6" viewBox="0 0 6 6" aria-hidden="true">
            <circle cx="3" cy="3" r="3" fill="var(--vula-green)" />
          </svg>
          South African Small Business Funding
        </p>

        <h1
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.25rem)',
            fontWeight: 700,
            color: 'var(--vula-ink)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginBottom: '1.25rem',
            maxWidth: '18ch'
          }}
        >
          Find the funding your business qualifies for
        </h1>

        <p
          style={{
            fontSize: '1.0625rem',
            color: 'var(--vula-muted)',
            lineHeight: 1.65,
            marginBottom: '2.25rem',
            maxWidth: '46ch'
          }}
        >
          Vula surfaces verified grants, loans, and support programmes. Registered, informal, or just starting out.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem' }}>
          <Link
            href="/find"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.75rem 1.375rem',
              background: 'var(--vula-green)',
              color: '#fff',
              fontWeight: 600,
              fontSize: '0.9375rem',
              borderRadius: 'var(--radius-lg)',
              textDecoration: 'none',
              boxShadow: '0 1px 3px oklch(0.18 0.04 145 / 0.25), inset 0 1px 0 oklch(1 0 0 / 0.08)'
            }}
          >
            Find my funding
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2.5 7h9M7.5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link
            href="/directory"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '0.75rem 1.375rem',
              border: '1px solid var(--vula-border-em)',
              color: 'var(--vula-ink)',
              fontWeight: 500,
              fontSize: '0.9375rem',
              borderRadius: 'var(--radius-lg)',
              textDecoration: 'none',
              background: 'var(--vula-surface-2)'
            }}
          >
            Browse all
          </Link>
        </div>
      </section>

      {/* Divider rule */}
      <div style={{ maxWidth: '56rem', margin: '0 auto', padding: '0 1.25rem' }}>
        <hr style={{ border: 'none', borderTop: '1px solid var(--vula-border)', marginBottom: '2.5rem' }} />
      </div>

      {/* Entry paths */}
      <section style={{ maxWidth: '56rem', margin: '0 auto', padding: '0 1.25rem 4rem' }}>
        <p style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--vula-faint)', marginBottom: '1.25rem' }}>
          Where do you start?
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 16rem), 1fr))', gap: '0.875rem' }}>
          <EntryCard
            href="/find"
            icon={
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            }
            title="Registered business"
            description="Find grants, loans, and support matched to your sector and size."
          />
          <EntryCard
            href="/find?type=informal"
            icon={
              <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            }
            title="Informal business"
            description="Funding that does not require CIPC registration."
          />
          <EntryCard
            href="/register"
            icon={
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            }
            title="Want to formalise"
            description="Step-by-step guide to registering your business in South Africa."
          />
        </div>
      </section>

      {/* Featured opportunities */}
      {featured.length > 0 && (
        <section
          style={{
            maxWidth: '56rem',
            margin: '0 auto',
            padding: '0 1.25rem 6rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--vula-ink)', letterSpacing: '-0.01em' }}>Open now</h2>
            <Link
              href="/directory"
              style={{
                fontSize: '0.8125rem',
                fontWeight: 500,
                color: 'var(--vula-green)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}
            >
              See all
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            {featured.map((opp) => (
              <Link
                key={opp.id}
                href={`/fund/${opp.id}`}
                style={{
                  display: 'block',
                  background: 'var(--vula-surface-2)',
                  border: '1px solid var(--vula-border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.125rem 1.25rem',
                  textDecoration: 'none',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem' }}>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--vula-faint)', marginBottom: '0.2rem' }}>{opp.funder}</p>
                    <p style={{ fontWeight: 600, color: 'var(--vula-ink)', fontSize: '0.9375rem', lineHeight: 1.35 }}>{opp.title}</p>
                  </div>
                  {opp.amount_max && (
                    <span
                      style={{
                        flexShrink: 0,
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: 'var(--vula-green)',
                        background: 'var(--vula-green-subtle)',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '999px',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      Up to R{opp.amount_max.toLocaleString('en-ZA')}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}

function EntryCard({
  href,
  icon,
  title,
  description
}: {
  href: string
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <Link
      href={href}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.875rem',
        background: 'var(--vula-surface-2)',
        border: '1px solid var(--vula-border)',
        borderRadius: 'var(--radius-xl)',
        padding: '1.25rem',
        textDecoration: 'none',
        boxShadow: 'var(--shadow-sm)'
      }}
    >
      <div
        style={{
          width: '2.25rem',
          height: '2.25rem',
          borderRadius: 'var(--radius)',
          background: 'var(--vula-green-subtle)',
          border: '1px solid var(--vula-green-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--vula-green)'
        }}
      >
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" aria-hidden="true">
          {icon}
        </svg>
      </div>
      <div>
        <p style={{ fontWeight: 600, fontSize: '0.9375rem', color: 'var(--vula-ink)', lineHeight: 1.3, marginBottom: '0.3rem' }}>{title}</p>
        <p style={{ fontSize: '0.8125rem', color: 'var(--vula-muted)', lineHeight: 1.55 }}>{description}</p>
      </div>
    </Link>
  )
}
