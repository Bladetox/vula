import { createClient } from '@/lib/supabase/server'
import { FundingCard } from '@/components/FundingCard'
import Link from 'next/link'
import type { FundingOpportunity, BusinessStage } from '@/lib/types'

const STAGES: {
  value: BusinessStage
  label: string
  sub: string
  icon: React.ReactNode
}[] = [
  {
    value: 'pre-revenue',
    label: 'No revenue yet',
    sub: 'Idea stage or just getting started, no sales yet',
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 8v4l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    value: 'early',
    label: 'Early trading',
    sub: 'Generating revenue, under R500k per year',
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 17l5-5 4 4 9-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    value: 'growth',
    label: 'Growing',
    sub: 'R500k to R5m annual turnover',
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M2 20h20M6 20V14M10 20V10M14 20V6M18 20V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    value: 'established',
    label: 'Established',
    sub: 'Over R5m annual turnover',
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

export default async function FindPage({
  searchParams,
}: {
  searchParams: Promise<{
    stage?: string
    type?: string
    industry?: string
    youth?: string
    women?: string
    over35?: string
    informal?: string
    cooperative?: string
    'revenue-based'?: string
  }>
}) {
  const params = await searchParams
  const stage = params.stage as BusinessStage | undefined

  // No stage selected yet -- show the interstitial picker
  if (!stage) {
    return <StagePicker />
  }

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

  // Stage filter: include exact matches and 'any'
  if (stage && stage !== 'any') {
    query = query.in('business_stage', [stage, 'any'])
  }

  if (opportunityIds !== null) {
    if (opportunityIds.length === 0) {
      return renderResults(params, stage, [])
    }
    query = query.in('id', opportunityIds)
  }

  if (params.type === 'informal' || params.informal === 'true') {
    query = query.eq('requires_registration', false)
  }
  if (params.type === 'revenue-based') {
    query = query.eq('funding_type', 'revenue-based')
  }
  if (params.youth === 'true') {
    query = query.eq('target_youth', true)
  }
  if (params.women === 'true') {
    query = query.eq('target_women', true)
  }
  if (params.over35 === 'true') {
    query = query.eq('target_over35', true)
  }
  if (params.cooperative === 'true') {
    query = query.eq('target_cooperative', true)
  }

  const { data } = await query
  const opportunities = (data ?? []) as FundingOpportunity[]

  return renderResults(params, stage, opportunities)
}

function StagePicker() {
  return (
    <main>
      <section
        style={{
          background: 'var(--vula-bg)',
          borderBottom: '1px solid var(--vula-border)',
          padding: 'clamp(2.5rem, 5vw, 4rem) 1.25rem clamp(2rem, 4vw, 3rem)',
        }}
      >
        <div style={{ maxWidth: '38rem', margin: '0 auto' }}>
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
            Step 1 of 2
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
            Where is your business right now?
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--vula-muted)', lineHeight: 1.6 }}>
            This determines which funding is realistic for your stage. Pick the option that best describes you today.
          </p>
        </div>
      </section>

      <section
        style={{
          maxWidth: '38rem',
          margin: '0 auto',
          padding: 'clamp(1.5rem, 3vw, 2.5rem) 1.25rem clamp(4rem, 8vw, 6rem)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
        }}
      >
        {STAGES.map((s) => (
          <Link
            key={s.value}
            href={`/find?stage=${s.value}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.25rem',
              padding: '1.25rem 1.5rem',
              background: 'var(--vula-surface)',
              border: '1px solid var(--vula-border)',
              borderRadius: 'var(--radius-xl)',
              textDecoration: 'none',
              color: 'var(--vula-ink)',
              transition: 'border-color 0.15s, box-shadow 0.15s',
            }}
          >
            <span
              style={{
                flexShrink: 0,
                width: '2.75rem',
                height: '2.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--vula-green-subtle)',
                border: '1px solid var(--vula-green-light)',
                borderRadius: 'var(--radius-lg)',
                color: 'var(--vula-green)',
              }}
            >
              {s.icon}
            </span>
            <span style={{ flex: 1 }}>
              <span style={{ display: 'block', fontWeight: 700, fontSize: '0.9375rem', marginBottom: '0.2rem' }}>
                {s.label}
              </span>
              <span style={{ display: 'block', fontSize: '0.8125rem', color: 'var(--vula-muted)', lineHeight: 1.5 }}>
                {s.sub}
              </span>
            </span>
            <svg width="16" height="16" fill="none" viewBox="0 0 16 16" aria-hidden="true" style={{ flexShrink: 0, color: 'var(--vula-faint)' }}>
              <path d="M6 12l4-4-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        ))}

        <Link
          href="/find?stage=any"
          style={{
            display: 'block',
            textAlign: 'center',
            marginTop: '0.5rem',
            fontSize: '0.8125rem',
            color: 'var(--vula-faint)',
            textDecoration: 'underline',
            textUnderlineOffset: '3px',
          }}
        >
          Skip and show all opportunities
        </Link>
      </section>
    </main>
  )
}

function renderResults(
  params: {
    stage?: string
    type?: string
    industry?: string
    youth?: string
    women?: string
    over35?: string
    informal?: string
    cooperative?: string
  },
  stage: BusinessStage,
  opportunities: FundingOpportunity[]
) {
  const stageLabel = STAGES.find((s) => s.value === stage)?.label ?? 'All'
  const noFilter = !params.type && !params.informal && !params.youth && !params.women && !params.over35 && !params.cooperative

  return (
    <main>
      <section
        style={{
          background: 'var(--vula-bg)',
          borderBottom: '1px solid var(--vula-border)',
          padding: 'clamp(2.5rem, 5vw, 4rem) 1.25rem clamp(2rem, 4vw, 3rem)',
        }}
      >
        <div style={{ maxWidth: '48rem', margin: '0 auto' }}>
          <Link
            href="/find"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.375rem',
              fontSize: '0.8125rem',
              color: 'var(--vula-muted)',
              textDecoration: 'none',
              marginBottom: '1rem',
            }}
          >
            <svg width="14" height="14" fill="none" viewBox="0 0 14 14" aria-hidden="true">
              <path d="M9 11L5 7l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Change stage
          </Link>
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
            {stage === 'any' ? 'All opportunities' : `Matched to: ${stageLabel}`}
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

      <section
        style={{
          maxWidth: '48rem',
          margin: '0 auto',
          padding: 'clamp(1.5rem, 3vw, 2.5rem) 1.25rem clamp(4rem, 8vw, 6rem)',
        }}
      >
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
          <FilterChip href={`/find?stage=${stage}`} label="All" active={noFilter} />
          <FilterChip href={`/find?stage=${stage}&type=informal`} label="No registration needed" active={params.type === 'informal'} />
          <FilterChip href={`/find?stage=${stage}&youth=true`} label="Youth" active={params.youth === 'true'} />
          <FilterChip href={`/find?stage=${stage}&women=true`} label="Women-owned" active={params.women === 'true'} />
          <FilterChip href={`/find?stage=${stage}&over35=true`} label="35 and older" active={params.over35 === 'true'} />
          <FilterChip href={`/find?stage=${stage}&cooperative=true`} label="Co-operative" active={params.cooperative === 'true'} />
          <FilterChip
            href={`/find?stage=${stage}&type=revenue-based`}
            label="Revenue-based"
            active={params.type === 'revenue-based'}
            amber
          />
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
