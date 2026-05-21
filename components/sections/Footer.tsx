'use client'
import { Zap } from 'lucide-react'
import Link from 'next/link'

const links = [
  {
    title: 'Product',
    items: [
      { label: 'Education', href: '#services' },
      { label: 'Gaming',    href: '#services' },
      { label: 'Software',  href: '#services' },
    ],
  },
  {
    title: 'Company',
    items: [
      { label: 'About',     href: '#about' },
      { label: 'Process',   href: '#process' },
      { label: 'Contact',   href: '#contact' },
    ],
  },
  {
    title: 'Connect',
    items: [
      { label: 'GitHub',   href: 'https://github.com' },
      { label: 'X (Twitter)', href: 'https://x.com' },
      { label: 'LinkedIn', href: 'https://linkedin.com' },
    ],
  },
]

export default function Footer() {
  return (
    <footer style={{ background: 'transparent', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '64px 0 32px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 1.5rem', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: -20, background: 'rgba(5,8,22,0.85)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', zIndex: -1, pointerEvents: 'none', borderRadius: 24, border: '1px solid rgba(255,255,255,0.05)' }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 40, marginBottom: 56 }}>
          {/* Brand */}
          <div style={{ gridColumn: '1 / -1', maxWidth: 300 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <Zap size={14} color="#00FFB2" />
              </div>
              <span style={{ fontSize: 14, fontWeight: 600, color: '#fff', fontFamily: 'var(--heading-font)' }}>
                Quantum<span className="qp-gradient">Pixels</span>
              </span>
            </div>
            <p style={{ fontSize: 12, color: '#424245', lineHeight: 1.6 }}>
              Student-founded engineering startup building intelligent digital experiences.
            </p>
          </div>

          {/* Link columns */}
          {links.map(group => (
            <div key={group.title}>
              <h4 style={{ fontSize: 12, color: '#86868B', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500, marginBottom: 16 }}>
                {group.title}
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {group.items.map(item => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      style={{ fontSize: 14, color: '#424245', textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#424245')}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 24 }}>
          <p style={{ fontSize: 12, color: '#424245', margin: 0 }}>
            &copy; {new Date().getFullYear()} Quantum Pixels. All rights reserved.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <Link href="/privacy" style={{ fontSize: 12, color: '#424245', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')} onMouseLeave={(e) => (e.currentTarget.style.color = '#424245')}>Privacy Policy</Link>
            <Link href="/terms" style={{ fontSize: 12, color: '#424245', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')} onMouseLeave={(e) => (e.currentTarget.style.color = '#424245')}>Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
