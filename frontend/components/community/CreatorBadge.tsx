import { BadgeCheck } from 'lucide-react';
import styles from './CreatorBadge.module.css';

/** Beside the course creator's name on posts and comments: they run this community. */
export function CreatorBadge() {
  return (
    <span className={styles.badge} title="Course creator">
      <BadgeCheck size={12} strokeWidth={2.75} aria-hidden="true" />
      Creator
    </span>
  );
}
