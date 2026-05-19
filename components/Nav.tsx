'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const NAV_LINKS = [
  { href: '/find', label: 'Find funding' },
  { href: '/browse', label: 'Browse' },
  { href: '/directory', label: 'Directory' },
  { href: '/register', label: 'Get registered' },
  { href: '/submit', label: 'Submit a listing' }
]

export function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-[var(--vula-border)]">
      <nav className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between" aria-label="Main navigation">
        <Link href="/" className="flex items-center gap-2" aria-label="Vula home">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <rect width="28" height="28" rx="8" fill="var(--vula-green)" />
            <path d="M8 8l6 12 6-12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-bold text-[var(--vula-ink)] text-lg tracking-tight">Vula</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm px-3 py-2 rounded-lg transition-colors duration-150 ${
                pathname === link.href
                  ? 'font-semibold text-[var(--vula-green)] bg-[var(--vula-green-light)]'
                  : 'text-[var(--vula-muted)] hover:text-[var(--vula-ink)] hover:bg-[var(--vula-bg)]'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg hover:bg-[var(--vula-bg)] transition-colors"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 20 20" aria-hidden="true">
            {open ? (
              <path d="M4 4l12 12M16 4L4 16" stroke="var(--vula-ink)" strokeWidth="1.75" strokeLinecap="round" />
            ) : (
              <path d="M3 5h14M3 10h14M3 15h14" stroke="var(--vula-ink)" strokeWidth="1.75" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-[var(--vula-border)] bg-white px-4 py-4 space-y-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`block text-sm px-4 py-3 rounded-xl transition-colors duration-150 ${
                pathname === link.href
                  ? 'font-semibold text-[var(--vula-green)] bg-[var(--vula-green-light)]'
                  : 'text-[var(--vula-ink)] hover:bg-[var(--vula-bg)]'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
