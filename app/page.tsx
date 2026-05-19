import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import type { FundingOpportunity } from '@/lib/types'

export default async function HomePage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('funding_opportunities')
    .select('*')
    .eq('status', 'open')
    .order('created_at', { ascending: false })
    .limit(3)

  const featured = (data ?? []) as FundingOpportunity[]

  return (
    <main>
      {/* Hero */}
      <section className="max-w-3xl mx-auto px-4 pt-16 pb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--vula-ink)] leading-tight mb-4">
          Find funding for your business
        </h1>
        <p className="text-lg text-[var(--vula-muted)] mb-10 max-w-xl mx-auto">
          Vula opens the door to South African small business funding. Registered, informal, or just starting out.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/find"
            className="px-6 py-3 bg-[var(--vula-green)] text-white font-semibold rounded-xl hover:bg-[#155c33] transition-colors duration-150"
          >
            Find my funding
          </Link>
          <Link
            href="/directory"
            className="px-6 py-3 border border-[var(--vula-border)] text-[var(--vula-ink)] font-medium rounded-xl hover:border-[var(--vula-green)] transition-colors duration-150"
          >
            Browse all opportunities
          </Link>
        </div>
      </section>

      {/* Entry paths */}
      <section className="max-w-3xl mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-3 gap-4">
          <EntryCard
            href="/find"
            icon={
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            }
            title="I have a registered business"
            description="Find grants, loans, and support matched to your sector and size."
          />
          <EntryCard
            href="/find?type=informal"
            icon={
              <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            }
            title="I run an informal business"
            description="Discover funding that does not require CIPC registration."
          />
          <EntryCard
            href="/register"
            icon={
              <path d="M12 6v6m0 0v6m0-6h6m-6 0H6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            }
            title="I want to formalise"
            description="A step-by-step guide to registering your business in South Africa."
          />
        </div>
      </section>

      {/* Featured opportunities */}
      {featured.length > 0 && (
        <section className="max-w-3xl mx-auto px-4 pb-24">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[var(--vula-ink)]">Open now</h2>
            <Link href="/directory" className="text-sm text-[var(--vula-green)] font-medium hover:underline">See all</Link>
          </div>
          <div className="grid gap-4">
            {featured.map((opp) => (
              <Link
                key={opp.id}
                href={`/fund/${opp.slug}`}
                className="block bg-white border border-[var(--vula-border)] rounded-2xl p-5 hover:border-[var(--vula-green)] hover:shadow-md transition-all duration-150"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium text-[var(--vula-muted)] mb-1">{opp.funder}</p>
                    <p className="font-semibold text-[var(--vula-ink)]">{opp.title}</p>
                  </div>
                  {opp.amount_max && (
                    <span className="shrink-0 text-xs font-bold text-[var(--vula-green)] bg-[var(--vula-green-light)] px-3 py-1 rounded-full">
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
      className="group flex flex-col gap-3 bg-white border border-[var(--vula-border)] rounded-2xl p-5 hover:border-[var(--vula-green)] hover:shadow-md transition-all duration-150"
    >
      <div className="w-10 h-10 rounded-xl bg-[var(--vula-green-light)] flex items-center justify-center">
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" aria-hidden="true">
          {icon}
        </svg>
      </div>
      <div>
        <p className="font-semibold text-[var(--vula-ink)] group-hover:text-[var(--vula-green)] transition-colors duration-150 leading-tight mb-1">{title}</p>
        <p className="text-sm text-[var(--vula-muted)] leading-snug">{description}</p>
      </div>
    </Link>
  )
}
