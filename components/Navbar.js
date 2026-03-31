'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const navLinks = [
  { href: '#services',   label: 'Services'   },
  { href: '#process',    label: 'Process'    },
  { href: '#why',        label: 'Why Us'     },
  { href: '#industries', label: 'Industries' },
  { href: '#team',       label: 'Team'       },
]

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

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const width     = useWindowWidth()
  const isDesktop = width >= 768

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu when resizing to desktop
  useEffect(() => { if (isDesktop) setMenuOpen(false) }, [isDesktop])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      {/* ── Navbar bar ── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        zIndex: 1000,                          // high enough above all sections
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 5vw', height: '72px',
        background: (scrolled || menuOpen) ? 'rgba(6,14,30,0.97)' : 'transparent',
        backdropFilter: (scrolled || menuOpen) ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
        transition: 'background 0.35s ease, border-color 0.35s ease',
      }}>
        {/* Logo */}
        <a href="#" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', zIndex: 1001 }}>
          <div style={{ width: 44, height: 44, borderRadius: '50%', overflow: 'hidden', border: '1.5px solid rgba(0,212,255,0.3)', boxShadow: '0 0 16px rgba(0,212,255,0.15)', flexShrink: 0 }}>
            <Image src="/images/tfly-logo.jpg" alt="TFly Logo" width={44} height={44} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
          </div>
          <span style={{ fontFamily: 'Syne, sans-serif', fontSize: 22, fontWeight: 800, letterSpacing: '-0.5px', color: '#fff' }}>
            TFly<span style={{ color: 'var(--cyan)' }}>.</span>
          </span>
        </a>

        {/* Desktop links */}
        {isDesktop && (
          <ul style={{ display: 'flex', alignItems: 'center', gap: 36, listStyle: 'none', margin: 0 }}>
            {navLinks.map(l => (
              <li key={l.href}>
                <a href={l.href} style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: 14, fontWeight: 400, transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = '#fff'}
                  onMouseLeave={e => e.target.style.color = 'var(--muted)'}>
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#contact" className="btn-glow" style={{ padding: '9px 22px', fontSize: 14, borderRadius: 6 }}>
                Get a Quote
              </a>
            </li>
          </ul>
        )}

        {/* Hamburger button */}
        {!isDesktop && (
          <button
            onClick={() => setMenuOpen(o => !o)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, zIndex: 1001, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
            aria-label="Toggle menu"
          >
            <span style={{ display: 'block', width: 24, height: 2, background: '#fff', marginBottom: 5, borderRadius: 2, transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'none' }} />
            <span style={{ display: 'block', width: 24, height: 2, background: '#fff', marginBottom: 5, borderRadius: 2, transition: 'opacity 0.3s', opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: 'block', width: 24, height: 2, background: '#fff', borderRadius: 2, transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none' }} />
          </button>
        )}
      </nav>

      {/* ── Mobile fullscreen menu — rendered OUTSIDE nav so z-index is independent ── */}
      {!isDesktop && menuOpen && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,   // covers entire viewport
          zIndex: 999,                              // just below navbar bar
          background: 'rgba(6,14,30,0.98)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          display: 'flex', flexDirection: 'column',
          paddingTop: 72,                           // leave room for the navbar bar
          paddingLeft: '6vw', paddingRight: '6vw',
          paddingBottom: 40,
          overflowY: 'auto',
        }}>
          {navLinks.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block',
                padding: '18px 0',
                color: 'var(--muted)',
                textDecoration: 'none',
                fontSize: 22,
                fontWeight: 500,
                borderBottom: '1px solid rgba(255,255,255,0.07)',
                transition: 'color 0.2s',
                // staggered fade-in feel
                animation: `fadeSlideIn 0.3s ease ${i * 0.05}s both`,
              }}
              onMouseEnter={e => e.target.style.color = '#fff'}
              onMouseLeave={e => e.target.style.color = 'var(--muted)'}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="btn-glow"
            style={{ display: 'inline-flex', marginTop: 32, alignSelf: 'flex-start' }}
          >
            Get a Quote
          </a>
        </div>
      )}

      {/* Inline keyframes for menu item animation */}
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
      `}</style>
    </>
  )
}