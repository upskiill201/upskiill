import { SAMPLE_SHARE_CARDS } from './samples';
import type { PublicShareCard } from './types';

/**
 * Reads a share card's public snapshot from the backend (GET /share-cards/:slug).
 * `sample-*` slugs serve the /dev/share-cards bench outside production.
 */
export async function fetchShareCard(slug: string): Promise<PublicShareCard | null> {
  if (slug.startsWith('sample-')) {
    return process.env.NODE_ENV === 'production' ? null : (SAMPLE_SHARE_CARDS[slug] ?? null);
  }
  if (!/^[a-z0-9]{6,16}$/.test(slug)) return null;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/share-cards/${slug}`, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    return (await res.json()) as PublicShareCard;
  } catch {
    return null;
  }
}
