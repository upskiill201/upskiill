import fs from 'fs';
import path from 'path';

/**
 * Fonts and art for the certificate renderer, read once per server instance.
 * satori takes TTF/OTF/WOFF (not WOFF2): Plus Jakarta Sans comes from the
 * blog's committed TTFs, Baloo 2 (the learner's name, the homepage display
 * face) and Caveat (the signature) are committed WOFFs in app/_og-assets/fonts.
 */

const ROOT = process.cwd();
const OG = path.join(ROOT, 'app', '_og-assets');

function png(file: string): string {
  return `data:image/png;base64,${fs.readFileSync(file).toString('base64')}`;
}

export interface CertificateAssets {
  fonts: { name: string; data: Buffer; weight: 700 | 800; style: 'normal' }[];
  tile: string;
  xp: string;
  streak: string;
}

let cached: CertificateAssets | null = null;

export function certificateAssets(): CertificateAssets {
  if (cached) return cached;
  const blogFonts = path.join(ROOT, 'app', 'blog', '_fonts');
  cached = {
    fonts: [
      { name: 'Jakarta', data: fs.readFileSync(path.join(blogFonts, 'PlusJakartaSans-Bold.ttf')), weight: 700, style: 'normal' },
      { name: 'Jakarta', data: fs.readFileSync(path.join(blogFonts, 'PlusJakartaSans-ExtraBold.ttf')), weight: 800, style: 'normal' },
      // Latin + Latin Extended subsets, so names like Ọlá or José render in the face.
      { name: 'Baloo', data: fs.readFileSync(path.join(OG, 'fonts', 'baloo-2-800.woff')), weight: 800, style: 'normal' },
      { name: 'Baloo', data: fs.readFileSync(path.join(OG, 'fonts', 'baloo-2-800-ext.woff')), weight: 800, style: 'normal' },
      { name: 'Signature', data: fs.readFileSync(path.join(OG, 'fonts', 'caveat-700.woff')), weight: 700, style: 'normal' },
      { name: 'Signature', data: fs.readFileSync(path.join(OG, 'fonts', 'caveat-700-ext.woff')), weight: 700, style: 'normal' },
    ],
    tile: png(path.join(ROOT, 'public', 'Tey Logo and icons', 'png-512.png')),
    xp: png(path.join(ROOT, 'public', 'Icons', 'gem.png')),
    streak: png(path.join(ROOT, 'public', 'Icons', 'burn.png')),
  };
  return cached;
}
