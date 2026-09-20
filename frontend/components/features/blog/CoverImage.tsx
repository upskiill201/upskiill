import Image from 'next/image';
import { BookOpen } from 'lucide-react';
import styles from './CoverImage.module.css';

interface CoverImageProps {
  /** Public path to a real cover image. Omit → generated gradient placeholder */
  src?: string;
  alt: string;
  /** Used to vary the placeholder gradient deterministically per post */
  slug?: string;
  title: string;
  priority?: boolean;
}

// Deterministic gradient variants — same post always gets the same look.
const GRADIENTS = [
  'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 55%, #C7D2FE 100%)',
  'linear-gradient(135deg, #F5F7FB 0%, #EEF2FF 55%, #DDD6FE 100%)',
  'linear-gradient(135deg, #E0F2FE 0%, #EEF2FF 60%, #E0E7FF 100%)',
  'linear-gradient(135deg, #EEF2FF 0%, #F5F7FB 50%, #EDE9FE 100%)',
];

export default function CoverImage({ src, alt, slug = '', title, priority = false }: CoverImageProps) {
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

  // Branded fallback: soft gradient + blueprint grid + playful shapes, so posts
  // without custom covers still look designed (never a broken image).
  const index = GRADIENTS.length
    ? Math.abs([...slug].reduce((acc, ch) => acc + ch.charCodeAt(0), 0)) % GRADIENTS.length
    : 0;

  return (
    <div
      className={styles.placeholder}
      style={{ background: GRADIENTS[index] }}
      role="img"
      aria-label={title}
    >
      <span className={styles.wordmark}>Teyro</span>
      <span className={styles.shapeCircleLg} aria-hidden="true" />
      <span className={styles.shapeCircleSm} aria-hidden="true" />
      <span className={styles.shapeBadge} aria-hidden="true">
        <BookOpen size={22} strokeWidth={2.5} />
      </span>
    </div>
  );
}
