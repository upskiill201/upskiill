'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Glyph } from '@/components/art/Glyph';
import { playHaptic } from '@/lib/haptics';
import { playSound } from '@/lib/audio/lessonSounds';
import styles from './unlock.module.css';

interface SceneWallProps {
  courseTitle?: string;
  completedCount: number;
  totalCount: number;
  /** Teyro Originals: one subscription unlocks every Original. */
  isOriginal?: boolean;
  onBack: () => void;
  onSeePlans: () => void;
  onMaybeLater: () => void;
}

/**
 * Scene 2 — reveals the locked wall: everything ahead of the learner's
 * frontier is waiting behind one unlock. Tey thinks it over beside the gate.
 */
export default function SceneWall({
  courseTitle,
  completedCount,
  totalCount,
  isOriginal = false,
  onBack,
  onSeePlans,
  onMaybeLater,
}: SceneWallProps) {
  const remaining = Math.max(0, totalCount - completedCount);

  const handleSeePlans = () => {
    playHaptic('medium', false);
    playSound('next');
    onSeePlans();
  };

  return (
    <>
      <button type="button" className={styles.backBtn} onClick={onBack} aria-label="Back">
        <Glyph name="chevronLeft" size={19} />
      </button>

      <div className={styles.sceneScroll}>
        {/* Full-bleed portrait mascot — the landscape Tey_thinking_desktop
            variant wastes ~70% of its canvas on transparent padding and
            inherits this img's square attrs (stretched), so it's avoided. */}
        <Image
          src="/User onbarding Assets/Tey_thinking _Mobile.webp"
          alt=""
          /* Asset is 800x1200 — attrs must keep that 2:3 ratio or Tey squashes. */
          width={180}
          height={270}
          className={styles.wallMascot}
          priority
        />

        <motion.div
          className={styles.gateCard}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut', delay: 0.05 }}
        >
          <span className={styles.gateLockCircle}>
            <Glyph name="lock" size={26} strokeWidth={2.5} />
          </span>
          <p className={styles.wallCount}>
            {remaining > 0 ? (
              <>
                {remaining} more lesson{remaining === 1 ? '' : 's'} are waiting
              </>
            ) : (
              <>The rest of this course is waiting</>
            )}
          </p>
          <p className={styles.wallSub}>
            You&apos;ve finished <strong>{completedCount}</strong> of{' '}
            <strong>{totalCount}</strong> lessons
            {courseTitle ? (
              <>
                {' '}in <em>{courseTitle}</em>
              </>
            ) : null}
            .{' '}
            {isOriginal ? (
              <>
                One <strong>Teyro Originals</strong> subscription unlocks this course and every other
                Original: every level, and every new unit as it lands.
              </>
            ) : (
              <>Unlock once and I&apos;ll keep every streak, coin and win counting with you.</>
            )}
          </p>
        </motion.div>
      </div>

      <div className={styles.sceneDock}>
        <button type="button" className={styles.cta3D} onClick={handleSeePlans}>
          <Glyph name="lock" size={15} />
          <span>{isOriginal ? 'Get Teyro Originals' : 'Unlock the rest of the course'}</span>
        </button>
        <button type="button" className={styles.exitLink} onClick={onMaybeLater}>
          Maybe later
        </button>
      </div>
    </>
  );
}
