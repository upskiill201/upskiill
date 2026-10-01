'use client';

import { useEffect, useState } from 'react';

/**
 * Counts from `from` to `to` once `to` is known (null waits), easing out so
 * the last few steps land slowly — the number settles rather than stops.
 */
export function useCountUp(
  to: number | null,
  { from = 0, duration = 900, delay = 0, instant = false }: { from?: number; duration?: number; delay?: number; instant?: boolean } = {},
): number | null {
  const [value, setValue] = useState<number | null>(null);

  useEffect(() => {
    if (to === null) return;
    let raf = 0;
    const startAt = performance.now() + delay;
    const tick = (now: number) => {
      if (instant) {
        setValue(to);
        return;
      }
      if (now < startAt) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const t = Math.min(1, (now - startAt) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(from + (to - from) * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, from, duration, delay, instant]);

  return value;
}
