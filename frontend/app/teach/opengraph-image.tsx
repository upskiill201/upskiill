import fs from 'fs';
import path from 'path';
import { ImageResponse } from 'next/og';

/**
 * Social card for /teach — the page's hero story in one frame: the headline
 * and the Studio's "Earned this month" card (StudioHeroVisual), with Tey.
 * Numbers match the page: a $60 course (the yearly price) is $10/month, the
 * creator keeps $7. Satori can't read CSS variables, so colours are the palette's hex
 * values here only. Brand is the Tey mascot alone, never a wordmark.
 */
export const runtime = 'nodejs';
export const alt = 'Teach on Teyro: earn every month your learners keep learning';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const FONT_DIR = path.join(process.cwd(), 'app', 'blog', '_fonts');
const fontBold = fs.readFileSync(path.join(FONT_DIR, 'PlusJakartaSans-Bold.ttf'));
const fontExtra = fs.readFileSync(path.join(FONT_DIR, 'PlusJakartaSans-ExtraBold.ttf'));
const mascot = `data:image/png;base64,${fs
  .readFileSync(path.join(process.cwd(), 'app', '_og-assets', 'tey-mascot.png'))
  .toString('base64')}`;

const BARS = [18, 28, 44, 60, 79, 100];

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
          padding: '64px 72px',
          background: '#0172FD',
          fontFamily: 'Jakarta',
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', width: 600 }}>
          <div
            style={{
              display: 'flex',
              alignSelf: 'flex-start',
              padding: '8px 18px',
              borderRadius: 999,
              background: 'rgba(255,255,255,0.16)',
              color: '#FFFFFF',
              fontSize: 20,
              fontWeight: 800,
              letterSpacing: 2,
            }}
          >
            TEYRO FOR CREATORS
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', marginTop: 36 }}>
            <div style={{ fontSize: 58, fontWeight: 800, color: '#FFFFFF', lineHeight: 1.1 }}>Teach coding or AI.</div>
            <div style={{ fontSize: 58, fontWeight: 800, color: '#FFD34D', lineHeight: 1.1 }}>Earn every month</div>
            <div style={{ fontSize: 58, fontWeight: 800, color: '#FFFFFF', lineHeight: 1.1 }}>they keep learning.</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 36 }}>
            {['You keep 70%', '2 free lessons', 'Bank or mobile money'].map((c) => (
              <div
                key={c}
                style={{
                  display: 'flex',
                  padding: '10px 18px',
                  borderRadius: 14,
                  background: '#FFFFFF',
                  color: '#0172FD',
                  fontSize: 20,
                  fontWeight: 800,
                }}
              >
                {c}
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: 400,
            borderRadius: 28,
            background: '#FFFFFF',
            padding: 32,
            borderBottom: '8px solid #D6E4F5',
          }}
        >
          <div style={{ display: 'flex', fontSize: 16, fontWeight: 800, letterSpacing: 1.5, color: '#94A3B8' }}>
            EARNED THIS MONTH
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 6 }}>
            <div style={{ display: 'flex', fontSize: 56, fontWeight: 800, color: '#0F172A' }}>$1,260</div>
            <div
              style={{
                display: 'flex',
                padding: '6px 12px',
                borderRadius: 999,
                background: '#DCFCE7',
                color: '#16A34A',
                fontSize: 18,
                fontWeight: 800,
              }}
            >
              +26%
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 130, marginTop: 20 }}>
            {BARS.map((h, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  flex: 1,
                  height: `${h}%`,
                  borderRadius: 10,
                  background: i === BARS.length - 1 ? '#0172FD' : '#B3D4FF',
                }}
              />
            ))}
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginTop: 20,
              padding: 14,
              borderRadius: 16,
              border: '2px solid #E2E8F0',
            }}
          >
            <div style={{ display: 'flex', fontSize: 20, fontWeight: 800, color: '#0F172A' }}>Python for Data</div>
            <div style={{ display: 'flex', fontSize: 16, fontWeight: 700, color: '#64748B' }}>
              180 subscribers × $7 a month
            </div>
          </div>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element -- satori renders plain img only */}
        <img src={mascot} alt="" width={150} height={150} style={{ position: 'absolute', right: 40, bottom: 10 }} />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Jakarta', data: fontBold, weight: 700, style: 'normal' },
        { name: 'Jakarta', data: fontExtra, weight: 800, style: 'normal' },
      ],
    },
  );
}
