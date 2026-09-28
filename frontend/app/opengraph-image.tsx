import fs from 'fs';
import path from 'path';
import { ImageResponse } from 'next/og';

/**
 * Social card for the homepage (and any route without its own opengraph-image)
 * — the Hero section (components/homepage/v2/Hero.tsx) recreated for the
 * share preview: same brand-blue field, same headline, same Tey mascot with
 * its streak/XP pills, rebuilt with satori-safe flex/inline styles instead
 * of Tailwind classes. Reuses the blog's committed Plus Jakarta Sans TTFs
 * (see next.config.ts's outputFileTracingIncludes) instead of shipping a
 * second font for one image.
 */
export const runtime = 'nodejs';
export const alt = 'Teyro — the fun way to finish learning coding and AI';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const FONT_DIR = path.join(process.cwd(), 'app', 'blog', '_fonts');
const fontBold = fs.readFileSync(path.join(FONT_DIR, 'PlusJakartaSans-Bold.ttf'));
const fontExtra = fs.readFileSync(path.join(FONT_DIR, 'PlusJakartaSans-ExtraBold.ttf'));

const PUBLIC_DIR = path.join(process.cwd(), 'public');
// satori (the renderer behind ImageResponse) can't decode webp. The mascot
// is only shipped as webp, so a PNG copy (app/_og-assets/tey-mascot.png,
// generated once via sharp) is committed rather than converting per request.
const mascotData = fs.readFileSync(path.join(process.cwd(), 'app', '_og-assets', 'tey-mascot.png'));
const mascotSrc = `data:image/png;base64,${mascotData.toString('base64')}`;
const burnIconData = fs.readFileSync(path.join(PUBLIC_DIR, 'Icons', 'burn.png'));
const burnIconSrc = `data:image/png;base64,${burnIconData.toString('base64')}`;
const gemIconData = fs.readFileSync(path.join(PUBLIC_DIR, 'Icons', 'gem.png'));
const gemIconSrc = `data:image/png;base64,${gemIconData.toString('base64')}`;

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
          padding: '0 76px',
          background: '#0172FD',
          fontFamily: 'Jakarta',
        }}
      >
        {/* Left: brand + headline, mirroring Hero's copy */}
        <div style={{ display: 'flex', flexDirection: 'column', width: 620 }}>
          <div style={{ display: 'flex', fontSize: 30, fontWeight: 800, color: '#FFFFFF', letterSpacing: 2 }}>
            TEYRO
          </div>

          <div style={{ display: 'flex', marginTop: 32, fontSize: 54, fontWeight: 800, color: '#FFFFFF', lineHeight: 1.14 }}>
            The fun way to finish learning coding and AI
          </div>

          <div style={{ display: 'flex', marginTop: 28, fontSize: 24, fontWeight: 700, color: 'rgba(255,255,255,0.8)' }}>
            Short daily lessons, streaks, leagues and friends that keep you coming back.
          </div>

          <div style={{ display: 'flex', marginTop: 40 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '18px 34px',
                borderRadius: 14,
                background: '#FFFFFF',
                color: '#0172FD',
                fontSize: 24,
                fontWeight: 800,
                letterSpacing: 1,
              }}
            >
              START LEARNING
            </div>
          </div>
        </div>

        {/* Right: Tey mascot with the same streak/XP pills as the real Hero */}
        <div style={{ display: 'flex', position: 'relative', width: 420, height: 420 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={mascotSrc}
            width={420}
            height={420}
            style={{ objectFit: 'contain' }}
          />

          <div
            style={{
              position: 'absolute',
              top: 24,
              right: -20,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '14px 20px',
              borderRadius: 20,
              background: '#FFFFFF',
              boxShadow: '0 12px 30px rgba(0,0,0,0.2)',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={burnIconSrc} width={30} height={30} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', fontSize: 13, fontWeight: 800, color: '#9AA0AC', letterSpacing: 1 }}>
                STREAK
              </div>
              <div style={{ display: 'flex', fontSize: 20, fontWeight: 800, color: '#1F2937', marginTop: 2 }}>
                7 days
              </div>
            </div>
          </div>

          <div
            style={{
              position: 'absolute',
              bottom: 40,
              left: -20,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '14px 20px',
              borderRadius: 20,
              background: '#FFFFFF',
              boxShadow: '0 12px 30px rgba(0,0,0,0.2)',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={gemIconSrc} width={30} height={30} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', fontSize: 13, fontWeight: 800, color: '#9AA0AC', letterSpacing: 1 }}>
                EARNED
              </div>
              <div style={{ display: 'flex', fontSize: 20, fontWeight: 800, color: '#0172FD', marginTop: 2 }}>
                +10 XP
              </div>
            </div>
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
