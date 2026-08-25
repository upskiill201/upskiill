'use client';

import { useEffect, useState } from 'react';
import {
  DEFAULT_MOMO_COUNTRY_CODE,
  MOMO_COUNTRIES,
  type MomoCountry,
} from '@/lib/mesomb-countries.client';

/**
 * Stale-while-revalidate access to GET /api/payment/mesomb/config.
 *
 * Renders INSTANTLY from the static registry mirror; one module-level fetch
 * upgrades it with authoritative per-country `enabled` flags for our MeSomb
 * account. The network result is cached for the session so navigating back
 * to the unlock flow never refetches.
 *
 * NEVER gate payment UI on isLoading — if the request fails (offline,
 * backend warming up) the static mirror is already perfectly usable and the
 * backend remains the final validator on submit.
 */

export interface MesombConfig {
  defaultCountry: string;
  source: 'registry' | 'registry+account';
  countries: MomoCountry[];
}

const STATIC_CONFIG: MesombConfig = {
  defaultCountry: DEFAULT_MOMO_COUNTRY_CODE,
  source: 'registry',
  countries: MOMO_COUNTRIES,
};

let cache: MesombConfig | null = null;
let inflight: Promise<MesombConfig | null> | null = null;

function mergeOverStatic(network: {
  defaultCountry?: string;
  source?: string;
  countries?: Array<{ code: string; enabled?: boolean }>;
}): MesombConfig {
  const byCode = new Map((network.countries ?? []).map((c) => [c.code, c]));
  return {
    defaultCountry:
      network.defaultCountry?.toUpperCase() || DEFAULT_MOMO_COUNTRY_CODE,
    source: network.source === 'registry+account' ? 'registry+account' : 'registry',
    countries: MOMO_COUNTRIES.map((staticCountry) => {
      const net = byCode.get(staticCountry.code);
      return net ? { ...staticCountry, enabled: net.enabled !== false } : staticCountry;
    }),
  };
}

async function fetchConfig(): Promise<MesombConfig | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 4000);
  try {
    const res = await fetch('/api/payment/mesomb/config', {
      credentials: 'include',
      signal: controller.signal,
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data || !Array.isArray(data.countries)) return null;
    return mergeOverStatic(data);
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

export interface UseMesombConfigResult extends MesombConfig {
  /** True until a network config lands — informational only, never a gate. */
  isLoading: boolean;
  getCountry: (code?: string | null) => MomoCountry | undefined;
}

export function useMesombConfig(): UseMesombConfigResult {
  const [config, setConfig] = useState<MesombConfig>(cache ?? STATIC_CONFIG);

  useEffect(() => {
    // Initial state already came from `cache ?? STATIC_CONFIG`; here we only
    // kick off ONE session-wide fetch. setConfig fires from the async
    // callback below, never synchronously in the effect body.
    if (cache || inflight) return;
    let cancelled = false;
    inflight = fetchConfig();
    void inflight.then((next) => {
      inflight = null;
      if (next && !cancelled) {
        cache = next;
        setConfig(next);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const getCountry = (code?: string | null) =>
    config.countries.find((c) => c.code === String(code ?? '').trim().toUpperCase());

  return {
    ...config,
    isLoading: config.source === 'registry' && !cache,
    getCountry,
  };
}
