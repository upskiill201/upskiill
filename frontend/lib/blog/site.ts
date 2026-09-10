// Central site constants for the blog SEO layer.
// metadataBase in app/layout.tsx already resolves relative URLs against
// https://teyro.app — these helpers keep canonicals consistent.

export const SITE_URL = 'https://teyro.app';

export const SITE_NAME = 'Teyro';

/** Absolute URL for a blog path, e.g. buildCanonical('/blog/my-post') */
export function buildCanonical(path: string): string {
  return `${SITE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
}

export function buildPostUrl(slug: string): string {
  return `/blog/${slug}`;
}

// Timezone-safe date formatting. new Date('YYYY-MM-DD') parses as UTC midnight,
// which shifts a day in negative-offset timezones and causes hydration
// mismatches — so parse the parts manually on both server and client.
const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

export function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  if (!y || !m || !d) return iso;
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}
