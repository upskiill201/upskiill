'use client';

/**
 * Onboarding, right after signup (founder, 2026-10-28):
 *
 *   character → "Pick your character": one tap on a character with a
 *               personality (Crack Coder, Per My Last Email, Objection!…).
 *               No builder here — "make it yours later from your profile".
 *               A real photo is offered, but quietly: few upload one now.
 *   class     → "Meet your class": the people who started the same course
 *               the same week, with one-tap buddy requests — your first
 *               connections before your first full lesson.
 */

import React, { useState } from 'react';
import useSWR from 'swr';
import { motion, useReducedMotion } from 'framer-motion';
import Avatar from '@/components/ui/Avatar';
import AvatarSheet from '@/components/avatar/AvatarSheet';
import { Glyph } from '@/components/art/Glyph';
import { Btn, Footer, Screen } from '@/components/kit/Kit';
import { useHydrated } from '@/components/studio/useHydrated';
import { builtAvatarUrl, isPhoto } from '@/lib/avatar/avatar';
import { useSaveAvatar } from '@/lib/avatar/client';
import { PERSONAS, type Persona } from '@/lib/avatar/personas';
import { useMe } from '@/hooks/useMe';
import { NETWORK_KEYS, requestBuddy, type CohortPayload } from '@/lib/network';
import { fetcher } from '@/lib/swr';
import { playOnboardingCue } from '@/lib/audio/onboardingAudio';
import { celebrationHaptic, playHaptic } from '@/lib/haptics';
import styles from './ProfileSteps.module.css';

// ── Pick your character ──────────────────────────────────────────────────

export function CharacterStep(props: { direction: 1 | -1; name?: string; onDone: () => void }) {
  const { avatarUrl } = useMe();
  const save = useSaveAvatar();
  const reduce = useReducedMotion();
  const [picked, setPicked] = useState<Persona | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [photoSheet, setPhotoSheet] = useState(false);
  const hasPhoto = isPhoto(avatarUrl);

  const confirm = async () => {
    if (!picked) return props.onDone();
    setSaving(true);
    setError(null);
    try {
      await save(builtAvatarUrl(picked.config));
      celebrationHaptic('soft');
      props.onDone();
    } catch (e) {
      setError(e instanceof Error ? e.message : "That didn't save. Try again.");
      setSaving(false);
    }
  };

  return (
    <Screen
      stepKey="character"
      direction={props.direction}
      footer={
        <Footer>
          <Btn variant="green" disabled={saving || (!picked && !hasPhoto)} onClick={() => void confirm()}>
            {saving ? 'Saving…' : picked ? `I'm ${picked.name}` : hasPhoto ? 'Continue' : 'Pick one to continue'}
          </Btn>
        </Footer>
      }
    >
      <div className={styles.wrap}>
        <div className={styles.head}>
          <h1 className={styles.title}>{props.name ? `Pick your character, ${props.name}` : 'Pick your character'}</h1>
          <p className={styles.lead}>It&apos;s how classmates and buddies see you. You can build your own look any time from your profile.</p>
        </div>

        <motion.div
          className={styles.pickedCard}
          key={picked?.id ?? 'none'}
          initial={reduce ? false : { scale: 0.96, opacity: 0.6 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 26 }}
        >
          {picked ? (
            <>
              <Avatar src={builtAvatarUrl(picked.config)} px={88} name={picked.name} />
              <span className={styles.pickedText}>
                <strong>{picked.name}</strong>
                <span className={styles.pickedVibe}>{picked.vibe}</span>
                <span className={styles.pickedLine}>&ldquo;{picked.line}&rdquo;</span>
              </span>
            </>
          ) : hasPhoto ? (
            <>
              <Avatar src={avatarUrl} px={88} name="You" />
              <span className={styles.pickedText}>
                <strong>Your photo is in</strong>
                <span className={styles.pickedLine}>Or pick a character instead.</span>
              </span>
            </>
          ) : (
            <span className={styles.pickedEmpty}>Tap a character that feels like you</span>
          )}
        </motion.div>

        <div className={styles.grid} role="radiogroup" aria-label="Characters">
          {PERSONAS.map((p) => {
            const on = picked?.id === p.id;
            return (
              <button
                key={p.id}
                type="button"
                role="radio"
                aria-checked={on}
                className={`${styles.tile} ${on ? styles.tileOn : ''}`}
                onClick={() => {
                  playOnboardingCue('optionSelect');
                  playHaptic('selection');
                  setPicked(p);
                }}
              >
                <Avatar src={builtAvatarUrl(p.config)} px={64} name={p.name} />
                <span className={styles.tileName}>{p.name}</span>
                <span className={styles.tileVibe}>{p.vibe}</span>
              </button>
            );
          })}
        </div>

        <button type="button" className={styles.photoLink} onClick={() => setPhotoSheet(true)}>
          <Glyph name="camera" size={16} strokeWidth={2.5} /> {hasPhoto ? 'Change your photo' : 'Or add a real photo'}
        </button>
        {error && <p className={styles.error} role="alert">{error}</p>}
      </div>
      <AvatarSheet open={photoSheet} onClose={() => setPhotoSheet(false)} />
    </Screen>
  );
}

// ── Meet your class ──────────────────────────────────────────────────────

const SHOW = 5;

export function ClassStep(props: { direction: 1 | -1; courseTitle?: string; onDone: () => void }) {
  const hydrated = useHydrated();
  const res = useSWR<CohortPayload>(NETWORK_KEYS.cohort, fetcher, { revalidateOnFocus: false });
  const data = hydrated ? res.data : undefined;
  const [sent, setSent] = useState<Record<string, 'sending' | 'sent' | 'error'>>({});
  const others = (data?.members ?? []).filter((m) => !m.isMe);
  const shown = others.slice(0, SHOW);
  const count = data?.members.length ?? 0;
  const courseTitle = data?.course?.title ?? props.courseTitle;

  const add = async (id: string) => {
    playOnboardingCue('optionSelect');
    playHaptic('selection');
    setSent((s) => ({ ...s, [id]: 'sending' }));
    try {
      // They picked their face a screen ago: no "add a photo?" ask here.
      await requestBuddy(id, data?.course?.id, { askPhoto: false });
      setSent((s) => ({ ...s, [id]: 'sent' }));
    } catch {
      setSent((s) => ({ ...s, [id]: 'error' }));
    }
  };

  const loading = !data && !res.error;

  return (
    <Screen
      stepKey="class"
      direction={props.direction}
      footer={
        <Footer>
          <Btn variant="green" onClick={props.onDone}>
            Continue
          </Btn>
        </Footer>
      }
    >
      <div className={styles.wrap}>
        <div className={styles.head}>
          <h1 className={styles.title}>Meet your class</h1>
          <p className={styles.lead}>
            {count > 1 && courseTitle
              ? `${count} people started ${courseTitle} the same week as you. Learn together and you'll keep going.`
              : courseTitle
                ? `You're one of the first to start ${courseTitle} this week. Your classmates will show up here as they join.`
                : 'Everyone who starts your course the same week as you is your class.'}
          </p>
        </div>

        {loading ? (
          <div className={styles.classList} aria-busy="true" aria-label="Loading your class">
            {[0, 1, 2].map((i) => (
              <div key={i} className={`${styles.classRow} ${styles.skeleton}`}>
                <span className={styles.skelCircle} />
                <span className={styles.skelLine} />
              </div>
            ))}
          </div>
        ) : others.length === 0 ? (
          <div className={styles.emptyClass}>
            <div className={styles.faces} aria-hidden>
              {PERSONAS.slice(0, 5).map((p, i) => (
                <span key={p.id} className={styles.face} style={{ zIndex: 5 - i }}>
                  <Avatar src={builtAvatarUrl(p.config)} px={52} name="" />
                </span>
              ))}
            </div>
            <p className={styles.emptyText}>
              We&apos;ll tell you when your first classmates arrive, and you can find a study buddy from your Network tab.
            </p>
          </div>
        ) : (
          <ul className={styles.classList}>
            {shown.map((m) => {
              const st = sent[m.id];
              return (
                <li key={m.id} className={styles.classRow}>
                  <Avatar src={m.avatar} seed={m.id} name={m.name} px={48} />
                  <span className={styles.classText}>
                    <strong>{m.name}</strong>
                    <span>{m.progress > 0 ? `${m.progress}% through` : 'Just started'}</span>
                  </span>
                  <button
                    type="button"
                    className={`${styles.addBtn} ${st === 'sent' ? styles.addBtnSent : ''}`}
                    disabled={st === 'sending' || st === 'sent'}
                    onClick={() => void add(m.id)}
                  >
                    {st === 'sent' ? (
                      <>
                        <Glyph name="check" size={14} strokeWidth={3} /> Sent
                      </>
                    ) : st === 'error' ? (
                      'Try again'
                    ) : (
                      <>
                        <Glyph name="userPlus" size={14} strokeWidth={2.75} /> Buddy up
                      </>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        {others.length > SHOW && (
          <p className={styles.more}>+{others.length - SHOW} more in your Network tab</p>
        )}
      </div>
    </Screen>
  );
}
