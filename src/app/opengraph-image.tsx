import { ImageResponse } from 'next/og'
import { site, disciplines } from '@/data/site'

// Social share image (Facebook, LinkedIn, WhatsApp, X…) — generated at build time.
// To use a designed image instead, delete this file and drop an
// `opengraph-image.jpg` (1200×630) in this folder.
export const alt = `${site.name} — ${site.jobTitle}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: '#f3f1ec',
          color: '#111110',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 22, letterSpacing: 3, textTransform: 'uppercase', color: '#6f6c66' }}>
          <span>Portfolio</span>
          <span>{site.location}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', fontSize: 150, lineHeight: 0.9, letterSpacing: -6, textTransform: 'uppercase' }}>
          <span>Marlon</span>
          <span style={{ paddingLeft: 180 }}>França</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 24, color: '#111110' }}>
          <div style={{ width: 14, height: 14, borderRadius: 14, background: '#e63329' }} />
          <span>{disciplines.slice(0, 3).join('  ·  ')}</span>
        </div>
      </div>
    ),
    size
  )
}
