import { createClient } from '@/lib/supabase/server'
import { FundingCard } from '@/components/FundingCard'
import { type Industry, type FundingOpportunity } from '@/lib/types'
import Link from 'next/link'

const FUNDING_TYPE_FILTERS = [
  { value: 'grant',         label: 'Grants',              plain: 'Free money, no repayment' },
  { value: 'loan',          label: 'Loans',               plain: 'Borrowed money you repay' },
  { value: 'revenue-based', label: 'Based on your sales', plain: 'Repay a share of monthly revenue' },
  { value: 'equity',        label: 'Equity',              plain: 'Investment for a stake in your business' },
  { value: 'blended',       label: 'Grant + loan combo',  plain: 'Part grant, part loan' },
]

// These funding types are sector-agnostic. Any business in any industry can apply.
// When one of these is active we skip the industry ID join so results are never
// incorrectly zeroed out by missing opportunity_industries rows.
const CROSS_SECTOR_TYPES = new Set(['revenue-based', 'equity'])

// Number of industry pills visible before collapsing
const VISIBLE_INDUSTRY_COUNT = 8

export default async function DirectoryPage({
  searchParams,
}: {
  searchParams: Promise<{ industry?: string; status?: string; type?: string; showall?: string }>
}) {
  const params = await searchParams
  const supabase = await createClient()

  const isCrossSector = params.type ? CROSS_SECTOR_TYPES.has(params.type) : false

  let opportunityIds: string[] | null = null

  if (params.industry && !isCrossSector) {
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
  params: { industry?: string; status?: string; type?: string; showall?: string },
  opportunities: FundingOpportunity[],
  industries: Industry[]
) {
  const activeType = FUNDING_TYPE_FILTERS.find((f) => f.value === params.type)
  const activeIndustry = industries.find((i) => i.slug === params.industry)
  const showAllIndustries = params.showall === '1'

  const visibleIndustries = showAllIndustries
    ? industries
    : industries.slice(0, VISIBLE_INDUSTRY_COUNT)
  const hasOverflow = !showAllIndustries && industries.length > VISIBLE_INDUSTRY_COUNT
  const overflowCount = industries.length - VISIBLE_INDUSTRY_COUNT

  const hasActiveFilters = !!(params.type || params.industry)

  // Build clear-all href
  const clearAllHref = '/directory'

  function typeHref(value?: string) {
    const base = params.industry ? `/directory?industry=${params.industry}` : '/directory'
    return value ? `${base}${params.industry ? '&' : '?'}type=${value}` : base
  }

  function industryHref(slug: string) {
    const base = `/directory?industry=${slug}`
    return params.type ? `${base}&type=${params.type}` : base
  }

  const clearIndustryHref = params.type ? `/directory?type=${params.type}` : '/directory'
  const showMoreHref = params.type
    ? `/directory?type=${params.type}&showall=1`
    : params.industry
    ? `/directory?industry=${params.industry}&showall=1`
    : '/directory?showall=1'

  const resultWord = opportunities.length === 1 ? 'opportunity' : 'opportunities'

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
            Funding directory
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
            Find the right funding faster
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--vula-muted)', lineHeight: 1.6 }}>
            {opportunities.length > 0
              ? `${opportunities.length} ${resultWord} listed. Confirm deadlines and eligibility on the official source before applying.`
              : 'Verified opportunities updated monthly. Confirm deadlines and eligibility on the official source before applying.'}
          </p>
        </div>
      </section>

      {/* Filter and results */}
      <section
        style={{
          maxWidth: '64rem',
          margin: '0 auto',
          padding: 'clamp(1.5rem, 3vw, 2.5rem) 1.25rem clamp(4rem, 8vw, 6rem)',
        }}
      >
        {/* Funding type filter */}
        <div style={{ marginBottom: '0.5rem' }}>
          <p
            style={{
              fontSize: '0.6875rem',
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--vula-faint)',
              marginBottom: '0.625rem',
            }}
          >
            Funding type
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
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
          {/* Plain-language tooltip for active type */}
          {activeType && (
            <p
              style={{
                fontSize: '0.8125rem',
                color: 'var(--vula-muted)',
                marginTop: '0.625rem',
                lineHeight: 1.5,
              }}
            >
              {activeType.plain}
            </p>
          )}
        </div>

        {/* Industry filter */}
        <div
          style={{
            borderTop: '1px solid var(--vula-border)',
            paddingTop: '1rem',
            marginBottom: '1.5rem',
            marginTop: '1rem',
          }}
        >
          <p
            style={{
              fontSize: '0.6875rem',
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--vula-faint)',
              marginBottom: '0.625rem',
            }}
          >
            Industry
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
            }}
            role="group"
            aria-label="Filter by industry"
          >
            {params.industry && activeIndustry ? (
              // Collapsed: show clear + active pill only
              <>
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
                <FilterChip
                  href={industryHref(activeIndustry.slug)}
                  label={activeIndustry.name}
                  active={true}
                />
              </>
            ) : (
              // Not filtered: show first N industries + overflow link
              <>
                <FilterChip
                  href={params.type ? `/directory?type=${params.type}` : '/directory'}
                  label="All industries"
                  active={!params.industry}
                />
                {visibleIndustries.map((ind) => (
                  <FilterChip
                    key={ind.slug}
                    href={industryHref(ind.slug)}
                    label={ind.name}
                    active={false}
                  />
                ))}
                {hasOverflow && (
                  <Link
                    href={showMoreHref}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
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
                    +{overflowCount} more
                  </Link>
                )}
              </>
            )}
          </div>
        </div>

        {/* Active filter summary */}
        {hasActiveFilters && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              flexWrap: 'wrap',
              marginBottom: '1.25rem',
              padding: '0.75rem 1rem',
              background: 'var(--vula-surface)',
              border: '1px solid var(--vula-border)',
              borderRadius: 'var(--radius-lg, 0.75rem)',
              fontSize: '0.8125rem',
              color: 'var(--vula-muted)',
            }}
          >
            <span style={{ flex: 1 }}>
              {[activeType?.label, activeIndustry?.name].filter(Boolean).join(', ')} &mdash; {opportunities.length} {resultWord}
            </span>
            <Link
              href={clearAllHref}
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'var(--vula-ink)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
              }}
            >
              Clear all
            </Link>
          </div>
        )}

        {/* Results */}
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
            <svg
              width="40"
              height="40"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
              style={{ marginBottom: '1rem', color: 'var(--vula-faint)' }}
            >
              <path
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p style={{ fontWeight: 600, color: 'var(--vula-ink)', marginBottom: '0.375rem' }}>
              No results for this combination
            </p>
            <p style={{ fontSize: '0.875rem', marginBottom: '1rem' }}>
              Try removing a filter or browsing all opportunities.
            </p>
            <Link
              href="/directory"
              style={{
                fontSize: '0.875rem',
                fontWeight: 600,
                color: 'var(--vula-green)',
                textDecoration: 'none',
              }}
            >
              Clear all filters
            </Link>
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

function FilterChip({
  href,
  label,
  active,
  amber,
}: {
  href: string
  label: string
  active: boolean
  amber?: boolean
}) {
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
          ? amber
            ? '#c2500a'
            : 'var(--vula-green)'
          : 'var(--vula-border)',
        background: active
          ? amber
            ? '#c2500a'
            : 'var(--vula-green)'
          : 'var(--vula-surface)',
        color: active ? '#fff' : 'var(--vula-ink)',
      }}
    >
      {label}
    </Link>
  )
}
