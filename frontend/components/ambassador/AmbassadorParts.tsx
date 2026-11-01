'use client';

/**
 * Shared pieces of the ambassador programme UI (earn Pro with friends):
 * the friend slots, the Pro status line, the invite link + share buttons,
 * and the friends list with its nudge / cheer actions.
 */

import React, { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { Glyph } from '@/components/art/Glyph';
import { AvatarFill } from '@/components/ui/Avatar';
import { playSound } from '@/lib/audio/lessonSounds';
import { playHaptic } from '@/lib/haptics';
import {
  ambassadorApi,
  friendStateLabel,
  inviteUrl,
  type AmbassadorFriend,
  type AmbassadorMe,
} from '@/lib/ambassador';
import styles from './Ambassador.module.css';

const day = (iso: string) => new Date(iso).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' });

/** One slot per friend Pro needs: counting friends fill them, slipping ones are amber. */
export function FriendSlots({ me, large = false }: { me: AmbassadorMe; large?: boolean }) {
  const counting = me.friends
    .filter((f) => f.state === 'ACTIVE' || f.state === 'AT_RISK')
    .sort((a, b) => (a.state === b.state ? 0 : a.state === 'ACTIVE' ? -1 : 1));
  const n = Math.max(me.rules.friendsForPro, counting.length);
  return (
    <ul className={`${styles.slots} ${large ? styles.slotsLarge : ''}`} aria-label={`${counting.length} of ${me.rules.friendsForPro} friends learning`}>
      {Array.from({ length: n }, (_, i) => {
        const f = counting[i];
        if (!f) {
          return (
            <li key={`empty-${i}`} className={styles.slot} aria-hidden>
              <Glyph name="plus" size={large ? 18 : 14} strokeWidth={2.6} />
            </li>
          );
        }
        const risk = f.state === 'AT_RISK';
        return (
          <li key={f.id} className={`${styles.slot} ${risk ? styles.slotRisk : styles.slotOn}`} title={risk ? `${f.name} is slipping` : `${f.name} is learning`}>
            <span className={styles.slotFace}>
              <AvatarFill src={f.avatarUrl} seed={f.id} name={f.name} />
            </span>
            {risk && (
              <span className={styles.slotWarn} aria-hidden>
                <Glyph name="alert" size={10} strokeWidth={3} />
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

/** The one line that says where their Pro stands. */
export function ProStatus({ me }: { me: AmbassadorMe }) {
  const { pro, counts, rules } = me;
  if (pro.active && pro.graceUntil) {
    return (
      <p className={`${styles.status} ${styles.statusGrace}`} role="status">
        <Glyph name="hourglass" size={16} strokeWidth={2.6} />
        Bring {counts.needed === 1 ? 'one friend' : `${counts.needed} friends`} back by {day(pro.graceUntil)} to keep Pro
      </p>
    );
  }
  if (pro.active) {
    return (
      <p className={`${styles.status} ${styles.statusOn}`} role="status">
        <Glyph name="checkCircle" size={16} strokeWidth={2.6} />
        Pro is on. {counts.active} friends are learning with you
      </p>
    );
  }
  return (
    <p className={styles.status} role="status">
      <Glyph name="users" size={16} strokeWidth={2.6} />
      {counts.active} of {rules.friendsForPro} friends learning · {counts.needed} more for Pro
    </p>
  );
}

export function InviteShare({ me, compact = false }: { me: AmbassadorMe; compact?: boolean }) {
  const [copied, setCopied] = useState(false);
  const link = inviteUrl(me.path);
  const message = `I'm learning on Teyro and want you with me. Short daily lessons, and we keep each other going: ${link}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      playSound('toggleOn');
      playHaptic('success', false);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      playSound('nodeLocked');
    }
  };

  const share = async () => {
    playSound('navTap', 3);
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Learn with me on Teyro', text: message, url: link });
      } catch {
        // Cancelled.
      }
    } else {
      await copy();
    }
  };

  if (compact) {
    return (
      <button type="button" className={`${styles.tactile} ${styles.tactileWide}`} onClick={() => void copy()}>
        <Glyph name={copied ? 'check' : 'copy'} size={16} strokeWidth={2.75} />
        {copied ? 'Link copied' : 'Copy my invite link'}
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className={styles.linkBox}>
        <span className={styles.linkText}>{link.replace(/^https?:\/\//, '')}</span>
        <button type="button" className={`${styles.tactile} ${styles.tactileSmall}`} onClick={() => void copy()}>
          <Glyph name={copied ? 'check' : 'copy'} size={14} strokeWidth={2.75} />
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <div className={styles.shareRow}>
        <a
          className={`${styles.tactile} ${styles.whatsapp}`}
          href={`https://wa.me/?text=${encodeURIComponent(message)}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => playSound('navTap', 2)}
        >
          <FaWhatsapp size={18} aria-hidden="true" /> WhatsApp
        </a>
        <button type="button" className={styles.tactile} onClick={() => void share()}>
          <Glyph name="share" size={16} strokeWidth={2.75} /> Share
        </button>
      </div>
    </div>
  );
}

const PILL: Record<AmbassadorFriend['state'], string> = {
  LEARNING: '',
  ACTIVE: styles.pillActive,
  AT_RISK: styles.pillRisk,
  INACTIVE: styles.pillInactive,
};

function friendLine(f: AmbassadorFriend, me: AmbassadorMe): string {
  if (f.state === 'LEARNING') {
    const days = Math.max(0, me.rules.qualifyStreak - f.streakDays);
    return f.lessonsDone >= me.rules.qualifyLessons
      ? `${days} more ${days === 1 ? "day" : "days"} in a row and they count`
      : `Counts after ${me.rules.qualifyLessons} lessons and a ${me.rules.qualifyStreak}-day streak`;
  }
  if (f.state === 'INACTIVE') return `No lesson in ${me.rules.activeDays}+ days. A nudge can bring them back.`;
  if (f.learnedToday) return 'Learned today';
  if (f.countsUntil) return `Counts until ${day(f.countsUntil)} unless they learn`;
  return 'Learning';
}

/** Friends, with the one action that helps each of them keep going. */
export function FriendList({ me, onChanged, limit }: { me: AmbassadorMe; onChanged: () => void; limit?: number }) {
  const [busy, setBusy] = useState<string | null>(null);
  const [sent, setSent] = useState<Record<string, 'NUDGE' | 'CHEER'>>({});
  const [error, setError] = useState<string | null>(null);
  // Slipping friends first: they're the ones who need you today.
  const order: Record<AmbassadorFriend['state'], number> = { AT_RISK: 0, INACTIVE: 1, LEARNING: 2, ACTIVE: 3 };
  const friends = [...me.friends].sort((a, b) => order[a.state] - order[b.state]).slice(0, limit);

  const send = async (f: AmbassadorFriend, kind: 'NUDGE' | 'CHEER') => {
    setBusy(f.id);
    setError(null);
    try {
      await ambassadorApi.encourage(f.id, kind);
      setSent((s) => ({ ...s, [f.id]: kind }));
      playSound('toggleOn');
      playHaptic('success', false);
      onChanged();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'That did not send.');
      playSound('nodeLocked');
    } finally {
      setBusy(null);
    }
  };

  return (
    <>
      <ul className={styles.friends}>
        {friends.map((f) => {
          const done = sent[f.id];
          return (
            <li key={f.id} className={styles.friend}>
              <span className={styles.friendFace}>
                <AvatarFill src={f.avatarUrl} seed={f.id} name={f.name} />
              </span>
              <span className={styles.friendText}>
                <span className={styles.friendName}>{f.name}</span>
                <span className={`${styles.pill} ${PILL[f.state]}`}>{friendStateLabel(f, me.rules)}</span>
                <span className={styles.friendSub}>{friendLine(f, me)}</span>
              </span>
              {done ? (
                <span className={styles.sent}>{done === 'NUDGE' ? 'Nudged' : 'Cheered'}</span>
              ) : f.canNudge ? (
                <button
                  type="button"
                  className={`${styles.tactile} ${styles.tactileSmall}`}
                  disabled={busy === f.id}
                  onClick={() => void send(f, 'NUDGE')}
                >
                  <Glyph name="bellRing" size={14} strokeWidth={2.75} /> Nudge
                </button>
              ) : f.canCheer ? (
                <button
                  type="button"
                  className={`${styles.tactile} ${styles.tactileSmall}`}
                  disabled={busy === f.id}
                  onClick={() => void send(f, 'CHEER')}
                >
                  <Glyph name="party" size={14} strokeWidth={2.75} /> Cheer
                </button>
              ) : (
                <span className={styles.sent}>{f.learnedToday ? 'Cheered' : 'Nudged'}</span>
              )}
            </li>
          );
        })}
      </ul>
      {error && (
        <p className={styles.toast} role="alert">
          {error}
        </p>
      )}
    </>
  );
}
