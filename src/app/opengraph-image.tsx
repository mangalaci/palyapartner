import { ImageResponse } from 'next/og'
import { readFile } from 'fs/promises'
import { join } from 'path'

export const runtime = 'nodejs'
export const alt = 'PályaPartner — Találd meg a sportpartnered'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  const fontData = await readFile(
    join(process.cwd(), 'public/fonts/ChilidogPB-Regular.ttf')
  )

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #003d1a 0%, #006b2d 40%, #00a651 100%)',
          position: 'relative',
        }}
      >
        {/* Sport emojik háttérben */}
        <div style={{ position: 'absolute', top: 40, left: 60, fontSize: 64, opacity: 0.15, display: 'flex' }}>⚽</div>
        <div style={{ position: 'absolute', top: 50, right: 80, fontSize: 64, opacity: 0.15, display: 'flex' }}>🎾</div>
        <div style={{ position: 'absolute', bottom: 50, left: 100, fontSize: 64, opacity: 0.15, display: 'flex' }}>🏀</div>
        <div style={{ position: 'absolute', bottom: 40, right: 60, fontSize: 64, opacity: 0.15, display: 'flex' }}>🏸</div>
        <div style={{ position: 'absolute', top: 200, left: 40, fontSize: 48, opacity: 0.1, display: 'flex' }}>🏓</div>
        <div style={{ position: 'absolute', top: 180, right: 50, fontSize: 48, opacity: 0.1, display: 'flex' }}>🏐</div>

        {/* Logo */}
        <div
          style={{
            display: 'flex',
            fontSize: 96,
            fontFamily: 'ChilidogPB',
            marginBottom: 20,
          }}
        >
          <span style={{ color: 'white' }}>PÁLYA</span>
          <span style={{ color: '#003d1a' }}>PARTNER</span>
        </div>

        {/* Szlogen */}
        <div
          style={{
            fontSize: 36,
            color: 'rgba(255, 255, 255, 0.9)',
            fontFamily: 'sans-serif',
            textAlign: 'center',
            maxWidth: 800,
            display: 'flex',
          }}
        >
          Találd meg a tökéletes sportpartnered
        </div>

        {/* Sport lista */}
        <div
          style={{
            display: 'flex',
            gap: 16,
            marginTop: 40,
          }}
        >
          {['🎾 Tenisz', '⚽ Foci', '🏓 Padel', '🏸 Tollaslabda', '🏀 Kosár'].map(
            (sport) => (
              <div
                key={sport}
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: 50,
                  padding: '10px 24px',
                  fontSize: 22,
                  color: 'white',
                  display: 'flex',
                }}
              >
                {sport}
              </div>
            )
          )}
        </div>

        {/* URL */}
        <div
          style={{
            position: 'absolute',
            bottom: 30,
            fontSize: 22,
            color: 'rgba(255, 255, 255, 0.5)',
            display: 'flex',
          }}
        >
          palyapartner.hu
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'ChilidogPB',
          data: fontData,
          style: 'normal',
          weight: 400,
        },
      ],
    }
  )
}
