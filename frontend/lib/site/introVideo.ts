/**
 * The homepage introduction video. The link lives in Teyro HQ (Website →
 * Homepage video); the backend turns it into a YouTube video id and the
 * homepage embeds only that id. No video set, or any failure, means the
 * homepage simply has no video section — it never shows a broken one.
 */
export async function getIntroVideoId(): Promise<string | null> {
  const api = process.env.NEXT_PUBLIC_API_URL;
  if (!api) return null;
  try {
    const res = await fetch(`${api}/site/intro-video`, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { videoId?: string | null };
    return typeof data.videoId === 'string' && /^[A-Za-z0-9_-]{11}$/.test(data.videoId) ? data.videoId : null;
  } catch {
    return null;
  }
}
