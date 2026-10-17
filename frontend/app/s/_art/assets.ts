import fs from 'fs';
import path from 'path';

/**
 * Fonts and art for the share-card renderer, read once per server instance.
 * satori (behind ImageResponse) can't decode webp, so the mascot poses are
 * committed PNG copies in app/_og-assets/share (made with sharp from
 * public/User onbarding Assets/tey); the fire is the cartoon streak flame
 * rasterised from the approved template.
 */

const ROOT = process.cwd();
const SHARE_DIR = path.join(ROOT, 'app', '_og-assets', 'share');
const PUBLIC_DIR = path.join(ROOT, 'public');
const FONT_DIR = path.join(ROOT, 'app', 'blog', '_fonts');

function dataUri(file: string): string {
  return `data:image/png;base64,${fs.readFileSync(file).toString('base64')}`;
}

export interface ShareAssets {
  fonts: { name: string; data: Buffer; weight: 700 | 800; style: 'normal' }[];
  fire: string;
  tile: string;
  gem: string;
  coin: string;
  trophy: string;
  tey: { cheering: string; welcome: string; pointing: string; bell: string };
  badge: (badgeId: string) => string | null;
}

let cached: ShareAssets | null = null;
const badgeCache = new Map<string, string | null>();

export function shareAssets(): ShareAssets {
  if (cached) return cached;
  cached = {
    fonts: [
      { name: 'Jakarta', data: fs.readFileSync(path.join(FONT_DIR, 'PlusJakartaSans-Bold.ttf')), weight: 700, style: 'normal' },
      { name: 'Jakarta', data: fs.readFileSync(path.join(FONT_DIR, 'PlusJakartaSans-ExtraBold.ttf')), weight: 800, style: 'normal' },
    ],
    fire: dataUri(path.join(SHARE_DIR, 'fire.png')),
    tile: dataUri(path.join(PUBLIC_DIR, 'Tey Logo and icons', 'png-512.png')),
    gem: dataUri(path.join(PUBLIC_DIR, 'Icons', 'gem.png')),
    coin: dataUri(path.join(PUBLIC_DIR, 'Icons', 'Coin.png')),
    trophy: dataUri(path.join(PUBLIC_DIR, 'Leagues', 'league-tournament.png')),
    tey: {
      cheering: dataUri(path.join(SHARE_DIR, 'tey-cheering.png')),
      welcome: dataUri(path.join(SHARE_DIR, 'tey-welcome.png')),
      pointing: dataUri(path.join(SHARE_DIR, 'tey-pointing.png')),
      bell: dataUri(path.join(SHARE_DIR, 'tey-bell.png')),
    },
    badge: (badgeId: string) => {
      if (badgeCache.has(badgeId)) return badgeCache.get(badgeId)!;
      const safe = /^[a-z]+$/.test(badgeId) ? path.join(SHARE_DIR, 'badges', `${badgeId}.png`) : null;
      const uri = safe && fs.existsSync(safe) ? dataUri(safe) : null;
      badgeCache.set(badgeId, uri);
      return uri;
    },
  };
  return cached;
}
