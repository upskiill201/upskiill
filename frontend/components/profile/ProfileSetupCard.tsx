'use client';

/**
 * "Finish your profile" — a ring and three steps that make you findable in
 * the Teyro Network: a real photo (+20 Coins the first time), a study buddy,
 * and a line about you. Disappears for good once all three are done.
 *
 * On the home rail and the profile page. Reads the same caches those pages
 * already load, so it costs no extra round trips there.
 */

import React, { useState } from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import Avatar from '@/components/ui/Avatar';
import AvatarSheet from '@/components/avatar/AvatarSheet';
import { Glyph } from '@/components/art/Glyph';
import { useHydrated } from '@/components/studio/useHydrated';
import { isBuiltAvatar, isPhoto } from '@/lib/avatar/avatar';
import { PHOTO_REWARD_COINS, PHOTO_REWARD_KEY } from '@/lib/avatar/client';
import { NETWORK_KEYS, type BuddiesPayload } from '@/lib/network';
import { fetcher } from '@/lib/swr';
import { playSound } from '@/lib/audio/lessonSounds';
import type { MyProfile } from './types';
import styles from './ProfileSetupCard.module.css';

const RING = 2 * Math.PI * 22;

export default function ProfileSetupCard({ onEditBio }: { onEditBio?: () => void }) {
  const hydrated = useHydrated();
  const me = useSWR<MyProfile>('/api/profile', fetcher);
  const buddies = useSWR<BuddiesPayload>(NETWORK_KEYS.buddies, fetcher, { revalidateOnFocus: false });
  const reward = useSWR<{ claimed: boolean }>(PHOTO_REWARD_KEY, fetcher, { revalidateOnFocus: false });
  const [sheet, setSheet] = useState(false);

  // Cached reads only after hydration, so server and client agree.
  const profile = hydrated ? me.data : undefined;
  const buddyData = hydrated ? buddies.data : undefined;
  if (!profile || !buddyData) return null;

  const avatar = profile.profile?.avatarUrl || profile.avatarUrl || null;
  const steps = [
    {
      id: 'photo',
      done: isPhoto(avatar),
      title: isBuiltAvatar(avatar) ? 'Swap your character for a photo' : 'Add a profile photo',
      sub: 'Classmates say yes to a real face',
      coins: reward.data?.claimed ? 0 : PHOTO_REWARD_COINS,
    },
    { id: 'buddy', done: buddyData.buddies.length > 0, title: 'Add a study buddy', sub: 'Pairs keep their streaks longer', coins: 0 },
    { id: 'bio', done: !!profile.profile?.bio?.trim(), title: 'Say a line about you', sub: 'What are you learning for?', coins: 0 },
  ];
  const done = steps.filter((s) => s.done).length;
  if (done === steps.length) return null;
  const next = steps.find((s) => !s.done)!;

  const action = (id: string) => {
    playSound('menuOpen');
    if (id === 'photo') setSheet(true);
  };

  return (
    <section className={styles.card} aria-label="Finish your profile">
      <header className={styles.head}>
        <span className={styles.ringWrap}>
          <svg viewBox="0 0 52 52" className={styles.ring} aria-hidden>
            <circle cx="26" cy="26" r="22" className={styles.ringTrack} />
            <circle
              cx="26"
              cy="26"
              r="22"
              className={styles.ringFill}
              strokeDasharray={RING}
              strokeDashoffset={RING * (1 - done / steps.length)}
            />
          </svg>
          <span className={styles.ringFace}>
            <Avatar src={avatar} seed={profile.id} name={profile.fullName ?? 'You'} px={36} />
          </span>
        </span>
        <span className={styles.headText}>
          <strong>Finish your profile</strong>
          <span>
            {done} of {steps.length} done · {next.sub}
          </span>
        </span>
      </header>

      <ul className={styles.steps}>
        {steps.map((s) => {
          const inner = (
            <>
              <span className={`${styles.check} ${s.done ? styles.checkDone : ''}`} aria-hidden>
                {s.done && <Glyph name="check" size={12} strokeWidth={3.5} />}
              </span>
              <span className={styles.stepTitle}>{s.title}</span>
              {!s.done && s.coins > 0 && <span className={styles.coins}>+{s.coins} Coins</span>}
              {!s.done && <Glyph name="chevron" size={16} className={styles.chev} />}
            </>
          );
          if (s.done) {
            return (
              <li key={s.id} className={`${styles.step} ${styles.stepDone}`}>
                {inner}
              </li>
            );
          }
          return (
            <li key={s.id}>
              {s.id === 'buddy' ? (
                <Link href="/dashboard/network" className={styles.step} onClick={() => playSound('navTap', 3)}>
                  {inner}
                </Link>
              ) : s.id === 'bio' && !onEditBio ? (
                <Link href="/dashboard/profile?edit=1" className={styles.step} onClick={() => playSound('navTap', 4)}>
                  {inner}
                </Link>
              ) : (
                <button
                  type="button"
                  className={styles.step}
                  onClick={() => (s.id === 'bio' ? onEditBio?.() : action(s.id))}
                >
                  {inner}
                </button>
              )}
            </li>
          );
        })}
      </ul>

      <AvatarSheet open={sheet} onClose={() => setSheet(false)} />
    </section>
  );
}
