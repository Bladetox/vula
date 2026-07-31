import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import type { FundingOpportunity } from '@/lib/types'
import NextSlotCard from '@/components/NextSlotCard'
import YocoWaitlistBanner from '@/components/YocoWaitlistBanner'
import UnverifiedBanner from '@/components/UnverifiedBanner'

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
  open:     { label: 'Open',           bg: 'var(--vula-green-subtle)', color: 'var(--vula-green)' },
  ongoing:  { label: 'Rolling intake', bg: 'var(--vula-green-subtle)', color: 'var(--vula-green)' },
  seasonal: { label: 'Seasonal',       bg: '#fef5e0',                  color: '#92600a' },
  pilot:    { label: 'Pilot',          bg: '#f0edff',                  color: '#5b21b6' },
  closed:   { label: 'Closed',         bg: '#f3f3f2',                  color: 'var(--vula-faint)' },
}

const YOCO_CAPITAL_ID = '47447deb-d748-446b-8ec0-94f7f78347e4'

function getDaysLeft(deadline: string): number {
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  const end = new Date(deadline)
  end.setHours(0, 0, 0, 0)
  return Math.round((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
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
  const isClosed = opp.status === 'closed'

  const hasApplyUrl = !!opp.apply_url
  const showSourceLink = opp.source_url && opp.apply_url && opp.source_url !== opp.apply_url
  const isYocoCapital = id === YOCO_CAPITAL_ID
  const isUnverified = (opp as FundingOpportunity & { data_verified?: boolean }).data_verified === false

  // Deadline display for header
  const daysLeft = opp.deadline ? getDaysLeft(opp.deadline) : null
  const deadlineLabel =
    daysLeft === null ? null
    : daysLeft < 0    ? 'Deadline passed'
    : daysLeft === 0  ? 'Closes today'
    : daysLeft === 1  ? '1 day left'
    : `${daysLeft} days left`
  const deadlineUrgent = daysLeft !== null && daysLeft >= 0 && daysLeft <= 7
  const deadlineColor = daysLeft !== null && daysLeft >= 0
    ? daysLeft <= 7  ? '#c0392b'
    : daysLeft <= 21 ? '#92600a'
    : 'var(--vula-green)'
    : 'var(--vula-faint)'
  const deadlineBg = daysLeft !== null && daysLeft >= 0
    ? daysLeft <= 7  ? '#fff1f0'
    : daysLeft <= 21 ? '#fff8ed'
    : 'var(--vula-green-subtle)'
    : '#f3f3f2'
  const deadlineBorder = daysLeft !== null && daysLeft >= 0
    ? daysLeft <= 7  ? '#fdc5c0'
    : daysLeft <= 21 ? '#f5dcaa'
    : 'var(--vula-green-light)'
    : 'var(--vula-border)'

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

        {/* Banners */}
        {isYocoCapital && <YocoWaitlistBanner />}
        {isUnverified && <UnverifiedBanner sourceUrl={opp.source_url} />}

        <article
          style={{
            background: 'var(--vula-surface)',
            border: '1px solid var(--vula-border)',
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          {/* Header band: funder, status, deadline, title, CTA */}
          <div
            style={{
              padding: '1.75rem 1.75rem 1.5rem',
              borderBottom: '1px solid var(--vula-border)',
            }}
          >
            {/* Status + deadline row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '0.75rem',
                marginBottom: '0.625rem',
                flexWrap: 'wrap',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
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
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '999px',
                    background: status.bg,
                    color: status.color,
                  }}
                >
                  {status.label}
                </span>
              </div>
              {/* Deadline chip */}
              {deadlineLabel && (
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    fontSize: '0.6875rem',
                    fontWeight: 650,
                    letterSpacing: '0.02em',
                    padding: '0.2rem 0.625rem',
                    borderRadius: '999px',
                    background: deadlineBg,
                    color: deadlineColor,
                    border: `1px solid ${deadlineBorder}`,
                    whiteSpace: 'nowrap',
                  }}
                >
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                    <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  {deadlineLabel}
                </span>
              )}
            </div>

            {/* Title */}
            <h1
              style={{
                fontSize: 'clamp(1.25rem, 3vw, 1.625rem)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                color: 'var(--vula-ink)',
                lineHeight: 1.2,
                marginBottom: '1.25rem',
              }}
            >
              {opp.title}
            </h1>

            {/* Early CTA in header band */}
            {!isClosed && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {hasApplyUrl ? (
                  <>
                    <a
                      href={opp.apply_url!}
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
                    {showSourceLink && (
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
                  </>
                ) : (
                  /* No-portal CTA */
                  <NoPortalBlock sourceUrl={opp.source_url} />
                )}
                {/* Expectation-setting note */}
                <p
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--vula-faint)',
                    textAlign: 'center',
                    marginTop: '0.25rem',
                    lineHeight: 1.5,
                  }}
                >
                  {opp.status === 'ongoing'
                    ? 'This programme accepts applications on a rolling basis. No fixed closing date.'
                    : deadlineUrgent && deadlineLabel
                    ? `Deadline is soon. Prepare your documents now and apply directly on the official site.`
                    : 'Always verify eligibility and deadlines on the official source before applying.'}
                </p>
              </div>
            )}
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

            {/* Documents: reframed as readiness checklist */}
            {opp.documents_required?.length > 0 && (
              <div
                style={{
                  marginBottom: '1.5rem',
                  background: 'var(--vula-bg)',
                  border: '1px solid var(--vula-border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1rem 1.125rem',
                }}
              >
                <h2
                  style={{
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    letterSpacing: '0.07em',
                    textTransform: 'uppercase',
                    color: 'var(--vula-faint)',
                    marginBottom: '0.25rem',
                  }}
                >
                  What to prepare
                </h2>
                <p
                  style={{
                    fontSize: '0.8125rem',
                    color: 'var(--vula-muted)',
                    lineHeight: 1.5,
                    marginBottom: '0.875rem',
                  }}
                >
                  Have these ready before you apply.
                </p>
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

            {/* NextSlot card */}
            {opp.show_nextslot_card && (
              <div style={{ marginBottom: '1.75rem' }}>
                <NextSlotCard />
              </div>
            )}

            {/* Closed end-state */}
            {isClosed ? (
              <ClosedState sourceUrl={opp.source_url} />
            ) : (
              /* Secondary body CTA (repeat for long-scroll pages) */
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                {hasApplyUrl ? (
                  <a
                    href={opp.apply_url!}
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
                ) : (
                  <NoPortalBlock sourceUrl={opp.source_url} />
                )}
              </div>
            )}

            {/* Final disclaimer */}
            {!isClosed && (
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
            )}
          </div>
        </article>
      </section>
    </main>
  )
}

// No online portal block
function NoPortalBlock({ sourceUrl }: { sourceUrl: string | null }) {
  return (
    <div
      style={{
        background: 'var(--vula-bg)',
        border: '1px solid var(--vula-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.25rem 1.375rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.875rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
        <div
          style={{
            flexShrink: 0,
            width: '2rem',
            height: '2rem',
            borderRadius: 'var(--radius)',
            background: 'var(--vula-green-subtle)',
            border: '1px solid var(--vula-green-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--vula-green)',
          }}
        >
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <p
            style={{
              fontSize: '0.875rem',
              fontWeight: 600,
              color: 'var(--vula-ink)',
              marginBottom: '0.25rem',
              lineHeight: 1.3,
            }}
          >
            No online portal
          </p>
          <p
            style={{
              fontSize: '0.8125rem',
              color: 'var(--vula-muted)',
              lineHeight: 1.55,
            }}
          >
            This programme does not accept applications online. Visit the official source for contact details, office locations, and how to start your application.
          </p>
        </div>
      </div>
      {sourceUrl && (
        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.375rem',
            fontSize: '0.8125rem',
            fontWeight: 600,
            color: 'var(--vula-green)',
            background: 'var(--vula-green-subtle)',
            border: '1px solid var(--vula-green-light)',
            padding: '0.5rem 1rem',
            borderRadius: 'var(--radius)',
            textDecoration: 'none',
          }}
        >
          Visit official source
          <svg width="11" height="11" fill="none" viewBox="0 0 12 12" aria-hidden="true">
            <path d="M2 10L10 2M5 2h5v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      )}
    </div>
  )
}

// Closed opportunity end-state
function ClosedState({ sourceUrl }: { sourceUrl: string | null }) {
  return (
    <div
      style={{
        background: 'var(--vula-bg)',
        border: '1px solid var(--vula-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.25rem 1.375rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.875rem',
      }}
    >
      <div>
        <p
          style={{
            fontSize: '0.875rem',
            fontWeight: 600,
            color: 'var(--vula-ink)',
            marginBottom: '0.375rem',
            lineHeight: 1.3,
          }}
        >
          This opportunity is currently closed
        </p>
        <p
          style={{
            fontSize: '0.8125rem',
            color: 'var(--vula-muted)',
            lineHeight: 1.55,
          }}
        >
          Some programmes reopen each year or announce new rounds. Check the official source for updates, or browse the directory for open opportunities now.
        </p>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {sourceUrl && (
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.375rem',
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: 'var(--vula-muted)',
              background: 'var(--vula-surface)',
              border: '1px solid var(--vula-border)',
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius)',
              textDecoration: 'none',
            }}
          >
            Check official source
            <svg width="11" height="11" fill="none" viewBox="0 0 12 12" aria-hidden="true">
              <path d="M2 10L10 2M5 2h5v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        )}
        <Link
          href="/directory"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.375rem',
            fontSize: '0.8125rem',
            fontWeight: 600,
            color: 'var(--vula-green)',
            background: 'var(--vula-green-subtle)',
            border: '1px solid var(--vula-green-light)',
            padding: '0.5rem 1rem',
            borderRadius: 'var(--radius)',
            textDecoration: 'none',
          }}
        >
          Browse open opportunities
        </Link>
      </div>
    </div>
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
