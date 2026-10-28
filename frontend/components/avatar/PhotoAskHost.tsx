'use client';

/**
 * The UI behind askForPhoto() (lib/avatar/photoAsk.ts): a small sheet with
 * your current face, why a photo helps right now, "Add a photo" and "Not
 * now". Either way the action that asked carries on afterwards.
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import Avatar from '@/components/ui/Avatar';
import AvatarSheet from './AvatarSheet';
import { useMe } from '@/hooks/useMe';
import { isPhoto } from '@/lib/avatar/avatar';
import { PHOTO_MOMENTS, claimPhotoMoment, registerPhotoAsker, type PhotoMoment } from '@/lib/avatar/photoAsk';
import { PHOTO_REWARD_COINS } from '@/lib/avatar/client';
import { playSound } from '@/lib/audio/lessonSounds';
import styles from './AvatarStudio.module.css';

export default function PhotoAskHost() {
  const { me, avatarUrl } = useMe();
  const [moment, setMoment] = useState<PhotoMoment | null>(null);
  const [sheet, setSheet] = useState(false);
  const resolver = useRef<(() => void) | null>(null);
  // The latest avatar, read inside the registered asker without re-registering.
  const avatarRef = useRef(avatarUrl);
  const loadedRef = useRef(!!me);
  useEffect(() => {
    avatarRef.current = avatarUrl;
    loadedRef.current = !!me;
  }, [avatarUrl, me]);

  const finish = useCallback(() => {
    setMoment(null);
    setSheet(false);
    resolver.current?.();
    resolver.current = null;
  }, []);

  useEffect(
    () =>
      registerPhotoAsker((m) => {
        // Unknown user, already a real photo, or asked about this lately: carry on.
        if (!loadedRef.current || isPhoto(avatarRef.current) || resolver.current || !claimPhotoMoment(m)) {
          return Promise.resolve();
        }
        playSound('menuOpen');
        setMoment(m);
        return new Promise<void>((resolve) => {
          resolver.current = resolve;
        });
      }),
    [],
  );

  const copy = moment ? PHOTO_MOMENTS[moment] : null;

  return (
    <>
      <Modal isOpen={!!moment && !sheet} onClose={finish} size="sm">
        {copy && (
          <div className={styles.choose}>
            <Avatar src={avatarUrl} seed={me?.id ?? 'me'} name={me?.fullName ?? 'You'} px={96} />
            <h3 className={styles.doneTitle}>{copy.title}</h3>
            <p className={styles.chooseLead}>
              {copy.body} You&apos;ll get +{PHOTO_REWARD_COINS} Coins for your first photo.
            </p>
            <div className={styles.actions} style={{ justifyContent: 'center', width: '100%' }}>
              <button type="button" className={styles.ghostBtn} onClick={finish}>
                Not now
              </button>
              <button type="button" className={styles.primaryBtn} onClick={() => setSheet(true)}>
                Add a photo
              </button>
            </div>
          </div>
        )}
      </Modal>
      <AvatarSheet open={sheet} onClose={finish} reason={copy?.body} />
    </>
  );
}
