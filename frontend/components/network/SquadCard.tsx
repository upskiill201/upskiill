'use client';

/**
 * Your squad: 3–6 people, one weekly lesson goal, a chest each when you hit
 * it. Start one, join one from a link (?squad=code), see who's pulled their
 * weight this week, invite buddies, or leave.
 */

import React from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import { Glyph } from '@/components/art/Glyph';
import Avatar from '@/components/ui/Avatar';
import { useHydrated } from '@/components/studio/useHydrated';
import { fetcher } from '@/lib/swr';
import { playSound } from '@/lib/audio/lessonSounds';
import { playHaptic } from '@/lib/haptics';
import {
  NETWORK_KEYS,
  createSquad,
  inviteToSquad,
  joinSquad,
  leaveSquad,
  squadLink,
  useRefreshNetwork,
  type Buddy,
  type SquadData,
} from '@/lib/network';
import styles from './Network.module.css';

export default function SquadCard({ joinCode, buddies }: { joinCode: string | null; buddies: Buddy[] }) {
  const res = useSWR<{ squad: SquadData | null }>(NETWORK_KEYS.squad, fetcher, { revalidateOnFocus: true });
  const hydrated = useHydrated();
  const data = hydrated ? res.data : undefined;

  if (res.error && !data && hydrated) return <p className={styles.mutedLine}>Couldn&apos;t load your squad.</p>;
  if (!data) {
    return (
      <div className={`${styles.personRow} ${styles.skeleton}`}>
        <span className={styles.skelCircle} />
        <span className={styles.skelLine} style={{ width: '50%' }} />
      </div>
    );
  }
  if (!data.squad) return <NoSquad joinCode={joinCode} onDone={(s) => void res.mutate({ squad: s }, { revalidate: false })} />;
  return <SquadView squad={data.squad} buddies={buddies} onLeft={() => void res.mutate({ squad: null }, { revalidate: false })} />;
}

function NoSquad({ joinCode, onDone }: { joinCode: string | null; onDone: (s: SquadData) => void }) {
  const preview = useSWR<{ name: string; weeklyGoal: number; members: number; max: number }>(
    joinCode ? NETWORK_KEYS.squadPreview(joinCode) : null,
    fetcher,
    { revalidateOnFocus: false },
  );
  const [name, setName] = React.useState('');
  const [goal, setGoal] = React.useState(15);
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const run = async (fn: () => Promise<{ squad: SquadData }>) => {
    setBusy(true);
    setError(null);
    try {
      const r = await fn();
      playSound('courseUnlocked');
      playHaptic('success', false);
      onDone(r.squad);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong.');
      playSound('nodeLocked');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className={styles.squadEmpty}>
      {joinCode && preview.data && (
        <div className={styles.squadInvite}>
          <span className={styles.personText}>
            <span className={styles.personName}>Join {preview.data.name}</span>
            <span className={styles.personSub}>
              {preview.data.members} of {preview.data.max} members · {preview.data.weeklyGoal} lessons a week together
            </span>
          </span>
          <button
            type="button"
            className={styles.pillPrimary}
            disabled={busy || preview.data.members >= preview.data.max}
            onClick={() => void run(() => joinSquad(joinCode))}
          >
            {preview.data.members >= preview.data.max ? 'Full' : 'Join squad'}
          </button>
        </div>
      )}
      {joinCode && preview.error && <p className={styles.mutedLine}>That squad link isn&apos;t valid any more.</p>}

      <p className={styles.mutedLine}>
        A squad is 3 to 6 people with one weekly lesson goal. Hit it together and everyone gets a chest.
      </p>
      <form
        className={styles.squadForm}
        onSubmit={(e) => {
          e.preventDefault();
          if (name.trim().length >= 2) void run(() => createSquad(name.trim(), goal));
        }}
      >
        <label className={styles.field}>
          <span>Squad name</span>
          <input value={name} maxLength={40} placeholder="The Late-Night Coders" onChange={(e) => setName(e.target.value)} />
        </label>
        <label className={styles.field}>
          <span>Lessons a week, together</span>
          <input type="number" min={5} max={200} value={goal} onChange={(e) => setGoal(Math.max(5, Math.min(200, Number(e.target.value) || 5)))} />
        </label>
        <button type="submit" className={styles.pillPrimary} disabled={busy || name.trim().length < 2}>
          <Glyph name="users" size={14} strokeWidth={2.8} /> Start a squad
        </button>
      </form>
      {error && <p className={styles.formError}>{error}</p>}
    </div>
  );
}

function SquadView({ squad, buddies, onLeft }: { squad: SquadData; buddies: Buddy[]; onLeft: () => void }) {
  const refresh = useRefreshNetwork();
  const [invited, setInvited] = React.useState<Record<string, boolean>>({});
  const [copied, setCopied] = React.useState(false);
  const [confirmLeave, setConfirmLeave] = React.useState(false);
  const pct = Math.min(100, Math.round((squad.lessonsThisWeek / squad.weeklyGoal) * 100));
  const left = Math.max(0, squad.weeklyGoal - squad.lessonsThisWeek);
  const memberIds = new Set(squad.members.map((m) => m.id));
  const invitable = buddies.filter((b) => !memberIds.has(b.id));
  const full = squad.members.length >= squad.max;

  const share = async () => {
    const link = squadLink(window.location.origin, squad.inviteCode);
    try {
      if (navigator.share) {
        await navigator.share({ title: `Join ${squad.name} on Teyro`, url: link });
        return;
      }
      await navigator.clipboard.writeText(link);
      setCopied(true);
      playSound('toggleOn');
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* dismissed */
    }
  };

  return (
    <div className={styles.squadBox}>
      <div className={styles.squadHead}>
        <span className={styles.squadName}>{squad.name}</span>
        <span className={styles.countMuted}>
          {squad.members.length}/{squad.max}
        </span>
      </div>

      <div className={styles.squadProgress} aria-label={`${squad.lessonsThisWeek} of ${squad.weeklyGoal} lessons this week`}>
        <div className={styles.squadTrack}>
          <div className={`${styles.squadFill} ${squad.goalMet ? styles.squadFillDone : ''}`} style={{ width: `${pct}%` }} />
        </div>
        <span className={styles.squadCount}>
          {squad.lessonsThisWeek}/{squad.weeklyGoal}
        </span>
      </div>
      <p className={styles.mutedLine}>
        {squad.goalMet ? (
          <>
            Goal hit this week. <Link href="/dashboard/quests">Open your squad chest</Link>.
          </>
        ) : (
          `${left} more ${left === 1 ? 'lesson' : 'lessons'} this week and everyone gets a chest.`
        )}
      </p>

      <ul className={styles.squadMembers}>
        {squad.members.map((m) => (
          <li key={m.id} className={styles.personRow}>
            <Link href={m.isMe ? '/dashboard/profile' : `/dashboard/u/${encodeURIComponent(m.id)}`} className={styles.personMain}>
              <span className={`${styles.faceRing} ${m.live ? styles.faceRingLive : m.learnedToday ? styles.faceRingDone : ''}`}>
                <Avatar size="sm" src={m.avatar ?? undefined} name={m.name} />
              </span>
              <span className={styles.personText}>
                <span className={styles.personName}>
                  {m.isMe ? 'You' : m.name}
                  {m.role === 'OWNER' && <span className={styles.ownerTag}>Owner</span>}
                </span>
                <span className={styles.personSub}>{m.live ? 'Learning now' : m.learnedToday ? 'Learned today' : 'Not yet today'}</span>
              </span>
            </Link>
            <span className={styles.squadLessons}>{m.lessonsThisWeek}</span>
          </li>
        ))}
      </ul>

      {!full && invitable.length > 0 && (
        <>
          <p className={styles.subLabel}>Invite a buddy</p>
          <div className={styles.inviteChips}>
            {invitable.map((b) => (
              <button
                key={b.id}
                type="button"
                className={invited[b.id] ? styles.pillDone : styles.pillGhost}
                disabled={invited[b.id]}
                onClick={() => {
                  setInvited((s) => ({ ...s, [b.id]: true }));
                  playSound('toggleOn');
                  inviteToSquad(b.id).catch(() => setInvited((s) => ({ ...s, [b.id]: false })));
                }}
              >
                {invited[b.id] ? <Glyph name="check" size={14} strokeWidth={3} /> : <Glyph name="userPlus" size={14} strokeWidth={2.8} />}
                {b.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </>
      )}

      <div className={styles.squadActions}>
        {!full && (
          <button type="button" className={styles.pillPrimary} onClick={() => void share()}>
            <Glyph name={copied ? 'check' : 'share'} size={14} strokeWidth={2.8} /> {copied ? 'Link copied' : 'Share squad link'}
          </button>
        )}
        {confirmLeave ? (
          <>
            <button
              type="button"
              className={styles.pillDanger}
              onClick={() => {
                onLeft();
                void leaveSquad().finally(() => void refresh());
              }}
            >
              Leave {squad.name}
            </button>
            <button type="button" className={styles.pillGhost} onClick={() => setConfirmLeave(false)}>
              Stay
            </button>
          </>
        ) : (
          <button type="button" className={styles.pillGhost} onClick={() => setConfirmLeave(true)}>
            Leave squad
          </button>
        )}
      </div>
    </div>
  );
}
