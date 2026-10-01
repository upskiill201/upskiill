'use client';

/**
 * Following / Followers / Classmates: the friends card on the profile and the
 * full list in a modal. Follow buttons work in place, with a sound, and every
 * list refreshes together (lib/social.ts).
 */

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useSWR from 'swr';
import { Search } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { fetcher } from '@/lib/swr';
import { setFollowing } from '@/lib/social';
import { playSound } from '@/lib/audio/lessonSounds';
import { playHaptic } from '@/lib/haptics';
import type { Person } from './types';
import styles from './Profile.module.css';

export type PeopleTab = 'following' | 'followers' | 'classmates';

function PersonRow({ person }: { person: Person }) {
  const [busy, setBusy] = useState(false);
  const toggle = async () => {
    setBusy(true);
    const next = !person.isFollowing;
    playHaptic('light', false);
    playSound(next ? 'toggleOn' : 'toggleOff');
    try {
      await setFollowing(person.id, next);
    } catch {
      playSound('nodeLocked');
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className={styles.personRow}>
      <Link
        href={`/dashboard/u/${encodeURIComponent(person.id)}`}
        className={styles.personLink}
        onClick={() => playSound('navTap', 4)}
      >
      {person.avatar ? (
        // eslint-disable-next-line @next/next/no-img-element -- user avatar, any host
        <img src={person.avatar} alt="" className={styles.personAvatar} />
      ) : (
        <span className={styles.personAvatar}>{person.name.charAt(0).toUpperCase()}</span>
      )}
      <span className={styles.personText}>
        <span className={styles.personName}>{person.name}</span>
        <span className={styles.personSub}>
          {person.streak ? (
            <>
              <Image src="/Icons/burn.png" alt="" width={14} height={14} /> {person.streak}-day streak
            </>
          ) : person.course ? (
            person.course
          ) : (
            `${(person.xp ?? 0).toLocaleString()} XP`
          )}
        </span>
      </span>
      </Link>
      <button
        type="button"
        className={person.isFollowing ? styles.followingBtn : styles.followBtn}
        onClick={() => void toggle()}
        disabled={busy}
      >
        {person.isFollowing ? 'Following' : 'Follow'}
      </button>
    </div>
  );
}

function usePeople(tab: PeopleTab) {
  return useSWR<Person[]>(`/api/social/${tab}`, fetcher);
}

function PeopleList({ tab, limit }: { tab: PeopleTab; limit?: number }) {
  const { data, error, isLoading, mutate } = usePeople(tab);
  if (isLoading) {
    return (
      <div className={styles.peopleList} aria-busy="true">
        {[0, 1].map((i) => (
          <div key={i} className={styles.personRow}>
            <span className={`${styles.personAvatar} ${styles.skeleton}`} />
            <span className={styles.skeleton} style={{ flex: 1, height: 16 }} />
          </div>
        ))}
      </div>
    );
  }
  if (error) {
    return (
      <div className={styles.empty} role="alert">
        This list didn&apos;t load.
        <button type="button" className={styles.linkBtn} onClick={() => void mutate()}>
          Try again
        </button>
      </div>
    );
  }
  const people = Array.isArray(data) ? data : [];
  if (people.length === 0) {
    return (
      <div className={styles.empty}>
        {tab === 'following'
          ? "You're not following anyone yet. Find classmates to learn alongside."
          : tab === 'followers'
            ? 'No followers yet. Invite a friend to get started.'
            : 'No classmates yet. Enrol in a course to meet people learning it too.'}
      </div>
    );
  }
  return (
    <div className={styles.peopleList}>
      {(limit ? people.slice(0, limit) : people).map((p) => (
        <PersonRow key={p.id} person={p} />
      ))}
    </div>
  );
}

/** The card in the profile's right rail. */
export function FriendsCard({ onOpen }: { onOpen: (tab: PeopleTab) => void }) {
  const [tab, setTab] = useState<'following' | 'followers'>('following');
  const following = usePeople('following');
  const followers = usePeople('followers');
  const count = (d?: Person[]) => (Array.isArray(d) ? d.length : 0);
  const total = tab === 'following' ? count(following.data) : count(followers.data);

  return (
    <section className={styles.card} aria-label="Friends">
      <div className={styles.tabs} role="tablist">
        {(['following', 'followers'] as const).map((t, i) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={tab === t}
            className={tab === t ? styles.tabOn : styles.tab}
            onClick={() => {
              playSound('navTap', i + 1);
              setTab(t);
            }}
          >
            {t === 'following' ? `Following (${count(following.data)})` : `Followers (${count(followers.data)})`}
          </button>
        ))}
      </div>
      <PeopleList tab={tab} limit={4} />
      {total > 4 && (
        <button type="button" className={styles.linkBtn} style={{ marginTop: 16 }} onClick={() => onOpen(tab)}>
          View all {total}
        </button>
      )}
      <button
        type="button"
        className={styles.findBtn}
        onClick={() => {
          playSound('menuOpen');
          onOpen('classmates');
        }}
      >
        <span className={styles.findIcon}>
          <Search size={20} strokeWidth={2.75} />
        </span>
        <span className={styles.personText}>
          <span className={styles.personName}>Find friends</span>
          <span className={styles.personSub}>People learning your courses</span>
        </span>
      </button>
    </section>
  );
}

/** The full list, in a modal with all three tabs. */
export function PeopleModal({ tab, onTab, onClose }: { tab: PeopleTab | null; onTab: (t: PeopleTab) => void; onClose: () => void }) {
  return (
    <Modal isOpen={!!tab} onClose={onClose} title="Friends" size="md">
      {tab && (
        <div>
          <div className={styles.tabs} role="tablist" style={{ gridTemplateColumns: '1fr 1fr 1fr', margin: '0 0 16px' }}>
            {(['following', 'followers', 'classmates'] as const).map((t, i) => (
              <button
                key={t}
                type="button"
                role="tab"
                aria-selected={tab === t}
                className={tab === t ? styles.tabOn : styles.tab}
                onClick={() => {
                  playSound('navTap', i + 1);
                  onTab(t);
                }}
              >
                {t}
              </button>
            ))}
          </div>
          <PeopleList tab={tab} />
        </div>
      )}
    </Modal>
  );
}
