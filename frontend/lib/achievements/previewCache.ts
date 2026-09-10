/**
 * A tiny shared cache for the XP popover's Sage achievement card.
 *
 * Mirrors `frontend/lib/shop/previewCache.ts`: `StatsBar` warms this on mount
 * so the popover never shows a loading spinner on first hover.
 */

export interface AchievementPreview {
  id: string;
  title: string;
  currentMetricVal: number;
  currentTier: number;
  maxTier: number;
  nextTarget: number;
  nextDescription: string;
}

const TTL_MS = 30_000;

let cached: { data: AchievementPreview[]; at: number } | null = null;
let inflight: Promise<AchievementPreview[]> | null = null;

async function fetchAchievements(): Promise<AchievementPreview[]> {
  const res = await fetch('/api/gamification/achievements', { credentials: 'include' });
  if (!res.ok) throw new Error(`achievements fetch failed (${res.status})`);
  const data = await res.json();
  return Array.isArray(data?.achievements) ? data.achievements : [];
}

export function getCachedAchievements(): AchievementPreview[] | null {
  if (cached && Date.now() - cached.at < TTL_MS) return cached.data;
  return null;
}

/** Fetches once and shares the result — safe to call from many mounts at once. */
export function prefetchAchievements(): Promise<AchievementPreview[]> {
  const fresh = getCachedAchievements();
  if (fresh) return Promise.resolve(fresh);
  if (inflight) return inflight;

  inflight = fetchAchievements()
    .then((data) => {
      cached = { data, at: Date.now() };
      inflight = null;
      return data;
    })
    .catch((e) => {
      inflight = null;
      throw e;
    });
  return inflight;
}
