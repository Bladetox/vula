'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { VulaMark } from '@/components/VulaMark'

const NAV_LINKS = [
  { href: '/find',      label: 'Find funding' },
  { href: '/browse',    label: 'Browse' },
  { href: '/directory', label: 'Directory' },
  { href: '/faq',       label: 'FAQ' },
  { href: '/register',  label: 'Get registered' },
  { href: '/submit',    label: 'Submit a listing' },
]

export function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'oklch(from #fdfcfa l c h / 0.92)',
        backdropFilter: 'blur(12px) saturate(180%)',
        WebkitBackdropFilter: 'blur(12px) saturate(180%)',
        borderBottom: '1px solid var(--vula-border)',
      }}
    >
      <nav
        style={{
          maxWidth: '64rem',
          margin: '0 auto',
          padding: '0 1.25rem',
          height: '3.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          aria-label="Vula home"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            textDecoration: 'none',
            color: 'var(--vula-green)',
          }}
        >
          <VulaMark size={26} />
          <span
            style={{
              fontWeight: 700,
              fontSize: '1rem',
              color: 'var(--vula-ink)',
              letterSpacing: '-0.02em',
            }}
          >
            Vula
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex" style={{ alignItems: 'center', gap: '0.125rem' }}>
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontSize: '0.8125rem',
                  fontWeight: active ? 600 : 450,
                  padding: '0.4rem 0.75rem',
                  borderRadius: 'var(--radius)',
                  textDecoration: 'none',
                  color: active ? 'var(--vula-green)' : 'var(--vula-muted)',
                  background: active ? 'var(--vula-green-subtle)' : 'transparent',
                }}
              >
                {link.label}
              </Link>
            )
          })}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden"
          style={{
            padding: '0.5rem',
            borderRadius: 'var(--radius)',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--vula-ink)',
          }}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 20 20" aria-hidden="true">
            {open ? (
              <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            ) : (
              <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div
          className="md:hidden"
          style={{
            borderTop: '1px solid var(--vula-border)',
            background: 'var(--vula-surface)',
            padding: '0.75rem 1.25rem 1rem',
          }}
        >
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                style={{
                  display: 'block',
                  fontSize: '0.9375rem',
                  fontWeight: active ? 600 : 400,
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-lg)',
                  textDecoration: 'none',
                  color: active ? 'var(--vula-green)' : 'var(--vula-ink)',
                  background: active ? 'var(--vula-green-subtle)' : 'transparent',
                }}
              >
                {link.label}
              </Link>
            )
          })}
        </div>
      )}
    </header>
  )
}
