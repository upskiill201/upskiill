import React from 'react';
import Image from 'next/image';
import { User } from 'lucide-react';
import styles from './Avatar.module.css';

type AvatarProps = {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  ring?: boolean;
  online?: boolean;
  className?: string;
};

export default function Avatar({
  src,
  alt,
  name,
  size = 'md',
  ring = false,
  online = false,
  className = '',
}: AvatarProps) {
  // Get initials from name "Amara Diallo" -> "AD"
  const getInitials = (fullName: string) => {
    const parts = fullName.trim().split(/\s+/);
    if (parts.length === 0 || !parts[0]) return '';
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const hasImage = Boolean(src);
  const initials = !hasImage && name ? getInitials(name) : '';

  const containerClasses = [
    styles.avatar,
    styles[size],
    ring ? styles.ring : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={styles.wrapper}>
      <div className={containerClasses} aria-label={alt || name || 'User avatar'}>
        {hasImage ? (
          <Image
            src={src!}
            alt={alt || name || 'Avatar'}
            fill
            className={styles.image}
            sizes="(max-width: 768px) 100vw, 80px"
          />
        ) : initials ? (
          <span className={styles.initials}>{initials}</span>
        ) : (
          <User className={styles.fallbackIcon} />
        )}
      </div>
      {online && <span className={`${styles.statusDot} ${styles[size]}`} />}
    </div>
  );
}
