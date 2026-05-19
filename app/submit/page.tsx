'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Database } from '@/lib/database.types'

type SubmissionInsert = Database['public']['Tables']['submissions']['Insert']

const SECTORS = [
  'Spaza & Retail', 'Beauty & Personal Care', 'Food & Catering',
  'Automotive & Mechanics', 'Clothing & Fashion', 'Construction & Building',
  'Agriculture', 'Tech & Digital', 'Energy & Solar',
  'Transport & Logistics', 'Creative & Media', 'Manufacturing',
  'Co-operatives', 'General / Other'
]

export default function SubmitPage() {
  const [form, setForm] = useState({
    title: '', funder: '', amount_range: '', description: '',
    eligibility: '', apply_url: '', official_source_url: '',
    submitted_by_email: '', sector_tags: [] as string[]
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
        : [...current, sector]
    })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('submitting')
    const supabase = createClient()
    const payload: SubmissionInsert = {
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
    }
    const { error } = await supabase.from('submissions').insert([payload])
    setStatus(error ? 'error' : 'success')
  }

  if (status === 'success') {
    return (
      <div className="max-w-xl mx-auto px-4 pt-16 pb-24 text-center">
        <div className="w-14 h-14 rounded-full bg-[var(--vula-green-light)] flex items-center justify-center mx-auto mb-5">
          <svg width="28" height="28" fill="none" viewBox="0 0 28 28" aria-label="Success">
            <path d="M5 14l6 6 12-12" stroke="var(--vula-green)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-[var(--vula-ink)] mb-3">Submission received</h1>
        <p className="text-[var(--vula-muted)] mb-8">We will verify this opportunity within 7 days and publish it with a community-verified badge if it checks out. Thank you.</p>
        <a href="/directory" className="text-[var(--vula-green)] font-semibold underline">Back to directory</a>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto px-4 pt-10 pb-24">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--vula-ink)] mb-2">Submit a funding opportunity</h1>
        <p className="text-[var(--vula-muted)]">Know of a verified opportunity we have not listed? Submit it and we will review within 7 days.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Field label="Opportunity name" name="title" value={form.title} onChange={handleChange} required />
        <Field label="Funder / Organisation" name="funder" value={form.funder} onChange={handleChange} required />
        <Field label="Amount range (e.g. R50,000 to R250,000)" name="amount_range" value={form.amount_range} onChange={handleChange} />
        <TextareaField label="Brief description" name="description" value={form.description} onChange={handleChange} required />
        <TextareaField label="Eligibility criteria" name="eligibility" value={form.eligibility} onChange={handleChange} />
        <Field label="Application URL" name="apply_url" type="url" value={form.apply_url} onChange={handleChange} />
        <Field label="Official source URL" name="official_source_url" type="url" value={form.official_source_url} onChange={handleChange} />
        <Field label="Your email (optional, for follow-up only)" name="submitted_by_email" type="email" value={form.submitted_by_email} onChange={handleChange} />

        <div>
          <p className="text-sm font-medium text-[var(--vula-ink)] mb-2">Relevant sectors</p>
          <div className="flex flex-wrap gap-2">
            {SECTORS.map((s) => (
              <button
                type="button"
                key={s}
                onClick={() => toggleSector(s)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-colors duration-150 ${
                  form.sector_tags.includes(s)
                    ? 'bg-[var(--vula-green)] text-white border-[var(--vula-green)]'
                    : 'bg-white text-[var(--vula-ink)] border-[var(--vula-border)] hover:border-[var(--vula-green)]'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {status === 'error' && (
          <p className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-3">Something went wrong. Please try again.</p>
        )}

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full bg-[var(--vula-green)] text-white font-semibold py-4 rounded-xl hover:bg-[#155c33] disabled:opacity-60 transition-colors duration-150"
        >
          {status === 'submitting' ? 'Submitting...' : 'Submit for review'}
        </button>
      </form>
    </div>
  )
}

function Field({ label, name, value, onChange, type = 'text', required = false }: {
  label: string; name: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string; required?: boolean
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-[var(--vula-ink)] mb-1.5">{label}</label>
      <input
        id={name} name={name} type={type} value={value} onChange={onChange} required={required}
        className="w-full bg-white border border-[var(--vula-border)] rounded-xl px-4 py-3 text-sm text-[var(--vula-ink)] placeholder:text-[var(--vula-muted)] focus:outline-none focus:border-[var(--vula-green)] transition-colors duration-150"
      />
    </div>
  )
}

function TextareaField({ label, name, value, onChange, required = false }: {
  label: string; name: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-[var(--vula-ink)] mb-1.5">{label}</label>
      <textarea
        id={name} name={name} value={value} onChange={onChange} required={required} rows={4}
        className="w-full bg-white border border-[var(--vula-border)] rounded-xl px-4 py-3 text-sm text-[var(--vula-ink)] placeholder:text-[var(--vula-muted)] focus:outline-none focus:border-[var(--vula-green)] resize-none transition-colors duration-150"
      />
    </div>
  )
}
