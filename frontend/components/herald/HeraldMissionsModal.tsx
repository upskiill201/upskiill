'use client';

import React from 'react';
import { useHerald } from '@/context/HeraldContext';
import DailyMissionCelebrationModal from '@/components/missions/DailyMissionCelebrationModal';

export default function HeraldMissionsModal() {
  const { activeOverlay, setActiveOverlay } = useHerald();
  const isOpen = activeOverlay === 'MISSIONS';

  if (!isOpen) return null;

  return (
    <DailyMissionCelebrationModal
      isOpen={isOpen}
      onClose={() => setActiveOverlay(null)}
    />
  );
}
