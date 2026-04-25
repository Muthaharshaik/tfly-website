'use client'
import { useEffect, useState } from 'react'

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

const reasons = [
  { icon: '⚡', title: 'Certified Field Teams',     desc: 'Our crews are trained in OSP survey methodology, safety standards, and client-specific protocols — delivering data you can trust for engineering decisions.' },
  { icon: '📊', title: 'Transparent Reporting',     desc: 'Real-time project dashboards, daily progress reports, and milestone tracking keep you fully informed — no black boxes or surprises at deadline.' },
  { icon: '⏱', title: 'Fast Turnaround',            desc: 'Structured workflows and a scalable team model let TFly handle urgent deployments and aggressive schedules without sacrificing accuracy.' },
  { icon: '🔗', title: 'Multi-Format Deliverables', desc: 'We work in AutoCAD, MicroStation, ArcGIS, IQGeo, Waldo, Aramis, QGIS— seamless integration with your existing tools.' },
  { icon: '✅', title: '88%+ QC Pass Rate',          desc: 'Our internal QC catches errors before they reach you. We maintain a 88%+ first-submission acceptance rate across all project types.' },
  { icon: '📡', title: 'Scalable Capacity',          desc: 'From a single-route survey to a multi-state fiber buildout, TFly scales team and resources to match your project size and timeline.' },
]

export default function WhyTFly() {
  const width    = useWindowWidth()
  const isMobile = width < 640
  const cols     = width < 500 ? '1fr' : width < 900 ? '1fr 1fr' : 'repeat(3, 1fr)'

  return (
    <section id="why" style={{
      position: 'relative',
      padding: isMobile ? '72px 5vw' : '100px 5vw',
      zIndex: 1,
      background: 'var(--navy)',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{
          position: 'absolute', top: 60, right: '5vw',
          fontFamily: 'Syne, sans-serif', fontSize: 'clamp(60px, 12vw, 160px)',
          fontWeight: 800, color: 'rgba(255,255,255,0.02)',
          lineHeight: 1, pointerEvents: 'none', userSelect: 'none',
        }}>TFLY</div>

        <span className="section-label">Why TFly</span>
        <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(26px, 4vw, 50px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.025em', maxWidth: 480, marginBottom: 16 }}>
          Built Different.<br />
          <span style={{ background: 'linear-gradient(135deg, #00d4ff, #4d82ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Delivered Better.
          </span>
        </h2>
        <p style={{ color: 'var(--muted)', fontSize: 16, maxWidth: 480, lineHeight: 1.7, fontWeight: 300, marginBottom: 52 }}>
          We combine field expertise with engineering rigor to give telecom clients a reliable, scalable OSP partner.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: cols, gap: 14 }}>
          {reasons.map((r, i) => (
            <div key={i} style={{
              display: 'flex', gap: 16, padding: '24px',
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 14, transition: 'border-color 0.3s, background 0.3s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,212,255,0.2)'; e.currentTarget.style.background = 'rgba(0,212,255,0.04)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--card)' }}
            >
              <div style={{ width: 40, height: 40, flexShrink: 0, borderRadius: 10, background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, marginTop: 2 }}>
                {r.icon}
              </div>
              <div>
                <h4 style={{ fontFamily: 'Syne, sans-serif', fontSize: 15, fontWeight: 600, marginBottom: 6 }}>{r.title}</h4>
                <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, fontWeight: 300 }}>{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}