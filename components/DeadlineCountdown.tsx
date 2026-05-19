'use client'

import { useEffect, useState } from 'react'

function getDaysLeft(deadline: string): number {
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  const end = new Date(deadline)
  end.setHours(0, 0, 0, 0)
  return Math.round((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
}

function getConfig(days: number): { bg: string; color: string; border: string } {
  if (days <= 7)  return { bg: '#fff1f0', color: '#c0392b', border: '#fdc5c0' }
  if (days <= 21) return { bg: '#fff8ed', color: '#92600a', border: '#f5dcaa' }
  return             { bg: 'var(--vula-green-subtle)', color: 'var(--vula-green)', border: 'var(--vula-green-light)' }
}

export function DeadlineCountdown({ deadline }: { deadline: string }) {
  const [days, setDays] = useState<number | null>(null)

  useEffect(() => {
    setDays(getDaysLeft(deadline))
  }, [deadline])

  if (days === null) return null
  if (days < 0) return null

  const cfg = getConfig(days)
  const label = days === 0 ? 'Closes today' : days === 1 ? '1 day left' : `${days} days left`

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.3rem',
        fontSize: '0.6875rem',
        fontWeight: 650,
        letterSpacing: '0.02em',
        padding: '0.2rem 0.625rem',
        borderRadius: '999px',
        background: cfg.bg,
        color: cfg.color,
        border: `1px solid ${cfg.border}`,
        whiteSpace: 'nowrap',
      }}
    >
      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
        <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      {label}
    </span>
  )
}
