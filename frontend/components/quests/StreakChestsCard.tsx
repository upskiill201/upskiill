'use client';

/**
 * Streak chests waiting to be opened (3, 7, 14, 21, 30 days, then every 30)
 * — each opened through the full Rive chest via useRewardChest.
 *
 * Renders nothing when none are waiting. The daily chest that used to top
 * this card was retired (2026-10-25): the daily reward already covers "come
 * back today", and two daily gifts cheapened both.
 */

import { Glyph } from '@/components/art/Glyph';
import useSWR from 'swr';
import { useGamification } from '@/context/GamificationContext';
import { useRewardChest } from '@/hooks/useRewardChest';
import { playHaptic } from '@/lib/haptics';
import { fetcher } from '@/lib/swr';
import { useHydrated } from '@/components/studio/useHydrated';
import { pendingChestsKey, type PendingChest } from '@/lib/quests/streakChests';
import { QuestChest } from './QuestChest';

interface PendingChests {
  chests: PendingChest[];
}

export function StreakChestsCard() {
  const { refresh } = useGamification();
  const openChest = useRewardChest();
  const { data: pending, mutate: mutatePending } = useSWR<PendingChests>(pendingChestsKey, fetcher, {
    revalidateOnFocus: true,
  });

  const done = () => {
    void mutatePending();
    void refresh();
  };

  // The persisted SWR cache exists only on the client: read it after
  // hydration, so the server's render and the first client render agree.
  const hydrated = useHydrated();
  const streakChests = (hydrated ? pending?.chests : undefined) ?? [];
  if (streakChests.length === 0) return null;
  const heading = streakChests.some((c) => c.kind === 'SQUAD') ? 'Your chests' : 'Streak chests';

  return (
    <section
      aria-label={heading}
      className="rounded-[20px] border-2 border-[var(--border)] bg-white p-4"
      style={{ boxShadow: '0 4px 0 var(--border)' }}
    >
      <h2 className="text-[17px] font-extrabold text-ink" style={{ fontFamily: 'var(--font-jakarta)' }}>
        {heading}
      </h2>

      <ul className="mt-3 flex flex-col gap-2">
        {streakChests.map((c) => (
          <li key={c.id}>
            <button
              type="button"
              onClick={() => {
                playHaptic('medium', false);
                openChest({ chestId: c.id, source: 'streak-chest', dedupeKey: `streak-chest-${c.id}`, onDone: done });
              }}
              className="w-full flex items-center gap-3 rounded-[14px] px-2 py-1.5 text-left hover:bg-[var(--bg-section)] cursor-pointer"
            >
              <QuestChest state="ready" size={40} />
              <span className="flex-1 min-w-0">
                <span className="flex items-center gap-1 text-[14.5px] font-extrabold text-ink">
                  <Glyph name={c.kind === 'SQUAD' ? 'users' : 'flame'} size={16} strokeWidth={2} style={{ color: 'var(--warning)' }} />
                  {c.kind === 'SQUAD' ? 'Squad chest' : c.streakDays ? `${c.streakDays}-day streak chest` : 'Streak chest'}
                </span>
                <span className="text-[12.5px] font-bold text-[var(--text-secondary)]">Tap to open</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default StreakChestsCard;
