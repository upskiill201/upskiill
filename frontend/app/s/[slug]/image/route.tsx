import { ImageResponse } from 'next/og';
import { ShareCardArt } from '../../_art/ShareCardArt';
import { shareAssets } from '../../_art/assets';
import { fetchShareCard } from '@/lib/share/server';
import { SHARE_FORMATS, type ShareFormat } from '@/lib/share/types';

/**
 * GET /s/:slug/image?format=story|square — the milestone card as a PNG.
 * Renders only the server snapshot behind the slug, so the numbers can't be
 * edited in a URL. Snapshots never change, so the image caches hard at the
 * edge; a card that doesn't exist is a plain 404.
 */
export const runtime = 'nodejs';

async function coverDataUri(url: string | null): Promise<string | null> {
  if (!url || !/^https:\/\//.test(url)) return null;
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(4000) });
    if (!res.ok) return null;
    // satori can't decode webp (most covers on R2 are webp) — re-encode to PNG.
    const sharp = (await import('sharp')).default;
    const png = await sharp(Buffer.from(await res.arrayBuffer())).resize({ width: 720, height: 405, fit: 'cover' }).png().toBuffer();
    return `data:image/png;base64,${png.toString('base64')}`;
  } catch {
    return null;
  }
}

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const formatParam = new URL(req.url).searchParams.get('format');
  const format: ShareFormat = formatParam === 'square' ? 'square' : 'story';

  const card = await fetchShareCard(slug);
  if (!card) return new Response('Not found', { status: 404 });

  const assets = shareAssets();
  const thumb = card.kind === 'COURSE_STARTED' ? await coverDataUri(card.data.thumbnailUrl) : null;
  const { width, height } = SHARE_FORMATS[format];

  return new ImageResponse(<ShareCardArt card={card} format={format} assets={assets} thumb={thumb} />, {
    width,
    height,
    fonts: assets.fonts,
    headers: {
      'Cache-Control': card.slug.startsWith('sample-')
        ? 'no-store'
        : 'public, max-age=86400, s-maxage=31536000, stale-while-revalidate=86400',
    },
  });
}
