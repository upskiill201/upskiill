'use client';

/**
 * "Find me a study buddy": one tap, the server scores every classmate
 * (same course and week, time zone, pace, recently active, learning hour)
 * and asks the best one — then says why it picked them.
 */

import React from 'react';
import Link from 'next/link';
import { Glyph } from '@/components/art/Glyph';
import Avatar from '@/components/ui/Avatar';
import { playSound } from '@/lib/audio/lessonSounds';
import { playHaptic } from '@/lib/haptics';
import { findBuddyMatch, useRefreshNetwork, type MatchResult } from '@/lib/network';
import styles from './Network.module.css';

function why(reasons: string[]): string {
  if (reasons.length === 0) return 'They learn the same course as you.';
  const list = reasons.length === 1 ? reasons[0] : `${reasons.slice(0, -1).join(', ')} and ${reasons[reasons.length - 1]}`;
  return `They're ${list}.`;
}

export default function FindBuddy() {
  const refresh = useRefreshNetwork();
  const [state, setState] = React.useState<'idle' | 'busy' | 'done' | 'error'>('idle');
  const [match, setMatch] = React.useState<MatchResult | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const find = async () => {
    setState('busy');
    playSound('menuOpen');
    try {
      const m = await findBuddyMatch();
      setMatch(m);
      setState('done');
      playSound('toggleOn');
      playHaptic('success', false);
      void refresh(m.person.id);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'No match right now.');
      setState('error');
      playSound('nodeLocked');
    }
  };

  if (state === 'done' && match) {
    const first = match.person.name.split(' ')[0];
    return (
      <div className={styles.matchCard} role="status">
        <Link href={`/dashboard/u/${encodeURIComponent(match.person.id)}`} className={styles.personMain}>
          <Avatar size="md" src={match.person.avatar ?? undefined} name={match.person.name} />
          <span className={styles.personText}>
            <span className={styles.personName}>
              {match.relation.status === 'BUDDIES' ? `You and ${first} are buddies` : `We asked ${first} for you`}
            </span>
            <span className={styles.matchWhy}>{why(match.reasons)}</span>
          </span>
        </Link>
        <span className={styles.pillDone}>
          <Glyph name="check" size={14} strokeWidth={3} /> {match.relation.status === 'BUDDIES' ? 'Buddies' : 'Asked'}
        </span>
      </div>
    );
  }

  return (
    <div className={styles.findRow}>
      <button type="button" className={styles.findBtn} disabled={state === 'busy'} onClick={() => void find()}>
        <Glyph name={state === 'busy' ? 'spinner' : 'sparkle'} size={18} strokeWidth={2.6} />
        {state === 'busy' ? 'Finding your match…' : 'Find me a study buddy'}
      </button>
      {state === 'error' && error && <p className={styles.mutedLine}>{error}</p>}
    </div>
  );
}
