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

const steps = [
  { num: '01', title: 'Scope & RFP',     desc: 'We review your requirements, define deliverable formats, agree on timelines, and provide a transparent fixed-fee proposal within 24 hours.' },
  { num: '02', title: 'Field Survey',    desc: 'Certified crews collect all OSP data using GPS-equipped tools, following your standard operating procedures and safety protocols.' },
  { num: '03', title: 'QC & Validation', desc: 'Multi-layer quality control review catches data gaps and discrepancies before they move to design or drafting stages.' },
  { num: '04', title: 'Design & Draft',  desc: 'Engineering design and CAD/GIS drafting in your required formats — construction drawings, strand maps, OCAL, and basemaps.' },
  { num: '05', title: 'Client Review',   desc: 'Deliverables submitted for client review with a structured revision cycle and sign-off workflow built in at every milestone.' },
  { num: '06', title: 'Final Delivery',  desc: 'Approved packages delivered via secure FTP, GIS portal, or direct system integration — ready for construction or record use.' },
]

export default function Process() {
  const width    = useWindowWidth()
  const isMobile = width < 640
  const cols     = width < 500 ? '1fr' : width < 900 ? '1fr 1fr' : 'repeat(3, 1fr)'

  return (
    <section id="process" style={{
      position: 'relative',
      padding: isMobile ? '72px 5vw' : '100px 5vw',
      zIndex: 1,
      background: 'linear-gradient(180deg, var(--navy-2) 0%, var(--navy-3) 100%)',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <span className="section-label">How We Work</span>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24, marginBottom: 52 }}>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(26px, 4vw, 50px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.025em' }}>
            A Proven<br />
            <span style={{ background: 'linear-gradient(135deg, #00d4ff, #4d82ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Delivery Framework
            </span>
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: 15, maxWidth: 360, fontWeight: 300, lineHeight: 1.7 }}>
            Every TFly engagement follows a structured process that ensures quality, accuracy, and on-time delivery at every milestone.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: cols, gap: isMobile ? 24 : 2 }}>
          {steps.map((step, i) => (
            <div key={i} style={{ padding: '0 16px 28px 0' }}>
              <div style={{
                width: 48, height: 48, borderRadius: '50%',
                background: 'var(--navy-2)',
                border: '1.5px solid rgba(0,212,255,0.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 20, boxShadow: '0 0 20px rgba(0,212,255,0.12)',
              }}>
                <span style={{ fontFamily: 'Syne, sans-serif', fontSize: 12, fontWeight: 700, color: 'var(--cyan)' }}>
                  {step.num}
                </span>
              </div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 16, fontWeight: 600, marginBottom: 8, color: '#fff' }}>
                {step.title}
              </div>
              <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, fontWeight: 300 }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}