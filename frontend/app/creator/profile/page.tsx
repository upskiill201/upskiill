'use client';

/**
 * /creator/profile — the creator's own profile in the studio. The same page
 * learners see (components/creator-profile), plus what only the owner needs:
 * a camera button on the avatar, EDIT PROFILE (a sheet), VIEW PUBLIC PAGE,
 * and a Duolingo-style "profile strength" checklist where every missing piece
 * is one tap from being done.
 */

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Camera, Check, ChevronRight, ExternalLink, Loader2, Pencil, RotateCcw } from 'lucide-react';
import {
  CreatorAbout,
  CreatorAvatar,
  CreatorCourses,
  CreatorHeader,
  CreatorProfileSkeleton,
  CreatorStats,
} from '@/components/creator-profile/CreatorProfileParts';
import EditCreatorProfileSheet, {
  type EditFocus,
  type EditableCreatorProfile,
} from '@/components/creator-profile/EditCreatorProfileSheet';
import { allCourses, type CreatorPublicProfile, type CreatorSocials } from '@/components/creator-profile/types';
import { isCreatorTrack } from '@/lib/creator/categories';
import { extractErrorMessage } from '@/lib/apiError';
import { playHaptic } from '@/lib/haptics';
import { playSound } from '@/lib/audio/lessonSounds';
import { hydrateSoundPreferences } from '@/lib/audio/soundManager';
import styles from '@/components/creator-profile/CreatorProfile.module.css';

interface MyCreatorProfile {
  id: string;
  fullName: string | null;
  avatarUrl: string | null;
  profile: (Partial<CreatorSocials> & {
    username?: string | null;
    headline?: string | null;
    location?: string | null;
    about?: string | null;
    bio?: string | null;
    niche?: string | null;
    subCategories?: unknown;
  }) | null;
}

type Load =
  | { state: 'loading' }
  | { state: 'error' }
  | { state: 'ready'; me: MyCreatorProfile; pub: CreatorPublicProfile | null; courseCount: number };

const EMPTY_SOCIALS: CreatorSocials = {
  website: null,
  linkedin: null,
  github: null,
  twitter: null,
  youtube: null,
  instagram: null,
  tiktok: null,
};

export default function StudioProfilePage() {
  const reduce = useReducedMotion() ?? false;
  const [load, setLoad] = useState<Load>({ state: 'loading' });
  const [editing, setEditing] = useState<{ open: boolean; focus: EditFocus }>({ open: false, focus: null });
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const fetchAll = useCallback(async (quiet = false) => {
    if (!quiet) setLoad({ state: 'loading' });
    try {
      const meRes = await fetch('/api/profile/me', { credentials: 'include', cache: 'no-store' });
      if (!meRes.ok) throw new Error();
      const me = (await meRes.json()) as MyCreatorProfile;
      // The public view (stats, published courses) by id, plus every course
      // incl. drafts for the "first course" check.
      const [pubRes, coursesRes] = await Promise.all([
        fetch(`/api/profile/creator/${encodeURIComponent(me.id)}`, { credentials: 'include', cache: 'no-store' }),
        fetch('/api/courses/instructor/me', { credentials: 'include' }),
      ]);
      const pub = pubRes.ok ? ((await pubRes.json()) as CreatorPublicProfile) : null;
      const list = coursesRes.ok ? await coursesRes.json().catch(() => []) : [];
      setLoad({ state: 'ready', me, pub, courseCount: Array.isArray(list) ? list.length : 0 });
    } catch {
      setLoad({ state: 'error' });
    }
  }, []);

  useEffect(() => {
    hydrateSoundPreferences();
    void fetchAll();
  }, [fetchAll]);

  const view = useMemo((): CreatorPublicProfile | null => {
    if (load.state !== 'ready') return null;
    const { me, pub } = load;
    const p = me.profile ?? {};
    const topics = Array.isArray(p.subCategories) ? (p.subCategories as unknown[]).filter((t): t is string => typeof t === 'string') : [];
    // The owner always sees their latest edits, even where the public
    // payload lags (e.g. no username yet, so no public lookup by handle).
    return {
      ...(pub ?? {
        creatorStatus: 'founding_creator',
        bio: '',
        location: null,
        languages: [],
        followersCount: 0,
        followingCount: 0,
        coursesCount: 0,
        learnersCount: 0,
        rating: null,
        isFollowing: false,
        featuredCourse: null,
        courses: [],
      }),
      id: me.id,
      fullName: me.fullName || 'Creator',
      username: p.username || 'username',
      avatarUrl: pub?.avatarUrl ?? me.avatarUrl,
      headline: p.headline || '',
      location: p.location || null,
      about: p.about || p.bio || '',
      track: isCreatorTrack(p.niche) ? p.niche : null,
      topics,
      socials: {
        website: p.website ?? null,
        linkedin: p.linkedin ?? null,
        github: p.github ?? null,
        twitter: p.twitter ?? null,
        youtube: p.youtube ?? null,
        instagram: p.instagram ?? null,
        tiktok: p.tiktok ?? null,
      },
      isSelf: true,
    } as CreatorPublicProfile;
  }, [load]);

  const openEdit = (focus: EditFocus = null) => {
    playHaptic('light', false);
    playSound('menuOpen');
    setEditing({ open: true, focus });
  };

  const uploadAvatar = async (file: File) => {
    setUploading(true);
    setUploadError(null);
    try {
      const form = new FormData();
      form.append('file', file);
      const up = await fetch('/api/upload/avatar', { method: 'POST', body: form, credentials: 'include' });
      const upData = await up.json().catch(() => ({}));
      if (!up.ok || !upData.url) throw new Error(upData.error || 'Upload failed. Try a JPG or PNG under 5MB.');
      const res = await fetch('/api/profile/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ avatarUrl: upData.url }),
      });
      if (!res.ok) throw new Error(extractErrorMessage(await res.json().catch(() => ({})), res.status));
      playSound('profileSaved');
      playHaptic('success', false);
      await fetchAll(true);
    } catch (e) {
      setUploadError(e instanceof Error ? e.message : 'Upload failed.');
      playSound('wrong');
    } finally {
      setUploading(false);
    }
  };

  if (load.state === 'loading') {
    return (
      <div className={styles.layout} style={{ paddingTop: 24 }}>
        <CreatorProfileSkeleton />
      </div>
    );
  }

  if (load.state === 'error' || !view) {
    return (
      <div className={styles.state}>
        <h1>Your profile didn&apos;t load</h1>
        <p>Check your connection and try again.</p>
        <button type="button" className={styles.editBtn} onClick={() => void fetchAll()}>
          <RotateCcw size={16} strokeWidth={2.75} aria-hidden="true" /> Try again
        </button>
      </div>
    );
  }

  const hasUsername = Boolean(load.me.profile?.username);
  const socials = view.socials ?? EMPTY_SOCIALS;
  const checklist: { key: string; label: string; done: boolean; go: () => void; href?: string }[] = [
    { key: 'photo', label: 'Add a photo', done: Boolean(view.avatarUrl), go: () => fileRef.current?.click() },
    { key: 'username', label: 'Pick a username', done: hasUsername, go: () => openEdit('username') },
    { key: 'headline', label: 'Write a headline', done: Boolean(view.headline), go: () => openEdit('headline') },
    { key: 'about', label: 'Tell learners about you', done: Boolean(view.about), go: () => openEdit('about') },
    { key: 'topics', label: 'Choose what you teach', done: Boolean(view.track && view.topics?.length), go: () => openEdit('topics') },
    { key: 'links', label: 'Add a link', done: Object.values(socials).some(Boolean), go: () => openEdit('socials') },
    { key: 'course', label: 'Create your first course', done: load.courseCount > 0, go: () => undefined, href: '/creator/create' },
  ];
  const doneCount = checklist.filter((c) => c.done).length;
  const pct = Math.round((doneCount / checklist.length) * 100);

  const editable: EditableCreatorProfile = {
    fullName: load.me.fullName ?? '',
    username: load.me.profile?.username ?? '',
    headline: view.headline,
    location: load.me.profile?.location ?? '',
    about: load.me.profile?.about ?? '',
    track: view.track ?? null,
    topics: view.topics ?? [],
    socials: {
      website: socials.website ?? '',
      linkedin: socials.linkedin ?? '',
      github: socials.github ?? '',
      twitter: socials.twitter ?? '',
      youtube: socials.youtube ?? '',
      instagram: socials.instagram ?? '',
      tiktok: socials.tiktok ?? '',
    },
  };

  return (
    <>
      <div className={styles.layout} style={{ paddingTop: 24 }}>
        <main className={styles.main}>
          <div>
            <CreatorHeader
              profile={view}
              followersCount={view.followersCount}
              avatarSlot={
                <div style={{ position: 'relative' }}>
                  <CreatorAvatar name={view.fullName} url={view.avatarUrl} />
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
                    {uploading ? <Loader2 size={16} className={styles.spin} /> : <Camera size={16} strokeWidth={2.5} />}
                  </button>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    hidden
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      e.target.value = '';
                      if (f) void uploadAvatar(f);
                    }}
                  />
                </div>
              }
              action={
                <div className={styles.actions}>
                  {hasUsername && (
                    <Link
                      href={`/creator-profile/${load.me.profile!.username}`}
                      className={styles.editBtn}
                      aria-label="View public page"
                      onClick={() => playSound('navTap', 3)}
                    >
                      <ExternalLink size={16} strokeWidth={2.75} aria-hidden="true" />
                    </Link>
                  )}
                  <button type="button" className={styles.editBtn} onClick={() => openEdit()}>
                    <Pencil size={16} strokeWidth={2.75} aria-hidden="true" /> Edit profile
                  </button>
                </div>
              }
            />
            {uploadError && (
              <p className={styles.inlineError} role="alert">
                {uploadError}
              </p>
            )}
          </div>
          <CreatorCourses
            courses={allCourses(view)}
            empty={
              <>
                <p>
                  {load.courseCount > 0
                    ? 'Your courses show here once they are published.'
                    : 'Your courses will show here. Learners see this page when they tap your name.'}
                </p>
                <Link href={load.courseCount > 0 ? '/creator/courses' : '/creator/create'} className={styles.followBtn}>
                  {load.courseCount > 0 ? 'My courses' : 'Create a course'}
                </Link>
              </>
            }
          />
        </main>

        <aside className={styles.rail}>
          <section className={`${styles.card} ${styles.strength}`} aria-labelledby="strength-title">
            <div className={styles.strengthHead}>
              <strong id="strength-title">{pct === 100 ? 'Your profile is complete!' : 'Profile strength'}</strong>
              <span>
                {doneCount}/{checklist.length}
              </span>
            </div>
            <div className={styles.bar} role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
              <motion.span
                className={styles.barFill}
                initial={reduce ? false : { width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ type: 'spring', stiffness: 120, damping: 20, delay: 0.2 }}
              />
            </div>
            <ul className={styles.checklist}>
              {checklist.map((item) => {
                const inner = (
                  <>
                    <span className={styles.checkDot} aria-hidden="true">
                      {item.done && <Check size={14} strokeWidth={4} />}
                    </span>
                    {item.label}
                    {!item.done && <ChevronRight size={18} className={styles.checkGo} aria-hidden="true" />}
                  </>
                );
                const cls = `${styles.checkItem} ${item.done ? styles.checkDone : ''}`;
                return (
                  <li key={item.key}>
                    {item.href && !item.done ? (
                      <Link href={item.href} className={cls} onClick={() => playSound('navTap', 2)}>
                        {inner}
                      </Link>
                    ) : (
                      <button type="button" className={cls} disabled={item.done} onClick={item.go}>
                        {inner}
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
          <CreatorStats profile={view} />
          <CreatorAbout
            profile={view}
            empty={
              <button type="button" className={styles.editBtn} onClick={() => openEdit('about')}>
                <Pencil size={16} strokeWidth={2.75} aria-hidden="true" /> Tell learners about you
              </button>
            }
          />
        </aside>
      </div>

      <EditCreatorProfileSheet
        open={editing.open}
        focus={editing.focus}
        initial={editable}
        onClose={() => {
          playSound('menuClose');
          setEditing({ open: false, focus: null });
        }}
        onSaved={() => {
          setEditing({ open: false, focus: null });
          void fetchAll(true);
        }}
      />
    </>
  );
}
