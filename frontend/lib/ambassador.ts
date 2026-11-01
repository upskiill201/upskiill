/**
 * The ambassador programme (founder, 2026-10-29): earn Teyro Pro by inviting
 * friends who keep learning. Backend: backend/src/ambassador. Rules there are
 * the source of truth; every number below comes from the API.
 */

export type FriendState = 'LEARNING' | 'ACTIVE' | 'AT_RISK' | 'INACTIVE';

export interface AmbassadorFriend {
  id: string;
  name: string;
  avatarUrl: string | null;
  state: FriendState;
  lessonsDone: number;
  streakDays: number;
  lastLessonAt: string | null;
  countsUntil: string | null;
  learnedToday: boolean;
  joinedAt: string;
  canNudge: boolean;
  canCheer: boolean;
}

export interface AmbassadorBadge {
  key: 'AMBASSADOR' | 'CHAMPION' | 'LEGEND';
  name: string;
  at: number;
  earned: boolean;
  left: number;
}

export interface AmbassadorMe {
  enabled: boolean;
  rules: { friendsForPro: number; qualifyLessons: number; qualifyStreak: number; activeDays: number; graceDays: number };
  isAmbassador: boolean;
  code: string;
  path: string;
  pro: { active: boolean; since: string | null; graceUntil: string | null };
  counts: { invited: number; qualified: number; active: number; needed: number };
  badges: AmbassadorBadge[];
  squad: { name: string; code: string; members: number; max: number } | null;
  friends: AmbassadorFriend[];
}

export interface AmbassadorProgramme {
  enabled: boolean;
  friendsForPro: number;
  qualifyLessons: number;
  qualifyStreak: number;
  activeDays: number;
}

export interface InvitePreview {
  code: string;
  firstName: string;
  avatarUrl: string | null;
  streakDays: number;
  courseTitle: string | null;
  squadName: string | null;
  isAmbassador: boolean;
}

export interface InviterStatus {
  inviter: (InvitePreview & { id: string }) | null;
  together?: { buddies: boolean; squad: boolean };
}

export const AMBASSADOR_ME_KEY = '/api/ambassador/me';

async function call<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`/api/ambassador${path}`, {
    credentials: 'include',
    ...init,
    headers: { 'Content-Type': 'application/json', ...(init?.headers ?? {}) },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error((body && (Array.isArray(body.message) ? body.message[0] : body.message)) || 'Something went wrong.');
  }
  return res.json() as Promise<T>;
}

export const ambassadorApi = {
  me: () => call<AmbassadorMe>('/me'),
  programme: () => call<AmbassadorProgramme>('/programme'),
  join: (source: 'ONBOARDING' | 'APP') => call<AmbassadorMe>('/join', { method: 'POST', body: JSON.stringify({ source }) }),
  encourage: (friendId: string, kind: 'NUDGE' | 'CHEER') =>
    call<{ sent: boolean }>('/encourage', { method: 'POST', body: JSON.stringify({ friendId, kind }) }),
  inviter: () => call<InviterStatus>('/inviter'),
  learnWith: () => call<{ buddies: boolean; squad: string | null; squadFull: boolean }>('/learn-with', { method: 'POST' }),
};

/** The full invite link, on whatever origin the learner is using. */
export function inviteUrl(path: string): string {
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://teyro.app';
  return `${origin}${path}`;
}

/** Server side: the public invite preview behind /i/[code]. */
export async function fetchInvitePreview(code: string): Promise<InvitePreview | null> {
  if (!/^[A-Za-z0-9]{6,12}$/.test(code)) return null;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ambassador/invite/${encodeURIComponent(code.toUpperCase())}`, {
      next: { revalidate: 600 },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    return (await res.json()) as InvitePreview;
  } catch {
    return null;
  }
}

export function friendStateLabel(
  f: Pick<AmbassadorFriend, 'state' | 'lessonsDone' | 'streakDays'>,
  rules: { qualifyLessons: number; qualifyStreak: number },
): string {
  switch (f.state) {
    case 'LEARNING': {
      const lessons = Math.min(f.lessonsDone, rules.qualifyLessons);
      const streak = Math.min(f.streakDays, rules.qualifyStreak);
      if (lessons < rules.qualifyLessons) return `${lessons} of ${rules.qualifyLessons} lessons`;
      return `Streak ${streak} of ${rules.qualifyStreak} days`;
    }
    case 'ACTIVE':
      return 'Learning';
    case 'AT_RISK':
      return 'Slipping';
    case 'INACTIVE':
      return 'Stopped';
  }
}
