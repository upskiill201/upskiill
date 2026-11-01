import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import { avatarFromUrl, seedAvatar } from '@/lib/avatar/avatar';
import { avatarSvg } from '@/lib/avatar/draw';
import styles from './Avatar.module.css';

type AvatarProps = {
  /** A photo URL, a Teyro character path (/avatars/v1/…), or nothing. */
  src?: string | null;
  alt?: string;
  name?: string;
  /**
   * Picks the character shown when there is no photo — pass the user's id so
   * the same person always gets the same face (falls back to their name).
   */
  seed?: string | null;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  /** An exact pixel size, overriding `size`. */
  px?: number;
  ring?: boolean;
  online?: boolean;
  className?: string;
};

/**
 * Everyone's face, everywhere: their photo, else the character they chose,
 * else a character picked from their id. Never initials (founder, 2026-10-28).
 */
export default function Avatar({
  src,
  alt,
  name,
  seed,
  size = 'md',
  px,
  ring = false,
  online = false,
  className = '',
}: AvatarProps) {
  const [imgError, setImgError] = useState(false);
  const built = useMemo(() => avatarFromUrl(src), [src]);
  const hasPhoto = Boolean(src) && !built && !imgError;
  const label = alt || name || 'User avatar';

  // The drawing: their chosen character, or one seeded from who they are.
  const svg = useMemo(() => {
    if (hasPhoto) return '';
    return avatarSvg(built ?? seedAvatar(seed || name || alt || 'teyro'));
  }, [hasPhoto, built, seed, name, alt]);

  const containerClasses = [styles.avatar, px ? '' : styles[size], ring ? styles.ring : '', className]
    .filter(Boolean)
    .join(' ');
  const sizeStyle = px ? { width: px, height: px } : undefined;

  return (
    <div className={styles.wrapper}>
      <div className={containerClasses} style={sizeStyle} role="img" aria-label={label}>
        {hasPhoto ? (
          <Image
            src={src!}
            alt={label}
            fill
            className={styles.image}
            sizes={px ? `${px}px` : '(max-width: 768px) 100vw, 120px'}
            onError={() => setImgError(true)}
          />
        ) : (
          // Built from fixed drawing tables (lib/avatar/draw.ts): no user text.
          <span className={styles.drawn} aria-hidden dangerouslySetInnerHTML={{ __html: svg }} />
        )}
      </div>
      {online && <span className={`${styles.statusDot} ${styles[size]}`} />}
    </div>
  );
}

/**
 * The same face, filling whatever circle it's dropped into — for the places
 * that already style their own avatar span (people rows, face stacks, the
 * saved-account button). A photo, the chosen character, or a seeded one.
 */
export function AvatarFill({ src, seed, name }: { src?: string | null; seed?: string | null; name?: string | null }) {
  const [imgError, setImgError] = useState(false);
  const built = useMemo(() => avatarFromUrl(src), [src]);
  const hasPhoto = Boolean(src) && !built && !imgError;
  const svg = useMemo(
    () => (hasPhoto ? '' : avatarSvg(built ?? seedAvatar(seed || name || 'teyro'))),
    [hasPhoto, built, seed, name],
  );
  if (hasPhoto) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- user uploads on arbitrary hosts
      <img
        src={src!}
        alt=""
        loading="lazy"
        onError={() => setImgError(true)}
        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit', display: 'block' }}
      />
    );
  }
  return (
    <span
      aria-hidden
      style={{ display: 'block', width: '100%', height: '100%', borderRadius: 'inherit', overflow: 'hidden' }}
      // Built from fixed drawing tables (lib/avatar/draw.ts): no user text.
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
