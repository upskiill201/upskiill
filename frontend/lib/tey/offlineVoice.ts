/**
 * Tey's voice for the offline fallback page (`app/offline/page.tsx`). That
 * page is deliberately a Server Component with zero client JS — by
 * definition nothing can be fetched when it renders — so this stays a plain
 * function callable at render time, no hooks, no "don't repeat" memory tied
 * to a browser session (a fresh pick per request is fine here; the whole
 * point of the copy is reassurance, not a running bit).
 */

import { pickFromPool } from './pool';

const BODY_LINES = [
  "Teyro can't reach the network right now. Your progress is safe — reconnect and pick up exactly where you left off.",
  "No connection right now — nothing is lost. Come back online and you'll be exactly where you left off.",
  "Looks like the connection dropped. Your progress is saved — reconnect whenever you're ready.",
];

export function pickOfflineBodyLine(): string {
  return pickFromPool(BODY_LINES, 'offline:body');
}
