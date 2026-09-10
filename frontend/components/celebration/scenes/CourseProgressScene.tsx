'use client';

/**
 * CourseProgressScene — zooms out from the finished section to the whole
 * course: the completion bar sweeps from where the learner was to where they
 * are now, so finishing one section visibly moves the bigger journey.
 */

import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { BookOpen, Layers } from 'lucide-react';
import SceneShell from '../SceneShell';
import CelebrationMascot from '../CelebrationMascot';
import { AnimatedProgressBar, CountUpNumber, TypewriterBubble } from '../ScenePrimitives';
import styles from '../Scene.module.css';
import type { CelebrationScene } from '@/context/CelebrationContext';
import { playWhoosh } from '@/lib/audio/celebrationAudio';
import { pickCourseProgressLine } from '@/lib/tey/milestoneVoice';

type CourseProgressInput = Extract<CelebrationScene, { kind: 'COURSE_PROGRESS' }>;

interface CourseProgressSceneProps {
  scene: CourseProgressInput;
  onAdvance: () => void;
}

export default function CourseProgressScene({ scene, onAdvance }: CourseProgressSceneProps) {
  const reducedMotion = useReducedMotion();
  const whooshedRef = useRef(false);
  // Lazy initializer, not an effect: picked once per scene instance so a
  // re-render never rerolls the line mid-reveal.
  const [speech] = useState(() => pickCourseProgressLine(scene.from, scene.to));

  useEffect(() => {
    if (whooshedRef.current) return;
    whooshedRef.current = true;
    if (!reducedMotion) playWhoosh('up');
  }, [reducedMotion]);

  const barDelay = reducedMotion ? 0 : 0.5;

  return (
    <SceneShell
      cta={{ text: 'CONTINUE', onClick: onAdvance, variant: 'blue' }}
    >
      <motion.div
        className={styles.milestoneKicker}
        initial={reducedMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.3 }}
      >
        Course progress
      </motion.div>

      {/* Hero percentage — counts up as the bar below sweeps forward */}
      <motion.div
        className={styles.balanceRow}
        initial={reducedMotion ? false : { opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 20 }}
      >
        <CountUpNumber
          value={scene.to}
          from={reducedMotion ? undefined : scene.from}
          duration={1.4}
          className={styles.balanceValue}
        />
        <span
          className={styles.balanceValue}
          style={{ fontSize: 'clamp(26px, 7vw, 40px)', color: '#6c8cff' }}
        >
          %
        </span>
      </motion.div>

      <p className={styles.subhead}>{scene.courseTitle}</p>

      <motion.div
        className={styles.milestoneCard}
        initial={reducedMotion ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.38, ease: 'easeOut' }}
      >
        <AnimatedProgressBar
          from={scene.from}
          to={scene.to}
          tone="blue"
          delay={barDelay}
        />
        <div className={styles.milestoneMetaRow}>
          <span className={styles.milestoneMetaItem}>
            <Layers size={15} strokeWidth={2.5} />
            {scene.sectionsCompleted} of {scene.sectionsTotal} sections
          </span>
          <span className={styles.milestoneMetaItem}>
            <BookOpen size={15} strokeWidth={2.5} />
            {scene.lessonsCompleted} of {scene.lessonsTotal} lessons
          </span>
        </div>
      </motion.div>

      <CelebrationMascot pose="idle" entrance="puff" />
      <TypewriterBubble text={speech} startDelay={1200} />
    </SceneShell>
  );
}
