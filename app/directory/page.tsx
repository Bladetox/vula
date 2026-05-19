import { createClient } from '@/lib/supabase/server'
import { FundingCard } from '@/components/FundingCard'
import { type Industry, type FundingOpportunity } from '@/lib/types'
import Link from 'next/link'

export default async function DirectoryPage({
  searchParams
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

  return (
    <div className="max-w-5xl mx-auto px-4 pt-10 pb-24">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--vula-ink)] mb-2">Funding directory</h1>
        <p className="text-[var(--vula-muted)]">All verified opportunities. Updated monthly. Always check the official source before applying.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Link
          href="/directory"
          className={`text-sm px-4 py-2 rounded-full border transition-colors duration-150 ${
            !params.industry && !params.status
              ? 'bg-[var(--vula-green)] text-white border-[var(--vula-green)]'
              : 'bg-white text-[var(--vula-ink)] border-[var(--vula-border)] hover:border-[var(--vula-green)]'
          }`}
        >
          All
        </Link>
        {industries.map((ind) => (
          <Link
            key={ind.slug}
            href={`/directory?industry=${ind.slug}`}
            className={`text-sm px-4 py-2 rounded-full border transition-colors duration-150 ${
              params.industry === ind.slug
                ? 'bg-[var(--vula-green)] text-white border-[var(--vula-green)]'
                : 'bg-white text-[var(--vula-ink)] border-[var(--vula-border)] hover:border-[var(--vula-green)]'
            }`}
          >
            {ind.name}
          </Link>
        ))}
      </div>

      {/* Results */}
      {!opportunities.length ? (
        <div className="text-center py-16 text-[var(--vula-muted)]">
          No opportunities found for this filter.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {opportunities.map((opp) => (
            <FundingCard key={opp.id} opportunity={opp} />
          ))}
        </div>
      )}
    </div>
  )
}
