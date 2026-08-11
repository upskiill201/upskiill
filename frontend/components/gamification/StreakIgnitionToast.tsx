'use client';

import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface StreakIgnitionToastProps {
  isVisible: boolean;
  streakCount: number;
  onClose: () => void;
}

export default function StreakIgnitionToast({ isVisible, streakCount, onClose }: StreakIgnitionToastProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -40, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="fixed top-6 left-1/2 -translate-x-1/2 z-[99999] flex items-center gap-3 bg-gradient-to-r from-orange-50 to-amber-100 border-3 border-orange-500 rounded-2xl px-5 py-3 shadow-[0_12px_30px_rgba(249,115,22,0.35)] cursor-pointer"
          onClick={onClose}
        >
          <motion.div
            animate={{ scale: [1, 1.25, 1], rotate: [0, -10, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <Image src="/Icons/burn.png" alt="Streak Flame" width={42} height={42} style={{ objectFit: 'contain' }} />
          </motion.div>
          <div>
            <div className="text-xs font-extrabold text-orange-700 uppercase tracking-wider">
              STREAK IGNITED! 🔥
            </div>
            <div className="text-base font-black text-amber-950">
              {streakCount} Day{streakCount > 1 ? 's' : ''} Learning Streak!
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

