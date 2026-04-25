// ── This file contains 5 components. Split them into their own files. ──

// ─────────────────── Services.js ───────────────────
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

const services = [
  { icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>), title: 'OSP Survey', tag: 'Survey & Fielding', desc: 'Comprehensive outside plant surveys — aerial, underground, structure inventory, and GPS-accurate geographic data collection using industry-standard field tools.', color: 'rgba(0,212,255,0.08)' },
  { icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="1.5" strokeLinecap="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>), title: 'Field QC', tag: 'Quality Control', desc: 'Multi-layer quality control that validates all field data, verifies as-built conditions, ensures client-standard compliance, and delivers audit-ready documentation packages.', color: 'rgba(34,197,94,0.07)' },
  { icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="1.5" strokeLinecap="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>), title: 'Engineering Design', tag: 'Design Engineering', desc: 'Full-service OSP engineering design — route planning, make-ready assessments, loading calculations, fiber placement, and permitting support for telecom deployments.', color: 'rgba(26,92,255,0.08)' },
  { icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="1.5" strokeLinecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>), title: 'Drafting Services', tag: 'CAD / GIS Drafting', desc: 'CAD and GIS drafting of construction drawings, splice diagrams, strand maps, pole loading sheets, and permit drawings in AutoCAD, ARAMIS, MicroStation, and ESRI formats.', color: 'rgba(167,139,250,0.07)' },
  { icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M18 14v4M14 18h8"/></svg>), title: 'PLA Services', tag: 'Network Records', desc: 'O-Calc, IKE & KATAPAULT', color: 'rgba(251,191,36,0.06)' },
  { icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>), title: 'Basemap Production', tag: 'GIS & Mapping', desc: 'High-accuracy basemap creation integrating aerial imagery, parcel data, road networks, and existing infrastructure into production-ready GIS databases for network planning.', color: 'rgba(0,212,255,0.06)' },
]

export default function Services() {
  const [hovered, setHovered] = useState(null)
  const width    = useWindowWidth()
  const cols     = width < 500 ? '1fr' : width < 900 ? '1fr 1fr' : 'repeat(3, 1fr)'

  return (
    <section id="services" style={{ position: 'relative', padding: width < 640 ? '72px 5vw' : '100px 5vw', zIndex: 1, background: 'var(--navy)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <span className="section-label">What We Do</span>
        <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(26px, 4vw, 50px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.025em', marginBottom: 16, maxWidth: 560 }}>
          End-to-End OSP<br />
          <span style={{ background: 'linear-gradient(135deg, #00d4ff, #4d82ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Engineering Services</span>
        </h2>
        <p style={{ color: 'var(--muted)', fontSize: 16, maxWidth: 500, lineHeight: 1.7, fontWeight: 300, marginBottom: 48 }}>
          From initial survey to final basemap delivery, TFly handles every phase of the outside plant engineering lifecycle.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: cols, gap: 2, border: '1px solid var(--border)', borderRadius: 20, overflow: 'hidden' }}>
          {services.map((s, i) => (
            <div key={i} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
              style={{ padding: width < 500 ? '28px 20px' : '36px 28px', background: hovered === i ? s.color : 'var(--card)', borderRight: '1px solid var(--border)', borderBottom: '1px solid var(--border)', transition: 'background 0.3s ease', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, var(--cyan), var(--blue))', opacity: hovered === i ? 1 : 0, transition: 'opacity 0.3s' }} />
              <div style={{ width: 48, height: 48, border: `1px solid ${hovered === i ? 'rgba(0,212,255,0.4)' : 'rgba(255,255,255,0.1)'}`, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, transition: 'border-color 0.3s', background: hovered === i ? 'rgba(0,212,255,0.05)' : 'transparent' }}>{s.icon}</div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 17, fontWeight: 600, marginBottom: 10 }}>{s.title}</div>
              <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.75, fontWeight: 300, marginBottom: 16 }}>{s.desc}</p>
              <span style={{ fontSize: 10, color: 'var(--cyan)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500 }}>{s.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}