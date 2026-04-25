'use client'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'

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

const team = [
  {
    name:     'Vaseem Syed',
    role:     'Founder & Managing Director',
    photo:    '/images/team/vaseem.jpeg',
    color:    '#1a5cff',
    bio:      'Led 500+ OSP projects. 6 years of telecom infrastructure leadership.',
    linkedin: 'https://www.linkedin.com/in/syed-vaseem-288a2320a/',
  },

  {
    name:     'Manohar Yalla',
    role:     'Head Of Operations - Sales',
    color:    '#1a5cff',
    bio:      'Led 1000+ OSP projects. 10 years of telecom infrastructure leadership.',
  },

  {
    name:     'Absaar Syed',
    role:     'Managing Director',
    color:    '#1a5cff',
  },
]

function Avatar({ member, size = 80, active }) {
  const [imgError, setImgError] = useState(false)
  const initials = member.name.split(' ').map(n => n[0]).join('')

  if (member.photo && !imgError) {
    return (
      <div style={{ width: size, height: size, borderRadius: '50%', overflow: 'hidden', border: '3px solid rgba(255,255,255,0.1)', boxShadow: active ? `0 0 24px ${member.color}44` : 'none', transition: 'box-shadow 0.3s', marginBottom: 20, flexShrink: 0 }}>
        <Image src={member.photo} alt={member.name} width={size} height={size} style={{ objectFit: 'cover', width: '100%', height: '100%' }} onError={() => setImgError(true)} />
      </div>
    )
  }
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: member.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Syne, sans-serif', fontSize: size * 0.275, fontWeight: 700, color: '#fff', marginBottom: 20, boxShadow: active ? `0 0 24px ${member.color}44` : 'none', transition: 'box-shadow 0.3s', border: '3px solid rgba(255,255,255,0.1)' }}>
      {initials}
    </div>
  )
}

export default function Team() {
  const [active, setActive] = useState(0)
  const width     = useWindowWidth()
  const isMobile  = width < 640
  const visibleCount = isMobile ? 1 : 3
  const offset = Math.max(0, Math.min(active, team.length - visibleCount))

  const prev = () => setActive(a => Math.max(0, a - 1))
  const next = () => setActive(a => Math.min(team.length - 1, a + 1))

  return (
    <section id="team" style={{ position: 'relative', padding: isMobile ? '72px 5vw 56px' : '100px 5vw 80px', zIndex: 1, background: 'linear-gradient(180deg, var(--navy) 0%, var(--navy-2) 100%)', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(26,92,255,0.08) 0%, transparent 65%)', bottom: -100, left: '50%', transform: 'translateX(-50%)', filter: 'blur(60px)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
        <span className="section-label">Our Team</span>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20, marginBottom: 44 }}>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(26px, 4vw, 50px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.025em' }}>
            The People<br />
            <span style={{ background: 'linear-gradient(135deg, #00d4ff, #4d82ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Behind TFly</span>
          </h2>
          <div style={{ display: 'flex', gap: 12 }}>
            {[{ fn: prev, label: '←', disabled: active === 0 }, { fn: next, label: '→', disabled: active >= team.length - 1 }].map((btn, i) => (
              <button key={i} onClick={btn.fn} disabled={btn.disabled} style={{ width: 44, height: 44, borderRadius: '50%', background: btn.disabled ? 'var(--card)' : 'rgba(26,92,255,0.15)', border: `1px solid ${btn.disabled ? 'var(--border)' : 'rgba(26,92,255,0.4)'}`, color: btn.disabled ? 'var(--muted-2)' : '#fff', cursor: btn.disabled ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s', fontSize: 16 }}>
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ overflow: 'hidden' }}>
          <div style={{ display: 'flex', gap: 20, transform: `translateX(calc(-${offset} * (100% / ${visibleCount} + 20px / ${visibleCount})))`, transition: 'transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)' }}>
            {team.map((member, i) => (
              <div key={i} onClick={() => setActive(i)} style={{ flex: `0 0 calc(${100 / visibleCount}% - ${20 * (visibleCount - 1) / visibleCount}px)`, minWidth: 0, background: active === i ? 'linear-gradient(145deg, rgba(26,92,255,0.12), rgba(0,212,255,0.06))' : 'var(--card)', border: `1px solid ${active === i ? 'rgba(0,212,255,0.3)' : 'var(--border)'}`, borderRadius: 20, padding: isMobile ? '28px 20px 24px' : '36px 28px 28px', cursor: 'pointer', transition: 'all 0.35s ease', position: 'relative', overflow: 'hidden' }}>
                {active === i && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${member.color}, var(--cyan))` }} />}
                <Avatar member={member} size={isMobile ? 64 : 80} active={active === i} />
                <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 17, fontWeight: 600, marginBottom: 4 }}>{member.name}</div>
                <div style={{ fontSize: 11, color: 'var(--cyan)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 12, fontWeight: 500 }}>{member.role}</div>
                <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, fontWeight: 300 }}>{member.bio}</p>
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 18, fontSize: 12, color: active === i ? 'var(--cyan)' : 'var(--muted-2)', textDecoration: 'none' }} onClick={e => e.stopPropagation()}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  LinkedIn
                </a>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 28 }}>
          {team.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} style={{ width: active === i ? 24 : 8, height: 8, borderRadius: 4, background: active === i ? 'var(--cyan)' : 'rgba(255,255,255,0.15)', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease', padding: 0 }} />
          ))}
        </div>
      </div>
    </section>
  )
}