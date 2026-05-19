import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import type { FundingOpportunity } from '@/lib/types'
import NextSlotCard from '@/components/NextSlotCard'

// The dynamic segment is the opportunity UUID (id), not a slug.
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug: id } = await params
  const supabase = await createClient()
  const { data } = await supabase
    .from('funding_opportunities')
    .select('title, description')
    .eq('id', id)
    .single()
  const opp = data as Pick<FundingOpportunity, 'title' | 'description'> | null
  if (!opp) return { title: 'Not found' }
  return {
    title: `${opp.title} | Vula`,
    description: opp.description,
  }
}

const STATUS_CONFIG: Record<string, { label: string; bg: string; color: string }> = {
  open:     { label: 'Open',     bg: 'var(--vula-green-subtle)',  color: 'var(--vula-green)' },
  ongoing:  { label: 'Open',     bg: 'var(--vula-green-subtle)',  color: 'var(--vula-green)' },
  seasonal: { label: 'Seasonal', bg: '#fef5e0',                   color: '#92600a' },
  pilot:    { label: 'Pilot',    bg: '#f0edff',                   color: '#5b21b6' },
  closed:   { label: 'Closed',   bg: '#f3f3f2',                   color: 'var(--vula-faint)' },
}

export default async function FundPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug: id } = await params
  const supabase = await createClient()
  const { data } = await supabase
    .from('funding_opportunities')
    .select('*')
    .eq('id', id)
    .single()

  const opp = data as FundingOpportunity | null
  if (!opp) notFound()

  const status = STATUS_CONFIG[opp.status] ?? STATUS_CONFIG['open']

  // Determine the primary CTA URL: prefer apply_url, fall back to source_url
  const primaryUrl = opp.apply_url || opp.source_url
  // Show secondary source link only when it differs from the primary
  const showSecondary = opp.source_url && opp.apply_url && opp.source_url !== opp.apply_url

  return (
    <main>
      <section
        style={{
          maxWidth: '42rem',
          margin: '0 auto',
          padding: 'clamp(2rem, 4vw, 3rem) 1.25rem clamp(4rem, 8vw, 6rem)',
        }}
      >
        {/* Back link */}
        <Link
          href="/directory"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.375rem',
            fontSize: '0.8125rem',
            fontWeight: 500,
            color: 'var(--vula-muted)',
            textDecoration: 'none',
            marginBottom: '1.75rem',
          }}
        >
          <svg width="14" height="14" fill="none" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to directory
        </Link>

        {/* Card */}
        <article
          style={{
            background: 'var(--vula-surface)',
            border: '1px solid var(--vula-border)',
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          {/* Header band */}
          <div
            style={{
              padding: '1.75rem 1.75rem 1.5rem',
              borderBottom: '1px solid var(--vula-border)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: '0.75rem',
                marginBottom: '0.5rem',
              }}
            >
              <p
                style={{
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  color: 'var(--vula-muted)',
                }}
              >
                {opp.funder}
              </p>
              <span
                style={{
                  flexShrink: 0,
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  padding: '0.25rem 0.625rem',
                  borderRadius: '999px',
                  background: status.bg,
                  color: status.color,
                }}
              >
                {status.label}
              </span>
            </div>
            <h1
              style={{
                fontSize: 'clamp(1.25rem, 3vw, 1.625rem)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                color: 'var(--vula-ink)',
                lineHeight: 1.2,
              }}
            >
              {opp.title}
            </h1>
          </div>

          {/* Body */}
          <div style={{ padding: '1.75rem' }}>
            {/* Amount */}
            {(opp.amount_max || opp.amount_min || opp.amount_label) && (
              <div
                style={{
                  background: 'var(--vula-green-subtle)',
                  border: '1px solid var(--vula-green-light)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1rem 1.25rem',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.2rem',
                }}
              >
                <p
                  style={{
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: 'var(--vula-green)',
                  }}
                >
                  Funding amount
                </p>
                <p
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: 800,
                    letterSpacing: '-0.03em',
                    color: 'var(--vula-green)',
                    lineHeight: 1,
                  }}
                >
                  {opp.amount_label
                    ? opp.amount_label
                    : opp.amount_max
                      ? `Up to R${opp.amount_max.toLocaleString('en-ZA')}`
                      : `From R${opp.amount_min?.toLocaleString('en-ZA')}`}
                </p>
              </div>
            )}

            {/* Description */}
            <p
              style={{
                fontSize: '0.9375rem',
                color: 'var(--vula-muted)',
                lineHeight: 1.7,
                marginBottom: '1.5rem',
              }}
            >
              {opp.description}
            </p>

            {/* Eligibility */}
            {opp.eligibility_notes && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h2
                  style={{
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    letterSpacing: '0.07em',
                    textTransform: 'uppercase',
                    color: 'var(--vula-faint)',
                    marginBottom: '0.75rem',
                  }}
                >
                  Who qualifies
                </h2>
                <p
                  style={{
                    fontSize: '0.875rem',
                    color: 'var(--vula-muted)',
                    lineHeight: 1.65,
                    background: 'var(--vula-bg)',
                    border: '1px solid var(--vula-border)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '1rem 1.125rem',
                  }}
                >
                  {opp.eligibility_notes}
                </p>
              </div>
            )}

            {/* Documents */}
            {opp.documents_required?.length > 0 && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h2
                  style={{
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    letterSpacing: '0.07em',
                    textTransform: 'uppercase',
                    color: 'var(--vula-faint)',
                    marginBottom: '0.75rem',
                  }}
                >
                  Documents needed
                </h2>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {opp.documents_required.map((doc: string) => (
                    <li
                      key={doc}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.625rem',
                        fontSize: '0.875rem',
                        color: 'var(--vula-muted)',
                      }}
                    >
                      <svg width="15" height="15" fill="none" viewBox="0 0 16 16" aria-hidden="true" style={{ marginTop: '0.1rem', flexShrink: 0 }}>
                        <path d="M13 4L6 11 3 8" stroke="var(--vula-green)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Target badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginBottom: '1.75rem' }}>
              {opp.target_youth       && <Badge label="Youth" />}
              {opp.target_women       && <Badge label="Women-owned" />}
              {opp.target_disability  && <Badge label="Disability" />}
              {opp.target_cooperative && <Badge label="Co-operative" />}
              {!opp.requires_registration && <Badge label="Informal eligible" color="gold" />}
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {primaryUrl && (
                <a
                  href={primaryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    background: 'var(--vula-green)',
                    color: '#fff',
                    fontWeight: 650,
                    fontSize: '0.9375rem',
                    padding: '0.875rem 1.5rem',
                    borderRadius: 'var(--radius-lg)',
                    textDecoration: 'none',
                    boxShadow: '0 1px 2px oklch(0.2 0.08 145 / 0.18), inset 0 1px 0 oklch(1 0 0 / 0.12)',
                  }}
                >
                  Apply on official site
                  <svg width="13" height="13" fill="none" viewBox="0 0 12 12" aria-hidden="true">
                    <path d="M2 10L10 2M5 2h5v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              )}
              {showSecondary && (
                <a
                  href={opp.source_url!}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    background: 'var(--vula-surface)',
                    border: '1px solid var(--vula-border)',
                    color: 'var(--vula-muted)',
                    fontWeight: 500,
                    fontSize: '0.875rem',
                    padding: '0.75rem 1.5rem',
                    borderRadius: 'var(--radius-lg)',
                    textDecoration: 'none',
                  }}
                >
                  View official source
                  <svg width="13" height="13" fill="none" viewBox="0 0 12 12" aria-hidden="true">
                    <path d="M2 10L10 2M5 2h5v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              )}
            </div>

            {/* Disclaimer */}
            <p
              style={{
                fontSize: '0.75rem',
                color: 'var(--vula-faint)',
                textAlign: 'center',
                marginTop: '1.25rem',
                lineHeight: 1.5,
              }}
            >
              Always verify eligibility and deadlines on the official source before applying.
            </p>
          </div>
        </article>

        {/* NextSlot partnership card — only shown for relevant service business opportunities */}
        {opp.show_nextslot_card && <NextSlotCard />}

      </section>
    </main>
  )
}

function Badge({ label, color = 'green' }: { label: string; color?: 'green' | 'gold' }) {
  const styles = {
    green: { bg: 'var(--vula-green-subtle)', color: 'var(--vula-green)', border: 'var(--vula-green-light)' },
    gold:  { bg: 'var(--vula-gold-light)',   color: 'var(--vula-gold)',   border: '#f0d89a' },
  }
  return (
    <span
      style={{
        fontSize: '0.6875rem',
        fontWeight: 600,
        letterSpacing: '0.03em',
        padding: '0.25rem 0.625rem',
        borderRadius: '999px',
        background: styles[color].bg,
        color: styles[color].color,
        border: `1px solid ${styles[color].border}`,
      }}
    >
      {label}
    </span>
  )
}
