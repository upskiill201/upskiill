'use client';

/**
 * A classmate's profile — Duolingo's friend profile. Reached by tapping any
 * avatar or name in a community, the feed, comments, members or a
 * leaderboard. One cached request (/api/social/users/:id); the follow button
 * flips instantly and settles in the background.
 */

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import useSWR from 'swr';
import { AlertCircle, ArrowLeft, Calendar, MapPin, UserCheck, UserPlus } from 'lucide-react';
import ProfileStats from '@/components/profile/ProfileStats';
import { fetcher } from '@/lib/swr';
import { levelProgress } from '@/lib/level';
import { setFollowing } from '@/lib/social';
import { playSound } from '@/lib/audio/lessonSounds';
import { playHaptic } from '@/lib/haptics';
import type { LeagueTier } from '@/lib/leagues';
import styles from '@/components/profile/Profile.module.css';
import own from './LearnerProfile.module.css';

interface LearnerProfile {
  id: string;
  fullName: string;
  username: string | null;
  avatarUrl: string | null;
  bio: string | null;
  location: string | null;
  joinedAt: string;
  isMe: boolean;
  isFollowing: boolean;
  followsYou: boolean;
  followersCount: number;
  followingCount: number;
  stats: {
    xp: number;
    streakDays: number;
    longestStreak: number;
    leagueTier: LeagueTier;
    tournamentWins: number;
    achievementsUnlocked: number;
    coursesCount: number;
  };
  sharedCourses: { id: string; title: string; thumbnailUrl: string | null; progress: number }[];
}

function joined(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
}

export default function LearnerProfilePage() {
  const { userId } = useParams<{ userId: string }>();
  const router = useRouter();
  const key = userId ? `/api/social/users/${encodeURIComponent(userId)}` : null;
  const { data, error, mutate } = useSWR<LearnerProfile>(key, fetcher, { revalidateOnFocus: false });
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Your own avatar lands on your own profile, with its edit controls.
  useEffect(() => {
    if (data?.isMe) router.replace('/dashboard/profile');
  }, [data?.isMe, router]);

  const toggleFollow = async () => {
    if (!data || busy) return;
    const follow = !data.isFollowing;
    setBusy(true);
    playSound(follow ? 'toggleOn' : 'toggleOff');
    playHaptic(follow ? 'success' : 'light', false);
    const optimistic = {
      ...data,
      isFollowing: follow,
      followersCount: Math.max(0, data.followersCount + (follow ? 1 : -1)),
    };
    void mutate(optimistic, { revalidate: false });
    try {
      await setFollowing(data.id, follow);
      if (follow) setToast(`You're now following ${data.fullName.split(' ')[0]}`);
    } catch (e) {
      void mutate(data, { revalidate: false });
      playSound('nodeLocked');
      setToast(e instanceof Error ? e.message : "Couldn't update right now.");
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  const back = (
    <button
      type="button"
      className={own.back}
      onClick={() => {
        playSound('navTap', 1);
        router.back();
      }}
    >
      <ArrowLeft size={18} strokeWidth={2.75} aria-hidden="true" /> Back
    </button>
  );

  if (error && !data) {
    return (
      <div className={styles.page}>
        <div className={styles.main}>
          {back}
          <div className={styles.errorBox} role="alert">
            <AlertCircle size={28} aria-hidden="true" />
            <p>We couldn&apos;t load this profile.</p>
            <button type="button" className={styles.linkBtn} onClick={() => void mutate()}>
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!data || data.isMe) {
    return (
      <div className={styles.page}>
        <div className={styles.main} aria-busy="true" aria-label="Loading profile">
          {back}
          <div className={styles.skeleton} style={{ height: 300, borderRadius: 20 }} />
          <div className={styles.skeleton} style={{ height: 220, borderRadius: 20 }} />
        </div>
      </div>
    );
  }

  const first = data.fullName.split(' ')[0] || data.fullName;
  const level = levelProgress(data.stats.xp).level;

  return (
    <div className={styles.page}>
      <div className={styles.main}>
        {back}

        <section className={styles.header} aria-label={`${data.fullName}'s profile`}>
          <div className={styles.banner} />
          <div className={styles.identity}>
            <div className={styles.avatarRow}>
              <div className={`${styles.avatarWrap} ${own.avatarRing}`}>
                {data.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element -- user-uploaded, any host
                  <img src={data.avatarUrl} alt={data.fullName} className={styles.avatarImg} />
                ) : (
                  <span className={styles.avatarInitial}>{data.fullName.charAt(0).toUpperCase()}</span>
                )}
                <span className={own.levelBadge} aria-label={`Level ${level}`}>
                  {level}
                </span>
              </div>
            </div>

            <h1 className={styles.name}>{data.fullName}</h1>
            {(data.username || data.followsYou) && (
              <p className={`${styles.handle} ${own.handleRow}`}>
                {data.username && <span>@{data.username}</span>}
                {data.followsYou && <span className={own.followsYou}>Follows you</span>}
              </p>
            )}
            <div className={styles.metaRow}>
              <span>
                <Calendar size={14} strokeWidth={2.5} aria-hidden="true" /> Joined {joined(data.joinedAt)}
              </span>
              {data.location && (
                <span>
                  <MapPin size={14} strokeWidth={2.5} aria-hidden="true" /> {data.location}
                </span>
              )}
            </div>
            {data.bio && <p className={styles.bio}>{data.bio}</p>}

            <div className={styles.countsRow}>
              <span className={styles.countBtn}>
                <strong>{data.followingCount}</strong> Following
              </span>
              <span className={styles.countBtn}>
                <strong>{data.followersCount}</strong> {data.followersCount === 1 ? 'Follower' : 'Followers'}
              </span>
            </div>

            <button
              type="button"
              className={data.isFollowing ? own.followingBig : own.followBig}
              onClick={() => void toggleFollow()}
              disabled={busy}
              aria-pressed={data.isFollowing}
            >
              {data.isFollowing ? (
                <>
                  <UserCheck size={20} strokeWidth={2.75} aria-hidden="true" /> Following
                </>
              ) : (
                <>
                  <UserPlus size={20} strokeWidth={2.75} aria-hidden="true" /> {data.followsYou ? 'Follow back' : 'Follow'}
                </>
              )}
            </button>
          </div>
        </section>

        <ProfileStats
          streak={data.stats.streakDays}
          longestStreak={data.stats.longestStreak}
          totalXp={data.stats.xp}
          level={level}
          achievements={data.stats.achievementsUnlocked}
          league={data.stats.leagueTier}
          loading={false}
          theirs
        />

        <section aria-label="Courses you share">
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>Learning together</h2>
          </div>
          {data.sharedCourses.length === 0 ? (
            <div className={`${styles.card} ${own.emptyShared}`}>
              <Image src="/art/ui/community.svg" alt="" width={56} height={56} />
              <p>
                {first} is taking {data.stats.coursesCount} {data.stats.coursesCount === 1 ? 'course' : 'courses'}. None
                that you share yet.
              </p>
            </div>
          ) : (
            <ul className={own.sharedList}>
              {data.sharedCourses.map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/dashboard/community/${c.id}`}
                    className={own.sharedRow}
                    onClick={() => playSound('navTap', 2)}
                  >
                    <span className={own.sharedThumb}>
                      {c.thumbnailUrl ? (
                        <Image src={c.thumbnailUrl} alt="" fill sizes="56px" style={{ objectFit: 'cover' }} />
                      ) : (
                        <Image src="/art/ui/community.svg" alt="" width={32} height={32} />
                      )}
                    </span>
                    <span className={own.sharedText}>
                      <span className={own.sharedTitle}>{c.title}</span>
                      <span className={own.sharedTrack} aria-label={`${first} is ${c.progress}% through`}>
                        <span className={own.sharedFill} style={{ width: `${Math.min(100, Math.max(0, c.progress))}%` }} />
                      </span>
                      <span className={own.sharedSub}>
                        {first} is {c.progress}% through
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {toast && (
        <div className={styles.toast} role="status">
          {toast}
        </div>
      )}
    </div>
  );
}
