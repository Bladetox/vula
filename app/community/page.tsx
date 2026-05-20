'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

const SECTORS = [
  'Spaza & Retail', 'Beauty & Personal Care', 'Food & Catering',
  'Automotive & Mechanics', 'Clothing & Fashion', 'Construction & Building',
  'Agriculture', 'Tech & Digital', 'Energy & Solar',
  'Transport & Logistics', 'Creative & Media', 'Manufacturing',
  'Co-operatives', 'General / Other',
]

const FLAG_TYPES = [
  'Programme is closed',
  'Amount or terms have changed',
  'Incorrect eligibility information',
  'Link is broken or leads to wrong page',
  'Programme no longer exists',
  'Other',
]

type Section = 'flag' | 'submit'

export default function CommunityPage() {
  const [activeSection, setActiveSection] = useState<Section>('flag')

  const [flagForm, setFlagForm] = useState({
    listing_title: '',
    flag_type: '',
    details: '',
    submitted_by_email: '',
  })
  const [flagStatus, setFlagStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const [submitForm, setSubmitForm] = useState({
    title: '',
    funder: '',
    amount_range: '',
    description: '',
    eligibility: '',
    apply_url: '',
    official_source_url: '',
    submitted_by_email: '',
    sector_tags: [] as string[],
  })
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  function handleFlagChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setFlagForm({ ...flagForm, [e.target.name]: e.target.value })
  }

  function handleSubmitChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setSubmitForm({ ...submitForm, [e.target.name]: e.target.value })
  }

  function toggleSector(sector: string) {
    const current = submitForm.sector_tags
    setSubmitForm({
      ...submitForm,
      sector_tags: current.includes(sector)
        ? current.filter((s) => s !== sector)
        : [...current, sector],
    })
  }

  async function handleFlagSubmit(e: React.FormEvent) {
    e.preventDefault()
    setFlagStatus('submitting')
    const supabase = createClient()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any)
      .from('listing_flags')
      .insert([{
        listing_title: flagForm.listing_title,
        flag_type: flagForm.flag_type,
        details: flagForm.details || null,
        submitted_by_email: flagForm.submitted_by_email || null,
        status: 'open',
      }])
    setFlagStatus(error ? 'error' : 'success')
  }

  async function handleSubmitListing(e: React.FormEvent) {
    e.preventDefault()
    setSubmitStatus('submitting')
    const supabase = createClient()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any)
      .from('submissions')
      .insert([{
        title: submitForm.title,
        funder: submitForm.funder,
        description: submitForm.description,
        amount_range: submitForm.amount_range || null,
        eligibility: submitForm.eligibility || null,
        apply_url: submitForm.apply_url || null,
        official_source_url: submitForm.official_source_url || null,
        submitted_by_email: submitForm.submitted_by_email || null,
        sector_tags: submitForm.sector_tags,
        status: 'pending',
        reviewer_notes: null,
        reviewed_at: null,
      }])
    setSubmitStatus(error ? 'error' : 'success')
  }

  const tabStyle = (active: boolean): React.CSSProperties => ({
    fontSize: '0.875rem',
    fontWeight: active ? 600 : 400,
    padding: '0.625rem 1.125rem',
    borderRadius: 'var(--radius-lg)',
    border: '1px solid',
    borderColor: active ? 'var(--vula-green)' : 'var(--vula-border)',
    background: active ? 'var(--vula-green)' : 'var(--vula-surface)',
    color: active ? '#fff' : 'var(--vula-muted)',
    cursor: 'pointer',
  })

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
        <div style={{ maxWidth: '36rem', margin: '0 auto' }}>
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
            Open directory
          </p>
          <h1
            style={{
              fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: 'var(--vula-ink)',
              marginBottom: '1.5rem',
            }}
          >
            Community
          </h1>

          {/* Founder card */}
          <div
            style={{
              display: 'flex',
              gap: '1.25rem',
              alignItems: 'flex-start',
              background: 'var(--vula-surface)',
              border: '1px solid var(--vula-border)',
              borderRadius: 'var(--radius-xl)',
              padding: '1.25rem',
              marginBottom: '1.5rem',
            }}
          >
            <img
              src="https://iili.io/C9Ktrhu.jpg"
              alt="Arshad Segal"
              width={112}
              height={112}
              style={{
                flexShrink: 0,
                width: '7rem',
                height: '7rem',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid var(--vula-border)',
                filter: 'grayscale(1)',
              }}
            />
            <div>
              <p style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--vula-ink)', marginBottom: '0.2rem' }}>
                Arshad Segal
              </p>
              <p style={{ fontSize: '0.8125rem', color: 'var(--vula-green)', fontWeight: 500, marginBottom: '0.75rem' }}>
                Founder, Vula
              </p>
              <p style={{ fontSize: '0.9rem', color: 'var(--vula-muted)', lineHeight: 1.7 }}>
                Vula is a one-person project, built to make South African business funding easier to find and understand. Every listing has been researched by hand. Funding programmes change, amounts shift, and what was accurate last month may not be accurate today. Should you come across any information that has changed please flag for review. Your input in keeping this directory accurate is genuinely appreciated.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer banner */}
      <section
        style={{
          borderBottom: '1px solid var(--vula-border)',
          background: 'var(--vula-surface)',
          padding: '1.25rem',
        }}
      >
        <div
          style={{
            maxWidth: '36rem',
            margin: '0 auto',
            display: 'flex',
            gap: '0.875rem',
            alignItems: 'flex-start',
          }}
        >
          <div style={{ flexShrink: 0, marginTop: '0.1rem' }}>
            <svg width="18" height="18" fill="none" viewBox="0 0 20 20" aria-hidden="true">
              <circle cx="10" cy="10" r="8.5" stroke="#b45309" strokeWidth="1.4" />
              <path d="M10 6v5" stroke="#b45309" strokeWidth="1.75" strokeLinecap="round" />
              <circle cx="10" cy="14" r="0.875" fill="#b45309" />
            </svg>
          </div>
          <p style={{ fontSize: '0.875rem', color: '#78350f', lineHeight: 1.65 }}>
            While every effort is made to verify the information on Vula, inconsistencies do occur. Always confirm funding details directly with the funder before applying. If something has changed or no longer looks correct, please flag it below.
          </p>
        </div>
      </section>

      {/* Section toggle */}
      <section style={{ maxWidth: '36rem', margin: '0 auto', padding: '2rem 1.25rem 0' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button style={tabStyle(activeSection === 'flag')} onClick={() => setActiveSection('flag')}>
            Flag for review
          </button>
          <button style={tabStyle(activeSection === 'submit')} onClick={() => setActiveSection('submit')}>
            Submit a listing
          </button>
        </div>
      </section>

      {/* Flag for review */}
      {activeSection === 'flag' && (
        <section
          style={{
            maxWidth: '36rem',
            margin: '0 auto',
            padding: 'clamp(1.5rem, 3vw, 2rem) 1.25rem clamp(4rem, 8vw, 6rem)',
          }}
        >
          {flagStatus === 'success' ? (
            <SuccessCard
              title="Flag received"
              body="Thank you. We will review this and update the listing if the information has changed."
              onReset={() => {
                setFlagForm({ listing_title: '', flag_type: '', details: '', submitted_by_email: '' })
                setFlagStatus('idle')
              }}
              resetLabel="Flag another"
            />
          ) : (
            <form onSubmit={handleFlagSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <Field
                label="Which listing or funder does this relate to?"
                name="listing_title"
                value={flagForm.listing_title}
                onChange={handleFlagChange}
                required
              />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                <label
                  htmlFor="flag_type"
                  style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--vula-ink)' }}
                >
                  What needs to be reviewed?
                </label>
                <select
                  id="flag_type"
                  name="flag_type"
                  value={flagForm.flag_type}
                  onChange={handleFlagChange}
                  required
                  style={{
                    width: '100%',
                    background: 'var(--vula-surface)',
                    border: '1px solid var(--vula-border)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '0.75rem 1rem',
                    fontSize: '0.9375rem',
                    color: flagForm.flag_type ? 'var(--vula-ink)' : 'var(--vula-faint)',
                    outline: 'none',
                    appearance: 'none',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%239ca3af' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 1rem center',
                    paddingRight: '2.5rem',
                  }}
                >
                  <option value="" disabled>Select a reason</option>
                  {FLAG_TYPES.map((ft) => (
                    <option key={ft} value={ft}>{ft}</option>
                  ))}
                </select>
              </div>

              <TextareaField
                label="Additional details (optional)"
                name="details"
                value={flagForm.details}
                onChange={handleFlagChange}
              />

              <Field
                label="Your email (optional)"
                name="submitted_by_email"
                type="email"
                value={flagForm.submitted_by_email}
                onChange={handleFlagChange}
              />

              {flagStatus === 'error' && <ErrorBlock />}

              <SubmitButton loading={flagStatus === 'submitting'} label="Submit flag" />
            </form>
          )}
        </section>
      )}

      {/* Submit a listing */}
      {activeSection === 'submit' && (
        <section
          style={{
            maxWidth: '36rem',
            margin: '0 auto',
            padding: 'clamp(1.5rem, 3vw, 2rem) 1.25rem clamp(4rem, 8vw, 6rem)',
          }}
        >
          <p style={{ fontSize: '0.9375rem', color: 'var(--vula-muted)', lineHeight: 1.65, marginBottom: '1.75rem' }}>
            Know of a verified opportunity we have not listed? Submit it and we will review within 7 days.
          </p>

          {submitStatus === 'success' ? (
            <SuccessCard
              title="Submission received"
              body="We will verify this opportunity within 7 days and publish it with a community-verified badge if it checks out. Thank you."
              onReset={() => {
                setSubmitForm({ title: '', funder: '', amount_range: '', description: '', eligibility: '', apply_url: '', official_source_url: '', submitted_by_email: '', sector_tags: [] })
                setSubmitStatus('idle')
              }}
              resetLabel="Submit another"
            />
          ) : (
            <form onSubmit={handleSubmitListing} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <Field label="Opportunity name" name="title" value={submitForm.title} onChange={handleSubmitChange} required />
              <Field label="Funder / Organisation" name="funder" value={submitForm.funder} onChange={handleSubmitChange} required />
              <Field label="Amount range (e.g. R50,000 to R250,000)" name="amount_range" value={submitForm.amount_range} onChange={handleSubmitChange} />
              <TextareaField label="Brief description" name="description" value={submitForm.description} onChange={handleSubmitChange} required />
              <TextareaField label="Eligibility criteria" name="eligibility" value={submitForm.eligibility} onChange={handleSubmitChange} />
              <Field label="Application URL" name="apply_url" type="url" value={submitForm.apply_url} onChange={handleSubmitChange} />
              <Field label="Official source URL" name="official_source_url" type="url" value={submitForm.official_source_url} onChange={handleSubmitChange} />
              <Field label="Your email (optional, for follow-up only)" name="submitted_by_email" type="email" value={submitForm.submitted_by_email} onChange={handleSubmitChange} />

              <div>
                <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--vula-ink)', marginBottom: '0.625rem' }}>
                  Relevant sectors
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {SECTORS.map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => toggleSector(s)}
                      style={{
                        fontSize: '0.8125rem',
                        fontWeight: submitForm.sector_tags.includes(s) ? 600 : 400,
                        padding: '0.35rem 0.875rem',
                        borderRadius: '999px',
                        border: '1px solid',
                        borderColor: submitForm.sector_tags.includes(s) ? 'var(--vula-green)' : 'var(--vula-border)',
                        background: submitForm.sector_tags.includes(s) ? 'var(--vula-green)' : 'var(--vula-surface)',
                        color: submitForm.sector_tags.includes(s) ? '#fff' : 'var(--vula-ink)',
                        cursor: 'pointer',
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {submitStatus === 'error' && <ErrorBlock />}

              <SubmitButton loading={submitStatus === 'submitting'} label="Submit for review" />
            </form>
          )}
        </section>
      )}
    </main>
  )
}

function SuccessCard({ title, body, onReset, resetLabel }: { title: string; body: string; onReset: () => void; resetLabel: string }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '2.5rem 1.5rem',
        background: 'var(--vula-surface)',
        border: '1px solid var(--vula-green-light)',
        borderRadius: 'var(--radius-xl)',
      }}
    >
      <div
        style={{
          width: '3rem',
          height: '3rem',
          borderRadius: '50%',
          background: 'var(--vula-green-subtle)',
          border: '1px solid var(--vula-green-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1rem',
        }}
      >
        <svg width="22" height="22" fill="none" viewBox="0 0 28 28" aria-label="Success">
          <path d="M5 14l6 6 12-12" stroke="var(--vula-green)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h2
        style={{
          fontSize: '1.125rem',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          color: 'var(--vula-ink)',
          marginBottom: '0.5rem',
        }}
      >
        {title}
      </h2>
      <p style={{ fontSize: '0.9rem', color: 'var(--vula-muted)', lineHeight: 1.65, marginBottom: '1.5rem', maxWidth: '26rem' }}>
        {body}
      </p>
      <button
        onClick={onReset}
        style={{
          fontSize: '0.875rem',
          fontWeight: 600,
          color: 'var(--vula-green)',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
        }}
      >
        {resetLabel}
      </button>
    </div>
  )
}

function ErrorBlock() {
  return (
    <div
      style={{
        fontSize: '0.875rem',
        color: '#7c2020',
        background: '#fdf2f2',
        border: '1px solid #f5c6c6',
        borderRadius: 'var(--radius-lg)',
        padding: '0.875rem 1rem',
      }}
    >
      Something went wrong. Please try again.
    </div>
  )
}

function SubmitButton({ loading, label }: { loading: boolean; label: string }) {
  return (
    <button
      type="submit"
      disabled={loading}
      style={{
        background: 'var(--vula-green)',
        color: '#fff',
        fontWeight: 650,
        fontSize: '0.9375rem',
        padding: '0.875rem 1.5rem',
        borderRadius: 'var(--radius-lg)',
        border: 'none',
        cursor: loading ? 'not-allowed' : 'pointer',
        opacity: loading ? 0.6 : 1,
        boxShadow: '0 1px 2px oklch(0.2 0.08 145 / 0.18), inset 0 1px 0 oklch(1 0 0 / 0.12)',
      }}
    >
      {loading ? 'Submitting...' : label}
    </button>
  )
}

function Field({
  label, name, value, onChange, type = 'text', required = false,
}: {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: string
  required?: boolean
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
      <label htmlFor={name} style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--vula-ink)' }}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        style={{
          width: '100%',
          background: 'var(--vula-surface)',
          border: '1px solid var(--vula-border)',
          borderRadius: 'var(--radius-lg)',
          padding: '0.75rem 1rem',
          fontSize: '0.9375rem',
          color: 'var(--vula-ink)',
          outline: 'none',
        }}
      />
    </div>
  )
}

function TextareaField({
  label, name, value, onChange, required = false,
}: {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  required?: boolean
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
      <label htmlFor={name} style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--vula-ink)' }}>
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        rows={4}
        style={{
          width: '100%',
          background: 'var(--vula-surface)',
          border: '1px solid var(--vula-border)',
          borderRadius: 'var(--radius-lg)',
          padding: '0.75rem 1rem',
          fontSize: '0.9375rem',
          color: 'var(--vula-ink)',
          resize: 'vertical',
          outline: 'none',
          fontFamily: 'inherit',
          lineHeight: 1.6,
        }}
      />
    </div>
  )
}
