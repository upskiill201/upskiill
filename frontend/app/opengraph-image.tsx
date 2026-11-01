import fs from 'fs';
import path from 'path';
import { ImageResponse } from 'next/og';

/**
 * Social card for the homepage (and any route without its own opengraph-image)
 * — the homepage hero recreated for the share preview: the same headline in
 * the same Baloo 2 display face, the subjects Teyro teaches as chips, and the
 * hero's phone with its streak, league and XP cards. satori can't render that
 * component, so it's a snapshot (app/_og-assets/hero-visual.png, made by
 * scripts/capture-og-hero.mjs; re-run it when the hero visual changes).
 * Satori-safe flex/inline styles; colours are literal because satori can't
 * read the CSS tokens.
 *
 * The Tey tile is the logo (never paired with a TEYRO wordmark). Fonts are the
 * committed WOFF/TTF files the certificate renderer also uses (satori takes
 * neither WOFF2 nor webp, so the art here is PNG).
 */
export const runtime = 'nodejs';
export const alt =
  'Teyro: the fun and effective way to learn skills. Coding, AI, money, leadership, communication and more.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const ROOT = process.cwd();
const OG = path.join(ROOT, 'app', '_og-assets');
const FONT_DIR = path.join(ROOT, 'app', 'blog', '_fonts');

const png = (file: string) => `data:image/png;base64,${fs.readFileSync(file).toString('base64')}`;

const fontBold = fs.readFileSync(path.join(FONT_DIR, 'PlusJakartaSans-Bold.ttf'));
const fontExtra = fs.readFileSync(path.join(FONT_DIR, 'PlusJakartaSans-ExtraBold.ttf'));
const fontDisplay = fs.readFileSync(path.join(OG, 'fonts', 'baloo-2-800.woff'));

const tileSrc = png(path.join(ROOT, 'public', 'Tey Logo and icons', 'png-512.png'));
// 1270 x 1392 at 2x; drawn at half that, so it stays sharp.
const heroSrc = png(path.join(OG, 'hero-visual.png'));

const BLUE = '#0172FD';
const BLUE_DEEP = '#0058C4';
const INK = '#1F2937';
const GOLD = '#FFD43B';

const SUBJECTS = ['Coding', 'AI', 'Money', 'Leadership', 'Communication', 'Business', 'Career'];

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
          background: BLUE,
          fontFamily: 'Jakarta',
        }}
      >
        {/* Soft light behind the phone, and a darker floor so the chips sit on something. */}
        <div
          style={{
            position: 'absolute',
            right: -160,
            top: -120,
            width: 760,
            height: 760,
            borderRadius: 999,
            background: 'radial-gradient(circle, rgba(255,255,255,0.28), rgba(255,255,255,0) 65%)',
          }}
        />
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 18, background: BLUE_DEEP }} />

        {/* Left: logo, headline, subjects */}
        <div style={{ display: 'flex', flexDirection: 'column', padding: '48px 0 0 72px', width: 640 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={tileSrc}
              width={64}
              height={64}
              alt=""
              style={{ borderRadius: 18, boxShadow: '0 6px 0 rgba(0, 40, 110, 0.35)' }}
            />
            <div style={{ display: 'flex', fontSize: 26, fontWeight: 800, color: 'rgba(255,255,255,0.92)' }}>
              teyro.app
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginTop: 26,
              fontFamily: 'Baloo',
              fontSize: 74,
              fontWeight: 800,
              lineHeight: 1.0,
              letterSpacing: -1,
              color: '#FFFFFF',
            }}
          >
            <div style={{ display: 'flex' }}>The fun and</div>
            <div style={{ display: 'flex' }}>
              <span style={{ color: GOLD, marginRight: 18 }}>effective</span>
              <span>way</span>
            </div>
            <div style={{ display: 'flex' }}>to learn skills.</div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 30, width: 560 }}>
            {SUBJECTS.map((subject) => (
              <div
                key={subject}
                style={{
                  display: 'flex',
                  padding: '10px 20px',
                  borderRadius: 999,
                  background: '#FFFFFF',
                  borderBottom: `5px solid ${BLUE_DEEP}`,
                  fontSize: 24,
                  fontWeight: 800,
                  color: INK,
                }}
              >
                {subject}
              </div>
            ))}
            <div
              style={{
                display: 'flex',
                padding: '10px 20px',
                borderRadius: 999,
                border: '3px solid rgba(255,255,255,0.7)',
                fontSize: 24,
                fontWeight: 800,
                color: '#FFFFFF',
              }}
            >
              + more
            </div>
          </div>
        </div>

        {/* Right: the hero's phone, running off the bottom edge like a screenshot. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={heroSrc}
          width={572}
          height={627}
          alt=""
          style={{ position: 'absolute', right: 6, top: 28 }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Jakarta', data: fontBold, weight: 700, style: 'normal' },
        { name: 'Jakarta', data: fontExtra, weight: 800, style: 'normal' },
        { name: 'Baloo', data: fontDisplay, weight: 800, style: 'normal' },
      ],
    },
  );
}
