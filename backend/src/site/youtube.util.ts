/**
 * Pulls the 11-character video id out of any normal YouTube link (watch, share,
 * embed, shorts, live). Returns null for anything that is not YouTube — the
 * homepage only ever embeds youtube-nocookie.com with an id we extracted, so a
 * pasted link can never inject anything else.
 */
const ID = /^[A-Za-z0-9_-]{11}$/;
const HOSTS = new Set([
  'youtube.com',
  'www.youtube.com',
  'm.youtube.com',
  'music.youtube.com',
  'youtube-nocookie.com',
  'www.youtube-nocookie.com',
  'youtu.be',
]);

export function parseYouTubeId(raw: string | null | undefined): string | null {
  if (!raw) return null;
  let url: URL;
  try {
    url = new URL(raw.trim());
  } catch {
    return null;
  }
  if (url.protocol !== 'https:' && url.protocol !== 'http:') return null;
  const host = url.hostname.toLowerCase();
  if (!HOSTS.has(host)) return null;

  let id: string | null = null;
  if (host === 'youtu.be') {
    id = url.pathname.split('/')[1] ?? null;
  } else if (url.pathname === '/watch') {
    id = url.searchParams.get('v');
  } else {
    const m = url.pathname.match(/^\/(?:embed|shorts|live|v)\/([^/?#]+)/);
    id = m ? m[1] : null;
  }
  return id && ID.test(id) ? id : null;
}
