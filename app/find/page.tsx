'use client'

import { useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { QuizStep } from '@/components/QuizStep'
import { FundingCard } from '@/components/FundingCard'
import { createClient } from '@/lib/supabase/client'
import type { FundingOpportunity } from '@/lib/types'

type QuizState = {
  type: 'registered' | 'informal' | 'starting' | null
  industry: string | null
  need: string | null
  profile: string[]
  amountRange: string | null
}

const INDUSTRIES = [
  { slug: 'spaza-retail', name: 'Spaza & Retail' },
  { slug: 'beauty-personal-care', name: 'Beauty & Personal Care' },
  { slug: 'food-catering', name: 'Food & Catering' },
  { slug: 'automotive-mechanics', name: 'Automotive & Mechanics' },
  { slug: 'clothing-fashion', name: 'Clothing & Fashion' },
  { slug: 'construction-building', name: 'Construction' },
  { slug: 'agriculture', name: 'Agriculture' },
  { slug: 'tech-digital', name: 'Tech & Digital' },
  { slug: 'energy-solar', name: 'Energy & Solar' },
  { slug: 'transport-logistics', name: 'Transport & Logistics' },
  { slug: 'creative-media', name: 'Creative & Media' },
  { slug: 'manufacturing', name: 'Manufacturing' },
  { slug: 'cooperatives', name: 'Co-operatives' },
  { slug: 'general', name: 'General / Other' }
]

const NEEDS = [
  { value: 'equipment', label: 'Equipment & machinery' },
  { value: 'working-capital', label: 'Working capital' },
  { value: 'stock', label: 'Stock & raw materials' },
  { value: 'solar', label: 'Solar & energy' },
  { value: 'startup', label: 'Startup costs' },
  { value: 'growth', label: 'Scale & growth' },
  { value: 'property', label: 'Land or property' }
]

const PROFILES = [
  { value: 'youth', label: 'Under 35' },
  { value: 'women', label: 'Women-owned' },
  { value: 'disability', label: 'Person with disability' },
  { value: 'cooperative', label: 'Co-operative' },
  { value: 'general', label: 'None of the above' }
]

const AMOUNTS = [
  { value: 'under-50k', label: 'Under R50,000' },
  { value: '50k-250k', label: 'R50,000 to R250,000' },
  { value: '250k-1m', label: 'R250,000 to R1 million' },
  { value: 'over-1m', label: 'R1 million+' }
]

function FindPageInner() {
  const searchParams = useSearchParams()
  const initialType = searchParams.get('type') as QuizState['type']

  const [step, setStep] = useState(initialType ? 1 : 0)
  const [quiz, setQuiz] = useState<QuizState>({
    type: initialType ?? null,
    industry: null,
    need: null,
    profile: [],
    amountRange: null
  })
  const [results, setResults] = useState<FundingOpportunity[] | null>(null)
  const [loading, setLoading] = useState(false)

  const totalSteps = 5
  const progress = Math.round((step / totalSteps) * 100)

  async function fetchResults(finalQuiz: QuizState) {
    setLoading(true)
    const supabase = createClient()
    let query = supabase
      .from('funding_opportunities')
      .select('*')
      .neq('status', 'closed')

    if (finalQuiz.type === 'informal') {
      query = query.eq('requires_registration', false)
    }
    if (finalQuiz.profile.includes('youth')) query = query.eq('target_youth', true)
    if (finalQuiz.profile.includes('women')) query = query.eq('target_women', true)
    if (finalQuiz.profile.includes('disability')) query = query.eq('target_disability', true)
    if (finalQuiz.profile.includes('cooperative')) query = query.eq('target_cooperative', true)

    const { data } = await query.limit(9)
    setResults(data ?? [])
    setLoading(false)
    setStep(totalSteps)
  }

  function handleType(type: QuizState['type']) {
    const next = { ...quiz, type }
    setQuiz(next)
    setStep(1)
  }

  function handleIndustry(industry: string) {
    const next = { ...quiz, industry }
    setQuiz(next)
    setStep(2)
  }

  function handleNeed(need: string) {
    const next = { ...quiz, need }
    setQuiz(next)
    setStep(3)
  }

  function handleProfile(value: string) {
    if (value === 'general') {
      const next = { ...quiz, profile: ['general'] }
      setQuiz(next)
      setStep(4)
      return
    }
    const current = quiz.profile.filter((v) => v !== 'general')
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value]
    setQuiz({ ...quiz, profile: updated })
  }

  function handleAmount(amountRange: string) {
    const next = { ...quiz, amountRange }
    fetchResults(next)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 pt-10 pb-24">
      {step < totalSteps && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-[var(--vula-muted)]">Step {step + 1} of {totalSteps}</span>
            <span className="text-sm font-medium text-[var(--vula-green)]">{progress}%</span>
          </div>
          <div className="h-1.5 w-full bg-[var(--vula-border)] rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--vula-green)] rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {step === 0 && (
        <QuizStep title="Is your business registered?" subtitle="This helps us show you what you can access right now.">
          <div className="grid gap-3">
            {[
              { value: 'registered' as const, label: 'Yes, CIPC-registered', desc: 'I have a registered business' },
              { value: 'informal' as const, label: 'No, informal business', desc: 'Not registered yet' },
              { value: 'starting' as const, label: 'Starting from scratch', desc: 'Brand new to business' }
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleType(opt.value)}
                className="flex items-center gap-4 w-full text-left bg-white border border-[var(--vula-border)] rounded-xl px-5 py-4 hover:border-[var(--vula-green)] hover:bg-[var(--vula-green-light)] transition-colors duration-150"
              >
                <div>
                  <div className="font-semibold text-[var(--vula-ink)]">{opt.label}</div>
                  <div className="text-sm text-[var(--vula-muted)]">{opt.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </QuizStep>
      )}

      {step === 1 && (
        <QuizStep title="What sector are you in?" subtitle="Pick the one that best describes your business.">
          <div className="grid grid-cols-2 gap-3">
            {INDUSTRIES.map((ind) => (
              <button
                key={ind.slug}
                onClick={() => handleIndustry(ind.slug)}
                className="text-left bg-white border border-[var(--vula-border)] rounded-xl px-4 py-3 text-sm font-medium text-[var(--vula-ink)] hover:border-[var(--vula-green)] hover:bg-[var(--vula-green-light)] transition-colors duration-150"
              >
                {ind.name}
              </button>
            ))}
          </div>
        </QuizStep>
      )}

      {step === 2 && (
        <QuizStep title="What do you need funding for?" subtitle="Choose the primary use of funding.">
          <div className="grid gap-3">
            {NEEDS.map((n) => (
              <button
                key={n.value}
                onClick={() => handleNeed(n.value)}
                className="text-left bg-white border border-[var(--vula-border)] rounded-xl px-5 py-4 font-medium text-[var(--vula-ink)] hover:border-[var(--vula-green)] hover:bg-[var(--vula-green-light)] transition-colors duration-150"
              >
                {n.label}
              </button>
            ))}
          </div>
        </QuizStep>
      )}

      {step === 3 && (
        <QuizStep title="Which of these apply to you?" subtitle="Select all that apply. This unlocks targeted opportunities.">
          <div className="grid gap-3 mb-6">
            {PROFILES.map((p) => (
              <button
                key={p.value}
                onClick={() => handleProfile(p.value)}
                className={`text-left border rounded-xl px-5 py-4 font-medium transition-colors duration-150 ${
                  quiz.profile.includes(p.value)
                    ? 'bg-[var(--vula-green-light)] border-[var(--vula-green)] text-[var(--vula-green)]'
                    : 'bg-white border-[var(--vula-border)] text-[var(--vula-ink)] hover:border-[var(--vula-green)]'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
          {quiz.profile.length > 0 && !quiz.profile.includes('general') && (
            <button
              onClick={() => setStep(4)}
              className="w-full bg-[var(--vula-green)] text-white font-semibold py-4 rounded-xl hover:bg-[#155c33] transition-colors duration-150"
            >
              Continue
            </button>
          )}
        </QuizStep>
      )}

      {step === 4 && (
        <QuizStep title="How much do you need?" subtitle="Approximate range is fine.">
          <div className="grid gap-3">
            {AMOUNTS.map((a) => (
              <button
                key={a.value}
                onClick={() => handleAmount(a.value)}
                className="text-left bg-white border border-[var(--vula-border)] rounded-xl px-5 py-4 font-medium text-[var(--vula-ink)] hover:border-[var(--vula-green)] hover:bg-[var(--vula-green-light)] transition-colors duration-150"
              >
                {a.label}
              </button>
            ))}
          </div>
        </QuizStep>
      )}

      {step === totalSteps && (
        <div>
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[var(--vula-ink)] mb-2">Your matched opportunities</h2>
            <p className="text-[var(--vula-muted)]">Based on your answers. Always verify on the official source before applying.</p>
          </div>
          {loading && (
            <div className="text-center py-16 text-[var(--vula-muted)]">Finding your matches...</div>
          )}
          {!loading && results && results.length === 0 && (
            <div className="text-center py-16">
              <p className="text-[var(--vula-muted)] mb-4">No exact matches found. Browse all opportunities instead.</p>
              <a href="/directory" className="text-[var(--vula-green)] font-semibold underline">View all funding</a>
            </div>
          )}
          {!loading && results && results.length > 0 && (
            <div className="grid gap-4">
              {results.map((opp) => <FundingCard key={opp.id} opportunity={opp} />)}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function FindPage() {
  return (
    <Suspense fallback={<div className="text-center py-16 text-[var(--vula-muted)]">Loading...</div>}>
      <FindPageInner />
    </Suspense>
  )
}
