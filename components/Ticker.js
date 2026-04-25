'use client'

const items = [
  'OSP Survey', 'Field QC', 'Engineering Design', 'Drafting Services',
  'PLA Services', 'Basemap Production', 'TFly Engineering', 'Fiber Networks',
  'Telecom Infrastructure', 'GIS Mapping', 'CAD Drafting', 'Network Planning',
]

export default function Ticker() {
  const doubled = [...items, ...items]
  return (
    <div style={{
      overflow: 'hidden',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
      padding: '13px 0',
      background: 'var(--navy-3)',
      position: 'relative', zIndex: 1,
    }}>
      <div style={{
        display: 'flex',
        animation: 'ticker 30s linear infinite',
        whiteSpace: 'nowrap',
      }}>
        {doubled.map((item, i) => (
          <span key={i} style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '0 32px',
            fontSize: 11, fontWeight: 500,
            letterSpacing: '0.10em', textTransform: 'uppercase',
            color: 'var(--muted-2)',
          }}>
            <span style={{ color: 'var(--cyan)', fontSize: 16, lineHeight: 0 }}>·</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
