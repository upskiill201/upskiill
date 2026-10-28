import { decodeAvatar } from '@/lib/avatar/avatar';
import { avatarSvg } from '@/lib/avatar/draw';

/**
 * GET /avatars/v1/<code>.svg — a Teyro character as a plain SVG file, so a
 * stored character avatarUrl works anywhere an image URL does (<img>, share
 * cards, emails). The code fully determines the drawing, so it caches forever.
 */
export async function GET(_req: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  const config = decodeAvatar(file.replace(/\.svg$/, ''));
  if (!config) return new Response('Not found', { status: 404 });
  return new Response(avatarSvg(config), {
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=31536000, immutable',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
