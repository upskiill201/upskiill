'use client';

/**
 * "Your profile picture" — one sheet for every way in (the profile's camera
 * button, the setup ring, the add-a-photo asks, a ?avatar=1 link from the
 * day-2 reminder): upload a photo (cropped to the circle, +20 Coins the
 * first time) or build a Teyro character.
 */

import React, { useEffect, useRef, useState } from 'react';
import useSWR from 'swr';
import { Modal } from '@/components/ui/Modal';
import Avatar from '@/components/ui/Avatar';
import { Glyph } from '@/components/art/Glyph';
import { useMe } from '@/hooks/useMe';
import { avatarFromUrl, builtAvatarUrl, isPhoto, seedAvatar, type AvatarConfig } from '@/lib/avatar/avatar';
import { PHOTO_REWARD_COINS, PHOTO_REWARD_KEY, uploadPhoto, useSaveAvatar } from '@/lib/avatar/client';
import { fetcher } from '@/lib/swr';
import { playSound } from '@/lib/audio/lessonSounds';
import { celebrationHaptic, playHaptic } from '@/lib/haptics';
import AvatarBuilder from './AvatarBuilder';
import PhotoCropper from './PhotoCropper';
import styles from './AvatarStudio.module.css';

type View = 'choose' | 'crop' | 'build' | 'done';

interface Props {
  open: boolean;
  onClose: () => void;
  /** Open straight on the builder (e.g. "Make your character"). */
  startOn?: 'choose' | 'build';
  /** A line saying why we're asking ("so Ada knows it's you"). */
  reason?: string;
}

export default function AvatarSheet({ open, onClose, startOn = 'choose', reason }: Props) {
  const { me, avatarUrl: current } = useMe();

  const reward = useSWR<{ claimed: boolean }>(open ? PHOTO_REWARD_KEY : null, fetcher);
  const save = useSaveAvatar();
  const fileRef = useRef<HTMLInputElement>(null);
  const [view, setView] = useState<View>(startOn);
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [earned, setEarned] = useState(0);
  const [savedUrl, setSavedUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setView(startOn);
    setFile(null);
    setError(null);
    setEarned(0);
    setSavedUrl(null);
  }, [open, startOn]);

  const seed = me?.id ?? me?.email ?? 'me';
  const startConfig: AvatarConfig = avatarFromUrl(current) ?? seedAvatar(String(seed));
  const showReward = !reward.data?.claimed && !isPhoto(current);

  const finish = async (url: string) => {
    setBusy(true);
    setError(null);
    try {
      const { reward: r } = await save(url);
      setSavedUrl(url);
      setEarned(r?.rewarded ? r.coins : 0);
      setView('done');
      playSound(r?.rewarded ? 'lessonComplete' : 'toggleOn');
      if (r?.rewarded) celebrationHaptic('win');
      else playHaptic('success', false);
    } catch (e) {
      setError(e instanceof Error ? e.message : "That didn't save. Try again.");
      playSound('nodeLocked');
    } finally {
      setBusy(false);
    }
  };

  const title = view === 'build' ? 'Make your character' : view === 'crop' ? 'Fit your photo' : 'Your profile picture';

  return (
    <Modal isOpen={open} onClose={onClose} title={title} size="md">
      <input
        ref={fileRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/heic"
        hidden
        onChange={(e) => {
          const f = e.target.files?.[0];
          e.target.value = '';
          if (!f) return;
          if (f.size > 15 * 1024 * 1024) {
            setError('That photo is over 15MB. Try a smaller one.');
            return;
          }
          setFile(f);
          setView('crop');
        }}
      />

      {view === 'choose' && (
        <div className={styles.choose}>
          <Avatar src={current} seed={String(seed)} name={me?.fullName ?? 'You'} px={112} />
          <p className={styles.chooseLead}>
            {reason ?? 'A real photo helps classmates and buddies recognise you.'}
          </p>
          <div className={styles.chooseOptions}>
            <button
              type="button"
              className={styles.optionCard}
              onClick={() => {
                playSound('menuOpen');
                fileRef.current?.click();
              }}
            >
              <span className={`${styles.optionArt} ${styles.optionArtPhoto}`}>
                <Glyph name="camera" size={26} strokeWidth={2.4} />
              </span>
              <span className={styles.optionText}>
                <strong>{isPhoto(current) ? 'Change your photo' : 'Add a photo'}</strong>
                <span>Take one or pick from your phone</span>
              </span>
              {showReward && <span className={styles.coinChip}>+{PHOTO_REWARD_COINS} Coins</span>}
            </button>
            <button
              type="button"
              className={styles.optionCard}
              onClick={() => {
                playSound('menuOpen');
                setView('build');
              }}
            >
              <span className={styles.optionArt}>
                <Avatar src={builtAvatarUrl(startConfig)} px={44} name="" />
              </span>
              <span className={styles.optionText}>
                <strong>Make your character</strong>
                <span>Pick a vibe, then make it yours</span>
              </span>
              <Glyph name="chevron" size={18} className={styles.optionChev} />
            </button>
          </div>
          {error && <p className={styles.error} role="alert">{error}</p>}
        </div>
      )}

      {view === 'crop' && file && (
        <>
          <PhotoCropper
            file={file}
            busy={busy}
            onCancel={() => setView('choose')}
            onDone={async (blob) => {
              setBusy(true);
              try {
                const url = await uploadPhoto(blob);
                await finish(url);
              } catch (e) {
                setError(e instanceof Error ? e.message : 'Upload failed.');
                playSound('nodeLocked');
                setBusy(false);
              }
            }}
          />
          {error && <p className={styles.error} role="alert">{error}</p>}
        </>
      )}

      {view === 'build' && (
        <>
          <AvatarBuilder
            initial={startConfig}
            busy={busy}
            onCancel={() => (startOn === 'build' ? onClose() : setView('choose'))}
            onSave={(c) => void finish(builtAvatarUrl(c))}
          />
          {error && <p className={styles.error} role="alert">{error}</p>}
        </>
      )}

      {view === 'done' && (
        <div className={styles.done}>
          <Avatar src={savedUrl} seed={String(seed)} name={me?.fullName ?? 'You'} px={128} ring />
          <h3 className={styles.doneTitle}>{isPhoto(savedUrl) ? 'Looking good!' : 'Love the character!'}</h3>
          <p className={styles.chooseLead}>
            {isPhoto(savedUrl)
              ? 'Classmates and buddies will see your face now.'
              : 'You can add a real photo any time from your profile.'}
          </p>
          {earned > 0 && <span className={`${styles.coinChip} ${styles.coinChipBig}`}>+{earned} Coins</span>}
          <button type="button" className={styles.primaryBtn} onClick={onClose}>
            Done
          </button>
        </div>
      )}
    </Modal>
  );
}
