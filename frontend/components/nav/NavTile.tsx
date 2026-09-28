import type { CSSProperties } from 'react';
import type { LucideIcon } from 'lucide-react';
import Image from 'next/image';
import styles from './NavTile.module.css';

// Tones resolve to design tokens; the ones without a token of their own are
// mixed from existing ones so no hex ever lands here.
export const NAV_TONES = {
  blue: 'var(--color-brand)',
  green: 'var(--success-green)',
  purple: 'var(--brand-purple)',
  indigo: 'var(--brand-indigo)',
  amber: 'var(--warning)',
  red: 'var(--error-red)',
  slate: 'var(--text-secondary)',
  teal: 'color-mix(in srgb, var(--success-green) 55%, var(--color-brand))',
  orange: 'color-mix(in srgb, var(--warning) 60%, var(--error-red))',
  pink: 'color-mix(in srgb, var(--error-red) 60%, var(--brand-purple))',
} as const;

export type NavTone = keyof typeof NAV_TONES;

const IMAGE_PX = { sm: 20, md: 28, lg: 32 } as const;

interface NavTileProps {
  icon: LucideIcon;
  /** A full-colour PNG from /Icons; drawn instead of the glyph when set. */
  image?: string;
  tone: NavTone;
  active?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function NavTile({ icon: Icon, image, tone, active = false, size = 'md', className }: NavTileProps) {
  const classes = [
    styles.tile,
    size !== 'md' && styles[size],
    image && styles.image,
    active && styles.active,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span
      className={classes}
      style={{ '--tile-tone': NAV_TONES[tone] } as CSSProperties}
      aria-hidden
    >
      {image ? (
        <Image src={image} alt="" width={IMAGE_PX[size]} height={IMAGE_PX[size]} />
      ) : (
        <Icon strokeWidth={active ? 2.5 : 2} />
      )}
    </span>
  );
}
