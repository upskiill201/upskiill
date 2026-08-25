/**
 * Shared currency display helpers.
 *
 * The USD → XAF display rate lives here so the paywall and the cart
 * checkout page never drift apart. Override with NEXT_PUBLIC_USD_TO_XAF_FALLBACK
 * if the rate ever needs tuning without a redeploy of code (env-only change).
 *
 * NOTE: this is a DISPLAY approximation only. The charge amount is always
 * computed server-side by backend/src/course/pricing-engine.ts.
 */
export const USD_TO_XAF_RATE: number = Number(
  process.env.NEXT_PUBLIC_USD_TO_XAF_FALLBACK,
) || 600;

/** Format a USD amount as its approximate XAF equivalent, e.g. "5 400 XAF". */
export function formatXaf(usd: number): string {
  const xaf = Math.round((Number(usd) || 0) * USD_TO_XAF_RATE);
  return `${xaf.toLocaleString()} XAF`;
}
