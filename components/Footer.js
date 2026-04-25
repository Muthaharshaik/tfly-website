'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'

// Each link has a real href — section anchors or mailto/tel
const footerLinks = {
  Services: [
    { label: 'OSP Survey',          href: '#services'   },
    { label: 'Field QC',            href: '#services'   },
    { label: 'Engineering Design',  href: '#services'   },
    { label: 'Drafting Services',   href: '#services'   },
    { label: 'PLA Services',       href: '#services'   },
    { label: 'Basemap Production',  href: '#services'   },
  ],
  Company: [
    { label: 'About Us',   href: '#why'        },
    { label: 'Our Team',   href: '#team'       },
    { label: 'Why TFly',   href: '#why'        },
    { label: 'Industries', href: '#industries' },
  ],
  Resources: [
    { label: 'Get a Quote',      href: '#contact'            },
    { label: 'Contact Us',       href: '#contact'            },
    { label: 'Privacy Policy',   href: '#'                   }, // add page later
    { label: 'Terms of Service', href: '#'                   }, // add page later
  ],
}

function useWindowWidth() {
  const [w, setW] = useState(1200)
  useEffect(() => {
    const set = () => setW(window.innerWidth)
    set()
    window.addEventListener('resize', set)
    return () => window.removeEventListener('resize', set)
  }, [])
  return w
}

export default function Footer() {
  const width    = useWindowWidth()
  const isMobile = width < 768
  const isTiny   = width < 500
  const year     = new Date().getFullYear()

  return (
    <footer style={{
      position: 'relative', zIndex: 1,
      background: 'var(--navy-2)',
      borderTop: '1px solid var(--border)',
      padding: isMobile ? '48px 5vw 28px' : '64px 5vw 32px',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isTiny ? '1fr' : isMobile ? '1fr 1fr' : '2fr 1fr 1fr 1fr',
          gap: isMobile ? 32 : 48,
          marginBottom: 48,
        }}>
          {/* Brand */}
          <div style={{ gridColumn: isTiny ? '1 / -1' : 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <div style={{ width: 42, height: 42, borderRadius: '50%', overflow: 'hidden', border: '1.5px solid rgba(0,212,255,0.3)', flexShrink: 0 }}>
                <Image src="/images/tfly-logo.jpg" alt="TFly Logo" width={42} height={42} style={{ objectFit: 'cover' }} />
              </div>
              <span style={{ fontFamily: 'Syne, sans-serif', fontSize: 20, fontWeight: 800, letterSpacing: '-0.5px' }}>
                TFly<span style={{ color: 'var(--cyan)' }}>.</span>
              </span>
            </div>
            <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.75, fontWeight: 300, maxWidth: 280 }}>
              End-to-end OSP survey, design, and engineering services for modern telecom networks. Precision-built infrastructure, delivered on time.
            </p>
            <div style={{ marginTop: 24, display: 'flex', gap: 10 }}>
              <a href="https://www.linkedin.com/in/tfly-12ab97395/" target="_blank" rel="noopener noreferrer"
                style={{ padding: '7px 16px', fontSize: 12, color: 'var(--muted)', border: '1px solid var(--border)', borderRadius: 6, textDecoration: 'none', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.target.style.color = '#fff'; e.target.style.borderColor = 'var(--border-2)' }}
                onMouseLeave={e => { e.target.style.color = 'var(--muted)'; e.target.style.borderColor = 'var(--border)' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 13, fontWeight: 600, marginBottom: 16, color: '#fff' }}>
                {title}
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {links.map(link => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      style={{ fontSize: 13, color: 'var(--muted)', textDecoration: 'none', transition: 'color 0.2s', fontWeight: 300 }}
                      onMouseEnter={e => e.target.style.color = '#fff'}
                      onMouseLeave={e => e.target.style.color = 'var(--muted)'}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid var(--border)', paddingTop: 24,
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: isMobile ? 'flex-start' : 'center',
          gap: 12,
        }}>
          <span style={{ fontSize: 13, color: 'var(--muted-2)' }}>
            © {year} TFly · tflyind.com · All rights reserved. 
          </span>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            {[
              { label: 'Privacy Policy',   href: '#' },
              { label: 'Terms of Service', href: '#' },
              { label: 'Sitemap',          href: '#' },
            ].map(l => (
              <a key={l.label} href={l.href}
                style={{ fontSize: 12, color: 'var(--muted-2)', textDecoration: 'none' }}
                onMouseEnter={e => e.target.style.color = '#fff'}
                onMouseLeave={e => e.target.style.color = 'var(--muted-2)'}>
                {l.label}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}