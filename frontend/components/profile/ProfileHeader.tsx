'use client';

/**
 * The profile header — Duolingo's: a banner (your equipped backdrop, if any),
 * the big avatar in your equipped frame with a camera button to change it
 * (the avatar sheet: a photo, or a Teyro character),
 * name, @handle, joined date, location, bio, and following/followers counts.
 */

import React, { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Avatar from '@/components/ui/Avatar';
import AvatarSheet from '@/components/avatar/AvatarSheet';
import { Glyph } from '@/components/art/Glyph';
import CosmeticFrame from '@/components/cosmetics/CosmeticFrame';
import CosmeticBackdrop from '@/components/cosmetics/CosmeticBackdrop';
import { playSound } from '@/lib/audio/lessonSounds';
import { playHaptic } from '@/lib/haptics';
import { isPhoto } from '@/lib/avatar/avatar';
import type { MyProfile } from './types';
import styles from './Profile.module.css';

interface Props {
  me: MyProfile;
  onEdit: () => void;
  onPeople: (tab: 'following' | 'followers') => void;
}

function joined(iso?: string) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
}

export default function ProfileHeader({ me, onEdit, onPeople }: Props) {
  // The day-2 reminder and "photo removed" note link here with ?avatar=1.
  const params = useSearchParams();
  const [sheet, setSheet] = useState(() => params.get('avatar') === '1');

  const name = me.fullName || 'Learner';
  const handle = me.profile?.username || me.email?.split('@')[0] || '';
  const avatar = me.avatarUrl || me.profile?.avatarUrl || null;

  return (
    <section className={styles.header} aria-label="Your profile">
      <CosmeticBackdrop>
        <div className={styles.banner}>
          <div className={styles.bannerActions}>
            <Link
              href="/dashboard/settings"
              className={styles.iconBtn}
              aria-label="Settings"
              onClick={() => playSound('navTap', 5)}
            >
              <Glyph name="gear" size={20} strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </CosmeticBackdrop>

      <div className={styles.identity}>
        <div className={styles.avatarRow}>
          <div className={styles.avatarWrap}>
            <CosmeticFrame thickness={5}>
              <Avatar src={avatar} seed={me.id} name={name} px={104} className={styles.avatarImg} />
            </CosmeticFrame>
            <button
              type="button"
              className={`${styles.cameraBtn} ${isPhoto(avatar) ? '' : styles.cameraBtnPulse}`}
              aria-label={isPhoto(avatar) ? 'Change photo' : 'Add a photo'}
              onClick={() => {
                playSound('menuOpen');
                setSheet(true);
              }}
            >
              <Glyph name="camera" size={16} strokeWidth={2.5} />
            </button>
          </div>

          <button
            type="button"
            className={styles.editBtn}
            onClick={() => {
              playHaptic('light', false);
              playSound('menuOpen');
              onEdit();
            }}
          >
            <Glyph name="pencil" size={16} strokeWidth={2.75} /> Edit profile
          </button>
        </div>

        <h1 className={styles.name}>{name}</h1>
        {handle && <p className={styles.handle}>@{handle}</p>}
        <div className={styles.metaRow}>
          {joined(me.createdAt) && (
            <span>
              <Glyph name="calendar" size={14} strokeWidth={2.5} /> Joined {joined(me.createdAt)}
            </span>
          )}
          {me.profile?.location && (
            <span>
              <Glyph name="mapPin" size={14} strokeWidth={2.5} /> {me.profile.location}
            </span>
          )}
        </div>
        {me.profile?.bio && <p className={styles.bio}>{me.profile.bio}</p>}

        <div className={styles.countsRow}>
          <button
            type="button"
            className={styles.countBtn}
            onClick={() => {
              playSound('navTap', 1);
              onPeople('following');
            }}
          >
            <strong>{me.followingCount ?? 0}</strong> Following
          </button>
          <button
            type="button"
            className={styles.countBtn}
            onClick={() => {
              playSound('navTap', 2);
              onPeople('followers');
            }}
          >
            <strong>{me.followersCount ?? 0}</strong> {(me.followersCount ?? 0) === 1 ? 'Follower' : 'Followers'}
          </button>
        </div>
      </div>
      <AvatarSheet open={sheet} onClose={() => setSheet(false)} />
    </section>
  );
}
