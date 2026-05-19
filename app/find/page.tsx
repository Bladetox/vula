import { createClient } from '@/lib/supabase/server'
import { FundingCard } from '@/components/FundingCard'
import Link from 'next/link'
import type { FundingOpportunity } from '@/lib/types'

export default async function FindPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; industry?: string; youth?: string; women?: string; informal?: string }>
}) {
  const params = await searchParams
  const supabase = await createClient()

  let query = supabase
    .from('funding_opportunities')
    .select('*')
    .neq('status', 'closed')
    .order('title')

  if (params.type === 'informal' || params.informal === 'true') {
    query = query.eq('requires_registration', false)
  }
  if (params.industry) {
    query = query.contains('industries', [params.industry])
  }
  if (params.youth === 'true') {
    query = query.eq('target_youth', true)
  }
  if (params.women === 'true') {
    query = query.eq('target_women', true)
  }

  const { data } = await query
  const opportunities = (data ?? []) as FundingOpportunity[]

  const noFilter = !params.type && !params.informal && !params.youth && !params.women

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
        <div style={{ maxWidth: '48rem', margin: '0 auto' }}>
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
            Funding search
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
            Find your funding
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--vula-muted)', lineHeight: 1.6 }}>
            Opportunities matched to your business profile. Always verify on the official source before applying.
          </p>
        </div>
      </section>

      {/* Filters + results */}
      <section
        style={{
          maxWidth: '48rem',
          margin: '0 auto',
          padding: 'clamp(1.5rem, 3vw, 2.5rem) 1.25rem clamp(4rem, 8vw, 6rem)',
        }}
      >
        {/* Filter chips */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            marginBottom: '1.75rem',
          }}
          role="group"
          aria-label="Filter opportunities"
        >
          <FilterChip href="/find" label="All" active={noFilter} />
          <FilterChip href="/find?type=informal" label="No registration needed" active={params.type === 'informal'} />
          <FilterChip href="/find?youth=true" label="Youth" active={params.youth === 'true'} />
          <FilterChip href="/find?women=true" label="Women-owned" active={params.women === 'true'} />
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
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5" />
              <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <p style={{ fontWeight: 600, color: 'var(--vula-ink)', marginBottom: '0.375rem' }}>No opportunities match</p>
            <p style={{ fontSize: '0.875rem' }}>Try a different filter or check back later.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
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
