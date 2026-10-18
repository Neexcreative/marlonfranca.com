import { ImageResponse } from 'next/og'

// iOS home-screen icon — replace with an `apple-icon.png` (180×180) once the logo exists
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#111110',
          color: '#f3f1ec',
          fontSize: 80,
          letterSpacing: -3,
        }}
      >
        MF
      </div>
    ),
    size
  )
}
