'use client'
import { useState, useEffect } from 'react'

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

const industries = [
  { label: 'Fiber OSP',             icon: '🌐' },
  { label: 'Tower Networks',        icon: '🗼' },
  { label: 'Utility Networks',     icon: '🏛'  },
]

export default function Industries() {
  const [active, setActive] = useState(0)
  const width    = useWindowWidth()
  const isMobile = width < 640

  return (
    <section id="industries" style={{
      position: 'relative',
      padding: isMobile ? '72px 5vw' : '100px 5vw',
      zIndex: 1,
      background: 'linear-gradient(180deg, var(--navy-2) 0%, var(--navy) 100%)',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <span className="section-label">Industries Served</span>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24, marginBottom: 44 }}>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(26px, 4vw, 50px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.025em' }}>
            Who We<br />
            <span style={{ background: 'linear-gradient(135deg, #00d4ff, #4d82ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Partner With
            </span>
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: 15, maxWidth: 360, fontWeight: 300, lineHeight: 1.7 }}>
            TFly supports a broad range of telecom and utility clients across the infrastructure development lifecycle.
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {industries.map((ind, i) => (
            <button key={i} onClick={() => setActive(i)} style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: isMobile ? '8px 14px' : '10px 18px',
              border: `1px solid ${active === i ? 'var(--cyan)' : 'var(--border)'}`,
              borderRadius: 100,
              background: active === i ? 'var(--cyan-dim)' : 'transparent',
              color: active === i ? 'var(--cyan)' : 'var(--muted)',
              fontSize: isMobile ? 12 : 13,
              cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
              transition: 'all 0.2s ease',
            }}
              onMouseEnter={e => { if (active !== i) { e.currentTarget.style.borderColor = 'rgba(0,212,255,0.3)'; e.currentTarget.style.color = '#fff' } }}
              onMouseLeave={e => { if (active !== i) { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)' } }}
            >
              <span>{ind.icon}</span>
              {ind.label}
            </button>
          ))}
        </div>

        {/* CTA strip */}
        <div style={{
          marginTop: 48,
          padding: isMobile ? '24px 20px' : '32px 40px',
          background: 'linear-gradient(135deg, rgba(26,92,255,0.1) 0%, rgba(0,212,255,0.06) 100%)',
          border: '1px solid rgba(0,212,255,0.18)',
          borderRadius: 16,
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'center',
          justifyContent: 'space-between',
          gap: 20,
        }}>
          <div>
            <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: isMobile ? 18 : 22, fontWeight: 700, marginBottom: 6 }}>
              Don't see your industry?
            </h3>
            <p style={{ color: 'var(--muted)', fontSize: 14, fontWeight: 300 }}>
              We work with any organization deploying or maintaining telecom infrastructure.
            </p>
          </div>
          <a href="#contact" className="btn-glow" style={{ flexShrink: 0 }}>Talk to Us →</a>
        </div>
      </div>
    </section>
  )
}