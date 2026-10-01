/** Shapes the profile reads — each mirrors its backend endpoint. */

/** GET /api/profile → /profile/me */
export interface MyProfile {
  id: string;
  email?: string;
  fullName?: string;
  avatarUrl?: string | null;
  createdAt?: string;
  profile?: { username?: string | null; bio?: string | null; location?: string | null; avatarUrl?: string | null } | null;
  studentProfile?: { dailyGoalXp?: number | null } | null;
  followersCount?: number;
  followingCount?: number;
}

/** GET /api/social/{followers|following|classmates} rows */
export interface Person {
  id: string;
  name: string;
  avatar: string | null;
  streak?: number;
  xp?: number;
  course?: string;
  isFollowing?: boolean;
}

/** GET /api/gamification/achievements */
export interface AchievementTier {
  level: number;
  target: number;
  name: string;
  description: string;
  isUnlocked: boolean;
  isNew: boolean;
  unlockedAt: string | null;
}

export interface AchievementFamily {
  id: string;
  title: string;
  category: string;
  currentMetricVal: number;
  currentTier: number;
  maxTier: number;
  isCompleted: boolean;
  nextTarget: number;
  nextDescription: string;
  tiers: AchievementTier[];
}

export interface AchievementsResponse {
  achievements: AchievementFamily[];
  totals?: { unlocked: number; total: number };
  metrics?: {
    currentStreak: number;
    longestStreak: number;
    totalXp: number;
    lessonsCompleted: number;
    firstTryCorrectAnswers: number;
    coursesEnrolled: number;
    daysStudied: number;
  };
}

/** GET /api/referrals/me */
export interface ReferralSummary {
  code: string;
  reward: { coins: number; xp: number };
  cap: number;
  invited: number;
  joined: number;
  earned: { coins: number; xp: number };
  friends: { id: string; name: string; avatarUrl: string | null; status: 'PENDING' | 'REWARDED'; joinedAt: string }[];
}
