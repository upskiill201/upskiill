import snapshot from '@/content/seo/complaints.json';

/**
 * Aggregated 1–2★ App Store review themes per competitor, written by
 * scripts/seo/mine-complaints.mjs. Aggregates only — no review text ships.
 *
 * Small samples mislead, so a competitor's themes are shown only when there
 * are at least MIN_SAMPLE low-star reviews, and a theme only when it appears
 * in at least MIN_HITS of them. The page always states the sample size.
 */

const MIN_SAMPLE = 10;
const MIN_HITS = 2;

export interface ComplaintTheme {
  id: string;
  label: string;
  count: number;
}

export interface ComplaintSummary {
  lowStar: number;
  reviewed: number;
  generatedAt: string;
  themes: ComplaintTheme[];
}

interface Snapshot {
  generatedAt: string | null;
  themes?: Record<string, string>;
  competitors: Record<string, { reviewed: number; lowStar: number; themes: Record<string, number> }>;
}

export function getComplaints(competitorId: string): ComplaintSummary | null {
  const data = snapshot as Snapshot;
  const entry = data.competitors[competitorId];
  if (!entry || !data.generatedAt || entry.lowStar < MIN_SAMPLE) return null;

  const themes = Object.entries(entry.themes)
    .filter(([, count]) => count >= MIN_HITS)
    .map(([id, count]) => ({ id, label: data.themes?.[id] ?? id, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 4);

  if (themes.length === 0) return null;
  return { lowStar: entry.lowStar, reviewed: entry.reviewed, generatedAt: data.generatedAt, themes };
}
