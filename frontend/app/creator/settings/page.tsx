'use client';

/**
 * /creator/settings — Duolingo's settings, for a creator. Same pieces and
 * look as the learner's /dashboard/settings (components/settings), sectioned:
 *
 *   Preferences  sound effects, vibration (saved on this device)
 *   Profile      one tap to the studio Profile page, where everything a
 *                learner sees is edited (name, username, photo, headline…)
 *   Privacy      who can see your profile, show location, show links —
 *                every switch saves the moment it flips, with a tick
 *   Payouts      earnings and payout method
 *   Account      email, password, switch to learning, log out
 *
 * Endpoints: GET/PATCH /api/profile/me, POST /api/auth/switch-role.
 */

import Link from 'next/link';
import { useCallback, useEffect, useState, useSyncExternalStore } from 'react';
import { useReducedMotion } from 'framer-motion';
import useSWR from 'swr';
import {
  Bell,
  ChevronRight,
  Eye,
  GraduationCap,
  KeyRound,
  Link2,
  Loader2,
  LogOut,
  Mail,
  MapPin,
  ShieldCheck,
  SlidersHorizontal,
  UserRound,
  Vibrate,
  Volume2,
  Wallet,
} from 'lucide-react';
import {
  Row,
  SavedTick,
  SectionError,
  SkeletonRows,
  Switch,
  settingsStyles as styles,
  useSavedFlash,
} from '@/components/settings/SettingsParts';
import { extractErrorMessage } from '@/lib/apiError';
import { fetcher } from '@/lib/swr';
import { isHapticsEnabled, playHaptic, setHapticsEnabled } from '@/lib/haptics';
import { playSound } from '@/lib/audio/lessonSounds';
import { useStandaloneSound } from '@/lib/audio/useStandaloneSound';
import { clearClientSession } from '@/lib/user-cache';

type Visibility = 'PUBLIC' | 'TEYRO_ONLY' | 'HIDDEN';

interface PrivacySettings {
  showLocation?: boolean;
  showExperience?: boolean;
  showEducation?: boolean;
  showCertifications?: boolean;
  showSocials?: boolean;
}

interface MeResponse {
  id: string;
  email?: string;
  fullName?: string | null;
  hasStudentAccess?: boolean;
  profile?: {
    username?: string | null;
    profileVisibility?: Visibility | null;
    privacySettings?: PrivacySettings | null;
  } | null;
}

const VISIBILITY: { value: Visibility; label: string; sub: string }[] = [
  { value: 'PUBLIC', label: 'Everyone', sub: 'Anyone with the link' },
  { value: 'TEYRO_ONLY', label: 'Teyro members', sub: 'Signed-in people only' },
  { value: 'HIDDEN', label: 'Only me', sub: 'Your page is off' },
];

const SECTIONS = [
  { id: 'preferences', label: 'Preferences', icon: SlidersHorizontal },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'profile', label: 'Profile', icon: UserRound },
  { id: 'privacy', label: 'Privacy', icon: ShieldCheck },
  { id: 'payouts', label: 'Payouts', icon: Wallet },
  { id: 'account', label: 'Account', icon: KeyRound },
] as const;

const noopSubscribe = () => () => {};

type Load = { state: 'loading' } | { state: 'error' } | { state: 'ready'; me: MeResponse };

export default function CreatorSettingsPage() {
  const reduce = useReducedMotion();
  const [load, setLoad] = useState<Load>({ state: 'loading' });

  const fetchMe = useCallback(async () => {
    setLoad({ state: 'loading' });
    try {
      const res = await fetch('/api/profile/me', { credentials: 'include', cache: 'no-store' });
      if (!res.ok) throw new Error();
      setLoad({ state: 'ready', me: (await res.json()) as MeResponse });
    } catch {
      setLoad({ state: 'error' });
    }
  }, []);

  useEffect(() => {
    void fetchMe();
  }, [fetchMe]);

  const scrollTo = (id: string, index: number) => {
    playSound('navTap', index);
    document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  };

  const me = load.state === 'ready' ? load.me : null;

  return (
    <div className={styles.page}>
      <div className={styles.main}>
        <h1 className={styles.title}>Settings</h1>
        <PreferencesSection />
        <NotificationsSection />
        <ProfileSection me={me} />
        <PrivacySection load={load} onRetry={() => void fetchMe()} />
        <PayoutsSection />
        <AccountSection me={me} loading={load.state === 'loading'} />
      </div>

      <aside className={styles.aside} aria-label="Settings sections">
        <nav className={styles.sectionNav}>
          {SECTIONS.map((s, i) => (
            <button key={s.id} type="button" className={styles.sectionLink} onClick={() => scrollTo(s.id, i)}>
              <s.icon size={18} strokeWidth={2.5} aria-hidden="true" />
              <span>{s.label}</span>
              <ChevronRight size={16} strokeWidth={2.5} aria-hidden="true" className={styles.sectionChevron} />
            </button>
          ))}
        </nav>
      </aside>
    </div>
  );
}

// ─── Preferences ──────────────────────────────────────────────────────────

function PreferencesSection() {
  const { sfxEnabled, setSfxEnabled } = useStandaloneSound();
  const [hapticsTick, setHapticsTick] = useState(0);
  const haptics = useSyncExternalStore(
    noopSubscribe,
    () => isHapticsEnabled() && hapticsTick >= 0,
    () => true,
  );
  const saved = useSavedFlash();

  return (
    <section id="preferences" className={styles.section} aria-labelledby="preferences-h">
      <div className={styles.sectionHead}>
        <h2 id="preferences-h" className={styles.sectionTitle}>Preferences</h2>
        <SavedTick show={saved.shown} />
      </div>
      <div className={styles.card}>
        <Row icon={Volume2} title="Sound effects" sub="Taps, saves and celebrations in the studio and the app">
          <Switch
            checked={sfxEnabled}
            label="Sound effects"
            onChange={(v) => {
              setSfxEnabled(v);
              saved.flash();
            }}
          />
        </Row>
        <Row icon={Vibrate} title="Vibration" sub="Haptic taps on this device">
          <Switch
            checked={haptics}
            label="Vibration"
            onChange={(v) => {
              setHapticsEnabled(v);
              setHapticsTick((t) => t + 1);
              if (v) playHaptic('medium', false);
              saved.flash();
            }}
          />
        </Row>
      </div>
    </section>
  );
}

// ─── Notifications ────────────────────────────────────────────────────────

interface StudioPushPrefs {
  pushEnabled: boolean;
  creatorActivity: boolean;
}

/**
 * The creator's side of Tey's push settings (the same per-account prefs the
 * learner settings edit). The weekly digest email is managed from the email
 * itself, by its own unsubscribe link.
 */
function NotificationsSection() {
  const { data, error, isLoading, mutate } = useSWR<{ prefs: StudioPushPrefs }>('/api/tey/preferences', fetcher);
  const [failed, setFailed] = useState(false);
  const saved = useSavedFlash();
  const prefs = data?.prefs;

  const update = async (patch: Partial<StudioPushPrefs>) => {
    if (!prefs) return;
    setFailed(false);
    try {
      await mutate(
        async () => {
          const res = await fetch('/api/tey/preferences', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(patch),
          });
          if (!res.ok) throw new Error(String(res.status));
          return (await res.json()) as { prefs: StudioPushPrefs };
        },
        { optimisticData: { prefs: { ...prefs, ...patch } }, rollbackOnError: true, revalidate: false },
      );
      saved.flash();
    } catch {
      setFailed(true);
    }
  };

  return (
    <section id="notifications" className={styles.section} aria-labelledby="notifications-h">
      <div className={styles.sectionHead}>
        <h2 id="notifications-h" className={styles.sectionTitle}>Notifications</h2>
        <SavedTick show={saved.shown} />
      </div>
      <div className={styles.card}>
        {isLoading ? (
          <SkeletonRows count={1} />
        ) : error || !prefs ? (
          <SectionError what="notification settings" onRetry={() => void mutate()} />
        ) : (
          <>
            <Row icon={Bell} title="Studio notifications" sub="Sales, new learners, questions, finishes and payouts on this device">
              <Switch
                checked={prefs.pushEnabled && (prefs.creatorActivity ?? true)}
                label="Studio notifications"
                onChange={(v) => void update(v && !prefs.pushEnabled ? { pushEnabled: true, creatorActivity: true } : { creatorActivity: v })}
              />
            </Row>
            {failed && <p className={styles.inlineError} role="alert">That change didn&apos;t save. Try again.</p>}
          </>
        )}
      </div>
    </section>
  );
}

// ─── Profile ──────────────────────────────────────────────────────────────

function ProfileSection({ me }: { me: MeResponse | null }) {
  const username = me?.profile?.username;
  return (
    <section id="profile" className={styles.section} aria-labelledby="profile-h">
      <div className={styles.sectionHead}>
        <h2 id="profile-h" className={styles.sectionTitle}>Profile</h2>
      </div>
      <div className={styles.card}>
        <Link href="/creator/profile" className={styles.linkRow} onClick={() => playSound('navTap', 1)}>
          <Row icon={UserRound} title="Edit your creator profile" sub="Name, username, photo, headline, what you teach and links">
            <ChevronRight size={20} strokeWidth={2.5} aria-hidden="true" className={styles.sectionChevron} />
          </Row>
        </Link>
        {username && (
          <Link href={`/creator-profile/${username}`} className={styles.linkRow} onClick={() => playSound('navTap', 2)}>
            <Row icon={Eye} title="See it as a learner" sub={`teyro.app/creator-profile/${username}`}>
              <ChevronRight size={20} strokeWidth={2.5} aria-hidden="true" className={styles.sectionChevron} />
            </Row>
          </Link>
        )}
      </div>
    </section>
  );
}

// ─── Privacy ──────────────────────────────────────────────────────────────

function PrivacySection({ load, onRetry }: { load: Load; onRetry: () => void }) {
  const saved = useSavedFlash();
  const [visibility, setVisibility] = useState<Visibility>('PUBLIC');
  const [privacy, setPrivacy] = useState<PrivacySettings>({});
  const [pending, setPending] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (load.state !== 'ready') return;
    setVisibility(load.me.profile?.profileVisibility ?? 'PUBLIC');
    setPrivacy(load.me.profile?.privacySettings ?? {});
  }, [load]);

  /** Optimistic: flip first, roll back if the server says no. */
  const save = async (key: string, body: Record<string, unknown>, rollback: () => void) => {
    setPending(key);
    setError(null);
    try {
      const res = await fetch('/api/profile/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(extractErrorMessage(await res.json().catch(() => ({})), res.status));
      saved.flash();
    } catch (e) {
      rollback();
      setError(e instanceof Error ? e.message : "That didn't save. Try again?");
      playSound('wrong');
    } finally {
      setPending(null);
    }
  };

  const pickVisibility = (next: Visibility) => {
    if (next === visibility || pending) return;
    const prev = visibility;
    playSound('select');
    playHaptic('selection', false);
    setVisibility(next);
    void save('visibility', { profileVisibility: next }, () => setVisibility(prev));
  };

  const flip = (key: 'showLocation' | 'showSocials', value: boolean) => {
    const prev = privacy;
    // privacySettings is saved whole; unset flags mean "shown".
    const next = { ...privacy, [key]: value };
    setPrivacy(next);
    void save(key, { privacySettings: next }, () => setPrivacy(prev));
  };

  return (
    <section id="privacy" className={styles.section} aria-labelledby="privacy-h">
      <div className={styles.sectionHead}>
        <h2 id="privacy-h" className={styles.sectionTitle}>Privacy</h2>
        <SavedTick show={saved.shown} />
      </div>
      <div className={styles.card}>
        {load.state === 'loading' ? (
          <SkeletonRows count={3} />
        ) : load.state === 'error' ? (
          <SectionError what="privacy settings" onRetry={onRetry} />
        ) : (
          <>
            <div className={styles.row}>
              <span className={styles.rowIcon} aria-hidden="true">
                <Eye size={20} strokeWidth={2.5} />
              </span>
              <span className={styles.rowText}>
                <span className={styles.rowTitle}>Who can see your profile</span>
                <span className={styles.rowSub}>Your courses stay on sale either way.</span>
              </span>
            </div>
            <div className={`${styles.goalGrid} ${styles.visibilityGrid}`} role="radiogroup" aria-label="Who can see your profile">
              {VISIBILITY.map((v) => {
                const on = visibility === v.value;
                return (
                  <button
                    key={v.value}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    className={`${styles.goalTile} ${on ? styles.goalTileOn : ''}`}
                    onClick={() => pickVisibility(v.value)}
                  >
                    <span className={styles.goalName}>{v.label}</span>
                    <span className={styles.goalMinutes}>{v.sub}</span>
                    {pending === 'visibility' && on && <Loader2 size={16} className={styles.goalSpin} aria-hidden="true" />}
                  </button>
                );
              })}
            </div>
            <Row icon={MapPin} title="Show my location" sub="On your public page">
              <Switch
                checked={privacy.showLocation !== false}
                label="Show my location"
                disabled={pending === 'showLocation'}
                onChange={(v) => flip('showLocation', v)}
              />
            </Row>
            <Row icon={Link2} title="Show my links" sub="Website, YouTube, GitHub and the rest">
              <Switch
                checked={privacy.showSocials !== false}
                label="Show my links"
                disabled={pending === 'showSocials'}
                onChange={(v) => flip('showSocials', v)}
              />
            </Row>
            {error && (
              <p className={styles.inlineError} role="alert">
                {error}
              </p>
            )}
          </>
        )}
      </div>
    </section>
  );
}

// ─── Payouts ──────────────────────────────────────────────────────────────

function PayoutsSection() {
  return (
    <section id="payouts" className={styles.section} aria-labelledby="payouts-h">
      <div className={styles.sectionHead}>
        <h2 id="payouts-h" className={styles.sectionTitle}>Payouts</h2>
      </div>
      <div className={styles.card}>
        <Link href="/creator/earnings" className={styles.linkRow} onClick={() => playSound('navTap', 3)}>
          <Row icon={Wallet} title="Earnings and payout method" sub="Your balance, payouts and where they're sent">
            <ChevronRight size={20} strokeWidth={2.5} aria-hidden="true" className={styles.sectionChevron} />
          </Row>
        </Link>
      </div>
    </section>
  );
}

// ─── Account ──────────────────────────────────────────────────────────────

function AccountSection({ me, loading }: { me: MeResponse | null; loading: boolean }) {
  const [switching, setSwitching] = useState(false);
  const [switchError, setSwitchError] = useState<string | null>(null);

  const logout = async () => {
    playSound('menuClose');
    clearClientSession();
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    } catch {
      // still leave
    }
    window.location.href = '/creator/login';
  };

  const switchToLearning = async () => {
    setSwitching(true);
    setSwitchError(null);
    playSound('navTap', 4);
    try {
      const res = await fetch('/api/auth/switch-role', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ role: 'STUDENT' }),
      });
      if (!res.ok) throw new Error();
      // Hard navigation so the learner app boots with the new role cookie.
      window.location.href = '/dashboard';
    } catch {
      setSwitchError("Couldn't switch just now. Try again?");
      setSwitching(false);
    }
  };

  return (
    <section id="account" className={styles.section} aria-labelledby="account-h">
      <div className={styles.sectionHead}>
        <h2 id="account-h" className={styles.sectionTitle}>Account</h2>
      </div>
      <div className={styles.card}>
        {loading ? (
          <SkeletonRows count={2} />
        ) : (
          <>
            <Row icon={Mail} title="Email" sub={me?.email ?? '—'} />
            <Link href="/creator/forgot-password" className={styles.linkRow} onClick={() => playSound('navTap', 3)}>
              <Row icon={KeyRound} title="Change password" sub="We'll email you a reset link">
                <ChevronRight size={20} strokeWidth={2.5} aria-hidden="true" className={styles.sectionChevron} />
              </Row>
            </Link>
            {me?.hasStudentAccess && (
              <button type="button" className={styles.linkRow} onClick={() => void switchToLearning()} disabled={switching}>
                <Row icon={GraduationCap} title="Switch to learning" sub="Your streak, lessons and courses">
                  {switching ? (
                    <Loader2 size={20} className={styles.goalSpin} aria-hidden="true" />
                  ) : (
                    <ChevronRight size={20} strokeWidth={2.5} aria-hidden="true" className={styles.sectionChevron} />
                  )}
                </Row>
              </button>
            )}
            {switchError && (
              <p className={styles.inlineError} role="alert">
                {switchError}
              </p>
            )}
          </>
        )}
      </div>
      <div className={styles.accountActions}>
        <button type="button" className={styles.secondaryBtn} onClick={() => void logout()}>
          <LogOut size={18} strokeWidth={2.5} aria-hidden="true" /> Log out
        </button>
      </div>
    </section>
  );
}
