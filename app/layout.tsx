import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Nav } from '@/components/Nav'
import { VulaMark } from '@/components/VulaMark'

export const metadata: Metadata = {
  title: 'Vula — Find South African Business Funding',
  description:
    'Vula connects South African small business owners with verified funding opportunities. Registered or informal, find the funding you qualify for.',
  keywords:
    'South Africa funding, SMME grants, DSBD, small business funding SA, township business funding',
  openGraph: {
    title: 'Vula — Find South African Business Funding',
    description: 'Find the funding you qualify for. Registered or informal.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1a6b3c',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
            position: 'relative',
            overflow: 'hidden',
            borderTop: '1px solid var(--vula-border)',
            marginTop: '5rem',
            padding: '2.5rem 1.5rem',
            background: 'var(--vula-surface)',
          }}
        >
          {/* Watermark — large, bottom-right */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              right: '-1.5rem',
              bottom: '-1.5rem',
              color: 'var(--vula-green)',
              opacity: 0.06,
              pointerEvents: 'none',
            }}
          >
            <VulaMark size={160} />
          </div>

          {/* Footer content */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.75rem',
              textAlign: 'center',
            }}
          >
            <div style={{ color: 'var(--vula-green)', opacity: 0.7 }}>
              <VulaMark size={22} />
            </div>
            <p style={{ fontSize: '0.8125rem', color: 'var(--vula-muted)' }}>
              Vula is an independent directory. Always verify funding details on official sources before applying.
            </p>
            <p style={{ fontSize: '0.75rem', color: 'var(--vula-faint)' }}>
              Built for South African founders. Cape Town, 2026.
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}
