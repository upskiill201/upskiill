/**
 * Client-side USD → local-currency display rates for Mobile Money markets.
 *
 * Mirrors the baked defaults in backend/src/payment/mesomb-countries.ts and
 * can be tuned per environment with NEXT_PUBLIC_FX_USD_TO_* vars.
 *
 * NOTE: env values MUST be referenced as literal `process.env.X` members —
 * Next.js inlines NEXT_PUBLIC_* at build time and dynamic key access
 * (`process.env[`NEXT_PUBLIC_…${ccy}`]`) silently resolves to undefined in
 * the browser bundle.
 *
 * DISPLAY ONLY: the charge amount is computed server-side (ceil, never
 * undercharge); formatting here matches that rounding so learners see the
 * exact figure their provider will prompt for.
 */

const FALLBACK_RATES: Record<string, number> = {
  XAF: 600,
  XOF: 600,
  CDF: 2850,
  KES: 129,
  RWF: 1450,
  SLE: 25,
  UGX: 3700,
  ZMW: 26,
};

const ENV_RATES: Record<string, number | undefined> = {
  XAF: Number(process.env.NEXT_PUBLIC_FX_USD_TO_XAF) || undefined,
  XOF: Number(process.env.NEXT_PUBLIC_FX_USD_TO_XOF) || undefined,
  CDF: Number(process.env.NEXT_PUBLIC_FX_USD_TO_CDF) || undefined,
  KES: Number(process.env.NEXT_PUBLIC_FX_USD_TO_KES) || undefined,
  RWF: Number(process.env.NEXT_PUBLIC_FX_USD_TO_RWF) || undefined,
  SLE: Number(process.env.NEXT_PUBLIC_FX_USD_TO_SLE) || undefined,
  UGX: Number(process.env.NEXT_PUBLIC_FX_USD_TO_UGX) || undefined,
  ZMW: Number(process.env.NEXT_PUBLIC_FX_USD_TO_ZMW) || undefined,
};

export function fxRateForCurrency(currency: string): number {
  return ENV_RATES[currency] ?? FALLBACK_RATES[currency] ?? 600;
}

/** Format a USD amount as its approximate local charge, e.g. "5 400 XAF". */
export function formatLocalFromUsd(usd: number, currency: string): string {
  const rate = fxRateForCurrency(currency);
  const local = Math.ceil(Math.max(0, Number(usd) || 0) * rate);
  return `${local.toLocaleString()} ${currency}`;
}
