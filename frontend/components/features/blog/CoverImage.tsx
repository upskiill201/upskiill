import Image from 'next/image';
import { getCategory } from '@/lib/blog/categories';
import styles from './CoverImage.module.css';

interface CoverImageProps {
  /** Public path to a real cover image. Omit → generated Tey cover */
  src?: string;
  alt: string;
  /** Picks the pose + layout deterministically, so a post always looks the same */
  slug?: string;
  title: string;
  /** Drives the cover color and the Tey poses on offer */
  categorySlug?: string;
  priority?: boolean;
  /** Rendered width hint for the mascot — card covers are small, heroes are not */
  size?: 'card' | 'hero';
}

const LAYOUTS = [styles.layoutRight, styles.layoutCenter, styles.layoutLeft];

// djb2 — spreads similar slugs across poses far better than a char-code sum.
function hash(input: string): number {
  let h = 5381;
  for (let i = 0; i < input.length; i++) h = ((h << 5) + h + input.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export default function CoverImage({
  src,
  alt,
  slug = '',
  title,
  categorySlug,
  priority = false,
  size = 'card',
}: CoverImageProps) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 400px"
        className={styles.image}
      />
    );
  }

  // Duolingo-style illustrated cover: flat category color, soft shapes and a
  // Tey pose — every post gets a designed cover without a custom image.
  const category = categorySlug ? getCategory(categorySlug) : undefined;
  const h = hash(slug);
  const mascots = category?.mascots ?? [];
  const mascot = mascots.length > 0 ? mascots[h % mascots.length] : undefined;
  const layout = LAYOUTS[Math.floor(h / 7) % LAYOUTS.length];

  return (
    <div
      className={`${styles.placeholder} ${layout}`}
      style={category ? ({ '--accent': category.accentColor } as React.CSSProperties) : undefined}
      role="img"
      aria-label={title}
    >
      <span className={styles.halo} aria-hidden="true" />
      <span className={styles.dotA} aria-hidden="true" />
      <span className={styles.dotB} aria-hidden="true" />
      <span className={styles.ring} aria-hidden="true" />
      {mascot && (
        <Image
          src={mascot}
          alt=""
          width={600}
          height={900}
          priority={priority}
          sizes={
            size === 'hero' ? '(max-width: 768px) 50vw, 360px' : '(max-width: 640px) 45vw, 180px'
          }
          className={styles.mascot}
        />
      )}
    </div>
  );
}
