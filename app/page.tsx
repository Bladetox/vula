import Link from 'next/link'
import { VulaWordmark } from '@/components/icons/VulaWordmark'

export default function HomePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-16 pb-24">
      {/* Hero */}
      <section className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-[var(--vula-green-light)] text-[var(--vula-green)] text-sm font-medium px-4 py-1.5 rounded-full mb-6">
          <span>9 verified funding opportunities</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[var(--vula-ink)] mb-5 leading-tight">
          Open the door to your
          <br />
          <span className="text-[var(--vula-green)]">South African funding</span>
        </h1>
        <p className="text-lg md:text-xl text-[var(--vula-muted)] max-w-xl mx-auto mb-10 leading-relaxed">
          Registered or informal. Township or city. Find the funding you actually qualify for.
        </p>
        <Link
          href="/find"
          className="inline-flex items-center gap-2 bg-[var(--vula-green)] text-white text-base font-semibold px-8 py-4 rounded-xl hover:bg-[#155c33] transition-colors duration-150 shadow-sm"
        >
          Find my funding
          <svg width="16" height="16" fill="none" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </section>

      {/* Three entry paths */}
      <section aria-label="Choose your path">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--vula-muted)] text-center mb-6">Where do you start?</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <EntryCard
            href="/find?type=registered"
            svgPath="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            title="I have a registered business"
            description="CIPC-registered and looking for grants, loans, or blended finance."
            accent="green"
          />
          <EntryCard
            href="/find?type=informal"
            svgPath="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            title="I run an informal business"
            description="Not yet registered. Find what you can access now and what to unlock."
            accent="gold"
          />
          <EntryCard
            href="/find?type=starting"
            svgPath="M12 6v6m0 0v6m0-6h6m-6 0H6"
            title="I am starting from scratch"
            description="New to business. Start here to understand your options from day one."
            accent="muted"
          />
        </div>
      </section>

      {/* Stats strip */}
      <section className="mt-16 grid grid-cols-3 gap-4 text-center">
        {[
          { value: '9', label: 'Verified opportunities' },
          { value: '14', label: 'Industries covered' },
          { value: 'Free', label: 'Always' }
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-[var(--vula-border)] py-6 px-4">
            <div className="text-3xl font-bold text-[var(--vula-green)] mb-1">{stat.value}</div>
            <div className="text-sm text-[var(--vula-muted)]">{stat.label}</div>
          </div>
        ))}
      </section>
    </div>
  )
}

function EntryCard({
  href, svgPath, title, description, accent
}: {
  href: string
  svgPath: string
  title: string
  description: string
  accent: 'green' | 'gold' | 'muted'
}) {
  const accentMap = {
    green: { bg: 'var(--vula-green-light)', color: 'var(--vula-green)' },
    gold: { bg: 'var(--vula-gold-light)', color: 'var(--vula-gold)' },
    muted: { bg: '#f3f4f6', color: '#374151' }
  }
  const { bg, color } = accentMap[accent]

  return (
    <Link
      href={href}
      className="group flex flex-col gap-4 bg-white border border-[var(--vula-border)] rounded-2xl p-6 hover:border-[var(--vula-green)] hover:shadow-md transition-all duration-150"
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center"
        style={{ background: bg }}
      >
        <svg width="22" height="22" fill="none" viewBox="0 0 24 24" aria-hidden="true">
          <path d={svgPath} stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div>
        <h3 className="font-semibold text-[var(--vula-ink)] mb-1">{title}</h3>
        <p className="text-sm text-[var(--vula-muted)] leading-relaxed">{description}</p>
      </div>
      <span className="mt-auto text-sm font-medium text-[var(--vula-green)] group-hover:underline">Start here</span>
    </Link>
  )
}
