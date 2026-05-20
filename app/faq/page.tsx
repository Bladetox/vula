import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Funding FAQ - Vula',
  description:
    'Answers to the five questions South African entrepreneurs ask most about funding: qualifying, rejection, documents, grants vs loans, and timelines.',
}

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
    label: string
    pill: string
    definition: string
    realities: string[]
    onVula: string
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

const FAQS: Faq[] = [
  {
    id: 'informal',
    tag: 'Eligibility',
    tagColor: { bg: '#fef5e0', border: '#f0d89a', text: '#92600a' },
    question: 'Can I apply for funding if my business is not registered?',
    short:
      'Yes. A number of funding programmes in South Africa are open to informal and unregistered businesses. Registration unlocks significantly more, but it is not the starting requirement everywhere.',
    answer: [
      {
        type: 'p',
        content:
          'The assumption that all funding requires a CIPC registration number is one of the most damaging myths in the South African small business space. It stops thousands of entrepreneurs from even trying. The reality is more nuanced.',
      },
      {
        type: 'p',
        content:
          'Informal businesses - street traders, home-based operations, spaza shops, and sole traders without formal registration - can access certain programmes from government departments, community development organisations, and some banks. These programmes are specifically designed for people who cannot yet register because they lack the funds, the address, or the documentation to do so.',
      },
      { type: 'heading', content: 'What informal businesses can access' },
      {
        type: 'list',
        items: [
          'Cooperative Incentive Scheme (CIS) - open to formally registered co-operatives, which have a lower barrier than CIPC company registration and require a minimum of five members',
          'TREP sub-sector programmes (bakeries, spaza shops, butcheries, beauty, clothing, autobody) - formal CIPC registration is not strictly required for all sub-programmes',
          'Some provincial EDTECH and township enterprise funds that use proof of trading instead of CIPC',
          'Microfinance products through SEFA-accredited microfinance intermediaries (MFIs) - these intermediaries can reach informal businesses that SEFA itself cannot lend to directly',
        ],
      },
      { type: 'heading', content: 'Why registration still matters' },
      {
        type: 'p',
        content:
          'The honest answer is that formalising your business opens access to significantly more funding opportunities. Banks, DFIs like IDC and DBSA, and most corporate ESD programmes require a CIPC number, a business bank account, and a tax clearance certificate before they will even open your application. If your goal is to grow, formalisation is worth the investment of time.',
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
          'Most South African entrepreneurs never find out why they were rejected. The funder sends a form email and the applicant assumes the opportunity was a scam or that the process was corrupt. Sometimes that is true. Often it is not. The Finfind 2025 SA MSME Access to Finance Report documented the most common barriers facing South African small businesses - and the same patterns appear repeatedly across thousands of applications.',
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
            body: 'If you cannot show income and expenses - even in a simple spreadsheet - funders cannot assess your ability to repay or your need. A basic bookkeeping app like Wave (free) or Zoho Books changes this. The Finfind 2025 report found that poor financial record-keeping is one of the top barriers to funding access for South African MSMEs.',
          },
          {
            number: '03',
            title: 'Poor or no credit profile',
            body: 'For loan products, your personal credit score is often assessed alongside the business. Unpaid debt, judgements, and defaults flag you as high risk. Check your credit report on TransUnion or Experian before applying - both offer a free annual check as required by the National Credit Act.',
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
          'Document requirements feel overwhelming because each funder lists them differently. But underneath the different labels, the vast majority of programmes ask for the same set of things. Here is the universal pack - the documents that appear on almost every checklist in South Africa.',
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
      'A grant is money you do not pay back. A loan is money you do. Revenue-based finance sits between them - repayment is automatic and tied to your daily sales. Knowing which one fits your situation determines which programmes are worth your time.',
    answer: [
      {
        type: 'p',
        content:
          'The confusion between grants, loans, and newer fintech products causes people to waste months applying for the wrong thing. Here is how the five types you will encounter on Vula differ in plain language.',
      },
      { type: 'heading', content: 'The five types you will encounter on Vula' },
      {
        type: 'types',
        items: [
          {
            label: 'Grant',
            pill: 'No repayment',
            definition:
              'Money from government, a development agency, or a corporate ESD programme. You keep it. No interest, no monthly instalments.',
            realities: [
              'The most competitive type - often hundreds of applicants per slot',
              'Tied to a specific approved use: equipment, training, or market access - not salaries or rent',
              'Comes with reporting obligations. Funders will check you spent it correctly',
              'A grant award on your record makes follow-on loans easier to get',
            ],
            onVula: 'BBSDP, DTIC Black Industrialists Scheme (BIS), SEDA Product Testing Grant',
          },
          {
            label: 'Loan',
            pill: 'Repaid over time',
            definition:
              'Borrowed capital from a bank, a development finance institution (DFI), or a microfinance provider. You repay it monthly with interest.',
            realities: [
              'Larger amounts are available than most grant programmes',
              'Your credit history and trading record are the main assessment criteria',
              'Collateral is often required - though DFIs like SEFA and NEF are more flexible than commercial banks',
              'If your business can service the debt, a loan is often faster and more predictable than chasing grants',
            ],
            onVula: 'SEFA Direct Lending, Absa SME Loan, Old Mutual Masisizane',
          },
          {
            label: 'Revenue-based finance',
            pill: 'Repaid from daily sales',
            definition:
              'A fintech advance repaid as a percentage of your daily card or bank turnover. No fixed monthly instalment - you pay back more when trading is strong, less when it is slow.',
            realities: [
              'The fastest to access - decisions in 24 to 48 hours, no business plan required',
              'Qualification is based on your card or bank transaction history, not credit score alone',
              'Available to businesses with card processing history (Yoco, card machine users) or consistent bank account turnover (Lula)',
              'Factor fees (not interest rates) make the cost harder to compare - calculate the total repayment amount, not the percentage',
            ],
            onVula: 'Yoco Capital, Lula, Merchant Capital, Retail Capital, Peach Payments Capital',
          },
          {
            label: 'Equity',
            pill: 'Ownership in exchange',
            definition:
              'An investor provides capital and takes a share of your business in return. There is no repayment - but there is a cost: a portion of future profit and decision-making.',
            realities: [
              'No monthly repayment pressure - right for high-growth businesses that need runway',
              'Investors expect a return through growth or an eventual exit, not suited to stable lifestyle businesses',
              'Negotiation takes months - build in lead time',
              'Most relevant to tech, manufacturing, and scale-ready businesses',
            ],
            onVula: 'IDC Equity, National Empowerment Fund (NEF), Sanlam ESD Programme',
          },
          {
            label: 'Blended finance',
            pill: 'Part grant, part loan',
            definition:
              'A hybrid product where part of the funding is a grant and the rest is a subsidised loan. Common in corporate ESD and government-partnership programmes.',
            realities: [
              'Lower effective cost than a pure market-rate loan',
              'More flexible than a pure grant since the loan portion can cover working capital',
              'Often restricted to businesses within a specific corporate supply chain or sector',
              'Read the split carefully - the grant and loan portions have different conditions',
            ],
            onVula: 'Sanlam ESD, Old Mutual Masisizane blended products',
          },
        ],
      },
      {
        type: 'p',
        content:
          'A common mistake is to chase grants because repayment feels scary. But grants are the hardest to get and are restricted to approved uses like equipment, training, and capacity building - they cannot cover rent or salaries. If your business is trading and can service debt, a loan or revenue-based advance may be faster, more predictable, and ultimately more useful for day-to-day working capital.',
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
          { funder: 'Revenue-based (Yoco, Lula, Merchant Capital)', example: 'Yoco Capital, Lula, Peach Payments Capital', range: '24 hrs - 3 days', amount: 'R5k - R5m', note: 'Turnover-linked, automated decisions, factor fee pricing - fastest capital available' },
          { funder: 'Fintech / alternative lenders', example: 'Retail Capital, other alt lenders', range: '24 hrs - 7 days', amount: 'R10k - R5m', note: 'Revenue-based, fast decisions, higher cost of capital' },
          { funder: 'Commercial banks', example: 'Absa, Standard Bank, FNB, Nedbank', range: '1 - 6 weeks', amount: 'R50k - R50m', note: 'Requires full document pack, credit assessment, often collateral' },
          { funder: 'SEFA direct lending', example: 'SEFA direct or via intermediaries', range: '4 - 10 weeks', amount: 'R50k - R15m', note: 'Government DFI, more accessible than banks but requires CIPC registration and trading history' },
          { funder: 'Corporate ESD / grants', example: 'Sanlam, Old Mutual, Massmart', range: '6 - 16 weeks', amount: 'R50k - R2m', note: 'Competitive intake rounds, often annual or bi-annual' },
          { funder: 'Government grants (DSBD, BBSDP)', example: 'BBSDP, SEDA support, DSBD programmes', range: '3 - 9 months', amount: 'R30k - R5m', note: 'Cost-sharing structure, extensive compliance, high competition' },
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
                    <div key={bi} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {block.items.map((item, ii) => {
                        const isRevenueBased = item.label === 'Revenue-based finance'
                        return (
                          <div
                            key={ii}
                            style={{
                              background: 'var(--vula-surface)',
                              border: `1px solid ${isRevenueBased ? '#fed7aa' : 'var(--vula-border)'}`,
                              borderRadius: 'var(--radius-xl)',
                              overflow: 'hidden',
                            }}
                          >
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: '0.75rem',
                                padding: '1rem 1.25rem',
                                borderBottom: `1px solid ${isRevenueBased ? '#fed7aa' : 'var(--vula-border)'}`,
                                background: isRevenueBased ? '#fff7ed' : 'var(--vula-surface-2)',
                              }}
                            >
                              <p style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--vula-ink)', margin: 0 }}>
                                {item.label}
                              </p>
                              <span
                                style={{
                                  flexShrink: 0,
                                  fontSize: '0.6875rem',
                                  fontWeight: 600,
                                  letterSpacing: '0.03em',
                                  padding: '0.2rem 0.625rem',
                                  borderRadius: '999px',
                                  background: isRevenueBased ? '#fff7ed' : 'var(--vula-green-subtle)',
                                  border: `1px solid ${isRevenueBased ? '#fed7aa' : 'var(--vula-green-light)'}`,
                                  color: isRevenueBased ? '#c2500a' : 'var(--vula-green)',
                                }}
                              >
                                {item.pill}
                              </span>
                            </div>

                            <div style={{ padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                              <p style={{ fontSize: '0.9rem', color: 'var(--vula-muted)', lineHeight: 1.65, margin: 0 }}>
                                {item.definition}
                              </p>

                              <div>
                                <p
                                  style={{
                                    fontSize: '0.6875rem',
                                    fontWeight: 700,
                                    letterSpacing: '0.06em',
                                    textTransform: 'uppercase',
                                    color: 'var(--vula-faint)',
                                    marginBottom: '0.5rem',
                                  }}
                                >
                                  What to know
                                </p>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                  {item.realities.map((r, ri) => (
                                    <li
                                      key={ri}
                                      style={{
                                        display: 'flex',
                                        gap: '0.5rem',
                                        fontSize: '0.8125rem',
                                        color: 'var(--vula-muted)',
                                        lineHeight: 1.55,
                                      }}
                                    >
                                      <svg width="13" height="13" fill="none" viewBox="0 0 14 14" aria-hidden="true" style={{ flexShrink: 0, marginTop: '0.2rem' }}>
                                        <path d="M11.5 3.5L5.5 9.5 2.5 6.5" stroke="var(--vula-green)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                                      </svg>
                                      {r}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <p
                                style={{
                                  fontSize: '0.75rem',
                                  color: 'var(--vula-faint)',
                                  borderTop: '1px solid var(--vula-border)',
                                  paddingTop: '0.75rem',
                                  margin: 0,
                                }}
                              >
                                <span style={{ fontWeight: 600 }}>On Vula: </span>
                                {item.onVula}
                              </p>
                            </div>
                          </div>
                        )
                      })}
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
