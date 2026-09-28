'use client';

/**
 * /creator-profile/:username — a creator's public page, Duolingo-style:
 * header (banner, avatar, founding badge, track, headline), a FOLLOW button
 * that flips instantly, statistics tiles, their courses, and About.
 *
 * Public: logged-out visitors can read it; following asks them to log in.
 * The creator viewing their own page gets EDIT PROFILE instead of FOLLOW.
 */

import Link from 'next/link';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Pencil, RotateCcw } from 'lucide-react';
import { TeyMark } from '@/components/brand/TeyMark';
import {
  CreatorAbout,
  CreatorCourses,
  CreatorHeader,
  CreatorProfileSkeleton,
  CreatorStats,
  FollowButton,
} from '@/components/creator-profile/CreatorProfileParts';
import { allCourses, type CreatorPublicProfile } from '@/components/creator-profile/types';
import { playHaptic } from '@/lib/haptics';
import { playSound } from '@/lib/audio/lessonSounds';
import { hydrateSoundPreferences } from '@/lib/audio/soundManager';
import styles from '@/components/creator-profile/CreatorProfile.module.css';

type Load = { state: 'loading' } | { state: 'missing' } | { state: 'error' } | { state: 'ready'; profile: CreatorPublicProfile };

export default function CreatorProfilePage() {
  const params = useParams();
  const router = useRouter();
  const username = typeof params?.username === 'string' ? params.username : '';

  const [load, setLoad] = useState<Load>({ state: 'loading' });
  const [following, setFollowing] = useState(false);
  const [followers, setFollowers] = useState(0);
  const [followBusy, setFollowBusy] = useState(false);
  const [followError, setFollowError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    if (!username) {
      setLoad({ state: 'missing' });
      return;
    }
    setLoad({ state: 'loading' });
    try {
      const res = await fetch(`/api/profile/creator/${encodeURIComponent(username)}`, { credentials: 'include' });
      if (res.status === 404) {
        setLoad({ state: 'missing' });
        return;
      }
      if (!res.ok) throw new Error(String(res.status));
      const profile = (await res.json()) as CreatorPublicProfile;
      setFollowing(Boolean(profile.isFollowing));
      setFollowers(profile.followersCount ?? 0);
      setLoad({ state: 'ready', profile });
    } catch {
      setLoad({ state: 'error' });
    }
  }, [username]);

  useEffect(() => {
    hydrateSoundPreferences();
    void fetchProfile();
  }, [fetchProfile]);

  const toggleFollow = async () => {
    if (load.state !== 'ready' || followBusy) return;
    const prev = { following, followers };
    const next = !following;
    // Flip first — the tap should feel instant — then reconcile.
    setFollowing(next);
    setFollowers((n) => Math.max(0, n + (next ? 1 : -1)));
    setFollowError(null);
    playSound(next ? 'like' : 'toggleOff');
    playHaptic(next ? 'success' : 'light', false);
    setFollowBusy(true);
    try {
      const res = await fetch(`/api/profile/follow/${encodeURIComponent(load.profile.id)}`, {
        method: 'POST',
        credentials: 'include',
      });
      if (res.status === 401) {
        router.push(`/login?next=${encodeURIComponent(`/creator-profile/${username}`)}`);
        return;
      }
      if (!res.ok) throw new Error(String(res.status));
      const data = await res.json();
      if (typeof data.isFollowing === 'boolean') setFollowing(data.isFollowing);
      if (typeof data.followersCount === 'number') setFollowers(data.followersCount);
    } catch {
      setFollowing(prev.following);
      setFollowers(prev.followers);
      setFollowError("That didn't go through. Try again?");
      playSound('wrong');
    } finally {
      setFollowBusy(false);
    }
  };

  const topBar = (
    <header className={styles.topBar}>
      <button
        type="button"
        className={styles.topBtn}
        aria-label="Back"
        onClick={() => {
          playSound('cardBack');
          if (window.history.length > 1) router.back();
          else router.push('/');
        }}
      >
        <ArrowLeft size={24} strokeWidth={3} />
      </button>
      <Link href="/" aria-label="Teyro home">
        <TeyMark size={36} />
      </Link>
      <span style={{ width: 44 }} aria-hidden="true" />
    </header>
  );

  if (load.state === 'loading') {
    return (
      <div className={styles.page}>
        {topBar}
        <div className={styles.layout}>
          <CreatorProfileSkeleton />
        </div>
      </div>
    );
  }

  if (load.state === 'missing' || load.state === 'error') {
    const missing = load.state === 'missing';
    return (
      <div className={styles.page}>
        {topBar}
        <div className={styles.state}>
          <Image
            src={missing ? '/User onbarding Assets/tey/searching.webp' : '/User onbarding Assets/tey/thinking.webp'}
            alt=""
            width={140}
            height={175}
          />
          <h1>{missing ? "I couldn't find that creator" : 'That page didn’t load'}</h1>
          <p>
            {missing
              ? `There's no creator called @${username} on Teyro. Check the spelling, or find courses to learn from.`
              : 'Check your connection and try again.'}
          </p>
          {missing ? (
            <Link href="/dashboard/explore" className={styles.topCta}>
              Explore courses
            </Link>
          ) : (
            <button type="button" className={styles.editBtn} onClick={() => void fetchProfile()}>
              <RotateCcw size={16} strokeWidth={2.75} aria-hidden="true" /> Try again
            </button>
          )}
        </div>
      </div>
    );
  }

  const { profile } = load;
  const courses = allCourses(profile);
  const firstName = profile.fullName.split(' ')[0] || 'This creator';

  return (
    <div className={styles.page}>
      {topBar}
      <div className={styles.layout}>
        <main className={styles.main}>
          <div>
            <CreatorHeader
              profile={profile}
              followersCount={followers}
              action={
                profile.isSelf ? (
                  <Link href="/creator/profile" className={styles.editBtn} onClick={() => playSound('navTap', 2)}>
                    <Pencil size={16} strokeWidth={2.75} aria-hidden="true" /> Edit profile
                  </Link>
                ) : (
                  <FollowButton following={following} busy={followBusy} onToggle={() => void toggleFollow()} />
                )
              }
            />
            {followError && (
              <p className={styles.inlineError} role="alert">
                {followError}
              </p>
            )}
          </div>
          <CreatorCourses
            courses={courses}
            empty={<p>{firstName} is building their first course. Follow to hear when it&apos;s out.</p>}
          />
        </main>
        <aside className={styles.rail}>
          <CreatorStats profile={{ ...profile, followersCount: followers }} />
          <CreatorAbout profile={profile} />
        </aside>
      </div>
    </div>
  );
}
