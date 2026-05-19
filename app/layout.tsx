import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Nav } from '@/components/Nav'

export const metadata: Metadata = {
  title: 'Vula — Find South African Business Funding',
  description: 'Vula connects South African small business owners with verified funding opportunities. Registered or informal, find the funding you qualify for.',
  keywords: 'South Africa funding, SMME grants, DSBD, small business funding SA, township business funding',
  openGraph: {
    title: 'Vula — Find South African Business Funding',
    description: 'Find the funding you qualify for. Registered or informal.',
    type: 'website'
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1a6b3c'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <main id="main" className="min-h-dvh">
          {children}
        </main>
        <footer className="border-t border-[var(--vula-border)] mt-16 py-10 px-6 text-center text-sm text-[var(--vula-muted)]">
          <p>Vula is an independent directory. Always verify funding details on official sources before applying.</p>
          <p className="mt-1">Built for South African founders. Cape Town, 2026.</p>
        </footer>
      </body>
    </html>
  )
}
