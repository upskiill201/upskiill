import { Glyph } from '@/components/art/Glyph';
import styles from './CreatorBadge.module.css';

/** Beside the course creator's name on posts and comments: they run this community. */
export function CreatorBadge() {
  return (
    <span className={styles.badge} title="Course creator">
      <Glyph name="verified" size={12} strokeWidth={2.75} />
      Creator
    </span>
  );
}
