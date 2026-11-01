'use client';

/**
 * Duels on the buddies page: your turn, their turn, and the week's results —
 * plus the picker a buddy row opens to start one on a lesson you've both
 * passed.
 */

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { Glyph } from '@/components/art/Glyph';
import { useHydrated } from '@/components/studio/useHydrated';
import { fetcher } from '@/lib/swr';
import { playSound } from '@/lib/audio/lessonSounds';
import { NETWORK_KEYS, createDuel, type DuelSummary } from '@/lib/network';
import styles from './Network.module.css';

function verdict(d: DuelSummary): string {
  if (d.status === 'EXPIRED') return 'Ran out of time';
  if (d.status !== 'DONE') return d.myTurn ? 'Your turn' : `Waiting for ${d.other.name.split(' ')[0]}`;
  const me = d.myScore ?? 0;
  const them = d.theirScore ?? 0;
  return me > them ? `You won ${me}–${them}` : me < them ? `You lost ${me}–${them}` : `Tied ${me}–${them}`;
}

export function DuelsList() {
  const res = useSWR<{ duels: DuelSummary[] }>(NETWORK_KEYS.duels, fetcher, { revalidateOnFocus: true });
  const hydrated = useHydrated();
  const data = hydrated ? res.data : undefined;
  if (res.error && !data && hydrated) return <p className={styles.mutedLine}>Couldn&apos;t load your duels.</p>;
  if (!data) return null;
  if (data.duels.length === 0) {
    return <p className={styles.mutedLine}>Challenge a buddy on a lesson you&apos;ve both finished. Same questions, best score wins.</p>;
  }
  return (
    <div className={styles.personList}>
      {data.duels.map((d) => (
        <Link key={d.id} href={`/dashboard/network/duel/${d.id}`} className={styles.duelRow} onClick={() => playSound('navTap', 1)}>
          <span className={`${styles.duelIcon} ${d.myTurn ? styles.duelIconTurn : ''}`}>
            <Glyph name="bolt" size={18} strokeWidth={2.6} />
          </span>
          <span className={styles.personText}>
            <span className={styles.personName}>vs {d.other.name}</span>
            <span className={styles.personSub}>{d.lessonTitle}</span>
          </span>
          <span className={d.myTurn ? styles.pillPrimary : styles.duelVerdict}>{d.myTurn ? 'Play' : verdict(d)}</span>
        </Link>
      ))}
    </div>
  );
}

export function DuelPicker({ buddyId, buddyName, onClose }: { buddyId: string; buddyName: string; onClose: () => void }) {
  const router = useRouter();
  const res = useSWR<{ lessons: { lessonId: string; title: string; courseTitle: string; questions: number }[] }>(
    NETWORK_KEYS.duelOptions(buddyId),
    fetcher,
    { revalidateOnFocus: false },
  );
  const [busy, setBusy] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const start = async (lessonId: string) => {
    setBusy(lessonId);
    setError(null);
    playSound('select');
    try {
      const { id } = await createDuel(buddyId, lessonId);
      router.push(`/dashboard/network/duel/${id}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not start the duel.');
      setBusy(null);
      playSound('nodeLocked');
    }
  };

  return (
    <div className={styles.duelPicker}>
      <div className={styles.duelPickerHead}>
        <span className={styles.personName}>Challenge {buddyName.split(' ')[0]} on…</span>
        <button type="button" className={styles.iconBtn} aria-label="Close" onClick={onClose}>
          <Glyph name="close" size={16} />
        </button>
      </div>
      {!res.data ? (
        <span className={styles.mutedLine}>{res.error ? 'Could not load lessons.' : 'Finding lessons you both finished…'}</span>
      ) : res.data.lessons.length === 0 ? (
        <span className={styles.mutedLine}>No lesson you&apos;ve both finished has questions yet. Learn the same lesson, then duel.</span>
      ) : (
        <div className={styles.duelLessons}>
          {res.data.lessons.map((l) => (
            <button key={l.lessonId} type="button" className={styles.duelLesson} disabled={!!busy} onClick={() => void start(l.lessonId)}>
              <span className={styles.personText}>
                <span className={styles.personName}>{l.title}</span>
                <span className={styles.personSub}>{l.courseTitle}</span>
              </span>
              <Glyph name={busy === l.lessonId ? 'spinner' : 'chevron'} size={16} />
            </button>
          ))}
        </div>
      )}
      {error && <p className={styles.formError}>{error}</p>}
    </div>
  );
}
