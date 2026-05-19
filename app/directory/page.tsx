import { createClient } from '@/lib/supabase/server'
import { FundingCard } from '@/components/FundingCard'
import { type Industry, type FundingOpportunity } from '@/lib/types'
import Link from 'next/link'

export default async function DirectoryPage({
  searchParams,
}: {
  searchParams: Promise<{ industry?: string; status?: string }>
}) {
  const params = await searchParams
  const supabase = await createClient()

  let query = supabase
    .from('funding_opportunities')
    .select('*')
    .neq('status', 'closed')
    .order('title')

  if (params.industry) {
    query = query.contains('industries', [params.industry])
  }
  if (params.status) {
    query = query.eq('status', params.status)
  }

  const { data: oppsData } = await query
  const { data: indsData } = await supabase.from('industries').select('slug, name').order('name')

  const opportunities = (oppsData ?? []) as FundingOpportunity[]
  const industries = (indsData ?? []) as Industry[]

  const noFilter = !params.industry && !params.status

  return (
    <main>
      {/* Page header */}
      <section
        style={{
          background: 'var(--vula-bg)',
          borderBottom: '1px solid var(--vula-border)',
          padding: 'clamp(2.5rem, 5vw, 4rem) 1.25rem clamp(2rem, 4vw, 3rem)',
        }}
      >
        <div style={{ maxWidth: '64rem', margin: '0 auto' }}>
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
            All opportunities
          </p>
          <h1
            style={{
              fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: 'var(--vula-ink)',
              marginBottom: '0.5rem',
            }}
          >
            Funding directory
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--vula-muted)', lineHeight: 1.6 }}>
            Verified opportunities updated monthly. Always confirm deadlines and eligibility on the official source before applying.
          </p>
        </div>
      </section>

      {/* Filters + results */}
      <section
        style={{
          maxWidth: '64rem',
          margin: '0 auto',
          padding: 'clamp(1.5rem, 3vw, 2.5rem) 1.25rem clamp(4rem, 8vw, 6rem)',
        }}
      >
        {/* Industry filter chips */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            marginBottom: '1.75rem',
          }}
          role="group"
          aria-label="Filter by industry"
        >
          <FilterChip href="/directory" label="All" active={noFilter} />
          {industries.map((ind) => (
            <FilterChip
              key={ind.slug}
              href={`/directory?industry=${ind.slug}`}
              label={ind.name}
              active={params.industry === ind.slug}
            />
          ))}
        </div>

        {opportunities.length === 0 ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              padding: '4rem 1rem',
              color: 'var(--vula-muted)',
            }}
          >
            <svg width="40" height="40" fill="none" viewBox="0 0 24 24" aria-hidden="true" style={{ marginBottom: '1rem', color: 'var(--vula-faint)' }}>
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p style={{ fontWeight: 600, color: 'var(--vula-ink)', marginBottom: '0.375rem' }}>No opportunities found</p>
            <p style={{ fontSize: '0.875rem' }}>Try a different industry filter.</p>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 22rem), 1fr))',
              gap: '0.875rem',
            }}
          >
            {opportunities.map((opp) => (
              <FundingCard key={opp.id} opportunity={opp} />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

function FilterChip({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        fontSize: '0.8125rem',
        fontWeight: active ? 600 : 500,
        padding: '0.4rem 1rem',
        borderRadius: '999px',
        textDecoration: 'none',
        border: '1px solid',
        borderColor: active ? 'var(--vula-green)' : 'var(--vula-border)',
        background: active ? 'var(--vula-green)' : 'var(--vula-surface)',
        color: active ? '#fff' : 'var(--vula-ink)',
      }}
    >
      {label}
    </Link>
  )
}
