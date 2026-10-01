'use client';

/**
 * EDIT PROFILE for a creator — a bottom sheet (a centred card on desktop):
 * name, @username with a live check, headline, about, what they teach
 * (track + topics), and social links. One PATCH /profile/me on save, with the
 * "profile saved" ting.
 */

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Check, Loader2, X } from 'lucide-react';
import { FormError, PrimaryButton } from '@/components/auth/AuthUi';
import { CREATOR_TRACK_LIST, CREATOR_TRACKS, type CreatorTrack } from '@/lib/creator/categories';
import { extractErrorMessage } from '@/lib/apiError';
import { playHaptic } from '@/lib/haptics';
import { playSound } from '@/lib/audio/lessonSounds';
import type { CreatorSocials } from './types';
import styles from './EditCreatorProfileSheet.module.css';

export interface EditableCreatorProfile {
  fullName: string;
  username: string;
  headline: string;
  location: string;
  about: string;
  track: CreatorTrack | null;
  topics: string[];
  socials: CreatorSocials;
}

export type EditFocus = 'username' | 'headline' | 'about' | 'topics' | 'socials' | null;

const SOCIAL_FIELDS: { key: keyof CreatorSocials; label: string }[] = [
  { key: 'website', label: 'Website' },
  { key: 'youtube', label: 'YouTube' },
  { key: 'linkedin', label: 'LinkedIn' },
  { key: 'github', label: 'GitHub' },
  { key: 'twitter', label: 'X / Twitter' },
  { key: 'instagram', label: 'Instagram' },
  { key: 'tiktok', label: 'TikTok' },
];

const USERNAME_RE = /^[a-z0-9_]{3,30}$/;

/** A filled-in edit form needs its labels visible, unlike the sign-up box. */
function LabeledField({
  label,
  trailing,
  ...input
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; trailing?: React.ReactNode }) {
  return (
    <label className={styles.row}>
      <span className={styles.rowLabel}>{label}</span>
      <span className={styles.rowLine}>
        <input className={styles.rowInput} {...input} />
        {trailing}
      </span>
    </label>
  );
}

/** "youtube.com/@ada" → "https://youtube.com/@ada"; blank stays blank. */
export function normalizeLink(raw: string): string {
  const v = raw.trim();
  if (!v) return '';
  return /^https?:\/\//i.test(v) ? v : `https://${v}`;
}

export default function EditCreatorProfileSheet({
  open,
  initial,
  focus,
  onClose,
  onSaved,
}: {
  open: boolean;
  initial: EditableCreatorProfile;
  focus: EditFocus;
  onClose: () => void;
  onSaved: () => void;
}) {
  const reduce = useReducedMotion() ?? false;
  const [form, setForm] = useState(initial);
  const [nameCheck, setNameCheck] = useState<'idle' | 'checking' | 'ok' | 'bad'>('idle');
  const [nameMsg, setNameMsg] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const sectionRefs = useRef<Partial<Record<Exclude<EditFocus, null>, HTMLElement | null>>>({});

  // Fresh copy each time it opens.
  useEffect(() => {
    if (!open) return;
    setForm(initial);
    setError('');
    setNameCheck('idle');
    const t = window.setTimeout(() => {
      if (focus) sectionRefs.current[focus]?.scrollIntoView({ block: 'center', behavior: reduce ? 'auto' : 'smooth' });
    }, 250);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Escape closes.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  // Live username check (only when it changed).
  useEffect(() => {
    if (!open) return;
    const candidate = form.username.trim().toLowerCase();
    if (candidate === initial.username.toLowerCase()) {
      setNameCheck('idle');
      setNameMsg('');
      return;
    }
    if (!USERNAME_RE.test(candidate)) {
      setNameCheck('bad');
      setNameMsg('3 to 30 letters, numbers or underscores.');
      return;
    }
    setNameCheck('checking');
    const ctrl = new AbortController();
    const t = window.setTimeout(async () => {
      try {
        const res = await fetch(`/api/profile/check-username/${encodeURIComponent(candidate)}`, {
          credentials: 'include',
          signal: ctrl.signal,
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error();
        setNameCheck(data.available ? 'ok' : 'bad');
        setNameMsg(data.available ? '' : data.message || 'That one is taken.');
      } catch (e) {
        if ((e as Error).name !== 'AbortError') setNameCheck('idle');
      }
    }, 450);
    return () => {
      ctrl.abort();
      window.clearTimeout(t);
    };
  }, [form.username, initial.username, open]);

  const set = <K extends keyof EditableCreatorProfile>(key: K, value: EditableCreatorProfile[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const pickTrack = (track: CreatorTrack) => {
    if (track === form.track) return;
    playSound('select');
    playHaptic('selection', false);
    // Topics belong to a track.
    setForm((f) => ({ ...f, track, topics: [] }));
  };

  const toggleTopic = (id: string) => {
    playSound('select');
    playHaptic('selection', false);
    setForm((f) => ({
      ...f,
      topics: f.topics.includes(id) ? f.topics.filter((t) => t !== id) : [...f.topics, id],
    }));
  };

  const save = async () => {
    if (saving) return;
    if (nameCheck === 'bad') {
      setError(nameMsg || 'Pick a different username.');
      playSound('wrong');
      playHaptic('error', false);
      return;
    }
    setSaving(true);
    setError('');
    try {
      const socials = Object.fromEntries(
        SOCIAL_FIELDS.map(({ key }) => [key, normalizeLink(form.socials[key] ?? '')]),
      );
      const body: Record<string, unknown> = {
        headline: form.headline.trim(),
        location: form.location.trim(),
        about: form.about.trim(),
        subCategories: form.topics,
        ...socials,
      };
      if (form.fullName.trim()) body.fullName = form.fullName.trim();
      if (form.username.trim()) body.username = form.username.trim().toLowerCase();
      if (form.track) {
        body.niche = form.track;
        body.primaryExpertise = CREATOR_TRACKS[form.track].label;
      }
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
      onSaved();
    } catch (e) {
      setError(e instanceof Error ? e.message : "That didn't save. Try again?");
      playSound('wrong');
      playHaptic('error', false);
    } finally {
      setSaving(false);
    }
  };

  const topics = form.track ? CREATOR_TRACKS[form.track].topics : [];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={styles.sheet}
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-creator-title"
            onClick={(e) => e.stopPropagation()}
            initial={reduce ? { opacity: 0 } : { y: 48, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { y: 32, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 380, damping: 34 }}
          >
            <header className={styles.head}>
              <h2 id="edit-creator-title">Edit profile</h2>
              <button type="button" className={styles.close} onClick={onClose} aria-label="Close">
                <X size={24} strokeWidth={3} />
              </button>
            </header>

            <div className={styles.body}>
              <section
                ref={(el) => {
                  sectionRefs.current.username = el;
                  sectionRefs.current.headline = el;
                }}
              >
                <h3>You</h3>
                <div className={styles.group}>
                  <LabeledField label="Name" value={form.fullName} maxLength={100} onChange={(e) => set('fullName', e.target.value)} />
                  <LabeledField
                    label="Username"
                    value={form.username}
                    maxLength={30}
                    autoCapitalize="none"
                    spellCheck={false}
                    onChange={(e) => set('username', e.target.value.replace(/[^a-zA-Z0-9_]/g, '').toLowerCase())}
                    trailing={
                      <span className={styles.check} aria-live="polite">
                        {nameCheck === 'checking' && <Loader2 size={18} className={styles.spin} aria-label="Checking" />}
                        {nameCheck === 'ok' && <Check size={20} strokeWidth={3} className={styles.ok} aria-label="Available" />}
                        {nameCheck === 'bad' && <X size={20} strokeWidth={3} className={styles.bad} aria-label="Not available" />}
                      </span>
                    }
                  />
                  <LabeledField label="Headline" value={form.headline} maxLength={120} onChange={(e) => set('headline', e.target.value)} />
                  <LabeledField label="Location (optional)" value={form.location} maxLength={100} placeholder="City, country" onChange={(e) => set('location', e.target.value)} />
                </div>
                {nameMsg && <p className={styles.hintBad}>{nameMsg}</p>}
              </section>

              <section ref={(el) => { sectionRefs.current.about = el; }}>
                <h3>About</h3>
                <label className={styles.textareaWrap}>
                  <span className="sr-only">About you</span>
                  <textarea
                    className={styles.textarea}
                    value={form.about}
                    maxLength={2500}
                    rows={5}
                    placeholder="Who you are, what you've built, and how you teach."
                    onChange={(e) => set('about', e.target.value)}
                  />
                </label>
              </section>

              <section ref={(el) => { sectionRefs.current.topics = el; }}>
                <h3>What you teach</h3>
                <div className={styles.chips} role="radiogroup" aria-label="Track">
                  {CREATOR_TRACK_LIST.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      role="radio"
                      aria-checked={form.track === t.id}
                      className={`${styles.chip} ${form.track === t.id ? styles.chipOn : ''}`}
                      onClick={() => pickTrack(t.id)}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
                {topics.length > 0 && (
                  <div className={styles.chips} role="group" aria-label="Topics">
                    {topics.map((t) => {
                      const on = form.topics.includes(t.id);
                      return (
                        <button
                          key={t.id}
                          type="button"
                          aria-pressed={on}
                          className={`${styles.chip} ${styles.chipSmall} ${on ? styles.chipOn : ''}`}
                          onClick={() => toggleTopic(t.id)}
                        >
                          {on && <Check size={14} strokeWidth={3.5} aria-hidden="true" />}
                          {t.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </section>

              <section ref={(el) => { sectionRefs.current.socials = el; }}>
                <h3>Links</h3>
                <div className={styles.group}>
                  {SOCIAL_FIELDS.map(({ key, label }) => (
                    <LabeledField
                      key={key}
                      label={label}
                      type="url"
                      inputMode="url"
                      placeholder="Paste a link"
                      autoCapitalize="none"
                      value={form.socials[key] ?? ''}
                      maxLength={300}
                      onChange={(e) => setForm((f) => ({ ...f, socials: { ...f.socials, [key]: e.target.value } }))}
                    />
                  ))}
                </div>
              </section>
            </div>

            <footer className={styles.foot}>
              <FormError message={error} />
              <PrimaryButton type="button" busy={saving} onClick={save}>
                {saving ? 'Saving…' : 'Save changes'}
              </PrimaryButton>
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
