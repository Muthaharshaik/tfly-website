'use client'
import { useState, useEffect } from 'react'

const SERVICES = [
  'OSP Survey',
  'Field QC',
  'Engineering Design',
  'Drafting Services',
  'OCAL Services',
  'Basemap Production',
  'Multiple / Full Project',
]

/*
  ─────────────────────────────────────────────────────────────────
  EmailJS SETUP  (one-time, ~5 minutes)
  ─────────────────────────────────────────────────────────────────
  1. Sign up at https://www.emailjs.com
  2. Add an Email Service (Gmail / Outlook / SMTP) → note the Service ID
  3. Create an Email Template → paste the HTML below into "HTML Content"
     Map each {{variable}} to the template_params keys below.
  4. Copy your Public Key from Account → API Keys
  5. Add to .env.local:
       NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxx
       NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxx
       NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxx

  ─────────────────────────────────────────────────────────────────
  EMAIL TEMPLATE — paste into EmailJS → HTML Content
  Subject line:  🔔 New Project Inquiry — {{service}} | {{company}}
  ─────────────────────────────────────────────────────────────────

  <!DOCTYPE html>
  <html lang="en">
  <head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
  <body style="margin:0;padding:0;background:#f0f4f8;font-family:'Segoe UI',Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4f8;padding:40px 16px;">
      <tr><td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
          <tr><td style="background:linear-gradient(135deg,#060e1e 0%,#0f2040 100%);border-radius:16px 16px 0 0;padding:40px 40px 32px;text-align:center;">
            <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#00d4ff;font-weight:600;">TFly Engineering</p>
            <h1 style="margin:0;font-size:26px;font-weight:700;color:#ffffff;line-height:1.2;">New Project Inquiry</h1>
            <p style="margin:12px 0 0;font-size:14px;color:#7a8faf;">Submitted {{submitted_at}}</p>
          </td></tr>
          <tr><td style="background:#0a1628;padding:28px 40px 0;">
            <div style="background:rgba(0,212,255,0.08);border:1px solid rgba(0,212,255,0.25);border-radius:8px;padding:14px 20px;">
              <p style="margin:0;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#7a8faf;">Service Requested</p>
              <p style="margin:4px 0 0;font-size:20px;font-weight:700;color:#00d4ff;">{{service}}</p>
            </div>
          </td></tr>
          <tr><td style="background:#0a1628;padding:24px 40px 8px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td width="48%" style="padding-bottom:20px;vertical-align:top;">
                  <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:#4a5f80;">Full Name</p>
                  <p style="margin:0;font-size:16px;color:#ffffff;font-weight:500;">{{from_name}}</p>
                </td>
                <td width="4%"></td>
                <td width="48%" style="padding-bottom:20px;vertical-align:top;">
                  <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:#4a5f80;">Company</p>
                  <p style="margin:0;font-size:16px;color:#ffffff;font-weight:500;">{{company}}</p>
                </td>
              </tr>
              <tr>
                <td width="48%" style="padding-bottom:20px;vertical-align:top;">
                  <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:#4a5f80;">Email Address</p>
                  <a href="mailto:{{reply_to}}" style="margin:0;font-size:15px;color:#00d4ff;text-decoration:none;">{{from_email}}</a>
                </td>
                <td width="4%"></td>
                <td width="48%" style="padding-bottom:20px;vertical-align:top;">
                  <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:#4a5f80;">Phone</p>
                  <p style="margin:0;font-size:15px;color:#ffffff;">{{phone}}</p>
                </td>
              </tr>
            </table>
          </td></tr>
          <tr><td style="background:#0a1628;padding:0 40px;">
            <div style="height:1px;background:rgba(255,255,255,0.07);"></div>
          </td></tr>
          <tr><td style="background:#0a1628;padding:24px 40px 32px;">
            <p style="margin:0 0 12px;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:#4a5f80;">Project Details</p>
            <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:10px;padding:20px 24px;">
              <p style="margin:0;font-size:15px;color:#e8edf8;line-height:1.75;">{{message}}</p>
            </div>
          </td></tr>
          <tr><td style="background:#0a1628;padding:0 40px 36px;text-align:center;">
            <a href="mailto:{{reply_to}}" style="display:inline-block;background:#1a5cff;color:#ffffff;padding:14px 36px;border-radius:8px;font-size:15px;font-weight:600;text-decoration:none;">Reply to {{from_name}} →</a>
          </td></tr>
          <tr><td style="background:#060e1e;border-radius:0 0 16px 16px;padding:24px 40px;text-align:center;border-top:1px solid rgba(255,255,255,0.06);">
            <p style="margin:0 0 4px;font-size:13px;color:#4a5f80;">TFly Engineering · OSP Survey, Design & Engineering</p>
            <p style="margin:0;font-size:12px;color:#2a3f60;">manohar@tflyind.com · tflyind.com</p>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
  </html>
  ─────────────────────────────────────────────────────────────────
*/

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

    try {
        const EMAILJS_SERVICE_ID  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE   || 'YOUR_SERVICE_ID'
        const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE  || 'YOUR_TEMPLATE_ID'
        const EMAILJS_PUBLIC_KEY  = process.env.NEXT_PUBLIC_EMAILJS_KEY       || 'YOUR_PUBLIC_KEY'

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

      if (!res.ok) throw new Error(`EmailJS ${res.status}`)
      setStatus('success')
      setForm({ firstName: '', lastName: '', company: '', email: '', phone: '', service: '', message: '' })
    } catch (err) {
      console.error(err)
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

        {/* JS-controlled responsive grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'minmax(0,1.2fr) minmax(0,1fr)',
          gap: isMobile ? 28 : 48,
          alignItems: 'start',
        }}>

          {/* Form */}
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
                {/* First / Last — stacks on tiny phones */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isTiny ? '1fr' : '1fr 1fr',
                  gap: 16, marginBottom: 16,
                }}>
                  {[
                    { name: 'firstName', label: 'First Name', placeholder: 'Your first name',  req: true  },
                    { name: 'lastName',  label: 'Last Name',  placeholder: 'Your last name', req: false },
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
                  { name: 'company', label: 'Company / Organization', placeholder: 'Your company name',  req: false, type: 'text'  },
                  { name: 'email',   label: 'Email Address',          placeholder: 'your.email@company.com',   req: true,  type: 'email' },
                  { name: 'phone',   label: 'Phone (optional)',        placeholder: '+91 XXXXXXXXXX', req: false, type: 'text'  },
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

          {/* Info panel */}
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
              { icon: '🌐', label: 'Website', value: 'tflyind.com',         href: 'https://tflyind.com'         },
              { icon: '📧', label: 'Email',   value: 'manohar@tflyind.com', href: 'mailto:manohar@tflyind.com' },
              { icon: '📞', label: 'Phone',   value: '+91 8919343572',      href: 'tel:+918919343572'          },
            ].map((c, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, marginBottom: 20, alignItems: 'center' }}>
                <div style={{
                  width: 40, height: 40, flexShrink: 0, borderRadius: 10,
                  background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
                }}>{c.icon}</div>
                <div>
                  <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted)', marginBottom: 2 }}>{c.label}</div>
                  <a href={c.href} style={{ fontSize: 15, color: '#fff', textDecoration: 'none' }}
                    onMouseEnter={e => e.target.style.color = 'var(--cyan)'}
                    onMouseLeave={e => e.target.style.color = '#fff'}>
                    {c.value}
                  </a>
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