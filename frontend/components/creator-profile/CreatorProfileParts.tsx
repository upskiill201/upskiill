'use client';

/**
 * The creator profile, Duolingo-style — the same header, stat tiles and
 * section rhythm as the learner profile (components/profile), built for a
 * teacher: courses instead of streaks, learners instead of XP.
 *
 * Shared by the public page (/creator-profile/:username) and the creator's
 * own profile in the studio (/creator/profile).
 */

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { BookOpen, Crown, Globe, Languages, Loader2, MapPin, UserCheck, UserPlus } from 'lucide-react';
import { FaGithub, FaInstagram, FaLinkedin, FaTiktok, FaTwitter, FaYoutube } from 'react-icons/fa';
import { CourseCover } from '@/components/course/CourseCover';
import { CREATOR_TRACKS, topicLabel } from '@/lib/creator/categories';
import { creatorIcon } from '@/components/creator-onboarding/creatorIcons';
import type { CreatorCourse, CreatorPublicProfile, CreatorSocials } from './types';
import styles from './CreatorProfile.module.css';

function compact(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
  if (n >= 10_000) return `${Math.round(n / 1000)}K`;
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, '')}K`;
  return n.toLocaleString();
}

// ─── Header ────────────────────────────────────────────────────────────────

export function CreatorHeader({
  profile,
  followersCount,
  action,
  avatarSlot,
}: {
  profile: CreatorPublicProfile;
  followersCount: number;
  /** FOLLOW on a public page; EDIT PROFILE on your own. */
  action?: React.ReactNode;
  /** Replaces the plain avatar (the studio adds a camera button). */
  avatarSlot?: React.ReactNode;
}) {
  const track = profile.track ? CREATOR_TRACKS[profile.track] : null;
  const trackArt = profile.track ? creatorIcon('track', profile.track) : undefined;
  const founding = profile.creatorStatus === 'founding_creator';
  const name = profile.fullName || 'Creator';

  return (
    <section className={styles.header} aria-label={`${name}'s profile`}>
      <div className={styles.banner} aria-hidden="true">
        <span className={styles.bannerShape} />
        <span className={styles.bannerShape} />
      </div>
      <div className={styles.identity}>
        <div className={styles.avatarRow}>
          {avatarSlot ?? <CreatorAvatar name={name} url={profile.avatarUrl} />}
          {action}
        </div>
        <h1 className={styles.name}>{name}</h1>
        <p className={styles.handle}>@{profile.username}</p>
        <div className={styles.badges}>
          {founding && (
            <span className={`${styles.badge} ${styles.badgeGold}`}>
              <Crown size={14} strokeWidth={2.75} aria-hidden="true" /> Founding creator
            </span>
          )}
          {track && (
            <span
              className={styles.badge}
              style={trackArt ? { color: trackArt.tone, background: `color-mix(in srgb, ${trackArt.tone} 12%, var(--bg-card))`, borderColor: `color-mix(in srgb, ${trackArt.tone} 35%, var(--border))` } : undefined}
            >
              {trackArt && <trackArt.Icon size={14} strokeWidth={2.75} aria-hidden="true" />} Teaches {track.label}
            </span>
          )}
        </div>
        {profile.headline && <p className={styles.headline}>{profile.headline}</p>}
        {(profile.location || profile.languages.length > 0) && (
          <div className={styles.metaRow}>
            {profile.location && (
              <span>
                <MapPin size={14} strokeWidth={2.5} aria-hidden="true" /> {profile.location}
              </span>
            )}
            {profile.languages.length > 0 && (
              <span>
                <Languages size={14} strokeWidth={2.5} aria-hidden="true" /> {profile.languages.join(', ')}
              </span>
            )}
          </div>
        )}
        <p className={styles.counts}>
          <strong>{compact(followersCount)}</strong> {followersCount === 1 ? 'follower' : 'followers'}
          <span aria-hidden="true"> · </span>
          <strong>{compact(profile.followingCount)}</strong> following
        </p>
        {profile.topics && profile.topics.length > 0 && profile.track && (
          <ul className={styles.topics} aria-label="Topics">
            {profile.topics.map((t) => {
              const label = topicLabel(profile.track, t);
              return label ? <li key={t}>{label}</li> : null;
            })}
          </ul>
        )}
      </div>
    </section>
  );
}

export function CreatorAvatar({ name, url }: { name: string; url: string | null }) {
  return (
    <div className={styles.avatarWrap}>
      {url ? (
        // eslint-disable-next-line @next/next/no-img-element -- user-uploaded, any host
        <img src={url} alt={name} className={styles.avatarImg} />
      ) : (
        <span className={styles.avatarInitial}>{name.charAt(0).toUpperCase()}</span>
      )}
    </div>
  );
}

// ─── Follow ────────────────────────────────────────────────────────────────

export function FollowButton({
  following,
  busy,
  onToggle,
}: {
  following: boolean;
  busy: boolean;
  onToggle: () => void;
}) {
  const reduce = useReducedMotion() ?? false;
  return (
    <motion.button
      type="button"
      className={`${styles.followBtn} ${following ? styles.following : ''}`}
      onClick={onToggle}
      disabled={busy}
      aria-pressed={following}
      whileTap={reduce ? undefined : { scale: 0.96 }}
    >
      {busy ? (
        <Loader2 size={18} className={styles.spin} aria-hidden="true" />
      ) : following ? (
        <UserCheck size={18} strokeWidth={2.75} aria-hidden="true" />
      ) : (
        <UserPlus size={18} strokeWidth={2.75} aria-hidden="true" />
      )}
      {following ? 'Following' : 'Follow'}
    </motion.button>
  );
}

// ─── Statistics ────────────────────────────────────────────────────────────

export function CreatorStats({ profile }: { profile: CreatorPublicProfile }) {
  const tiles = [
    { key: 'learners', art: '/art/ui/community.svg', value: compact(profile.learnersCount), label: 'Learners' },
    { key: 'courses', art: '/art/ui/bag.svg', value: String(profile.coursesCount), label: profile.coursesCount === 1 ? 'Course' : 'Courses' },
    {
      key: 'rating',
      art: '/art/ui/medal-1.svg',
      value: profile.rating !== null ? profile.rating.toFixed(1) : 'New',
      label: profile.rating !== null ? 'Average rating' : 'No ratings yet',
    },
    { key: 'followers', art: '/art/ui/like.svg', value: compact(profile.followersCount), label: 'Followers' },
  ];
  return (
    <section aria-labelledby="creator-stats">
      <h2 id="creator-stats" className={styles.sectionTitle}>
        Statistics
      </h2>
      <div className={styles.statsGrid}>
        {tiles.map((t) => (
          <div key={t.key} className={styles.stat}>
            <Image src={t.art} alt="" width={36} height={36} className={styles.statIcon} />
            <div className={styles.statText}>
              <span className={styles.statNum}>{t.value}</span>
              <span className={styles.statLabel}>{t.label}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Courses ───────────────────────────────────────────────────────────────

export function CreatorCourses({
  courses,
  empty,
}: {
  courses: CreatorCourse[];
  /** What to show with no published courses (a CTA on your own profile). */
  empty: React.ReactNode;
}) {
  return (
    <section aria-labelledby="creator-courses">
      <h2 id="creator-courses" className={styles.sectionTitle}>
        Courses
      </h2>
      {courses.length === 0 ? (
        <div className={styles.empty}>{empty}</div>
      ) : (
        <ul className={styles.courseGrid}>
          {courses.map((c) => (
            <li key={c.id}>
              <Link href={`/courses/${c.slug || c.id}`} className={styles.courseCard}>
                <CourseCover
                  id={c.id}
                  category={c.category}
                  thumbnailUrl={c.thumbnailUrl}
                  sizes="(max-width: 768px) 100vw, 320px"
                  glyphSize={32}
                  className={styles.courseCover}
                />
                <div className={styles.courseBody}>
                  <strong>{c.title}</strong>
                  <span className={styles.courseMeta}>
                    <BookOpen size={13} strokeWidth={2.5} aria-hidden="true" /> {c.lessonsCount}{' '}
                    {c.lessonsCount === 1 ? 'lesson' : 'lessons'} · {compact(c.studentsCount)}{' '}
                    {c.studentsCount === 1 ? 'learner' : 'learners'}
                    {c.rating !== null && <> · {c.rating.toFixed(1)} rating</>}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

// ─── About ─────────────────────────────────────────────────────────────────

const SOCIALS: { key: keyof CreatorSocials; label: string; Icon: React.ComponentType<{ size?: number }> }[] = [
  { key: 'website', label: 'Website', Icon: ({ size }) => <Globe size={size} strokeWidth={2.5} /> },
  { key: 'linkedin', label: 'LinkedIn', Icon: FaLinkedin },
  { key: 'github', label: 'GitHub', Icon: FaGithub },
  { key: 'youtube', label: 'YouTube', Icon: FaYoutube },
  { key: 'twitter', label: 'X / Twitter', Icon: FaTwitter },
  { key: 'instagram', label: 'Instagram', Icon: FaInstagram },
  { key: 'tiktok', label: 'TikTok', Icon: FaTiktok },
];

export function CreatorAbout({ profile, empty }: { profile: CreatorPublicProfile; empty?: React.ReactNode }) {
  const text = profile.about || profile.bio;
  const links = SOCIALS.filter((s) => profile.socials?.[s.key]);
  if (!text && links.length === 0 && !empty) return null;
  return (
    <section aria-labelledby="creator-about">
      <h2 id="creator-about" className={styles.sectionTitle}>
        About
      </h2>
      <div className={styles.card}>
        {text ? <p className={styles.aboutText}>{text}</p> : empty}
        {links.length > 0 && (
          <ul className={styles.socials}>
            {links.map(({ key, label, Icon }) => (
              <li key={key}>
                <a href={profile.socials![key]!} target="_blank" rel="noopener noreferrer nofollow" aria-label={label}>
                  <Icon size={18} />
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

// ─── Loading ───────────────────────────────────────────────────────────────

export function CreatorProfileSkeleton() {
  return (
    <div className={styles.skeleton} aria-busy="true" aria-label="Loading profile">
      <div className={styles.skHeader} />
      <div className={styles.skRow}>
        <div />
        <div />
        <div />
        <div />
      </div>
      <div className={styles.skBlock} />
    </div>
  );
}
