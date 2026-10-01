'use client';

/**
 * Daily Quests — the home rail card (desktop) and the top of the Quests tab.
 *
 * Replaces TodaysMissionsCard. What changed, and why:
 *  - Duolingo's name: Daily Quests.
 *  - Each quest's reward is a chest you open in place (DailyQuestList) —
 *    the old CLAIM button launched two full-screen scenes for a small
 *    daily reward.
 *  - No invented data: the old card showed three made-up missions with fake
 *    progress whenever the request failed. Now a failure says so.
 *  - The footer tells the truth about the bonus: opening all three chests
 *    pays +15 Coins (the server's rule), instead of a chest that didn't exist.
 */

import { Check, Clock, RefreshCw } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { fetcher } from '@/lib/swr';
import { dailyQuestsKey, isClaimed, isDone, timeLeftToday, type DailyQuestsPayload } from '@/lib/quests/dailyQuests';
import { DailyQuestList } from './DailyQuestList';

export function DailyQuestsCard({ variant = 'rail' }: { variant?: 'rail' | 'page' }) {
  const { data, error, isLoading, mutate } = useSWR<DailyQuestsPayload>(dailyQuestsKey(), fetcher, {
    revalidateOnFocus: true,
  });
  const quests = Array.isArray(data?.missions) ? data!.missions : [];

  // "7 hours" left today — refreshed each minute.
  const [left, setLeft] = useState(() => timeLeftToday(new Date(), data?.resetAt));
  useEffect(() => {
    const tick = () => setLeft(timeLeftToday(new Date(), data?.resetAt));
    tick();
    const t = setInterval(tick, 60_000);
    return () => clearInterval(t);
  }, [data?.resetAt]);

  const allClaimed = quests.length > 0 && quests.every(isClaimed);
  const doneCount = quests.filter(isDone).length;

  return (
    <section
      aria-label="Daily Quests"
      className="rounded-[20px] border-2 border-[var(--border)] bg-white px-4 pt-4 pb-3"
      style={{ boxShadow: '0 4px 0 var(--border)' }}
    >
      <header className="flex items-center justify-between gap-3">
        <h2
          className={`${variant === 'page' ? 'text-[20px]' : 'text-[17px]'} font-extrabold text-ink`}
          style={{ fontFamily: 'var(--font-jakarta)' }}
        >
          Daily Quests
        </h2>
        <span className="inline-flex items-center gap-1 text-[13px] font-extrabold" style={{ color: 'var(--warning)' }}>
          <Clock className="w-4 h-4 stroke-[2.6]" aria-hidden="true" />
          {left}
        </span>
      </header>

      {isLoading && quests.length === 0 ? (
        <ul className="mt-1" aria-busy="true" aria-label="Loading quests">
          {[0, 1, 2].map((i) => (
            <li key={i} className="flex items-center gap-3.5 py-3">
              <span className="w-12 h-12 rounded-[14px] animate-pulse" style={{ backgroundColor: 'var(--bg-section)' }} />
              <span className="flex-1">
                <span className="block h-4 w-2/3 rounded animate-pulse" style={{ backgroundColor: 'var(--bg-section)' }} />
                <span className="mt-2 block h-[18px] rounded-full animate-pulse" style={{ backgroundColor: 'var(--bg-section)' }} />
              </span>
              <span className="w-11 h-10 rounded-[12px] animate-pulse" style={{ backgroundColor: 'var(--bg-section)' }} />
            </li>
          ))}
        </ul>
      ) : error && quests.length === 0 ? (
        <div className="py-6 text-center">
          <p className="text-[15px] font-bold text-[var(--text-secondary)]">Today&apos;s quests didn&apos;t load.</p>
          <button
            type="button"
            onClick={() => void mutate()}
            className="mt-3 inline-flex items-center gap-1.5 rounded-[12px] px-4 py-2 text-[13.5px] font-extrabold text-[var(--color-brand)] hover:bg-[var(--light-blue-bg)] cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" aria-hidden="true" />
            Try again
          </button>
        </div>
      ) : quests.length === 0 ? (
        <p className="py-6 text-center text-[15px] font-bold text-[var(--text-secondary)]">
          Your quests appear with today&apos;s first visit — check back in a moment.
        </p>
      ) : (
        <div className="mt-1">
          <DailyQuestList quests={quests} />
        </div>
      )}

      {quests.length > 0 && (
        <footer
          className="mt-1 flex items-center gap-2 rounded-[14px] px-3 py-2.5 text-[13px] font-bold"
          style={{
            backgroundColor: allClaimed ? 'color-mix(in srgb, var(--success-green) 10%, white)' : 'var(--bg-section)',
            color: allClaimed ? 'var(--success-green)' : 'var(--text-secondary)',
          }}
        >
          {allClaimed ? (
            <>
              <Check className="w-4 h-4 stroke-[3]" aria-hidden="true" />
              All done for today — new quests in {left}.
            </>
          ) : (
            <>
              <Image src="/Icons/Coin.png" alt="" width={16} height={16} unoptimized />
              {doneCount === quests.length
                ? 'Open every chest for a +15 Coin bonus!'
                : `Finish all ${quests.length} and open their chests for +15 bonus Coins.`}
            </>
          )}
        </footer>
      )}

      {variant === 'rail' && (
        <Link
          href="/dashboard/quests"
          className="mt-2 block text-center text-[13px] font-extrabold uppercase tracking-[0.06em] text-[var(--color-brand)] py-1.5"
        >
          View quests
        </Link>
      )}
    </section>
  );
}

export default DailyQuestsCard;
