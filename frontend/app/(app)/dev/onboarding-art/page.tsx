'use client';

/**
 * Dev-only bench for the onboarding illustration set: every drawing at three
 * sizes, so a new or changed drawing can be checked by eye. Gated on NODE_ENV
 * like the other /dev benches; visit /dev/onboarding-art directly.
 */

import { Art, type ArtName } from '@/components/onboarding/v3/art/Art';

const NAMES: ArtName[] = [
  'laptop', 'chart', 'rocket', 'piggy', 'team', 'mic', 'chip', 'brain',
  'code', 'spark', 'bubbles', 'mountain', 'briefcase', 'coins', 'pie', 'book',
  'seed', 'sprout', 'tree', 'pace5', 'pace10', 'pace20', 'pace30',
  'sunrise', 'sun', 'moon', 'clock',
  'search', 'badge', 'signpost', 'bulb', 'cap', 'compass', 'friends', 'planet', 'xmark',
  'cards', 'target', 'certificate', 'calendar', 'clipboard', 'gift',
];

export default function OnboardingArtBench() {
  if (process.env.NODE_ENV !== 'development') return null;
  return (
    <main className="min-h-screen p-4 bg-[var(--bg-page)]">
      <div className="grid grid-cols-3 gap-3">
        {NAMES.map((n) => (
          <div key={n} className="flex flex-col items-center gap-1 rounded-[12px] border-2 border-[var(--border)] p-2">
            <Art name={n} size={72} />
            <span className="text-[11px] font-bold text-[var(--text-secondary)]">{n}</span>
          </div>
        ))}
      </div>
    </main>
  );
}
