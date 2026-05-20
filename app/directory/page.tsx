import { createClient } from '@/lib/supabase/server'
import { FundingCard } from '@/components/FundingCard'
import { type Industry, type FundingOpportunity } from '@/lib/types'
import Link from 'next/link'

const FUNDING_TYPE_FILTERS = [
  { value: 'grant',          label: 'Grants' },
  { value: 'loan',           label: 'Loans' },
  { value: 'revenue-based',  label: 'Revenue-based' },
  { value: 'equity',         label: 'Equity' },
  { value: 'blended',        label: 'Blended finance' },
]

export default async function DirectoryPage({
  searchParams,
}: {
  searchParams: Promise<{ industry?: string; status?: string; type?: string }>
}) {
  const params = await searchParams
  const supabase = await createClient()

  let opportunityIds: string[] | null = null
  if (params.industry) {
    const { data: indRaw } = await supabase
      .from('industries')
      .select('id')
      .eq('slug', params.industry)
      .single()

    const ind = indRaw as { id: string } | null

    if (ind) {
      const { data: joinsRaw } = await supabase
        .from('opportunity_industries')
        .select('opportunity_id')
        .eq('industry_id', ind.id)

      const joins = (joinsRaw ?? []) as { opportunity_id: string }[]
      opportunityIds = joins.map((j) => j.opportunity_id)
    } else {
      opportunityIds = []
    }
  }

  let query = supabase
    .from('funding_opportunities')
    .select('*')
    .eq('published', true)
    .neq('status', 'closed')
    .order('title')

  if (opportunityIds !== null) {
    if (opportunityIds.length === 0) {
      const { data: indsData } = await supabase.from('industries').select('slug, name').order('name')
      const industries = (indsData ?? []) as Industry[]
      return renderPage(params, [], industries)
    }
    query = query.in('id', opportunityIds)
  }

  if (params.status) {
    query = query.eq('status', params.status)
  }

  if (params.type) {
    query = query.eq('funding_type', params.type)
  }

  const { data: oppsData } = await query
  const { data: indsData } = await supabase.from('industries').select('slug, name').order('name')

  const opportunities = (oppsData ?? []) as FundingOpportunity[]
  const industries = (indsData ?? []) as Industry[]

  return renderPage(params, opportunities, industries)
}

function renderPage(
  params: { industry?: string; status?: string; type?: string },
  opportunities: FundingOpportunity[],
  industries: Industry[]
) {
  function typeHref(value?: string) {
    const base = params.industry ? `/directory?industry=${params.industry}` : '/directory'
    return value ? `${base}${params.industry ? '&' : '?'}type=${value}` : base
  }

  const activeIndustry = industries.find((i) => i.slug === params.industry)
  const clearIndustryHref = params.type ? `/directory?type=${params.type}` : '/directory'

  return (
    <main>
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

      <section
        style={{
          maxWidth: '64rem',
          margin: '0 auto',
          padding: 'clamp(1.5rem, 3vw, 2.5rem) 1.25rem clamp(4rem, 8vw, 6rem)',
        }}
      >
        {/* Funding type filter */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            marginBottom: '0.875rem',
          }}
          role="group"
          aria-label="Filter by funding type"
        >
          <FilterChip href={typeHref()} label="All types" active={!params.type} />
          {FUNDING_TYPE_FILTERS.map((f) => (
            <FilterChip
              key={f.value}
              href={typeHref(f.value)}
              label={f.label}
              active={params.type === f.value}
              amber={f.value === 'revenue-based'}
            />
          ))}
        </div>

        {/* Industry filter
            - No active industry: show all pills
            - Active industry: show only a clear pill + the selected pill
        */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            marginBottom: '1.75rem',
            paddingTop: '0.625rem',
            borderTop: '1px solid var(--vula-border)',
          }}
          role="group"
          aria-label="Filter by industry"
        >
          {params.industry && activeIndustry ? (
            <>
              {/* Clear pill */}
              <Link
                href={clearIndustryHref}
                aria-label="Clear industry filter"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  padding: '0.4rem 0.875rem',
                  borderRadius: '999px',
                  textDecoration: 'none',
                  border: '1px solid var(--vula-border)',
                  background: 'var(--vula-surface)',
                  color: 'var(--vula-muted)',
                }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M9 3L3 9M3 3l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                All industries
              </Link>
              {/* Active industry pill only */}
              <FilterChip
                href={`/directory?industry=${activeIndustry.slug}${params.type ? `&type=${params.type}` : ''}`}
                label={activeIndustry.name}
                active={true}
              />
            </>
          ) : (
            <>
              <FilterChip
                href={params.type ? `/directory?type=${params.type}` : '/directory'}
                label="All industries"
                active={!params.industry}
              />
              {industries.map((ind) => (
                <FilterChip
                  key={ind.slug}
                  href={`/directory?industry=${ind.slug}${params.type ? `&type=${params.type}` : ''}`}
                  label={ind.name}
                  active={false}
                />
              ))}
            </>
          )}
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
            <p style={{ fontSize: '0.875rem' }}>Try a different filter combination.</p>
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

function FilterChip({ href, label, active, amber }: { href: string; label: string; active: boolean; amber?: boolean }) {
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
        borderColor: active
          ? amber ? '#c2500a' : 'var(--vula-green)'
          : 'var(--vula-border)',
        background: active
          ? amber ? '#c2500a' : 'var(--vula-green)'
          : 'var(--vula-surface)',
        color: active ? '#fff' : 'var(--vula-ink)',
      }}
    >
      {label}
    </Link>
  )
}
