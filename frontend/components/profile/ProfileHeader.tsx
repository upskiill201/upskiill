'use client';

/**
 * The profile header — Duolingo's: a banner (your equipped backdrop, if any),
 * the big avatar in your equipped frame with a camera button to change it,
 * name, @handle, joined date, location, bio, and following/followers counts.
 */

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { Calendar, Camera, Loader2, MapPin, Pencil, Settings } from 'lucide-react';
import CosmeticFrame from '@/components/cosmetics/CosmeticFrame';
import CosmeticBackdrop from '@/components/cosmetics/CosmeticBackdrop';
import { playSound } from '@/lib/audio/lessonSounds';
import { playHaptic } from '@/lib/haptics';
import type { MyProfile } from './types';
import styles from './Profile.module.css';

interface Props {
  me: MyProfile;
  onEdit: () => void;
  onPeople: (tab: 'following' | 'followers') => void;
  /** Saves a new avatar URL (PATCH /api/profile) and refreshes. */
  onAvatarSaved: (url: string) => Promise<void>;
}

function joined(iso?: string) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
}

export default function ProfileHeader({ me, onEdit, onPeople, onAvatarSaved }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const name = me.fullName || 'Learner';
  const handle = me.profile?.username || me.email?.split('@')[0] || '';
  const avatar = me.avatarUrl || me.profile?.avatarUrl || null;

  const upload = async (file: File) => {
    setUploading(true);
    setError(null);
    try {
      const form = new FormData();
      form.append('file', file);
      const res = await fetch('/api/upload/avatar', { method: 'POST', body: form, credentials: 'include' });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.url) throw new Error(data.error || 'Upload failed. Try a JPG or PNG under 5MB.');
      await onAvatarSaved(data.url);
      playSound('toggleOn');
      playHaptic('success', false);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload failed.');
      playSound('nodeLocked');
    } finally {
      setUploading(false);
    }
  };

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
              <Settings size={20} strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </CosmeticBackdrop>

      <div className={styles.identity}>
        <div className={styles.avatarRow}>
          <div className={styles.avatarWrap}>
            <CosmeticFrame thickness={5}>
              {avatar ? (
                // eslint-disable-next-line @next/next/no-img-element -- user-uploaded, any host
                <img src={avatar} alt={name} className={styles.avatarImg} />
              ) : (
                <span className={styles.avatarInitial}>{name.charAt(0).toUpperCase()}</span>
              )}
            </CosmeticFrame>
            <button
              type="button"
              className={styles.cameraBtn}
              aria-label="Change photo"
              disabled={uploading}
              onClick={() => {
                playSound('menuOpen');
                fileRef.current?.click();
              }}
            >
              {uploading ? <Loader2 size={16} className="animate-spin" /> : <Camera size={16} strokeWidth={2.5} />}
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              hidden
              onChange={(e) => {
                const f = e.target.files?.[0];
                e.target.value = '';
                if (f) void upload(f);
              }}
            />
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
            <Pencil size={16} strokeWidth={2.75} aria-hidden="true" /> Edit profile
          </button>
        </div>

        <h1 className={styles.name}>{name}</h1>
        {handle && <p className={styles.handle}>@{handle}</p>}
        <div className={styles.metaRow}>
          {joined(me.createdAt) && (
            <span>
              <Calendar size={14} strokeWidth={2.5} aria-hidden="true" /> Joined {joined(me.createdAt)}
            </span>
          )}
          {me.profile?.location && (
            <span>
              <MapPin size={14} strokeWidth={2.5} aria-hidden="true" /> {me.profile.location}
            </span>
          )}
        </div>
        {me.profile?.bio && <p className={styles.bio}>{me.profile.bio}</p>}
        {error && <p className={styles.inlineError} role="alert">{error}</p>}

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
    </section>
  );
}
