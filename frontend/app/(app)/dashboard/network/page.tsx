'use client';

/**
 * Your network — study buddies (shared streak, nudge), requests, people you
 * may know, and your invite link. docs/TEYRO_NETWORK_PLAN.md, phase 1.
 *
 * Every action is optimistic and every read is SWR-cached, so the page
 * paints instantly on return and taps never wait on the network.
 */

import React, { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import useSWR from 'swr';
import { Glyph } from '@/components/art/Glyph';
import Avatar from '@/components/ui/Avatar';
import Button from '@/components/ui/Button';
import SuggestionList from '@/components/network/SuggestionList';
import FindBuddy from '@/components/network/FindBuddy';
import CohortList from '@/components/network/CohortList';
import BuddyReminderAsk from '@/components/network/BuddyReminderAsk';
import SquadCard from '@/components/network/SquadCard';
import { DuelPicker, DuelsList } from '@/components/network/Duels';
import { useHydrated } from '@/components/studio/useHydrated';
import styles from '@/components/network/Network.module.css';
import { fetcher } from '@/lib/swr';
import { playSound } from '@/lib/audio/lessonSounds';
import { playHaptic } from '@/lib/haptics';
import { getCachedUser } from '@/lib/user-cache';
import {
  NETWORK_KEYS,
  inviteLink,
  nudgeBuddy,
  removeBuddy,
  requestBuddy,
  useRefreshNetwork,
  type Buddy,
  type BuddiesPayload,
  type Relation,
} from '@/lib/network';

export default function NetworkPage() {
  return (
    <Suspense fallback={null}>
      <NetworkInner />
    </Suspense>
  );
}

function NetworkInner() {
  const params = useSearchParams();
  const invite = params.get('invite');
  const inviteCourse = params.get('course');
  const squadCode = params.get('squad');
  const swr = useSWR<BuddiesPayload>(NETWORK_KEYS.buddies, fetcher, { revalidateOnFocus: true });
  // Cache + localStorage exist only on the client: read them after hydration.
  const hydrated = useHydrated();
  const data = { ...swr, data: hydrated ? swr.data : undefined };
  const me = hydrated ? getCachedUser() : null;

  const buddies = data.data?.buddies ?? [];
  const incoming = data.data?.incoming ?? [];
  const outgoing = data.data?.outgoing ?? [];
  const max = data.data?.max ?? 5;

  // Every action paints instantly, then reconciles with the server.
  const refresh = useRefreshNetwork();
  const change = async (userId: string, local: (d: BuddiesPayload) => BuddiesPayload, call: () => Promise<unknown>) => {
    if (swr.data) void swr.mutate(local(swr.data), { revalidate: false });
    try {
      await call();
    } catch {
      playSound('nodeLocked');
    } finally {
      void refresh(userId);
    }
  };
  const drop = (id: string) => (d: BuddiesPayload) => ({
    ...d,
    buddies: d.buddies.filter((b) => b.id !== id),
    incoming: d.incoming.filter((p) => p.id !== id),
    outgoing: d.outgoing.filter((p) => p.id !== id),
  });
  // After gaining a buddy: the best moment to ask for notifications.
  const [askFor, setAskFor] = React.useState<string | null>(null);
  const accept = (id: string) => {
    playSound('toggleOn');
    playHaptic('success', false);
    const name = incoming.find((p) => p.id === id)?.name.split(' ')[0] ?? 'Your buddy';
    void change(
      id,
      (d) => {
        const p = d.incoming.find((x) => x.id === id);
        const added: Buddy[] = p
          ? [{ ...p, since: new Date().toISOString(), streakTogether: 0, learnedToday: false, nudgedToday: false, canNudge: true }]
          : [];
        return { ...drop(id)(d), buddies: [...d.buddies, ...added] };
      },
      () => requestBuddy(id).then(() => setAskFor(name)),
    );
  };
  const remove = (id: string) => void change(id, drop(id), () => removeBuddy(id));

  return (
    <div className={styles.page}>
      <header className={styles.pageHead}>
        <Link href="/dashboard/feed" className={styles.backLink} onClick={() => playSound('navTap', 1)}>
          <Glyph name="back" size={18} strokeWidth={2.8} /> Community
        </Link>
        <h1 className={styles.pageTitle}>Study buddies</h1>
        <p className={styles.pageSub}>
          Up to {max} people who keep you learning. Learn on the same day to grow your buddy streak.
        </p>
      </header>

      {hydrated && invite && me?.id !== invite && <InviteCard inviterId={invite} courseId={inviteCourse} />}

      {data.error && !data.data && hydrated ? (
        <div className={styles.errorBox}>
          <Glyph name="alert" size={26} />
          <span>Couldn&apos;t load your buddies.</span>
          <Button variant="outline" onClick={() => void data.mutate()}>
            Try again
          </Button>
        </div>
      ) : !data.data ? (
        <section className={styles.section}>
          <div className={styles.personList}>
            {[0, 1].map((i) => (
              <div key={i} className={`${styles.personRow} ${styles.skeleton}`}>
                <span className={styles.skelCircle} />
                <span className={styles.skelLine} style={{ width: '45%' }} />
              </div>
            ))}
          </div>
        </section>
      ) : (
        <>
          {incoming.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                Requests <span className={styles.countPill}>{incoming.length}</span>
              </h2>
              <div className={styles.personList}>
                {incoming.map((p) => (
                  <RequestRow
                    key={p.id}
                    id={p.id}
                    name={p.name}
                    avatar={p.avatar}
                    full={buddies.length >= max}
                    onAccept={() => accept(p.id)}
                    onDecline={() => remove(p.id)}
                  />
                ))}
              </div>
            </section>
          )}

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              Your buddies <span className={styles.countMuted}>{buddies.length}/{max}</span>
            </h2>
            {buddies.length === 0 ? (
              <p className={styles.mutedLine}>No buddies yet. Pick someone below, or send your invite link to a friend.</p>
            ) : (
              <div className={styles.personList}>
                {buddies.map((b) => (
                  <BuddyRow key={b.id} buddy={b} onRemove={() => remove(b.id)} />
                ))}
              </div>
            )}
            {outgoing.length > 0 && (
              <>
                <p className={styles.subLabel}>Waiting for an answer</p>
                <div className={styles.personList}>
                  {outgoing.map((p) => (
                    <div key={p.id} className={styles.personRow}>
                      <Link href={`/dashboard/u/${encodeURIComponent(p.id)}`} className={styles.personMain}>
                        <Avatar size="sm" src={p.avatar ?? undefined} name={p.name} />
                        <span className={styles.personText}>
                          <span className={styles.personName}>{p.name}</span>
                          <span className={styles.personSub}>Request sent</span>
                        </span>
                      </Link>
                      <button type="button" className={styles.pillGhost} onClick={() => remove(p.id)}>
                        Cancel
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Your squad</h2>
            <SquadCard joinCode={squadCode} buddies={buddies} />
          </section>

          {buddies.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Duels</h2>
              <DuelsList />
            </section>
          )}

          {buddies.length < max && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>People you may know</h2>
              <FindBuddy />
              <SuggestionList />
            </section>
          )}

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Your cohort</h2>
            <CohortList />
          </section>
        </>
      )}

      {me?.id && <InviteLinkCard userId={me.id} />}

      {askFor && <BuddyReminderAsk buddyName={askFor} onDone={() => setAskFor(null)} />}
    </div>
  );
}

function BuddyRow({ buddy, onRemove }: { buddy: Buddy; onRemove: () => void }) {
  const [nudge, setNudge] = React.useState<'idle' | 'sent' | 'error'>(buddy.nudgedToday ? 'sent' : 'idle');
  const [confirmRemove, setConfirmRemove] = React.useState(false);
  const [duelOpen, setDuelOpen] = React.useState(false);

  const send = async () => {
    setNudge('sent');
    playSound('toggleOn');
    playHaptic('medium', false);
    try {
      await nudgeBuddy(buddy.id);
    } catch {
      setNudge('error');
      playSound('nodeLocked');
    }
  };

  return (
    <div className={styles.buddyBlock}>
    <div className={styles.personRow}>
      <Link href={`/dashboard/u/${encodeURIComponent(buddy.id)}`} className={styles.personMain}>
        <span className={`${styles.faceRing} ${buddy.live ? styles.faceRingLive : buddy.learnedToday ? styles.faceRingDone : ''}`}>
          <Avatar size="sm" src={buddy.avatar ?? undefined} name={buddy.name} />
        </span>
        <span className={styles.personText}>
          <span className={styles.personName}>{buddy.name}</span>
          <span className={`${styles.personSub} ${buddy.live ? styles.liveText : ''}`}>
            {buddy.live
              ? `Learning now${buddy.liveLesson ? ` · ${buddy.liveLesson}` : ''}`
              : buddy.learnedToday
                ? 'Learned today'
                : 'Not yet today'}
          </span>
        </span>
      </Link>
      <span className={`${styles.sharedStreak} ${buddy.streakTogether > 0 ? '' : styles.sharedStreakOut}`} title="Days you both learned in a row">
        <Image src="/Icons/burn.png" alt="" width={18} height={18} /> {buddy.streakTogether}
      </span>
      {confirmRemove ? (
        <span className={styles.confirmRow}>
          <button type="button" className={styles.pillDanger} onClick={onRemove}>
            Remove
          </button>
          <button type="button" className={styles.pillGhost} onClick={() => setConfirmRemove(false)}>
            Keep
          </button>
        </span>
      ) : (
        <>
          {buddy.learnedToday ? (
            <span className={styles.pillDone}>
              <Glyph name="check" size={14} strokeWidth={3} /> Done
            </span>
          ) : (
            <button
              type="button"
              className={nudge === 'sent' ? styles.pillDone : styles.pillPrimary}
              disabled={nudge === 'sent'}
              onClick={() => void send()}
            >
              {nudge === 'sent' ? 'Nudged' : nudge === 'error' ? 'Try again' : (
                <>
                  <Glyph name="bellRing" size={14} strokeWidth={2.8} /> Nudge
                </>
              )}
            </button>
          )}
          <button
            type="button"
            className={`${styles.iconBtn} ${duelOpen ? styles.iconBtnOn : ''}`}
            aria-label={`Challenge ${buddy.name} to a duel`}
            aria-expanded={duelOpen}
            onClick={() => {
              playSound('select');
              setDuelOpen((v) => !v);
            }}
          >
            <Glyph name="bolt" size={16} strokeWidth={2.6} />
          </button>
          <button type="button" className={styles.iconBtn} aria-label={`Remove ${buddy.name}`} onClick={() => setConfirmRemove(true)}>
            <Glyph name="moreVertical" size={16} />
          </button>
        </>
      )}
    </div>
    {duelOpen && <DuelPicker buddyId={buddy.id} buddyName={buddy.name} onClose={() => setDuelOpen(false)} />}
    </div>
  );
}

function RequestRow({
  id,
  name,
  avatar,
  full,
  onAccept,
  onDecline,
}: {
  id: string;
  name: string;
  avatar: string | null;
  full: boolean;
  onAccept: () => void;
  onDecline: () => void;
}) {
  return (
    <div className={styles.personRow}>
      <Link href={`/dashboard/u/${encodeURIComponent(id)}`} className={styles.personMain}>
        <Avatar size="sm" src={avatar ?? undefined} name={name} />
        <span className={styles.personText}>
          <span className={styles.personName}>{name}</span>
          <span className={styles.personSub}>{full ? 'Your buddy list is full' : 'Wants to be your study buddy'}</span>
        </span>
      </Link>
      <button type="button" className={styles.pillPrimary} disabled={full} onClick={onAccept}>
        Accept
      </button>
      <button type="button" className={styles.pillGhost} onClick={onDecline}>
        Decline
      </button>
    </div>
  );
}

/** Landed from a friend's invite link: their card, one tap to connect. */
function InviteCard({ inviterId, courseId }: { inviterId: string; courseId: string | null }) {
  const profile = useSWR<{ fullName: string; avatarUrl: string | null }>(`/api/social/users/${encodeURIComponent(inviterId)}`, fetcher, {
    revalidateOnFocus: false,
  });
  const tl = useSWR<{ relation: Relation }>(NETWORK_KEYS.timeline(inviterId), fetcher, { revalidateOnFocus: false });
  const refresh = useRefreshNetwork();
  const [busy, setBusy] = React.useState(false);
  const status = tl.data?.relation.status;
  if (!profile.data) return null;
  const first = profile.data.fullName.split(' ')[0];

  const connect = async () => {
    setBusy(true);
    playSound('toggleOn');
    try {
      await requestBuddy(inviterId, courseId ?? undefined);
      await Promise.all([tl.mutate(), refresh()]);
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className={styles.inviteCard}>
      <Avatar size="lg" src={profile.data.avatarUrl ?? undefined} name={profile.data.fullName} />
      <div className={styles.inviteText}>
        <h2 className={styles.inviteTitle}>{first} invited you to learn together</h2>
        <p className={styles.personSub}>Buddies see each other&apos;s lessons, cheer each other on and keep a streak together.</p>
      </div>
      {status === 'BUDDIES' ? (
        <span className={styles.pillDone}>
          <Glyph name="check" size={14} strokeWidth={3} /> Buddies
        </span>
      ) : status === 'OUTGOING' ? (
        <span className={styles.pillDone}>Request sent</span>
      ) : (
        <Button variant="primary" disabled={busy} onClick={() => void connect()}>
          {status === 'INCOMING' ? 'Accept' : 'Become buddies'}
        </Button>
      )}
    </section>
  );
}

function InviteLinkCard({ userId }: { userId: string }) {
  const [copied, setCopied] = React.useState(false);
  const link = typeof window !== 'undefined' ? inviteLink(window.location.origin, userId) : '';

  const copy = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Learn with me on Teyro', text: 'Be my study buddy on Teyro.', url: link });
        return;
      }
      await navigator.clipboard.writeText(link);
      setCopied(true);
      playSound('toggleOn');
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* dismissed share sheet */
    }
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Invite a friend</h2>
      <div className={styles.linkRow}>
        <span className={styles.linkText}>{link}</span>
        <button type="button" className={styles.pillPrimary} onClick={() => void copy()}>
          <Glyph name={copied ? 'check' : 'share'} size={14} strokeWidth={2.8} /> {copied ? 'Copied' : 'Share'}
        </button>
      </div>
    </section>
  );
}
