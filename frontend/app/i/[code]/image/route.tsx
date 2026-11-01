/* eslint-disable @next/next/no-img-element -- satori renders plain <img> */
import { ImageResponse } from 'next/og';
import { shareAssets } from '../../../s/_art/assets';
import { fetchInvitePreview } from '@/lib/ambassador';
import { avatarFromUrl, isPhoto } from '@/lib/avatar/avatar';
import { avatarSvg } from '@/lib/avatar/draw';
import { topicOf } from '@/lib/onboarding/v3/lines';

/**
 * GET /i/:code/image — the personalised invite preview (1200×630) that a
 * WhatsApp / X / iMessage link unfurls into: the inviter's own character or
 * photo, their first name, what they're learning and their streak.
 *
 * Clean and flat on purpose (founder, 2026-10-29): no 3D, no mascot pile.
 * Hex lives here because a rendered PNG can't read CSS variables — same
 * exception as app/opengraph-image.tsx and the share cards.
 */
export const runtime = 'nodejs';

const W = 1200;
const H = 630;
const INK = '#071233';
const MUTED = '#4B5675';
const BRAND = '#0172FD';
const PAPER = '#FFFFFF';
const WASH = '#EEF4FF';
const LINE = '#DCE6F5';

/**
 * The inviter's face as something satori can draw. A Teyro character is SVG,
 * which satori renders as-is; only an uploaded photo (often webp, which
 * satori can't decode) goes through sharp, like the share cards' covers.
 */
async function avatarImage(url: string | null): Promise<string | null> {
  if (!url) return null;
  const built = avatarFromUrl(url);
  if (built) return `data:image/svg+xml;base64,${Buffer.from(avatarSvg(built)).toString('base64')}`;
  if (!isPhoto(url) || !/^https:\/\//.test(url)) return null;
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(4000) });
    if (!res.ok) return null;
    const sharp = (await import('sharp')).default;
    const png = await sharp(Buffer.from(await res.arrayBuffer())).resize({ width: 360, height: 360, fit: 'cover' }).png().toBuffer();
    return `data:image/png;base64,${png.toString('base64')}`;
  } catch {
    return null;
  }
}

export async function GET(_req: Request, { params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const invite = await fetchInvitePreview(code);
  if (!invite) return new Response('Not found', { status: 404 });

  const assets = shareAssets();
  const face = await avatarImage(invite.avatarUrl);
  // 'Python for Beginners' → 'Python': the headline has to fit in three lines.
  const what = topicOf(invite.courseTitle ?? undefined) ?? 'something real';
  const initial = invite.firstName.slice(0, 1).toUpperCase();

  return new ImageResponse(
    (
      <div style={{ width: W, height: H, display: 'flex', background: PAPER, fontFamily: 'Jakarta', color: INK }}>
        {/* Left: the person */}
        <div
          style={{
            width: 470,
            height: H,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: WASH,
            borderRight: `2px solid ${LINE}`,
          }}
        >
          <div
            style={{
              width: 300,
              height: 300,
              borderRadius: 300,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              background: PAPER,
              border: `10px solid ${PAPER}`,
              boxShadow: `0 0 0 2px ${LINE}`,
            }}
          >
            {face ? (
              <img src={face} width={280} height={280} style={{ borderRadius: 280 }} alt="" />
            ) : (
              <div style={{ fontSize: 140, fontWeight: 800, color: BRAND }}>{initial}</div>
            )}
          </div>
          {invite.streakDays > 0 && (
            <div
              style={{
                marginTop: 28,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 22px',
                borderRadius: 999,
                background: PAPER,
                border: `2px solid ${LINE}`,
                fontSize: 28,
                fontWeight: 800,
              }}
            >
              <img src={assets.fire} width={34} height={34} alt="" />
              {invite.streakDays}-day streak
            </div>
          )}
        </div>

        {/* Right: the invitation */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '64px 64px 56px' }}>
          {/* The Tey tile is the logo on its own, never with a wordmark. */}
          <img src={assets.tile} width={64} height={64} style={{ borderRadius: 16 }} alt="" />

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 26, fontWeight: 800, color: BRAND, letterSpacing: 2, textTransform: 'uppercase' }}>
              {`${invite.firstName} invited you`}
            </div>
            <div style={{ marginTop: 16, fontSize: 72, fontWeight: 800, lineHeight: 1.05, display: 'flex', flexWrap: 'wrap' }}>
              {`Learn ${what} with ${invite.firstName}`}
            </div>
            <div style={{ marginTop: 22, fontSize: 28, fontWeight: 700, color: MUTED, lineHeight: 1.35 }}>
              {invite.squadName
                ? `Join ${invite.squadName}. Short daily lessons, streaks and friends who keep you going.`
                : 'Short daily lessons, streaks and friends who keep you going.'}
            </div>
          </div>

          <div style={{ display: 'flex', fontSize: 26, fontWeight: 800, color: MUTED }}>teyro.app</div>
        </div>
      </div>
    ),
    {
      width: W,
      height: H,
      fonts: assets.fonts,
      headers: { 'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400' },
    },
  );
}
