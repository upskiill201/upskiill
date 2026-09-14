import fs from 'fs';
import path from 'path';
import { ImageResponse } from 'next/og';

/**
 * Social card for /teach — the earnings success visual (the page's own
 * "Available to withdraw" card, EarningsGrowthVisual) recreated for the
 * share preview, not a generic title card. Reuses the blog's committed
 * Plus Jakarta Sans TTFs (see next.config.ts's outputFileTracingIncludes)
 * instead of shipping a second font for one image.
 */
export const runtime = 'nodejs';
export const alt = 'Teach on Teyro — turn what you know into income';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const FONT_DIR = path.join(process.cwd(), 'app', 'blog', '_fonts');
const fontBold = fs.readFileSync(path.join(FONT_DIR, 'PlusJakartaSans-Bold.ttf'));
const fontExtra = fs.readFileSync(path.join(FONT_DIR, 'PlusJakartaSans-ExtraBold.ttf'));

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 72,
          background: 'linear-gradient(135deg, #0172FD 0%, #0050B3 100%)',
          fontFamily: 'Jakarta',
        }}
      >
        {/* Left: brand + headline */}
        <div style={{ display: 'flex', flexDirection: 'column', width: 560 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ fontSize: 32, fontWeight: 800, color: '#FFFFFF', letterSpacing: 2 }}>TEYRO</div>
            <div
              style={{
                display: 'flex',
                padding: '7px 18px',
                borderRadius: 999,
                background: 'rgba(255,255,255,0.16)',
                color: '#FFFFFF',
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: 2,
              }}
            >
              TEACH
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', marginTop: 48 }}>
            <div style={{ fontSize: 60, fontWeight: 800, color: '#FFFFFF', lineHeight: 1.12 }}>
              Turn What You Know
            </div>
            <div style={{ fontSize: 60, fontWeight: 800, color: '#FFD34D', lineHeight: 1.12 }}>
              Into Income
            </div>
          </div>

          <div style={{ display: 'flex', marginTop: 40 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '14px 30px',
                borderRadius: 14,
                background: '#FFFFFF',
                color: '#0172FD',
                fontSize: 24,
                fontWeight: 800,
                letterSpacing: 1,
              }}
            >
              BECOME A CREATOR
            </div>
          </div>
        </div>

        {/* Right: the Earnings card visual — same story as
            EarningsGrowthVisual, rebuilt with satori-safe flex/inline
            styles instead of Tailwind classes. */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: 420,
            borderRadius: 28,
            background: '#FFFFFF',
            padding: 36,
            boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: 1, color: '#AFAFAF' }}>
              AVAILABLE TO WITHDRAW
            </div>
            <div
              style={{
                display: 'flex',
                padding: '6px 14px',
                borderRadius: 999,
                background: '#FFF4CC',
                color: '#B45309',
                fontSize: 15,
                fontWeight: 800,
              }}
            >
              FOUNDING · 70%
            </div>
          </div>

          <div style={{ display: 'flex', fontSize: 68, fontWeight: 800, color: '#58A700', marginTop: 8 }}>
            $11,600
          </div>

          {/* Growth bars */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              gap: 10,
              height: 90,
              marginTop: 32,
              paddingTop: 10,
              borderTop: '2px solid #F0F2F5',
            }}
          >
            {[28, 38, 50, 64, 82, 100].map((h, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  width: 44,
                  height: `${h}%`,
                  borderRadius: 8,
                  background: i === 5 ? '#58A700' : '#D7FFB8',
                }}
              />
            ))}
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginTop: 20,
              fontSize: 20,
              fontWeight: 800,
              color: '#58A700',
            }}
          >
            +263% in 6 months
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Jakarta', data: fontBold, weight: 700, style: 'normal' },
        { name: 'Jakarta', data: fontExtra, weight: 800, style: 'normal' },
      ],
    }
  );
}
