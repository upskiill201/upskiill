'use client';

/**
 * "A friend invited you" — shown on sign-up when the visitor arrived through
 * an invite link (or has one remembered by ReferralCapture). Reads client-only
 * state through useSyncExternalStore so the server render (no banner) and the
 * first client render agree.
 */

import { useSyncExternalStore } from 'react';
import Image from 'next/image';
import { readStoredReferral } from './ReferralCapture';
import styles from './InvitedBanner.module.css';

const noop = () => () => {};

function hasInvite(): boolean {
  const fromUrl = new URLSearchParams(window.location.search).get('ref');
  return !!fromUrl || !!readStoredReferral();
}

export default function InvitedBanner() {
  const invited = useSyncExternalStore(noop, hasInvite, () => false);
  if (!invited) return null;
  return (
    <div className={styles.banner} role="note">
      <Image src="/art/ui/gift.svg" alt="" width={40} height={40} />
      <p>
        <strong>A friend invited you.</strong> Finish your first lesson and you&apos;ll both get 100 coins and 100 XP.
      </p>
    </div>
  );
}
