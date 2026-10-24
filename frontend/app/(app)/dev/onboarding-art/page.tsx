'use client';

/**
 * Dev-only bench for Teyro's own icon set: every drawing, then every glyph
 * on white and on a lit path node, so a new or changed one can be checked
 * by eye. Gated on NODE_ENV
 * like the other /dev benches; visit /dev/onboarding-art directly.
 */

import { Art, type ArtName } from '@/components/art/Art';
import { EMBLEM_NAMES, Emblem } from '@/components/art/Emblem';
import { GLYPH_NAMES, Glyph } from '@/components/art/Glyph';

const NAMES: ArtName[] = [...new Set<ArtName>([
  'home', 'notebook', 'compass', 'code', 'people', 'trophy', 'target', 'shop', 'avatar', 'more',
  'gear', 'lifebuoy', 'map', 'clapper', 'easel', 'door',
  'laptop', 'chart', 'rocket', 'piggy', 'team', 'mic', 'chip', 'brain',
  'code', 'spark', 'bubbles', 'mountain', 'briefcase', 'coins', 'pie', 'book',
  'seed', 'sprout', 'tree', 'pace5', 'pace10', 'pace20', 'pace30',
  'sunrise', 'sun', 'moon', 'clock',
  'search', 'badge', 'signpost', 'bulb', 'cap', 'compass', 'friends', 'planet', 'xmark',
  'cards', 'target', 'certificate', 'certificateGoal','calendar', 'clipboard', 'gift', 'envelope', 'linkBroken', 'seal',
])];

export default function OnboardingArtBench() {
  if (process.env.NODE_ENV !== 'development') return null;
  return (
    <main className="min-h-screen p-4 bg-[var(--bg-page)]">
      <div className="mb-6 grid grid-cols-4 gap-3">
        {EMBLEM_NAMES.map((n) => (
          <div key={n} className="flex flex-col items-center gap-1 rounded-[12px] border-2 border-[var(--border)] p-2">
            <div className="flex items-end gap-2">
              <Emblem name={n} size={18} />
              <Emblem name={n} size={40} />
            </div>
            <span className="text-[10px] font-bold text-[var(--text-secondary)]">{n}</span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3">
        {NAMES.map((n) => (
          <div key={n} className="flex flex-col items-center gap-1 rounded-[12px] border-2 border-[var(--border)] p-2">
            <Art name={n} size={72} />
            <span className="text-[11px] font-bold text-[var(--text-secondary)]">{n}</span>
          </div>
        ))}
      </div>
      <div className="mt-6 grid grid-cols-4 gap-3">
        {GLYPH_NAMES.map((n) => (
          <div key={n} className="flex flex-col items-center gap-1 rounded-[12px] border-2 border-[var(--border)] p-2">
            <div className="flex items-center gap-2">
              <span className="text-[var(--color-ink)]">
                <Glyph name={n} size={24} />
              </span>
              <span className="grid place-items-center w-[44px] h-[44px] rounded-full bg-[var(--color-brand)] text-white">
                <Glyph name={n} size={26} strokeWidth={2.75} />
              </span>
            </div>
            <span className="text-[10px] font-bold text-[var(--text-secondary)]">{n}</span>
          </div>
        ))}
      </div>
    </main>
  );
}
