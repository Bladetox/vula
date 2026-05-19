import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import type { FundingOpportunity } from '@/lib/types'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data } = await supabase.from('funding_opportunities').select('title, description').eq('slug', slug).single()
  const opp = data as Pick<FundingOpportunity, 'title' | 'description'> | null
  if (!opp) return { title: 'Not found' }
  return {
    title: `${opp.title} | Vula`,
    description: opp.description
  }
}

const STATUS_CONFIG: Record<string, { label: string; bg: string; color: string }> = {
  open: { label: 'Open', bg: 'var(--vula-green-light)', color: 'var(--vula-green)' },
  seasonal: { label: 'Seasonal', bg: '#fef3c7', color: '#d97706' },
  pilot: { label: 'Pilot', bg: '#ede9fe', color: '#7c3aed' },
  closed: { label: 'Closed', bg: '#f3f4f6', color: '#6b7280' }
}

export default async function FundPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()
  const { data } = await supabase
    .from('funding_opportunities')
    .select('*')
    .eq('slug', slug)
    .single()

  const opp = data as FundingOpportunity | null
  if (!opp) notFound()

  const status = STATUS_CONFIG[opp.status] ?? STATUS_CONFIG['open']

  return (
    <div className="max-w-2xl mx-auto px-4 pt-10 pb-24">
      <Link href="/directory" className="inline-flex items-center gap-1.5 text-sm text-[var(--vula-muted)] hover:text-[var(--vula-ink)] mb-8 transition-colors">
        <svg width="14" height="14" fill="none" viewBox="0 0 16 16" aria-hidden="true">
          <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Back to directory
      </Link>

      <div className="bg-white border border-[var(--vula-border)] rounded-2xl p-8">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <p className="text-sm font-medium text-[var(--vula-muted)] mb-1">{opp.funder}</p>
            <h1 className="text-2xl font-bold text-[var(--vula-ink)] leading-tight">{opp.title}</h1>
          </div>
          <span
            className="shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full"
            style={{ background: status.bg, color: status.color }}
          >
            {status.label}
          </span>
        </div>

        {/* Amount */}
        {(opp.amount_max || opp.amount_min) && (
          <div className="mb-6 p-4 bg-[var(--vula-green-light)] rounded-xl">
            <p className="text-xs font-semibold text-[var(--vula-green)] uppercase tracking-wide mb-1">Funding amount</p>
            <p className="text-xl font-bold text-[var(--vula-green)]">
              {opp.amount_max
                ? `Up to R${opp.amount_max.toLocaleString('en-ZA')}`
                : `From R${opp.amount_min?.toLocaleString('en-ZA')}`
              }
            </p>
          </div>
        )}

        {/* Description */}
        <p className="text-[var(--vula-muted)] leading-relaxed mb-8">{opp.description}</p>

        {/* Eligibility */}
        {opp.eligibility_notes && (
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-[var(--vula-ink)] uppercase tracking-wide mb-3">Who qualifies</h2>
            <p className="text-sm text-[var(--vula-muted)] leading-relaxed bg-[var(--vula-bg)] rounded-xl p-4">{opp.eligibility_notes}</p>
          </div>
        )}

        {/* Documents */}
        {opp.documents_required?.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm font-semibold text-[var(--vula-ink)] uppercase tracking-wide mb-3">Documents needed</h2>
            <ul className="space-y-2">
              {opp.documents_required.map((doc: string) => (
                <li key={doc} className="flex items-start gap-2 text-sm text-[var(--vula-muted)]">
                  <svg width="16" height="16" fill="none" viewBox="0 0 16 16" className="mt-0.5 shrink-0" aria-hidden="true">
                    <path d="M13 4L6 11 3 8" stroke="var(--vula-green)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {doc}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Target badges */}
        <div className="flex flex-wrap gap-2 mb-8">
          {opp.target_youth && <Badge label="Youth" />}
          {opp.target_women && <Badge label="Women-owned" />}
          {opp.target_disability && <Badge label="Disability" />}
          {opp.target_cooperative && <Badge label="Co-operative" />}
          {!opp.requires_registration && <Badge label="Informal eligible" color="gold" />}
        </div>

        {/* CTA */}
        {opp.apply_url && (
          <a
            href={opp.apply_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center bg-[var(--vula-green)] text-white font-semibold py-4 rounded-xl hover:bg-[#155c33] transition-colors duration-150"
          >
            Apply on official site
          </a>
        )}
        {opp.official_source_url && opp.official_source_url !== opp.apply_url && (
          <a
            href={opp.official_source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center border border-[var(--vula-border)] text-[var(--vula-muted)] font-medium py-3 rounded-xl hover:border-[var(--vula-green)] hover:text-[var(--vula-ink)] transition-colors duration-150 mt-3"
          >
            View official source
          </a>
        )}

        <p className="text-xs text-[var(--vula-muted)] text-center mt-4">
          Always verify eligibility and deadlines on the official source before applying.
        </p>
      </div>
    </div>
  )
}

function Badge({ label, color = 'green' }: { label: string; color?: 'green' | 'gold' }) {
  const styles = {
    green: { bg: 'var(--vula-green-light)', color: 'var(--vula-green)' },
    gold: { bg: 'var(--vula-gold-light)', color: 'var(--vula-gold)' }
  }
  return (
    <span
      className="text-xs font-medium px-3 py-1 rounded-full"
      style={{ background: styles[color].bg, color: styles[color].color }}
    >
      {label}
    </span>
  )
}
