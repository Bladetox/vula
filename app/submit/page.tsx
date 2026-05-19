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

export default function SubmitPage() {
  const [form, setForm] = useState({
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
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function toggleSector(sector: string) {
    const current = form.sector_tags
    setForm({
      ...form,
      sector_tags: current.includes(sector)
        ? current.filter((s) => s !== sector)
        : [...current, sector],
    })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('submitting')
    const supabase = createClient()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any)
      .from('submissions')
      .insert([{
        title: form.title,
        funder: form.funder,
        description: form.description,
        amount_range: form.amount_range || null,
        eligibility: form.eligibility || null,
        apply_url: form.apply_url || null,
        official_source_url: form.official_source_url || null,
        submitted_by_email: form.submitted_by_email || null,
        sector_tags: form.sector_tags,
        status: 'pending',
        reviewer_notes: null,
        reviewed_at: null,
      }])
    setStatus(error ? 'error' : 'success')
  }

  if (status === 'success') {
    return (
      <main
        style={{
          maxWidth: '36rem',
          margin: '0 auto',
          padding: 'clamp(4rem, 8vw, 6rem) 1.25rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: '3.5rem',
            height: '3.5rem',
            borderRadius: '50%',
            background: 'var(--vula-green-subtle)',
            border: '1px solid var(--vula-green-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.25rem',
          }}
        >
          <svg width="26" height="26" fill="none" viewBox="0 0 28 28" aria-label="Success">
            <path d="M5 14l6 6 12-12" stroke="var(--vula-green)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h1
          style={{
            fontSize: 'clamp(1.25rem, 3vw, 1.625rem)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: 'var(--vula-ink)',
            marginBottom: '0.625rem',
          }}
        >
          Submission received
        </h1>
        <p
          style={{
            fontSize: '0.9375rem',
            color: 'var(--vula-muted)',
            lineHeight: 1.65,
            marginBottom: '2rem',
            maxWidth: '32rem',
          }}
        >
          We will verify this opportunity within 7 days and publish it with a community-verified badge if it checks out. Thank you.
        </p>
        <a
          href="/directory"
          style={{
            fontSize: '0.875rem',
            fontWeight: 600,
            color: 'var(--vula-green)',
            textDecoration: 'none',
          }}
        >
          Back to directory
        </a>
      </main>
    )
  }

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
            Community
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
            Submit a funding opportunity
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--vula-muted)', lineHeight: 1.6 }}>
            Know of a verified opportunity we have not listed? Submit it and we will review within 7 days.
          </p>
        </div>
      </section>

      {/* Form */}
      <section
        style={{
          maxWidth: '36rem',
          margin: '0 auto',
          padding: 'clamp(1.5rem, 3vw, 2.5rem) 1.25rem clamp(4rem, 8vw, 6rem)',
        }}
      >
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <Field label="Opportunity name" name="title" value={form.title} onChange={handleChange} required />
          <Field label="Funder / Organisation" name="funder" value={form.funder} onChange={handleChange} required />
          <Field label="Amount range (e.g. R50,000 to R250,000)" name="amount_range" value={form.amount_range} onChange={handleChange} />
          <TextareaField label="Brief description" name="description" value={form.description} onChange={handleChange} required />
          <TextareaField label="Eligibility criteria" name="eligibility" value={form.eligibility} onChange={handleChange} />
          <Field label="Application URL" name="apply_url" type="url" value={form.apply_url} onChange={handleChange} />
          <Field label="Official source URL" name="official_source_url" type="url" value={form.official_source_url} onChange={handleChange} />
          <Field label="Your email (optional, for follow-up only)" name="submitted_by_email" type="email" value={form.submitted_by_email} onChange={handleChange} />

          <div>
            <p
              style={{
                fontSize: '0.875rem',
                fontWeight: 600,
                color: 'var(--vula-ink)',
                marginBottom: '0.625rem',
              }}
            >
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
                    fontWeight: form.sector_tags.includes(s) ? 600 : 400,
                    padding: '0.35rem 0.875rem',
                    borderRadius: '999px',
                    border: '1px solid',
                    borderColor: form.sector_tags.includes(s) ? 'var(--vula-green)' : 'var(--vula-border)',
                    background: form.sector_tags.includes(s) ? 'var(--vula-green)' : 'var(--vula-surface)',
                    color: form.sector_tags.includes(s) ? '#fff' : 'var(--vula-ink)',
                    cursor: 'pointer',
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {status === 'error' && (
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
          )}

          <button
            type="submit"
            disabled={status === 'submitting'}
            style={{
              background: 'var(--vula-green)',
              color: '#fff',
              fontWeight: 650,
              fontSize: '0.9375rem',
              padding: '0.875rem 1.5rem',
              borderRadius: 'var(--radius-lg)',
              border: 'none',
              cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
              opacity: status === 'submitting' ? 0.6 : 1,
              boxShadow: '0 1px 2px oklch(0.2 0.08 145 / 0.18), inset 0 1px 0 oklch(1 0 0 / 0.12)',
            }}
          >
            {status === 'submitting' ? 'Submitting...' : 'Submit for review'}
          </button>
        </form>
      </section>
    </main>
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
      <label
        htmlFor={name}
        style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--vula-ink)' }}
      >
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
      <label
        htmlFor={name}
        style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--vula-ink)' }}
      >
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
