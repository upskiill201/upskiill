'use client';

/**
 * The profile — rebuilt to Duolingo's standard (2026-09-25).
 *
 *   header (banner · avatar · name · @handle · joined · bio · counts · edit)
 *   Statistics grid
 *   Achievements (one row per badge family, "View all")
 *   right rail: Invite friends (real referrals) · Friends (following /
 *   followers / find classmates)
 *
 * Every number comes from the server: /api/profile, /api/gamification/
 * achievements, /api/leagues/me, /api/referrals/me, /api/social/*. Account
 * settings (email, password, notifications) live on the Settings page.
 */

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import useSWR from 'swr';
import { Glyph } from '@/components/art/Glyph';
import { fetcher } from '@/lib/swr';
import { useHydrated } from '@/components/studio/useHydrated';
import { useGamification } from '@/context/GamificationContext';
import { levelProgress } from '@/lib/level';
import type { MyLeaderboard } from '@/lib/leaderboard/leaderboardEvents';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileStats from '@/components/profile/ProfileStats';
import ProfileAchievements from '@/components/profile/ProfileAchievements';
import InviteFriendsCard from '@/components/profile/InviteFriendsCard';
import ProfileSetupCard from '@/components/profile/ProfileSetupCard';
import EditProfileModal from '@/components/profile/EditProfileModal';
import { FriendsCard, PeopleModal, type PeopleTab } from '@/components/profile/People';
import type { AchievementsResponse, MyProfile } from '@/components/profile/types';
import styles from '@/components/profile/Profile.module.css';

export default function ProfilePage() {
  const { streakDays, xp, longestStreak, profileLoaded } = useGamification();
  const meRes = useSWR<MyProfile>('/api/profile', fetcher);
  // The persisted SWR cache exists only on the client: read it after
  // hydration, so the server render (a skeleton) and the first client render agree.
  const hydrated = useHydrated();
  const me = { data: hydrated ? meRes.data : undefined, error: hydrated ? meRes.error : undefined, isLoading: !hydrated || (!meRes.data && meRes.isLoading), mutate: meRes.mutate };
  const achievements = useSWR<AchievementsResponse>('/api/gamification/achievements', fetcher);
  const league = useSWR<MyLeaderboard>('/api/leagues/me', fetcher, { dedupingInterval: 30_000 });
  // "Say a line about you" on the home rail links here with ?edit=1.
  const params = useSearchParams();
  const [editing, setEditing] = useState(() => params.get('edit') === '1');
  const [people, setPeople] = useState<PeopleTab | null>(null);

  const metrics = achievements.data?.metrics;

  return (
    <div className={styles.page}>
      <div className={styles.main}>
        {me.isLoading ? (
          <div className={styles.skeleton} style={{ height: 320, borderRadius: 20 }} aria-busy="true" aria-label="Loading your profile" />
        ) : me.error || !me.data ? (
          <div className={styles.errorBox} role="alert">
            <Glyph name="alert" size={20} strokeWidth={2.5} /> Your profile didn&apos;t load.
            <button type="button" className={styles.linkBtn} onClick={() => void me.mutate()}>
              <Glyph name="refresh" size={14} strokeWidth={2.75} /> Try again
            </button>
          </div>
        ) : (
          <ProfileHeader
            me={me.data}
            onEdit={() => setEditing(true)}
            onPeople={(t) => setPeople(t)}
          />
        )}

        <ProfileStats
          streak={streakDays}
          longestStreak={Math.max(longestStreak ?? 0, metrics?.longestStreak ?? 0, streakDays)}
          totalXp={xp}
          level={levelProgress(xp).level}
          lessons={metrics?.lessonsCompleted ?? 0}
          league={league.data?.joined ? league.data.league : null}
          loading={!profileLoaded}
        />

        <ProfileAchievements
          families={achievements.data?.achievements}
          loading={achievements.isLoading}
          error={!!achievements.error}
          onRetry={() => void achievements.mutate()}
          onSeen={() => void achievements.mutate()}
        />
      </div>

      <aside className={styles.rail} aria-label="Friends">
        <ProfileSetupCard onEditBio={() => setEditing(true)} />
        <InviteFriendsCard />
        <FriendsCard onOpen={(t) => setPeople(t)} />
      </aside>

      {editing && me.data && (
        <EditProfileModal
          open={editing}
          me={me.data}
          onClose={() => setEditing(false)}
          onSaved={(next) => void me.mutate(next, { revalidate: true })}
        />
      )}
      <PeopleModal tab={people} onTab={setPeople} onClose={() => setPeople(null)} />
    </div>
  );
}
