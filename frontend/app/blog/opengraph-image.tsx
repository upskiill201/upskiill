import fs from 'fs';
import path from 'path';
import { ImageResponse } from 'next/og';

// Auto-generated social card for /blog (1200×630). Fonts are committed static
// TTFs so satori renders Plus Jakarta Sans instead of its Geist fallback.
// Fonts live in app/blog/_fonts (included in the deploy via
// outputFileTracingIncludes in next.config.ts).
export const runtime = 'nodejs';
export const alt = 'The Teyro Blog — learning science made practical';
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
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: 'linear-gradient(135deg, #FFFFFF 0%, #EEF2FF 100%)',
          fontFamily: 'Jakarta',
        }}
      >
        {/* Brand row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              fontSize: 40,
              fontWeight: 800,
              color: '#3D5AFE',
              letterSpacing: 2,
            }}
          >
            TEYRO
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '8px 24px',
              borderRadius: 999,
              background: '#3D5AFE',
              color: '#FFFFFF',
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 4,
            }}
          >
            BLOG
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 88, fontWeight: 800, color: '#1F2A44', lineHeight: 1.1 }}>
            Learn smarter.
          </div>
          <div style={{ fontSize: 88, fontWeight: 800, color: '#3D5AFE', lineHeight: 1.1 }}>
            Remember longer.
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 8,
              borderRadius: 999,
              background: 'linear-gradient(90deg, #3D5AFE 0%, #7B61FF 100%)',
            }}
          />
          <div style={{ fontSize: 28, fontWeight: 700, color: '#64748B' }}>teyro.app/blog</div>
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
