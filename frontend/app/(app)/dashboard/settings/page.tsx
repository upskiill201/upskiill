'use client';

/**
 * Settings — Duolingo's settings, Teyro's data.
 *
 * One page, sectioned like Duolingo's: Preferences, Daily goal, Profile,
 * Notifications, Subscriptions, Account. Every switch saves the moment it's
 * flipped (with a sound and a tick); the profile form saves with one button.
 * Every endpoint already existed — this page only gathers them:
 *   GET/PATCH/DELETE /api/profile            (→ /profile/me)
 *   GET /api/profile/check-username/:name
 *   GET/POST /api/tey/preferences           (notification prefs)
 *   GET /api/payment/my-subscriptions, POST /api/payment/cancel-subscription
 */

import { proApi, ProApiError, type ProStatus } from '@/lib/pro/api';
import React, { useEffect, useMemo, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import { useReducedMotion } from 'framer-motion';
import { Glyph, type GlyphName } from '@/components/art/Glyph';
import { fetcher } from '@/lib/swr';
import { playHaptic, isHapticsEnabled, setHapticsEnabled } from '@/lib/haptics';
import { playSound } from '@/lib/audio/lessonSounds';
import { useAudioContext } from '@/context/AudioContext';
import { setThemePref, useThemePref, type ThemePref } from '@/lib/theme/theme';
import { clearClientSession, setCachedUser } from '@/lib/user-cache';
import { Modal } from '@/components/ui/Modal';
import {
  Row,
  SavedTick,
  SectionError,
  SkeletonRows,
  Switch,
  settingsStyles as styles,
  useSavedFlash,
} from '@/components/settings/SettingsParts';

// ─── Types ────────────────────────────────────────────────────────────────

interface ProfileResponse {
  id: string;
  email?: string;
  fullName?: string;
  createdAt?: string;
  profile?: { username?: string | null } | null;
  studentProfile?: { dailyGoalXp?: number | null } | null;
}

interface NotificationPrefs {
  pushEnabled: boolean;
  streakReminders: boolean;
  dailyReminders: boolean;
  milestones: boolean;
  reengagement: boolean;
  leagueUpdates: boolean;
  courseOffers: boolean;
  communityActivity?: boolean;
  preferredHour: number | null;
}

interface Subscription {
  id: string;
  courseId: string;
  courseTitle: string;
  courseThumbnail?: string | null;
  plan: 'WEEKLY' | 'MONTHLY' | 'YEARLY' | 'LIFETIME';
  status: string;
  currentPeriodEnd: string;
  autoRenew: boolean;
  cancelAtPeriodEnd: boolean;
}

// Mirrors the backend's dailyGoalXp validation (20|50|100|200).
const DAILY_GOALS = [
  { value: 20, label: 'Casual', minutes: '5 min / day' },
  { value: 50, label: 'Regular', minutes: '10 min / day' },
  { value: 100, label: 'Serious', minutes: '15 min / day' },
  { value: 200, label: 'Intense', minutes: '20 min / day' },
] as const;

const USERNAME_PATTERN = /^[a-zA-Z0-9_]{3,30}$/;

const SECTIONS = [
  { id: 'preferences', label: 'Preferences', icon: 'sliders' },
  { id: 'goal', label: 'Daily goal', icon: 'target' },
  { id: 'profile', label: 'Profile', icon: 'user' },
  { id: 'notifications', label: 'Notifications', icon: 'bell' },
  { id: 'subscriptions', label: 'Subscriptions', icon: 'card' },
  { id: 'account', label: 'Account', icon: 'key' },
] as const;

const PLAN_LABEL: Record<Subscription['plan'], string> = {
  WEEKLY: 'Weekly (retired plan)',
  MONTHLY: 'Monthly',
  YEARLY: 'Yearly',
  LIFETIME: 'Lifetime',
};

const noopSubscribe = () => () => {};

const APPEARANCE_OPTIONS: { value: ThemePref; label: string; icon: GlyphName }[] = [
  { value: 'auto', label: 'Auto', icon: 'sunMoon' },
  { value: 'light', label: 'Light', icon: 'sun' },
  { value: 'dark', label: 'Dark', icon: 'moon' },
];

const APPEARANCE_SUB: Record<ThemePref, string> = {
  auto: 'Light by day, dark from 7 pm to 6 am',
  light: 'Always light',
  dark: 'Always dark',
};

// ─── Page ─────────────────────────────────────────────────────────────────

export default function SettingsPage() {
  const reducedMotion = useReducedMotion();
  const {
    data: me,
    error: meError,
    isLoading: meLoading,
    mutate: mutateMe,
  } = useSWR<ProfileResponse>('/api/profile', fetcher);

  const scrollTo = (id: string, index: number) => {
    playSound('navTap', index);
    document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <div className={styles.page}>
      <div className={styles.main}>
        <h1 className={styles.title}>Settings</h1>

        <PreferencesSection />
        <DailyGoalSection me={me} loading={meLoading} error={meError} onRetry={() => void mutateMe()} onSaved={(d) => void mutateMe(d, { revalidate: false })} />
        <ProfileSection me={me} loading={meLoading} error={meError} onRetry={() => void mutateMe()} onSaved={(d) => void mutateMe(d, { revalidate: false })} />
        <NotificationsSection />
        <SubscriptionsSection />
        <AccountSection />
      </div>

      {/* Desktop: Duolingo's section card on the right. */}
      <aside className={styles.aside} aria-label="Settings sections">
        <nav className={styles.sectionNav}>
          {SECTIONS.map((s, i) => (
            <button key={s.id} type="button" className={styles.sectionLink} onClick={() => scrollTo(s.id, i)}>
              <Glyph name={s.icon} size={18} strokeWidth={2.5} />
              <span>{s.label}</span>
              <Glyph name="chevron" size={16} strokeWidth={2.5} className={styles.sectionChevron} />
            </button>
          ))}
        </nav>
      </aside>
    </div>
  );
}

// ─── Preferences ──────────────────────────────────────────────────────────

function PreferencesSection() {
  const { isSfxEnabled, isMusicEnabled, setSfxEnabled, setMusicEnabled } = useAudioContext();
  // localStorage decides the switch; the server (and first paint) assume on.
  const [hapticsTick, setHapticsTick] = useState(0);
  const haptics = useSyncExternalStore(
    noopSubscribe,
    () => isHapticsEnabled() && hapticsTick >= 0,
    () => true,
  );
  const theme = useThemePref();
  const saved = useSavedFlash();

  return (
    <section id="preferences" className={styles.section} aria-labelledby="preferences-h">
      <div className={styles.sectionHead}>
        <h2 id="preferences-h" className={styles.sectionTitle}>Preferences</h2>
        <SavedTick show={saved.shown} />
      </div>
      <div className={styles.card}>
        <Row icon="sunMoon" title="Appearance" sub={APPEARANCE_SUB[theme]}>
          <div className={styles.segment} role="radiogroup" aria-label="Appearance">
            {APPEARANCE_OPTIONS.map((o) => (
              <button
                key={o.value}
                type="button"
                role="radio"
                aria-checked={theme === o.value}
                className={`${styles.segmentBtn} ${theme === o.value ? styles.segmentOn : ''}`}
                onClick={() => {
                  if (theme === o.value) return;
                  playSound('toggleOn');
                  playHaptic('selection', false);
                  setThemePref(o.value);
                  saved.flash();
                }}
              >
                <Glyph name={o.icon} size={16} strokeWidth={2.5} />
                {o.label}
              </button>
            ))}
          </div>
        </Row>
        <Row icon="soundOn" title="Sound effects" sub="Taps, right answers, rewards and celebrations">
          <Switch
            checked={isSfxEnabled}
            label="Sound effects"
            onChange={(v) => {
              setSfxEnabled(v);
              saved.flash();
            }}
          />
        </Row>
        <Row icon="music" title="Background music" sub="Soft loops while you learn">
          <Switch
            checked={isMusicEnabled}
            label="Background music"
            onChange={(v) => {
              setMusicEnabled(v);
              saved.flash();
            }}
          />
        </Row>
        <Row icon="vibrate" title="Vibration" sub="Haptic taps on this device">
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

// ─── Daily goal ───────────────────────────────────────────────────────────

interface MeSectionProps {
  me?: ProfileResponse;
  loading: boolean;
  error?: unknown;
  onRetry: () => void;
  onSaved: (next: ProfileResponse) => void;
}

function DailyGoalSection({ me, loading, error, onRetry, onSaved }: MeSectionProps) {
  const current = me?.studentProfile?.dailyGoalXp ?? 20;
  const [pending, setPending] = useState<number | null>(null);
  const [failed, setFailed] = useState(false);
  const saved = useSavedFlash();
  const selected = pending ?? current;

  const choose = async (value: number) => {
    if (value === selected) return;
    playSound('navTap', DAILY_GOALS.findIndex((g) => g.value === value));
    playHaptic('selection', false);
    setPending(value);
    setFailed(false);
    try {
      const res = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ dailyGoalXp: value }),
      });
      if (!res.ok) throw new Error(String(res.status));
      const data = (await res.json()) as ProfileResponse;
      onSaved(data);
      saved.flash();
      playSound('toggleOn');
    } catch {
      setFailed(true);
      playSound('nodeLocked');
    } finally {
      setPending(null);
    }
  };

  return (
    <section id="goal" className={styles.section} aria-labelledby="goal-h">
      <div className={styles.sectionHead}>
        <h2 id="goal-h" className={styles.sectionTitle}>Daily goal</h2>
        <SavedTick show={saved.shown} />
      </div>
      {loading ? (
        <div className={styles.card}><SkeletonRows count={4} /></div>
      ) : error ? (
        <div className={styles.card}><SectionError what="daily goal" onRetry={onRetry} /></div>
      ) : (
        <>
          <div className={styles.goalGrid} role="radiogroup" aria-label="Daily XP goal">
            {DAILY_GOALS.map((g) => {
              const on = g.value === selected;
              return (
                <button
                  key={g.value}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  className={`${styles.goalTile} ${on ? styles.goalTileOn : ''}`}
                  onClick={() => void choose(g.value)}
                  disabled={pending !== null}
                >
                  <span className={styles.goalName}>{g.label}</span>
                  <span className={styles.goalXp}>{g.value} XP</span>
                  <span className={styles.goalMinutes}>{g.minutes}</span>
                  {on && pending !== null && <Glyph name="spinner" size={16} className={`${styles.goalSpin} animate-spin`} />}
                </button>
              );
            })}
          </div>
          {failed && <p className={styles.inlineError} role="alert">That didn&apos;t save. Check your connection and tap again.</p>}
        </>
      )}
    </section>
  );
}

// ─── Profile ──────────────────────────────────────────────────────────────

type NameCheck = 'idle' | 'checking' | 'ok' | 'bad';

function ProfileSection({ me, loading, error, onRetry, onSaved }: MeSectionProps) {
  const serverName = me?.fullName ?? '';
  const serverUsername = me?.profile?.username ?? '';
  const [name, setName] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [check, setCheck] = useState<{ state: NameCheck; message?: string }>({ state: 'idle' });
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const saved = useSavedFlash();

  const nameValue = name ?? serverName;
  const usernameValue = username ?? serverUsername;
  const cleanUsername = usernameValue.trim().replace(/^@/, '').toLowerCase();
  const usernameChanged = cleanUsername !== serverUsername.toLowerCase() && cleanUsername.length > 0;
  const nameChanged = nameValue.trim() !== serverName && nameValue.trim().length > 0;
  const dirty = nameChanged || usernameChanged;

  // Debounced availability check, only when the handle actually changed.
  useEffect(() => {
    if (!usernameChanged) return;
    if (!USERNAME_PATTERN.test(cleanUsername)) return;
    const t = setTimeout(async () => {
      setCheck({ state: 'checking' });
      try {
        const res = await fetch(`/api/profile/check-username/${encodeURIComponent(cleanUsername)}`, { credentials: 'include' });
        const data = await res.json();
        setCheck(data.available ? { state: 'ok' } : { state: 'bad', message: data.message ?? 'Username is taken.' });
      } catch {
        setCheck({ state: 'idle' });
      }
    }, 450);
    return () => clearTimeout(t);
  }, [cleanUsername, usernameChanged]);

  const localUsernameError =
    usernameChanged && !USERNAME_PATTERN.test(cleanUsername)
      ? '3–30 letters, numbers or underscores.'
      : null;
  const usernameMessage = localUsernameError ?? (usernameChanged && check.state === 'bad' ? check.message : null);
  const canSave = dirty && !saving && !localUsernameError && !(usernameChanged && check.state !== 'ok');

  const save = async () => {
    if (!canSave) return;
    playHaptic('medium', false);
    playSound('next');
    setSaving(true);
    setSaveError(null);
    try {
      const body: Record<string, string> = {};
      if (nameChanged) body.fullName = nameValue.trim();
      if (usernameChanged) body.username = cleanUsername;
      const res = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        const msg = Array.isArray(err.message) ? err.message[0] : err.message;
        throw new Error(msg || 'Could not save your changes.');
      }
      const data = (await res.json()) as ProfileResponse;
      onSaved(data);
      setCachedUser(data as never);
      setName(null);
      setUsername(null);
      setCheck({ state: 'idle' });
      saved.flash();
      playSound('toggleOn');
    } catch (e) {
      setSaveError(e instanceof Error ? e.message : 'Could not save your changes.');
      playSound('nodeLocked');
    } finally {
      setSaving(false);
    }
  };

  return (
    <section id="profile" className={styles.section} aria-labelledby="profile-h">
      <div className={styles.sectionHead}>
        <h2 id="profile-h" className={styles.sectionTitle}>Profile</h2>
        <SavedTick show={saved.shown} />
      </div>
      <div className={styles.card}>
        {loading ? (
          <SkeletonRows count={3} />
        ) : error ? (
          <SectionError what="profile" onRetry={onRetry} />
        ) : (
          <div className={styles.form}>
            <label className={styles.field}>
              <span className={styles.fieldLabel}>Name</span>
              <input
                className={styles.input}
                value={nameValue}
                maxLength={60}
                autoComplete="name"
                onChange={(e) => setName(e.target.value)}
              />
            </label>

            <label className={styles.field}>
              <span className={styles.fieldLabel}>Username</span>
              <span className={styles.inputWrap}>
                <span className={styles.inputPrefix} aria-hidden="true">@</span>
                <input
                  className={`${styles.input} ${styles.inputWithPrefix} ${usernameMessage ? styles.inputBad : ''}`}
                  value={usernameValue.replace(/^@/, '')}
                  maxLength={30}
                  autoComplete="username"
                  aria-invalid={!!usernameMessage}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setCheck({ state: 'idle' });
                  }}
                />
                {usernameChanged && !localUsernameError && (
                  <span className={styles.inputStatus} aria-hidden="true">
                    {check.state === 'checking' && <Glyph name="spinner" size={16} className="animate-spin" />}
                    {check.state === 'ok' && <Glyph name="check" size={16} strokeWidth={3} className={styles.okIcon} />}
                  </span>
                )}
              </span>
              {usernameMessage && <span className={styles.fieldError}>{usernameMessage}</span>}
            </label>

            <div className={styles.field}>
              <span className={styles.fieldLabel}>Email</span>
              <div className={`${styles.input} ${styles.inputReadonly}`}>
                <Glyph name="mail" size={16} strokeWidth={2.5} />
                <span>{me?.email ?? '—'}</span>
              </div>
            </div>

            <Link href="/forgot-password" className={styles.passwordLink} onClick={() => playSound('navTap', 3)}>
              <Glyph name="key" size={18} strokeWidth={2.5} />
              <span>Change password</span>
              <Glyph name="chevron" size={16} strokeWidth={2.5} />
            </Link>

            {saveError && <p className={styles.inlineError} role="alert">{saveError}</p>}

            <button type="button" className={styles.primaryBtn} disabled={!canSave} onClick={() => void save()}>
              {saving ? <Glyph name="spinner" size={18} className="animate-spin" /> : null}
              {saving ? 'Saving' : 'Save changes'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Notifications ────────────────────────────────────────────────────────

const REMINDER_HOURS = [7, 8, 9, 12, 17, 18, 19, 20, 21];

function hourLabel(h: number) {
  const suffix = h < 12 ? 'AM' : 'PM';
  const hr = h % 12 === 0 ? 12 : h % 12;
  return `${hr}:00 ${suffix}`;
}

function NotificationsSection() {
  const { data, error, isLoading, mutate } = useSWR<{ prefs: NotificationPrefs }>('/api/tey/preferences', fetcher);
  const [failed, setFailed] = useState(false);
  const saved = useSavedFlash();
  const prefs = data?.prefs;

  const update = async (patch: Partial<NotificationPrefs>) => {
    if (!prefs) return;
    setFailed(false);
    const optimistic = { prefs: { ...prefs, ...patch } };
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
          return (await res.json()) as { prefs: NotificationPrefs };
        },
        { optimisticData: optimistic, rollbackOnError: true, revalidate: false },
      );
      saved.flash();
    } catch {
      setFailed(true);
    }
  };

  const off = prefs ? !prefs.pushEnabled : false;

  return (
    <section id="notifications" className={styles.section} aria-labelledby="notifications-h">
      <div className={styles.sectionHead}>
        <h2 id="notifications-h" className={styles.sectionTitle}>Notifications</h2>
        <SavedTick show={saved.shown} />
      </div>
      <div className={styles.card}>
        {isLoading ? (
          <SkeletonRows count={5} />
        ) : error || !prefs ? (
          <SectionError what="notification settings" onRetry={() => void mutate()} />
        ) : (
          <>
            <Row icon="bell" title="Notifications from Tey" sub="Reminders and news on this device">
              <Switch checked={prefs.pushEnabled} label="Notifications" onChange={(v) => void update({ pushEnabled: v })} />
            </Row>
            <div className={`${styles.subRows} ${off ? styles.subRowsOff : ''}`} aria-disabled={off}>
              <Row icon="target" title="Streak saver" sub="A nudge before your streak runs out">
                <Switch checked={prefs.streakReminders} disabled={off} label="Streak saver" onChange={(v) => void update({ streakReminders: v })} />
              </Row>
              <Row icon="refresh" title="Practice reminder" sub="Your daily lesson, at your time">
                <Switch checked={prefs.dailyReminders} disabled={off} label="Practice reminder" onChange={(v) => void update({ dailyReminders: v })} />
              </Row>
              <Row icon="check" title="Milestones" sub="Level ups, streak records, badges">
                <Switch checked={prefs.milestones} disabled={off} label="Milestones" onChange={(v) => void update({ milestones: v })} />
              </Row>
              <Row icon="user" title="Come-back nudges" sub="If you've been away a few days">
                <Switch checked={prefs.reengagement} disabled={off} label="Come-back nudges" onChange={(v) => void update({ reengagement: v })} />
              </Row>
              <Row icon="trophy" title="League updates" sub="Someone passes you, the week is ending, your result">
                <Switch checked={prefs.leagueUpdates ?? true} disabled={off} label="League updates" onChange={(v) => void update({ leagueUpdates: v })} />
              </Row>
              <Row icon="bubble" title="Community" sub="Replies, mentions and new posts in the course you're focused on">
                <Switch checked={prefs.communityActivity ?? true} disabled={off} label="Community" onChange={(v) => void update({ communityActivity: v })} />
              </Row>
              <Row icon="book" title="Course updates" sub="Picking up a course you started">
                <Switch checked={prefs.courseOffers ?? true} disabled={off} label="Course updates" onChange={(v) => void update({ courseOffers: v })} />
              </Row>
              <Row icon="bell" title="Reminder time" sub="When your practice reminder arrives">
                <select
                  className={styles.select}
                  value={prefs.preferredHour ?? ''}
                  disabled={off}
                  aria-label="Reminder time"
                  onChange={(e) => {
                    playSound('navTap', 2);
                    void update({ preferredHour: e.target.value === '' ? null : Number(e.target.value) });
                  }}
                >
                  <option value="">Smart (when you usually learn)</option>
                  {REMINDER_HOURS.map((h) => (
                    <option key={h} value={h}>{hourLabel(h)}</option>
                  ))}
                </select>
              </Row>
            </div>
            {failed && <p className={styles.inlineError} role="alert">That change didn&apos;t save. Try again.</p>}
          </>
        )}
      </div>
    </section>
  );
}

// ─── Subscriptions ────────────────────────────────────────────────────────

/** Teyro Pro: the plan itself, how it renews, and where to manage it. */
function ProPlanRow() {
  const { data: pro } = useSWR<ProStatus>('/api/pro/status', fetcher);
  const [opening, setOpening] = useState(false);
  const [portalError, setPortalError] = useState<string | null>(null);
  if (!pro?.enabled) return null;
  const fmt = (iso: string | null) =>
    iso ? new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : '';

  const openPortal = async (flow?: 'payment_method_update') => {
    setOpening(true);
    setPortalError(null);
    try {
      const { url } = await proApi.portal(flow, '/dashboard/settings');
      window.location.assign(url);
    } catch (err) {
      setPortalError(err instanceof ProApiError ? err.message : 'Billing is unavailable right now.');
      setOpening(false);
    }
  };

  if (!pro.isPro) {
    return (
      <div className={styles.subRow}>
        <span className={styles.rowText}>
          <span className={styles.rowTitle}>Teyro Pro</span>
          <span className={styles.rowSub}>Every course, no daily limit, unlimited hearts.</span>
        </span>
        <Link href="/pro?m=SETTINGS&returnTo=%2Fdashboard%2Fsettings" className={styles.primaryBtn} onClick={() => playSound('navTap', 2)}>
          See plans
        </Link>
      </div>
    );
  }

  const line =
    pro.status === 'PAST_DUE'
      ? `Payment failed · access until ${fmt(pro.graceUntil)}`
      : pro.status === 'TRIALING'
        ? `Free trial until ${fmt(pro.trialEndsAt)}${pro.cancelAtPeriodEnd ? ' · cancelled' : ''}`
        : pro.provider === 'MESOMB'
          ? `Paid with Mobile Money · access until ${fmt(pro.currentPeriodEnd)}`
          : pro.cancelAtPeriodEnd
            ? `Cancelled · access until ${fmt(pro.currentPeriodEnd)}`
            : `Renews ${fmt(pro.currentPeriodEnd)}`;

  return (
    <div className={styles.subRow}>
      <span className={styles.rowText}>
        <span className={styles.rowTitle}>Teyro Pro · {pro.plan === 'YEARLY' ? 'Yearly' : 'Monthly'}</span>
        <span className={styles.rowSub}>{line}</span>
        {portalError && <span className={styles.inlineError} role="alert">{portalError}</span>}
      </span>
      {pro.provider === 'MESOMB' ? (
        <Link href="/pro?m=SETTINGS&returnTo=%2Fdashboard%2Fsettings" className={styles.secondaryBtn} onClick={() => playSound('navTap', 2)}>
          Renew
        </Link>
      ) : (
        <button
          type="button"
          className={styles.secondaryBtn}
          disabled={opening}
          onClick={() => void openPortal(pro.status === 'PAST_DUE' ? 'payment_method_update' : undefined)}
        >
          {pro.status === 'PAST_DUE' ? 'Update card' : 'Manage'}
        </button>
      )}
    </div>
  );
}

function SubscriptionsSection() {
  const { data, error, isLoading, mutate } = useSWR<Subscription[]>('/api/payment/my-subscriptions', fetcher);
  const { data: pro } = useSWR<ProStatus>('/api/pro/status', fetcher);
  const [cancelTarget, setCancelTarget] = useState<Subscription | null>(null);
  const [cancelling, setCancelling] = useState(false);
  const [cancelError, setCancelError] = useState<string | null>(null);

  // The API returns every billing record newest-first; show one row per course.
  const subs = useMemo(() => {
    const seen = new Set<string>();
    return (data ?? []).filter((s) => (seen.has(s.courseId) ? false : (seen.add(s.courseId), true)));
  }, [data]);

  const confirmCancel = async () => {
    if (!cancelTarget) return;
    setCancelling(true);
    setCancelError(null);
    try {
      const res = await fetch('/api/payment/cancel-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ courseId: cancelTarget.courseId }),
      });
      if (!res.ok) throw new Error(String(res.status));
      playSound('toggleOff');
      setCancelTarget(null);
      await mutate();
    } catch {
      setCancelError("We couldn't cancel that just now. Please try again.");
      playSound('nodeLocked');
    } finally {
      setCancelling(false);
    }
  };

  const fmt = (iso: string) => new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <section id="subscriptions" className={styles.section} aria-labelledby="subscriptions-h">
      <div className={styles.sectionHead}>
        <h2 id="subscriptions-h" className={styles.sectionTitle}>Subscriptions</h2>
      </div>
      <div className={styles.card}>
        <ProPlanRow />
        {isLoading ? (
          <SkeletonRows count={2} />
        ) : error ? (
          <SectionError what="subscriptions" onRetry={() => void mutate()} />
        ) : subs.length === 0 && pro?.enabled ? null : subs.length === 0 ? (
          <div className={styles.empty}>
            <Glyph name="card" size={28} strokeWidth={2.25} />
            <p className={styles.emptyTitle}>No subscriptions</p>
            <p className={styles.emptySub}>Unlocked courses show up here, with their renewal date.</p>
            <Link href="/dashboard/explore" className={styles.secondaryBtn} onClick={() => playSound('navTap', 2)}>
              Explore courses
            </Link>
          </div>
        ) : (
          subs.map((s) => {
            const active = s.status === 'ACTIVE';
            const renews = active && s.autoRenew && !s.cancelAtPeriodEnd;
            return (
              <div key={s.id} className={styles.subRow}>
                {s.courseThumbnail ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={s.courseThumbnail} alt="" className={styles.subThumb} />
                ) : (
                  <span className={styles.subThumb} aria-hidden="true" />
                )}
                <span className={styles.rowText}>
                  <span className={styles.rowTitle}>{s.courseTitle}</span>
                  <span className={styles.rowSub}>
                    {PLAN_LABEL[s.plan] ?? s.plan} ·{' '}
                    {!active ? `Ended ${fmt(s.currentPeriodEnd)}` : renews ? `Renews ${fmt(s.currentPeriodEnd)}` : `Access until ${fmt(s.currentPeriodEnd)}`}
                  </span>
                </span>
                {renews ? (
                  <button type="button" className={styles.linkBtnDanger} onClick={() => { playSound('menuOpen'); setCancelError(null); setCancelTarget(s); }}>
                    Cancel
                  </button>
                ) : (
                  // Plans that don't renew by themselves (Mobile Money, or a
                  // cancelled card plan) — active or ended — renew from here.
                  // Renewing early stacks onto the current end date.
                  <Link
                    href={`/learn/${s.courseId}/unlock?renew=1`}
                    className={styles.secondaryBtn}
                    onClick={() => playSound('navTap', 2)}
                  >
                    Renew
                  </Link>
                )}
              </div>
            );
          })
        )}
      </div>

      <Modal isOpen={!!cancelTarget} onClose={() => !cancelling && setCancelTarget(null)} title="Cancel subscription?" size="sm">
        <div className={styles.modalBody}>
          <p className={styles.modalText}>
            You&apos;ll keep full access to <strong>{cancelTarget?.courseTitle}</strong> until{' '}
            {cancelTarget ? fmt(cancelTarget.currentPeriodEnd) : ''}. It just won&apos;t renew after that.
          </p>
          {cancelError && <p className={styles.inlineError} role="alert">{cancelError}</p>}
          <div className={styles.modalActions}>
            <button type="button" className={styles.primaryBtn} onClick={() => setCancelTarget(null)} disabled={cancelling}>
              Keep learning
            </button>
            <button type="button" className={styles.ghostDanger} onClick={() => void confirmCancel()} disabled={cancelling}>
              {cancelling ? 'Cancelling' : 'Cancel subscription'}
            </button>
          </div>
        </div>
      </Modal>
    </section>
  );
}

// ─── Account ──────────────────────────────────────────────────────────────

function AccountSection() {
  const [confirming, setConfirming] = useState(false);
  const [typed, setTyped] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const logout = async () => {
    playSound('menuClose');
    clearClientSession();
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    } catch {
      // still leave
    }
    window.location.href = '/login';
  };

  const deleteAccount = async () => {
    if (typed.trim().toUpperCase() !== 'DELETE') return;
    setDeleting(true);
    setDeleteError(null);
    try {
      const res = await fetch('/api/profile', { method: 'DELETE', credentials: 'include' });
      if (!res.ok) throw new Error(String(res.status));
      clearClientSession();
      window.location.href = '/';
    } catch {
      setDeleteError("We couldn't delete your account just now. Please try again.");
      setDeleting(false);
    }
  };

  return (
    <section id="account" className={styles.section} aria-labelledby="account-h">
      <div className={styles.sectionHead}>
        <h2 id="account-h" className={styles.sectionTitle}>Account</h2>
      </div>
      <div className={styles.accountActions}>
        <button type="button" className={styles.secondaryBtn} onClick={() => void logout()}>
          <Glyph name="logout" size={18} strokeWidth={2.5} /> Log out
        </button>
        <button
          type="button"
          className={styles.ghostDanger}
          onClick={() => {
            playSound('menuOpen');
            setTyped('');
            setDeleteError(null);
            setConfirming(true);
          }}
        >
          <Glyph name="trash" size={18} strokeWidth={2.5} /> Delete account
        </button>
      </div>

      <Modal isOpen={confirming} onClose={() => !deleting && setConfirming(false)} title="Delete your account?" size="sm">
        <div className={styles.modalBody}>
          <p className={styles.modalText}>
            This removes your progress, streak, coins, courses and badges for good. It can&apos;t be undone.
          </p>
          <label className={styles.field}>
            <span className={styles.fieldLabel}>Type DELETE to confirm</span>
            <input className={styles.input} value={typed} onChange={(e) => setTyped(e.target.value)} autoComplete="off" />
          </label>
          {deleteError && <p className={styles.inlineError} role="alert">{deleteError}</p>}
          <div className={styles.modalActions}>
            <button type="button" className={styles.primaryBtn} onClick={() => setConfirming(false)} disabled={deleting}>
              Keep my account
            </button>
            <button
              type="button"
              className={styles.ghostDanger}
              onClick={() => void deleteAccount()}
              disabled={deleting || typed.trim().toUpperCase() !== 'DELETE'}
            >
              {deleting ? 'Deleting' : 'Delete forever'}
            </button>
          </div>
        </div>
      </Modal>
    </section>
  );
}
