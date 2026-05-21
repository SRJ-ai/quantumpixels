import { ImageResponse } from 'next/og'

export const dynamic = 'force-static'
export const alt = 'Quantum Pixels'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #05080f, #0a1128)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Glow effect */}
        <div
          style={{
            position: 'absolute',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(0, 255, 178, 0.2) 0%, transparent 70%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
        
        <h1
          style={{
            fontSize: 96,
            fontFamily: 'sans-serif',
            fontWeight: 800,
            color: 'white',
            letterSpacing: '-0.05em',
            margin: 0,
            textAlign: 'center',
          }}
        >
          Quantum <span style={{ color: '#00FFB2', marginLeft: '24px' }}>Pixels</span>
        </h1>
        <p
          style={{
            fontSize: 36,
            fontFamily: 'sans-serif',
            color: '#a1a1aa',
            marginTop: 40,
            textAlign: 'center',
            maxWidth: '800px',
            lineHeight: 1.4,
          }}
        >
          We build intelligent digital experiences that merge creativity with cutting-edge engineering.
        </p>
      </div>
    ),
    {
      ...size,
    }
  )
}
