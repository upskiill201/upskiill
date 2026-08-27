'use client';

/**
 * CelebrationEngine — root renderer for the Celebration Engine.
 * Mounted once at the app root; renders the active scene as a full-page
 * takeover via portal. Scenes chain through the queue in CelebrationContext:
 * each CTA advances to the next scene, and the underlying app is never
 * unmounted (this is an overlay, not a route).
 */

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useCelebration, CelebrationScene } from '@/context/CelebrationContext';
import ClaimScene from './scenes/ClaimScene';
import StreakScene from './scenes/StreakScene';
import ChestScene from './scenes/ChestScene';
import LevelUpScene from './scenes/LevelUpScene';
import QuestScene from './scenes/QuestScene';
import AchievementScene from './scenes/AchievementScene';
import LeagueScene from './scenes/LeagueScene';
import SectionCompleteScene from './scenes/SectionCompleteScene';
import CourseProgressScene from './scenes/CourseProgressScene';
import SectionUnlockedScene from './scenes/SectionUnlockedScene';
import CourseCompleteScene from './scenes/CourseCompleteScene';

let sceneCounter = 0;

export default function CelebrationEngine() {
  const { activeScene, advance } = useCelebration();
  const [mounted, setMounted] = useState(false);
  const [sceneKey, setSceneKey] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (activeScene) {
      sceneCounter += 1;
      setSceneKey(sceneCounter);
    }
  }, [activeScene]);

  // ── Escape hatch: no scene may ever trap the learner. Esc advances past the
  // current scene (rewards are persisted server-first, so skipping only skips
  // animation). Ignored during the entrance beat so it can't fire by accident.
  useEffect(() => {
    if (!activeScene) return;
    const openedAt = Date.now();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && Date.now() - openedAt > 800) {
        e.preventDefault();
        advance();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeScene, advance]);

  if (!mounted) return null;

  const renderScene = (scene: CelebrationScene) => {
    switch (scene.kind) {
      case 'CLAIM':
        return <ClaimScene scene={scene} onAdvance={advance} />;
      case 'STREAK':
        return <StreakScene scene={scene} onAdvance={advance} />;
      case 'CHEST':
        return <ChestScene scene={scene} onAdvance={advance} />;
      case 'LEVEL_UP':
        return <LevelUpScene scene={scene} onAdvance={advance} />;
      case 'QUEST':
        return <QuestScene scene={scene} onAdvance={advance} />;
      case 'ACHIEVEMENT':
        return <AchievementScene scene={scene} onAdvance={advance} />;
      case 'LEAGUE':
        return <LeagueScene scene={scene} onAdvance={advance} />;
      case 'SECTION_COMPLETE':
        return <SectionCompleteScene scene={scene} onAdvance={advance} />;
      case 'COURSE_PROGRESS':
        return <CourseProgressScene scene={scene} onAdvance={advance} />;
      case 'SECTION_UNLOCKED':
        return <SectionUnlockedScene scene={scene} onAdvance={advance} />;
      case 'COURSE_COMPLETE':
        return <CourseCompleteScene scene={scene} onAdvance={advance} />;
      default:
        return null;
    }
  };

  return createPortal(
    <AnimatePresence mode="wait">
      {activeScene && (
        <motion.div
          key={sceneKey}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.985 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          style={{ position: 'fixed', inset: 0, zIndex: 100200 }}
        >
          {renderScene(activeScene)}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
