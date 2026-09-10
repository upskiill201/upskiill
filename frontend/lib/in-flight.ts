/**
 * Collapses concurrent calls for the same key into a single request.
 *
 * Why this exists: most of the app fetches with a raw `fetch` inside a
 * `useEffect` rather than through `useSWR`, so SWR's `dedupingInterval` never
 * applies. Several endpoints are read by two mounted components at once —
 * MonthlyQuestCard and MonthlyQuestWidget, RightSidebar and
 * LeaderboardRankWatcher — and each mount fired its own round trip.
 *
 * Note specifically that `mutate(key, fetcher(key))` does NOT dedupe, despite
 * reading like it should: `fetcher(key)` is evaluated as an argument, so the
 * request is already in flight before `mutate` is entered. SWR's dedupe map is
 * only consulted on `useSWR`'s revalidate path.
 *
 * This is intentionally narrower than a cache: the promise is dropped as soon
 * as it settles, so an explicit refresh still hits the network. It only merges
 * calls that genuinely overlap in time — which is exactly the mount storm and
 * the post-lesson-completion event storm.
 */

const inFlight = new Map<string, Promise<unknown>>();

export function dedupeInFlight<T>(key: string, run: () => Promise<T>): Promise<T> {
  const existing = inFlight.get(key) as Promise<T> | undefined;
  if (existing) return existing;

  const promise = run().finally(() => {
    // Only clear if we are still the current entry — a refresh issued while
    // this one was settling must not be evicted by our cleanup.
    if (inFlight.get(key) === promise) inFlight.delete(key);
  });

  inFlight.set(key, promise);
  return promise;
}
