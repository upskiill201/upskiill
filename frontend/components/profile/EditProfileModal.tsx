'use client';

/**
 * Edit profile: name, @username (checked live), bio and location. One Save.
 * Sign-in details (email, password) live in Settings.
 */

import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { playSound } from '@/lib/audio/lessonSounds';
import { playHaptic } from '@/lib/haptics';
import { setCachedUser } from '@/lib/user-cache';
import type { MyProfile } from './types';
import styles from './Profile.module.css';

const USERNAME = /^[a-zA-Z0-9_]{3,30}$/;
const BIO_MAX = 160;

const COUNTRIES = [
  'Algeria', 'Argentina', 'Australia', 'Bangladesh', 'Brazil', 'Cameroon', 'Canada', 'China', 'Colombia',
  'Congo', "Côte d'Ivoire", 'Egypt', 'Ethiopia', 'France', 'Gabon', 'Germany', 'Ghana', 'India', 'Indonesia',
  'Italy', 'Japan', 'Kenya', 'Malaysia', 'Mexico', 'Morocco', 'Nepal', 'Netherlands', 'Nigeria', 'Pakistan',
  'Peru', 'Philippines', 'Poland', 'Rwanda', 'Saudi Arabia', 'Senegal', 'Sierra Leone', 'Singapore',
  'South Africa', 'South Korea', 'Spain', 'Sweden', 'Switzerland', 'Tanzania', 'Thailand', 'Turkey', 'Uganda',
  'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Vietnam', 'Zambia', 'Zimbabwe',
];

interface Props {
  open: boolean;
  me: MyProfile;
  onClose: () => void;
  onSaved: (next: MyProfile) => void;
}

type Check = { state: 'idle' | 'checking' | 'ok' | 'bad'; message?: string };

export default function EditProfileModal({ open, me, onClose, onSaved }: Props) {
  const [name, setName] = useState(me.fullName ?? '');
  const [username, setUsername] = useState(me.profile?.username ?? '');
  const [bio, setBio] = useState(me.profile?.bio ?? '');
  const [location, setLocation] = useState(me.profile?.location ?? '');
  const [check, setCheck] = useState<Check>({ state: 'idle' });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cleanUsername = username.trim().replace(/^@/, '').toLowerCase();
  const usernameChanged = cleanUsername !== (me.profile?.username ?? '').toLowerCase();
  const usernameInvalid = usernameChanged && !USERNAME.test(cleanUsername);

  useEffect(() => {
    if (!open || !usernameChanged || usernameInvalid) return;
    const t = setTimeout(async () => {
      setCheck({ state: 'checking' });
      try {
        const res = await fetch(`/api/profile/check-username/${encodeURIComponent(cleanUsername)}`, { credentials: 'include' });
        const data = await res.json();
        setCheck(data.available ? { state: 'ok' } : { state: 'bad', message: data.message ?? 'That username is taken.' });
      } catch {
        setCheck({ state: 'idle' });
      }
    }, 450);
    return () => clearTimeout(t);
  }, [open, cleanUsername, usernameChanged, usernameInvalid]);

  const dirty =
    name.trim() !== (me.fullName ?? '') ||
    usernameChanged ||
    bio.trim() !== (me.profile?.bio ?? '') ||
    location !== (me.profile?.location ?? '');
  const canSave =
    dirty && !saving && name.trim().length > 0 && !usernameInvalid && !(usernameChanged && check.state !== 'ok');

  const save = async () => {
    if (!canSave) return;
    setSaving(true);
    setError(null);
    playHaptic('medium', false);
    playSound('next');
    try {
      const body: Record<string, string> = { fullName: name.trim(), bio: bio.trim(), location };
      if (usernameChanged) body.username = cleanUsername;
      const res = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error((Array.isArray(err.message) ? err.message[0] : err.message) || 'Could not save your profile.');
      }
      const data = (await res.json()) as MyProfile;
      setCachedUser(data as never);
      playSound('toggleOn');
      onSaved(data);
      onClose();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not save your profile.');
      playSound('nodeLocked');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal isOpen={open} onClose={() => !saving && onClose()} title="Edit profile" size="md">
      <div className={styles.form}>
        <label className={styles.field}>
          <span className={styles.fieldLabel}>Name</span>
          <input className={styles.input} value={name} maxLength={60} onChange={(e) => setName(e.target.value)} autoComplete="name" />
        </label>

        <label className={styles.field}>
          <span className={styles.fieldLabel}>Username</span>
          <input
            className={`${styles.input} ${usernameInvalid || check.state === 'bad' ? styles.inputBad : ''}`}
            value={username.replace(/^@/, '')}
            maxLength={30}
            onChange={(e) => {
              setUsername(e.target.value);
              setCheck({ state: 'idle' });
            }}
            autoComplete="username"
          />
          {usernameInvalid ? (
            <span className={styles.fieldError}>3–30 letters, numbers or underscores.</span>
          ) : usernameChanged && check.state === 'bad' ? (
            <span className={styles.fieldError}>{check.message}</span>
          ) : usernameChanged && check.state === 'ok' ? (
            <span className={styles.fieldOk}>@{cleanUsername} is available</span>
          ) : usernameChanged && check.state === 'checking' ? (
            <span className={styles.fieldHint}>Checking…</span>
          ) : null}
        </label>

        <label className={styles.field}>
          <span className={styles.fieldLabel}>Bio</span>
          <textarea
            className={styles.textarea}
            value={bio}
            maxLength={BIO_MAX}
            placeholder="What are you learning, and why?"
            onChange={(e) => setBio(e.target.value)}
          />
          <span className={styles.fieldHint}>
            {bio.length}/{BIO_MAX}
          </span>
        </label>

        <label className={styles.field}>
          <span className={styles.fieldLabel}>Location</span>
          <select className={styles.select} value={location} onChange={(e) => setLocation(e.target.value)}>
            <option value="">Not shown</option>
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        {error && <p className={styles.fieldError} role="alert">{error}</p>}

        <button type="button" className={styles.primaryBtn} disabled={!canSave} onClick={() => void save()}>
          {saving && <Loader2 size={18} className="animate-spin" />}
          {saving ? 'Saving' : 'Save changes'}
        </button>
      </div>
    </Modal>
  );
}
