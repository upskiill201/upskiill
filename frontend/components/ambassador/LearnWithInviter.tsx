'use client';

/**
 * The invited friend's side: "Learn with Ada". One tap makes them study
 * buddies and seats them in Ada's crew (when there's room and they aren't in
 * a squad). Their tap is the consent: nobody is put in a squad on a visit.
 * Shown for 30 days after joining, until they're together or dismiss it.
 */

import React, { useState } from 'react';
import useSWR from 'swr';
import { Glyph } from '@/components/art/Glyph';
import { AvatarFill } from '@/components/ui/Avatar';
import { useHydrated } from '@/components/studio/useHydrated';
import { fetcher } from '@/lib/swr';
import { celebrationHaptic } from '@/lib/haptics';
import { ambassadorApi, type InviterStatus } from '@/lib/ambassador';
import styles from './Ambassador.module.css';

const DISMISS_KEY = 'teyro_learn_with_dismissed';

function dismissed(): boolean {
  try {
    return window.localStorage.getItem(DISMISS_KEY) === '1';
  } catch {
    return false;
  }
}

export default function LearnWithInviter() {
  const hydrated = useHydrated();
  const { data, mutate } = useSWR<InviterStatus>('/api/ambassador/inviter', fetcher, { revalidateOnFocus: false });
  const [hidden, setHidden] = useState(false);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!hydrated || hidden || dismissed() || !data?.inviter) return null;
  const { inviter, together } = data;
  if (!done && together?.buddies && together.squad) return null;

  const go = async () => {
    setBusy(true);
    setError(null);
    try {
      const res = await ambassadorApi.learnWith();
      celebrationHaptic('soft');
      setDone(res.squad ? `You're in ${res.squad} with ${inviter.firstName}.` : `You and ${inviter.firstName} are study buddies now.`);
      void mutate();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'That did not work. Try again.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className={styles.card} aria-label={`Learn with ${inviter.firstName}`}>
      <div className="flex items-center gap-3">
        <span className={styles.friendFace} style={{ width: 48, height: 48 }}>
          <AvatarFill src={inviter.avatarUrl} seed={inviter.id} name={inviter.firstName} />
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <h3 className={styles.title}>{done ? 'Learning together' : `Learn with ${inviter.firstName}`}</h3>
          <p className={styles.sub}>
            {done ??
              `${inviter.firstName} invited you. ${inviter.squadName ? `Join ${inviter.squadName} and` : 'Become study buddies and'} keep each other going.`}
          </p>
        </div>
        {!done && (
          <button
            type="button"
            className={styles.linkBtn}
            aria-label="Hide"
            onClick={() => {
              try {
                window.localStorage.setItem(DISMISS_KEY, '1');
              } catch {
                // Storage blocked: hide for this visit only.
              }
              setHidden(true);
            }}
          >
            <Glyph name="close" size={16} strokeWidth={2.8} />
          </button>
        )}
      </div>
      {!done && (
        <button type="button" className={`${styles.tactile} ${styles.tactileWide}`} disabled={busy} onClick={() => void go()}>
          {busy ? 'One moment…' : `Learn with ${inviter.firstName}`}
        </button>
      )}
      {error && (
        <p className={styles.toast} role="alert">
          {error}
        </p>
      )}
    </section>
  );
}
