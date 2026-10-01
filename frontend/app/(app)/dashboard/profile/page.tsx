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
import useSWR from 'swr';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { fetcher } from '@/lib/swr';
import { useGamification } from '@/context/GamificationContext';
import { levelProgress } from '@/lib/level';
import type { MyLeaderboard } from '@/lib/leaderboard/leaderboardEvents';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileStats from '@/components/profile/ProfileStats';
import ProfileAchievements from '@/components/profile/ProfileAchievements';
import InviteFriendsCard from '@/components/profile/InviteFriendsCard';
import EditProfileModal from '@/components/profile/EditProfileModal';
import { FriendsCard, PeopleModal, type PeopleTab } from '@/components/profile/People';
import type { AchievementsResponse, MyProfile } from '@/components/profile/types';
import styles from '@/components/profile/Profile.module.css';

export default function ProfilePage() {
  const { streakDays, xp, longestStreak, profileLoaded } = useGamification();
  const me = useSWR<MyProfile>('/api/profile', fetcher);
  const achievements = useSWR<AchievementsResponse>('/api/gamification/achievements', fetcher);
  const league = useSWR<MyLeaderboard>('/api/leagues/me', fetcher, { dedupingInterval: 30_000 });
  const [editing, setEditing] = useState(false);
  const [people, setPeople] = useState<PeopleTab | null>(null);

  const saveAvatar = async (url: string) => {
    const res = await fetch('/api/profile', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ avatarUrl: url }),
    });
    if (!res.ok) throw new Error("Your photo uploaded but didn't save. Try again.");
    await me.mutate((await res.json()) as MyProfile, { revalidate: false });
  };

  const metrics = achievements.data?.metrics;

  return (
    <div className={styles.page}>
      <div className={styles.main}>
        {me.isLoading ? (
          <div className={styles.skeleton} style={{ height: 320, borderRadius: 20 }} aria-busy="true" aria-label="Loading your profile" />
        ) : me.error || !me.data ? (
          <div className={styles.errorBox} role="alert">
            <AlertCircle size={20} strokeWidth={2.5} /> Your profile didn&apos;t load.
            <button type="button" className={styles.linkBtn} onClick={() => void me.mutate()}>
              <RefreshCw size={14} strokeWidth={2.75} /> Try again
            </button>
          </div>
        ) : (
          <ProfileHeader
            me={me.data}
            onEdit={() => setEditing(true)}
            onPeople={(t) => setPeople(t)}
            onAvatarSaved={saveAvatar}
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
