'use client';

/**
 * "Your creator profile" — the three things that make a creator page feel
 * real: a @username (checked live), a headline (with suggestions written from
 * the onboarding answers), and an optional photo. A preview card mirrors
 * every keystroke, so the creator sees exactly what learners will see.
 *
 * Runs after the account exists: the username check and the photo upload
 * are signed-in endpoints. Saved with one PATCH /profile/me.
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { AtSign, Camera, Check, Loader2, X } from 'lucide-react';
import { Field, FieldGroup, FormError, PrimaryButton, authStyles } from '@/components/auth/AuthUi';
import { extractErrorMessage } from '@/lib/apiError';
import { playHaptic } from '@/lib/haptics';
import { playSound } from '@/lib/audio/lessonSounds';
import { trackLabel } from '@/lib/creator/categories';
import { HEADLINE_MAX, headlineIdeas, suggestUsername } from '@/lib/creator-onboarding/profile';
import type { CreatorAnswers } from '@/lib/creator-onboarding/catalog';
import { creatorIcon } from '../creatorIcons';
import type { CreatorSessionUser } from '../useCreatorSession';
import styles from '../CreatorOnboarding.module.css';

const USERNAME_RE = /^[a-z0-9_]{3,30}$/;

type UsernameCheck = { state: 'idle' | 'checking' | 'ok' | 'taken' | 'invalid'; message?: string };

export function CreatorProfileScreen({
  user,
  answers,
  onDone,
}: {
  user: CreatorSessionUser;
  answers: CreatorAnswers;
  onDone: () => void;
}) {
  const reduce = useReducedMotion() ?? false;
  const displayName = answers.name || user.fullName || 'You';
  const [username, setUsername] = useState(
    () => user.profile?.username || suggestUsername(answers.name || user.fullName || ''),
  );
  const [headline, setHeadline] = useState(user.profile?.headline ?? '');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(user.profile?.avatarUrl || user.avatarUrl || null);
  const [uploading, setUploading] = useState(false);
  const [check, setCheck] = useState<UsernameCheck>({ state: 'idle' });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);
  const ideas = useMemo(() => headlineIdeas(answers), [answers]);

  // Live availability check, debounced; the latest request wins.
  useEffect(() => {
    const candidate = username.trim().toLowerCase();
    if (!candidate) {
      setCheck({ state: 'idle' });
      return;
    }
    if (!USERNAME_RE.test(candidate)) {
      setCheck({ state: 'invalid', message: '3 to 30 letters, numbers or underscores.' });
      return;
    }
    setCheck({ state: 'checking' });
    const ctrl = new AbortController();
    const t = window.setTimeout(async () => {
      try {
        const res = await fetch(`/api/profile/check-username/${encodeURIComponent(candidate)}`, {
          credentials: 'include',
          signal: ctrl.signal,
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(extractErrorMessage(data, res.status));
        if (data.available) {
          setCheck({ state: 'ok' });
          playSound('toggleOn');
        } else {
          setCheck({ state: 'taken', message: data.message || 'That one is taken.' });
        }
      } catch (err) {
        if ((err as Error).name === 'AbortError') return;
        // Can't check right now: let the save be the judge.
        setCheck({ state: 'idle' });
      }
    }, 450);
    return () => {
      ctrl.abort();
      window.clearTimeout(t);
    };
  }, [username]);

  const upload = async (file: File) => {
    setUploading(true);
    setError('');
    try {
      const form = new FormData();
      form.append('file', file);
      const res = await fetch('/api/upload/avatar', { method: 'POST', body: form, credentials: 'include' });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.url) throw new Error(data.error || "That photo didn't upload. Try another?");
      setAvatarUrl(data.url);
      playSound('like');
      playHaptic('light', false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "That photo didn't upload. Try another?");
      playSound('wrong');
    } finally {
      setUploading(false);
    }
  };

  const save = async () => {
    if (saving) return;
    const candidate = username.trim().toLowerCase();
    if (!USERNAME_RE.test(candidate)) {
      setError('Pick a username: 3 to 30 letters, numbers or underscores.');
      playSound('wrong');
      playHaptic('error', false);
      return;
    }
    if (check.state === 'taken') {
      setError(check.message ?? 'That username is taken.');
      playSound('wrong');
      playHaptic('error', false);
      return;
    }
    setSaving(true);
    setError('');
    try {
      const body: Record<string, unknown> = { username: candidate };
      if (headline.trim()) body.headline = headline.trim();
      if (avatarUrl) body.avatarUrl = avatarUrl;
      if (answers.name) body.fullName = answers.name;
      const res = await fetch('/api/profile/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(extractErrorMessage(data, res.status));
      playSound('profileSaved');
      playHaptic('success', false);
      onDone();
    } catch (err) {
      setError(err instanceof Error ? err.message : "That didn't save. Try again?");
      playSound('wrong');
      playHaptic('error', false);
    } finally {
      setSaving(false);
    }
  };

  const trackArt = answers.track ? creatorIcon('track', answers.track) : undefined;
  const initial = displayName.trim().charAt(0).toUpperCase() || '?';

  return (
    <div className={styles.profileStep}>
      {/* Live preview: what a learner sees. */}
      <motion.div
        className={styles.previewCard}
        initial={reduce ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 320, damping: 26 }}
        aria-label="Profile preview"
      >
        <div className={styles.previewBanner} aria-hidden="true" />
        <button
          type="button"
          className={styles.previewAvatar}
          onClick={() => {
            playSound('navTap', 3);
            fileRef.current?.click();
          }}
          aria-label={avatarUrl ? 'Change photo' : 'Add a photo'}
        >
          {avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={avatarUrl} alt="" />
          ) : (
            <span>{initial}</span>
          )}
          <span className={styles.previewCamera} aria-hidden="true">
            {uploading ? <Loader2 size={16} className={styles.spin} /> : <Camera size={16} strokeWidth={2.5} />}
          </span>
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          hidden
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void upload(file);
            e.target.value = '';
          }}
        />
        <strong className={styles.previewName}>{displayName}</strong>
        <span className={styles.previewHandle}>@{username.trim().toLowerCase() || 'username'}</span>
        <AnimatePresence initial={false}>
          {headline.trim() && (
            <motion.p
              className={styles.previewHeadline}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              {headline.trim()}
            </motion.p>
          )}
        </AnimatePresence>
        {answers.track && (
          <span
            className={styles.previewTrack}
            style={trackArt ? { color: trackArt.tone, background: `color-mix(in srgb, ${trackArt.tone} 12%, var(--bg-card))` } : undefined}
          >
            {trackArt && <trackArt.Icon size={14} strokeWidth={2.5} aria-hidden="true" />}
            Teaches {trackLabel(answers.track)}
          </span>
        )}
      </motion.div>

      <div className={styles.profileForm}>
        <FieldGroup>
          <Field
            label="Username"
            autoComplete="username"
            autoCapitalize="none"
            spellCheck={false}
            value={username}
            maxLength={30}
            onChange={(e) => setUsername(e.target.value.replace(/[^a-zA-Z0-9_]/g, '').toLowerCase())}
            trailing={
              <span className={styles.usernameState} aria-live="polite">
                {check.state === 'checking' && <Loader2 size={18} className={styles.spin} aria-label="Checking" />}
                {check.state === 'ok' && <Check size={20} strokeWidth={3} className={styles.ok} aria-label="Available" />}
                {(check.state === 'taken' || check.state === 'invalid') && (
                  <X size={20} strokeWidth={3} className={styles.bad} aria-label="Not available" />
                )}
              </span>
            }
          />
          <Field
            label="Headline (optional)"
            value={headline}
            maxLength={HEADLINE_MAX}
            onChange={(e) => setHeadline(e.target.value)}
          />
        </FieldGroup>
        <p className={authStyles.hint}>
          <AtSign size={13} aria-hidden="true" />
          {check.message ?? 'Your page will be teyro.app/creator-profile/' + (username || 'username')}
        </p>

        <div className={styles.ideas} role="group" aria-label="Headline ideas">
          {ideas.map((idea) => (
            <button
              key={idea}
              type="button"
              className={`${styles.idea} ${headline === idea ? styles.ideaOn : ''}`}
              onClick={() => {
                setHeadline(idea);
                playSound('select');
                playHaptic('selection', false);
              }}
            >
              {idea}
            </button>
          ))}
        </div>

        <FormError message={error} />
        <PrimaryButton type="button" busy={saving} onClick={save} disabled={uploading}>
          {saving ? 'Saving…' : 'Save my profile'}
        </PrimaryButton>
        <button
          type="button"
          className={authStyles.forgot}
          style={{ alignSelf: 'center' }}
          onClick={() => {
            playSound('cardNext');
            onDone();
          }}
        >
          I&apos;ll do this later
        </button>
      </div>
    </div>
  );
}

export default CreatorProfileScreen;
