import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Funding FAQ - Vula',
  description:
    'Answers to the five questions South African entrepreneurs ask most about funding: qualifying, rejection, documents, grants vs loans, and timelines.',
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type PBlock     = { type: 'p';        content: string }
type HeadBlock  = { type: 'heading';  content: string }
type ListBlock  = { type: 'list';     items: string[] }
type ReasonsBlock = {
  type: 'reasons'
  items: { number: string; title: string; body: string }[]
}
type DoclistBlock = {
  type: 'doclist'
  items: { name: string; note: string }[]
}
type TypesBlock = {
  type: 'types'
  items: {
    type: string
    color: { bg: string; border: string; accent: string }
    definition: string
    pros: string[]
    cons: string[]
    examples: string
  }[]
}
type TimelineBlock = {
  type: 'timeline'
  items: { funder: string; example: string; range: string; amount: string; note: string }[]
}
type CtaBlock = {
  type: 'cta'
  label: string
  href: string
  secondary?: boolean
}

type AnswerBlock =
  | PBlock
  | HeadBlock
  | ListBlock
  | ReasonsBlock
  | DoclistBlock
  | TypesBlock
  | TimelineBlock
  | CtaBlock

type TagColor = { bg: string; border: string; text: string }

type Faq = {
  id: string
  tag: string
  tagColor: TagColor
  question: string
  short: string
  answer: AnswerBlock[]
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const FAQS: Faq[] = [
  {
    id: 'informal',
    tag: 'Eligibility',
    tagColor: { bg: '#fef5e0', border: '#f0d89a', text: '#92600a' },
    question: 'Can I apply for funding if my business is not registered?',
    short:
      'Yes. A meaningful number of funding programmes in South Africa are open to informal and unregistered businesses. Registration unlocks more, but it is not the starting requirement everywhere.',
    answer: [
      {
        type: 'p',
        content:
          'The assumption that all funding requires a CIPC registration number is one of the most damaging myths in the South African small business space. It stops thousands of entrepreneurs from even trying. The reality is more nuanced.',
      },
      {
        type: 'p',
        content:
          'Informal businesses - street traders, home-based operations, spaza shops, and sole traders without formal registration - can access programmes from government departments, community development organisations, and some banks. These programmes are specifically designed for people who cannot yet register because they lack the funds, the address, or the documentation to do so.',
      },
      { type: 'heading', content: 'What informal businesses can access' },
      {
        type: 'list',
        items: [
          'DSBD Asset Assist Programme - provides productive assets to informal traders, no CIPC required',
          'Cooperative Incentive Scheme - open to registered cooperatives, which have a lower barrier than company registration',
          'Some provincial EDTECH and township enterprise funds that use proof of trading instead of CIPC',
          'Microfinance products from institutions like Small Enterprise Finance Agency (SEFA) that accept informal proof of business',
          'NGO and foundation funding (Columba Leadership, Tshikululu) that target pre-formal businesses',
        ],
      },
      { type: 'heading', content: 'Why registration still matters' },
      {
        type: 'p',
        content:
          'The honest answer is that formalising your business opens access to roughly three times more opportunities. Banks, DFIs like IDC and DBSA, and most corporate ESD programmes require a CIPC number, a business bank account, and a tax clearance certificate before they will even open your application. If your goal is to grow, formalisation is worth the investment of time.',
      },
      { type: 'cta', label: 'See funding that requires no registration', href: '/find?type=informal' },
      { type: 'cta', label: 'How to formalise your business', href: '/register', secondary: true },
    ],
  },
  {
    id: 'rejection',
    tag: 'Applications',
    tagColor: { bg: '#f0edff', border: '#c9bfff', text: '#5b21b6' },
    question: 'Why do funding applications keep getting rejected?',
    short:
      'Rejections almost always come down to the same five root causes. Understanding them before you apply - not after - is what changes the outcome.',
    answer: [
      {
        type: 'p',
        content:
          'Most South African entrepreneurs never find out why they were rejected. The funder sends a form email and the applicant assumes the opportunity was a scam or that the process was corrupt. Sometimes that is true. Often it is not. The Finfind 2025 SA MSME Access to Finance Report analysed thousands of rejected applications and found five causes that account for over 80% of declines.',
      },
      { type: 'heading', content: 'The five most common rejection reasons' },
      {
        type: 'reasons',
        items: [
          {
            number: '01',
            title: 'No trading history',
            body: 'Most funders require 1 to 3 years of verifiable trading. A brand-new idea with no revenue record is high risk to any lender or grant body. Start small, build a track record, document everything from day one.',
          },
          {
            number: '02',
            title: 'No financial records',
            body: 'If you cannot show income and expenses - even in a simple spreadsheet - funders cannot assess your ability to repay or your need. A basic bookkeeping app like Wave (free) or Zoho Books changes this. The Finfind report found 75% of MSMEs have no accounting system at all.',
          },
          {
            number: '03',
            title: 'Poor or no credit profile',
            body: 'For loan products, your personal credit score is often assessed alongside the business. Unpaid debt, judgements, and defaults flag you as high risk. Check your credit report on TransUnion or Experian before applying - both offer a free annual check.',
          },
          {
            number: '04',
            title: 'Incomplete or incorrect documents',
            body: 'Applications are often declined automatically when documents are missing, expired, or do not match (e.g. bank statement address differs from registered address). Build your document pack once, keep it current, and double-check every field before submitting.',
          },
          {
            number: '05',
            title: 'Wrong product for your stage',
            body: 'Applying for a R5m IDC growth loan when you are pre-revenue is not just a rejection - it puts a flag on your name. Match the product to your stage. Seed-stage businesses need seed-stage funding: grants, microfinance, and incubator support.',
          },
        ],
      },
      { type: 'cta', label: 'Find funding matched to your stage', href: '/find' },
    ],
  },
  {
    id: 'documents',
    tag: 'Preparation',
    tagColor: { bg: 'var(--vula-green-subtle)', border: 'var(--vula-green-light)', text: 'var(--vula-green)' },
    question: 'What documents do I actually need to apply?',
    short:
      'The core pack is the same across almost every programme. Assemble it once, keep it updated, and you can apply to any opportunity without starting from scratch.',
    answer: [
      {
        type: 'p',
        content:
          'Document requirements feel overwhelming because each funder lists them differently. But underneath the different labels, 90% of programmes ask for the same set of things. Here is the universal pack - the documents that appear on almost every checklist in South Africa.',
      },
      { type: 'heading', content: 'The core document pack' },
      {
        type: 'doclist',
        items: [
          { name: 'CIPC registration certificate', note: 'Download from the CIPC customer portal. Keep the PDF, not a screenshot.' },
          { name: 'SARS tax clearance / compliance certificate', note: 'Obtain via eFiling. Valid for 12 months. Apply before you start the funding search.' },
          { name: 'B-BBEE affidavit or certificate', note: 'Under R10m turnover: a sworn commissioner-of-oaths affidavit is sufficient. Free to do.' },
          { name: 'Business bank account statements', note: 'Usually 3 to 6 months. Must be a business account, not a personal account.' },
          { name: 'Bank confirmation letter', note: 'A letter from your bank confirming your account details. Request at your branch or online banking.' },
          { name: 'Certified ID copies of all directors/owners', note: 'Certified within 3 months. Certify at a police station or post office for free.' },
          { name: 'Proof of business address', note: 'A utility bill, lease agreement, or bank statement showing the business address. Not older than 3 months.' },
          { name: 'Business plan or project proposal', note: 'Larger programmes (IDC, NEF, SEFA) require a full plan. Smaller grants often accept a 1-page summary. SEDA offers free business plan support.' },
          { name: '12-month financial projections', note: 'A simple monthly income and expense forecast. Templates are available from SEDA and most banks for free.' },
          { name: 'Proof of trading (if informal)', note: 'Invoices, receipts, supplier letters, or photos of your operation if you do not have bank statements.' },
        ],
      },
      { type: 'heading', content: 'Where to get free help preparing' },
      {
        type: 'list',
        items: [
          'SEDA (Small Enterprise Development Agency) - free business plan templates and advisors nationwide',
          'CIPC customer portal - registration certificates on demand',
          'SARS eFiling - tax clearance in under 24 hours once compliant',
          'Your bank - will provide confirmation letters and often statement bundles on request',
        ],
      },
      { type: 'cta', label: 'See what documents each programme needs', href: '/directory' },
    ],
  },
  {
    id: 'grant-vs-loan',
    tag: 'Understanding funding',
    tagColor: { bg: '#fef5e0', border: '#f0d89a', text: '#92600a' },
    question: 'What is the difference between a grant and a loan?',
    short:
      'A grant is money you do not pay back. A loan is money you do. Knowing which one you need - and which you qualify for - determines which programmes are worth your time.',
    answer: [
      {
        type: 'p',
        content:
          'The confusion between grants, loans, and blended finance products causes people to waste months applying for the wrong thing. Here is how they differ in plain language.',
      },
      { type: 'heading', content: 'Funding types explained' },
      {
        type: 'types',
        items: [
          {
            type: 'Grant',
            color: { bg: 'var(--vula-green-subtle)', border: 'var(--vula-green-light)', accent: 'var(--vula-green)' },
            definition: 'Free money from government, a corporation, or a foundation. You do not repay it.',
            pros: ['No repayment, no interest', 'Does not dilute ownership', 'Can be used to prove viability for follow-on funding'],
            cons: ['Highly competitive - often hundreds of applicants per slot', 'Usually tied to specific uses (equipment, training, not salaries)', 'Can require co-funding or matching contributions', 'Reporting and compliance obligations after award'],
            examples: 'BBSDP, TSIBA, IDC Black Industrialists Grant',
          },
          {
            type: 'Loan',
            color: { bg: '#f0edff', border: '#c9bfff', accent: '#5b21b6' },
            definition: 'Borrowed money from a bank, DFI, or microfinance institution. Repaid over time with interest.',
            pros: ['Larger amounts available than most grants', 'No ownership dilution', 'Builds a credit track record for future financing'],
            cons: ['Monthly repayments required regardless of revenue', 'Requires collateral or surety in most cases', 'Credit score and trading history are assessed'],
            examples: 'Absa SME Loan, SEFA Loan, Old Mutual Masisizane',
          },
          {
            type: 'Equity',
            color: { bg: '#fff5f5', border: '#ffc9c9', accent: '#c92a2a' },
            definition: 'An investor gives you capital in exchange for a share of your business.',
            pros: ['No repayment pressure', 'Investor often brings networks and mentorship', 'Right for high-growth businesses'],
            cons: ['You give up a portion of ownership and future profit', 'Investors expect high returns - not suited to lifestyle businesses', 'Takes months to negotiate and close'],
            examples: 'IDC Equity, Sanlam ESD Programme, angel investors',
          },
          {
            type: 'Blended finance',
            color: { bg: '#fef9ec', border: '#f0d89a', accent: '#92650a' },
            definition: 'A mix of grant and loan - part of the funding is a grant, part is a subsidised loan. Common in ESD and government-corporate partnerships.',
            pros: ['Lower effective cost than a pure loan', 'More flexible than a pure grant', 'Common in corporate ESD programmes'],
            cons: ['Complex terms - read the grant/loan split carefully', 'Often restricted to suppliers within a specific corporate value chain'],
            examples: 'Sanlam ESD, Old Mutual Masisizane blended products',
          },
        ],
      },
      {
        type: 'p',
        content:
          'A common mistake is to chase grants because repayment feels scary. But grants are the hardest to get. If your business is trading and can service debt, a loan may be faster, more predictable, and ultimately more useful. Use grants to fund fixed costs and capacity building; use loans to fund working capital and growth.',
      },
      { type: 'cta', label: 'Browse by funding type', href: '/directory' },
    ],
  },
  {
    id: 'timeline',
    tag: 'Timeline',
    tagColor: { bg: 'var(--vula-green-subtle)', border: 'var(--vula-green-light)', text: 'var(--vula-green)' },
    question: 'How long does funding take and how much can I get?',
    short:
      'Timelines vary from 2 weeks to over 18 months depending on the funder and product. Amounts range from R5 000 to hundreds of millions. The key is matching your urgency and need to the right product.',
    answer: [
      {
        type: 'p',
        content:
          'One of the most under-communicated facts about funding is how long it takes. Applying without understanding the timeline can leave your business in limbo - waiting for a decision from an IDC committee while your rent is due next month. Here is a realistic picture.',
      },
      { type: 'heading', content: 'Typical timelines by funder type' },
      {
        type: 'timeline',
        items: [
          { funder: 'Fintech / alternative lenders', example: 'Lula, Merchant Capital, Retail Capital', range: '24 hrs - 7 days', amount: 'R10k - R5m', note: 'Revenue-based, fast decisions, higher cost of capital' },
          { funder: 'Commercial banks', example: 'Absa, Standard Bank, FNB, Nedbank', range: '1 - 6 weeks', amount: 'R50k - R50m', note: 'Requires full document pack, credit assessment, often collateral' },
          { funder: 'SEFA microfinance', example: 'SEFA direct or intermediaries', range: '4 - 10 weeks', amount: 'R10k - R3m', note: 'Government DFI, more accessible but slower than banks' },
          { funder: 'Corporate ESD / grants', example: 'Sanlam, Old Mutual, Massmart', range: '6 - 16 weeks', amount: 'R50k - R2m', note: 'Competitive intake rounds, often annual or bi-annual' },
          { funder: 'Government grants (DSBD, BBSDP)', example: 'BBSDP, TSIBA, Seda support', range: '3 - 9 months', amount: 'R30k - R5m', note: 'Cost-sharing structure, extensive compliance, high competition' },
          { funder: 'DFI growth capital', example: 'IDC, NEF, DBSA', range: '6 - 18 months', amount: 'R1m - R500m+', note: 'For established, revenue-generating businesses only' },
        ],
      },
      { type: 'heading', content: 'Practical advice' },
      {
        type: 'list',
        items: [
          'Apply to multiple programmes simultaneously - it is not cheating, it is standard practice',
          'Never stop trading while waiting for a decision - use that time to improve your records',
          'If you need capital within 30 days, a DFI or government grant cannot help you in time',
          "Check each programme's current intake status before spending time on the application",
          'Rejection from one programme does not affect eligibility for another',
        ],
      },
      { type: 'cta', label: 'See all open opportunities', href: '/directory' },
    ],
  },
]

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function FaqPage() {
  return (
    <main>
      {/* Page header */}
      <section
        style={{
          background: 'var(--vula-bg)',
          borderBottom: '1px solid var(--vula-border)',
          padding: 'clamp(3rem, 6vw, 5rem) 1.25rem clamp(2.5rem, 5vw, 4rem)',
        }}
      >
        <div style={{ maxWidth: '42rem', margin: '0 auto' }}>
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
            Funding explained
          </p>
          <h1
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              color: 'var(--vula-ink)',
              marginBottom: '1rem',
            }}
          >
            The questions every founder asks
          </h1>
          <p style={{ fontSize: '1rem', lineHeight: 1.7, color: 'var(--vula-muted)' }}>
            Honest answers to the five questions South African entrepreneurs ask most about finding and applying for business funding.
          </p>
        </div>
      </section>

      {/* Jump links */}
      <nav
        aria-label="FAQ sections"
        style={{
          borderBottom: '1px solid var(--vula-border)',
          background: 'var(--vula-surface)',
          padding: '0 1.25rem',
          overflowX: 'auto',
        }}
      >
        <div style={{ maxWidth: '42rem', margin: '0 auto', display: 'flex' }}>
          {FAQS.map((faq) => (
            <a
              key={faq.id}
              href={`#${faq.id}`}
              style={{
                flexShrink: 0,
                display: 'inline-block',
                padding: '0.875rem 0.875rem 0.75rem',
                fontSize: '0.8125rem',
                fontWeight: 500,
                color: 'var(--vula-muted)',
                textDecoration: 'none',
                borderBottom: '2px solid transparent',
                whiteSpace: 'nowrap',
              }}
            >
              {faq.tag}
            </a>
          ))}
        </div>
      </nav>

      {/* FAQ items */}
      <section
        style={{
          maxWidth: '42rem',
          margin: '0 auto',
          padding: 'clamp(2rem, 4vw, 3rem) 1.25rem clamp(4rem, 8vw, 6rem)',
          display: 'flex',
          flexDirection: 'column',
          gap: '2.5rem',
        }}
      >
        {FAQS.map((faq, idx) => (
          <article
            key={faq.id}
            id={faq.id}
            style={{
              scrollMarginTop: '5rem',
              borderTop: idx === 0 ? 'none' : '1px solid var(--vula-border)',
              paddingTop: idx === 0 ? 0 : '2.5rem',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                fontSize: '0.6875rem',
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                padding: '0.2rem 0.625rem',
                borderRadius: '999px',
                background: faq.tagColor.bg,
                border: `1px solid ${faq.tagColor.border}`,
                color: faq.tagColor.text,
                marginBottom: '0.875rem',
              }}
            >
              {faq.tag}
            </span>

            <h2
              style={{
                fontSize: 'clamp(1.125rem, 2.5vw, 1.375rem)',
                fontWeight: 750,
                letterSpacing: '-0.02em',
                lineHeight: 1.25,
                color: 'var(--vula-ink)',
                marginBottom: '0.75rem',
              }}
            >
              {faq.question}
            </h2>

            <p
              style={{
                fontSize: '0.9375rem',
                fontWeight: 500,
                color: 'var(--vula-ink)',
                lineHeight: 1.65,
                marginBottom: '1.5rem',
                padding: '0.875rem 1rem',
                background: 'var(--vula-surface)',
                borderLeft: '3px solid var(--vula-green)',
                borderRadius: '0 var(--radius) var(--radius) 0',
              }}
            >
              {faq.short}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {faq.answer.map((block, bi) => {
                if (block.type === 'p') {
                  return (
                    <p key={bi} style={{ fontSize: '0.9375rem', lineHeight: 1.7, color: 'var(--vula-muted)' }}>
                      {block.content}
                    </p>
                  )
                }

                if (block.type === 'heading') {
                  return (
                    <h3 key={bi} style={{ fontSize: '0.8125rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--vula-faint)', marginTop: '0.5rem' }}>
                      {block.content}
                    </h3>
                  )
                }

                if (block.type === 'list') {
                  return (
                    <ul key={bi} style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {block.items.map((item, ii) => (
                        <li key={ii} style={{ display: 'flex', gap: '0.625rem', fontSize: '0.9rem', color: 'var(--vula-muted)', lineHeight: 1.6 }}>
                          <svg width="14" height="14" fill="none" viewBox="0 0 14 14" aria-hidden="true" style={{ flexShrink: 0, marginTop: '0.25rem' }}>
                            <path d="M11.5 3.5L5.5 9.5 2.5 6.5" stroke="var(--vula-green)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )
                }

                if (block.type === 'reasons') {
                  return (
                    <div key={bi} style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                      {block.items.map((item, ii) => (
                        <div key={ii} style={{ display: 'flex', gap: '1rem', background: 'var(--vula-surface)', border: '1px solid var(--vula-border)', borderRadius: 'var(--radius-lg)', padding: '1rem 1.25rem' }}>
                          <span style={{ flexShrink: 0, fontSize: '0.6875rem', fontWeight: 700, color: 'var(--vula-faint)', letterSpacing: '0.04em', paddingTop: '0.125rem', width: '1.75rem' }}>
                            {item.number}
                          </span>
                          <div>
                            <p style={{ fontWeight: 650, fontSize: '0.9rem', color: 'var(--vula-ink)', marginBottom: '0.3rem' }}>{item.title}</p>
                            <p style={{ fontSize: '0.875rem', color: 'var(--vula-muted)', lineHeight: 1.65 }}>{item.body}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                }

                if (block.type === 'doclist') {
                  return (
                    <div key={bi} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {block.items.map((item, ii) => (
                        <div key={ii} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', background: 'var(--vula-surface)', border: '1px solid var(--vula-border)', borderRadius: 'var(--radius)', padding: '0.75rem 1rem' }}>
                          <svg width="16" height="16" fill="none" viewBox="0 0 16 16" aria-hidden="true" style={{ flexShrink: 0, marginTop: '0.125rem', color: 'var(--vula-green)' }}>
                            <rect x="2" y="1" width="10" height="13" rx="2" stroke="currentColor" strokeWidth="1.4" />
                            <path d="M5 5h6M5 8h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                          </svg>
                          <div>
                            <p style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--vula-ink)', marginBottom: '0.2rem' }}>{item.name}</p>
                            <p style={{ fontSize: '0.8125rem', color: 'var(--vula-muted)', lineHeight: 1.55 }}>{item.note}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                }

                if (block.type === 'types') {
                  return (
                    <div key={bi} style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                      {block.items.map((item, ii) => (
                        <div key={ii} style={{ background: item.color.bg, border: `1px solid ${item.color.border}`, borderRadius: 'var(--radius-lg)', padding: '1.125rem 1.25rem' }}>
                          <p style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--vula-ink)', marginBottom: '0.375rem' }}>{item.type}</p>
                          <p style={{ fontSize: '0.875rem', color: 'var(--vula-muted)', lineHeight: 1.6, marginBottom: '0.75rem' }}>{item.definition}</p>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem 1.5rem', marginBottom: '0.75rem' }}>
                            <div>
                              <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: item.color.accent, marginBottom: '0.375rem' }}>Works well when</p>
                              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                                {item.pros.map((p, pi) => (
                                  <li key={pi} style={{ fontSize: '0.8125rem', color: 'var(--vula-muted)', display: 'flex', gap: '0.375rem', lineHeight: 1.5 }}>
                                    <span style={{ color: item.color.accent, flexShrink: 0 }}>+</span>{p}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--vula-faint)', marginBottom: '0.375rem' }}>Watch out for</p>
                              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                                {item.cons.map((c, ci) => (
                                  <li key={ci} style={{ fontSize: '0.8125rem', color: 'var(--vula-muted)', display: 'flex', gap: '0.375rem', lineHeight: 1.5 }}>
                                    <span style={{ color: 'var(--vula-faint)', flexShrink: 0 }}>-</span>{c}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          <p style={{ fontSize: '0.75rem', color: 'var(--vula-faint)' }}>
                            <span style={{ fontWeight: 600 }}>Examples on Vula: </span>{item.examples}
                          </p>
                        </div>
                      ))}
                    </div>
                  )
                }

                if (block.type === 'timeline') {
                  return (
                    <div key={bi} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {block.items.map((item, ii) => (
                        <div key={ii} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '0.5rem 1rem', alignItems: 'start', background: 'var(--vula-surface)', border: '1px solid var(--vula-border)', borderRadius: 'var(--radius)', padding: '0.875rem 1rem' }}>
                          <div>
                            <p style={{ fontWeight: 650, fontSize: '0.875rem', color: 'var(--vula-ink)', marginBottom: '0.15rem' }}>{item.funder}</p>
                            <p style={{ fontSize: '0.75rem', color: 'var(--vula-faint)', marginBottom: '0.3rem' }}>{item.example}</p>
                            <p style={{ fontSize: '0.8125rem', color: 'var(--vula-muted)', lineHeight: 1.5 }}>{item.note}</p>
                          </div>
                          <div style={{ textAlign: 'right', flexShrink: 0 }}>
                            <p style={{ fontWeight: 700, fontSize: '0.8125rem', color: 'var(--vula-green)', whiteSpace: 'nowrap' }}>{item.range}</p>
                            <p style={{ fontSize: '0.75rem', color: 'var(--vula-faint)', whiteSpace: 'nowrap' }}>{item.amount}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                }

                if (block.type === 'cta') {
                  return (
                    <div key={bi} style={{ marginTop: '0.5rem' }}>
                      <Link
                        href={block.href}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          padding: block.secondary ? '0.5rem 1rem' : '0.65rem 1.25rem',
                          background: block.secondary ? 'transparent' : 'var(--vula-green)',
                          color: block.secondary ? 'var(--vula-green)' : '#fff',
                          fontWeight: 600,
                          fontSize: '0.875rem',
                          borderRadius: 'var(--radius-lg)',
                          textDecoration: 'none',
                          border: block.secondary ? '1px solid var(--vula-green-light)' : 'none',
                          boxShadow: block.secondary ? 'none' : '0 1px 3px oklch(0.18 0.04 145 / 0.22)',
                        }}
                      >
                        {block.label}
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                          <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </Link>
                    </div>
                  )
                }

                return null
              })}
            </div>
          </article>
        ))}
      </section>

      {/* Bottom CTA */}
      <section style={{ background: 'var(--vula-green)', padding: 'clamp(3rem, 6vw, 4.5rem) 1.25rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '32rem', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(1.375rem, 3vw, 1.875rem)', fontWeight: 800, color: '#fff', letterSpacing: '-0.025em', marginBottom: '0.75rem' }}>
            Ready to find your funding?
          </h2>
          <p style={{ fontSize: '0.9375rem', color: 'oklch(from #fff l c h / 0.75)', lineHeight: 1.6, marginBottom: '1.75rem' }}>
            Vula shows you verified opportunities matched to where your business is right now.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.625rem' }}>
            <Link
              href="/find"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.75rem 1.5rem', background: '#fff', color: 'var(--vula-green)', fontWeight: 700, fontSize: '0.9375rem', borderRadius: 'var(--radius-lg)', textDecoration: 'none' }}
            >
              Find my funding
              <svg width="13" height="13" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link
              href="/directory"
              style={{ display: 'inline-flex', alignItems: 'center', padding: '0.75rem 1.5rem', background: 'transparent', color: '#fff', fontWeight: 500, fontSize: '0.9375rem', borderRadius: 'var(--radius-lg)', textDecoration: 'none', border: '1px solid oklch(from #fff l c h / 0.3)' }}
            >
              Browse directory
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
