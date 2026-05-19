import Link from 'next/link'

const STEPS = [
  {
    number: 1,
    title: 'Register on CIPC',
    description: 'The Companies and Intellectual Property Commission registers your business officially. You can register a private company (Pty Ltd), sole proprietor, or co-operative.',
    action: 'Register on CIPC',
    href: 'https://www.cipc.co.za'
  },
  {
    number: 2,
    title: 'Register with SARS',
    description: 'Once CIPC-registered, register for tax with SARS. You will need an income tax number and, once turnover exceeds the threshold, VAT registration.',
    action: 'Register with SARS',
    href: 'https://www.sars.gov.za/businesses-and-employers/register-a-business/'
  },
  {
    number: 3,
    title: 'Open a business bank account',
    description: 'Most funding applications require a dedicated business bank account. Several South African banks offer low-cost options for small businesses.',
    action: null,
    href: null
  },
  {
    number: 4,
    title: 'Get a B-BBEE affidavit or certificate',
    description: 'Businesses with annual turnover under R10 million can use a sworn affidavit. Larger businesses need a verified B-BBEE certificate from an accredited agency.',
    action: 'Learn about B-BBEE',
    href: 'https://www.thedtic.gov.za/financial-and-non-financial-support/bee/'
  },
  {
    number: 5,
    title: 'Prepare your core funding pack',
    description: 'Almost every application asks for the same set of documents. Get them in one folder and keep them updated.',
    action: null,
    href: null,
    list: [
      'CIPC registration certificate',
      'SARS tax compliance certificate',
      'B-BBEE affidavit or certificate',
      'Bank confirmation letter',
      '12-month financial projections',
      'Proof of trading address',
      'Identity document of owner(s)'
    ]
  }
]

export default function RegisterPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 pt-10 pb-24">
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 bg-[var(--vula-gold-light)] text-[var(--vula-gold)] text-sm font-medium px-4 py-1.5 rounded-full mb-4">
          For informal businesses
        </div>
        <h1 className="text-3xl font-bold text-[var(--vula-ink)] mb-3">Get registered, unlock more funding</h1>
        <p className="text-[var(--vula-muted)] leading-relaxed">
          Most South African funding programmes require a formally registered business. These five steps will get you there and open access to significantly more opportunities.
        </p>
      </div>

      <div className="space-y-4">
        {STEPS.map((step) => (
          <div key={step.number} className="bg-white border border-[var(--vula-border)] rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-full bg-[var(--vula-green)] text-white font-bold text-sm flex items-center justify-center shrink-0">
                {step.number}
              </div>
              <div className="flex-1">
                <h2 className="font-semibold text-[var(--vula-ink)] mb-2">{step.title}</h2>
                <p className="text-sm text-[var(--vula-muted)] leading-relaxed mb-3">{step.description}</p>
                {step.list && (
                  <ul className="space-y-1.5 mb-3">
                    {step.list.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-[var(--vula-muted)]">
                        <svg width="14" height="14" fill="none" viewBox="0 0 14 14" aria-hidden="true">
                          <path d="M11.5 3.5L5.5 9.5 2.5 6.5" stroke="var(--vula-green)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                {step.href && step.action && (
                  <a
                    href={step.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--vula-green)] hover:underline"
                  >
                    {step.action}
                    <svg width="12" height="12" fill="none" viewBox="0 0 12 12" aria-hidden="true">
                      <path d="M2 10L10 2M5 2h5v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/find?type=registered"
          className="inline-flex items-center gap-2 bg-[var(--vula-green)] text-white font-semibold px-8 py-4 rounded-xl hover:bg-[#155c33] transition-colors duration-150"
        >
          Find my funding now
        </Link>
      </div>
    </div>
  )
}
