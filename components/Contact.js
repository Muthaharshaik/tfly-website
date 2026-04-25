'use client'
import { useState, useEffect } from 'react'

const SERVICES = [
  'OSP Survey',
  'Field QC',
  'Engineering Design',
  'Drafting Services',
  'PLA Services',
  'Basemap Production',
  'Multiple / Full Project',
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

export default function Contact() {
  const width    = useWindowWidth()
  const isMobile = width < 900
  const isTiny   = width < 480

  const [form, setForm] = useState({
    firstName: '', lastName: '', company: '',
    email: '', phone: '', service: '', message: '',
  })
  const [status,   setStatus]   = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    if (!form.firstName || !form.email || !form.service || !form.message) {
      setErrorMsg('Please fill in all required fields.')
      setStatus('error')
      return
    }

    // ── Read env vars (names must match exactly what's in .env.local) ──
    const EMAILJS_SERVICE_ID  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE
    const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE
    const EMAILJS_PUBLIC_KEY  = process.env.NEXT_PUBLIC_EMAILJS_KEY

    // Guard: warn clearly if env vars are missing
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      console.error('Missing EmailJS env vars:', {
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        EMAILJS_PUBLIC_KEY,
      })
      setErrorMsg('Email configuration error. Please contact us directly at manohar@tflyind.com')
      setStatus('error')
      return
    }

    try {
      const submitted_at = new Date().toLocaleString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit', timeZoneName: 'short',
      })

      const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id:  EMAILJS_SERVICE_ID,
          template_id: EMAILJS_TEMPLATE_ID,
          user_id:     EMAILJS_PUBLIC_KEY,
          template_params: {
            from_name:    `${form.firstName} ${form.lastName}`.trim(),
            from_email:   form.email,
            company:      form.company || '—',
            phone:        form.phone   || '—',
            service:      form.service,
            message:      form.message,
            reply_to:     form.email,
            submitted_at,
          },
        }),
      })

      const data = await res.text()
      console.log('EmailJS Response:', data)

      // EmailJS returns plain string "OK" on success — anything else is an error
      if (data !== 'OK') {
        throw new Error(`EmailJS error: ${data}`)
      }

      setStatus('success')
      setForm({ firstName: '', lastName: '', company: '', email: '', phone: '', service: '', message: '' })
    } catch (err) {
      console.error('Submit error:', err)
      setErrorMsg('Something went wrong. Please try again or email us directly at manohar@tflyind.com')
      setStatus('error')
    }
  }

  const inputStyle = {
    width: '100%', boxSizing: 'border-box',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 8, color: '#fff',
    fontFamily: 'DM Sans, sans-serif',
    fontSize: 14, padding: '12px 16px',
    outline: 'none', transition: 'border-color 0.2s',
  }

  return (
    <section id="contact" style={{
      position: 'relative',
      padding: isMobile ? '64px 5vw' : '100px 5vw',
      zIndex: 1, background: 'var(--navy-2)',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <span className="section-label">Get Started</span>
        <h2 style={{
          fontFamily: 'Syne, sans-serif',
          fontSize: 'clamp(26px, 5vw, 50px)',
          fontWeight: 700, lineHeight: 1.1,
          letterSpacing: '-0.025em', marginBottom: 16, maxWidth: 480,
        }}>
          Let&apos;s Build Your<br />
          <span style={{
            background: 'linear-gradient(135deg, #00d4ff, #4d82ff)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>Next Project Together</span>
        </h2>
        <p style={{ color: 'var(--muted)', fontSize: 16, maxWidth: 480, lineHeight: 1.7, fontWeight: 300, marginBottom: isMobile ? 32 : 56 }}>
          Submit your inquiry and we&apos;ll respond within 4 business hours with a scope outline and pricing.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'minmax(0,1.2fr) minmax(0,1fr)',
          gap: isMobile ? 28 : 48,
          alignItems: 'start',
        }}>

          {/* ── Form ── */}
          <div style={{
            background: 'rgba(255,255,255,0.025)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 20,
            padding: isTiny ? '20px 16px' : isMobile ? '28px 24px' : '40px',
          }}>
            <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 20, fontWeight: 700, marginBottom: 28 }}>
              Project Inquiry
            </div>

            {status === 'success' ? (
              <div style={{
                textAlign: 'center', padding: '48px 24px',
                background: 'rgba(34,197,94,0.06)',
                border: '1px solid rgba(34,197,94,0.25)',
                borderRadius: 12,
              }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 22, fontWeight: 700, color: '#22c55e', marginBottom: 8 }}>
                  Inquiry Received!
                </h3>
                <p style={{ color: 'var(--muted)', fontSize: 15, fontWeight: 300 }}>
                  We&apos;ll be in touch within 4 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* First / Last */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isTiny ? '1fr' : '1fr 1fr',
                  gap: 16, marginBottom: 16,
                }}>
                  {[
                    { name: 'firstName', label: 'First Name', placeholder: 'Your first name', req: true  },
                    { name: 'lastName',  label: 'Last Name',  placeholder: 'Your last name',  req: false },
                  ].map(f => (
                    <div key={f.name}>
                      <label style={{ display: 'block', fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 8 }}>
                        {f.label} {f.req && <span style={{ color: 'var(--cyan)' }}>*</span>}
                      </label>
                      <input name={f.name} value={form[f.name]} onChange={handleChange}
                        placeholder={f.placeholder} style={inputStyle}
                        onFocus={e => e.target.style.borderColor = 'rgba(0,212,255,0.5)'}
                        onBlur={e  => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
                    </div>
                  ))}
                </div>

                {[
                  { name: 'company', label: 'Company / Organization', placeholder: 'Your company name',      req: false, type: 'text'  },
                  { name: 'email',   label: 'Email Address',          placeholder: 'your.email@company.com', req: true,  type: 'email' },
                  { name: 'phone',   label: 'Phone (optional)',        placeholder: '+91 XXXXXXXXXX',        req: false, type: 'text'  },
                ].map(field => (
                  <div key={field.name} style={{ marginBottom: 16 }}>
                    <label style={{ display: 'block', fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 8 }}>
                      {field.label} {field.req && <span style={{ color: 'var(--cyan)' }}>*</span>}
                    </label>
                    <input name={field.name} value={form[field.name]} onChange={handleChange}
                      type={field.type} placeholder={field.placeholder} style={inputStyle}
                      onFocus={e => e.target.style.borderColor = 'rgba(0,212,255,0.5)'}
                      onBlur={e  => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
                  </div>
                ))}

                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 8 }}>
                    Service Required <span style={{ color: 'var(--cyan)' }}>*</span>
                  </label>
                  <select name="service" value={form.service} onChange={handleChange}
                    style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}
                    onFocus={e => e.target.style.borderColor = 'rgba(0,212,255,0.5)'}
                    onBlur={e  => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}>
                    <option value="" style={{ background: '#0a1628' }}>Select a service…</option>
                    {SERVICES.map(s => <option key={s} value={s} style={{ background: '#0a1628' }}>{s}</option>)}
                  </select>
                </div>

                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: 'block', fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 8 }}>
                    Project Details <span style={{ color: 'var(--cyan)' }}>*</span>
                  </label>
                  <textarea name="message" value={form.message} onChange={handleChange}
                    placeholder="Describe your project scope, timeline, geographic area, and deliverable requirements…"
                    rows={4}
                    style={{ ...inputStyle, resize: 'vertical', minHeight: 100 }}
                    onFocus={e => e.target.style.borderColor = 'rgba(0,212,255,0.5)'}
                    onBlur={e  => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
                </div>

                {status === 'error' && (
                  <div style={{
                    padding: '10px 16px', marginBottom: 16,
                    background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)',
                    borderRadius: 8, fontSize: 13, color: '#f87171',
                  }}>
                    {errorMsg}
                  </div>
                )}

                <button type="submit" className="btn-glow" disabled={status === 'loading'} style={{
                  width: '100%', justifyContent: 'center',
                  opacity: status === 'loading' ? 0.7 : 1,
                }}>
                  {status === 'loading' ? 'Sending…' : 'Submit Inquiry →'}
                </button>
              </form>
            )}
          </div>

          {/* ── Info panel ── */}
          <div style={{ paddingTop: isMobile ? 0 : 8 }}>
            <h3 style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: isMobile ? 20 : 26,
              fontWeight: 700, letterSpacing: '-0.01em', marginBottom: 14, lineHeight: 1.2,
            }}>
              Ready to scope your next OSP project?
            </h3>
            <p style={{ color: 'var(--muted)', fontSize: 15, lineHeight: 1.75, fontWeight: 300, marginBottom: 32 }}>
              From a quick turnaround on a single survey route to a long-term engineering partner for your fiber expansion program — TFly is ready.
            </p>

            {[
              { icon: '🌐', label: 'Website', value: 'tflyind.com',              href: 'https://tflyind.com'              },
              { icon: '📧', label: 'Email',   value: 'vaseemsyed@tflyind.com',   href: 'mailto:vaseemsyed@tflyind.com'   },
              { icon: '📧', label: 'Email',   value: 'manohar@tflyind.com',      href: 'mailto:manohar@tflyind.com'      },
              { icon: '📞', label: 'Phone',   value: '+91 8919343572',           href: 'tel:+918919343572'               },
              { icon: '📍', label: 'Address', value: 'Nellore, Andhra Pradesh',  href: null                              },
            ].map((c, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, marginBottom: 20, alignItems: 'center' }}>
                <div style={{
                  width: 40, height: 40, flexShrink: 0, borderRadius: 10,
                  background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
                }}>{c.icon}</div>
                <div>
                  <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted)', marginBottom: 2 }}>{c.label}</div>
                  {c.href ? (
                    <a href={c.href} style={{ fontSize: 15, color: '#fff', textDecoration: 'none' }}
                      onMouseEnter={e => e.target.style.color = 'var(--cyan)'}
                      onMouseLeave={e => e.target.style.color = '#fff'}>
                      {c.value}
                    </a>
                  ) : (
                    <span style={{ fontSize: 15, color: '#fff' }}>{c.value}</span>
                  )}
                </div>
              </div>
            ))}

            <div style={{
              marginTop: 32, padding: '22px 24px',
              background: 'rgba(0,212,255,0.06)',
              border: '1px solid rgba(0,212,255,0.18)',
              borderRadius: 14,
            }}>
              <div style={{ fontSize: 13, color: 'var(--muted)', fontStyle: 'italic', lineHeight: 1.7, marginBottom: 10 }}>
                &ldquo;Our turnaround goal: first response within 4 business hours.
                Full project scope within 1 business day.&rdquo;
              </div>
              <div style={{ fontSize: 13, color: 'var(--cyan)', fontWeight: 500 }}>— The TFly Team</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}