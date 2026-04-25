'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const stats = [
  { num: '500+', label: 'Miles Surveyed' },
  { num: '88%',  label: 'QC Pass Rate'   },
  { num: '6',    label: 'Core Services'  },
  { num: '24/7', label: 'Field Support'  },
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

export default function Hero() {
  const [visible, setVisible] = useState(false)
  const width    = useWindowWidth()
  const isMobile = width < 640
  const isTiny   = width < 400

  useEffect(() => { setTimeout(() => setVisible(true), 100) }, [])

  return (
    <section style={{
      position: 'relative', minHeight: '100vh',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: isMobile ? '100px 6vw 72px' : '120px 5vw 80px',
      textAlign: 'center', overflow: 'hidden', zIndex: 1,
    }}>
      {/* Orbs */}
      <div style={{ position: 'absolute', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(26,92,255,0.18) 0%, transparent 65%)', top: -200, left: '50%', transform: 'translateX(-50%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,212,255,0.12) 0%, transparent 65%)', bottom: -80, right: '-5%', filter: 'blur(60px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 65%)', top: '30%', left: '-5%', filter: 'blur(60px)', pointerEvents: 'none' }} />
      <div className="animate-spin-slow" style={{ position: 'absolute', width: isMobile ? 340 : 600, height: isMobile ? 340 : 600, borderRadius: '50%', border: '1px dashed rgba(0,212,255,0.08)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', pointerEvents: 'none' }} />

      {/* Logo */}
      <div className="animate-float" style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.7s ease', marginBottom: isMobile ? 24 : 36, position: 'relative', zIndex: 2 }}>
        <div style={{ width: isMobile ? 88 : 120, height: isMobile ? 88 : 120, borderRadius: '50%', overflow: 'hidden', border: '2px solid rgba(0,212,255,0.35)', boxShadow: '0 0 40px rgba(0,212,255,0.25), 0 0 80px rgba(26,92,255,0.2)', margin: '0 auto' }}>
          <Image src="/images/tfly-logo.jpg" alt="TFly Logo" width={120} height={120} priority style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
        </div>
      </div>

      {/* Eyebrow */}
      <div style={{
        opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: 'all 0.7s ease 0.1s',
        display: 'inline-flex', alignItems: 'center', gap: 8,
        background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.22)',
        color: 'var(--cyan)', fontSize: isTiny ? 9 : 11, fontWeight: 500,
        letterSpacing: '0.12em', textTransform: 'uppercase',
        padding: '6px 14px', borderRadius: 100, marginBottom: 24,
        position: 'relative', zIndex: 2,
        flexWrap: 'wrap', justifyContent: 'center',
      }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--cyan)', animation: 'pulseDot 2s ease-in-out infinite', flexShrink: 0 }} />
        OSP Survey · Design · Engineering
      </div>

      {/* Heading */}
      <h1 style={{
        fontFamily: 'Syne, sans-serif',
        fontSize: isTiny ? '32px' : isMobile ? '40px' : 'clamp(44px, 7vw, 86px)',
        fontWeight: 800, lineHeight: 1.05,
        letterSpacing: '-0.03em',
        maxWidth: isMobile ? '100%' : 860, marginBottom: 20,
        opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.7s ease 0.2s',
        position: 'relative', zIndex: 2,
        wordBreak: 'break-word',
      }}>
        <span style={{ background: 'linear-gradient(135deg, #00d4ff 0%, #4d82ff 55%, #a78bfa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Precision-Built
        </span>
        <br />
        <span style={{ color: 'rgba(255,255,255,0.92)' }}>Telecom Infrastructure</span>
        <br />
        <span style={{ color: 'rgba(255,255,255,0.35)' }}>Engineering</span>
      </h1>

      {/* Subheading */}
      <p style={{
        fontSize: isMobile ? 15 : 'clamp(15px, 2vw, 19px)',
        color: 'var(--muted)', maxWidth: 560, marginBottom: 40,
        fontWeight: 300, lineHeight: 1.7,
        opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: 'all 0.7s ease 0.3s',
        position: 'relative', zIndex: 2,
      }}>
        TFly delivers end-to-end OSP survey, design, and engineering services —
        from fielding and QC to drafting, PLA, and basemap production —
        with the accuracy modern networks demand.
      </p>

      {/* CTAs */}
      <div style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: 12, alignItems: 'center',
        width: '100%', maxWidth: isMobile ? 320 : 480,
        opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: 'all 0.7s ease 0.4s',
        position: 'relative', zIndex: 2,
      }}>
        <a href="#contact" className="btn-glow" style={{ width: isMobile ? '100%' : 'auto', justifyContent: 'center' }}>
          Request a Proposal
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </a>
        <a href="#services" className="btn-outline" style={{ width: isMobile ? '100%' : 'auto', justifyContent: 'center' }}>
          Explore Services
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </a>
      </div>

      {/* Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isTiny ? '1fr 1fr' : isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
        width: '100%', maxWidth: isMobile ? 360 : 680,
        marginTop: isMobile ? 48 : 72,
        background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)',
        borderRadius: 16, overflow: 'hidden',
        opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: 'all 0.7s ease 0.55s',
        position: 'relative', zIndex: 2,
      }}>
        {stats.map((s, i) => (
          <div key={i} style={{
            padding: isMobile ? '18px 12px' : '24px 32px',
            borderRight: isMobile
              ? (i % 2 === 0 ? '1px solid var(--border)' : 'none')
              : (i < 3 ? '1px solid var(--border)' : 'none'),
            borderBottom: isMobile && i < 2 ? '1px solid var(--border)' : 'none',
            textAlign: 'center',
          }}>
            <div style={{ fontFamily: 'Syne, sans-serif', fontSize: isMobile ? 24 : 32, fontWeight: 700, lineHeight: 1, marginBottom: 4, background: 'linear-gradient(135deg, #fff 0%, var(--cyan) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {s.num}
            </div>
            <div style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Scroll hint */}
      <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, opacity: 0.4, zIndex: 2 }}>
        <span style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)' }}>Scroll</span>
        <div style={{ width: 1, height: 32, background: 'linear-gradient(to bottom, var(--muted), transparent)' }} />
      </div>
    </section>
  )
}