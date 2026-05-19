import { createClient } from '@/lib/supabase/server'
import { FundingCard } from '@/components/FundingCard'
import type { FundingOpportunity } from '@/lib/types'

export default async function FindPage({
  searchParams
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

  return (
    <div className="max-w-3xl mx-auto px-4 pt-10 pb-24">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--vula-ink)] mb-2">Find your funding</h1>
        <p className="text-[var(--vula-muted)]">Opportunities matched to your business profile.</p>
      </div>

      {/* Quick filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        <FilterChip href="/find" label="All" active={!params.type && !params.informal && !params.youth && !params.women} />
        <FilterChip href="/find?type=informal" label="No registration needed" active={params.type === 'informal'} />
        <FilterChip href="/find?youth=true" label="Youth" active={params.youth === 'true'} />
        <FilterChip href="/find?women=true" label="Women-owned" active={params.women === 'true'} />
      </div>

      {!opportunities.length ? (
        <div className="text-center py-16 text-[var(--vula-muted)]">
          No opportunities match these filters right now.
        </div>
      ) : (
        <div className="grid gap-4">
          {opportunities.map((opp) => (
            <FundingCard key={opp.id} opportunity={opp} />
          ))}
        </div>
      )}
    </div>
  )
}

import Link from 'next/link'

function FilterChip({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={`text-sm px-4 py-2 rounded-full border transition-colors duration-150 ${
        active
          ? 'bg-[var(--vula-green)] text-white border-[var(--vula-green)]'
          : 'bg-white text-[var(--vula-ink)] border-[var(--vula-border)] hover:border-[var(--vula-green)]'
      }`}
    >
      {label}
    </Link>
  )
}
