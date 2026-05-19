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
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=plus-jakarta-sans@400,500,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Nav />
        <div id="main" className="min-h-dvh">
          {children}
        </div>
        <footer
          style={{
            borderTop: '1px solid var(--vula-border)',
            marginTop: '5rem',
            padding: '2.5rem 1.5rem',
            textAlign: 'center',
            fontSize: '0.8125rem',
            color: 'var(--vula-muted)',
            background: 'var(--vula-surface)'
          }}
        >
          <p>Vula is an independent directory. Always verify funding details on official sources before applying.</p>
          <p style={{ marginTop: '0.25rem', color: 'var(--vula-faint)' }}>Built for South African founders. Cape Town, 2026.</p>
        </footer>
      </body>
    </html>
  )
}
