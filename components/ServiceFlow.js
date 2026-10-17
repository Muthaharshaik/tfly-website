'use client'
import { useState, useEffect, useRef } from 'react'

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

const telecomServices = [
  { icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>), title: 'OSP Survey', tag: 'Survey & Fielding', desc: 'Comprehensive outside plant surveys — aerial, underground, structure inventory, and GPS-accurate geographic data collection using industry-standard field tools.', color: 'rgba(0,212,255,0.08)' },
  { icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="1.5" strokeLinecap="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>), title: 'Field QC', tag: 'Quality Control', desc: 'Multi-layer quality control that validates all field data, verifies as-built conditions, ensures client-standard compliance, and delivers audit-ready documentation packages.', color: 'rgba(34,197,94,0.07)' },
  { icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="1.5" strokeLinecap="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>), title: 'Engineering Design', tag: 'Design Engineering', desc: 'Full-service OSP engineering design — route planning, make-ready assessments, loading calculations, fiber placement, and permitting support for telecom deployments.', color: 'rgba(26,92,255,0.08)' },
  { icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="1.5" strokeLinecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>), title: 'Drafting Services', tag: 'CAD / GIS Drafting', desc: 'CAD and GIS drafting of construction drawings, splice diagrams, strand maps, pole loading sheets, and permit drawings in AutoCAD, ARAMIS, MicroStation, and ESRI formats.', color: 'rgba(167,139,250,0.07)' },
  { icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M18 14v4M14 18h8"/></svg>), title: 'PLA Services', tag: 'Network Records', desc: 'Pole loading analysis, joint use audits, and network record management using O-Calc, IKE & KATAPAULT for compliant infrastructure documentation.', color: 'rgba(251,191,36,0.06)' },
  { icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>), title: 'Basemap Production', tag: 'GIS & Mapping', desc: 'High-accuracy basemap creation integrating aerial imagery, parcel data, road networks, and existing infrastructure into production-ready GIS databases for network planning.', color: 'rgba(0,212,255,0.06)' },
]

const itServices = [
  { icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round"><path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"/></svg>), title: 'Cloud Solutions', tag: 'Cloud & Infrastructure', desc: 'AWS, Azure, and GCP cloud migration, hybrid cloud architecture, infrastructure-as-code, and serverless solutions for scalable, resilient enterprise environments.', color: 'rgba(167,139,250,0.08)' },
  { icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>), title: 'Cybersecurity', tag: 'Security & Compliance', desc: 'Comprehensive security assessments, penetration testing, vulnerability management, and compliance frameworks including SOC 2, HIPAA, and ISO 27001.', color: 'rgba(239,68,68,0.07)' },
  { icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>), title: 'Network Solutions', tag: 'Enterprise Networking', desc: 'End-to-end LAN/WAN design, SD-WAN deployment, enterprise Wi-Fi, VPN solutions, and network optimization for high-performance connectivity.', color: 'rgba(34,197,94,0.07)' },
  { icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>), title: 'Managed IT', tag: '24/7 IT Operations', desc: '24/7 NOC monitoring, proactive maintenance, helpdesk support, IT asset management, and SLA-backed service delivery for uninterrupted business operations.', color: 'rgba(251,191,36,0.07)' },
  { icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>), title: 'Software Development', tag: 'Custom Applications', desc: 'Custom enterprise applications, web and mobile development, API integrations, and legacy system modernization built with modern, scalable frameworks.', color: 'rgba(26,92,255,0.08)' },
  { icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>), title: 'Data & Analytics', tag: 'Business Intelligence', desc: 'Business intelligence dashboards, data warehousing, ETL pipeline development, and actionable analytics that drive informed decision-making across your organization.', color: 'rgba(0,212,255,0.06)' },
]

const selectorCards = [
  {
    type: 'telecom',
    title: 'Telecom Services',
    subtitle: 'OSP Survey, Design & Engineering',
    desc: 'End-to-end outside plant engineering — from field survey and QC to drafting, PLA, and basemap delivery for modern telecom networks.',
    accent: '#00d4ff',
    accentDim: 'rgba(0,212,255,0.08)',
    accentBorder: 'rgba(0,212,255,0.2)',
    accentGlow: 'rgba(0,212,255,0.15)',
    gradient: 'linear-gradient(135deg, rgba(0,212,255,0.12), rgba(26,92,255,0.05))',
    gradientLine: 'linear-gradient(90deg, #00d4ff, #1a5cff)',
    tags: ['OSP Survey', 'Field QC', 'Engineering', 'Drafting', 'PLA', 'Basemap'],
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 28V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M12 28h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M13 28l3-14 3 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 11a8.5 8.5 0 0114 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M5.5 7.5a14 14 0 0121 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="16" cy="12" r="2" fill="currentColor"/>
      </svg>
    ),
  },
  {
    type: 'it',
    title: 'IT Services',
    subtitle: 'Cloud, Security & Infrastructure',
    desc: 'Enterprise IT solutions — from cloud migration and cybersecurity to managed operations, custom software development, and data analytics.',
    accent: '#a78bfa',
    accentDim: 'rgba(167,139,250,0.08)',
    accentBorder: 'rgba(167,139,250,0.2)',
    accentGlow: 'rgba(167,139,250,0.15)',
    gradient: 'linear-gradient(135deg, rgba(167,139,250,0.12), rgba(99,102,241,0.05))',
    gradientLine: 'linear-gradient(90deg, #a78bfa, #6366f1)',
    tags: ['Cloud', 'Cybersecurity', 'Networking', 'Managed IT', 'Software', 'Analytics'],
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="6" y="5" width="20" height="9" rx="2.5" stroke="currentColor" strokeWidth="2"/>
        <rect x="6" y="18" width="20" height="9" rx="2.5" stroke="currentColor" strokeWidth="2"/>
        <circle cx="10.5" cy="9.5" r="1.25" fill="currentColor"/>
        <circle cx="10.5" cy="22.5" r="1.25" fill="currentColor"/>
        <line x1="14" y1="9.5" x2="22" y2="9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="14" y1="22.5" x2="22" y2="22.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
]

export default function ServiceFlow() {
  const [selected, setSelected] = useState(null)
  const [hoveredCard, setHoveredCard] = useState(null)
  const [hoveredService, setHoveredService] = useState(null)
  const [servicesVisible, setServicesVisible] = useState(false)
  const servicesRef = useRef(null)
  const width = useWindowWidth()
  const isMobile = width < 640
  const isTiny = width < 400
  const cols = width < 500 ? '1fr' : width < 900 ? '1fr 1fr' : 'repeat(3, 1fr)'

  const handleSelect = (type) => {
    if (selected === type) return
    setServicesVisible(false)
    setHoveredService(null)
    setTimeout(() => {
      setSelected(type)
      setTimeout(() => {
        setServicesVisible(true)
        setTimeout(() => {
          servicesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 100)
      }, 50)
    }, selected ? 300 : 0)
  }

  const services = selected === 'it' ? itServices : telecomServices
  const activeCard = selectorCards.find(c => c.type === selected)

  return (
    <>
      {/* ── Service Selector ── */}
      <section id="services" style={{
        position: 'relative',
        padding: isMobile ? '72px 5vw' : '100px 5vw',
        zIndex: 1,
        background: 'var(--navy)',
        overflow: 'hidden',
      }}>
        {/* Background orbs */}
        <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 65%)', top: -100, left: '10%', filter: 'blur(80px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(167,139,250,0.05) 0%, transparent 65%)', bottom: -50, right: '10%', filter: 'blur(80px)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
          <div style={{ textAlign: 'center', marginBottom: isMobile ? 40 : 56 }}>
            <span className="section-label" style={{ justifyContent: 'center' }}>Choose Your Path</span>
            <h2 style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: isTiny ? '28px' : 'clamp(32px, 5vw, 56px)',
              fontWeight: 800, lineHeight: 1.08,
              letterSpacing: '-0.03em', marginBottom: 16,
            }}>
              What Are You{isMobile ? ' ' : <br />}
              <span style={{ background: 'linear-gradient(135deg, #00d4ff 0%, #4d82ff 55%, #a78bfa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Looking For?
              </span>
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: isMobile ? 15 : 17, maxWidth: 540, margin: '0 auto', lineHeight: 1.7, fontWeight: 300 }}>
              TFly delivers excellence across two domains. Select your area of interest to explore our specialized services.
            </p>
          </div>

          {/* Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? 20 : 28,
            maxWidth: 920,
            margin: '0 auto',
          }}>
            {selectorCards.map((card) => {
              const isSelected = selected === card.type
              const isHovered = hoveredCard === card.type

              return (
                <div
                  key={card.type}
                  onClick={() => handleSelect(card.type)}
                  onMouseEnter={() => setHoveredCard(card.type)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    position: 'relative',
                    padding: isMobile ? '32px 24px' : '40px 36px',
                    background: isSelected ? card.gradient : isHovered ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.015)',
                    border: `1px solid ${isSelected ? card.accentBorder : isHovered ? 'rgba(255,255,255,0.12)' : 'var(--border)'}`,
                    borderRadius: 20,
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: isHovered && !isSelected ? 'translateY(-4px)' : 'none',
                    boxShadow: isSelected
                      ? `0 8px 48px ${card.accentGlow}, 0 0 0 1px ${card.accentBorder}`
                      : isHovered
                        ? '0 12px 40px rgba(0,0,0,0.25)'
                        : '0 2px 12px rgba(0,0,0,0.1)',
                    textAlign: 'left',
                    overflow: 'hidden',
                  }}
                >
                  {/* Top accent line */}
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                    background: card.gradientLine,
                    opacity: isSelected ? 1 : isHovered ? 0.6 : 0,
                    transition: 'opacity 0.4s',
                  }} />

                  {/* Selected indicator */}
                  {isSelected && (
                    <div style={{
                      position: 'absolute', top: 16, right: 16,
                      width: 28, height: 28, borderRadius: '50%',
                      background: card.accentDim,
                      border: `1.5px solid ${card.accent}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M3 7l3 3 5-6" stroke={card.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  )}

                  {/* Icon */}
                  <div style={{
                    width: 60, height: 60, borderRadius: 16,
                    background: card.accentDim,
                    border: `1px solid ${isSelected || isHovered ? card.accentBorder : 'rgba(255,255,255,0.08)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: 24, color: card.accent,
                    transition: 'border-color 0.3s, box-shadow 0.3s',
                    boxShadow: isSelected ? `0 0 24px ${card.accentGlow}` : 'none',
                  }}>
                    {card.icon}
                  </div>

                  {/* Title */}
                  <h3 style={{
                    fontFamily: 'Syne, sans-serif',
                    fontSize: isMobile ? 22 : 26,
                    fontWeight: 700,
                    marginBottom: 6,
                    color: '#fff',
                  }}>
                    {card.title}
                  </h3>

                  {/* Subtitle */}
                  <p style={{
                    color: card.accent,
                    fontSize: 12,
                    fontWeight: 500,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    marginBottom: 16,
                    opacity: 0.9,
                  }}>
                    {card.subtitle}
                  </p>

                  {/* Description */}
                  <p style={{
                    color: 'var(--muted)',
                    fontSize: 14,
                    fontWeight: 300,
                    lineHeight: 1.7,
                    marginBottom: 24,
                  }}>
                    {card.desc}
                  </p>

                  {/* Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
                    {card.tags.map(tag => (
                      <span key={tag} style={{
                        padding: '5px 12px',
                        fontSize: 11,
                        color: isSelected ? card.accent : 'var(--muted)',
                        background: isSelected ? card.accentDim : 'rgba(255,255,255,0.03)',
                        border: `1px solid ${isSelected ? `${card.accent}33` : 'var(--border)'}`,
                        borderRadius: 100,
                        letterSpacing: '0.03em',
                        fontWeight: 400,
                        transition: 'all 0.3s',
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    color: isSelected ? '#fff' : isHovered ? '#fff' : 'var(--muted)',
                    fontSize: 14, fontWeight: 500,
                    transition: 'color 0.3s',
                  }}>
                    {isSelected ? 'Viewing Services' : 'Explore Services'}
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{
                      transition: 'transform 0.3s',
                      transform: isSelected ? 'rotate(90deg)' : isHovered ? 'translateX(4px)' : 'none',
                    }}>
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Services Grid ── */}
      {selected && (
        <section
          ref={servicesRef}
          style={{
            position: 'relative',
            padding: isMobile ? '72px 5vw' : '100px 5vw',
            zIndex: 1,
            background: 'linear-gradient(180deg, var(--navy) 0%, var(--navy-2) 100%)',
            opacity: servicesVisible ? 1 : 0,
            transform: servicesVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.5s ease, transform 0.5s ease',
          }}
        >
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <span className="section-label" style={{ color: activeCard?.accent }}>{selected === 'it' ? 'IT Solutions' : 'What We Do'}</span>
            <h2 style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: 'clamp(26px, 4vw, 50px)',
              fontWeight: 700, lineHeight: 1.1,
              letterSpacing: '-0.025em', marginBottom: 16, maxWidth: 560,
            }}>
              {selected === 'it' ? (
                <>
                  Enterprise IT<br />
                  <span>
                    Technology Services
                  </span>
                </>
              ) : (
                <>
                  End-to-End OSP<br />
                  <span>
                    Engineering Services
                  </span>
                </>
              )}
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: 16, maxWidth: 500, lineHeight: 1.7, fontWeight: 300, marginBottom: 48 }}>
              {selected === 'it'
                ? 'Comprehensive IT solutions designed to modernize your infrastructure, secure your assets, and accelerate digital transformation.'
                : 'From initial survey to final basemap delivery, TFly handles every phase of the outside plant engineering lifecycle.'
              }
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: cols, gap: 2, border: '1px solid var(--border)', borderRadius: 20, overflow: 'hidden' }}>
              {services.map((s, i) => (
                <div key={`${selected}-${i}`}
                  onMouseEnter={() => setHoveredService(i)}
                  onMouseLeave={() => setHoveredService(null)}
                  style={{
                    padding: width < 500 ? '28px 20px' : '36px 28px',
                    background: hoveredService === i ? s.color : 'var(--card)',
                    borderRight: '1px solid var(--border)',
                    borderBottom: '1px solid var(--border)',
                    transition: 'background 0.3s ease',
                    position: 'relative',
                    opacity: servicesVisible ? 1 : 0,
                    transform: servicesVisible ? 'translateY(0)' : 'translateY(16px)',
                    transitionDelay: `${i * 0.06}s`,
                    transitionProperty: 'background, opacity, transform',
                    transitionDuration: '0.3s, 0.5s, 0.5s',
                  }}
                >
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                    background: selected === 'it' ? 'linear-gradient(90deg, #a78bfa, #6366f1)' : 'linear-gradient(90deg, var(--cyan), var(--blue))',
                    opacity: hoveredService === i ? 1 : 0,
                    transition: 'opacity 0.3s',
                  }} />
                  <div style={{
                    width: 48, height: 48,
                    border: `1px solid ${hoveredService === i ? (selected === 'it' ? 'rgba(167,139,250,0.4)' : 'rgba(0,212,255,0.4)') : 'rgba(255,255,255,0.1)'}`,
                    borderRadius: 12,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: 20,
                    transition: 'border-color 0.3s, background 0.3s',
                    background: hoveredService === i ? (selected === 'it' ? 'rgba(167,139,250,0.05)' : 'rgba(0,212,255,0.05)') : 'transparent',
                  }}>
                    {s.icon}
                  </div>
                  <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 17, fontWeight: 600, marginBottom: 10 }}>{s.title}</div>
                  <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.75, fontWeight: 300, marginBottom: 16 }}>{s.desc}</p>
                  <span style={{
                    fontSize: 10,
                    color: selected === 'it' ? '#a78bfa' : 'var(--cyan)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    fontWeight: 500,
                  }}>{s.tag}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
