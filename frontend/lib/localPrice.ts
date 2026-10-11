'use client';

import { useEffect, useState } from 'react';
import { fxRateForCurrency } from '@/lib/fx-rates';

/**
 * Course prices in the visitor's own currency.
 *
 * Prices are set and stored in USD. For the countries below we show them in
 * the local currency instead, converted at the same rate the Mobile Money
 * charge uses (lib/fx-rates.ts ↔ backend mesomb-countries.ts) and rounded up
 * the same way — so the number on the screen is the number the phone prompt
 * asks for. Card payments are still charged in USD; the paywall says so.
 *
 * The country comes from the `teyro_country` cookie that proxy.ts sets from
 * Vercel's IP geolocation. Add a country here to localise it.
 */
export const LOCAL_PRICE_COUNTRIES: Record<string, { currency: string; label: string }> = {
  CM: { currency: 'XAF', label: 'FCFA' }, // Cameroon
};

export const COUNTRY_COOKIE = 'teyro_country';

function readCountryCookie(): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(/(?:^|;\s*)teyro_country=([A-Z]{2})/);
  return match ? match[1] : null;
}

/** "6 000 FCFA" — whole units, rounded up like the Mobile Money charge. */
export function formatLocalPrice(usd: number, currency: string, label = currency): string {
  const amount = Math.ceil(Math.max(0, Number(usd) || 0) * fxRateForCurrency(currency));
  // fr-FR groups with a narrow no-break space; a plain space reads the same
  // everywhere and never wraps oddly inside a button.
  return `${amount.toLocaleString('fr-FR').replace(/\s/g, ' ')} ${label}`;
}

export const formatUsd = (usd: number) => `$${(Number(usd) || 0).toFixed(2)}`;

export interface LocalPricing {
  /** ISO country, when we localise prices there; null = show USD. */
  country: string | null;
  currency: string | null;
  /** Formats a USD amount for this visitor (local currency, or "$10.00"). */
  format: (usd: number) => string;
}

/**
 * Read after mount, so the server render and the first client render agree
 * (USD), then switch to the local currency. One frame, no layout jump.
 */
export function useLocalPricing(): LocalPricing {
  const [country, setCountry] = useState<string | null>(null);
  useEffect(() => {
    const c = readCountryCookie();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (c && LOCAL_PRICE_COUNTRIES[c]) setCountry(c);
  }, []);
  const local = country ? LOCAL_PRICE_COUNTRIES[country] : null;
  return {
    country: local ? country : null,
    currency: local?.currency ?? null,
    format: local ? (usd) => formatLocalPrice(usd, local.currency, local.label) : formatUsd,
  };
}
